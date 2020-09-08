import React, {FunctionComponent} from "react";
import "./Header.css"

export const Header: FunctionComponent = () =>  {
    return (
        <h1 className="component-header">
          <a href="https://www.github.developerdan.com/">
            <img className="avatar" src="/lightswitch05.png" alt="lightswitch05 avatar" />
          </a>
          Blocklist Tools: <small><a href="https://github.com/blocklist-tools">Source on
          Github</a></small>
        </h1>
    );
};
