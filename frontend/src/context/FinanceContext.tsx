import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { financeReducer } from "./financeReducer";
import type { FinanceState, Transaction } from "../types/finance";
import { useLocalStorage } from "../hooks/useLocalStorage";

type FinanceContextType = {
  state: FinanceState;
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
};

const FinanceContext = createContext<
  FinanceContextType | undefined
>(undefined);

const initialState: FinanceState = {
  transactions: [],
};

export function FinanceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [storedTransactions, setStoredTransactions] =
    useLocalStorage("transactions", []);

  const [state, dispatch] = useReducer(financeReducer, {
    transactions: storedTransactions,
  });

  function addTransaction(transaction: Transaction) {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    setStoredTransactions([...state.transactions, transaction]);
  }

  function deleteTransaction(id: string) {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });

    const updated = state.transactions.filter(
      (t) => t.id !== id
    );
    setStoredTransactions(updated);
  }

  return (
    <FinanceContext.Provider
      value={{
        state,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error(
      "useFinance must be used inside FinanceProvider"
    );
  }

  return context;
}