import { useEffect, useState } from "react";

type Rates = {
  EUR: number;
  RWF: number;
};

type Props = {
  balance: number;
};

export default function CurrencyWidget({ balance }: Props) {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRates() {
      try {
        setLoading(true);

        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD",
          { signal: controller.signal }
        );

        const data = await res.json();

        setRates({
          EUR: data.rates.EUR,
          RWF: data.rates.RWF,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRates();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded shadow">
        Syncing exchange rates...
      </div>
    );
  }

  if (!rates) return null;

  return (
    <div className="bg-white p-6 rounded shadow space-y-2">
      <h2 className="font-semibold">Market Overview</h2>

      <p>USD: ${balance.toFixed(2)}</p>

      <p>
        EUR: €
        {(balance * rates.EUR).toFixed(2)}
      </p>

      <p>
        RWF: {(balance * rates.RWF).toLocaleString()} RWF
      </p>
    </div>
  );
}