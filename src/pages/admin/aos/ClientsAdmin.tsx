import { CrudManager } from "@/components/admin/CrudManager";

export default function AOSClientsAdmin() {
  return (
    <CrudManager
      table="aos_clients"
      title="AOS · Clients"
      listColumns={["full_name", "company_name", "status", "service_package", "monthly_retainer"]}
      fields={[
        { key: "full_name", label: "Full Name", required: true },
        { key: "company_name", label: "Company Name" },
        { key: "industry", label: "Industry" },
        { key: "website", label: "Website", type: "url" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone" },
        { key: "country", label: "Country" },
        { key: "state", label: "State" },
        { key: "city", label: "City" },
        { key: "address", label: "Address", type: "textarea" },
        { key: "timezone", label: "Time Zone" },
        { key: "language", label: "Language" },
        { key: "service_package", label: "Service Package" },
        { key: "monthly_retainer", label: "Monthly Retainer (USD)", type: "number" },
        { key: "contract_start", label: "Contract Start", type: "date" },
        { key: "contract_end", label: "Contract End", type: "date" },
        { key: "status", label: "Status (lead/prospect/active/paused/completed/cancelled)" },
        { key: "logo_url", label: "Logo", type: "image" },
        { key: "notes", label: "Notes", type: "textarea" },
      ]}
    />
  );
}
