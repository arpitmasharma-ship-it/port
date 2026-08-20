import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import AnimatedCard from '../ui/AnimatedCard';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const maxMessageLength = 500;

const Contact = ({ profile }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: profile?.email || 'hello@example.com',
      href: `mailto:${profile?.email || 'hello@example.com'}`,
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: profile?.phone || '+1 (000) 000-0000',
      href: `tel:${profile?.phone?.replace(/\s/g, '') || '+10000000000'}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: profile?.location || 'Earth',
      href: null,
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/messages', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    background: 'rgba(0, 10, 20, 0.6)',
    border: '1px solid rgba(0, 212, 255, 0.1)',
  };

  const messageLength = formData.message.length;
  const messagePercent = Math.min((messageLength / maxMessageLength) * 100, 100);
  const messageColor =
    messagePercent > 90 ? '#ef4444' : messagePercent > 70 ? '#f59e0b' : '#00d4ff';

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Contact" subtitle="Get In Touch" icon={FaEnvelope} />

        <div ref={ref} className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-primary/60 font-body leading-relaxed mb-6"
            >
              Feel free to reach out for collaborations, opportunities, or just a friendly hello.
              I&apos;m always open to discussing new projects and ideas.
            </motion.p>

            {contactInfo.map((info, index) => (
              <AnimatedCard key={info.label} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className="p-4 rounded-lg flex items-center gap-4 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: 'rgba(0, 10, 20, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.1)',
                    }}
                  >
                    {/* HUD-style animated border lines */}
                    <motion.div
                      className="absolute top-0 left-0 h-px"
                      style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }}
                      initial={{ width: '0%' }}
                      animate={inView ? { width: '100%' } : {}}
                      transition={{ duration: 1.2, delay: index * 0.2, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 w-px"
                      style={{ background: 'linear-gradient(180deg, #00d4ff, transparent)' }}
                      initial={{ height: '0%' }}
                      animate={inView ? { height: '100%' } : {}}
                      transition={{ duration: 1.0, delay: index * 0.2 + 0.5, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 h-px"
                      style={{ background: 'linear-gradient(270deg, #00d4ff, transparent)' }}
                      initial={{ width: '0%' }}
                      animate={inView ? { width: '100%' } : {}}
                      transition={{ duration: 1.2, delay: index * 0.2 + 0.8, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-px"
                      style={{ background: 'linear-gradient(0deg, #00d4ff, transparent)' }}
                      initial={{ height: '0%' }}
                      animate={inView ? { height: '100%' } : {}}
                      transition={{ duration: 1.0, delay: index * 0.2 + 1.2, ease: 'easeOut' }}
                    />

                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                      }}
                    >
                      <info.icon />
                    </div>
                    <div>
                      <p className="text-primary/50 font-mono text-xs uppercase tracking-wider">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary font-body hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-primary font-body">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* TRANSMISSION TERMINAL header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-3 flex items-center gap-2 font-mono text-xs"
            >
              <span className="text-primary/50 uppercase tracking-widest">
                &gt; TRANSMISSION TERMINAL
              </span>
              <motion.span
                className="inline-block w-2 h-4 bg-primary/70"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'steps(2)' }}
              />
              <span className="text-primary/20 ml-auto">
                {new Date().toISOString().split('T')[0]}
              </span>
            </motion.div>

            <div className="relative">
              {/* Pulsing targeting brackets */}
              <motion.div
                className="absolute -top-2 -left-2 w-8 h-8 pointer-events-none"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-primary/60" />
                <div className="absolute top-0 left-0 w-px h-full bg-primary/60" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 pointer-events-none"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="absolute top-0 right-0 w-full h-px bg-primary/60" />
                <div className="absolute top-0 right-0 w-px h-full bg-primary/60" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 w-8 h-8 pointer-events-none"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
              >
                <div className="absolute bottom-0 left-0 w-full h-px bg-primary/60" />
                <div className="absolute bottom-0 left-0 w-px h-full bg-primary/60" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 pointer-events-none"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <div className="absolute bottom-0 right-0 w-full h-px bg-primary/60" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-primary/60" />
              </motion.div>

              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-xl relative"
                style={{
                  background: 'rgba(0, 10, 20, 0.6)',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40" />

                <div className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-primary/60 font-mono text-xs uppercase tracking-wider mb-2">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg text-primary font-body placeholder-primary/20 focus:outline-none focus:border-primary/50 transition-all duration-300"
                        style={{
                          ...inputStyle,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                          e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-primary/60 font-mono text-xs uppercase tracking-wider mb-2">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg text-primary font-body placeholder-primary/20 focus:outline-none focus:border-primary/50 transition-all duration-300"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                          e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-primary/60 font-mono text-xs uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="w-full px-4 py-3 rounded-lg text-primary font-body placeholder-primary/20 focus:outline-none focus:border-primary/50 transition-all duration-300"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                        e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-primary/60 font-mono text-xs uppercase tracking-wider mb-2">
                      Message <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        maxLength={maxMessageLength}
                        placeholder="Type your transmission here_"
                        className="w-full px-4 py-3 rounded-lg text-primary font-body placeholder-primary/20 focus:outline-none focus:border-primary/50 transition-all duration-300 resize-none"
                        style={{
                          ...inputStyle,
                          caretColor: '#00d4ff',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                          e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      {/* Typing cursor overlay in textarea */}
                      {messageLength === 0 && (
                        <motion.span
                          className="absolute top-[14px] left-4 text-primary/30 font-body pointer-events-none"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(2)' }}
                        >
                          |
                        </motion.span>
                      )}
                    </div>

                    {/* Message length counter */}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0, 212, 255, 0.08)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: messageColor }}
                          initial={{ width: '0%' }}
                          animate={{ width: `${messagePercent}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className="font-mono text-xs tabular-nums" style={{ color: messageColor }}>
                        {messageLength}/{maxMessageLength}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button with CONNECTED indicator */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-6 rounded-lg font-heading text-dark font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff, #0af)',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    {/* CONNECTED status indicator */}
                    <motion.div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(0, 10, 20, 0.6)',
                        border: '1px solid rgba(34, 197, 94, 0.15)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <motion.span
                        className="block w-2 h-2 rounded-full"
                        style={{ background: '#22c55e' }}
                        animate={{
                          boxShadow: [
                            '0 0 4px #22c55e, 0 0 8px #22c55e',
                            '0 0 8px #22c55e, 0 0 16px #22c55e',
                            '0 0 4px #22c55e, 0 0 8px #22c55e',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <span className="font-mono text-xs text-green-500/80 uppercase tracking-wider">
                        Connected
                      </span>
                    </motion.div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
