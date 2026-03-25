import React from 'react'
import { motion } from 'framer-motion'
import AvatarNode from './AvatarNode'

const SPRING = { type: 'spring', stiffness: 65, damping: 13 }
const SCATTER_FADE = { duration: 0.5, ease: 'easeOut' }

// Each ring scatters to a unique 3D position
const RING_SCATTER = [
  { x: -330, y: -270, rotateX:  85, rotateZ: -42, scale: 0.35 },
  { x:  370, y:  290, rotateX: -72, rotateZ:  58, scale: 0.40 },
  { x: -175, y:  325, rotateX:  58, rotateZ:  28, scale: 0.45 },
]

function OrbitRing({ radius, duration, nodes, reverse, reducedMotion, zDepth, ringIndex, ringAssemblyDelay, phase }) {
  const size   = radius * 2
  const offset = radius

  const depthFactor   = zDepth > 0 ? 1 : zDepth === 0 ? 0.6 : 0.3
  const borderOpacity = 0.06 + depthFactor * 0.18
  const glowSpread    = Math.round(depthFactor * 18)
  const glowOpacity   = depthFactor * 0.35

  const scatter = RING_SCATTER[ringIndex]

  const isHidden     = phase === 'hidden'
  const isScattered  = phase === 'scattered'
  const isAssembling = phase === 'assembling' || phase === 'assembled'

  const scatteredState = {
    x: scatter.x, y: scatter.y,
    rotateX: scatter.rotateX, rotateZ: scatter.rotateZ,
    scale: scatter.scale,
    opacity: isHidden ? 0 : 0.45,
  }
  const assembledState = { x: 0, y: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1 }

  // Orbit spin starts only after assembled
  const shouldSpin = !reducedMotion && phase === 'assembled'

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -offset,
        marginTop: -offset,
        // z handled by framer-motion — do NOT use CSS transform here
        z: zDepth,
        transformStyle: 'preserve-3d',
        border: `1px solid rgba(180,160,255,${borderOpacity})`,
        boxShadow: [
          `0 0 ${glowSpread}px rgba(139,92,246,${glowOpacity})`,
          `inset 0 0 ${Math.round(glowSpread / 2)}px rgba(139,92,246,${glowOpacity * 0.5})`,
        ].join(', '),
      }}
      initial={{ ...scatteredState, opacity: 0 }}
      animate={isAssembling ? assembledState : scatteredState}
      transition={isScattered ? SCATTER_FADE : { ...SPRING, delay: ringAssemblyDelay }}
    >
      {/* Ring spin wrapper — only spins when assembled */}
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={shouldSpin ? { rotate: reverse ? -360 : 360 } : {}}
        transition={shouldSpin ? { duration, repeat: Infinity, ease: 'linear' } : {}}
      >
        {nodes.map((node, index) => {
          const rad    = (node.angle * Math.PI) / 180
          const finalX = Math.cos(rad) * radius - 24   // final orbital position
          const finalY = Math.sin(rad) * radius - 24

          // Scatter: push each avatar radially outward ~3.8× further than its orbit
          const scatterX = Math.cos(rad) * radius * 3.8 - 24
          const scatterY = Math.sin(rad) * radius * 3.8 - 24

          // Avatar assembles just after its ring
          const avatarDelay = ringAssemblyDelay + 0.2 + index * 0.09

          const nodeScattered = { x: scatterX, y: scatterY, scale: 0.35, opacity: isHidden ? 0 : 0.5 }
          const nodeAssembled = { x: finalX,   y: finalY,   scale: 1,    opacity: 1 }

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: '50%', top: '50%', transformStyle: 'preserve-3d' }}
              initial={{ ...nodeScattered, opacity: 0 }}
              animate={isAssembling ? nodeAssembled : nodeScattered}
              transition={isScattered ? SCATTER_FADE : { ...SPRING, delay: avatarDelay }}
            >
              {/* Counter-rotate to keep avatar upright — only when assembled */}
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={shouldSpin ? { rotate: reverse ? 360 : -360 } : {}}
                transition={shouldSpin ? { duration, repeat: Infinity, ease: 'linear' } : {}}
              >
                <AvatarNode
                  initials={node.initials}
                  gradient={node.gradient}
                  icon={node.icon}
                  nodeIndex={ringIndex * 10 + index}
                  zDepth={zDepth}
                  reducedMotion={reducedMotion}
                  phase={phase}
                />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default OrbitRing
