import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, jsonResult, supabaseForUser, unauthorized } from "../supabase";

export default defineTool({
  name: "list_my_clients",
  title: "List my clients",
  description: "List AOS clients the signed-in user has access to. Admins see all clients; portal users see only clients linked to them via aos_client_users.",
  inputSchema: {
    limit: z.number().int().min(1).max(200).optional().describe("Max rows to return. Default 50."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthorized();
    const sb = supabaseForUser(ctx);
    const { data, error } = await sb
      .from("aos_clients")
      .select("id, full_name, company_name, industry, status, service_package, monthly_retainer, contract_start, contract_end")
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    if (error) return errorResult(error.message);
    return jsonResult({ count: data?.length ?? 0, clients: data ?? [] });
  },
});
