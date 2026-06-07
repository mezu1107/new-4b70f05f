import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, ArrowLeft, Calendar } from "lucide-react";
import { toast } from "sonner";

const TASK_STATUSES = ["todo", "in_progress", "review", "done", "blocked"] as const;
const PROJ_STATUSES = ["planning", "active", "on_hold", "completed", "cancelled"];

export default function AOSProjectsAdmin() {
  const [selected, setSelected] = useState<string | null>(null);
  return selected ? <ProjectBoard projectId={selected} onBack={() => setSelected(null)} /> : <ProjectsList onOpen={setSelected} />;
}

function ProjectsList({ onOpen }: { onOpen: (id: string) => void }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({ name: "", status: "planning", priority: "medium" });

  const { data: projects } = useQuery({
    queryKey: ["aos_projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("aos_projects").select("*, client:aos_clients(full_name, company_name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  const { data: clients } = useQuery({
    queryKey: ["aos_clients_list"],
    queryFn: async () => (await supabase.from("aos_clients").select("id, full_name, company_name").order("full_name")).data ?? [],
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!form.client_id || !form.name) throw new Error("Client and name are required");
      const { error } = await supabase.from("aos_projects").insert(form);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Project created"); setOpen(false); setForm({ name: "", status: "planning", priority: "medium" }); qc.invalidateQueries({ queryKey: ["aos_projects"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">AOS · Projects</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Project</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Project</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Client *</Label>
                <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                  <SelectContent>{(clients ?? []).map((c: any) => <SelectItem key={c.id} value={c.id}>{c.company_name || c.full_name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{PROJ_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Priority</Label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{["low", "medium", "high", "urgent"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Start</Label><Input type="date" value={form.start_date || ""} onChange={(e) => setForm({ ...form, start_date: e.target.value || null })} /></div>
                <div><Label>End</Label><Input type="date" value={form.end_date || ""} onChange={(e) => setForm({ ...form, end_date: e.target.value || null })} /></div>
                <div><Label>Budget (USD)</Label><Input type="number" value={form.budget || ""} onChange={(e) => setForm({ ...form, budget: e.target.value ? Number(e.target.value) : null })} /></div>
              </div>
            </div>
            <DialogFooter><Button onClick={() => create.mutate()} disabled={create.isPending}>Create</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(projects ?? []).map((p) => (
          <Card key={p.id} className="p-5 hover:shadow-elegant transition-smooth cursor-pointer" onClick={() => onOpen(p.id)}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <Badge variant="secondary">{p.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{p.client?.company_name || p.client?.full_name}</p>
            {p.description && <p className="text-sm line-clamp-2 mb-3">{p.description}</p>}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant="outline">{p.priority}</Badge>
              {p.end_date && <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.end_date}</span>}
              <span>{p.progress}%</span>
            </div>
          </Card>
        ))}
        {!projects?.length && <p className="text-muted-foreground col-span-full text-center py-12">No projects yet. Create your first one.</p>}
      </div>
    </div>
  );
}

function ProjectBoard({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [taskForm, setTaskForm] = useState<any>({ title: "", status: "todo", priority: "medium" });

  const { data: project } = useQuery({
    queryKey: ["aos_project", projectId],
    queryFn: async () => (await supabase.from("aos_projects").select("*, client:aos_clients(full_name, company_name)").eq("id", projectId).maybeSingle()).data,
  });

  const { data: tasks } = useQuery({
    queryKey: ["aos_tasks", projectId],
    queryFn: async () => {
      const { data, error } = await supabase.from("aos_tasks").select("*").eq("project_id", projectId).order("position");
      if (error) throw error;
      return data ?? [];
    },
  });

  const createTask = useMutation({
    mutationFn: async () => {
      if (!taskForm.title) throw new Error("Title required");
      const { error } = await supabase.from("aos_tasks").insert({ ...taskForm, project_id: projectId });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Task created"); setOpen(false); setTaskForm({ title: "", status: "todo", priority: "medium" }); qc.invalidateQueries({ queryKey: ["aos_tasks", projectId] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const moveTask = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("aos_tasks").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aos_tasks", projectId] }),
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => { await supabase.from("aos_tasks").delete().eq("id", id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aos_tasks", projectId] }),
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-1" />Back</Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{project?.name}</h1>
          <p className="text-sm text-muted-foreground">{project?.client?.company_name || project?.client?.full_name}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Task</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Title *</Label><Input value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={taskForm.description || ""} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Status</Label>
                  <Select value={taskForm.status} onValueChange={(v) => setTaskForm({ ...taskForm, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{TASK_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Priority</Label>
                  <Select value={taskForm.priority} onValueChange={(v) => setTaskForm({ ...taskForm, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{["low", "medium", "high", "urgent"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Due Date</Label><Input type="datetime-local" value={taskForm.due_date || ""} onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value || null })} /></div>
                <div><Label>Estimate (h)</Label><Input type="number" step="0.25" value={taskForm.estimate_hours || ""} onChange={(e) => setTaskForm({ ...taskForm, estimate_hours: e.target.value ? Number(e.target.value) : null })} /></div>
              </div>
            </div>
            <DialogFooter><Button onClick={() => createTask.mutate()} disabled={createTask.isPending}>Create</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {TASK_STATUSES.map((status) => (
          <div key={status} className="bg-muted/40 rounded-lg p-3 min-h-[400px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { const id = e.dataTransfer.getData("id"); if (id) moveTask.mutate({ id, status }); }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide">{status.replace("_", " ")}</h3>
              <Badge variant="outline">{(tasks ?? []).filter((t: any) => t.status === status).length}</Badge>
            </div>
            <div className="space-y-2">
              {(tasks ?? []).filter((t: any) => t.status === status).map((t: any) => (
                <Card key={t.id} draggable onDragStart={(e) => e.dataTransfer.setData("id", t.id)} className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-smooth">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm flex-1">{t.title}</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1" onClick={() => deleteTask.mutate(t.id)}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                  {t.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={t.priority === "urgent" ? "destructive" : "outline"} className="text-[10px] py-0">{t.priority}</Badge>
                    {t.due_date && <span className="text-[10px] text-muted-foreground">{new Date(t.due_date).toLocaleDateString()}</span>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
