import { useState } from "react";
import { Upload } from "lucide-react";
import { getDashboardPassword, clearDashboardPassword } from "../../lib/dashboardAuth";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
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

    try {
      const dataUrl = await readAsDataUrl(file);
      const res = await fetch("/.netlify/functions/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          dataUrl,
          password: getDashboardPassword(),
        }),
      });
      if (res.status === 401) {
        clearDashboardPassword();
        throw new Error("Password salah — silakan reload halaman.");
      }
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      onChange(url);
    } catch (err) {
      setError(String(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </label>

      <div className="mt-2 flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-border bg-surface">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
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

      <p className="mt-1 font-mono text-[10px] text-muted/60">
        Perubahan butuh ~10-30 detik untuk live (proses build ulang).
      </p>

      {error && <p className="mt-2 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}
