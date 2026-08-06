import { CrudManager } from "@/components/admin/CrudManager";
export default () => <CrudManager table="blog_posts" title="Blog Posts" listColumns={["title", "author", "published"]}
  fields={[
    { key: "title", label: "Title", required: true },
    { key: "slug", label: "Slug", required: true },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "content", label: "Content (Markdown)", type: "textarea" },
    { key: "cover_image_url", label: "Cover Image (upload or URL)", type: "image" },
    { key: "author", label: "Author" },
    { key: "published", label: "Published", type: "boolean" },
  ]} />;
