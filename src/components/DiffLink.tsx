import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

interface DiffLinkProps {
  versionId: string|null,
  children: React.ReactNode,
  initialVersion?: boolean
}

export const DiffLink: FunctionComponent<DiffLinkProps> = ({versionId, children, initialVersion}) => {
  if (!versionId || initialVersion) {
    return <>{children}</>;
  }
  return (
    <Link to={{pathname: `/versions/${versionId}/diff`}}>{children}</Link>
  );
}
