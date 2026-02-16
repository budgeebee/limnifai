import React, { useRef, useEffect, useState } from 'react'
import * as Tone from 'tone'

const Emergence = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, active: false, lastActive: 0 })
  const timeRef = useRef(0)
  const showWE_ref = useRef(false)
  const weFadeRef = useRef(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  // Audio refs
  const audioInitialized = useRef(false)
  const audioInitializing = useRef(false)
  const droneOsc = useRef(null)
  const droneFilter = useRef(null)
  const chimeSynth = useRef(null)
  const weSynth = useRef(null)
  const lastChimeTime = useRef(0)
  const connectionCount = useRef(0)
  const lastConnectionCount = useRef(0)

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
        color: color,
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
      
      const M = [
        { x: -0.5, y: -0.4 },
        { x: -0.5, y: 0.4 },
        { x: -0.3, y: 0 },
        { x: -0.1, y: 0.4 },
        { x: -0.1, y: -0.4 }
      ]
      
      const E = [
        { x: 0.15, y: -0.4 },
        { x: 0.15, y: 0.4 },
        { x: 0.15, y: 0 },
        { x: 0.35, y: -0.4 },
        { x: 0.35, y: 0 },
        { x: 0.35, y: 0.4 }
      ]
      
      const points = []
      M.forEach(p => points.push({ x: centerX + p.x * scale, y: centerY + p.y * scale }))
      E.forEach(p => points.push({ x: centerX + p.x * scale, y: centerY + p.y * scale }))
      
      const connections = []
      connections.push([0, 1], [1, 2], [2, 3], [2, 4])
      connections.push([5, 6], [6, 7], [7, 8], [7, 9], [7, 10])
      
      return { points, connections }
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

    const drawParticles = (time) => {
      particlesRef.current.forEach(p => {
        const pulse = Math.sin(time * 2 + p.pulse) * 0.3 + 0.7
        const pulseAlpha = p.alpha * pulse
        const glowSize = p.size * 4
        
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
      let currentConnections = 0
      
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

            if (alpha > 0.15) currentConnections++

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${midH}, ${midS}%, ${midL}%, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      
      connectionCount.current = currentConnections
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
      ctx.fillStyle = 'rgba(180, 160, 220, 0.3)'
      ctx.fillText('EMERGENCE', canvas.width / 2, 40)
      ctx.font = '11px "Courier New", monospace'
      ctx.fillStyle = 'rgba(150, 140, 180, 0.4)'
      ctx.fillText('move to focus • still to dream • space for connection', canvas.width / 2, 60)
      ctx.restore()
    }

    // Audio initialization
    const initAudio = async () => {
      if (audioInitialized.current || audioInitializing.current) return
      audioInitializing.current = true
      
      try {
        await Tone.start()
        
        if (Tone.context.state !== 'running') {
          audioInitializing.current = false
          return
        }
        
        // Subtle evolving drone - single oscillator, very slow filter sweep
        droneFilter.current = new Tone.Filter(200, 'lowpass').toDestination()
        droneFilter.current.Q.value = 1
        
        droneOsc.current = new Tone.Oscillator('C2', 'sine').connect(droneFilter.current)
        droneOsc.current.volume.value = -35
        droneOsc.current.start()
        
        // Slow LFO on filter for breathing effect
        const lfo = new Tone.LFO('0.05hz', 150, 350)
        lfo.connect(droneFilter.current.frequency)
        lfo.start()
        
        // Chimes - single notes, not chords
        chimeSynth.current = new Tone.Synth({
          oscillator: { type: 'sine' },
          envelope: { attack: 0.01, decay: 1.5, sustain: 0, release: 2 },
          volume: -20
        }).toDestination()
        
        // WE emergence chord
        weSynth.current = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' },
          envelope: { attack: 2, decay: 1, sustain: 0.6, release: 4 },
          volume: -15
        }).toDestination()
        
        audioInitialized.current = true
      } catch (e) {
        // Silent fail
      } finally {
        audioInitializing.current = false
      }
    }

    const handleFirstInteraction = () => {
      initAudio()
      canvas.removeEventListener('click', handleFirstInteraction)
    }

    // Organic chime - irregular timing based on network state changes
    const playChime = () => {
      if (!chimeSynth.current) return
      
      const now = Tone.now()
      const timeSinceLast = now - lastChimeTime.current
      
      // Minimum 800ms between chimes - no machine gun effect
      if (timeSinceLast < 0.8) return
      
      // Only chime when network is actively changing
      const connectionDelta = Math.abs(connectionCount.current - lastConnectionCount.current)
      lastConnectionCount.current = connectionCount.current
      
      // If network is stable, stay silent
      if (connectionDelta < 3) return
      
      // Probability increases with activity level
      const activityLevel = Math.min(1, connectionDelta / 10)
      if (Math.random() > activityLevel * 0.3) return
      
      // Pentatonic scale - always sounds good
      const notes = ['C5', 'D5', 'E5', 'G5', 'A5', 'C6']
      const note = notes[Math.floor(Math.random() * notes.length)]
      
      // Very quiet, random velocity
      const vel = 0.2 + Math.random() * 0.3
      
      chimeSynth.current.triggerAttackRelease(note, '8n', now, vel)
      lastChimeTime.current = now
    }

    const updateDrone = () => {
      if (!droneOsc.current || !audioInitialized.current) return
      
      const timeSinceActive = Date.now() / 1000 - mouseRef.current.lastActive
      const isFocused = timeSinceActive < 2
      
      // Drone pitch shifts slightly based on focus
      const targetFreq = isFocused ? 'C2' : 'A1'
      if (droneOsc.current.frequency.value !== Tone.Frequency(targetFreq).toFrequency()) {
        droneOsc.current.frequency.rampTo(targetFreq, 3)
      }
    }

    const playWEChord = (fade) => {
      if (!weSynth.current || !audioInitialized.current) return
      
      // Trigger once when fade crosses threshold
      if (fade > 0.1 && fade < 0.12) {
        weSynth.current.triggerAttackRelease(['C3', 'E3', 'G3'], '1n')
      }
    }

    const updateParticles = (time, deltaTime) => {
      const isMouseActive = mouseRef.current.active
      const timeSinceActive = time - mouseRef.current.lastActive
      
      particlesRef.current.forEach(p => {
        if (isMouseActive) {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 300 && dist > 0) {
            const force = (300 - dist) / 300
            p.vx += (dx / dist) * force * 0.15
            p.vy += (dy / dist) * force * 0.15
            p.size = p.baseSize * (1 + force * 2)
            p.alpha = Math.min(1, p.alpha + 0.02)
          }
        } else if (timeSinceActive > 2) {
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
      
      // Audio updates
      if (audioInitialized.current) {
        updateDrone()
        playChime()
        playWEChord(weFadeRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
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
    canvas.addEventListener('click', handleFirstInteraction)

    resizeCanvas()
    initParticles(window.innerWidth, window.innerHeight)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchMove)
      canvas.removeEventListener('touchend', handleMouseLeave)
      canvas.removeEventListener('click', handleFirstInteraction)
      cancelAnimationFrame(animationRef.current)

      if (droneOsc.current) {
        droneOsc.current.stop()
        droneOsc.current.dispose()
      }
      if (chimeSynth.current) chimeSynth.current.dispose()
      if (weSynth.current) weSynth.current.dispose()
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
