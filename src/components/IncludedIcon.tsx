import React, {FunctionComponent} from "react";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './IncludedIcon.module.css';

interface IncludedIconProps {
  isIncluded: boolean
}

export const IncludedIcon: FunctionComponent<IncludedIconProps> = ({isIncluded}) => {
  const className = [
    styles.includedIcon,
    isIncluded ? styles.isIncluded : styles.isRemoved
  ].join(' ');
  const icon = isIncluded ? faCheck : faBan;

  return (
    <span className={className}>
      <FontAwesomeIcon icon={icon} />
    </span>);
}
