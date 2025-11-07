import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function NextEvent() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // Set to December 29, 2025 - NSW Sprintcar Title at Morris Park Speedway, Dubbo
    const countdownDate = new Date('December 29, 2025 19:00:00').getTime();
    let interval: ReturnType<typeof setInterval> | null = null;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section ref={ref} className="bg-[#0a0a0a] text-white py-[100px] px-10 relative overflow-hidden">
      {/* Diagonal stripe background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #ff6600 0px,
            #ff6600 2px,
            transparent 2px,
            transparent 60px
          )`
        }} />
      </div>

      {/* Orange accent glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff6600] opacity-[0.05] blur-[120px] rounded-full" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
          {/* Left Side - Event Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Racing stripe accent */}
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff6600] to-transparent" />
            
            <h2
              className="my-0 mb-[30px] tracking-[0.08em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,102,0,0.3)]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5em, 6vw, 4em)',
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Morris Park Speedway
            </h2>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff6600] to-[#ff8800] mb-[30px]">
              <p className="text-[1.2em] text-black tracking-[0.15em] m-0 font-black">
                DEC 29 — 2025
              </p>
            </div>
            <p className="text-[#ccc] text-[1.1em] leading-[1.8] max-w-[500px]">
              NSW Sprintcar Title — The season opener at Morris Park Speedway in Dubbo, NSW.
            </p>
          </motion.div>

          {/* Right Side - Countdown */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <p className="text-[0.7em] tracking-[0.35em] mb-[30px] text-[#ff6600] font-black">
              COUNTDOWN TO DUBBO
            </p>
            <div className="grid grid-cols-2 gap-[20px]">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINUTES' },
                { value: timeLeft.seconds, label: 'SECONDS' },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-left relative group"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {/* Glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/10 to-transparent border border-[#ff6600]/20 -z-10 group-hover:border-[#ff6600]/50 transition-colors" />
                  <div className="absolute inset-0 bg-[#ff6600]/0 group-hover:bg-[#ff6600]/5 transition-colors -z-10" />
                  
                  <div className="p-4">
                    <span
                      className="block leading-none tracking-[0.05em] text-[#ff6600] drop-shadow-[0_0_10px_rgba(255,102,0,0.5)]"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(2.5em, 5vw, 3.5em)',
                      }}
                    >
                      {formatNumber(item.value)}
                    </span>
                    <span className="text-[0.7em] tracking-[0.2em] text-[#999] mt-[8px] block font-black">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
