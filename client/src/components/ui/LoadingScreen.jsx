import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING PORTFOLIO');
  const [showArc, setShowArc] = useState(false);

  const statuses = [
    'INITIALIZING PORTFOLIO',
    'LOADING NEURAL NETWORKS',
    'CALIBRATING HUD DISPLAY',
    'SYNCING QUANTUM CORE',
    'ESTABLISHING SECURE LINK',
    'SYSTEM READY',
  ];

  useEffect(() => {
    setShowArc(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        const statusIndex = Math.min(Math.floor(next / 20), statuses.length - 1);
        setStatusText(statuses[statusIndex]);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: '#020810' }}
        >
          {/* Arc Reactor */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
            className="relative mb-12"
          >
            {/* Outer ring */}
            <div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTopColor: '#00d4ff',
                  borderRightColor: 'rgba(0, 212, 255, 0.3)',
                }}
              />
              {/* Middle ring */}
              <div className="w-24 h-24 rounded-full border border-accent/40 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute rounded-full"
                  style={{
                    width: '96px',
                    height: '96px',
                    border: '1px solid transparent',
                    borderBottomColor: '#0af',
                    borderLeftColor: 'rgba(0, 170, 255, 0.3)',
                  }}
                />
                {/* Core */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(0, 212, 255, 0.1)',
                      '0 0 40px rgba(0, 212, 255, 0.8), inset 0 0 40px rgba(0, 212, 255, 0.3)',
                      '0 0 20px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(0, 212, 255, 0.1)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center"
                  style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
                >
                  <div className="w-4 h-4 rounded-full bg-primary/60" />
                </motion.div>
              </div>
            </div>

            {/* Pulse rings */}
            {showArc && (
              <>
                <motion.div
                  animate={{ scale: [0.8, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-primary/20"
                />
                <motion.div
                  animate={{ scale: [0.8, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  className="absolute inset-0 rounded-full border border-accent/20"
                />
              </>
            )}
          </motion.div>

          {/* Progress bar */}
          <div className="w-72 mb-4">
            <div className="h-[2px] bg-dark-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00d4ff, #0af)',
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                }}
              />
            </div>
          </div>

          {/* Status text */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-center"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-primary/60 mb-2">
              {statusText}
            </p>
            <p className="font-mono text-xs text-accent/40">
              [{progress}%] {progress < 100 ? 'LOADING...' : 'COMPLETE'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
