import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Clock, Flame, Dumbbell } from "lucide-react";

interface Workout {
  id: string;
  title: string;
  category: string;
  duration: number;
  intensity: "easy" | "medium" | "savage";
  kcal: number;
  exercises: { name: string; sets: string }[];
}

const all: Workout[] = [
  { id: "push", title: "Push Day Domination", category: "Strength", duration: 55, intensity: "savage", kcal: 480,
    exercises: [
      { name: "Bench Press", sets: "4 × 8" },
      { name: "Overhead Press", sets: "4 × 10" },
      { name: "Incline DB Press", sets: "3 × 12" },
      { name: "Lateral Raises", sets: "3 × 15" },
      { name: "Tricep Pushdowns", sets: "3 × 12" },
    ]
  },
  { id: "pull", title: "Pull Day Punisher", category: "Strength", duration: 50, intensity: "savage", kcal: 450,
    exercises: [
      { name: "Pull-ups", sets: "4 × max" },
      { name: "Barbell Row", sets: "4 × 8" },
      { name: "Lat Pulldown", sets: "3 × 12" },
      { name: "Face Pulls", sets: "3 × 15" },
      { name: "Bicep Curls", sets: "3 × 12" },
    ]
  },
  { id: "legs", title: "Leg Day (No Skipping)", category: "Strength", duration: 60, intensity: "savage", kcal: 600,
    exercises: [
      { name: "Back Squat", sets: "5 × 5" },
      { name: "Romanian DL", sets: "4 × 8" },
      { name: "Walking Lunges", sets: "3 × 20" },
      { name: "Leg Curls", sets: "3 × 12" },
      { name: "Calf Raises", sets: "4 × 15" },
    ]
  },
  { id: "hiit", title: "20-Min HIIT Burn", category: "Cardio", duration: 20, intensity: "medium", kcal: 280,
    exercises: [
      { name: "Burpees", sets: "40s on / 20s off" },
      { name: "Mountain Climbers", sets: "40s on / 20s off" },
      { name: "Jump Squats", sets: "40s on / 20s off" },
      { name: "High Knees", sets: "40s on / 20s off" },
    ]
  },
  { id: "core", title: "Core Carnage", category: "Core", duration: 25, intensity: "medium", kcal: 180,
    exercises: [
      { name: "Plank", sets: "3 × 60s" },
      { name: "Russian Twists", sets: "3 × 30" },
      { name: "Leg Raises", sets: "3 × 15" },
      { name: "Bicycle Crunches", sets: "3 × 30" },
    ]
  },
  { id: "mob", title: "Recovery & Mobility", category: "Recovery", duration: 30, intensity: "easy", kcal: 90,
    exercises: [
      { name: "Hip Openers", sets: "5 min" },
      { name: "Thoracic Rotations", sets: "3 × 10" },
      { name: "Shoulder CARs", sets: "2 × 5" },
      { name: "Foam Roll", sets: "10 min" },
    ]
  },
];

const filters = ["All", "Strength", "Cardio", "Core", "Recovery"];

const Workouts = () => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Workout | null>(null);

  const list = filter === "All" ? all : all.filter(w => w.category === filter);

  return (
    <AppShell title="workouts">
      <div className="px-4 pt-5">
        <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">// today's arsenal</p>
        <h1 className="font-display text-4xl leading-none mt-1">PICK YOUR<br/>POISON.</h1>

        <div className="flex gap-2 overflow-x-auto mt-5 -mx-4 px-4 pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 border-2 border-ink font-mono-px text-[11px] uppercase tracking-widest whitespace-nowrap ${
                filter === f ? "bg-ink text-paper" : "bg-card hover:bg-secondary"
              }`}
            >{f}</button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {list.map(w => (
            <button
              key={w.id}
              onClick={() => setActive(w)}
              className="w-full text-left border-2 border-ink bg-card p-4 shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">{w.category}</p>
                  <h3 className="font-display text-xl leading-tight mt-1">{w.title}</h3>
                </div>
                <span className={`px-2 py-0.5 border-2 border-ink font-mono-px text-[10px] uppercase ${
                  w.intensity === "savage" ? "bg-accent text-accent-foreground" :
                  w.intensity === "medium" ? "bg-highlight text-highlight-foreground" :
                  "bg-secondary"
                }`}>{w.intensity}</span>
              </div>
              <div className="mt-3 flex gap-4 font-mono-px text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{w.duration}m</span>
                <span className="flex items-center gap-1"><Flame className="h-3 w-3" />{w.kcal} kcal</span>
                <span className="flex items-center gap-1"><Dumbbell className="h-3 w-3" />{w.exercises.length} ex</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-ink/60 flex items-end sm:items-center justify-center p-4" onClick={() => setActive(null)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-background border-2 border-ink shadow-brutal-lg max-h-[85dvh] overflow-y-auto">
            <div className="p-5 border-b-2 border-ink bg-ink text-paper">
              <p className="font-mono-px text-[10px] uppercase tracking-widest opacity-60">{active.category}</p>
              <h2 className="font-display text-2xl mt-1">{active.title}</h2>
              <div className="mt-2 flex gap-4 font-mono-px text-xs">
                <span>{active.duration}m</span>
                <span>{active.kcal} kcal</span>
                <span className="text-accent">{active.intensity.toUpperCase()}</span>
              </div>
            </div>
            <ol className="p-5 space-y-3">
              {active.exercises.map((e, i) => (
                <li key={i} className="flex items-baseline gap-3 border-b border-dashed border-ink/30 pb-2">
                  <span className="font-display text-2xl text-accent w-8">{String(i+1).padStart(2,"0")}</span>
                  <div className="flex-1">
                    <div className="font-display text-lg leading-tight">{e.name}</div>
                    <div className="font-mono-px text-xs text-muted-foreground">{e.sets}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="p-5 pt-0 flex gap-2">
              <button onClick={() => setActive(null)} className="px-4 py-3 border-2 border-ink font-mono-px text-xs uppercase tracking-widest">close</button>
              <button className="flex-1 bg-accent text-accent-foreground py-3 border-2 border-ink font-display text-lg shadow-brutal">START NOW →</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default Workouts;
