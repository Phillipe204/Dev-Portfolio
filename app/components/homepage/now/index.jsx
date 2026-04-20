"use client";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Hammer, Compass } from "lucide-react";

const items = [
  {
    Icon: Hammer,
    label: "Building",
    title: "Full-stack project portfolio",
    desc: "Shipping practical apps in React, Next.js, and Node — focused on real features over tutorials.",
  },
  {
    Icon: BookOpen,
    label: "Learning",
    title: "Backend & systems depth",
    desc: "Going deeper on REST API design, SQL, authentication patterns, and Linux fundamentals.",
  },
  {
    Icon: Compass,
    label: "Exploring",
    title: "Cybersecurity foundations",
    desc: "Networking, threat modeling, and writing code with a defensive mindset by default.",
  },
];

function NowSection() {
  return (
    <section id="now" className="relative px-6 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 justify-center mb-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] uppercase tracking-[0.18em] text-white/60 font-medium">
            <Sparkles size={11} />
            Currently
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl sm:text-4xl font-semibold tracking-tightest text-white mb-12"
        >
          What I&apos;m focused on right now.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-500"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
                  <it.Icon size={14} strokeWidth={1.7} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-medium">
                  {it.label}
                </span>
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-2">{it.title}</h3>
              <p className="text-[13px] text-white/55 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NowSection;
