import React, {FunctionComponent} from "react";
import {DiffLine, DiffSection, DiffTypes, VersionDiff} from "../Models";
import styles from "./VersionDiffResponse.module.css";

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
      lineClass = '';
    } else if (line.isSubtraction) {
      if (props.diffType === DiffTypes.ADDITION) {
        return;
      }
      lineSymbol = '-';
      lineClass = styles.removedLine;
    } else if (line.isAddition) {
      if (props.diffType === DiffTypes.SUBTRACTION) {
        return;
      }
      lineSymbol = '+';
      lineClass = styles.addedLine;
    }
    return (
      <div key={`line-${index}`} className={lineClass}>
        <span className={styles.lineStatus}>{lineSymbol}</span><span className={styles.line}>{line.value}</span>
      </div>
    );
  }

  function diffSection(section: DiffSection, index: number) {
    if (!section.hasAdditions && props.diffType === DiffTypes.ADDITION) {
      return;
    }
    if (!section.hasSubtractions && props.diffType === DiffTypes.SUBTRACTION) {
      return;
    }

    return (
      <section key={`section-${index}`} className="basic-section">
        {section.lines.map(diffLine)}
      </section>
    )
  }

  return (
    <div>
      {props.versionDiff.sections.map(diffSection)}
    </div>
  );
};
