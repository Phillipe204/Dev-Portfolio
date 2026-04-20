"use client";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

function ProjectCard({ project, featured = false }) {
  const hasDemo = project.demo && project.demo !== "#";
  const hasCode = project.code && project.code !== "#";

  if (featured) {
    return (
      <article className="group relative grid md:grid-cols-2 glass rounded-3xl overflow-hidden hover:glass-strong transition-all duration-500">
        <div className={`relative h-64 md:h-full min-h-[280px] bg-gradient-to-br ${project.accent} overflow-hidden`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.12] backdrop-blur border border-white/20 text-[10px] uppercase tracking-[0.16em] text-white/90 font-medium">
            <span className="w-1 h-1 rounded-full bg-white" />
            Featured
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/70 font-medium mb-2">
              {project.category}
            </p>
            <p className="text-white/90 text-[42px] font-semibold tracking-tightest leading-none">
              0{project.id}
            </p>
          </div>
        </div>

        <div className="relative p-7 md:p-9 flex flex-col">
          <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight mb-3 leading-tight">
            {project.name}
          </h3>
          <p className="text-white/60 text-[14.5px] leading-relaxed mb-5">
            {project.description}
          </p>

          {project.features && (
            <ul className="space-y-2 mb-5">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-white/65">
                  <Check size={13} className="text-white/40 mt-1 flex-shrink-0" strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 text-[11px] font-medium text-white/65 bg-white/[0.05] border border-white/[0.07] rounded-md"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.06]">
            {hasDemo ? (
              <Link href={project.demo} target="_blank" rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-[12.5px] font-medium rounded-full hover:bg-white/90 transition-all">
                Live demo
                <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            ) : (
              <span className="px-4 py-2 text-[12.5px] font-medium text-white/40 rounded-full bg-white/[0.04] border border-white/[0.06]">
                Coming soon
              </span>
            )}
            {hasCode ? (
              <Link href={project.code} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[12.5px] font-medium text-white/80 hover:text-white border border-white/[0.08] hover:border-white/[0.18] rounded-full transition-all">
                <FaGithub size={13} />
                Code
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 text-[12.5px] font-medium text-white/30 border border-white/[0.06] rounded-full">
                <FaGithub size={13} />
                Private
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative h-full flex flex-col glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-500">
      <div className={`relative h-32 bg-gradient-to-br ${project.accent} overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-4 left-5 right-5 flex items-start justify-between">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/80 font-medium">
            {project.category}
          </p>
          <span className="text-[11px] text-white/60 font-mono">0{project.id}</span>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col p-6">
        <h3 className="text-white text-[17px] font-semibold tracking-tight mb-2.5 leading-tight">
          {project.name}
        </h3>
        <p className="text-white/55 text-[13px] leading-relaxed mb-4 flex-1">
          {project.description.length > 130
            ? project.description.slice(0, 130).trimEnd() + "…"
            : project.description}
        </p>

        {project.features && (
          <ul className="space-y-1.5 mb-4">
            {project.features.slice(0, 2).map((f) => (
              <li key={f} className="flex items-start gap-1.5 text-[12px] text-white/55">
                <Check size={11} className="text-white/35 mt-1 flex-shrink-0" strokeWidth={2.5} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tools.slice(0, 4).map((tool) => (
            <span key={tool}
              className="px-2 py-0.5 text-[10.5px] font-medium text-white/60 bg-white/[0.04] border border-white/[0.06] rounded-md">
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span className="px-2 py-0.5 text-[10.5px] font-medium text-white/40">
              +{project.tools.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
          {hasDemo ? (
            <Link href={project.demo} target="_blank" rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-1 text-[12px] font-medium text-white hover:text-white transition-colors">
              Live demo
              <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-white/30">
              Coming soon
            </span>
          )}
          <span className="text-white/15">·</span>
          {hasCode ? (
            <Link href={project.code} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-white/60 hover:text-white transition-colors">
              <FaGithub size={11} />
              Code
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-white/30">
              <FaGithub size={11} />
              Private
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
