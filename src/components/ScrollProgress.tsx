import { motion, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 gradient-primary origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
