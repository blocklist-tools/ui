import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {Blocklist} from "../services/ApiClient";

export function UseBlocklist(listId: string): Blocklist | null {
  const [blocklistId, setBlocklistId] = useState<string | null>(null);
  const [blocklist, setBlocklist] = useState<Blocklist | null>(null);

  function loadBlocklist(id: string) {
    clearResponse();
    setBlocklistId(id);
    ApiClient
      .fetchList(id)
      .then(applyBlocklistResponse);
  }

  function applyBlocklistResponse(response: Blocklist | ApiError) {
    if (response instanceof ApiError) {
      return setBlocklist(null);
    }
    setBlocklist(response);
  }

  function clearResponse() {
    setBlocklistId(null);
    setBlocklist(null);
  }

  useEffect(() => {
    if (!listId || listId.length === 0) {
      return clearResponse();
    }
    let query = listId.toLowerCase().trim();
    if (blocklistId === query) {
      return;
    }
    loadBlocklist(query);
  });

  return blocklist;
}
