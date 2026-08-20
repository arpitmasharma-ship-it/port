import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = ({ testimonials }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [decodedText, setDecodedText] = useState('');
  const [decodingDone, setDecodingDone] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-slide
  useEffect(() => {
    if (!testimonials?.length) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  // Typing/decoding effect
  useEffect(() => {
    const text = testimonials[current]?.quote || '';
    if (!text) return;

    setDecodedText('');
    setDecodingDone(false);
    let index = 0;
    const speed = 18;
    const gibberishChars = '!@#$%^&*01_-+=<>?/\\|{}[]~';

    const interval = setInterval(() => {
      if (index < text.length) {
        const revealed = text.slice(0, index + 1);
        const remaining = text.length - index - 1;
        const noise = Array.from(
          { length: Math.min(remaining, 6) },
          () => gibberishChars[Math.floor(Math.random() * gibberishChars.length)]
        ).join('');
        setDecodedText(revealed + noise);
        index++;
      } else {
        setDecodedText(text);
        setDecodingDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [current, testimonials]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`text-sm ${i < rating ? 'text-primary' : 'text-primary/20'}`}
      />
    ));
  };

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || '?';

  const signalStrength = testimonials[current]?.rating || 5;

  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Testimonials" subtitle="What People Say" icon={FaQuoteLeft} />

        <div ref={ref} className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* DATA FEED Header */}
            <div className="flex items-center gap-3 mb-3 ml-2">
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: 'rgba(0, 212, 255, 0.6)' }}
              >
                DATA FEED
              </span>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: '#00d4ff' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
              <span
                className="font-mono text-xs tracking-wider"
                style={{ color: 'rgba(0, 212, 255, 0.3)' }}
              >
                // ACTIVE
              </span>
            </div>

            {/* SIGNAL STRENGTH Indicator */}
            <div className="flex items-center gap-2 mb-4 ml-2">
              <span
                className="font-mono text-xs tracking-wider"
                style={{ color: 'rgba(0, 212, 255, 0.4)' }}
              >
                SIGNAL STRENGTH
              </span>
              <div className="flex items-end gap-0.5 h-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-sm"
                    style={{
                      width: '4px',
                      background:
                        i < signalStrength
                          ? 'rgba(0, 212, 255, 0.8)'
                          : 'rgba(0, 212, 255, 0.1)',
                    }}
                    animate={{
                      height: `${(i + 1) * 3 + 2}px`,
                      background:
                        i < signalStrength
                          ? 'rgba(0, 212, 255, 0.8)'
                          : 'rgba(0, 212, 255, 0.1)',
                    }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  />
                ))}
              </div>
              <span
                className="font-mono text-xs"
                style={{ color: 'rgba(0, 212, 255, 0.5)' }}
              >
                {signalStrength}/5
              </span>
            </div>

            {/* Main Card */}
            <div
              className="relative overflow-hidden rounded-xl p-8 md:p-12 min-h-[320px]"
              style={{
                background: 'rgba(0, 10, 20, 0.6)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Holographic Shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(0, 212, 255, 0.06) 45%, rgba(0, 212, 255, 0.12) 50%, rgba(0, 212, 255, 0.06) 55%, transparent 60%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['200% 0%', '-200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />

              {/* HUD Corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(transparent 50%, rgba(0, 212, 255, 0.02) 50%)',
                  backgroundSize: '100% 4px',
                }}
              />

              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  {/* Quote Icon with Targeting Brackets */}
                  <div className="relative inline-block mb-4">
                    {/* Targeting brackets */}
                    <motion.span
                      className="absolute font-mono font-bold pointer-events-none"
                      style={{
                        color: '#00d4ff',
                        top: '-6px',
                        left: '-10px',
                        fontSize: '22px',
                        lineHeight: '1',
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      [
                    </motion.span>
                    <motion.span
                      className="absolute font-mono font-bold pointer-events-none"
                      style={{
                        color: '#00d4ff',
                        top: '-6px',
                        right: '-10px',
                        fontSize: '22px',
                        lineHeight: '1',
                      }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      ]
                    </motion.span>
                    <motion.span
                      className="absolute font-mono font-bold pointer-events-none"
                      style={{
                        color: 'rgba(0, 212, 255, 0.3)',
                        bottom: '-6px',
                        left: '-10px',
                        fontSize: '22px',
                        lineHeight: '1',
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.3, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      [
                    </motion.span>
                    <motion.span
                      className="absolute font-mono font-bold pointer-events-none"
                      style={{
                        color: 'rgba(0, 212, 255, 0.3)',
                        bottom: '-6px',
                        right: '-10px',
                        fontSize: '22px',
                        lineHeight: '1',
                      }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 0.3, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      ]
                    </motion.span>
                    <FaQuoteLeft className="text-primary/20 text-4xl relative" />
                  </div>

                  {/* Quote Text - Typing/Decoding Animation */}
                  <p className="text-primary/80 font-body text-lg md:text-xl leading-relaxed mb-6 italic">
                    &ldquo;{decodedText}
                    {!decodingDone && (
                      <motion.span
                        className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                        style={{ background: '#00d4ff' }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                    {decodingDone && '\u201D'}
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {renderStars(testimonials[current]?.rating)}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-heading"
                      style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '2px solid rgba(0, 212, 255, 0.3)',
                        color: '#00d4ff',
                      }}
                    >
                      {getInitial(testimonials[current]?.name)}
                    </div>

                    <div>
                      <h4 className="text-primary font-heading text-lg">
                        {testimonials[current]?.name}
                      </h4>
                      <p className="text-primary/50 font-mono text-sm">
                        {testimonials[current]?.role}
                        {testimonials[current]?.company && (
                          <span className="text-primary/40"> @ {testimonials[current].company}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows with Scan-line Bars */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary/10 overflow-hidden"
              style={{
                border: '1px solid rgba(0, 212, 255, 0.2)',
                color: '#00d4ff',
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(0, 212, 255, 0.08) 0px, rgba(0, 212, 255, 0.08) 1px, transparent 1px, transparent 4px)',
                }}
                animate={{ backgroundPositionX: ['0px', '40px'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <FaChevronLeft className="relative z-10" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary/10 overflow-hidden"
              style={{
                border: '1px solid rgba(0, 212, 255, 0.2)',
                color: '#00d4ff',
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(0, 212, 255, 0.08) 0px, rgba(0, 212, 255, 0.08) 1px, transparent 1px, transparent 4px)',
                }}
                animate={{ backgroundPositionX: ['0px', '40px'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <FaChevronRight className="relative z-10" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className="relative w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: index === current ? '#00d4ff' : 'rgba(0, 212, 255, 0.2)',
                    boxShadow: index === current ? '0 0 10px rgba(0, 212, 255, 0.5)' : 'none',
                    transform: index === current ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
