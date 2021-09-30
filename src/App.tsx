import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import {EntrySearchPage} from "./components/entry-search-page/EntrySearchPage";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {BlocklistsPage} from "./components/blocklists-page/BlocklistsPage";
import {VersionDiffPage} from "./components/version-diff-page/VersionDiffPage";
import {HeaderNav} from "./components/header-nav/HeaderNav";
import {BlocklistPage} from "./components/blocklist-page/BlocklistPage";

function App() {

  /**
   * Hello! If you are reading this, please understand that this was my very first experience
   * with React. There are a lot of things I would do differently now that I've learned more.
   * I hope to one day get back in here and get it updated and add new features, but I'm
   * not sure when that will be. It is certainly not a priority. PRs welcome!
   */

  return (
    <React.Fragment>
      <BrowserRouter>
        <HeaderNav />
        <Header />
        <main>
            <Switch>
              <Route path='/blocklists/:blocklistId' component={BlocklistPage} />
              <Route path='/blocklists' component={BlocklistsPage} />
              <Route path='/entries/search' component={EntrySearchPage} />
              <Route path={[
                '/versions/:firstVersion/diff/:secondVersion',
                '/versions/:firstVersion/diff'
              ]} component={VersionDiffPage} />
              <Route>
                <Redirect to='/entries/search' />
              </Route>
            </Switch>
        </main>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
}

export default App;
