import { useEffect, useState } from "react";

type Mood = "idle" | "hype" | "thinking" | "proud" | "scolding";

interface RobotProps {
  mood?: Mood;
  size?: number;
  speech?: string;
}

/**
 * Reactive robot mascot — purely SVG, no images.
 * Reacts via mood prop: bobs idle, shakes when hyped, etc.
 */
export const Robot = ({ mood = "idle", size = 140, speech }: RobotProps) => {
  const [eyeBlink, setEyeBlink] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 140);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const animClass =
    mood === "hype" ? "robot-shake" :
    mood === "thinking" ? "" :
    "robot-bob";

  const mouthPath =
    mood === "hype" ? "M40 72 Q60 92 80 72" :
    mood === "proud" ? "M40 74 Q60 88 80 74" :
    mood === "scolding" ? "M42 80 L78 80" :
    mood === "thinking" ? "M44 78 Q60 74 76 78" :
    "M44 76 Q60 84 76 76";

  const cheekColor = mood === "hype" || mood === "proud" ? "hsl(var(--accent))" : "transparent";

  return (
    <div className="relative inline-block">
      <div className={animClass} style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 140" className="h-full w-full">
          {/* Antenna */}
          <line x1="60" y1="6" x2="60" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="6" r="4" fill="hsl(var(--accent))" />
          {mood === "hype" && (
            <>
              <line x1="60" y1="2" x2="54" y2="-2" stroke="hsl(var(--accent))" strokeWidth="2" />
              <line x1="60" y1="2" x2="66" y2="-2" stroke="hsl(var(--accent))" strokeWidth="2" />
              <line x1="60" y1="0" x2="60" y2="-4" stroke="hsl(var(--accent))" strokeWidth="2" />
            </>
          )}

          {/* Head */}
          <rect x="14" y="22" width="92" height="78" rx="10" fill="hsl(var(--card))" stroke="currentColor" strokeWidth="3" />

          {/* Screen */}
          <rect x="22" y="32" width="76" height="58" rx="6" fill="hsl(var(--ink))" />

          {/* Eyes */}
          <g fill="hsl(var(--highlight))">
            <rect x="36" y="48" width="14" height={eyeBlink ? 2 : 14} rx="2"
              style={{ transition: "height 80ms" }} />
            <rect x="70" y="48" width="14" height={eyeBlink ? 2 : 14} rx="2"
              style={{ transition: "height 80ms" }} />
          </g>

          {/* Cheeks */}
          <circle cx="32" cy="76" r="4" fill={cheekColor} opacity="0.85" />
          <circle cx="88" cy="76" r="4" fill={cheekColor} opacity="0.85" />

          {/* Mouth */}
          <path d={mouthPath} stroke="hsl(var(--highlight))" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Body / neck */}
          <rect x="48" y="100" width="24" height="10" fill="hsl(var(--card))" stroke="currentColor" strokeWidth="3" />
          <rect x="28" y="110" width="64" height="22" rx="4" fill="hsl(var(--accent))" stroke="currentColor" strokeWidth="3" />
          <text x="60" y="125" textAnchor="middle" fontFamily="Archivo Black, sans-serif" fontSize="10" fill="hsl(var(--accent-foreground))">GRIND-01</text>
        </svg>
      </div>

      {speech && (
        <div className="absolute left-full top-2 ml-3 hidden sm:block">
          <div className="relative bg-card border-2 border-ink px-3 py-2 shadow-brutal max-w-[220px] text-sm font-medium">
            <span className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">grind-01</span>
            {speech}
            <span className="absolute -left-2 top-4 h-3 w-3 bg-card border-l-2 border-b-2 border-ink rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};
