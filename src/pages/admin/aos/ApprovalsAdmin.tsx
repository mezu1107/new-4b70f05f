import { CrudManager } from "@/components/admin/CrudManager";

export default function ApprovalsAdmin() {
  return (
    <CrudManager
      table="aos_approvals"
      title="AOS · Approvals"
      listColumns={["title", "category", "status"]}
      fields={[
        { key: "client_id", label: "Client ID (UUID from AOS Clients)", required: true },
        { key: "project_id", label: "Project ID (optional UUID)" },
        { key: "title", label: "Title", required: true },
        { key: "category", label: "Category (ad/creative/landing_page/content/video/design/marketing_plan/other)" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "asset_url", label: "Asset URL", type: "url" },
        { key: "due_date", label: "Due Date", type: "date" },
      ]}
    />
  );
}
