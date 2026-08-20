import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const Education = ({ education }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Education" subtitle="Academic Background" icon={FaGraduationCap} />

        <div ref={ref} className="relative mt-16">
          {/* Knowledge Base Subtitle */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="font-mono text-xs tracking-[0.3em] text-primary/50 flex items-center gap-1">
              <span>&#47;&#47;</span>
              <span className="text-primary/70">KNOWLEDGE_BASE</span>
              <span className="inline-block w-2 h-4 bg-primary/70 ml-0.5" style={{ animation: 'blink-cursor 1s step-end infinite' }} />
              <span className="text-primary/30 ml-1">&#9608;</span>
            </div>
          </motion.div>

          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary/30 hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-accent to-transparent"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Mobile Timeline Line */}
          <div className="absolute left-4 top-0 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary/30 md:hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-accent to-transparent"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-12">
            {education?.map((edu, index) => (
              <motion.div
                key={edu.id || index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot with Double-Ring Radar Ping */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                  {/* Outer radar ring */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border border-primary/30"
                    style={{ transform: 'translate(-50%, -50%)' }}
                    animate={inView ? {
                      scale: [1, 3],
                      opacity: [0.6, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: index * 0.3,
                    }}
                  />
                  {/* Inner radar ring */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border border-accent/40"
                    style={{ transform: 'translate(-50%, -50%)' }}
                    animate={inView ? {
                      scale: [1, 2.5],
                      opacity: [0.5, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: index * 0.3 + 0.4,
                    }}
                  />
                  {/* Core dot */}
                  <motion.div
                    className="w-4 h-4 rounded-full bg-dark border-2 border-primary relative"
                    animate={inView ? {
                      boxShadow: [
                        '0 0 0 0 rgba(0, 212, 255, 0.4)',
                        '0 0 0 12px rgba(0, 212, 255, 0)',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  {/* Node Label */}
                  <motion.span
                    className="absolute font-mono text-[10px] tracking-wider whitespace-nowrap"
                    style={{
                      top: '50%',
                      transform: 'translateY(-50%)',
                      ...(index % 2 === 0
                        ? { left: '20px' }
                        : { right: '20px' }),
                      color: 'rgba(0, 212, 255, 0.45)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  >
                    NODE_{String(index + 1).padStart(2, '0')}
                  </motion.span>
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <motion.div
                    className="p-6 rounded-lg relative overflow-hidden group"
                    style={{
                      background: 'rgba(0, 10, 20, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.1)',
                    }}
                    whileHover={{
                      borderColor: 'rgba(0, 212, 255, 0.4)',
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.1)',
                    }}
                  >
                    {/* Scan-Line Sweep */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.06) 48%, rgba(0, 212, 255, 0.12) 50%, rgba(0, 212, 255, 0.06) 52%, transparent 100%)',
                        backgroundSize: '100% 20px',
                      }}
                      initial={{ top: '-20%' }}
                      animate={inView ? { top: '120%' } : { top: '-20%' }}
                      transition={{ duration: 1.8, delay: index * 0.2 + 0.3, ease: 'easeInOut' }}
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50" />

                    {/* Holographic Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />

                    <div className="relative z-10">
                      {/* Institution */}
                      <h3 className="text-xl font-heading text-primary mb-1">
                        {edu.institution}
                      </h3>

                      {/* Degree & Field */}
                      <p className="text-accent font-body text-lg mb-2">
                        {edu.degree}
                        {edu.field && <span className="text-primary/70"> in {edu.field}</span>}
                      </p>

                      {/* Date & Location */}
                      <div className="flex flex-wrap gap-4 text-sm text-primary/60 font-mono mb-4">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-primary/40" />
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </span>
                        {edu.location && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-primary/40" />
                            {edu.location}
                          </span>
                        )}
                      </div>

                      {/* Grade */}
                      {edu.grade && (
                        <div className="mb-3 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded inline-block">
                          <span className="text-primary/60 font-mono text-sm">Grade: </span>
                          <span className="text-primary font-mono text-sm">{edu.grade}</span>
                        </div>
                      )}

                      {/* Achievements */}
                      {edu.achievements?.length > 0 && (
                        <ul className="space-y-2 mt-3">
                          {edu.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-2 text-primary/70 font-body text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: index * 0.2 + i * 0.1 + 0.3 }}
                            >
                              <span className="text-primary mt-1 text-xs">&#9656;</span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      {/* Description */}
                      {edu.description && (
                        <p className="text-primary/60 font-body text-sm mt-3 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-5/12" />

                {/* Circuit Trace Connector */}
                <motion.div
                  className="hidden md:block absolute top-1/2 h-px"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.5), rgba(0, 212, 255, 0.15))',
                    ...(index % 2 === 0
                      ? { left: 'calc(50% + 12px)', width: 'calc(10% - 12px)' }
                      : { right: 'calc(50% + 12px)', width: 'calc(10% - 12px)', background: 'linear-gradient(270deg, rgba(0, 212, 255, 0.5), rgba(0, 212, 255, 0.15))' }),
                    transform: 'translateY(-50%)',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.2, ease: 'easeOut' }}
                />
                {/* Circuit trace dot markers */}
                <motion.div
                  className="hidden md:block absolute w-1.5 h-1.5 rounded-full bg-primary/50"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    ...(index % 2 === 0
                      ? { left: 'calc(50% + 10px)' }
                      : { right: 'calc(50% + 10px)' }),
                  }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
                />
                <motion.div
                  className="hidden md:block absolute w-1 h-1 rounded-full bg-primary/30"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    ...(index % 2 === 0
                      ? { left: 'calc(50% + 40px)' }
                      : { right: 'calc(50% + 40px)' }),
                  }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Blink cursor keyframes injected via style tag */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Education;
