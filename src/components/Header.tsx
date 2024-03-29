import React, {FunctionComponent} from "react";
import styles from "./Header.module.css";

export const Header: FunctionComponent = () =>  {
  return (
    <h1 className={styles.container}>
      <a href="https://www.github.developerdan.com/">
        <svg className={styles.avatar} viewBox="0 0 100 100" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">
          <path fill="#e9e9e9" d="M29 18.5 39.5 8 50 18.5 39.5 29zm21 0L60.5 8 71 18.5 60.5 29zm-42 21L18.5 29 29 39.5 18.5 50zm0 21L18.5 50 29 60.5 18.5 71zm63-21L81.5 29 92 39.5 81.5 50zm0 21L81.5 50 92 60.5 81.5 71zm-42 21L39.5 71 50 81.5 39.5 92zm21 0L60.5 71 71 81.5 60.5 92z"/>
          <path fill="#585858" d="M8 29 29 8v21zm0 42 21 21V71zm63-42V8l21 21zm0 42v21l21-21z"/>
          <path fill="#68cfb7" d="M52 52h14v14H52zm-18 0h14v14H34zm0-18h14v14H34zm18 0h14v14H52z"/>
        </svg>
      </a>
      Blocklist Tools: <small><a href="https://github.com/blocklist-tools">Source on Github</a></small>
    </h1>
  );
};
