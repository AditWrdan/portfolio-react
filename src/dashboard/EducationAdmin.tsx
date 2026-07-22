import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { EducationEntry } from "../lib/types";
import EducationForm, { type EducationDraft } from "./EducationForm";

export default function EducationAdmin() {
  const [items, setItems] = useState<EducationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (draft: EducationDraft) => {
    setSaving(true);
    if (editingId === "new") {
      const nextSortOrder = items.length
        ? Math.max(...items.map((e) => e.sort_order)) + 1
        : 0;
      await supabase
        .from("education")
        .insert({ ...draft, sort_order: nextSortOrder });
    } else {
      await supabase.from("education").update(draft).eq("id", editingId);
    }
    setSaving(false);
    setEditingId(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus entri pendidikan ini?")) return;
    await supabase.from("education").delete().eq("id", id);
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const a = items[index];
    const b = items[target];
    await supabase
      .from("education")
      .update({ sort_order: b.sort_order })
      .eq("id", a.id);
    await supabase
      .from("education")
      .update({ sort_order: a.sort_order })
      .eq("id", b.id);
    load();
  };

  if (editingId) {
    const current =
      editingId === "new" ? undefined : items.find((e) => e.id === editingId);
    return (
      <EducationForm
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
          Education
        </h2>
        <button
          type="button"
          onClick={() => setEditingId("new")}
          className="flex items-center gap-1.5 border border-accent/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-bg"
        >
          <Plus size={14} />
          Tambah
        </button>
      </div>

      {loading ? (
        <p className="mt-8 font-mono text-xs text-muted">Memuat...</p>
      ) : (
        <div className="mt-8 border-b border-border">
          {items.map((entry, i) => (
            <div
              key={entry.id}
              className="flex items-center justify-between gap-4 border-t border-border py-4"
            >
              <div>
                <p className="text-sm text-foreground">{entry.school}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {entry.period} · {entry.field}
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
                  onClick={() => setEditingId(entry.id)}
                  className="text-muted hover:text-accent"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="text-muted hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="py-8 font-mono text-xs text-muted">
              Belum ada data pendidikan.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
