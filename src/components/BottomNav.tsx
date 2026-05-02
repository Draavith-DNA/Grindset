import { NavLink } from "react-router-dom";
import { Home, Dumbbell, Salad, Bot, Users } from "lucide-react";

const tabs = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/workouts", label: "Train", icon: Dumbbell },
  { to: "/coach", label: "Coach", icon: Bot },
  { to: "/diet", label: "Fuel", icon: Salad },
  { to: "/community", label: "Crew", icon: Users },
];

export const BottomNav = () => (
  <nav className="fixed bottom-0 inset-x-0 z-40 border-t-2 border-ink bg-background safe-bottom">
    <ul className="grid grid-cols-5">
      {tabs.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-mono-px uppercase tracking-widest transition-colors ${
                isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
                {isActive && <span className="h-0.5 w-6 bg-accent -mb-1" />}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
