import {useState, useEffect} from 'react';
import ApiClient from "../BlocklistToolsApi";
import {Blocklist} from "../Models";

export function useBlocklistDetails(blocklistId: string): Blocklist | null {
  const [blocklistDetails, setBlocklistDetails] = useState<Blocklist|null>(null);

  function loadDetails(id: string) {
    ApiClient
      .blocklistDetails(id)
      .then(setBlocklistDetails);
  }

  useEffect(() => {
    if (!blocklistId || blocklistId.trim().length === 0) {
      return;
    }
    loadDetails(blocklistId.trim());
  }, [blocklistId]);

  return blocklistDetails;
}
