
-- 1. Coupons: remove authenticated read + add safe validator RPC
DROP POLICY IF EXISTS "Authenticated read active coupons" ON public.coupons;

CREATE OR REPLACE FUNCTION public.validate_coupon(_code text)
RETURNS TABLE(code text, description text, discount_type text, discount_value numeric)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT c.code, c.description, c.discount_type, c.discount_value
  FROM public.coupons c
  WHERE upper(c.code) = upper(_code)
    AND c.is_active = true
    AND (c.expires_at IS NULL OR c.expires_at > now())
    AND (c.max_uses IS NULL OR c.used_count < c.max_uses)
  LIMIT 1;
$$;
GRANT EXECUTE ON FUNCTION public.validate_coupon(text) TO anon, authenticated;

-- 2. Team members: hide email from public reads via view; restrict table to admins
DROP POLICY IF EXISTS "Public read team" ON public.team_members;
REVOKE SELECT ON public.team_members FROM anon;

CREATE OR REPLACE VIEW public.public_team_members
WITH (security_invoker = true) AS
SELECT id, name, role, bio, initials, avatar_url, linkedin_url, sort_order, is_active, created_at, updated_at
FROM public.team_members
WHERE is_active = true;

-- View needs an RLS-bypassing policy on base table for anon reads. Add narrow SELECT policy scoped to safe columns via view.
CREATE POLICY "Public read active team (no email)"
ON public.team_members FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Restrict email column: revoke column, keep others readable
REVOKE SELECT (email) ON public.team_members FROM anon, authenticated;
GRANT SELECT (id, name, role, bio, initials, avatar_url, linkedin_url, sort_order, is_active, created_at, updated_at)
  ON public.team_members TO anon, authenticated;
GRANT SELECT ON public.public_team_members TO anon, authenticated;

-- 3. Remove AOS tables from realtime publication (prevents unscoped channel subscriptions)
ALTER PUBLICATION supabase_realtime DROP TABLE public.aos_tasks;
ALTER PUBLICATION supabase_realtime DROP TABLE public.aos_approvals;
ALTER PUBLICATION supabase_realtime DROP TABLE public.aos_activity;
ALTER PUBLICATION supabase_realtime DROP TABLE public.aos_client_chat_messages;

-- 4. Replace WITH CHECK (true) on public INSERT policies with light validation
DROP POLICY IF EXISTS "Anyone insert lead" ON public.contact_leads;
CREATE POLICY "Anyone insert lead" ON public.contact_leads FOR INSERT TO anon, authenticated
WITH CHECK (
  name IS NOT NULL AND length(name) BETWEEN 1 AND 200
  AND (email IS NULL OR length(email) BETWEEN 3 AND 200)
  AND (message IS NULL OR length(message) <= 5000)
);

DROP POLICY IF EXISTS "Anyone insert chatlead" ON public.chatbot_leads;
CREATE POLICY "Anyone insert chatlead" ON public.chatbot_leads FOR INSERT TO anon, authenticated
WITH CHECK (
  (name IS NULL OR length(name) <= 200)
  AND (email IS NULL OR length(email) <= 200)
  AND (session_key IS NULL OR length(session_key) BETWEEN 4 AND 120)
);

DROP POLICY IF EXISTS "Anyone book" ON public.appointments;
CREATE POLICY "Anyone book" ON public.appointments FOR INSERT TO anon, authenticated
WITH CHECK (
  name IS NOT NULL AND length(name) BETWEEN 1 AND 200
  AND email IS NOT NULL AND length(email) BETWEEN 3 AND 200
);

DROP POLICY IF EXISTS "Anyone apply" ON public.job_applications;
CREATE POLICY "Anyone apply" ON public.job_applications FOR INSERT TO anon, authenticated
WITH CHECK (
  name IS NOT NULL AND length(name) BETWEEN 1 AND 200
  AND email IS NOT NULL AND length(email) BETWEEN 3 AND 200
  AND job_id IS NOT NULL
);

DROP POLICY IF EXISTS "Anyone subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
WITH CHECK (
  email IS NOT NULL AND length(email) BETWEEN 3 AND 200
);

DROP POLICY IF EXISTS "Anyone insert session" ON public.visitor_sessions;
CREATE POLICY "Anyone insert session" ON public.visitor_sessions FOR INSERT TO anon, authenticated
WITH CHECK (
  session_key IS NOT NULL AND length(session_key) BETWEEN 4 AND 120
);

DROP POLICY IF EXISTS "Anyone insert event" ON public.visitor_events;
CREATE POLICY "Anyone insert event" ON public.visitor_events FOR INSERT TO anon, authenticated
WITH CHECK (
  session_key IS NOT NULL AND length(session_key) BETWEEN 4 AND 120
  AND event_type IS NOT NULL AND length(event_type) BETWEEN 1 AND 60
);
