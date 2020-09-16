import React, {FunctionComponent} from "react";

import {useHistory, useParams} from "react-router-dom";
import {UseVersionDiff} from "../../hooks/UseVersionDiff";
import {VersionDiffResponse} from "../version-diff-response/VersionDiffResponse";
import {UseQueryParam} from "../../hooks/UseQueryParam";

export const VersionDiffPage: FunctionComponent = () =>  {
  const diffType = UseQueryParam('type', 'intersection');
  const { firstVersion, secondVersion } = useParams();
  const versionDiff = UseVersionDiff(firstVersion, secondVersion);
  const history = useHistory();

  function handleChangedDiffType(event: { target: HTMLSelectElement; }) {
    let type = event.target.value;
    let queryString = '';
    if (type && type.length > 0) {
      queryString = '?type=' + encodeURIComponent(type);
    }
    let url = `/versions/${firstVersion}/diff`;
    if (secondVersion) {
      url += `/${secondVersion}`;
    }
    history.push(url + queryString);
  }

  return (
    <div>
      <section>
        <select value={diffType} onChange={handleChangedDiffType}>
          <option value='intersection'>Full diff</option>
          <option value='subtraction'>Removed only</option>
          <option value='addition'>Added only</option>
        </select>
      </section>

      <VersionDiffResponse versionDiff={versionDiff} diffType={diffType}/>
    </div>
  );
};
