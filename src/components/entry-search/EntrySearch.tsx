import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import "./EntrySearch.css";

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
        name="urlSearch"
        placeholder="Domain or URL"
        value={query}
        onChange={handleChangedQuery}
      />
      <button type="button" title="Clear form" onClick={handleClear}>&#9003;</button>
      <button type={"submit"}>&#128269;</button>
    </form>
  );
};
