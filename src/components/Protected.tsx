import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/lib/user";

export const Protected = ({ children, requireOnboarded = true, requireAdmin = false }: {
  children: ReactNode;
  requireOnboarded?: boolean;
  requireAdmin?: boolean;
}) => {
  const user = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (requireOnboarded && !user.onboarded) return <Navigate to="/onboarding" replace />;
  if (requireAdmin && !user.isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};
