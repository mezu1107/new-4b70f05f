import { useEffect, useRef } from "react";

interface Props { density?: number; className?: string; color?: string; speed?: number }

export const Particles = ({ density, className = "", color = "rgba(15, 76, 129, 0.85)", speed = 1.6 }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const count = density ?? (isMobile ? 35 : 70);

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const sizeCanvas = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    const v = reduced ? 0 : speed;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * v, vy: (Math.random() - 0.5) * v,
      r: Math.random() * 2 + 0.8,
    }));

    const resize = () => {
      sizeCanvas();
      for (const p of particles) {
        if (p.x > w) p.x = Math.random() * w;
        if (p.y > h) p.y = Math.random() * h;
      }
    };
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
      }
      const linkDist = isMobile ? 90 : 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(15,76,129,${0.5 * (1 - d / linkDist)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); ro.disconnect(); };
  }, [density, color, speed]);

  return <canvas ref={ref} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
};
