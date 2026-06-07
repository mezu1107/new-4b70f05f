
-- Add 'client' to the role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'client';

-- ============ CLIENTS ============
CREATE TABLE public.aos_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company_name text,
  industry text,
  website text,
  email text,
  phone text,
  country text,
  state text,
  city text,
  address text,
  timezone text,
  language text DEFAULT 'en',
  service_package text,
  monthly_retainer numeric(12,2),
  contract_start date,
  contract_end date,
  account_manager_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_team uuid[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'lead' CHECK (status IN ('lead','prospect','active','paused','completed','cancelled')),
  logo_url text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.aos_client_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.aos_clients(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('client','client_team_member')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (client_id, user_id)
);

CREATE INDEX idx_aos_client_users_user ON public.aos_client_users(user_id);
CREATE INDEX idx_aos_client_users_client ON public.aos_client_users(client_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.aos_clients TO authenticated;
GRANT ALL ON public.aos_clients TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.aos_client_users TO authenticated;
GRANT ALL ON public.aos_client_users TO service_role;

ALTER TABLE public.aos_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aos_client_users ENABLE ROW LEVEL SECURITY;

-- helper: does the current user belong to the client?
CREATE OR REPLACE FUNCTION public.has_client_access(_user_id uuid, _client_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.aos_client_users WHERE user_id = _user_id AND client_id = _client_id)
$$;

CREATE POLICY "admin all clients" ON public.aos_clients FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read own" ON public.aos_clients FOR SELECT TO authenticated
  USING (public.has_client_access(auth.uid(), id));

CREATE POLICY "admin all client_users" ON public.aos_client_users FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "user read own membership" ON public.aos_client_users FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ============ PROJECTS / MILESTONES / TASKS ============
CREATE TABLE public.aos_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.aos_clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning','active','on_hold','completed','cancelled')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  start_date date,
  end_date date,
  budget numeric(12,2),
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  progress integer NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  color text DEFAULT '#3b82f6',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.aos_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.aos_projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  due_date date,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed')),
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.aos_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.aos_projects(id) ON DELETE CASCADE,
  milestone_id uuid REFERENCES public.aos_milestones(id) ON DELETE SET NULL,
  parent_task_id uuid REFERENCES public.aos_tasks(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in_progress','review','done','blocked')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  assignee_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reporter_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  due_date timestamptz,
  estimate_hours numeric(6,2),
  position integer NOT NULL DEFAULT 0,
  checklist jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_aos_tasks_project ON public.aos_tasks(project_id);
CREATE INDEX idx_aos_tasks_assignee ON public.aos_tasks(assignee_id);
CREATE INDEX idx_aos_tasks_status ON public.aos_tasks(status);

CREATE TABLE public.aos_task_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.aos_tasks(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.aos_time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.aos_tasks(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  minutes integer NOT NULL CHECK (minutes > 0),
  note text,
  logged_on date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.aos_projects, public.aos_milestones, public.aos_tasks, public.aos_task_comments, public.aos_time_entries TO authenticated;
GRANT ALL ON public.aos_projects, public.aos_milestones, public.aos_tasks, public.aos_task_comments, public.aos_time_entries TO service_role;

ALTER TABLE public.aos_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aos_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aos_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aos_task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aos_time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin all projects" ON public.aos_projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read projects" ON public.aos_projects FOR SELECT TO authenticated
  USING (public.has_client_access(auth.uid(), client_id));

CREATE POLICY "admin all milestones" ON public.aos_milestones FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read milestones" ON public.aos_milestones FOR SELECT TO authenticated
  USING (EXISTS(SELECT 1 FROM public.aos_projects p WHERE p.id = project_id AND public.has_client_access(auth.uid(), p.client_id)));

CREATE POLICY "admin all tasks" ON public.aos_tasks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read tasks" ON public.aos_tasks FOR SELECT TO authenticated
  USING (EXISTS(SELECT 1 FROM public.aos_projects p WHERE p.id = project_id AND public.has_client_access(auth.uid(), p.client_id)));

CREATE POLICY "admin all comments" ON public.aos_task_comments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read+write own comments" ON public.aos_task_comments FOR SELECT TO authenticated
  USING (EXISTS(SELECT 1 FROM public.aos_tasks t JOIN public.aos_projects p ON p.id=t.project_id WHERE t.id = task_id AND public.has_client_access(auth.uid(), p.client_id)));
CREATE POLICY "client insert comments" ON public.aos_task_comments FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid() AND EXISTS(SELECT 1 FROM public.aos_tasks t JOIN public.aos_projects p ON p.id=t.project_id WHERE t.id = task_id AND public.has_client_access(auth.uid(), p.client_id)));

CREATE POLICY "admin all time" ON public.aos_time_entries FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "user own time" ON public.aos_time_entries FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ============ APPROVALS ============
CREATE TABLE public.aos_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.aos_clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.aos_projects(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'design' CHECK (category IN ('ad','creative','landing_page','content','video','design','marketing_plan','other')),
  asset_url text,
  asset_type text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','changes_requested')),
  client_response text,
  responded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  responded_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  due_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.aos_approvals TO authenticated;
GRANT ALL ON public.aos_approvals TO service_role;
ALTER TABLE public.aos_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin all approvals" ON public.aos_approvals FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read approvals" ON public.aos_approvals FOR SELECT TO authenticated
  USING (public.has_client_access(auth.uid(), client_id));
CREATE POLICY "client respond approvals" ON public.aos_approvals FOR UPDATE TO authenticated
  USING (public.has_client_access(auth.uid(), client_id))
  WITH CHECK (public.has_client_access(auth.uid(), client_id));

-- ============ FILE VAULT ============
CREATE TABLE public.aos_vault_folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.aos_clients(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.aos_vault_folders(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.aos_vault_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.aos_clients(id) ON DELETE CASCADE,
  folder_id uuid REFERENCES public.aos_vault_folders(id) ON DELETE SET NULL,
  parent_file_id uuid REFERENCES public.aos_vault_files(id) ON DELETE SET NULL,
  version integer NOT NULL DEFAULT 1,
  name text NOT NULL,
  url text NOT NULL,
  mime_type text,
  size_bytes bigint,
  tags text[] DEFAULT '{}',
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  download_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.aos_vault_folders, public.aos_vault_files TO authenticated;
GRANT ALL ON public.aos_vault_folders, public.aos_vault_files TO service_role;
ALTER TABLE public.aos_vault_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aos_vault_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin all folders" ON public.aos_vault_folders FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read folders" ON public.aos_vault_folders FOR SELECT TO authenticated
  USING (public.has_client_access(auth.uid(), client_id));

CREATE POLICY "admin all files" ON public.aos_vault_files FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read files" ON public.aos_vault_files FOR SELECT TO authenticated
  USING (public.has_client_access(auth.uid(), client_id));

-- ============ ACTIVITY FEED ============
CREATE TABLE public.aos_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.aos_clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.aos_projects(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_name text,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  summary text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  is_client_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_aos_activity_client ON public.aos_activity(client_id, created_at DESC);
CREATE INDEX idx_aos_activity_project ON public.aos_activity(project_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.aos_activity TO authenticated;
GRANT ALL ON public.aos_activity TO service_role;
ALTER TABLE public.aos_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin all activity" ON public.aos_activity FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read activity" ON public.aos_activity FOR SELECT TO authenticated
  USING (is_client_visible AND client_id IS NOT NULL AND public.has_client_access(auth.uid(), client_id));

-- ============ CLIENT AI CHAT ============
CREATE TABLE public.aos_client_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.aos_clients(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  role text NOT NULL CHECK (role IN ('user','assistant','system')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_aos_chat_client ON public.aos_client_chat_messages(client_id, created_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.aos_client_chat_messages TO authenticated;
GRANT ALL ON public.aos_client_chat_messages TO service_role;
ALTER TABLE public.aos_client_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin all chat" ON public.aos_client_chat_messages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client read chat" ON public.aos_client_chat_messages FOR SELECT TO authenticated
  USING (public.has_client_access(auth.uid(), client_id));
CREATE POLICY "client write chat" ON public.aos_client_chat_messages FOR INSERT TO authenticated
  WITH CHECK (public.has_client_access(auth.uid(), client_id) AND user_id = auth.uid() AND role = 'user');

-- ============ updated_at triggers ============
CREATE TRIGGER trg_aos_clients_updated BEFORE UPDATE ON public.aos_clients FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_aos_projects_updated BEFORE UPDATE ON public.aos_projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_aos_milestones_updated BEFORE UPDATE ON public.aos_milestones FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_aos_tasks_updated BEFORE UPDATE ON public.aos_tasks FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_aos_approvals_updated BEFORE UPDATE ON public.aos_approvals FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ Realtime ============
ALTER PUBLICATION supabase_realtime ADD TABLE public.aos_tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.aos_activity;
ALTER PUBLICATION supabase_realtime ADD TABLE public.aos_client_chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.aos_approvals;
