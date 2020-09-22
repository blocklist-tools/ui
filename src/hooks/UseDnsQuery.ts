import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {DnsQuery} from "../services/ApiClient";

export function UseDnsQuery(domainName: string|null, queryType: string): DnsQuery|null {
  const [dnsQuery, setDnsQuery] = useState<String|null>(null);
  const [dnsQueryResponse, setDnsQueryResponse] = useState<DnsQuery|null>(null);

  function getDnsQuery(domainName: string, queryType: string) {
    clearDnsQuery();
    setDnsQuery(`${domainName.toLowerCase()} ${queryType.toLowerCase()}`);
    ApiClient
      .dnsQuery(domainName, queryType)
      .then(applyDnsResponse);
  }

  function applyDnsResponse(dnsResponse: DnsQuery|ApiError) {
    if (dnsResponse instanceof ApiError) {
      return setDnsQueryResponse(null);
    }
    setDnsQueryResponse(dnsResponse);
  }

  function clearDnsQuery() {
    setDnsQuery(null);
    setDnsQueryResponse(null);
  }

  useEffect(() => {
    if (!domainName || !queryType) {
      return clearDnsQuery();
    }
    if (dnsQuery === `${domainName.toLowerCase()} ${queryType.toLowerCase()}`) {
      return;
    }
    getDnsQuery(domainName, queryType);
  });

  return dnsQueryResponse;
}
