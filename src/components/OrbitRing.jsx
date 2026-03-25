import React from 'react'
import { motion } from 'framer-motion'
import AvatarNode from './AvatarNode'

function OrbitRing({ radius, duration, nodes, reverse, reducedMotion, zDepth, ringIndex }) {
  const size = radius * 2
  const offset = radius

  // Rings closer to viewer are brighter and have more glow
  const depthFactor = zDepth > 0 ? 1 : zDepth === 0 ? 0.6 : 0.3
  const borderOpacity = 0.06 + depthFactor * 0.18
  const glowSpread = Math.round(depthFactor * 18)
  const glowOpacity = depthFactor * 0.35

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -offset,
        marginTop: -offset,
        transform: `translateZ(${zDepth}px)`,
        transformStyle: 'preserve-3d',
        border: `1px solid rgba(180, 160, 255, ${borderOpacity})`,
        boxShadow: [
          `0 0 ${glowSpread}px rgba(139,92,246,${glowOpacity})`,
          `inset 0 0 ${Math.round(glowSpread / 2)}px rgba(139,92,246,${glowOpacity * 0.5})`,
        ].join(', '),
      }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={reducedMotion ? {} : { rotate: reverse ? -360 : 360 }}
        transition={
          reducedMotion
            ? {}
            : { duration, repeat: Infinity, ease: 'linear' }
        }
      >
        {nodes.map((node, index) => {
          const rad = (node.angle * Math.PI) / 180
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x - 24}px, ${y - 24}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={reducedMotion ? {} : { rotate: reverse ? 360 : -360 }}
                transition={
                  reducedMotion
                    ? {}
                    : { duration, repeat: Infinity, ease: 'linear' }
                }
              >
                <AvatarNode
                  initials={node.initials}
                  gradient={node.gradient}
                  icon={node.icon}
                  nodeIndex={ringIndex * 10 + index}
                  zDepth={zDepth}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default OrbitRing
