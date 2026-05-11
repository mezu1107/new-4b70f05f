import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, Code, Smartphone, Megaphone, Palette, ShoppingCart, MousePointerClick, CheckCircle2, Star, Users, Award, Zap } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InteractiveQuiz } from "@/components/InteractiveQuiz";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { PricingTiers } from "@/components/PricingTiers";
import { ClientMarquee } from "@/components/ClientMarquee";
import { FAQAccordion } from "@/components/FAQAccordion";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { FeatureGrid } from "@/components/FeatureGrid";
import { TeamSection } from "@/components/TeamSection";
import { Typewriter } from "@/components/Typewriter";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { AIAutomationShowcase } from "@/components/AIAutomationShowcase";
import { ROICalculator } from "@/components/ROICalculator";
import { FreeSEOAudit } from "@/components/FreeSEOAudit";
import { TrustBadges } from "@/components/TrustBadges";
import { LiveVisitors } from "@/components/LiveVisitors";
import { AwardsStrip } from "@/components/AwardsStrip";
import { CompareTable } from "@/components/CompareTable";
import { AppointmentWidget } from "@/components/AppointmentWidget";
import { CaseStudyHighlights } from "@/components/CaseStudyHighlights";
import { VideoTestimonial } from "@/components/VideoTestimonial";
import { PressStrip } from "@/components/PressStrip";
import { IndustriesGrid } from "@/components/IndustriesGrid";
import { TechStackStrip } from "@/components/TechStackStrip";
import { BlogPreview } from "@/components/BlogPreview";
import { GuaranteeBanner } from "@/components/GuaranteeBanner";
import { QuickContactCards } from "@/components/QuickContactCards";
import { FreeGuideCTA } from "@/components/FreeGuideCTA";
import heroImg from "@/assets/hero.jpg";

const services = [
  { icon: TrendingUp, title: "Digital Marketing", desc: "Full-funnel growth strategies that drive real ROI.", to: "/services/digital-marketing" },
  { icon: Search, title: "SEO Services", desc: "Rank higher on Google and capture organic traffic.", to: "/services/seo-services" },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Build community and convert followers into customers.", to: "/services/social-media-marketing" },
  { icon: MousePointerClick, title: "Google Ads", desc: "High-intent traffic with optimized PPC campaigns.", to: "/services/google-ads" },
  { icon: Code, title: "Web Development", desc: "Fast, modern websites built to convert.", to: "/services/web-development" },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Scalable online stores that sell 24/7.", to: "/services/ecommerce-development" },
  { icon: Smartphone, title: "App Development", desc: "Native and cross-platform mobile apps.", to: "/services/app-development" },
  { icon: Palette, title: "Branding & Design", desc: "Identities that stand out and resonate.", to: "/services/branding-design" },
];

const stats = [
  { v: 150, suffix: "+", l: "Projects Delivered" },
  { v: 80, suffix: "+", l: "Happy Clients" },
  { v: 3, suffix: "+", l: "Years of Excellence" },
  { v: 98, suffix: "%", l: "Client Satisfaction" },
];

const testimonials = [
  { name: "Ali Hassan", role: "CEO, TechVista", quote: "AM Enterprises rebuilt our funnel and tripled our qualified leads in 90 days. Truly results-driven." },
  { name: "Sarah Khan", role: "Founder, GlowCart", quote: "Our e-commerce sales jumped 4x after their SEO and ads strategy. Best decision we made." },
  { name: "Bilal Ahmed", role: "Director, NovaCorp", quote: "Beautiful website, fast delivery, and excellent ongoing support. Highly recommended." },
];

