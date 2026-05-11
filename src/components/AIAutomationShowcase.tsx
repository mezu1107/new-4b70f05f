import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, MessageSquare, ShoppingBag, Youtube, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const groups = [
  { icon: Bot, title: "AI Services", items: ["AI Chatbots", "AI Assistants", "GPT Integrations", "AI SaaS"] },
  { icon: MessageSquare, title: "WhatsApp Automation", items: ["WhatsApp API", "WhatsApp Bots", "Auto Reply", "CRM Sync"] },
  { icon: ShoppingBag, title: "E-commerce Automation", items: ["Shopify Bots", "Store Automation", "Auto Orders"] },
  { icon: Youtube, title: "Content Automation", items: ["YouTube Automation", "TikTok Automation", "Social Auto-post"] },
];

export const AIAutomationShowcase = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-50 via-cyan-50 to-sky-50 pointer-events-none" />
    <div className="container mx-auto relative">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" /> TRENDING · FEATURED
        </span>
        <h2 className="text-3xl md:text-5xl mb-3">AI Automation</h2>
        <p className="text-muted-foreground">Replace repetitive work with intelligent agents — chat, sales, content & operations.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {groups.map((g, i) => (
          <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
            <Card className="p-6 h-full bg-white/80 backdrop-blur border-2 border-white relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-300 opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white flex items-center justify-center mb-4">
                <g.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3">{g.title}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {g.items.map(i => <li key={i} className="flex gap-2"><Zap className="w-3.5 h-3.5 text-fuchsia-500 mt-1 shrink-0" /> {i}</li>)}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button asChild variant="hero" size="lg"><Link to="/contact">Automate My Business</Link></Button>
      </div>
    </div>
  </section>
);
