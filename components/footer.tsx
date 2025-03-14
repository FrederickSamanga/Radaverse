"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounted, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which logo to show
  const currentTheme = resolvedTheme || 'light';
  const logoSrc = currentTheme === 'dark' 
    ? "/images/Radaverse-light.webp" 
    : "/images/Radaverse-dark.webp";

  const [email, setEmail] = useState('');
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  interface NewsletterFormEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
  }

  const handleSubmit = (e: NewsletterFormEvent): void => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              {mounted ? (
                <img
                  src={logoSrc}
                  alt="Radaverse Logo"
                  className="h-8 w-auto"
                />
              ) : (
                <div className="h-8 w-auto" />
              )}
            </Link>
            <p className="text-muted-foreground text-sm">
              Shaping Tomorrow, Today. Harnessing innovation to transform ideas into reality across multiple industries.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#vision" className="text-muted-foreground hover:text-primary transition-colors">
                  Vision
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Agriculture
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Fuel & Gas
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Retail
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none"
                  required
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </form>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={14} className="mr-2" />
                <span>419-124 Chinhoyi Street, Harare</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone size={14} className="mr-2" />
                <span>+263 77 315 3738</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail size={14} className="mr-2" />
                <span>info@radaverse.co.zw</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Radaverse Solutions. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -5 }}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
}