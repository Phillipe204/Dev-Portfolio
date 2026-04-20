"use client";
import { motion } from "framer-motion";
import SectionTitle from "../../helper/section-title";

const goals = [
  {
    title: "Master Full-Stack Development",
    description:
      "Deepen expertise in React, Next.js, Node.js, and Python to build complex, production-quality applications.",
  },
  {
    title: "Build Real, Useful Projects",
    description:
      "Create tools and applications that solve actual problems — original work that demonstrates capability.",
  },
  {
    title: "Strengthen Backend & Databases",
    description:
      "Level up in server-side architecture, API design, SQL databases, and data management patterns.",
  },
  {
    title: "Expand IT & Systems Knowledge",
    description:
      "Continue growing in networking, troubleshooting, system administration, and technical infrastructure.",
  },
  {
    title: "Develop Security Awareness",
    description:
      "Integrate security thinking into every project — understanding threats, writing safer code, and building defensively.",
  },
  {
    title: "Grow Into Cybersecurity",
    description:
      "Build toward hands-on security skills through labs, certifications, and applied projects over time.",
  },
];

function GoalsSection() {
  return (
    <section id="goals" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Direction"
          title="What I'm working toward."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group glass rounded-2xl p-6 hover:glass-strong transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 text-[11px] font-semibold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-white font-semibold text-[14px]">
                  {goal.title}
                </h3>
              </div>
              <p className="text-[13px] text-white/55 leading-relaxed">
                {goal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GoalsSection;
