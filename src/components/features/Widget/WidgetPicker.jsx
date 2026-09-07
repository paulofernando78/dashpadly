import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

import { widgetCatalog } from "./WidgetCatalog";

export const WidgetPicker = ({ onAdd, ref }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  function handleClick() {
    setIsOpen((currentIsOpen) => {
      const nextIsOpen = !currentIsOpen;

      if (nextIsOpen) {
        requestAnimationFrame(() => {
          pickerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "end",
          });
        });
      }

      return nextIsOpen;
    });
  }

  function handleAdd(type) {
    onAdd(type);
    setIsOpen(false);
  }

  return (
    <div
      ref={ref}
      className="
      flex
      gap-2
      uppercase
      widget-body-height
      scroll-mr-2
      "
    >
      <button
        type="button"
        aria-label="Add widget"
        onClick={handleClick}
        className="
          grid
          place-items-center
          h-full
        "
      >
        {isOpen ? <Icon name="minus" /> : <Icon name="plus" />}
      </button>
      {isOpen && (
        <div
          ref={pickerRef}
          className="
            font-['Oswald_Variable']
            scroll-mr-2
          "
        >
          <div
            className={`
              flex
              flex-col
              gap-2
              p-2
              bg-gray-500/30
              rounded-lg
              overflow-y-auto
              widget-body-height
              `}
          >
            {Object.entries(widgetCatalog).map(([type, widget]) => (
              <button
                key={type}
                type="button"
                onClick={() => handleAdd(type)}
                style={widget.widgetStyle}
                className={`clickable widget-picker ${widget.widgetClassName}`}
              >
                {widget.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
