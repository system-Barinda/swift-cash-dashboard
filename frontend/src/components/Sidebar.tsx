import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle =
    "block px-4 py-2 rounded hover:bg-gray-200";

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">
        SwiftCash
      </h2>

      <nav className="space-y-2">
        <NavLink to="/" className={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/transactions" className={linkStyle}>
          Transactions
        </NavLink>

        <NavLink to="/transactions/add" className={linkStyle}>
          Add Transaction
        </NavLink>
      </nav>
    </aside>
  );
}