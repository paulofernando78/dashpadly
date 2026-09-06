import { Icon } from "@/components/ui/Icon";
import { widgetImages } from "@/assets/widgetImages";

export const WidgetContainer = ({ children }) => {
  return <div className="flex gap-2">{children}</div>;
};

export const WidgetCard = ({
  widgetClassName = "bg-gray-500/30",
  widgetStyle,
  imageName,
  onClose,
  children,
  ref,
}) => {
  return (
    <article
      ref={ref}
      className="
        font-['Oswald_Variable']
        scroll-mr-2
      "
    >
      <div
        style={widgetStyle}
        className={`
          widget-width
          widget-body-height
        text-white
          rounded-lg
          overflow-hidden
          [text-shadow:0_0_6px_rgba(255,255,255,0.2)]
          global-border
          ${widgetClassName}
          `}
      >
        <div className="flex h-full flex-col">
          <WidgetHeader imageName={imageName} onClose={onClose} />
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </article>
  );
};

const WidgetHeader = ({ imageName, onClose }) => {
  return (
    <div
      className="
        flex
        justify-between
        gap-2
        mb-4
      "
    >
      <WindowControls onClose={onClose} />
      <WidgetIcons imageName={imageName} />
    </div>
  );
};

const WindowControls = ({ onClose }) => {
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
        className="window-control bg-red-400"
      >
        <Icon name="x" size={10} className="text-gray-600" />
      </button>
      {/* <button
        type="button"
        title="minimize"
        aria-label="minimize widget"
        className="window-control bg-yellow-500"
      >
        <Icon name="minus" size={10} />
      </button> */}
      <button
        type="button"
        title="maximize"
        aria-label="maximize widget"
        className="window-control bg-green-600"
      >
        <Icon name="maximize2" size={10} />
      </button>
    </div>
  );
};

const WidgetIcons = ({ imageName }) => {
  const widgetImage = widgetImages[imageName];

  return (
    <div
      className="
        flex
        min-w-0
        items-center
      "
    >
      {widgetImage && (
        <img
          width="100"
          height="100"
          src={widgetImage.src}
          alt={widgetImage.alt}
          className="
            size-7
            shrink-0
            pointer-events-none
          "
        />
      )}
    </div>
  );
};

export const WidgetBody = ({ top, middle, subMiddle, bottom }) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        h-full
      "
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
          className="
          flex
          flex-col
          items-center
          justify-center
          w-full
          h-full
          min-h-0
        "
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
      {bottom && <div className="self-center">{bottom}</div>}
    </div>
  );
};

export const WidgetControls = ({ children }) => {
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
};

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
