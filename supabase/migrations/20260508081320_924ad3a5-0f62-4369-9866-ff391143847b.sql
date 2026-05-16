
-- Add category & parent for nested service navigation
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS parent_slug text,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS image_url text;

-- Realtime publication (idempotent)
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'services','portfolio_items','case_studies','blog_posts','testimonials',
    'faqs','team_members','clients','process_steps','stats_counters',
    'pricing_plans','packages','popups','job_openings','site_settings','quiz_questions'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I REPLICA IDENTITY FULL', t);
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
  END LOOP;
END $$;
