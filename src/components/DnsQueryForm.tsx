import React, {FunctionComponent, useCallback} from "react";
import {SelectDnsQueryType} from "./SelectDnsQueryType";
import {DnsQueryTypes} from "../Models";
import {useSearchParams} from "react-router-dom";

const VALID_TYPES = new Set(Object.keys(DnsQueryTypes));

interface DnsQueryFormProps {
  onSubmit: (arg0: DnsQueryTypes) => void;
  children?: React.ReactNode;
}

export const DnsQueryForm: FunctionComponent<DnsQueryFormProps> = ({onSubmit, children}) =>  {
  const [searchParams, setSearchParams] = useSearchParams();
  const getQueryType = useCallback(() => {
    return normalize(searchParams.get('t') || '');
  }, [searchParams]);

  function normalize(typeInput: string): DnsQueryTypes {
    typeInput = typeInput.toUpperCase();
    if (VALID_TYPES.has(typeInput)) {
      return typeInput as DnsQueryTypes;
    }
    return DnsQueryTypes.A;
  }

  function handleChange(queryType: DnsQueryTypes) {
    setQueryParams(queryType);
    onSubmit(queryType);
  }

  function setQueryParams(value: string) {
    const normalizedValue = normalize(value);
    searchParams.delete('t');
    if (normalizedValue !== DnsQueryTypes.A) {
      searchParams.set('t', normalizedValue);
    }
    setSearchParams(searchParams);
  }

  return (
    <section className="basic-section">
      <h2>
        DNS Query <SelectDnsQueryType value={getQueryType()} onChange={handleChange} />
      </h2>
      {children}
    </section>
  );
};
