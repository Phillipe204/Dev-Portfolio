import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import CybersecuritySection from "./components/homepage/cybersecurity";
import Experience from "./components/homepage/experience";
import GoalsSection from "./components/homepage/goals";
import HeroSection from "./components/homepage/hero-section";
import ITInterests from "./components/homepage/it-interests";
import NowSection from "./components/homepage/now";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import SectionDivider from "./components/helper/section-divider";

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <SectionDivider />
      <NowSection />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <ITInterests />
      <SectionDivider />
      <CybersecuritySection />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <GoalsSection />
      <SectionDivider />
      <ContactSection />
    </div>
  );
}
