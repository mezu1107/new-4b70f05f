export interface ServiceData {
  slug: string;
  title: string;
  short: string;
  description: string;
  benefits: string[];
  process: { step: string; desc: string }[];
  pricing: string;
  faqs: { q: string; a: string }[];
}

export const services: ServiceData[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Full-funnel campaigns that turn clicks into customers.",
    description: "Our digital marketing services combine paid media, content, SEO, and conversion optimization to deliver predictable, scalable growth for your business.",
    benefits: ["Higher quality leads", "Lower cost per acquisition", "Multi-channel reach", "Data-driven decisions"],
    process: [
      { step: "Discovery & Audit", desc: "We analyze your business, audience, and competitors." },
      { step: "Strategy", desc: "Custom roadmap with channels, KPIs, and budgets." },
      { step: "Launch & Optimize", desc: "We execute campaigns and improve weekly." },
      { step: "Report & Scale", desc: "Transparent reporting and aggressive scaling." },
    ],
    pricing: "Starting from PKR 50,000/month",
    faqs: [
      { q: "How soon will I see results?", a: "Paid channels show results in 2–4 weeks; SEO compounds over 3–6 months." },
      { q: "Do you handle ad spend?", a: "We manage strategy and execution. Ad spend is paid directly to the platforms." },
    ],
  },
  {
    slug: "seo-services",
    title: "SEO Services",
    short: "Rank #1 on Google for the keywords your customers actually search.",
    description: "Our white-hat SEO services help businesses across Pakistan dominate organic search results — from technical SEO to authority building.",
    benefits: ["Long-term traffic", "Higher trust & authority", "Better conversion rates", "Compounding ROI"],
    process: [
      { step: "Technical Audit", desc: "Find and fix every issue holding you back." },
      { step: "Keyword Strategy", desc: "Target high-intent, profitable keywords." },
      { step: "On-Page & Content", desc: "Optimize and create content that ranks." },
      { step: "Authority Building", desc: "Quality backlinks from real publications." },
    ],
    pricing: "Starting from PKR 40,000/month",
    faqs: [
      { q: "How long until I rank?", a: "Most clients see meaningful movement in 90 days, top rankings in 6 months." },
      { q: "Do you guarantee #1 rankings?", a: "Anyone who guarantees #1 is lying. We guarantee best-in-class effort and transparent reporting." },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Build a loyal community that converts into revenue.",
    description: "Strategic social media management across Facebook, Instagram, LinkedIn, and TikTok — from content to community to conversion.",
    benefits: ["Stronger brand presence", "Engaged community", "Direct sales channel", "Customer insights"],
    process: [
      { step: "Brand Voice", desc: "Define tone, look, and content pillars." },
      { step: "Content Calendar", desc: "Monthly mix of posts, reels, and stories." },
      { step: "Publishing & Engagement", desc: "We post, reply, and grow your community." },
      { step: "Paid Boost", desc: "Amplify winners with smart paid spend." },
    ],
    pricing: "Starting from PKR 35,000/month",
    faqs: [{ q: "Which platforms do you cover?", a: "Facebook, Instagram, LinkedIn, TikTok, YouTube, and X (Twitter)." }],
  },
  {
    slug: "google-ads",
    title: "Google Ads Management",
    short: "Capture high-intent buyers the moment they're searching.",
    description: "Search, display, shopping, and YouTube campaigns built and optimized by certified Google Ads specialists.",
    benefits: ["Immediate traffic", "Buyer-intent leads", "Full ROI tracking", "Scalable budgets"],
    process: [
      { step: "Account Setup", desc: "Tracking, conversions, and structure done right." },
      { step: "Campaign Launch", desc: "Tested ad creatives and landing pages." },
      { step: "Daily Optimization", desc: "Bidding, keywords, and audience refinement." },
      { step: "Scale", desc: "Expand budget on what's profitable." },
    ],
    pricing: "Starting from PKR 45,000/month",
    faqs: [{ q: "What's the minimum ad budget?", a: "We recommend at least PKR 50,000/month in ad spend for meaningful results." }],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, beautiful websites engineered to convert.",
    description: "We build high-performance websites using React, Next.js, and modern stacks — optimized for speed, SEO, and conversions.",
    benefits: ["Lightning-fast load times", "Mobile-first design", "SEO-ready architecture", "Scalable codebase"],
    process: [
      { step: "Discovery", desc: "Goals, audience, and content mapping." },
      { step: "Design", desc: "Wireframes and high-fidelity mockups." },
      { step: "Development", desc: "Clean code, best practices, full QA." },
      { step: "Launch & Support", desc: "Deploy, train, and provide ongoing care." },
    ],
    pricing: "Starting from PKR 150,000",
    faqs: [{ q: "How long does a website take?", a: "Typical projects ship in 4–8 weeks depending on scope." }],
  },
  {
    slug: "ecommerce-development",
    title: "E-Commerce Development",
    short: "Online stores built to sell — Shopify, WooCommerce, or custom.",
    description: "Conversion-optimized e-commerce stores with secure payments, inventory, and growth tooling baked in.",
    benefits: ["Higher conversion rates", "Mobile-optimized checkout", "Multi-payment support", "Scalable to millions"],
    process: [
      { step: "Strategy", desc: "Platform, theme, and integrations." },
      { step: "Build", desc: "Storefront, products, checkout, payments." },
      { step: "Optimize", desc: "Speed, UX, and conversion testing." },
      { step: "Launch & Scale", desc: "Go live and grow with marketing." },
    ],
    pricing: "Starting from PKR 200,000",
    faqs: [{ q: "Which platform do you recommend?", a: "Shopify for speed-to-market; custom for unique requirements." }],
  },
  {
    slug: "app-development",
    title: "Mobile App Development",
    short: "Native and cross-platform apps for iOS and Android.",
    description: "From MVP to scale — we design, build, and launch mobile apps using React Native and Flutter.",
    benefits: ["One codebase, two stores", "Native performance", "Push notifications & analytics", "Long-term maintainability"],
    process: [
      { step: "Product Discovery", desc: "Define users, features, and MVP scope." },
      { step: "UX/UI Design", desc: "Beautiful, intuitive flows." },
      { step: "Development", desc: "Agile sprints with weekly demos." },
      { step: "Launch", desc: "Store submissions and post-launch support." },
    ],
    pricing: "Starting from PKR 400,000",
    faqs: [{ q: "Native or cross-platform?", a: "Cross-platform for most apps; native when performance demands it." }],
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    short: "Identities that turn heads and build trust.",
    description: "Logos, brand systems, pitch decks, and marketing collateral that make your brand unforgettable.",
    benefits: ["Memorable identity", "Consistent presence", "Higher perceived value", "Design that converts"],
    process: [
      { step: "Brand Discovery", desc: "Values, audience, and positioning." },
      { step: "Concepts", desc: "Multiple directions to explore." },
      { step: "Refinement", desc: "Polish and finalize the identity." },
      { step: "Brand Guidelines", desc: "Complete usage guide and assets." },
    ],
    pricing: "Starting from PKR 75,000",
    faqs: [{ q: "What's included in branding?", a: "Logo, color palette, typography, brand guidelines, and basic stationery." }],
  },
];
