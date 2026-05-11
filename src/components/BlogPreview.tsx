import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const BlogPreview = () => {
  const { data } = useRealtimeTable<any>({ table: "blog_posts", filters: [{ column: "published", value: true }], orderBy: { column: "published_at", ascending: false }, limit: 3 });
  if (!data?.length) return null;
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((p: any) => (
          <Link key={p.id} to={`/blog`} className="group">
            <Card className="overflow-hidden h-full hover:shadow-elegant transition-smooth bg-white">
              {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} loading="lazy" className="w-full h-44 object-cover group-hover:scale-105 transition-smooth" />}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" /> {p.published_at ? new Date(p.published_at).toLocaleDateString() : ""}
                </div>
                <h3 className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-smooth">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="outline"><Link to="/blog">View all posts <ArrowRight className="ml-1 w-4 h-4" /></Link></Button>
      </div>
    </div>
  );
};
