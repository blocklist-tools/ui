import React, {FunctionComponent} from "react";
import {VersionDiff} from "../../services/ApiClient";
import "./VersionDiffResponse.css";

interface IVersionDiffResponse {
  versionDiff: VersionDiff | null
}

export const VersionDiffResponse: FunctionComponent<IVersionDiffResponse> = (props: IVersionDiffResponse) =>  {
    if (!props.versionDiff) {
      return null;
    }

    if (props.versionDiff.lines.length === 0) {
      return (
        <section>
          Lists match!
        </section>
      )
    }

  const diffContent = props.versionDiff.lines.map((line, index) => {
    if (line === '---') {
      return (<div className={'line-break'} key={index}>---</div>);
    }
    let lineClass = 'existing-line';
    if (line.startsWith('-')) {
      lineClass = 'removed-line';
    }
    if (line.startsWith('+')) {
      lineClass = 'added-line';
    }
    return (<div key={index} className={lineClass}>{line}</div>)
  });

  return (
      <section className="component-version-diff-response basic-section">{diffContent}</section>
  );
};
