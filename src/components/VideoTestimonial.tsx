import { Play, Star } from "lucide-react";
import { useState } from "react";

const videos = [
  { name: "Ali Hassan", role: "CEO, TechVista", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600", quote: "AM Enterprises tripled our leads in 90 days." },
  { name: "Sarah Khan", role: "Founder, GlowCart", thumb: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600", quote: "Sales jumped 4x after their SEO strategy." },
  { name: "Bilal Ahmed", role: "Director, NovaCorp", thumb: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600", quote: "Beautiful website, fast delivery, great team." },
];

export const VideoTestimonial = () => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {videos.map((v, i) => (
        <div key={v.name} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth bg-white">
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <img src={v.thumb} alt={v.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
            <button onClick={() => setActive(i)} className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-smooth">
              <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-smooth"><Play className="w-7 h-7 text-primary ml-1" fill="currentColor" /></span>
            </button>
          </div>
          <div className="p-5">
            <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}</div>
            <p className="text-sm text-foreground mb-3">"{v.quote}"</p>
            <div className="font-semibold">{v.name}</div>
            <div className="text-xs text-muted-foreground">{v.role}</div>
          </div>
        </div>
      ))}
      {active !== null && (
        <div onClick={() => setActive(null)} className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center"><h3 className="text-xl mb-3">Video coming soon</h3><p className="text-muted-foreground text-sm">Full case-study videos publishing soon.</p></div>
        </div>
      )}
    </div>
  );
};
