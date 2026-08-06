import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Leads = () => {
  const { data: contact } = useQuery({ queryKey: ["contact_leads_admin"], queryFn: async () => {
    const { data } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false }); return data ?? [];
  }});
  const { data: chat } = useQuery({ queryKey: ["chatbot_leads_admin"], queryFn: async () => {
    const { data } = await supabase.from("chatbot_leads").select("*").order("created_at", { ascending: false }); return data ?? [];
  }});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Contact Form Leads</h1>
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Phone</th><th className="text-left p-3">Message</th><th className="text-left p-3">When</th></tr></thead>
            <tbody>
              {contact?.map((l) => <tr key={l.id} className="border-t"><td className="p-3 font-medium">{l.name}</td><td className="p-3">{l.email}</td><td className="p-3">{l.phone}</td><td className="p-3 max-w-md truncate">{l.message}</td><td className="p-3 text-muted-foreground">{new Date(l.created_at).toLocaleString()}</td></tr>)}
              {!contact?.length && <tr><td colSpan={5} className="p-4 text-muted-foreground">No leads yet.</td></tr>}
            </tbody>
          </table>
        </Card>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">AI Chatbot Leads</h1>
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr><th className="text-left p-3">Name</th><th className="text-left p-3">Contact</th><th className="text-left p-3">Service</th><th className="text-left p-3">Budget</th><th className="text-left p-3">Score</th><th className="text-left p-3">Status</th><th className="text-left p-3">When</th></tr></thead>
            <tbody>
              {chat?.map((l) => <tr key={l.id} className="border-t">
                <td className="p-3 font-medium">{l.name || "—"}</td>
                <td className="p-3">{l.email || l.phone || "—"}</td>
                <td className="p-3">{l.service_interest}</td>
                <td className="p-3">{l.budget}</td>
                <td className="p-3">{l.qualification_score}</td>
                <td className="p-3">{l.qualified ? <Badge>Qualified</Badge> : <Badge variant="secondary">Unqualified</Badge>}</td>
                <td className="p-3 text-muted-foreground">{new Date(l.created_at).toLocaleString()}</td>
              </tr>)}
              {!chat?.length && <tr><td colSpan={7} className="p-4 text-muted-foreground">No chats yet.</td></tr>}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
export default Leads;
