import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ForWhom } from "@/components/ForWhom";
import { Risks } from "@/components/Risks";
import { HowWeClose } from "@/components/HowWeClose";
import { WhatWeFix } from "@/components/WhatWeFix";
import { SurfaceProtection } from "@/components/SurfaceProtection";
import { Process } from "@/components/Process";
import { Handover } from "@/components/Handover";
import { Documents } from "@/components/Documents";
import { WhatWeAlign } from "@/components/WhatWeAlign";
import { Experience } from "@/components/Experience";
import { Standards } from "@/components/Standards";
import { ForEstimate } from "@/components/ForEstimate";
import { EstimateForm } from "@/components/EstimateForm";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ForWhom />
        <Risks />
        <HowWeClose />
        <WhatWeFix />
        <SurfaceProtection />
        <Process />
        <Handover />
        <Documents />
        <WhatWeAlign />
        <Experience />
        <Standards />
        <ForEstimate />
        <EstimateForm />
        <Contacts />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
