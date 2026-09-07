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

const icons = {
  // A
  arrowRight: ArrowRight,
  // B
  bookmark: Bookmark,
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
  cloudSun: CloudSun,
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
