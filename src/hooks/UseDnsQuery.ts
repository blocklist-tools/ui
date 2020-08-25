import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {DnsQuery} from "../services/ApiClient";

export function UseDnsQuery(domainName: string|null, queryType: string): DnsQuery|null {
  const [dnsQuery, setDnsQuery] = useState<DnsQuery|null>(null);

  function getExamDelivery(domainName: string, queryType: string) {
    ApiClient
      .dnsQuery(domainName, queryType)
      .then(applyDnsResponse);
  }

  function applyDnsResponse(dnsResponse: DnsQuery|ApiError) {
    if (dnsResponse instanceof ApiError) {
      return clearDnsQuery();
    }
    setDnsQuery(dnsResponse);
  }

  function clearDnsQuery() {
    setDnsQuery(null);
  }

  useEffect(() => {
    if (!domainName || !queryType) {
      return clearDnsQuery();
    }
    if (dnsQuery && dnsQuery.queryName?.toLowerCase() === domainName.toLowerCase() && dnsQuery.queryType === queryType) {
      return;
    }
    getExamDelivery(domainName, queryType);
  });

  return dnsQuery;
}
