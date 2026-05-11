import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full gradient-primary text-white shadow-elegant hover:scale-110 transition-smooth flex items-center justify-center"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
