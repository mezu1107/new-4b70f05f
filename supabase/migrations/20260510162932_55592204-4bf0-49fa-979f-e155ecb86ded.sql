CREATE TABLE public.dynamic_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  hero_subtitle text,
  hero_image text,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  meta_title text,
  meta_description text,
  primary_keyword text,
  secondary_keywords text[] DEFAULT '{}',
  long_tail_keywords text[] DEFAULT '{}',
  og_image_url text,
  is_published boolean NOT NULL DEFAULT true,
  show_in_nav boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.dynamic_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published pages" ON public.dynamic_pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admin manage pages" ON public.dynamic_pages
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER touch_dynamic_pages BEFORE UPDATE ON public.dynamic_pages
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.dynamic_pages;
ALTER TABLE public.dynamic_pages REPLICA IDENTITY FULL;