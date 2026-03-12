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
          className="flex justify-between items-center p-4 border-b"
        >

          <div>
            <p className="font-semibold">
              {t.description}
            </p>

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
  );
}