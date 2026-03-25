# Component Hierarchy

## Visual Structure

```
App
└── Hero
    ├── Navigation
    │   ├── Logo (SVG)
    │   ├── Nav Items (Links)
    │   └── CTA Buttons
    │
    └── Hero Content (Grid)
        ├── Left Column
        │   ├── Headline (h1)
        │   ├── Subheadline (p)
        │   └── CTA Section
        │       ├── Primary Button ("Start Project")
        │       └── Social Proof (Avatar group + text)
        │
        └── Right Column
            └── OrbitalSystem
                ├── Ring 1 (Inner - 140px radius, 30s rotation)
                │   ├── AvatarNode (JD - 0°)
                │   ├── AvatarNode (SM - 120°)
                │   └── AvatarNode (Icon - 240°)
                │
                ├── Ring 2 (Middle - 200px radius, 45s rotation, reverse)
                │   ├── AvatarNode (AK - 30°)
                │   ├── AvatarNode (MR - 110°)
                │   ├── AvatarNode (Icon - 190°)
                │   └── AvatarNode (TC - 270°)
                │
                ├── Ring 3 (Outer - 260px radius, 60s rotation)
                │   ├── AvatarNode (LP - 0°)
                │   ├── AvatarNode (DN - 90°)
                │   ├── AvatarNode (Icon - 180°)
                │   └── AvatarNode (RW - 270°)
                │
                └── Center Content
                    ├── "20k+" (Large text)
                    └── "Specialists" (Small text)
```

## Data Flow

```
OrbitalSystem
  │
  ├── State: reducedMotion (boolean)
  │
  ├── Data: orbitData[] (array of ring configurations)
  │   └── Each ring:
  │       ├── radius (number)
  │       ├── duration (number)
  │       ├── reverse (boolean)
  │       └── nodes[] (array of avatar configs)
  │           └── Each node:
  │               ├── initials? (string)
  │               ├── gradient? (string)
  │               ├── icon? (string)
  │               └── angle (number)
  │
  └── Renders: OrbitRing[] (one per ring)
      └── Each OrbitRing:
          ├── Props: radius, duration, nodes, reverse, reducedMotion
          ├── Animation: Framer Motion rotate
          └── Renders: AvatarNode[] (one per node)
              └── Each AvatarNode:
                  ├── Props: initials, gradient, icon, angle
                  ├── Position: Polar coordinates on ring
                  ├── Rotation: Counter-rotates to stay upright
                  └── Renders: InitialAvatar OR IconAvatar
```

## Prop Drilling Path

```
App (no props)
 │
 └─> Hero (no props)
      │
      ├─> Navigation (no props)
      │    └── Internal state for nav items
      │
      └─> OrbitalSystem (no props)
           │
           ├─> State: reducedMotion
           ├─> Data: orbitData
           │
           └─> OrbitRing (receives: radius, duration, nodes, reverse, reducedMotion)
                │
                └─> AvatarNode (receives: initials, gradient, icon, angle)
                     └── Renders avatar based on props
```

## Animation Cascade

```
1. OrbitalSystem (container)
   └── Detects prefers-reduced-motion
       └── Passes reducedMotion to all OrbitRings

2. OrbitRing (rotating container)
   └── Framer Motion: rotate 0° → 360° (or reverse)
       └── Duration: 30s / 45s / 60s (different per ring)
           └── Repeat: Infinity
               └── Ease: Linear

3. AvatarNode (counter-rotating content)
   └── Parent div: rotate(${angle}deg) - positions on ring
       └── Child div: rotate(-${angle}deg) - cancels rotation
           └── Avatar content stays upright
               └── Hover animation: scale(1.1)
```

## Styling Layers

```
1. Global (index.css)
   ├── Tailwind base
   ├── Tailwind components
   ├── Tailwind utilities
   └── Reduced motion media query

2. Component (Tailwind classes)
   ├── Layout: grid, flex, absolute positioning
   ├── Colors: gradient backgrounds, text colors
   ├── Spacing: padding, margins
   ├── Typography: font sizes, weights
   └── Effects: shadows, blur, backdrop-blur

3. Inline (style prop)
   ├── Dynamic positioning (left, top)
   ├── Rotation angles (transform)
   ├── Dimensions (width, height)
   └── Margins (calculated from radius)

4. Framer Motion (animation prop)
   ├── Opacity transitions
   ├── Scale transforms
   ├── Rotation animations
   └── Entrance effects
```

## State Management

```
OrbitalSystem
 ├── reducedMotion (local state)
 │   └── Updated by: mediaQuery.matches
 │   └── Used by: OrbitRing animation toggle
 │
 └── orbitData (constant array)
     └── Could be replaced with:
         ├── API fetch (useEffect)
         ├── Redux store
         ├── Context provider
         └── Props from parent
```

