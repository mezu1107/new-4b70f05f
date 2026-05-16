import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const MetaPixel = () => {
  const { data } = useSiteSettings();
  const pixelId = data?.meta_pixel_id;

  useEffect(() => {
    if (!pixelId || typeof window === "undefined") return;
    if ((window as any).fbq) return;
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    (window as any).fbq("init", pixelId);
    (window as any).fbq("track", "PageView");
    /* eslint-enable */
  }, [pixelId]);

  return null;
};
