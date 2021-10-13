import React, {FunctionComponent} from "react";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IIncludedIconProps {
  isIncluded: boolean
}

export const IncludedIcon: FunctionComponent<IIncludedIconProps> = ({isIncluded}) => {
  const className = [
    'included-icon',
    isIncluded ? 'is-included' : 'is-removed'
  ].join(' ');
  const icon = isIncluded ? faCheck : faBan;

  return (
    <span className={className}>
      <FontAwesomeIcon icon={icon} />
    </span>);
}
