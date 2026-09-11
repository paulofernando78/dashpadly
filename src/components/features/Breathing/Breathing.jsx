import { useEffect, useState } from "react";

import {
  WidgetBody,
  widgetInnerBorder,
  WidgetControls,
} from "@/components/ui/Widget";
import { NumberInput } from "@/components/ui/NumberInput";

export function Breathing({ onConfigChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  function handleToggle() {
    setIsRunning((value) => !value);
  }

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setIsRunning(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isRunning]);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleConfirm() {
    onConfigChange?.({});
    setIsEditing(false);
  }

  function handleReset() {
    setIsEditing(false);
    setIsRunning(false);
  }

  const circle = `
    absolute
    w-30
    h-30
    rounded-full
  `;

  return (
    <WidgetBody
      top={<span>1min</span>}
      middle={
        !isEditing ? (
          <div
            className="
            flex
            flex-col
            gap-3
            h-full
            "
          >
            <div className="mx-auto">
              <div
                className="
                  relative
                  grid
                  place-items-center
                  w-50
                  h-50
                "
              >
                <div
                  className={`
                  ${circle}
                    bg-gray-200
                    shadow-[0_0_5px_1px_rgba(255,255,255,0.7)]
                    z-4
                  `}
                ></div>
                <div
                  className={`
                  ${circle}
                    bg-gray-400
                    transition-all
                    duration-4000
                    ease-in-out
                    z-3
                    ${isRunning ? "scale-115" : "scale-100"}
                  `}
                ></div>
                <div
                  className={`
                  ${circle}
                    bg-gray-600
                    transition-all
                    duration-4000
                    ease-in-out
                    z-2
                    ${isRunning ? "scale-130" : "scale-100"}
                  `}
                ></div>
                <div
                  className={`
                  ${circle}
                    bg-gray-800
                    transition-all
                    duration-4000
                    ease-in-out
                    z-1
                    ${
                      isRunning
                        ? "scale-145 shadow-white shadow-[0_0_5px_1px_rgba(255,255,255,0.7)]"
                        : "scale-100 shadow-none"
                    }
                  `}
                ></div>
              </div>
            </div>
            <div
              className={`flex flex-col items-center gap-2 uppercase ${widgetInnerBorder}`}
            >
              <div className="flex flex-col gap-2 justify-evenly">
                <span>...</span>
              </div>
              <span>remaining</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button className="clickable">1min</button>
            <button className="clickable">2min</button>
            <button className="clickable">3min</button>
            <button className="clickable">4min</button>
            <button className="clickable">5min</button>
          </div>
        )
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Play
            isRunning={isRunning}
            onClick={handleToggle}
            // disabled={mode === "done" && !isEditing}
          />
          <WidgetControls.Edit
            isEditing={isEditing}
            onEdit={handleEdit}
            onConfirm={handleConfirm}
          />
          <WidgetControls.Reset onClick={handleReset} />
        </WidgetControls>
      }
    />
  );
}
