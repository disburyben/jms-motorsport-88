import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import timKaedingImg from '../assets/6f7fb37e22e34e1f0b062244d6960977b6083c79.png';

export function Drivers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const owners = [
    {
      name: 'Tim Kaeding',
      role: 'California, USA',
      description: 'World of Outlaws veteran with 15+ national sprint tour victories. 2024 ACS Midwest Champion bringing decades of elite racing experience to the JMS operation.',
      image: timKaedingImg,
    },
  ];

  return (
    <section ref={ref} id="drivers" className="bg-[#0a0a0a] text-white py-[120px] px-10 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#ff6600 1px, transparent 1px),
            linear-gradient(90deg, #ff6600 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#ff6600] opacity-[0.04] blur-[150px] rounded-full" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.h2
          className="m-0 mb-[80px] tracking-[0.05em] uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5em, 6vw, 4em)',
            fontWeight: 400,
            lineHeight: 1.1,
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          THE DRIVER
        </motion.h2>

        <div className="grid grid-cols-1 gap-[60px]">
          {owners.map((owner, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] items-center bg-[rgba(255,255,255,0.02)] border-2 border-[#1a1a1a] overflow-hidden transition-all duration-300 hover:border-[#ff6600] hover:bg-[rgba(255,102,0,0.05)] hover:shadow-[0_0_50px_rgba(255,102,0,0.2)] relative group"
              initial={{ y: 80, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Racing stripe */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#ff6600] via-[#ff8800] to-[#ff6600] opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div 
                className="p-[40px]"
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3
                  className="m-0 mb-[15px] tracking-[0.08em] uppercase"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2.5em',
                    fontWeight: 400,
                  }}
                >
                  {owner.name}
                </h3>
                <p className="text-[0.75em] tracking-[0.2em] uppercase text-[#ff6600] mb-[25px] font-black">
                  {owner.role}
                </p>
                <p className="text-[1.05em] leading-[1.8] text-[#999] m-0">
                  {owner.description}
                </p>
              </motion.div>
              <motion.div 
                className="relative h-full min-h-[400px] lg:min-h-[500px] overflow-hidden"
                initial={{ x: 30, opacity: 0, scale: 1.05 }}
                animate={isInView ? { x: 0, opacity: 1, scale: 1 } : { x: 30, opacity: 0, scale: 1.05 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              >
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50" />
                
                {/* Orange accent corner */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff6600] opacity-20 blur-3xl" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
