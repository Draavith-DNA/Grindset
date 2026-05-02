import { AppShell } from "@/components/AppShell";
import { Robot } from "@/components/Robot";
import { useUser } from "@/lib/user";
import { Lock, Crown, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  { user: "ARJUN_K", role: "ADMIN", text: "Hit a 140kg squat PR today. The grind is real. 🔥", likes: 42, replies: 8 },
  { user: "SARAH_M", role: "MEMBER", text: "Day 60 streak. grind-01 won't let me quit lol", likes: 28, replies: 12 },
  { user: "RAVI_P", role: "MEMBER", text: "Anyone else doing the 100 pushup challenge tonight?", likes: 19, replies: 24 },
];

const Community = () => {
  const user = useUser();

  if (!user?.isAdmin) {
    return (
      <AppShell title="community">
        <div className="px-4 pt-10 text-center">
          <div className="inline-block border-4 border-ink p-6 bg-card shadow-brutal-lg">
            <Lock className="h-10 w-10 mx-auto" />
          </div>
          <h1 className="font-display text-3xl mt-6 leading-tight">CREW IS<br/>INVITE-ONLY.</h1>
          <p className="text-muted-foreground mt-3 max-w-xs mx-auto">
            The Grindset community is for admins and verified members only. Ask the founder for access.
          </p>

          <div className="mt-8 flex justify-center">
            <Robot mood="scolding" size={120} />
          </div>

          <div className="mt-6 border-2 border-dashed border-ink p-3 inline-block">
            <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">
              demo: sign in as <span className="text-accent">admin@grindset.app</span>
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="community">
      <div className="px-4 pt-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono-px text-[10px] uppercase tracking-widest text-accent">// the crew · members only</p>
            <h1 className="font-display text-4xl leading-none mt-1">GRIND<br/>CREW.</h1>
          </div>
          <Crown className="h-8 w-8 text-highlight" />
        </div>

        <div className="border-2 border-ink bg-card p-3">
          <p className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">share with the crew</p>
          <textarea
            placeholder="what's the win today?"
            className="w-full bg-transparent mt-2 outline-none resize-none text-sm"
            rows={2}
          />
          <div className="flex justify-end">
            <button className="bg-accent text-accent-foreground px-3 py-1.5 border-2 border-ink font-mono-px text-[11px] uppercase tracking-widest">
              post →
            </button>
          </div>
        </div>

        {posts.map((p, i) => (
          <div key={i} className="border-2 border-ink bg-card p-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 grid place-items-center bg-ink text-paper font-display text-sm">
                {p.user[0]}
              </div>
              <div>
                <p className="font-display text-sm leading-none">{p.user}</p>
                <p className={`font-mono-px text-[9px] uppercase tracking-widest mt-1 ${p.role === "ADMIN" ? "text-accent" : "text-muted-foreground"}`}>
                  {p.role}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm">{p.text}</p>
            <div className="mt-3 flex gap-4 font-mono-px text-[11px] text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-accent"><Heart className="h-3 w-3" />{p.likes}</button>
              <button className="flex items-center gap-1 hover:text-accent"><MessageSquare className="h-3 w-3" />{p.replies}</button>
            </div>
          </div>
        ))}

        <Link to="/admin" className="block border-2 border-ink bg-highlight text-highlight-foreground p-4 shadow-brutal text-center font-display text-lg">
          MANAGE CREW →
        </Link>
      </div>
    </AppShell>
  );
};

export default Community;
