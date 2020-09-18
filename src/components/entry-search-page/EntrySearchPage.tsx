import React, {FunctionComponent, useState} from "react";
import {EntrySearch} from "../entry-search/EntrySearch";
import {DisplayEntrySearchResponse} from "../entry-search-response/DisplayEntrySearchResponse";
import {DisplayDnsQuery} from "../dns-response/DisplayDnsQuery";
import {UseDnsQuery} from "../../hooks/UseDnsQuery";
import {UseEntrySearch} from "../../hooks/UseEntrySearch";
import {useHistory} from "react-router-dom";
import {UseQueryParam} from "../../hooks/UseQueryParam";

export const EntrySearchPage: FunctionComponent = () =>  {
  const query = UseQueryParam('q', '');
  const [queryType, updateQueryType] = useState('A');
  const queryResponse = UseDnsQuery(query, queryType);
  const entrySearchResponse = UseEntrySearch(query);
  const history = useHistory();

  function updateDnsQueryType(type: string) {
    updateQueryType(type);
  }

  function updateEntrySearch(query: string) {
    if (query && query.length > 0) {
      let queryString = '?q=' + encodeURIComponent(query);
      history.push("/entries/search" + queryString);
    }
  }

  return (
    <div>
      <EntrySearch value={query} onSubmit={(searchQuery: string) => updateEntrySearch(searchQuery)} />
      <DisplayEntrySearchResponse entrySearchResponse={entrySearchResponse} />
      <DisplayDnsQuery dnsQuery={queryResponse} onQueryTypeChange={(newQueryType: string) => updateDnsQueryType(newQueryType)} />
    </div>
  );
};
