import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = z.string().trim().email().max(255).safeParse(email);
    if (!v.success) { toast.error("Please enter a valid email"); return; }
    setBusy(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: v.data });
    setBusy(false);
    if (error && !error.message.includes("duplicate")) { toast.error(error.message); return; }
    toast.success("You're in! Check your inbox for our growth playbook.");
    setEmail("");
  };
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      className="rounded-2xl gradient-primary p-8 md:p-12 text-white shadow-elegant text-center">
      <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
      <h3 className="text-2xl md:text-3xl mb-2">Get our weekly growth playbook</h3>
      <p className="opacity-90 mb-6 max-w-xl mx-auto">Free actionable tips on SEO, ads, AI & growth — delivered every Monday.</p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input type="email" required placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)}
          className="bg-white/15 border-white/30 text-white placeholder:text-white/70" />
        <Button type="submit" variant="accent" size="lg" disabled={busy}>Subscribe <Send className="w-4 h-4 ml-1" /></Button>
      </form>
    </motion.div>
  );
};
