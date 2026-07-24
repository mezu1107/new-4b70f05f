import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Calendar, Phone, Search, Globe, Sparkles, Brain, Workflow,
  Target, BarChart3, Users, Zap, Rocket, Trophy, Code, ShieldCheck, CheckCircle2,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/Typewriter";
import { ClientMarquee } from "@/components/ClientMarquee";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AppointmentWidget } from "@/components/AppointmentWidget";
import { CaseStudyHighlights } from "@/components/CaseStudyHighlights";
import { TeamSection } from "@/components/TeamSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import heroImg from "@/assets/hero-bg-network.jpg";

const ICONS: Record<string, any> = {
  Search, Globe, Sparkles, Brain, Workflow, Rocket, Trophy, Code,
  Target, BarChart3, Users, Zap,
};

const services = [
  { icon: Search, title: "SEO & Growth", desc: "Rank higher, drive qualified organic traffic that converts.", to: "/services/seo-services" },
  { icon: Sparkles, title: "Paid Ads", desc: "Google & Meta campaigns engineered for profitable ROAS.", to: "/services/social-media-marketing" },
  { icon: Globe, title: "Web Development", desc: "Fast, conversion-first websites launched in 15 days*.", to: "/services/web-development" },
  { icon: Brain, title: "AI Automation", desc: "Chatbots, lead scoring & CRM automation on autopilot.", to: "/services" },
];

const processSteps = [
  { n: "01", title: "Discover", desc: "We audit your business, competitors and growth gaps." },
  { n: "02", title: "Strategy", desc: "A clear, data-backed roadmap tailored to your goals." },
  { n: "03", title: "Execute", desc: "We launch campaigns, funnels and AI systems fast." },
  { n: "04", title: "Scale", desc: "Optimize weekly, double down on what wins." },
];

const stats = [
  { value: 200, suffix: "+", label: "Happy Clients" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 15,  suffix: "+", label: "Expert Team" },
  { value: 8,   suffix: "yrs", label: "Industry Experience" },
];

const trustPoints = [
  "Transparent reporting every week",
  "Dedicated account manager",
  "No lock-in contracts",
  "Proven results in USA, UK & Canada",
];

const SectionHead = ({ tag, title, sub }: { tag: string; title: React.ReactNode; sub?: string }) => (
  <div className="max-w-2xl mx-auto text-center mb-12">
    <span className="pill-tag mb-4">{tag}</span>
    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">{title}</h2>
    {sub && <p className="text-muted-foreground">{sub}</p>}
  </div>
);

