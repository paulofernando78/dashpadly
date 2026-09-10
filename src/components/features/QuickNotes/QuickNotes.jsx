import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export function QuickNotes({ note = "", onConfigChange, onClose }) {
  const [currentNote, setCurrentNote] = useState(note);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  function handleNoteChange(event) {
    const nextNote = event.target.value;

    setPast((currentPast) => [...currentPast, currentNote]);
    setFuture([]);
    setCurrentNote(nextNote);
    onConfigChange?.({ note: nextNote });
  }

  function handleUndo() {
    if (past.length === 0) return;

    const previousNote = past.at(-1);

    setPast((currentPast) => currentPast.slice(0, -1));
    setFuture((currentFuture) => [...currentFuture, currentNote]);
    setCurrentNote(previousNote);
    onConfigChange?.({ note: previousNote });
  }

  function handleRedo() {
    if (future.length === 0) return;

    const nextNote = future.at(-1);

    setFuture((currentFuture) => currentFuture.slice(0, -1));
    setPast((currentPast) => [...currentPast, currentNote]);
    setCurrentNote(nextNote);
    onConfigChange?.({ note: nextNote });
  }

  function handleReset() {
    setCurrentNote("");
    onConfigChange?.({ note: "" });
  }

  return (
    <WidgetBody
      onClose={onClose}
      middle={
        <div className="h-full">
          <textarea
            value={currentNote}
            onChange={handleNoteChange}
            placeholder="Quick notes..."
            className="
                  text-xl
                  text-black
                  font-['Indie_Flower',cursive]
                  rounded
                  leading-6
                  resize-none
                  outline-0
                "
          />
        </div>
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Reset onClick={handleReset} />
          <WidgetControls.Undo onClick={handleUndo} />
          <WidgetControls.Redo onClick={handleRedo} />
        </WidgetControls>
      }
    />
  );
}
