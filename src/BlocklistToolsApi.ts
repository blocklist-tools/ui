import {Blocklist, DnsQueryResponse, EntrySearchResponse, EntrySummary, Version} from "./Models";
import ApiError from "./ApiError";
import {toast} from "react-hot-toast";

export default class BlocklistToolsApi {
  private static readonly rootApiUrl = process.env.REACT_APP_BLOCKLIST_TOOLS_API_URL;

  private static readonly defaultHeaders = () => {
    return {
      'Content-Type': 'application/json'
    }
  };

  public static async blocklists(page: number) {
    const response = await fetch(`${this.rootApiUrl}/blocklists?page=${page}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });

    if (response.status !== 200) {
      const error = `Fetch blocklists failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      toast.error('Error loading blocklists, please wait a minute and try again.');
      throw ApiError.fromMessage(error);
    }
    return await response.json() as Blocklist[];
  }

  public static async blocklistDetails(blocklistId: string) {
    const response = await fetch(`${this.rootApiUrl}/blocklists/${blocklistId}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });

    if (response.status !== 200) {
      const error = `Fetch blocklist failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      toast.error('Error loading blocklist details, please wait a minute and try again.');
      throw ApiError.fromMessage(error);
    }
    return await response.json() as Blocklist;
  }

  public static async entrySearch(query: string) {
    let params = new URLSearchParams();
    params.append('q', query);
    const response = await fetch(`${this.rootApiUrl}/entries/search?${params}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });
    if (response.status !== 200) {
      let error = `Entry search failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      toast.error('Search failed, please ensure you entered a valid domain.');
      throw ApiError.fromMessage(error);
    }
    const body = await response.json();
    return {
      query: body.query as string,
      summaries: BlocklistToolsApi.parseEntrySummaries(body)
    } as EntrySearchResponse;
  }

  private static parseEntrySummaries(response: any): EntrySummary[] {
    return response.summaries.map((summary: any) => {
      let removedOn = summary.removedOn;
      if (summary.removedOn) {
        removedOn = new Date(summary.removedOn)
      }
      return {
        blocklistName: summary.blocklistName,
        blocklistId: summary.blocklistId,
        addedVersionId: summary.addedVersionId,
        addedOn: new Date(summary.addedOn),
        removedVersionId: summary.removedVersionId,
        removedOn: removedOn,
        listAddedOn: new Date(summary.listAddedOn)
      }
    });
  }

  public static async dnsQuery(domainName: string, queryType: string) {
    let params = new URLSearchParams();
    params.append('name', domainName);
    params.append('type', queryType);
    const response = await fetch(`${this.rootApiUrl}/dns-query?${params}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });
    if (response.status !== 200) {
      let error = `DNS query failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      toast.error('DNS query failed, please ensure you entered a valid domain.');
      throw ApiError.fromMessage(error);
    }
    const body = await response.json();
    return body as DnsQueryResponse;
  }

  public static async versions(blocklistId: string, page: number) {
    const response = await fetch(`${this.rootApiUrl}/blocklists/${blocklistId}/versions?page=${page}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });

    if (response.status !== 200) {
      let error = `Fetch versions failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      toast.error('Unable to load list versions.');
      throw ApiError.fromMessage(error);
    }
    let rawVersions = await response.json() as any[];
    return rawVersions.map(this.parseVersions);
  }

  private static parseVersions(version: any) {
    version.createdOn = new Date(version.createdOn);
    version.lastSeen = new Date(version.lastSeen);
    return version as Version;
  }

}
