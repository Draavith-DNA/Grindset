import { AppShell } from "@/components/AppShell";
import { GraffitiBackdrop } from "@/components/GraffitiBackdrop";
import { Robot } from "@/components/Robot";
import { useUser, clearUser } from "@/lib/user";
import { useNavigate, Link } from "react-router-dom";
import { Flame, TrendingUp, Trophy, Zap, LogOut, Crown } from "lucide-react";

const motivations = [
  "you didn't come this far to only come this far.",
  "discipline > motivation. always.",
  "the iron never lies. show up.",
  "pain is temporary. quitting lasts forever.",
  "be the storm.",
];

const Dashboard = () => {
  const user = useUser();
  const nav = useNavigate();
  const quote = motivations[new Date().getDate() % motivations.length];

  const stats = [
    { label: "Streak", value: user?.streak ?? 0, suffix: "days", icon: Flame, accent: true },
    { label: "Workouts", value: 12, suffix: "this mo", icon: Zap },
    { label: "Calories", value: "1.8k", suffix: "today", icon: TrendingUp },
    { label: "PRs", value: 3, suffix: "broken", icon: Trophy },
  ];

  return (
    <AppShell title="dashboard">
      <div className="relative">
        <GraffitiBackdrop className="opacity-60" />

        <div className="relative px-4 pt-5 space-y-5">
          {/* Greeting */}
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { weekday: "long" })}
              </p>
              <h1 className="font-display text-4xl leading-none mt-1">
                YO, <span className="spray-highlight yellow-highlight">{user?.name?.split(" ")[0]?.toUpperCase()}</span>.
              </h1>
            </div>
            <button
              onClick={() => { clearUser(); nav("/", { replace: true }); }}
              aria-label="Sign out"
              className="h-10 w-10 grid place-items-center border-2 border-ink hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          {/* Coach quote card */}
          <Link to="/coach" className="block">
            <div className="border-2 border-ink bg-card p-4 shadow-brutal flex gap-3 items-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              <Robot mood="hype" size={70} />
              <div className="flex-1">
                <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">grind-01</p>
                <p className="font-medium mt-1 leading-snug">"{quote}"</p>
                <p className="mt-2 font-mono-px text-[10px] uppercase tracking-widest text-accent">tap to chat →</p>
              </div>
            </div>
          </Link>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map(s => (
              <div key={s.label} className={`relative border-2 border-ink p-3 ${s.accent ? "bg-accent text-accent-foreground" : "bg-card"}`}>
                <s.icon className="h-4 w-4 mb-2" />
                <div className="font-display text-3xl leading-none">{s.value}</div>
                <div className="mt-1 font-mono-px text-[10px] uppercase tracking-widest opacity-80">
                  {s.label} · {s.suffix}
                </div>
              </div>
            ))}
          </div>

          {/* Tracker — weekly bars */}
          <Section label="this week" sub="// progress.tracker">
            <div className="border-2 border-ink bg-card p-4">
              <div className="flex items-end justify-between gap-2 h-32">
                {["M","T","W","T","F","S","S"].map((d, i) => {
                  const heights = [60, 90, 30, 75, 100, 45, 20];
                  const isToday = i === new Date().getDay() - 1;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full">
                      <div className="flex-1 w-full flex items-end">
                        <div
                          className={`w-full border-2 border-ink ${isToday ? "bg-accent" : "bg-ink"}`}
                          style={{ height: `${heights[i]}%` }}
                        />
                      </div>
                      <span className={`font-mono-px text-[10px] ${isToday ? "text-accent font-bold" : "text-muted-foreground"}`}>{d}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t-2 border-dashed border-ink/30 flex justify-between font-mono-px text-[10px] uppercase tracking-widest">
                <span className="text-muted-foreground">total</span>
                <span>4h 22m · 2,140 kcal burned</span>
              </div>
            </div>
          </Section>

          {/* Crazy motivating */}
          <Section label="the wall" sub="// crazy mode">
            <div className="border-2 border-ink bg-ink text-paper p-5 relative overflow-hidden">
              <div className="absolute -right-6 -top-4 font-marker text-7xl text-accent/30 rotate-12 select-none">BEAST</div>
              <p className="font-mono-px text-[10px] uppercase tracking-widest opacity-60">today's challenge</p>
              <p className="font-display text-2xl mt-2 leading-tight">100 PUSHUPS<br/>BEFORE BED.</p>
              <p className="text-sm mt-2 opacity-80">no negotiation. complete it or grind-01 will text you.</p>
              <button className="mt-4 bg-accent text-accent-foreground px-4 py-2 border-2 border-paper font-display tracking-wide">
                ACCEPT →
              </button>
            </div>
          </Section>

          {/* PR Progress */}
          <Section label="personal records" sub="// breakable">
            <div className="space-y-2">
              {[
                { name: "Bench Press", value: 80, max: 100, unit: "kg" },
                { name: "Squat", value: 110, max: 140, unit: "kg" },
                { name: "5K Run", value: 24, max: 20, unit: "min", invert: true },
              ].map(pr => {
                const pct = pr.invert ? (pr.max / pr.value) * 100 : (pr.value / pr.max) * 100;
                return (
                  <div key={pr.name} className="border-2 border-ink bg-card p-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-display text-lg">{pr.name}</span>
                      <span className="font-mono-px text-xs">{pr.value}{pr.unit} / goal {pr.max}{pr.unit}</span>
                    </div>
                    <div className="mt-2 h-2 bg-secondary border border-ink relative">
                      <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${Math.min(pct,100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Admin */}
          {user?.isAdmin && (
            <Link to="/admin" className="block border-2 border-ink bg-highlight text-highlight-foreground p-4 shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6" />
                <div>
                  <p className="font-mono-px text-[10px] uppercase tracking-widest">admin access</p>
                  <p className="font-display text-xl leading-none mt-1">MANAGE COMMUNITY →</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </AppShell>
  );
};

const Section = ({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-baseline justify-between mb-2">
      <h2 className="font-display text-lg uppercase tracking-tight">{label}</h2>
      <span className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">{sub}</span>
    </div>
    {children}
  </div>
);

export default Dashboard;
