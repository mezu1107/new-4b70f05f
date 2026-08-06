import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="job_applications" title="Job Applications" listColumns={["name", "email", "phone", "status"]}
  fields={[
    { key: "name", label: "Name", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone" },
    { key: "resume_url", label: "Resume URL", type: "url" },
    { key: "cover_letter", label: "Cover Letter", type: "textarea" },
    { key: "status", label: "Status", placeholder: "new / reviewed / shortlisted / rejected" },
  ]} />;
