"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Milestone, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from 'next-themes';

const timelineItems = [
  {
    year: "2025",
    title: "Foundation",
    description: "Establish Radaverse Solutions as a trusted provider in Zimbabwe."
  },
  {
    year: "2026",
    title: "Expansion",
    description: "Extend operations to neighboring countries in Southern Africa."
  },

  {
    year: "2028",
    title: "Continental Reach",
    description: "Establish presence across major African markets."
  },
  {
    year: "2030",
    title: "Global Recognition",
    description: "Position as a leading multi-industry provider in Africa."
  }
];

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { resolvedTheme } = useTheme();
  
  return (
    <section
      id="vision"
      ref={sectionRef}
      className={`py-20 md:py-32 ${resolvedTheme === 'light' ? 'bg-white' : 'bg-muted/30'} relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Future Vision</h2>
          <p className="text-lg text-muted-foreground">
            Our roadmap to becoming a leading multi-industry provider across Africa.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start mb-6">
                  <Target className="h-8 w-8 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To harness innovation and technology to transform ideas into reality, delivering exceptional solutions that drive business growth and efficiency across multiple industries. We are committed to excellence, integrity, and creating lasting value for our clients.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <TrendingUp className="h-8 w-8 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Strategic Goals</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Establish Radaverse Solutions as a leading multi-industry provider in Africa</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Create an innovation ecosystem that fosters technological advancement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Build strategic partnerships across industries to enhance service offerings</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Develop sustainable solutions that address Africa's unique challenges</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-gradient-to-br from-primary/10 via-background to-background">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Vision Statement</h3>
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
                  "To establish Radaverse Solutions as a leading multi-industry provider in Africa, recognized for our innovative approach, technical excellence, and commitment to transforming businesses through technology-driven solutions."
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <h3 className="text-2xl font-bold mb-8 text-center">Growth Timeline</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border" />
          
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
              >
                <div className="w-1/2 pr-8 text-right">
                  {index % 2 === 0 ? (
                    <>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-primary">{item.year}</div>
                  )}
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                  <div className="w-6 h-6 rounded-full bg-background" />
                </div>
                
                <div className="w-1/2 pl-8">
                  {index % 2 === 0 ? (
                    <div className="text-3xl font-bold text-primary">{item.year}</div>
                  ) : (
                    <>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}