import { useRef, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import { Transaction, Category, TransactionType } from "../types/finance";

export default function AddTransaction() {
  const { addTransaction } = useFinance();
  const navigate = useNavigate();

  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const description = formData.get("description") as string;
    const amount = Number(formData.get("amount"));
    const type = formData.get("type") as TransactionType;
    const category = formData.get("category") as Category;

    if (!description || amount <= 0) {
      alert("Please enter a valid description and amount");
      return;
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount,
      type,
      category,
      date: new Date().toISOString(),
    };

    addTransaction(transaction);

    navigate("/transactions");
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={descriptionRef}
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          className="w-full border p-2 rounded"
        />

        <select
          name="type"
          className="w-full border p-2 rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          name="category"
          className="w-full border p-2 rounded"
        >
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Leisure">Leisure</option>
          <option value="Other">Other</option>
        </select>

        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}