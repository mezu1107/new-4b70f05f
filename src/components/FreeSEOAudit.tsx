import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const FreeSEOAudit = () => {
  const [submitted, setSubmitted] = useState(false);
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
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success("Audit request received!"); }} className="bg-white rounded-xl p-6 space-y-3">
            <Input placeholder="Your Website URL" required />
            <Input type="email" placeholder="Your Email" required />
            <Input placeholder="Phone (optional)" />
            <Button type="submit" variant="hero" className="w-full" size="lg"><Search className="w-4 h-4 mr-2" />Get My Free Audit</Button>
            <p className="text-xs text-muted-foreground text-center">100% free. No credit card required.</p>
          </form>
        )}
      </div>
    </Card>
  );
};
