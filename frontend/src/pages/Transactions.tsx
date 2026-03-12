import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";

export default function Transactions() {
  const { state, deleteTransaction } = useFinance();
  const { transactions } = state;

  const balance = useMemo(() => {
    return transactions.reduce((total, t) => {
      return t.type === "income"
        ? total + t.amount
        : total - t.amount;
    }, 0);
  }, [transactions]);

  return (
    <div className="p-6 space-y-6">
      
      <h1 className="text-2xl font-bold">Transactions</h1>

      {/* Balance Card */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Balance</h2>
        <p className="text-2xl font-bold text-green-600">
          ${balance}
        </p>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded shadow">
        {transactions.length === 0 ? (
          <p className="p-4 text-gray-500">
            No transactions yet
          </p>
        ) : (
          <ul>
            {transactions.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div>
                  <p className="font-semibold">{t.description}</p>
                  <p className="text-sm text-gray-500">
                    {t.category} • {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={
                      t.type === "income"
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </span>

                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}