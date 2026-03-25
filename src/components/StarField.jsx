import React, { useEffect, useRef } from 'react'

const NUM_STARS = 160

export default function StarField({ duration = 2400 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const maxZ = 900

    // Initialise stars spread across the field
    const stars = Array.from({ length: NUM_STARS }, () => {
      const z = Math.random() * maxZ
      return {
        x: (Math.random() - 0.5) * 1800,
        y: (Math.random() - 0.5) * 1400,
        z,
        pz: z,
      }
    })

    let startTime = null
    let rafId = null

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Fast warp at start, decelerates toward the end
      const speed = 22 * Math.pow(1 - progress, 0.55) + 1.5

      // Semi-transparent fill creates motion-blur streak trail
      ctx.fillStyle = 'rgba(10, 8, 30, 0.28)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Fade the whole canvas out in the last 30% of duration
      const globalAlpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1

      stars.forEach((star) => {
        star.pz = star.z
        star.z -= speed

        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * 1800
          star.y = (Math.random() - 0.5) * 1400
          star.z = maxZ
          star.pz = maxZ
          return
        }

        // Project 3D → 2D
        const sx = (star.x / star.z) * cx + cx
        const sy = (star.y / star.z) * cy + cy
        const px = (star.x / star.pz) * cx + cx
        const py = (star.y / star.pz) * cy + cy

        const nearness = 1 - star.z / maxZ
        const brightness = nearness * globalAlpha
        const lineWidth = Math.max(0.4, nearness * 2.2)

        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = `rgba(190, 170, 255, ${brightness})`
        ctx.lineWidth = lineWidth
        ctx.stroke()
      })

      if (progress < 1) {
        rafId = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [duration])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
