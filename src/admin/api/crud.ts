import { supabase, MEDIA_BUCKET } from "../lib/supabase";

/**
 * Generic, table-agnostic data access layer used by every admin screen.
 * Every call goes through Supabase (PostgREST) and therefore respects RLS.
 */

export type Row = Record<string, any>;

export interface ListOptions {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  search?: { column: string; value: string };
  filters?: Record<string, string | number | boolean | null>;
}

export async function list<T = Row>(table: string, opts: ListOptions = {}): Promise<T[]> {
  let q = (supabase as any).from(table).select("*");
  if (opts.filters) for (const [k, v] of Object.entries(opts.filters)) q = q.eq(k, v);
  if (opts.search?.value) q = q.ilike(opts.search.column, `%${opts.search.value}%`);
  if (opts.orderBy) q = q.order(opts.orderBy, { ascending: opts.ascending ?? true });
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function getOne<T = Row>(table: string, id: string): Promise<T | null> {
  const { data, error } = await (supabase as any).from(table).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as T | null;
}

export async function create<T = Row>(table: string, values: Row): Promise<T> {
  const { data, error } = await (supabase as any).from(table).insert(values).select().single();
  if (error) throw error;
  return data as T;
}

export async function update<T = Row>(table: string, id: string, values: Row): Promise<T> {
  const { data, error } = await (supabase as any).from(table).update(values).eq("id", id).select().single();
  if (error) throw error;
  return data as T;
}

export async function remove(table: string, id: string): Promise<void> {
  const { error } = await (supabase as any).from(table).delete().eq("id", id);
  if (error) throw error;
}

export async function count(table: string): Promise<number> {
  const { count: c, error } = await (supabase as any).from(table).select("*", { count: "exact", head: true });
  if (error) throw error;
  return c ?? 0;
}

/** Upload a file to the public media bucket and return its public URL. */
export async function uploadFile(file: File, folder = "uploads"): Promise<string> {
  const path = `${folder}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { upsert: true });
  if (error) throw error;
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
