import {useState, useEffect} from 'react';
import {DataStats} from "../Models";
import BlocklistToolsApi from "../BlocklistToolsApi";

export function useDataStats(): DataStats {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [dataStats, setDataStats] = useState<DataStats>({
    size: '31 GB',
    entries: 7925067402,
    versions: 71457,
    blocklists: 144,
    domains: 21762405
  });

  function loadStats() {
    setLoaded(true);
    BlocklistToolsApi.dataStats().then(setDataStats);
  }

  useEffect(() => {
    if (loaded) {
      return;
    }
    loadStats();
  }, [loaded]);

  return dataStats;
}
