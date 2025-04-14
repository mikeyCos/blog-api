import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter } from "react-router";
import App from "./App";
import routes from "../routes/routes";
import "./index.css";
import "./reset.styles.css";

const router = createBrowserRouter(routes);
// console.log(router);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
);
