import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="job_openings" title="Job Openings" listColumns={["title", "department", "location", "is_active"]}
  fields={[
    { key: "title", label: "Job Title", required: true },
    { key: "department", label: "Department" },
    { key: "location", label: "Location" },
    { key: "type", label: "Type", placeholder: "Full-time" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "requirements", label: "Requirements", type: "textarea" },
    { key: "salary_range", label: "Salary Range" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
