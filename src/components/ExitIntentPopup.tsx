import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift } from "lucide-react";
import { toast } from "sonner";

export const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("exit-shown")) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) { setOpen(true); sessionStorage.setItem("exit-shown", "1"); document.removeEventListener("mouseout", onLeave); }
    };
    const t = setTimeout(() => document.addEventListener("mouseout", onLeave), 8000);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", onLeave); };
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-14 h-14 rounded-full gradient-primary text-white flex items-center justify-center mx-auto mb-3"><Gift className="w-7 h-7" /></div>
          <DialogTitle className="text-2xl text-center">Wait! Get 20% off your first project</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-center text-sm">Drop your email and we'll send your discount code instantly.</p>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Discount sent! Check your inbox."); setOpen(false); }} className="space-y-3">
          <Input type="email" placeholder="your@email.com" required />
          <Button type="submit" variant="hero" className="w-full">Claim My 20% Discount</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
