import {FunctionComponent} from "react";
import {EntrySearchResponse} from "../Models";
import {IncludedIcon} from "./IncludedIcon";
import {Link} from "react-router-dom";
import {EntryStatus} from "./EntryStatus";
import styles from "./SearchResponse.module.css";

interface SearchResponseProps {
  entrySearchResponse: EntrySearchResponse | null
}

export const SearchResponse: FunctionComponent<SearchResponseProps> = ({entrySearchResponse}) =>  {
  if (!entrySearchResponse) {
    return null;
  }

  if (entrySearchResponse.summaries.length === 0) {
    return (
      <div>
        <p>
          No known list contains <strong>{entrySearchResponse.query}</strong>
        </p>
      </div>
    );
  }

  const listItems = entrySearchResponse.summaries.map((entry) => {
    return (
      <li key={entry.addedVersionId} className={styles.listEntry}>
        <Link className={styles.listName} to={{pathname: `/blocklists/${entry.blocklistId}`}}>{entry.blocklistName}</Link>
        <EntryStatus entry={entry} />
      </li>
    );
  });

  return (
    <section className={"basic-section"}>
      <h2>
        Lists containing {entrySearchResponse.query}
      </h2>

      <div>
        <p>Blocklists that contain a matching entry, including the date it was first added, and optionally removed.</p>
        <ul>{listItems}</ul>
      </div>

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
