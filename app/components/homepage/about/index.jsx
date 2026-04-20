"use client";
import { motion } from "framer-motion";
import { Code2, ShieldCheck, Server, GraduationCap, Briefcase, Target } from "lucide-react";
import SectionTitle from "../../helper/section-title";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack",
    desc: "React, Next.js, Node.js, Python — building both sides of the product.",
  },
  {
    icon: Server,
    title: "IT Foundations",
    desc: "Linux, networking basics, troubleshooting, and system thinking.",
  },
  {
    icon: ShieldCheck,
    title: "Security Mindset",
    desc: "Writing code with awareness of how systems break and how to defend them.",
  },
  {
    icon: GraduationCap,
    title: "Always Learning",
    desc: "Disciplined practice over hype. Long-term growth over shortcuts.",
  },
];

const focusAreas = [
  "Production-ready React & Next.js",
  "REST APIs & authentication patterns",
  "SQL, MongoDB & data modeling",
  "Linux, networking & system basics",
];

const targetRoles = [
  "Junior Full-Stack Developer",
  "Frontend Engineer",
  "IT Support → Security Path",
  "Internships & freelance work",
];

function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="About"
          title="A developer who cares about how things work."
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-6 text-white/65 text-[17px] leading-[1.7]"
          >
            <p>
              I&apos;m drawn to technology because I genuinely want to
              understand how things work — not just at the surface, but the
              systems, logic, and architecture underneath.
            </p>
            <p>
              Right now, I&apos;m sharpening my skills in React, Next.js,
              Node.js, Python, SQL and MongoDB. I spend my time building real
              projects — task managers, dashboards, API-powered apps — because
              the best way to learn is by creating things that actually work.
            </p>
            <p className="text-white/85">
              I&apos;m not chasing shortcuts or inflated titles. I&apos;m
              focused on doing the work, learning deeply, and building
              something real over time.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-white/60" />
                  <h4 className="text-[11px] uppercase tracking-[0.16em] text-white/50 font-medium">
                    Focus areas
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {focusAreas.map((f) => (
                    <li key={f} className="text-[13px] text-white/70 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={14} className="text-white/60" />
                  <h4 className="text-[11px] uppercase tracking-[0.16em] text-white/50 font-medium">
                    Open to
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {targetRoles.map((r) => (
                    <li key={r} className="text-[13px] text-white/70 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 grid grid-cols-2 gap-3"
          >
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass rounded-2xl p-5 hover:glass-strong transition-all duration-300"
              >
                <p.icon className="text-white/80 mb-3" size={18} strokeWidth={1.6} />
                <h3 className="text-white text-[14px] font-semibold mb-1">{p.title}</h3>
                <p className="text-white/50 text-[12.5px] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
