import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

const events = [
  { name: "Ali from Lahore", action: "just booked a free strategy call", time: "2 mins ago" },
  { name: "Sarah from Karachi", action: "started an SEO project", time: "5 mins ago" },
  { name: "TechVista", action: "subscribed to our newsletter", time: "8 mins ago" },
  { name: "Bilal from Islamabad", action: "got a custom website quote", time: "12 mins ago" },
  { name: "GlowCart", action: "launched their e-commerce store", time: "20 mins ago" },
  { name: "Hassan from Rawalpindi", action: "requested a Google Ads audit", time: "25 mins ago" },
];

export const SocialProofToast = () => {
  const [idx, setIdx] = useState(-1);
  useEffect(() => {
    let i = 0;
    const showNext = () => { setIdx(i % events.length); i++; setTimeout(() => setIdx(-1), 5000); };
    const t1 = setTimeout(showNext, 6000);
    const t2 = setInterval(showNext, 18000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);
  if (idx < 0) return null;
  const e = events[idx];
  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs bg-white rounded-xl shadow-elegant border border-border p-3 flex items-start gap-3 animate-in slide-in-from-left-5">
      <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 text-sm">
        <div className="font-semibold text-foreground">{e.name}</div>
        <div className="text-muted-foreground">{e.action}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{e.time}</div>
      </div>
      <button onClick={() => setIdx(-1)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
    </div>
  );
};
