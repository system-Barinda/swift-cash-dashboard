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

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Market Overview</h2>

      {loading && (
        <p className="text-gray-500">Syncing exchange rates...</p>
      )}

      {rates && (
        <div className="space-y-2">
          <p>USD: <strong>${balance.toFixed(2)}</strong></p>

          <p>
            EUR: <strong>€{(balance * rates.EUR).toFixed(2)}</strong>
          </p>

          <p>
            RWF: <strong>{(balance * rates.RWF).toLocaleString()} RWF</strong>
          </p>
        </div>
      )}
    </div>
  );
}