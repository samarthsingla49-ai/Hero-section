# Animated SaaS Hero Section

Production-ready React hero section with orbital animations, built with Framer Motion and Tailwind CSS.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **SVG** - Icons and graphics

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` after starting the dev server.

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Main hero section layout
│   ├── Navigation.jsx        # Top navigation bar
│   ├── OrbitalSystem.jsx     # Orbital animation container
│   ├── OrbitRing.jsx         # Individual rotating ring
│   └── AvatarNode.jsx        # Avatar/icon nodes on rings
├── App.jsx                   # Root component
├── main.jsx                  # App entry point
└── index.css                 # Global styles + Tailwind

```

## Component Architecture

### Hero (`Hero.jsx`)

Main section with responsive grid layout:
- **Desktop**: Side-by-side text and animation
- **Tablet**: Adjusted spacing
- **Mobile**: Stacked layout

Includes gradient background, navigation, and CTA elements.

### OrbitalSystem (`OrbitalSystem.jsx`)

Multi-ring orbital animation container:
- Manages 3 concentric rings (customizable)
- Detects `prefers-reduced-motion` accessibility setting
- Centers specialist count display
- GPU-optimized animations

**Key Configuration:**

```javascript
const orbitData = [
  {
    radius: 140,      // Ring size (px)
    duration: 30,     // Rotation speed (seconds)
    reverse: false,   // Rotation direction
    nodes: [...]      // Avatars on this ring
  },
  // ... additional rings
]
```

### OrbitRing (`OrbitRing.jsx`)

Individual rotating ring:
- Continuous smooth rotation using Framer Motion
- Configurable speed and direction
- Optional visual ring border
- Positions child nodes around circumference

### AvatarNode (`AvatarNode.jsx`)

Avatar/icon elements on rings:
- **Counter-rotation**: Keeps avatars upright while orbiting
- Supports initials or SVG icons
- Hover animations
- Customizable gradients

**Node Types:**
- `InitialAvatar`: Displays 1-2 character initials
- `IconAvatar`: Displays SVG icon (checkmark, star, message)

### Navigation (`Navigation.jsx`)

Top navigation bar:
- Logo + brand name
- Desktop menu items
- CTA buttons
- Entrance animations

## Animation Logic

### Orbital Rotation

Rings rotate continuously using Framer Motion's `animate` prop:

```javascript
animate={{ rotate: reverse ? -360 : 360 }}
transition={{
  duration: duration,
  repeat: Infinity,
  ease: 'linear'
}}
```

**GPU Optimization:**
- Uses CSS `transform` for 60fps performance
- `will-change` hint applied automatically by Framer Motion
- No layout thrashing

### Counter-Rotation

Avatars stay upright using inline transform:

```javascript
style={{ transform: `rotate(-${angle}deg)` }}
```

This cancels the parent ring's rotation for the avatar content.

### Reduced Motion Support

Respects `prefers-reduced-motion`:

```javascript
const [reducedMotion, setReducedMotion] = useState(false)

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  setReducedMotion(mediaQuery.matches)
  // ... event listener
}, [])
```

When enabled, animations are disabled or drastically reduced.

## Replacing Placeholder Assets

### Avatars

**Current:** Gradient circles with initials

**To Replace:**
1. Open `OrbitalSystem.jsx`
2. Modify `orbitData.nodes` array
3. Options:
   - Keep initials, update to real names
   - Replace with image URLs (requires `AvatarNode.jsx` update)
   - Use real user profile data

**Example with images:**

```javascript
// In AvatarNode.jsx, add image variant:
const ImageAvatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-12 h-12 rounded-full ring-2 ring-white/20"
  />
)

// In OrbitalSystem.jsx:
nodes: [
  { image: '/avatars/user1.jpg', alt: 'John Doe', angle: 0 },
]
```

### Icons

**Current:** SVG paths for checkmark, star, message

**To Replace:**
1. Open `AvatarNode.jsx`
2. Update `IconAvatar` component's `getIcon()` switch
3. Add new icon types with SVG paths
4. Or import from icon library (Heroicons, Lucide, etc.)

### Logo

**Current:** Simple geometric SVG in `Navigation.jsx`

**To Replace:**
1. Open `Navigation.jsx`
2. Replace `Logo` component SVG
3. Or import brand logo SVG file

### Text Content

**To Replace:**
1. Open `Hero.jsx`
2. Update headline, subheadline, CTA text
3. Modify `Navigation.jsx` for nav items
4. Update center text in `OrbitalSystem.jsx` (currently "20k+ Specialists")

## Responsive Behavior

### Breakpoints (Tailwind)

- **Mobile**: `< 768px` - Stacked layout, simplified animation
- **Tablet**: `768px - 1024px` - Side-by-side, adjusted spacing
- **Desktop**: `> 1024px` - Full layout

### Mobile Optimizations

- Smaller orbital rings
- Reduced animation complexity
- Stacked text/animation layout
- Touch-friendly button sizes

## Accessibility

### Features

- **Semantic HTML**: `<section>`, `<nav>`, proper heading hierarchy
- **ARIA labels**: Descriptive button labels
- **Keyboard navigation**: All interactive elements accessible
- **Reduced motion**: Respects user preference
- **Color contrast**: WCAG AA compliant (white on dark gradient)
- **Focus states**: Visible focus indicators

### Testing

```bash
# Test with keyboard only
# Tab through all interactive elements
# Ensure visible focus states

# Test with screen reader
# VoiceOver (Mac): Cmd + F5
# NVDA (Windows): Free download

# Test reduced motion
# System Preferences > Accessibility > Display > Reduce motion
```

## Performance

### Optimizations

- **GPU-accelerated animations**: CSS transforms only
- **No layout reflows**: Fixed sizing, absolute positioning
- **Framer Motion**: Optimized animation library
- **Tailwind JIT**: Minimal CSS bundle
- **SVG icons**: Scalable, lightweight

### Metrics (Target)

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

## Customization Guide

### Colors

Modify `tailwind.config.js`:

```javascript
extend: {
  colors: {
    'brand-purple': '#8B5CF6',  // Primary color
    'brand-pink': '#EC4899',    // Accent color
    'brand-orange': '#F59E0B',  // Warm accent
  }
}
```

### Animation Speed

Adjust ring `duration` in `OrbitalSystem.jsx`:
- Faster: Lower duration (e.g., 20s)
- Slower: Higher duration (e.g., 60s)

### Ring Count

Add/remove objects in `orbitData` array:
- More rings: Add objects with larger radii
- Fewer rings: Remove objects

### Node Count

Modify `nodes` array per ring:
- More avatars: Add objects with different angles
- Distribute evenly: 360 / node count = angle spacing

## Browser Support

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile Safari: 14+
- Samsung Internet: 15+

## Deployment

### Build

```bash
npm run build
```

Outputs to `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

## License

MIT

## Support

For issues or questions, open a GitHub issue.
