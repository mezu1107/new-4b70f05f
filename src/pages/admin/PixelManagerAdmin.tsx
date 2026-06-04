import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, AlertCircle, Loader2, BarChart3, Search, Code2 } from "lucide-react";
import { toast } from "sonner";

type FieldKey =
  | "meta_pixel_id" | "google_analytics_id" | "google_tag_manager_id" | "tiktok_pixel_id"
  | "linkedin_insight_id" | "pinterest_tag_id" | "snapchat_pixel_id" | "twitter_pixel_id"
  | "hotjar_id" | "clarity_id" | "gsc_verification" | "bing_verification" | "yandex_verification";

interface PixelDef {
  key: FieldKey; label: string; placeholder: string; help: string; pattern: RegExp; group: "ads" | "analytics" | "webmaster";
}

const PIXELS: PixelDef[] = [
  // Ads / retargeting pixels
  { key: "meta_pixel_id",    label: "Meta (Facebook) Pixel", placeholder: "1234567890123456", help: "Events Manager → Pixel ID (15–16 digits)", pattern: /^\d{6,20}$/, group: "ads" },
  { key: "tiktok_pixel_id",  label: "TikTok Pixel",          placeholder: "C12ABC34DEF56",    help: "TikTok Events Manager → Pixel code",      pattern: /^[A-Z0-9_-]{8,40}$/i, group: "ads" },
  { key: "linkedin_insight_id", label: "LinkedIn Insight Tag", placeholder: "1234567",        help: "Campaign Manager → Insight Tag Partner ID", pattern: /^\d{4,15}$/, group: "ads" },
  { key: "pinterest_tag_id", label: "Pinterest Tag",         placeholder: "2612345678901",    help: "Ads Manager → Conversions → Tag ID",      pattern: /^\d{10,20}$/, group: "ads" },
  { key: "snapchat_pixel_id",label: "Snapchat Pixel",        placeholder: "abc12345-abcd-...",help: "Ads Manager → Events Manager → Pixel ID",  pattern: /^[a-f0-9-]{20,60}$/i, group: "ads" },
  { key: "twitter_pixel_id", label: "Twitter / X Pixel",     placeholder: "o1abc",            help: "Ads Manager → Event Manager → Pixel ID",  pattern: /^[a-z0-9]{4,20}$/i, group: "ads" },

  // Analytics + heatmaps
  { key: "google_analytics_id",  label: "Google Analytics 4", placeholder: "G-XXXXXXXXXX", help: "GA4 Admin → Data Streams → Measurement ID",     pattern: /^G-[A-Z0-9]{6,20}$/, group: "analytics" },
  { key: "google_tag_manager_id",label: "Google Tag Manager", placeholder: "GTM-XXXXXXX",  help: "GTM → Container ID",                            pattern: /^GTM-[A-Z0-9]{4,15}$/, group: "analytics" },
  { key: "hotjar_id",            label: "Hotjar",             placeholder: "3123456",      help: "Hotjar → Sites & Organizations → Site ID",       pattern: /^\d{4,10}$/, group: "analytics" },
  { key: "clarity_id",           label: "Microsoft Clarity",  placeholder: "abc123xyz",    help: "clarity.microsoft.com → project ID",            pattern: /^[a-z0-9]{6,20}$/i, group: "analytics" },

  // Webmaster verifications
  { key: "gsc_verification",   label: "Google Search Console", placeholder: "abc123_xyz...", help: "GSC → Add property → HTML tag → content value", pattern: /^[A-Za-z0-9_\-=.]{8,200}$/, group: "webmaster" },
  { key: "bing_verification",  label: "Bing Webmaster Tools",  placeholder: "ABC123...",     help: "Bing Webmaster → Verify → Meta tag content",   pattern: /^[A-Za-z0-9_\-=.]{8,200}$/, group: "webmaster" },
  { key: "yandex_verification",label: "Yandex Webmaster",      placeholder: "abc123...",     help: "Yandex Webmaster → Meta tag content",          pattern: /^[A-Za-z0-9_\-=.]{8,200}$/, group: "webmaster" },
];

