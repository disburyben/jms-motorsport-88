import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutProps {
  carImages: string[];
}

export function About({ carImages }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="bg-white text-black py-[120px] px-10 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #000 0px,
            #000 1px,
            transparent 1px,
            transparent 40px
          ),
          repeating-linear-gradient(
            90deg,
            #000 0px,
            #000 1px,
            transparent 1px,
            transparent 40px
          )`
        }} />
      </div>

      {/* Orange accent */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#ff6600] opacity-[0.03] blur-[100px] rounded-full" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="m-0 mb-[40px] tracking-[0.05em] uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5em, 6vw, 4em)',
                fontWeight: 400,
                lineHeight: 1.1,
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About
              <br />
              JMS Motorsport
            </motion.h2>

            <motion.p 
              className="text-[1.15em] leading-[1.9] opacity-85 mb-[30px]"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              JMS Motorsport is a premier Australian sprintcar racing team that competes at the highest levels of dirt track motorsport across the country. Based in Australia, the team has established itself as a formidable presence on the sprintcar circuit, consistently delivering competitive performances at major venues and championship events.
            </motion.p>

            <motion.h3 
              className="text-[1.5em] tracking-[0.05em] uppercase mb-[20px] mt-[40px]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Our Mission
            </motion.h3>
            <motion.p 
              className="text-[1.05em] leading-[1.9] opacity-70 mb-[30px]"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              At JMS Motorsport, we're driven by a passion for sprintcar racing and a commitment to excellence both on and off the track. We strive to showcase world-class motorsport while representing our sponsors and supporters with integrity and professionalism.
            </motion.p>

            <motion.h3 
              className="text-[1.5em] tracking-[0.05em] uppercase mb-[20px] mt-[40px]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Racing Excellence
            </motion.h3>
            <motion.p 
              className="text-[1.05em] leading-[1.9] opacity-70 mb-[30px]"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              The team competes in Australia's most prestigious sprintcar events, including state titles, national tours, and classic events across Victoria, New South Wales, Queensland, and South Australia. Our presence at iconic venues like Premier Speedway Warrnambool, Avalon Raceway, and Sydney International Speedway demonstrates our commitment to competing at the sport's highest level.
            </motion.p>

            <motion.h3 
              className="text-[1.5em] tracking-[0.05em] uppercase mb-[20px] mt-[40px]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              International Partnerships
            </motion.h3>
            <motion.p 
              className="text-[1.05em] leading-[1.9] opacity-70"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              JMS Motorsport proudly collaborates with international racing talent, bringing world-class drivers to Australian shores. Our partnership with American sprintcar star Tim Kaeding for the 2025/2026 Australian tour exemplifies our dedication to elevating the sport and providing fans with unforgettable racing experiences.
            </motion.p>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div 
            className="relative aspect-[4/3] overflow-hidden group"
            initial={{ x: 50, opacity: 0, scale: 0.95 }}
            animate={isInView ? { x: 0, opacity: 1, scale: 1 } : { x: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            {/* Orange border effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#ff6600] via-[#ff8800] to-[#ff6600] opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
            
            <div className="relative bg-white p-2 h-full">
              <ImageWithFallback
                src={carImages[0]}
                alt="JMS Motorsport Sprintcar #88"
                className="w-full h-full object-cover shadow-2xl"
              />
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-[#ff6600]" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-[#ff6600]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
