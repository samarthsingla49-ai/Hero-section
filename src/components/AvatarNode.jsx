import React from 'react'
import { motion } from 'framer-motion'

function getGlowColor(gradient) {
  if (!gradient) return 'rgba(139,92,246,0.65)'
  if (gradient.includes('f59e0b')) return 'rgba(245,158,11,0.65)'
  if (gradient.includes('ef4444')) return 'rgba(239,68,68,0.65)'
  if (gradient.includes('8b5cf6')) return 'rgba(139,92,246,0.65)'
  if (gradient.includes('ec4899')) return 'rgba(236,72,153,0.65)'
  if (gradient.includes('06b6d4')) return 'rgba(6,182,212,0.65)'
  if (gradient.includes('10b981')) return 'rgba(16,185,129,0.65)'
  if (gradient.includes('3b82f6')) return 'rgba(59,130,246,0.65)'
  return 'rgba(139,92,246,0.65)'
}

function GlassBubble({ background, glow, depthFactor, children }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
      style={{
        background,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: [
          `0 ${Math.round(4 * depthFactor)}px ${Math.round(18 * depthFactor)}px ${glow}`,
          `0 ${Math.round(2 * depthFactor)}px ${Math.round(8 * depthFactor)}px rgba(0,0,0,0.35)`,
          'inset 0 1px 0 rgba(255,255,255,0.28)',
        ].join(', '),
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* Top glass highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
      />
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </div>
  )
}

function InitialAvatar({ initials, gradient, depthFactor }) {
  const glow = getGlowColor(gradient)
  return (
    <GlassBubble background={gradient} glow={glow} depthFactor={depthFactor}>
      <span className="text-white font-semibold text-sm">{initials}</span>
    </GlassBubble>
  )
}

function IconAvatar({ icon, depthFactor }) {
  const icons = {
    check: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    star: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
    message: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  }

  return (
    <GlassBubble
      background="linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.9))"
      glow="rgba(139,92,246,0.65)"
      depthFactor={depthFactor}
    >
      {icons[icon] || icons.star}
    </GlassBubble>
  )
}

function AvatarNode({ initials, gradient, icon, nodeIndex, zDepth, reducedMotion }) {
  // Each avatar floats at a slightly different rhythm
  const floatDelay = (nodeIndex * 0.65) % 3.5
  const floatDuration = 3 + (nodeIndex * 0.4) % 1.8
  const floatAmount = 5 + (nodeIndex % 3)

  // Closer rings (high zDepth) cast stronger shadows / look more vivid
  const depthFactor = zDepth > 0 ? 1 : zDepth === 0 ? 0.65 : 0.35

  return (
    <motion.div
      style={{ cursor: 'pointer', transformStyle: 'preserve-3d' }}
      animate={
        reducedMotion
          ? {}
          : { y: [0, -floatAmount, 0] }
      }
      transition={
        reducedMotion
          ? {}
          : {
              y: { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' },
            }
      }
      whileHover={{ scale: 1.22 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon ? (
        <IconAvatar icon={icon} depthFactor={depthFactor} />
      ) : (
        <InitialAvatar initials={initials} gradient={gradient} depthFactor={depthFactor} />
      )}
    </motion.div>
  )
}

export default AvatarNode
