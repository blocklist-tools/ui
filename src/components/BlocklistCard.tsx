import {FunctionComponent} from "react";
import {Blocklist} from "../Models";
import {faCodeBranch, faExclamationCircle, faFileDownload, faGavel, faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './BlocklistCard.module.css';
import {Link} from "react-router-dom";

interface BlocklistCardProps {
  blocklist: Blocklist
}

export const BlocklistCard: FunctionComponent<BlocklistCardProps> = ({blocklist}) =>  {
  return (
    <section className={`${styles.container} basic-section`} key={blocklist.id}>
      <h2>{blocklist.name}</h2>
      <ul className={'fa-ul'}>
        <li>
          <Link to={{pathname: `/blocklists/${blocklist.id}`}}>
            <FontAwesomeIcon className={'fa-li'} icon={faCodeBranch} /> Versions
          </Link>
        </li>
        <li>
          <a href={blocklist.homepageUrl} rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon className={'fa-li'} icon={faHome} /> Homepage
          </a>
        </li>
        <li>
          <a href={blocklist.downloadUrl} rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon className={'fa-li'} icon={faFileDownload} /> Download - {blocklist.format}
          </a>
        </li>
        <li>
          <a href={blocklist.issuesUrl} rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon className={'fa-li'} icon={faExclamationCircle} /> Issues
          </a>
        </li>
        <li>
          <a href={blocklist.licenseUrl} rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon className={'fa-li'} icon={faGavel}/> {blocklist.licenseType}
          </a>
        </li>
      </ul>
    </section>
  );
};
