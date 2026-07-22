import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { Project } from "../lib/types";
import projectsData from "../data/projects.json";
import ProjectForm from "./ProjectForm";
import { saveContent } from "../lib/dashboardApi";

async function persist(projects: Project[]) {
  await saveContent("projects", projects);
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>(
    projectsData as Project[]
  );
  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (next: Project[]) => {
    setSaving(true);
    setError(null);
    try {
      await persist(next);
      setProjects(next);
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (draft: Project) => {
    const next =
      editingIndex === "new"
        ? [...projects, draft]
        : projects.map((p, i) => (i === editingIndex ? draft : p));
    await save(next);
    setEditingIndex(null);
  };

  const handleDelete = async (index: number) => {
    if (!window.confirm("Hapus project ini?")) return;
    await save(projects.filter((_, i) => i !== index));
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const next = [...projects];
    [next[index], next[target]] = [next[target], next[index]];
    await save(next);
  };

  if (editingIndex !== null) {
    const current =
      editingIndex === "new" ? undefined : projects[editingIndex];
    return (
      <ProjectForm
        initial={current}
        saving={saving}
        onSave={handleSave}
        onCancel={() => setEditingIndex(null)}
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
          onClick={() => setEditingIndex("new")}
          className="flex items-center gap-1.5 border border-accent/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-bg"
        >
          <Plus size={14} />
          Tambah project
        </button>
      </div>

      {error && (
        <p className="mt-4 font-mono text-xs text-red-400">{error}</p>
      )}

      <div className="mt-8 border-b border-border">
        {projects.map((project, i) => (
          <div
            key={project.title + i}
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
                onClick={() => setEditingIndex(i)}
                className="text-muted hover:text-accent"
              >
                <Pencil size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(i)}
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
    </div>
  );
}
