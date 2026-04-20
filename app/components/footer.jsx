import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { personalData } from "@/utils/data/personal-data";

const linkGroups = [
  {
    title: "Navigate",
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Journey", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: personalData.github, external: true },
      { label: "LinkedIn", href: personalData.linkedIn, external: true },
      { label: "Email", href: `mailto:${personalData.email}` },
      ...(personalData.phone
        ? [{ label: "Phone", href: `tel:${personalData.phone.replace(/[^\d+]/g, "")}` }]
        : []),
    ],
  },
];

function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-transparent via-transparent to-white/[0.015] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(94,234,212,0.10),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.10),transparent_65%)] pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.09),transparent_65%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <Link href="/" className="text-white text-lg font-semibold tracking-tight">
              Felipe Mota
            </Link>
            <p className="mt-3 text-white/55 text-[14px] leading-relaxed max-w-sm">
              Crafting software with purpose, one project at a time. Open to
              opportunities in full-stack development, IT, and cybersecurity.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              <Link
                href={`mailto:${personalData.email}`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass hover:glass-strong text-[12.5px] text-white/80 hover:text-white transition-all"
              >
                <Mail size={12} />
                {personalData.email}
                <ArrowUpRight
                  size={12}
                  className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </Link>

              {personalData.phone && (
                <Link
                  href={`tel:${personalData.phone.replace(/[^\d+]/g, "")}`}
                  className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass hover:glass-strong text-[12.5px] text-white/80 hover:text-white transition-all"
                >
                  <Phone size={12} />
                  {personalData.phone}
                  <ArrowUpRight
                    size={12}
                    className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </Link>
              )}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title} className="md:col-span-3">
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-medium mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="text-[13.5px] text-white/65 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 flex md:flex-col items-start gap-3 md:gap-4 md:items-end">
            <Link
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/45 hover:text-white transition-colors"
            >
              <FaGithub size={16} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/45 hover:text-white transition-colors"
            >
              <FaLinkedin size={16} />
            </Link>
          </div>
        </div>

        <div className="relative pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
          <p className="text-[12px] text-white/40 tracking-wide">
            © {new Date().getFullYear()} Felipe Mota. All rights reserved.
          </p>
          <p className="text-[11.5px] text-white/35 tracking-wide">
            Designed & built with Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
