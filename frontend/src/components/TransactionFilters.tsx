type Props = {
  handleFilter: (type: string | null) => void;
};

export default function TransactionFilters({ handleFilter }: Readonly<Props>) {
  return (
    <div className="flex gap-3">

      <button
        onClick={() => handleFilter(null)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        All
      </button>

      <button
        onClick={() => handleFilter("income")}
        className="px-3 py-1 bg-green-200 rounded"
      >
        Income
      </button>

      <button
        onClick={() => handleFilter("expense")}
        className="px-3 py-1 bg-red-200 rounded"
      >
        Expense
      </button>

    </div>
  );
}