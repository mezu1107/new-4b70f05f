# Backend reference

The server side is Supabase (Postgres + PostgREST + Auth + Storage + Edge Functions).
Deployed source lives in `supabase/functions/` at the repo root — it is deploy-managed
and cannot live inside `src/`, so this file is the index for it.

## Edge functions (`supabase/functions/<name>/index.ts`)

| Function | Purpose | Called from |
| --- | --- | --- |
| `ai-marketing-tools` | Campaign audit / ad copy / optimization (Gemini via Lovable AI) | `adminApi.aiMarketingTool()`, `AIOptimizerWidget`, public `AIToolkit` |
| `chatbot` | Lead-qualifying site chatbot, writes `chatbot_leads` | `adminApi.chatbot()`, `ChatbotWidget` |
| `aos-client-ai` | Client-portal assistant scoped to one `aos_clients` row | `adminApi.aosClientAI()`, `portal/ClientPortal` |
| `mcp` | OAuth-protected MCP server exposing 6 read/write tools | External MCP clients |

Endpoint shape: `POST https://<project>.supabase.co/functions/v1/<name>`
(always invoke via `supabase.functions.invoke`, never a hardcoded `/api/...` path).

## Database RPCs

| RPC | Use |
| --- | --- |
| `get_public_site_settings()` | Non-sensitive site settings for the public site |
| `validate_coupon(_code)` | Coupon check without exposing the `coupons` table |
| `bump_visitor_session(_session_key, _duration_seconds)` | Analytics heartbeat |
| `has_role(_user_id, _role)` | Role check used inside every admin RLS policy |
| `has_client_access(_user_id, _client_id)` | AOS portal scoping |

## Security model

- Roles live in `user_roles` (`admin` / `editor` / `user` / `client`) — never on `profiles`.
- Every table has RLS enabled; admin writes are gated by `has_role(auth.uid(), 'admin')`.
- Portal users only see rows joined through `aos_client_users` via `has_client_access()`.
- Public forms (contact, newsletter, appointments, chatbot leads) allow validated inserts only.

## Storage

Bucket `public-images` (public read) — used by `ImageUploader`, media library and
every `type: "image"` field in `CrudManager`.

## Secrets (backend only, never in client code)

`LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWKS`.
