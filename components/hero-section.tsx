"use client";

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

export function HeroSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { theme, resolvedTheme } = useTheme();
  
  // Use state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determine if we're in light mode - only after mounting
  const isLightTheme = mounted && (theme === 'system' ? resolvedTheme === 'light' : theme === 'light');
  
  // Dynamic text colors based on theme
  const textColorClass = isLightTheme 
    ? 'text-slate-900' 
    : 'text-white';
  
  const subtitleColorClass = isLightTheme 
    ? 'text-blue-900' 
    : 'text-blue-100';
  
  const buttonClasses = isLightTheme
    ? "relative border border-blue-600/50 text-blue-900 px-8 py-4 rounded-lg"
    : "relative border border-blue-400/30 text-blue-100 px-8 py-4 rounded-lg";
  
  const buttonGlowClasses = isLightTheme
    ? "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-blue-600/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"
    : "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/10 to-blue-600/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700";

  const scrollIndicatorClasses = isLightTheme
    ? "p-3 rounded-full bg-blue-500/30 hover:bg-blue-500/40 transition-colors"
    : "p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors";

  const scrollIconClasses = isLightTheme
    ? "h-6 w-6 text-blue-800"
    : "h-6 w-6 text-blue-300";

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pointer-events-auto">
      {/* Only render content after mounted to avoid hydration mismatch */}
      {mounted && (
        <>
          <motion.div 
            className="container mx-auto px-4 py-16 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* ...existing content... */}
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                variants={itemVariants}
                className={`text-2xl md:text-5xl lg:text-7xl font-bold mb-6 ${textColorClass} relative`}
              >
                {'Welcome to Radaverse'.split('').map((char, index) => (
                    <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.1,
                      times: [0, 0.2, 0.8, 1],
                    }}
                    style={{ 
                      display: 'inline-block', 
                      whiteSpace: 'pre',
                      width: 'fit-content'
                    }}
                    >
                    {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className={`text-xl ${subtitleColorClass} mb-10`}
              >
                Explore boundless innovation through our cutting-edge solutions
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                variants={itemVariants}
              >
                <motion.button 
                  onClick={scrollToServices}
                  className="relative overflow-hidden group px-8 py-4 rounded-lg font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={buttonGlowClasses}></span>
                  <span className={buttonClasses}>
                    Learn More
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-0 right-0 flex justify-center cursor-pointer z-10"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={scrollToNext}
          >
            <div className={scrollIndicatorClasses}>
              <ChevronDown className={scrollIconClasses} />
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}