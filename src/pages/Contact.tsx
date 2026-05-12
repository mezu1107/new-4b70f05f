import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1).max(2000),
});

const Contact = () => {
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = schema.safeParse(Object.fromEntries(fd) as any);
    if (!v.success) { toast.error(v.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.from("contact_leads").insert({
      name: v.data.name, email: v.data.email, phone: v.data.phone, message: `${v.data.service ? `[${v.data.service}] ` : ""}${v.data.message}`,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Thanks! We'll be in touch within 24 hours.");
    e.currentTarget.reset();
  };
  return (
    <PageLayout title="Contact AM Enterprises — Islamabad & Rawat" description="Get in touch with AM Enterprises. Call 0317-3712950 or send a message — we reply within 24 hours." canonical="/contact">
      <PageHero title="Let's Talk" subtitle="Tell us about your project and we'll get back within 24 hours." />
      <section className="py-16">
        <div className="container mx-auto grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Card className="p-6"><Phone className="w-6 h-6 text-primary mb-3" /><h3 className="font-semibold mb-1">Call Us</h3><a href="tel:03173712950" className="text-muted-foreground">0317-3712950</a></Card>
            <Card className="p-6"><Mail className="w-6 h-6 text-primary mb-3" /><h3 className="font-semibold mb-1">Email</h3><a href="mailto:hello@amenterprises.pk" className="text-muted-foreground">hello@amenterprises.pk</a></Card>
            <Card className="p-6"><MapPin className="w-6 h-6 text-primary mb-3" /><h3 className="font-semibold mb-1">Offices</h3><p className="text-muted-foreground text-sm">Islamabad HQ<br />Rawat Technology Park, Pakistan</p></Card>
          </div>
          <Card className="p-8 lg:col-span-2">
            <h2 className="text-2xl mb-6">Send us a message</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input name="name" required placeholder="Your Name" maxLength={100} />
                <Input name="email" required type="email" placeholder="Email Address" maxLength={255} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input name="phone" placeholder="Phone" maxLength={30} />
                <Input name="service" placeholder="Service Interested In" maxLength={100} />
              </div>
              <Textarea name="message" required placeholder="Tell us about your project..." rows={5} maxLength={2000} />
              <Button type="submit" variant="hero" size="lg" disabled={busy}>{busy ? "Sending…" : "Send Message"}</Button>
            </form>
          </Card>
        </div>
    <div className="container mx-auto mt-12">
          <iframe
            title="AM Enterprises Office"
            className="w-full h-80 rounded-2xl shadow-xl border-0"
            src="https://maps.google.com/maps?q=AM+Enterprises+Rawat+Technology+Park+Rawalpindi+Pakistan&t=&z=17&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
