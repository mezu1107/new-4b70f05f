const stacks = [
  "React", "Next.js", "Node.js", "Supabase", "Tailwind", "WordPress", "Shopify", "Webflow", "Flutter", "Python", "TypeScript", "OpenAI", "Meta Ads", "Google Ads", "GA4", "Figma",
];

export const TechStackStrip = () => (
  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
    {stacks.map((s) => (
      <div key={s} className="text-center text-sm font-semibold py-3 px-2 rounded-lg bg-white border border-border hover:border-primary hover:text-primary transition-smooth shadow-card">
        {s}
      </div>
    ))}
  </div>
);
