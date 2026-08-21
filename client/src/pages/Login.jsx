import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back, Sir.');
      navigate('/admin');
    } catch (error) {
      const msg = error.response?.data?.message
        || error.response?.data?.errors?.[0]?.msg
        || 'Something went wrong';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
      <div className="absolute inset-0 hud-grid-bg opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="p-8 rounded-2xl"
          style={{
            background: 'rgba(0, 10, 20, 0.6)',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.05)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative w-20 h-20 mx-auto mb-6"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
                  border: '2px solid rgba(0, 212, 255, 0.3)',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.05)',
                }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(0, 212, 255, 0.3)',
                      '0 0 20px rgba(0, 212, 255, 0.6)',
                      '0 0 10px rgba(0, 212, 255, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
                    border: '1px solid rgba(0, 212, 255, 0.4)',
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </motion.div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid transparent', borderTopColor: 'rgba(0, 212, 255, 0.2)' }}
              />
            </motion.div>

            <h1 className="text-2xl font-heading font-bold text-primary tracking-wider">
              SECURE ACCESS
            </h1>
            <p className="text-sm mt-2 font-mono tracking-wider" style={{ color: '#5a8a9a' }}>
              ADMIN ONLY - AUTHENTICATE TO PROCEED
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>ADMIN ID</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#3a6a7a' }} />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-white transition-all duration-300 font-body"
                  style={{
                    background: 'rgba(0, 10, 20, 0.6)',
                    border: '1px solid rgba(0, 212, 255, 0.1)',
                    color: '#e0faff',
                  }}
                  placeholder="Enter admin ID"
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)'; e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>PASSWORD</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#3a6a7a' }} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-white transition-all duration-300 font-body"
                  style={{
                    background: 'rgba(0, 10, 20, 0.6)',
                    border: '1px solid rgba(0, 212, 255, 0.1)',
                    color: '#e0faff',
                  }}
                  placeholder="Enter password"
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)'; e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" /> AUTHENTICATING...
                </>
              ) : (
                'AUTHORIZE ACCESS'
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
