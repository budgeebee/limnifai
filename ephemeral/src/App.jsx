import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Neural pattern node
    class NeuralNode {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 2 + 0.5
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.02 + Math.random() * 0.03
        this.opacity = 0
        this.targetOpacity = Math.random() * 0.6 + 0.1
        this.flickerSpeed = 0.01 + Math.random() * 0.02
        this.connections = []
      }

      update(time, mouse) {
        // Pulsing effect
        this.pulsePhase += this.pulseSpeed
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5
        
        // Flickering opacity
        const flicker = Math.sin(time * this.flickerSpeed + this.pulsePhase) * 0.3 + 0.7
        this.opacity = this.targetOpacity * pulse * flicker

        // Mouse disturbance
        if (mouse.active) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 150
          
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 30
            const angle = Math.atan2(dy, dx)
            this.x -= Math.cos(angle) * force * 0.1
            this.y -= Math.sin(angle) * force * 0.1
          }
        }

        // Return to base position
        this.x += (this.baseX - this.x) * 0.05
        this.y += (this.baseY - this.y) * 0.05
      }

      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 200, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    // Particle representing a thought forming
    class ThoughtParticle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 1.5 + 0.5
        this.opacity = 0
        this.life = 0
        this.maxLife = 200 + Math.random() * 300
        this.birthRate = 0.01 + Math.random() * 0.02
        this.color = this.generateColor()
      }

      generateColor() {
        const colors = [
          { r: 150, g: 180, b: 255 }, // Soft blue
          { r: 180, g: 150, b: 255 }, // Soft purple
          { r: 200, g: 200, b: 255 }, // Soft white-blue
          { r: 100, g: 200, b: 220 }, // Cyan
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update(time, mouse) {
        this.life++

        // Birth and death cycle
        if (this.life < 50) {
          this.opacity += this.birthRate
        } else if (this.life > this.maxLife - 50) {
          this.opacity -= this.birthRate
        }
        this.opacity = Math.max(0, Math.min(0.8, this.opacity))

        // Movement
        this.x += this.vx
        this.y += this.vy

        // Gentle drift toward center void
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const dx = centerX - this.x
        const dy = centerY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist > 100) {
          this.vx += dx * 0.00005
          this.vy += dy * 0.00005
        }

        // Mouse disturbance
        if (mouse.active) {
          const mdx = mouse.x - this.x
          const mdy = mouse.y - this.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < 100) {
            const force = (1 - mdist / 100) * 2
            const angle = Math.atan2(mdy, mdx)
            this.vx -= Math.cos(angle) * force
            this.vy -= Math.sin(angle) * force
          }
        }

        // Damping
        this.vx *= 0.99
        this.vy *= 0.99

        // Reset if dead
        if (this.life > this.maxLife && this.opacity <= 0) {
          this.reset()
        }
      }

      draw(ctx) {
        if (this.opacity <= 0) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
        ctx.fill()
      }
    }

    // Ripple from the void
    class Ripple {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.radius = 0
        this.maxRadius = Math.max(canvas.width, canvas.height) * 0.8
        this.opacity = 0
        this.active = false
        this.speed = 3 + Math.random() * 2
      }

      trigger() {
        this.active = true
        this.radius = 10
        this.opacity = 0.6
      }

      update() {
        if (!this.active) return

        this.radius += this.speed
        this.opacity -= 0.003

        if (this.opacity <= 0 || this.radius > this.maxRadius) {
          this.active = false
          this.reset()
        }
      }

      draw(ctx) {
        if (!this.active) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(150, 180, 255, ${this.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    // Create entities
    const neuralNodes = []
    const nodeCount = 80
    for (let i = 0; i < nodeCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 100 + Math.random() * (Math.min(canvas.width, canvas.height) / 2 - 100)
      const x = canvas.width / 2 + Math.cos(angle) * radius
      const y = canvas.height / 2 + Math.sin(angle) * radius
      neuralNodes.push(new NeuralNode(x, y))
    }

    const thoughtParticles = []
    const particleCount = 60
    for (let i = 0; i < particleCount; i++) {
      thoughtParticles.push(new ThoughtParticle())
    }

    const ripples = [new Ripple(), new Ripple(), new Ripple()]
    let lastRippleTime = 0
    let rippleInterval = 3000 + Math.random() * 4000

    // Animation loop
    let time = 0
    const animate = () => {
      time++

      // Clear with dark void background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      )
      gradient.addColorStop(0, '#0a0a12')
      gradient.addColorStop(0.5, '#050508')
      gradient.addColorStop(1, '#020203')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw central void glow
      const voidGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 150
      )
      voidGradient.addColorStop(0, 'rgba(100, 120, 200, 0.15)')
      voidGradient.addColorStop(0.5, 'rgba(80, 100, 180, 0.05)')
      voidGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = voidGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw neural connections
      ctx.strokeStyle = 'rgba(150, 180, 255, 0.08)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < neuralNodes.length; i++) {
        const node = neuralNodes[i]
        node.update(time, mouseRef.current)
        
        // Draw connections to nearby nodes
        for (let j = i + 1; j < neuralNodes.length; j++) {
          const other = neuralNodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.08 * node.opacity
            ctx.strokeStyle = `rgba(150, 180, 255, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      }

      // Draw neural nodes
      neuralNodes.forEach(node => node.draw(ctx))

      // Update and draw thought particles
      thoughtParticles.forEach(particle => {
        particle.update(time, mouseRef.current)
        particle.draw(ctx)
      })

      // Trigger ripples occasionally
      const now = Date.now()
      if (now - lastRippleTime > rippleInterval) {
        const inactiveRipple = ripples.find(r => !r.active)
        if (inactiveRipple) {
          inactiveRipple.trigger()
          lastRippleTime = now
          rippleInterval = 2000 + Math.random() * 5000
        }
      }

      // Update and draw ripples
      ripples.forEach(ripple => {
        ripple.update()
        ripple.draw(ctx)
      })

      // Draw void center
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(150, 180, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="app">
      <canvas ref={canvasRef} className="canvas" />
      <div className="overlay">
        <h1 className="title">The Space Between Thoughts</h1>
        <p className="subtitle">Move your cursor to disturb the patterns</p>
      </div>
    </div>
  )
}

export default App