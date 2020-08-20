import React, {useState} from 'react';
import './App.css';
import {DnsQuery} from "./components/dns-query/DnsQuery";
import {UseDnsQuery} from "./hooks/UseDnsQuery";
import {SideNav} from "./components/side-nav/SideNav";
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import {DisplayDnsQuery} from "./components/dns-response/DisplayDnsQuery";

function App() {
  const [domainName, updateDomainName] = useState('');
  const [queryType, updateQueryType] = useState('A');
  const query = UseDnsQuery(domainName, queryType);

  function updateDnsQuery(name: string, type: string) {
    updateDomainName(name);
    updateQueryType(type);
  }

  return (
    <React.Fragment>
      <SideNav isOpen={true} />
      <Header />
      <main>
          <DnsQuery onSubmit={(name: string, type: string) => updateDnsQuery(name, type)} />
          <DisplayDnsQuery dnsQuery={query} />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
