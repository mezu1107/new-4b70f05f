import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="stats_counters" title="Stats Counters" listColumns={["label", "value", "is_active"]}
  fields={[
    { key: "label", label: "Label", required: true },
    { key: "value", label: "Value", type: "number", required: true },
    { key: "suffix", label: "Suffix (e.g. +, %)" },
    { key: "icon", label: "Lucide Icon name" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
