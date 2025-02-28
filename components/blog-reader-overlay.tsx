import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Share2, Bookmark, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from './blogs-section';

interface BlogReaderProps {
  post: BlogPost;
  onClose: () => void;
}

export function BlogReaderOverlay({ post, onClose }: BlogReaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('blog-content');
      if (element) {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setReadingProgress(progress);
      }
    };

    const element = document.getElementById('blog-content');
    element?.addEventListener('scroll', handleScroll);
    return () => element?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        className={`relative w-full max-w-4xl h-[90vh] mx-4 rounded-xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-900' : 'bg-white'
        }`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
          <motion.div
            className="h-full bg-blue-600"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Toolbar */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-4 ${
          isDarkMode ? 'bg-slate-800/90' : 'bg-white/90'
        } backdrop-blur-sm border-b ${
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {post.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                className={isDarkMode ? 'text-white hover:text-white' : 'text-slate-900'}
            >
                <span className="text-sm">A-</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                className={isDarkMode ? 'text-white hover:text-white' : 'text-slate-900'}
            >
                <span className="text-lg">A+</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(prev => !prev)}
                className={isDarkMode ? 'text-white hover:text-white' : 'text-slate-900'}
            >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(prev => !prev)}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div
          id="blog-content"
          className={`h-[calc(90vh-64px)] overflow-y-auto p-8 ${
            isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
          }`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="max-w-2xl mx-auto">
            {/* Cover image */}
            <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                <span className="text-slate-400 text-2xl">{post.title.charAt(0)}</span>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <span>{post.author.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-slate-500">{post.publishedDate}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500">{post.readingTime}</div>
            </div>

            {/* Article content */}
            <article className="prose prose-lg max-w-none">
              <h1 className="mb-8">{post.title}</h1>
              {post.content}
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}