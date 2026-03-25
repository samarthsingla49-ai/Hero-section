import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import OrbitalSystem from './OrbitalSystem'

// Shared spring for all assembly snaps
const SPRING = { type: 'spring', stiffness: 65, damping: 13 }
// Fade-in at scatter positions
const SCATTER_FADE = { duration: 0.5, ease: 'easeOut' }

// Each word group has a deterministic scatter position
const HEADLINE_SCATTER = [
  { x: -380, y: -210, rotate: -28, scale: 0.5,  assemblyDelay: 0.1  },
  { x:  300, y: -175, rotate:  22, scale: 0.55, assemblyDelay: 0.2  },
  { x:  230, y:  265, rotate: -18, scale: 0.5,  assemblyDelay: 0.3  },
]

// Animate a single word / phrase shard
function TextShard({ children, scatter, phase, style }) {
  const isHidden     = phase === 'hidden'
  const isScattered  = phase === 'scattered'
  const isAssembling = phase === 'assembling' || phase === 'assembled'

  const scatterState = {
    x: scatter.x, y: scatter.y,
    rotate: scatter.rotate, scale: scatter.scale,
    opacity: isHidden ? 0 : 0.55,
  }
  const assembledState = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }

  return (
    <motion.span
      className="inline-block"
      style={style}
      initial={{ ...scatterState, opacity: 0 }}
      animate={isAssembling ? assembledState : scatterState}
      transition={isScattered ? SCATTER_FADE : { ...SPRING, delay: scatter.assemblyDelay }}
    >
      {children}
    </motion.span>
  )
}

function Hero() {
  // Phase machine: hidden → scattered → assembling → assembled
  const [phase, setPhase] = useState('hidden')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('scattered'),  150)
    const t2 = setTimeout(() => setPhase('assembling'), 900)
    const t3 = setTimeout(() => setPhase('assembled'),  2700)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <main
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #1a0533 100%)',
      }}
    >
      {/* White flash burst when all pieces snap into place */}
      <AnimatePresence>
        {phase === 'assembled' && (
          <motion.div
            key="flash"
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 200, background: 'white' }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Navigation />

        <section className="grid md:grid-cols-2 gap-12 items-center px-8 py-16 md:py-24">
          {/* Left column — each piece is a scattered shard */}
          <div className="flex flex-col gap-6">
            {/* Headline — 3 word groups, each a separate shard */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <TextShard scatter={HEADLINE_SCATTER[0]} phase={phase}>
                Unlock{' '}
              </TextShard>
              <TextShard
                scatter={HEADLINE_SCATTER[1]}
                phase={phase}
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Top Marketing
              </TextShard>
              {' '}
              <TextShard scatter={HEADLINE_SCATTER[2]} phase={phase}>
                Talent
              </TextShard>
            </h1>

            {/* Paragraph shard */}
            <motion.p
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md"
              initial={{ x: -210, y: 90, rotate: 14, scale: 0.55, opacity: 0 }}
              animate={
                phase === 'hidden' || phase === 'scattered'
                  ? { x: -210, y: 90, rotate: 14, scale: 0.55, opacity: phase === 'scattered' ? 0.45 : 0 }
                  : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
              }
              transition={
                phase === 'scattered' ? SCATTER_FADE : { ...SPRING, delay: 0.45 }
              }
            >
              Connect with vetted marketing specialists who deliver results. From strategy to
              execution, find the perfect talent for your growth goals.
            </motion.p>

            {/* Button row shard */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2"
              initial={{ x: 190, y: 130, rotate: -16, scale: 0.5, opacity: 0 }}
              animate={
                phase === 'hidden' || phase === 'scattered'
                  ? { x: 190, y: 130, rotate: -16, scale: 0.5, opacity: phase === 'scattered' ? 0.4 : 0 }
                  : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
              }
              transition={
                phase === 'scattered' ? SCATTER_FADE : { ...SPRING, delay: 0.6 }
              }
            >
              <button
                className="relative px-8 py-4 rounded-full text-white font-semibold text-base shadow-xl transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
                aria-label="Start a project with Marketeam"
              >
                Start Project
              </button>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#8B5CF6', '#EC4899', '#F59E0B'].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-white text-xs font-medium"
                      style={{ background: color }}
                    >
                      {['D', 'A', 'M'][i]}
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm">
                  <span className="text-white font-semibold">David</span> and 2.5k others joined
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column — OrbitalSystem manages its own shards */}
          <div className="flex items-center justify-center">
            <OrbitalSystem phase={phase} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default Hero
