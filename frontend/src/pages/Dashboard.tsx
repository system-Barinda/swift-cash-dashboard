import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";

import DashboardHeader from "../components/DashboardHeader";
import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import RecentTransactions from "../components/RecentTransactions";
import CurrencyWidget from "../components/CurrencyWidget";

export default function Dashboard() {

  const { state } = useFinance();
  const { transactions } = state;

  const { balance, income, expense } = useMemo(() => {

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += t.amount;
      } else {
        expense += t.amount;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
    };

  }, [transactions]);

  return (
    <div className="p-4 md:p-8 space-y-10">

      <DashboardHeader />

      <SummaryCards
        balance={balance}
        income={income}
        expense={expense}
      />

      <div className="bg-white border p-6 rounded-xl shadow-sm">
        <CurrencyWidget balance={balance} />
      </div>

      <ChartsSection />

      <RecentTransactions transactions={transactions} />

    </div>
  );
}