import React, {FunctionComponent} from "react";
import {Blocklist} from "../../services/ApiClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGavel, faHome, faFileDownload, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import "./BlocklistsTable.css";
import {Link} from "react-router-dom";

interface IBlocklistsTable {
  blocklists: Blocklist[] | null;
}

export const BlocklistsTable: FunctionComponent<IBlocklistsTable> = (props: IBlocklistsTable) => {
  if (!props.blocklists) {
    return <div />
  }
  let table = props.blocklists.map((blocklist) => {
    return (
      <section className='blocklist-card' key={blocklist.id}>
        <Link className={'blocklist-name'} to={{pathname: `/blocklists/${blocklist.id}`}}>{blocklist.name}</Link>
        <ul className='blocklist-table-details-list'>
          <li>
            <a href={blocklist.homepageUrl} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon className='fa-fw' icon={faHome} />
              Homepage
            </a>
          </li>
          <li>
            <a href={blocklist.downloadUrl} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon className='fa-fw' icon={faFileDownload} />
              Download - {blocklist.format}
            </a>
          </li>
          <li>
            <a href={blocklist.issuesUrl} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon className='fa-fw' icon={faExclamationCircle} />
              Issues
            </a>
          </li>
          <li>
            <a href={blocklist.licenseUrl} rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon className='fa-fw' icon={faGavel}/>
              {blocklist.licenseType}
            </a>
          </li>
        </ul>
      </section>
    );
  })

  return (
    <section className='component-blocklist-table'>
      {table}
    </section>
  );
}
