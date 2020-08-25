import React, {FunctionComponent, useState} from "react";

interface IDnsQuery {
    onSubmit: (arg0: string, arg1: string)=>void;
}

export const DnsQuery: FunctionComponent<IDnsQuery> = (props: IDnsQuery) =>  {
    const [domainName, setDomainName] = useState('');
    const [queryType, setQueryType] = useState('A');

    function handleChangedDomainName(event: { target: HTMLInputElement; }) {
        setDomainName(event.target.value);
    }

    function handleChangedQueryType(event: { target: HTMLSelectElement; }) {
        setQueryType(event.target.value);
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        props.onSubmit(domainName, queryType);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                DNS Query
                <input
                    type="text"
                    spellCheck="false"
                    name="dnsQueryDomainName"
                    placeholder="example.com"
                    value={domainName}
                    onChange={handleChangedDomainName}
                />
            </label>
            <label>
                Query Type
                <select value={queryType} onChange={handleChangedQueryType}>
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
            </label>
            <button type={"submit"}>Query</button>
        </form>
    );
};