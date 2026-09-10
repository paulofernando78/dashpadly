import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export function QuickNotes({ note = "", onConfigChange, onClose }) {
  const [currentNote, setCurrentNote] = useState(note);

  function handleNoteChange(event) {
    const nextNote = event.target.value;

    setCurrentNote(nextNote);
    onConfigChange?.({ note: nextNote });
  }

  function handleReset() {
    setCurrentNote("");
    onConfigChange?.({ note: "" });
  }

  return (
    <WidgetBody onClose={onClose}
      middle={
          <div className="w-full h-full">
            <textarea
              value={currentNote}
              onChange={handleNoteChange}
              placeholder="Quick notes..."
              className="
                  w-full    
                  h-full
                  text-black
                  font-['Indie_Flower',cursive]
                  rounded
                  leading-6
                  resize-none
                "
            />
          </div>
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Reset onClick={handleReset} />
          <WidgetControls.Undo onClick={handleReset} />
          <WidgetControls.Redo onClick={handleReset} />
        </WidgetControls>
      }
    />
  );
}
