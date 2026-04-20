"use client";
import { motion } from "framer-motion";
import { experiences } from "@/utils/data/experience";
import SectionTitle from "../../helper/section-title";

function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="Journey" title="My growth path." />

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent" />

            <div className="space-y-5">
              {experiences.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-10"
                >
                  <span
                    className={`absolute left-[3px] top-3 w-2.5 h-2.5 rounded-full ring-4 ring-black ${
                      index === 0
                        ? "bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.6)]"
                        : "bg-white/30"
                    }`}
                  />
                  <div className="glass rounded-2xl p-5 hover:glass-strong transition-all duration-300">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <h3 className="text-white font-semibold text-[14.5px]">
                        {item.title}
                      </h3>
                      <span className="text-[11px] text-white/50 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] whitespace-nowrap">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/50 leading-relaxed">
                      {item.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
