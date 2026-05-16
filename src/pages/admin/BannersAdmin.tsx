import { CrudManager } from "@/components/admin/CrudManager";
export default () => (
  <CrudManager
    table="page_banners"
    title="Page Banners"
    listColumns={["title", "page_route", "position", "is_active"]}
    fields={[
      { key: "title", label: "Title", required: true },
      { key: "subtitle", label: "Subtitle" },
      { key: "page_route", label: "Page Route ('*' for all pages)", placeholder: "/about or *", required: true },
      { key: "position", label: "Position (top / middle / bottom)", placeholder: "top", required: true },
      { key: "cta_text", label: "CTA Text" },
      { key: "cta_url", label: "CTA URL", type: "url" },
      { key: "background_image", label: "Background Image", type: "image" },
      { key: "bg_color", label: "Background Color (hex, optional)" },
      { key: "text_color", label: "Text Color (hex, optional)" },
      { key: "sort_order", label: "Sort Order", type: "number" },
      { key: "is_active", label: "Active", type: "boolean" },
    ]}
  />
);
