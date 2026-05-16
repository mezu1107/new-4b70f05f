import { PageHero } from "@/components/layout/PageHero";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const Blog = () => {
  const { data } = useRealtimeTable<any>({ table: "blog_posts", filters: [{ column: "published", value: true }], orderBy: { column: "created_at", ascending: false } });
  const posts = data ?? [];
  return (
    <PageLayout title="Blog — Digital Marketing Insights | AM Enterprises" description="SEO tips, digital marketing guides, and business growth strategies from our experts." canonical="/blog">
      <PageHero title="Insights & Resources" subtitle="Sharp ideas to grow your business." />
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center">No posts yet — check back soon.</p>}
          {posts.map((p: any) => (
            <Card key={p.id} className="overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-smooth">
              {p.cover_image_url ? <img src={p.cover_image_url} alt={p.title} className="h-44 w-full object-cover" /> : <div className="h-44 gradient-primary" />}
              <div className="p-6">
                <div className="text-xs font-semibold text-accent uppercase mb-2">{p.author || "AM Enterprises"} • {new Date(p.created_at).toLocaleDateString()}</div>
                <h3 className="text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
                <Link to="/contact" className="text-primary font-semibold text-sm">Read more →</Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
export default Blog;
