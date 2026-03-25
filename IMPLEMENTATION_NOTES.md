# Implementation Notes

## Animation Logic Explained

### Orbital Rotation System

The orbital animation uses a three-layer approach:

1. **Container** (`OrbitalSystem.jsx`)
   - Fixed size (600x600 or 700x700)
   - Centers all rings
   - Manages reduced motion state

2. **Rings** (`OrbitRing.jsx`)
   - Absolute positioned circles
   - Each ring rotates independently
   - Uses Framer Motion's infinite linear animation
   - Different speeds create visual depth

3. **Nodes** (`AvatarNode.jsx`)
   - Positioned on ring circumference using polar coordinates
   - Counter-rotated to stay upright
   - Formula: `transform: rotate(${angle}deg)` on parent, `rotate(-${angle}deg)` on child

### Why This Approach?

**GPU-Friendly**: Only `transform` and `opacity` are animated, avoiding expensive layout calculations.

**Smooth Performance**: Framer Motion handles RAF (requestAnimationFrame) automatically.

**Maintainable**: Each component has single responsibility, easy to modify.

## Placeholder Replacement Checklist

### Immediate Replacements

- [ ] Update brand name in `Navigation.jsx` (currently "Marketeam")
- [ ] Replace logo SVG in `Navigation.jsx` `Logo` component
- [ ] Update headline text in `Hero.jsx`
- [ ] Update specialist count in `OrbitalSystem.jsx` (currently "20k+")
- [ ] Add real nav links in `Navigation.jsx` `navItems` array

### When You Have Real Data

- [ ] Replace `orbitData` in `OrbitalSystem.jsx` with user/specialist data
- [ ] Update avatar initials to real names
- [ ] Add real profile images (requires updating `AvatarNode.jsx`)
- [ ] Customize gradient colors to match brand
- [ ] Update CTA button text and links

### Optional Enhancements

- [ ] Add more orbital rings for larger datasets
- [ ] Implement click handlers on avatars (show profile modal)
- [ ] Add particle effects in background
- [ ] Implement testimonial carousel below hero
- [ ] Add scroll indicator at bottom of hero

## Code Quality Notes

### Why No Magic Numbers?

Each hardcoded value has context:

- `radius: 140/200/260` - Ring sizes in pixels (inner/middle/outer)
- `duration: 30/45/60` - Rotation speeds in seconds (faster inner rings)
- `angle: 0/90/180/270` - Even distribution around circumference
- `w-12 h-12` - Avatar size (48px) - consistent across all nodes

### Component Splitting Rationale

**Navigation**: Separate from Hero for reusability across pages

**OrbitalSystem**: Isolated animation logic, could be used elsewhere

**OrbitRing**: Reusable ring component, scalable to any radius

**AvatarNode**: Smallest unit, highly reusable

This allows you to:
- Add OrbitalSystem to other sections
- Use AvatarNode in lists/grids
- Reuse Navigation across pages

## Animation Performance Tips

### Current FPS: ~60fps

If you experience jank:

1. **Reduce node count**: Fewer avatars = less to render
2. **Increase duration**: Slower rotation = fewer calculations
3. **Simplify gradients**: Solid colors render faster
4. **Remove blur effects**: `blur-3xl` is expensive
5. **Disable on mobile**: Use `hidden md:block` on OrbitalSystem

### Testing Performance

```javascript
// Add to useEffect in OrbitalSystem.jsx
let frameCount = 0
let lastTime = performance.now()

const measureFPS = () => {
  frameCount++
  const now = performance.now()
  if (now - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`)
    frameCount = 0
    lastTime = now
  }
  requestAnimationFrame(measureFPS)
}

measureFPS()
```

## Accessibility Deep Dive

### Reduced Motion

System respects `prefers-reduced-motion` in two places:

1. **CSS**: Global rule in `index.css` disables all animations
2. **JavaScript**: `OrbitalSystem.jsx` checks media query and disables Framer Motion animations

Users with vestibular disorders won't experience motion sickness.

### Screen Reader Experience

Current structure reads as:
1. "Marketeam" (logo/brand)
2. Navigation items
3. Main heading
4. Subheading paragraph
5. "Start Project" button with description
6. Decorative animation (hidden with `aria-hidden`)

### Focus Management

All interactive elements are keyboard accessible:
- Nav links: Tab order
- Buttons: Tab + Enter/Space
- Hover states have focus equivalents

## Next Steps

### Phase 1: Content
1. Replace all placeholder text
2. Add real logo
3. Update colors to brand palette

### Phase 2: Data Integration
1. Connect to user API
2. Populate orbital nodes with real profiles
3. Add click handlers for profile views

### Phase 3: Enhancement
1. Add more sections (features, pricing, footer)
2. Implement mobile menu
3. Add analytics tracking
4. SEO optimization (meta tags, structured data)

### Phase 4: Production
1. Performance audit (Lighthouse)
2. Cross-browser testing
3. Accessibility audit (WAVE, axe)
4. Deploy to staging
5. User testing
6. Production deployment

## Common Issues & Solutions

### Issue: Animation jitter
**Solution**: Ensure `will-change: transform` is applied (Framer Motion does this automatically)

### Issue: Avatars not staying upright
**Solution**: Check counter-rotation angle matches parent rotation exactly

### Issue: Layout shift on load
**Solution**: All containers have explicit dimensions, no shift should occur

### Issue: Poor mobile performance
**Solution**: Reduce ring count or disable animation on mobile

### Issue: Text not readable on gradient
**Solution**: Adjust gradient opacity or add text shadow

## File Modification Priority

High priority (modify first):
1. `Hero.jsx` - Update all text content
2. `Navigation.jsx` - Update logo and links
3. `OrbitalSystem.jsx` - Replace placeholder data

Medium priority:
4. `tailwind.config.js` - Update brand colors
5. `AvatarNode.jsx` - Add image support if needed

Low priority:
6. Animation durations/speeds (only if needed)
7. Additional rings/nodes (only if needed)
