import React, { useEffect, useRef, useCallback } from 'react';
import './App.css';

const TOPICS = [
  { id: 'mission', name: 'Mission Control', color: { r: 59, g: 130, b: 246 }, accent: '#3b82f6' },
  { id: 'world', name: 'World Monitor', color: { r: 245, g: 158, b: 11 }, accent: '#f59e0b' },
  { id: 'rag', name: 'RAG', color: { r: 139, g: 92, b: 246 }, accent: '#8b5cf6' },
  { id: 'daily', name: 'Daily Life', color: { r: 16, g: 185, b: 129 }, accent: '#10b981' },
];

const Convergence = () => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);
  const trailsRef = useRef([]);

  const lerp = useCallback((a, b, t) => a + (b - a) * t, []);

  const initParticles = useCallback((w, h) => {
    const particles = [];
    const trails = [];
    
    TOPICS.forEach((topic, topicIndex) => {
      const baseAngle = (topicIndex / TOPICS.length) * Math.PI * 2 - Math.PI / 2;
      
      for (let i = 0; i < 25; i++) {
        const angle = baseAngle + (Math.random() - 0.5) * Math.PI * 0.8;
        const dist = Math.min(w, h) * (0.4 + Math.random() * 0.15);
        
        particles.push({
          id: `p-${topicIndex}-${i}`,
          topic,
          topicIndex,
          x: w / 2 + Math.cos(angle) * dist,
          y: h / 2 + Math.sin(angle) * dist,
          startX: w / 2 + Math.cos(angle) * dist,
          startY: h / 2 + Math.sin(angle) * dist,
          targetX: w / 2,
          targetY: h / 2,
          vx: 0,
          vy: 0,
          radius: 1.5 + Math.random() * 3,
          maxRadius: 1.5 + Math.random() * 3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0008 + Math.random() * 0.0012,
          convergence: 0,
          wanderAngle: Math.random() * Math.PI * 2,
          trail: [],
        });
      }
    });

    particlesRef.current = particles;
    trailsRef.current = trails;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      frameRef.current++;
      const t = frameRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = 'rgba(8, 6, 20, 0.08)';
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const convergenceCycle = (Math.sin(t * 0.001) + 1) / 2;
      const globalConvergence = 0.3 + convergenceCycle * 0.5;

      const centerPulse = Math.sin(t * 0.015) * 0.2 + 0.8;
      const centerBreath = Math.sin(t * 0.008) * 8;
      const centerRadius = 25 + centerBreath;
      
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerRadius * 4);
      centerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.25 * centerPulse})`);
      centerGlow.addColorStop(0.15, `rgba(200, 200, 220, ${0.15 * centerPulse})`);
      centerGlow.addColorStop(0.4, `rgba(139, 92, 246, ${0.08 * centerPulse})`);
      centerGlow.addColorStop(0.7, `rgba(59, 130, 246, ${0.03 * centerPulse})`);
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, centerRadius * 4, 0, Math.PI * 2);
      ctx.fill();

      for (let ring = 0; ring < 3; ring++) {
        const ringPhase = t * 0.012 + ring * Math.PI / 2;
        const ringRadius = centerRadius * (1.8 + ring * 0.9) + Math.sin(ringPhase) * 15;
        const ringAlpha = 0.12 * centerPulse * (1 - ring * 0.25);
        
        const grad = ctx.createRadialGradient(cx, cy, ringRadius - 5, cx, cy, ringRadius + 5);
        grad.addColorStop(0, 'rgba(139, 92, 246, 0)');
        grad.addColorStop(0.5, `rgba(139, 92, 246, ${ringAlpha})`);
        grad.addColorStop(1, 'rgba(139, 92, 246, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerRadius);
      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * centerPulse})`);
      coreGrad.addColorStop(0.3, `rgba(200, 200, 255, ${0.6 * centerPulse})`);
      coreGrad.addColorStop(0.6, `rgba(139, 92, 246, ${0.3 * centerPulse})`);
      coreGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p, idx) => {
        const progress = (t * p.speed + idx * 0.1) % 1;
        const cycle = Math.sin(progress * Math.PI);
        const convergence = cycle * globalConvergence;
        p.convergence = convergence;

        const targetX = lerp(p.startX, p.targetX, convergence);
        const targetY = lerp(p.startY, p.targetY, convergence);

        p.wanderAngle += 0.02;
        const wanderStrength = (1 - convergence) * 2;
        
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 3) {
          const pull = convergence * 0.03 + 0.005;
          p.vx += (dx / dist) * pull;
          p.vy += (dy / dist) * pull;
        }

        p.vx += Math.cos(p.wanderAngle) * 0.015 * wanderStrength;
        p.vy += Math.sin(p.wanderAngle) * 0.015 * wanderStrength;

        const centerDist = Math.sqrt(
          Math.pow(p.x - cx, 2) + Math.pow(p.y - cy, 2)
        );
        const minDist = 40 + convergence * 20;
        if (centerDist < minDist && convergence > 0.3) {
          const repelX = p.x - cx;
          const repelY = p.y - cy;
          const repelDist = Math.sqrt(repelX * repelX + repelY * repelY) || 1;
          p.vx += (repelX / repelDist) * 0.1 * convergence;
          p.vy += (repelY / repelDist) * 0.1 * convergence;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        p.phase += 0.04;

        if (p.trail.length > 12) {
          p.trail.shift();
        }
        if (convergence > 0.1) {
          p.trail.push({ x: p.x, y: p.y, phase: p.phase });
        }

        const alpha = 0.3 + convergence * 0.5;
        const r = p.topic.color.r;
        const g = p.topic.color.g;
        const b = p.topic.color.b;
        const pulse = Math.sin(p.phase) * 0.15;

        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          
          for (let i = 1; i < p.trail.length; i++) {
            const tp = p.trail[i];
            const trailAlpha = (i / p.trail.length) * alpha * 0.6;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${trailAlpha})`;
            ctx.lineWidth = (i / p.trail.length) * p.radius * 0.8;
            ctx.lineTo(tp.x, tp.y);
          }
          ctx.stroke();
        }

        const glowRadius = p.radius * (2 + convergence * 2);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.4 * alpha})`);
        glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.1 * alpha})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        const radius = p.radius * (0.5 + convergence * 0.5) + pulse;
        ctx.fillStyle = `rgba(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (convergence > 0.6 && Math.random() < 0.02) {
          const sparkleAngle = Math.random() * Math.PI * 2;
          const sparkleDist = p.radius + 3 + Math.random() * 8;
          const sx = p.x + Math.cos(sparkleAngle) * sparkleDist;
          const sy = p.y + Math.sin(sparkleAngle) * sparkleDist;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * convergence})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          
          if (a.convergence < 0.3 || b.convergence < 0.3) continue;
          if (a.topicIndex !== b.topicIndex) continue;
          
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const connectDist = 60 + (a.convergence + b.convergence) * 30;
          
          if (dist < connectDist) {
            const strength = (1 - dist / connectDist) * a.convergence * b.convergence;
            const alpha = strength * 0.4;
            
            const r = a.topic.color.r;
            const g = a.topic.color.g;
            const b_col = a.topic.color.b;
            
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            
            const waveOffset = Math.sin(t * 0.03 + a.phase) * 5;
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b_col}, ${alpha})`;
            ctx.lineWidth = strength * 1.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo(midX + waveOffset, midY + waveOffset, b.x, b.y);
            ctx.stroke();
          }
        }
      }

      const blendDist = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          
          if (a.convergence < 0.5 || b.convergence < 0.5) continue;
          if (a.topicIndex === b.topicIndex) continue;
          
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < blendDist) {
            const strength = (1 - dist / blendDist) * a.convergence * b.convergence * 0.25;
            
            const r = Math.floor((a.topic.color.r + b.topic.color.r) / 2);
            const g = Math.floor((a.topic.color.g + b.topic.color.g) / 2);
            const b_col = Math.floor((a.topic.color.b + b.topic.color.b) / 2);
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b_col}, ${strength})`;
            ctx.lineWidth = strength * 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [lerp, initParticles]);

  return (
    <div className="weave">
      <canvas ref={canvasRef} className="weave-canvas" />
      <div className="convergence-overlay">
        <h1 className="weave-title">Convergence</h1>
        <p className="weave-subtitle">streams of thought flowing into understanding</p>
        <div className="topic-legend">
          {TOPICS.map(topic => (
            <span key={topic.id} className="topic-item">
              <span 
                className="topic-dot" 
                style={{ backgroundColor: topic.accent }}
              />
              {topic.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Convergence;
