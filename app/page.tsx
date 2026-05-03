import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { LanguageProvider } from "@/components/LanguageProvider";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import ScrollProgress from "@/components/ScrollProgress";
import Services from "@/components/Services";
import { StartProjectProvider } from "@/components/StartProjectModal";
import Technologies from "@/components/Technologies";

export default function Page() {
  return (
    <LanguageProvider>
      <StartProjectProvider>
        <Cursor />
        <ScrollProgress />
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Certifications />
        <Technologies />
        <About />
        <Contact />
        <Footer />
      </StartProjectProvider>
    </LanguageProvider>
  );
}
