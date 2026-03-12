import { useParams } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

export default function TransactionDetails() {

  const { id } = useParams();
  const { state } = useFinance();

  const transaction = state.transactions.find(
    (t) => t.id === id
  );

  if (!transaction) {
    return (
      <p className="p-6 text-gray-500">
        Transaction not found
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">

      <h1 className="text-2xl font-bold mb-4">
        Transaction Details
      </h1>

      <div className="space-y-3">

        <p>
          <span className="font-semibold">Description:</span>{" "}
          {transaction.description}
        </p>

        <p>
          <span className="font-semibold">Amount:</span>{" "}
          ${transaction.amount}
        </p>

        <p>
          <span className="font-semibold">Type:</span>{" "}
          {transaction.type}
        </p>

        <p>
          <span className="font-semibold">Category:</span>{" "}
          {transaction.category}
        </p>

        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(transaction.date).toLocaleDateString()}
        </p>

      </div>

    </div>
  );
}