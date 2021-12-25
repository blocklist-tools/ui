import {FunctionComponent} from "react";
import {Version} from "../Models";
import {DiffLink} from "./DiffLink";

interface BlocklistVersionsParams {
  blocklistId: string
}

export const BlocklistVersions: FunctionComponent<BlocklistVersionsParams> = ({blocklistId}) =>  {
  const versions = [{
    "id": "0a35b5d7-c0ba-45b0-bb88-24dba7739aaf",
    "blocklistId": "24d51b02-fbcc-491e-bfb5-4f34b7d8057b",
    "numEntries": 377,
    "rawSha256": "85f0b1b986cd93ef1f42c884f7008acb74432cac5ad299a22cb16ce7c844d24b",
    "parsedSha256": "985ef2015a5b35d1e143822bb8777390d03af1e09f5fad31cb95ffcd6c52387f",
    "createdOn": new Date("2021-08-27T11:28:04Z"),
    "lastSeen": new Date("2021-12-21T15:02:40.567332Z")
  }, {
    "id": "cc53c425-d8ca-451c-ac13-6ee02298804b",
    "blocklistId": "24d51b02-fbcc-491e-bfb5-4f34b7d8057b",
    "numEntries": 373,
    "rawSha256": "e66e5eb63187e5f9b05c31ff645213d601a7706a36729c12c82756b561463903",
    "parsedSha256": "806ceca74daa363cb588af2b79139aeeedea6c765a2dcbc34cdd7b04a3dda661",
    "createdOn": new Date("2021-07-29T18:25:35Z"),
    "lastSeen": new Date("2021-07-29T18:25:35Z")
  }, {
    "id": "30d94569-f8ec-42dc-bf11-18e17f1e2932",
    "blocklistId": "24d51b02-fbcc-491e-bfb5-4f34b7d8057b",
    "numEntries": 377,
    "rawSha256": "a9f4372631477a9bffd2829b43c3657d424e1fe0626efe5de2fd7727c316d124",
    "parsedSha256": "7882b88cac3b60c6cba896fa2b2c0d600cd219b98ce119388e69b0e0320385a6",
    "createdOn": new Date("2021-03-03T06:48:44Z"),
    "lastSeen": new Date("2021-03-03T06:48:44Z")
  }] as Version[];


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
