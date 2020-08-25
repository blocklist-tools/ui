import React, {FunctionComponent} from "react";

import {useParams} from "react-router-dom";
import {UseVersionDiff} from "../../hooks/UseVersionDiff";
import {VersionDiffResponse} from "../version-diff-response/VersionDiffResponse";

export const VersionDiffPage: FunctionComponent = () =>  {
  const { firstVersion, secondVersion } = useParams();
  const versionDiff = UseVersionDiff(firstVersion, secondVersion);
  return (
    <VersionDiffResponse versionDiff={versionDiff} />
  );
};
