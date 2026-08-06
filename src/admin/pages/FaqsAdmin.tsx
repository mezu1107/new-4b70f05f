import { CrudManager } from "@/admin/components/CrudManager";
export default () => <CrudManager table="faqs" title="FAQs" listColumns={["question", "category", "is_active"]}
  fields={[
    { key: "question", label: "Question", required: true },
    { key: "answer", label: "Answer", type: "textarea", required: true },
    { key: "category", label: "Category" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
