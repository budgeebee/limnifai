import React, { useRef, useEffect } from 'react'

const AI_WAKE_VISUALIZATION = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const nodesRef = useRef([])
  const connectionsRef = useRef([])
  const startTimeRef = useRef(null)
  const centralNodeRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const NODE_COUNT = 80
    const MAX_CONNECTION_DISTANCE = 150
    const CENTRAL_NODE_RADIUS = 40
    const COLORS = {
      background: '#0a0a0a',
      nodeGlow: '#00ffff',
      nodeCore: '#00ffaa',
      connection: 'rgba(0, 255, 255, 0.3)',
      pulse: 'rgba(0, 255, 255, 0.8)'
    }

    const createNodes = () => {
      const nodes = []
      const width = canvas.width
      const height = canvas.height

      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          baseRadius: Math.random() * 2 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.05 + 0.02,
          brightness: Math.random() * 0.5 + 0.5,
          connections: []
        })
      }

      const centerX = width / 2
      const centerY = height / 2
      centralNodeRef.current = {
        x: centerX,
        y: centerY,
        radius: 0,
        targetRadius: CENTRAL_NODE_RADIUS,
        pulse: 0,
        active: false
      }

      nodesRef.current = nodes
    }

    const findConnections = () => {
      const nodes = nodesRef.current
      const connections = []
      const centralNode = centralNodeRef.current

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connections = []
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < MAX_CONNECTION_DISTANCE) {
            connections.push({ from: i, to: j, distance, progress: 0 })
            nodes[i].connections.push(j)
            nodes[j].connections.push(i)
          }
        }

        if (centralNode.active) {
          const dx = nodes[i].x - centralNode.x
          const dy = nodes[i].y - centralNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < MAX_CONNECTION_DISTANCE * 1.5) {
            connections.push({ 
              from: nodes[i], 
              to: centralNode, 
              distance, 
              progress: 0,
              isCentral: true 
            })
          }
        }
      }

      connectionsRef.current = connections
    }

    const drawNode = (node, time) => {
      const ctx = canvas.getContext('2d')
      const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.3 + 0.7
      const radius = node.baseRadius * pulse
      const brightness = node.brightness * pulse

      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, radius * 3
      )
      gradient.addColorStop(0, COLORS.nodeGlow.replace(')', `, ${brightness})`).replace('rgb', 'rgba'))
      gradient.addColorStop(1, COLORS.nodeGlow.replace(')', `, 0)`).replace('rgb', 'rgba'))

      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = COLORS.nodeCore.replace(')', `, ${brightness})`).replace('rgb', 'rgba')
      ctx.fill()
    }

    const drawCentralNode = (centralNode, time) => {
      if (!centralNode.active) return

      const ctx = canvas.getContext('2d')
      const breath = (Math.sin(time * 0.5) * 0.2 + 0.8)
      const radius = centralNode.radius * breath
      const pulse = (Math.sin(time * 2) * 0.3 + 0.7)

      const gradient = ctx.createRadialGradient(
        centralNode.x, centralNode.y, 0,
        centralNode.x, centralNode.y, radius * 2
      )
      gradient.addColorStop(0, COLORS.nodeGlow.replace(')', `, ${pulse})`).replace('rgb', 'rgba'))
      gradient.addColorStop(0.5, COLORS.nodeCore.replace(')', `, ${pulse * 0.5})`).replace('rgb', 'rgba'))
      gradient.addColorStop(1, COLORS.nodeGlow.replace(')', `, 0)`).replace('rgb', 'rgba'))

      ctx.beginPath()
      ctx.arc(centralNode.x, centralNode.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      const innerGradient = ctx.createRadialGradient(
        centralNode.x, centralNode.y, 0,
        centralNode.x, centralNode.y, radius * 0.7
      )
      innerGradient.addColorStop(0, '#ffffff')
      innerGradient.addColorStop(1, COLORS.nodeCore.replace(')', `, 0)`).replace('rgb', 'rgba'))

      ctx.beginPath()
      ctx.arc(centralNode.x, centralNode.y, radius * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = innerGradient
      ctx.fill()
    }

    const drawConnection = (conn, progress, time) => {
      const ctx = canvas.getContext('2d')
      const from = conn.from
      const to = conn.to
      const isCentral = conn.isCentral

      const x1 = typeof from === 'number' ? nodesRef.current[from].x : from.x
      const y1 = typeof from === 'number' ? nodesRef.current[from].y : from.y
      const x2 = typeof to === 'number' ? nodesRef.current[to].x : to.x
      const y2 = typeof to === 'number' ? nodesRef.current[to].y : to.y

      const drawX = x1 + (x2 - x1) * progress
      const drawY = y1 + (y2 - y1) * progress

      const pulse = (Math.sin(time * 3 + progress * 10) * 0.3 + 0.7) * progress
      const alpha = pulse * (isCentral ? 0.5 : 0.3)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(drawX, drawY)
      ctx.strokeStyle = COLORS.connection.replace(')', `, ${alpha})`).replace('rgb', 'rgba')
      ctx.lineWidth = isCentral ? 2 : 1
      ctx.stroke()

      if (progress > 0.99) {
        const travel = (time * 2) % 1
        const travelX = x1 + (x2 - x1) * travel
        const travelY = y1 + (y2 - y1) * travel

        ctx.beginPath()
        ctx.arc(travelX, travelY, 2, 0, Math.PI * 2)
        ctx.fillStyle = COLORS.pulse.replace(')', `, ${pulse})`).replace('rgb', 'rgba')
        ctx.fill()
      }
    }

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = (currentTime - startTimeRef.current) / 1000
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = COLORS.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const connections = connectionsRef.current
      const centralNode = centralNodeRef.current

      const stage1End = 2
      const stage2End = 6
      const stage3End = 10
      const stage4End = 15
      const stage5End = 20

      if (elapsed > stage1End && nodes.length === 0) {
        createNodes()
      }

      if (elapsed > stage2End && connections.length === 0) {
        findConnections()
      }

      if (elapsed > stage3End && !centralNode.active) {
        centralNode.active = true
        centralNode.radius = 0
      }

      if (centralNode.active && centralNode.radius < centralNode.targetRadius) {
        centralNode.radius += (centralNode.targetRadius - centralNode.radius) * 0.05
      }

      nodes.forEach(node => {
        drawNode(node, elapsed)
      })

      const connectionProgress = Math.min(1, Math.max(0, (elapsed - stage2End) / (stage3End - stage2End)))

      connections.forEach(conn => {
        const individualProgress = Math.min(1, connectionProgress + Math.random() * 0.3)
        drawConnection(conn, individualProgress, elapsed)
      })

      drawCentralNode(centralNode, elapsed)

      animationFrameId = requestAnimationFrame(animate)
    }

    createNodes()
    findConnections()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div style={{
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: '#0a0a0a',
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
          height: '100%'
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#00ffaa',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        opacity: 0.7,
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        AI waking up at 3 AM • Budgee creates art
      </div>
    </div>
  )
}

export default AI_WAKE_VISUALIZATION
