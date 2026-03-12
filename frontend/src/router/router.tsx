import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import AddTransaction from "../pages/AddTransaction";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import TransactionDetails from "./pages/TransactionDetails";

import ProtectedRoute from "../components/ProtectedRoute";

import { transactionsLoader } from "../loaders/transactionsLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transactions />,
        loader: transactionsLoader,
      },
      {
        path: "transactions/add",
        element: <AddTransaction />,
      },
      {
         path:"/transactions/:id",
         element:<TransactionDetails />
   }
    ],
  },

  /* AUTH ROUTES */

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
]);