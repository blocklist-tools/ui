import React, {FunctionComponent, useState} from "react";
import {SearchForm} from "./SearchForm";
import {SearchResponse} from "./SearchResponse";
import {useEntrySearch} from "../hooks/useEntrySearch";
import {DnsQueryForm} from "./DnsQueryForm";
import {useDnsQuery} from "../hooks/useDnsQuery";
import {DnsQueryTypes} from "../Models";

export const SearchPage: FunctionComponent = () =>  {
  const [query, setQuery] = useState<string>('');
  const [dnsType, setDnsType] = useState<DnsQueryTypes>(DnsQueryTypes.A);

  const entryResponse = useEntrySearch(query)
  const dnsResponse = useDnsQuery(query, dnsType)

  function dnsQueryForm() {
    if (!query || query.length < 1) {
      return;
    }
    return (
      <DnsQueryForm onSubmit={setDnsType}>
        <code>
          <pre>{dnsResponse?.response}</pre>
        </code>
      </DnsQueryForm>
    )
  }

  return (
    <>
      <SearchForm onSubmit={setQuery} />
      <SearchResponse entrySearchResponse={entryResponse}/>
      {dnsQueryForm()}
    </>
  );
};
