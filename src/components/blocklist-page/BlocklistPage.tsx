import React, {FunctionComponent} from "react";
import {Link, useParams} from "react-router-dom";
import {UseBlocklist} from "../../hooks/UseBlocklist";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faFileDownload, faGavel, faHome} from "@fortawesome/free-solid-svg-icons";
import {UseVersions} from "../../hooks/UseVersions";

export const BlocklistPage: FunctionComponent = () =>  {
  const { blocklistId } = useParams() as any;
  const blocklist = UseBlocklist(blocklistId);
  const versions = UseVersions(blocklistId, 0);

  function versionsList() {
    if (!versions || versions.length === 0) {
      return (<div />);
    }

    let versionsList = versions.map((version) => {
      let dateText = version.createdOn.toDateString();
      let dateTitle = version.createdOn.toISOString();
      let entriesText = Intl.NumberFormat().format(version.numEntries);
      return (
        <li>
          <Link to={{pathname: `/versions/${version.id}/diff`}}>
            <span title={dateTitle}>{dateText}</span>
          </Link>: {entriesText} entries
        </li>
      );
    });
    return (<ul>{versionsList}</ul>)
  }

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

      <h3>Recent Versions</h3>
      {versionsList()}
    </section>
  );
};
