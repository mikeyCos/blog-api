import React from "react";
import { DataRouter, RouterProvider } from "react-router";
import AuthProvider from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import PrevLocationProvider from "../hooks/usePrevLocation";

interface Props {
  router: DataRouter;
}

const App: React.FC<Props> = ({ router }) => {
  return (
    <div id="app">
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
