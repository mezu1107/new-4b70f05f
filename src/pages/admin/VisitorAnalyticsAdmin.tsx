import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, MousePointerClick, Smartphone, Monitor, Globe, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PLATFORMS = [
  { key: "meta_pixel_id", label: "Meta Pixel", dashUrl: "https://business.facebook.com/events_manager2", color: "bg-blue-600", help: "Track Facebook & Instagram ad conversions, audience insights, and retargeting in Meta Events Manager." },
  { key: "google_analytics_id", label: "Google Analytics 4", dashUrl: "https://analytics.google.com", color: "bg-orange-500", help: "Real-time user reports, conversion goals, audience demographics — view in GA4 dashboard." },
  { key: "google_tag_manager_id", label: "Google Tag Manager", dashUrl: "https://tagmanager.google.com", color: "bg-blue-500", help: "Manage all tracking tags, triggers, and variables from one container — preview & publish in GTM." },
  { key: "tiktok_pixel_id", label: "TikTok Pixel", dashUrl: "https://ads.tiktok.com/i18n/events_manager", color: "bg-black", help: "TikTok ad performance, conversion tracking, and audience building in TikTok Events Manager." },
  { key: "linkedin_insight_id", label: "LinkedIn Insight", dashUrl: "https://www.linkedin.com/campaignmanager/", color: "bg-blue-700", help: "B2B conversion tracking and audience insights in LinkedIn Campaign Manager." },
];

const VisitorAnalyticsAdmin = () => {
  const [tab, setTab] = useState("overview");
  const { data: settings } = useQuery({
    queryKey: ["site_settings_admin_analytics"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).maybeSingle()).data,
  });
  const { data: sessions } = useQuery({
    queryKey: ["va_sessions"],
    queryFn: async () => (await supabase.from("visitor_sessions").select("*").order("started_at", { ascending: false }).limit(500)).data || [],
  });
  const { data: events } = useQuery({
    queryKey: ["va_events"],
    queryFn: async () => (await supabase.from("visitor_events").select("*").order("created_at", { ascending: false }).limit(1000)).data || [],
  });
  const { data: leads } = useQuery({
    queryKey: ["va_leads"],
    queryFn: async () => (await supabase.from("contact_leads").select("*").order("created_at", { ascending: false }).limit(200)).data || [],
  });

  const total = sessions?.length || 0;
  const pageviews = events?.filter((e) => e.event_type === "pageview").length || 0;
  const clicks = events?.filter((e) => e.event_type === "click").length || 0;
  const mobile = sessions?.filter((s) => s.device_type === "mobile").length || 0;

  const pageMap = new Map<string, number>();
  events?.forEach((e) => { if (e.event_type === "pageview" && e.path) pageMap.set(e.path, (pageMap.get(e.path) || 0) + 1); });
  const topPages = [...pageMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  const clickMap = new Map<string, number>();
  events?.forEach((e) => { if (e.event_type === "click" && e.element_label) clickMap.set(e.element_label, (clickMap.get(e.element_label) || 0) + 1); });
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
      <h1 className="text-3xl font-bold mb-1">Analytics & Pixel Dashboard</h1>
      <p className="text-muted-foreground mb-6">Built-in visitor analytics + per-platform pixel monitoring in one place.</p>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {PLATFORMS.map((p) => (
            <TabsTrigger key={p.key} value={p.key}>{p.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
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
        </TabsContent>

        {PLATFORMS.map((p) => {
          const id = (settings as any)?.[p.key] || "";
          const connected = !!id;
          // approximate leads count via UTM source matching
          const utmKey = p.label.toLowerCase().split(" ")[0];
          const platformSessions = sessions?.filter((s) => (s.utm_source || "").toLowerCase().includes(utmKey) || (s.referrer || "").toLowerCase().includes(utmKey)) || [];
          const platformLeads = (leads || []).filter((l: any) => platformSessions.some((s) => Math.abs(new Date(l.created_at).getTime() - new Date(s.started_at).getTime()) < 30 * 60 * 1000));

          return (
            <TabsContent key={p.key} value={p.key} className="mt-6">
              <Card className="p-6 mb-4">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${p.color} text-white flex items-center justify-center font-bold`}>{p.label[0]}</div>
                    <div>
                      <h2 className="text-xl font-bold">{p.label}</h2>
                      <Badge variant={connected ? "default" : "secondary"} className="gap-1 mt-1">
                        {connected ? <><CheckCircle2 className="w-3 h-3" /> Connected · {id}</> : <><AlertCircle className="w-3 h-3" /> Not configured</>}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline"><Link to="/admin/pixels">Configure ID</Link></Button>
                    <Button asChild size="sm" variant="hero"><a href={p.dashUrl} target="_blank" rel="noreferrer">Open Dashboard <ExternalLink className="w-3.5 h-3.5 ml-1" /></a></Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{p.help}</p>
              </Card>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {stat(`Sessions from ${p.label}`, platformSessions.length, Users)}
                {stat(`Leads attributed`, platformLeads.length, Eye)}
                {stat(`Conv. rate`, platformSessions.length ? `${((platformLeads.length / platformSessions.length) * 100).toFixed(1)}%` : "—", MousePointerClick)}
              </div>

              {!connected && (
                <Card className="p-5 border-2 border-dashed">
                  <h3 className="font-bold mb-2">Get started</h3>
                  <ol className="text-sm text-muted-foreground list-decimal pl-5 space-y-1">
                    <li>Open <a href={p.dashUrl} target="_blank" rel="noreferrer" className="text-primary underline">{p.label} dashboard</a></li>
                    <li>Copy your Pixel / Tracking ID</li>
                    <li>Paste it in <Link to="/admin/pixels" className="text-primary underline">Pixel Manager</Link> — it goes live instantly across the site</li>
                  </ol>
                </Card>
              )}

              {connected && (
                <Card className="p-5">
                  <h3 className="font-bold mb-3">Recent traffic attributed to {p.label}</h3>
                  {platformSessions.length ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50"><tr>
                          <th className="text-left p-2">Time</th>
                          <th className="text-left p-2">Landing</th>
                          <th className="text-left p-2">Campaign</th>
                          <th className="text-left p-2">Device</th>
                        </tr></thead>
                        <tbody>
                          {platformSessions.slice(0, 20).map((s) => (
                            <tr key={s.id} className="border-t border-border">
                              <td className="p-2">{new Date(s.started_at).toLocaleString()}</td>
                              <td className="p-2 truncate max-w-[200px]">{s.landing_path}</td>
                              <td className="p-2">{s.utm_campaign || "—"}</td>
                              <td className="p-2">{s.device_type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No attributed sessions yet. Make sure your campaigns include UTM parameters (e.g. <code>?utm_source={utmKey}</code>) for accurate attribution.</p>
                  )}
                </Card>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
export default VisitorAnalyticsAdmin;
