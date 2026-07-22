import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SkillCategory } from "../lib/types";

export function useSkills() {
  const [data, setData] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("skill_categories")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data: rows, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) {
          setError(fetchError.message);
        } else {
          setData(rows ?? []);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
