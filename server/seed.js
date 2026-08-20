const mongoose = require('mongoose');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Testimonial = require('./models/Testimonial');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('No admin found. Please register an admin account first via the login page.');
      process.exit(1);
    }

    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing portfolio data');

    await Profile.create({
      user: admin._id,
      name: 'John Doe',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with 5+ years of experience building modern web applications. I love turning complex problems into simple, beautiful solutions.',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      social: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe'
      },
      about: {
        description: 'I am a Full Stack Developer specializing in the MERN stack. With a keen eye for design and a passion for clean code, I build applications that are both beautiful and performant.',
        stats: [
          { label: 'Years Experience', value: '5+' },
          { label: 'Projects Completed', value: '50+' },
          { label: 'Happy Clients', value: '30+' },
          { label: 'Technologies', value: '20+' }
        ]
      }
    });
    console.log('Profile created');

    const skills = [
      { name: 'React.js', category: 'Frontend', proficiency: 95, color: '#61DAFB' },
      { name: 'JavaScript', category: 'Frontend', proficiency: 90, color: '#F7DF1E' },
      { name: 'TypeScript', category: 'Frontend', proficiency: 85, color: '#3178C6' },
      { name: 'HTML/CSS', category: 'Frontend', proficiency: 95, color: '#E34F26' },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, color: '#06B6D4' },
      { name: 'Node.js', category: 'Backend', proficiency: 88, color: '#339933' },
      { name: 'Express.js', category: 'Backend', proficiency: 85, color: '#000000' },
      { name: 'Python', category: 'Backend', proficiency: 75, color: '#3776AB' },
      { name: 'MongoDB', category: 'Database', proficiency: 85, color: '#47A248' },
      { name: 'PostgreSQL', category: 'Database', proficiency: 75, color: '#4169E1' },
      { name: 'Git', category: 'Tools', proficiency: 90, color: '#F05032' },
      { name: 'Docker', category: 'Tools', proficiency: 70, color: '#2496ED' },
      { name: 'AWS', category: 'Tools', proficiency: 65, color: '#FF9900' },
      { name: 'Figma', category: 'Design', proficiency: 80, color: '#F24E1E' }
    ];

    for (const skill of skills) {
      await Skill.create({ ...skill, user: admin._id });
    }
    console.log('Skills created');

    const projects = [
      {
        user: admin._id,
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with cart, checkout, payment integration, and admin dashboard.',
        shortDescription: 'Full-stack e-commerce with MERN stack',
        category: 'Full Stack',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        features: ['User Authentication', 'Product Management', 'Payment Integration', 'Admin Dashboard'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/johndoe/ecommerce',
        featured: true
      },
      {
        user: admin._id,
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop, and team features.',
        shortDescription: 'Real-time task management with collaboration',
        category: 'Web App',
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration', 'File Sharing'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/johndoe/taskmanager',
        featured: true
      },
      {
        user: admin._id,
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media managers with data visualization and scheduling.',
        shortDescription: 'Social media analytics and scheduling',
        category: 'Frontend',
        technologies: ['React', 'Chart.js', 'Tailwind CSS', 'REST API'],
        features: ['Data Visualization', 'Post Scheduling', 'Multi-platform', 'Reports'],
        liveUrl: 'https://example.com',
        featured: false
      }
    ];

    for (const project of projects) {
      await Project.create(project);
    }
    console.log('Projects created');

    await Experience.create({
      user: admin._id,
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      startDate: new Date('2022-01-01'),
      current: true,
      description: 'Leading development of enterprise web applications.',
      responsibilities: ['Lead a team of 5 developers', 'Architect new features', 'Code review and mentoring'],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
    });

    await Experience.create({
      user: admin._id,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      type: 'Full-time',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      description: 'Built and maintained multiple client projects.',
      responsibilities: ['Developed client-facing applications', 'Built RESTful APIs', 'Implemented CI/CD pipelines'],
      technologies: ['React', 'Express', 'PostgreSQL', 'Docker']
    });
    console.log('Experience created');

    await Education.create({
      user: admin._id,
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: new Date('2016-08-01'),
      endDate: new Date('2020-05-31'),
      description: 'Focused on software engineering and web technologies.',
      achievements: ['Dean\'s List', 'CS Club President', 'Hackathon Winner'],
      grade: 'GPA: 3.8'
    });
    console.log('Education created');

    await Testimonial.create({
      user: admin._id,
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'TechStart Inc.',
      content: 'John is an exceptional developer. His attention to detail and ability to deliver on time is remarkable.',
      rating: 5,
      featured: true
    });

    await Testimonial.create({
      user: admin._id,
      name: 'Mike Smith',
      position: 'Product Manager',
      company: 'InnovateCo',
      content: 'Working with John was a pleasure. He understood our requirements perfectly and delivered beyond expectations.',
      rating: 5,
      featured: true
    });
    console.log('Testimonials created');

    console.log(`Portfolio data seeded for admin: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
