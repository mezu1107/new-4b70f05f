/**
 * Single place where the admin module gets its backend client.
 * Re-point this file when integrating the admin folder into another frontend.
 */
export { supabase } from "@/integrations/supabase/client";
export type { Database } from "@/integrations/supabase/types";

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID as string;
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/** Storage bucket used by the media library + all image fields. */
export const MEDIA_BUCKET = "public-images";
