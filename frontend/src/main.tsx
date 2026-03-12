import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { FinanceProvider } from "./context/FinanceContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FinanceProvider>
      <RouterProvider router={router} />
    </FinanceProvider>
  </React.StrictMode>
);