import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "./reset.styles.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
// import AuthProvider from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import router from "../config/router.config";

const rootElement: HTMLElement | null = document.getElementById("root");
if (!rootElement) throw new Error(`Failed to find the root element`);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

/* ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
); */

/* ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 */
