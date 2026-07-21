import { useRef, useState } from "react";
import { motion } from "motion/react";
import SectionEyebrow from "./SectionEyebrow";
import ParallaxWatermark from "./ParallaxWatermark";
import { EASE_HEAVY } from "../lib/motion";

const EDUCATION = [
  {
    logo: "UP",
    logoImage: "/unindra.jpg",
    period: "2021 — 2025",
    school: "Universitas Indraprasta PGRI (UNINDRA)",
    field: "Computer Science",
  },
  {
    logo: "SMK",
    logoImage: "/pnb.png",
    period: "Vocational",
    school: "SMK Penerbangan Angkasa Bogor",
    field: "Vocational School",
  },
];

export default function Education() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border/60 px-6 py-28 md:px-10 md:py-36"
    >
      <ParallaxWatermark containerRef={sectionRef} text="004" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionEyebrow index="004" label="Education" />

        <div className="mt-16 border-b border-border/60">
          {EDUCATION.map((entry, index) => (
            <motion.div
              key={entry.school}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE_HEAVY, delay: index * 0.12 }}
              className="grid grid-cols-[44px_1fr] gap-5 border-t border-border/60 py-8 sm:grid-cols-[52px_120px_1fr] sm:items-start"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-border bg-surface font-mono text-xs text-muted sm:h-13 sm:w-13">
                {entry.logoImage && !imageErrors[index] ? (
                  <img
                    src={entry.logoImage}
                    alt={entry.school}
                    onError={() =>
                      setImageErrors((prev) => ({ ...prev, [index]: true }))
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  entry.logo
                )}
              </div>

              <span className="order-3 col-span-2 mt-1 font-mono text-xs text-muted sm:order-0 sm:col-span-1 sm:mt-0">
                {entry.period}
              </span>

              <div className="order-2 sm:order-0">
                <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                  {entry.school}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-muted">
                  {entry.field}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
