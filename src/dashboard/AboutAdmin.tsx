import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { About } from "../lib/types";
import ImageUploadField from "./components/ImageUploadField";

export default function AboutAdmin() {
  const [about, setAbout] = useState<About | null>(null);
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("about")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        setAbout(data);
        setBio(data?.bio ?? "");
        setPhotoUrl(data?.photo_url ?? null);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("about").upsert({
      id: 1,
      bio,
      photo_url: photoUrl,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setSavedAt(Date.now());
  };

  if (loading) {
    return <p className="font-mono text-xs text-muted">Memuat...</p>;
  }

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
          folder="about"
          value={photoUrl}
          onChange={setPhotoUrl}
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
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 w-full border border-border bg-bg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>

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

      {!about && (
        <p className="mt-4 font-mono text-xs text-muted/60">
          Belum ada data About — isi form di atas untuk membuatnya.
        </p>
      )}
    </div>
  );
}
