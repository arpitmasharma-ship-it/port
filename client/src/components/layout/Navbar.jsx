import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navLetters = 'ARPIT PORTFOLIO'.split('');

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoRevealed, setLogoRevealed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLogoRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/#about' },
    { name: 'SKILLS', path: '/#skills' },
    { name: 'PROJECTS', path: '/#projects' },
    { name: 'EXPERIENCE', path: '/#experience' },
    { name: 'BLOG', path: '/#blog' },
    { name: 'CONTACT', path: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback((path) => {
    setIsOpen(false);
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('/#')) {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const toggleMenu = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      style={{
        background: scrolled ? 'var(--navbar-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--hud-border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 212, 255, 0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <motion.div
                animate={logoRevealed ? {
                  boxShadow: [
                    '0 0 10px rgba(0, 212, 255, 0.2)',
                    '0 0 25px rgba(0, 212, 255, 0.4)',
                    '0 0 10px rgba(0, 212, 255, 0.2)',
                  ],
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(0, 170, 255, 0.15))',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                }}
              >
                <span className="font-heading font-bold text-lg text-primary">A</span>
              </motion.div>
              <div className="absolute -inset-1 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-heading font-bold text-primary tracking-wider hidden sm:flex overflow-hidden">
              {navLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  animate={logoRevealed ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                  className={letter === ' ' ? 'w-1.5' : ''}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                className="relative px-4 py-2 text-xs font-mono font-medium tracking-wider transition-all duration-300 group"
                style={{
                  color: item.name === 'HOME' && location.pathname === '/' ? '#00d4ff' : item.name !== 'HOME' && location.hash === `#${item.path.split('#')[1]}` ? '#00d4ff' : '#5a8a9a',
                }}
              >
                <span className="relative z-10">{item.name}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(0, 212, 255, 0.08)',
                      border: '1px solid rgba(0, 212, 255, 0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.05)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <HiSun className="w-5 h-5 text-primary/70" />
              ) : (
                <HiMoon className="w-5 h-5 text-primary/70" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider transition-all duration-300"
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    color: '#00d4ff',
                  }}
                >
                  DASHBOARD
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider transition-all duration-300"
                  style={{
                    background: 'rgba(255, 60, 60, 0.1)',
                    border: '1px solid rgba(255, 60, 60, 0.2)',
                    color: '#ff4444',
                  }}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider transition-all duration-300"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  color: '#00d4ff',
                }}
              >
                ADMIN LOGIN
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              onTouchEnd={toggleMenu}
              className="lg:hidden p-2 rounded-lg transition-all duration-300 relative z-[60]"
              style={{
                background: 'rgba(0, 212, 255, 0.05)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isOpen ? <HiX className="w-6 h-6 text-primary" /> : <HiMenu className="w-6 h-6 text-primary" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - rendered outside nav overflow context */}
      {isOpen && (
        <div
          className="lg:hidden absolute top-20 left-0 right-0 z-50"
          style={{
            background: 'var(--sidebar-bg)',
            borderBottom: '1px solid var(--hud-border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                style={{
                  opacity: 0,
                  animation: `fadeSlideIn 0.3s ease-out ${index * 0.05}s forwards`,
                }}
              >
                <a
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                  className="block px-4 py-3 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                  style={{
                    color: location.pathname === item.path ? '#00d4ff' : '#5a8a9a',
                    background: location.pathname === item.path ? 'rgba(0, 212, 255, 0.08)' : 'transparent',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <span className="text-primary/40 mr-2">{'>'}</span>
                  {item.name}
                </a>
              </div>
            ))}
            <div className="pt-2 border-t border-primary/10">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    className="block px-4 py-3 rounded-lg font-mono text-sm tracking-wider text-primary"
                  >
                    <span className="text-primary/40 mr-2">{'>'}</span>DASHBOARD
                  </Link>
                  <button
                    onClick={() => { logout(); window.location.href = '/'; }}
                    className="block w-full text-left px-4 py-3 rounded-lg font-mono text-sm tracking-wider text-red-400"
                  >
                    <span className="text-red-400/40 mr-2">{'>'}</span>LOGOUT
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-lg font-mono text-sm tracking-wider text-primary"
                >
                  <span className="text-primary/40 mr-2">{'>'}</span>ADMIN LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
