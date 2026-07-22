import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { ExperienceEntry } from "../lib/types";

export function useExperience() {
  const [data, setData] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("experience")
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
