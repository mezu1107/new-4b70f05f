import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical: string;
  noindex: boolean;
  primaryKeyword?: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  tags: string[];
}

interface Defaults {
  route: string;
  title: string;
  description: string;
  primaryKeyword?: string;
}

const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

const buildAuto = (row: any | null, def: Defaults): SeoData => {
  const r = row || {};
  const primary = r.primary_keyword || def.primaryKeyword || def.title;
  const secondary: string[] = r.secondary_keywords ?? [];
  const longTail: string[] = r.long_tail_keywords ?? [];
  const explicitTags: string[] = r.seo_tags ?? [];

  const autoTags = Array.from(
    new Set([primary, ...secondary, ...longTail, "AM Enterprises", "Pakistan", "Digital Agency", "AI Automation"].filter(Boolean))
  );
  const tags = explicitTags.length ? explicitTags : autoTags;

  const description =
    r.description ||
    truncate(
      `${def.description} Expert ${primary}${secondary.length ? `, ${secondary.slice(0, 2).join(", ")}` : ""} services tailored for growth.`,
      158
    );

  const keywords = r.keywords || tags.join(", ");
  const title = r.title ? truncate(r.title, 60) : truncate(`${def.title} | AM Enterprises`, 60);

  return {
    title,
    description,
    keywords,
    ogImage: r.og_image_url,
    canonical: `https://amenterprises.tech${def.route}`,
    noindex: !!r.noindex,
    primaryKeyword: primary,
    secondaryKeywords: secondary,
    longTailKeywords: longTail,
    tags,
  };
};

export const useSeo = (def: Defaults): SeoData => {
  const [row, setRow] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("page_seo").select("*").eq("route", def.route).maybeSingle();
      if (!cancelled) setRow(data);
    })();

    const ch = supabase
      .channel(`rt-page_seo-${def.route}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "page_seo", filter: `route=eq.${def.route}` },
        (payload) => {
          if (payload.eventType === "DELETE") setRow(null);
          else setRow(payload.new);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, [def.route]);

  return buildAuto(row, def);
};
