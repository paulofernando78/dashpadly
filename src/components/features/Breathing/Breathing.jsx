import { useEffect, useState, useRef } from "react";

import {
  WidgetBody,
  widgetInnerBorder,
  WidgetControls,
} from "@/components/ui/Widget";

const phases = {
  breatheIn: {
    label: "breathe in",
    duration: 4000,
    scale: "scale-145",
  },
  hold: {
    label: "hold",
    duration: 2000,
    scale: "scale-145",
  },
  breatheOut: {
    label: "breathe out",
    duration: 4000,
    scale: "scale-100",
  },
};

export function Breathing({ onConfigChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("breatheIn");
  const audioRef = useRef(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      if (phase === "breatheIn") {
        setPhase("hold");
      } else if (phase === "hold") {
        setPhase("breatheOut");
      } else {
        setPhase("breatheIn");
        setIsRunning(false);
      }
    }, phases[phase].duration);

    return () => clearTimeout(timer);
  }, [isRunning, phase]);

  const currentPhase = phases[phase];

  const isExpanded = isRunning && phase !== "breatheOut";

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
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }

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
      top={
        <div className="flex flex-col items-center gap-4">
          <span>1:00</span>
          <audio
            ref={audioRef}
            src="/assets/poly-ambient-boy.mp3"
            loop
            preload="auto"
          />
          <WidgetControls.Sound
            isSoundEnabled={isSoundEnabled}
            onClick={handleToggleSound}
          />
        </div>
      }
      middlePosition={isEditing ? "top" : "center"}
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
                  <div className="grid gap-2 text-lg text-gray-800 shadow shadow-black uppercase z-5">
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
          <div className="flex flex-col items-center gap-2">
            <button className="clickable">4 - 2 - 4</button>
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
