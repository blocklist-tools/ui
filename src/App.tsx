import React, {useState} from 'react';
import './App.css';
import {DnsQuery} from "./components/dnsQuery";
import {useDnsQuery} from "./hooks/useDnsQuery";

function App() {
  const [domainName, updateDomainName] = useState('');
  const [queryType, updateQueryType] = useState('A');
  const query = useDnsQuery(domainName, queryType);

  function updateDnsQuery(name: string, type: string) {
    updateDomainName(name);
    updateQueryType(type);
  }

  return (
    <div className="App">
      <DnsQuery onSubmit={(name: string, type: string) => updateDnsQuery(name, type)} />
      <pre>
        {query?.response}
      </pre>
    </div>
  );
}

export default App;
