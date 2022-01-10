import {FunctionComponent} from "react";
import {BlocklistCard} from "./BlocklistCard";
import styles from './Blocklists.module.css';
import {useBlocklists} from "../hooks/useBlocklists";

export const Blocklists: FunctionComponent = () =>  {
  const blocklists = useBlocklists();

  const cards = blocklists.map((blocklist) => {
    return <BlocklistCard key={blocklist.id} blocklist={blocklist} />
  })

  return (
    <div className={styles.container}>
      {cards}
    </div>
  );
};
