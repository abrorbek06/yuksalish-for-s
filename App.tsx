
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { CHAPTERS } from './constants';
import ParallaxSection from './components/ParallaxSection';
import BackgroundParticles from './components/BackgroundParticles';
import { Compass, ArrowDown, Share2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-index]');
      let current = 0;
      sections.forEach((section, idx) => {
        const top = (section as HTMLElement).offsetTop;
        if (window.scrollY >= top - window.innerHeight / 2) {
          current = idx;
        }
      });
      setActiveChapterIndex(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-[#050505] text-white selection:bg-amber-900 selection:text-amber-100">
      <BackgroundParticles />

      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 pointer-events-auto"
        >
          <Compass className="text-amber-500 w-5 h-5 animate-pulse" />
          <div className="h-4 w-[1px] bg-white/20 mx-2" />
          <h1 className="text-sm font-serif tracking-[0.3em] uppercase text-white/80">Yuksaklik <span className="text-white/20 mx-2">/</span> <span className="text-amber-500/80 italic font-normal">Evolyutsiya</span></h1>
        </motion.div>

        <div className="pointer-events-auto flex items-center gap-6">
          <button className="text-white/40 hover:text-amber-500 transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </nav>

      {/* Chapter Indicator Dots (Right Side) */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 hidden md:flex">
        {CHAPTERS.map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: activeChapterIndex === i ? 1.5 : 1,
              backgroundColor: activeChapterIndex === i ? "#d97706" : "rgba(255,255,255,0.1)"
            }}
            className="w-1.5 h-1.5 rounded-full cursor-pointer"
            onClick={() => {
              const el = document.querySelector(`section[data-index="${i}"]`);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* Cover / Hero Section */}
      <section className="h-screen w-full relative flex flex-col items-center justify-center text-center px-4 bg-black overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="z-10"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] uppercase tracking-[1em] text-amber-500/60 mb-12 block"
          >
            Interactive Feature Article
          </motion.span>
          <h1 className="text-8xl md:text-[14rem] font-bold mb-8 tracking-tighter leading-[0.85] font-serif italic text-white/95">
            Yuksaklik
          </h1>
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="h-[1px] w-12 bg-white/10" />
            <p className="text-xs md:text-sm font-light text-gray-500 uppercase tracking-[0.5em] italic">
              Ruhning vertikal parvozi haqida
            </p>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-16 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] uppercase tracking-[0.6em] text-white/20">Hikoyani o'qing</span>
          <ArrowDown size={12} className="text-amber-500/40" />
        </motion.div>

        {/* Cinematic Particles Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_black_100%)] opacity-50" />
      </section>

      {/* Narrative Chapters */}
      {CHAPTERS.map((chapter, index) => (
        <div key={chapter.id} data-index={index}>
          <ParallaxSection 
            chapter={chapter} 
            index={index} 
          />
        </div>
      ))}

      {/* Final Narrative Conclusion */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] p-10 text-center relative">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="max-w-xl z-10"
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-amber-500 to-transparent mx-auto mb-16" />
          <h2 className="text-4xl md:text-6xl font-serif mb-12 italic leading-tight">Yangi ufqlarga tayyormisiz?</h2>
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-20 italic">
            "Hayot bu o'zingizni topish emas, hayot bu o'zingizni yaratishdir." 
            Sizning evolyutsiyangiz bugun shu nuqtada tugamaydi, u faqatgina yangi bosqichga ko'tariladi.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, letterSpacing: "0.6em" }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-16 py-6 border border-amber-500/30 text-amber-500 transition-all rounded-full uppercase text-[9px] tracking-[0.4em] font-bold bg-amber-500/5 hover:bg-amber-500/10"
          >
            Sayohatni qayta boshlash
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
};

export default App;
