import { useRef, useState } from "react";
import { motion } from "motion/react";
import SectionEyebrow from "./SectionEyebrow";
import ParallaxWatermark from "./ParallaxWatermark";
import { EASE_HEAVY } from "../lib/motion";
import { renderBio } from "../lib/renderBio";
import aboutData from "../data/about.json";
import skillsData from "../data/skills.json";

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border/60 px-6 py-28 md:px-10 md:py-36"
    >
      <ParallaxWatermark containerRef={sectionRef} text="001" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionEyebrow index="001" label="About" />

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-[minmax(0,320px)_1fr] md:gap-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE_HEAVY }}
            className="relative aspect-4/5 w-full max-w-sm overflow-hidden border border-border bg-surface"
          >
            <span className="absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-widest text-muted">
              IMG_01
            </span>

            {aboutData.photoUrl && !photoFailed ? (
              <img
                src={aboutData.photoUrl}
                alt="Profile"
                onError={() => setPhotoFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-linear-to-br from-white/4 to-transparent">
                <span className="font-mono text-6xl tracking-tight text-muted/50">
                  AW
                </span>
                <div className="text-center font-mono text-[10px] uppercase leading-relaxed tracking-widest text-muted/60">
                  <p>Ganti dengan foto kamu</p>
                  <p>Rasio 4:5, disarankan</p>
                  <p>Grayscale</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE_HEAVY, delay: 0.12 }}
          >
            <p className="max-w-2xl font-display text-lg font-medium leading-relaxed text-muted md:text-xl">
              {renderBio(aboutData.bio)}
            </p>

            <div className="mt-10 max-w-2xl border-t border-border">
              {skillsData.map((group) => (
                <div
                  key={group.category}
                  className="border-b border-border py-6"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {group.category}
                  </p>
                  <p className="mt-3 text-lg text-foreground">
                    {group.stack.map((item, i) => (
                      <span key={item}>
                        <span className="font-medium">{item}</span>
                        {i < group.stack.length - 1 && (
                          <span className="mx-2 text-muted">/</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
