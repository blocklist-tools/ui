
import React, {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faListUl, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import styles from "./MainNav.module.css";
import {ToggleTheme} from "./ToggleTheme";

export const MainNav: FunctionComponent = () =>  {
  return (
    <nav className={styles.container}>
      <ul className={styles.outer}>
        <li>
          <ul className={styles.buttons}>
            <li><NavLink to="/entries/search"><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</NavLink></li>
            <li><NavLink to="/blocklists"><FontAwesomeIcon icon={faListUl} /> Blocklists</NavLink></li>
            <li><NavLink to="/about"><FontAwesomeIcon icon={faCircleInfo} /> About</NavLink></li>
          </ul>
        </li>
        <li className={styles.right}>
          <ToggleTheme />
        </li>
      </ul>
    </nav>
  );
};
