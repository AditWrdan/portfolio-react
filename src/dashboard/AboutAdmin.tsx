import { useState } from "react";
import type { About } from "../lib/types";
import aboutData from "../data/about.json";
import ImageUploadField from "./components/ImageUploadField";

export default function AboutAdmin() {
  const [about, setAbout] = useState<About>(aboutData as About);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/content/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      if (!res.ok) {
        throw new Error(
          "Gagal menyimpan — pastikan dev server (npm run dev) sedang jalan."
        );
      }
      setSavedAt(Date.now());
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-foreground">
        About
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex max-w-2xl flex-col gap-6 border border-border bg-surface p-6"
      >
        <ImageUploadField
          label="Foto profil"
          value={about.photoUrl}
          onChange={(url) => setAbout({ ...about, photoUrl: url })}
        />

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-muted">
            Bio{" "}
            <span className="normal-case text-muted/60">
              (pakai **teks** untuk bold)
            </span>
          </label>
          <textarea
            required
            rows={8}
            value={about.bio}
            onChange={(e) => setAbout({ ...about, bio: e.target.value })}
            className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>

        {error && (
          <p className="font-mono text-xs text-red-400">{error}</p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="border border-accent/60 px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-bg disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {savedAt && (
            <span className="font-mono text-xs text-muted">Tersimpan.</span>
          )}
        </div>
      </form>
    </div>
  );
}
