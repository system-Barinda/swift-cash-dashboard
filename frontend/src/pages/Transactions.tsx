import { useFinance } from "../context/FinanceContext";

export default function Transactions() {
  const { state } = useFinance();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Transactions
      </h1>

      <p>Total transactions: {state.transactions.length}</p>
    </div>
  );
}