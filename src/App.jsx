import React from 'react';
// React import kept to avoid tooling edge-cases; JSX runtime doesn't require it in modern setups.
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BackgroundCanvas from './components/BackgroundCanvas';
import { motion } from 'framer-motion';
import { ArrowDown, Brain, Code, Copy, Cpu, Database, Github, Globe, HeartPulse, Layout, Layers, Mail, Monitor, Settings, ShieldCheck, Terminal, Wind, Zap, Container, Instagram } from 'lucide-react';

const TechMarquee = () => {
  const techs = [
    { name: 'AI', icon: Brain, color: 'text-blue-500' },
    { name: 'Python', icon: Cpu, color: 'text-yellow-400' },
    { name: 'JS', icon: Code, color: 'text-yellow-300' },
    { name: 'SQL', icon: Database, color: 'text-green-400' },
    { name: 'C / C#', icon: Terminal, color: 'text-indigo-500' },
    { name: 'Rust', icon: Settings, color: 'text-orange-500' },
    { name: 'FastAPI', icon: Zap, color: 'text-teal-400' },
    { name: 'Docker', icon: Container, color: 'text-cyan-500' },
    { name: 'Tailwind', icon: Wind, color: 'text-sky-400' },
    { name: 'React', icon: Layout, color: 'text-blue-400' },
    { name: 'Tauri', icon: Monitor, color: 'text-violet-400' },
  ];

  return (
    <div className="w-full overflow-hidden bg-black/30 backdrop-blur-md py-8 md:py-12 border-y border-white/5 relative">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
      <div className="flex w-[200%] animate-marquee">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16 px-6 min-w-full justify-around text-slate-400 font-semibold text-sm md:text-lg whitespace-nowrap">
            {techs.map((t) => (
              <span key={t.name} className="flex items-center gap-2 md:gap-3 hover:text-white transition-colors">
                <t.icon className={`${t.color} w-4 h-4 md:w-6 md:h-6`} /> {t.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Experience = () => (
  <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
    <BackgroundCanvas type="experience" />
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Professional Experience</h2>
        <p className="text-secondary mb-12 text-base md:text-lg">My journey in tech and leadership.</p>
      </motion.div>
      
      <div className="relative border-l border-white/10 ml-3 space-y-12 md:space-y-16">
        {[
          { title: 'Chairperson', company: 'Vyoma Company', period: '2025 - Present', desc: 'Spearheading strategic direction and technological innovation.' },
          { title: 'Software Engineer', company: 'Independent', period: '2020 - Present', desc: 'Specializing in system-level performance using Rust and C#.' },
          { title: 'Freelancer', company: 'Self-Employed', period: '2019 - 2020', desc: 'Delivered complete web solutions and UI/UX prototyping.' },
        ].map((job, idx) => (
          <motion.div 
            key={idx} 
            className="ml-6 md:ml-10 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <span className="absolute -left-[calc(var(--timeline-dot-offset)+0.125rem)] top-1 w-4 h-4 md:w-6 md:h-6 rounded-full bg-black border-2 md:border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform"></span>
            <div className="glass-card p-4 md:p-6 rounded-2xl hover:bg-white/5 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                <span className="self-start md:self-auto text-[0.625rem] md:text-xs font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">{job.period}</span>
              </div>
              <p className="text-slate-300 mb-4 leading-relaxed text-sm md:text-base">{job.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const App = () => {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <TechMarquee />
        <Experience />
        
        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
          <BackgroundCanvas type="skills" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Skills & Technologies</h2>
              <p className="text-secondary mb-12 text-base md:text-lg">A comprehensive technical toolkit.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { title: 'Languages', items: ['Python', 'Rust', 'JavaScript (ES6+)'], icon: Code },
                { title: 'Backend', items: ['FastAPI', 'Docker / Nginx', 'PostgreSQL'], icon: Terminal },
                { title: 'Frontend', items: ['React & Tailwind', 'Tauri', 'Figma'], icon: Layout },
                { title: 'DevOps', items: ['Git & Automation', 'Linux / Ubuntu'], icon: Settings },
              ].map((skill, i) => (
                <motion.div 
                  key={i} 
                  className="glass-card p-6 md:p-8 rounded-3xl group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><skill.icon /></div> {skill.title}
                  </h3>
                  <div className="space-y-4">
                    {skill.items.map(item => (
                      <div key={item} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                        <span className="font-medium text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
          <BackgroundCanvas type="projects" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Featured Projects</h2>
                <p className="text-secondary text-base md:text-lg">Highlighting my work in AI, System Architecture, and Web Solutions.</p>
              </motion.div>
              <a href="https://github.com/LORD-VAISHWIK" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors group">
                View Github <ArrowDown className="w-4 h-4 group-hover:translate-x-1 rotate-[270deg] transition-transform" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 project-grid">
              {[
                { title: 'Med AI', icon: HeartPulse, color: 'text-red-500', bg: 'from-red-600/20', tags: ['Python', 'TF'] },
                { title: 'Primus Engine', icon: Layers, color: 'text-blue-500', bg: 'from-blue-600/20', tags: ['Rust', 'Systems'] },
                { title: 'Primus Infotech', icon: Globe, color: 'text-cyan-500', bg: 'from-cyan-600/20', tags: ['React', 'Corporate'] },
                { title: 'Primus Admin', icon: ShieldCheck, color: 'text-indigo-500', bg: 'from-indigo-600/20', tags: ['Admin', 'Security'] },
                { title: 'Primus Tech', icon: Cpu, color: 'text-violet-500', bg: 'from-violet-600/20', tags: ['Tech', 'Services'] },
                { title: 'Cafe Hydras', icon: Monitor, color: 'text-orange-500', bg: 'from-orange-600/20', tags: ['Design', 'Frontend'] },
              ].map((p, i) => (
                <motion.div 
                  key={i} 
                  className="project-card group relative glass-card rounded-2xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="aspect-video bg-black/40 relative overflow-hidden border-b border-white/5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.bg} to-black/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-700`}>
                      <p.icon className={`w-16 h-16 ${p.color} drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]`} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                    <div className="flex gap-2 text-xs font-mono text-slate-400 flex-wrap">
                      {p.tags.map(tag => (
                        <span key={tag} className="bg-white/5 px-2 py-1 rounded border border-white/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 border-t border-white/5 bg-black/40 relative overflow-hidden">
          <BackgroundCanvas type="contact" />
          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white tracking-tight">Let&apos;s build the future<br/><span className="text-gradient">together.</span></h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                <a href="mailto:yagnarshivaishwik@icloud.com" className="w-full sm:w-auto px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  <Mail className="w-4 h-4" /> Say Hello
                </a>
                <button onClick={() => { navigator.clipboard.writeText('yagnarshivaishwik@icloud.com'); alert('Email copied!'); }} className="w-full sm:w-auto px-8 py-3 glass-card text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4" /> Copy Email
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="py-8 md:py-10 border-t border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs md:text-sm">
          <div>© 2025 Vaishwik. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="https://github.com/LORD-VAISHWIK" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/yagnarshivaishwik/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
