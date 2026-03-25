import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import OrbitalSystem from './OrbitalSystem'
import StarField from './StarField'

// Easing: rockets in fast, lands with a tiny overshoot
const WARP_EASE = [0.16, 1, 0.3, 1]

function Hero() {
  return (
    <main
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #1a0533 100%)',
      }}
    >
      {/* Warp star field — plays on load then disappears */}
      <StarField duration={2400} />

      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Navigation />

        <section className="grid md:grid-cols-2 gap-12 items-center px-8 py-16 md:py-24">
          {/* Left column — text warps in from deep Z-space */}
          <div className="flex flex-col gap-6">
            {/* Headline: zooms in from far away */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, scale: 0.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.25, ease: WARP_EASE }}
            >
              Unlock{' '}
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Top Marketing
              </span>{' '}
              Talent
            </motion.h1>

            {/* Paragraph — slides up after headline lands */}
            <motion.p
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: 'easeOut' }}
            >
              Connect with vetted marketing specialists who deliver results. From strategy to
              execution, find the perfect talent for your growth goals.
            </motion.p>

            {/* Buttons — last to appear */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.75, ease: 'easeOut' }}
            >
              <button
                className="relative px-8 py-4 rounded-full text-white font-semibold text-base shadow-xl transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
                aria-label="Start a project with Marketeam"
              >
                Start Project
              </button>

              {/* Social proof */}
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

          {/* Right column — OrbitalSystem handles its own warp entrance */}
          <div className="flex items-center justify-center">
            <OrbitalSystem />
          </div>
        </section>
      </div>
    </main>
  )
}

export default Hero
