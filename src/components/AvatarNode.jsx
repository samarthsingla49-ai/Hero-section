import React from 'react'
import { motion } from 'framer-motion'

function InitialAvatar({ initials, gradient }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg"
      style={{ background: gradient }}
    >
      {initials}
    </div>
  )
}

function IconAvatar({ icon }) {
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
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
    >
      {icons[icon] || icons.star}
    </div>
  )
}

function AvatarNode({ initials, gradient, icon, angle }) {
  return (
    <div
      className="absolute"
      style={{
        transform: `rotate(${angle}deg) translateX(0)`,
        left: '50%',
        top: '50%',
        marginLeft: '-24px',
        marginTop: '-24px',
      }}
    >
      <motion.div
        style={{ transform: `rotate(-${angle}deg)` }}
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon ? (
          <IconAvatar icon={icon} />
        ) : (
          <InitialAvatar initials={initials} gradient={gradient} />
        )}
      </motion.div>
    </div>
  )
}

export default AvatarNode
