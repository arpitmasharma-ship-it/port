import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaCode, FaBriefcase, FaGraduationCap, FaQuoteLeft,
  FaPen, FaEnvelope, FaPlus, FaTrash, FaSave, FaSpinner,
  FaHome, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaBars, FaTimes, FaFileImage
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchAllData();
  }, [isAuthenticated, navigate]);

  const fetchAllData = async () => {
    try {
      const [p, s, pr, e, ed, t, b, m] = await Promise.all([
        api.get('/profile'), api.get('/skills'), api.get('/projects'),
        api.get('/experience'), api.get('/education'), api.get('/testimonials'),
        api.get('/blog'), api.get('/messages'),
      ]);
      setProfile(p.data.data);
      setSkills(s.data.data);
      setProjects(pr.data.data);
      setExperiences(e.data.data);
      setEducation(ed.data.data);
      setTestimonials(t.data.data);
      setBlogs(b.data.data);
      setMessages(m.data.data);
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  const tabs = [
    { id: 'profile', label: 'PROFILE', icon: FaUser },
    { id: 'skills', label: 'SKILLS', icon: FaCode },
    { id: 'projects', label: 'PROJECTS', icon: FaBriefcase },
    { id: 'experience', label: 'EXPERIENCE', icon: FaBriefcase },
    { id: 'education', label: 'EDUCATION', icon: FaGraduationCap },
    { id: 'testimonials', label: 'TESTIMONIALS', icon: FaQuoteLeft },
    { id: 'blog', label: 'BLOG', icon: FaPen },
    { id: 'messages', label: 'MESSAGES', icon: FaEnvelope },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen pt-20 flex">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 72 }}
        className="hidden lg:block fixed left-0 top-20 bottom-0 z-40 overflow-hidden"
        style={{
          background: 'rgba(2, 8, 16, 0.95)',
          borderRight: '1px solid rgba(0, 212, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="p-3 space-y-1 mt-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ x: 4 }}
              onClick={() => handleTabChange(tab.id)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-mono tracking-wider transition-all"
              style={{
                background: activeTab === tab.id ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(0, 212, 255, 0.2)' : '1px solid transparent',
                color: activeTab === tab.id ? '#00d4ff' : '#5a8a9a',
              }}
            >
              <tab.icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{tab.label}</span>}
            </motion.button>
          ))}
        </div>

        <div className="absolute bottom-4 left-3 right-3 space-y-1">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-mono tracking-wider transition-all"
            style={{ color: '#5a8a9a', border: '1px solid transparent' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.15)'; e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; }}
          >
            <FaHome className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>HOME</span>}
          </button>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-mono tracking-wider transition-all"
            style={{ color: '#ff4444' }}
          >
            <FaSignOutAlt className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>LOGOUT</span>}
          </button>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 right-2 p-1.5 rounded-lg transition-all"
          style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.1)' }}
        >
          {sidebarOpen ? <FaChevronLeft className="w-3 h-3 text-primary/60" /> : <FaChevronRight className="w-3 h-3 text-primary/60" />}
        </button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden overflow-y-auto"
              style={{
                background: 'rgba(2, 8, 16, 0.98)',
                borderRight: '1px solid rgba(0, 212, 255, 0.15)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.1)' }}>
                <span className="font-heading font-bold text-sm text-primary tracking-wider">PORTFOLIO CONTROL</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-2 rounded-lg" style={{ border: '1px solid rgba(0, 212, 255, 0.1)' }}>
                  <FaTimes className="w-4 h-4 text-primary/60" />
                </button>
              </div>

              <div className="p-3 space-y-1 mt-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleTabChange(tab.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono tracking-wider transition-all"
                    style={{
                      background: activeTab === tab.id ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                      border: activeTab === tab.id ? '1px solid rgba(0, 212, 255, 0.2)' : '1px solid transparent',
                      color: activeTab === tab.id ? '#00d4ff' : '#5a8a9a',
                    }}
                  >
                    <tab.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="p-3 space-y-1" style={{ borderTop: '1px solid rgba(0, 212, 255, 0.08)' }}>
                <button
                  onClick={() => { navigate('/'); setMobileSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono tracking-wider"
                  style={{ color: '#5a8a9a' }}
                >
                  <FaHome className="w-4 h-4" />
                  <span>BACK TO SITE</span>
                </button>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono tracking-wider"
                  style={{ color: '#ff4444' }}
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>LOGOUT</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile top bar */}
      <div
        className="lg:hidden fixed top-20 left-0 right-0 z-30 flex items-center justify-between px-4 py-3"
        style={{
          background: 'rgba(2, 8, 16, 0.9)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-lg"
          style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.1)' }}
        >
          <FaBars className="w-5 h-5 text-primary" />
        </button>
        <span className="font-mono text-xs text-primary/70 tracking-wider">
          {tabs.find(t => t.id === activeTab)?.label}
        </span>
        <div className="w-9" />
      </div>

      {/* Main Content */}
      <main
        className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 lg:ml-[var(--sidebar-width)] pt-28 lg:pt-8"
        style={{ '--sidebar-width': sidebarOpen ? '260px' : '72px' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && <ProfileEditor profile={profile} onSave={setProfile} />}
            {activeTab === 'skills' && <SkillsEditor skills={skills} onSave={setSkills} />}
            {activeTab === 'projects' && <ProjectsEditor projects={projects} onSave={setProjects} />}
            {activeTab === 'experience' && <ExperienceEditor experiences={experiences} onSave={setExperiences} />}
            {activeTab === 'education' && <EducationEditor education={education} onSave={setEducation} />}
            {activeTab === 'testimonials' && <TestimonialsEditor testimonials={testimonials} onSave={setTestimonials} />}
            {activeTab === 'blog' && <BlogEditor blogs={blogs} onSave={setBlogs} />}
            {activeTab === 'messages' && <MessagesList messages={messages} />}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const hudCard = {
  background: 'rgba(0, 10, 20, 0.6)',
  border: '1px solid rgba(0, 212, 255, 0.1)',
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
};

const hudInput = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  background: 'rgba(0, 10, 20, 0.6)',
  border: '1px solid rgba(0, 212, 255, 0.1)',
  color: '#e0faff',
  fontFamily: 'Rajdhani, sans-serif',
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.3s',
};

const ProfileEditor = ({ profile, onSave }) => {
  const [form, setForm] = useState({
    name: '', title: '', bio: '', email: '', phone: '', location: '',
    'social.github': '', 'social.linkedin': '', 'social.twitter': '',
    'about.description': '',
  });
  const [saving, setSaving] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '', title: profile.title || '', bio: profile.bio || '',
        email: profile.email || '', phone: profile.phone || '', location: profile.location || '',
        'social.github': profile.social?.github || '', 'social.linkedin': profile.social?.linkedin || '',
        'social.twitter': profile.social?.twitter || '',
        'about.description': profile.about?.description || '',
      });
      if (!cvFile && profile.resume) {
        setCvPreview(profile.resume.startsWith('http') ? profile.resume : `/uploads/${profile.resume}`);
      }
      if (!avatarFile && profile.avatar && profile.avatar !== 'default-avatar.png') {
        setAvatarPreview(profile.avatar.startsWith('http') ? profile.avatar : `/uploads/${profile.avatar}`);
      }
    }
  }, [profile]);

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File too large. Max 10MB.');
        return;
      }
      setCvFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCvPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large. Max 5MB.');
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('title', form.title);
      formData.append('bio', form.bio);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('location', form.location);
      formData.append('social', JSON.stringify({
        github: form['social.github'], linkedin: form['social.linkedin'], twitter: form['social.twitter'],
      }));
      formData.append('about', JSON.stringify({ description: form['about.description'] }));
      if (cvFile) {
        formData.append('resume', cvFile);
      }
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      const res = await api.put('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSave(res.data.data);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaUser className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">EDIT PROFILE</h2>
      </div>

      <div className="p-6 rounded-xl" style={hudCard}>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key: 'name', label: 'FULL NAME' },
            { key: 'title', label: 'TITLE' },
            { key: 'email', label: 'EMAIL', type: 'email' },
            { key: 'phone', label: 'PHONE' },
            { key: 'location', label: 'LOCATION' },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>{label}</label>
              <input type={type || 'text'} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={hudInput}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)'; e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>BIO</label>
          <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        </div>

        <div className="mt-4">
          <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>ABOUT DESCRIPTION</label>
          <textarea rows={4} value={form['about.description']} onChange={(e) => setForm({ ...form, 'about.description': e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {[
            { key: 'social.github', label: 'GITHUB URL' },
            { key: 'social.linkedin', label: 'LINKEDIN URL' },
            { key: 'social.twitter', label: 'TWITTER URL' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>{label}</label>
              <input type="url" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={hudInput}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)'; e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-xs font-mono mb-3 tracking-wider" style={{ color: '#5a8a9a' }}>PROFILE PHOTO</label>
          <div className="flex items-center gap-6">
            {/* Avatar preview */}
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0"
              style={{
                border: '2px solid rgba(0, 212, 255, 0.2)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
              }}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(0, 10, 20, 0.6)' }}>
                  <FaUser className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </div>
            {/* Upload area */}
            <div
              className="relative flex-1 rounded-xl p-4 text-center cursor-pointer transition-all duration-300"
              style={{
                background: 'rgba(0, 10, 20, 0.4)',
                border: '2px dashed rgba(0, 212, 255, 0.2)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'; }}
            >
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleAvatarChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-1">
                <p className="text-sm font-mono" style={{ color: '#5a8a9a' }}>
                  {avatarFile ? avatarFile.name : 'Click to upload photo'}
                </p>
                <p className="text-[10px] font-mono" style={{ color: '#3a6a7a' }}>
                  PNG, JPG, WEBP — Max 5MB — Displays on Home page
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xs font-mono mb-3 tracking-wider" style={{ color: '#5a8a9a' }}>CV / RESUME (IMAGE FORMAT)</label>
          <div
            className="relative rounded-xl p-6 text-center cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(0, 10, 20, 0.4)',
              border: '2px dashed rgba(0, 212, 255, 0.2)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'; }}
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleCvChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {cvPreview ? (
              <div className="space-y-3">
                <img
                  src={cvPreview}
                  alt="CV Preview"
                  className="max-h-48 mx-auto rounded-lg border border-primary/20 object-contain"
                />
                <p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>
                  {cvFile ? cvFile.name : 'Current CV'} — Click to replace
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <FaFileImage className="w-8 h-8 mx-auto text-primary/30" />
                <p className="text-sm font-mono" style={{ color: '#5a8a9a' }}>
                  Drop CV image here or click to browse
                </p>
                <p className="text-[10px] font-mono" style={{ color: '#3a6a7a' }}>
                  PNG, JPG, WEBP — Max 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 mt-6">
          {saving ? <><FaSpinner className="animate-spin" /> SAVING...</> : <><FaSave /> SAVE PROFILE</>}
        </motion.button>
      </div>
    </div>
  );
};

const SkillsEditor = ({ skills, onSave }) => {
  const [form, setForm] = useState({ name: '', category: 'Frontend', proficiency: 80, color: '#00d4ff' });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Design', 'Other'];

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        const res = await api.put(`/skills/${editId}`, form);
        onSave(skills.map(s => s._id === editId ? res.data.data : s));
        toast.success('Skill updated!');
      } else {
        const res = await api.post('/skills', form);
        onSave([...skills, res.data.data]);
        toast.success('Skill added!');
      }
      setForm({ name: '', category: 'Frontend', proficiency: 80, color: '#00d4ff' });
      setEditId(null);
    } catch (err) { toast.error('Failed to save skill'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/skills/${id}`); onSave(skills.filter(s => s._id !== id)); toast.success('Skill deleted!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaCode className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">MANAGE SKILLS</h2>
      </div>

      <div className="p-6 rounded-xl" style={hudCard}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input placeholder="Skill name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={hudInput}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(0, 212, 255, 0.1)'; }} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...hudInput, cursor: 'pointer' }}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <input type="number" min={0} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) || 0 })} style={hudInput} />
            <span className="text-xs font-mono" style={{ color: '#5a8a9a' }}>%</span>
          </div>
          <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ ...hudInput, height: '46px', padding: '4px', cursor: 'pointer' }} />
        </div>
        <div className="flex gap-3 mt-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || !form.name} className="btn-primary flex items-center gap-2 text-sm">
            {saving ? <FaSpinner className="animate-spin" /> : editId ? <FaSave /> : <FaPlus />}
            {editId ? 'UPDATE' : 'ADD SKILL'}
          </motion.button>
          {editId && (
            <button onClick={() => { setEditId(null); setForm({ name: '', category: 'Frontend', proficiency: 80, color: '#00d4ff' }); }}
              className="px-4 py-2 rounded-lg text-xs font-mono tracking-wider" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5a8a9a' }}>CANCEL</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <motion.div key={skill._id} layout whileHover={{ y: -2 }}
            className="p-4 rounded-xl flex items-center justify-between"
            style={{ background: 'rgba(0, 10, 20, 0.6)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: skill.color + '20', border: `1px solid ${skill.color}40` }}>
                <span style={{ color: skill.color }} className="font-bold text-sm">{skill.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium text-sm text-white/90">{skill.name}</p>
                <p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>{skill.category} | {skill.proficiency}%</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency, color: skill.color }); setEditId(skill._id); }}
                className="p-2 rounded-lg transition-all" style={{ color: '#5a8a9a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#00d4ff'; e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#5a8a9a'; e.currentTarget.style.background = 'transparent'; }}>
                <FaPen className="w-3 h-3" />
              </button>
              <button onClick={() => handleDelete(skill._id)} className="p-2 rounded-lg transition-all" style={{ color: '#5a8a9a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ff4444'; e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#5a8a9a'; e.currentTarget.style.background = 'transparent'; }}>
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProjectsEditor = ({ projects, onSave }) => {
  const empty = { title: '', description: '', shortDescription: '', category: 'Web App', technologies: '', features: '', liveUrl: '', githubUrl: '', featured: false };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const categories = ['Web App', 'Mobile App', 'Full Stack', 'Frontend', 'Backend', 'UI/UX', 'Other'];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      toast.error('Max 10 images allowed.');
      return;
    }
    setImageFiles(files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => { reader.onloadend = () => resolve(reader.result); });
    });
    Promise.all(previews).then(setImagePreviews);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('shortDescription', form.shortDescription);
      formData.append('category', form.category);
      formData.append('technologies', form.technologies);
      formData.append('features', form.features);
      formData.append('liveUrl', form.liveUrl);
      formData.append('githubUrl', form.githubUrl);
      formData.append('featured', form.featured === true || form.featured === 'true');
      imageFiles.forEach((file) => formData.append('images', file));

      if (editId) {
        const res = await api.put(`/projects/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onSave(projects.map(p => p._id === editId ? res.data.data : p));
        toast.success('Project updated!');
      } else {
        const res = await api.post('/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onSave([...projects, res.data.data]);
        toast.success('Project added!');
      }
      setForm(empty); setEditId(null); setImageFiles([]); setImagePreviews([]);
    } catch (err) { toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to save project'); } finally { setSaving(false); }
  };;

  const handleDelete = async (id) => {
    try { await api.delete(`/projects/${id}`); onSave(projects.filter(p => p._id !== id)); toast.success('Deleted!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaBriefcase className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">MANAGE PROJECTS</h2>
      </div>

      <div className="p-6 rounded-xl space-y-4" style={hudCard}>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Project title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={hudInput} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...hudInput, cursor: 'pointer' }}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <textarea placeholder="Short description (max 200 chars)" rows={2} maxLength={200} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        <textarea placeholder="Full description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} style={hudInput} />
          <input placeholder="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} style={hudInput} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Live URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} style={hudInput} />
          <input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} style={hudInput} />
        </div>
        <label className="flex items-center gap-2 text-xs font-mono tracking-wider cursor-pointer" style={{ color: '#5a8a9a' }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded accent-primary" />
          FEATURED PROJECT
        </label>

        <div>
          <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>PROJECT IMAGES (Max 10)</label>
          <div
            className="relative rounded-xl p-4 text-center cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(0, 10, 20, 0.4)',
              border: '2px dashed rgba(0, 212, 255, 0.2)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'; }}
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FaFileImage className="w-6 h-6 mx-auto text-primary/30 mb-1" />
            <p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>
              {imageFiles.length > 0 ? `${imageFiles.length} file(s) selected — Click to replace` : 'Click to upload project screenshots'}
            </p>
          </div>
          {imagePreviews.length > 0 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt={`Preview ${i + 1}`} className="h-20 rounded-lg border border-primary/20 object-cover flex-shrink-0" />
              ))}
            </div>
          )}
          {!imageFiles.length && editId && projects.find(p => p._id === editId)?.images?.length > 0 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {projects.find(p => p._id === editId).images.map((img, i) => (
                <img key={i} src={`/uploads/${img}`} alt={`Existing ${i + 1}`} className="h-20 rounded-lg border border-primary/20 object-cover flex-shrink-0 opacity-60" />
              ))}
              <span className="text-[10px] font-mono self-center" style={{ color: '#3a6a7a' }}>Current images — Upload new to replace</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || !form.title} className="btn-primary flex items-center gap-2 text-sm">
            {saving ? <FaSpinner className="animate-spin" /> : editId ? <FaSave /> : <FaPlus />}
            {editId ? 'UPDATE' : 'ADD PROJECT'}
          </motion.button>
          {editId && <button onClick={() => { setEditId(null); setForm(empty); }} className="px-4 py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5a8a9a' }}>CANCEL</button>}
        </div>
      </div>

      <div className="space-y-2">
        {projects.map((p) => (
          <motion.div key={p._id} layout className="p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: 'rgba(0, 10, 20, 0.6)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <div>
              <p className="font-medium text-white/90">{p.title}</p>
              <p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>{p.category} {p.featured && '| Featured'}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setForm({ title: p.title, description: p.description, shortDescription: p.shortDescription || '', category: p.category, technologies: p.technologies?.join(', ') || '', features: p.features?.join(', ') || '', liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '', featured: p.featured }); setEditId(p._id); setImageFiles([]); setImagePreviews([]); }}
                className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#00d4ff'; e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#5a8a9a'; e.currentTarget.style.background = 'transparent'; }}>
                <FaPen className="w-3 h-3" />
              </button>
              <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ff4444'; e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#5a8a9a'; e.currentTarget.style.background = 'transparent'; }}>
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ExperienceEditor = ({ experiences, onSave }) => {
  const empty = { company: '', position: '', location: '', type: 'Full-time', startDate: '', endDate: '', current: false, description: '', responsibilities: '', technologies: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, current: form.current === true || form.current === 'true' };
      if (editId) {
        const res = await api.put(`/experience/${editId}`, data);
        onSave(experiences.map(e => e._id === editId ? res.data.data : e));
        toast.success('Experience updated!');
      } else {
        const res = await api.post('/experience', data);
        onSave([...experiences, res.data.data]);
        toast.success('Experience added!');
      }
      setForm(empty); setEditId(null);
    } catch (err) { toast.error('Failed to save'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/experience/${id}`); onSave(experiences.filter(e => e._id !== id)); toast.success('Deleted!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaBriefcase className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">MANAGE EXPERIENCE</h2>
      </div>

      <div className="p-6 rounded-xl space-y-4" style={hudCard}>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={hudInput} />
          <input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} style={hudInput} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={hudInput} />
          <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} style={hudInput} />
          <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} disabled={form.current} style={hudInput} />
        </div>
        <label className="flex items-center gap-2 text-xs font-mono tracking-wider cursor-pointer" style={{ color: '#5a8a9a' }}>
          <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} className="w-4 h-4 rounded accent-primary" />
          CURRENTLY WORKING HERE
        </label>
        <textarea placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        <input placeholder="Responsibilities (comma separated)" value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} style={hudInput} />
        <input placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} style={hudInput} />
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || !form.company} className="btn-primary flex items-center gap-2 text-sm">
            {saving ? <FaSpinner className="animate-spin" /> : editId ? <FaSave /> : <FaPlus />} {editId ? 'UPDATE' : 'ADD'}
          </motion.button>
          {editId && <button onClick={() => { setEditId(null); setForm(empty); }} className="px-4 py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5a8a9a' }}>CANCEL</button>}
        </div>
      </div>
      <div className="space-y-2">
        {experiences.map((e) => (
          <div key={e._id} className="p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: 'rgba(0, 10, 20, 0.6)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <div><p className="font-medium text-white/90">{e.position} at {e.company}</p><p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>{e.type}</p></div>
            <div className="flex gap-1">
              <button onClick={() => { setForm({ company: e.company, position: e.position, location: e.location || '', type: e.type || 'Full-time', startDate: e.startDate?.substring(0, 10) || '', endDate: e.endDate?.substring(0, 10) || '', current: e.current, description: e.description || '', responsibilities: e.responsibilities?.join(', ') || '', technologies: e.technologies?.join(', ') || '' }); setEditId(e._id); }}
                className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#00d4ff'; ev.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaPen className="w-3 h-3" />
              </button>
              <button onClick={() => handleDelete(e._id)} className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#ff4444'; ev.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EducationEditor = ({ education, onSave }) => {
  const empty = { institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', current: false, description: '', achievements: '', grade: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, current: form.current === true || form.current === 'true' };
      if (editId) {
        const res = await api.put(`/education/${editId}`, data);
        onSave(education.map(e => e._id === editId ? res.data.data : e));
        toast.success('Education updated!');
      } else {
        const res = await api.post('/education', data);
        onSave([...education, res.data.data]);
        toast.success('Education added!');
      }
      setForm(empty); setEditId(null);
    } catch (err) { toast.error('Failed'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/education/${id}`); onSave(education.filter(e => e._id !== id)); toast.success('Deleted!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaGraduationCap className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">MANAGE EDUCATION</h2>
      </div>

      <div className="p-6 rounded-xl space-y-4" style={hudCard}>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} style={hudInput} />
          <input placeholder="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} style={hudInput} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Field of Study" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} style={hudInput} />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={hudInput} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} style={hudInput} />
          <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} disabled={form.current} style={hudInput} />
          <input placeholder="Grade / GPA" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} style={hudInput} />
        </div>
        <label className="flex items-center gap-2 text-xs font-mono tracking-wider cursor-pointer" style={{ color: '#5a8a9a' }}>
          <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} className="w-4 h-4 rounded accent-primary" />
          CURRENTLY STUDYING HERE
        </label>
        <textarea placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        <input placeholder="Achievements (comma separated)" value={form.achievements} onChange={(e) => setForm({ ...form, achievements: e.target.value })} style={hudInput} />
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || !form.institution} className="btn-primary flex items-center gap-2 text-sm">
            {saving ? <FaSpinner className="animate-spin" /> : editId ? <FaSave /> : <FaPlus />} {editId ? 'UPDATE' : 'ADD'}
          </motion.button>
          {editId && <button onClick={() => { setEditId(null); setForm(empty); }} className="px-4 py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5a8a9a' }}>CANCEL</button>}
        </div>
      </div>
      <div className="space-y-2">
        {education.map((e) => (
          <div key={e._id} className="p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: 'rgba(0, 10, 20, 0.6)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <div><p className="font-medium text-white/90">{e.degree} - {e.institution}</p><p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>{e.field}</p></div>
            <div className="flex gap-1">
              <button onClick={() => { setForm({ ...e, startDate: e.startDate?.substring(0, 10) || '', endDate: e.endDate?.substring(0, 10) || '', achievements: e.achievements?.join(', ') || '' }); setEditId(e._id); }}
                className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#00d4ff'; ev.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaPen className="w-3 h-3" />
              </button>
              <button onClick={() => handleDelete(e._id)} className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#ff4444'; ev.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsEditor = ({ testimonials, onSave }) => {
  const empty = { name: '', position: '', company: '', content: '', rating: 5, featured: false };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, rating: parseInt(form.rating), featured: form.featured === true || form.featured === 'true' };
      if (editId) {
        const res = await api.put(`/testimonials/${editId}`, data);
        onSave(testimonials.map(t => t._id === editId ? res.data.data : t));
        toast.success('Updated!');
      } else {
        const res = await api.post('/testimonials', data);
        onSave([...testimonials, res.data.data]);
        toast.success('Added!');
      }
      setForm(empty); setEditId(null);
    } catch (err) { toast.error('Failed'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/testimonials/${id}`); onSave(testimonials.filter(t => t._id !== id)); toast.success('Deleted!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaQuoteLeft className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">MANAGE TESTIMONIALS</h2>
      </div>

      <div className="p-6 rounded-xl space-y-4" style={hudCard}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input placeholder="Client name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={hudInput} />
          <input placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} style={hudInput} />
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={hudInput} />
        </div>
        <textarea placeholder="Testimonial content" rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono mb-2 tracking-wider" style={{ color: '#5a8a9a' }}>RATING</label>
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} style={{ ...hudInput, cursor: 'pointer' }}>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs font-mono tracking-wider cursor-pointer pt-7" style={{ color: '#5a8a9a' }}>
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded accent-primary" />
            FEATURED
          </label>
        </div>
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || !form.name} className="btn-primary flex items-center gap-2 text-sm">
            {saving ? <FaSpinner className="animate-spin" /> : editId ? <FaSave /> : <FaPlus />} {editId ? 'UPDATE' : 'ADD'}
          </motion.button>
          {editId && <button onClick={() => { setEditId(null); setForm(empty); }} className="px-4 py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5a8a9a' }}>CANCEL</button>}
        </div>
      </div>
      <div className="space-y-2">
        {testimonials.map((t) => (
          <div key={t._id} className="p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: 'rgba(0, 10, 20, 0.6)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <div><p className="font-medium text-white/90">{t.name} - {t.company || 'N/A'}</p><p className="text-xs font-mono line-clamp-1" style={{ color: '#5a8a9a' }}>{t.content}</p></div>
            <div className="flex gap-1">
              <button onClick={() => { setForm({ name: t.name, position: t.position || '', company: t.company || '', content: t.content, rating: t.rating || 5, featured: t.featured }); setEditId(t._id); }}
                className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#00d4ff'; ev.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaPen className="w-3 h-3" />
              </button>
              <button onClick={() => handleDelete(t._id)} className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#ff4444'; ev.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogEditor = ({ blogs, onSave }) => {
  const empty = { title: '', excerpt: '', content: '', category: 'Technology', tags: '', published: false };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const categories = ['Technology', 'Tutorial', 'Career', 'Life', 'Other'];

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, published: form.published === true || form.published === 'true' };
      if (editId) {
        const res = await api.put(`/blog/${editId}`, data);
        onSave(blogs.map(b => b._id === editId ? res.data.data : b));
        toast.success('Blog updated!');
      } else {
        const res = await api.post('/blog', data);
        onSave([...blogs, res.data.data]);
        toast.success('Blog added!');
      }
      setForm(empty); setEditId(null);
    } catch (err) { toast.error('Failed'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/blog/${id}`); onSave(blogs.filter(b => b._id !== id)); toast.success('Deleted!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaPen className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">MANAGE BLOG</h2>
      </div>

      <div className="p-6 rounded-xl space-y-4" style={hudCard}>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Blog title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={hudInput} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...hudInput, cursor: 'pointer' }}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <textarea placeholder="Excerpt" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} style={{ ...hudInput, resize: 'none' }} />
        <textarea placeholder="Content (Markdown supported)" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ ...hudInput, resize: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }} />
        <input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} style={hudInput} />
        <label className="flex items-center gap-2 text-xs font-mono tracking-wider cursor-pointer" style={{ color: '#5a8a9a' }}>
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded accent-primary" />
          PUBLISHED
        </label>
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || !form.title} className="btn-primary flex items-center gap-2 text-sm">
            {saving ? <FaSpinner className="animate-spin" /> : editId ? <FaSave /> : <FaPlus />} {editId ? 'UPDATE' : 'ADD'}
          </motion.button>
          {editId && <button onClick={() => { setEditId(null); setForm(empty); }} className="px-4 py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5a8a9a' }}>CANCEL</button>}
        </div>
      </div>
      <div className="space-y-2">
        {blogs.map((b) => (
          <div key={b._id} className="p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: 'rgba(0, 10, 20, 0.6)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <div>
              <p className="font-medium text-white/90">{b.title}</p>
              <p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>{b.category} | {b.published ? 'Published' : 'Draft'}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setForm({ title: b.title, excerpt: b.excerpt || '', content: b.content, category: b.category, tags: b.tags?.join(', ') || '', published: b.published }); setEditId(b._id); }}
                className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#00d4ff'; ev.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaPen className="w-3 h-3" />
              </button>
              <button onClick={() => handleDelete(b._id)} className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                onMouseEnter={(ev) => { ev.currentTarget.style.color = '#ff4444'; ev.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; ev.currentTarget.style.background = 'transparent'; }}>
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesList = ({ messages }) => {
  const [localMessages, setLocalMessages] = useState(messages);
  useEffect(() => { setLocalMessages(messages); }, [messages]);

  const markRead = async (id) => {
    try { const res = await api.put(`/messages/${id}/read`); setLocalMessages(localMessages.map(m => m._id === id ? res.data.data : m)); } catch { toast.error('Failed'); }
  };

  const deleteMessage = async (id) => {
    try { await api.delete(`/messages/${id}`); setLocalMessages(localMessages.filter(m => m._id !== id)); toast.success('Deleted!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <FaEnvelope className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-primary tracking-wider">MESSAGES ({localMessages.length})</h2>
      </div>

      <div className="space-y-3">
        {localMessages.length === 0 && (
          <div className="text-center py-12 rounded-xl" style={{ ...hudCard }}>
            <p className="font-mono text-sm" style={{ color: '#5a8a9a' }}>{'>'} NO MESSAGES YET</p>
          </div>
        )}
        {localMessages.map((m) => (
          <motion.div key={m._id} layout className="p-5 rounded-xl"
            style={{
              background: m.read ? 'rgba(0, 10, 20, 0.6)' : 'rgba(0, 212, 255, 0.03)',
              border: m.read ? '1px solid rgba(0, 212, 255, 0.1)' : '1px solid rgba(0, 212, 255, 0.2)',
            }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-white/90">{m.name} {!m.read && <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">NEW</span>}</p>
                <p className="text-xs font-mono" style={{ color: '#5a8a9a' }}>{m.email} | {new Date(m.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1">
                {!m.read && <button onClick={() => markRead(m._id)} className="px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)', color: '#00d4ff' }}>MARK READ</button>}
                <button onClick={() => deleteMessage(m._id)} className="p-2 rounded-lg" style={{ color: '#5a8a9a' }}
                  onMouseEnter={(ev) => { ev.currentTarget.style.color = '#ff4444'; }}
                  onMouseLeave={(ev) => { ev.currentTarget.style.color = '#5a8a9a'; }}>
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="text-xs font-mono tracking-wider mb-2" style={{ color: '#00d4ff' }}>{m.subject}</p>
            <p className="text-sm font-body text-white/70">{m.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
