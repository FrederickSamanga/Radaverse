"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Target, Award, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    title: "Innovation",
    description: "Constantly pushing boundaries to create cutting-edge solutions",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 12h5"></path><path d="M17 12h5"></path><path d="M12 2v5"></path><path d="M12 17v5"></path><path d="m4.93 4.93 3.54 3.54"></path><path d="m15.54 15.54 3.54 3.54"></path><path d="m15.54 4.93-3.54 3.54"></path><path d="m4.93 15.54 3.54-3.54"></path><circle cx="12" cy="12" r="3"></circle></svg>
  },
  {
    title: "Excellence",
    description: "Delivering the highest quality in every project we undertake",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
  },
  {
    title: "Integrity",
    description: "Maintaining the highest ethical standards in all our dealings",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m12 8 3 3-3 3-3-3 3-3"></path></svg>
  },
  {
    title: "Collaboration",
    description: "Working together with clients to achieve shared goals",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="9" cy="7" r="4"></circle><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0-3-3.85"></path></svg>
  }
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Radaverse Solutions</h2>
          <p className="text-lg text-muted-foreground">
            Founded in February 2025, Radaverse Solutions is a pioneering multi-industry provider committed to delivering innovative solutions across Technology, Agriculture, Fuel & Gas, and Retail sectors.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-lg p-6 border border-border/50"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Target className="mr-2 text-primary" size={24} />
              Our Vision
            </h3>
            <p className="text-muted-foreground">
              To establish Radaverse Solutions as a leading multi-industry provider in Africa, recognized for our innovative approach, technical excellence, and commitment to transforming businesses through technology-driven solutions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-lg p-6 border border-border/50"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Calendar className="mr-2 text-primary" size={24} />
              Founded
            </h3>
            <p className="text-muted-foreground mb-2">
              February 2025 in Harare, Zimbabwe
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={16} className="mr-1" />
              <span>419-124 Chinhoyi Street, Harare</span>
            </div>
          </motion.div>
        </div>
        
        <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
          <Award className="mr-2 text-primary" size={24} />
          Our Values
        </h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">{value.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}