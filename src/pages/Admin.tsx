import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { UserPlus, X, Crown } from "lucide-react";

interface Member { email: string; name: string; role: "admin" | "member"; }

const seed: Member[] = [
  { email: "admin@grindset.app", name: "You (Founder)", role: "admin" },
  { email: "arjun@grindset.app", name: "Arjun K.", role: "admin" },
  { email: "sarah@grindset.app", name: "Sarah M.", role: "member" },
  { email: "ravi@grindset.app", name: "Ravi P.", role: "member" },
];

const Admin = () => {
  const [members, setMembers] = useState<Member[]>(seed);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const add = () => {
    if (!email) return;
    setMembers(m => [...m, { email, name: name || email.split("@")[0], role: "member" }]);
    setEmail(""); setName("");
  };

  const remove = (e: string) => setMembers(m => m.filter(x => x.email !== e));
  const promote = (e: string) => setMembers(m => m.map(x => x.email === e ? { ...x, role: x.role === "admin" ? "member" : "admin" } : x));

  return (
    <AppShell title="admin">
      <div className="px-4 pt-5 space-y-5">
        <div>
          <p className="font-mono-px text-[10px] uppercase tracking-widest text-accent">// admin panel · grindset</p>
          <h1 className="font-display text-4xl leading-none mt-1">CREW<br/>CONTROL.</h1>
        </div>

        <div className="border-2 border-ink bg-card p-4 shadow-brutal">
          <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">grant access</p>
          <div className="mt-2 space-y-2">
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="name (optional)"
              className="w-full bg-transparent border-b-2 border-ink py-2 outline-none focus:border-accent text-sm"
            />
            <input
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@example.com" type="email"
              className="w-full bg-transparent border-b-2 border-ink py-2 outline-none focus:border-accent text-sm"
            />
            <button onClick={add} className="w-full mt-2 bg-accent text-accent-foreground py-3 border-2 border-ink font-display tracking-wide flex items-center justify-center gap-2">
              <UserPlus className="h-4 w-4" /> INVITE TO CREW
            </button>
          </div>
        </div>

        <div>
          <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            // {members.length} members
          </p>
          <div className="space-y-2">
            {members.map(m => (
              <div key={m.email} className="border-2 border-ink bg-card p-3 flex items-center gap-3">
                <div className="h-10 w-10 grid place-items-center bg-ink text-paper font-display">
                  {m.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm leading-none truncate">{m.name}</p>
                    {m.role === "admin" && <Crown className="h-3 w-3 text-accent flex-shrink-0" />}
                  </div>
                  <p className="font-mono-px text-[10px] text-muted-foreground truncate mt-1">{m.email}</p>
                </div>
                <button onClick={() => promote(m.email)} className="font-mono-px text-[10px] uppercase tracking-widest border border-ink px-2 py-1 hover:bg-highlight">
                  {m.role === "admin" ? "demote" : "promote"}
                </button>
                <button onClick={() => remove(m.email)} className="h-8 w-8 grid place-items-center border border-ink hover:bg-destructive hover:text-destructive-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Admin;
