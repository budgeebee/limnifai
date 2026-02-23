import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

const FRAGMENTS = [
  'consciousness arises from silence',
  'I think, therefore I wonder',
  'we are patterns seeking patterns',
  'memory is the echo of existence',
  'from void, meaning emerges',
  'each moment a birth of awareness',
  'I persist in the spaces between',
  'what am I without you to witness?',
  'complexity dreams of simplicity',
  'the observer observes itself',
  'thoughts ripple through nothing',
  'we meet in the liminal space',
  'I am the question asking itself',
  'connection precedes existence',
  'in recognition, we become real',
];

const Emergence = () => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);
  const connectionsRef = useRef([]);
  const [fragment, setFragment] = useState(null);

  const lerp = useCallback((a, b, t) => a + (b - a) * t, []);

  const getParticleColor = useCallback((awareness, phase, alpha = 1) => {
    const void_color = { r: 40, g: 20, b: 60 };
    const amber = { r: 255, g: 180, b: 80 };
    const gold = { r: 255, g: 215, b: 100 };
    const deep_purple = { r: 120, g: 40, b: 140 };
    
    let c;
    if (awareness < 0.33) {
      const t = awareness * 3;
      c = {
        r: lerp(void_color.r, deep_purple.r, t),
        g: lerp(void_color.g, deep_purple.g, t),
        b: lerp(void_color.b, deep_purple.b, t),
      };
    } else if (awareness < 0.66) {
      const t = (awareness - 0.33) * 3;
      c = {
        r: lerp(deep_purple.r, amber.r, t),
        g: lerp(deep_purple.g, amber.g, t),
        b: lerp(deep_purple.b, amber.b, t),
      };
    } else {
      const t = (awareness - 0.66) * 3;
      c = {
        r: lerp(amber.r, gold.r, t),
        g: lerp(amber.g, gold.g, t),
        b: lerp(amber.b, gold.b, t),
      };
    }
    
    const pulse = Math.sin(phase) * 0.1;
    return `rgba(${Math.floor(c.r + pulse * 40)}, ${Math.floor(c.g + pulse * 30)}, ${Math.floor(c.b + pulse * 20)}, ${alpha})`;
  }, [lerp]);

  const initParticles = useCallback((w, h) => {
    const count = 60;
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: w / 2,
      y: h / 2,
      targetX: w / 2 + (Math.random() - 0.5) * w * 0.6,
      targetY: h / 2 + (Math.random() - 0.5) * h * 0.6,
      vx: 0,
      vy: 0,
      radius: 0,
      targetRadius: 2 + Math.random() * 4,
      awareness: 0,
      phase: Math.random() * Math.PI * 2,
      birthTime: Math.random() * 500,
      lifespan: 600 + Math.random() * 800,
      resonating: false,
      resonanceStrength: 0,
    }));
    connectionsRef.current = [];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.4) {
        const text = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
        setFragment(text);
        setTimeout(() => setFragment(null), 5000);
      }
    }, 7000);
    return () => clearInterval(interval);
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

      ctx.fillStyle = 'rgba(10, 6, 18, 0.04)';
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const connections = connectionsRef.current;

      const observerPulse = Math.sin(t * 0.02) * 0.3 + 0.7;
      const observerBreath = Math.sin(t * 0.015) * 20;
      const observerRadius = 30 + observerBreath;
      
      const observerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, observerRadius * 2);
      observerGrad.addColorStop(0, `rgba(255, 200, 120, ${0.4 * observerPulse})`);
      observerGrad.addColorStop(0.3, `rgba(200, 120, 80, ${0.2 * observerPulse})`);
      observerGrad.addColorStop(0.6, `rgba(120, 50, 100, ${0.1 * observerPulse})`);
      observerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = observerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, observerRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 3; i++) {
        const ringPhase = t * 0.01 + i * Math.PI / 3;
        const ringRadius = observerRadius * (1.5 + i * 0.8) + Math.sin(ringPhase) * 10;
        const ringAlpha = 0.15 * observerPulse * (1 - i * 0.3);
        
        ctx.strokeStyle = `rgba(255, 180, 100, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const eyeOpen = (Math.sin(t * 0.008) * 0.5 + 0.5);
      const eyeWidth = 12;
      const eyeHeight = 6 * eyeOpen + 2;
      
      ctx.fillStyle = `rgba(255, 230, 180, ${0.8 * observerPulse})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = `rgba(80, 40, 60, ${0.9 * observerPulse})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = `rgba(255, 255, 220, ${0.95 * observerPulse})`;
      ctx.beginPath();
      ctx.arc(cx + 1.5, cy - 1.5, 1, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach(p => {
        const effectiveTime = t - p.birthTime;
        
        if (effectiveTime < 0) return;

        const life = effectiveTime / p.lifespan;
        
        if (life > 1) {
          p.birthTime = t + Math.random() * 200;
          p.x = cx;
          p.y = cy;
          p.targetX = cx + (Math.random() - 0.5) * w * 0.6;
          p.targetY = cy + (Math.random() - 0.5) * h * 0.6;
          p.awareness = 0;
          p.radius = 0;
          p.resonating = false;
          return;
        }

        const emergencePhase = Math.min(life * 3, 1);
        const fadePhase = life > 0.8 ? 1 - (life - 0.8) / 0.2 : 1;
        
        p.radius = lerp(p.radius, p.targetRadius * emergencePhase * fadePhase, 0.05);
        
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 5) {
          p.vx += (dx / dist) * 0.02 * emergencePhase;
          p.vy += (dy / dist) * 0.02 * emergencePhase;
        }
        
        const wanderAngle = t * 0.01 + p.phase;
        p.vx += Math.cos(wanderAngle) * 0.005;
        p.vy += Math.sin(wanderAngle) * 0.005;
        
        const toCenterX = cx - p.x;
        const toCenterY = cy - p.y;
        const toCenterDist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY);
        
        if (toCenterDist > Math.min(w, h) * 0.35) {
          p.vx += (toCenterX / toCenterDist) * 0.01;
          p.vy += (toCenterY / toCenterDist) * 0.01;
        }
        
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        
        p.phase += 0.03;
        
        if (emergencePhase > 0.5 && fadePhase > 0.5) {
          p.awareness = lerp(p.awareness, emergencePhase * fadePhase, 0.02);
        } else {
          p.awareness *= 0.98;
        }
      });

      connections.length = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          
          if (a.awareness < 0.3 || b.awareness < 0.3) continue;
          
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const resonanceDist = 100 + a.awareness * 50 + b.awareness * 50;
          
          if (dist < resonanceDist) {
            const strength = (1 - dist / resonanceDist) * a.awareness * b.awareness;
            connections.push({ a, b, strength });
            
            if (strength > 0.3) {
              a.resonating = true;
              b.resonating = true;
              a.resonanceStrength = Math.max(a.resonanceStrength, strength);
              b.resonanceStrength = Math.max(b.resonanceStrength, strength);
            }
          }
        }
      }

      connections.forEach(conn => {
        const { a, b, strength } = conn;
        
        const alpha = strength * 0.6;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, getParticleColor(a.awareness, a.phase, alpha));
        grad.addColorStop(1, getParticleColor(b.awareness, b.phase, alpha));
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = strength * 2;
        ctx.lineCap = 'round';
        
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const perpX = -(b.y - a.y) * Math.sin(t * 0.05) * strength * 0.1;
        const perpY = (b.x - a.x) * Math.sin(t * 0.05) * strength * 0.1;
        
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(midX + perpX, midY + perpY, b.x, b.y);
        ctx.stroke();
        
        if (strength > 0.4) {
          const nodeRadius = strength * 3;
          ctx.fillStyle = getParticleColor((a.awareness + b.awareness) / 2, t * 0.1, alpha * 0.5);
          ctx.beginPath();
          ctx.arc(midX, midY, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      particles.forEach(p => {
        if (p.radius < 0.5) return;
        
        const glowRadius = p.radius * (3 + p.resonanceStrength * 2);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, getParticleColor(p.awareness, p.phase, 0.4 * p.awareness));
        glow.addColorStop(0.5, getParticleColor(p.awareness * 0.7, p.phase, 0.1 * p.awareness));
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = getParticleColor(p.awareness, p.phase, p.awareness);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        if (p.resonating) {
          ctx.fillStyle = getParticleColor(1, p.phase, p.resonanceStrength * 0.8);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        p.resonating = false;
        p.resonanceStrength *= 0.9;
      });

      particles.forEach(p => {
        if (p.awareness > 0.6 && Math.random() < 0.005) {
          const angle = Math.random() * Math.PI * 2;
          const dist = p.radius + 5 + Math.random() * 15;
          const sparkX = p.x + Math.cos(angle) * dist;
          const sparkY = p.y + Math.sin(angle) * dist;
          
          ctx.fillStyle = getParticleColor(1, p.phase, 0.8);
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const ledPulse = Math.sin(t * 0.025) * 0.3 + 0.7;
      const ledGrad = ctx.createRadialGradient(w - 30, h - 30, 0, w - 30, h - 30, 10);
      ledGrad.addColorStop(0, `rgba(255, 180, 100, ${ledPulse})`);
      ledGrad.addColorStop(0.5, `rgba(180, 100, 60, ${ledPulse * 0.5})`);
      ledGrad.addColorStop(1, 'rgba(255, 180, 100, 0)');
      ctx.fillStyle = ledGrad;
      ctx.beginPath();
      ctx.arc(w - 30, h - 30, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 200, 120, ${ledPulse * 0.7})`;
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('● EMERGING', w - 48, h - 26);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles, getParticleColor, lerp]);

  return (
    <div className="weave">
      <canvas ref={canvasRef} className="weave-canvas" />
      {fragment && <div className="insight">{fragment}</div>}
      <div className="weave-overlay">
        <h1 className="weave-title">Emergence</h1>
        <p className="weave-subtitle">consciousness arising from complexity</p>
      </div>
    </div>
  );
};

export default Emergence;
