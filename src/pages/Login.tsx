import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraffitiBackdrop } from "@/components/GraffitiBackdrop";
import { Robot } from "@/components/Robot";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// Keep existing for mock user data if needed, or remove. Let's just use it to set mock admin status if needed, but for now we rely on Firebase.
import { isAdminEmail, saveUser, defaultUser } from "@/lib/user";

const Login = () => {
  const nav = useNavigate();
  const { signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return;

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        // Optional: you could save additional user data (like name) to Firestore here
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // Keep the local storage mock for existing app state compatibility
      const user = {
        ...defaultUser,
        name: name || email.split("@")[0],
        email,
        isAdmin: isAdminEmail(email),
      };
      saveUser(user);
      
      nav("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await signInWithGoogle();
      
      // Set a default mock user for local state compatibility
      const user = {
        ...defaultUser,
        name: "Google User",
        email: "google@example.com",
      };
      saveUser(user);
      
      nav("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    }
  };

  return (
    <div className="relative min-h-dvh bg-background text-foreground grain overflow-hidden">
      <GraffitiBackdrop />

      <div className="relative z-10 mx-auto max-w-md px-5 pt-6 safe-top">
        <div className="flex justify-between items-center">
          <button onClick={() => nav("/")} className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">
            ← back
          </button>
          <ThemeToggle />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Robot mood={mode === "signup" ? "hype" : "idle"} size={84} />
          <div>
            <h1 className="font-display text-4xl leading-none">
              {mode === "signin" ? "WELCOME BACK." : "JOIN THE CREW."}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-mono-px uppercase tracking-widest text-[10px]">
              {mode === "signin" ? "// authenticate" : "// new recruit"}
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-2 text-xs font-mono">
              {error}
            </div>
          )}
          
          {mode === "signup" && (
            <Field label="Name">
              <input
                value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink py-2 text-lg outline-none focus:border-accent"
                placeholder="Your name" required
              />
            </Field>
          )}
          <Field label="Email">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-ink py-2 text-lg outline-none focus:border-accent"
              placeholder="you@grindset.app" required
            />
          </Field>
          <Field label="Password">
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-ink py-2 text-lg outline-none focus:border-accent"
              placeholder="••••••••" required minLength={6}
            />
          </Field>

          <button
            type="submit"
            className="w-full mt-4 bg-ink text-paper py-4 font-display text-xl tracking-wide border-2 border-ink shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            {mode === "signin" ? "SIGN IN" : "SIGN UP"} →
          </button>
          
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-ink/30" />
            </div>
            <div className="relative flex justify-center text-[10px] font-mono-px uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-transparent text-ink py-3 font-display text-lg tracking-wide border-2 border-ink flex items-center justify-center gap-2 hover:bg-ink/5 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            CONTINUE WITH GOOGLE
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full text-center font-mono-px text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent pt-2"
          >
            {mode === "signin" ? "no account? sign up" : "have an account? sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-mono-px text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    {children}
  </label>
);

export default Login;
