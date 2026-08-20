import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SCRAMBLE_CHARS = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function ScrambleText({ text, inView, delay = 0 }) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const timer = setTimeout(() => {
      const start = Date.now();
      const duration = 600;
      const length = text.length;

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const resolved = Math.floor(progress * length);

        let result = '';
        for (let i = 0; i < length; i++) {
          if (i < resolved) {
            result += text[i];
          } else if (text[i] === ' ') {
            result += ' ';
          } else {
            result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        setDisplay(result);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, text, delay]);

  return <>{display || text.replace(/./g, '\u00A0')}</>;
}

const SectionTitle = ({ title, subtitle, center = true }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6`}
        style={{
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.15)',
        }}
      >
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-primary"
          />
        </div>
        <span className="text-xs font-mono tracking-[0.2em] text-primary/70 uppercase">
          {subtitle}
        </span>
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute inset-0 rounded-full bg-accent"
          />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="section-title"
      >
        <span className="gradient-text glow-text">
          <ScrambleText text={title} inView={inView} delay={400} />
        </span>
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`mt-4 h-[1px] ${center ? 'mx-auto' : ''}`}
        style={{
          width: '120px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
        }}
      />

      {/* Animated underline glow */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        className={`mt-1 h-[1px] ${center ? 'mx-auto' : ''}`}
        style={{
          width: '80px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 170, 255, 0.3), transparent)',
        }}
      />
    </motion.div>
  );
};

export default SectionTitle;
