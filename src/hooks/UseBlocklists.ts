import {useState, useEffect} from 'react';
import ApiError from "../exceptions/ApiError";
import ApiClient, {Blocklist} from "../services/ApiClient";

export function UseBlocklists(): Blocklist[] | null {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [blocklists, setBlocklists] = useState<Blocklist[] | null>(null);

  async function loadBlocklists() {
    let lists: Blocklist[] = [];
    let complete = false;
    for (let page=0; !complete; page++) {
      let response = await ApiClient.fetchLists(page);
      if (response instanceof ApiError) {
        setLoaded(false);
        return setBlocklists(null);
      }
      lists = lists.concat(response);
      complete = response.length < 100;
    }
    setBlocklists(lists);
  }

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      loadBlocklists();
    }
  }, [loaded]);

  return blocklists;
}
