import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import "./EntrySearch.css";
import {faSearch, faBackspace} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IEntrySearch {
  value: string
  onSubmit: (arg0: string) => void;
}

export const EntrySearch: FunctionComponent<IEntrySearch> = (props: IEntrySearch) => {
  const [query, setQuery] = useState(props.value);

  useEffect(() => {
    setQuery(props.value);
  }, [props.value]);

  const textInput = useRef<HTMLInputElement | null>(null);

  function handleChangedQuery(event: { target: HTMLInputElement; }) {
    setQuery(event.target.value.trim().toLowerCase());
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let hostname = query;
    try {
      hostname = new URL(hostname).hostname
    } catch (e) {
    }
    props.onSubmit(hostname);
  }

  function handleClear() {
    setQuery('');
    props.onSubmit('');
    textInput?.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className={"component-entry-search"}>
      <label hidden htmlFor="entry-search-input">URL Search</label>
      <input
        autoFocus
        ref={textInput}
        id="entry-search-input"
        title="Search for domain name or URL"
        type="text"
        spellCheck="false"
        autoCapitalize="false"
        autoCorrect="false"
        autoComplete="false"
        autoSave="false"
        name="urlSearch"
        placeholder="Domain or URL"
        value={query}
        onChange={handleChangedQuery}
      />
      <button type="button" title="Clear form" onClick={handleClear}><FontAwesomeIcon icon={faBackspace} /></button>
      <button type={"submit"}><FontAwesomeIcon icon={faSearch} /></button>
    </form>
  );
};
