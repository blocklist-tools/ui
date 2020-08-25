import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {EntrySearchResponse} from "../services/ApiClient";

export function UseEntrySearch(query: string|null): EntrySearchResponse|null {
    const [entrySearchResponse, setEntrySearchResponse] = useState<EntrySearchResponse|null>(null);

    function searchEntries(entry: string) {
        ApiClient
            .entrySearch(entry)
            .then(applyEntrySearchResponse);
    }

    function applyEntrySearchResponse(response: EntrySearchResponse|ApiError) {
        if (response instanceof ApiError) {
            return setEntrySearchResponse(null);
        }
        setEntrySearchResponse(response);
    }

    function clearResponse() {
      setEntrySearchResponse(null);
    }

    useEffect(() => {
        if (!query || query.length === 0) {
            return clearResponse();
        }
        if (entrySearchResponse && entrySearchResponse.query?.toLowerCase() === query.toLowerCase()) {
          return;
        }
        searchEntries(query);
    });

    return entrySearchResponse;
}
