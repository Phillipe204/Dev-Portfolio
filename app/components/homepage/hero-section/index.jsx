"use client";
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-28 pb-20">
      {/* Subtle background accents */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[12px] text-white/70 tracking-wide font-medium">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tightest leading-[0.98] text-balance"
        >
          <span className="text-white">Crafting software</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-teal-200 via-sky-300 to-blue-500">
            with purpose,
          </span>
          <br />
          <span className="text-white/80">one project at a time.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed text-balance"
        >
          I&apos;m {personalData.name} — a full-stack developer with an IT and
          security mindset, focused on writing clean code, shipping real
          projects, and growing into cybersecurity.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[14px] font-medium rounded-full hover:bg-white/90 transition-all duration-300"
          >
            View my work
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 glass hover:glass-strong text-white text-[14px] font-medium rounded-full transition-all duration-300"
          >
            Get in touch
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <Link
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/40 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            href={personalData.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/40 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <FaLinkedin size={20} />
          </Link>
          {personalData.resume && personalData.resume !== "#" && (
            <Link
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="text-white/40 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Download size={20} />
            </Link>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

export default HeroSection;
