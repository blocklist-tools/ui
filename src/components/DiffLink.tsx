import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

interface IDiffLinkProps {
  versionId: string|null,
  children: React.ReactNode,
  initialVersion?: boolean
}

export const DiffLink: FunctionComponent<IDiffLinkProps> = ({versionId, children, initialVersion}) => {
  if (!versionId || initialVersion) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <Link to={{pathname: `/versions/${versionId}/diff`}}>{children}</Link>
  );
}
