import { CrudManager } from "@/components/admin/CrudManager";
export default () => (
  <CrudManager
    table="page_seo"
    title="Page SEO (Realtime)"
    listColumns={["route", "title", "primary_keyword", "noindex"]}
    fields={[
      { key: "route", label: "Route (e.g. /about)", required: true, placeholder: "/about" },
      { key: "title", label: "Meta Title (<60 chars)" },
      { key: "description", label: "Meta Description (<160 chars)", type: "textarea" },
      { key: "primary_keyword", label: "Primary Keyword" },
      { key: "secondary_keywords", label: "Secondary Keywords (comma-separated)", type: "tags" },
      { key: "long_tail_keywords", label: "Long-tail Keywords (comma-separated)", type: "tags" },
      { key: "seo_tags", label: "SEO Tags (leave empty to auto-generate)", type: "tags" },
      { key: "keywords", label: "Keywords meta (leave empty to auto-generate)" },
      { key: "og_image_url", label: "OG Image", type: "image" },
      { key: "auto_generate", label: "Auto-generate missing fields", type: "boolean" },
      { key: "noindex", label: "No Index", type: "boolean" },
    ]}
  />
);
