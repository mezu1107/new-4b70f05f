import { useEffect, useState } from "react";

export interface GeoData {
  country: string;       // ISO2 e.g. US
  countryName: string;
  region: string;
  city: string;
  currency: string;      // e.g. USD
  currencySymbol: string;
  timezone: string;
  ip: string;
  loading: boolean;
  error?: string;
}

const CACHE_KEY = "geo_cache_v1";
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h
const OVERRIDE_KEY = "geo_override_country";

const SYMBOLS: Record<string, string> = {
  USD: "$", GBP: "£", CAD: "C$", AUD: "A$", PKR: "₨", EUR: "€", INR: "₹",
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: "USD", GB: "GBP", UK: "GBP", CA: "CAD", AU: "AUD", PK: "PKR",
};

export const useGeo = (): GeoData => {
  const [data, setData] = useState<GeoData>({
    country: "", countryName: "", region: "", city: "",
    currency: "USD", currencySymbol: "$", timezone: "", ip: "", loading: true,
  });

  useEffect(() => {
    const override = typeof window !== "undefined" ? localStorage.getItem(OVERRIDE_KEY) : null;
    if (override) {
      const currency = COUNTRY_TO_CURRENCY[override] || "USD";
      setData({
        country: override, countryName: override, region: "", city: "",
        currency, currencySymbol: SYMBOLS[currency] || "$",
        timezone: "", ip: "", loading: false,
      });
      return;
    }

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const p = JSON.parse(cached);
        if (Date.now() - p.t < CACHE_TTL) {
          setData({ ...p.d, loading: false });
          return;
        }
      }
    } catch {}

    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("geo failed");
        const j = await res.json();
        const country = (j.country_code || "").toUpperCase();
        const currency = j.currency || COUNTRY_TO_CURRENCY[country] || "USD";
        const d: Omit<GeoData, "loading"> = {
          country,
          countryName: j.country_name || country,
          region: j.region || "",
          city: j.city || "",
          currency,
          currencySymbol: SYMBOLS[currency] || j.currency || "$",
          timezone: j.timezone || "",
          ip: j.ip || "",
        };
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d })); } catch {}
        setData({ ...d, loading: false });
      } catch (e: any) {
        setData((s) => ({ ...s, loading: false, error: e?.message || "geo error" }));
      }
    })();
  }, []);

  return data;
};

export const setGeoOverride = (country: string) => {
  localStorage.setItem(OVERRIDE_KEY, country.toUpperCase());
  localStorage.removeItem(CACHE_KEY);
};

export const clearGeoOverride = () => {
  localStorage.removeItem(OVERRIDE_KEY);
  localStorage.removeItem(CACHE_KEY);
};

export const getGeoOverride = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(OVERRIDE_KEY);
};
