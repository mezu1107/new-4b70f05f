
-- Visitor sessions
CREATE TABLE public.visitor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key TEXT NOT NULL,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  referrer TEXT,
  landing_path TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  page_views INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_visitor_sessions_started ON public.visitor_sessions(started_at DESC);
CREATE INDEX idx_visitor_sessions_key ON public.visitor_sessions(session_key);
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert session" ON public.visitor_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone update own session" ON public.visitor_sessions FOR UPDATE USING (true);
CREATE POLICY "Admin read sessions" ON public.visitor_sessions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete sessions" ON public.visitor_sessions FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Visitor events
CREATE TABLE public.visitor_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key TEXT NOT NULL,
  event_type TEXT NOT NULL,
  path TEXT,
  element_label TEXT,
  element_id TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_visitor_events_session ON public.visitor_events(session_key);
CREATE INDEX idx_visitor_events_created ON public.visitor_events(created_at DESC);
CREATE INDEX idx_visitor_events_type ON public.visitor_events(event_type);
ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone insert event" ON public.visitor_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read events" ON public.visitor_events FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete events" ON public.visitor_events FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Site settings additions
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS google_tag_manager_id TEXT,
  ADD COLUMN IF NOT EXISTS tiktok_pixel_id TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_insight_id TEXT,
  ADD COLUMN IF NOT EXISTS theme_primary_color TEXT,
  ADD COLUMN IF NOT EXISTS theme_accent_color TEXT,
  ADD COLUMN IF NOT EXISTS hero_heading_color TEXT,
  ADD COLUMN IF NOT EXISTS header_text_color TEXT,
  ADD COLUMN IF NOT EXISTS footer_text_color TEXT,
  ADD COLUMN IF NOT EXISTS google_maps_embed TEXT,
  ADD COLUMN IF NOT EXISTS pixel_auto_verify BOOLEAN NOT NULL DEFAULT true;

-- Appointments enhancement
ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS duration_minutes INTEGER DEFAULT 30,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS budget TEXT,
  ADD COLUMN IF NOT EXISTS timezone TEXT,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ;
