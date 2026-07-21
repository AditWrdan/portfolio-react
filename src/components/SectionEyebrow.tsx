import { useState } from "react";
import { motion } from "motion/react";
import { EASE_HEAVY } from "../lib/motion";

const DIGITS = "0123456789";

function randomDigits(length: number) {
  return Array.from(
    { length },
    () => DIGITS[Math.floor(Math.random() * DIGITS.length)]
  ).join("");
}

export default function SectionEyebrow({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  const [displayIndex, setDisplayIndex] = useState(index);
  const [hasScrambled, setHasScrambled] = useState(false);

  const runScramble = () => {
    if (hasScrambled) return;
    setHasScrambled(true);

    let tick = 0;
    const totalTicks = 8;
    const interval = setInterval(() => {
      tick += 1;
      if (tick >= totalTicks) {
        clearInterval(interval);
        setDisplayIndex(index);
      } else {
        setDisplayIndex(randomDigits(index.length));
      }
    }, 45);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={runScramble}
      transition={{ duration: 0.8, ease: EASE_HEAVY }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-xs tabular-nums text-muted">
        {displayIndex}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </motion.div>
  );
}
