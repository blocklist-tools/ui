import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from "react";
import {faBackspace, faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSearchParams} from "react-router-dom";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSubmit: (arg0: string) => void;
}

export const SearchForm: FunctionComponent<SearchFormProps> = ({onSubmit}) =>  {
  const [searchParams, setSearchParams] = useSearchParams();
  const getQueryParam = useCallback(() => {
    return normalize(searchParams.get('q') || '');
  }, [searchParams]);
  const [query, setQuery] = useState<string>(getQueryParam());

  useEffect(() => {
    const updatedQuery = getQueryParam();
    setQuery(updatedQuery);
    onSubmit(updatedQuery);
  }, [getQueryParam, onSubmit]);

  const textInput = useRef<HTMLInputElement | null>(null);

  function handleChangedQuery(event: { target: HTMLInputElement; }) {
    setQuery(normalize(event.target.value));
  }

  function normalize(searchInput: string) {
    try {
      searchInput = new URL(searchInput).hostname
    } catch (e) {}
    return searchInput.replace(/\s/g,'').toLowerCase();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const normalized = normalize(query)
    setQueryParams(normalized);
    onSubmit(normalized);
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
