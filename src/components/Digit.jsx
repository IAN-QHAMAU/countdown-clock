import { useState, useEffect, useRef } from "react";

/**
 * A single animated digit that flashes when its value changes.
 */
export default function Digit({ value, color = "#e2f0ff", glow = "rgba(100,200,255,0.5)" }) {
  const prev = useRef(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 180);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <span
      style={{
        display: "inline-block",
        minWidth: "0.6em",
        fontVariantNumeric: "tabular-nums",
        color: flash ? "#fff" : color,
        textShadow: flash
          ? `0 0 24px ${glow}, 0 0 8px ${glow}`
          : `0 0 10px ${glow}`,
        transition: "color 0.15s, text-shadow 0.15s",
      }}
    >
      {value}
    </span>
  );
}
