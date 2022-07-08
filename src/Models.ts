
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
  fullyLoaded: boolean
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

export interface EntrySearchResponse {
  query: string
  summaries: EntrySummary[]
}

export interface DnsQueryResponse {
  queryName: string
  queryType: string
  response: string
  rcode: string
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

export enum DnsQueryTypes {
  A = 'A',
  AAAA = 'AAAA',
  CAA = 'CAA',
  CNAME = 'CNAME',
  HTTPS = 'HTTPS',
  MX = 'MX',
  NS = 'NS',
  PTR = 'PTR',
  SOA = 'SOA',
  SRV = 'SRV',
  SVCB = 'SVCB',
  TXT = 'TXT'
}

export enum DiffTypes {
  INTERSECTION = 'intersection',
  SUBTRACTION = 'subtraction',
  ADDITION = 'addition'
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

export interface DataStats {
  size: string
  entries: number
  versions: number
  blocklists: number
  domains: number
}
