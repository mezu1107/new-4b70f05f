import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="quiz_questions" title="Quiz Questions" listColumns={["question", "sort_order", "is_active"]}
  fields={[
    { key: "question", label: "Question", required: true },
    { key: "options", label: "Options (comma separated)", placeholder: "Option A, Option B, Option C" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} transform={(v) => typeof v.options === "string" ? { ...v, options: v.options.split(",").map((s: string) => s.trim()).filter(Boolean) } : v} />;
