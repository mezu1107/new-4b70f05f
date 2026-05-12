import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Gauge, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Tool = "ad-copy" | "ad-optimizer";

export const AIToolkit = () => {
  const [tool, setTool] = useState<Tool>("ad-copy");
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // shared lead
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // ad-copy
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [offer, setOffer] = useState("");
  const [platform, setPlatform] = useState("Google");

  // optimizer
  const [campaignSummary, setCampaignSummary] = useState("");
  const [metrics, setMetrics] = useState("");

  const run = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid work email so we can send results.");
      return;
    }
    if (tool === "ad-copy" && (!product || !audience)) {
      toast.error("Tell us what you're selling and to whom.");
      return;
    }
    if (tool === "ad-optimizer" && !campaignSummary) {
      toast.error("Describe the campaign you want optimized.");
      return;
    }
    setBusy(true);
    setOutput("");
    try {
      const { data, error } = await supabase.functions.invoke("ai-marketing-tools", {
        body: {
          tool, email, name,
          product, audience, offer, platform,
          campaign_summary: campaignSummary, metrics,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOutput(data.message || "");
      toast.success("Done! A copy is on its way to your inbox.");
    } catch (e: any) {
      toast.error(e.message || "Something went wrong, try again.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="ai-toolkit" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-50" aria-hidden />
      <div className="relative container mx-auto">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="pill-tag mb-4"><Sparkles className="w-3.5 h-3.5" /> Free AI Toolkit</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Generate Winning Ads<br />
            With Our <span className="text-gradient text-3d">AI Strategist</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm md:text-base">
            Get high-converting ad copy or a full campaign optimization audit in seconds — no signup required.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-5 md:p-8 shadow-elegant"
        >
          <Tabs value={tool} onValueChange={(v) => setTool(v as Tool)}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="ad-copy" className="gap-2"><Wand2 className="w-4 h-4" /> Ad Copy Generator</TabsTrigger>
              <TabsTrigger value="ad-optimizer" className="gap-2"><Gauge className="w-4 h-4" /> Campaign Optimizer</TabsTrigger>
            </TabsList>

            <TabsContent value="ad-copy" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Platform</Label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
                  >
                    <option>Google</option><option>Meta</option><option>LinkedIn</option><option>TikTok</option>
                  </select>
                </div>
                <div>
                  <Label>Offer / CTA</Label>
                  <Input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Free 30-min strategy call" />
                </div>
              </div>
              <div>
                <Label>Product or service *</Label>
                <Input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="HVAC repair in Toronto" />
              </div>
              <div>
                <Label>Target audience *</Label>
                <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Homeowners 35–65 with broken AC" />
              </div>
            </TabsContent>

            <TabsContent value="ad-optimizer" className="space-y-4">
              <div>
                <Label>Campaign summary *</Label>
                <Textarea
                  value={campaignSummary}
                  onChange={(e) => setCampaignSummary(e.target.value)}
                  placeholder="Google Search campaign for HVAC, $5k/mo, 14 keywords, 3 ad groups…"
                  rows={3}
                />
              </div>
              <div>
                <Label>Current metrics (optional)</Label>
                <Input value={metrics} onChange={(e) => setMetrics(e.target.value)} placeholder="CTR 2.1%, CPL $42, ROAS 1.8x" />
              </div>
            </TabsContent>

            <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
              <div>
                <Label>Your name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" />
              </div>
              <div>
                <Label>Work email *</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" />
              </div>
            </div>

            <Button onClick={run} disabled={busy} size="lg" className="gradient-cta text-primary-foreground shadow-glow w-full mt-5">
              {busy ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating…</>) : (<><Sparkles className="w-4 h-4 mr-2" /> Generate with AI</>)}
            </Button>

            {output && (
              <div className="mt-6 rounded-xl border border-border bg-card/60 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">AI Result</span>
                  <Button size="sm" variant="ghost" onClick={copy}>
                    {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{output}</pre>
              </div>
            )}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};
