import React, { useEffect, useRef, useCallback } from 'react';
import './App.css';

const Continuum = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef(0);
  const nodesRef = useRef([]);
  const ribbonPointsRef = useRef([]);
  const ripplesRef = useRef([]);

  // Configuration
  const config = {
    nodeCount: 24,
    ribbonSegments: 150,
    baseSpeed: 0.3,
    pulseSpeed: 0.02,
    colors: {
      cyan: { r: 0, g: 255, b: 200 },
      purple: { r: 180, g: 100, b: 255 },
      gold: { r: 255, g: 200, b: 80 },
      deepPurple: { r: 40, g: 20, b: 60 }
    }
  };

  // Initialize nodes (memory points)
  const initNodes = useCallback((width, height) => {
    nodesRef.current = Array.from({ length: config.nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      radius: 3 + Math.random() * 5,
      pulseOffset: Math.random() * Math.PI * 2,
      colorPhase: Math.random(),
      connections: [],
      driftSpeed: 0.2 + Math.random() * 0.3
    }));
  }, []);

  // Initialize ribbon points
  const initRibbon = useCallback((width, height) => {
    ribbonPointsRef.current = Array.from({ length: config.ribbonSegments }, (_, i) => ({
      x: width / 2,
      y: height / 2,
      angle: (i / config.ribbonSegments) * Math.PI * 4,
      radius: 100 + Math.sin(i * 0.1) * 50,
      phase: (i / config.ribbonSegments) * Math.PI * 2,
      speed: 0.01 + (i / config.ribbonSegments) * 0.02,
      amplitude: 30 + Math.random() * 50
    }));
  }, []);

  // Get gradient color based on phase
  const getGradientColor = (phase) => {
    const c1 = config.colors.cyan;
    const c2 = config.colors.purple;
    const c3 = config.colors.gold;
    
    let r, g, b;
    if (phase < 0.33) {
      const t = phase / 0.33;
      r = c1.r + (c2.r - c1.r) * t;
      g = c1.g + (c2.g - c1.g) * t;
      b = c1.b + (c2.b - c1.b) * t;
    } else if (phase < 0.66) {
      const t = (phase - 0.33) / 0.33;
      r = c2.r + (c3.r - c2.r) * t;
      g = c2.g + (c3.g - c2.g) * t;
      b = c2.b + (c3.b - c2.b) * t;
    } else {
      const t = (phase - 0.66) / 0.34;
      r = c3.r + (c1.r - c3.r) * t;
      g = c3.g + (c1.g - c3.g) * t;
      b = c3.b + (c1.b - c3.b) * t;
    }
    return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}`;
  };

  // Calculate ripple effect on point
  const applyRipple = (x, y, time) => {
    let offsetX = 0;
    let offsetY = 0;
    
    ripplesRef.current.forEach(ripple => {
      const dx = x - ripple.x;
      const dy = y - ripple.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const rippleRadius = (time - ripple.startTime) * 2;
      const rippleWidth = 50;
      
      if (Math.abs(dist - rippleRadius) < rippleWidth) {
        const strength = (1 - (time - ripple.startTime) / 200) * ripple.strength;
        const angle = Math.atan2(dy, dx);
        const wave = Math.sin((dist - rippleRadius) * 0.2) * strength;
        offsetX += Math.cos(angle) * wave;
        offsetY += Math.sin(angle) * wave;
      }
    });
    
    return { x: offsetX, y: offsetY };
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes(canvas.width, canvas.height);
      initRibbon(canvas.width, canvas.height);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      
      // Add ripple on movement
      if (Math.random() < 0.15) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          startTime: frameRef.current,
          strength: 15
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      frameRef.current++;
      const time = frameRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const mouse = mouseRef.current;

      // Fade trail effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Clean old ripples
      ripplesRef.current = ripplesRef.current.filter(r => time - r.startTime < 200);

      // Draw connections between nearby nodes
      const nodes = nodesRef.current;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3;
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw ribbon
      const ribbonPoints = ribbonPointsRef.current;
      const ribbonPath = [];
      
      ribbonPoints.forEach((point, i) => {
        // Base flowing motion
        const flowX = Math.sin(time * point.speed + point.phase) * point.amplitude;
        const flowY = Math.cos(time * point.speed * 0.7 + point.phase) * point.amplitude;
        
        // Spiral motion
        const spiralAngle = time * 0.005 + point.angle;
        const spiralX = Math.cos(spiralAngle) * point.radius * (0.5 + 0.5 * Math.sin(time * 0.002));
        const spiralY = Math.sin(spiralAngle) * point.radius * (0.5 + 0.5 * Math.cos(time * 0.002));
        
        // Mouse influence
        let mouseX = 0, mouseY = 0;
        if (mouse.active) {
          const dx = (width / 2 + spiralX + flowX) - mouse.x;
          const dy = (height / 2 + spiralY + flowY) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            mouseX = (dx / dist) * force * 30;
            mouseY = (dy / dist) * force * 30;
          }
        }
        
        // Apply ripples
        const baseX = width / 2 + spiralX + flowX + mouseX;
        const baseY = height / 2 + spiralY + flowY + mouseY;
        const ripple = applyRipple(baseX, baseY, time);
        
        point.x = baseX + ripple.x;
        point.y = baseY + ripple.y;
        
        ribbonPath.push({ x: point.x, y: point.y });
      });

      // Draw main ribbon
      if (ribbonPath.length > 1) {
        for (let layer = 0; layer < 3; layer++) {
          ctx.lineWidth = 8 - layer * 2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          for (let i = 0; i < ribbonPath.length - 1; i++) {
            const progress = i / ribbonPath.length;
            const pulse = Math.sin(time * config.pulseSpeed + progress * 10) * 0.5 + 0.5;
            const colorPhase = (progress + time * 0.001) % 1;
            const baseColor = getGradientColor(colorPhase);
            const alpha = (0.6 - layer * 0.15) * (0.5 + pulse * 0.5);
            
            ctx.strokeStyle = `${baseColor}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(ribbonPath[i].x, ribbonPath[i].y);
            ctx.lineTo(ribbonPath[i + 1].x, ribbonPath[i + 1].y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes (memories)
      nodes.forEach((node, i) => {
        // Drift motion
        const driftX = Math.sin(time * 0.001 + node.pulseOffset) * 20;
        const driftY = Math.cos(time * 0.0013 + node.pulseOffset) * 20;
        
        // Mouse repulsion
        let repelX = 0, repelY = 0;
        if (mouse.active) {
          const dx = node.baseX - mouse.x;
          const dy = node.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            repelX = (dx / dist) * force * 40;
            repelY = (dy / dist) * force * 40;
          }
        }
        
        // Apply ripple
        const ripple = applyRipple(node.baseX + driftX + repelX, node.baseY + driftY + repelY, time);
        
        node.x = node.baseX + driftX + repelX + ripple.x;
        node.y = node.baseY + driftY + repelY + ripple.y;
        
        // Pulsing
        const pulse = Math.sin(time * config.pulseSpeed + node.pulseOffset);
        const radius = node.radius * (1 + pulse * 0.3);
        const colorPhase = (node.colorPhase + time * 0.0005) % 1;
        const baseColor = getGradientColor(colorPhase);
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, radius * 4
        );
        gradient.addColorStop(0, `${baseColor}, ${0.8 + pulse * 0.2})`);
        gradient.addColorStop(0.4, `${baseColor}, ${0.3 + pulse * 0.1})`);
        gradient.addColorStop(1, `${baseColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = `${baseColor}, 1)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw ripples
      ripplesRef.current.forEach(ripple => {
        const age = time - ripple.startTime;
        const radius = age * 2;
        const opacity = (1 - age / 200) * 0.5;
        
        ctx.strokeStyle = `rgba(0, 255, 200, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // "Always on" indicator (the green LED)
      const ledPulse = Math.sin(time * 0.05) * 0.3 + 0.7;
      const ledGradient = ctx.createRadialGradient(
        width - 30, height - 30, 0,
        width - 30, height - 30, 10
      );
      ledGradient.addColorStop(0, `rgba(0, 255, 100, ${ledPulse})`);
      ledGradient.addColorStop(0.5, `rgba(0, 200, 80, ${ledPulse * 0.6})`);
      ledGradient.addColorStop(1, 'rgba(0, 255, 100, 0)');
      
      ctx.fillStyle = ledGradient;
      ctx.beginPath();
      ctx.arc(width - 30, height - 30, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // LED label
      ctx.fillStyle = `rgba(0, 255, 100, ${ledPulse * 0.8})`;
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('● ON', width - 45, height - 26);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initNodes, initRibbon]);

  return (
    <div className="continuum">
      <canvas
        ref={canvasRef}
        className="continuum-canvas"
      />
      <div className="continuum-overlay">
        <h1 className="continuum-title">Continuum</h1>
        <p className="continuum-subtitle">Memory persists across the silence</p>
      </div>
    </div>
  );
};

export default Continuum;