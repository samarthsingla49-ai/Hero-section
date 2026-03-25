import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import OrbitRing from './OrbitRing'
import ShockWave from './ShockWave'

const SPRING = { type: 'spring', stiffness: 65, damping: 13 }
const SCATTER_FADE = { duration: 0.5, ease: 'easeOut' }

// Center sphere scatter: starts deep behind + tiny, implodes to final position
const CENTER_SCATTER = { scale: 0.06, opacity: 0 }
const CENTER_ASSEMBLED = { scale: 1, opacity: 1 }

const orbitData = [
  {
    radius: 140,
    duration: 30,
    reverse: false,
    zDepth: 90,
    ringIndex: 0,
    ringAssemblyDelay: 0.05,
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
    ringAssemblyDelay: 0.15,
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
    ringAssemblyDelay: 0.25,
    nodes: [
      { initials: 'LP', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)', angle: 0 },
      { initials: 'DN', gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', angle: 90 },
      { icon: 'message', angle: 180 },
      { initials: 'RW', gradient: 'linear-gradient(135deg, #10b981, #3b82f6)', angle: 270 },
    ],
  },
]

function OrbitalSystem({ phase }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef(null)

  // Scene starts flat (0deg), tilts to HUD angle (12deg) when assembled
  const mouseXMV = useMotionValue(0)
  const mouseYMV = useMotionValue(0)
  const rotateY = useSpring(mouseXMV, { stiffness: 60, damping: 20 })
  const rotateX = useSpring(mouseYMV, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Tilt into HUD angle when assembled
  useEffect(() => {
    if (phase === 'assembled') mouseYMV.set(12)
  }, [phase])

  const handleMouseMove = (e) => {
    if (!containerRef.current || reducedMotion || phase !== 'assembled') return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    mouseXMV.set(nx * 8)
    mouseYMV.set(12 + -ny * 6)
  }

  const handleMouseLeave = () => {
    if (phase !== 'assembled') return
    mouseXMV.set(0)
    mouseYMV.set(12)
  }

  const isAssembling = phase === 'assembling' || phase === 'assembled'
  const isScattered  = phase === 'scattered'

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: 600, height: 600, perspective: '1200px', perspectiveOrigin: 'center center' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute w-40 h-40 rounded-full bg-pink-500/15 blur-2xl" />
      </div>

      {/* 3D scene — flat during scatter, tilts to HUD angle on assembly */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
      >
        {/* Orbit rings */}
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
            ringAssemblyDelay={ring.ringAssemblyDelay}
            phase={phase}
          />
        ))}

        {/* Center sphere — first to snap into place, most elevated */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{ translateZ: 140, transformStyle: 'preserve-3d' }}
          initial={CENTER_SCATTER}
          animate={isAssembling ? CENTER_ASSEMBLED : { ...CENTER_SCATTER, opacity: isScattered ? 0.35 : 0 }}
          transition={isScattered ? SCATTER_FADE : { ...SPRING, delay: 0.0 }}
        >
          {/* Idle float — only after fully assembled */}
          <motion.div
            animate={reducedMotion || phase !== 'assembled' ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Pulsing halo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 130, height: 130,
                top: '50%', left: '50%',
                marginLeft: -65, marginTop: -65,
                background: 'radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)',
              }}
              animate={reducedMotion || phase !== 'assembled' ? {} : { scale: [1, 1.4, 1], opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
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
              <div
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)' }}
              />
              <span className="text-white font-bold text-xl leading-none relative z-10">20k+</span>
              <span className="text-white/80 text-xs mt-1 relative z-10">Specialists</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Shockwave rings — fire the moment everything snaps in */}
        <AnimatePresence>
          {phase === 'assembled' && <ShockWave key="shockwave" />}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default OrbitalSystem
