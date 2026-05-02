import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

export const AppShell = ({ children, title }: { children: ReactNode; title?: string }) => {
  return (
    <div className="relative min-h-dvh bg-background grain">
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-background/95 backdrop-blur safe-top">
        <div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
          <Link to="/dashboard" className="font-display text-2xl tracking-tighter leading-none">
            GRIND<span className="text-accent">SET</span>
          </Link>
          <div className="flex items-center gap-2">
            {title && (
              <span className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:inline">
                / {title}
              </span>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-md pb-28">
        {children}
      </main>

      <BottomNav />
    </div>
  );
};
