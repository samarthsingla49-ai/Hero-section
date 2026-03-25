# Quick Reference Card

## Common Modifications

### Change Headline
**File:** [src/components/Hero.jsx](src/components/Hero.jsx#L38)

```jsx
// Find line ~38-50
<motion.h1>
  Unlock Top Marketing Talent{' '}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
    You Thought Was Out of Reach
  </span>{' '}
  — Now Just One Click Away!
</motion.h1>

// Replace with your text
```

### Update Brand Colors
**File:** [tailwind.config.js](tailwind.config.js#L8)

```javascript
// Find line ~8-12
extend: {
  colors: {
    'brand-purple': '#8B5CF6',  // Change this
    'brand-pink': '#EC4899',    // Change this
    'brand-orange': '#F59E0B',  // Change this
  }
}
```

### Replace Logo
**File:** [src/components/Navigation.jsx](src/components/Navigation.jsx#L48)

```jsx
// Find the Logo component around line 48
const Logo = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" ...>
      {/* Replace SVG path here */}
    </svg>
  )
}

// Or import an image:
<img src="/logo.svg" alt="Brand" className="w-8 h-8" />
```

### Update Navigation Links
**File:** [src/components/Navigation.jsx](src/components/Navigation.jsx#L9)

```javascript
// Find line ~9-14
const navItems = [
  { label: 'Your Team', href: '#team' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
]

// Add/remove/modify items
```

### Change Specialist Count
**File:** [src/components/OrbitalSystem.jsx](src/components/OrbitalSystem.jsx#L88)

```jsx
// Find line ~88-95
<div className="text-6xl md:text-7xl font-bold text-white mb-2">
  20k+  {/* Change this number */}
</div>
<div className="text-lg md:text-xl text-white/80 font-medium">
  Specialists  {/* Change this label */}
</div>
```

### Update Avatar Data
**File:** [src/components/OrbitalSystem.jsx](src/components/OrbitalSystem.jsx#L23)

```javascript
// Find line ~23-50
const orbitData = [
  {
    radius: 140,
    duration: 30,
    reverse: false,
    nodes: [
      { initials: 'JD', gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', angle: 0 },
      // Add more nodes or change initials
    ]
  },
  // Add more rings or modify existing ones
]
```

### Change Animation Speed
**File:** [src/components/OrbitalSystem.jsx](src/components/OrbitalSystem.jsx#L23)

```javascript
// In orbitData array
{
  radius: 140,
  duration: 30,  // Lower = faster, Higher = slower
  reverse: false, // true = clockwise, false = counter-clockwise
  nodes: [...]
}
```

### Adjust Background Gradient
**File:** [src/components/Hero.jsx](src/components/Hero.jsx#L19)

```jsx
// Find line ~19
<section className="... bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

// Change color stops:
// from-[color] via-[color] to-[color]
```

### Update CTA Button Text
**File:** [src/components/Hero.jsx](src/components/Hero.jsx#L75)

```jsx
// Find line ~75
<button className="...">
  <span className="...">
    Start Project  {/* Change this */}
    <svg>...</svg>
  </span>
</button>
```

### Change CTA Button Action
**File:** [src/components/Hero.jsx](src/components/Hero.jsx#L71)

```jsx
// Find line ~71
<button
  className="..."
  aria-label="Start your project..."
  onClick={() => {
    // Add your logic here
    // Examples:
    // - window.location.href = '/signup'
    // - Navigate to route
    // - Open modal
    // - Track analytics
  }}
>
```

## Animation Tweaks

### Add More Orbital Rings
**File:** [src/components/OrbitalSystem.jsx](src/components/OrbitalSystem.jsx#L23)

```javascript
const orbitData = [
  // Existing rings...

  // Add new ring:
  {
    radius: 320,        // Larger radius
    duration: 75,       // Slower rotation
    reverse: true,      // Direction
    nodes: [
      { initials: 'XX', gradient: 'bg-gradient-to-br from-teal-500 to-cyan-500', angle: 0 },
      // Add more nodes
    ]
  }
]
```

### Add More Avatars to Ring
**File:** [src/components/OrbitalSystem.jsx](src/components/OrbitalSystem.jsx#L23)

```javascript
// In any ring's nodes array:
nodes: [
  { initials: 'JD', gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', angle: 0 },
  { initials: 'SM', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500', angle: 90 },
  { initials: 'NEW', gradient: 'bg-gradient-to-br from-green-500 to-emerald-500', angle: 180 },
  { initials: 'XYZ', gradient: 'bg-gradient-to-br from-red-500 to-orange-500', angle: 270 },
]

// Tip: Divide 360° by number of nodes for even spacing
// 4 nodes = 360/4 = 90° apart
// 6 nodes = 360/6 = 60° apart
```

### Change Icon Types
**File:** [src/components/AvatarNode.jsx](src/components/AvatarNode.jsx#L49)

```javascript
// Find the getIcon() function around line 49
const getIcon = () => {
  switch (type) {
    case 'checkmark':
      return <svg>...</svg>

    // Add new icon:
    case 'heart':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )

    default:
      return null
  }
}

// Then use in orbitData:
{ icon: 'heart', angle: 120 }
```

## Responsive Adjustments

### Mobile Layout
**File:** [src/components/Hero.jsx](src/components/Hero.jsx#L32)

```jsx
// Current breakpoints:
<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
  {/* Left column */}
  {/* Right column */}
</div>

// Modify breakpoint:
// sm:grid-cols-2  = stacks until 640px
// md:grid-cols-2  = stacks until 768px
// lg:grid-cols-2  = stacks until 1024px (current)
// xl:grid-cols-2  = stacks until 1280px
```

### Hide Animation on Mobile
**File:** [src/components/Hero.jsx](src/components/Hero.jsx#L102)

```jsx
// Find the orbital system container around line 102
<motion.div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
  <OrbitalSystem />
</motion.div>

// Change to hide on mobile:
<motion.div className="hidden md:block relative h-[600px] lg:h-[700px]">
  <OrbitalSystem />
</motion.div>
```

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clear npm cache (if issues)
npm cache clean --force
```

## File Locations Quick Map

```
Content & Text:
  Hero.jsx              - Main headline, CTA, subheadline
  Navigation.jsx        - Nav links, logo, buttons
  OrbitalSystem.jsx     - Specialist count text

Styling & Colors:
  tailwind.config.js    - Brand color palette
  Hero.jsx              - Background gradients
  index.css             - Global styles

Animation Config:
  OrbitalSystem.jsx     - Ring count, speeds, avatar data
  OrbitRing.jsx         - Rotation logic (usually no changes needed)
  AvatarNode.jsx        - Icon definitions

Assets:
  Navigation.jsx        - Logo SVG
  AvatarNode.jsx        - Icon SVGs
  (No external images)
```

## Common Tailwind Classes

```css
/* Colors */
text-white              /* White text */
text-white/70           /* 70% opacity white */
bg-purple-500           /* Purple background */
from-purple-500         /* Gradient start */
to-pink-500             /* Gradient end */

/* Spacing */
p-4                     /* Padding 1rem */
m-4                     /* Margin 1rem */
gap-4                   /* Gap 1rem */
space-x-4               /* Horizontal spacing */

/* Layout */
flex                    /* Flexbox */
grid                    /* Grid */
grid-cols-2             /* 2 columns */
items-center            /* Align items center */
justify-center          /* Justify center */

/* Responsive */
md:text-xl              /* Text XL on medium+ screens */
lg:grid-cols-2          /* 2 columns on large+ screens */
hidden md:block         /* Hidden on mobile, visible on tablet+ */

/* Effects */
rounded-full            /* Fully rounded (circle/pill) */
shadow-lg               /* Large shadow */
blur-3xl                /* Heavy blur */
backdrop-blur-sm        /* Backdrop blur (frosted glass) */
```

## Troubleshooting Quick Fixes

**Animations not smooth?**
- Check browser console for errors
- Verify Framer Motion installed: `npm list framer-motion`
- Reduce number of rings/nodes

**Text not readable?**
- Increase text color opacity: `text-white/90` instead of `text-white/70`
- Add text shadow: `shadow-lg` or custom CSS

**Layout broken on mobile?**
- Check responsive classes: `md:`, `lg:`, etc.
- Test in Chrome DevTools device mode
- Verify Tailwind JIT compiled correctly

**Build fails?**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for syntax errors in JSX
- Verify all imports are correct

**Port 5173 already in use?**
- Vite will auto-increment to 5174, 5175, etc.
- Or specify: `npm run dev -- --port 3000`

## Performance Tips

**Optimize for production:**
1. Run `npm run build` before deploying
2. Serve from CDN (Vercel, Netlify, Cloudflare)
3. Enable gzip/brotli compression
4. Use lazy loading for below-fold content

**Reduce bundle size:**
1. Remove unused Tailwind classes (JIT does this automatically)
2. Remove unused components
3. Check bundle analyzer: `npm install -D rollup-plugin-visualizer`

**Improve FPS:**
1. Reduce number of orbital nodes
2. Increase animation duration (slower = less work)
3. Remove blur effects on low-end devices
4. Use `will-change: transform` sparingly

## Need Help?

1. **Read the docs:**
   - [README.md](README.md) - Complete guide
   - [SETUP.md](SETUP.md) - Installation help
   - [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md) - Technical details

2. **Check browser console** for error messages

3. **Verify dependencies** are installed: `npm list`

4. **Test in incognito mode** to rule out browser extensions

5. **Check Node.js version:** `node --version` (need 18+)
