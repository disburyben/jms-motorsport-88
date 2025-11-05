import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-black text-white text-center py-[70px] px-10 border-t border-[#1a1a1a]">
      <motion.p 
        className="text-[0.7em] tracking-[0.3em] opacity-30 m-0 font-black"
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 0.3 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        BUILT FROM THE DIRT. DRIVEN BY PURPOSE.
      </motion.p>
    </footer>
  );
}
