import {FunctionComponent} from "react";
import {DiffLink} from "./DiffLink";
import {useVersions} from "../hooks/useVersions";

interface BlocklistVersionsParams {
  blocklistId: string
}

export const BlocklistVersions: FunctionComponent<BlocklistVersionsParams> = ({blocklistId}) =>  {
  const versions = useVersions(blocklistId, 0);

  let versionsList = versions.map((version) => {
    let dateText = version.createdOn.toDateString();
    let dateTitle = version.createdOn.toISOString();
    let entriesText = Intl.NumberFormat().format(version.numEntries);
    return (
      <li key={version.id}>
        <DiffLink versionId={version.id}>
          <span title={dateTitle}>{dateText}</span>
        </DiffLink>: {entriesText} entries
      </li>
    );
  });

  return (<ul>{versionsList}</ul>)
};
