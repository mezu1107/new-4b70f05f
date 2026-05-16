import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generateDocPDF } from "@/lib/pdfGenerator";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface LineItem { description: string; quantity: number; unit_price: number; }

interface Props {
  table: "invoices" | "proposals";
  title: string;
  numberPrefix: string;
  numberField: "invoice_number" | "proposal_number";
  statuses: string[];
}

export const FinancialDocs = ({ table, title, numberPrefix, numberField, statuses }: Props) => {
  const qc = useQueryClient();
  const { data: settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [items, setItems] = useState<LineItem[]>([]);

  const { data, isLoading } = useQuery({ queryKey: [table], queryFn: async () => {
    const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false }); return data ?? [];
  }});

  const subtotal = items.reduce((s, it) => s + (Number(it.quantity) || 0) * (Number(it.unit_price) || 0), 0);
  const taxRate = Number(form.tax_rate || 0);
  const taxAmount = table === "invoices" ? +(subtotal * taxRate / 100).toFixed(2) : 0;
  const total = +(subtotal + taxAmount).toFixed(2);

  const reset = () => { setEditing(null); setForm({ status: "draft", currency: "PKR", tax_rate: 0 }); setItems([]); };

  const openNew = async () => {
    reset();
    const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
    const num = `${numberPrefix}-${String((count ?? 0) + 1).padStart(4, "0")}`;
    setForm((f: any) => ({ ...f, [numberField]: num, issue_date: new Date().toISOString().slice(0, 10) }));
    setOpen(true);
  };

  const openEdit = (r: any) => { setEditing(r); setForm(r); setItems(r.line_items || []); setOpen(true); };

  const save = useMutation({
    mutationFn: async () => {
      const payload: any = { ...form, line_items: items, subtotal, total };
      if (table === "invoices") { payload.tax_amount = taxAmount; payload.tax_rate = taxRate; }
      delete payload.created_at; delete payload.updated_at;
      if (editing) {
        const { error } = await supabase.from(table).update(payload).eq("id", editing.id); if (error) throw error;
      } else {
        const { data: u } = await supabase.auth.getUser();
        payload.created_by = u.user?.id;
        const { error } = await supabase.from(table).insert(payload); if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [table] }); toast.success("Saved"); setOpen(false); reset(); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({ mutationFn: async (id: string) => { const { error } = await supabase.from(table).delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [table] }); toast.success("Deleted"); }});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button variant="hero" onClick={openNew}><Plus className="w-4 h-4 mr-1" /> New</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Create"} {title.slice(0, -1)}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Number</Label><Input value={form[numberField] ?? ""} onChange={(e) => setForm({ ...form, [numberField]: e.target.value })} /></div>
                <div><Label>Status</Label>
                  <Select value={form.status ?? "draft"} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              {table === "proposals" && <div><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>}
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Client Name</Label><Input value={form.client_name ?? ""} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></div>
                <div><Label>Client Email</Label><Input type="email" value={form.client_email ?? ""} onChange={(e) => setForm({ ...form, client_email: e.target.value })} /></div>
              </div>
              {table === "invoices" && <>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Issue Date</Label><Input type="date" value={form.issue_date ?? ""} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} /></div>
                  <div><Label>Due Date</Label><Input type="date" value={form.due_date ?? ""} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
                </div>
                <div><Label>Client Address</Label><Textarea value={form.client_address ?? ""} onChange={(e) => setForm({ ...form, client_address: e.target.value })} /></div>
              </>}
              {table === "proposals" && <>
                <div><Label>Scope</Label><Textarea value={form.scope ?? ""} onChange={(e) => setForm({ ...form, scope: e.target.value })} /></div>
                <div><Label>Valid Until</Label><Input type="date" value={form.valid_until ?? ""} onChange={(e) => setForm({ ...form, valid_until: e.target.value })} /></div>
              </>}

              <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-2"><Label>Line Items</Label>
                  <Button size="sm" variant="outline" onClick={() => setItems([...items, { description: "", quantity: 1, unit_price: 0 }])}><Plus className="w-3 h-3 mr-1" />Add</Button>
                </div>
                {items.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 mb-2">
                    <Input className="col-span-6" placeholder="Description" value={it.description} onChange={(e) => { const c = [...items]; c[idx].description = e.target.value; setItems(c); }} />
                    <Input className="col-span-2" type="number" placeholder="Qty" value={it.quantity} onChange={(e) => { const c = [...items]; c[idx].quantity = +e.target.value; setItems(c); }} />
                    <Input className="col-span-3" type="number" placeholder="Unit price" value={it.unit_price} onChange={(e) => { const c = [...items]; c[idx].unit_price = +e.target.value; setItems(c); }} />
                    <Button className="col-span-1" size="sm" variant="ghost" onClick={() => setItems(items.filter((_, i) => i !== idx))}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 border-t pt-3">
                <div><Label>Currency</Label><Input value={form.currency ?? "PKR"} onChange={(e) => setForm({ ...form, currency: e.target.value })} /></div>
                {table === "invoices" && <div><Label>Tax Rate %</Label><Input type="number" value={form.tax_rate ?? 0} onChange={(e) => setForm({ ...form, tax_rate: +e.target.value })} /></div>}
              </div>
              <div className="bg-muted/50 p-3 rounded text-sm space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>{form.currency || "PKR"} {subtotal.toFixed(2)}</span></div>
                {table === "invoices" && <div className="flex justify-between"><span>Tax ({taxRate}%)</span><span>{form.currency || "PKR"} {taxAmount.toFixed(2)}</span></div>}
                <div className="flex justify-between font-bold border-t pt-1"><span>Total</span><span>{form.currency || "PKR"} {total.toFixed(2)}</span></div>
              </div>
              <div><Label>Notes</Label><Textarea value={form.notes ?? ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
            </div>
            <DialogFooter><Button onClick={() => save.mutate()} disabled={save.isPending}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50"><tr>
            <th className="text-left p-3">Number</th><th className="text-left p-3">Client</th>
            {table === "proposals" && <th className="text-left p-3">Title</th>}
            <th className="text-left p-3">Total</th><th className="text-left p-3">Status</th><th className="p-3 w-32" />
          </tr></thead>
          <tbody>
            {isLoading ? <tr><td colSpan={6} className="p-4">Loading…</td></tr>
              : !data?.length ? <tr><td colSpan={6} className="p-4 text-muted-foreground">None yet.</td></tr>
              : data.map((r: any) => (
                <tr key={r.id} className="border-t hover:bg-muted/30">
                  <td className="p-3 font-mono">{r[numberField]}</td>
                  <td className="p-3">{r.client_name}</td>
                  {table === "proposals" && <td className="p-3">{r.title}</td>}
                  <td className="p-3">{r.currency} {Number(r.total).toFixed(2)}</td>
                  <td className="p-3"><Badge variant={r.status === "paid" || r.status === "accepted" ? "default" : "secondary"}>{r.status}</Badge></td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <Button size="sm" variant="ghost" title="Download PDF" onClick={() => generateDocPDF({
                      numberLabel: table === "invoices" ? "Invoice" : "Proposal",
                      number: r[numberField], client_name: r.client_name, client_email: r.client_email,
                      client_address: r.client_address, issue_date: r.issue_date, due_date: r.due_date,
                      valid_until: r.valid_until, title: r.title, scope: r.scope, notes: r.notes,
                      currency: r.currency, subtotal: Number(r.subtotal), tax_rate: Number(r.tax_rate || 0),
                      tax_amount: Number(r.tax_amount || 0), total: Number(r.total),
                      line_items: r.line_items || [], status: r.status,
                    }, {
                      name: settings?.site_name || "AM Enterprises",
                      email: settings?.contact_email || "info@amenterprises.tech",
                      phone: settings?.contact_phone || "0317-3712950",
                      address: settings?.address || "Islamabad, Pakistan",
                      logoUrl: settings?.logo_url || undefined,
                    })}><Download className="w-4 h-4" /></Button>
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
