"use client";
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import SectionTitle from "../../helper/section-title";
import ContactForm from "./contact-form";

function ContactSection() {
  return (
    <section id="contact" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="Contact" title="Let's build something." />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center text-white/55 text-[17px] leading-relaxed -mt-8 mb-16"
        >
          Open to internships, freelance work, and collaborative projects in
          full-stack development or IT. Whether you have a project, a
          question, or just want to connect — I&apos;d like to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-3"
          >
            <Link
              href={`mailto:${personalData.email}`}
              className="group flex items-center justify-between gap-4 glass hover:glass-strong rounded-2xl p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
                  <Mail size={16} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.18em] font-medium">
                    Email
                  </p>
                  <p className="text-white text-[13.5px] font-medium">
                    {personalData.email}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </Link>

            {personalData.phone && (
              <Link
                href={`tel:${personalData.phone.replace(/[^\d+]/g, "")}`}
                className="group flex items-center justify-between gap-4 glass hover:glass-strong rounded-2xl p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
                    <Phone size={16} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.18em] font-medium">
                      Phone
                    </p>
                    <p className="text-white text-[13.5px] font-medium">
                      {personalData.phone}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </Link>
            )}

            <Link
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 glass hover:glass-strong rounded-2xl p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
                  <FaGithub size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.18em] font-medium">
                    GitHub
                  </p>
                  <p className="text-white text-[13.5px] font-medium">
                    @Phillipe204
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </Link>

            <Link
              href={personalData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 glass hover:glass-strong rounded-2xl p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80">
                  <FaLinkedin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.18em] font-medium">
                    LinkedIn
                  </p>
                  <p className="text-white text-[13.5px] font-medium">
                    Connect with me
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
