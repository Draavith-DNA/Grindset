import { AppShell } from "@/components/AppShell";
import { useUser } from "@/lib/user";

const planByDiet: Record<string, { meal: string; items: string; kcal: number; protein: number }[]> = {
  "non-veg": [
    { meal: "Breakfast", items: "3 eggs · 80g oats · banana · black coffee", kcal: 520, protein: 32 },
    { meal: "Snack", items: "Greek yogurt · 30g almonds", kcal: 280, protein: 18 },
    { meal: "Lunch", items: "Grilled chicken 200g · brown rice · salad", kcal: 650, protein: 55 },
    { meal: "Pre-workout", items: "Apple · whey scoop", kcal: 220, protein: 25 },
    { meal: "Dinner", items: "Salmon 180g · sweet potato · greens", kcal: 580, protein: 42 },
  ],
  "veg": [
    { meal: "Breakfast", items: "Paneer bhurji · 2 roti · banana", kcal: 510, protein: 28 },
    { meal: "Snack", items: "Greek yogurt · mixed nuts", kcal: 280, protein: 16 },
    { meal: "Lunch", items: "Rajma · brown rice · salad", kcal: 620, protein: 24 },
    { meal: "Pre-workout", items: "Banana · whey scoop", kcal: 240, protein: 25 },
    { meal: "Dinner", items: "Tofu stir-fry · quinoa · greens", kcal: 560, protein: 32 },
  ],
  "jain": [
    { meal: "Breakfast", items: "Poha · sprouts (no onion/garlic) · banana", kcal: 460, protein: 18 },
    { meal: "Snack", items: "Curd · soaked almonds", kcal: 260, protein: 14 },
    { meal: "Lunch", items: "Moong dal · jeera rice · salad", kcal: 580, protein: 22 },
    { meal: "Pre-workout", items: "Apple · plant whey", kcal: 220, protein: 22 },
    { meal: "Dinner", items: "Paneer (no root) · roti · veg", kcal: 540, protein: 28 },
  ],
  "vegan": [
    { meal: "Breakfast", items: "Tofu scramble · oats · berries", kcal: 480, protein: 26 },
    { meal: "Snack", items: "Soy yogurt · almonds", kcal: 270, protein: 14 },
    { meal: "Lunch", items: "Chickpea bowl · quinoa · greens", kcal: 610, protein: 26 },
    { meal: "Pre-workout", items: "Banana · pea protein", kcal: 230, protein: 22 },
    { meal: "Dinner", items: "Tempeh stir-fry · brown rice", kcal: 560, protein: 32 },
  ],
  "eggetarian": [
    { meal: "Breakfast", items: "4 eggs · 2 toast · banana", kcal: 520, protein: 30 },
    { meal: "Snack", items: "Greek yogurt · nuts", kcal: 280, protein: 18 },
    { meal: "Lunch", items: "Egg curry · brown rice · salad", kcal: 640, protein: 36 },
    { meal: "Pre-workout", items: "Apple · whey", kcal: 220, protein: 25 },
    { meal: "Dinner", items: "Veg + boiled eggs · roti", kcal: 560, protein: 34 },
  ],
};

const Diet = () => {
  const user = useUser();
  const plan = planByDiet[user?.diet ?? "non-veg"] ?? planByDiet["non-veg"];
  const totalKcal = plan.reduce((a, b) => a + b.kcal, 0);
  const totalProtein = plan.reduce((a, b) => a + b.protein, 0);

  return (
    <AppShell title="diet">
      <div className="px-4 pt-5 space-y-5">
        <div>
          <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">// today's fuel · {user?.diet}</p>
          <h1 className="font-display text-4xl leading-none mt-1">EAT TO<br/><span className="spray-highlight">DOMINATE</span>.</h1>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="Calories" value={totalKcal} />
          <Stat label="Protein" value={`${totalProtein}g`} accent />
          <Stat label="Meals" value={plan.length} />
        </div>

        <div className="space-y-3">
          {plan.map((m, i) => (
            <div key={i} className="border-2 border-ink bg-card p-4 shadow-brutal">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">meal {i+1}</p>
                  <h3 className="font-display text-xl leading-none mt-1">{m.meal}</h3>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg leading-none">{m.kcal}<span className="text-xs"> kcal</span></div>
                  <div className="font-mono-px text-[10px] uppercase text-accent mt-1">{m.protein}g protein</div>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{m.items}</p>
            </div>
          ))}
        </div>

        <div className="border-2 border-dashed border-ink p-4 bg-highlight/30">
          <p className="font-mono-px text-[10px] uppercase tracking-widest">// grind-01 says</p>
          <p className="font-marker text-2xl mt-1 leading-tight">drink 3L water. or else.</p>
        </div>
      </div>
    </AppShell>
  );
};

const Stat = ({ label, value, accent = false }: { label: string; value: any; accent?: boolean }) => (
  <div className={`border-2 border-ink p-3 ${accent ? "bg-accent text-accent-foreground" : "bg-card"}`}>
    <div className="font-display text-2xl leading-none">{value}</div>
    <div className="font-mono-px text-[10px] uppercase tracking-widest mt-1 opacity-80">{label}</div>
  </div>
);

export default Diet;
