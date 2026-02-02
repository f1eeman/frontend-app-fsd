import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./app/routing/App.Router";
import "./style/main.scss";

const container = document.getElementById("root");

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>,
  );
} else {
  console.error('Root container with id:"root" not found');
}
