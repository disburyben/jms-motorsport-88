import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function Schedule() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    {
      date: 'DEC 29',
      event: 'NSW Sprintcar Title',
      track: 'Morris Park Speedway, Dubbo, NSW',
    },
    {
      date: 'JAN 3',
      event: 'Sprintcar Power Tour',
      track: 'Sydney International, Sydney, NSW',
    },
    {
      date: 'JAN 7',
      event: 'Sprintcar Power Tour',
      track: 'Hitec Oils Speedway, Toowoomba, QLD',
    },
    {
      date: 'JAN 9',
      event: 'Sprintcar Power Tour Night 1',
      track: 'Hitec Oils Speedway, Toowoomba, QLD',
    },
    {
      date: 'JAN 10',
      event: 'Sprintcar Power Tour Night 3',
      track: 'Hitec Oils Speedway, Toowoomba, QLD',
    },
    {
      date: 'JAN 14',
      event: 'Sprintcar Power Tour',
      track: 'Timmis Speedway, Mildura, VIC',
    },
    {
      date: 'JAN 16',
      event: 'Sprintcar Power Tour Night 1',
      track: 'Tolmer Speedway, Bordertown, SA',
    },
    {
      date: 'JAN 17',
      event: 'Sprintcar Power Tour Night 2',
      track: 'Tolmer Speedway, Bordertown, SA',
    },
    {
      date: 'JAN 21',
      event: 'Presidents Cup',
      track: 'Avalon Raceway, Lara, VIC',
    },
    {
      date: 'JAN 22',
      event: 'Kings Challenge',
      track: 'Borderline Raceway, Mt Gambier, SA',
    },
    {
      date: 'JAN 23-25',
      event: '53rd Printcar Classic',
      track: 'Premier Speedway, Warrnambool, VIC',
    },
  ];

  return (
    <section ref={ref} id="schedule" className="bg-[#111] text-white py-[120px] px-10 relative overflow-hidden">
      {/* Diagonal lines background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #ff6600 0px,
            #ff6600 2px,
            transparent 2px,
            transparent 80px
          )`
        }} />
      </div>

      {/* Glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff6600] opacity-[0.03] blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ff6600] opacity-[0.03] blur-[120px] rounded-full" />
      
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
          2025-26 Race Calendar
        </motion.h2>

        <div className="space-y-0">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[100px_2fr_2fr] gap-[15px] md:gap-[30px] items-start md:items-center py-[25px] border-b-2 border-[#1a1a1a] transition-all duration-300 hover:bg-[rgba(255,102,0,0.05)] hover:border-[#ff6600] px-[20px] -mx-[20px] relative group"
              initial={{ x: -30, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            >
              {/* Racing number badge */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-[#ff6600] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <p
                className="m-0 text-[#ff6600] drop-shadow-[0_0_10px_rgba(255,102,0,0.5)] group-hover:scale-110 transition-transform"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.8em',
                  letterSpacing: '0.1em',
                }}
              >
                {event.date}
              </p>
              <p className="m-0 text-[1.05em] md:text-[1.15em] group-hover:text-white transition-colors">{event.event}</p>
              <p className="m-0 text-[0.9em] md:text-[0.95em] text-[#999] group-hover:text-[#bbb] transition-colors">{event.track}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
