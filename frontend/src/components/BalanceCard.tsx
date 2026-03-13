type Props = {
  balance: number;
};

export default function BalanceCard({ balance }: Readonly<Props>) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">
        Total Balance
      </h2>

      <p className="text-2xl font-bold text-green-600">
        ${balance}
      </p>
    </div>
  );
}