import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function TextScramble({ text, className = '', delay = 0, duration = 800, triggerOnce = true }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce });
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const timer = setTimeout(() => {
      setIsScrambling(true);
      const startTime = Date.now();
      const length = text.length;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const resolvedCount = Math.floor(progress * length);
        const jitter = progress < 0.8 ? 3 : progress < 0.95 ? 1 : 0;

        let result = '';
        for (let i = 0; i < length; i++) {
          if (i < resolvedCount) {
            result += text[i];
          } else if (text[i] === ' ') {
            result += ' ';
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplayText(result);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          setIsScrambling(false);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, text, delay, duration]);

  return (
    <motion.span
      ref={ref}
      className={`${className} ${isScrambling ? 'text-flicker' : ''}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      {displayText || text.replace(/./g, '\u00A0')}
    </motion.span>
  );
}