const SectionTitle = ({ tag, title, desc }: { tag: string; title: string; desc?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center max-w-2xl mx-auto mb-14"
  >
    <span className="text-sm font-semibold text-accent uppercase tracking-wider">{tag}</span>
    <h2 className="text-3xl md:text-5xl mt-3 mb-4">{title}</h2>
    {desc && <p className="text-muted-foreground">{desc}</p>}
  </motion.div>
);

const Index = () => {
  const { data: settings } = useSiteSettings();
  const { data: dbStats } = useRealtimeTable<any>({ table: "stats_counters", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const { data: dbTestimonials } = useRealtimeTable<any>({ table: "testimonials", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 3 });
  const { data: dbServices } = useRealtimeTable<any>({ table: "services", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 8 });
  const liveStats = dbStats && dbStats.length ? dbStats.map((s: any) => ({ v: Number(s.value), suffix: s.suffix || "", l: s.label })) : stats;
  const liveTestimonials = dbTestimonials && dbTestimonials.length ? dbTestimonials : testimonials;
  const liveServices = dbServices && dbServices.length ? dbServices.map((s: any) => ({ icon: TrendingUp, title: s.title, desc: s.description, to: `/services/${s.slug}` })) : services;
  const lines = (settings?.hero_typewriter_lines as string[] | undefined)?.length
    ? (settings!.hero_typewriter_lines as string[])
    : ["Smart Digital Solutions", "AI-Powered Growth", "Modern Web Experiences", "Performance Marketing"];
  return (
  <PageLayout
    title="AM Enterprises — Digital Marketing & Software Agency Pakistan"
    description="Grow your business with smart digital solutions. SEO, web development, social media marketing & app development from Islamabad's leading agency."
    canonical="/"
    primaryKeyword="digital marketing agency Pakistan"
  >
    {/* 1. Hero */}
    <section className="relative overflow-hidden gradient-hero">
      <img src={heroImg} alt="AM Enterprises digital marketing agency in Pakistan" width={1920} height={1280} className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none" />
      <div className="relative container mx-auto py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur text-sm font-medium mb-6 text-primary border border-primary/20 shadow-card">🚀 AI-Powered Digital Agency</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            Grow Your Business With <br />
            <Typewriter words={lines} className="text-gradient" />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            We help ambitious brands scale through SEO, performance marketing, custom software, and AI-driven growth systems.
          </p>
          <div className="mb-5"><LiveVisitors /></div>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl"><a href="tel:03173712950">Call Now: 0317-3712950</a></Button>
            <Button asChild size="xl" variant="outline"><Link to="/contact">Get Free Consultation <ArrowRight className="ml-1" /></Link></Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-foreground/80">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> 150+ Projects</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> 5★ Rated</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> ROI Focused</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="hidden lg:block">
          <Card className="p-8 bg-white/80 backdrop-blur-lg border-2 border-white shadow-elegant">
            <h3 className="text-2xl font-bold mb-4">Get a Free Strategy Call</h3>
            <p className="text-muted-foreground mb-6 text-sm">Tell us about your goals — we'll send a tailored growth plan in 24 hours.</p>
            <form className="space-y-3">
              <Input placeholder="Your Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" />
              <Textarea placeholder="What do you need help with?" />
              <Button variant="hero" size="lg" className="w-full">Request Free Consultation</Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>

    {/* 2. Press strip */}
    <PressStrip />

    {/* 3. Client logos marquee */}
    <ClientMarquee />

    {/* 4. Stats */}
    <section className="py-16 border-b border-border">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {liveStats.map((s: any, i: number) => (
          <motion.div key={s.l} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-gradient">
              <AnimatedCounter value={s.v} suffix={s.suffix} />
            </div>
            <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* 5. About */}
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">About Us</span>
          <h2 className="text-3xl md:text-5xl mt-3 mb-6">A growth partner you can trust</h2>
          <p className="text-muted-foreground mb-4">Founded in 2022 by <strong>Moez Rehman</strong>, AM Enterprises is a full-service digital agency headquartered in Islamabad with a tech hub at Rawat Technology Park.</p>
          <p className="text-muted-foreground mb-6">We blend strategy, creativity, and engineering to help brands win online — whether you need leads, sales, or a full digital transformation.</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[{ icon: Users, t: "Expert Team" }, { icon: Award, t: "Award-Winning Work" }, { icon: Zap, t: "Fast Delivery" }, { icon: Star, t: "Top-Rated Service" }].map((i) => (
              <div key={i.t} className="flex items-center gap-3"><i.icon className="w-5 h-5 text-primary" /><span className="font-medium">{i.t}</span></div>
            ))}
          </div>
          <Button asChild variant="hero"><Link to="/about">Learn More About Us <ArrowRight /></Link></Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card className="p-8 shadow-elegant bg-white">
            <blockquote className="text-xl font-medium leading-relaxed">"Our mission is simple — make world-class digital growth accessible to every Pakistani business."</blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-bold">MR</div>
              <div>
                <div className="font-semibold">Moez Rehman</div>
                <div className="text-sm text-muted-foreground">Founder & CEO</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>

    {/* 6. Services */}
    <section className="py-24">
      <div className="container mx-auto">
        <SectionTitle tag="Our Services" title="Everything you need to scale" desc="From strategy to execution — one team, full stack of digital growth services." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveServices.map((s: any, i: number) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
              <Link to={s.to}>
                <Card className="p-6 h-full hover:shadow-elegant hover:-translate-y-2 transition-smooth group bg-white">
                  <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-smooth">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">Learn more <ArrowRight className="w-4 h-4" /></span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 7. NEW — Industries we serve */}
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <SectionTitle tag="Industries" title="Industries we serve" desc="Specialized growth playbooks for every sector." />
        <IndustriesGrid />
      </div>
    </section>

    {/* 8. Why Choose Us */}
    <section className="py-24">
      <div className="container mx-auto">
        <SectionTitle tag="Why Choose Us" title="Built for serious growth" desc="Six reasons brands across Pakistan & beyond trust AM Enterprises." />
        <FeatureGrid />
      </div>
    </section>

    {/* 9. AI Automation showcase */}
    <AIAutomationShowcase />

    {/* 10. NEW — Tech stack */}
    <section className="py-20">
      <div className="container mx-auto">
        <SectionTitle tag="Technology" title="Powered by world-class tech" desc="We build with tools trusted by global teams." />
        <TechStackStrip />
      </div>
    </section>

    {/* 11. Process */}
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto">
        <SectionTitle tag="Our Process" title="How we deliver results" desc="A proven 4-step framework that has scaled 150+ businesses." />
        <ProcessTimeline />
      </div>
    </section>

    {/* 12. Case study highlights */}
    <section className="py-20">
      <div className="container mx-auto">
        <SectionTitle tag="Results" title="Real results, real growth" desc="Numbers don't lie — here's what we've delivered for clients." />
        <CaseStudyHighlights />
      </div>
    </section>

    {/* 13. Compare table */}
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle tag="Why AM" title="See how we compare" desc="The honest difference between AM Enterprises and the alternatives." />
        <CompareTable />
      </div>
    </section>

    {/* 14. Pricing */}
    <section className="py-24">
      <div className="container mx-auto">
        <SectionTitle tag="Pricing" title="Transparent plans for every stage" desc="Pick a tier that matches your goals — upgrade anytime." />
        <PricingTiers />
      </div>
    </section>

    {/* 15. NEW — Guarantee banner */}
    <section className="py-12 bg-secondary/40">
      <div className="container mx-auto"><GuaranteeBanner /></div>
    </section>

    {/* 16. Team */}
    <section className="py-24">
      <div className="container mx-auto">
        <SectionTitle tag="Our Team" title="Meet the people behind AM Enterprises" desc="A passionate team of strategists, engineers, designers and growth specialists." />
        <TeamSection />
      </div>
    </section>

    {/* 17. Testimonials */}
    <section className="py-24 bg-secondary/40">
      <div className="container mx-auto">
        <SectionTitle tag="Testimonials" title="Loved by growing brands" />
        <div className="grid md:grid-cols-3 gap-6">
          {liveTestimonials.map((t: any, i: number) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Card className="p-6 shadow-card bg-white h-full">
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}</div>
                <p className="text-foreground mb-5">"{t.quote}"</p>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 18. Video testimonials */}
    <section className="py-20">
      <div className="container mx-auto">
        <SectionTitle tag="Video Stories" title="Hear from our clients" desc="Real founders sharing how AM Enterprises helped them scale." />
        <VideoTestimonial />
      </div>
    </section>

    {/* 19. ROI Calculator */}
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto max-w-4xl">
        <SectionTitle tag="Calculator" title="See your growth potential" desc="Estimate the revenue lift you could achieve with our strategy." />
        <ROICalculator />
      </div>
    </section>

    {/* 20. Free SEO Audit lead magnet */}
    <section className="py-20">
      <div className="container mx-auto max-w-5xl"><FreeSEOAudit /></div>
    </section>

    {/* 21. NEW — Free guide download */}
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto max-w-5xl"><FreeGuideCTA /></div>
    </section>

    {/* 22. Quiz */}
    <section className="py-24">
      <div className="container mx-auto max-w-3xl">
        <SectionTitle tag="Find Your Fit" title="Take the 30-second growth quiz" desc="Answer 4 quick questions and get a personalized recommendation instantly." />
        <InteractiveQuiz />
      </div>
    </section>

    {/* 23. Awards & trust */}
    <AwardsStrip />
    <section className="py-12">
      <div className="container mx-auto"><TrustBadges /></div>
    </section>

    {/* 24. NEW — Blog preview */}
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto">
        <SectionTitle tag="Insights" title="Latest from our blog" desc="Tips, guides and case studies to help you grow." />
        <BlogPreview />
      </div>
    </section>

    {/* 25. Appointment */}
    <section className="py-20">
      <div className="container mx-auto max-w-3xl">
        <SectionTitle tag="Book Now" title="Reserve your free strategy call" desc="Pick a slot — we'll handle the rest." />
        <AppointmentWidget />
      </div>
    </section>

    {/* 26. NEW — Quick contact cards */}
    <section className="py-16 bg-secondary/40">
      <div className="container mx-auto">
        <SectionTitle tag="Get in Touch" title="Reach us your way" desc="Pick the channel that works best for you." />
        <QuickContactCards />
      </div>
    </section>

    {/* 27. FAQ */}
    <section className="py-24">
      <div className="container mx-auto max-w-3xl">
        <SectionTitle tag="FAQ" title="Frequently asked questions" />
        <FAQAccordion />
      </div>
    </section>

    {/* 28. Newsletter */}
    <section className="py-12 bg-secondary/40">
      <div className="container mx-auto max-w-4xl">
        <NewsletterSignup />
      </div>
    </section>

    {/* 29. Final CTA */}
    <section className="py-20">
      <div className="container mx-auto">
        <Card className="p-10 md:p-16 gradient-primary text-white text-center shadow-elegant border-0">
          <h2 className="text-3xl md:text-5xl mb-4">Ready to grow your business?</h2>
          <p className="opacity-95 mb-8 max-w-2xl mx-auto">Book a free 30-minute strategy call. We'll audit your current funnel and show you exactly where the growth is hiding.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="accent" size="xl"><Link to="/contact">Get Free Consultation</Link></Button>
            <Button asChild size="xl" variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20"><a href="tel:03173712950">Call 0317-3712950</a></Button>
          </div>
        </Card>
      </div>
    </section>
  </PageLayout>
  );
};

export default Index;
