import { useState } from "react";
import { Download, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const FreeGuideCTA = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setBusy(false);
    if (error && !error.message.toLowerCase().includes("duplicate")) return toast.error(error.message);
    toast.success("✅ Sent! Check your inbox for the free guide.");
    setEmail("");
  };
  return (
    <Card className="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center bg-white shadow-elegant">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
          <BookOpen className="w-4 h-4" /> Free PDF Guide
        </div>
        <h3 className="text-2xl md:text-3xl mb-3">"7 SEO Wins That 10x Pakistani Businesses in 2026"</h3>
        <p className="text-muted-foreground text-sm">38-page playbook with checklists, templates, and case studies. Delivered to your inbox instantly.</p>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
          <Download className="w-4 h-4 mr-2" /> Send My Free Guide
        </Button>
        <p className="text-[11px] text-muted-foreground text-center">No spam. Unsubscribe anytime.</p>
      </form>
    </Card>
  );
};
