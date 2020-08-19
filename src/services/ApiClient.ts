import ErrorResponse from "../exceptions/ErrorResponse";
import ApiError from "../exceptions/ApiError";
import {findRenderedComponentWithType} from "react-dom/test-utils";

export interface DnsQuery {
    queryName: string
    queryType: string
    response: string
    rcode: string
}

export interface EntrySearchResponse {
    query: string
    summaries: EntrySummary[]
}

export interface EntrySummary {
    blocklistName: string
    blocklistId: string
    addedVersionId: string
    addedOn: Date
    removedVersionId: string
    removedOn: Date
}

export default class ApiClient {
    private static readonly rootApiUrl = process.env.REACT_APP_ROOT_API_URL;

    private static readonly defaultHeaders = () => {
        return {
            'Content-Type': 'application/json'
        }
    };

    /**
     * Native fetch wrapped in a try/catch to return an ErrorResponse instead of throwing. The
     * promise is always resolved and will never be rejected.
     * @throws never
     */
    private static async safeFetch(input: RequestInfo, init?: RequestInit): Promise<Response | ErrorResponse> {
        try {
            return await fetch(input, init);
        } catch (error) {
            return ErrorResponse.fromError(error);
        }
    }

    public static async dnsQuery(domainName: string, queryType: string): Promise<DnsQuery|ApiError> {
        let params = new URLSearchParams();
        params.append('name', domainName);
        params.append('type', queryType);
        const response = await this.safeFetch(`${this.rootApiUrl}/dns-query?${params}`, {
            headers: this.defaultHeaders(),
            mode: 'cors',
            method: 'GET'
        });

        if (response.status !== 200) {
            let error = `DNS query failed: ${response.status} => ${await response.text()}`;
            console.log(error);
            return ApiError.fromMessage(error);
        }
        return await response.json();
    }

    public static async entrySearch(query: string): Promise<EntrySearchResponse|ApiError> {
        let params = new URLSearchParams();
        params.append('q', query);
        const response = await this.safeFetch(`${this.rootApiUrl}/entries/search?${params}`, {
            headers: this.defaultHeaders(),
            mode: 'cors',
            method: 'GET'
        });
        if (response.status !== 200) {
            let error = `Entry search failed: ${response.status} => ${await response.text()}`;
            console.log(error);
            return ApiError.fromMessage(error);
        }
        const body = await response.json() as any;

        const summaries = body.summaries.map(function(summary: any) {
            return {
                blocklistName: summary.blocklistName,
                blocklistId: summary.blocklistId,
                addedVersionId: summary.addedVersionId,
                addedOn: new Date(summary.addedOn),
                removedVersionId: summary.removedVersionId,
                removedOn: new Date(summary.removedOn)
            }
        });
        return {
            query: body.query as string,
            summaries: summaries
        }
    }
}