import React, {FunctionComponent, useState} from "react";
import "./SideNav.css"

interface ISideNav {
    isOpen: boolean;
}

export const SideNav: FunctionComponent<ISideNav> = (props: ISideNav) =>  {
    const [isOpen, setIsOpen] = useState(false);
    const className = [
        'component-side-nav',
        isOpen ? 'nav-open' : 'nav-closed'
    ].join(' ');

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <aside className={className}>
            <ul>
                <li className="avatar">
                    <a href="https://www.github.developerdan.com/">
                        <img src="../lightswitch05.png" alt="lightswitch05 avatar" />
                    </a>
                </li>
                <li>URL Lookup</li>
                <li>Blocklist Lookup</li>
            </ul>
        </aside>
    );
};