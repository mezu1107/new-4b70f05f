import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, jsonResult, supabaseForUser, unauthorized } from "../supabase";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List AOS projects visible to the signed-in user. Optionally filter by client_id.",
  inputSchema: {
    client_id: z.string().uuid().optional().describe("Filter to a specific client (UUID)."),
    status: z.string().optional().describe("Filter by status (e.g. active, on_hold, completed)."),
    limit: z.number().int().min(1).max(200).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ client_id, status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthorized();
    const sb = supabaseForUser(ctx);
    let q = sb
      .from("aos_projects")
      .select("id, name, description, status, priority, progress, start_date, end_date, client_id")
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    if (client_id) q = q.eq("client_id", client_id);
    if (status) q = q.eq("status", status);
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return jsonResult({ count: data?.length ?? 0, projects: data ?? [] });
  },
});
