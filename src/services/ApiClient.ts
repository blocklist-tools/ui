import ErrorResponse from "../exceptions/ErrorResponse";
import ApiError from "../exceptions/ApiError";

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
  removedVersionId: string|null
  removedOn: Date|null
  listAddedOn: Date
}

export interface DiffSection {
  hasAdditions: boolean
  hasSubtractions: boolean
  lines: DiffLine[]
}

export interface DiffLine {
  isAddition: boolean
  isSubtraction: boolean
  isNeutral: boolean
  value: string
}

export interface VersionDiff {
  firstVersion: string
  secondVersion: string|null
  sections: DiffSection[]
}

export interface Blocklist {
  id: string
  name: string
  format: string
  downloadUrl: string
  homepageUrl: string
  issuesUrl: string
  licenseUrl: string
  licenseType: string
}

export interface Version {
  id: string
  blocklistId: string
  numEntries: number
  rawSha256: string
  parsedSha256: string
  createdOn: Date
  lastSeen: Date
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

  public static async dnsQuery(domainName: string, queryType: string): Promise<DnsQuery | ApiError> {
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

  public static async entrySearch(query: string): Promise<EntrySearchResponse | ApiError> {
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

    const summaries = body.summaries.map(function (summary: any) {
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
    return {
      query: body.query as string,
      summaries: summaries
    }
  }

  public static async versionDiff(firstVersion: string, secondVersion: string|null): Promise<VersionDiff | ApiError> {
    const response = await this.safeFetch(`${this.rootApiUrl}/versions/${firstVersion}/diff/${secondVersion || ''}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });

    if (response.status !== 200) {
      let error = `Version diff query failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      return ApiError.fromMessage(error);
    }
    const body = await response.text();
    const sections = [] as DiffSection[];
    let currentSection = {
      id: 0,
      hasAdditions: false,
      hasSubtractions: false,
      lines: []
    } as DiffSection;
    body.split(/\r?\n/).forEach((line: string, index: number) => {
      if (line.trim().length === 0) {
        return;
      }
      if (line === '---') {
        if (currentSection.lines.length > 0) {
          sections.push(currentSection);
        }

        currentSection = {
          hasAdditions: false,
          hasSubtractions: false,
          lines: []
        }
        return;
      }

      let diffLine = {
        id: index,
        isAddition: line.startsWith('+'),
        isSubtraction: line.startsWith('-'),
        isNeutral: line.startsWith(' '),
        value: line.substring(1)
      };

      currentSection.hasSubtractions = currentSection.hasSubtractions || diffLine.isSubtraction;
      currentSection.hasAdditions = currentSection.hasAdditions || diffLine.isAddition;
      currentSection.lines.push(diffLine);
    });

    if (currentSection.lines.length > 0) {
      sections.push(currentSection);
    }

    return {
      firstVersion: firstVersion,
      secondVersion: secondVersion,
      sections: sections
    };
  }

  public static async fetchLists(page: number) {
    const response = await this.safeFetch(`${this.rootApiUrl}/blocklists?page=${page}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });

    if (response.status !== 200) {
      let error = `Fetch lists failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      return ApiError.fromMessage(error);
    }
    return await response.json() as Blocklist[];
  }

  public static async fetchList(id: string) {
    const response = await this.safeFetch(`${this.rootApiUrl}/blocklists/${id}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });

    if (response.status !== 200) {
      let error = `Fetch list failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      return ApiError.fromMessage(error);
    }
    return await response.json() as Blocklist;
  }

  public static async fetchVersions(blocklistId: string, page: number) {
    const response = await this.safeFetch(`${this.rootApiUrl}/blocklists/${blocklistId}/versions?page=${page}`, {
      headers: this.defaultHeaders(),
      mode: 'cors',
      method: 'GET'
    });

    if (response.status !== 200) {
      let error = `Fetch versions failed: ${response.status} => ${await response.text()}`;
      console.log(error);
      return ApiError.fromMessage(error);
    }
    let rawVersions = await response.json() as any[];
    for (let i=0; i < rawVersions.length; i++) {
      rawVersions[i].createdOn = new Date(rawVersions[i].createdOn);
      rawVersions[i].lastSeen = new Date(rawVersions[i].lastSeen);
    }
    return rawVersions as Version[];
  }
}
