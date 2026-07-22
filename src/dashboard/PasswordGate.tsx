import { useState, type ReactNode } from "react";
import {
  getDashboardPassword,
  setDashboardPassword,
} from "../lib/dashboardAuth";

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => !!getDashboardPassword());
  const [input, setInput] = useState("");

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDashboardPassword(input);
          setUnlocked(true);
        }}
        className="w-full max-w-sm border border-border bg-surface p-8"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Dashboard
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-foreground">
          Masukkan password
        </h1>
        <p className="mt-2 text-sm text-muted">
          Password akan dicek saat kamu menyimpan perubahan pertama.
        </p>

        <input
          type="password"
          required
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-6 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />

        <button
          type="submit"
          className="mt-6 w-full border border-accent/60 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-bg"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
