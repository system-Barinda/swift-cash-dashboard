import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function SpendingChart() {
  const { state } = useFinance();
  const { transactions } = state;

  const chartData = useMemo(() => {
    const monthly: Record<string, number> = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        const month = new Date(t.date).toLocaleString("default", {
          month: "short",
        });

        monthly[month] = (monthly[month] || 0) + t.amount;
      }
    });

    return Object.entries(monthly).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Spending
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500">
          No expense data yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}