import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { SkillCategory } from "../lib/types";
import skillsData from "../data/skills.json";
import SkillCategoryForm from "./SkillCategoryForm";
import { saveContent } from "../lib/dashboardApi";

async function persist(skills: SkillCategory[]) {
  await saveContent("skills", skills);
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<SkillCategory[]>(
    skillsData as SkillCategory[]
  );
  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (next: SkillCategory[]) => {
    setSaving(true);
    setError(null);
    try {
      await persist(next);
      setSkills(next);
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (draft: SkillCategory) => {
    const next =
      editingIndex === "new"
        ? [...skills, draft]
        : skills.map((s, i) => (i === editingIndex ? draft : s));
    await save(next);
    setEditingIndex(null);
  };

  const handleDelete = async (index: number) => {
    if (!window.confirm("Hapus kategori skill ini?")) return;
    await save(skills.filter((_, i) => i !== index));
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= skills.length) return;
    const next = [...skills];
    [next[index], next[target]] = [next[target], next[index]];
    await save(next);
  };

  if (editingIndex !== null) {
    const current = editingIndex === "new" ? undefined : skills[editingIndex];
    return (
      <SkillCategoryForm
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
          Skills
        </h2>
        <button
          type="button"
          onClick={() => setEditingIndex("new")}
          className="flex items-center gap-1.5 border border-accent/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-bg"
        >
          <Plus size={14} />
          Tambah kategori
        </button>
      </div>

      {error && (
        <p className="mt-4 font-mono text-xs text-red-400">{error}</p>
      )}

      <div className="mt-8 border-b border-border">
        {skills.map((group, i) => (
          <div
            key={group.category + i}
            className="flex items-center justify-between gap-4 border-t border-border py-4"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {group.category}
              </p>
              <p className="mt-1 text-sm text-muted">
                {group.stack.join(" / ")}
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
                disabled={i === skills.length - 1}
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
        {skills.length === 0 && (
          <p className="py-8 font-mono text-xs text-muted">
            Belum ada kategori skill.
          </p>
        )}
      </div>
    </div>
  );
}
