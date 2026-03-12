import { Link } from "react-router-dom";
import type { Transaction } from "../types/finance";

type Props = {
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
};

export default function TransactionList({
  transactions,
  deleteTransaction
}: Readonly<Props>) {

  if (transactions.length === 0) {
    return (
      <p className="p-4 text-gray-500">
        No transactions found
      </p>
    );
  }

  return (
    <ul>
      {transactions.map((t) => (
        <li
          key={t.id}
          className="flex justify-between items-center p-4 border-b hover:bg-gray-50"
        >

          <Link
            to={`/transactions/${t.id}`}
            className="flex justify-between items-center w-full"
          >

            <div>
              <p className="font-semibold">
                {t.description}
              </p>

              <p className="text-sm text-gray-500">
                {t.category} • {new Date(t.date).toLocaleDateString()}
              </p>
            </div>

            <span
              className={
                t.type === "income"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {t.type === "income" ? "+" : "-"}${t.amount}
            </span>

          </Link>

          <button
            onClick={() => deleteTransaction(t.id)}
            className="text-sm text-red-500 hover:underline ml-4"
          >
            Delete
          </button>

        </li>
      ))}
    </ul>
  );
}