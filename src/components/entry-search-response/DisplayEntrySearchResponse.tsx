import React, {FunctionComponent} from "react";
import {EntrySearchResponse, EntrySummary} from "../../services/ApiClient";
import "./DisplayEntrySearchResponse.css";
import {faCheck, faBan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

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

function diffLink(isInitialVersion: boolean, versionId: string|null, dateSpan: JSX.Element) {
  if (versionId && !isInitialVersion) {
    return (
      <Link to={{pathname: `/versions/${versionId}/diff`}}>{dateSpan}</Link>
    )
  }
  return dateSpan;
}

function includedIcon(entry: {removedVersionId: string|null}) {
  const isIncluded = entry.removedVersionId !== null;
  const className = [
    'included-icon',
    isIncluded ? 'is-removed' : 'is-included'
  ].join(' ');
  const icon = isIncluded ? faBan : faCheck;

  return (
    <span className={className}>
      <FontAwesomeIcon icon={icon} />
    </span>);
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

  const addedDate = dateSpan(entry.addedOn, initialVersion);
  const removedDate = dateSpan(entry.removedOn, stillBlocked);

  return (
    <div>
      {includedIcon(entry)}
      {diffLink(!!initialVersion, entry.addedVersionId, addedDate)} - {diffLink(false, entry.removedVersionId, removedDate)}
    </div>
  );
}

function warnOnNotFullyQualified(query: string) {
  if (query.indexOf('.') === -1) {
    return (
      <p>
        The search does not contain a dot in the name.
        Perhaps you forgot to include <strong>.com</strong> or another top level domain?
      </p>
    )
  }
}

export const DisplayEntrySearchResponse: FunctionComponent<IDisplayEntrySearchResponse> = (props: IDisplayEntrySearchResponse) => {
  if (!props.entrySearchResponse) {
    return null;
  }
  let content;
  if (props.entrySearchResponse.summaries.length === 0) {
    content = (
      <div>
        <p>
          No known list contains <strong>{props.entrySearchResponse.query}</strong>
        </p>

        {warnOnNotFullyQualified(props.entrySearchResponse.query)}
      </div>
    );
  } else {
    const listItems = props.entrySearchResponse.summaries.map((entry) => {
      return (
        <li key={entry.addedVersionId}>
          <Link className={'blocklist-name'} to={{pathname: `/blocklists/${entry.blocklistId}`}}>{entry.blocklistName}</Link>
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

      <div>
        Legend
        <ul>
          <li>
            {includedIcon({removedVersionId: null})}: Included the latest version of the list
          </li>
          <li>
            {includedIcon({removedVersionId: 'example'})}: Has been removed from the latest version of the list
          </li>
        </ul>
      </div>
    </section>
  );
};
