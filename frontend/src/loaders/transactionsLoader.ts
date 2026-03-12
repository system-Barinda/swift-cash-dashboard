import type { Transaction } from "../types/finance";

export async function transactionsLoader() {
  const data = localStorage.getItem("transactions");

  const transactions: Transaction[] = data ? JSON.parse(data) : [];

  return transactions;
}