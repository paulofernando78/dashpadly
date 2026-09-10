import { Clock } from "@/components/features/Clock";
import { QuickNotes } from "@/components/features/QuickNotes";

// Productivity
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";

// Finance
import { Calculator } from "@/components/features/Calculator";
import { Purchases } from "@/components/features/Purchases";
import { Markets } from "@/components/features/Markets";

// Health
import { WaterIntake } from "@/components/features/WaterIntake";
import { Breathing } from "@/components/features/Breathing";

const bg = `
  bg-gray-100/10
`

export const widgetCatalog = {
  clock: {
    category: "utilities",
    Component: Clock,
    title: "Clock",
    iconName: "clock",
    widgetWidthClassName: "w-75",
    widgetClassName: bg,
    defaultConfig: {
      location: "São Paulo, São Paulo, Brasil",
      latitude: -23.55052,
      longitude: -46.63331,
      timezone: "America/Sao_Paulo",
    },
  },
  quickNotes: {
    category: "productivity",
    Component: QuickNotes,
    title: "Quick Notes",
    iconName: "quickNotes",
    widgetClassName: "paper-texture",
    defaultConfig: {
      note: "",
    },
  },

  // Productivity
  pomodoro: {
    category: "productivity",
    Component: Pomodoro,
    title: "Pomodoro",
    iconName: "pomodoro",
    widgetClassName: bg,
    defaultConfig: {
      focusMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      pomodoroGoal: 4,
    },
  },
  timer: {
    category: "productivity",
    Component: Timer,
    title: "Timer",
    iconName: "timer",
    // widgetStyle: getWidgetGradientStyle("slate"),
    widgetClassName: bg,
    defaultConfig: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },

  // Finance
  calculator: {
    category: "finance",
    Component: Calculator,
    title: "Calculator",
    iconName: "calculator",
    // widgetStyle: getWidgetGradientStyle("slate"),
    widgetClassName: bg,
    defaultConfig: {
      display: "0",
    },
  },
  markets: {
    category: "finance",
    Component: Markets,
    title: "Markets",
    iconName: "markets",
    // widgetStyle: getWidgetGradientStyle("slate"),
    widgetClassName: bg,
    defaultConfig: {},
  },
  purchases: {
    category: "finance",
    Component: Purchases,
    title: "Purchases",
    iconName: "purchases",
    // widgetStyle: getWidgetGradientStyle("slate"),
    widgetClassName: bg,
    defaultConfig: {},
  },

  // Health
  waterIntake: {
    category: "health",
    title: "Water intake",
    Component: WaterIntake,
    iconName: "waterIntake",
    // widgetStyle: getWidgetGradientStyle("slate"),
    widgetClassName: bg,
    defaultConfig: {},
  },
  breating: {
    category: "health",
    title: "Breating",
    Component: Breathing,
    iconName: "breathing",
    // widgetStyle: getWidgetGradientStyle("slate"),
    widgetClassName: bg,
    defaultConfig: {},
  },
};
