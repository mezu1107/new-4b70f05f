
-- Phase 3: Extend page_seo for richer SEO
ALTER TABLE public.page_seo
  ADD COLUMN IF NOT EXISTS primary_keyword text,
  ADD COLUMN IF NOT EXISTS secondary_keywords text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS long_tail_keywords text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS seo_tags text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS auto_generate boolean NOT NULL DEFAULT true;

ALTER TABLE public.page_seo REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'page_seo'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.page_seo';
  END IF;
END $$;

-- Phase 4: Page banners
CREATE TABLE IF NOT EXISTS public.page_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_route text NOT NULL DEFAULT '*',
  position text NOT NULL DEFAULT 'top',
  title text NOT NULL,
  subtitle text,
  cta_text text,
  cta_url text,
  background_image text,
  bg_color text,
  text_color text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read banners" ON public.page_banners
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manage banners" ON public.page_banners
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_banners_updated BEFORE UPDATE ON public.page_banners
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.page_banners REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_banners;
