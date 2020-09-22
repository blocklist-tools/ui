import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {EntrySearchResponse} from "../services/ApiClient";

export function UseEntrySearch(query: string | null): EntrySearchResponse | null {
  const [entrySearchResponse, setEntrySearchResponse] = useState<EntrySearchResponse | null>(null);
  const [entrySearch, setEntrySearch] = useState<String | null>(null);

  function searchEntries(entry: string) {
    clearResponse();
    setEntrySearch(entry.toLowerCase());
    ApiClient
      .entrySearch(entry)
      .then(applyEntrySearchResponse);
  }

  function applyEntrySearchResponse(response: EntrySearchResponse | ApiError) {
    if (response instanceof ApiError) {
      return setEntrySearchResponse(null);
    }
    setEntrySearchResponse(response);
  }

  function clearResponse() {
    setEntrySearch(null);
    setEntrySearchResponse(null);
  }

  useEffect(() => {
    if (!query || query.length === 0) {
      return clearResponse();
    }
    if (entrySearch === query.toLowerCase()) {
      return;
    }
    searchEntries(query);
  });

  return entrySearchResponse;
}
