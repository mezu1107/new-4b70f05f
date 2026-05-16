import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="pricing_plans" title="Pricing Plans" listColumns={["name", "price", "is_active"]}
  fields={[
    { key: "name", label: "Plan Name", required: true },
    { key: "price", label: "Price", type: "number", required: true },
    { key: "currency", label: "Currency", placeholder: "PKR" },
    { key: "period", label: "Period", placeholder: "month" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "features", label: "Features (comma separated)", placeholder: "Feature 1, Feature 2" },
    { key: "cta_text", label: "CTA Text", placeholder: "Get Started" },
    { key: "cta_url", label: "CTA URL", type: "url" },
    { key: "highlighted", label: "Highlighted", type: "boolean" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} transform={(v) => typeof v.features === "string" ? { ...v, features: v.features.split(",").map((s: string) => s.trim()).filter(Boolean) } : v} />;
