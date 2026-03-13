import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { useSearchParams, useLoaderData } from "react-router-dom";

import TransactionsHeader from "../components/TransactionsHeader";
import BalanceCard from "../components/BalanceCard";
import TransactionFilters from "../components/TransactionFilters";
import TransactionList from "../components/TransactionList";

import type { Transaction } from "../types/finance";

export default function Transactions() {

  const { state, deleteTransaction } = useFinance();
  const loadedTransactions = useLoaderData() as Transaction[];

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

      <TransactionsHeader />

      <BalanceCard balance={balance} />

      <TransactionFilters handleFilter={handleFilter} />

      <div className="bg-white rounded shadow">
        <TransactionList
          transactions={filteredTransactions}
          deleteTransaction={deleteTransaction}
        />
      </div>

    </div>
  );
}