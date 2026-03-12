/**
 * SVG arc ring that fills clockwise as `progress` goes from 0 → 1.
 * Also renders decorative tick marks around the outside.
 */
export default function ArcRing({ progress, size = 320, stroke = 16 }) {
  const r    = size / 2 - stroke;
  const circ = 2 * Math.PI * r;
  const fill = progress * circ;
  const cx   = size / 2;
  const cy   = size / 2;

  // Glowing tip dot position
  const angle = progress * 2 * Math.PI - Math.PI / 2;
  const dx    = cx + r * Math.cos(angle);
  const dy    = cy + r * Math.sin(angle);

  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00c6ff" />
          <stop offset="50%"  stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer tick marks */}
      {Array.from({ length: 60 }, (_, i) => {
        const a   = (i / 60) * 2 * Math.PI - Math.PI / 2;
        const maj = i % 5 === 0;
        const r1  = r + stroke / 2 + (maj ? 8 : 4);
        const r2  = r + stroke / 2 + (maj ? 16 : 9);
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
            stroke={maj ? "rgba(100,180,255,0.35)" : "rgba(100,180,255,0.12)"}
            strokeWidth={maj ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Background ring */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={stroke}
      />

      {/* Progress arc */}
      {progress > 0 && (
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`}
          strokeDashoffset={circ * 0.25}
          filter="url(#arcGlow)"
          style={{ transition: "stroke-dasharray 0.25s ease" }}
        />
      )}

      {/* Glowing tip dot */}
      {progress > 0.005 && progress < 0.999 && (
        <circle cx={dx} cy={dy} r={7} fill="white" filter="url(#dotGlow)" />
      )}
    </svg>
  );
}
