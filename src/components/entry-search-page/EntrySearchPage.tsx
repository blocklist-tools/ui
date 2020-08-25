import React, {FunctionComponent, useState} from "react";
import {EntrySearch} from "../entry-search/EntrySearch";
import {DisplayEntrySearchResponse} from "../entry-search-response/DisplayEntrySearchResponse";
import {DisplayDnsQuery} from "../dns-response/DisplayDnsQuery";
import {UseDnsQuery} from "../../hooks/UseDnsQuery";
import {UseEntrySearch} from "../../hooks/UseEntrySearch";
import {useHistory, useLocation} from "react-router-dom";

export const EntrySearchPage: FunctionComponent = () =>  {
  const queryParam = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const query = queryParam.get('q');
  const [queryType, updateQueryType] = useState('A');
  const queryResponse = UseDnsQuery(query, queryType);
  const entrySearchResponse = UseEntrySearch(query);

  function updateDnsQueryType(type: string) {
    updateQueryType(type);
  }

  function updateEntrySearch(query: string) {
    history.push("/entries/search?q=" + encodeURIComponent(query));
  }

  return (
    <div>
      <EntrySearch value={query} onSubmit={(searchQuery: string) => updateEntrySearch(searchQuery)} />
      <DisplayEntrySearchResponse entrySearchResponse={entrySearchResponse} />
      <DisplayDnsQuery dnsQuery={queryResponse} onQueryTypeChange={(newQueryType: string) => updateDnsQueryType(newQueryType)} />
    </div>
  );
};
