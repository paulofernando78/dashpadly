import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";
import { NumberInput } from "@/components/ui/NumberInput";

export function Breathing({ onConfigChange }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleConfirm() {
    onConfigChange?.({});
    setIsEditing(false);
  }

  function handleReset() {
    setIsEditing(false);
  }

  return (
    <WidgetBody
      top={<span>...</span>}
      middle={
        !isEditing ? (
          <div className="relative grid place-items-center border w-50 h-50">
            <div className="absolute w-50 h-50 bg-gray-400 rounded-full"></div>
            <div className="absolute w-45 h-45 bg-gray-300 rounded-full"></div>
            <div className="absolute w-40 h-40 bg-gray-200 rounded-full"></div>
            <div className="absolute w-35 h-35 bg-gray-100 rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 uppercase">
              <span className="place-self-center">inhale</span>
              <NumberInput
                hideLabel
                label="focus"
                name="focus"
                // value={}
                // onChange={}
                min={1}
              />
              <span className="place-self-center">hold</span>
              <NumberInput
                hideLabel
                label="focus"
                name="focus"
                // value={}
                // onChange={}
                min={1}
              />
              <span className="place-self-center">exhale</span>
              <NumberInput
                hideLabel
                label="focus"
                name="focus"
                // value={}
                // onChange={}
                min={1}
              />
            </div>
          </>
        )
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Play
              // isRunning={}
              // onClick={}
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
