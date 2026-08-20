import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaArrowDown } from 'react-icons/fa';
import { useTypewriter } from '../../hooks/useTypewriter';
import MagneticButton from '../ui/MagneticButton';

/* Floating data particles */
function DataParticles() {
  const chars = '01{}[]<>/\\;:=+*&^%$#@!█▓░';
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    char: chars[Math.floor(Math.random() * chars.length)],
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
    size: 10 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono text-primary/[0.06]"
          style={{ left: `${p.x}%`, fontSize: `${p.size}px`, top: '-5%' }}
          animate={{ y: ['0vh', '110vh'], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
}

/* Circuit board lines */
function CircuitLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* Horizontal lines */}
      {[20, 40, 60, 80].map((y) => (
        <motion.line
          key={`h-${y}`}
          x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
          stroke="url(#circuitGrad)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2, delay: y / 100 }}
        />
      ))}
      {/* Vertical lines */}
      {[20, 40, 60, 80].map((x) => (
        <motion.line
          key={`v-${x}`}
          x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: x / 100 + 0.5 }}
        />
      ))}
      {/* Circuit nodes */}
      {[
        [20, 20], [40, 40], [60, 20], [80, 60],
        [30, 70], [70, 30], [50, 50], [10, 50],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={`${x}%`} cy={`${y}%`} r="2"
          fill="#00d4ff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
          transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

/* Rotating HUD Ring */
function HudRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
        style={{ border: '1px dashed rgba(0, 212, 255, 0.06)' }}
      />
      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full"
        style={{ border: '1px solid rgba(0, 212, 255, 0.04)' }}
      />
      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full"
        style={{ border: '1px dotted rgba(0, 170, 255, 0.05)' }}
      />
      {/* Tick marks on outer ring */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <motion.div
          key={deg}
          className="absolute w-[1px] bg-primary/[0.08]"
          style={{
            height: '12px',
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
            transform: `rotate(${deg}deg) translateX(340px) translateY(-50%)`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: deg / 720 }}
        />
      ))}
    </div>
  );
}

/* Scanning beam */
function ScanningBeam() {
  return (
    <>
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.15), rgba(0, 170, 255, 0.25), rgba(0, 212, 255, 0.15), transparent)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
        }}
        animate={{ top: ['5%', '95%', '5%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      {/* Secondary scanning beam (horizontal sweep) */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0, 170, 255, 0.1), transparent)',
          boxShadow: '0 0 15px rgba(0, 170, 255, 0.05)',
        }}
        animate={{ left: ['5%', '95%', '5%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
}

/* Glitch text effect */
function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  if (!glitch) return <span>{text}</span>;

  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 text-cyan-400/60"
        style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-3px, 0)' }}
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 text-primary/60"
        style={{ clipPath: 'inset(60% 0 10% 0)', transform: 'translate(3px, 0)' }}
      >
        {text}
      </span>
      {/* Scanline during glitch */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,212,255,0.03) 1px, rgba(0,212,255,0.03) 2px)',
        }}
      />
    </span>
  );
}

