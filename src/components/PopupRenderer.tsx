import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const PopupRenderer = () => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["popup_active"],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data } = await supabase.from("popups").select("*").eq("is_active", true)
        .or(`start_at.is.null,start_at.lte.${now}`).order("created_at", { ascending: false }).limit(5);
      const list = (data ?? []).filter((p: any) => !p.end_at || p.end_at >= now);
      return list[0] ?? null;
    },
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (!data) return;
    const dismissed = sessionStorage.getItem(`popup-${data.id}`);
    if (!dismissed) setOpen(true);
  }, [data]);

  if (!data) return null;
  if (data.type === "banner") {
    if (!open) return null;
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-center gap-4 shadow-elegant">
        <span className="font-semibold">{data.title}</span>
        {data.cta_text && data.cta_url && (
          <Button size="sm" variant="accent" asChild><a href={data.cta_url}>{data.cta_text}</a></Button>
        )}
        <button onClick={() => { sessionStorage.setItem(`popup-${data.id}`, "1"); setOpen(false); }} className="ml-2 hover:opacity-80">✕</button>
      </div>
    );
  }
  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) sessionStorage.setItem(`popup-${data.id}`, "1"); }}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="text-2xl">{data.title}</DialogTitle></DialogHeader>
        {data.image_url && <img src={data.image_url} alt={data.title} className="w-full rounded-lg" />}
        {data.content && <p className="text-muted-foreground">{data.content}</p>}
        {data.cta_text && data.cta_url && (
          <Button asChild variant="hero" size="lg" className="w-full"><a href={data.cta_url}>{data.cta_text}</a></Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
