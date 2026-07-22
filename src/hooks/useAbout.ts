import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { About } from "../lib/types";

export function useAbout() {
  const [data, setData] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("about")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data: row, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) {
          setError(fetchError.message);
        } else {
          setData(row);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
