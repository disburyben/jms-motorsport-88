# CLAUDE.md - AI Assistant Guide for JMS Motorsport 88

> **Last Updated**: 2025-11-17
> **Purpose**: Comprehensive guide for AI assistants working with the JMS Motorsport 88 codebase

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Directory Structure](#directory-structure)
4. [Development Workflow](#development-workflow)
5. [Code Conventions & Patterns](#code-conventions--patterns)
6. [Component Guidelines](#component-guidelines)
7. [Styling Conventions](#styling-conventions)
8. [Backend Integration](#backend-integration)
9. [Deployment](#deployment)
10. [Common Tasks](#common-tasks)
11. [Important Rules & Constraints](#important-rules--constraints)
12. [Testing & Verification](#testing--verification)

---

## Project Overview

### What is This?

JMS Motorsport 88 is a single-page React application for a sprint car racing team. The site serves as:
- Team showcase and information hub
- Event schedule display
- Driver profile presentation
- Sponsor recognition platform
- Contact and merchandise signup portal
- Admin dashboard for data management

### Key Characteristics

- **Type**: Single-Page Application (SPA)
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5 with SWC
- **Styling**: Tailwind CSS 4.1.3 with custom utilities
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Backend**: Supabase (Edge Functions + Database)
- **Theme**: Racing/motorsport with orange (#ff6600) and black (#0a0a0a)

---

## Architecture & Technology Stack

### Core Technologies

```
React 18.3.1          → UI library
TypeScript            → Type safety
Vite 6.3.5            → Build tool with fast refresh (SWC)
Tailwind CSS 4.1.3    → Utility-first styling
Supabase              → Backend as a Service
```

### UI Component Libraries

```
Radix UI              → 51 headless UI components
  ├── Accordion, Alert Dialog, Avatar, Badge
  ├── Button, Card, Checkbox, Dialog, Form
  ├── Dropdown Menu, Input, Label, Select
  ├── Tabs, Tooltip, Progress, Slider
  └── ... (and 33 more)

shadcn/ui             → Component styling patterns
Lucide React          → Icon library (500+ icons)
Motion (Framer)       → Advanced animations
```

### Utilities & Tools

```
React Hook Form 7.55.0    → Form state management
class-variance-authority   → Component variant system
clsx + tailwind-merge     → Conditional class merging
embla-carousel-react      → Carousel component
recharts                  → Charting library
sonner                    → Toast notifications
cmdk                      → Command palette
vaul                      → Drawer component
```

### Application Flow

```
index.html
  └─→ src/main.tsx (ReactDOM.createRoot)
      └─→ src/App.tsx (routing logic)
          ├─→ Loading.tsx (initial 3s animation)
          ├─→ Admin.tsx (if ?admin=true)
          └─→ Main Layout (default):
              ├─ Navigation (fixed header)
              ├─ Hero (landing with animations)
              ├─ NextEvent (upcoming race)
              ├─ About (team info + cars)
              ├─ Drivers (Tim Kaeding profile)
              ├─ Schedule (race calendar)
              ├─ Sponsors (8 partner logos)
              ├─ Store (merchandise signup)
              ├─ Contact (form submission)
              └─ Footer (social links)
```

---

## Directory Structure

```
JMS_WEBSITE/
├── Root Configuration
│   ├── index.html              # Entry HTML (minimal, just #root div)
│   ├── package.json            # 51 dependencies, 2 dev dependencies
│   ├── vite.config.ts          # Extensive Figma asset aliases
│   ├── vercel.json             # Build output: /build
│   ├── .env.example            # Supabase credentials template
│   ├── .gitignore              # Standard Node.js + Vercel
│   ├── .npmrc                  # JSR registry for Supabase
│   ├── README.md               # Basic project info
│   └── SETUP_GUIDE.md          # Comprehensive deployment guide
│
├── src/
│   ├── main.tsx                # App entry point
│   ├── App.tsx                 # Root component with routing logic
│   ├── index.css               # 2,632 lines of Tailwind + custom CSS
│   ├── Attributions.md         # License attributions
│   │
│   ├── components/
│   │   ├── Navigation.tsx      # Fixed header, scroll-aware
│   │   ├── Hero.tsx            # Landing section with animations
│   │   ├── NextEvent.tsx       # Upcoming race information
│   │   ├── About.tsx           # Team info with car carousel
│   │   ├── Drivers.tsx         # Driver profile (Tim Kaeding)
│   │   ├── Schedule.tsx        # Race schedule grid
│   │   ├── Sponsors.tsx        # 8 sponsor logos with links
│   │   ├── Store.tsx           # Merchandise email signup
│   │   ├── Contact.tsx         # Contact form (Supabase)
│   │   ├── Footer.tsx          # Social links and copyright
│   │   ├── Admin.tsx           # CSV export dashboard
│   │   ├── Loading.tsx         # Initial loading animation
│   │   │
│   │   ├── ui/                 # 51 Radix UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   └── ... (47 more)
│   │   │
│   │   └── figma/
│   │       └── ImageWithFallback.tsx  # Error handling component
│   │
│   ├── assets/                 # 13 PNG images (hash names)
│   │   ├── d8c91f7333...png    # JMS Logo
│   │   ├── 9af74f7de6...png    # Car 1
│   │   ├── 5276abd9ae...png    # Car 2
│   │   ├── dd754015a1...png    # Car 3
│   │   ├── 6f7fb37e22...png    # Tim Kaeding
│   │   └── [8 sponsor logos]
│   │
│   ├── styles/
│   │   └── globals.css         # Additional global styles
│   │
│   ├── utils/
│   │   └── supabase/
│   │       └── info.tsx        # Supabase config
│   │
│   ├── supabase/
│   │   └── functions/
│   │       └── server/
│   │           ├── index.tsx   # Edge function entry
│   │           └── kv_store.tsx # Key-value storage
│   │
│   └── guidelines/
│       └── Guidelines.md       # Development guidelines template
│
└── .git/                       # Git repository
```

---

## Development Workflow

### Initial Setup

```bash
# Install dependencies
npm i

# Start development server (port 3000)
npm run dev

# Build for production
npm run build
```

### Environment Variables

Required for Supabase integration:

```bash
# .env (create from .env.example)
VITE_SUPABASE_PROJECT_ID=qtgusfvncorjcxcayofg
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Git Workflow

```bash
# Current branch strategy
main                    # Production branch (auto-deploys to Vercel)
claude/[session-id]     # AI assistant feature branches

# Standard workflow
git add .
git commit -m "Description of changes"
git push -u origin <branch-name>
```

### Development Server Behavior

- **Port**: 3000
- **Auto-opens**: Browser opens automatically
- **Hot Reload**: Fast refresh with React SWC
- **Environment**: Loads .env variables with VITE_ prefix

---

## Code Conventions & Patterns

### TypeScript Conventions

```typescript
// Component structure (function declarations, NOT React.FC)
export function ComponentName({ prop1, prop2 }: Props) {
  // Component logic
  return <div>...</div>;
}

// Interface definitions for props
interface Props {
  prop1: string;
  prop2?: number; // Optional props
}

// Event handlers with explicit typing
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Handler logic
};

// State with proper typing
const [count, setCount] = useState<number>(0);
```

### React Patterns

```typescript
// State management
import { useState } from 'react';

// Local component state (no global state library)
const [state, setState] = useState(initialValue);

// URL parameters for routing
const urlParams = new URLSearchParams(window.location.search);
const isAdmin = urlParams.get('admin') === 'true';

// Form handling with React Hook Form
import { useForm } from 'react-hook-form';
const { register, handleSubmit } = useForm();
```

### Animation Patterns

```typescript
// Motion (Framer Motion) usage
import { motion } from 'motion/react';

// Standard animation pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  Content
</motion.div>

// Scroll-triggered animations
import { useInView } from 'motion/react';
const ref = useRef(null);
const isInView = useInView(ref, { once: true }); // Only animate once

<motion.div
  ref={ref}
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
>
  Content
</motion.div>

// Staggered animations for lists
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

### Animation Timing Standards

- **Duration**: 0.3s (quick) to 1.5s (dramatic)
- **Easing**: "easeOut" preferred for natural feel
- **Delays**: 0.1s increments for stagger effects
- **Once**: true for scroll animations (performance)

---

## Component Guidelines

### Component Structure Template

```typescript
import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function ComponentName() {
  // 1. Hooks and state
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [state, setState] = useState(false);

  // 2. Event handlers
  const handleClick = () => {
    // Logic
  };

  // 3. Render
  return (
    <section id="section-name" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Content */}
        </motion.div>
      </div>
    </section>
  );
}
```

### Main Component Responsibilities

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Navigation** | Fixed header | Scroll-aware, smooth scroll, racing #88 badge |
| **Hero** | Landing section | Full viewport, speed lines, glow effects |
| **NextEvent** | Upcoming race | Date, location, countdown |
| **About** | Team info | Car carousel, team description |
| **Drivers** | Driver profiles | Tim Kaeding profile, large image |
| **Schedule** | Race calendar | Grid layout, responsive |
| **Sponsors** | Partner logos | 8 sponsors, hover effects, external links |
| **Store** | Merch signup | Email collection form |
| **Contact** | Contact form | Supabase submission, validation |
| **Footer** | Footer links | Social media, copyright |
| **Admin** | Dashboard | CSV export, Supabase data fetch |
| **Loading** | Initial screen | 3s animation, auto-dismiss |

### Adding New Components

1. **Create file**: `src/components/ComponentName.tsx`
2. **Import in App.tsx**: Add to component list
3. **Add to layout**: Insert in appropriate order
4. **Follow patterns**: Use Motion, Tailwind, TypeScript
5. **Test responsiveness**: Mobile, tablet, desktop

---

## Styling Conventions

### Tailwind CSS Usage

```tsx
// Mobile-first responsive design
<div className="px-4 md:px-8 lg:px-12">

// Group hover states (preferred pattern)
<div className="group hover:bg-orange-500/10">
  <span className="group-hover:text-orange-500">Text</span>
</div>

// Conditional classes with clsx
import { clsx } from 'clsx';
<div className={clsx(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes'
)}>

// Color palette (use these exact values)
bg-[#0a0a0a]     // Primary background
bg-[#1a1a1a]     // Secondary background
bg-[#111]        // Tertiary background
text-[#999]      // Muted text
text-[#ccc]      // Secondary text
text-white       // Primary text
border-[#222]    // Primary border
border-[#333]    // Secondary border
text-orange-500  // Primary brand (#ff6600)
text-orange-600  // Secondary brand (#ff8800)
```

### Design System

**Brand Colors:**
```css
Orange:    #ff6600 (text-orange-500)
Dark:      #0a0a0a (bg-[#0a0a0a])
Gray:      #999, #ccc, #fff
Borders:   #222, #333
```

**Typography:**
```css
Headers:   Bebas Neue (display font)
Body:      Inter (weights: 200, 300, 400, 600, 800, 900)
```

**Spacing Scale:**
```css
--spacing:   0.25rem   (custom property)
py-20:       5rem      (section padding)
px-4:        1rem      (mobile padding)
max-w-7xl:   80rem     (content container)
```

**Effects:**
```css
Glow:        shadow-[0_0_30px_rgba(255,102,0,0.3)]
Blur:        backdrop-blur-sm
Gradient:    from-orange-500/20 to-transparent
Transitions: transition-all duration-300
```

### Custom Animations (index.css)

```css
@keyframes speed-lines {
  /* Horizontal racing lines effect */
}

@keyframes glow-pulse {
  /* Orange glow pulsing */
}

@keyframes tire-smoke {
  /* Smoke effect animation */
}

/* Custom scrollbar (orange theme) */
::-webkit-scrollbar { ... }
::-webkit-scrollbar-thumb { background: #ff6600; }
```

### Responsive Breakpoints

```
sm:  640px   (small tablets)
md:  768px   (tablets)
lg:  1024px  (small desktops)
xl:  1280px  (desktops)
2xl: 1536px  (large desktops)
```

---

## Backend Integration

### Supabase Configuration

**Project Details:**
```
Project ID:  qtgusfvncorjcxcayofg
Region:      [Configured in Supabase dashboard]
Edge Func:   make-server-e359eb76
```

**Environment Variables:**
```bash
VITE_SUPABASE_PROJECT_ID=qtgusfvncorjcxcayofg
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### Edge Function Endpoints

**Contact Form Submission:**
```typescript
POST /functions/v1/make-server-e359eb76/contact
Body: {
  name: string;
  email: string;
  message: string;
}
```

**Email Signup (Store):**
```typescript
POST /functions/v1/make-server-e359eb76/signup
Body: {
  email: string;
}
```

**Admin Exports:**
```typescript
GET /functions/v1/make-server-e359eb76/export/contacts
GET /functions/v1/make-server-e359eb76/export/signups

Response: CSV file download
```

### Data Flow Pattern

```
User Input (Form)
  ↓
React Hook Form (validation)
  ↓
Component State
  ↓
Fetch API (POST to Supabase Edge Function)
  ↓
Supabase Database
  ↓
Success/Error State Update
  ↓
User Feedback (toast notification)
```

### Supabase Integration Example

```typescript
// Contact form submission
const handleSubmit = async (data: FormData) => {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) throw new Error('Submission failed');

    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

---

## Deployment

### Vercel Deployment

**Configuration:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "vite"
}
```

**Auto-Deploy Workflow:**
```
1. Push to GitHub (main branch)
   ↓
2. Vercel detects change
   ↓
3. Run npm run build
   ↓
4. Deploy to production
   ↓
5. Update live URL
```

**Important URLs:**
```
Live Site:  https://jms-motorsport-88-hpm9b2o8r-bens-projects-b856bee1.vercel.app
GitHub:     https://github.com/disburyben/jms-motorsport-88
Vercel:     https://vercel.com/bens-projects-b856bee1/jms-motorsport-88
Admin:      [live-url]?admin=true
```

### Deployment Checklist

Before deploying:
- [ ] Environment variables set in Vercel
- [ ] Supabase project is active
- [ ] All images are in src/assets/
- [ ] No hardcoded secrets in code
- [ ] Build runs successfully locally
- [ ] All TypeScript errors resolved

---

## Common Tasks

### Adding a New Section

```typescript
// 1. Create component file
// src/components/NewSection.tsx
export function NewSection() {
  return (
    <section id="new-section" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Content */}
      </div>
    </section>
  );
}

// 2. Import in App.tsx
import { NewSection } from './components/NewSection';

// 3. Add to layout
return (
  <div className="bg-[#0a0a0a] overflow-x-hidden">
    <Navigation />
    <Hero heroImage={carImage1} />
    <NewSection /> {/* Add here */}
    <Contact />
    <Footer />
  </div>
);

// 4. Update Navigation.tsx (if needed)
const sections = [
  { name: 'HOME', id: 'hero' },
  { name: 'NEW SECTION', id: 'new-section' },
  { name: 'CONTACT', id: 'contact' }
];
```

### Adding a New Sponsor

```typescript
// 1. Add logo to src/assets/
// (Use hash naming convention from Figma export)

// 2. Update Sponsors.tsx
const sponsors = [
  {
    name: 'New Sponsor',
    logo: '/src/assets/[hash].png',
    url: 'https://newsponsor.com'
  },
  // ... existing sponsors
];
```

### Modifying Form Fields

```typescript
// In Contact.tsx or Store.tsx

// 1. Update form schema
const formSchema = {
  name: { required: true },
  email: { required: true, pattern: /email-regex/ },
  newField: { required: false } // Add new field
};

// 2. Add input field
<input
  {...register('newField')}
  className="w-full px-4 py-2 bg-[#1a1a1a]"
  placeholder="New Field"
/>

// 3. Update Supabase Edge Function
// (Handle new field in backend)
```

### Updating Race Schedule

```typescript
// In Schedule.tsx

const races = [
  {
    date: 'March 15, 2025',
    event: 'Spring Classic',
    location: 'Thunderbowl Raceway',
    city: 'Tulare, CA',
    status: 'upcoming' // or 'completed'
  },
  // ... more races
];
```

### Changing Theme Colors

```css
/* In src/index.css */

/* Update CSS variables */
:root {
  --primary: 39 100% 50%;     /* Orange hue */
  --background: 0 0% 4%;       /* Dark background */
}

/* Update Tailwind classes in components */
text-orange-500  →  text-[new-color]
bg-[#0a0a0a]     →  bg-[new-bg]
```

---

## Important Rules & Constraints

### DO ✅

1. **Use existing patterns**: Follow the established Motion + Tailwind patterns
2. **Mobile-first**: Always design for mobile, then scale up
3. **Performance**: Use `once: true` for scroll animations
4. **TypeScript**: Add proper types to all components and functions
5. **Accessibility**: Include alt text, ARIA labels, keyboard navigation
6. **Environment variables**: Use VITE_ prefix for client-side vars
7. **Responsive images**: Test on multiple screen sizes
8. **Git commits**: Write clear, descriptive commit messages
9. **Error handling**: Add try/catch for all async operations
10. **Testing**: Test forms, navigation, and animations before committing

### DON'T ❌

1. **Don't use React.FC**: Use function declarations instead
2. **Don't install unnecessary packages**: Check existing deps first
3. **Don't hardcode secrets**: Use environment variables
4. **Don't modify ui/ components**: These are from shadcn/ui
5. **Don't change asset filenames**: They're hash-based from Figma
6. **Don't push to main**: Use feature branches (claude/*)
7. **Don't skip TypeScript**: No `any` types without good reason
8. **Don't remove animations**: They're core to the design
9. **Don't change color scheme**: Orange and black are brand colors
10. **Don't deploy without testing**: Always test locally first

### Security Considerations

```typescript
// ✅ GOOD: Environment variables
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ❌ BAD: Hardcoded secrets
const apiKey = 'eyJhbGci...'; // Never do this

// ✅ GOOD: Input sanitization
const sanitized = input.trim().toLowerCase();

// ✅ GOOD: Error handling
try {
  await submitForm(data);
} catch (error) {
  console.error('Submission failed:', error);
  showErrorMessage('Please try again');
}
```

---

## Testing & Verification

### Pre-Deployment Checklist

```bash
# 1. Build succeeds
npm run build
# ✅ No errors, warnings are okay

# 2. TypeScript compiles
# (Vite will show TS errors during build)
# ✅ No type errors

# 3. Test locally
npm run dev
# ✅ Visit http://localhost:3000
```

### Manual Testing Checklist

**Navigation:**
- [ ] All nav links scroll to correct sections
- [ ] Fixed header stays on top during scroll
- [ ] Mobile menu opens and closes
- [ ] Racing #88 badge is visible

**Animations:**
- [ ] Hero section animates on load
- [ ] Sections fade in on scroll
- [ ] Speed lines animate in hero
- [ ] Hover effects work on sponsors

**Forms:**
- [ ] Contact form submits successfully
- [ ] Email validation works
- [ ] Error messages display correctly
- [ ] Success confirmation appears

**Responsive Design:**
- [ ] Mobile (375px): Layout stacks properly
- [ ] Tablet (768px): Grid adjusts correctly
- [ ] Desktop (1920px): Content centers with max-width

**Admin Panel:**
- [ ] Access with ?admin=true
- [ ] CSV exports download
- [ ] Data is correct

**Performance:**
- [ ] Page loads in < 3 seconds
- [ ] Images lazy-load
- [ ] Animations don't cause jank
- [ ] No console errors

### Common Issues & Solutions

**Issue: Images not loading**
```typescript
// Solution: Check import path
import logo from './assets/d8c91f7333...png'; // ✅ Correct
import logo from 'assets/logo.png';           // ❌ Wrong
```

**Issue: Form not submitting**
```typescript
// Solution: Check environment variables
console.log(import.meta.env.VITE_SUPABASE_PROJECT_ID);
// Should output: qtgusfvncorjcxcayofg
```

**Issue: Build fails**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue: Animations don't trigger**
```typescript
// Solution: Check useInView setup
const ref = useRef(null);
const isInView = useInView(ref, { once: true }); // ✅

// Make sure ref is attached
<motion.div ref={ref}> // ✅
```

---

## Quick Reference

### File Locations

```
Main app logic:          src/App.tsx
Component files:         src/components/[Name].tsx
UI components:           src/components/ui/[name].tsx
Global styles:           src/index.css
Assets (images):         src/assets/[hash].png
Supabase config:         src/utils/supabase/info.tsx
Edge functions:          src/supabase/functions/server/
Build config:            vite.config.ts
Environment vars:        .env (create from .env.example)
```

### Key Commands

```bash
npm i                    # Install dependencies
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
git push -u origin       # Push to GitHub (triggers Vercel deploy)
```

### Key Patterns

```typescript
// Component structure
export function Component() { ... }

// Animation
<motion.div initial={{ ... }} animate={{ ... }} />

// Styling
<div className="bg-[#0a0a0a] text-orange-500" />

// Form
const { register, handleSubmit } = useForm();

// API call
fetch(`https://${projectId}.supabase.co/functions/v1/...`)
```

---

## Additional Resources

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://motion.dev
- **Radix UI**: https://radix-ui.com
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Vite**: https://vite.dev

---

## Changelog

| Date | Changes |
|------|---------|
| 2025-11-17 | Initial CLAUDE.md created with comprehensive documentation |
| 2025-11-05 | SETUP_GUIDE.md added with deployment instructions |
| 2025-11-05 | Initial commit with full website implementation |

---

**Maintained by**: AI Assistants working with JMS Motorsport 88
**Version**: 1.0.0
**Contact**: See SETUP_GUIDE.md for project URLs and resources
