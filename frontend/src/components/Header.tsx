import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded: any = jwtDecode(token);
      setUserEmail(decoded.email);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle =
    "px-4 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100";

  const activeStyle =
    "text-blue-600 font-semibold";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">
          SwiftCash
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/transactions/add"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Add Transaction
          </NavLink>

        </nav>

        {/* User section */}
        <div className="hidden md:flex items-center gap-4">

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">

            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              className="w-6 h-6"
            />

            <span className="text-sm text-gray-700">
              {userEmail}
            </span>

          </div>

          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600 text-sm"
          >
            Logout
          </button>

        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">

          <nav className="flex flex-col p-4 space-y-2">

            <NavLink
              to="/"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/transactions"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Transactions
            </NavLink>

            <NavLink
              to="/transactions/add"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Add Transaction
            </NavLink>

            <div className="border-t pt-3 mt-2">

              <p className="text-sm text-gray-600 mb-2">
                {userEmail}
              </p>

              <button
                onClick={logout}
                className="text-red-500 text-sm"
              >
                Logout
              </button>

            </div>

          </nav>

        </div>
      )}

    </header>
  );
}