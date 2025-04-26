import React from "react";
import { DataRouter, RouterProvider } from "react-router";

import AuthProvider from "../hooks/useAuth";

interface Props {
  router: DataRouter;
}

const App: React.FC<Props> = ({ router }) => {
  return (
    <div id="app">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export default App;
