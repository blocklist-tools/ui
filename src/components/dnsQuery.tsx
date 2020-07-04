import React, {FunctionComponent} from "react";

interface IDnsQuery {
    domainName: string;
    queryType: string
    onChange: (arg0: string, arg1: string)=>void;
}

export const DnsQuery: FunctionComponent<IDnsQuery> = (props: IDnsQuery) =>  {
    function handleChangedDomainName(event: { target: HTMLInputElement; }) {
        props.onChange(event.target.value, props.queryType);
    }

    function handleChangedQueryType(event: { target: HTMLSelectElement; }) {
        props.onChange(props.domainName, event.target.value)
    }

    return (
        <div>
            <label>
                DNS Query
                <input
                    type="text"
                    spellCheck="false"
                    name="heartbeatTimeout"
                    value={props.domainName}
                    onChange={handleChangedDomainName}
                />
            </label>
            <label>
                Query Type
                <select value={props.queryType} onChange={handleChangedQueryType}>
                    <option>A</option>
                    <option>AAA</option>
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
        </div>
    );
};