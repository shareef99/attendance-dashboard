import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CustomMantineProvider from "./components/CustomMantineProvider";
import "./styles/main.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CustomMantineProvider>
      <App />
    </CustomMantineProvider>
  </React.StrictMode>
);
