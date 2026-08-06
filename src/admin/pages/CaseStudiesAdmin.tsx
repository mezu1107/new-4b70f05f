import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="case_studies" title="Case Studies" listColumns={["title", "client", "is_active"]}
  fields={[
    { key: "title", label: "Title", required: true },
    { key: "client", label: "Client" },
    { key: "industry", label: "Industry" },
    { key: "summary", label: "Summary", type: "textarea" },
    { key: "challenge", label: "Challenge", type: "textarea" },
    { key: "solution", label: "Solution", type: "textarea" },
    { key: "results", label: "Results", type: "textarea" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