## Render Optimization

```
Component         Re-renders when...
─────────────────────────────────────────
App               Never (no state)
Hero              Never (no state)
Navigation        Never (no state)
OrbitalSystem     reducedMotion changes
OrbitRing         Parent re-renders (rare)
AvatarNode        Parent re-renders (rare)
```

All animations run via Framer Motion RAF loop, not React re-renders.

## Event Handling

```
User Action                    Handler Location
───────────────────────────────────────────────────
System motion preference      OrbitalSystem useEffect
Avatar hover                  AvatarNode whileHover
Button click                  Hero button onClick (TODO)
Nav link click                Navigation link href
Window resize                 Browser (CSS handles)
```

## Accessibility Tree

```
<main> (Hero)
  │
  ├── <nav> (Navigation)
  │    ├── <a> Logo + brand name
  │    ├── <a> Your Team
  │    ├── <a> Solutions
  │    ├── <a> Blog
  │    ├── <a> Pricing
  │    ├── <button> Log In
  │    └── <button> Join Now
  │
  ├── <section> (Grid container)
  │    │
  │    ├── <div> Left column
  │    │    ├── <h1> Main headline
  │    │    ├── <p> Subheadline
  │    │    └── <div> CTA section
  │    │         ├── <button aria-label="..."> Start Project
  │    │         └── <div> Social proof
  │    │
  │    └── <div> Right column
  │         └── <div aria-hidden="true"> Orbital animation
  │              └── (Decorative - hidden from screen readers)
  │
  └── <div aria-hidden="true"> Decorative gradient overlays
```

## File Dependencies

```
main.jsx
 └── imports App.jsx
      └── imports Hero.jsx
           ├── imports Navigation.jsx
           │    └── (no component imports)
           │
           └── imports OrbitalSystem.jsx
                └── imports OrbitRing.jsx
                     └── imports AvatarNode.jsx
                          └── imports framer-motion

All components import:
 ├── React (from 'react')
 └── framer-motion utilities
```

## CSS Dependencies

```
index.css (imported in main.jsx)
 ├── @tailwind base
 ├── @tailwind components
 ├── @tailwind utilities
 └── Custom base styles

tailwind.config.js
 ├── Content paths (src/**/*.{js,jsx})
 ├── Extended colors (brand palette)
 └── Custom animations (spin-slow, etc.)
```

## Build Output

```
npm run build
 │
 ├── Vite bundles all JSX → optimized JS
 ├── Tailwind purges unused CSS → minimal CSS
 ├── SVG inlined in components
 └── Output: dist/
      ├── index.html (entry)
      ├── assets/
      │    ├── index-[hash].js (bundled app)
      │    └── index-[hash].css (purged styles)
      └── (no images)
```

## Modification Entry Points

```
Want to change...              Edit this file...
─────────────────────────────────────────────────────
Headline text                  Hero.jsx (line ~40)
Brand colors                   tailwind.config.js
Logo                           Navigation.jsx (Logo component)
Navigation links               Navigation.jsx (navItems array)
Specialist count               OrbitalSystem.jsx (line ~90)
Avatar data                    OrbitalSystem.jsx (orbitData array)
Animation speed                OrbitalSystem.jsx (duration values)
Number of rings                OrbitalSystem.jsx (add/remove in orbitData)
Avatar appearance              AvatarNode.jsx (component styles)
Background gradient            Hero.jsx (line ~20)
```

## Testing Checklist

```
[ ] Desktop view (1920x1080)
    ├── [ ] Navigation displays horizontally
    ├── [ ] Two-column layout
    ├── [ ] Orbital animation visible
    └── [ ] Smooth 60fps rotation

[ ] Tablet view (768x1024)
    ├── [ ] Layout adjusts spacing
    ├── [ ] Animation scales appropriately
    └── [ ] Navigation still horizontal

[ ] Mobile view (375x667)
    ├── [ ] Layout stacks vertically
    ├── [ ] Animation simplified/scaled
    ├── [ ] Navigation shows mobile CTA only
    └── [ ] Text remains readable

[ ] Accessibility
    ├── [ ] Keyboard navigation works (Tab)
    ├── [ ] Focus indicators visible
    ├── [ ] Screen reader skips decoration (aria-hidden)
    └── [ ] Reduced motion disables animation

[ ] Performance
    ├── [ ] No console errors
    ├── [ ] 60fps in Chrome DevTools performance
    ├── [ ] Lighthouse score > 90
    └── [ ] Fast load time (< 3s)
```
