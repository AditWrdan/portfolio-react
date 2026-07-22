import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function TagListInput({
  label,
  items,
  onChange,
  placeholder = "Tambah item...",
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const addItem = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setDraft("");
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </label>

      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-foreground"
          >
            {item}
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-muted hover:text-red-400"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          className="flex-1 border border-border bg-bg px-3 py-1.5 text-sm text-foreground outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 border border-border px-3 py-1.5 font-mono text-xs text-muted hover:border-accent hover:text-accent"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
