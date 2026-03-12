import { FinanceState, Transaction } from "../types/finance";

type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string };

export function financeReducer(
  state: FinanceState,
  action: Action
): FinanceState {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload
        ),
      };

    default:
      return state;
  }
}