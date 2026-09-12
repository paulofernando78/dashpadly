import { useEffect, useState, useRef } from "react";

import {
  WidgetBody,
  widgetInnerBorder,
  WidgetControls,
} from "@/components/ui/Widget";

const presets = {
  relaxed: {
    label: "4-2-4",
    phases: [
      {
        id: "breatheIn",
        label: "breathe in",
        duration: 4000,
        scale: "scale-145",
      },
      {
        id: "hold",
        label: "hold",
        duration: 2000,
        scale: "scale-145",
      },
      {
        id: "breatheOut",
        label: "breathe out",
        duration: 4000,
        scale: "scale-100",
      },
    ],
  },
  box: {
    label: "4-4-4-4",
    phases: [
      {
        id: "breatheIn",
        label: "breathe in",
        duration: 4000,
        scale: "scale-145",
      },
      {
        id: "holdIn",
        label: "hold",
        duration: 4000,
        scale: "scale-145",
      },
      {
        id: "breatheOut",
        label: "breathe out",
        duration: 4000,
        scale: "scale-100",
      },
      {
        id: "holdOut",
        label: "hold",
        duration: 4000,
        scale: "scale-100",
      },
    ],
  },
};

export function Breathing({ onConfigChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [presetId, setPresetId] = useState("relaxed");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(60);
  const audioRef = useRef(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const currentPreset = presets[presetId];
  const currentPhase = currentPreset.phases[phaseIndex];

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setPhaseIndex(
        (index) => (index + 1) % currentPreset.phases.length,
      );
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [
    isRunning,
    phaseIndex,
    currentPhase.duration,
    currentPreset.phases.length,
  ]);

  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) return;

    const timer = setTimeout(() => {
      setRemainingSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, remainingSeconds]);

  useEffect(() => {
    if (!isRunning || remainingSeconds !== 0) return;

    setIsRunning(false);
    setPhaseIndex(0);
    audioRef.current?.pause();
  }, [isRunning, remainingSeconds]);

  const isExpanded = isRunning && currentPhase.scale === "scale-145";

  const displayMinutes = Math.floor(remainingSeconds / 60);
  const displaySeconds = String(remainingSeconds % 60).padStart(2, "0");

  function handleToggleSound() {
    const nextEnabled = !isSoundEnabled;

    setIsSoundEnabled(nextEnabled);

    if (audioRef.current) {
      audioRef.current.muted = !nextEnabled;
    }
  }

  function handleToggle() {
    const nextRunning = !isRunning;

    setIsRunning(nextRunning);

    if (nextRunning) {
      if (remainingSeconds === 0) {
        setRemainingSeconds(sessionMinutes * 60);
        setPhaseIndex(0);
      }

      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSelectPreset(id) {
    setPresetId(id);
    setPhaseIndex(0);
  }

  function handleSelectDuration(minutes) {
    setSessionMinutes(minutes);

    if (!isRunning) {
      setRemainingSeconds(minutes * 60);
    }
  }

  function handleConfirm() {
    onConfigChange?.({});
    setIsEditing(false);
  }

  function handleReset() {
    setIsEditing(false);
    setIsRunning(false);
    setPhaseIndex(0);
    setRemainingSeconds(sessionMinutes * 60);
    audioRef.current?.pause();
  }

  const circle = `
    absolute
    w-30
    h-30
    rounded-full
  `;

  return (
    <WidgetBody
      top={
        <div className="flex flex-col items-center gap-4">
          <span>
            {displayMinutes}:{displaySeconds}
          </span>
          <audio
            ref={audioRef}
            src="/assets/poly-ambient-boy.mp3"
            loop
            preload="auto"
          />
          {!isEditing && (
            <WidgetControls.Sound
              isSoundEnabled={isSoundEnabled}
              onClick={handleToggleSound}
            />
          )}
        </div>
      }
      middle={
        !isEditing ? (
          <>
            <div
              className="
              flex
              flex-col
              h-full
              justify-center
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
                    className="
                      grid
                      gap-2
                      text-lg
                      text-gray-800
                      [text-shadow:0_0_4px_rgba(0,0,0,0.35)] uppercase
                      z-5
                    "
                  >
                    <span>{currentPhase.label}</span>
                  </div>
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
                      ease-in-out
                      z-3
                      ${isExpanded ? "scale-115" : "scale-100"}
                    `}
                    style={{
                      transitionDuration: `${currentPhase.duration}ms`,
                    }}
                  ></div>
                  <div
                    className={`
                    ${circle}
                      bg-gray-600
                      transition-all
                      ease-in-out
                      z-2
                      ${isExpanded ? "scale-130" : "scale-100"}
                    `}
                    style={{
                      transitionDuration: `${currentPhase.duration}ms`,
                    }}
                  ></div>
                  <div
                    className={`
                    ${circle}
                      bg-gray-800
                      transition-all
                      ease-in-out
                      z-1
                      ${
                        isExpanded
                          ? "scale-145 shadow-white shadow-[0_0_5px_1px_rgba(255,255,255,0.7)]"
                          : "scale-100 shadow-none"
                      }
                    `}
                    style={{
                      transitionDuration: `${currentPhase.duration}ms`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <span>Breathing pattern</span>

              {Object.entries(presets).map(([id, preset]) => (
                <button
                  key={id}
                  onClick={() => handleSelectPreset(id)}
                  aria-pressed={presetId === id}
                  className={`
          clickable
          ${presetId === id ? "font-bold" : "opacity-50"}
        `}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <span>Session duration</span>

              {[1, 2, 3, 4, 5].map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => handleSelectDuration(minutes)}
                  aria-pressed={sessionMinutes === minutes}
                  className={`
          clickable
          ${sessionMinutes === minutes ? "font-bold" : "opacity-50"}
        `}
                >
                  {minutes} minute{minutes > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>
        )
      }
      subMiddle={
        !isEditing && (
          <div className={`w-full text-center uppercase ${widgetInnerBorder}`}>
            <span>done</span>
          </div>
        )
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Play isRunning={isRunning} onClick={handleToggle} />
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
