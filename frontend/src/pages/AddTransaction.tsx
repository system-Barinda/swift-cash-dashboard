import AddTransactionHeader from "../components/AddTransactionHeader";
import TransactionForm from "../components/TransactionForm";

export default function AddTransaction() {

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">

      <AddTransactionHeader />

      <TransactionForm />

    </div>
  );
}