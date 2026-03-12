import { useState } from "react";

/** Start / Pause-Resume / Reset control buttons. */
export default function Controls({ mode, running, finished, onStart, onTogglePause, onReset }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
      {/* Start — only shown in set mode when not finished */}
      {!finished && mode === "set" && (
        <Btn onClick={onStart} accent="#00c6ff" label="▶ Start" />
      )}

      {/* Pause / Resume — only shown while running or paused */}
      {!finished && mode === "running" && (
        <Btn
          onClick={onTogglePause}
          accent={running ? "#f97316" : "#00c6ff"}
          label={running ? "⏸ Pause" : "▶ Resume"}
        />
      )}

      {/* Reset — always visible */}
      <Btn onClick={onReset} accent="rgba(255,255,255,0.2)" label="↺ Reset" dim />
    </div>
  );
}

function Btn({ onClick, label, accent, dim }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "11px 26px",
        background: hovered ? `${accent}22` : "rgba(0,0,0,0.3)",
        border: `1px solid ${hovered ? accent : dim ? "rgba(255,255,255,0.1)" : `${accent}55`}`,
        color: hovered
          ? accent
          : dim
          ? "rgba(255,255,255,0.3)"
          : `${accent}cc`,
        fontSize: 11,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: 4,
        fontFamily: "'Courier New', monospace",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