/* Targeting reticle */
function TargetingReticle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <motion.div
        animate={{ rotate: 360, opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
      >
        {/* Crosshairs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-primary/10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-primary/10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-8 bg-primary/10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-8 bg-primary/10" />
        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-primary/10" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-primary/10" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-primary/10" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-primary/10" />
      </motion.div>
    </motion.div>
  );
}

/* Pulsing arc reactor center */
function ArcReactorCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="w-48 h-48 md:w-64 md:h-64 rounded-full relative"
      >
        {/* Outer glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 60px rgba(0, 212, 255, 0.08), inset 0 0 40px rgba(0, 212, 255, 0.03)' }}
        />
        {/* Ring segments */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <motion.div
            key={deg}
            className="absolute top-1/2 left-1/2 origin-center"
            style={{
              width: '2px',
              height: '24px',
              background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.3), transparent)',
              transform: `rotate(${deg}deg) translateY(-90px)`,
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: deg / 360 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* Data stream lines flowing outward */
function DataStreams() {
  const streams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 45),
    delay: i * 0.5,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {streams.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            width: '1px',
            height: '100px',
            background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.2), transparent)',
            transformOrigin: 'top center',
            transform: `rotate(${s.angle}deg)`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 3,
            delay: 2 + s.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

const Hero = ({ profile }) => {
  const titles = [
    'Full Stack Developer',
    'UI/UX Designer',
    'React Specialist',
    'MERN Stack Expert',
    'Problem Solver'
  ];

  const typedText = useTypewriter(titles, 100, 50, 2000);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x: x * 8, y: y * 8 });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
    >
      {/* HUD Grid Background */}
      <div className="absolute inset-0 hud-grid-bg opacity-20" />

      {/* Circuit board lines */}
      <CircuitLines />

      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0, 170, 255, 0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* Matrix data rain */}
      <DataParticles />

      {/* Rotating HUD rings */}
      <HudRings />

      {/* Scanning beam */}
      <ScanningBeam />

      {/* Data streams */}
      <DataStreams />

      {/* Targeting reticle */}
      <TargetingReticle />

      {/* Arc reactor center */}
      <ArcReactorCenter />

      {/* HUD side panels */}
      <div className="absolute top-24 left-6 md:left-16 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div
            className="p-4 rounded-lg neon-border"
            style={{
              background: 'rgba(0, 10, 20, 0.4)',
              border: '1px solid rgba(0, 212, 255, 0.08)',
            }}
          >
            {/* HUD corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20" />

            <div className="font-mono text-[10px] space-y-1.5">
              <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
                <span className="text-primary/30">SYS.STATUS:</span> <span className="text-primary/60">ONLINE</span>
              </motion.div>
              <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
                <span className="text-primary/30">PROTOCOL:</span> <span className="text-accent/50">SECURE</span>
              </motion.div>
              <motion.div animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}>
                <span className="text-primary/30">DEFENSE:</span> <span className="text-primary/50">ACTIVE</span>
              </motion.div>
              <div className="pt-1 mt-1 border-t border-primary/10">
                <span className="text-accent/20">{'>'} ARPIT PORTFOLIO v2.0</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-24 right-6 md:right-16 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div
            className="p-4 rounded-lg neon-border"
            style={{
              background: 'rgba(0, 10, 20, 0.4)',
              border: '1px solid rgba(0, 212, 255, 0.08)',
            }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20" />

            <div className="font-mono text-[10px] space-y-1.5 text-right">
              <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity }}>
                <span className="text-primary/30">REACTOR:</span> <span className="text-primary/60">100%</span>
              </motion.div>
              <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}>
                <span className="text-primary/30">POWER.CORE:</span> <span className="text-accent/50">OPTIMAL</span>
              </motion.div>
              <motion.div animate={{ opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}>
                <span className="text-primary/30">NEURAL.LINK:</span> <span className="text-primary/50">STABLE</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg"
            style={{
              background: 'rgba(0, 212, 255, 0.04)',
              border: '1px solid rgba(0, 212, 255, 0.12)',
            }}
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <motion.div
                animate={{ scale: [1, 3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary"
              />
            </div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-primary/60">
              SYSTEM ONLINE // PORTFOLIO ACTIVE
            </span>
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <motion.div
                animate={{ scale: [1, 3, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute inset-0 rounded-full bg-accent"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Profile Photo */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: 'rgba(0, 212, 255, 0.5)',
                borderRightColor: 'rgba(0, 212, 255, 0.15)',
                filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.3))',
              }}
            />
            {/* Middle counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full"
              style={{
                border: '1px dashed rgba(0, 170, 255, 0.25)',
                filter: 'drop-shadow(0 0 4px rgba(0,170,255,0.2))',
              }}
            />
            {/* Inner glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full"
              style={{ border: '1px solid rgba(0, 212, 255, 0.15)' }}
            />
            {/* Pulse rings */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-primary/20"
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1 }}
              className="absolute inset-0 rounded-full border border-accent/15"
            />
            {/* Scanning line */}
            <div className="absolute inset-6 rounded-full overflow-hidden">
              <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent)',
                }}
              />
            </div>
            {/* Profile image */}
            <div
              className="absolute inset-6 rounded-full overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.1)',
              }}
            >
              {profile?.avatar ? (
                <img
                  src={profile.avatar.startsWith('http') ? profile.avatar : `/uploads/${profile.avatar}`}
                  alt={profile?.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,10,20,0.9) 70%)',
                    border: '1px solid rgba(0,212,255,0.2)',
                  }}
                >
                  <span
                    className="text-4xl md:text-5xl font-heading font-bold text-primary"
                    style={{ textShadow: '0 0 20px rgba(0,212,255,0.5)' }}
                  >
                    {(profile?.name || 'A').charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {/* HUD tick marks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <motion.div
                key={deg}
                className="absolute w-[1px] bg-primary/30 hidden md:block"
                style={{
                  height: '6px',
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${deg}deg) translateX(82px) translateY(-50%)`,
                }}
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: deg / 720 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Name with glitch */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-heading font-bold mb-6 tracking-wider leading-tight"
        >
          <span className="text-white/90">
            <GlitchText text="HI, I'M " />
          </span>
          <br className="sm:hidden" />
          <span className="gradient-text glow-text">
            <GlitchText text={profile?.name || 'JOHN DOE'} />
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div variants={itemVariants} className="h-14 mb-8">
          <div
            className="inline-flex items-center px-4 py-2 rounded-lg"
            style={{
              background: 'rgba(0, 212, 255, 0.03)',
              border: '1px solid rgba(0, 212, 255, 0.08)',
            }}
          >
            <span className="text-lg md:text-xl font-mono text-primary/50">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-accent/50 mr-2"
              >
                {'>'}
              </motion.span>
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-primary ml-0.5"
              >
                _
              </motion.span>
            </span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-balance font-body leading-relaxed"
          style={{ color: '#5a8a9a' }}
        >
          {profile?.bio || 'Passionate developer building amazing digital experiences with modern technologies.'}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <MagneticButton className="btn-primary flex items-center gap-2">
            <a href="#projects" className="flex items-center gap-2">
              VIEW MY WORK
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <FaArrowDown />
              </motion.span>
            </a>
          </MagneticButton>

          <MagneticButton className="btn-secondary flex items-center gap-2">
            <a href={profile?.resume || '#'} download className="flex items-center gap-2">
              DOWNLOAD CV
              <FaDownload />
            </a>
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: FaGithub, href: profile?.social?.github || 'https://github.com', label: 'GH' },
            { icon: FaLinkedin, href: profile?.social?.linkedin || 'https://linkedin.com', label: 'LI' },
            { icon: FaTwitter, href: profile?.social?.twitter || 'https://twitter.com', label: 'TW' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -5, boxShadow: '0 0 25px rgba(0, 212, 255, 0.3)' }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.1, type: 'spring', stiffness: 200 }}
              className="group relative p-3 rounded-lg transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.04)',
                border: '1px solid rgba(0, 212, 255, 0.08)',
                color: '#5a8a9a',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                e.currentTarget.style.color = '#00d4ff';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.15)';
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.08)';
                e.currentTarget.style.color = '#5a8a9a';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.04)';
              }}
            >
              <social.icon className="w-5 h-5" />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[9px] font-mono tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(0, 10, 20, 0.9)', border: '1px solid rgba(0, 212, 255, 0.2)', color: '#00d4ff' }}>
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Separator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 mx-auto h-[1px] max-w-xs"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent)' }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-mono tracking-[0.3em] text-primary/30">SCROLL</span>
          <div
            className="w-5 h-8 rounded-full flex justify-center pt-1.5"
            style={{ border: '1px solid rgba(0, 212, 255, 0.15)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[2px] h-2 rounded-full bg-primary/50"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.15) 2px, rgba(0, 212, 255, 0.15) 4px)',
        }}
      />
    </section>
  );
};

export default Hero;