const PixelManagerAdmin = () => {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site_settings_admin"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).maybeSingle()).data,
  });
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: any = {};
      PIXELS.forEach((p) => (payload[p.key] = form[p.key] || null));
      payload.custom_head_html = form.custom_head_html || null;
      payload.custom_body_html = form.custom_body_html || null;
      payload.pixel_auto_verify = !!form.pixel_auto_verify;
      const { error } = await supabase.from("site_settings").update(payload).eq("id", (data as any).id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      qc.invalidateQueries({ queryKey: ["site_settings_admin"] });
      toast.success("All integrations saved & live on site");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const status = (p: PixelDef) => {
    const v = form[p.key];
    if (!v) return { ok: false, label: "Not set", color: "secondary" as const };
    if (!p.pattern.test(v)) return { ok: false, label: "Format invalid", color: "destructive" as const };
    return { ok: true, label: "Connected", color: "default" as const };
  };

  const renderGroup = (group: PixelDef["group"]) => (
    <div className="space-y-4">
      {PIXELS.filter((p) => p.group === group).map((p) => {
        const s = status(p);
        return (
          <Card key={p.key} className="p-5">
            <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
              <Label className="text-base font-semibold">{p.label}</Label>
              <Badge variant={s.color} className="gap-1">
                {s.ok ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {s.label}
              </Badge>
            </div>
            <Input value={form[p.key] || ""} onChange={(e) => setForm({ ...form, [p.key]: e.target.value })} placeholder={p.placeholder} />
            <div className="text-xs text-muted-foreground mt-1.5">{p.help}</div>
          </Card>
        );
      })}
    </div>
  );

  const connectedCount = PIXELS.filter((p) => status(p).ok).length;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="text-3xl font-bold">Pixel & Tag Manager</h1>
        <Badge variant="default" className="text-sm">{connectedCount}/{PIXELS.length} active</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        WordPress-style integrations hub: paste any ID → instantly injected on every page, validated, and live.
      </p>

      <Card className="p-4 mb-6 flex items-center justify-between">
        <div>
          <div className="font-semibold">Auto-verify & inject</div>
          <div className="text-xs text-muted-foreground">When ON, valid IDs load tracking scripts on the public site automatically.</div>
        </div>
        <Switch checked={!!form.pixel_auto_verify} onCheckedChange={(v) => setForm({ ...form, pixel_auto_verify: v })} />
      </Card>

      <Tabs defaultValue="ads">
        <TabsList className="mb-4 flex-wrap h-auto">
          <TabsTrigger value="ads"><BarChart3 className="w-4 h-4 mr-1.5" /> Ads Pixels (6)</TabsTrigger>
          <TabsTrigger value="analytics"><BarChart3 className="w-4 h-4 mr-1.5" /> Analytics & Heatmaps (4)</TabsTrigger>
          <TabsTrigger value="webmaster"><Search className="w-4 h-4 mr-1.5" /> Search Engines (3)</TabsTrigger>
          <TabsTrigger value="custom"><Code2 className="w-4 h-4 mr-1.5" /> Custom Code</TabsTrigger>
        </TabsList>
        <TabsContent value="ads">{renderGroup("ads")}</TabsContent>
        <TabsContent value="analytics">{renderGroup("analytics")}</TabsContent>
        <TabsContent value="webmaster">{renderGroup("webmaster")}</TabsContent>
        <TabsContent value="custom">
          <Card className="p-5 space-y-4">
            <div>
              <Label className="text-base font-semibold">Custom &lt;head&gt; HTML</Label>
              <div className="text-xs text-muted-foreground mb-2">Paste any 3rd-party script, meta tag, or pixel that goes in the &lt;head&gt;. Injected on every page.</div>
              <Textarea rows={6} className="font-mono text-xs" value={form.custom_head_html || ""} onChange={(e) => setForm({ ...form, custom_head_html: e.target.value })} placeholder="<!-- e.g. <script>...</script>  or  <meta name=... content=... /> -->" />
            </div>
            <div>
              <Label className="text-base font-semibold">Custom &lt;body&gt; HTML</Label>
              <div className="text-xs text-muted-foreground mb-2">Snippets that must go at end of &lt;body&gt; (chat widgets, noscript pixels, etc.).</div>
              <Textarea rows={6} className="font-mono text-xs" value={form.custom_body_html || ""} onChange={(e) => setForm({ ...form, custom_body_html: e.target.value })} placeholder="<!-- e.g. Crisp / Intercom / Drift loader -->" />
            </div>
            <div className="text-xs text-muted-foreground border border-border rounded-md p-3 bg-card/40">
              ⚠️ Only paste code from trusted providers — these snippets run on every visitor's browser.
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-4 mt-8 flex justify-end">
        <Button size="lg" variant="hero" onClick={() => save.mutate()} disabled={save.isPending} className="shadow-glow">
          {save.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : "Save & Activate All Integrations"}
        </Button>
      </div>
    </div>
  );
};
export default PixelManagerAdmin;
