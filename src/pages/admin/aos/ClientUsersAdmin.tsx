import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ClientUsersAdmin() {
  const qc = useQueryClient();
  const [clientId, setClientId] = useState<string>("");
  const [userId, setUserId] = useState("");

  const { data: clients } = useQuery({
    queryKey: ["aos_clients_for_users"],
    queryFn: async () => (await supabase.from("aos_clients").select("id, full_name, company_name").order("full_name")).data ?? [],
  });

  const { data: links } = useQuery({
    queryKey: ["aos_client_users"],
    queryFn: async () => (await supabase.from("aos_client_users").select("*, client:aos_clients(full_name, company_name)").order("created_at", { ascending: false })).data ?? [],
  });

  const link = useMutation({
    mutationFn: async () => {
      if (!clientId || !userId) throw new Error("Pick a client and paste a user_id (from Auth users)");
      const { error } = await supabase.from("aos_client_users").insert({ client_id: clientId, user_id: userId, role: "client" });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Linked"); setUserId(""); qc.invalidateQueries({ queryKey: ["aos_client_users"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const unlink = useMutation({
    mutationFn: async (id: string) => { await supabase.from("aos_client_users").delete().eq("id", id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aos_client_users"] }),
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">AOS · Portal Access</h1>
      <p className="text-muted-foreground mb-6">Link a Supabase Auth user to a client so they can sign in and see only their portal.</p>
      <Card className="p-5 mb-6 space-y-3">
        <div><Label>Client</Label>
          <Select value={clientId} onValueChange={setClientId}>
            <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
            <SelectContent>{(clients ?? []).map((c: any) => <SelectItem key={c.id} value={c.id}>{c.company_name || c.full_name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Auth User ID (UUID)</Label>
          <Input placeholder="paste from /admin Auth Users panel or DB" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Tip: the client must first create an account at /auth, then paste their user.id here.</p>
        </div>
        <Button onClick={() => link.mutate()} disabled={link.isPending}>Grant Portal Access</Button>
      </Card>

      <h2 className="font-semibold mb-3">Linked Accounts</h2>
      <div className="space-y-2">
        {(links ?? []).map((l: any) => (
          <Card key={l.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{l.client?.company_name || l.client?.full_name}</div>
              <div className="text-xs text-muted-foreground font-mono">{l.user_id}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => unlink.mutate(l.id)}><Trash2 className="w-4 h-4" /></Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
