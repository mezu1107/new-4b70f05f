import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="media_library" title="Media Library" listColumns={["name", "category", "url"]}
  fields={[
    { key: "name", label: "Name", required: true },
    { key: "url", label: "Image (upload or URL)", type: "image", required: true },
    { key: "alt_text", label: "Alt Text" },
    { key: "category", label: "Category" },
  ]} />;
