import { auth, defineMcp } from "@lovable.dev/mcp-js";
import whoami from "./tools/whoami";
import listMyClients from "./tools/list-my-clients";
import listProjects from "./tools/list-projects";
import listTasks from "./tools/list-tasks";
import listApprovals from "./tools/list-approvals";
import createContactLead from "./tools/create-contact-lead";

// Build the direct Supabase issuer from the project ref (survives publish
// unchanged). Never derive it from SUPABASE_URL — that may be a proxy host.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "am-enterprises-mcp",
  title: "AM Enterprises MCP",
  version: "0.1.0",
  instructions:
    "Tools for AM Enterprises. Callers act as the signed-in app user; row-level security decides what each user can read or write. Use `whoami` to verify the connection, then `list_my_clients`, `list_projects`, `list_tasks`, and `list_approvals` to browse the Agency Operating System. Use `create_contact_lead` to log a new enquiry in the CRM.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [whoami, listMyClients, listProjects, listTasks, listApprovals, createContactLead],
});
