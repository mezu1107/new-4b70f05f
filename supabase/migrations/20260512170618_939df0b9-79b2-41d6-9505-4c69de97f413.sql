
CREATE TABLE IF NOT EXISTS public.crm_followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID,
  lead_source TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  summary TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  due_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 day'),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.crm_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manage followups"
  ON public.crm_followups FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER crm_followups_touch
BEFORE UPDATE ON public.crm_followups
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.fn_create_followup_from_chatlead()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.crm_followups (lead_id, lead_source, contact_name, contact_email, contact_phone, summary, priority)
  VALUES (
    NEW.id, 'chatbot',
    NEW.name, NEW.email, NEW.phone,
    COALESCE(NEW.service_interest, '') || CASE WHEN NEW.budget IS NOT NULL THEN ' · ' || NEW.budget ELSE '' END,
    CASE WHEN COALESCE(NEW.qualification_score, 0) >= 70 THEN 'high'
         WHEN COALESCE(NEW.qualification_score, 0) >= 40 THEN 'medium'
         ELSE 'low' END
  );
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS chatlead_followup ON public.chatbot_leads;
CREATE TRIGGER chatlead_followup
AFTER INSERT ON public.chatbot_leads
FOR EACH ROW EXECUTE FUNCTION public.fn_create_followup_from_chatlead();

CREATE OR REPLACE FUNCTION public.fn_create_followup_from_contactlead()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.crm_followups (lead_id, lead_source, contact_name, contact_email, contact_phone, summary, priority)
  VALUES (NEW.id, COALESCE(NEW.source, 'contact_form'), NEW.name, NEW.email, NEW.phone, LEFT(COALESCE(NEW.message, ''), 240), 'medium');
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS contactlead_followup ON public.contact_leads;
CREATE TRIGGER contactlead_followup
AFTER INSERT ON public.contact_leads
FOR EACH ROW EXECUTE FUNCTION public.fn_create_followup_from_contactlead();
