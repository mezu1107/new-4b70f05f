import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem("cookie-consent")) setShow(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  const accept = () => { localStorage.setItem("cookie-consent", "1"); setShow(false); };
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white border border-border rounded-2xl shadow-elegant p-4 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-sm text-foreground mb-3">We use cookies to improve your experience and analyze traffic. By clicking Accept, you agree to our cookie policy.</p>
          <div className="flex gap-2">
            <Button size="sm" variant="hero" onClick={accept}>Accept All</Button>
            <Button size="sm" variant="outline" onClick={() => setShow(false)}>Decline</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
