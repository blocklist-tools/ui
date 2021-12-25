import {Blocklist, EntrySearchResponse, EntrySummary} from "./Models";
import ApiError from "./ApiError";

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
      throw ApiError.fromMessage(error);
    }
    return await response.json() as Blocklist[];
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

}
