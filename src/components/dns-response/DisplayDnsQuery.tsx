import React, {FunctionComponent} from "react";
import {DnsQuery} from "../../services/ApiClient";

interface IDisplayDnsQuery {
    dnsQuery: DnsQuery|null
}

export const DisplayDnsQuery: FunctionComponent<IDisplayDnsQuery> = (props: IDisplayDnsQuery) =>  {
    if (!props.dnsQuery) {
        return null;
    }
    return (
        <code>
            <pre>{props.dnsQuery.response}</pre>
        </code>
    );
};