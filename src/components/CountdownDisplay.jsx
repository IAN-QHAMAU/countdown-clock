import ArcRing from "./ArcRing";
import Digit from "./Digit";
import ColonBlink from "./ColonBlink";

const SIZE = 320;

/**
 * The arc ring + central countdown digit display.
 */
export default function CountdownDisplay({ timeLeft, totalSeconds, progress, running, finished }) {
  const cdH = Math.floor(timeLeft / 3600);
  const cdM = Math.floor((timeLeft % 3600) / 60);
  const cdS = timeLeft % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div style={{ position: "relative", width: SIZE, height: SIZE }}>
      <ArcRing progress={progress} size={SIZE} stroke={16} />

      {/* Glass inner panel */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 210,
          height: 210,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.55) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {finished ? (
          /* ── Done state ── */
          <div style={{ textAlign: "center", animation: "popIn 0.3s ease" }}>
            <div
              style={{
                fontSize: 26,
                color: "#FFD700",
                filter: "drop-shadow(0 0 10px #FFD700)",
                letterSpacing: "0.05em",
              }}
            >
              ✦ DONE ✦
            </div>
            <div
              style={{
                fontSize: 8,
                color: "rgba(255,215,0,0.4)",
                letterSpacing: "0.3em",
                marginTop: 4,
              }}
            >
              TIME IS UP
            </div>
          </div>
        ) : (
          /* ── Countdown digits ── */
          <>
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              <Digit value={pad(cdH)[0]} color="#e2f0ff" glow="rgba(100,200,255,0.6)" />
              <Digit value={pad(cdH)[1]} color="#e2f0ff" glow="rgba(100,200,255,0.6)" />
              <ColonBlink running={running} color="#2a4a60" />
              <Digit value={pad(cdM)[0]} color="#c8daff" glow="rgba(140,160,255,0.5)" />
              <Digit value={pad(cdM)[1]} color="#c8daff" glow="rgba(140,160,255,0.5)" />
              <ColonBlink running={running} color="#2a4a60" />
              <Digit value={pad(cdS)[0]} color="#b8d0ff" glow="rgba(160,140,255,0.5)" />
              <Digit value={pad(cdS)[1]} color="#b8d0ff" glow="rgba(160,140,255,0.5)" />
            </div>

            {/* HRS / MIN / SEC labels */}
            <div
              style={{
                display: "flex",
                gap: 14,
                marginTop: 6,
                opacity: 0.35,
              }}
            >
              {["HRS", "MIN", "SEC"].map((l) => (
                <span
                  key={l}
                  style={{
                    fontSize: 7,
                    letterSpacing: "0.2em",
                    color: "#a0c8ff",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>

            {/* Elapsed percentage */}
            {totalSeconds > 0 && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 9,
                  color: "rgba(100,180,255,0.4)",
                  letterSpacing: "0.15em",
                }}
              >
                {Math.round(progress * 100)}% elapsed
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
