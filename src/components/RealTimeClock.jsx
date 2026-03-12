import Digit from "./Digit";
import ColonBlink from "./ColonBlink";
import { useRealTime, formatRealTime } from "../hooks/useRealTime";

/**
 * Live real-time clock header — always ticking.
 */
export default function RealTimeClock() {
  const now = useRealTime();
  const rt  = formatRealTime(now);

  return (
    <div style={{ marginBottom: 28, textAlign: "center", lineHeight: 1 }}>
      {/* Label */}
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.5em",
          color: "rgba(100,180,255,0.35)",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        ◈ Current Time ◈
      </div>

      {/* Digits */}
      <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: "0.08em", color: "#c8e6ff" }}>
        <Digit value={rt.h12[0]} glow="rgba(80,160,255,0.6)" />
        <Digit value={rt.h12[1]} glow="rgba(80,160,255,0.6)" />
        <ColonBlink running={true} color="#3a6080" />
        <Digit value={rt.m[0]} glow="rgba(80,160,255,0.6)" />
        <Digit value={rt.m[1]} glow="rgba(80,160,255,0.6)" />
        <ColonBlink running={true} color="#3a6080" />
        <Digit value={rt.s[0]} glow="rgba(80,160,255,0.6)" />
        <Digit value={rt.s[1]} glow="rgba(80,160,255,0.6)" />
        <span
          style={{
            fontSize: 14,
            color: "rgba(100,180,255,0.5)",
            marginLeft: 6,
            letterSpacing: "0.15em",
          }}
        >
          {rt.ampm}
        </span>
      </div>
    </div>
  );
}
