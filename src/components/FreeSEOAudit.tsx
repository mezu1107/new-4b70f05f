import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const schema = z.object({
  website: z.string().trim().min(3).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
});

export const FreeSEOAudit = () => {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = schema.safeParse(Object.fromEntries(fd) as any);
    if (!v.success) { toast.error(v.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.from("contact_leads").insert({
      name: v.data.email.split("@")[0],
      email: v.data.email,
      phone: v.data.phone || null,
      message: `[FREE SEO AUDIT REQUEST] Website: ${v.data.website}`,
      source: "seo_audit",
    } as any);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setSubmitted(true);
    toast.success("Audit request received! Check your inbox in 24h.");
  };

  return (
    <Card className="p-8 md:p-10 gradient-hero shadow-elegant border-2 border-primary/20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Free Tool</span>
          <h3 className="text-2xl md:text-3xl mt-2 mb-3">Get a Free SEO Audit</h3>
          <p className="text-muted-foreground mb-4">Find out exactly why your site isn't ranking — with a 12-point technical & content audit, delivered in 24 hours.</p>
          <ul className="space-y-2 text-sm">
            {["Technical SEO health check","Top 10 keyword opportunities","Competitor gap analysis","Action plan with priorities"].map(i => (
              <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" />{i}</li>
            ))}
          </ul>
        </div>
        {submitted ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center mx-auto mb-3"><CheckCircle2 className="w-7 h-7 text-white" /></div>
            <h4 className="text-xl font-bold mb-2">Audit Requested!</h4>
            <p className="text-muted-foreground text-sm">We'll email your full report within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="bg-white rounded-xl p-6 space-y-3">
            <Input name="website" placeholder="Your Website URL" required maxLength={255} />
            <Input name="email" type="email" placeholder="Your Email" required maxLength={255} />
            <Input name="phone" placeholder="Phone (optional)" maxLength={30} />
            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={busy}>
              <Search className="w-4 h-4 mr-2" />{busy ? "Submitting…" : "Get My Free Audit"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">100% free. No credit card required.</p>
          </form>
        )}
      </div>
    </Card>
  );
};
