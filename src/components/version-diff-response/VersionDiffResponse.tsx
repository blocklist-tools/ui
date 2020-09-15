import React, {FunctionComponent} from "react";
import {VersionDiff} from "../../services/ApiClient";
import "./VersionDiffResponse.css";

interface IVersionDiffResponse {
  versionDiff: VersionDiff | null
}

export const VersionDiffResponse: FunctionComponent<IVersionDiffResponse> = (props: IVersionDiffResponse) => {
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

  const diffContent = [];
  for (let i=0; i < props.versionDiff.lines.length; i++) {
    let line = props.versionDiff.lines[i];
    if (line.trim().length === 0) {
      continue;
    }
    if (line === '---') {
      if (i !== 0 && i < props.versionDiff.lines.length - 2) {
        diffContent.push(<div className={'line-break'} key={i}>---</div>);
      }
      continue;
    }

    let first = '\u00A0';
    let lineClass = 'existing-line';
    if (line.startsWith('-')) {
      first = '-';
      lineClass = 'removed-line';
    }
    if (line.startsWith('+')) {
      first = '+'
      lineClass = 'added-line';
    }
    line = line.substring(1);
    diffContent.push(
      <div key={i} className={lineClass}>
        <span className="line-status">{first}</span><span className="line">{line}</span>
      </div>
    )
  }

  return (
      <section className="component-version-diff-response basic-section">{diffContent}</section>
  );
};
