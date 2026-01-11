
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGrowthInsight } from '../services/geminiService';
import { Lightbulb, X, ChevronRight, Brain } from 'lucide-react';

interface AIInsightPanelProps {
  currentChapter: string;
}

const AIInsightPanel: React.FC<AIInsightPanelProps> = ({ currentChapter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async (style: string) => {
    setLoading(true);
    const result = await generateGrowthInsight(currentChapter, style);
    setInsight(result || "Kechirasiz, mentor bilan aloqa uzildi.");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="bg-zinc-800/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 hover:bg-zinc-700/80 transition-all group"
      >
        <div className="bg-amber-500/20 p-2 rounded-lg group-hover:bg-amber-500/30 transition-colors">
          <Brain className="text-amber-400 w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-[10px] uppercase tracking-widest text-amber-500 block font-bold">Mentor Maslahati</span>
          <span className="text-sm font-medium">O'sish uchun turtki</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-0 right-0 w-80 md:w-[400px] bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-amber-500 w-5 h-5" />
                <h4 className="text-xl font-serif">Ichki Mentor</h4>
              </div>
              <button onClick={() => { setIsOpen(false); setInsight(null); }} className="text-gray-500 hover:text-white bg-white/5 p-2 rounded-full">
                <X size={18} />
              </button>
            </div>

            {!insight ? (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">Hozirgi holatingiz uchun qaysi yondashuv kerak?</p>
                {[
                  { id: 'Poetik', label: 'Ruhlantiruvchi', sub: 'Ijodiy va chuqur' },
                  { id: 'Falsafiy', label: 'Mantiqiy', sub: 'Kengroq qarash uchun' },
                  { id: 'Amaliy', label: 'Intizomiy', sub: 'Aniq harakatlar uchun' }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => fetchInsight(style.id)}
                    className="w-full flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group text-left"
                    disabled={loading}
                  >
                    <div>
                      <span className="block text-white font-medium">{style.label}</span>
                      <span className="text-xs text-gray-500">{style.sub}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl"
                >
                  <p className="text-gray-200 leading-relaxed italic text-lg">
                    "{insight}"
                  </p>
                </motion.div>
                <button
                  onClick={() => setInsight(null)}
                  className="w-full py-4 text-xs text-gray-500 hover:text-white uppercase tracking-widest border border-white/5 rounded-xl transition-colors"
                >
                  Boshqa tavsiya olish
                </button>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-3xl z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest text-amber-500">Mentor o'ylamoqda...</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIInsightPanel;
