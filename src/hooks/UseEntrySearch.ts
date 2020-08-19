import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {EntrySearchResponse} from "../services/ApiClient";

export function UseEntrySearch(query: string): EntrySearchResponse|null {
    const [entrySearchResponse, setEntrySearchResponse] = useState<EntrySearchResponse|null>(null);

    function getExamDelivery(entry: string) {
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

    useEffect(() => {
        if (!query) {
            return;
        }
        if (entrySearchResponse && entrySearchResponse.query?.toLowerCase() === query.toLowerCase()) {
            return;
        }
        getExamDelivery(query);
    });

    return entrySearchResponse;
}