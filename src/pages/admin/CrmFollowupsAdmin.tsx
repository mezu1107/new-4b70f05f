import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Mail, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const colorFor = (p: string) => p === "high" ? "destructive" : p === "medium" ? "default" : "secondary";

const CrmFollowupsAdmin = () => {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["crm_followups"],
    queryFn: async () => (await supabase.from("crm_followups").select("*").order("created_at", { ascending: false })).data || [],
  });

  const close = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crm_followups").update({ status: "done" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["crm_followups"] }); toast.success("Marked done"); },
  });

  const open = (data || []).filter((f: any) => f.status === "open");
  const done = (data || []).filter((f: any) => f.status === "done");

  const Row = ({ f }: { f: any }) => (
    <Card className="p-4 mb-2">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold">{f.contact_name || "Unknown"}</span>
            <Badge variant={colorFor(f.priority) as any}>{f.priority}</Badge>
            <Badge variant="outline">{f.lead_source}</Badge>
          </div>
          <div className="text-xs text-muted-foreground flex flex-wrap gap-3 mb-2">
            {f.contact_email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{f.contact_email}</span>}
            {f.contact_phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{f.contact_phone}</span>}
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Due {new Date(f.due_at).toLocaleString()}</span>
          </div>
          {f.summary && <p className="text-sm">{f.summary}</p>}
        </div>
        {f.status === "open" && (
          <Button size="sm" variant="outline" onClick={() => close.mutate(f.id)}>
            <Check className="w-4 h-4 mr-1" /> Done
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">CRM Follow-ups</h1>
      <p className="text-muted-foreground mb-6">Auto-generated tasks from every lead. High priority = qualified hot leads.</p>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-5"><div className="text-sm text-muted-foreground mb-1">Open</div><div className="text-3xl font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" />{open.length}</div></Card>
        <Card className="p-5"><div className="text-sm text-muted-foreground mb-1">High priority</div><div className="text-3xl font-bold">{open.filter((f: any) => f.priority === "high").length}</div></Card>
        <Card className="p-5"><div className="text-sm text-muted-foreground mb-1">Completed</div><div className="text-3xl font-bold">{done.length}</div></Card>
      </div>

      <h2 className="font-bold text-lg mb-2">Open Follow-ups</h2>
      {open.length ? open.map((f: any) => <Row key={f.id} f={f} />) : <Card className="p-6 text-center text-muted-foreground">All caught up!</Card>}

      {done.length > 0 && (
        <>
          <h2 className="font-bold text-lg mb-2 mt-6">Completed</h2>
          {done.slice(0, 20).map((f: any) => <Row key={f.id} f={f} />)}
        </>
      )}
    </div>
  );
};
export default CrmFollowupsAdmin;
