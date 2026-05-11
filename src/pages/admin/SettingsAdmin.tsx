import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/ImageUploader";

const Settings = () => {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["site_settings_admin"], queryFn: async () => {
    const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle(); return data;
  }});
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { id, created_at, updated_at, ...rest } = form;
      // hero typewriter parse if string
      if (typeof rest.hero_typewriter_lines === "string") {
        try { rest.hero_typewriter_lines = JSON.parse(rest.hero_typewriter_lines); }
        catch { rest.hero_typewriter_lines = rest.hero_typewriter_lines.split("\n").map((s: string) => s.trim()).filter(Boolean); }
      }
      const { error } = await supabase.from("site_settings").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["site_settings"] }); qc.invalidateQueries({ queryKey: ["site_settings_admin"] }); toast.success("Settings saved — live on site"); },
    onError: (e: any) => toast.error(e.message),
  });

  const set = (k: string, v: any) => setForm({ ...form, [k]: v });
  const tw = Array.isArray(form.hero_typewriter_lines) ? form.hero_typewriter_lines.join("\n") : (form.hero_typewriter_lines ?? "");

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Site Settings</h1>
      <Card className="p-6 space-y-5">
        <h2 className="text-xl font-semibold">Branding</h2>
        <div><Label>Site Name</Label><Input value={form.site_name ?? ""} onChange={(e) => set("site_name", e.target.value)} /></div>
        <div><Label>Tagline</Label><Input value={form.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} /></div>
        <div>
          <Label>Site Logo (upload or URL — appears site-wide instantly)</Label>
          <ImageUploader value={form.logo_url} onChange={(v) => set("logo_url", v)} folder="branding" />
        </div>
        <div>
          <Label>Hero Typewriter Lines (one per line)</Label>
          <Textarea rows={5} value={tw} onChange={(e) => set("hero_typewriter_lines", e.target.value)} />
        </div>

        <h2 className="text-xl font-semibold pt-4 border-t">Contact</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Email</Label><Input type="email" value={form.contact_email ?? ""} onChange={(e) => set("contact_email", e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={form.contact_phone ?? ""} onChange={(e) => set("contact_phone", e.target.value)} /></div>
          <div><Label>WhatsApp</Label><Input value={form.whatsapp_number ?? ""} onChange={(e) => set("whatsapp_number", e.target.value)} /></div>
          <div><Label>Address</Label><Input value={form.address ?? ""} onChange={(e) => set("address", e.target.value)} /></div>
        </div>

        <h2 className="text-xl font-semibold pt-4 border-t">Tracking & Pixels</h2>
        <div><Label>Meta Pixel ID</Label><Input value={form.meta_pixel_id ?? ""} onChange={(e) => set("meta_pixel_id", e.target.value)} placeholder="e.g. 1234567890123456" /></div>
        <div><Label>Google Analytics ID</Label><Input value={form.google_analytics_id ?? ""} onChange={(e) => set("google_analytics_id", e.target.value)} placeholder="G-XXXXXXX" /></div>

        <h2 className="text-xl font-semibold pt-4 border-t">Social Links</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Facebook</Label><Input value={form.facebook_url ?? ""} onChange={(e) => set("facebook_url", e.target.value)} /></div>
          <div><Label>Instagram</Label><Input value={form.instagram_url ?? ""} onChange={(e) => set("instagram_url", e.target.value)} /></div>
          <div><Label>LinkedIn</Label><Input value={form.linkedin_url ?? ""} onChange={(e) => set("linkedin_url", e.target.value)} /></div>
          <div><Label>YouTube</Label><Input value={form.youtube_url ?? ""} onChange={(e) => set("youtube_url", e.target.value)} /></div>
        </div>

        <Button variant="hero" size="lg" onClick={() => save.mutate()} disabled={save.isPending}>Save Settings</Button>
      </Card>
    </div>
  );
};
export default Settings;
