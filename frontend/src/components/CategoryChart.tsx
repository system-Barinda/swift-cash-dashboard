import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

/* High-contrast readable colors */
const COLORS = [
  "#2563eb", // blue
  "#16a34a", // green
  "#dc2626", // red
  "#d97706", // orange
  "#7c3aed", // purple
  "#0f766e", // teal
  "#be123c"  // rose
];

export default function CategoryChart() {
  const { state } = useFinance();
  const { transactions } = state;

  const data = useMemo(() => {
    const categories: Record<string, number> = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        categories[t.category] =
          (categories[t.category] || 0) + t.amount;
      }
    });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Expenses by Category
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">
          No expense data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) =>
                `$${value.toLocaleString()}`
              }
            />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}