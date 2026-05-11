import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="process_steps" title="Process Steps" listColumns={["title", "sort_order", "is_active"]}
  fields={[
    { key: "title", label: "Step Title", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "icon", label: "Lucide Icon name", placeholder: "Search" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
