import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { EducationEntry } from "../lib/types";

export function useEducation() {
  const [data, setData] = useState<EducationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("education")
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
