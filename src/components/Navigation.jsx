import React from 'react'
import { motion } from 'framer-motion'

const navItems = ['Your Team', 'Solutions', 'Blog', 'Pricing']

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 text-white font-bold text-xl">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="url(#logoGrad)" />
        <circle cx="16" cy="16" r="6" fill="white" opacity="0.9" />
        <circle cx="16" cy="8" r="3" fill="white" opacity="0.6" />
        <circle cx="24" cy="20" r="3" fill="white" opacity="0.6" />
        <circle cx="8" cy="20" r="3" fill="white" opacity="0.6" />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      Marketeam
    </a>
  )
}

function Navigation() {
  return (
    <motion.nav
      className="flex items-center justify-between px-8 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo />

      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button className="text-white/70 hover:text-white transition-colors text-sm font-medium px-4 py-2">
          Log In
        </button>
        <button className="bg-white text-gray-900 hover:bg-white/90 transition-colors text-sm font-semibold px-5 py-2.5 rounded-full">
          Join Now
        </button>
      </div>
    </motion.nav>
  )
}

export default Navigation
