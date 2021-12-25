import {FunctionComponent} from "react";
import {useParams} from "react-router-dom";
import {Blocklist} from "../Models";
import {faExclamationCircle, faFileDownload, faGavel, faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {BlocklistVersions} from "./BlocklistVersions";

export const BlocklistDetails: FunctionComponent = () =>  {
  const { blocklistId } = useParams();

  const blocklist = {
    "id": blocklistId,
    "name": "Developer Dan: Facebook asdfasdf asdf asdf asdf",
    "format": "hosts",
    "downloadUrl": "https://www.github.developerdan.com/hosts/lists/facebook-extended.txt",
    "homepageUrl": "https://www.github.developerdan.com/hosts/",
    "issuesUrl": "https://github.com/lightswitch05/hosts/issues",
    "licenseUrl": "https://github.com/lightswitch05/hosts/blob/master/LICENSE",
    "licenseType": "Apache-2.0"
  } as Blocklist;

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
