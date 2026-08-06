# Admin & Backend Module (`src/admin`)

Everything backend/admin related for AM Enterprises lives **only** in this folder.
The public site (`src/pages`, `src/components`) never talks to the database
directly through admin code — it imports from `@/admin` when it needs auth or data helpers.

## Folder map

```
src/admin/
├── index.ts              # Public surface: `import { AdminRoutes, useAuth, adminApi } from "@/admin"`
├── routes.tsx            # <AdminRoutes/> + <PortalRoutes/> — the whole route table
├── api/
│   ├── crud.ts           # Generic list/getOne/create/update/remove/count/uploadFile
│   ├── functions.ts      # Typed wrappers for every edge function + RPC
│   ├── tables.ts         # Registry of all managed tables, grouped by module
│   └── index.ts
├── components/           # CrudManager, FinancialDocs, ImageUploader, AIOptimizerWidget
├── hooks/                # useAuth (session + admin role), useRealtimeTable
├── lib/
│   ├── supabase.ts       # SINGLE backend entry point (swap this to re-point the backend)
│   └── pdfGenerator.ts   # Invoice / proposal PDF builder
├── pages/                # All 32 admin screens + pages/aos/* (Agency OS)
├── portal/               # Client-facing AOS portal (/portal/:clientId)
└── backend/README.md     # Edge functions, RPCs, RLS, storage & env reference
```

## Mounting the admin panel in another frontend

1. Copy `src/admin/` into the new project.
2. Provide the shared deps: React 18, react-router-dom, @tanstack/react-query,
   shadcn/ui (`@/components/ui/*`), lucide-react, sonner, and the Supabase client
   at `@/integrations/supabase/client` (or edit `src/admin/lib/supabase.ts`).
3. Wire it up:

```tsx
import { BrowserRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, AdminRoutes, PortalRoutes } from "@/admin";

<QueryClientProvider client={new QueryClient()}>
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* your public routes */}
        {AdminRoutes()}
        {PortalRoutes()}
      </Routes>
    </AuthProvider>
  </BrowserRouter>
</QueryClientProvider>
```

4. Env vars required: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
5. Change `ADMIN_BASE` / `PORTAL_BASE` in `routes.tsx` to remount at different URLs.

## Data access

Use the API layer instead of ad-hoc queries:

```ts
import { adminApi } from "@/admin";

const posts = await adminApi.list("blog_posts", { orderBy: "created_at", ascending: false });
await adminApi.update("blog_posts", id, { published: true });
const url = await adminApi.uploadFile(file, "blog");
const { output } = await adminApi.aiMarketingTool({ tool: "optimize", input: "..." });
```

## Notes

- `src/hooks/useAuth.tsx` and `src/hooks/useRealtimeTable.ts` are thin re-exports of the
  admin versions so public components keep working — delete them if you drop the module.
- All access is enforced server-side by RLS + the `has_role()` security-definer function.
  Removing the admin UI never widens data access.
