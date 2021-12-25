import {useState, useEffect} from 'react';
import ApiClient from "../BlocklistToolsApi";
import {Blocklist} from "../Models";

export function useBlocklists(): Blocklist[] {
  const [blocklists, setBlocklists] = useState<Blocklist[]>([]);

  async function loadBlocklists() {
    let lists: Blocklist[] = [];
    let complete = false;
    for (let page=0; !complete; page++) {
      try {
        const response = await ApiClient.blocklists(page);
        lists = lists.concat(response);
        complete = response.length < 100;
      } catch {
        // TODO ERROR ALERT
        complete = true;
      }
    }
    setBlocklists(lists);
  }

  useEffect(() => {
    loadBlocklists();
  }, []);

  return blocklists;
}
