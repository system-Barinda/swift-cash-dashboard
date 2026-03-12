import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import CurrencyWidget from "../components/CurrencyWidget";
import SpendingChart from "../components/SpendingChart";
import CategoryChart from "../components/CategoryChart";

export default function Dashboard() {
  const { state } = useFinance();
  const { transactions } = state;

  const { balance, income, expense } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += t.amount;
      } else {
        expense += t.amount;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  return (
    <div className="p-4 md:p-8 space-y-10 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Finance Dashboard
          </h1>
          <p className="text-gray-500">
            Track your income and expenses easily
          </p>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="dashboard"
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">

          <div className="flex justify-between items-center">
            <h2 className="text-sm opacity-80">Total Balance</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png"
              className="w-8 h-8"
            />
          </div>

          <p className="text-3xl font-bold mt-4">
            ${balance.toLocaleString()}
          </p>

        </div>

        {/* Income */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">

          <div className="flex justify-between items-center">
            <h2 className="text-sm opacity-80">Total Income</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
              className="w-8 h-8"
            />
          </div>

          <p className="text-3xl font-bold mt-4">
            ${income.toLocaleString()}
          </p>

        </div>

        {/* Expense */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">

          <div className="flex justify-between items-center">
            <h2 className="text-sm opacity-80">Total Expenses</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
              className="w-8 h-8"
            />
          </div>

          <p className="text-3xl font-bold mt-4">
            ${expense.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Currency Widget */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <CurrencyWidget balance={balance} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Spending
          </h2>
          <SpendingChart />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Category Breakdown
          </h2>
          <CategoryChart />
        </div>

      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-lg font-semibold mb-6">
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-gray-500">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              className="w-24 mb-4"
            />

            <p>No transactions yet</p>

          </div>
        ) : (
          <ul className="space-y-4">

            {transactions.slice(0, 5).map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition"
              >

                <div>
                  <p className="font-medium text-gray-800">
                    {t.description}
                  </p>

                  <p className="text-sm text-gray-500">
                    {t.category}
                  </p>
                </div>

                <span
                  className={
                    t.type === "income"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {t.type === "income" ? "+" : "-"}$
                  {t.amount.toLocaleString()}
                </span>

              </li>
            ))}

          </ul>
        )}

      </div>

    </div>
  );
}