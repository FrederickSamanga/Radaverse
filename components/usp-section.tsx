"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Users, CheckCircle, Globe } from 'lucide-react';

const usps = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Cutting-edge Innovation",
    description: "Leveraging the latest technologies to deliver forward-thinking solutions."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Scalable and Secure",
    description: "Building robust systems that grow with your business while maintaining the highest security standards."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Customer-centric Approach",
    description: "Focusing on your unique needs to deliver tailored solutions that exceed expectations."
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Industry Best Practices",
    description: "Adhering to proven methodologies and standards to ensure quality and reliability."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-industry Expertise",
    description: "Bringing specialized knowledge across diverse sectors for comprehensive solutions."
  }
];

export function USPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Radaverse</h2>
          <p className="text-lg text-muted-foreground">
            Our unique approach combines technical excellence with industry expertise to deliver exceptional results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {usp.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{usp.title}</h3>
              <p className="text-muted-foreground">{usp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}