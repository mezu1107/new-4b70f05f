import { defineTool } from "@lovable.dev/mcp-js";
import { jsonResult, unauthorized } from "../supabase";

export default defineTool({
  name: "whoami",
  title: "Who am I",
  description: "Return the signed-in user's id, email, and OAuth client id. Use to confirm the MCP connection is authenticated.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    if (!ctx.isAuthenticated()) return unauthorized();
    return jsonResult({
      user_id: ctx.getUserId(),
      email: ctx.getUserEmail(),
      client_id: ctx.getClientId(),
    });
  },
});
