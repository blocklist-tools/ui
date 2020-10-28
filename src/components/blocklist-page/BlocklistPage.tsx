import React, {FunctionComponent} from "react";
import {useParams} from "react-router-dom";
import {UseBlocklist} from "../../hooks/UseBlocklist";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faFileDownload, faGavel, faHome} from "@fortawesome/free-solid-svg-icons";

export const BlocklistPage: FunctionComponent = () =>  {
  const { blocklistId } = useParams() as any;
  const blocklist = UseBlocklist(blocklistId);

  if (!blocklist) {
    return <div />
  }

  return (
    <section className={"component-blocklist-page basic-section"}>
      <h2>
        {blocklist.name}
      </h2>
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
};
