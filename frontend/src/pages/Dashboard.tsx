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
    <div className="p-4 md:p-8 space-y-10">

      {/* Page Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Finance Dashboard
        </h1>

        <p className="text-slate-500">
          Track your income and expenses easily
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Balance */}
        <div className="bg-blue-100 border border-blue-200 p-6 rounded-xl shadow-sm">

          <h2 className="text-sm text-blue-700 mb-2">
            Total Balance
          </h2>

          <p className="text-3xl font-bold text-blue-900">
            ${balance.toLocaleString()}
          </p>

        </div>

        {/* Income */}
        <div className="bg-green-100 border border-green-200 p-6 rounded-xl shadow-sm">

          <h2 className="text-sm text-green-700 mb-2">
            Total Income
          </h2>

          <p className="text-3xl font-bold text-green-900">
            ${income.toLocaleString()}
          </p>

        </div>

        {/* Expense */}
        <div className="bg-red-100 border border-red-200 p-6 rounded-xl shadow-sm">

          <h2 className="text-sm text-red-700 mb-2">
            Total Expenses
          </h2>

          <p className="text-3xl font-bold text-red-900">
            ${expense.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Currency Widget */}
      <div className="bg-white border p-6 rounded-xl shadow-sm">
        <CurrencyWidget balance={balance} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <h2 className="text-lg font-semibold mb-4">
            Monthly Spending
          </h2>

          <SpendingChart />

        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">

          <h2 className="text-lg font-semibold mb-4">
            Category Breakdown
          </h2>

          <CategoryChart />

        </div>

      </div>

      {/* Recent Transactions */}
      <div className="bg-white border p-6 rounded-xl shadow-sm">

        <h2 className="text-lg font-semibold mb-6">
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