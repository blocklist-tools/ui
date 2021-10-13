import React, {FunctionComponent} from "react";
import {EntrySearchResponse} from "../../services/ApiClient";
import "./DisplayEntrySearchResponse.css";
import {faCheck, faBan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {EntryStatus} from "../EntryStatus";
import {IncludedIcon} from "../IncludedIcon";

interface IDisplayEntrySearchResponse {
  entrySearchResponse: EntrySearchResponse | null
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
          <EntryStatus entry={entry} />
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
            <IncludedIcon isIncluded={true}/>: Included the latest version of the list
          </li>
          <li>
            <IncludedIcon isIncluded={false}/>: Has been removed from the latest version of the list
          </li>
        </ul>
      </div>
    </section>
  );
};
