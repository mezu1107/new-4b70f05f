import { CrudManager } from "@/components/admin/CrudManager";
import { toast } from "sonner";

const SAMPLE = `[
  {
    "type": "text",
    "data": { "heading": "About this service", "body": "Write a short overview here." }
  },
  {
    "type": "features",
    "data": {
      "heading": "What you get",
      "subheading": "Everything included in this package",
      "items": [
        { "icon": "🚀", "title": "Fast Delivery", "description": "Launch in days, not months." },
        { "icon": "📈", "title": "Real Results", "description": "Tracked, measurable growth." },
        { "icon": "🎯", "title": "Targeted", "description": "Built for your audience." }
      ]
    }
  },
  {
    "type": "pricing",
    "data": {
      "heading": "Pick a plan",
      "plans": [
        { "name": "Starter", "price": "25,000", "currency": "PKR", "period": "per month", "features": ["Feature one", "Feature two"], "cta_text": "Choose Starter" },
        { "name": "Pro", "price": "65,000", "featured": true, "currency": "PKR", "period": "per month", "features": ["Everything in Starter", "Priority support"], "cta_text": "Go Pro" },
        { "name": "Scale", "price": "150,000", "currency": "PKR", "period": "per month", "features": ["Custom strategy", "Dedicated manager"], "cta_text": "Talk to Sales" }
      ]
    }
  },
  {
    "type": "faq",
    "data": {
      "heading": "Frequently asked questions",
      "items": [
        { "question": "How fast can we start?", "answer": "Within 48 hours of signup." }
      ]
    }
  },
  {
    "type": "cta",
    "data": { "heading": "Ready to grow?", "subheading": "Book a free 30-minute strategy call.", "cta_text": "Book Now", "cta_url": "/contact", "secondary_text": "Call 0317-3712950", "secondary_url": "tel:03173712950" }
  }
]`;

export default function DynamicPagesAdmin() {
  return (
    <div>
      <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm">
        <strong>📄 Page Builder:</strong> Yahan se naya page banao — instantly <code>/p/your-slug</code> par live ho jayega. Sections JSON mein likhain (sample neechay).
        <details className="mt-2">
          <summary className="cursor-pointer text-primary font-semibold">View sample sections JSON</summary>
          <pre className="mt-2 text-xs bg-background border border-border rounded p-3 overflow-x-auto">{SAMPLE}</pre>
          <p className="mt-2 text-xs text-muted-foreground">Supported types: <code>text, features, pricing, faq, cta, gallery, stats</code></p>
        </details>
      </div>
      <CrudManager
        table="dynamic_pages"
        title="Dynamic Pages (Realtime)"
        listColumns={["slug", "title", "is_published", "show_in_nav"]}
        transform={(p) => {
          if (typeof p.sections === "string") {
            try { p.sections = JSON.parse(p.sections); }
            catch { toast.error("Sections JSON invalid — please fix"); throw new Error("Invalid sections JSON"); }
          }
          if (!Array.isArray(p.sections)) p.sections = [];
          return p;
        }}
        fields={[
          { key: "slug", label: "URL slug (e.g. premium-seo)", required: true, placeholder: "premium-seo" },
          { key: "title", label: "Page Title", required: true },
          { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
          { key: "hero_image", label: "Hero Background Image", type: "image" },
          { key: "sections", label: "Sections (JSON array — see sample above)", type: "textarea", placeholder: SAMPLE },
          { key: "meta_title", label: "Meta Title (SEO, <60 chars)" },
          { key: "meta_description", label: "Meta Description (<160 chars)", type: "textarea" },
          { key: "primary_keyword", label: "Primary Keyword" },
          { key: "secondary_keywords", label: "Secondary Keywords", type: "tags" },
          { key: "long_tail_keywords", label: "Long-tail Keywords", type: "tags" },
          { key: "og_image_url", label: "OG Image", type: "image" },
          { key: "show_in_nav", label: "Show in main navigation", type: "boolean" },
          { key: "is_published", label: "Published (live on site)", type: "boolean" },
          { key: "sort_order", label: "Sort order", type: "number" },
        ]}
      />
    </div>
  );
}
