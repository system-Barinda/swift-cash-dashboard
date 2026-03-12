import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import CurrencyWidget from "../components/CurrencyWidget";
import SpendingChart from "../components/SpendingChart";

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
    <div className="p-6 space-y-8">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
          <h2 className="text-sm opacity-80">Total Balance</h2>
          <p className="text-3xl font-bold mt-2">
            ${balance.toLocaleString()}
          </p>
        </div>

        {/* Income */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
          <h2 className="text-sm opacity-80">Total Income</h2>
          <p className="text-3xl font-bold mt-2">
            ${income.toLocaleString()}
          </p>
        </div>

        {/* Expense */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
          <h2 className="text-sm opacity-80">Total Expenses</h2>
          <p className="text-3xl font-bold mt-2">
            ${expense.toLocaleString()}
          </p>
        </div>

      </div>

      {/* Currency Widget */}
      <CurrencyWidget balance={balance} />

      {/* Spending Chart */}
      <SpendingChart />

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">
            No transactions yet
          </p>
        ) : (
          <ul className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">
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