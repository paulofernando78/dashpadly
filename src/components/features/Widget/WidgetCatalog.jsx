import { Clock } from "@/components/features/Clock";
import { QuickNotes } from "@/components/features/QuickNotes";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";
import { WaterIntake } from "@/components/features/WaterIntake";
import { Calculator } from "@/components/features/Calculator";
import { Markets } from "@/components/features/Markets";
import { Purchases } from "@/components/features/Purchases";

const bgFrom = 400;
const bgTo = 500;

const widgetColors = {
  black: {
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#3f3f46",
    700: "#18181b",
  },
  slate: {
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
  },
  yellow: {
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
  },
  red: {
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  blue: {
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  green: {
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
  },
  purple: {
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
  },
  violet: {
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
  },
};

function getWidgetGradientStyle(colorName) {
  const color = widgetColors[colorName];

  return {
    "--widget-from": color[bgFrom],
    "--widget-to": color[bgTo],
  };
}

export const widgetCatalog = {
  clock: {
    Component: Clock,
    title: "clock",
    iconName: "clock",
    widgetStyle: getWidgetGradientStyle("slate"),
    widgetClassName: "widget-gradient",
    defaultConfig: {
      location: "São Paulo, São Paulo, Brasil",
      latitude: -23.55052,
      longitude: -46.63331,
      timezone: "America/Sao_Paulo",
    },
  },
  quickNotes: {
    Component: QuickNotes,
    title: "quick notes",
    iconName: "noteBookPen",
    widgetStyle: getWidgetGradientStyle("yellow"),
    widgetClassName: "widget-gradient",
    defaultConfig: {
      note: "",
    },
  },
  pomodoro: {
    Component: Pomodoro,
    title: "pomodoro",
    iconName: "pomodoro",
    widgetStyle: getWidgetGradientStyle("red"),
    widgetClassName: "widget-gradient",
    defaultConfig: {
      focusMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      pomodoroGoal: 4,
    },
  },
  timer: {
    Component: Timer,
    title: "timer",
    iconName: "timer",
    widgetStyle: getWidgetGradientStyle("purple"),
    widgetClassName: "widget-gradient",
    defaultConfig: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },
  calculator: {
    Component: Calculator,
    title: "calculator",
    iconName: "calculator",
    widgetStyle: getWidgetGradientStyle("black"),
    widgetClassName: "widget-gradient",
    defaultConfig: {
      display: "0",
    },
  },
  markets: {
    Component: Markets,
    title: "markets",
    iconName: "markets",
    widgetStyle: getWidgetGradientStyle("green"),
    widgetClassName: "widget-gradient",
    defaultConfig: {},
  },
  waterIntake: {
    Component: WaterIntake,
    title: "water intake",
    iconName: "waterIntake",
    widgetStyle: getWidgetGradientStyle("blue"),
    widgetClassName: "widget-gradient",
    defaultConfig: {},
  },
  purchases: {
    Component: Purchases,
    title: "purchases",
    iconName: "purchases",
    widgetStyle: getWidgetGradientStyle("green"),
    widgetClassName: "widget-gradient",
    defaultConfig: {},
  }
};
