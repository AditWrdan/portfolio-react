import { useState } from "react";
import { Upload } from "lucide-react";
import { supabase, STORAGE_BUCKET } from "../../lib/supabase";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export default function ImageUploadField({
  label,
  folder,
  value,
  onChange,
}: {
  label: string;
  folder: string;
  value: string | null;
  onChange: (url: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Ukuran gambar maksimal 5MB.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `${folder}/${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file);

    setUploading(false);

    if (uploadError) {
      setError("Upload gagal: " + uploadError.message);
      return;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    onChange(data.publicUrl);
  };

  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </label>

      <div className="mt-2 flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-border bg-surface">
          {preview ? (
            <img
              src={preview}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <Upload size={18} className="text-muted" />
          )}
        </div>

        <label className="cursor-pointer border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:border-accent hover:text-accent">
          {uploading ? "Uploading..." : "Pilih file"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      </div>

      {error && (
        <p className="mt-2 font-mono text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
