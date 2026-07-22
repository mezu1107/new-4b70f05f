import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, jsonResult, supabaseForUser, unauthorized } from "../supabase";

export default defineTool({
  name: "list_approvals",
  title: "List approvals",
  description: "List AOS approval items visible to the signed-in user. Optionally filter by client_id or status.",
  inputSchema: {
    client_id: z.string().uuid().optional(),
    status: z.string().optional().describe("e.g. pending, approved, rejected"),
    limit: z.number().int().min(1).max(200).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ client_id, status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthorized();
    const sb = supabaseForUser(ctx);
    let q = sb
      .from("aos_approvals")
      .select("id, title, category, status, due_date, client_id, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    if (client_id) q = q.eq("client_id", client_id);
    if (status) q = q.eq("status", status);
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return jsonResult({ count: data?.length ?? 0, approvals: data ?? [] });
  },
});
