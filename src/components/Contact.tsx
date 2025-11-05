import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: `${formData.company ? `Company: ${formData.company}\n\n` : ''}${formData.message}`,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section ref={ref} id="contact" className="bg-black text-white py-[140px] pb-[100px] px-10 relative overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #ff6600 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Orange glow cluster */}
      <div className="absolute top-1/4 left-0 w-[700px] h-[700px] bg-[#ff6600] opacity-[0.06] blur-[140px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[700px] h-[700px] bg-[#ff8800] opacity-[0.06] blur-[140px] rounded-full" />
      
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[9em] font-black tracking-[0.05em] opacity-[0.02] whitespace-nowrap pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #ff6600, transparent)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        GET IN TOUCH
      </div>

      <div className="max-w-[1200px] mx-auto">
        <motion.h1
          className="m-0 mb-[100px] max-w-[700px] tracking-[0.05em] uppercase relative z-[2]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '3.8em',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Let's Build
          <br />
          Something
          <br />
          Powerful.
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px] md:gap-[100px] max-w-[1100px] mx-auto relative z-[2]">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-[0.7em] tracking-[0.3em] m-0 mb-[30px] opacity-40 font-black">CONTACT</p>
            <p className="font-light m-0 mb-[10px]">admin@jmsmotorsport.com.au</p>
            <p className="font-light m-0 mb-[10px]">+61 432 480 066</p>
            <p className="font-light m-0 mb-[10px]">Sydney, NSW</p>

            <div className="mt-[60px] pt-[35px] border-t border-[#222]">
              {[
                { name: 'INSTAGRAM', url: 'https://www.instagram.com/jmsmotorsport' },
                { name: 'FACEBOOK', url: 'https://www.facebook.com/jmsmotorsport' },
                { name: 'YOUTUBE', url: 'https://www.youtube.com/@jmsmotorsport' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white no-underline mr-[30px] text-[0.85em] opacity-50 transition-all duration-300 hover:opacity-100 hover:text-[#ff6600] tracking-[0.12em]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="NAME"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-none border-b border-[#222] text-white px-0 py-4 mb-[30px] text-[0.95em] transition-colors duration-300 focus:outline-none focus:border-[#ff6600] placeholder:text-[#444]"
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-none border-b border-[#222] text-white px-0 py-4 mb-[30px] text-[0.95em] transition-colors duration-300 focus:outline-none focus:border-[#ff6600] placeholder:text-[#444]"
              />
              <input
                type="text"
                name="company"
                placeholder="COMPANY"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border-none border-b border-[#222] text-white px-0 py-4 mb-[30px] text-[0.95em] transition-colors duration-300 focus:outline-none focus:border-[#ff6600] placeholder:text-[#444]"
              />
              <textarea
                name="message"
                placeholder="MESSAGE"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-none border-b border-[#222] text-white px-0 py-4 mb-[30px] text-[0.95em] h-[110px] resize-none transition-colors duration-300 focus:outline-none focus:border-[#ff6600] placeholder:text-[#444]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#ff6600] text-white border-none px-[45px] py-4 text-[0.75em] tracking-[0.25em] cursor-pointer font-black transition-all duration-300 relative overflow-hidden hover:bg-[#ff7700] hover:-translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-[2]">{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
