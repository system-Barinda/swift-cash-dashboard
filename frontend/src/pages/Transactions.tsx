import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { useSearchParams, useLoaderData } from "react-router-dom";
import type { Transaction } from "../types/finance";

export default function Transactions() {
  const { state, deleteTransaction } = useFinance();

  const loadedTransactions = useLoaderData() as Transaction[];

  // Use context transactions if available, otherwise loader data
  const transactions =
    state.transactions.length > 0
      ? state.transactions
      : loadedTransactions;

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const filteredTransactions = useMemo(() => {
    if (!typeFilter) return transactions;
    return transactions.filter((t) => t.type === typeFilter);
  }, [transactions, typeFilter]);

  const balance = useMemo(() => {
    return transactions.reduce((total, t) => {
      return t.type === "income"
        ? total + t.amount
        : total - t.amount;
    }, 0);
  }, [transactions]);

  function handleFilter(type: string | null) {
    if (type) {
      setSearchParams({ type });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Transactions</h1>

      {/* Balance */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Balance</h2>
        <p className="text-2xl font-bold text-green-600">
          ${balance}
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => handleFilter(null)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          All
        </button>

        <button
          onClick={() => handleFilter("income")}
          className="px-3 py-1 bg-green-200 rounded"
        >
          Income
        </button>

        <button
          onClick={() => handleFilter("expense")}
          className="px-3 py-1 bg-red-200 rounded"
        >
          Expense
        </button>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded shadow">

        {filteredTransactions.length === 0 ? (
          <p className="p-4 text-gray-500">
            No transactions found
          </p>
        ) : (
          <ul>
            {filteredTransactions.map((t) => (
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