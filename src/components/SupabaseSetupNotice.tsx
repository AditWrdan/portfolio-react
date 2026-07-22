export default function SupabaseSetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="max-w-lg border border-border bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Setup diperlukan
        </p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-foreground">
          Supabase belum dikonfigurasi
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Situs ini butuh koneksi ke Supabase untuk menampilkan konten. Buat
          file <code className="text-foreground">.env.local</code> di root
          project (lihat <code className="text-foreground">.env.example</code>
          ), isi <code className="text-foreground">VITE_SUPABASE_URL</code>{" "}
          dan <code className="text-foreground">VITE_SUPABASE_ANON_KEY</code>{" "}
          dari project Supabase kamu, lalu restart dev server.
        </p>
      </div>
    </div>
  );
}
