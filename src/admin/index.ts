/**
 * AM Enterprises — Admin / Backend module.
 * Everything admin-related is exported from here so a host app only ever
 * imports from "@/admin".
 */
export { AdminRoutes, PortalRoutes, ADMIN_BASE, PORTAL_BASE } from "./routes";
export { AuthProvider, useAuth } from "./hooks/useAuth";
export { useRealtimeTable } from "./hooks/useRealtimeTable";
export { CrudManager } from "./components/CrudManager";
export { FinancialDocs } from "./components/FinancialDocs";
export { ImageUploader } from "./components/ImageUploader";
export { AIOptimizerWidget } from "./components/AIOptimizerWidget";
export * as adminApi from "./api";
export * from "./lib/supabase";
