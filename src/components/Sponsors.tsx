import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import americanTireLogo from '../assets/c8697d1a24b63f1db4a7451f6b20ac743eebdd12.png';
import amsLogo from '../assets/d8966cf413db209a0866b8f1c5b0c8800595a532.png';
import killerImageLogo from '../assets/724a1898579ab879aa3df817a62fd70767ea1cd7.png';
import kaedingLogo from '../assets/86d8d64a5dd67ab456a1797e0c3c366f3342f86c.png';
import rogersLogo from '../assets/2f7043cff75c34f58c4ac2c8a775e045ab56cae8.png';
import jmsPaintingLogo from '../assets/b97fd351aa829768218b40a4188bd55273d31f54.png';
import dingoEzyLogo from '../assets/97dcb446c0c12640db304a66eae57aabda3efa7c.png';
// Note: Maxim Racing logo file is missing, using placeholder
const maximRacingLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzFhMWExYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZjY2MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYXhpbSBSYWNpbmc8L3RleHQ+PC9zdmc+';

export function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const allSponsors = [
    { 
      name: 'Rogers Construction Group', 
      url: 'https://www.rogersconstructiongroup.com.au', 
      logo: rogersLogo 
    },
    { 
      name: 'JMS Painting', 
      url: 'https://jmspaintingnsw.com.au/', 
      logo: jmsPaintingLogo 
    },
    { 
      name: 'Dingo Ezy Solutions', 
      url: 'http://www.dingoezysolutions.com.au/', 
      logo: dingoEzyLogo 
    },
    { 
      name: 'Killer Image', 
      url: 'https://killerimage.com.au/', 
      logo: killerImageLogo 
    },
    { 
      name: 'AMS - Automated Machinery Services', 
      url: 'https://www.automatedmachineryservices.com', 
      logo: amsLogo 
    },
    { 
      name: 'American Tire & Racing Services', 
      url: 'https://americanracingtires.com/', 
      logo: americanTireLogo 
    },
    { 
      name: 'Kaeding Performance', 
      url: 'https://kaedings.com/', 
      logo: kaedingLogo 
    },
    { 
      name: 'Maxim Racing', 
      url: '#', 
      logo: maximRacingLogo 
    },
  ];

  return (
    <section ref={ref} id="partners" className="bg-[#0a0a0a] py-[100px] px-10 relative overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #ff6600 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Multiple orange glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#ff6600] opacity-[0.04] blur-[140px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#ff8800] opacity-[0.04] blur-[140px] rounded-full" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.h2
          className="text-center mb-[80px] tracking-[0.1em] uppercase relative pb-[30px] text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2em, 5vw, 3.5em)',
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Our Partners
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80px] h-[3px] bg-[#ff6600]" />
        </motion.h2>

        {/* Sponsor Logos Grid - Larger with 7 sponsors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[50px] max-w-[1100px] mx-auto">
          {allSponsors.map((sponsor, index) => (
            <motion.a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgba(255,255,255,0.02)] border-2 border-[#1a1a1a] p-[45px] flex items-center justify-center h-[220px] transition-all duration-300 hover:border-[#ff6600] hover:transform hover:-translate-y-[8px] hover:shadow-[0_20px_60px_rgba(255,102,0,0.3)] relative overflow-hidden group"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            >
              {/* Animated shine effect */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,102,0,0.15),transparent)] transition-all duration-700 group-hover:left-[100%]" />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#ff6600] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#ff6600] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Glow behind logo */}
              <div className="absolute inset-0 bg-[#ff6600] opacity-0 group-hover:opacity-5 blur-2xl transition-opacity" />
              
              <div className="w-full h-full flex items-center justify-center relative z-[1]">
                <ImageWithFallback
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full max-h-[140px] w-auto h-auto object-contain opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
