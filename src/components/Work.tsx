import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionEyebrow from "./SectionEyebrow";
import ParallaxWatermark from "./ParallaxWatermark";
import { EASE_HEAVY } from "../lib/motion";

type Project = {
  num: string;
  title: string;
  image?: string;
  description: string;
  highlights?: string[];
  note?: string;
  stack: string[];
  linkLabel?: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "School Library",
    image: "/perpus.png",
    description:
      "This application is designed to assist with efficient data management and book lending processes within a school environment. On the left navigation panel, there are menu buttons with intuitive icons such as Dashboard, Book Data, Teacher Data, Student Data, Supplier Data, Lending, and Report Printing. At the bottom of the panel, there is an Admin account label along with a clearly visible red Logout button.\n\nCreated a desktop application using Java NetBeans integrated with a SQL database, designed to manage various data operations efficiently. The application includes essential features such as user login, data entry, update and deletion, as well as report generation using iReport.",
    stack: ["Java", "NetBeans", "SQL", "iReport"],
    linkLabel: "github.com/AditWrdan/School-Library",
    href: "https://github.com/AditWrdan/School-Library",
  },
  {
    num: "02",
    title: "Broody Adventure",
    image: "/broody.png",
    description:
      "Broody Adventure is a management information system application for outdoor equipment rentals located in Sentul City. The user interface design combines nature-themed visual elements with a simple and functional layout. On the left side, there is a gray navigation panel featuring menu buttons such as Dashboard, Item Data, Employee Data, Customer Data, Supplier Data, Rentals, and Report Printing.\n\nCreated a desktop application using Java NetBeans integrated with a SQL database, designed to manage various data operations efficiently. The application includes essential features such as user login, data entry, update and deletion, as well as report generation using iReport.",
    stack: ["Java", "NetBeans", "SQL", "iReport"],
    linkLabel: "github.com/AditWrdan/Broody-Adventure",
    href: "https://github.com/AditWrdan/Broody-Adventure",
  },
  {
    num: "03",
    title: "SPK for Prospective Employees",
    image: "/spk1.png",
    description:
      "The decision support process for employee selection at PT. Inovasi Tangguh Perkasa is presented through a user-friendly interface. On the left side, a vertical navigation panel is equipped with clear icons and labels to access various features such as the dashboard, employee candidate data, assessment team data, admin registration, criteria evaluation, final calculation, and decision letter generation. The main screen displays concise information in the form of informative cards showing the number of candidates, assessors, and nominations. The design adopts a professional blue color scheme with modern and clean visual elements, emphasizing that the system utilizes the Analytical Hierarchy Process (AHP) method as the foundation for decision-making.\n\nCreated a desktop application using Java NetBeans integrated with a SQL database, designed to manage various data operations efficiently. The application includes essential features such as user login, data entry, update and deletion, as well as report generation using iReport.",
    stack: ["Java", "NetBeans", "SQL", "AHP", "iReport"],
    linkLabel: "github.com/AditWrdan/SPK-Calon-Karyawan",
    href: "https://github.com/AditWrdan/SPK-Calon-Karyawan",
  },
  {
    num: "04",
    title: "Competition Battle Campus",
    image: "/combac.png",
    description:
      "A website designed to facilitate the competition registration process, equipped with registration and login features for participants. Additionally, it includes an admin panel that enables comprehensive data management, including adding, editing, and deleting participant data and competition information.\n\nCreated a website using HTML and PHP which is connected using a SQL database with several features such as login features, registration features, and raw features.",
    stack: ["HTML", "PHP", "SQL"],
    linkLabel: "github.com/AditWrdan/COMBAC",
    href: "https://github.com/AditWrdan/COMBAC",
  },
  {
    num: "05",
    title: "Looma Aksi",
    image: "/aksi.png",
    description:
      "The service information and promotional features on the website are presented through a clean and user-friendly interface. A structured navigation layout allows visitors to easily explore essential sections such as service introductions, pricing details, contact information, customer benefits, and promotional highlights. Each section is designed with clear labeling and intuitive flow, ensuring that users can quickly understand the available services and get in touch without hassle. The website provides an organized and visually appealing experience to support effective communication and service promotion.\n\nDeveloped an informational and promotional website using React.js and Tailwind CSS, featuring a responsive, fast, and user-friendly interface. The website is designed to clearly present service details, contact information, pricing, and promotional highlights through clean navigation and well-structured content sections. Its optimized layout ensures a smooth and engaging browsing experience across various devices.",
    stack: ["React", "Tailwind CSS"],
    linkLabel: "loomaaksi.netlify.app",
    href: "https://loomaaksi.netlify.app/",
  },
  {
    num: "06",
    title: "Jasa Suruh Depok",
    image: "/jasasuruh.png",
    description:
      "A website designed to provide information and promote household helper services in the Depok area. It allows users to easily explore the available services, contact information, and the benefits offered. With a simple and informative layout, the website helps users quickly find the services they need.\n\nDeveloped a modern website using React.js and Tailwind CSS, featuring a responsive, fast, and user-friendly interface. The website is designed to present information interactively, with clean navigation, well-structured content management, and an optimized layout for various devices.",
    stack: ["React", "Tailwind CSS"],
    linkLabel: "jasasuruhdepok.netlify.app",
    href: "https://jasasuruhdepok.netlify.app/",
  },
  {
    num: "07",
    title: "FlowSend — WhatsApp Campaign Manager",
    image: "/flowsend.png",
    description:
      "A Chrome extension for managing WhatsApp broadcast campaigns responsibly and safely, built as a complete full-stack app with its own dashboard, backend API, and database.",
    highlights: [
      "Contact management with opt-in/opt-out tracking, bulk CSV/Excel import, automatic duplicate-number detection",
      "Message templates with personalization placeholders",
      "Campaign scheduling with randomized send delays and batch rest periods, so sending patterns feel natural",
      "Multi-agent system with Admin/Super Admin roles — every agent's data is fully isolated and enforced server-side",
      "\"View as Agent\" impersonation for Super Admins, for support/troubleshooting",
      "Real-time server & database health monitoring dashboard, with chart visualizations",
      "Security auto-logout synced to WhatsApp Web session state, brute-force rate limiting, full audit trail (who changed what, and when)",
    ],
    note: "This project was vibe coded — I drove the product requirements, feature decisions, and user flows, while the technical implementation was executed through iterative collaboration with AI (Claude).",
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB Atlas"],
  },
];

export default function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

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
          {PROJECTS.map((project, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE_HEAVY, delay: i * 0.08 }}
                className="border-t border-border/60"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group grid w-full grid-cols-[48px_1fr_auto] items-center gap-5 py-9 text-left"
                >
                  <span className="font-mono text-sm text-muted transition-colors duration-300 group-hover:text-foreground">
                    {project.num}
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
                          {project.image && !imageErrors[i] ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              onError={() =>
                                setImageErrors((prev) => ({ ...prev, [i]: true }))
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
                          {project.description.split("\n\n").map((para, idx) => (
                            <p
                              key={idx}
                              className="max-w-3xl text-sm leading-relaxed text-muted"
                            >
                              {para}
                            </p>
                          ))}
                          {project.highlights && (
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
                              {project.linkLabel} →
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
