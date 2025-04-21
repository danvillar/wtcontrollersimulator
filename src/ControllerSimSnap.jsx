import React, { useState } from "react";

const buttons = [
  "UP", "DOWN", "LEFT", "RIGHT", "SETUP RUN", "ENTER", "CANCEL", "HELP", "BACK", "HOME"
];

const bootScreen = `
  SMART CONTROL SYSTEM
  SIMULATOR BOOTING...
  PLEASE WAIT
`;

const mainMenuScreen = `
  1 - Run Screen
  2 - Configure
  3 - Setpoints
  4 - Calibration
  5 - Timers
  6 - Network
  7 - Factory Setup
`;

export default function ControllerSimSnap() {
  const [poweredOn, setPoweredOn] = useState(false);
  const [screen, setScreen] = useState("BOOT");
  const [log, setLog] = useState([]);

  const pressButton = (label) => {
    setLog((prev) => [...prev, label]);
    if (!poweredOn && label === "SETUP RUN") {
      setPoweredOn(true);
      setScreen("MAIN_MENU");
    } else if (label === "HOME") {
      setScreen("MAIN_MENU");
    }
  };

  const displayScreen = () => {
    switch (screen) {
      case "BOOT": return bootScreen;
      case "MAIN_MENU": return mainMenuScreen;
      default: return "[ Unknown Screen ]";
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow w-full">
      <h2 className="text-xl font-bold mb-2">Controller Simulator</h2>

      <pre className="bg-gray-100 p-3 text-sm rounded h-48 overflow-auto">
        {displayScreen()}
      </pre>

      <div className="grid grid-cols-5 gap-2 mt-4">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => pressButton(btn)}
            className="px-2 py-1 border rounded text-xs hover:bg-gray-200"
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <strong>Log:</strong> {log.join(" → ")}
      </div>
    </div>
  );
}
