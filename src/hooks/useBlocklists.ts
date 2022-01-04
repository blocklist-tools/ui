import {useState, useEffect} from 'react';
import ApiClient from "../BlocklistToolsApi";
import {Blocklist} from "../Models";

export function useBlocklists(): Blocklist[] {
  const [blocklists, setBlocklists] = useState<Blocklist[]>([]);

  async function loadBlocklists() {
    let lists: Blocklist[] = [];
    let page = 0;
    let loading = true;

    while (loading) {
      const response = await ApiClient.blocklists(page++);
      lists = lists.concat(response);
      loading = response.length >= 100;
    }
    setBlocklists(lists);
  }

  useEffect(() => {
    loadBlocklists();
  }, []);

  return blocklists;
}
