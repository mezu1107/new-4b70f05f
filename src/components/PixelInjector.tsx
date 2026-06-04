import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/**
 * Single source of truth for ALL marketing pixels, webmaster verifications,
 * heatmap tools, custom HTML, and theme color overrides.
 * Paste an ID in the admin → it instantly goes live on every page.
 */
const RE_META = /^\d{6,20}$/;
const RE_GA4 = /^G-[A-Z0-9]{6,20}$/;
const RE_GTM = /^GTM-[A-Z0-9]{4,15}$/;
const RE_TIKTOK = /^[A-Z0-9_-]{8,40}$/i;
const RE_LINKEDIN = /^\d{4,15}$/;
const RE_PINTEREST = /^\d{10,20}$/;
const RE_SNAP = /^[a-f0-9-]{20,60}$/i;
const RE_TWITTER = /^[a-z0-9]{4,20}$/i;
const RE_HOTJAR = /^\d{4,10}$/;
const RE_CLARITY = /^[a-z0-9]{6,20}$/i;
const RE_VERIFY = /^[A-Za-z0-9_\-=.]{8,200}$/; // search engine verification tokens
const RE_COLOR = /^(#[0-9a-fA-F]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|[a-zA-Z]{3,20})$/;

const safe = (v: string | null | undefined, re: RegExp) =>
  v && typeof v === "string" && re.test(v.trim()) ? v.trim() : null;

const ensureMeta = (id: string, name: string, content: string) => {
  if (document.getElementById(id)) return;
  const m = document.createElement("meta");
  m.id = id; m.name = name; m.content = content;
  document.head.appendChild(m);
};

export const PixelInjector = () => {
  const { data } = useSiteSettings() as { data: any };

  /* ============== META PIXEL ============== */
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

  /* ============== GA4 ============== */
  useEffect(() => {
    const id = safe(data?.google_analytics_id, RE_GA4);
    if (!id || document.getElementById("ga4-script")) return;
    const s = document.createElement("script");
    s.id = "ga4-script"; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
    const inline = document.createElement("script");
    inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`;
    document.head.appendChild(inline);
  }, [data?.google_analytics_id]);

  /* ============== GTM ============== */
  useEffect(() => {
    const id = safe(data?.google_tag_manager_id, RE_GTM);
    if (!id || document.getElementById("gtm-script")) return;
    const s = document.createElement("script");
    s.id = "gtm-script";
    s.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
    document.head.appendChild(s);
  }, [data?.google_tag_manager_id]);

  /* ============== TIKTOK ============== */
  useEffect(() => {
    const id = safe(data?.tiktok_pixel_id, RE_TIKTOK);
    if (!id || (window as any).ttq) return;
    /* eslint-disable */
    (function (w: any, d: any, t: any) {
      w.TiktokAnalyticsObject = t; const ttq = (w[t] = w[t] || []);
      ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
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

  /* ============== LINKEDIN ============== */
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

  /* ============== PINTEREST TAG ============== */
  useEffect(() => {
    const id = safe(data?.pinterest_tag_id, RE_PINTEREST);
    if (!id || (window as any).pintrk) return;
    const w: any = window;
    w.pintrk = function () { (w.pintrk.queue = w.pintrk.queue || []).push(Array.prototype.slice.call(arguments)); };
    w.pintrk.queue = []; w.pintrk.version = "3.0";
    const n = document.createElement("script");
    n.async = true; n.src = "https://s.pinimg.com/ct/core.js";
    document.head.appendChild(n);
    w.pintrk("load", id);
    w.pintrk("page");
  }, [data?.pinterest_tag_id]);

  /* ============== SNAPCHAT PIXEL ============== */
  useEffect(() => {
    const id = safe(data?.snapchat_pixel_id, RE_SNAP);
    if (!id || (window as any).snaptr) return;
    const w: any = window;
    const r: any = function () { r.handleRequest ? r.handleRequest.apply(r, arguments) : r.queue.push(arguments); };
    r.queue = [];
    w.snaptr = r;
    const s = document.createElement("script");
    s.async = true; s.src = "https://sc-static.net/scevent.min.js";
    document.head.appendChild(s);
    w.snaptr("init", id);
    w.snaptr("track", "PAGE_VIEW");
  }, [data?.snapchat_pixel_id]);

  /* ============== TWITTER / X PIXEL ============== */
  useEffect(() => {
    const id = safe(data?.twitter_pixel_id, RE_TWITTER);
    if (!id || (window as any).twq) return;
    const w: any = window;
    const s: any = function () { s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments); };
    s.version = "1.1"; s.queue = [];
    w.twq = s;
    const u = document.createElement("script");
    u.async = true; u.src = "https://static.ads-twitter.com/uwt.js";
    document.head.appendChild(u);
    w.twq("config", id);
  }, [data?.twitter_pixel_id]);


  /* ============== HOTJAR ============== */
  useEffect(() => {
    const id = safe(data?.hotjar_id, RE_HOTJAR);
    if (!id || (window as any).hj) return;
    /* eslint-disable */
    (function(h:any,o:any,t:any,j:any){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:Number(id),hjsv:6};var a=o.getElementsByTagName("head")[0];var r=o.createElement("script");r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r)})(window,document,"https://static.hotjar.com/c/hotjar-",".js?sv=");
    /* eslint-enable */
  }, [data?.hotjar_id]);

  /* ============== MICROSOFT CLARITY ============== */
  useEffect(() => {
    const id = safe(data?.clarity_id, RE_CLARITY);
    if (!id || (window as any).clarity) return;
    /* eslint-disable */
    (function(c:any,l:any,a:any,r:any,i:any){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};const t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;const y=l.getElementsByTagName(r)[0];y.parentNode!.insertBefore(t,y)})(window,document,"clarity","script",id);
    /* eslint-enable */
  }, [data?.clarity_id]);

  /* ============== SEARCH ENGINE VERIFICATIONS (meta tags) ============== */
  useEffect(() => {
    const g = safe(data?.gsc_verification, RE_VERIFY);
    if (g) ensureMeta("verify-gsc", "google-site-verification", g);
    const b = safe(data?.bing_verification, RE_VERIFY);
    if (b) ensureMeta("verify-bing", "msvalidate.01", b);
    const y = safe(data?.yandex_verification, RE_VERIFY);
    if (y) ensureMeta("verify-yandex", "yandex-verification", y);
  }, [data?.gsc_verification, data?.bing_verification, data?.yandex_verification]);

  /* ============== CUSTOM HEAD / BODY HTML (admin-only) ============== */
  useEffect(() => {
    const head = data?.custom_head_html;
    const containerId = "am-custom-head";
    let el = document.getElementById(containerId);
    if (head && typeof head === "string" && head.trim().length > 0) {
      if (!el) {
        el = document.createElement("div");
        el.id = containerId;
        el.style.display = "none";
        document.head.appendChild(el);
      }
      if (el.innerHTML !== head) {
        el.innerHTML = head;
        // Re-execute any <script> tags inside
        el.querySelectorAll("script").forEach((old) => {
          const s = document.createElement("script");
          for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
          s.text = old.textContent || "";
          old.parentNode?.replaceChild(s, old);
        });
      }
    } else if (el) {
      el.remove();
    }
  }, [data?.custom_head_html]);

  useEffect(() => {
    const body = data?.custom_body_html;
    const containerId = "am-custom-body";
    let el = document.getElementById(containerId);
    if (body && typeof body === "string" && body.trim().length > 0) {
      if (!el) {
        el = document.createElement("div");
        el.id = containerId;
        document.body.appendChild(el);
      }
      if (el.innerHTML !== body) {
        el.innerHTML = body;
        el.querySelectorAll("script").forEach((old) => {
          const s = document.createElement("script");
          for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
          s.text = old.textContent || "";
          old.parentNode?.replaceChild(s, old);
        });
      }
    } else if (el) {
      el.remove();
    }
  }, [data?.custom_body_html]);

  /* ============== THEME COLOR OVERRIDES ============== */
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
