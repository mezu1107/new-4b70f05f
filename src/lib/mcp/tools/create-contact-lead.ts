import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, jsonResult, supabaseForUser, unauthorized } from "../supabase";

export default defineTool({
  name: "create_contact_lead",
  title: "Create contact lead",
  description: "Create a new contact/enquiry lead in the CRM. Use when an assistant is capturing a lead on behalf of the signed-in user.",
  inputSchema: {
    name: z.string().min(1).max(200),
    email: z.string().email().max(255),
    phone: z.string().max(40).optional(),
    message: z.string().max(4000).optional(),
    source: z.string().max(60).optional().describe("Where the lead came from, e.g. 'mcp', 'chatgpt'. Defaults to 'mcp'."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ name, email, phone, message, source }, ctx) => {
    if (!ctx.isAuthenticated()) return unauthorized();
    const sb = supabaseForUser(ctx);
    const { data, error } = await sb
      .from("contact_leads")
      .insert({ name, email, phone: phone ?? null, message: message ?? null, source: source ?? "mcp" })
      .select("id, name, email, source, created_at")
      .single();
    if (error) return errorResult(error.message);
    return jsonResult({ lead: data });
  },
});
