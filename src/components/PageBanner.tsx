import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Props {
  position: "top" | "middle" | "bottom";
}

export const PageBanner = ({ position }: Props) => {
  const { pathname } = useLocation();
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data } = await supabase
        .from("page_banners")
        .select("*")
        .eq("is_active", true)
        .eq("position", position)
        .or(`page_route.eq.${pathname},page_route.eq.*`)
        .order("sort_order", { ascending: true });
      if (!cancelled) setBanners(data ?? []);
    };
    load();

    const ch = supabase
      .channel(`rt-banners-${position}-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "page_banners" }, load)
      .subscribe();
    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, [pathname, position]);

  if (!banners.length) return null;

  return (
    <div className="space-y-3">
      {banners.map((b) => (
        <div
          key={b.id}
          className="relative overflow-hidden border-y border-border bg-dark"
          style={{
            backgroundImage: b.background_image ? `url(${b.background_image})` : undefined,
            backgroundColor: b.bg_color || undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: b.text_color || undefined,
          }}
        >
          {b.background_image && (
            <div className="absolute inset-0 bg-background/80" aria-hidden="true" />
          )}
          <div className="relative container mx-auto py-5 md:py-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center text-foreground">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">{b.title}</h3>
              {b.subtitle && <p className="text-sm md:text-base text-muted-foreground mt-1">{b.subtitle}</p>}
            </div>
            {b.cta_text && b.cta_url && (
              <Button asChild variant="default" size="lg">
                <a href={b.cta_url}>{b.cta_text}</a>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
