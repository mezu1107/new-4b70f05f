import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, MapPin, Phone, Clock, Sparkles, Star, Shield } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppointmentWidget } from "@/components/AppointmentWidget";
import { ClientMarquee } from "@/components/ClientMarquee";
import { CaseStudyHighlights } from "@/components/CaseStudyHighlights";
import { ROICalculator } from "@/components/ROICalculator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TeamSection } from "@/components/TeamSection";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { getRegion, formatRegionPrice, SUPPORTED_REGION_CODES } from "@/data/regions";
import { setGeoOverride } from "@/hooks/useGeo";

const PRICE_TIERS = [
  { name: "Starter", usd: 499, features: ["SEO Audit & On-page", "Local listings setup", "Monthly reporting", "Email support"] },
  { name: "Growth", usd: 1499, popular: true, features: ["Everything in Starter", "AI content + automation", "Paid ads management", "Conversion optimization", "Priority support"] },
  { name: "Scale", usd: 3999, features: ["Everything in Growth", "Dedicated strategist", "Custom AI agents", "Full-funnel analytics", "24/7 support"] },
];

export default function GeoLanding() {
  const { country } = useParams<{ country: string }>();
  const code = (country || "").toUpperCase();

  if (!SUPPORTED_REGION_CODES.includes(code) && code !== "UK") {
    return <NotFound />;
  }

  const region = getRegion(code);

  useEffect(() => {
    setGeoOverride(region.code);
  }, [region.code]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `AM Enterprises ${region.name}`,
    description: region.metaDescription,
    address: { "@type": "PostalAddress", addressCountry: region.schemaCountry },
    areaServed: region.cities.map((c) => ({ "@type": "City", name: c })),
    telephone: region.phone,
    priceRange: `${region.currencySymbol}${formatRegionPrice(499, region).replace(region.currencySymbol, "")}+`,
  };

  return (
    <PageLayout
      title={region.metaTitle}
      description={region.metaDescription}
      canonical={`/${region.code.toLowerCase()}`}
      primaryKeyword={`AI marketing agency ${region.name}`}
    >
      <Helmet>
        <link rel="canonical" href={`https://amadmin.lovable.app/${region.code.toLowerCase()}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Geo banner */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-xl leading-none">{region.flag}</span>
            <span className="font-medium">Serving {region.name}</span>
            <span className="text-muted-foreground hidden sm:inline">· {region.trustSignal}</span>
          </div>
          <CountrySwitcher compact />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero border-b border-border">
        <div className="container mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-4 gap-1.5">
              <Sparkles className="w-3 h-3" /> {region.flag} {region.name} Edition
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-5">
              {region.heroHeadline}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl">{region.heroSubheadline}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Button asChild size="lg" className="gradient-cta text-primary-foreground shadow-glow">
                <a href="#book"><Calendar className="w-4 h-4 mr-2" />{region.cta}</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/case-studies">See Case Studies <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Phone className="w-4 h-4 text-primary" />{region.phone}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{region.hours}</span>
              <span className="inline-flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" />Local support</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} id="book">
            <AppointmentWidget />
          </motion.div>
        </div>
      </section>

      {/* Cities served */}
      <section className="py-10 border-b border-border bg-card/30">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-semibold mr-2">Serving:</span>
            {region.cities.map((c) => (
              <Badge key={c} variant="secondary" className="text-sm">{c}</Badge>
            ))}
          </div>
        </div>
      </section>

      <ClientMarquee />

      {/* Why us — regional */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl mb-3">Why {region.name} Brands Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{region.trustSignal}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: MapPin, t: `${region.timezone} Timezone Support`, d: `Real humans available during ${region.hours}.` },
              { icon: Shield, t: "Local Compliance", d: `Fully compliant with ${region.name} data & privacy laws.` },
              { icon: Star, t: `${region.currency} Transparent Pricing`, d: `Quotes in ${region.currency} — no FX surprises.` },
            ].map((f, i) => (
              <Card key={i} className="p-6 hover:shadow-elegant transition-smooth">
                <f.icon className="w-10 h-10 text-primary mb-3" />
                <div className="font-semibold mb-1">{f.t}</div>
                <div className="text-sm text-muted-foreground">{f.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyHighlights />

      {/* Localized Pricing */}
      <section className="py-16 md:py-20 border-b border-border bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-3">{region.currency} Pricing</Badge>
            <h2 className="font-display text-3xl md:text-4xl mb-3">Plans for {region.name}</h2>
            <p className="text-muted-foreground">All prices in {region.currency}. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PRICE_TIERS.map((t) => (
              <Card key={t.name} className={`p-7 relative ${t.popular ? "border-primary shadow-glow" : ""}`}>
                {t.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-cta text-primary-foreground">Most Popular</Badge>}
                <div className="text-sm font-semibold text-muted-foreground mb-2">{t.name}</div>
                <div className="text-4xl font-bold mb-1">{formatRegionPrice(t.usd, region)}</div>
                <div className="text-sm text-muted-foreground mb-5">per month</div>
                <ul className="space-y-2 mb-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${t.popular ? "gradient-cta text-primary-foreground" : ""}`} variant={t.popular ? "default" : "outline"}>
                  <a href="#book">Get Started</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ROICalculator />
      <TeamSection />
      <FAQAccordion />

      {/* Final CTA */}
      <section className="py-16 md:py-20 gradient-hero border-t border-border">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl mb-4">Ready to grow your {region.name} business?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">Book a free 30-min strategy call. We'll audit your funnel and show you exactly where to win.</p>
          <Button asChild size="lg" className="gradient-cta text-primary-foreground shadow-glow">
            <a href="#book"><Calendar className="w-4 h-4 mr-2" />{region.cta}</a>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
