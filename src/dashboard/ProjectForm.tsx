import { useState } from "react";
import type { Project } from "../lib/types";
import ImageUploadField from "./components/ImageUploadField";
import TagListInput from "./components/TagListInput";

export type ProjectDraft = Omit<
  Project,
  "id" | "sort_order" | "highlights" | "stack"
> & {
  highlights: string[];
  stack: string[];
};

const EMPTY: ProjectDraft = {
  title: "",
  image_url: null,
  description: "",
  highlights: [],
  note: null,
  stack: [],
  link_label: null,
  href: null,
};

export default function ProjectForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial?: Project;
  onSave: (draft: ProjectDraft) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [draft, setDraft] = useState<ProjectDraft>(
    initial
      ? {
          title: initial.title,
          image_url: initial.image_url,
          description: initial.description,
          highlights: initial.highlights ?? [],
          note: initial.note,
          stack: initial.stack,
          link_label: initial.link_label,
          href: initial.href,
        }
      : EMPTY
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
          Judul
        </label>
        <input
          required
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <ImageUploadField
        label="Screenshot"
        folder="projects"
        value={draft.image_url}
        onChange={(url) => setDraft({ ...draft, image_url: url })}
      />

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Deskripsi{" "}
          <span className="normal-case text-muted/60">
            (baris kosong = paragraf baru)
          </span>
        </label>
        <textarea
          required
          rows={5}
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
        placeholder="Tambah poin highlight..."
      />

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-muted">
          Note (opsional)
        </label>
        <input
          value={draft.note ?? ""}
          onChange={(e) =>
            setDraft({ ...draft, note: e.target.value || null })
          }
          className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <TagListInput
        label="Tech stack"
        items={draft.stack}
        onChange={(stack) => setDraft({ ...draft, stack })}
        placeholder="Tambah teknologi..."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-muted">
            Link label
          </label>
          <input
            value={draft.link_label ?? ""}
            onChange={(e) =>
              setDraft({ ...draft, link_label: e.target.value || null })
            }
            placeholder="github.com/user/repo"
            className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-muted">
            Link URL
          </label>
          <input
            value={draft.href ?? ""}
            onChange={(e) =>
              setDraft({ ...draft, href: e.target.value || null })
            }
            placeholder="https://..."
            className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
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
