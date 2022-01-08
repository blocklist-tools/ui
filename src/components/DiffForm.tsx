import React, {FunctionComponent, useCallback} from "react";
import {useSearchParams} from "react-router-dom";
import {DiffTypes} from "../Models";

interface DiffFormProps {
  onSubmit: (arg0: DiffTypes) => void;
}

export const DiffForm: FunctionComponent<DiffFormProps> = ({onSubmit}) =>  {
  const [searchParams, setSearchParams] = useSearchParams();
  const getDiffType = useCallback(() => {
    return normalize(searchParams.get('d') || '');
  }, [searchParams]);

  function normalize(diffInput: string): DiffTypes {
    diffInput = diffInput.toLowerCase();
    if (Object.values(DiffTypes).includes(diffInput as DiffTypes)) {
      return diffInput as DiffTypes;
    }
    return DiffTypes.INTERSECTION;
  }

  function handleChange(event: { target: HTMLSelectElement; }) {
    setQueryParams(event.target.value as DiffTypes);
    onSubmit(event.target.value as DiffTypes);
  }

  function setQueryParams(value: string) {
    const normalizedValue = normalize(value);
    searchParams.delete('d');
    if (normalizedValue !== DiffTypes.INTERSECTION) {
      searchParams.set('d', normalizedValue);
    }
    setSearchParams(searchParams);
  }

  return (
    <section>
      <label hidden htmlFor="diff-type">Diff Type</label>
      <select id="diff-type" value={getDiffType()} onChange={handleChange}>
        <option value={DiffTypes.INTERSECTION}>Full diff</option>
        <option value={DiffTypes.SUBTRACTION}>Removed only</option>
        <option value={DiffTypes.ADDITION}>Added only</option>
      </select>
    </section>
  );
};
