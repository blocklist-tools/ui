
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
