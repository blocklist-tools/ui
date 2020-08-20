import ErrorResponse from "../exceptions/ErrorResponse";
import ApiError from "../exceptions/ApiError";

export interface DnsQuery {
    queryName: string
    queryType: string
    response: string
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
}