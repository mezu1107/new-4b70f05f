import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/**
 * Single source of truth for ALL marketing pixels + theme color overrides.
 * Replaces MetaPixel; injects Meta, GA4, GTM, TikTok, LinkedIn from admin settings.
 * Also writes CSS variables and overrides for header/footer/hero text colors.
 */
// Strict allow-lists. Anything that doesn't match is dropped (prevents stored XSS via compromised admin).
const RE_META = /^\d{6,20}$/;
const RE_GA4 = /^G-[A-Z0-9]{6,20}$/;
const RE_GTM = /^GTM-[A-Z0-9]{4,15}$/;
const RE_TIKTOK = /^[A-Z0-9]{10,40}$/;
const RE_LINKEDIN = /^\d{4,15}$/;
const RE_COLOR = /^(#[0-9a-fA-F]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|[a-zA-Z]{3,20})$/;

const safe = (v: string | null | undefined, re: RegExp) =>
  v && typeof v === "string" && re.test(v.trim()) ? v.trim() : null;

export const PixelInjector = () => {
  const { data } = useSiteSettings();

  // Meta Pixel
  useEffect(() => {
    const id = safe(data?.meta_pixel_id, RE_META);
    if (!id || (window as any).fbq) return;
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    (window as any).fbq("init", id);
    (window as any).fbq("track", "PageView");
    /* eslint-enable */
  }, [data?.meta_pixel_id]);

  // GA4
  useEffect(() => {
    const id = safe(data?.google_analytics_id, RE_GA4);
    if (!id || document.getElementById("ga4-script")) return;
    const s = document.createElement("script");
    s.id = "ga4-script"; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
    const inline = document.createElement("script");
    // id is validated by RE_GA4 (alphanumerics + dash only), safe to interpolate
    inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`;
    document.head.appendChild(inline);
  }, [data?.google_analytics_id]);

  // GTM
  useEffect(() => {
    const id = safe(data?.google_tag_manager_id, RE_GTM);
    if (!id || document.getElementById("gtm-script")) return;
    const s = document.createElement("script");
    s.id = "gtm-script";
    // id validated by RE_GTM
    s.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
    document.head.appendChild(s);
  }, [data?.google_tag_manager_id]);

  // TikTok
  useEffect(() => {
    const id = safe(data?.tiktok_pixel_id, RE_TIKTOK);
    if (!id || (window as any).ttq) return;
    /* eslint-disable */
    (function (w: any, d: any, t: any) {
      w.TiktokAnalyticsObject = t; const ttq = (w[t] = w[t] || []);
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      ttq.setAndDefer = function (e: any, n: any) { e[n] = function () { e.push([n].concat(Array.prototype.slice.call(arguments, 0))) } };
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (e: any) { const n = ttq._i[e] || []; for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(n, ttq.methods[i]); return n };
      ttq.load = function (e: any) {
        const n = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = n; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = {};
        const o = d.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = n + "?sdkid=" + encodeURIComponent(e) + "&lib=" + t;
        const a = d.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a);
      };
      ttq.load(id); ttq.page();
    })(window, document, "ttq");
    /* eslint-enable */
  }, [data?.tiktok_pixel_id]);

  // LinkedIn Insight
  useEffect(() => {
    const id = safe(data?.linkedin_insight_id, RE_LINKEDIN);
    if (!id || (window as any)._linkedin_data_partner_ids) return;
    (window as any)._linkedin_partner_id = id;
    (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
    (window as any)._linkedin_data_partner_ids.push(id);
    const s = document.createElement("script");
    s.async = true; s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(s);
  }, [data?.linkedin_insight_id]);

  // Theme colors — validate via CSSOM (no innerHTML interpolation of free text)
  useEffect(() => {
    if (!data) return;
    const styleId = "am-theme-overrides";
    let el = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      document.head.appendChild(el);
    }
    const header = safe(data.header_text_color, RE_COLOR);
    const footer = safe(data.footer_text_color, RE_COLOR);
    const hero = safe(data.hero_heading_color, RE_COLOR);
    const css = [
      header ? `header [data-header-text], header [data-header-text] * { color: ${header} !important; }` : "",
      footer ? `footer, footer * { color: ${footer}; }` : "",
      hero ? `[data-hero-heading], [data-hero-heading] * { color: ${hero} !important; }` : "",
    ].join("\n");
    el.textContent = css;
  }, [data?.header_text_color, data?.footer_text_color, data?.hero_heading_color]);

  return null;
};
