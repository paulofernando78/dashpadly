import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

import { widgetCatalog } from "./WidgetCatalog";

import { widgetHeight, widgetBorder } from "@/components/ui/Widget";

export function WidgetPicker({ onAdd, ref }) {
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

  const widgetsByCategory = Object.entries(widgetCatalog).reduce(
    (categories, [widgetId, widget]) => {
      const category = widget.category;

      if (!categories[category]) {
        categories[category] = [];
      }

      categories[category].push({
        widgetId,
        widget,
      });

      return categories;
    },
    {},
  );

  function handleAdd(type) {
    onAdd(type);
    setIsOpen(false);
  }

  const widgetPickerBorder = `
    rounded!
  `;

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
          className={`
            font-['Oswald_Variable']
            scroll-mr-2
            ${widgetBorder}
          `}
        >
          <header className="header grid text-center">
            <span>Select</span>
          </header>
          <div
            className={`
              flex
              flex-col
              gap-4
              ${widgetHeight}
              pt-2
              pr-1
              pb-2
              pl-2              
              overflow-y-auto
              `}
          >
            {Object.entries(widgetsByCategory).map(([category, widgets]) => (
              <section key={category}>
                <h3
                  className="
                    mb-2
                    text-sm
                    font-bold
                  "
                >
                  {category}
                </h3>

                <div
                  className="
                    flex
                    flex-col
                    gap-2
                  "
                >
                  {widgets.map(({ widgetId, widget }) => (
                    <button
                      key={widgetId}
                      type="button"
                      onClick={() => handleAdd(widgetId)}
                      style={widget.widgetStyle}
                      className={`clickable ${widgetPickerBorder} bg-slate-500`}
                    >
                      <span>{widget.title}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
