"use client";
import { projectsData } from "@/utils/data/projects-data";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import SectionTitle from "../../helper/section-title";
import ProjectCard from "./project-card";

const Projects = () => {
  const featured = projectsData.find((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  const categories = useMemo(() => {
    const set = new Set(rest.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [rest]);

  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? rest : rest.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="Selected work" title="Projects that show how I think." />

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <ProjectCard project={featured} featured />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {categories.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-colors duration-200 ${
                  active ? "text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
