import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE_HEAVY = [0.65, 0, 0.35, 1] as const;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_HEAVY }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.9, ease: EASE_HEAVY }}
            className="flex flex-col items-center gap-5"
          >
            <img src="/logonav.png" alt="" className="h-12 w-12 object-contain" />
            <span className="font-mono text-sm tracking-[0.35em] text-muted">
              AW / 2026
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
