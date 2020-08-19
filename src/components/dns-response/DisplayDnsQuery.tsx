import React, {FunctionComponent} from "react";
import {DnsQuery} from "../../services/ApiClient";
import "./DisplayDnsQuery.css";

interface IDisplayDnsQuery {
    dnsQuery: DnsQuery|null,
    onQueryTypeChange: (arg0: string)=>void;
}

export const DisplayDnsQuery: FunctionComponent<IDisplayDnsQuery> = (props: IDisplayDnsQuery) =>  {
    function handleChangedQueryType(event: { target: HTMLSelectElement; }) {
        props.onQueryTypeChange(event.target.value);
    }

    if (!props.dnsQuery) {
        return null;
    }
    return (
        <section className={"component-display-dns-query"}>
            <h2>
                DNS Query
                <label hidden htmlFor="dns-query-select">Query Type</label>
                <select id="dns-query-select" value={props.dnsQuery.queryType} onChange={handleChangedQueryType}>
                    <option>A</option>
                    <option>AAAA</option>
                    <option>CAA</option>
                    <option>CNAME</option>
                    <option>MX</option>
                    <option>NS</option>
                    <option>PTR</option>
                    <option>SOA</option>
                    <option>SRV</option>
                    <option>TXT</option>
                </select>
            </h2>
            <code>
                <pre>{props.dnsQuery.response}</pre>
            </code>
        </section>

    );
};