import { useState } from "react";

import RealTimeClock     from "./components/RealTimeClock";
import CountdownDisplay  from "./components/CountdownDisplay";
import TimeSetPanel      from "./components/TimeSetPanel";
import Controls          from "./components/Controls";
import { useCountdown }  from "./hooks/useCountdown";

export default function App() {
  // Duration inputs (controlled by the set-panel)
  const [inputH, setInputH] = useState(3);
  const [inputM, setInputM] = useState(0);
  const [inputS, setInputS] = useState(0);

  const {
    timeLeft,
    totalSeconds,
    running,
    finished,
    mode,
    progress,
    start,
    togglePause,
    reset,
  } = useCountdown();

  // Derive the total seconds from the current inputs
  const currentTotal = () => inputH * 3600 + inputM * 60 + inputS;

  /* ── input handlers — keep preview in sync while in set-mode ── */
  function handleH(v) {
    setInputH(v);
    if (!running && mode === "set") reset(v * 3600 + inputM * 60 + inputS);
  }
  function handleM(v) {
    setInputM(v);
    if (!running && mode === "set") reset(inputH * 3600 + v * 60 + inputS);
  }
  function handleS(v) {
    setInputS(v);
    if (!running && mode === "set") reset(inputH * 3600 + inputM * 60 + v);
  }
  function handlePreset(h, m, s) {
    setInputH(h); setInputM(m); setInputS(s);
    if (!running && mode === "set") reset(h * 3600 + m * 60 + s);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06090f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        position: "relative",
        overflow: "hidden",
        padding: "20px 0",
      }}
    >
      {/* ── Decorative background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,150,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(0,150,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,100,255,0.05) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Real-time clock ── */}
      <RealTimeClock />

      {/* ── Divider ── */}
      <div
        style={{
          width: 260,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(100,180,255,0.15), transparent)",
          marginBottom: 28,
        }}
      />

      {/* ── Countdown arc + digits ── */}
      <CountdownDisplay
        timeLeft={timeLeft}
        totalSeconds={totalSeconds}
        progress={progress}
        running={running}
        finished={finished}
      />

      {/* ── Duration setter ── */}
      <TimeSetPanel
        h={inputH} m={inputM} s={inputS}
        onChangeH={handleH}
        onChangeM={handleM}
        onChangeS={handleS}
        onPreset={handlePreset}
      />

      {/* ── Controls ── */}
      <Controls
        mode={mode}
        running={running}
        finished={finished}
        onStart={() => start(currentTotal())}
        onTogglePause={togglePause}
        onReset={() => reset(currentTotal())}
      />
    </div>
  );
}
