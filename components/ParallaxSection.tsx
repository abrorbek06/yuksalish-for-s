
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Chapter } from '../types';
import TextReveal from './TextReveal';

interface ParallaxSectionProps {
  chapter: Chapter;
  index: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ chapter, index }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Background animations
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.4, 0.4, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  
  // Content animations
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section 
      ref={ref} 
      className="relative min-h-[150vh] w-full flex flex-col items-center py-32"
    >
      {/* Sticky Background Image Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
        <motion.div 
          style={{ opacity: bgOpacity, scale: bgScale }}
          className="absolute inset-0"
        >
          <img 
            src={chapter.imageUrl} 
            alt={chapter.title}
            className="w-full h-full object-cover filter grayscale-[0.5] contrast-[1.1]"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${chapter.color} mix-blend-multiply opacity-90`} />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </div>

      {/* Narrative Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 container mx-auto px-6 md:px-0 max-w-3xl mt-[-50vh]"
      >
        <div className="bg-zinc-950/40 backdrop-blur-md p-10 md:p-20 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 1.5 }}
            className="h-[1px] bg-amber-500/50 mb-12"
          />
          
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            className="text-amber-500 uppercase text-[10px] font-bold mb-6 block tracking-[0.3em]"
          >
            BOSQICH 0{index + 1}
          </motion.span>
          
          <TextReveal 
            text={chapter.title} 
            className="text-5xl md:text-8xl font-serif italic mb-6 text-white leading-none"
          />
          
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xl md:text-2xl font-light text-amber-100/60 mb-12 border-l border-amber-500/30 pl-6 italic"
          >
            {chapter.subtitle}
          </motion.h3>

          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-amber-500">
              {chapter.content}
            </p>
            
            {/* Extended Longread Text (Dynamic placeholder for depth) */}
            <p className="text-lg md:text-xl text-gray-400/80 leading-relaxed font-light mt-8">
              Inson o'z evolyutsiyasini tushunishni boshlaganida, uning atrofidagi olam ham o'zgaradi. 
              Bu bosqichda siz nafaqat tashqi to'siqlarni, balki ichki cheklovlarni ham ko'ra boshlaysiz. 
              Har bir yangi bilim — bu sizni cho'qqiga yaqinlashtiruvchi zinapoyadir.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Side Progress Decoration */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 h-64 w-[1px] bg-white/5 hidden 2xl:block overflow-hidden">
        <motion.div 
          style={{ scaleY: scrollYProgress }}
          className="w-full bg-amber-500 origin-top h-full"
        />
        <div className="absolute top-0 left-[-4px] text-[8px] text-amber-500/40 rotate-90 origin-left tracking-widest uppercase">Reading Progress</div>
      </div>
    </section>
  );
};

export default ParallaxSection;
