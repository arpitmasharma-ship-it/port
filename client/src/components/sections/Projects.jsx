import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaGithub, FaTimes, FaImage, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCard from '../ui/AnimatedCard';

const categories = ['All', 'Web App', 'Mobile App', 'Full Stack', 'Frontend', 'Backend', 'UI/UX', 'Other'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function Projects({ projects = [] }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedProject) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject, closeModal]);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto">
        <SectionTitle
          title="Projects"
          subtitle="Featured work and technical implementations"
        />

        {/* Data Streams */}
        <DataStreams side="left" />
        <DataStreams side="right" />

        {/* Category Filter - HUD Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                relative px-5 py-2 text-sm font-mono tracking-wider uppercase
                transition-all duration-300 border
                ${activeCategory === cat
                  ? 'text-primary border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                  : 'text-white/50 border-white/10 bg-transparent hover:text-primary/70 hover:border-primary/30 hover:shadow-[0_0_8px_rgba(0,212,255,0.06)]'
                }
              `}
              style={{
                clipPath:
                  activeCategory === cat
                    ? 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)'
                    : 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
              }}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 border border-primary/40"
                  style={{
                    clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                layout
              >
                <AnimatedCard>
                  <ProjectCard project={project} onClick={() => openModal(project)} />
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/30 font-mono text-sm mt-12"
          >
            No projects found in this category.
          </motion.p>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes glitchText {
          0%, 100% { transform: translate(0); text-shadow: 2px 0 rgba(255,0,64,0), -2px 0 rgba(0,255,255,0); }
          20% { transform: translate(-2px, 1px); text-shadow: 2px 0 rgba(255,0,64,0.7), -2px 0 rgba(0,255,255,0.7); }
          40% { transform: translate(2px, -1px); text-shadow: -2px 0 rgba(255,0,64,0.7), 2px 0 rgba(0,255,255,0.7); }
          60% { transform: translate(-1px, -2px); text-shadow: 1px 0 rgba(255,0,64,0.5), -1px 0 rgba(0,255,255,0.5); }
          80% { transform: translate(1px, 2px); text-shadow: -1px 0 rgba(255,0,64,0.3), 1px 0 rgba(0,255,255,0.3); }
        }
        @keyframes scanSweep {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes dataStreamDot {
          0% { top: -4px; opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes hudPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .group:hover .project-title-glitch {
          animation: glitchText 0.4s ease;
        }
        .group:hover .scan-line-overlay {
          opacity: 1;
        }
        .group:hover .scan-line-overlay > div {
          animation: scanSweep 1.8s linear infinite;
        }
      `}</style>
    </section>
  );
}

/* ── Data Streams ── */
function DataStreams({ side }) {
  return (
    <div
      className={`absolute top-0 bottom-0 ${
        side === 'left'
          ? 'left-2 sm:left-6 lg:left-10'
          : 'right-2 sm:right-6 lg:right-10'
      } pointer-events-none hidden lg:block`}
    >
      {[0, 28].map((x, lineIdx) => (
        <div key={lineIdx} className="absolute top-0 h-full" style={{ left: `${x}px` }}>
          <div className="w-[1px] h-full bg-primary/5" />
          <span
            className="absolute left-[-1px] w-[3px] h-[3px] rounded-full bg-primary/50"
            style={{ animation: `dataStreamDot ${2.5 + lineIdx * 0.4}s linear infinite`, animationDelay: `${lineIdx * 0.6}s` }}
          />
          <span
            className="absolute left-[-1px] w-[3px] h-[3px] rounded-full bg-primary/50"
            style={{ animation: `dataStreamDot ${3 + lineIdx * 0.3}s linear infinite`, animationDelay: `${lineIdx * 0.6 + 1.4}s` }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Card ── */
function ProjectCard({ project, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="
        group relative w-full text-left p-6 rounded-sm
        bg-[rgba(0,10,20,0.6)] border border-primary/10
        transition-all duration-300
        hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]
        cursor-pointer
      "
    >
      {/* HUD corner brackets */}
      <HudCorners />

      {/* Scan line overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 scan-line-overlay">
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Featured badge */}
      {project.featured && (
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/40 bg-accent/10">
          Featured
        </span>
      )}

      {/* Category */}
      <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-primary/50 mb-2">
        {project.category}
      </span>

      {/* Title */}
      <h3 className="project-title-glitch font-heading text-lg text-white mb-3 group-hover:text-primary transition-colors duration-300">
        {project.title}
      </h3>

      {/* Short description */}
      <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
        {project.shortDescription || project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {(project.technologies || []).slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-primary/70 border border-primary/15 bg-primary/5 rounded-full"
          >
            {tech}
          </span>
        ))}
        {(project.technologies || []).length > 5 && (
          <span className="px-2 py-0.5 text-[10px] font-mono text-white/30">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>

      {/* Quick links */}
      <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
        {project.liveUrl && (
          <span className="text-xs text-white/30 hover:text-primary flex items-center gap-1 transition-colors">
            <FaExternalLinkAlt size={10} /> Live
          </span>
        )}
        {project.githubUrl && (
          <span className="text-xs text-white/30 hover:text-primary flex items-center gap-1 transition-colors">
            <FaGithub size={12} /> Code
          </span>
        )}
      </div>
    </motion.button>
  );
}

/* ── HUD Corner Brackets ── */
function HudCorners() {
  const corner = 'absolute w-3 h-3 border-primary/30 group-hover:border-primary/60 transition-colors duration-300';
  return (
    <>
      <span className={`${corner} top-0 left-0 border-t border-l`} />
      <span className={`${corner} top-0 right-0 border-t border-r`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/* ── Modal ── */
function ProjectModal({ project, onClose }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const images = project.images || [];

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    checkScroll();
  }, [images]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#020810]/80 backdrop-blur-md" />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-2xl my-auto max-h-[85vh] overflow-y-auto
          bg-[rgba(0,10,20,0.95)] border border-primary/20
          shadow-[0_0_60px_rgba(0,212,255,0.1)]
        "
      >
        {/* HUD border accents - pulsing */}
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-20 h-[1px] bg-gradient-to-r from-primary/60 to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute top-0 left-0 w-[1px] h-20 bg-gradient-to-b from-primary/60 to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-primary/60 to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute top-0 right-0 w-[1px] h-20 bg-gradient-to-b from-primary/60 to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-r from-primary/60 to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-0 w-[1px] h-20 bg-gradient-to-t from-primary/60 to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute bottom-0 right-0 w-20 h-[1px] bg-gradient-to-l from-primary/60 to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="absolute bottom-0 right-0 w-[1px] h-20 bg-gradient-to-t from-primary/60 to-transparent"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/40 hover:text-primary transition-colors"
        >
          <FaTimes size={18} />
        </button>

        <div className="p-6 sm:p-8">
          {/* SYSTEM OVERVIEW label */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div
              className="w-2 h-2 rounded-full bg-primary/60"
              style={{ animation: 'hudPulse 2s ease-in-out infinite' }}
            />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/50">
              SYSTEM OVERVIEW
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent" />
          </div>

          {/* Header */}
          <div className="mb-6">
            {project.featured && (
              <span className="inline-block px-2 py-0.5 mb-3 text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/40 bg-accent/10">
                Featured Project
              </span>
            )}
            <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-primary/50 mb-2">
              {project.category}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-white">
              {project.title}
            </h2>
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="mb-6 relative">
              <div className="flex items-center gap-2 mb-3">
                <FaImage className="text-primary/50" size={12} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/50">
                  SCREENSHOTS ({images.length})
                </span>
              </div>
              <div className="relative group/gallery">
                {canScrollLeft && (
                  <button
                    onClick={() => scroll(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-[rgba(0,10,20,0.9)] border border-primary/30 text-primary/70 hover:text-primary hover:border-primary/60 transition-all"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                )}
                {canScrollRight && (
                  <button
                    onClick={() => scroll(1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-[rgba(0,10,20,0.9)] border border-primary/30 text-primary/70 hover:text-primary hover:border-primary/60 transition-all"
                  >
                    <FaChevronRight size={12} />
                  </button>
                )}
                <div
                  ref={scrollRef}
                  onScroll={checkScroll}
                  className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0,212,255,0.2) transparent',
                    maskImage: 'linear-gradient(to right, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
                  }}
                >
                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex-shrink-0 group/img"
                    >
                      <img
                        src={img.startsWith('http') ? img : `/uploads/${img}`}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="h-48 sm:h-56 rounded-lg border border-primary/15 object-cover hover:border-primary/40 transition-all duration-300"
                        style={{
                          minWidth: '280px',
                          boxShadow: '0 0 15px rgba(0,212,255,0.05)',
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 text-[9px] font-mono text-primary/50 bg-[rgba(0,10,20,0.8)] border border-primary/10">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-heading text-sm uppercase tracking-wider text-primary mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="font-heading text-sm uppercase tracking-wider text-primary mb-3">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-primary/80 border border-primary/20 bg-primary/5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-6 border-t border-white/5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-4 py-2 text-sm font-mono
                  text-primary border border-primary/30 bg-primary/5
                  hover:bg-primary/10 hover:border-primary/50
                  transition-all duration-300
                "
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-4 py-2 text-sm font-mono
                  text-white/50 border border-white/10
                  hover:text-primary hover:border-primary/30 hover:bg-primary/5
                  transition-all duration-300
                "
              >
                <FaGithub size={14} /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
