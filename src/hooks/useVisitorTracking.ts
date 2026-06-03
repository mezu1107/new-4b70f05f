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
      }).then(() => {}, () => {});
    };
    document.addEventListener("click", onClick, true);

    const onUnload = () => {
      const sec = Math.round((Date.now() - startedAt.current) / 1000);
      // Use RPC for safe, ownership-bounded session update
      supabase.rpc("bump_visitor_session", {
        _session_key: sessionKey.current,
        _duration_seconds: sec,
      }).then(() => {}, () => {});
    };
    window.addEventListener("beforeunload", onUnload);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  useEffect(() => {
    if (!sessionKey.current) return;
    supabase.from("visitor_events").insert({
      session_key: sessionKey.current,
      event_type: "pageview",
      path: loc.pathname,
    }).then(() => {}, () => {});
    supabase.rpc("bump_visitor_session", { _session_key: sessionKey.current }).then(() => {}, () => {});
  }, [loc.pathname]);
};
