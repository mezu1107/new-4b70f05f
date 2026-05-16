const press = ["FORBES", "TECHCRUNCH", "ENTREPRENEUR", "INC.", "BLOOMBERG", "WIRED"];

export const PressStrip = () => (
  <div className="border-y border-border bg-white py-8">
    <div className="container mx-auto">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-5">As featured in</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {press.map((p) => (
          <span key={p} className="text-lg md:text-xl font-extrabold text-muted-foreground/70 tracking-wider hover:text-foreground transition-smooth">{p}</span>
        ))}
      </div>
    </div>
  </div>
);
