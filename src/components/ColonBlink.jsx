import { useState, useEffect } from "react";

/**
 * A blinking colon separator — blinks when `running` is true.
 */
export default function ColonBlink({ running, color = "#4a7fa0" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!running) {
      setVisible(true);
      return;
    }
    const t = setInterval(() => setVisible((v) => !v), 500);
    return () => clearInterval(t);
  }, [running]);

  return (
    <span
      style={{
        color,
        opacity: visible ? 1 : 0.1,
        transition: "opacity 0.1s",
        userSelect: "none",
      }}
    >
      :
    </span>
  );
}
