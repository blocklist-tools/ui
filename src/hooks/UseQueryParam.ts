import {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";

export function UseQueryParam<T>(paramName: string, defaultValue: T): T {
  const [queryParamState, setQueryParamState] = useState<T>(defaultValue);
  const queryParam = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const value = queryParam.get(paramName) || defaultValue;
    if (value !== queryParamState) {
      console.log('setting query to ', value);
      setQueryParamState(value as T);
    }
  });

  return queryParamState;
}
