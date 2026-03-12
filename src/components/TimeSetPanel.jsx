import SpinInput from "./SpinInput";

const PRESETS = [
  { label: "5m",  h: 0, m: 5,  s: 0 },
  { label: "15m", h: 0, m: 15, s: 0 },
  { label: "30m", h: 0, m: 30, s: 0 },
  { label: "1h",  h: 1, m: 0,  s: 0 },
  { label: "3h",  h: 3, m: 0,  s: 0 },
];

/**
 * Panel with spin-inputs for H/M/S and quick preset buttons.
 * `onPreset` fires when a preset is picked; `onChange` fires on any spin.
 */
export default function TimeSetPanel({ h, m, s, onChangeH, onChangeM, onChangeS, onPreset }) {
  return (
    <div
      style={{
        marginTop: 28,
        padding: "20px 28px",
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(100,180,255,0.1)",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontSize: 8,
          letterSpacing: "0.4em",
          color: "rgba(100,180,255,0.35)",
          textTransform: "uppercase",
        }}
      >
        Set Countdown Duration
      </div>

      {/* Spin inputs */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <SpinInput value={h} max={23} label="hours" onChange={onChangeH} />
        <Separator />
        <SpinInput value={m} max={59} label="min"   onChange={onChangeM} />
        <Separator />
        <SpinInput value={s} max={59} label="sec"   onChange={onChangeS} />
      </div>

      {/* Quick presets */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {PRESETS.map((p) => (
          <PresetButton key={p.label} label={p.label} onClick={() => onPreset(p.h, p.m, p.s)} />
        ))}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div
      style={{
        color: "rgba(100,180,255,0.3)",
        fontSize: 28,
        paddingTop: 10,
        userSelect: "none",
      }}
    >
      :
    </div>
  );
}

function PresetButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 10px",
        background: "rgba(100,180,255,0.05)",
        border: "1px solid rgba(100,180,255,0.15)",
        borderRadius: 4,
        color: "rgba(100,180,255,0.5)",
        fontSize: 10,
        letterSpacing: "0.1em",
        cursor: "pointer",
        fontFamily: "'Courier New', monospace",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(100,180,255,0.12)";
        e.currentTarget.style.color = "#80c0ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(100,180,255,0.05)";
        e.currentTarget.style.color = "rgba(100,180,255,0.5)";
      }}
    >
      {label}
    </button>
  );
}
