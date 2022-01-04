import {useState, useEffect} from 'react';
import {Version} from "../Models";
import BlocklistToolsApi from "../BlocklistToolsApi";

export function useVersions(blocklistId: string, page: number): Version[] {
  const [versions, setVersions] = useState<Version[]>([]);

  function loadVersions(listId: string, pageNumber: number) {
    BlocklistToolsApi
      .versions(listId, pageNumber)
      .then(setVersions);
  }

  useEffect(() => {
    if (!blocklistId || blocklistId.trim().length === 0 || page === null || page === undefined) {
      return;
    }
    loadVersions(blocklistId, page);
  }, [blocklistId, page]);

  return versions;
}
