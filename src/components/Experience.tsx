import { useRef, useState } from "react";
import { motion } from "motion/react";
import SectionEyebrow from "./SectionEyebrow";
import ParallaxWatermark from "./ParallaxWatermark";
import { EASE_HEAVY } from "../lib/motion";

type ExperienceEntry = {
  logo: string;
  logoImage?: string;
  period: string;
  role: string;
  company: string;
  description: string;
  highlights?: string[];
  tag: string;
};

const EXPERIENCE: ExperienceEntry[] = [
  {
    logo: "ILC",
    logoImage: "/ILCS.jpg",
    period: "Dec 2025 — Present",
    role: "Infra & Application Support",
    company: "Integrasi Logistik Cipta Solusi · Jakarta, Indonesia · On-site",
    description:
      "Provided application support for mission-critical port and logistics systems within Pelindo Group.",
    highlights: [
      "Monitored application performance and system availability to ensure stable daily operations.",
      "Investigated, analyzed, and resolved application and database issues with minimal operational impact.",
      "Handled incident, problem, and service requests in accordance with SLA and operational priorities.",
      "Performed data validation, analysis, and troubleshooting using Oracle SQL and PL/SQL.",
      "Supported operational processes including billing, payment, gate-in/gate-out, and container movement.",
      "Documented incidents, solutions, and operational procedures to improve system reliability.",
    ],
    tag: "Contract",
  },
  {
    logo: "YSH",
    logoImage: "/hsn.jpg",
    period: "Oct 2023 — Jan 2024",
    role: "Intern",
    company: "Yayasan Sultan Hasanudin",
    description:
      "Internship at Sultan Hasanudin Foundation, developing a library book lending application using Java (NetBeans) and MySQL. The application includes features for book management, member registration, borrowing and returning transactions, as well as generating reports. Responsible for database design, user interface development, program logic implementation, and system testing.",
    tag: "Internship",
  },
];

export default function Experience() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border/60 px-6 py-28 md:px-10 md:py-36"
    >
      <ParallaxWatermark containerRef={sectionRef} text="003" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionEyebrow index="003" label="Experience" />

        <div className="mt-16 border-b border-border/60">
          {EXPERIENCE.map((entry, index) => (
            <motion.div
              key={entry.company}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE_HEAVY, delay: index * 0.12 }}
              className="grid grid-cols-[44px_1fr] gap-5 border-t border-border/60 py-9 sm:grid-cols-[52px_120px_1fr_auto] sm:items-start"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-border bg-surface font-mono text-xs text-muted sm:h-13 sm:w-13">
                {entry.logoImage && !imageErrors[index] ? (
                  <img
                    src={entry.logoImage}
                    alt={entry.company}
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
                <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-muted">
                  {entry.company}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
                {entry.highlights && (
                  <ul className="mt-3 max-w-xl space-y-1.5">
                    {entry.highlights.map((point) => (
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
              </div>

              <span className="order-4 h-fit w-fit rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted sm:order-0">
                {entry.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
