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
    <div className="p-4 md:p-8 space-y-10 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Finance Dashboard
          </h1>
          <p className="text-slate-500">
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
        <div className="bg-blue-100 border border-blue-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition">

          <div className="flex justify-between items-center">
            <h2 className="text-sm text-blue-700">Total Balance</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png"
              className="w-8 h-8"
            />
          </div>

          <p className="text-3xl font-bold text-blue-900 mt-4">
            ${balance.toLocaleString()}
          </p>

        </div>

        {/* Income */}
        <div className="bg-green-100 border border-green-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition">

          <div className="flex justify-between items-center">
            <h2 className="text-sm text-green-700">Total Income</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
              className="w-8 h-8"
            />
          </div>

          <p className="text-3xl font-bold text-green-900 mt-4">
            ${income.toLocaleString()}
          </p>

        </div>

        {/* Expense */}
        <div className="bg-red-100 border border-red-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition">

          <div className="flex justify-between items-center">
            <h2 className="text-sm text-red-700">Total Expenses</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
              className="w-8 h-8"
            />
          </div>

          <p className="text-3xl font-bold text-red-900 mt-4">
            ${expense.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Currency Widget */}
      <div className="bg-slate-100 border border-slate-200 p-6 rounded-2xl shadow-md">
        <CurrencyWidget balance={balance} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-indigo-700 mb-4">
            Monthly Spending
          </h2>
          <SpendingChart />
        </div>

        <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">
            Category Breakdown
          </h2>
          <CategoryChart />
        </div>

      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-100 border border-slate-200 p-6 rounded-2xl shadow-md">

        <h2 className="text-lg font-semibold text-slate-700 mb-6">
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-slate-500">

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
                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >

                <div>
                  <p className="font-medium text-slate-800">
                    {t.description}
                  </p>

                  <p className="text-sm text-slate-500">
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