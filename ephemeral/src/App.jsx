import React, { useRef, useEffect, useState } from 'react'
import * as Tone from 'tone'

const Orbital = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const orbsRef = useRef([])
  const threadsRef = useRef([])
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [audioStarted, setAudioStarted] = useState(false)
  const lastLinkRef = useRef(0)
  
  // Audio refs
  const synthRef = useRef(null)
  const droneRef = useRef(null)
  const chimeRef = useRef(null)

  const startAudio = async () => {
    await Tone.start()
    
    // Ambient drone synth
    droneRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 2, decay: 1, sustain: 0.8, release: 4 }
    }).toDestination()
    
    droneRef.current.volume.value = -20
    
    // Chime synth for entanglements
    chimeRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 1 }
    }).toDestination()
    
    chimeRef.current.volume.value = -12
    
    // Start ambient drone
    droneRef.current.triggerAttack(['C3', 'G3', 'C4'])
    
    setAudioStarted(true)
  }

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
    }

    const initScene = (width, height) => {
      orbsRef.current = []
      for (let i = 0; i < 8; i++) {
        orbsRef.current.push(createOrb(width, height, i === 0))
      }
    }

    const createOrb = (width, height, isPlayer = false) => {
      const centerX = width / 2
      const centerY = height / 2
      const orbitRadius = 80 + Math.random() * Math.min(width, height) * 0.25
      const startAngle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 0.4

      return {
        orbitRadius,
        angle: startAngle,
        speed: isPlayer ? 0.5 : speed * (Math.random() > 0.5 ? 1 : -1),
        centerX,
        centerY,
        x: centerX + Math.cos(startAngle) * orbitRadius,
        y: centerY + Math.sin(startAngle) * orbitRadius,
        size: isPlayer ? 12 : 6 + Math.random() * 6,
        hue: isPlayer ? 50 : Math.random() * 60 + 280,
        isPlayer,
        trail: [],
        pulse: Math.random() * Math.PI * 2,
        brightness: 1
      }
    }

    const drawBackground = () => {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#050508'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.4
      )
      gradient.addColorStop(0, 'rgba(20, 10, 30, 0.3)')
      gradient.addColorStop(1, 'rgba(5, 5, 8, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawCenterCathedral = (time) => {
      const ctx = canvas.getContext('2d')
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.05)

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const stonePulse = Math.sin(time * 0.5 + i * 0.5) * 0.3 + 0.7
        const dist = 40 + Math.sin(time * 0.3 + i) * 5

        const x = Math.cos(angle) * dist
        const y = Math.sin(angle) * dist

        ctx.beginPath()
        ctx.arc(x, y, 8 * stonePulse, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${40 + i * 10}, 60%, ${50 + stonePulse * 20}%, ${0.4 + stonePulse * 0.3})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(50, 100%, 80%, ${stonePulse})`
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(0, 0, 20 + Math.sin(time) * 3, 0, Math.PI * 2)
      const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 25)
      coreGradient.addColorStop(0, `hsla(50, 80%, 70%, ${0.8 + Math.sin(time * 2) * 0.2})`)
      coreGradient.addColorStop(0.5, `hsla(40, 60%, 50%, ${0.3 + Math.sin(time * 3) * 0.1})`)
      coreGradient.addColorStop(1, 'hsla(30, 40%, 30%, 0)')
      ctx.fillStyle = coreGradient
      ctx.fill()

      ctx.restore()
    }

    const drawOrb = (orb, time) => {
      const ctx = canvas.getContext('2d')
      
      orb.trail.forEach((point, i) => {
        const alpha = (i / orb.trail.length) * 0.4
        const size = (i / orb.trail.length) * orb.size * 0.5
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${orb.hue}, 70%, 60%, ${alpha})`
        ctx.fill()
      })

      const pulse = Math.sin(time * 3 + orb.pulse) * 0.2 + 0.8
      const glowSize = orb.size * 3 * pulse

      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, glowSize)
      gradient.addColorStop(0, `hsla(${orb.hue}, 80%, 70%, ${0.8 * orb.brightness})`)
      gradient.addColorStop(0.3, `hsla(${orb.hue}, 70%, 50%, ${0.4 * orb.brightness})`)
      gradient.addColorStop(1, `hsla(${orb.hue}, 60%, 40%, 0)`)

      ctx.beginPath()
      ctx.arc(orb.x, orb.y, glowSize, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(orb.x, orb.y, orb.size * pulse, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${orb.hue}, 90%, 80%, ${orb.brightness})`
      ctx.fill()

      ctx.beginPath()
      ctx.arc(orb.x - orb.size * 0.3, orb.y - orb.size * 0.3, orb.size * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * orb.brightness})`
      ctx.fill()
    }

    const updateOrbs = (time, deltaTime) => {
      orbsRef.current.forEach(orb => {
        orb.angle += orb.speed * deltaTime * 0.5

        orb.x = orb.centerX + Math.cos(orb.angle) * orb.orbitRadius
        orb.y = orb.centerY + Math.sin(orb.angle) * orb.orbitRadius

        orb.trail.push({ x: orb.x, y: orb.y })
        if (orb.trail.length > 20) {
          orb.trail.shift()
        }

        if (orb.isPlayer && mouseRef.current.active) {
          const dx = mouseRef.current.x - orb.x
          const dy = mouseRef.current.y - orb.y
          const targetAngle = Math.atan2(dy, dx)
          let angleDiff = targetAngle - orb.angle
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
          orb.angle += angleDiff * 0.02
          orb.orbitRadius += (200 - orb.orbitRadius) * 0.01
        } else if (!orb.isPlayer) {
          orb.orbitRadius += Math.sin(time + orb.pulse) * 0.3
          orb.orbitRadius = Math.max(60, Math.min(Math.min(dimensions.width, dimensions.height) * 0.4, orb.orbitRadius))
        }
      })
    }

    const checkEntanglements = (time) => {
      const playerOrb = orbsRef.current.find(o => o.isPlayer)
      if (!playerOrb) return

      orbsRef.current.forEach(orb => {
        if (orb.isPlayer) return

        const dx = playerOrb.x - orb.x
        const dy = playerOrb.y - orb.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 80 && time - lastLinkRef.current > 0.5) {
          threadsRef.current.push({
            from: { x: playerOrb.x, y: playerOrb.y },
            to: { x: orb.x, y: orb.y },
            life: 1,
            hue: (playerOrb.hue + orb.hue) / 2,
            points: 10
          })

          lastLinkRef.current = time
          setScore(s => s + 10 * (1 + combo))
          setCombo(c => c + c + 1)

          orb.brightness = 2

          // Play chime on entanglement
          if (chimeRef.current && audioStarted) {
            const note = ['C5', 'E5', 'G5', 'B5', 'D6'][Math.floor(Math.random() * 5)]
            chimeRef.current.triggerAttackRelease(note, '8n')
          }

          setTimeout(() => {
            orb.brightness = 1
          }, 500)
        }
      })

      if (time - lastLinkRef.current > 2) {
        setCombo(0)
      }
    }

    const drawThreads = (time) => {
      const ctx = canvas.getContext('2d')

      for (let i = threadsRef.current.length - 1; i >= 0; i--) {
        const thread = threadsRef.current[i]
        thread.life -= 0.015

        if (thread.life <= 0) {
          threadsRef.current.splice(i, 1)
          continue
        }

        const dx = thread.to.x - thread.from.x
        const dy = thread.to.y - thread.from.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const steps = Math.floor(dist / 10)

        for (let j = 0; j < steps; j++) {
          const t = j / steps
          const x = thread.from.x + dx * t
          const y = thread.from.y + dy * t
          const wave = Math.sin(t * Math.PI * 4 + time * 5) * 10 * thread.life

          const perpX = -dy / dist * wave
          const perpY = dx / dist * wave

          ctx.beginPath()
          ctx.arc(x + perpX, y + perpY, 2 * thread.life, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${thread.hue}, 80%, 70%, ${thread.life * 0.8})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.moveTo(thread.from.x, thread.from.y)
        
        const midX = (thread.from.x + thread.to.x) / 2 + Math.sin(time * 3) * 20 * thread.life
        const midY = (thread.from.y + thread.to.y) / 2 + Math.cos(time * 3) * 20 * thread.life
        
        ctx.quadraticCurveTo(midX, midY, thread.to.x, thread.to.y)
        ctx.strokeStyle = `hsla(${thread.hue}, 70%, 60%, ${thread.life * 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    const drawCombo = () => {
      if (combo <= 1) return
      const ctx = canvas.getContext('2d')
      
      ctx.save()
      ctx.font = 'bold 24px monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = `hsla(50, 100%, 70%, ${Math.min(1, combo * 0.2)})`
      ctx.fillText(`${combo}x COMBO!`, canvas.width / 2, canvas.height - 80)
      ctx.restore()
    }

    const animate = (currentTime) => {
      const time = currentTime / 1000
      const deltaTime = Math.min(0.1, time - timeRef.current)
      timeRef.current = time

      drawBackground()
      drawCenterCathedral(time)
      
      updateOrbs(time, deltaTime)
      orbsRef.current.forEach(orb => drawOrb(orb, time))
      
      checkEntanglements(time)
      drawThreads(time)
      drawCombo()

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
    initScene(window.innerWidth, window.innerHeight)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchend', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
      
      // Cleanup audio
      if (droneRef.current) {
        droneRef.current.releaseAll()
      }
    }
  }, [combo])

  return (
    <div style={{
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: '#050508',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      cursor: 'crosshair'
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
        color: 'rgba(255, 220, 150, 0.8)',
        fontFamily: '"Courier New", monospace',
        fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
        letterSpacing: '0.3em',
        textAlign: 'center',
        pointerEvents: 'none',
        textShadow: '0 0 20px rgba(255, 200, 100, 0.5)'
      }}>
        THREADS OF LIGHT
      </div>
      <div style={{
        position: 'absolute',
        top: '4rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 220, 150, 0.6)',
        fontFamily: '"Courier New", monospace',
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: 'bold',
        textAlign: 'center',
        pointerEvents: 'none',
        textShadow: '0 0 30px rgba(255, 200, 100, 0.8)'
      }}>
        {score}
      </div>
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(200, 180, 255, 0.5)',
        fontFamily: '"Courier New", monospace',
        fontSize: '0.75rem',
        textAlign: 'center',
        pointerEvents: 'none',
        maxWidth: '300px',
        lineHeight: 1.6
      }}>
        move your light close to others
        <br />
        entangle briefly, shine together
      </div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'rgba(255, 200, 100, 0.15)',
        fontFamily: '"Courier New", monospace',
        fontSize: '10rem',
        fontWeight: 'bold',
        pointerEvents: 'none',
        opacity: 0.1
      }}>
        ⬡
      </div>
      
      {!audioStarted && (
        <button
          onClick={startAudio}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 220, 150, 0.1)',
            border: '1px solid rgba(255, 220, 150, 0.3)',
            color: 'rgba(255, 220, 150, 0.8)',
            padding: '1rem 2rem',
            fontFamily: '"Courier New", monospace',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 220, 150, 0.2)'
            e.target.style.borderColor = 'rgba(255, 220, 150, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 220, 150, 0.1)'
            e.target.style.borderColor = 'rgba(255, 220, 150, 0.3)'
          }}
        >
          ENTER THE CATHEDRAL 🔊
        </button>
      )}
    </div>
  )
}

export default Orbital
