import React from "react";
import ReactDOM from "react-dom/client";

// import { createBrowserRouter } from "react-router";
import App from "./App";
// import routes from "../routes/routes";
import "./index.css";
import "./reset.styles.css";
import rootRoute from "../routes/__root";
import homeRoute from "../routes/homeRoute";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// const router = createBrowserRouter(routes);
const routeTree = rootRoute.addChildren([homeRoute]);
const router = createRouter({ routeTree, InnerWrap: App });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement: HTMLElement | null = document.getElementById("root");
if (!rootElement) throw new Error(`Failed to find the root element`);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
