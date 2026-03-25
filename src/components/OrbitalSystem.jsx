import React, { useState, useEffect } from 'react'
import OrbitRing from './OrbitRing'

const orbitData = [
  {
    radius: 140,
    duration: 30,
    reverse: false,
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 600, height: 600 }}
      aria-hidden="true"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* Orbit rings */}
      {orbitData.map((ring, index) => (
        <OrbitRing
          key={index}
          radius={ring.radius}
          duration={ring.duration}
          nodes={ring.nodes}
          reverse={ring.reverse}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col items-center justify-center shadow-2xl">
          <span className="text-white font-bold text-xl leading-none">20k+</span>
          <span className="text-white/80 text-xs mt-1">Specialists</span>
        </div>
      </div>
    </div>
  )
}

export default OrbitalSystem
