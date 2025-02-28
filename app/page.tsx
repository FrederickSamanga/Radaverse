"use client";

import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { USPSection } from '@/components/usp-section';
import { VisionSection } from '@/components/vision-section';
import { BlogsSection } from '@/components/blogs-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import VanillaThreeScene from '@/components/vanilla-three-scene';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Three.js scene */}
      <VanillaThreeScene />
      
      {/* Main content */}
      <div className="relative z-0">
        <Navbar />
        <HeroSection />
        <div className="bg-slate-900/95 relative z-10">
          <AboutSection />
          <ServicesSection />
          <USPSection />
          <VisionSection />
          <BlogsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}