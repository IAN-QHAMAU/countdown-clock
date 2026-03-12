/** Single spin-wheel number input (hours / minutes / seconds). */
export default function SpinInput({ value, max, label, onChange }) {
  const handleUp    = () => onChange((value + 1) % (max + 1));
  const handleDown  = () => onChange((value - 1 + max + 1) % (max + 1));
  const handleChange = (e) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v) && v >= 0 && v <= max) onChange(v);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <button onClick={handleUp} style={arrowStyle}>▲</button>

      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={handleChange}
        style={{
          width: 52,
          height: 44,
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(100,180,255,0.25)",
          borderRadius: 6,
          color: "#a8d8ff",
          fontSize: 22,
          fontFamily: "'Courier New', monospace",
          fontWeight: 700,
          textAlign: "center",
          outline: "none",
        }}
      />

      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "rgba(100,180,255,0.35)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      <button onClick={handleDown} style={arrowStyle}>▼</button>
    </div>
  );
}

const arrowStyle = {
  background: "none",
  border: "1px solid rgba(100,180,255,0.15)",
  borderRadius: 4,
  color: "rgba(100,180,255,0.5)",
  cursor: "pointer",
  fontSize: 10,
  width: 28,
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s",
  fontFamily: "inherit",
  padding: 0,
};
