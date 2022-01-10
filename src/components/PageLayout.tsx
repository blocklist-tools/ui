import {FunctionComponent} from "react";
import {Outlet} from "react-router-dom";
import {MainNav} from "./MainNav";
import {Header} from "./Header";
import {Toaster} from "react-hot-toast";

export const PageLayout: FunctionComponent = () =>  {
  return (
    <>
      <header>
        <MainNav />
        <Header />
      </header>
      <Toaster
        toastOptions={{
          style: {
            background: 'var(--toast-background)',
            color: 'var(--color)'
          },
        }}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};
