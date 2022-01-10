import React, {FunctionComponent} from "react";
import {DnsQueryTypes} from "../Models";

interface SelectDnsQueryProps {
  onChange: (arg0: DnsQueryTypes) => void;
  value: DnsQueryTypes
}

export const SelectDnsQueryType: FunctionComponent<SelectDnsQueryProps> = ({onChange, value}) =>  {
  function handleChange(event: { target: HTMLSelectElement; }) {
    onChange(event.target.value as DnsQueryTypes);
  }

  const queryOptions = Object.keys(DnsQueryTypes).map((type) => {
    return <option key={type}>{type}</option>
  });

  return (
    <>
      <label hidden htmlFor="dns-query-select">DNS Query Type</label>
      <select id="dns-query-select" aria-label={"DNS Query Type"} value={value} onChange={handleChange}>
        {queryOptions}
      </select>
    </>
  );
};
