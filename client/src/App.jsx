import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AnimatedBackground from './components/layout/AnimatedBackground';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center" style={{ background: '#020810' }}>
            <div className="text-center">
              <div
                className="w-12 h-12 border-2 border-t-primary border-primary/30 rounded-full animate-spin mx-auto mb-4"
              />
              <p className="font-mono text-xs tracking-widest text-primary/50">LOADING...</p>
            </div>
          </div>
        }>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            <CustomCursor />
            <AnimatedBackground />
            <Navbar />
            <AnimatedRoutes />
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(2, 8, 16, 0.95)',
                  color: '#e0faff',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '15px',
                },
                success: {
                  iconTheme: { primary: '#00d4ff', secondary: '#020810' },
                },
                error: {
                  iconTheme: { primary: '#ff4444', secondary: '#020810' },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
