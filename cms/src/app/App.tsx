import React from "react";
import AuthProvider from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import PrevLocationProvider from "../hooks/usePrevLocation";
import { RouterProvider } from "@tanstack/react-router";

const App = ({ children }: { children: React.ReactNode }) => {
  /* return (
    <div id="app">
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </div>
  ); */
  return <div id="app">{children}</div>;
};

export default App;
