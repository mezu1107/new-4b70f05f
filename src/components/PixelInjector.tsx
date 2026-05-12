import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/**
 * Single source of truth for ALL marketing pixels + theme color overrides.
 * Replaces MetaPixel; injects Meta, GA4, GTM, TikTok, LinkedIn from admin settings.
 * Also writes CSS variables and overrides for header/footer/hero text colors.
 */
export const PixelInjector = () => {
  const { data } = useSiteSettings();

  // Meta Pixel
  useEffect(() => {
    const id = data?.meta_pixel_id;
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
    const id = data?.google_analytics_id;
    if (!id || document.getElementById("ga4-script")) return;
    const s = document.createElement("script");
    s.id = "ga4-script"; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
    const inline = document.createElement("script");
    inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`;
    document.head.appendChild(inline);
  }, [data?.google_analytics_id]);

  // GTM
  useEffect(() => {
    const id = data?.google_tag_manager_id;
    if (!id || document.getElementById("gtm-script")) return;
    const s = document.createElement("script");
    s.id = "gtm-script";
    s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
    document.head.appendChild(s);
  }, [data?.google_tag_manager_id]);

  // TikTok
  useEffect(() => {
    const id = data?.tiktok_pixel_id;
    if (!id || (window as any).ttq) return;
    /* eslint-disable */
    !(function (w: any, d: any, t: any) {
      w.TiktokAnalyticsObject = t; const ttq = (w[t] = w[t] || []);
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      ttq.setAndDefer = function (e: any, n: any) { e[n] = function () { e.push([n].concat(Array.prototype.slice.call(arguments, 0))) } };
      for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (e: any) { const n = ttq._i[e] || []; for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(n, ttq.methods[i]); return n };
      ttq.load = function (e: any) {
        const n = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = n; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = {};
        const o = d.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = n + "?sdkid=" + e + "&lib=" + t;
        const a = d.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a);
      };
      ttq.load(id); ttq.page();
    })(window, document, "ttq");
    /* eslint-enable */
  }, [data?.tiktok_pixel_id]);

  // LinkedIn Insight
  useEffect(() => {
    const id = data?.linkedin_insight_id;
    if (!id || (window as any)._linkedin_data_partner_ids) return;
    (window as any)._linkedin_partner_id = id;
    (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
    (window as any)._linkedin_data_partner_ids.push(id);
    const s = document.createElement("script");
    s.async = true; s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(s);
  }, [data?.linkedin_insight_id]);

  // Theme colors → CSS variables + targeted overrides
  useEffect(() => {
    if (!data) return;
    const styleId = "am-theme-overrides";
    let el = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      document.head.appendChild(el);
    }
    const css = `
      ${data.header_text_color ? `header [data-header-text], header [data-header-text] * { color: ${data.header_text_color} !important; }` : ""}
      ${data.footer_text_color ? `footer, footer * { color: ${data.footer_text_color}; }` : ""}
      ${data.hero_heading_color ? `[data-hero-heading], [data-hero-heading] * { color: ${data.hero_heading_color} !important; }` : ""}
    `;
    el.innerHTML = css;
  }, [data?.header_text_color, data?.footer_text_color, data?.hero_heading_color]);

  return null;
};
