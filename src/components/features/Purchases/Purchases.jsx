import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export const Purchases = () => {
  const [isEditing, setIsEditing] = useState(false);

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
          <WidgetControls.Reset onClick={handleReset} />
         
        </WidgetControls>
      }
    />
  );
};
