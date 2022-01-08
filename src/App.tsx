import React from 'react';
import "inter-ui/inter.css";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Blocklists} from "./components/Blocklists";
import {PageLayout} from "./components/PageLayout";
import {About} from "./components/About";
import {BlocklistDetails} from "./components/BlocklistDetails";
import {SearchPage} from "./components/SearchPage";
import {BlocklistDiff} from "./components/BlocklistDiff";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path={"/entries/search"} element={<SearchPage />} />
              <Route path={"/blocklists"} element={<Blocklists />} />
              <Route path={"/blocklists/:blocklistId"} element={<BlocklistDetails />} />
              <Route path={"/versions/:firstVersion/diff"} element={<BlocklistDiff />} />
              <Route path={"/versions/:firstVersion/diff/:secondVersion"} element={<BlocklistDiff />} />
              <Route path={"/about"} element={<About />} />
              <Route path="*" element={<Navigate replace to="/entries/search" />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
