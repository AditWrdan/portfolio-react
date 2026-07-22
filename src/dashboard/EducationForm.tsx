import { useState } from "react";
import type { EducationEntry } from "../lib/types";
import ImageUploadField from "./components/ImageUploadField";

const EMPTY: EducationEntry = {
  logo: "",
  logoImage: null,
  period: "",
  school: "",
  field: "",
};

export default function EducationForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial?: EducationEntry;
  onSave: (draft: EducationEntry) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [draft, setDraft] = useState<EducationEntry>(initial ?? EMPTY);

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
          Logo fallback (inisial teks)
        </label>
        <input
          required
          value={draft.logo}
          onChange={(e) => setDraft({ ...draft, logo: e.target.value })}
          placeholder="UP"
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <ImageUploadField
        label="Logo (opsional)"
        value={draft.logoImage}
        onChange={(url) => setDraft({ ...draft, logoImage: url })}
      />

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Periode
        </label>
        <input
          required
          value={draft.period}
          onChange={(e) => setDraft({ ...draft, period: e.target.value })}
          placeholder="2021 — 2025"
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Nama sekolah
        </label>
        <input
          required
          value={draft.school}
          onChange={(e) => setDraft({ ...draft, school: e.target.value })}
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Jurusan / bidang
        </label>
        <input
          required
          value={draft.field}
          onChange={(e) => setDraft({ ...draft, field: e.target.value })}
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

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
