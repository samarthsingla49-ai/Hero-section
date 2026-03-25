import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import OrbitRing from './OrbitRing'

// Ring entrance delays — inner ring first, outer ring last
const orbitData = [
  {
    radius: 140,
    duration: 30,
    reverse: false,
    zDepth: 90,
    ringIndex: 0,
    ringEntranceDelay: 0.8,
  },
  {
    radius: 200,
    duration: 45,
    reverse: true,
    zDepth: 0,
    ringIndex: 1,
    ringEntranceDelay: 1.05,
  },
  {
    radius: 260,
    duration: 60,
    reverse: false,
    zDepth: -90,
    ringIndex: 2,
    ringEntranceDelay: 1.3,
  },
]

// Center sphere warps in at this delay
const CENTER_DELAY = 0.6

// Easing: fast arrival with slight bounce
const WARP_EASE = [0.16, 1, 0.3, 1]

function OrbitalSystem() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef(null)

  const mouseXMV = useMotionValue(0)
  const mouseYMV = useMotionValue(12)
  const rotateY = useSpring(mouseXMV, { stiffness: 60, damping: 20 })
  const rotateX = useSpring(mouseYMV, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = (e) => {
    if (!containerRef.current || reducedMotion) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    mouseXMV.set(nx * 8)
    mouseYMV.set(12 + -ny * 6)
  }

  const handleMouseLeave = () => {
    mouseXMV.set(0)
    mouseYMV.set(12)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        width: 600,
        height: 600,
        perspective: '1200px',
        perspectiveOrigin: 'center center',
      }}
      // Entire system warps in from deep Z-space
      initial={{ scale: 0.06, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: WARP_EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute w-40 h-40 rounded-full bg-pink-500/15 blur-2xl" />
      </div>

      {/* 3D scene with mouse parallax */}
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
            ringEntranceDelay={ring.ringEntranceDelay}
          />
        ))}

        {/* Center sphere — first to appear, most elevated */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{ translateZ: 140, transformStyle: 'preserve-3d' }}
          // Entrance: zoom in from zero
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: CENTER_DELAY, ease: WARP_EASE }}
        >
          {/* Idle float — delayed until after entrance */}
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -8, 0] }}
            transition={
              reducedMotion
                ? {}
                : { duration: 4, delay: CENTER_DELAY + 0.7, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* Pulsing halo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 130,
                height: 130,
                top: '50%',
                left: '50%',
                marginLeft: -65,
                marginTop: -65,
                background: 'radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)',
              }}
              animate={
                reducedMotion
                  ? {}
                  : { scale: [1, 1.4, 1], opacity: [0.7, 0.15, 0.7] }
              }
              transition={
                reducedMotion
                  ? {}
                  : { duration: 3, delay: CENTER_DELAY + 1, repeat: Infinity, ease: 'easeInOut' }
              }
            />

            {/* Glass sphere */}
            <div
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(139,92,246,0.85), rgba(236,72,153,0.85))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow:
                  '0 0 30px rgba(139,92,246,0.8), 0 0 60px rgba(236,72,153,0.35), 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
                }}
              />
              <span className="text-white font-bold text-xl leading-none relative z-10">20k+</span>
              <span className="text-white/80 text-xs mt-1 relative z-10">Specialists</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default OrbitalSystem
