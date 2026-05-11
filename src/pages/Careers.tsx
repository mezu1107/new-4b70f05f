import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Careers = () => {
  const { data } = useRealtimeTable<any>({ table: "job_openings", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const jobs = data ?? [];
  const [selected, setSelected] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const apply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.from("job_applications").insert({
      job_id: selected?.id,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      cover_letter: String(fd.get("cover_letter") || ""),
      resume_url: String(fd.get("resume_url") || ""),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Application submitted!");
    setSelected(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <PageLayout title="Careers — Join AM Enterprises" description="Open roles at AM Enterprises. Build the future of AI and digital growth in Pakistan." canonical="/careers">
      <PageHero title="Careers" subtitle="Help us build the future of AI-powered growth." />
      <section className="py-16">
        <div className="container mx-auto max-w-4xl space-y-4">
          {jobs.length === 0 && <p className="text-center text-muted-foreground">No open positions right now — please check back soon.</p>}
          {jobs.map((j: any) => (
            <Card key={j.id} className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">{j.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                    {j.department && <span className="inline-flex items-center gap-1"><Briefcase className="w-4 h-4" /> {j.department}</span>}
                    {j.location && <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {j.location}</span>}
                    {j.type && <span>· {j.type}</span>}
                    {j.salary_range && <span>· {j.salary_range}</span>}
                  </div>
                </div>
                <Button variant="hero" size="sm" onClick={() => setSelected(j)}>Apply Now</Button>
              </div>
              {j.description && <p className="text-sm text-muted-foreground mt-4 whitespace-pre-line">{j.description}</p>}
              {j.requirements && <p className="text-sm mt-3 whitespace-pre-line"><b>Requirements:</b> {j.requirements}</p>}
            </Card>
          ))}

          {selected && (
            <Card className="p-8 sticky bottom-6 border-2 border-primary">
              <h2 className="text-2xl mb-2">Apply for {selected.title}</h2>
              <form onSubmit={apply} className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Input name="name" required placeholder="Your Name" />
                  <Input name="email" type="email" required placeholder="Email" />
                </div>
                <Input name="phone" placeholder="Phone" />
                <Input name="resume_url" placeholder="Resume URL (Google Drive, Dropbox…)" />
                <Textarea name="cover_letter" placeholder="Cover letter" rows={4} />
                <div className="flex gap-3">
                  <Button type="submit" variant="hero" disabled={busy}>{busy ? "Submitting…" : "Submit Application"}</Button>
                  <Button type="button" variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </section>
    </PageLayout>
  );
};
export default Careers;
