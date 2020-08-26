import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {VersionDiff} from "../services/ApiClient";

export function UseVersionDiff(firstVersion: string, secondVersion: string|null): VersionDiff|null {
  const [versionDiff, setVersionDiff] = useState<VersionDiff|null>(null);

  function getVersionDiff(firstVersion: string, secondVersion: string|null) {
    ApiClient
      .versionDiff(firstVersion, secondVersion)
      .then(applyVersionDiff);
  }

  function applyVersionDiff(response: VersionDiff|ApiError) {
    if (response instanceof ApiError) {
      return setVersionDiff(null);
    }
    setVersionDiff(response);
  }

  function clearResponse() {
    setVersionDiff(null);
  }

  useEffect(() => {
    if (!firstVersion || firstVersion.length === 0) {
      return clearResponse();
    }
    if (versionDiff && versionDiff.firstVersion === firstVersion && versionDiff.secondVersion === secondVersion) {
      return;
    }
    getVersionDiff(firstVersion, secondVersion);
  });

  return versionDiff;
}
