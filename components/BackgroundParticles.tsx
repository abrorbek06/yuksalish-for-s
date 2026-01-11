
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BackgroundParticles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-500/10 blur-[2px]"
          initial={{ x: `${p.x}%`, y: '110%', opacity: 0 }}
          animate={{
            y: '-10%',
            opacity: [0, 0.4, 0],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;
