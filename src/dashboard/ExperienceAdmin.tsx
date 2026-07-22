import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { ExperienceEntry } from "../lib/types";
import experienceData from "../data/experience.json";
import ExperienceForm from "./ExperienceForm";
import { saveContent } from "../lib/dashboardApi";

async function persist(items: ExperienceEntry[]) {
  await saveContent("experience", items);
}

export default function ExperienceAdmin() {
  const [items, setItems] = useState<ExperienceEntry[]>(
    experienceData as ExperienceEntry[]
  );
  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (next: ExperienceEntry[]) => {
    setSaving(true);
    setError(null);
    try {
      await persist(next);
      setItems(next);
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (draft: ExperienceEntry) => {
    const next =
      editingIndex === "new"
        ? [...items, draft]
        : items.map((e, i) => (i === editingIndex ? draft : e));
    await save(next);
    setEditingIndex(null);
  };

  const handleDelete = async (index: number) => {
    if (!window.confirm("Hapus pengalaman kerja ini?")) return;
    await save(items.filter((_, i) => i !== index));
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    await save(next);
  };

  if (editingIndex !== null) {
    const current = editingIndex === "new" ? undefined : items[editingIndex];
    return (
      <ExperienceForm
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
          Experience
        </h2>
        <button
          type="button"
          onClick={() => setEditingIndex("new")}
          className="flex items-center gap-1.5 border border-accent/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-bg"
        >
          <Plus size={14} />
          Tambah
        </button>
      </div>

      {error && (
        <p className="mt-4 font-mono text-xs text-red-400">{error}</p>
      )}

      <div className="mt-8 border-b border-border">
        {items.map((entry, i) => (
          <div
            key={entry.company + i}
            className="flex items-center justify-between gap-4 border-t border-border py-4"
          >
            <div>
              <p className="text-sm text-foreground">{entry.role}</p>
              <p className="mt-1 font-mono text-xs text-muted">
                {entry.company} · {entry.period}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
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
                disabled={i === items.length - 1}
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
        {items.length === 0 && (
          <p className="py-8 font-mono text-xs text-muted">
            Belum ada pengalaman kerja.
          </p>
        )}
      </div>
    </div>
  );
}
