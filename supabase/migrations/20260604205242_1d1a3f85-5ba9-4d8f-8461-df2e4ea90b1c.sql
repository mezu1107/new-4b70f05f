
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS pinterest_tag_id text,
  ADD COLUMN IF NOT EXISTS snapchat_pixel_id text,
  ADD COLUMN IF NOT EXISTS twitter_pixel_id text,
  ADD COLUMN IF NOT EXISTS hotjar_id text,
  ADD COLUMN IF NOT EXISTS clarity_id text,
  ADD COLUMN IF NOT EXISTS gsc_verification text,
  ADD COLUMN IF NOT EXISTS bing_verification text,
  ADD COLUMN IF NOT EXISTS yandex_verification text,
  ADD COLUMN IF NOT EXISTS custom_head_html text,
  ADD COLUMN IF NOT EXISTS custom_body_html text;

DROP FUNCTION IF EXISTS public.get_public_site_settings();

CREATE OR REPLACE FUNCTION public.get_public_site_settings()
 RETURNS TABLE(
   id uuid, site_name text, tagline text, contact_email text, contact_phone text, address text,
   whatsapp_number text, facebook_url text, instagram_url text, linkedin_url text, youtube_url text,
   logo_url text, hero_typewriter_lines jsonb,
   meta_pixel_id text, google_analytics_id text, google_tag_manager_id text,
   tiktok_pixel_id text, linkedin_insight_id text,
   pinterest_tag_id text, snapchat_pixel_id text, twitter_pixel_id text,
   hotjar_id text, clarity_id text,
   gsc_verification text, bing_verification text, yandex_verification text,
   custom_head_html text, custom_body_html text,
   theme_primary_color text, theme_accent_color text, hero_heading_color text,
   header_text_color text, footer_text_color text, google_maps_embed text
 )
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  SELECT id, site_name, tagline, contact_email, contact_phone, address,
         whatsapp_number, facebook_url, instagram_url, linkedin_url, youtube_url,
         logo_url, hero_typewriter_lines,
         meta_pixel_id, google_analytics_id, google_tag_manager_id,
         tiktok_pixel_id, linkedin_insight_id,
         pinterest_tag_id, snapchat_pixel_id, twitter_pixel_id,
         hotjar_id, clarity_id,
         gsc_verification, bing_verification, yandex_verification,
         custom_head_html, custom_body_html,
         theme_primary_color, theme_accent_color, hero_heading_color,
         header_text_color, footer_text_color, google_maps_embed
    FROM public.site_settings
   LIMIT 1;
$function$;
