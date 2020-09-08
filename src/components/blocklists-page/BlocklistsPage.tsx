import React, {FunctionComponent} from "react";
import {UseBlocklists} from "../../hooks/UseBlocklists";
import {BlocklistsTable} from "../blocklists-table/BlocklistsTable";

export const BlocklistsPage: FunctionComponent = () =>  {
  const blocklists = UseBlocklists();

  return (
      <BlocklistsTable blocklists={blocklists} />
  );
};
