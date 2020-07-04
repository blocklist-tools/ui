import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {DnsQuery} from "../services/ApiClient";

export function useDnsQuery(domainName: string, queryType: string): DnsQuery|null {
    const [dnsQuery, setDnsQuery] = useState<DnsQuery|null>(null);

    function getExamDelivery(domainName: string, queryType: string) {
        ApiClient
            .dnsQuery(domainName, queryType)
            .then(applyDnsResponse);
    }

    function applyDnsResponse(dnsResponse: DnsQuery|ApiError) {
        if (dnsResponse instanceof ApiError) {
            return setDnsQuery(null);
        }
        setDnsQuery(dnsResponse);
    }

    useEffect(() => {
        if (!domainName || !queryType) {
            return;
        }
        if (dnsQuery && dnsQuery.queryName === domainName && dnsQuery.queryType === queryType) {
            return;
        }
        getExamDelivery(domainName, queryType);
    });

    return dnsQuery;
}