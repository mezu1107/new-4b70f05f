import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { AppointmentWidget } from "./AppointmentWidget";

const STORAGE_KEY = "am_smart_booking_shown_v1";
const SCROLL_TRIGGER = 0.55;     // 55% of page
const TIME_TRIGGER_MS = 60_000;  // 60 seconds
const DELAY_AFTER_LOAD = 8_000;  // never popup in first 8s

/**
 * Smart booking popup — auto-opens after EITHER:
 *  - user scrolls past 55% of page, OR
 *  - user spends > 60s on site
 * Once per session. Closeable. Pauses on /admin and /auth.
 */
export const SmartBookingPopup = () => {
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const path = window.location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/auth")) return;

    const armTimer = setTimeout(() => setArmed(true), DELAY_AFTER_LOAD);
    return () => clearTimeout(armTimer);
  }, []);

  useEffect(() => {
    if (!armed || open) return;

    const trigger = () => {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= SCROLL_TRIGGER) trigger();
    };

    const timeTimer = setTimeout(trigger, TIME_TRIGGER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timeTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [armed, open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-elegant animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close popup"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-muted transition-smooth"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="bg-background">
          <div className="gradient-cta text-primary-foreground px-6 py-4 flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            <div>
              <div className="font-bold text-base">Before you go — claim your free strategy call</div>
              <div className="text-xs opacity-90">30 minutes · Senior strategist · No obligation</div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <AppointmentWidget />
          </div>
        </div>
      </div>
    </div>
  );
};
