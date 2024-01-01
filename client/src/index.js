import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#405138",
            colorPrimaryHover: "405138",
            borderRadius: "2px",
          },
          token: {
            borderRadius: "2px",
            colorPrimary: "#405138",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
