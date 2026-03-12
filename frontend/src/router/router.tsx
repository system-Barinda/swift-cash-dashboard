import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import AddTransaction from "../pages/AddTransaction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "transactions/add",
        element: <AddTransaction />,
      },
    ],
  },
]);