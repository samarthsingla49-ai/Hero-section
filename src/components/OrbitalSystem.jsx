import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import OrbitRing from './OrbitRing'

const orbitData = [
  {
    radius: 140,
    duration: 30,
    reverse: false,
    zDepth: 90,
    ringIndex: 0,
    nodes: [
      { initials: 'JD', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', angle: 0 },
      { initials: 'SM', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)', angle: 120 },
      { icon: 'check', angle: 240 },
    ],
  },
  {
    radius: 200,
    duration: 45,
    reverse: true,
    zDepth: 0,
    ringIndex: 1,
    nodes: [
      { initials: 'AK', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', angle: 30 },
      { initials: 'MR', gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', angle: 110 },
      { icon: 'star', angle: 190 },
      { initials: 'TC', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', angle: 270 },
    ],
  },
  {
    radius: 260,
    duration: 60,
    reverse: false,
    zDepth: -90,
    ringIndex: 2,
    nodes: [
      { initials: 'LP', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)', angle: 0 },
      { initials: 'DN', gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', angle: 90 },
      { icon: 'message', angle: 180 },
      { initials: 'RW', gradient: 'linear-gradient(135deg, #10b981, #3b82f6)', angle: 270 },
    ],
  },
]

function OrbitalSystem() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef(null)

  // Base tilt: 12deg on X (HUD look). Mouse modulates ±6deg around that.
  const mouseXMV = useMotionValue(0)
  const mouseYMV = useMotionValue(12)

  const rotateY = useSpring(mouseXMV, { stiffness: 60, damping: 20 })
  const rotateX = useSpring(mouseYMV, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = (e) => {
    if (!containerRef.current || reducedMotion) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const nx = (e.clientX - cx) / (rect.width / 2)   // -1 to 1
    const ny = (e.clientY - cy) / (rect.height / 2)  // -1 to 1
    mouseXMV.set(nx * 8)
    mouseYMV.set(12 + (-ny * 6))
  }

  const handleMouseLeave = () => {
    mouseXMV.set(0)
    mouseYMV.set(12)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: 600, height: 600, perspective: '1200px', perspectiveOrigin: 'center center' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute w-40 h-40 rounded-full bg-pink-500/15 blur-2xl" />
      </div>

      {/* 3D scene */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: reducedMotion ? 12 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
      >
        {orbitData.map((ring) => (
          <OrbitRing
            key={ring.ringIndex}
            radius={ring.radius}
            duration={ring.duration}
            nodes={ring.nodes}
            reverse={ring.reverse}
            reducedMotion={reducedMotion}
            zDepth={ring.zDepth}
            ringIndex={ring.ringIndex}
          />
        ))}

        {/* Center sphere — most elevated, glassmorphism */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{ translateZ: 140, transformStyle: 'preserve-3d' }}
          animate={reducedMotion ? {} : { y: [0, -8, 0] }}
          transition={reducedMotion ? {} : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Pulsing halo */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 130,
              height: 130,
              background: 'radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)',
            }}
            animate={reducedMotion ? {} : { scale: [1, 1.4, 1], opacity: [0.7, 0.15, 0.7] }}
            transition={reducedMotion ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Glass sphere */}
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.85), rgba(236,72,153,0.85))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow:
                '0 0 30px rgba(139,92,246,0.8), 0 0 60px rgba(236,72,153,0.35), 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            {/* Top glass highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
              }}
            />
            <span className="text-white font-bold text-xl leading-none relative z-10">20k+</span>
            <span className="text-white/80 text-xs mt-1 relative z-10">Specialists</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OrbitalSystem
