import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import {EntrySearchPage} from "./components/entry-search-page/EntrySearchPage";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {BlocklistsPage} from "./components/blocklists-page/BlocklistsPage";
import {VersionDiffPage} from "./components/version-diff-page/VersionDiffPage";
import {HeaderNav} from "./components/header-nav/HeaderNav";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <HeaderNav />
        <Header />
        <main>
            <Switch>
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
