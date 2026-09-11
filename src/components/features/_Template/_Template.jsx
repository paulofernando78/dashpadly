import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export function Template({ onConfigChange }) {
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
      middle={!isEditing ? (
        <span>...</span>
        ) : ( 
          <span>editing...</span>
        )}
      bottom={
        <WidgetControls>
          <WidgetControls.Play
              // isRunning={isRunning}
              // onClick={handleToggle}
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