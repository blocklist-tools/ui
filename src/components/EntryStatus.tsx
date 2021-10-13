import React, {FunctionComponent} from "react";
import {DateSpan} from "./DateSpan";
import {EntrySummary} from "../services/ApiClient";
import {DiffLink} from "./DiffLink";
import {IncludedIcon} from "./IncludedIcon";

interface IEntryStatusProps {
  entry: EntrySummary
}

export const EntryStatus: FunctionComponent<IEntryStatusProps> = ({entry}) => {
  const initialVersion = entry.addedOn === entry.listAddedOn;

  return (
    <div>
      <IncludedIcon isIncluded={entry.removedVersionId === null}/>
      <DiffLink versionId={entry.addedVersionId} initialVersion={initialVersion}>
        <DateSpan date={entry.addedOn} altText={initialVersion ? 'Initial Version' : null} />
      </DiffLink> -
      <DiffLink versionId={entry.removedVersionId}>
        <DateSpan date={entry.removedOn} altText={entry.removedOn ? null : 'Current Version'} />
      </DiffLink>
    </div>
  );
}
