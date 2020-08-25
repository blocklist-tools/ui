import React, {useState} from 'react';
import './App.css';
import {DnsQuery} from "./components/dns-query/DnsQuery";
import {UseDnsQuery} from "./hooks/UseDnsQuery";
import {SideNav} from "./components/side-nav/SideNav";
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import {DisplayDnsQuery} from "./components/dns-response/DisplayDnsQuery";
import {EntrySearch} from "./components/entry-search/EntrySearch";
import {DisplayEntrySearchResponse} from "./components/entry-search-response/DisplayEntrySearchResponse";
import {UseEntrySearch} from "./hooks/UseEntrySearch";

function App() {
  //const [domainName, updateDomainName] = useState('');
  const [queryType, updateQueryType] = useState('A');
  const [entrySearchQuery, updateEntrySearchQuery] = useState('');
  const query = UseDnsQuery(entrySearchQuery, queryType);
  const entrySearchResponse = UseEntrySearch(entrySearchQuery);

  function updateDnsQueryType(type: string) {
    updateQueryType(type);
  }

  function updateEntrySearch(query: string) {
      updateEntrySearchQuery(query);
  }

  return (
    <React.Fragment>
      <SideNav isOpen={true} />
      <Header />
      <main>
        <EntrySearch onSubmit={(searchQuery: string) => updateEntrySearch(searchQuery)} />
        <DisplayEntrySearchResponse entrySearchResponse={entrySearchResponse} />
        <DisplayDnsQuery dnsQuery={query} onQueryTypeChange={(newQueryType: string) => updateDnsQueryType(newQueryType)} />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
