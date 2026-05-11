import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export const LiveVisitors = () => {
  const [count, setCount] = useState(() => 18 + Math.floor(Math.random() * 12));
  useEffect(() => {
    const t = setInterval(() => setCount((c) => Math.max(8, Math.min(48, c + (Math.random() > 0.5 ? 1 : -1)))), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-card text-xs font-medium">
      <span className="relative flex w-2 h-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span></span>
      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-foreground">{count} people viewing now</span>
    </div>
  );
};
