
-- 1. chatbot_leads: add session_key, drop permissive UPDATE policy
ALTER TABLE public.chatbot_leads ADD COLUMN IF NOT EXISTS session_key text;
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_session_key ON public.chatbot_leads(session_key);
DROP POLICY IF EXISTS "Anyone update own chatlead" ON public.chatbot_leads;
-- updates now happen only through the chatbot edge function (service role) after session_key verification

-- 2. visitor_sessions: drop permissive UPDATE; provide controlled RPC for page-view bumps
DROP POLICY IF EXISTS "Anyone update own session" ON public.visitor_sessions;

CREATE OR REPLACE FUNCTION public.bump_visitor_session(_session_key text, _duration_seconds integer DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _session_key IS NULL OR length(_session_key) < 4 OR length(_session_key) > 80 THEN
    RETURN;
  END IF;
  UPDATE public.visitor_sessions
     SET page_views = page_views + 1,
         last_seen_at = now(),
         duration_seconds = COALESCE(_duration_seconds, duration_seconds)
   WHERE session_key = _session_key;
END;
$$;
REVOKE ALL ON FUNCTION public.bump_visitor_session(text, integer) FROM public;
GRANT EXECUTE ON FUNCTION public.bump_visitor_session(text, integer) TO anon, authenticated;

-- 3. coupons: restrict public read (require authenticated)
DROP POLICY IF EXISTS "Public read active coupons" ON public.coupons;
CREATE POLICY "Authenticated read active coupons" ON public.coupons
  FOR SELECT TO authenticated
  USING (is_active = true);

-- 4. team_members: hide email column from anon/authenticated public reads
REVOKE SELECT (email) ON public.team_members FROM anon, authenticated;

-- 5. site_settings: remove broad public read; expose safe fields via SECURITY DEFINER function
DROP POLICY IF EXISTS "Public read settings" ON public.site_settings;
-- keep "Admin manage settings" policy intact for admin editing

CREATE OR REPLACE FUNCTION public.get_public_site_settings()
RETURNS TABLE (
  id uuid,
  site_name text,
  tagline text,
  contact_email text,
  contact_phone text,
  address text,
  whatsapp_number text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  youtube_url text,
  logo_url text,
  hero_typewriter_lines jsonb,
  meta_pixel_id text,
  google_analytics_id text,
  google_tag_manager_id text,
  tiktok_pixel_id text,
  linkedin_insight_id text,
  theme_primary_color text,
  theme_accent_color text,
  hero_heading_color text,
  header_text_color text,
  footer_text_color text,
  google_maps_embed text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, site_name, tagline, contact_email, contact_phone, address,
         whatsapp_number, facebook_url, instagram_url, linkedin_url, youtube_url,
         logo_url, hero_typewriter_lines, meta_pixel_id, google_analytics_id,
         google_tag_manager_id, tiktok_pixel_id, linkedin_insight_id,
         theme_primary_color, theme_accent_color, hero_heading_color,
         header_text_color, footer_text_color, google_maps_embed
    FROM public.site_settings
   LIMIT 1;
$$;
REVOKE ALL ON FUNCTION public.get_public_site_settings() FROM public;
GRANT EXECUTE ON FUNCTION public.get_public_site_settings() TO anon, authenticated;

-- 6. Fix function search_path on touch_updated_at
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
