import React from 'react'
import { motion } from 'framer-motion'

// Shockwave rings that explode outward when all pieces snap into place
export default function ShockWave() {
  const rings = [
    { delay: 0,    scale: 8,   opacity: 0.9, duration: 0.65 },
    { delay: 0.12, scale: 6,   opacity: 0.6, duration: 0.75 },
    { delay: 0.25, scale: 4.5, opacity: 0.4, duration: 0.85 },
  ]

  return (
    <>
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.95)',
            left: '50%',
            top: '50%',
            marginLeft: -48,
            marginTop: -48,
            translateZ: 140,
            pointerEvents: 'none',
          }}
          initial={{ scale: 0.8, opacity: ring.opacity }}
          animate={{ scale: ring.scale, opacity: 0 }}
          transition={{ duration: ring.duration, delay: ring.delay, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}
