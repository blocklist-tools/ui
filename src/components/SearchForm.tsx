import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {faBackspace, faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSearchParams} from "react-router-dom";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSubmit: (arg0: string) => void;
}

export const SearchForm: FunctionComponent<SearchFormProps> = ({onSubmit}) =>  {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const textInput = useRef<HTMLInputElement | null>(null);

  function handleChangedQuery(event: { target: HTMLInputElement; }) {
    setQuery(event.target.value.replace(/\s/g,'').toLowerCase());
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let hostname = query;
    try {
      hostname = new URL(hostname).hostname
    } catch (e) {
    }
    setQueryParams(hostname || '');
    onSubmit(hostname);
  }

  function handleClear() {
    setQuery('');
    onSubmit('');
    textInput?.current?.focus();
    setQueryParams('');
  }

  function setQueryParams(value: string) {
    searchParams.delete('q');
    if (value.length > 0) {
      searchParams.set('q', value);
    }
    setSearchParams(searchParams)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label hidden htmlFor="entry-search-input">URL Search</label>
      <input
        autoFocus
        ref={textInput}
        id="entry-search-input"
        title="Search for domain name or URL"
        type="search"
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
