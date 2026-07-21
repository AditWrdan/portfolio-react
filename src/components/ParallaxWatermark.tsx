import { useEffect } from "react";
import type { RefObject } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export default function ParallaxWatermark({
  containerRef,
  text,
}: {
  containerRef: RefObject<HTMLElement | null>;
  text: string;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 18 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 18 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      rawX.set(relX * 60);
      rawY.set(relY * 60);
    };
    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef, rawX, rawY]);

  const combinedY = useTransform(
    [scrollY, mouseY],
    ([scroll, mouse]: number[]) => scroll + mouse
  );

  return (
    <motion.span
      aria-hidden
      style={{ y: combinedY, x: mouseX }}
      className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[20vw] font-semibold leading-none text-white/3 sm:text-[16vw]"
    >
      {text}
    </motion.span>
  );
}
