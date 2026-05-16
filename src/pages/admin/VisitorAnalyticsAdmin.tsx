import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, Eye, MousePointerClick, Smartphone, Monitor, Globe } from "lucide-react";

const VisitorAnalyticsAdmin = () => {
  const { data: sessions } = useQuery({
    queryKey: ["va_sessions"],
    queryFn: async () => (await supabase.from("visitor_sessions").select("*").order("started_at", { ascending: false }).limit(500)).data || [],
  });
  const { data: events } = useQuery({
    queryKey: ["va_events"],
    queryFn: async () => (await supabase.from("visitor_events").select("*").order("created_at", { ascending: false }).limit(1000)).data || [],
  });

  const total = sessions?.length || 0;
  const pageviews = events?.filter((e) => e.event_type === "pageview").length || 0;
  const clicks = events?.filter((e) => e.event_type === "click").length || 0;
  const mobile = sessions?.filter((s) => s.device_type === "mobile").length || 0;

  // top pages
  const pageMap = new Map<string, number>();
  events?.forEach((e) => {
    if (e.event_type === "pageview" && e.path) pageMap.set(e.path, (pageMap.get(e.path) || 0) + 1);
  });
  const topPages = [...pageMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  // top clicks
  const clickMap = new Map<string, number>();
  events?.forEach((e) => {
    if (e.event_type === "click" && e.element_label) clickMap.set(e.element_label, (clickMap.get(e.element_label) || 0) + 1);
  });
  const topClicks = [...clickMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  const stat = (label: string, value: number | string, Icon: any) => (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Visitor Analytics</h1>
      <p className="text-muted-foreground mb-6">Built-in tracking — every visitor, page view, and click stored in your own database.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stat("Total Sessions", total, Users)}
        {stat("Page Views", pageviews, Eye)}
        {stat("Total Clicks", clicks, MousePointerClick)}
        {stat("Mobile %", total ? `${Math.round((mobile / total) * 100)}%` : "0%", Smartphone)}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card className="p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2"><Globe className="w-4 h-4" /> Top Pages</h3>
          {topPages.length ? topPages.map(([path, n]) => (
            <div key={path} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-sm truncate">{path}</span>
              <span className="text-sm font-semibold">{n}</span>
            </div>
          )) : <div className="text-sm text-muted-foreground">No data yet</div>}
        </Card>
        <Card className="p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2"><MousePointerClick className="w-4 h-4" /> Top Clicked Elements</h3>
          {topClicks.length ? topClicks.map(([label, n]) => (
            <div key={label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-sm truncate max-w-[70%]">{label}</span>
              <span className="text-sm font-semibold">{n}</span>
            </div>
          )) : <div className="text-sm text-muted-foreground">No data yet</div>}
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-bold mb-3">Recent Sessions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr>
              <th className="text-left p-2">Time</th>
              <th className="text-left p-2">Device</th>
              <th className="text-left p-2">Browser</th>
              <th className="text-left p-2">Landing</th>
              <th className="text-left p-2">Referrer</th>
              <th className="text-left p-2">Pages</th>
            </tr></thead>
            <tbody>
              {sessions?.slice(0, 30).map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="p-2">{new Date(s.started_at).toLocaleString()}</td>
                  <td className="p-2"><span className="inline-flex items-center gap-1">{s.device_type === "mobile" ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}{s.device_type}</span></td>
                  <td className="p-2">{s.browser}</td>
                  <td className="p-2 truncate max-w-[180px]">{s.landing_path}</td>
                  <td className="p-2 truncate max-w-[180px]">{s.referrer || "Direct"}</td>
                  <td className="p-2">{s.page_views}</td>
                </tr>
              ))}
              {!sessions?.length && <tr><td colSpan={6} className="p-4 text-center text-muted-foreground">No sessions yet</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default VisitorAnalyticsAdmin;
