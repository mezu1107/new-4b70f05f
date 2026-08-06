import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Filter = { column: string; value: any };

interface Options {
  table: string;
  filters?: Filter[];
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
}

/**
 * Generic public-data hook with Supabase realtime sync.
 * Re-fetches list whenever ANY row changes in the table.
 */
export const useRealtimeTable = <T = any,>({ table, filters = [], orderBy, limit }: Options) => {
  const qc = useQueryClient();
  const key = ["rt", table, JSON.stringify(filters), JSON.stringify(orderBy), limit];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => {
      let q: any = supabase.from(table as any).select("*");
      for (const f of filters) q = q.eq(f.column, f.value);
      if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });

  useEffect(() => {
    const ch = supabase
      .channel(`rt-${table}-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        qc.invalidateQueries({ queryKey: ["rt", table] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [table, qc]);

  return query;
};
