import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCard from '../ui/AnimatedCard';
import { FaCalendar, FaEye, FaClock, FaArrowRight } from 'react-icons/fa';

const MARQUEE_TAGS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
  'DevOps', 'AI/ML', 'Web3', 'Cybersecurity', 'Cloud',
  'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'MongoDB',
  'PostgreSQL', 'Redis', 'Tailwind', 'Next.js', 'Rust',
];

const Blog = ({ blogs }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const publishedBlogs = blogs?.filter((blog) => blog.published !== false) || [];

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Blog" subtitle="Latest Posts & Thoughts" icon={FaCalendar} />

        <div ref={ref} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedBlogs.map((blog, index) => (
            <AnimatedCard key={blog.id || index} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full group"
              >
                <div
                  className="blog-card h-full rounded-xl overflow-hidden relative"
                  style={{
                    background: 'rgba(0, 10, 20, 0.6)',
                    border: '1px solid rgba(0, 212, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* HUD Corner Brackets */}
                  <span className="blog-hud-tl absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30 group-hover:border-primary/70 transition-colors duration-300" />
                  <span className="blog-hud-tr absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30 group-hover:border-primary/70 transition-colors duration-300" />
                  <span className="blog-hud-bl absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30 group-hover:border-primary/70 transition-colors duration-300" />
                  <span className="blog-hud-br absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30 group-hover:border-primary/70 transition-colors duration-300" />

                  {/* Scan-line sweep on viewport entry */}
                  <div className="blog-scan-overlay absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="blog-scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
                    }}
                  />

                  {/* Top Border Glow */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Content */}
                  <div className="p-6 relative z-10 h-full flex flex-col">
                    {/* Category Badge + Circuit Lines */}
                    {blog.category && (
                      <div className="mb-3 relative">
                        <span
                          className="inline-block px-3 py-1 text-xs font-mono rounded-full relative z-10"
                          style={{
                            background: 'rgba(0, 212, 255, 0.1)',
                            border: '1px solid rgba(0, 212, 255, 0.2)',
                            color: '#00d4ff',
                          }}
                        >
                          {blog.category}
                        </span>
                        {/* Circuit line from badge to left border */}
                        <span className="blog-circuit-left absolute top-1/2 -left-6 h-px w-6 -translate-y-1/2 bg-primary/20" />
                        <span className="blog-circuit-dot-l absolute top-1/2 -left-7 w-1 h-1 -translate-y-1/2 rotate-45 bg-primary/30" />
                        {/* Circuit line from badge to right border */}
                        <span className="blog-circuit-right absolute top-1/2 -right-6 h-px w-6 -translate-y-1/2 bg-primary/20" />
                        <span className="blog-circuit-dot-r absolute top-1/2 -right-7 w-1 h-1 -translate-y-1/2 rotate-45 bg-primary/30" />
                      </div>
                    )}

                    {/* PUBLISHED Status Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="relative flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded"
                        style={{
                          background: 'rgba(0, 255, 136, 0.06)',
                          border: '1px solid rgba(0, 255, 136, 0.15)',
                          color: 'rgba(0, 255, 136, 0.8)',
                        }}
                      >
                        <span className="blog-blink-dot relative w-1.5 h-1.5 rounded-full bg-green-400" />
                        PUBLISHED
                      </span>
                    </div>

                    {/* Title with glitch effect */}
                    <h3 className="blog-title-glitch text-lg font-heading text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-primary/60 font-body text-sm leading-relaxed mb-4 flex-grow">
                      {blog.excerpt || blog.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-mono text-primary/40 mb-4">
                      {blog.date && (
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-primary/30" />
                          {formatDate(blog.date)}
                        </span>
                      )}
                      {blog.views !== undefined && (
                        <span className="flex items-center gap-1">
                          <FaEye className="text-primary/30" />
                          {blog.views}
                        </span>
                      )}
                      {blog.readTime && (
                        <span className="flex items-center gap-1">
                          <FaClock className="text-primary/30" />
                          {blog.readTime} min
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs font-mono rounded"
                            style={{
                              background: 'rgba(0, 170, 255, 0.05)',
                              border: '1px solid rgba(0, 170, 255, 0.1)',
                              color: 'rgba(0, 170, 255, 0.6)',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <motion.div
                      className="flex items-center gap-2 text-primary/60 font-mono text-sm cursor-pointer group/link mt-auto"
                      whileHover={{ x: 5 }}
                    >
                      <span className="group-hover/link:text-primary transition-colors">Read More</span>
                      <FaArrowRight className="text-xs group-hover/link:text-primary transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>

        {publishedBlogs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-primary/40 font-mono mt-8"
          >
            No blog posts available yet.
          </motion.p>
        )}

        {/* Scrolling Tech Tags Marquee */}
        <div className="relative mt-16 overflow-hidden py-4"
          style={{
            borderTop: '1px solid rgba(0, 212, 255, 0.08)',
            borderBottom: '1px solid rgba(0, 212, 255, 0.08)',
          }}
        >
          <div className="blog-marquee-track flex items-center gap-6 whitespace-nowrap"
            style={{
              width: 'max-content',
            }}
          >
            {[...MARQUEE_TAGS, ...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
              <span
                key={i}
                className="font-mono text-xs tracking-wider uppercase px-3 py-1 rounded"
                style={{
                  background: 'rgba(0, 212, 255, 0.04)',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                  color: 'rgba(0, 212, 255, 0.35)',
                }}
              >
                {'{ '}{tag}{'}'}
              </span>
            ))}
          </div>
          {/* Fade edges */}
          <span className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020810] to-transparent pointer-events-none z-10" />
          <span className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020810] to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Scoped animations & effects */}
      <style>{`
        /* Glitch text on hover */
        .group:hover .blog-title-glitch {
          animation: blogGlitchText 0.4s ease;
        }

        @keyframes blogGlitchText {
          0%, 100% { transform: translate(0); text-shadow: 2px 0 rgba(255,0,64,0), -2px 0 rgba(0,255,255,0); }
          20% { transform: translate(-2px, 1px); text-shadow: 2px 0 rgba(255,0,64,0.7), -2px 0 rgba(0,255,255,0.7); }
          40% { transform: translate(2px, -1px); text-shadow: -2px 0 rgba(255,0,64,0.7), 2px 0 rgba(0,255,255,0.7); }
          60% { transform: translate(-1px, -2px); text-shadow: 1px 0 rgba(255,0,64,0.5), -1px 0 rgba(0,255,255,0.5); }
          80% { transform: translate(1px, 2px); text-shadow: -1px 0 rgba(255,0,64,0.3), 1px 0 rgba(0,255,255,0.3); }
        }

        /* Scan line sweep on hover */
        .group:hover .blog-scan-overlay {
          opacity: 1;
        }
        .group:hover .blog-scan-line {
          animation: blogScanSweep 1.6s linear infinite;
        }

        @keyframes blogScanSweep {
          0% { top: 0; }
          100% { top: 100%; }
        }

        /* Blinking published dot */
        .blog-blink-dot {
          animation: blogBlinkDot 1.4s ease-in-out infinite;
        }

        @keyframes blogBlinkDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px rgba(0,255,136,0.6); }
          50% { opacity: 0.2; box-shadow: 0 0 1px rgba(0,255,136,0.1); }
        }

        /* Circuit lines pulse on hover */
        .group:hover .blog-circuit-left,
        .group:hover .blog-circuit-right {
          background: rgba(0, 212, 255, 0.45);
          box-shadow: 0 0 4px rgba(0, 212, 255, 0.2);
        }
        .group:hover .blog-circuit-dot-l,
        .group:hover .blog-circuit-dot-r {
          background: rgba(0, 212, 255, 0.7);
          box-shadow: 0 0 6px rgba(0, 212, 255, 0.4);
        }

        /* Scrolling marquee */
        .blog-marquee-track {
          animation: blogMarqueeScroll 40s linear infinite;
        }

        @keyframes blogMarqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};

export default Blog;
