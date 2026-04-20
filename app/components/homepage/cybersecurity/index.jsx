"use client";
import { motion } from "framer-motion";
import SectionTitle from "../../helper/section-title";

const pillars = [
  {
    title: "Security-Minded Development",
    description:
      "Writing code with awareness of common vulnerabilities — input validation, authentication, and data handling done right.",
  },
  {
    title: "Linux & Systems Foundations",
    description:
      "Building the systems knowledge that underpins security work — file permissions, processes, and environment configuration.",
  },
  {
    title: "Networking Fundamentals",
    description:
      "Understanding how data flows, where it can be intercepted, and why protocols matter for secure communication.",
  },
  {
    title: "Future Labs & Security Projects",
    description:
      "Planning to build hands-on security labs, writeups, and small tools as my knowledge deepens over time.",
  },
];

function CybersecuritySection() {
  return (
    <section id="cybersecurity" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Where I'm heading"
          title="A cybersecurity journey, built on fundamentals."
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center text-white/55 text-[16px] leading-relaxed -mt-8 mb-14"
        >
          Cybersecurity isn&apos;t just a future goal — it&apos;s already
          shaping how I think about development. Solid coding, systems
          understanding, and networking come first. From there, security
          analysis and defensive practices.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative glass rounded-2xl p-6 hover:glass-strong transition-all duration-500 overflow-hidden"
            >
              <span className="absolute top-5 right-6 text-[44px] font-semibold text-white/[0.04] leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-white/40 to-transparent mb-4" />
              <h3 className="text-white font-semibold mb-2 text-[15px] relative">
                {pillar.title}
              </h3>
              <p className="text-[13.5px] text-white/55 leading-relaxed relative">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CybersecuritySection;
