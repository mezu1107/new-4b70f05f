import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fallback = [
  { name: "Moez Rehman", role: "Founder & CEO", initials: "MR", bio: "Visionary leader driving growth strategy and client success across all verticals." },
  { name: "Ayesha Moez", role: "Co-Founder, Director & CCO", initials: "AM", bio: "Chief Creative Officer overseeing brand, creative direction and operational excellence." },
  { name: "Faizan Ali", role: "Project Manager & Senior MERN Developer", initials: "FA", bio: "Leads delivery and full-stack engineering on enterprise-grade web platforms." },
  { name: "Hujjat Nizami", role: "SEO & WordPress Expert (Meta · Google)", initials: "HN", bio: "Drives organic growth through technical SEO, Meta and Google search optimization." },
  { name: "Shohaib Iqbal", role: "MERN Stack Developer", initials: "SI", bio: "Builds fast, scalable React and Node applications with clean, modular architecture." },
  { name: "Jazib Chohan", role: "Graphics Designer & Shopify Expert", initials: "JC", bio: "Crafts striking visuals and high-converting Shopify storefronts for e-commerce brands." },
  { name: "Zayeha", role: "Sales & HR Lead (CCR)", initials: "ZA", bio: "Heads client relations, recruitment, and ensures every customer interaction shines." },
  { name: "Menahil", role: "YouTube Ads & TikTok Shop Specialist", initials: "ME", bio: "Scales brands on YouTube and TikTok Shop with data-driven creative campaigns." },
];

const TeamCard = ({ m, i, featured = false }: { m: any; i: number; featured?: boolean }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
    <Card className={`p-6 h-full bg-white hover:shadow-elegant hover:-translate-y-1 transition-smooth text-center group ${featured ? "border-2 border-primary/30 shadow-elegant" : ""}`}>
      <div className={`${featured ? "w-28 h-28" : "w-20 h-20"} mx-auto rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-smooth overflow-hidden ${featured ? "text-3xl" : "text-2xl"}`}>
        {m.avatar_url ? <img src={m.avatar_url} alt={m.name} className="w-full h-full object-cover" /> : (m.initials || m.name.split(" ").map((n: string) => n[0]).slice(0, 2).join(""))}
      </div>
      <h3 className={`${featured ? "text-xl" : "text-lg"} font-bold`}>{m.name}</h3>
      <p className="text-sm text-primary font-semibold mt-1">{m.role}</p>
      {m.bio && <p className="text-sm text-muted-foreground mt-3">{m.bio}</p>}
      <div className="flex items-center justify-center gap-3 mt-4 text-muted-foreground">
        {m.linkedin_url && <a href={m.linkedin_url} target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4 hover:text-primary transition-smooth" /></a>}
        {m.email && <a href={`mailto:${m.email}`}><Mail className="w-4 h-4 hover:text-primary transition-smooth" /></a>}
        {!m.linkedin_url && !m.email && <><Linkedin className="w-4 h-4 hover:text-primary transition-smooth cursor-pointer" /><Mail className="w-4 h-4 hover:text-primary transition-smooth cursor-pointer" /></>}
      </div>
    </Card>
  </motion.div>
);

export const TeamSection = ({ leadershipLayout = false }: { leadershipLayout?: boolean }) => {
  const { data } = useQuery({
    queryKey: ["public_team"],
    queryFn: async () => {
      const { data } = await supabase.from("public_team_members" as any).select("*").order("sort_order");
      return data ?? [];
    },
  });
  const team = data && data.length > 0 ? data : fallback;

  if (leadershipLayout) {
    const leaders = team.slice(0, 2);
    const seniors = team.slice(2, 5);
    return (
      <div className="space-y-10">
        {/* Founder + Co-Founder — top row, larger */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {leaders.map((m: any, i: number) => (
            <TeamCard key={m.id ?? m.name} m={m} i={i} featured />
          ))}
        </div>
        {/* Senior team — 3 below */}
        {seniors.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {seniors.map((m: any, i: number) => (
              <TeamCard key={m.id ?? m.name} m={m} i={i + 2} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((m: any, i: number) => (
        <TeamCard key={m.id ?? m.name} m={m} i={i} />
      ))}
    </div>
  );
};
