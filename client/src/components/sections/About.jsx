import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUser, FaCode, FaRocket, FaHeart } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCard from '../ui/AnimatedCard';

const highlightIcons = {
  'Clean Code': FaCode,
  'Performance': FaRocket,
  'Passion': FaHeart,
  'User-Centric': FaUser,
};

const highlightColors = {
  'Clean Code': '#00d4ff',
  'Performance': '#0af',
  'Passion': '#ff006e',
  'User-Centric': '#00ff88',
};

const defaultHighlights = [
  { title: 'Clean Code', desc: 'Writing maintainable, scalable solutions' },
  { title: 'Performance', desc: 'Optimized for speed and efficiency' },
  { title: 'Passion', desc: 'Driven by curiosity and creativity' },
  { title: 'User-Centric', desc: 'Designing with empathy and purpose' },
];

function CountUp({ target, inView, delay = 0 }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (isNaN(num)) return;

    const timer = setTimeout(() => {
      const duration = 1500;
      const start = Date.now();
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * num));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, target, delay]);

  return <>{count}{target.replace(/[\d]/g, '')}</>;
}

export default function About({ profile }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredCard, setHoveredCard] = useState(null);

  const description = profile?.about?.description || '';
  const stats = profile?.about?.stats || [];
  const name = profile?.name || 'Developer';

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* HUD Grid Background */}
      <div className="hud-grid-bg absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionTitle
          title="ABOUT ME"
          subtitle="Who is this human?"
          inView={inView}
        />

        <div className="grid lg:grid-cols-2 gap-16 mt-16 items-start">
          {/* Left Column: Arc Reactor Avatar + Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center gap-10"
          >
            {/* Arc Reactor Avatar */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                style={{
                  borderStyle: 'dashed',
                  filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.3))',
                }}
              />

              {/* Middle counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 rounded-full border border-accent/20"
                style={{
                  borderStyle: 'dotted',
                  filter: 'drop-shadow(0 0 4px rgba(0,170,255,0.2))',
                }}
              />

              {/* Inner ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-6 rounded-full border border-primary/40"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.4))',
                }}
              />

              {/* Scan line inside avatar */}
              <motion.div
                className="absolute inset-8 rounded-full pointer-events-none overflow-hidden"
              >
                <motion.div
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent)',
                  }}
                />
              </motion.div>

              {/* Core */}
              <div
                className="relative w-40 h-40 rounded-full flex items-center justify-center"
                style={{
                  background:
                    'radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,10,20,0.9) 70%)',
                  boxShadow:
                    '0 0 40px rgba(0,212,255,0.2), inset 0 0 30px rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.3)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-center"
                >
                  <div className="text-4xl font-heading font-bold text-primary"
                    style={{ textShadow: '0 0 20px rgba(0,212,255,0.6)' }}
                  >
                    {name.charAt(0)}
                  </div>
                  <div className="text-xs font-mono text-primary/50 mt-1 tracking-widest">
                    ONLINE
                  </div>
                </motion.div>
              </div>

              {/* HUD tick marks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <motion.div
                  key={deg}
                  className="absolute w-1 bg-primary/40"
                  style={{
                    height: '8px',
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${deg}deg) translateX(124px) translateY(-50%)`,
                  }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: deg / 360,
                  }}
                />
              ))}
            </div>

            {/* Description */}
            <AnimatedCard className="w-full">
              <div
                className="relative p-6 rounded-lg overflow-hidden holo-card"
                style={{
                  background: 'rgba(0, 10, 20, 0.6)',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                }}
              >
                {/* HUD Corner Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50" />

                <div className="flex items-center gap-2 mb-4">
                  <FaUser className="text-primary" size={14} />
                  <span className="font-mono text-xs text-primary/60 tracking-widest uppercase">
                    // user.profile
                  </span>
                </div>

                <p className="font-body text-lg text-primary/70 leading-relaxed">
                  {description}
                </p>

                <div className="mt-4 pt-4 border-t border-primary/10">
                  <span className="font-mono text-xs text-primary/30">
                    {'> status: '}<span className="text-primary">active</span>
                    {' | clearances: '}<span className="text-accent">level_5</span>
                  </span>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Right Column: Stats + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="space-y-10"
          >
            {/* Stats Grid */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="relative group"
                    onMouseEnter={() => setHoveredCard(`stat-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="relative p-5 rounded-lg overflow-hidden transition-all duration-300"
                      style={{
                        background: 'rgba(0, 10, 20, 0.6)',
                        border: '1px solid rgba(0, 212, 255, 0.1)',
                        boxShadow:
                          hoveredCard === `stat-${index}`
                            ? '0 0 20px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.05)'
                            : 'none',
                      }}
                    >
                      {/* HUD Corners */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40 transition-colors group-hover:border-primary/80" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/40 transition-colors group-hover:border-primary/80" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/40 transition-colors group-hover:border-primary/80" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40 transition-colors group-hover:border-primary/80" />

                      <div className="font-mono text-xs text-primary/40 mb-2 tracking-wider uppercase">
                        {stat.label}
                      </div>
                      <div
                        className="font-heading text-3xl font-bold text-primary"
                        style={{ textShadow: '0 0 15px rgba(0,212,255,0.4)' }}
                      >
                        <CountUp target={stat.value} inView={inView} delay={500 + index * 200} />
                      </div>

                      {/* Subtle scanline */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-5"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.1) 2px, rgba(0,212,255,0.1) 4px)',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Highlight Cards */}
            <div className="space-y-4">
              <div className="font-mono text-xs text-primary/40 tracking-widest uppercase mb-4">
                {'>'} Core Directives
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {defaultHighlights.map((item, index) => {
                  const Icon = highlightIcons[item.title] || FaCode;
                  const color = highlightColors[item.title] || '#00d4ff';

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="relative group"
                      onMouseEnter={() => setHoveredCard(`hl-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className="relative p-5 rounded-lg overflow-hidden transition-all duration-300 cursor-default h-full"
                        style={{
                          background: 'rgba(0, 10, 20, 0.6)',
                          border: `1px solid ${hoveredCard === `hl-${index}` ? `${color}40` : 'rgba(0, 212, 255, 0.1)'}`,
                          boxShadow:
                            hoveredCard === `hl-${index}`
                              ? `0 0 25px ${color}15, inset 0 0 25px ${color}08`
                              : 'none',
                        }}
                      >
                        {/* HUD Corners */}
                        <div
                          className="absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300"
                          style={{ borderColor: `${hoveredCard === `hl-${index}` ? color + '80' : color + '30'}` }}
                        />
                        <div
                          className="absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300"
                          style={{ borderColor: `${hoveredCard === `hl-${index}` ? color + '80' : color + '30'}` }}
                        />
                        <div
                          className="absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300"
                          style={{ borderColor: `${hoveredCard === `hl-${index}` ? color + '80' : color + '30'}` }}
                        />
                        <div
                          className="absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300"
                          style={{ borderColor: `${hoveredCard === `hl-${index}` ? color + '80' : color + '30'}` }}
                        />

                        <div className="flex items-center gap-3 mb-2">
                          <Icon
                            size={18}
                            style={{
                              color,
                              filter: `drop-shadow(0 0 6px ${color}80)`,
                            }}
                          />
                          <span className="font-heading text-sm font-semibold text-white/90">
                            {item.title}
                          </span>
                        </div>

                        <p className="font-body text-sm text-primary/50 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.15) 2px, rgba(0,212,255,0.15) 4px)',
        }}
      />
    </section>
  );
}
