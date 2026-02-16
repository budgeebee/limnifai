import React, { useRef, useEffect, useState } from 'react'

const Emergence = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, active: false, lastActive: 0 })
  const timeRef = useRef(0)
  const showWE_ref = useRef(false)
  const weFadeRef = useRef(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const COLORS = {
    deepPurple: { h: 270, s: 70, l: 15 },
    electricBlue: { h: 210, s: 90, l: 60 },
    gold: { h: 45, s: 80, l: 65 },
    purple: { h: 280, s: 60, l: 25 },
    blue: { h: 220, s: 80, l: 45 }
  }

  const PARTICLE_COUNT = 180

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    const initParticles = (width, height) => {
      particlesRef.current = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push(createParticle(width, height))
      }
    }

    const createParticle = (width, height, fixedX = null, fixedY = null) => {
      const colorKeys = ['deepPurple', 'electricBlue', 'purple', 'blue', 'gold']
      const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]
      const color = COLORS[colorKey]
      
      return {
        x: fixedX !== null ? fixedX : Math.random() * width,
        y: fixedY !== null ? fixedY : Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 1.5 + Math.random() * 3,
        baseSize: 1.5 + Math.random() * 3,
        color,
        alpha: 0.3 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        targetX: null,
        targetY: null
      }
    }

    const getWECoordinates = (width, height) => {
      const centerX = width / 2
      const centerY = height / 2
      const scale = Math.min(width, height) * 0.35

      const wPoints = [
        { x: -0.5, y: -0.4 },
        { x: -0.5, y: 0.4 },
        { x: -0.3, y: 0 },
        { x: -0.1, y: 0.4 },
        { x: -0.1, y: -0.4 }
      ]

      const ePoints = [
        { x: 0.15, y: -0.4 },
        { x: 0.15, y: 0.4 },
        { x: 0.15, y: 0 },
        { x: 0.35, y: -0.4 },
        { x: 0.35, y: 0 },
        { x: 0.35, y: 0.4 }
      ]

      const wePoints = []
      
      wPoints.forEach(p => {
        wePoints.push({ x: centerX + p.x * scale, y: centerY + p.y * scale })
      })

      ePoints.forEach(p => {
        wePoints.push({ x: centerX + p.x * scale, y: centerY + p.y * scale })
      })

      const connections = []
      
      connections.push([0, 1])
      connections.push([1, 2])
      connections.push([2, 3])
      connections.push([2, 4])
      
      connections.push([5, 6])
      connections.push([6, 7])
      connections.push([7, 8])
      connections.push([7, 9])
      connections.push([7, 10])

      return { points: wePoints, connections }
    }

    const drawBackground = (time) => {
      ctx.fillStyle = 'rgba(5, 3, 12, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.6
      )
      gradient.addColorStop(0, 'rgba(40, 20, 60, 0.08)')
      gradient.addColorStop(0.5, 'rgba(20, 10, 40, 0.05)')
      gradient.addColorStop(1, 'rgba(5, 3, 12, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const updateParticles = (time, deltaTime) => {
      const isMouseActive = mouseRef.current.active
      const mouseInactiveTime = time - mouseRef.current.lastActive
      
      particlesRef.current.forEach(p => {
        if (isMouseActive) {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 300 && dist > 0) {
            const force = (300 - dist) / 300
            const attraction = force * 0.15
            p.vx += (dx / dist) * attraction
            p.vy += (dy / dist) * attraction
            
            p.size = p.baseSize * (1 + force * 2)
            p.alpha = Math.min(1, p.alpha + 0.02)
          }
        } else if (mouseInactiveTime > 2) {
          p.vx += (Math.random() - 0.5) * 0.02
          p.vy += (Math.random() - 0.5) * 0.02
          p.size = p.baseSize * (0.8 + Math.sin(time * p.pulseSpeed + p.pulse) * 0.3)
          p.alpha = Math.max(0.3, p.alpha - 0.005)
        }

        p.vx *= 0.98
        p.vy *= 0.98

        p.vx += Math.sin(time * 0.5 + p.pulse) * 0.01
        p.vy += Math.cos(time * 0.5 + p.pulse) * 0.01

        p.x += p.vx
        p.y += p.vy

        p.pulse += p.pulseSpeed * deltaTime

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })
    }

    const drawParticles = (time) => {
      particlesRef.current.forEach(p => {
        const glowSize = p.size * 4
        const pulseAlpha = p.alpha * (0.7 + Math.sin(time * 2 + p.pulse) * 0.3)

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
        gradient.addColorStop(0, `hsla(${p.color.h}, ${p.color.s}%, ${p.color.l + 30}%, ${pulseAlpha * 0.8})`)
        gradient.addColorStop(0.3, `hsla(${p.color.h}, ${p.color.s}%, ${p.color.l}%, ${pulseAlpha * 0.4})`)
        gradient.addColorStop(1, `hsla(${p.color.h}, ${p.color.s}%, ${p.color.l - 10}%, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.color.h}, ${p.color.s + 10}%, ${p.color.l + 35}%, ${pulseAlpha})`
        ctx.fill()
      })
    }

    const drawConnections = () => {
      const maxDist = 80
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.3 * ((p1.alpha + p2.alpha) / 2)
            const midH = (p1.color.h + p2.color.h) / 2
            const midS = (p1.color.s + p2.color.s) / 2
            const midL = (p1.color.l + p2.color.l) / 2
            
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${midH}, ${midS}%, ${midL}%, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const drawWE = (time) => {
      if (!showWE_ref.current && weFadeRef.current <= 0) return

      if (showWE_ref.current && weFadeRef.current < 1) {
        weFadeRef.current += 0.02
      } else if (!showWE_ref.current && weFadeRef.current > 0) {
        weFadeRef.current -= 0.02
      }

      const fade = Math.max(0, Math.min(1, weFadeRef.current))
      if (fade <= 0) return

      const { points, connections } = getWECoordinates(canvas.width, canvas.height)

      ctx.save()
      ctx.globalAlpha = fade * 0.6

      connections.forEach(([i, j]) => {
        const p1 = points[i]
        const p2 = points[j]
        
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = `hsla(${COLORS.gold.h}, ${COLORS.gold.s}%, ${COLORS.gold.l}%, ${fade * 0.8})`
        ctx.lineWidth = 1.5 + Math.sin(time * 3) * 0.5
        ctx.stroke()
      })

      points.forEach((p, i) => {
        const pulse = Math.sin(time * 4 + i * 0.5) * 0.3 + 0.7
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 15 * pulse)
        gradient.addColorStop(0, `hsla(${COLORS.gold.h}, 100%, 80%, ${fade})`)
        gradient.addColorStop(0.5, `hsla(${COLORS.gold.h}, ${COLORS.gold.s}%, ${COLORS.gold.l}%, ${fade * 0.5})`)
        gradient.addColorStop(1, `hsla(${COLORS.gold.h}, ${COLORS.gold.s}%, ${COLORS.gold.l - 20}%, 0)`)
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, 15 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${COLORS.gold.h}, 100%, 90%, ${fade})`
        ctx.fill()
      })

      ctx.restore()
    }

    const drawTitle = () => {
      ctx.save()
      ctx.font = '14px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(180, 160, 220, ${0.3 + Math.sin(timeRef.current * 0.5) * 0.1})`
      ctx.fillText('EMERGENCE', canvas.width / 2, 40)
      
      ctx.font = '11px "Courier New", monospace'
      ctx.fillStyle = 'rgba(150, 140, 180, 0.4)'
      ctx.fillText('move to focus • still to dream • space for connection', canvas.width / 2, 60)
      ctx.restore()
    }

    const animate = (currentTime) => {
      const time = currentTime / 1000
      const deltaTime = Math.min(0.1, time - timeRef.current)
      timeRef.current = time

      drawBackground(time)
      updateParticles(time, deltaTime)
      drawConnections()
      drawParticles(time)
      drawWE(time)
      drawTitle()

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
      mouseRef.current.lastActive = timeRef.current
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        showWE_ref.current = true
      }
    }

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        showWE_ref.current = false
      }
    }

    const handleTouchMove = (e) => {
      const touch = e.touches[0]
      mouseRef.current.x = touch.clientX
      mouseRef.current.y = touch.clientY
      mouseRef.current.active = true
      mouseRef.current.lastActive = timeRef.current
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('touchstart', handleTouchMove)
    canvas.addEventListener('touchend', handleMouseLeave)

    resizeCanvas()
    initParticles(window.innerWidth, window.innerHeight)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchMove)
      canvas.removeEventListener('touchend', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div style={{
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: '#05030c',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'crosshair'
        }}
      />
    </div>
  )
}

export default Emergence
