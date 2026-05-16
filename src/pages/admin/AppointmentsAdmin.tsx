import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="appointments" title="Appointments" listColumns={["name", "email", "service", "preferred_date", "status"]}
  fields={[
    { key: "name", label: "Name", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone" },
    { key: "service", label: "Service" },
    { key: "preferred_date", label: "Preferred Date", type: "date" },
    { key: "preferred_time", label: "Preferred Time" },
    { key: "message", label: "Message", type: "textarea" },
    { key: "status", label: "Status", placeholder: "pending / confirmed / done / cancelled" },
  ]} />;
