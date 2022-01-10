import React, {FunctionComponent} from "react";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Theme, useTheme} from "../hooks/useTheme";
import styles from "./ToggleTheme.module.css";

export const ToggleTheme: FunctionComponent = () =>  {
  const [theme, setTheme] = useTheme();

  function className() {
    return theme === Theme.LIGHT ? styles.moon : styles.sun;
  }

  function icon() {
    return theme === Theme.LIGHT ? faMoon : faSun;
  }

  function onClick() {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <FontAwesomeIcon className={className()} icon={icon()} />
    </div>
  );
};
