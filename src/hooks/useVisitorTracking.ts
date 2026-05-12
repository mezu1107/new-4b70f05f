import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const KEY = "am_visitor_session_v1";

const getSessionKey = () => {
  let k = sessionStorage.getItem(KEY);
  if (!k) {
    k = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(KEY, k);
  }
  return k;
};

const detect = () => {
  const ua = navigator.userAgent;
  const device = /Mobi|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop";
  const browser = /Edg/i.test(ua) ? "Edge" : /Chrome/i.test(ua) ? "Chrome" : /Safari/i.test(ua) ? "Safari" : /Firefox/i.test(ua) ? "Firefox" : "Other";
  const os = /Windows/i.test(ua) ? "Windows" : /Mac/i.test(ua) ? "macOS" : /Android/i.test(ua) ? "Android" : /iPhone|iPad/i.test(ua) ? "iOS" : /Linux/i.test(ua) ? "Linux" : "Other";
  return { device, browser, os, ua };
};

export const useVisitorTracking = () => {
  const loc = useLocation();
  const inited = useRef(false);
  const startedAt = useRef<number>(Date.now());
  const sessionKey = useRef<string>("");

  // initialize session row once
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    sessionKey.current = getSessionKey();
    const { device, browser, os, ua } = detect();
    const params = new URLSearchParams(window.location.search);
    (async () => {
      try {
        await supabase.from("visitor_sessions").insert({
          session_key: sessionKey.current,
          user_agent: ua,
          device_type: device,
          browser,
          os,
          referrer: document.referrer || null,
          landing_path: window.location.pathname,
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
          page_views: 1,
        });
      } catch {}
    })();

    // global click capture
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      const btn = t.closest("a, button, [role='button']") as HTMLElement | null;
      if (!btn) return;
      const label = (btn.getAttribute("aria-label") || btn.innerText || btn.getAttribute("title") || "").trim().slice(0, 120);
      supabase.from("visitor_events").insert({
        session_key: sessionKey.current,
        event_type: "click",
        path: window.location.pathname,
        element_label: label || null,
        element_id: btn.id || null,
        meta: { tag: btn.tagName, href: (btn as HTMLAnchorElement).href || null },
      }).then(() => {
        supabase.rpc as any; // no-op
      }, () => {});
    };
    document.addEventListener("click", onClick, true);

    // unload → update duration
    const onUnload = () => {
      const sec = Math.round((Date.now() - startedAt.current) / 1000);
      try {
        navigator.sendBeacon?.(
          `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/rest/v1/visitor_sessions?session_key=eq.${sessionKey.current}`,
          new Blob([JSON.stringify({ duration_seconds: sec, last_seen_at: new Date().toISOString() })], { type: "application/json" })
        );
      } catch {}
    };
    window.addEventListener("beforeunload", onUnload);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  // track route changes as page views
  useEffect(() => {
    if (!sessionKey.current) return;
    supabase.from("visitor_events").insert({
      session_key: sessionKey.current,
      event_type: "pageview",
      path: loc.pathname,
    }).then(() => {}, () => {});
    // bump session counter
    (async () => {
      const { data } = await supabase.from("visitor_sessions").select("page_views").eq("session_key", sessionKey.current).maybeSingle();
      if (data) {
        await supabase.from("visitor_sessions").update({
          page_views: (data.page_views || 0) + 1,
          last_seen_at: new Date().toISOString(),
        }).eq("session_key", sessionKey.current);
      }
    })();
  }, [loc.pathname]);
};
