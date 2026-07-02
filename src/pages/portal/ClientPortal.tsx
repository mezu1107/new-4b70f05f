import { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, CheckSquare, FolderLock, Activity, MessageSquare, LogOut, Send, FileText, Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ClientPortal() {
  const { clientId } = useParams<{ clientId: string }>();
  const { user, loading, signOut } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!clientId) return <Navigate to="/" replace />;

  return <PortalInner clientId={clientId} signOut={signOut} />;
}

function PortalInner({ clientId, signOut }: { clientId: string; signOut: () => Promise<void> }) {
  const { data: client, isLoading, error } = useQuery({
    queryKey: ["portal_client", clientId],
    queryFn: async () => {
      const { data, error } = await supabase.from("aos_clients").select("*").eq("id", clientId).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading portal…</div>;
  if (error || !client) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-4 text-center">
        <h1 className="text-2xl font-bold">Portal not accessible</h1>
        <p className="text-muted-foreground max-w-md">Your account isn't linked to this client. Contact your account manager.</p>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/"><ArrowLeft className="w-4 h-4 mr-1" />Home</Link></Button>
          <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-1" />Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-background border-b border-border sticky top-0 z-30">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {client.logo_url && <img src={client.logo_url} alt="" className="w-10 h-10 rounded-full object-cover" />}
            <div>
              <h1 className="font-bold text-lg leading-tight">{client.company_name || client.full_name}</h1>
              <p className="text-xs text-muted-foreground">Client Portal · {client.service_package || "Active"}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-1" />Sign out</Button>
        </div>
      </header>

      <main className="container py-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="overview"><Briefcase className="w-4 h-4 mr-2" />Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects & Tasks</TabsTrigger>
            <TabsTrigger value="approvals"><CheckSquare className="w-4 h-4 mr-2" />Approvals</TabsTrigger>
            <TabsTrigger value="vault"><FolderLock className="w-4 h-4 mr-2" />Files</TabsTrigger>
            <TabsTrigger value="activity"><Activity className="w-4 h-4 mr-2" />Activity</TabsTrigger>
            <TabsTrigger value="assistant"><MessageSquare className="w-4 h-4 mr-2" />AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><Overview client={client} clientId={clientId} /></TabsContent>
          <TabsContent value="projects"><ProjectsTab clientId={clientId} /></TabsContent>
          <TabsContent value="approvals"><ApprovalsTab clientId={clientId} /></TabsContent>
          <TabsContent value="vault"><VaultTab clientId={clientId} /></TabsContent>
          <TabsContent value="activity"><ActivityTab clientId={clientId} /></TabsContent>
          <TabsContent value="assistant"><AssistantTab clientId={clientId} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Overview({ client, clientId }: { client: any; clientId: string }) {
  const { data: stats } = useQuery({
    queryKey: ["portal_stats", clientId],
    queryFn: async () => {
      const [proj, tasks, appr, files] = await Promise.all([
        supabase.from("aos_projects").select("id, status", { count: "exact" }).eq("client_id", clientId),
        supabase.from("aos_tasks").select("id, status, project:aos_projects!inner(client_id)").eq("project.client_id", clientId),
        supabase.from("aos_approvals").select("id, status").eq("client_id", clientId).eq("status", "pending"),
        supabase.from("aos_vault_files").select("id", { count: "exact", head: true }).eq("client_id", clientId),
      ]);
      const taskRows = (tasks.data ?? []) as any[];
      return {
        projects: proj.count ?? 0,
        activeProjects: (proj.data ?? []).filter((p: any) => p.status === "active").length,
        openTasks: taskRows.filter((t) => t.status !== "done").length,
        pendingApprovals: (appr.data ?? []).length,
        files: files.count ?? 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Projects" value={stats?.activeProjects} sub={`of ${stats?.projects} total`} />
        <StatCard label="Open Tasks" value={stats?.openTasks} />
        <StatCard label="Pending Approvals" value={stats?.pendingApprovals} highlight={(stats?.pendingApprovals ?? 0) > 0} />
        <StatCard label="Files in Vault" value={stats?.files} />
      </div>
      <Card className="p-6">
        <h2 className="font-bold text-lg mb-3">Account</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <Field label="Account Manager" value={client.account_manager_id ? "Assigned" : "—"} />
          <Field label="Service Package" value={client.service_package} />
          <Field label="Monthly Retainer" value={client.monthly_retainer ? `$${Number(client.monthly_retainer).toLocaleString()}` : "—"} />
          <Field label="Contract" value={[client.contract_start, client.contract_end].filter(Boolean).join(" → ") || "—"} />
          <Field label="Industry" value={client.industry} />
          <Field label="Status" value={client.status} />
        </div>
      </Card>
    </div>
  );
}

const StatCard = ({ label, value, sub, highlight }: any) => (
  <Card className={`p-5 ${highlight ? "border-primary" : ""}`}>
    <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
    <p className="text-3xl font-bold mt-2">{value ?? "—"}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </Card>
);
const Field = ({ label, value }: any) => (
  <div><div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div><div className="font-medium">{value || "—"}</div></div>
);

function ProjectsTab({ clientId }: { clientId: string }) {
  const { data } = useQuery({
    queryKey: ["portal_projects", clientId],
    queryFn: async () => {
      const { data, error } = await supabase.from("aos_projects").select("*, tasks:aos_tasks(id, title, status, priority, due_date)").eq("client_id", clientId).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="space-y-4">
      {(data ?? []).map((p: any) => {
        const total = p.tasks?.length || 0;
        const done = (p.tasks ?? []).filter((t: any) => t.status === "done").length;
        return (
          <Card key={p.id} className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg">{p.name}</h3>
                {p.description && <p className="text-sm text-muted-foreground mt-1">{p.description}</p>}
              </div>
              <Badge>{p.status}</Badge>
            </div>
            <div className="mt-3 mb-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${total ? (done / total) * 100 : p.progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">{done}/{total} tasks complete</p>
            {!!p.tasks?.length && (
              <div className="mt-4 space-y-1">
                {p.tasks.slice(0, 5).map((t: any) => (
                  <div key={t.id} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                    <span className={t.status === "done" ? "line-through text-muted-foreground" : ""}>{t.title}</span>
                    <Badge variant="outline" className="text-[10px]">{t.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
      })}
      {!data?.length && <p className="text-center text-muted-foreground py-12">No projects yet.</p>}
    </div>
  );
}

function ApprovalsTab({ clientId }: { clientId: string }) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["portal_approvals", clientId],
    queryFn: async () => (await supabase.from("aos_approvals").select("*").eq("client_id", clientId).order("created_at", { ascending: false })).data ?? [],
  });

  const respond = useMutation({
    mutationFn: async ({ id, status, note }: any) => {
      const { error } = await supabase.from("aos_approvals").update({
        status, client_response: note || null, responded_by: user?.id, responded_at: new Date().toISOString(),
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Response recorded"); qc.invalidateQueries({ queryKey: ["portal_approvals", clientId] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-3">
      {(data ?? []).map((a: any) => (
        <Card key={a.id} className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold">{a.title}</h3>
              <Badge variant="outline" className="mt-1">{a.category}</Badge>
            </div>
            <Badge variant={a.status === "approved" ? "default" : a.status === "rejected" ? "destructive" : "secondary"}>{a.status}</Badge>
          </div>
          {a.description && <p className="text-sm text-muted-foreground mb-3">{a.description}</p>}
          {a.asset_url && <a href={a.asset_url} target="_blank" rel="noreferrer" className="text-sm text-primary underline">View asset →</a>}
          {a.status === "pending" && (
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => respond.mutate({ id: a.id, status: "approved" })}>Approve</Button>
              <Button size="sm" variant="outline" onClick={() => {
                const note = prompt("What changes do you want?");
                if (note) respond.mutate({ id: a.id, status: "changes_requested", note });
              }}>Request Changes</Button>
              <Button size="sm" variant="destructive" onClick={() => respond.mutate({ id: a.id, status: "rejected" })}>Reject</Button>
            </div>
          )}
          {a.client_response && <p className="text-sm mt-3 p-2 bg-muted rounded">Your note: {a.client_response}</p>}
        </Card>
      ))}
      {!data?.length && <p className="text-center text-muted-foreground py-12">No approvals pending.</p>}
    </div>
  );
}

function VaultTab({ clientId }: { clientId: string }) {
  const { data } = useQuery({
    queryKey: ["portal_files", clientId],
    queryFn: async () => (await supabase.from("aos_vault_files").select("*").eq("client_id", clientId).order("created_at", { ascending: false })).data ?? [],
  });

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {(data ?? []).map((f: any) => (
        <Card key={f.id} className="p-4 flex items-start gap-3">
          <FileText className="w-8 h-8 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{f.name}</p>
            <p className="text-xs text-muted-foreground">v{f.version} · {f.size_bytes ? `${(f.size_bytes / 1024).toFixed(1)} KB` : ""}</p>
            <a href={f.url} target="_blank" rel="noreferrer" className="text-xs text-primary inline-flex items-center gap-1 mt-1"><Download className="w-3 h-3" /> Download</a>
          </div>
        </Card>
      ))}
      {!data?.length && <p className="text-center text-muted-foreground py-12 col-span-full">No files shared yet.</p>}
    </div>
  );
}

function ActivityTab({ clientId }: { clientId: string }) {
  const { data } = useQuery({
    queryKey: ["portal_activity", clientId],
    queryFn: async () => (await supabase.from("aos_activity").select("*").eq("client_id", clientId).eq("is_client_visible", true).order("created_at", { ascending: false }).limit(100)).data ?? [],
    refetchInterval: 15000,
  });

  return (
    <Card className="p-4">
      <div className="space-y-3">
        {(data ?? []).map((a: any) => (
          <div key={a.id} className="flex gap-3 pb-3 border-b last:border-0">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
            <div className="flex-1">
              <p className="text-sm"><strong>{a.actor_name || "Team"}</strong> {a.summary}</p>
              <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
        {!data?.length && <p className="text-center text-muted-foreground py-8">No activity yet.</p>}
      </div>
    </Card>
  );
}

function AssistantTab({ clientId }: { clientId: string }) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const { data: messages } = useQuery({
    queryKey: ["portal_chat", clientId],
    queryFn: async () => (await supabase.from("aos_client_chat_messages").select("*").eq("client_id", clientId).order("created_at")).data ?? [],
  });

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput("");
    try {
      const { error: insErr } = await supabase.from("aos_client_chat_messages").insert({ client_id: clientId, user_id: user?.id, role: "user", content: text });
      if (insErr) throw insErr;
      qc.invalidateQueries({ queryKey: ["portal_chat", clientId] });

      const { data, error } = await supabase.functions.invoke("aos-client-ai", { body: { client_id: clientId, message: text } });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["portal_chat", clientId] });
    } catch (e: any) {
      toast.error(e.message || "AI failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="p-0 overflow-hidden flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {(messages ?? []).map((m: any) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {!messages?.length && <p className="text-center text-muted-foreground py-8 text-sm">Ask about your projects, tasks, approvals, or files.</p>}
          {sending && <div className="text-xs text-muted-foreground">AI is thinking…</div>}
        </div>
      </ScrollArea>
      <div className="border-t p-3 flex gap-2">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your account…" rows={2}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
        <Button onClick={send} disabled={sending || !input.trim()}><Send className="w-4 h-4" /></Button>
      </div>
    </Card>
  );
}
