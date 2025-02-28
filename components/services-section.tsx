"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Cpu, Leaf, Droplet, ShoppingBag, ChevronRight, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 'technology',
    title: 'Technology',
    icon: <Cpu className="h-8 w-8 text-primary" />,
    color: 'from-blue-500/20 to-blue-600/5',
    description: 'Cutting-edge software solutions and IT services to drive digital transformation.',
    services: [
      { name: 'Custom Software Development', description: 'Tailored software solutions designed to meet your specific business needs.' },
      { name: 'IT Consulting and Strategy', description: 'Expert guidance to align technology with your business objectives.' },
      { name: 'Cloud Computing Solutions', description: 'Scalable and secure cloud infrastructure and migration services.' },
      { name: 'Cybersecurity Services', description: 'Comprehensive security solutions to protect your digital assets.' },
      { name: 'AI and Machine Learning', description: 'Intelligent solutions that leverage data for business insights and automation.' },
      { name: 'Web and Mobile Applications', description: 'User-centric applications that deliver exceptional experiences.' },
      { name: 'Data Analytics', description: 'Transform raw data into actionable business intelligence.' }
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    icon: <Leaf className="h-8 w-8 text-secondary" />,
    color: 'from-green-500/20 to-green-600/5',
    description: 'Smart farming technologies and solutions for sustainable agricultural practices.',
    services: [
      { name: 'Smart Farming Technologies', description: 'Advanced technologies to optimize farming operations and increase yields.' },
      { name: 'IoT-based Agricultural Monitoring', description: 'Real-time monitoring systems for crops, soil, and environmental conditions.' },
      { name: 'Precision Farming Solutions', description: 'Data-driven approaches to optimize resource usage and crop management.' },
      { name: 'Supply Chain Optimization', description: 'End-to-end solutions to streamline agricultural supply chains.' }
    ]
  },
  {
    id: 'fuel',
    title: 'Fuel & Gas',
    icon: <Droplet className="h-8 w-8 text-accent" />,
    color: 'from-red-500/20 to-red-600/5',
    description: 'Digital solutions for efficient fuel management and distribution systems.',
    services: [
      { name: 'Digital Fuel Management Systems', description: 'Comprehensive solutions for monitoring and managing fuel resources.' },
      { name: 'Automation in Fuel Distribution', description: 'Streamlined processes for efficient fuel distribution operations.' },
      { name: 'Safety and Compliance Solutions', description: 'Systems to ensure adherence to industry regulations and safety standards.' },
      { name: 'Real-time Monitoring and Analytics', description: 'Data-driven insights for operational efficiency and decision-making.' }
    ]
  },
  {
    id: 'retail',
    title: 'Retail',
    icon: <ShoppingBag className="h-8 w-8 text-chart-4" />,
    color: 'from-yellow-500/20 to-yellow-600/5',
    description: 'Innovative retail solutions to enhance customer experience and operational efficiency.',
    services: [
      { name: 'E-commerce Development', description: 'Custom online shopping platforms to expand your market reach.' },
      { name: 'Inventory Management Solutions', description: 'Efficient systems to optimize stock levels and reduce costs.' },
      { name: 'Point-of-Sale (POS) Systems', description: 'Modern POS solutions that streamline checkout and payment processes.' },
      { name: 'Customer Relationship Management', description: 'Tools to build and maintain strong customer relationships.' }
    ]
  }
];

export function ServicesSection() {
  type Service = typeof services[number];
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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
  
  interface ServiceItem {
    name: string;
    description: string;
  }

  interface ServiceData {
    id: string;
    title: string;
    icon: JSX.Element;
    color: string;
    description: string;
    services: ServiceItem[];
  }

  const handleServiceClick = (service: ServiceData): void => {
    setSelectedService(service);
  };
  
  const closeServiceDetails = () => {
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 md:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive solutions across multiple industries, tailored to meet your specific needs and drive business growth.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card 
                className={cn(
                  "h-full overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 border-border/50",
                  selectedService?.id === service.id ? "ring-2 ring-primary" : ""
                )}
                onClick={() => handleServiceClick(service)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-radial ${service.color}`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <div className="flex items-center text-sm text-primary font-medium">
                    <span>Explore Services</span>
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-12 bg-card rounded-lg border border-border/50 p-6 relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={closeServiceDetails}
              >
                <X size={20} />
              </Button>
              
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gradient-radial ${selectedService.color}`}>
                  {selectedService.icon}
                </div>
                <h3 className="text-2xl font-bold">{selectedService.title} Services</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedService.services.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-background rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <h4 className="font-bold mb-2">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}