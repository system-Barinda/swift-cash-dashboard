export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Food"
  | "Rent"
  | "Leisure"
  | "Other";

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
};

export type FinanceState = {
  transactions: Transaction[];
};