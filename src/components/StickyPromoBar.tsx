import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const StickyPromoBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("am_promo_dismiss") !== "1") setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="relative z-30 gradient-primary text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-center">
        <Zap className="w-4 h-4 shrink-0 hidden sm:inline" />
        <span>🎉 <strong>Limited Offer:</strong> 20% OFF on all SEO packages this month. <Link to="/pricing" className="underline font-semibold">Claim now</Link></span>
        <button
          aria-label="Close"
          onClick={() => { setShow(false); sessionStorage.setItem("am_promo_dismiss", "1"); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
