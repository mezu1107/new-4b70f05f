import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="packages" title="Packages" listColumns={["name", "price", "is_active"]}
  fields={[
    { key: "name", label: "Package Name", required: true },
    { key: "tagline", label: "Tagline" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "price", label: "Price", type: "number" },
    { key: "currency", label: "Currency", placeholder: "PKR" },
    { key: "includes", label: "Includes (comma separated)" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} transform={(v) => typeof v.includes === "string" ? { ...v, includes: v.includes.split(",").map((s: string) => s.trim()).filter(Boolean) } : v} />;
