import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="clients" title="Clients & Logos" listColumns={["name", "is_active"]}
  fields={[
    { key: "name", label: "Client Name", required: true },
    { key: "logo_url", label: "Logo", type: "image" },
    { key: "website_url", label: "Website", type: "url" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
