import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Project } from "../lib/types";
import ProjectForm, { type ProjectDraft } from "./ProjectForm";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    setProjects(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (draft: ProjectDraft) => {
    setSaving(true);
    if (editingId === "new") {
      const nextSortOrder = projects.length
        ? Math.max(...projects.map((p) => p.sort_order)) + 1
        : 0;
      await supabase
        .from("projects")
        .insert({ ...draft, sort_order: nextSortOrder });
    } else {
      await supabase.from("projects").update(draft).eq("id", editingId);
    }
    setSaving(false);
    setEditingId(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus project ini?")) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const a = projects[index];
    const b = projects[target];
    await supabase
      .from("projects")
      .update({ sort_order: b.sort_order })
      .eq("id", a.id);
    await supabase
      .from("projects")
      .update({ sort_order: a.sort_order })
      .eq("id", b.id);
    load();
  };

  if (editingId) {
    const current =
      editingId === "new"
        ? undefined
        : projects.find((p) => p.id === editingId);
    return (
      <ProjectForm
        initial={current}
        saving={saving}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Work / Projects
        </h2>
        <button
          type="button"
          onClick={() => setEditingId("new")}
          className="flex items-center gap-1.5 border border-accent/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-bg"
        >
          <Plus size={14} />
          Tambah project
        </button>
      </div>

      {loading ? (
        <p className="mt-8 font-mono text-xs text-muted">Memuat...</p>
      ) : (
        <div className="mt-8 border-b border-border">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="flex items-center justify-between gap-4 border-t border-border py-4"
            >
              <span className="font-display text-lg text-foreground">
                {project.title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="text-muted hover:text-foreground disabled:opacity-30"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === projects.length - 1}
                  className="text-muted hover:text-foreground disabled:opacity-30"
                >
                  <ArrowDown size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(project.id)}
                  className="text-muted hover:text-accent"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  className="text-muted hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="py-8 font-mono text-xs text-muted">
              Belum ada project.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
