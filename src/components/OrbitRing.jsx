import React from 'react'
import { motion } from 'framer-motion'
import AvatarNode from './AvatarNode'

function OrbitRing({ radius, duration, nodes, reverse, reducedMotion }) {
  const size = radius * 2
  const offset = radius

  return (
    <div
      className="absolute rounded-full border border-white/10"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -offset,
        marginTop: -offset,
      }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={reducedMotion ? {} : { rotate: reverse ? -360 : 360 }}
        transition={
          reducedMotion
            ? {}
            : {
                duration,
                repeat: Infinity,
                ease: 'linear',
              }
        }
      >
        {nodes.map((node, index) => {
          const angle = node.angle
          const rad = (angle * Math.PI) / 180
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
              }}
            >
              <motion.div
                animate={reducedMotion ? {} : { rotate: reverse ? 360 : -360 }}
                transition={
                  reducedMotion
                    ? {}
                    : {
                        duration,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                }
              >
                <AvatarNode
                  initials={node.initials}
                  gradient={node.gradient}
                  icon={node.icon}
                  angle={0}
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
