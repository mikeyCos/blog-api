import React from "react";
import { DataRouter, RouterProvider } from "react-router";

interface Props {
  router: DataRouter;
}

const App: React.FC<Props> = ({ router }) => {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
