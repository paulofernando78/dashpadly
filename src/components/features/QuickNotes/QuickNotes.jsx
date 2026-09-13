import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

import { Icon } from "@/components/ui/Icon";
import { TextInput } from "@/components/ui/TextInput";
import { CheckboxIcon } from "@/components/ui/CheckboxIcon";

export function QuickNotes({ note = "", onConfigChange, onClose }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [addBlock, setAddBlock] = useState();
  const [currentNote, setCurrentNote] = useState(note);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  function handleOpenMenu() {
    setOpenMenu((current) => !current);
  }

  function handleAddBlock() {}

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
      middlePosition="top"
      middle={
        <div className="flex items-center border border-black">
          <div className="relative flex items-center">
            <TextInput className="text-gray-800 border" />
            <CheckboxIcon />
          </div>
        </div>
      }
      bottom={
        <WidgetControls>
          <div className="relative">
            {openMenu && (
              <div className="absolute bottom-12 grid gap-2 p-2 bg-[#333333] rounded text">
                <div className="flex items-center gap-2">
                  <Icon name="type" />
                  <span>Text</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="squareCheck" />
                  <span>Checkbox</span>
                </div>
              </div>
            )}
            <WidgetControls.Add onClick={handleOpenMenu} />
          </div>
          <WidgetControls.Reset onClick={handleReset} />
          <WidgetControls.Undo onClick={handleUndo} />
          <WidgetControls.Redo onClick={handleRedo} />
        </WidgetControls>
      }
    />
  );
}
