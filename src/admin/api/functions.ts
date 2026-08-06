import { supabase } from "../lib/supabase";

/**
 * Typed wrappers around every backend (edge) function and RPC the admin
 * panel / public site depends on. Deployed sources live in `supabase/functions`.
 */

export type AIMarketingTool = "optimize" | "ads" | "audit" | "content";

/** POST /functions/v1/ai-marketing-tools */
export async function aiMarketingTool(body: { tool: AIMarketingTool; platform?: string; input: string }) {
  const { data, error } = await supabase.functions.invoke("ai-marketing-tools", { body });
  if (error) throw error;
  return data as { output: string };
}

/** POST /functions/v1/chatbot — public site lead-qualifying chatbot. */
export async function chatbot(body: { messages: { role: string; content: string }[]; session_key?: string }) {
  const { data, error } = await supabase.functions.invoke("chatbot", { body });
  if (error) throw error;
  return data;
}

/** POST /functions/v1/aos-client-ai — client-portal assistant, scoped to one client. */
export async function aosClientAI(body: { clientId: string; message: string }) {
  const { data, error } = await supabase.functions.invoke("aos-client-ai", { body });
  if (error) throw error;
  return data;
}

/* ------------------------------- RPCs ---------------------------------- */

/** Public, non-sensitive subset of site_settings. */
export async function getPublicSiteSettings() {
  const { data, error } = await supabase.rpc("get_public_site_settings");
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function validateCoupon(code: string) {
  const { data, error } = await supabase.rpc("validate_coupon", { _code: code });
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function bumpVisitorSession(sessionKey: string, durationSeconds?: number) {
  const { error } = await supabase.rpc("bump_visitor_session", {
    _session_key: sessionKey,
    _duration_seconds: durationSeconds ?? null,
  });
  if (error) throw error;
}

export async function hasRole(userId: string, role: "admin" | "editor" | "user" | "client") {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: role });
  if (error) throw error;
  return !!data;
}
