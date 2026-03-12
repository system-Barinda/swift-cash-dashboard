import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";

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
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Balance Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Total Balance</h2>
          <p className="text-2xl font-bold text-blue-600">
            ${balance}
          </p>
        </div>

        {/* Income Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">
            ${income}
          </p>
        </div>

        {/* Expense Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-600">
            ${expense}
          </p>
        </div>

      </div>

    </div>
  );
}