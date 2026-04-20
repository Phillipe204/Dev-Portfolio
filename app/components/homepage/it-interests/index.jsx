"use client";
import { motion } from "framer-motion";
import { Wrench, Network, Settings, Terminal } from "lucide-react";
import SectionTitle from "../../helper/section-title";

const interests = [
  {
    title: "Technical Troubleshooting",
    description:
      "Diagnosing and resolving hardware, software, and network issues through systematic problem-solving.",
    Icon: Wrench,
  },
  {
    title: "Networking Fundamentals",
    description:
      "Understanding TCP/IP, DNS, routing, and how data moves across networks and the internet.",
    Icon: Network,
  },
  {
    title: "System Setup & Configuration",
    description:
      "Setting up development environments, servers, and tools. Making systems work reliably from the ground up.",
    Icon: Settings,
  },
  {
    title: "Linux & Command Line",
    description:
      "Building comfort with Linux environments, shell commands, file systems, and terminal-based workflows.",
    Icon: Terminal,
  },
];

function ITInterests() {
  return (
    <section id="it-interests" className="relative px-6 py-24 lg:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Beyond the code"
          title="IT & technical interests."
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center text-white/55 text-[16px] leading-relaxed -mt-8 mb-14"
        >
          Strong developers understand more than just code. My interest in
          IT, systems, and infrastructure gives me a broader view — from the
          application layer down to the network and hardware.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {interests.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/80 mb-4">
                <item.Icon size={18} strokeWidth={1.6} />
              </div>
              <h3 className="text-white font-semibold mb-2 text-[15px]">
                {item.title}
              </h3>
              <p className="text-[13.5px] text-white/55 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ITInterests;
