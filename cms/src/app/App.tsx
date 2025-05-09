import React from "react";
import {
  BrowserRouter,
  DataRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";

import AuthProvider from "../hooks/useAuth";
import DefaultLayout from "../layouts/DefaultLayout";
import Dashboard from "../features/dashboard/Dashboard";

import Home from "../features/home/Home";
import About from "../features/about/About";
import Faq from "../features/faq/Faq";
import ProtectedLayout from "../layouts/ProtectedLayout";

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

/* const App: React.FC<Props> = () => {
  return (
    <div id="app">
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route element={<ProtectedLayout />}>
            <Route path="login" element={<Dashboard />} />
            <Route path="register" element={<Account />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}; */

export default App;
