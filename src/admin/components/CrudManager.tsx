import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "./ImageUploader";

export interface FieldDef {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "boolean" | "email" | "url" | "date" | "image" | "tags";
  required?: boolean;
  placeholder?: string;
}

interface Props {
  table: string;
  title: string;
  fields: FieldDef[];
  listColumns: string[];
  orderBy?: string;
  transform?: (payload: any) => any;
}

export const CrudManager = ({ table, title, fields, listColumns, orderBy = "created_at", transform }: Props) => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const { data, isLoading } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table as any).select("*").order(orderBy, { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      let payload: any = { ...form };
      for (const f of fields) {
        if (f.type === "number" && payload[f.key] !== undefined && payload[f.key] !== "") payload[f.key] = Number(payload[f.key]);
        if (f.type === "tags") {
          const v = payload[f.key];
          if (typeof v === "string") payload[f.key] = v.split(",").map((s: string) => s.trim()).filter(Boolean);
          else if (!Array.isArray(v)) payload[f.key] = [];
        }
      }
      if (transform) payload = transform(payload);
      if (editing) {
        const { error } = await supabase.from(table as any).update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table as any).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [table] }); toast.success("Saved"); setOpen(false); setEditing(null); setForm({}); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [table] }); toast.success("Deleted"); },
    onError: (e: any) => toast.error(e.message),
  });

  const openNew = () => { setEditing(null); setForm({}); setOpen(true); };
  const openEdit = (r: any) => { setEditing(r); setForm(r); setOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button variant="hero" onClick={openNew}><Plus className="w-4 h-4 mr-1" /> New</Button></DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Create"} {title}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              {fields.map((f) => (
                <div key={f.key}>
                  <Label>{f.label}{f.required && " *"}</Label>
                  {f.type === "textarea" ? (
                    <Textarea value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} />
                  ) : f.type === "boolean" ? (
                    <div className="pt-2"><Switch checked={!!form[f.key]} onCheckedChange={(v) => setForm({ ...form, [f.key]: v })} /></div>
                  ) : f.type === "image" ? (
                    <ImageUploader value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} folder={table} />
                  ) : f.type === "tags" ? (
                    <Input value={Array.isArray(form[f.key]) ? form[f.key].join(", ") : (form[f.key] ?? "")}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder || "tag1, tag2, tag3"} />
                  ) : (
                    <Input type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type ?? "text"}
                      value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} />
                  )}
                </div>
              ))}
            </div>
            <DialogFooter><Button onClick={() => save.mutate()} disabled={save.isPending}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50"><tr>
            {listColumns.map((c) => <th key={c} className="text-left p-3 font-semibold">{c}</th>)}
            <th className="p-3 w-32" />
          </tr></thead>
          <tbody>
            {isLoading ? <tr><td className="p-4" colSpan={listColumns.length + 1}>Loading…</td></tr>
              : !data?.length ? <tr><td className="p-4 text-muted-foreground" colSpan={listColumns.length + 1}>No records yet.</td></tr>
              : data.map((r: any) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                  {listColumns.map((c) => <td key={c} className="p-3 max-w-xs truncate">{String(r[c] ?? "")}</td>)}
                  <td className="p-3 text-right space-x-1">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => { if (confirm("Delete?")) del.mutate(r.id); }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
