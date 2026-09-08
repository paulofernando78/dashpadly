import {
  // A
  ArrowRight,
  // B
  Bookmark,
  Brain,
  // C
  Calendar,
  Calculator,
  CirclePause,
  CirclePlay,
  CirclePlus,
  ChartCandlestick,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  CreditCard,
  // D
  Delete,
  Divide,
  Dot,
  Droplet,
  Equal,
  // E
  Ellipsis,
  // F
  FolderClosed,
  FolderOpen,
  FolderPlus,
  // I
  Info,
  // M
  MapPin,
  Maximize2,
  MessageCircleWarning,
  Minus,
  Moon,
  // N
  NotebookPen,
  NotepadText,
  // P
  Parentheses,
  PaintBucket,
  Plus,
  // R
  RotateCcw,
  // S
  Search,
  SquarePen,
  SquareText,
  Sun,
  // T
  Thermometer,
  Timer,
  Trash,
  // W
  GlassWater,
  // V
  Volume,
  VolumeX,
  // X
  X,
} from "lucide-react";

const Pomodoro = ({ size = 20, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 5c-4.97 0-9 3.8-9 8.5S7.03 22 12 22s9-3.8 9-8.5S16.97 5 12 5ZM12 5c.35-1.55 1.1-2.5 2.2-3M12 5c-.35-1.55-1.1-2.5-2.2-3M12 5c-1.55-.25-2.95-.1-4.2.85M12 5c1.55-.25 2.95-.1 4.2.85M12 5c-.9 1-2.05 1.72-3.45 2.15M12 5c.9 1 2.05 1.72 3.45 2.15" />
  </svg>
);

const Breathing = ({ size = 20, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 3v9m0 0-3-3m3 3 3-3M9 5.5C7.7 5.9 6.8 7.1 6.3 8.6L4.4 14.3C3.7 16.5 3.9 19 5.5 20.2c.7.5 1.5.8 2.4.8H10v-7.5M15 5.5c1.3.4 2.2 1.6 2.7 3.1l1.9 5.7c.7 2.2.5 4.7-1.1 5.9-.7.5-1.5.8-2.4.8H14v-7.5" />
  </svg>
);

function WeatherCloudSun({ className = "", ...props }) {
  return (
    <CloudSun
      className={`
        [&>path:not(:last-child)]:stroke-yellow-400
        [&>path:last-child]:stroke-slate-400
        [&>path:last-child]:fill-slate-400
        ${className}
      `}
      {...props}
    />
  );
}

const icons = {
  // A
  arrowRight: ArrowRight,
  // B
  bookmark: Bookmark,
  breathing: Breathing,
  brain: Brain,
  // C
  calendar: Calendar,
  calculator: Calculator,
  circlePause: CirclePause,
  circlePlay: CirclePlay,
  circlePlus: CirclePlus,
  markets: ChartCandlestick,
  check: Check,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  clock: Clock,
  cloud: Cloud,
  cloudFog: CloudFog,
  cloudLightning: CloudLightning,
  cloudRain: CloudRain,
  cloudSnow: CloudSnow,
  cloudSun: WeatherCloudSun,
  purchases: CreditCard,
  // D
  delete: Delete,
  divide: Divide,
  dot: Dot,
  waterIntake: Droplet,
  equal: Equal,
  // E
  ellipsis: Ellipsis,
  // F
  folderClosed: FolderClosed,
  folderOpen: FolderOpen,
  folderPlus: FolderPlus,
  // I
  info: Info,
  // M
  mapPin: MapPin,
  maximize2: Maximize2,
  messageCircleWarning: MessageCircleWarning,
  minus: Minus,
  moon: Moon,
  // N
  quickNotes: NotebookPen,
  notepadText: NotepadText,
  // P
  parentheses: Parentheses,
  paintBucket: PaintBucket,
  plus: Plus,
  pomodoro: Pomodoro,
  // R
  rotateCcw: RotateCcw,
  // S
  search: Search,
  squarePen: SquarePen,
  squareText: SquareText,
  sun: Sun,
  // T
  thermometer: Thermometer,
  timer: Timer,
  trash: Trash,
  // W
  glassWater: GlassWater,
  // V
  volume: Volume,
  volumeX: VolumeX,
  // X
  x: X,
};

export const Icon = ({
  name,
  size = 20,
  className = "text-gray-300",
  cursorNone = false,
  ...props
}) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      className={`
        shrink-0
        ${cursorNone ? "cursor-default" : "cursor-pointe"}
        ${className}
        `}
      {...props}
    />
  );
};
