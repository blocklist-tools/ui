import {useState, useEffect} from 'react';
import ApiClient from "../BlocklistToolsApi";
import {VersionDiff} from "../Models";

export function useVersionDiff(firstVersion: string, secondVersion: string): VersionDiff | null {
  const [versionDiff, setVersionDiff] = useState<VersionDiff|null>(null);

  function loadDetails(a: string, b: string) {
    ApiClient
      .versionDiff(a, b)
      .then(setVersionDiff);
  }

  useEffect(() => {
    if (!firstVersion || firstVersion.trim().length === 0) {
      return;
    }
    loadDetails(firstVersion.trim(), secondVersion.trim());
  }, [firstVersion, secondVersion]);

  return versionDiff;
}
