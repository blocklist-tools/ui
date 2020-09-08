import React, {FunctionComponent} from "react";
import "./HeaderNav.css";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faListUl} from '@fortawesome/free-solid-svg-icons'

export const HeaderNav: FunctionComponent = () =>  {
  return (
    <nav className="component-header-nav">
      <ul>
        <li><NavLink to="/entries/search"><FontAwesomeIcon icon={faSearch} /> Search</NavLink></li>
        <li><NavLink to="/blocklists"><FontAwesomeIcon icon={faListUl} /> Blocklists</NavLink></li>
      </ul>
    </nav>
  );
};
