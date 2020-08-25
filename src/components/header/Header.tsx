import React, {FunctionComponent} from "react";
import "./Header.css"

export const Header: FunctionComponent = () =>  {
    return (
        <h1 className="component-header">
          <img className="avatar" src="/lightswitch05.png" alt="lightswitch05 avatar" />
          Blocklist Tools: <small><a href="https://github.com/lightswitch05/php-version-audit">Source on
          Github</a></small>
        </h1>
    );
};
