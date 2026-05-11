const awards = ["Top SEO Agency 2024","Clutch Verified","Google Ads Certified","Meta Business Partner","Best Web Design 2024","Top 10 Pakistan Agency","ISO Certified","HubSpot Partner"];

export const AwardsStrip = () => (
  <div className="overflow-hidden py-6 bg-secondary/40 border-y border-border">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...awards, ...awards].map((a, i) => (
        <span key={i} className="mx-8 text-sm font-semibold text-muted-foreground uppercase tracking-wider">★ {a}</span>
      ))}
    </div>
  </div>
);
