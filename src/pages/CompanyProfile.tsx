import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Building2, Globe, Users, Briefcase, Target, Shield, TrendingUp, Download } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const CompanyProfile = () => {
  const { data: stats } = useRealtimeTable<any>({ table: "stats_counters", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const { data: clients } = useRealtimeTable<any>({ table: "clients", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });

  const facts = [
    { icon: Building2, label: "Founded", value: "2022" },
    { icon: Globe, label: "Markets Served", value: "USA · Canada · PK" },
    { icon: Users, label: "Team Size", value: `${(clients?.length || 8) + 10}+` },
    { icon: Briefcase, label: "Projects Delivered", value: "150+" },
    { icon: Target, label: "Avg Client ROI", value: "4.2x" },
    { icon: Shield, label: "Retention Rate", value: "92%" },
  ];

  return (
    <PageLayout title="Company Profile — AM Enterprises" description="Official company profile of AM Enterprises — credentials, capabilities, leadership and global reach." canonical="/about/company-profile" primaryKeyword="AM Enterprises company profile">
      <PageHero title="Company Profile" subtitle="Credentials, capabilities, and the team that delivers." />

      <section className="py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {facts.map((f) => (
              <Card key={f.label} className="p-6">
                <f.icon className="w-7 h-7 text-primary mb-2" />
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
                <div className="text-2xl font-extrabold mt-1">{f.value}</div>
              </Card>
            ))}
          </div>

          <Card className="p-8 mb-10">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Award className="w-6 h-6 text-primary" /> Executive Summary</h2>
            <p className="text-muted-foreground mb-3">AM Enterprises is a performance-driven AI marketing and software agency headquartered in Islamabad, Pakistan, serving SMBs and enterprise clients across the United States and Canada. We combine paid media expertise with proprietary AI automation to deliver measurable, repeatable growth.</p>
            <p className="text-muted-foreground">Our offerings span Google &amp; Meta Ads management, technical SEO, conversion-optimized web development, CRM &amp; marketing automation, and bespoke AI integrations.</p>
          </Card>

          <Card className="p-8 mb-10">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-primary" /> Core Capabilities</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["Google Ads Management", "Meta / Facebook & Instagram Ads", "Search Engine Optimization (SEO)", "Conversion-focused Web Development", "CRM Setup & Automation", "AI Chatbots & Lead Qualification", "Email & SMS Marketing", "Analytics, Pixel & Attribution"].map((c) => (
                <li key={c} className="flex gap-2"><span className="text-primary">✓</span> {c}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 mb-10">
            <h2 className="text-2xl font-bold mb-3">Leadership</h2>
            <p className="text-muted-foreground">Founded by <strong>Moez Rehman (CEO)</strong> and led alongside <strong>Ayesha Moez (Director &amp; CCO)</strong>, with a senior delivery team covering engineering, paid media, SEO and creative.</p>
          </Card>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="gradient-cta text-primary-foreground"><Link to="/contact">Request Full Profile (PDF)</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/team">Meet the Team</Link></Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
export default CompanyProfile;
