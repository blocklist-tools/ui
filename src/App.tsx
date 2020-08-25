import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import {EntrySearchPage} from "./components/entry-search-page/EntrySearchPage";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {BlocklistsPage} from "./components/blocklists-page/BlocklistsPage";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <BrowserRouter>
          <Switch>
            <Route path='/blocklists' component={BlocklistsPage} />
            <Route path='/entries/search' component={EntrySearchPage} />
            <Route>
              <Redirect to='/entries/search' />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
