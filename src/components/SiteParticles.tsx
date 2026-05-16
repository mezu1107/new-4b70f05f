import { Particles } from "./Particles";

/** Fixed, site-wide background particles layer — sits behind all content. */
export const SiteParticles = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
    <Particles speed={1.8} />
  </div>
);
