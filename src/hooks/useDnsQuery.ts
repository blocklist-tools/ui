import {useState, useEffect} from 'react';
import ApiClient from "../BlocklistToolsApi";
import {DnsQueryResponse, DnsQueryTypes} from "../Models";

export function useDnsQuery(domainName: string, queryType: DnsQueryTypes): DnsQueryResponse | null {
  const [queryResponse, setQueryResponse] = useState<DnsQueryResponse | null>(null);

  const query = (name: string, type: string) => {
    clearResponse();
    ApiClient
      .dnsQuery(name, type)
      .then(setQueryResponse);
  }

  function clearResponse() {
    setQueryResponse(null);
  }

  useEffect(() => {
    if (!domainName || domainName.trim().length === 0 || !queryType || queryType.trim().length === 0) {
      return clearResponse();
    }
    query(domainName.toLowerCase().trim(), queryType.toUpperCase().trim());
  }, [domainName, queryType]);

  return queryResponse;
}
