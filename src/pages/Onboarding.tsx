import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraffitiBackdrop } from "@/components/GraffitiBackdrop";
import { Robot } from "@/components/Robot";
import { Diet, Goal, loadUser, saveUser, defaultUser } from "@/lib/user";

const diets: { id: Diet; label: string; emoji: string }[] = [
  { id: "veg", label: "Vegetarian", emoji: "🥗" },
  { id: "non-veg", label: "Non-Veg", emoji: "🍗" },
  { id: "jain", label: "Jain", emoji: "🌿" },
  { id: "vegan", label: "Vegan", emoji: "🌱" },
  { id: "eggetarian", label: "Eggetarian", emoji: "🥚" },
];

const goals: { id: Goal; label: string; tagline: string }[] = [
  { id: "lose", label: "Cut Fat", tagline: "shred mode" },
  { id: "build", label: "Build Muscle", tagline: "bulk up" },
  { id: "athletic", label: "Athletic", tagline: "perform" },
  { id: "maintain", label: "Maintain", tagline: "stay sharp" },
];

const Onboarding = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [age, setAge] = useState("24");
  const [diet, setDiet] = useState<Diet | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  const total = 4;
  const next = () => setStep(s => Math.min(s + 1, total - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const finish = () => {
    const existing = loadUser() ?? defaultUser;
    saveUser({
      ...existing,
      height: Number(height),
      weight: Number(weight),
      age: Number(age),
      diet: diet ?? "non-veg",
      goal: goal ?? "build",
      onboarded: true,
      streak: 1,
    });
    nav("/dashboard", { replace: true });
  };

  const moods = ["thinking", "hype", "proud", "hype"] as const;

  return (
    <div className="relative min-h-dvh bg-background text-foreground grain overflow-hidden">
      <GraffitiBackdrop />
      <div className="relative z-10 mx-auto max-w-md px-5 pt-6 safe-top safe-bottom flex flex-col min-h-dvh">

        {/* Progress */}
        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 border border-ink ${i <= step ? "bg-accent" : "bg-transparent"}`} />
          ))}
        </div>
        <p className="mt-2 font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">
          step {step + 1} / {total}
        </p>

        <div className="mt-6 flex items-end gap-3">
          <Robot mood={moods[step]} size={90} />
          <div className="pb-2">
            <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">grind-01 says</p>
            <p className="font-medium text-base mt-1 max-w-[200px]">
              {step === 0 && "alright recruit. how tall are we workin' with?"}
              {step === 1 && "current weight. no lying — i can tell."}
              {step === 2 && "what's the fuel type?"}
              {step === 3 && "and what's the mission?"}
            </p>
          </div>
        </div>

        <div className="flex-1 mt-8">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-display text-4xl leading-none">YOUR<br/>STATS.</h2>
              <NumberRow label="Height (cm)" value={height} setValue={setHeight} min={120} max={230} />
              <NumberRow label="Age" value={age} setValue={setAge} min={12} max={90} />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-4xl leading-none">WEIGHT<br/>CHECK.</h2>
              <NumberRow label="Weight (kg)" value={weight} setValue={setWeight} min={30} max={250} />
              <div className="border-2 border-ink p-3 bg-card">
                <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">bmi est.</p>
                <p className="font-display text-3xl mt-1">
                  {(Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1)}
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-4xl leading-none">DIET.</h2>
              <div className="grid grid-cols-2 gap-3">
                {diets.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDiet(d.id)}
                    className={`p-4 border-2 border-ink text-left transition-all ${
                      diet === d.id ? "bg-accent text-accent-foreground shadow-brutal" : "bg-card hover:bg-secondary"
                    }`}
                  >
                    <div className="text-2xl">{d.emoji}</div>
                    <div className="font-display text-lg mt-1 leading-tight">{d.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-4xl leading-none">MISSION.</h2>
              <div className="space-y-3">
                {goals.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`w-full p-4 border-2 border-ink flex items-center justify-between transition-all ${
                      goal === g.id ? "bg-ink text-paper shadow-brutal" : "bg-card hover:bg-secondary"
                    }`}
                  >
                    <div>
                      <div className="font-display text-xl leading-none">{g.label}</div>
                      <div className="font-mono-px text-[10px] uppercase tracking-widest opacity-70 mt-1">{g.tagline}</div>
                    </div>
                    <span className="text-2xl">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <button onClick={back} className="px-5 py-3 border-2 border-ink font-mono-px text-xs uppercase tracking-widest hover:bg-secondary">
              ← back
            </button>
          )}
          {step < total - 1 && (
            <button
              onClick={next}
              disabled={(step === 2 && !diet)}
              className="flex-1 bg-ink text-paper py-3 font-display text-lg tracking-wide border-2 border-ink shadow-brutal disabled:opacity-40 disabled:shadow-none"
            >
              NEXT →
            </button>
          )}
          {step === total - 1 && (
            <button
              onClick={finish}
              disabled={!goal}
              className="flex-1 bg-accent text-accent-foreground py-3 font-display text-lg tracking-wide border-2 border-ink shadow-brutal disabled:opacity-40 disabled:shadow-none"
            >
              LET'S GO 🔥
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const NumberRow = ({ label, value, setValue, min, max }: {
  label: string; value: string; setValue: (v: string) => void; min: number; max: number;
}) => (
  <div>
    <div className="flex items-end justify-between">
      <span className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-display text-4xl">{value}</span>
    </div>
    <input
      type="range" min={min} max={max} value={value}
      onChange={e => setValue(e.target.value)}
      className="w-full mt-2 accent-[hsl(var(--accent))]"
    />
  </div>
);

export default Onboarding;
