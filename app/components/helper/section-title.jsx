"use client";
import { motion } from "framer-motion";

function SectionTitle({ title, subtitle, eyebrow, align = "center" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center mx-auto";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-4 mb-16 lg:mb-20 max-w-2xl ${alignment}`}
    >
      {(eyebrow || subtitle) && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] uppercase tracking-[0.18em] text-white/60 font-medium w-fit">
          {eyebrow || subtitle}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-white text-balance leading-[1.05]">
        {title}
      </h2>
    </motion.div>
  );
}

export default SectionTitle;
