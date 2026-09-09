import { useState, useEffect } from "react";

import { WidgetBody } from "@/components/ui/Widget";

async function fetchJson(url, options, marketName) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `${marketName}: erro ${response.status} ${response.statusText}`,
    );
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`${marketName}: resposta inválida`);
  }
}

function requireFiniteNumber(value, marketName) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${marketName}: valor inválido`);
  }

  return number;
}

async function fetchBrapiIndex({ symbol, id, name, token, signal }) {
  if (!token) {
    throw new Error(`${name}: token da brapi não configurado`);
  }

  const data = await fetchJson(
    `https://brapi.dev/api/quote/${encodeURIComponent(symbol)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    },
    name,
  );
  const quote = data?.results?.[0];

  if (!quote) {
    throw new Error(`${name}: cotação não encontrada`);
  }

  return {
    id,
    name,
    value: requireFiniteNumber(quote.regularMarketPrice, name),
    change: requireFiniteNumber(quote.regularMarketChangePercent, name),
  };
}

async function fetchDollar(signal) {
  const data = await fetchJson(
    "https://economia.awesomeapi.com.br/last/USD-BRL",
    { signal },
    "Dólar",
  );
  const quote = data?.USDBRL;

  if (!quote) {
    throw new Error("Dólar: cotação não encontrada");
  }

  return {
    id: "dollar",
    name: "Dólar",
    value: requireFiniteNumber(quote.bid, "Dólar"),
    change: requireFiniteNumber(quote.pctChange, "Dólar"),
  };
}

export function Markets({ onClose }) {
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    async function loadMarkets() {
      try {
        setIsLoading(true);
        setError("");

        const token = import.meta.env.VITE_BRAPI_TOKEN;
        const requests = await Promise.allSettled([
          fetchBrapiIndex({
            symbol: "^GSPC",
            id: "sp500",
            name: "S&P 500",
            token,
            signal: controller.signal,
          }),
          fetchBrapiIndex({
            symbol: "^BVSP",
            id: "ibovespa",
            name: "Ibovespa",
            token,
            signal: controller.signal,
          }),
          fetchDollar(controller.signal),
        ]);

        if (!isActive) return;

        const loadedMarkets = requests
          .filter((request) => request.status === "fulfilled")
          .map((request) => request.value);
        const requestErrors = requests
          .filter(
            (request) =>
              request.status === "rejected" &&
              request.reason?.name !== "AbortError",
          )
          .map((request) => request.reason?.message ?? "Erro desconhecido");

        setMarkets(loadedMarkets);
        setError(requestErrors.join(" | "));
      } catch (requestError) {
        if (isActive && requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadMarkets();

    return () => {
      isActive = false;
      controller.abort();
    };
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
        ) : markets.length === 0 && error ? (
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
            {error && <span className="text-xs text-red-400">{error}</span>}
          </div>
        )
      }
    />
  );
}
