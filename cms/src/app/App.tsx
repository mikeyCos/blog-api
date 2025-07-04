import React from "react";
import { createRouter, Router, RouterProvider } from "@tanstack/react-router";

import AuthProvider, { AuthContext, useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import PrevLocationProvider from "../hooks/usePrevLocation";
import Header from "../components/header/Header";
import { routeTree } from "../routeTree.gen";

/* const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: { auth: undefined! }},
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
} */

/* const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />
} */

/* const App = () => {
    return (
    <div id="app">
      <AuthProvider>
        <UserProvider>
          <InnerApp />
        </UserProvider>
      </AuthProvider>
    </div>
  );
}; */

/* const App = ({router}: {router: Router<any>}) => {
  return (
    <div id="app">
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </div>
  );
}; */

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="app">
      {" "}
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
