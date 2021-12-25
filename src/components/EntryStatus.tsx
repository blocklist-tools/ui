import React, {FunctionComponent, useState} from "react";
import {DateSpan} from "./DateSpan";
import {IncludedIcon} from "./IncludedIcon";
import {EntrySummary} from "../Models";
import {DiffLink} from "./DiffLink";

interface IEntryStatusProps {
  entry: EntrySummary
}

const INITIAL_VERSION_TEXT = 'Initial Version';

export const EntryStatus: FunctionComponent<IEntryStatusProps> = ({entry}) => {
  const isInitialVersion = entry.addedOn.toISOString() === entry.listAddedOn.toISOString();
  let [startSpanText, setStartSpanText] = useState<string>(isInitialVersion ? INITIAL_VERSION_TEXT : entry.addedOn.toDateString());

  function toggleInitialText() {
    startSpanText === INITIAL_VERSION_TEXT ? setStartSpanText(entry.addedOn.toDateString()) : setStartSpanText(INITIAL_VERSION_TEXT);
  }

  return (
    <div>
      <IncludedIcon isIncluded={entry.removedVersionId === null}/>
      <DiffLink versionId={entry.addedVersionId} initialVersion={isInitialVersion}>
        <DateSpan date={entry.addedOn}>
          <span onClick={toggleInitialText} className={'clickable'}>
            {startSpanText}
          </span>
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
