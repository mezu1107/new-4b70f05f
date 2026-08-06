import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="team_members" title="Team Members" listColumns={["name", "role", "is_active"]}
  fields={[
    { key: "name", label: "Name", required: true },
    { key: "role", label: "Designation / Role", required: true },
    { key: "initials", label: "Initials (2 letters)" },
    { key: "bio", label: "Bio", type: "textarea" },
    { key: "avatar_url", label: "Avatar (upload or URL)", type: "image" },
    { key: "email", label: "Email", type: "email" },
    { key: "linkedin_url", label: "LinkedIn URL", type: "url" },
    { key: "sort_order", label: "Sort Order", type: "number" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
