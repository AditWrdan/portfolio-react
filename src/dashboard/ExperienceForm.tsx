import { useState } from "react";
import type { ExperienceEntry } from "../lib/types";
import ImageUploadField from "./components/ImageUploadField";
import TagListInput from "./components/TagListInput";

export type ExperienceDraft = Omit<
  ExperienceEntry,
  "id" | "sort_order" | "highlights"
> & { highlights: string[] };

export default function ExperienceForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial?: ExperienceEntry;
  onSave: (draft: ExperienceDraft) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [draft, setDraft] = useState<ExperienceDraft>(
    initial
      ? {
          logo: initial.logo,
          logo_image_url: initial.logo_image_url,
          period: initial.period,
          role: initial.role,
          company: initial.company,
          description: initial.description,
          highlights: initial.highlights ?? [],
          tag: initial.tag,
        }
      : {
          logo: "",
          logo_image_url: null,
          period: "",
          role: "",
          company: "",
          description: "",
          highlights: [],
          tag: "",
        }
  );

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
          placeholder="ILC"
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <ImageUploadField
        label="Logo (opsional)"
        folder="experience"
        value={draft.logo_image_url}
        onChange={(url) => setDraft({ ...draft, logo_image_url: url })}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-muted">
            Periode
          </label>
          <input
            required
            value={draft.period}
            onChange={(e) => setDraft({ ...draft, period: e.target.value })}
            placeholder="Dec 2025 — Present"
            className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-muted">
            Tag (Contract / Internship / dll)
          </label>
          <input
            required
            value={draft.tag}
            onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
            className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Jabatan / role
        </label>
        <input
          required
          value={draft.role}
          onChange={(e) => setDraft({ ...draft, role: e.target.value })}
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Perusahaan
        </label>
        <input
          required
          value={draft.company}
          onChange={(e) => setDraft({ ...draft, company: e.target.value })}
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Deskripsi ringkas
        </label>
        <textarea
          required
          rows={3}
          value={draft.description}
          onChange={(e) =>
            setDraft({ ...draft, description: e.target.value })
          }
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <TagListInput
        label="Highlights (opsional)"
        items={draft.highlights}
        onChange={(highlights) => setDraft({ ...draft, highlights })}
        placeholder="Tambah poin tanggung jawab..."
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
