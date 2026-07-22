import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionEyebrow from "./SectionEyebrow";
import ParallaxWatermark from "./ParallaxWatermark";
import Skeleton from "./Skeleton";
import { EASE_HEAVY } from "../lib/motion";
import { useProjects } from "../hooks/useProjects";

export default function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const { data: projects, loading } = useProjects();

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border/60 px-6 py-28 md:px-10 md:py-36"
    >
      <ParallaxWatermark containerRef={sectionRef} text="002" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionEyebrow index="002" label="Selected Work" />

        <div className="mt-16 border-b border-border/60">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border-t border-border/60 py-9">
                  <Skeleton className="h-10 w-2/3" />
                </div>
              ))
            : projects.map((project, i) => {
                const isOpen = openIndex === i;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.8,
                      ease: EASE_HEAVY,
                      delay: i * 0.08,
                    }}
                    className="border-t border-border/60"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group grid w-full grid-cols-[48px_1fr_auto] items-center gap-5 py-9 text-left"
                    >
                      <span className="font-mono text-sm text-muted transition-colors duration-300 group-hover:text-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-3xl font-semibold text-foreground transition-transform duration-500 ease-out sm:text-4xl md:text-5xl group-hover:translate-x-4">
                        {project.title}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : -45 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="font-mono text-xl text-muted transition-colors duration-300 group-hover:text-foreground"
                      >
                        →
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap items-start gap-8 py-2 pb-8 pl-0 sm:pl-16">
                            <div className="flex aspect-video w-full max-w-55 shrink-0 items-center justify-center overflow-hidden border border-border bg-surface">
                              {project.image_url && !imageErrors[i] ? (
                                <img
                                  src={project.image_url}
                                  alt={project.title}
                                  onError={() =>
                                    setImageErrors((prev) => ({
                                      ...prev,
                                      [i]: true,
                                    }))
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <p className="text-center font-mono text-[10px] uppercase leading-relaxed tracking-widest text-muted">
                                  Ganti dengan
                                  <br />
                                  screenshot project
                                  <br />
                                  16:10
                                </p>
                              )}
                            </div>

                            <div className="flex min-w-55 flex-1 flex-col gap-4">
                              {project.description
                                .split("\n\n")
                                .map((para, idx) => (
                                  <p
                                    key={idx}
                                    className="max-w-3xl text-sm leading-relaxed text-muted"
                                  >
                                    {para}
                                  </p>
                                ))}
                              {project.highlights &&
                                project.highlights.length > 0 && (
                                  <ul className="max-w-3xl space-y-1.5">
                                    {project.highlights.map((point) => (
                                      <li
                                        key={point}
                                        className="flex gap-2 text-sm leading-relaxed text-muted"
                                      >
                                        <span className="text-accent">–</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              {project.note && (
                                <p className="max-w-3xl font-mono text-xs italic leading-relaxed text-muted/70">
                                  {project.note}
                                </p>
                              )}
                              <div className="flex max-w-xs flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-muted"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              {project.href && (
                                <a
                                  href={project.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-fit border-b border-muted/60 pb-0.5 font-mono text-xs text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                                >
                                  {project.link_label} →
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
