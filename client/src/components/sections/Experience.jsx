import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';

const cardVariants = {
  hidden: (side) => ({
    opacity: 0,
    x: side === 'left' ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

const particleColors = [
  'rgba(0,212,255,0.8)',
  'rgba(0,170,255,0.6)',
  'rgba(0,212,255,0.4)',
  'rgba(0,212,255,0.9)',
  'rgba(0,170,255,0.5)',
  'rgba(0,212,255,0.7)',
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience({ experiences = [] }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="Professional journey and career highlights"
        />

        <div className="relative mt-16">
          {/* Timeline vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[2px]">
            {/* Base line */}
            <div className="absolute inset-0 bg-white/5" />
            {/* Glowing gradient line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0 origin-top"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,212,255,0.8), rgba(0,170,255,0.4), rgba(0,212,255,0.8))',
                boxShadow: '0 0 8px rgba(0,212,255,0.3), 0 0 20px rgba(0,212,255,0.1)',
              }}
            />
            {/* Data particles flowing down the timeline */}
            {inView && Array.from({ length: 8 }).map((_, i) => (
              <DataParticle key={i} index={i} />
            ))}
          </div>

          {/* Experience items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const side = index % 2 === 0 ? 'left' : 'right';
              return (
                <ExperienceItem
                  key={exp._id}
                  experience={exp}
                  index={index}
                  side={side}
                  inView={inView}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Data Particle ── */
const particleGlowColors = [
  'rgba(0,212,255,0.25)',
  'rgba(0,170,255,0.15)',
  'rgba(0,212,255,0.1)',
  'rgba(0,212,255,0.25)',
  'rgba(0,170,255,0.12)',
  'rgba(0,212,255,0.18)',
];

function DataParticle({ index }) {
  const duration = 2.5 + (index * 0.7) % 3;
  const delay = index * 0.45;
  const size = 2 + (index % 3);
  const color = particleColors[index % particleColors.length];
  const glow = particleGlowColors[index % particleGlowColors.length];
  const xPos = -0.5 + (index % 2) * 1.5;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: ['calc(-20px)', 'calc(110vh)'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute rounded-full z-20"
      style={{
        width: size,
        height: size,
        left: xPos,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${glow}`,
      }}
    />
  );
}

/* ── Single timeline item ── */
function ExperienceItem({ experience: exp, index, side, inView }) {
  const delay = 0.15 * index;
  const nodeLabel = `NODE_${String(index + 1).padStart(2, '0')}`;

  return (
    <div className="relative">
      {/* Timeline dot with double-pulse rings */}
      <motion.div
        variants={dotVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ delay: delay + 0.2 }}
        className="
          absolute left-4 md:left-1/2 -translate-x-1/2
          z-10
        "
      >
        <span className="relative flex h-4 w-4">
          {/* Outer pulse ring */}
          <motion.span
            initial={{ scale: 1, opacity: 0 }}
            animate={inView ? {
              scale: [1, 2.8],
              opacity: [0.5, 0],
            } : {}}
            transition={{
              duration: 2,
              delay: delay + 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inline-flex h-4 w-4 rounded-full border border-primary/40"
            style={{ top: 0, left: 0 }}
          />
          {/* Inner pulse ring (staggered) */}
          <motion.span
            initial={{ scale: 1, opacity: 0 }}
            animate={inView ? {
              scale: [1, 2.2],
              opacity: [0.6, 0],
            } : {}}
            transition={{
              duration: 1.6,
              delay: delay + 1.0,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inline-flex h-4 w-4 rounded-full border-2 border-primary/30"
            style={{ top: 0, left: 0 }}
          />
          {/* Solid dot */}
          <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-primary bg-[#020810] shadow-[0_0_12px_rgba(0,212,255,0.5)]" />
        </span>

        {/* Node label */}
        <motion.span
          initial={{ opacity: 0, x: side === 'left' ? 10 : -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 0.5, duration: 0.4 }}
          className={`
            absolute top-0.5 whitespace-nowrap
            text-[9px] font-mono uppercase tracking-[0.2em]
            text-primary/40
            ${side === 'left' ? 'left-8 md:left-auto md:right-8' : 'right-8 md:left-8 md:right-auto'}
          `}
        >
          {'// '}{nodeLabel}
        </motion.span>
      </motion.div>

      {/* Circuit trace connector line */}
      <CircuitTrace side={side} index={index} inView={inView} delay={delay} />

      {/* Card wrapper — centered on md+, left-aligned on mobile */}
      <div
        className={`
          pl-12 md:pl-0
          md:w-[calc(50%-2rem)]
          ${side === 'left' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
        `}
      >
        <motion.div
          custom={side}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay }}
          className="
            group relative p-6 rounded-sm
            bg-[rgba(0,10,20,0.6)] border border-primary/10
            hover:border-primary/30
            hover:shadow-[0_0_30px_rgba(0,212,255,0.06)]
            transition-all duration-300
          "
        >
          {/* Scan-line sweep overlay */}
          <ScanLineSweep inView={inView} delay={delay} />

          {/* HUD corner brackets */}
          <HudCorners />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
            <h3 className="font-heading text-lg text-white group-hover:text-primary transition-colors duration-300">
              {exp.position}
            </h3>
            {exp.type && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent/70 border border-accent/20 px-2 py-0.5 self-start">
                {exp.type}
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-col gap-1.5 mb-4 text-sm">
            <span className="flex items-center gap-2 text-white/50">
              <FaBriefcase size={11} className="text-primary/50" />
              <span className="font-mono">{exp.company}</span>
            </span>
            {exp.location && (
              <span className="flex items-center gap-2 text-white/40">
                <FaMapMarkerAlt size={11} className="text-primary/40" />
                <span className="font-mono text-xs">{exp.location}</span>
              </span>
            )}
            <span className="flex items-center gap-2 text-white/40">
              <FaCalendar size={11} className="text-primary/40" />
              <span className="font-mono text-xs">
                {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
              </span>
            </span>
          </div>

          {/* Description */}
          {exp.description && (
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              {exp.description}
            </p>
          )}

          {/* Responsibilities */}
          {exp.responsibilities && exp.responsibilities.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {exp.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/45">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Tech tags */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-primary/60 border border-primary/15 bg-primary/5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Scan-Line Sweep Effect ── */
function ScanLineSweep({ inView, delay }) {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={inView ? { x: '200%' } : { x: '-100%' }}
      transition={{
        delay: delay + 0.3,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute inset-y-0 w-1/3 pointer-events-none z-30"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.07), rgba(0,212,255,0.12), rgba(0,212,255,0.07), transparent)',
      }}
    />
  );
}

/* ── Circuit Trace Connector ── */
function CircuitTrace({ side, index, inView, delay }) {
  const dashLength = 60;
  const dotY = 8;
  const svgWidth = 40;

  return (
    <svg
      className="absolute top-2 left-4 md:left-1/2 -translate-x-1/2 z-0 pointer-events-none overflow-visible"
      width={svgWidth}
      height={20}
      style={{
        [side === 'left' ? 'right' : 'left']: 'auto',
        [side === 'left' ? 'left' : 'right']: 'auto',
        transform: side === 'left'
          ? 'translateX(12px)'
          : 'translateX(calc(-100% - 12px))',
      }}
    >
      <motion.line
        x1={side === 'left' ? 0 : svgWidth}
        y1={dotY}
        x2={side === 'left' ? svgWidth : 0}
        y2={dotY}
        stroke="rgba(0,212,255,0.25)"
        strokeWidth="1"
        strokeDasharray={dashLength}
        initial={{ strokeDashoffset: dashLength }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: dashLength }}
        transition={{
          delay: delay + 0.6,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />
      {/* Small endpoint dot */}
      <motion.circle
        cx={side === 'left' ? svgWidth : 0}
        cy={dotY}
        r="2"
        fill="rgba(0,212,255,0.4)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 1.4, duration: 0.3 }}
      />
    </svg>
  );
}

/* ── HUD Corner Brackets ── */
function HudCorners() {
  const corner = 'absolute w-3 h-3 border-primary/20 group-hover:border-primary/50 transition-colors duration-300';
  return (
    <>
      <span className={`${corner} top-0 left-0 border-t border-l`} />
      <span className={`${corner} top-0 right-0 border-t border-r`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </>
  );
}
