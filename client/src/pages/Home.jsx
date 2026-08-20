import { useState, useEffect } from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Testimonials from '../components/sections/Testimonials';
import Blog from '../components/sections/Blog';
import Contact from '../components/sections/Contact';
import api from '../api/axios';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, expRes, eduRes, testRes, blogRes] = await Promise.all([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/experience'),
          api.get('/education'),
          api.get('/testimonials'),
          api.get('/blog'),
        ]);

        setProfile(profileRes.data.data);
        setSkills(skillsRes.data.data);
        setProjects(projectsRes.data.data);
        setExperiences(expRes.data.data);
        setEducation(eduRes.data.data);
        setTestimonials(testRes.data.data);
        setBlogs(blogRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative">
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Education education={education} />
      <Testimonials testimonials={testimonials} />
      <Blog blogs={blogs} />
      <Contact profile={profile} />
    </main>
  );
};

export default Home;
