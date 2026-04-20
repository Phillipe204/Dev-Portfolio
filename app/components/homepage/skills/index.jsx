"use client";
import { skillCategories } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Database,
  Wrench,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import SectionTitle from "../../helper/section-title";

const categoryIcons = {
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  "Tools & Workflow": Wrench,
  "IT & Systems": Terminal,
  "Security Foundations": ShieldCheck,
};

function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Tech Stack"
          title="The tools I build with."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {skillCategories.map((category, idx) => {
            const Icon = categoryIcons[category.title] || Layout;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative glass rounded-2xl p-6 hover:glass-strong transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-px -left-px -right-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-white/80">
                    <Icon size={16} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-white text-[15px] font-semibold tracking-tight">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const img = skill.key ? skillsImage(skill.key) : null;
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[12.5px] text-white/75 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.12] transition-all duration-200"
                      >
                        {img && (
                          <Image
                            src={img.src}
                            alt={skill.name}
                            width={14}
                            height={14}
                            className="w-3.5 h-3.5"
                          />
                        )}
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
