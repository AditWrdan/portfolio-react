import { useState } from "react";
import type { SkillCategory } from "../lib/types";
import TagListInput from "./components/TagListInput";

const EMPTY: SkillCategory = { category: "", stack: [] };

export default function SkillCategoryForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial?: SkillCategory;
  onSave: (draft: SkillCategory) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [draft, setDraft] = useState<SkillCategory>(initial ?? EMPTY);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
      className="flex flex-col gap-6 border border-border bg-surface p-6"
    >
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Nama kategori
        </label>
        <input
          required
          value={draft.category}
          onChange={(e) => setDraft({ ...draft, category: e.target.value })}
          placeholder="Frontend / Backend / Tools"
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <TagListInput
        label="Skills"
        items={draft.stack}
        onChange={(stack) => setDraft({ ...draft, stack })}
        placeholder="Tambah skill..."
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="border border-accent/60 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-bg disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-border px-5 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
