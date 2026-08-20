# 📋 Portfolio Project Plan - MERN Stack

## Project Overview
A fully animated, modern portfolio website with dual-role access (Admin & Viewer) built on the MERN stack.

---

## 🏗️ Project Structure

```
portfolio/
├── server/                    # Backend (Express.js)
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js           # JWT verification
│   │   └── upload.js         # Multer file upload
│   ├── models/
│   │   ├── User.js           # Admin credentials
│   │   ├── Profile.js        # Personal info
│   │   ├── Skill.js          # Skills data
│   │   ├── Project.js        # Projects data
│   │   ├── Experience.js     # Work experience
│   │   ├── Education.js      # Education data
│   │   ├── Testimonial.js    # Testimonials
│   │   ├── Blog.js           # Blog posts
│   │   └── Message.js        # Contact messages
│   ├── routes/
│   │   ├── auth.js           # Login/Logout
│   │   ├── profile.js        # Profile CRUD
│   │   ├── skills.js         # Skills CRUD
│   │   ├── projects.js       # Projects CRUD
│   │   ├── experience.js     # Experience CRUD
│   │   ├── education.js      # Education CRUD
│   │   ├── testimonials.js   # Testimonials CRUD
│   │   ├── blog.js           # Blog CRUD
│   │   └── messages.js       # Contact form
│   ├── seed.js               # Initial data seed
│   ├── server.js             # Entry point
│   └── package.json
│
└── client/                    # Frontend (React + Vite)
    ├── src/
    │   ├── api/
    │   │   └── axios.js      # API configuration
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   └── AnimatedBackground.jsx
    │   │   ├── ui/
    │   │   │   ├── AnimatedCard.jsx
    │   │   │   ├── MagneticButton.jsx
    │   │   │   ├── TextReveal.jsx
    │   │   │   ├── ParallaxSection.jsx
    │   │   │   └── CustomCursor.jsx
    │   │   ├── sections/
    │   │   │   ├── Hero.jsx
    │   │   │   ├── About.jsx
    │   │   │   ├── Skills.jsx
    │   │   │   ├── Projects.jsx
    │   │   │   ├── Experience.jsx
    │   │   │   ├── Education.jsx
    │   │   │   ├── Testimonials.jsx
    │   │   │   ├── Blog.jsx
    │   │   │   └── Contact.jsx
    │   │   └── admin/
    │   │       ├── Dashboard.jsx
    │   │       ├── ProfileEditor.jsx
    │   │       ├── SkillsEditor.jsx
    │   │       ├── ProjectsEditor.jsx
    │   │       ├── ExperienceEditor.jsx
    │   │       ├── EducationEditor.jsx
    │   │       ├── TestimonialsEditor.jsx
    │   │       ├── BlogEditor.jsx
    │   │       └── MessageInbox.jsx
    │   ├── hooks/
    │   │   ├── useScrollAnimation.js
    │   │   ├── useTypewriter.js
    │   │   └── useTheme.js
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Admin.jsx
    │   │   └── BlogPost.jsx
    │   ├── styles/
    │   │   └── globals.css   # Tailwind + custom styles
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── package.json
    └── vite.config.js
```

---

## 🎨 UI/UX Design Specifications

### Color Theme (Dark Mode - Default)
```css
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #1a1a2e;
  --accent-primary: #6c63ff;      /* Purple */
  --accent-secondary: #00d9ff;    /* Cyan */
  --accent-gradient: linear-gradient(135deg, #6c63ff 0%, #00d9ff 100%);
  --text-primary: #ffffff;
  --text-secondary: #a0a0b0;
  --glow-primary: rgba(108, 99, 255, 0.3);
  --glow-secondary: rgba(0, 217, 255, 0.3);
}
```

### Light Mode
```css
[data-theme="light"] {
  --bg-primary: #f8f9fc;
  --bg-secondary: #ffffff;
  --bg-card: #f0f0f5;
  --accent-primary: #5a52d5;
  --accent-secondary: #00b8d9;
  --text-primary: #1a1a2e;
  --text-secondary: #666680;
}
```

### Typography
- **Headings**: "Space Grotesk" (Bold, modern geometric)
- **Body**: "Inter" (Clean, readable)
- **Code/Accent**: "JetBrains Mono"

### Design Elements
- Glassmorphism cards with backdrop-blur
- Gradient borders with animations
- Floating particle background (react-tsparticles)
- Magnetic hover effects on buttons
- Text reveal animations on scroll
- Smooth page transitions (AnimatePresence)

---

## ⚡ Features & Functionality

