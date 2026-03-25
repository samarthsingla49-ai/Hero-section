# Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

### Step 1: Fix npm permissions (if needed)

If you encounter permission errors during installation:

```bash
sudo chown -R $(whoami) ~/.npm
```

### Step 2: Install dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

### Step 3: Start development server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Verify Installation

You should see:
- Purple gradient background
- "Marketeam" navigation at top
- Large headline on the left
- Rotating orbital animation on the right with avatars
- Smooth 60fps animations

## Troubleshooting

### Build errors

If you see Vite or React errors:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Port already in use

If port 5173 is taken:

```bash
# Vite will automatically try 5174, 5175, etc.
# Or specify a port:
npm run dev -- --port 3000
```

### Animations not working

Check browser console for errors. Ensure:
- Framer Motion installed correctly
- No conflicting CSS
- Browser supports CSS transforms

### npm cache issues

```bash
npm cache clean --force
```

If permission denied:

```bash
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
npm install
```

## Development Checklist

After successful installation:

- [ ] App loads without errors
- [ ] Navigation displays correctly
- [ ] Headline text is readable
- [ ] Orbital rings are rotating smoothly
- [ ] Avatars stay upright while orbiting
- [ ] Buttons have hover effects
- [ ] Responsive on mobile (test with DevTools)
- [ ] No console errors

## Next Steps

1. Read [README.md](README.md) for full documentation
2. Read [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md) for technical details
3. Start replacing placeholder content (see README)
4. Customize colors in `tailwind.config.js`
5. Update text in `Hero.jsx` and `Navigation.jsx`

## Scripts Reference

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## File Structure Quick Reference

```
src/
├── components/
│   ├── Hero.jsx           - Main section (start here for content)
│   ├── Navigation.jsx     - Top nav (update logo/links)
│   ├── OrbitalSystem.jsx  - Animation container (update data)
│   ├── OrbitRing.jsx      - Ring logic (no changes needed)
│   └── AvatarNode.jsx     - Avatar component (no changes needed)
├── App.jsx                - Root component
├── main.jsx               - Entry point
└── index.css              - Global styles
```

## Common First Edits

### Update headline

File: `src/components/Hero.jsx`

Find and replace the `<h1>` text (around line 40).

### Change colors

File: `tailwind.config.js`

Modify the `extend.colors` section.

### Update logo

File: `src/components/Navigation.jsx`

Replace the `Logo` component SVG (around line 50).

### Change specialist count

File: `src/components/OrbitalSystem.jsx`

Update the center text (around line 90).

## Support

If you encounter issues not covered here:
1. Check browser console for errors
2. Verify Node.js version: `node --version` (should be 18+)
3. Check package versions match `package.json`
4. Try deleting `node_modules` and reinstalling
