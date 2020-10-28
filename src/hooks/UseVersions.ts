import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {Version} from "../services/ApiClient";

export function UseVersions(blocklistId: string, page: number): Version[] | null {
  const [loadedBlocklistId, setLoadedBlocklistId] = useState<string | null>(null);
  const [loadedPage, setLoadedPage] = useState<number | null>(null);
  const [versions, setVersions] = useState<Version[] | null>(null);

  function loadVersions(listId: string, page: number) {
    clearResponse();
    setLoadedBlocklistId(listId);
    setLoadedPage(page);
    ApiClient
      .fetchVersions(listId, page)
      .then(applyVersionsResponse);
  }

  function applyVersionsResponse(response: Version[] | ApiError) {
    if (response instanceof ApiError) {
      return setVersions(null);
    }
    setVersions(response);
  }

  function clearResponse() {
    setLoadedBlocklistId(null);
    setLoadedPage(null);
  }

  useEffect(() => {
    if (!blocklistId || blocklistId.length === 0) {
      return clearResponse();
    }
    let normalizedId = blocklistId.toLowerCase().trim();
    if (loadedBlocklistId === normalizedId && page === loadedPage) {
      return;
    }
    loadVersions(normalizedId, page);
  });

  return versions;
}
