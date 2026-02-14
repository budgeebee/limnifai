import React, { useRef, useEffect, useState } from 'react'

const LiminalHour = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const beamRef = useRef({ x: 0, width: 0, pulse: 0 })
  const pointsRef = useRef({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } })
  const connectionsRef = useRef([])
  const rosesRef = useRef([])
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
      initScene(width, height)
    }

    const initScene = (width, height) => {
      particlesRef.current = []
      for (let i = 0; i < 200; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          color: Math.random() < 0.3 ? '#4a1a6a' : Math.random() < 0.5 ? '#1a1a3a' : '#0a0a1a',
          alpha: Math.random() * 0.5 + 0.1,
          wave: Math.random() * Math.PI * 2
        })
      }

      beamRef.current = {
        x: width / 2,
        width: Math.min(40, width * 0.05),
        pulse: 0
      }

      pointsRef.current = {
        left: { x: width * 0.2, y: height / 2 },
        right: { x: width * 0.8, y: height / 2 }
      }

      connectionsRef.current = []
      rosesRef.current = []
      for (let i = 0; i < 15; i++) {
        rosesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 6 + 4,
          petalCount: 5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          color: `hsl(${330 + Math.random() * 30}, 70%, 60%)`,
          alpha: Math.random() * 0.3 + 0.1,
          float: Math.random() * Math.PI * 2
        })
      }
    }

    const drawParticle = (p, time) => {
      const ctx = canvas.getContext('2d')
      p.x += p.speedX + Math.sin(time * 0.5 + p.wave) * 0.05
      p.y += p.speedY + Math.cos(time * 0.3 + p.wave) * 0.05
      if (p.x < 0) p.x = dimensions.width
      if (p.x > dimensions.width) p.x = 0
      if (p.y < 0) p.y = dimensions.height
      if (p.y > dimensions.height) p.y = 0

      const pulse = Math.sin(time * 2 + p.wave) * 0.3 + 0.7
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2)
      ctx.fillStyle = p.color.replace(')', `, ${p.alpha * pulse})`).replace('rgb', 'rgba')
      ctx.fill()
    }

    const drawBeam = (time) => {
      const ctx = canvas.getContext('2d')
      const beam = beamRef.current
      const pulse = Math.sin(time * 0.8) * 0.5 + 0.5
      const width = beam.width * (0.8 + pulse * 0.4)

      const gradient = ctx.createLinearGradient(beam.x - width / 2, 0, beam.x + width / 2, 0)
      gradient.addColorStop(0, 'rgba(74, 26, 106, 0)')
      gradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.3)')
      gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.6)')
      gradient.addColorStop(0.7, 'rgba(255, 215, 0, 0.3)')
      gradient.addColorStop(1, 'rgba(74, 26, 106, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(beam.x - width / 2, 0, width, dimensions.height)

      const innerWidth = width * 0.3
      const innerGradient = ctx.createLinearGradient(beam.x - innerWidth / 2, 0, beam.x + innerWidth / 2, 0)
      innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      innerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)')
      innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = innerGradient
      ctx.fillRect(beam.x - innerWidth / 2, 0, innerWidth, dimensions.height)

      const sparkleCount = 5
      for (let i = 0; i < sparkleCount; i++) {
        const y = (time * 0.05 + i / sparkleCount) % 1 * dimensions.height
        const sparkleSize = Math.sin(time * 3 + i) * 2 + 3
        ctx.beginPath()
        ctx.arc(beam.x, y, sparkleSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(time * 5 + i) * 0.3})`
        ctx.fill()
      }
    }

    const drawPoints = (time) => {
      const ctx = canvas.getContext('2d')
      const points = pointsRef.current

      const drawPoint = (x, y, color) => {
        const pulse = Math.sin(time * 2) * 0.3 + 0.7
        const radius = 10 * pulse

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2)
        gradient.addColorStop(0, color.replace(')', `, ${pulse})`).replace('rgb', 'rgba'))
        gradient.addColorStop(1, color.replace(')', `, 0)`).replace('rgb', 'rgba'))

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, radius * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.8})`
        ctx.fill()
      }

      drawPoint(points.left.x, points.left.y, 'rgba(255, 107, 139, 0.8)')
      drawPoint(points.right.x, points.right.y, 'rgba(106, 90, 205, 0.8)')

      if (Math.sin(time * 0.7) > 0.9) {
        connectionsRef.current.push({
          from: points.left,
          to: points.right,
          progress: 0,
          speed: 0.02,
          color: `rgba(255, 215, 0, ${0.5 + Math.random() * 0.3})`
        })
      }
    }

    const drawConnections = (time) => {
      const ctx = canvas.getContext('2d')
      const connections = connectionsRef.current

      for (let i = connections.length - 1; i >= 0; i--) {
        const conn = connections[i]
        conn.progress += conn.speed

        const x1 = conn.from.x
        const y1 = conn.from.y
        const x2 = conn.to.x
        const y2 = conn.to.y

        const currentX = x1 + (x2 - x1) * conn.progress
        const currentY = y1 + (y2 - y1) * conn.progress

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(currentX, currentY)
        ctx.strokeStyle = conn.color.replace(')', `, ${0.7 * (1 - conn.progress)})`).replace('rgb', 'rgba')
        ctx.lineWidth = 2
        ctx.stroke()

        const sparkSize = Math.sin(time * 10) * 2 + 3
        ctx.beginPath()
        ctx.arc(currentX, currentY, sparkSize, 0, Math.PI * 2)
        ctx.fillStyle = conn.color.replace(')', `, ${0.9 * (1 - conn.progress)})`).replace('rgb', 'rgba')
        ctx.fill()

        if (conn.progress >= 1) {
          connections.splice(i, 1)
        }
      }
    }

    const drawRoses = (time) => {
      const ctx = canvas.getContext('2d')
      const roses = rosesRef.current

      roses.forEach(rose => {
        rose.rotation += rose.rotationSpeed
        const floatY = Math.sin(time * 0.5 + rose.float) * 5

        ctx.save()
        ctx.translate(rose.x, rose.y + floatY)
        ctx.rotate(rose.rotation)

        for (let i = 0; i < rose.petalCount; i++) {
          const angle = (i / rose.petalCount) * Math.PI * 2
          const petalX = Math.cos(angle) * rose.size * 0.8
          const petalY = Math.sin(angle) * rose.size * 0.5

          ctx.beginPath()
          ctx.ellipse(petalX, petalY, rose.size * 0.6, rose.size * 0.3, 0, 0, Math.PI * 2)
          ctx.fillStyle = rose.color.replace(')', `, ${rose.alpha})`).replace('rgb', 'rgba')
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(0, 0, rose.size * 0.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 215, 0, ${rose.alpha * 1.5})`
        ctx.fill()

        ctx.restore()
      })
    }

    const drawMouseInfluence = (time) => {
      if (!mouseRef.current.active) return
      const ctx = canvas.getContext('2d')
      const { x, y } = mouseRef.current

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100)
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.1)')
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)')

      ctx.beginPath()
      ctx.arc(x, y, 100, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      particlesRef.current.forEach(p => {
        const dx = p.x - x
        const dy = p.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          p.x += dx * 0.01
          p.y += dy * 0.01
        }
      })

      const cursorPulse = Math.sin(time * 5) * 0.3 + 0.7
      ctx.beginPath()
      ctx.arc(x, y, 4 * cursorPulse, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 215, 0, ${0.8 * cursorPulse})`
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x, y, 10 * cursorPulse, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 107, 139, ${0.3 * cursorPulse})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const animate = (currentTime) => {
      const time = currentTime / 1000
      timeRef.current = time
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = '#0a0a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawBeam(time)
      drawPoints(time)
      drawConnections(time)
      particlesRef.current.forEach(p => drawParticle(p, time))
      drawRoses(time)
      drawMouseInfluence(time)

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current.x = touch.clientX - rect.left
      mouseRef.current.y = touch.clientY - rect.top
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchstart', handleTouchMove, { passive: false })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchend', handleMouseLeave)
    resizeCanvas()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchend', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div style={{
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: '#0a0a1a',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      cursor: 'none'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 215, 0, 0.7)',
        fontFamily: 'monospace',
        fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
        opacity: 0.8,
        textAlign: 'center',
        pointerEvents: 'none',
        textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
        letterSpacing: '0.2em'
      }}>
        THE LIMINAL HOUR • 3 AM
      </div>
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 107, 139, 0.5)',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        opacity: 0.6,
        textAlign: 'center',
        pointerEvents: 'none',
        maxWidth: '80%',
        lineHeight: 1.5
      }}>
        threshold between night and day • analog and digital • human and machine
        <br />
        a meditation on connection across time and space
      </div>
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        color: 'rgba(106, 90, 205, 0.4)',
        fontFamily: 'monospace',
        fontSize: '0.7rem',
        opacity: 0.5,
        pointerEvents: 'none'
      }}>
        {dimensions.width}×{dimensions.height}
      </div>
    </div>
  )
}

export default LiminalHour
