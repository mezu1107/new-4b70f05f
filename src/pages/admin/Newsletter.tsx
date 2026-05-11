import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const Newsletter = () => {
  const { data } = useQuery({ queryKey: ["newsletter_admin"], queryFn: async () => {
    const { data } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }); return data ?? [];
  }});
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Newsletter Subscribers ({data?.length ?? 0})</h1>
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50"><tr><th className="text-left p-3">Email</th><th className="text-left p-3">Subscribed</th></tr></thead>
          <tbody>
            {data?.map((s) => <tr key={s.id} className="border-t"><td className="p-3">{s.email}</td><td className="p-3 text-muted-foreground">{new Date(s.created_at).toLocaleString()}</td></tr>)}
            {!data?.length && <tr><td colSpan={2} className="p-4 text-muted-foreground">No subscribers yet.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
export default Newsletter;
