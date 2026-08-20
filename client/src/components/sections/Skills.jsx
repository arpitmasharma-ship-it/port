import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCard from '../ui/AnimatedCard';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Design', 'Other'];

export default function Skills({ skills = [] }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [systemLoad, setSystemLoad] = useState(0);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter(
      (s) => s.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [skills, activeCategory]);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const target = filteredSkills.length;
    const step = Math.max(1, Math.floor(target / 20));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setDisplayedCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, filteredSkills.length]);

  useEffect(() => {
    if (!inView) return;
    const target = Math.round((filteredSkills.length / Math.max(skills.length, 1)) * 100);
    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setSystemLoad(current);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, filteredSkills.length, skills.length]);

  const getProficiencyDots = (level) => {
    const total = 5;
    const filled = Math.round((level / 100) * total);
    return Array.from({ length: total }, (_, i) => i < filled);
  };

  const getProficiencyLabel = (level) => {
    if (level >= 90) return 'EXPERT';
    if (level >= 70) return 'ADVANCED';
    if (level >= 50) return 'INTERMEDIATE';
    return 'BEGINNER';
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* HUD Grid Background */}
      <div className="hud-grid-bg absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionTitle
          title="SKILLS"
          subtitle="Technical capabilities loaded"
          inView={inView}
        />

        {/* System Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-4 mt-10 mb-6 px-5 py-3 rounded font-mono text-xs"
          style={{
            background: 'rgba(0, 10, 20, 0.7)',
            border: '1px solid rgba(0, 212, 255, 0.1)',
          }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }}
            />
            <span className="text-primary/40">SYS STATUS:</span>
            <span className="text-green-400">ONLINE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-primary/40">MODULES LOADED:</span>
            <span className="text-primary/80">{displayedCount}</span>
            <span className="text-primary/30">/</span>
            <span className="text-primary/40">{skills.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-primary/40">SYS LOAD:</span>
            <div className="w-24 h-1.5 rounded-full overflow-hidden bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${systemLoad}%` }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00d4ff40, #00d4ff)',
                  boxShadow: '0 0 8px rgba(0,212,255,0.4)',
                }}
              />
            </div>
            <span className="text-primary/60">{systemLoad}%</span>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mt-12 mb-12"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                animate={isActive ? {
                  boxShadow: [
                    '0 0 15px rgba(0,212,255,0.1), inset 0 0 15px rgba(0,212,255,0.05)',
                    '0 0 25px rgba(0,212,255,0.25), inset 0 0 20px rgba(0,212,255,0.1)',
                    '0 0 15px rgba(0,212,255,0.1), inset 0 0 15px rgba(0,212,255,0.05)',
                  ],
                  borderColor: [
                    'rgba(0, 212, 255, 0.4)',
                    'rgba(0, 212, 255, 0.7)',
                    'rgba(0, 212, 255, 0.4)',
                  ],
                } : {
                  boxShadow: 'none',
                  borderColor: 'rgba(0, 212, 255, 0.08)',
                }}
                transition={isActive ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                } : { duration: 0.3 }}
                className="relative px-5 py-2.5 rounded font-mono text-xs tracking-widest uppercase transition-colors duration-300"
                style={{
                  background: isActive
                    ? 'rgba(0, 212, 255, 0.1)'
                    : 'rgba(0, 10, 20, 0.6)',
                  border: `1px solid ${isActive ? 'rgba(0, 212, 255, 0.4)' : 'rgba(0, 212, 255, 0.08)'}`,
                  color: isActive ? '#00d4ff' : 'rgba(0, 212, 255, 0.4)',
                  clipPath: isActive
                    ? 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
                    : 'none',
                }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                    }}
                  />
                )}
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Circuit Line Decorator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="relative h-px my-8 mx-auto max-w-3xl origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3) 20%, rgba(0,212,255,0.3) 80%, transparent)',
          }}
        >
          <div
            className="absolute top-1/2 left-1/4 w-2 h-2 -translate-y-1/2 rotate-45"
            style={{ border: '1px solid rgba(0,212,255,0.4)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-y-1/2 -translate-x-1/2 rotate-45"
            style={{ background: 'rgba(0,212,255,0.5)', boxShadow: '0 0 6px rgba(0,212,255,0.4)' }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-2 h-2 -translate-y-1/2 rotate-45"
            style={{ border: '1px solid rgba(0,212,255,0.4)' }}
          />
          <motion.div
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)',
            }}
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const dots = getProficiencyDots(skill.proficiency);
              const label = getProficiencyLabel(skill.proficiency);
              const color = skill.color || '#00d4ff';
              const isHovered = hoveredSkill === skill._id;

              return (
                <motion.div
                  key={skill._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  onMouseEnter={() => setHoveredSkill(skill._id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group"
                >
                  <AnimatedCard>
                    <div
                      className="relative p-5 rounded-lg overflow-hidden transition-all duration-300 h-full"
                      style={{
                        background: 'rgba(0, 10, 20, 0.6)',
                        border: `1px solid ${isHovered ? `${color}35` : 'rgba(0, 212, 255, 0.1)'}`,
                        boxShadow: isHovered
                          ? `0 0 25px ${color}12, inset 0 0 25px ${color}05`
                          : 'none',
                      }}
                    >
                      {/* HUD Corners */}
                      <div
                        className="absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300"
                        style={{ borderColor: isHovered ? `${color}70` : `${color}25` }}
                      />
                      <div
                        className="absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300"
                        style={{ borderColor: isHovered ? `${color}70` : `${color}25` }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300"
                        style={{ borderColor: isHovered ? `${color}70` : `${color}25` }}
                      />
                      <div
                        className="absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300"
                        style={{ borderColor: isHovered ? `${color}70` : `${color}25` }}
                      />

                      {/* Header: Name + Category */}
                      <div className="flex items-center justify-between mb-4">
                        <h3
                          className="font-heading text-sm font-semibold transition-colors duration-300"
                          style={{ color: isHovered ? color : 'rgba(255,255,255,0.85)' }}
                        >
                          {skill.name}
                        </h3>
                        <span
                          className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                          style={{
                            background: `${color}10`,
                            color: `${color}90`,
                            border: `1px solid ${color}20`,
                          }}
                        >
                          {skill.category}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative mb-3">
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              inView
                                ? { width: `${skill.proficiency}%` }
                                : { width: 0 }
                            }
                            transition={{
                              duration: 1,
                              delay: 0.5 + index * 0.05,
                              ease: 'easeOut',
                            }}
                            className="h-full rounded-full relative"
                            style={{
                              background: `linear-gradient(90deg, ${color}40, ${color})`,
                              boxShadow: `0 0 10px ${color}50, 0 0 20px ${color}20`,
                            }}
                          >
                            {/* Animated shimmer */}
                            <motion.div
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1 + index * 0.1,
                                ease: 'easeInOut',
                              }}
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Percentage */}
                        <div className="flex justify-between items-center mt-1.5">
                          <span className="font-mono text-[10px] text-primary/30">
                            {label}
                          </span>
                          <span
                            className="font-mono text-xs font-medium"
                            style={{ color: `${color}cc` }}
                          >
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      {/* Proficiency Dots */}
                      <div className="flex items-center gap-1.5">
                        {dots.map((filled, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.7 + index * 0.05 + i * 0.08,
                            }}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              background: filled ? color : 'rgba(255,255,255,0.05)',
                              boxShadow: filled
                                ? `0 0 6px ${color}60, 0 0 12px ${color}20`
                                : 'none',
                              border: `1px solid ${filled ? `${color}40` : 'rgba(255,255,255,0.05)'}`,
                            }}
                          />
                        ))}
                        <span className="ml-auto font-mono text-[10px] text-primary/20">
                          LVL.{Math.round(skill.proficiency / 20)}
                        </span>
                      </div>

                      {/* Bottom scanline on hover */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.05 }}
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.15) 2px, rgba(0,212,255,0.15) 4px)',
                          }}
                        />
                      )}

                      {/* Scanning line sweep on hover */}
                      {isHovered && (
                        <motion.div
                          initial={{ top: '-10%', opacity: 0 }}
                          animate={{ top: '110%', opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 0.8, ease: 'easeInOut' }}
                          className="absolute left-0 right-0 h-px pointer-events-none"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${color}90, ${color}, ${color}90, transparent)`,
                            boxShadow: `0 0 12px ${color}50, 0 0 24px ${color}20`,
                          }}
                        />
                      )}
                    </div>
                  </AnimatedCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="font-mono text-sm text-primary/30">
              {'> no modules found for category: '}
              <span className="text-primary/50">{activeCategory.toLowerCase()}</span>
            </div>
          </motion.div>
        )}
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