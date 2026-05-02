import { AppShell } from "@/components/AppShell";
import { Robot } from "@/components/Robot";
import { useUser } from "@/lib/user";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Msg { role: "user" | "bot"; text: string; suggestions?: string[]; }

const quickPrompts = [
  "Recommend a workout",
  "Plan my meals today",
  "I'm tired, motivate me",
  "30-min full body",
];

const Coach = () => {
  const user = useUser();
  const [mood, setMood] = useState<"idle"|"hype"|"thinking"|"proud"|"scolding">("idle");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: `Yo ${user?.name?.split(" ")[0] ?? "champ"}. it's grind-01. what're we doing today?`,
      suggestions: quickPrompts,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const reply = (userText: string) => {
    const t = userText.toLowerCase();
    let text = "I hear you. tell me more.";
    let suggestions: string[] | undefined;
    let nextMood: typeof mood = "thinking";

    if (/tired|lazy|skip|don'?t feel|no mood/.test(t)) {
      text = "tired? cool. champions train tired. 10 mins. that's it. no negotiation.";
      suggestions = ["Give me 10-min workout", "Just stretching today", "Fine, full session"];
      nextMood = "scolding";
    } else if (/motivate|push|hype/.test(t)) {
      text = "you weren't built to be average. every rep is a vote for the future you. NOW MOVE. 🔥";
      suggestions = ["Recommend workout", "Show diet"];
      nextMood = "hype";
    } else if (/workout|train|exercise|gym|recommend/.test(t)) {
      text = "based on your goal, here's the menu. pick one:";
      suggestions = ["Push Day (55m, savage)", "20-min HIIT Burn", "Core Carnage (25m)", "Recovery & Mobility"];
      nextMood = "hype";
    } else if (/diet|food|meal|eat|fuel|breakfast|lunch|dinner/.test(t)) {
      text = `${user?.diet ?? "non-veg"} mode locked in. today's plan: high protein, moderate carbs. tap Fuel to see the full breakdown.`;
      suggestions = ["High protein breakfast", "Pre-workout snack", "Cheat meal ideas"];
      nextMood = "proud";
    } else if (/push/.test(t)) {
      text = "PUSH DAY: bench 4×8, OHP 4×10, incline DB 3×12, lateral raises 3×15, tricep pushdowns 3×12. let's eat.";
      nextMood = "hype";
    } else if (/hiit|cardio/.test(t)) {
      text = "HIIT: 40s on / 20s off — burpees, mountain climbers, jump squats, high knees. 4 rounds. don't die.";
      nextMood = "hype";
    } else if (/core/.test(t)) {
      text = "CORE: plank 3×60s, russian twists 3×30, leg raises 3×15, bicycle crunches 3×30. abs are made in the kitchen but earned here.";
      nextMood = "hype";
    } else if (/10.?min|short|quick/.test(t)) {
      text = "10-MIN GRIND: 20 pushups, 30 squats, 20 sit-ups, 30s plank. 3 rounds. GO.";
      nextMood = "hype";
    } else if (/stretch|recover|mob/.test(t)) {
      text = "smart. recovery IS training. hip openers 5min, thoracic rotations 3×10, foam roll 10min. tomorrow we go heavy.";
      nextMood = "proud";
    } else if (/pre.?work|snack/.test(t)) {
      text = "pre-workout: banana + black coffee 30 min before. or oats + whey if it's been >3hrs since last meal.";
      nextMood = "proud";
    } else if (/breakfast/.test(t)) {
      text = `breakfast (${user?.diet}): 3 eggs + oats + banana, or paneer bhurji + roti. ~500 kcal, 35g protein.`;
      nextMood = "proud";
    } else if (/cheat/.test(t)) {
      text = "earned cheat meals only. did you hit 6 sessions this week? if yes — pizza. if no — back to chicken.";
      nextMood = "scolding";
    } else {
      text = "got it. let's grind. pick one:";
      suggestions = quickPrompts;
      nextMood = "idle";
    }

    setTimeout(() => {
      setMessages(m => [...m, { role: "bot", text, suggestions }]);
      setMood(nextMood);
    }, 600);
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: "user", text }]);
    setInput("");
    setMood("thinking");
    reply(text);
  };

  return (
    <AppShell title="coach">
      <div className="px-4 pt-4 flex flex-col" style={{ height: "calc(100dvh - 14rem)" }}>
        <div className="flex items-center gap-3 pb-3 border-b-2 border-ink">
          <Robot mood={mood} size={64} />
          <div>
            <p className="font-display text-xl leading-none">GRIND-01</p>
            <p className="font-mono-px text-[10px] uppercase tracking-widest text-accent mt-1">
              ● online · {mood}
            </p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              <div className={`max-w-[85%] border-2 border-ink p-3 ${
                m.role === "user" ? "bg-ink text-paper" : "bg-card"
              }`}>
                {m.role === "bot" && (
                  <p className="font-mono-px text-[9px] uppercase tracking-widest text-muted-foreground mb-1">grind-01</p>
                )}
                <p className="text-sm leading-snug">{m.text}</p>
                {m.suggestions && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.suggestions.map(s => (
                      <button key={s} onClick={() => send(s)}
                        className="text-[11px] font-mono-px uppercase tracking-wider px-2 py-1 border border-ink hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2 pt-3 border-t-2 border-ink">
          <input
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="ask grind-01 anything..."
            className="flex-1 bg-transparent border-2 border-ink px-3 py-2 outline-none focus:border-accent text-sm"
          />
          <button type="submit" className="bg-accent text-accent-foreground px-4 border-2 border-ink hover:translate-x-[1px] hover:translate-y-[1px] transition-transform">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </AppShell>
  );
};

export default Coach;
