import {FunctionComponent} from "react";
import {useParams} from "react-router-dom";
import {faExclamationCircle, faFileDownload, faGavel, faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {BlocklistVersions} from "./BlocklistVersions";
import {useBlocklistDetails} from "../hooks/useBlocklistDetails";

export const BlocklistDetails: FunctionComponent = () =>  {
  const { blocklistId } = useParams();
  const blocklist = useBlocklistDetails(blocklistId as string);

  if (!blocklist) {
    return null;
  }

  return (
    <section className={"basic-section"}>
      <h2>
        {blocklist.name}
      </h2>
      <ul className={'fa-ul'}>
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
            <FontAwesomeIcon className={'fa-li'} icon={faGavel} /> {blocklist.licenseType}
          </a>
        </li>
      </ul>

      <h3>Recent Versions</h3>
      <BlocklistVersions blocklistId={blocklistId as string} />
    </section>
  );
};
