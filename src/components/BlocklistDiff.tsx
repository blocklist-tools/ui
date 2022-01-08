import React, {FunctionComponent, useState} from "react";
import {DiffTypes} from "../Models";
import {DiffForm} from "./DiffForm";
import {useVersionDiff} from "../hooks/useVersionDiff";
import {useParams} from "react-router-dom";
import {VersionDiffResponse} from "./VersionDiffResponse";

export const BlocklistDiff: FunctionComponent = () =>  {
  const [diffType, setDiffType] = useState<DiffTypes>(DiffTypes.INTERSECTION);
  const { firstVersion, secondVersion } = useParams();
  const diff = useVersionDiff(firstVersion as string, secondVersion || '' as string)

  return (
    <>
      <DiffForm onSubmit={setDiffType} />
      <VersionDiffResponse versionDiff={diff} diffType={diffType} />
    </>
  );
};
