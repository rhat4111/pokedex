import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000}>
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
