import React, {FunctionComponent} from "react";
import {DateSpan} from "./DateSpan";
import {EntrySummary} from "../services/ApiClient";
import {DiffLink} from "./DiffLink";
import {IncludedIcon} from "./IncludedIcon";

interface IEntryStatusProps {
  entry: EntrySummary
}

export const EntryStatus: FunctionComponent<IEntryStatusProps> = ({entry}) => {
  const initialVersion = entry.addedOn.toISOString() === entry.listAddedOn.toISOString();

  return (
    <div>
      <IncludedIcon isIncluded={entry.removedVersionId === null}/>
      <DiffLink versionId={entry.addedVersionId} initialVersion={initialVersion}>
        <DateSpan date={entry.addedOn}>
          {initialVersion ? 'Initial Version' : entry.addedOn.toDateString()}
        </DateSpan>
      </DiffLink>
      &nbsp;—&nbsp;
      <DiffLink versionId={entry.removedVersionId}>
        <DateSpan date={entry.removedOn}>
          {entry.removedOn ? entry.removedOn.toDateString() : 'Current Version'}
        </DateSpan>
      </DiffLink>
    </div>
  );
}
