import React from 'react';
import "inter-ui/inter.css";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Blocklists} from "./components/Blocklists";
import {PageLayout} from "./components/PageLayout";
import {About} from "./components/About";
import {BlocklistDetails} from "./components/BlocklistDetails";
import {SearchPage} from "./components/SearchPage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path={"/entries/search"} element={<SearchPage />} />
              <Route path={"/blocklists"} element={<Blocklists />} />
              <Route path={"/blocklists/:blocklistId"} element={<BlocklistDetails />} />
              <Route path={"/versions/:versionId/diff"} element={<BlocklistDetails />} />
              <Route path={"/about"} element={<About />} />
              <Route path="*" element={<Navigate replace to="/entries/search" />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
