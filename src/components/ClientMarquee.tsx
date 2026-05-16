import { motion } from "framer-motion";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const fallback = ["TechVista", "GlowCart", "NovaCorp", "PakBazaar", "FinEdge", "EduPro", "SwiftMart", "MediCare+"];

export const ClientMarquee = () => {
  const { data } = useRealtimeTable<any>({ table: "clients", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const list = (data && data.length ? data : fallback.map(name => ({ name }))) as any[];
  return (
    <div className="overflow-hidden py-8 bg-secondary/40">
      <motion.div className="flex gap-16 whitespace-nowrap items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        {[...list, ...list].map((b: any, i: number) => (
          <span key={i} className="text-2xl md:text-3xl font-bold text-muted-foreground/60 hover:text-primary transition-smooth flex items-center gap-3">
            {b.logo_url && <img src={b.logo_url} alt={b.name} className="h-10 w-auto" />}
            {b.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
