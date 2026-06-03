import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Calendar, FileSearch, DollarSign, Target, BarChart3,
  Search, Globe, Sparkles, Bot, Brain, FileText, Workflow,
  TrendingUp, TrendingDown, CheckCircle2, Users, Zap, Rocket, Trophy, Code,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/Typewriter";
import { ClientMarquee } from "@/components/ClientMarquee";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AIToolkit } from "@/components/AIToolkit";
import { AppointmentWidget } from "@/components/AppointmentWidget";
import { ROICalculator } from "@/components/ROICalculator";
import { CaseStudyHighlights } from "@/components/CaseStudyHighlights";
import { BlogPreview } from "@/components/BlogPreview";
import { FAQAccordion } from "@/components/FAQAccordion";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PricingTiers } from "@/components/PricingTiers";
import { TeamSection } from "@/components/TeamSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const ICONS: Record<string, any> = {
  Search, Globe, Sparkles, Bot, Brain, FileText, Workflow, Rocket, Trophy, Code,
  Target, BarChart3, DollarSign, Users, Zap, TrendingUp,
};


/* ---------- Hero dashboard mockup (theme-adaptive, inline SVG) ---------- */
const HeroDashboard = () => (
  <div className="relative w-full max-w-[560px] mx-auto">
    {/* Glow backdrop */}
    <div className="absolute -inset-12 gradient-primary opacity-20 blur-3xl rounded-full" aria-hidden />

    {/* Floating brand orbs */}
    <div className="absolute -top-2 -left-6 z-20 animate-float" style={{ animationDelay: "0s" }}>
      <div className="w-14 h-14 rounded-2xl glass-card shadow-glow flex items-center justify-center text-2xl font-bold">
        <span className="text-gradient">G</span>
      </div>
    </div>
    <div className="absolute top-32 -left-10 z-20 animate-float" style={{ animationDelay: "1s" }}>
      <div className="w-14 h-14 rounded-2xl glass-card shadow-glow flex items-center justify-center">
        <span className="text-primary text-lg font-bold">∞</span>
      </div>
    </div>
    <div className="absolute -top-4 -right-4 z-20 animate-float" style={{ animationDelay: "0.5s" }}>
      <div className="w-16 h-16 rounded-2xl gradient-cta shadow-glow flex items-center justify-center text-primary-foreground font-bold text-sm">AI</div>
    </div>

    {/* Dashboard panel */}
    <div className="relative glass-card rounded-2xl p-5 shadow-elegant">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold">Performance Overview</div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-destructive/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Leads", value: "2,450", delta: "+24%", up: true },
          { label: "Cost Per Lead", value: "$14.25", delta: "-18%", up: true },
          { label: "ROAS", value: "4.35x", delta: "+32%", up: true },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border p-3 bg-card/40">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
            <div className="text-lg font-bold mt-1">{s.value}</div>
            <div className={`text-[11px] font-semibold mt-0.5 inline-flex items-center gap-1 ${s.up ? "text-green-500" : "text-destructive"}`}>
              {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground mb-2">Leads Growth</div>
      <svg viewBox="0 0 400 110" className="w-full h-28">
        <defs>
          <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,90 C40,80 70,70 100,60 C130,55 160,50 190,40 C220,30 250,28 280,20 C310,15 340,12 400,5 L400,110 L0,110 Z" fill="url(#hg)" />
        <path d="M0,90 C40,80 70,70 100,60 C130,55 160,50 190,40 C220,30 250,28 280,20 C310,15 340,12 400,5" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      </svg>
    </div>

    {/* Bottom AI badge */}
    <div className="absolute -bottom-4 right-4 glass-card rounded-xl px-3 py-2 shadow-glow">
      <div className="text-[10px] text-muted-foreground">AI Optimized</div>
      <div className="text-base font-bold text-primary">+32%</div>
      <div className="text-[10px] text-muted-foreground">More Conversions</div>
    </div>
  </div>
);

/* ---------- AI Hub diagram (orbiting nodes) ---------- */
const aiNodes = [
  { icon: Target, label: "Lead Qualification", angle: 270 },
  { icon: Bot, label: "Chatbot Assistant", angle: 342 },
  { icon: BarChart3, label: "Ad Optimization", angle: 54 },
  { icon: FileText, label: "Content Generator", angle: 126 },
  { icon: Workflow, label: "CRM Automation", angle: 198 },
];
const AIHub = () => {
  const r = 130;
  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto">
      <div className="absolute inset-8 rounded-full border border-border" />
      <div className="absolute inset-16 rounded-full border border-primary/30" />
      <div className="absolute inset-24 rounded-full border border-primary/50 animate-pulse-glow" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full gradient-cta shadow-neon flex items-center justify-center text-primary-foreground font-extrabold text-2xl">AI</div>
      </div>
      {aiNodes.map((n) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <div
            key={n.label}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <div className="flex flex-col items-center gap-1.5 animate-float" style={{ animationDelay: `${n.angle / 100}s` }}>
              <div className="w-12 h-12 rounded-xl glass-card shadow-card flex items-center justify-center">
                <n.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{n.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ---------- Sparkline for results cards ---------- */
const Sparkline = ({ color = "hsl(var(--primary))", down = false }: { color?: string; down?: boolean }) => (
  <svg viewBox="0 0 200 60" className="w-full h-14">
    <defs>
      <linearGradient id={`sp-${color}-${down}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.35" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    {down ? (
      <>
        <path d="M0,15 C30,18 50,22 70,28 C90,33 110,40 130,42 C150,45 170,48 200,55 L200,60 L0,60 Z" fill={`url(#sp-${color}-${down})`} />
        <path d="M0,15 C30,18 50,22 70,28 C90,33 110,40 130,42 C150,45 170,48 200,55" fill="none" stroke={color} strokeWidth="2" />
      </>
    ) : (
      <>
        <path d="M0,50 C30,45 50,38 70,32 C90,26 110,22 130,16 C150,12 170,8 200,4 L200,60 L0,60 Z" fill={`url(#sp-${color}-${down})`} />
        <path d="M0,50 C30,45 50,38 70,32 C90,26 110,22 130,16 C150,12 170,8 200,4" fill="none" stroke={color} strokeWidth="2" />
      </>
    )}
  </svg>
);

/* ---------- Section header ---------- */
const SectionHeader = ({ tag, children }: { tag: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <span className="pill-tag mb-4">{tag}</span>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-2xl">{children}</h2>
  </div>
);

const services = [
  { icon: Search, title: "Google Ads Management", desc: "High-converting campaigns that bring qualified leads.", to: "/services/google-ads" },
  { icon: Sparkles, title: "Meta Ads Management", desc: "Profitable ad campaigns that scale your business.", to: "/services/social-media-marketing" },
  { icon: Globe, title: "SEO Growth Systems", desc: "Rank higher, get traffic, and more organic leads.", to: "/services/seo-services" },
  { icon: Workflow, title: "Website Development", desc: "Conversion-focused websites that sell for you.", to: "/services/web-development" },
  { icon: Brain, title: "AI Marketing Automation", desc: "Automate, engage, and convert leads on autopilot.", to: "/services" },
];

const aiSystems = [
  { title: "AI Lead Qualification", desc: "We filter and score leads to send you only high-intent prospects." },
  { title: "AI Chatbot Assistant", desc: "24/7 AI assistant that answers, qualifies, and books appointments." },
  { title: "AI Ad Optimization Engine", desc: "AI analyzes data and optimizes campaigns for maximum ROI." },
  { title: "AI Content & Ad Copy Generator", desc: "Generate high-converting ad copy, headlines, and content in seconds." },
  { title: "AI CRM Automation", desc: "Automated follow-ups, reminders, and pipeline management." },
];

const results = [
  { metric: "+215%", label: "Increase in Leads", title: "Home Services", region: "USA", desc: "215% more leads in 90 days using Google & Meta Ads.", color: "hsl(142 76% 45%)" },
  { metric: "-42%", label: "Cost Per Lead", title: "Real Estate", region: "Canada", desc: "Reduced CPL by 42% and increased quality leads.", color: "hsl(280 80% 65%)", down: true },
  { metric: "+180%", label: "ROAS Increase", title: "E-Commerce", region: "USA", desc: "ROAS increased by 180% with AI optimization.", color: "hsl(217 91% 60%)" },
  { metric: "+3.2x", label: "Pipeline Growth", title: "B2B Services", region: "USA", desc: "3.2x pipeline growth in just 120 days.", color: "hsl(160 70% 50%)" },
];

const processSteps = [
  { n: "01", title: "Audit & Strategy", desc: "We analyze your business and identify growth opportunities." },
  { n: "02", title: "Setup & Launch", desc: "We set up campaigns, tracking, and AI systems for success." },
  { n: "03", title: "Optimize & Scale", desc: "We optimize based on data and scale what brings the best results." },
  { n: "04", title: "Grow & Dominate", desc: "We help you dominate your market and beat competitors." },
];

const Index = () => {
  const { data: settings } = useSiteSettings();
  const lines: string[] = (settings?.hero_typewriter_lines as any) || [
    "AI-Powered Lead Generation","Performance Marketing That Scales","Built for USA & Canada",
  ];
  const { data: dbServices } = useRealtimeTable<any>({ table: "services", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 6 });
  const { data: dbProcess } = useRealtimeTable<any>({ table: "process_steps", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const { data: dbCases } = useRealtimeTable<any>({ table: "case_studies", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 4 });
  const { data: dbStats } = useRealtimeTable<any>({ table: "stats_counters", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });

  const svc = (dbServices && dbServices.length ? dbServices.map((s: any) => ({
    icon: ICONS[s.icon] || Sparkles, title: s.title, desc: s.description, to: `/services/${s.slug}`,
  })) : services);
  const proc = (dbProcess && dbProcess.length ? dbProcess.map((s: any, i: number) => ({
    n: String(i + 1).padStart(2, "0"), title: s.title, desc: s.description,
  })) : processSteps);
  const palette = ["hsl(142 76% 45%)","hsl(280 80% 65%)","hsl(217 91% 60%)","hsl(160 70% 50%)"];
  const res = (dbCases && dbCases.length ? dbCases.map((c: any, i: number) => {
    const m = Array.isArray(c.metrics) && (c.metrics as any[])[0];
    return { metric: m?.value || "+100%", label: m?.label || "Growth", title: c.title, region: c.industry || "USA", desc: c.summary || "", color: palette[i % palette.length], down: String(m?.value || "").startsWith("-") };
  }) : results);

  return (
  <PageLayout
    title="AM Enterprises — AI-Powered Marketing Agency for USA & Canada"
    description="Performance marketing + AI automation systems that help businesses in USA & Canada generate leads, scale ads, and automate growth."
    canonical="/"
    primaryKeyword="AI marketing agency USA Canada"
  >
    {/* ============== HERO ============== */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="relative container mx-auto pt-16 lg:pt-24 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="pill-tag mb-6">
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Marketing Agency
          </span>
          <h1 data-hero-heading className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-4">
            We Generate Leads.<br />
            <span className="text-gradient text-3d">You Get More Clients.</span>
          </h1>
          <div className="text-lg md:text-2xl font-bold mb-6 min-h-[2.25rem]">
            <Typewriter words={lines} className="text-primary" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Performance marketing + AI automation systems that help businesses in <span className="text-primary font-semibold">USA &amp; Canada</span> scale consistently.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild size="lg" className="gradient-cta text-primary-foreground shadow-glow hover:opacity-90">
              <Link to="/contact"><Calendar className="w-4 h-4 mr-2" /> Book Free Strategy Call</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border">
              <Link to="/contact"><FileSearch className="w-4 h-4 mr-2" /> Get Free Audit</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2 font-semibold"><span className="text-gradient text-base">G</span> Google<br className="hidden md:inline" /><span className="text-muted-foreground text-xs ml-1">Partner</span></div>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div className="flex items-center gap-2 font-semibold"><span className="text-primary text-base">∞</span> Meta<br className="hidden md:inline" /><span className="text-muted-foreground text-xs ml-1">Business Partner</span></div>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div className="font-semibold">Clutch <span className="text-yellow-500">★★★★★</span><div className="text-muted-foreground text-xs">5.0 Rated</div></div>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div><span className="text-gradient font-extrabold text-lg">100+</span><div className="text-muted-foreground text-xs">Happy Clients</div></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
          <AppointmentWidget />
        </motion.div>
      </div>
    </section>

    {/* ============== CLIENT MARQUEE ============== */}
    <ClientMarquee />

    {/* ============== STATS ============== */}
    {dbStats && dbStats.length > 0 && (
      <section className="py-12 lg:py-16 border-y border-border bg-card/30">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {dbStats.map((s: any) => {
            const Icon = ICONS[s.icon] || TrendingUp;
            return (
              <div key={s.id} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl icon-3d flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-gradient">
                  <AnimatedCounter value={Number(s.value)} suffix={s.suffix || ""} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>
    )}

    {/* ============== BEFORE / AFTER & ROI (moved UP for trust early) ============== */}
    <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="pill-tag mb-4">Before vs After</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            See the <span className="text-gradient">Difference</span> AI Makes
          </h2>
          <p className="text-muted-foreground mb-6">Real client transformations — and a live calculator so you can model your own lift.</p>
          <CaseStudyHighlights />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <ROICalculator />
        </motion.div>
      </div>
    </section>

    {/* ============== PROBLEMS ============== */}
    <section className="py-20 lg:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <span className="pill-tag mb-4">Problems We Solve</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Stop Wasting Budget<br />
            On <span className="text-gradient">Ineffective</span> Marketing
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: DollarSign, title: "Wasted Ad Spend", desc: "Most businesses waste 30–60% of their ad budget on the wrong audience." },
            { icon: Target, title: "No Quality Leads", desc: "Getting clicks is easy, getting high-quality leads is where everyone fails." },
            { icon: BarChart3, title: "No Tracking & Clarity", desc: "Without proper tracking, you don't know what's working or what's not." },
          ].map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-7 card-hover-glow hover:-translate-y-1 transition-smooth">
              <div className="w-12 h-12 rounded-xl icon-3d flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ============== SERVICES ============== */}
    <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
      <div className="container mx-auto">
        <SectionHeader tag="Our Services">
          Result-Focused Services<br />
          That Drive <span className="text-gradient">Real Growth</span>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {svc.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to={s.to} className="block glass-card rounded-2xl p-6 h-full card-hover-glow group hover:-translate-y-1 transition-smooth">
                <div className="w-11 h-11 rounded-xl icon-3d flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2 leading-snug">{s.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ArrowRight className="w-3 h-3" /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ============== RESULTS (case study cards) ============== */}
    <section className="py-20 lg:py-28">
      <div className="container mx-auto">
        <SectionHeader tag="Results That Speak">
          Real Results From<br />
          <span className="text-gradient">Real Clients</span>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {res.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-6 card-hover-glow hover:-translate-y-1 transition-smooth">
              <div className="text-3xl font-extrabold mb-1" style={{ color: r.color }}>{r.metric}</div>
              <div className="text-xs text-muted-foreground mb-3">{r.label}</div>
              <Sparkline color={r.color} down={r.down} />
              <div className="flex items-center justify-between mt-4 mb-2">
                <h4 className="font-bold text-sm">{r.title}</h4>
                <span className="text-[10px] text-muted-foreground border border-border rounded-full px-2 py-0.5">{r.region}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-border"><Link to="/case-studies">View More Case Studies <ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
        </div>
      </div>
    </section>

    {/* ============== AI SYSTEMS ============== */}
    <section id="ai-systems" className="py-20 lg:py-28 relative overflow-hidden bg-card/30 border-y border-border">
      <div className="absolute inset-0 gradient-hero opacity-50" aria-hidden />
      <div className="relative container mx-auto">
        <div className="mb-12">
          <span className="pill-tag mb-4">Our AI-Powered Systems</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-2xl">
            AI Systems That Give You<br />
            An <span className="text-gradient">Unfair Advantage</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {aiSystems.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4 p-4 rounded-xl hover:bg-card/50 transition-smooth">
                <div className="w-10 h-10 rounded-lg neon-icon flex items-center justify-center shrink-0 text-xs font-bold">AI</div>
                <div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div><AIHub /></div>
        </div>
      </div>
    </section>

    {/* ============== WHY US / FEATURES ============== */}
    <section className="py-20 lg:py-28">
      <div className="container mx-auto">
        <SectionHeader tag="Why Choose Us">
          Built for <span className="text-gradient">Performance & Scale</span>
        </SectionHeader>
        <FeatureGrid />
      </div>
    </section>

    {/* ============== PRICING ============== */}
    <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
      <div className="container mx-auto">
        <SectionHeader tag="Pricing">
          Transparent Plans.<br /><span className="text-gradient">No Surprises.</span>
        </SectionHeader>
        <PricingTiers />
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg"><Link to="/pricing">View Full Pricing <ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
        </div>
      </div>
    </section>

    {/* ============== PROCESS ============== */}
    <section className="py-20 lg:py-28">
      <div className="container mx-auto">
        <SectionHeader tag="Our Process">
          Simple Process.<br />
          Massive <span className="text-gradient">Results.</span>
        </SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {proc.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-smooth">
              <div className="text-3xl font-extrabold text-gradient mb-3">{s.n}</div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ============== TEAM ============== */}
    <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
      <div className="container mx-auto">
        <SectionHeader tag="Our Team">
          The Experts Behind<br /><span className="text-gradient">Your Growth</span>
        </SectionHeader>
        <TeamSection />
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg"><Link to="/team">View Full Team <ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
        </div>
      </div>
    </section>

    {/* ============== AI TOOLKIT ============== */}
    <AIToolkit />

    {/* ============== FINAL BOOKING (deep funnel - convert intent) ============== */}
    <section id="book" className="py-20 lg:py-28 bg-card/30 border-y border-border scroll-mt-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="pill-tag mb-4"><Calendar className="w-3.5 h-3.5" /> Book a Free Strategy Call</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            Pick a Time.<br />
            Get Your <span className="text-gradient text-3d">Growth Plan.</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            30 minutes with a senior strategist. We'll audit your funnel, share quick wins, and lay out a path to scale.
          </p>
          <ul className="space-y-3">
            {[
              "Custom 90-day roadmap",
              "Live ad account or website audit",
              "AI automation recommendations",
              "Zero pressure, no contract required",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <AppointmentWidget />
        </motion.div>
      </div>
    </section>

    {/* ============== BLOG ============== */}
    <section className="py-20 lg:py-28">
      <div className="container mx-auto">
        <SectionHeader tag="From The Blog">
          Growth Insights & <span className="text-gradient">Playbooks</span>
        </SectionHeader>
        <BlogPreview />
      </div>
    </section>

    {/* ============== FAQ ============== */}
    <section className="py-20 lg:py-28 bg-card/30 border-y border-border">
      <div className="container mx-auto max-w-3xl">
        <SectionHeader tag="FAQ">
          Common <span className="text-gradient">Questions</span>
        </SectionHeader>
        <FAQAccordion />
      </div>
    </section>

    {/* ============== NEWSLETTER ============== */}
    <section className="py-16">
      <div className="container mx-auto max-w-4xl">
        <NewsletterSignup />
      </div>
    </section>
  </PageLayout>
  );
};

export default Index;
