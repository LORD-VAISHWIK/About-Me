import React from 'react';
import { ArrowDown, Send } from 'lucide-react';
import BackgroundCanvas from './BackgroundCanvas';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center">
      <BackgroundCanvas type="home" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-32 pb-16 md:pt-48 md:pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-300 mb-6 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Building the Next Gen
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] break-words">
            Engineering <br className="hidden sm:block" /> the future <br />
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">with Intelligence.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-secondary max-w-2xl leading-relaxed font-light mt-6">
            I build advanced AI solutions and scalable infrastructure. Creator of <span className="text-white font-medium">Med AI</span> and <span className="text-white font-medium">Primus</span>. Focused on solving complex problems with elegance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2">
              View My Work <ArrowDown className="w-4 h-4" />
            </a>
            <a href="#contact" className="px-8 py-4 glass-card text-white font-semibold rounded-full hover:bg-white/10 transition-all border-white/10 hover:border-blue-500/30 flex items-center justify-center gap-2">
              Get In Touch <Send className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

