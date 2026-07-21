import { useRef } from "react";
import { motion } from "motion/react";
import SectionEyebrow from "./SectionEyebrow";
import ParallaxWatermark from "./ParallaxWatermark";
import { EASE_HEAVY } from "../lib/motion";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28 md:px-10"
    >
      <ParallaxWatermark containerRef={sectionRef} text="005" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionEyebrow index="005" label="Contact" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_HEAVY }}
          className="mt-16 font-display text-lg font-semibold text-muted"
        >
          Ada project atau ide? Ngobrol aja.
        </motion.p>

        <motion.a
          href="mailto:adityawardana20020707@gmail.com"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE_HEAVY, delay: 0.12 }}
          className="group relative mt-5 block max-w-full font-display text-2xl font-semibold leading-tight text-foreground sm:text-4xl md:text-6xl"
        >
          adityawardana20020707<wbr />@gmail.com
          <span className="absolute inset-x-0 bottom-1 h-0.5 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_HEAVY, delay: 0.24 }}
          className="mt-10 flex flex-wrap gap-9 font-mono text-xs text-muted"
        >
          <a
            href="https://github.com/AditWrdan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-wardana-8385601aa/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/aditwrdan/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-foreground"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/6285694295634"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-foreground"
          >
            WhatsApp
          </a>
          <span>Depok, Indonesia</span>
        </motion.div>
      </div>
    </section>
  );
}
