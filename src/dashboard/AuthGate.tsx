import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "./LoginForm";

export default function AuthGate({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-bg" />;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
