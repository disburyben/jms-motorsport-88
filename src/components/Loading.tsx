import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Loading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds loading time
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Delay before hiding
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* JMS Logo */}
        <motion.div
          className="mb-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4">
            {/* Racing number badge */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#ff6600] to-[#ff8800] flex items-center justify-center shadow-[0_0_30px_rgba(255,102,0,0.5)]">
              <span 
                className="text-black text-4xl md:text-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }}
              >
                88
              </span>
            </div>
            <div>
              <h1 
                className="text-white tracking-[0.15em] text-2xl md:text-3xl m-0"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }}
              >
                JMS MOTORSPORT
              </h1>
              <p className="text-[#ff6600] text-xs md:text-sm tracking-[0.3em] mt-1 m-0">
                SPRINTCAR RACING
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Track */}
        <div className="w-full max-w-2xl px-8">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-3 bg-[#1a1a1a] border border-[#333] overflow-hidden"
          >
            {/* Checkered flag pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    #fff 0px,
                    #fff 8px,
                    #000 8px,
                    #000 16px
                  )
                `
              }}
            />

            {/* Orange glow track */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff6600] via-[#ff8800] to-[#ff6600] shadow-[0_0_20px_rgba(255,102,0,0.6)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />

            {/* Race car icon */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-10"
              style={{ left: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              <div className="relative -translate-x-1/2">
                {/* Car body (simplified sprintcar shape) */}
                <svg width="50" height="30" viewBox="0 0 50 30" className="drop-shadow-[0_0_15px_rgba(255,102,0,0.8)]">
                  {/* Rear wing */}
                  <rect x="2" y="5" width="12" height="2" fill="#ff6600" />
                  <rect x="2" y="8" width="12" height="1" fill="#ff8800" />
                  
                  {/* Main body */}
                  <path 
                    d="M 15 12 L 45 12 L 48 15 L 48 20 L 12 20 L 12 15 Z" 
                    fill="#ff6600"
                    stroke="#fff"
                    strokeWidth="0.5"
                  />
                  
                  {/* Cockpit */}
                  <rect x="25" y="8" width="10" height="4" fill="#1a1a1a" stroke="#ff6600" strokeWidth="0.5" />
                  
                  {/* Front wing */}
                  <rect x="42" y="10" width="6" height="1.5" fill="#ff8800" />
                  
                  {/* Wheels */}
                  <circle cx="20" cy="20" r="4" fill="#1a1a1a" stroke="#ff6600" strokeWidth="1" />
                  <circle cx="40" cy="20" r="4" fill="#1a1a1a" stroke="#ff6600" strokeWidth="1" />
                  
                  {/* Wheel details */}
                  <circle cx="20" cy="20" r="2" fill="#333" />
                  <circle cx="40" cy="20" r="2" fill="#333" />
                  
                  {/* Racing number */}
                  <text x="30" y="17" fill="#fff" fontSize="6" fontWeight="bold" textAnchor="middle">88</text>
                </svg>
                
                {/* Speed lines */}
                {progress > 10 && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 right-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="h-[2px] bg-gradient-to-r from-[#ff6600] to-transparent mb-1"
                        style={{ width: `${15 - i * 3}px` }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Progress percentage */}
          <motion.p
            className="text-[#ff6600] text-center mt-6 tracking-[0.2em] text-sm md:text-base"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.p>

          {/* Loading text */}
          <motion.p
            className="text-[#666] text-center mt-2 tracking-[0.3em] text-xs uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Race Data
          </motion.p>
        </div>

        {/* Dirt texture overlay */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[101] mix-blend-overlay opacity-30">
          <div
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.04) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.03) 0%, transparent 50%)
              `,
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
