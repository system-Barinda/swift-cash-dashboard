type Transaction = {
  id: number;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

type Props = {
  transactions: Transaction[];
};

export default function RecentTransactions({ transactions }: Readonly<Props>) {
  return (
    <div className="bg-white border p-6 rounded-xl shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">
          No transactions yet
        </p>
      ) : (
        <ul className="space-y-3">

          {transactions.slice(0, 5).map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center border-b pb-2"
            >

              <div>
                <p className="font-medium">
                  {t.description}
                </p>

                <p className="text-sm text-gray-500">
                  {t.category}
                </p>
              </div>

              <span
                className={
                  t.type === "income"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {t.type === "income" ? "+" : "-"}$
                {t.amount.toLocaleString()}
              </span>

            </li>
          ))}

        </ul>
      )}

    </div>
  );
}