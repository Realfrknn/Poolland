import { useState } from "react";
import useLenis from "@/hooks/useLenis";
import StickyNav from "@/components/StickyNav";
import ScrollProgress from "@/components/ScrollProgress";
import CinematicLoader from "@/components/CinematicLoader";
import CustomCursor from "@/components/CustomCursor";
import AmbientFx from "@/components/AmbientFx";
import HeroSection from "@/sections/HeroSection";
import ServicesOverview from "@/sections/ServicesOverview";
import YataySondajSection from "@/sections/YataySondajSection";
import KuyuDerinlestirmeSection from "@/sections/KuyuDerinlestirmeSection";
import KuyuGuclendirmeSection from "@/sections/KuyuGuclendirmeSection";
import OtherServicesSection from "@/sections/OtherServicesSection";
import GallerySection from "@/sections/GallerySection";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import FooterSection from "@/sections/FooterSection";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  useLenis(introDone);

  return (
    <>
      <CinematicLoader onComplete={() => setIntroDone(true)} />
      <AmbientFx />
      <CustomCursor />
      <ScrollProgress />
      <StickyNav />
      <main>
        <HeroSection />
        <ServicesOverview />
        <YataySondajSection />
        <KuyuDerinlestirmeSection />
        <KuyuGuclendirmeSection />
        <OtherServicesSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
