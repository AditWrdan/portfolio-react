import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { SkillCategory } from "../lib/types";
import SkillCategoryForm, {
  type SkillCategoryDraft,
} from "./SkillCategoryForm";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("skill_categories")
      .select("*")
      .order("sort_order", { ascending: true });
    setSkills(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (draft: SkillCategoryDraft) => {
    setSaving(true);
    if (editingId === "new") {
      const nextSortOrder = skills.length
        ? Math.max(...skills.map((s) => s.sort_order)) + 1
        : 0;
      await supabase
        .from("skill_categories")
        .insert({ ...draft, sort_order: nextSortOrder });
    } else {
      await supabase
        .from("skill_categories")
        .update(draft)
        .eq("id", editingId);
    }
    setSaving(false);
    setEditingId(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus kategori skill ini?")) return;
    await supabase.from("skill_categories").delete().eq("id", id);
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= skills.length) return;
    const a = skills[index];
    const b = skills[target];
    await supabase
      .from("skill_categories")
      .update({ sort_order: b.sort_order })
      .eq("id", a.id);
    await supabase
      .from("skill_categories")
      .update({ sort_order: a.sort_order })
      .eq("id", b.id);
    load();
  };

  if (editingId) {
    const current =
      editingId === "new" ? undefined : skills.find((s) => s.id === editingId);
    return (
      <SkillCategoryForm
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
          Skills
        </h2>
        <button
          type="button"
          onClick={() => setEditingId("new")}
          className="flex items-center gap-1.5 border border-accent/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-bg"
        >
          <Plus size={14} />
          Tambah kategori
        </button>
      </div>

      {loading ? (
        <p className="mt-8 font-mono text-xs text-muted">Memuat...</p>
      ) : (
        <div className="mt-8 border-b border-border">
          {skills.map((group, i) => (
            <div
              key={group.id}
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
                  onClick={() => setEditingId(group.id)}
                  className="text-muted hover:text-accent"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(group.id)}
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
      )}
    </div>
  );
}
