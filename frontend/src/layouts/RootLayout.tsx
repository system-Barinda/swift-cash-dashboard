import { NavLink, Outlet, useNavigation } from "react-router-dom";

export default function RootLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6 space-y-4">

        <h1 className="text-xl font-bold mb-6">
          SwiftCash
        </h1>

        <nav className="flex flex-col gap-2">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "text-gray-600"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "text-gray-600"
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/transactions/add"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "text-gray-600"
            }
          >
            Add Transaction
          </NavLink>

        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">

        {/* Global Loading Indicator */}
        {isLoading && (
          <div className="w-full mb-4">
            <div className="h-1 bg-blue-500 animate-pulse rounded"></div>
          </div>
        )}

        <Outlet />

      </main>

    </div>
  );
}

