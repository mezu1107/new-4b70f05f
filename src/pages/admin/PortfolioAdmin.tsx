import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="portfolio_items" title="Portfolio" listColumns={["title", "category", "is_active"]}
  fields={[
    { key: "title", label: "Title", required: true },
    { key: "category", label: "Category" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "image_url", label: "Image (upload or URL)", type: "image" },
    { key: "project_url", label: "Project URL", type: "url" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
