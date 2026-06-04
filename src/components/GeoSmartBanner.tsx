import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Clock, Phone } from "lucide-react";
import { useGeo } from "@/hooks/useGeo";
import { getRegion } from "@/data/regions";

/**
 * Auto-detects visitor country via IP and renders a localized greeting
 * with region-specific phone, hours and CTA. Sits at top of homepage hero.
 */
export const GeoSmartBanner = () => {
  const geo = useGeo();
  if (geo.loading) {
    return (
      <div className="h-10 w-72 rounded-full bg-secondary/60 animate-pulse mb-5" aria-hidden />
    );
  }
  const region = getRegion(geo.country || "US");
  const city = geo.city && geo.city.length > 1 ? geo.city : region.cities[0];
  const regionPath = `/${region.code.toLowerCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm pl-2 pr-1 py-1 text-xs md:text-sm hover-lift"
    >
      <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
        <span className="text-base leading-none">{region.flag}</span>
        <MapPin className="w-3.5 h-3.5 text-primary" />
        Hi {city}!
      </span>
      <span className="hidden sm:inline-flex items-center gap-1 text-muted-foreground">
        <Clock className="w-3 h-3" /> {region.hours}
      </span>
      <span className="hidden md:inline-flex items-center gap-1 text-muted-foreground">
        <Phone className="w-3 h-3" /> {region.phone}
      </span>
      <Link
        to={regionPath}
        className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 font-semibold shadow-glow hover:opacity-90 transition-smooth"
      >
        {region.name} site <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
};
