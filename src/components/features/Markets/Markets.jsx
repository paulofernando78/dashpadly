import { useState, useEffect } from "react";

import { WidgetBody } from "@/components/ui/Widget";

export function Markets({ onClose }) {
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadMarkets() {
      try {
        setIsLoading(true);
        setError("");

        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_BRAPI_TOKEN}`,
        };

        const options = {
          headers,
          signal: controller.signal,
        };

        const [ibovResponse, sp500Response, dollarResponse] = await Promise.all(
          [
            fetch("https://brapi.dev/api/quote/%5EBVSP", options),
            fetch("https://brapi.dev/api/quote/%5EGSPC", options),
            fetch("https://economia.awesomeapi.com.br/last/USD-BRL", {
              signal: controller.signal,
            }),
          ],
        );

        if (!ibovResponse.ok || !sp500Response.ok || !dollarResponse.ok) {
          throw new Error("Não foi possível buscar as cotações");
        }

        const ibovData = await ibovResponse.json();
        const sp500Data = await sp500Response.json();
        const dollarData = await dollarResponse.json();

        const ibovespa = ibovData.results[0];
        const sp500 = sp500Data.results[0];
        const dollar = dollarData.USDBRL;

        setMarkets([
          {
            id: "sp500",
            name: "S&P 500",
            value: sp500?.regularMarketPrice,
            change: sp500?.regularMarketChangePercent,
          },
          {
            id: "ibovespa",
            name: "Ibovespa",
            value: ibovespa?.regularMarketPrice,
            change: ibovespa?.regularMarketChangePercent,
          },
          {
            id: "dollar",
            name: "Dólar",
            value: Number(dollar?.bid),
            change: Number(dollar?.pctChange),
          },
        ]);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadMarkets();

    return () => controller.abort();
  }, []);

  function formatValue(market) {
    if (market.id === "dollar") {
      return market.value?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    return market.value?.toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
    });
  }

  function formatChange(change) {
    if (change == null) return "--";

    return `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  }

  return (
    <WidgetBody
      onClose={onClose}
      middle={
        isLoading ? (
          <span>Carregando...</span>
        ) : error ? (
          <span className="text-red-400">{error}</span>
        ) : (
          <div
            className="
              grid
              gap-2
              w-full
            "
          >
            {markets.map((market) => (
              <div
                key={market.id}
                className="
                  flex
                  flex-col
                  gap-2
                  text-center
                  p-2
                  border
                  rounded
                  border-slate-700
                  bg-slate-500
                "
              >
                <span className="text-2xl">
                  {market.name}</span>
                <div className="">
                  <strong className="block mb-1">
                    {formatValue(market)}
                  </strong>
                  <span
                    className={`
                    
                      ${market.change >= 0
                      ? "text-green-400"
                      : "text-red-400"}
                    `}
                  >
                    {formatChange(market.change)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      }
    />
  );
}
