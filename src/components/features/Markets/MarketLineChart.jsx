import { useEffect, useRef } from "react";
import {
  ColorType,
  createChart,
  LineSeries,
} from "lightweight-charts";

// React renderiza <div ref={containerRef}>              ↓
// useEffect executa
// ↓
// createChart() cria o gráfico dentro da div
// ↓
// addSeries(LineSeries) cria uma linha
// ↓
// setData(data) entrega os pontos
// ↓
// fitContent() enquadra todos os pontos

export function MarketLineChart({ data, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 80,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "transparent",
        },
        textColor: "#d1d5db",
      },

      grid: {
        vertLines: {
          visible: true,
        },
        horzLines: {
          visible: true,
        },
      },

      rightPriceScale: {
        visible: true,
      },

      timeScale: {
        visible: true,
        borderVisible: true,
      },

      handleScroll: true,
      handleScale: true,
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: "#4ade80",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });

    lineSeries.setData(data);
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(([entry]) => {
      chart.applyOptions({
        width: entry.contentRect.width,
      });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      className={`
        p-2
        w-70
        h-full
        bg-linear-to-tl
        from-[#111417]
        to-[#34384a]
        rounded-md
        ${className}
        `}
    />
  );
}