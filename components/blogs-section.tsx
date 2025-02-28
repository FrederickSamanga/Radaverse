"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User, Tags } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogReaderOverlay } from './blog-reader-overlay';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedDate: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
}

// Sample blog data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Rise of Zimbabwe\'s Tech Ecosystem',
    excerpt: 'How Zimbabwe is positioning itself as a growing tech hub in Southern Africa with innovative startups and tech initiatives.',
    content: 'Zimbabwe\'s tech scene has been quietly but steadily growing over the past decade...',
    coverImage: '/images/blogs/zim-tech-ecosystem.jpg',
    publishedDate: 'June 12, 2023',
    readingTime: '5 min read',
    author: {
      name: 'Tatenda Moyo',
      avatar: '/images/authors/tatenda.jpg'
    },
    category: 'Tech Ecosystem',
    tags: ['Zimbabwe', 'Startups', 'Innovation']
  },
{
    id: '2',
    title: 'Digital Financial Revolution in Africa',
    excerpt: 'Exploring how mobile money and digital payment solutions are transforming financial inclusion across Africa.',
    content: 'The digital financial revolution in Africa has been nothing short of remarkable. From the success of M-Pesa in Kenya to the rise of numerous fintech startups across the continent, Africa has emerged as a global leader in mobile money innovation. This transformation has been driven by necessity, with traditional banking infrastructure often being inaccessible to large portions of the population. Mobile money solutions have filled this gap, enabling millions of previously unbanked individuals to participate in the formal financial system. The impact has been particularly significant in rural areas, where banking branches are scarce. These digital solutions have facilitated everything from daily transactions to international remittances, contributing to economic growth and financial inclusion. The success of these platforms has attracted significant investment in African fintech, leading to the emergence of numerous unicorn startups valued at over $1 billion. This digital financial ecosystem has also fostered innovation in adjacent sectors, from e-commerce to agricultural technology, creating a multiplier effect on economic development...',
    coverImage: '/images/blogs/digital-finance.jpg',
    publishedDate: 'July 15, 2023',
    readingTime: '8 min read',
    author: {
        name: 'Charles Munda',
        avatar: '/images/authors/charles.jpg'
    },
    category: 'Fintech',
    tags: ['Digital Payments', 'Financial Inclusion', 'Mobile Money']
},
{
    id: '4',
    title: 'The Rise of African E-commerce Platforms',
    excerpt: 'Analyzing the growth and impact of indigenous e-commerce solutions in African markets.',
    content: 'E-commerce in Africa has experienced exponential growth in recent years, with local platforms adapting to unique market conditions and consumer needs. These platforms have overcome significant challenges, including limited internet penetration, logistics difficulties, and payment infrastructure gaps. Success stories like Jumia and Takealot have demonstrated the viability of e-commerce in African markets, while numerous smaller platforms cater to specific national or regional markets. The sector has shown remarkable resilience, developing innovative solutions such as cash-on-delivery options and pickup points to address last-mile delivery challenges. Mobile-first approaches have been particularly successful, given the high smartphone penetration rates across the continent. The COVID-19 pandemic accelerated e-commerce adoption, leading to permanent changes in consumer behavior. These platforms are not just facilitating trade but are also creating employment opportunities and supporting the growth of small businesses. The integration of local payment solutions and partnerships with traditional retail networks has been crucial in building trust and accessibility...',
    coverImage: '/images/blogs/ecommerce.jpg',
    publishedDate: 'August 20, 2023',
    readingTime: '9 min read',
    author: {
        name: 'Samuel Osei',
        avatar: '/images/authors/samuel.jpg'
    },
    category: 'E-commerce',
    tags: ['Digital Trade', 'Retail', 'Market Growth']
},
{
    id: '7',
    title: 'Green Technology Initiatives in Africa',
    excerpt: 'Innovative sustainable technology solutions addressing environmental challenges in Africa.',
    content: 'Green technology initiatives are gaining momentum across Africa, with innovative solutions addressing environmental challenges while promoting sustainable development. Solar energy projects are leading the way, with both large-scale installations and micro-grid solutions bringing clean power to urban and rural areas. Electric mobility solutions adapted to African conditions are emerging, particularly in the motorcycle taxi sector. Waste management technology is another growing sector, with startups developing innovative recycling solutions and waste-to-energy projects. These initiatives are not only addressing environmental concerns but also creating new economic opportunities. The adoption of green building technologies and energy-efficient solutions is increasing in urban development projects. Water conservation technology is playing a crucial role in addressing water scarcity challenges. These developments are supported by policy initiatives promoting renewable energy and sustainable technology adoption. The growth of green technology is attracting both local and international investment, creating a promising sector for innovation and development...',
    coverImage: '/images/blogs/green-tech.jpg',
    publishedDate: 'September 30, 2023',
    readingTime: '8 min read',
    author: {
        name: 'Amara Diallo',
        avatar: '/images/authors/amara.jpg'
    },
    category: 'Green Tech',
    tags: ['Sustainability', 'Renewable Energy', 'Environmental Tech']
}
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
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

export function BlogsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-slate-900/95 dark:to-slate-950/90" id="blogs">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Latest Insights & Trends</h2>
          <p className="text-xl text-slate-600 dark:text-blue-100/80 max-w-2xl mx-auto">
            Stay informed with the latest tech developments and innovations from Africa and beyond
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >All</Button>
            {categories.map(category => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >{category}</Button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredPosts.map(post => (
            <motion.div 
              key={post.id}
              className={`cursor-pointer bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700/50 shadow-lg transition-all duration-300 ${
                hoveredPost === post.id ? 'transform -translate-y-2 shadow-xl shadow-blue-900/20' : ''
              }`}
              onClick={() => setSelectedPost(post)}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              variants={itemVariants}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 dark:from-slate-900 to-transparent opacity-60 z-10"></div>
                <div className="w-full h-full relative bg-gray-200 dark:bg-slate-700">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-slate-600">
                    <span className="text-lg">{post.title.charAt(0)}</span>
                  </div>
                </div>
                <Badge className="absolute top-3 right-3 z-20 bg-blue-600 hover:bg-blue-700">
                  {post.category}
                </Badge>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mb-3">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="mr-3">{post.publishedDate}</span>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{post.readingTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-gray-200/80 dark:bg-slate-700/50 text-gray-700 dark:text-blue-300 hover:bg-gray-300 dark:hover:bg-slate-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-500">
                    <span>{post.author.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-slate-300">{post.author.name}</span>
                </div>
                
                <Button variant="link" className="p-0 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
                  Read more 
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View All Articles
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedPost && (
          <BlogReaderOverlay
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}