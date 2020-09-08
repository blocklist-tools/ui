import React, {FunctionComponent} from "react";
import {EntrySearchResponse, EntrySummary} from "../../services/ApiClient";
import "./DisplayEntrySearchResponse.css";

interface IDisplayEntrySearchResponse {
  entrySearchResponse: EntrySearchResponse | null
}

function dateSpan(date: Date|null, altText: string | null) {
  let text = '';
  let title = null;
  if (date) {
    text = date.toDateString();
    title = date.toISOString();
  }
  if (altText) {
    text = altText;
  }
  title = title || text;
  return (<span title={title}>{text}</span>)
}

function includedIcon(entry: EntrySummary) {
  const isIncluded = entry.removedVersionId !== null;
  const className = [
    'included-icon',
    isIncluded ? 'is-removed' : 'is-included'
  ].join(' ');
  const icon = isIncluded ? '🚫' : '✔';

  return (<span className={className}>{icon}</span>);
}

function entryStatus(entry: EntrySummary) {
  let stillBlocked = null;
  if (!entry.removedOn) {
    stillBlocked = 'Current Version';
  }
  let initialVersion = null;
  if (entry.addedOn.toISOString() === entry.listAddedOn.toISOString()) {
    initialVersion = 'Initial Version';
  }
  return (
    <div>
      {includedIcon(entry)}
      <a href={`/versions/${entry.addedVersionId}/diff`}>
        {dateSpan(entry.addedOn, initialVersion)}
      </a>
      -
      <a href={`/versions/${entry.removedVersionId}/diff`}>
        {dateSpan(entry.removedOn, stillBlocked)}
      </a>
    </div>
  );
}

export const DisplayEntrySearchResponse: FunctionComponent<IDisplayEntrySearchResponse> = (props: IDisplayEntrySearchResponse) => {
  if (!props.entrySearchResponse) {
    return null;
  }
  let content;
  if (props.entrySearchResponse.summaries.length === 0) {
    content = (
      <div>No known list contains {props.entrySearchResponse.query}</div>
    );
  } else {
    const listItems = props.entrySearchResponse.summaries.map((entry) => {
      return (
        <li key={entry.addedVersionId}>
          <div className={'blocklist-name'}>{entry.blocklistName}</div>
          {entryStatus(entry)}
        </li>
      );
    });
    content = (
      <div>
        <p>Blocklists that contain a matching entry, including the date it was first added, and optionally removed.</p>
        <ul>{listItems}</ul>
      </div>
    )
  }

  return (
    <section className={'component-display-entry-search-response basic-section'}>
      <h2>
        Lists containing {props.entrySearchResponse.query}
      </h2>
      {content}
    </section>
  );
};
