import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="coupons" title="Coupons" listColumns={["code", "discount_value", "used_count", "is_active"]}
  fields={[
    { key: "code", label: "Code", required: true, placeholder: "SAVE20" },
    { key: "description", label: "Description" },
    { key: "discount_type", label: "Type", placeholder: "percent / fixed" },
    { key: "discount_value", label: "Discount Value", type: "number", required: true },
    { key: "max_uses", label: "Max Uses", type: "number" },
    { key: "expires_at", label: "Expires At", type: "date" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
