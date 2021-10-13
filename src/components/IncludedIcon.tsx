import React, {FunctionComponent} from "react";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IIncludedIconProps {
  isIncluded: boolean
}

export const IncludedIcon: FunctionComponent<IIncludedIconProps> = ({isIncluded}) => {
  const className = [
    'included-icon',
    isIncluded ? 'is-removed' : 'is-included'
  ].join(' ');
  const icon = isIncluded ? faBan : faCheck;

  return (
    <span className={className}>
      <FontAwesomeIcon icon={icon} />
    </span>);
}
