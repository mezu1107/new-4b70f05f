import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const SWATCHES = ["#0F172A", "#1E40AF", "#2563EB", "#7C3AED", "#DB2777", "#DC2626", "#F59E0B", "#10B981", "#FFFFFF"];

const ColorPick = ({ label, value, onChange, help }: { label: string; value: string; onChange: (v: string) => void; help?: string }) => (
  <div>
    <Label className="font-semibold">{label}</Label>
    {help && <div className="text-xs text-muted-foreground mb-1.5">{help}</div>}
    <div className="flex gap-2 items-center">
      <input type="color" value={value || "#000000"} onChange={(e) => onChange(e.target.value)} className="w-12 h-10 rounded border border-border cursor-pointer" />
      <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="#0F172A or hsl(...)" className="flex-1" />
      {value && <Button variant="ghost" size="sm" onClick={() => onChange("")}>Reset</Button>}
    </div>
    <div className="flex gap-1.5 mt-2">
      {SWATCHES.map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)} style={{ background: s }} className="w-7 h-7 rounded border-2 border-border hover:scale-110 transition-transform" aria-label={s} />
      ))}
    </div>
  </div>
);

const ThemeColorsAdmin = () => {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site_settings_admin"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).maybeSingle()).data,
  });
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("site_settings").update({
        hero_heading_color: form.hero_heading_color || null,
        header_text_color: form.header_text_color || null,
        footer_text_color: form.footer_text_color || null,
        theme_primary_color: form.theme_primary_color || null,
        theme_accent_color: form.theme_accent_color || null,
      }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      qc.invalidateQueries({ queryKey: ["site_settings_admin"] });
      toast.success("Colors saved — live on site instantly");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-1">Theme Colors</h1>
      <p className="text-muted-foreground mb-6">Customize hero heading, header, and footer text colors. Saves instantly to the public site.</p>

      <Card className="p-6 space-y-6">
        <ColorPick label="Hero Heading Color" value={form.hero_heading_color} onChange={(v) => set("hero_heading_color", v)} help="Big H1 heading on the homepage hero." />
        <ColorPick label="Header Text Color" value={form.header_text_color} onChange={(v) => set("header_text_color", v)} help="Site name & tagline in the top nav." />
        <ColorPick label="Footer Text Color" value={form.footer_text_color} onChange={(v) => set("footer_text_color", v)} help="All text in the footer." />
        <Button size="lg" variant="hero" onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : "Save Colors"}
        </Button>
      </Card>
    </div>
  );
};
export default ThemeColorsAdmin;
