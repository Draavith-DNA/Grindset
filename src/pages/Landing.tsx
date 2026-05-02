import { useNavigate } from "react-router-dom";
import { GraffitiBackdrop } from "@/components/GraffitiBackdrop";
import { Robot } from "@/components/Robot";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUser } from "@/lib/user";
import { useEffect } from "react";

const Landing = () => {
  const nav = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user?.onboarded) nav("/dashboard", { replace: true });
    else if (user) nav("/onboarding", { replace: true });
  }, [user, nav]);

  return (
    <div className="relative min-h-dvh bg-background text-foreground grain overflow-hidden">
      <GraffitiBackdrop />

      <div className="relative z-10 mx-auto max-w-md px-5 pt-6 safe-top">
        <div className="flex justify-between items-center">
          <span className="font-mono-px text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            est. 2026 — issue №01
          </span>
          <ThemeToggle />
        </div>

        <div className="mt-12">
          <h1 className="font-display text-7xl sm:text-8xl leading-[0.85] tracking-tighter">
            GRIND<br />
            <span className="spray-highlight">SET</span>
          </h1>
          <p className="mt-6 text-lg max-w-sm">
            An AI coach with attitude. Workouts, diet, and a robot that <span className="font-marker text-accent">won't</span> let you skip leg day.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Robot mood="hype" size={180} />
        </div>

        <div className="mt-10 space-y-3">
          <button
            onClick={() => nav("/login")}
            className="w-full bg-ink text-paper py-4 font-display text-xl tracking-wide border-2 border-ink shadow-brutal-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            START THE GRIND →
          </button>
          <p className="text-center font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">
            no excuses · no rest days · no mercy
          </p>
        </div>

        <div className="mt-12 border-t-2 border-ink pt-4 overflow-hidden">
          <div className="marquee-track font-display text-2xl">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-8 whitespace-nowrap">
                <span>NO DAYS OFF</span><span className="text-accent">★</span>
                <span>EAT CLEAN</span><span className="text-accent">★</span>
                <span>LIFT HEAVY</span><span className="text-accent">★</span>
                <span>SLEEP. REPEAT.</span><span className="text-accent">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
