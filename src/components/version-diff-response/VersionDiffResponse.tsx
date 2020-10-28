import React, {FunctionComponent} from "react";
import {DiffLine, DiffSection, VersionDiff} from "../../services/ApiClient";
import "./VersionDiffResponse.css";

interface IVersionDiffResponse {
  versionDiff: VersionDiff | null,
  diffType: string
}

export const VersionDiffResponse: FunctionComponent<IVersionDiffResponse> = (props: IVersionDiffResponse) => {
  if (!props.versionDiff) {
    return (
      <section>
        Doing a list diff is <strong>very slow</strong>. Please be patient...
      </section>
    )
  }

  if (props.versionDiff.sections.length === 0) {
    return (
      <section>
        Lists match!
      </section>
    )
  }

  function diffLine(line: DiffLine, index: number) {
    let lineSymbol;
    let lineClass;
    if (line.isNeutral) {
      lineSymbol = '\u00A0';
      lineClass = 'existing-line';
    } else if (line.isSubtraction) {
      if (props.diffType === 'addition') {
        return;
      }
      lineSymbol = '-';
      lineClass = 'removed-line';
    } else if (line.isAddition) {
      if (props.diffType === 'subtraction') {
        return;
      }
      lineSymbol = '+';
      lineClass = 'added-line';
    }
    return (
      <div key={`line-${index}`} className={lineClass}>
        <span className="line-status">{lineSymbol}</span><span className="line">{line.value}</span>
      </div>
    );
  }

  function diffSection(section: DiffSection, index: number) {
    if (!section.hasAdditions && props.diffType === 'addition') {
      return;
    }
    if (!section.hasSubtractions && props.diffType === 'subtraction') {
      return;
    }

    const lines = section.lines.map(diffLine);
    return (
      <section key={`section-${index}`} className="component-version-diff-response basic-section">
        {lines}
      </section>
    )
  }

  const diffContent = props.versionDiff.sections.map(diffSection);

  return (
    <div>
      {diffContent}
    </div>

  );
};
