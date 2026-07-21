import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE_HEAVY } from "../lib/motion";

const NAME_LINES = ["Aditya", "Wardana"];
const START_DELAY = 1.5;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: START_DELAY + 0.15 },
  },
};

const lineUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_HEAVY },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-border/60 px-6 py-32 md:px-10"
    >
      <motion.span
        aria-hidden
        style={{ y: watermarkY }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[26vw] font-semibold leading-none text-white/3 sm:text-[22vw]"
      >
        AW
      </motion.span>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_HEAVY, delay: START_DELAY }}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Depok, Indonesia — Available for work
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={container}
          className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {NAME_LINES.map((line) => (
            <span key={line} className="block overflow-hidden">
              <motion.span variants={lineUp} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: EASE_HEAVY,
            delay: START_DELAY + 0.7,
          }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
        >
          <span className="font-medium text-foreground">
            Application Support Engineer
          </span>{" "}
          Not just building applications, but keeping them alive and reliable. From crafting features to hunting down bugs, I make sure every app runs smoothly.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: EASE_HEAVY,
          delay: START_DELAY + 1.1,
        }}
        className="relative z-10 mx-auto mt-20 flex w-full max-w-6xl items-center gap-3 px-0"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent"
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
