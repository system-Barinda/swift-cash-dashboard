import SpendingChart from "./SpendingChart";
import CategoryChart from "./CategoryChart";

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <div className="bg-white border p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Monthly Spending
        </h2>

        <SpendingChart />
      </div>

      <div className="bg-white border p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Category Breakdown
        </h2>

        <CategoryChart />
      </div>

    </div>
  );
}