"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Vision', href: '#vision' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounted, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Only add scroll listener after component is mounted
    if (mounted) {
      // Run handleScroll on mount to set initial state
      handleScroll();
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mounted]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Determine which logo to show - only after hydration
  const currentTheme = mounted ? (resolvedTheme || 'light') : 'light';
  const logoSrc = currentTheme === 'dark' 
    ? "/images/Radaverse-light.webp" 
    : "/images/Radaverse-dark.webp";
    
  // Use a consistent initial class to avoid hydration mismatch
  const headerClassName = mounted 
    ? cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled 
          ? 'glass py-2' 
          : currentTheme === 'light'
            ? 'bg-white/90 py-4 text-gray-800 shadow-sm backdrop-blur-sm'
            : 'bg-transparent py-4 text-gray-300 dark:text-white'
      )
    : 'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-4';

  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center"
          >
            {mounted ? (
              <img  
              src={logoSrc}
              alt="Radaverse Logo" 
              className="w-auto h-8 md:h-10 transform -translate-y-1 scale-[1.4]" 
              />
            ) : (
              <div className="w-auto h-8 md:h-10 transform -translate-y-1 scale-[1.4]" />
            )}
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Link
                href={item.href}
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <ThemeToggle />
          </motion.div>
        </nav>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-2 text-base font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <ChevronRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}