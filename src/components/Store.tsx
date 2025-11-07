import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Store() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail) {
        throw new Error('Email is required.');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email: normalizedEmail }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks! We\'ll notify you when the store launches.');
        setEmail('');
        scheduleReset();
      } else {
        throw new Error(data.error || 'Failed to sign up');
      }
    } catch (error) {
      console.error('Error submitting store signup:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      scheduleReset();
    }
  };

  return (
    <section ref={ref} id="store" className="bg-black text-white py-[100px] px-10 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(255, 102, 0, 0.1) 50px,
              rgba(255, 102, 0, 0.1) 51px
            )`,
          }}
        />
      </div>

      {/* Dramatic orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff6600] opacity-[0.08] blur-[150px] rounded-full" />
      
      {/* Corner accent lights */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff6600] opacity-[0.06] blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff8800] opacity-[0.06] blur-[100px]" />

      <div className="max-w-[1200px] mx-auto relative z-[1] text-center">
        <motion.p 
          className="text-[0.7em] tracking-[0.4em] mb-[30px] opacity-50 font-black uppercase"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 0.5 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Merch Store
        </motion.p>
        
        <motion.h2
          className="m-0 mb-[40px] tracking-[0.1em] uppercase relative inline-block"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3em, 8vw, 6em)',
            fontWeight: 400,
            lineHeight: 1,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-white via-[#ff6600] to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,102,0,0.5)]">
            COMING SOON
          </span>
        </motion.h2>

        <motion.p 
          className="text-[1.2em] text-[#999] mb-[50px] max-w-[600px] mx-auto leading-[1.8]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Be the first to know when official JMS Motorsport merchandise drops. Sign up for exclusive early access.
        </motion.p>

        {/* Email Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="max-w-[500px] mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex gap-[15px] flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="flex-1 px-[25px] py-[18px] bg-[rgba(255,255,255,0.05)] border border-[#333] text-white text-[0.95em] tracking-[0.05em] outline-none transition-all duration-300 focus:border-[#ff6600] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-[40px] py-[18px] bg-[#ff6600] text-white text-[0.85em] tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 hover:bg-[#ff7700] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'SIGNING UP...' : 'NOTIFY ME'}
            </button>
          </div>
          
          {message && (
            <p
              className={`mt-[20px] text-[0.9em] tracking-[0.05em] ${
                status === 'success' ? 'text-[#4CAF50]' : 'text-[#ff6600]'
              }`}
            >
              {message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
