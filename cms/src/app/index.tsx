import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter } from "react-router";
import App from "./App";
import routes from "../routes/routes";
import "./index.css";
import "./reset.styles.css";

const router = createBrowserRouter(routes);
const rootElement: HTMLElement | null = document.getElementById("root");
if (!rootElement) throw new Error(`Failed to find the root element`);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
);
