
import React, {FunctionComponent, useState} from "react";
import {SearchForm} from "./SearchForm";
import {SearchResponse} from "./SearchResponse";
import {useEntrySearch} from "../hooks/useEntrySearch";

export const SearchPage: FunctionComponent = () =>  {
  const [query, setQuery] = useState<string>('');

  const response = useEntrySearch(query)

  return (
    <>
      <SearchForm onSubmit={setQuery} />
      <SearchResponse entrySearchResponse={response}/>
    </>
  );
};
