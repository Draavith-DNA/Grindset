// Hand-drawn graffiti & motivational scribbles for the background.
// All strokes use currentColor so they adapt to light/dark.
export const GraffitiBackdrop = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden text-ink/[0.07] dark:text-foreground/[0.08] ${className}`}>
    {/* Big "NO DAYS OFF" diagonal */}
    <div className="absolute -top-4 -right-10 rotate-12 font-marker text-[28vw] leading-none whitespace-nowrap select-none">
      NO DAYS OFF
    </div>

    {/* Bottom marker scribble */}
    <div className="absolute bottom-6 -left-2 -rotate-6 font-marker text-6xl sm:text-8xl select-none">
      grind.
    </div>

    {/* Stars / sparks */}
    <svg className="absolute top-24 left-4 h-16 w-16 scribble-draw" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M32 6 L36 26 L56 32 L36 38 L32 58 L28 38 L8 32 L28 26 Z" />
    </svg>

    {/* Lightning bolt */}
    <svg className="absolute top-1/3 right-6 h-24 w-16 -rotate-12 scribble-draw" viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M22 4 L6 44 L18 44 L12 76 L34 32 L20 32 L26 4 Z" />
    </svg>

    {/* Dumbbell doodle */}
    <svg className="absolute bottom-32 right-2 h-20 w-32 rotate-6 scribble-draw" viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <line x1="20" y1="30" x2="100" y2="30" />
      <rect x="6"  y="14" width="14" height="32" />
      <rect x="100" y="14" width="14" height="32" />
      <line x1="14" y1="6" x2="14" y2="10" />
      <line x1="106" y1="50" x2="106" y2="54" />
    </svg>

    {/* Arrow squiggle */}
    <svg className="absolute top-[55%] left-2 h-24 w-24 scribble-draw" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M10 80 C 30 40, 50 90, 70 50 L 70 30 M70 50 L 90 50" />
    </svg>

    {/* Crown */}
    <svg className="absolute top-10 right-10 h-12 w-16 scribble-draw" viewBox="0 0 80 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M6 50 L14 14 L28 36 L40 8 L52 36 L66 14 L74 50 Z" />
    </svg>

    {/* Dots cluster */}
    <div className="absolute bottom-1/3 left-8 grid grid-cols-4 gap-1">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-current" />
      ))}
    </div>
  </div>
);
