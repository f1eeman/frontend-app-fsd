import React from "react";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <div>ssssss</div>
    </React.StrictMode>,
  );
} else {
  console.error('Root container with id:"root" not found');
}
