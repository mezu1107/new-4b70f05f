import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="popups" title="Popups" listColumns={["title", "type", "is_active"]}
  fields={[
    { key: "title", label: "Title", required: true },
    { key: "content", label: "Content", type: "textarea" },
    { key: "image_url", label: "Image", type: "image" },
    { key: "cta_text", label: "CTA Text" },
    { key: "cta_url", label: "CTA URL", type: "url" },
    { key: "type", label: "Type (modal/banner)", placeholder: "modal" },
    { key: "is_active", label: "Active", type: "boolean" },
  ]} />;
