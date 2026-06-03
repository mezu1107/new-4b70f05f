export interface RegionConfig {
  code: string;             // ISO2
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  phone: string;
  hours: string;
  timezone: string;
  heroHeadline: string;
  heroSubheadline: string;
  trustSignal: string;
  cta: string;
  priceMultiplier: number;  // relative to USD base
  cities: string[];
  schemaCountry: string;
  metaTitle: string;
  metaDescription: string;
  testimonialLocale: string;
}

export const REGIONS: Record<string, RegionConfig> = {
  US: {
    code: "US", name: "United States", flag: "🇺🇸",
    currency: "USD", currencySymbol: "$",
    phone: "+1 (888) 000-0000", hours: "9 AM – 6 PM EST", timezone: "EST",
    heroHeadline: "America's Trusted AI & Digital Growth Partner",
    heroSubheadline: "Helping US businesses in California, Texas, NYC & nationwide scale with AI-powered marketing, SEO & automation.",
    trustSignal: "Trusted by 50+ US brands · Featured in Forbes & Inc.",
    cta: "Get Free US Strategy Call",
    priceMultiplier: 1,
    cities: ["California", "Texas", "New York", "Florida", "Chicago"],
    schemaCountry: "United States",
    metaTitle: "AI Marketing & SEO Agency USA | AM Enterprises",
    metaDescription: "Top-rated US digital agency for AI marketing, SEO & automation. Serving California, Texas, NYC. Book a free strategy call today.",
    testimonialLocale: "US clients",
  },
  GB: {
    code: "GB", name: "United Kingdom", flag: "🇬🇧",
    currency: "GBP", currencySymbol: "£",
    phone: "+44 20 0000 0000", hours: "9 AM – 6 PM GMT", timezone: "GMT",
    heroHeadline: "The UK's AI-Powered Digital Growth Agency",
    heroSubheadline: "London-ready AI marketing, SEO & lead-gen for UK SMEs and enterprises across England, Scotland & Wales.",
    trustSignal: "Trusted by UK brands · GDPR-compliant · UK timezone support",
    cta: "Book Free UK Discovery Call",
    priceMultiplier: 0.85,
    cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow"],
    schemaCountry: "United Kingdom",
    metaTitle: "AI Marketing & SEO Agency UK | AM Enterprises London",
    metaDescription: "Award-winning UK AI agency for SEO, marketing automation & growth. London-based support, GDPR compliant. Free strategy call.",
    testimonialLocale: "UK clients",
  },
  CA: {
    code: "CA", name: "Canada", flag: "🇨🇦",
    currency: "CAD", currencySymbol: "C$",
    phone: "+1 (888) 000-0000", hours: "9 AM – 6 PM EST", timezone: "EST",
    heroHeadline: "Canada's Premier AI Marketing & SEO Agency",
    heroSubheadline: "Bilingual AI-driven growth for Canadian businesses in Toronto, Vancouver, Montreal & beyond.",
    trustSignal: "Trusted by Canadian brands · PIPEDA-compliant",
    cta: "Book Free Canada Strategy Call",
    priceMultiplier: 1.35,
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    schemaCountry: "Canada",
    metaTitle: "AI Marketing & SEO Agency Canada | AM Enterprises",
    metaDescription: "Top Canadian AI marketing & SEO agency. Toronto, Vancouver, Montreal coverage. PIPEDA compliant. Free strategy call.",
    testimonialLocale: "Canadian clients",
  },
  AU: {
    code: "AU", name: "Australia", flag: "🇦🇺",
    currency: "AUD", currencySymbol: "A$",
    phone: "+61 2 0000 0000", hours: "9 AM – 6 PM AEST", timezone: "AEST",
    heroHeadline: "Australia's AI Growth & SEO Specialists",
    heroSubheadline: "AI marketing, SEO & automation built for Aussie brands in Sydney, Melbourne, Brisbane & Perth.",
    trustSignal: "Trusted by Australian brands · Local timezone support",
    cta: "Book Free Australia Strategy Call",
    priceMultiplier: 1.5,
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    schemaCountry: "Australia",
    metaTitle: "AI Marketing & SEO Agency Australia | AM Enterprises",
    metaDescription: "Leading Australian AI marketing & SEO agency. Sydney, Melbourne, Brisbane coverage. Local AEST support. Free strategy call.",
    testimonialLocale: "Australian clients",
  },
  PK: {
    code: "PK", name: "Pakistan", flag: "🇵🇰",
    currency: "PKR", currencySymbol: "₨",
    phone: "+92 300 000 0000", hours: "9 AM – 9 PM PKT", timezone: "PKT",
    heroHeadline: "Pakistan's #1 AI Digital Marketing Agency",
    heroSubheadline: "Karachi · Lahore · Islamabad — AI-powered SEO, marketing automation & lead-gen for Pakistani businesses.",
    trustSignal: "Trusted by 100+ Pakistani brands · Local support · Affordable PKR pricing",
    cta: "Free Strategy Call Lein",
    priceMultiplier: 280, // ~PKR per USD
    cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"],
    schemaCountry: "Pakistan",
    metaTitle: "AI Marketing & SEO Agency Pakistan | AM Enterprises",
    metaDescription: "Pakistan's top AI marketing, SEO & web agency. Karachi, Lahore, Islamabad. Affordable PKR pricing. Free strategy call.",
    testimonialLocale: "Pakistani clients",
  },
};

export const SUPPORTED_REGION_CODES = Object.keys(REGIONS);

export const getRegion = (code: string): RegionConfig => {
  const c = (code || "").toUpperCase();
  if (c === "UK") return REGIONS.GB;
  return REGIONS[c] || REGIONS.US;
};

export const formatRegionPrice = (usdAmount: number, region: RegionConfig) => {
  const v = usdAmount * region.priceMultiplier;
  const rounded = v >= 1000 ? Math.round(v / 10) * 10 : Math.round(v);
  return `${region.currencySymbol}${rounded.toLocaleString()}`;
};
