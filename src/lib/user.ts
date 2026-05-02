import { useEffect, useState } from "react";

export type Diet = "veg" | "non-veg" | "jain" | "vegan" | "eggetarian";
export type Goal = "lose" | "build" | "athletic" | "maintain";

export interface UserProfile {
  name: string;
  email: string;
  isAdmin: boolean;
  height?: number; // cm
  weight?: number; // kg
  age?: number;
  diet?: Diet;
  goal?: Goal;
  onboarded: boolean;
  streak: number;
}

const KEY = "grindset-user";

export const defaultUser: UserProfile = {
  name: "",
  email: "",
  isAdmin: false,
  onboarded: false,
  streak: 0,
};

export const loadUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as UserProfile : null;
  } catch { return null; }
};

export const saveUser = (u: UserProfile) => {
  localStorage.setItem(KEY, JSON.stringify(u));
  window.dispatchEvent(new Event("grindset-user-change"));
};

export const clearUser = () => {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("grindset-user-change"));
};

export const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(loadUser);
  useEffect(() => {
    const handler = () => setUser(loadUser());
    window.addEventListener("grindset-user-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("grindset-user-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return user;
};

// Admin allowlist (mock). You're the founding admin.
const ADMIN_EMAILS = ["admin@grindset.app", "you@grindset.app"];
export const isAdminEmail = (email: string) =>
  ADMIN_EMAILS.includes(email.toLowerCase().trim());
