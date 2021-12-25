import {FunctionComponent} from "react";
import {Outlet} from "react-router-dom";
import {MainNav} from "./MainNav";
import {Header} from "./Header";

export const PageLayout: FunctionComponent = () =>  {
  return (
    <>
      <header>
        <MainNav />
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
