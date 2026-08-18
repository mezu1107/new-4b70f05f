export type Solution = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  what: string[];
  features: { title: string; text: string }[];
  tech: string[];
  seoTitle: string;
  seoDescription: string;
};

export const solutions: Solution[] = [
  {
    slug: "web-development",
    name: "Web development",
    tagline: "Websites built to do more",
    intro:
      "We design and build fast, responsive websites around your business and the people you want to reach.",
    what: ["Business websites", "Landing pages", "Web applications", "Website redesigns", "Ongoing improvements"],
    features: [
      { title: "Built for speed", text: "Clean code, optimised images and fast loading on normal mobile internet." },
      { title: "Responsive by design", text: "Every layout is designed for phone, tablet and desktop separately." },
      { title: "Search ready", text: "Semantic markup, clean URLs, metadata and structured data from day one." },
      { title: "Made to convert", text: "Clear structure, simple forms and calls to action that make sense." },
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Supabase"],
    seoTitle: "Web development company | AM Enterprises",
    seoDescription:
      "Custom website development for businesses. Fast, responsive and search ready websites built with React and Next.js.",
  },
  {
    slug: "app-development",
    name: "App development",
    tagline: "Ideas turned into apps",
    intro:
      "From product design to launch we build mobile apps that are simple to use and ready to grow.",
    what: ["iOS and Android apps", "Customer apps", "Business and staff apps", "Cross platform products", "App redesign and rescue"],
    features: [
      { title: "Product design first", text: "We design the flow and screens before writing code." },
      { title: "One codebase", text: "Cross platform builds keep cost and release cycles under control." },
      { title: "Store ready", text: "We handle builds, store listings and release management." },
      { title: "Built to extend", text: "Clean architecture so version two is not a rebuild." },
    ],
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "Supabase", "REST and GraphQL"],
    seoTitle: "Mobile app development company | AM Enterprises",
    seoDescription:
      "Mobile app development for iOS and Android. Product design, development and launch support for customer and business apps.",
  },
  {
    slug: "custom-software",
    name: "Custom software",
    tagline: "Software that fits how you work",
    intro:
      "Dashboards, internal tools and business systems built around your process instead of forcing you into someone else's.",
    what: ["Admin dashboards", "CRM systems", "Booking platforms", "Inventory and orders", "Reporting and analytics"],
    features: [
      { title: "Your process", text: "We map how your team works, then build around it." },
      { title: "Roles and access", text: "Proper permissions so people only see what they should." },
      { title: "Integrations", text: "Connects with the tools and payment providers you already use." },
      { title: "Reporting", text: "Data you can act on, not dashboards nobody opens." },
    ],
    tech: ["React", "TypeScript", "PostgreSQL", "Supabase", "Node.js", "Stripe"],
    seoTitle: "Custom software development | AM Enterprises",
    seoDescription:
      "Custom software development for businesses. Dashboards, CRM systems, booking platforms and internal business tools.",
  },
  {
    slug: "restaurant-technology",
    name: "Restaurant technology",
    tagline: "Your restaurant, your brand, your customers",
    intro:
      "A branded ordering experience built around your restaurant, so you keep the customer relationship and the margin.",
    what: ["Restaurant websites", "Online ordering", "Branded mobile apps", "Digital menus", "Order management"],
    features: [
      { title: "Direct orders", text: "Customers order from you, not from a marketplace that owns the relationship." },
      { title: "Menu control", text: "Update items, prices and availability in seconds." },
      { title: "Pickup and delivery", text: "Zones, timing and fees set the way you run service." },
      { title: "Promotions and accounts", text: "Offers, repeat orders and customer accounts built in." },
    ],
    tech: ["React", "React Native", "Supabase", "Stripe", "Push notifications"],
    seoTitle: "Food ordering app and restaurant ordering software | AM Enterprises",
    seoDescription:
      "Food ordering app development and restaurant ordering software. Branded restaurant websites, apps, digital menus and order management.",
  },
  {
    slug: "ecommerce-development",
    name: "Ecommerce development",
    tagline: "Stores that sell",
    intro:
      "Online stores built for real catalogues, real payments and the people who have to run them every day.",
    what: ["Custom storefronts", "Shopify builds", "Headless commerce", "Checkout optimisation", "Store migrations"],
    features: [
      { title: "Fast product pages", text: "Speed is the first thing that affects sales." },
      { title: "Simple checkout", text: "Fewer steps, fewer drop offs." },
      { title: "Easy to manage", text: "Your team can update products without calling us." },
      { title: "Ready to scale", text: "Built to handle catalogue and traffic growth." },
    ],
    tech: ["Shopify", "React", "Next.js", "Stripe", "PostgreSQL"],
    seoTitle: "Ecommerce development company | AM Enterprises",
    seoDescription:
      "Ecommerce website development. Custom storefronts, Shopify builds, checkout optimisation and store migrations.",
  },
];

export const growthServices = [
  { name: "SEO", text: "Technical fixes, content and rankings that hold." },
  { name: "Local SEO", text: "Maps, local pages and reviews for nearby customers." },
  { name: "Google Ads", text: "Paid search that targets buying intent." },
  { name: "Social media", text: "Consistent content and community for your brand." },
  { name: "CRM", text: "Leads tracked, followed up and never lost." },
  { name: "Automation", text: "Manual steps removed from your daily work." },
  { name: "Analytics", text: "Tracking set up so you can see what works." },
];

export const getSolution = (slug?: string) => solutions.find((s) => s.slug === slug);
