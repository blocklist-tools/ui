import {useState, useEffect} from 'react';
import ApiClient from "../BlocklistToolsApi";
import {EntrySearchResponse} from "../Models";

export function useEntrySearch(query: string): EntrySearchResponse | null {
  const [entrySearchResponse, setEntrySearchResponse] = useState<EntrySearchResponse | null>(null);

  function searchEntries(entry: string) {
    clearResponse();
    ApiClient
      .entrySearch(entry)
      .then(setEntrySearchResponse);
  }

  function clearResponse() {
    setEntrySearchResponse(null);
  }

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      return clearResponse();
    }
    searchEntries(query.toLowerCase().trim());
  }, [query]);

  return entrySearchResponse;
}
