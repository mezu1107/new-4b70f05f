import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, jsonResult, supabaseForUser, unauthorized } from "../supabase";

export default defineTool({
  name: "list_tasks",
  title: "List tasks",
  description: "List AOS tasks visible to the signed-in user. Filter by project_id and/or status.",
  inputSchema: {
    project_id: z.string().uuid().optional(),
    status: z.string().optional().describe("e.g. todo, in_progress, review, done"),
    limit: z.number().int().min(1).max(200).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ project_id, status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthorized();
    const sb = supabaseForUser(ctx);
    let q = sb
      .from("aos_tasks")
      .select("id, title, description, status, priority, due_date, project_id, assignee_id")
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    if (project_id) q = q.eq("project_id", project_id);
    if (status) q = q.eq("status", status);
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return jsonResult({ count: data?.length ?? 0, tasks: data ?? [] });
  },
});
