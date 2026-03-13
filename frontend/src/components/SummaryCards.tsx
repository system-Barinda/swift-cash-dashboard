type Props = {
  balance: number;
  income: number;
  expense: number;
};

export default function SummaryCards({ balance, income, expense }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="bg-blue-100 border border-blue-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-sm text-blue-700 mb-2">Total Balance</h2>
        <p className="text-3xl font-bold text-blue-900">
          ${balance.toLocaleString()}
        </p>
      </div>

      <div className="bg-green-100 border border-green-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-sm text-green-700 mb-2">Total Income</h2>
        <p className="text-3xl font-bold text-green-900">
          ${income.toLocaleString()}
        </p>
      </div>

      <div className="bg-red-100 border border-red-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-sm text-red-700 mb-2">Total Expenses</h2>
        <p className="text-3xl font-bold text-red-900">
          ${expense.toLocaleString()}
        </p>
      </div>

    </div>
  );
}