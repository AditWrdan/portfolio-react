import { NavLink, Outlet, Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";

const TABS = [
  { to: "/dashboard/projects", label: "Work" },
  { to: "/dashboard/skills", label: "Skills" },
  { to: "/dashboard/about", label: "About" },
  { to: "/dashboard/education", label: "Education" },
  { to: "/dashboard/experience", label: "Experience" },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5 md:px-10">
        <div className="flex items-center gap-8">
          <span className="font-mono text-xs tracking-widest text-foreground">
            AW / DASHBOARD
          </span>
          <nav className="flex flex-wrap gap-6">
            {TABS.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
          >
            Lihat situs live
          </Link>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted hover:text-red-400"
          >
            <LogOut size={13} />
            Logout
          </button>
        </div>
      </header>

      <main className="px-6 py-10 md:px-10">
        <Outlet />
      </main>
    </div>
  );
}
