import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "@src/reset.css";
import "@src/index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <App></App>
  </React.Fragment>
);