### Visitor Features
| Feature | Description |
|---------|-------------|
| Animated Hero | Typewriter effect + particle background |
| Scroll Animations | Elements animate on viewport entry |
| Project Filtering | Filter by category (Web, Mobile, etc.) |
| Project Modals | Expandable project details with images |
| Skills Visualization | Animated skill bars/circular progress |
| Timeline View | Animated experience/education timeline |
| Testimonial Carousel | Auto-sliding with navigation dots |
| Blog Reader | Read blog posts with markdown rendering |
| Contact Form | Validated form with success/error states |
| Resume Download | PDF download button |
| Social Links | Animated social media icons |
| Custom Cursor | Follows mouse with interactive states |
| Page Transitions | Smooth transitions between pages |
| Dark/Light Mode | Toggle with smooth theme transition |
| Loading Screen | Animated splash screen on first load |
| Responsive Design | Mobile-first responsive layout |
| Back to Top | Animated scroll-to-top button |

### Admin Features
| Feature | Description |
|---------|-------------|
| Secure Login | JWT-based authentication |
| Dashboard | Overview of portfolio data |
| Profile Editor | Edit personal info, avatar, resume |
| Skills Manager | Add/edit/delete skills with proficiency |
| Projects CRUD | Full project management with images |
| Experience Editor | Timeline entry management |
| Education Editor | Education entry management |
| Testimonials | Add/edit client testimonials |
| Blog Manager | Create/edit/delete blog posts |
| Message Inbox | View contact form submissions |
| Image Upload | Multer-based file uploads |
| Real-time Preview | See changes instantly |

---

## 🔧 API Endpoints

### Auth
```
POST   /api/auth/register    - Register admin
POST   /api/auth/login       - Login
GET    /api/auth/me           - Get current user
```

### Profile
```
GET    /api/profile           - Get profile
PUT    /api/profile           - Update profile
```

### Skills
```
GET    /api/skills            - Get all skills
POST   /api/skills            - Add skill (auth)
PUT    /api/skills/:id        - Update skill (auth)
DELETE /api/skills/:id        - Delete skill (auth)
```

### Projects
```
GET    /api/projects          - Get all projects
GET    /api/projects/:id      - Get single project
POST   /api/projects          - Add project (auth)
PUT    /api/projects/:id      - Update project (auth)
DELETE /api/projects/:id      - Delete project (auth)
```

### Experience, Education, Testimonials, Blog (similar CRUD pattern)

### Messages
```
GET    /api/messages          - Get all (auth)
POST   /api/messages          - Send message (public)
DELETE /api/messages/:id      - Delete message (auth)
```

---

## 🎬 Animation Specifications

### Page Load
1. **Loading Screen**: Animated logo with pulse effect (2s)
2. **Hero Entrance**: Staggered fade-in for text elements
3. **Particle Background**: Continuous subtle movement

### Scroll Animations
- **Fade Up**: Elements slide up + fade in
- **Scale In**: Cards scale from 0.9 to 1
- **Stagger**: List items animate sequentially
- **Parallax**: Background moves at different speed

### Hover Effects
- **Magnetic Buttons**: Slight movement toward cursor
- **Card Lift**: Scale + shadow increase
- **Text Glow**: Accent color glow on hover
- **Icon Bounce**: Subtle bounce on social icons

### Micro-interactions
- **Custom Cursor**: Dot + ring following mouse
- **Magnetic Pull**: Elements slightly follow cursor
- **Text Scramble**: Random character reveal
- **Skill Counter**: Number count-up animation

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.6.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "multer": "^1.4.5-lts.1",
  "express-validator": "^7.0.1"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.18.0",
  "framer-motion": "^10.16.4",
  "axios": "^1.6.0",
  "@tailwindcss/forms": "^0.5.7",
  "react-icons": "^4.11.0",
  "react-tsparticles": "^2.12.0",
  "tsparticles": "^2.12.0",
  "react-intersection-observer": "^9.5.3",
  "react-hot-toast": "^2.2.0",
  "react-markdown": "^9.0.1",
  "react-dropzone": "^14.2.3"
}
```

---

## 🚀 Implementation Order

### Phase 1: Project Setup
1. Initialize project structure
2. Set up backend with Express + MongoDB
3. Set up React frontend with Vite + Tailwind

### Phase 2: Backend Development
1. Database models
2. Authentication system
3. API routes with validation
4. File upload middleware

### Phase 3: Frontend Core
1. Layout components (Navbar, Footer)
2. Theme system (Dark/Light)
3. Animated background
4. Custom cursor

### Phase 4: Portfolio Sections
1. Hero with animations
2. About section
3. Skills visualization
4. Projects with filters
5. Experience/Education timeline
6. Testimonials carousel
7. Blog section
8. Contact form

### Phase 5: Admin Panel
1. Auth context and login page
2. Dashboard layout
3. CRUD editors for all sections
4. Image upload component

### Phase 6: Polish
1. Page transitions
2. Scroll animations
3. Loading states
4. Error handling
5. Responsive optimization

---

## ✅ Success Criteria
- [ ] Fully functional MERN stack application
- [ ] Dual role: Admin can edit, Viewer can only see
- [ ] 15+ animated components
- [ ] Modern glassmorphism UI design
- [ ] Dark and Light mode toggle
- [ ] Responsive on all devices
- [ ] Smooth page transitions
- [ ] All CRUD operations working
- [ ] File upload for images/resume
- [ ] Contact form with validation
