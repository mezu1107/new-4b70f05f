import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Bot, TrendingUp, Code2, Globe2, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Rocket,
    emoji: "🚀",
    title: "Website Ready in as Fast as 15 Days*",
    desc: "Launch a modern, high-performance website built for speed, SEO, security & conversions.",
    cta: "Get Started",
    to: "/services/web-development",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    icon: Bot,
    emoji: "🤖",
    title: "Work Smarter with AI Automation",
    desc: "Automate support, leads, appointments & repetitive tasks with intelligent AI systems.",
    cta: "Explore AI",
    to: "/services",
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "Grow Your Business Online",
    desc: "Attract qualified leads and boost sales with performance-driven digital marketing.",
    cta: "Grow Now",
    to: "/services/seo-services",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    icon: Code2,
    emoji: "💻",
    title: "Custom Software & Mobile Apps",
    desc: "ERP, CRM, SaaS platforms & mobile apps — secure, scalable, tailored to your goals.",
    cta: "View Solutions",
    to: "/services",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
  {
    icon: Globe2,
    emoji: "🌍",
    title: "Trusted by Businesses Worldwide",
    desc: "Partnering with startups, SMEs & enterprises across Pakistan and global markets.",
    cta: "Book a Free Consultation",
    to: "/contact",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    featured: true,
  },
];

export const HeroFeatureCards = () => (
  <section className="relative py-16 lg:py-20 -mt-6 md:-mt-10 z-10">
    <div className="container mx-auto">
      {/* Mobile: horizontal scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none">
        {cards.map((c) => (
          <Card key={c.title} card={c} className="min-w-[85%] snap-center" />
        ))}
      </div>

      {/* Desktop / tablet grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-5 auto-rows-fr">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="h-full"
          >
            <Card card={c} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Card = ({ card, className = "" }: { card: (typeof cards)[number]; className?: string }) => {
  const Icon = card.icon;
  return (
    <Link
      to={card.to}
      className={`group relative flex flex-col h-full rounded-2xl p-6 overflow-hidden border border-border/60 bg-card/70 backdrop-blur-xl shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 ${className}`}
    >
      {/* gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} aria-hidden />
      {/* shine */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden />

      <div className="relative flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl gradient-cta shadow-glow flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl" aria-hidden>{card.emoji}</span>
        </div>
        <h3 className="text-base lg:text-[15px] font-bold leading-snug mb-2 min-h-[3rem]">{card.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-5 flex-1">{card.desc}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
          {card.cta} <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
