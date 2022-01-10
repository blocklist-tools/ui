import React, {FunctionComponent} from "react";
import styles from "./Header.module.css";

export const Header: FunctionComponent = () =>  {
  return (
    <h1 className={styles.container}>
      <a href="https://www.github.developerdan.com/">
        <img className={styles.avatar} src="/lightswitch05.svg" alt="" />
      </a>
      Blocklist Tools: <small><a href="https://github.com/blocklist-tools">Source on Github</a></small>
    </h1>
  );
};
