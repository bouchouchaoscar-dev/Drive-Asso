import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Concept } from "@/components/sections/Concept";
import { Preuve } from "@/components/sections/Preuve";
import { Solution } from "@/components/sections/Solution";
import { StandardTeaser } from "@/components/sections/StandardTeaser";
import { Comparatif } from "@/components/sections/Comparatif";
import { CercleVertueux } from "@/components/sections/CercleVertueux";
import { SurMesure } from "@/components/sections/SurMesure";
import { Contact } from "@/components/sections/Contact";
import { RevealInit } from "@/components/ui/RevealInit";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Concept />
        <Solution />
        <StandardTeaser />
        <Comparatif />
        <CercleVertueux />
        <SurMesure />
        <Preuve />
        <Contact />
      </main>
      <Footer />
      <RevealInit />
    </>
  );
}
