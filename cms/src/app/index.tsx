import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "./reset.styles.css";

const rootElement: HTMLElement | null = document.getElementById("root");
if (!rootElement) throw new Error(`Failed to find the root element`);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
