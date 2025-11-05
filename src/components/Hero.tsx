import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import jmsLogo from '../assets/d8c91f7333400c58ad4e2d55851a00325417ded8.png';

interface HeroProps {
  heroImage: string;
}

export function Hero({ heroImage }: HeroProps) {
  return (
    <section id="home" className="relative bg-black text-white pt-[80px] min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-[1]"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <ImageWithFallback
          src={heroImage}
          alt="JMS Sprintcar Racing"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/90 via-[#0a0a0a]/60 to-black/90" />
        
        {/* Orange glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff6600] opacity-[0.08] blur-[150px] rounded-full" />
      </motion.div>

      {/* Speed lines effect */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff6600] to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Dirt Texture Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-overlay">
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.03) 0%, transparent 50%),
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.005) 2px, rgba(255,255,255,0.005) 4px)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-5 md:px-10 pt-[80px] pb-[100px] w-full">
        <motion.div 
          className="m-0 mb-[40px] relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-[#ff6600]/20 to-transparent blur-xl" />
          
          <ImageWithFallback
            src={jmsLogo}
            alt="JMS Motorsport"
            className="w-full max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] h-auto relative drop-shadow-[0_0_30px_rgba(255,102,0,0.3)]"
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="text-center mt-[60px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-[#ff6600] tracking-[0.3em] uppercase text-[0.9em] md:text-[1.1em] font-black">
            Australian Sprintcar Excellence
          </p>
        </motion.div>

        {/* Stats Grid at Bottom */}
        <div className="mt-[120px]">

        </div>
      </div>
    </section>
  );
}
