import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeo, getGeoOverride, setGeoOverride } from "@/hooks/useGeo";
import { getRegion, SUPPORTED_REGION_CODES } from "@/data/regions";

const DISMISS_KEY = "geo_redirect_dismissed_v1";

/**
 * Soft geo redirect: shows a banner suggesting the user's local landing page.
 * Never auto-redirects (preserves UX + SEO); user controls.
 */
export const GeoRedirect = () => {
  const geo = useGeo();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [region, setRegion] = useState(getRegion("US"));

  useEffect(() => {
    if (geo.loading || !geo.country) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    if (getGeoOverride()) return;
    // Only suggest on home page
    if (location.pathname !== "/") return;
    const code = geo.country === "UK" ? "GB" : geo.country;
    if (!SUPPORTED_REGION_CODES.includes(code)) return;
    setRegion(getRegion(code));
    setShow(true);
  }, [geo.loading, geo.country, location.pathname]);

  if (!show) return null;

  const goLocal = () => {
    setGeoOverride(region.code);
    sessionStorage.setItem(DISMISS_KEY, "1");
    navigate(`/${region.code.toLowerCase()}`);
  };
  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-sm bg-background border border-border rounded-xl shadow-elegant p-4 animate-fade-in">
      <button onClick={dismiss} aria-label="Close" className="absolute top-2 right-2 p-1 rounded hover:bg-secondary">
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-start gap-3">
        <div className="text-3xl leading-none">{region.flag}</div>
        <div className="flex-1">
          <div className="font-semibold text-sm mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary" /> Visiting from {region.name}?
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            See pricing in {region.currency} and content tailored for {region.name}.
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={goLocal} className="gradient-cta text-primary-foreground">
              View {region.name} Site
            </Button>
            <Button size="sm" variant="ghost" onClick={dismiss}>No thanks</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
