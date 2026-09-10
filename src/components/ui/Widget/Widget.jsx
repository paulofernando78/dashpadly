import { Icon } from "@/components/ui/Icon";

export function WidgetContainer({ children }) {
  return <div className="flex gap-2">{children}</div>;
}
const widgetWidth = `w-[194px]`;
export const widgetHeight = `h-[388px]`;
const clockWidth = `min-w-[295px] w-[295px]`;

export const widgetInnerBorder = `
  p-2
  rounded-md
  bg-gray-500/90
`;

export function WidgetCard({
  widgetClassName = "bg-gray-500/30",
  widgetStyle,
  iconName,
  onClose,
  children,
  ref,
}) {
  return (
    <article
      ref={ref}
      className={`
        font-['Oswald_Variable']
        scroll-mr-2
        global-border-style
        
      `}
    >
      <WidgetHeader iconName={iconName} onClose={onClose} />
      <div
        style={widgetStyle}
        className={`
            ${widgetHeight}
            rounded-t-0
            rounded-bl-[7px]
            rounded-br-[7px]
            [text-shadow:0_0_6px_rgba(255,255,255,0.2)]
            ${widgetClassName}
            `}
      >
        <div className="flex h-full flex-col">
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </article>
  );
}

const windowControl = `
  grid
  place-items-center
  size-4
  rounded-full
  
`;

function WidgetHeader({ iconName, onClose }) {
  return (
    <div className="header">
      <WindowControls onClose={onClose} />
      <Icon name="gripHorizontal" />
      <WidgetIcons iconName={iconName} />
    </div>
  );
}

function WindowControls({ onClose }) {
  return (
    <div
      className="
        flex
        gap-1.5
      "
    >
      <button
        type="button"
        title="close"
        aria-label="close widget"
        onClick={onClose}
        className={`${windowControl} bg-red-400`}
      >
        <Icon name="x" size={10} className="text-gray-600" />
      </button>
      <button
        type="button"
        title="maximize"
        aria-label="maximize widget"
        className={`${windowControl} bg-green-600`}
      >
        <Icon name="maximize2" size={10} />
      </button>
      {/* <button
        type="button"
        title="minimize"
        aria-label="minimize widget"
        className="window-control bg-yellow-500"
      >
        <Icon name="minus" size={10} />
      </button> */}
    </div>
  );
}

function WidgetIcons({ iconName }) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center
      "
    >
      <Icon name={iconName} cursorNone />
    </div>
  );
}

export function WidgetBody({
  width,
  top,
  middlePosition,
  middle,
  subMiddle,
  bottomPosition,
  bottom,
  className,
}) {
  return (
    <div
      className={`
        ${width === "clock" ? clockWidth : widgetWidth}
        flex
        flex-col
        gap-4
        h-full
        p-4
        ${className}
      `}
    >
      {top && (
        <div
          className="
            w-full
            text-center
            text-3xl
            font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]
            font-bold
            leading-none
          "
        >
          {top}
        </div>
      )}
      {middle && (
        <div
          className={`
            flex
            flex-col
            ${middlePosition === "top" ? "justify-start" : "justify-center"}
            w-full
            ${bottomPosition ? "" : "h-full"}
            min-h-0
          `}
        >
          {middle}
        </div>
      )}
      {subMiddle && (
        <div
          className="
          flex
          flex-col
          items-center
        "
        >
          {subMiddle}
        </div>
      )}
      {bottom && (
        <div
          className={`
            ${
              bottomPosition === "left"
                ? "flex-1 w-full min-h-0 self-start"
                : "self-center"
            }
          `}
        >
          {bottom}
        </div>
      )}
    </div>
  );
}

export function WidgetControls({ children }) {
  return (
    <>
      <div
        className="
          flex
          gap-2          
        "
      >
        {children}
      </div>
    </>
  );
}

WidgetControls.Play = ({ isRunning, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:cursor-not-allowed disabled:opacity-40 clickable"
    >
      <Icon name={isRunning ? "circlePause" : "circlePlay"} />
    </button>
  );
};

WidgetControls.Reset = ({ onClick }) => {
  return (
    <button onClick={onClick} className="clickable">
      <Icon name="rotateCcw" />
    </button>
  );
};

WidgetControls.Undo = ({ onClick }) => {
  return (
    <button onClick={onClick} className="clickable">
      <Icon name="undo" />
    </button>
  );
};

WidgetControls.Redo = ({ onClick }) => {
  return (
    <button onClick={onClick} className="clickable">
      <Icon name="redo" />
    </button>
  );
};

WidgetControls.Edit = ({ isEditing, onEdit, onConfirm }) => {
  return isEditing ? (
    <button onClick={onConfirm} className="clickable">
      <Icon name="check" />
    </button>
  ) : (
    <button onClick={onEdit} className="clickable">
      <Icon name="squarePen" />
    </button>
  );
};

WidgetControls.Info = ({ onClick, ...props }) => {
  return (
    <button type="button" onClick={onClick} {...props} className="clickable">
      <Icon name="info" />
    </button>
  );
};

// WidgetControls.Erase = ({ onClick }) => {
//   return (
//     <button onClick={onClick} className="clickable">
//       <Icon name="trash" />
//     </button>
//   );
// };
