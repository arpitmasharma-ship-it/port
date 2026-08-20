import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer
      className="relative py-12 bg-dark-400/80"
      style={{ borderTop: '1px solid rgba(0, 212, 255, 0.1)' }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
          >
            <Link to="/" className="text-xl font-heading font-bold text-primary tracking-wider">
              ARPIT PORTFOLIO
            </Link>
            <p className="text-sm mt-2 font-body" style={{ color: '#5a8a9a' }}>
              Creative Developer & Designer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                  color: '#5a8a9a',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  e.currentTarget.style.color = '#00d4ff';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.1)';
                  e.currentTarget.style.color = '#5a8a9a';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(0, 212, 255, 0.08)' }}
        >
          <p className="text-xs font-mono tracking-wider" style={{ color: '#3a6a7a' }}>
            &copy; {currentYear} ARPIT PORTFOLIO SYSTEMS // ALL RIGHTS RESERVED // BUILT WITH MERN STACK
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
