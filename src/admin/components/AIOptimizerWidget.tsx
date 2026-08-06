import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AIOptimizerWidget = () => {
  const [platform, setPlatform] = useState("Google Ads");
  const [campaign, setCampaign] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  const run = async () => {
    if (!campaign.trim()) return toast.error("Paste your campaign details");
    setBusy(true); setResult("");
    try {
      const { data, error } = await supabase.functions.invoke("ai-marketing-tools", {
        body: { tool: "optimize", platform, input: campaign },
      });
      if (error) throw error;
      setResult(data?.output || "No output");
    } catch (e: any) {
      toast.error(e.message || "Failed");
    } finally { setBusy(false); }
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-lg gradient-primary text-white flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
        <div>
          <h3 className="font-bold">AI Campaign Optimizer</h3>
          <p className="text-xs text-muted-foreground">Paste a campaign, get instant audit + recommendations.</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-2 mb-3">
        <div className="sm:col-span-1">
          <Label className="text-xs">Platform</Label>
          <select className="flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm" value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option>Google Ads</option><option>Meta Ads</option><option>TikTok Ads</option><option>LinkedIn Ads</option><option>SEO</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs">Campaign / Ad set details</Label>
          <Input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="e.g. Search · plumbers · USA · $50/day · 1.2% CTR" />
        </div>
      </div>
      <Button onClick={run} disabled={busy} variant="hero" size="sm">
        {busy ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Analyzing…</> : <><Sparkles className="w-4 h-4 mr-1" /> Optimize</>}
      </Button>
      {result && (
        <div className="mt-4 p-4 rounded-lg bg-muted/40 border border-border text-sm whitespace-pre-wrap max-h-80 overflow-y-auto">{result}</div>
      )}
    </Card>
  );
};