const Index = () => {
  const { data: settings } = useSiteSettings();
  const lines: string[] = (settings?.hero_typewriter_lines as any) || [
    "AI-Powered Lead Generation", "Performance Marketing", "Websites That Convert",
  ];

  const { data: dbServices } = useRealtimeTable<any>({ table: "services", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 4 });
  const { data: dbStats } = useRealtimeTable<any>({ table: "stats_counters", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 4 });

  const svc = dbServices?.length ? dbServices.map((s: any) => ({
    icon: ICONS[s.icon] || Sparkles, title: s.title, desc: s.description, to: `/services/${s.slug}`,
  })) : services;

  const st = dbStats?.length ? dbStats.map((s: any) => ({
    value: Number(s.value) || 0, suffix: s.suffix || "", label: s.label,
  })) : stats;

  return (
    <PageLayout
      title="AM Enterprises — Digital Growth Partner You Can Trust"
      description="Trusted by 200+ businesses across USA, UK, Canada & Pakistan. AI-powered marketing, web development and automation that deliver measurable growth."
      canonical="/"
      primaryKeyword="digital marketing agency"
    >
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* clean gradient — no grid/jali */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary to-[hsl(230_75%_35%)]" aria-hidden />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" aria-hidden />

        <div className="relative container mx-auto py-20 md:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white mb-6 border border-white/25">
              <Sparkles className="w-3.5 h-3.5" /> Trusted by 200+ businesses worldwide
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white mb-6">
              Grow Your Business.<br />
              <span className="text-white/90">The Smart Way.</span>
            </h1>

            <div className="text-lg md:text-2xl font-semibold text-white/90 mb-6 min-h-[2rem]">
              <Typewriter words={lines} className="text-white" />
            </div>

            <p className="text-base md:text-lg text-white/85 max-w-2xl mb-8 leading-relaxed">
              We build websites, run ads and deploy AI automation that turn visitors into
              loyal customers — with clear reporting and no jargon.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 shadow-elegant font-bold">
                <Link to="/contact"><Calendar className="w-5 h-5" /> Book Free Strategy Call</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white/40 text-white bg-white/10 backdrop-blur hover:bg-white/20 hover:text-white">
                <Link to="tel:+923173712950"><Phone className="w-5 h-5" /> +92 317 371 2950</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TRUST LOGOS ================= */}
      <section className="py-10 border-b border-border bg-background">
        <div className="container mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">
            Brands & Businesses That Trust Us
          </p>
          <ClientMarquee />
        </div>
      </section>

      {/* ================= WHY CHOOSE US (trust) ================= */}
      <section className="section-soft py-20 md:py-24">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="pill-tag mb-4">Why AM Enterprises</span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              A Partner You Can <span className="text-gradient">Actually Trust</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We don't disappear after the invoice. Every client gets a dedicated manager,
              weekly reports, and a clear plan to hit their revenue goals.
            </p>
            <ul className="space-y-3 mb-8">
              {trustPoints.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{p}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="gradient-cta text-primary-foreground shadow-glow">
              <Link to="/contact">Get Started <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: ShieldCheck, k: "100%", v: "Client Focused" },
              { icon: Rocket, k: "15 Days*", v: "Fast Delivery" },
              { icon: Trophy, k: "4.9/5", v: "Client Rating" },
              { icon: Users, k: "24/7", v: "Support" },
            ].map((c, i) => (
              <motion.div
                key={c.v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 text-center hover-lift"
              >
                <div className="w-12 h-12 mx-auto rounded-xl gradient-cta shadow-glow flex items-center justify-center mb-3">
                  <c.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-gradient">{c.k}</div>
                <div className="text-sm text-muted-foreground mt-1">{c.v}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto">
          <SectionHead
            tag="What We Do"
            title={<>Solutions That <span className="text-gradient">Drive Growth</span></>}
            sub="Four core services, one goal — turn your business into a revenue machine."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {svc.map((s: any, i: number) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={s.to}
                  className="group block h-full rounded-2xl p-6 bg-card border border-border card-hover-glow card-shimmer"
                >
                  <div className="w-14 h-14 rounded-xl gradient-cta shadow-glow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <s.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLUE CTA BAND ================= */}
      <section className="py-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-[hsl(230_75%_45%)] p-8 md:p-12 shadow-elegant"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-semibold opacity-90">Call Us Now: +92 317 371 2950</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold">Stay Connected With Cutting-Edge Growth</h3>
              </div>
              <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg">
                <Link to="/contact">Get A Quote <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="section-spotlight py-20 md:py-24">
        <div className="container mx-auto">
          <SectionHead
            tag="How It Works"
            title={<>Standard <span className="text-gradient">Work Process</span></>}
            sub="A proven four-step system we've refined over 500+ projects."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {processSteps.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl p-6 bg-card border border-border hover-lift text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full gradient-cta shadow-glow flex items-center justify-center text-primary-foreground text-2xl font-extrabold mb-4">
                  {p.n}
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-[hsl(230_75%_35%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} aria-hidden />
        <div className="relative container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {st.map((s: any) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-extrabold mb-1">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm md:text-base text-white/85">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CASE STUDIES / PROJECTS ================= */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto">
          <SectionHead
            tag="Our Work"
            title={<>Recent <span className="text-gradient">Client Wins</span></>}
            sub="Real results from real businesses we've partnered with."
          />
          <CaseStudyHighlights />
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="section-soft py-20 md:py-24">
        <div className="container mx-auto">
          <SectionHead
            tag="Meet The Team"
            title={<>The People <span className="text-gradient">Behind Your Growth</span></>}
            sub="A dedicated team of strategists, designers and engineers."
          />
          <TeamSection />
        </div>
      </section>

      {/* ================= BOOKING / CONTACT ================= */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <SectionHead
            tag="Let's Talk"
            title={<>Book Your <span className="text-gradient">Free Strategy Call</span></>}
            sub="15 minutes. Zero pressure. A clear next step for your growth."
          />
          <AppointmentWidget />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <SectionHead
            tag="FAQ"
            title={<>Common <span className="text-gradient">Questions</span></>}
          />
          <FAQAccordion />
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
