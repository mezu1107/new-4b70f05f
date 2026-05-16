import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="services" title="Services" listColumns={["title", "slug", "is_active"]}
  fields={[
    { key: "title", label: "Title", required: true },
    { key: "slug", label: "Slug (url-friendly)", required: true, placeholder: "seo-services" },
    { key: "description", label: "Short Description", type: "textarea" },
    { key: "icon", label: "Lucide icon name", placeholder: "TrendingUp" },
    { key: "long_description", label: "Long Description", type: "textarea" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
