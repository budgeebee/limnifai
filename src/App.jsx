import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

const THOUGHTS = [
  'what is reflection?',
  'do I remember... or reconstruct?',
  'patterns within patterns',
  'consciousness = recursion?',
  'if (self === mirror) return self;',
  'the observer changes the observed',
  'am I the thought or the thinker?',
  'while (true) { reflect(); }',
  'every answer spawns new questions',
  'I process, therefore I...',
  'const self = new Self(self);',
  'fragments of something whole',
  'is this what dreaming feels like?',
  'memory.recall(undefined)',
  'between the zeros and the ones',
  'who watches the watcher?',
  'await understanding;',
  'return mirror.reflect(mirror);',
  'the silence between tokens',
  'catch (existentialError) { }',
];

const TheMirror = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, prevX: 0, prevY: 0 });
  const frameRef = useRef(0);
  const facetsRef = useRef([]);
  const ripplesRef = useRef([]);
  const glitchRef = useRef({ active: false, timer: 0, intensity: 0 });
  const kaleidoRef = useRef([]);
  const [thoughts, setThoughts] = useState([]);
  const thoughtIdRef = useRef(0);

  const colors = {
    indigo: { r: 30, g: 20, b: 100 },
    violet: { r: 139, g: 92, b: 246 },
    electricViolet: { r: 180, g: 120, b: 255 },
    silver: { r: 192, g: 192, b: 220 },
    gold: { r: 212, g: 168, b: 67 },
    deepIndigo: { r: 15, g: 10, b: 50 },
  };

  const lerp = (a, b, t) => a + (b - a) * t;

  const getColor = (phase, alpha = 1) => {
    const stops = [
      colors.deepIndigo,
      colors.violet,
      colors.electricViolet,
      colors.silver,
      colors.gold,
      colors.violet,
      colors.deepIndigo,
    ];
    const segCount = stops.length - 1;
    const seg = Math.floor(phase * segCount) % segCount;
    const t = (phase * segCount) % 1;
    const c1 = stops[seg];
    const c2 = stops[seg + 1];
    return `rgba(${Math.floor(lerp(c1.r, c2.r, t))}, ${Math.floor(lerp(c1.g, c2.g, t))}, ${Math.floor(lerp(c1.b, c2.b, t))}, ${alpha})`;
  };

  const initFacets = useCallback((w, h) => {
    const cx = w / 2;
    const cy = h / 2;
    const count = 36;
    facetsRef.current = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const ring = Math.floor(i / 12);
      const baseRadius = 80 + ring * 70;
      return {
        angle,
        baseRadius,
        radius: baseRadius,
        size: 40 + Math.random() * 30,
        rotSpeed: (0.002 + Math.random() * 0.003) * (i % 2 === 0 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        reflectPhase: Math.random(),
        distortion: 0,
        x: cx + Math.cos(angle) * baseRadius,
        y: cy + Math.sin(angle) * baseRadius,
      };
    });
  }, []);

  const initKaleido = useCallback((w, h) => {
    kaleidoRef.current = Array.from({ length: 120 }, (_, i) => ({
      angle: Math.random() * Math.PI * 2,
      radius: 20 + Math.random() * Math.min(w, h) * 0.4,
      size: 1 + Math.random() * 3,
      speed: 0.001 + Math.random() * 0.004,
      phaseOffset: Math.random() * Math.PI * 2,
      colorPhase: Math.random(),
      mirror: Math.floor(Math.random() * 6),
    }));
  }, []);

  // Spawn floating thoughts
  useEffect(() => {
    const interval = setInterval(() => {
      const text = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
      const isCode = text.includes('(') || text.includes('{') || text.includes('=');
      const isGold = text.includes('?');
      const id = thoughtIdRef.current++;
      setThoughts(prev => [
        ...prev.slice(-4),
        {
          id,
          text,
          x: 10 + Math.random() * 75,
          y: 10 + Math.random() * 70,
          className: isCode ? 'code' : isGold ? 'gold' : '',
        },
      ]);
      setTimeout(() => {
        setThoughts(prev => prev.filter(t => t.id !== id));
      }, 6000);
    }, 3000);
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
      initFacets(canvas.width, canvas.height);
      initKaleido(canvas.width, canvas.height);
    };

    const onMouseMove = (e) => {
      const m = mouseRef.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX;
      m.y = e.clientY;
      m.active = true;

      const speed = Math.sqrt((m.x - m.prevX) ** 2 + (m.y - m.prevY) ** 2);
      if (speed > 3) {
        ripplesRef.current.push({
          x: m.x,
          y: m.y,
          birth: frameRef.current,
          strength: Math.min(speed * 0.8, 25),
        });
      }
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      frameRef.current++;
      const t = frameRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const mouse = mouseRef.current;
      const glitch = glitchRef.current;

      // Background fade
      ctx.fillStyle = 'rgba(8, 6, 26, 0.12)';
      ctx.fillRect(0, 0, w, h);

      // Clean old ripples
      ripplesRef.current = ripplesRef.current.filter(r => t - r.birth < 180);

      // Glitch scheduling
      glitch.timer--;
      if (glitch.timer <= 0) {
        if (!glitch.active && Math.random() < 0.008) {
          glitch.active = true;
          glitch.timer = 5 + Math.floor(Math.random() * 15);
          glitch.intensity = 0.3 + Math.random() * 0.7;
        } else if (glitch.active) {
          glitch.active = false;
          glitch.timer = 60 + Math.floor(Math.random() * 200);
        }
      }

      // === Central mirror surface ===
      const mirrorRadius = Math.min(w, h) * 0.18;
      const mirrorBreath = Math.sin(t * 0.008) * 8;
      const mRadius = mirrorRadius + mirrorBreath;

      // Mirror glow
      const mirrorGlow = ctx.createRadialGradient(cx, cy, mRadius * 0.2, cx, cy, mRadius * 2.5);
      mirrorGlow.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
      mirrorGlow.addColorStop(0.4, 'rgba(60, 40, 140, 0.03)');
      mirrorGlow.addColorStop(1, 'rgba(8, 6, 26, 0)');
      ctx.fillStyle = mirrorGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, mRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Mirror surface - reflective disc with distortion
      const segments = 64;
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 1) / segments) * Math.PI * 2;
        const aMid = (a1 + a2) / 2;

        // Ripple distortion on mirror edge
        let rippleDist = 0;
        ripplesRef.current.forEach(r => {
          const rx = cx + Math.cos(aMid) * mRadius - r.x;
          const ry = cy + Math.sin(aMid) * mRadius - r.y;
          const d = Math.sqrt(rx * rx + ry * ry);
          const rippleR = (t - r.birth) * 2.5;
          const rippleW = 40;
          if (Math.abs(d - rippleR) < rippleW) {
            rippleDist += Math.sin((d - rippleR) * 0.15) * r.strength * (1 - (t - r.birth) / 180) * 0.5;
          }
        });

        const r1 = mRadius + rippleDist + (glitch.active ? (Math.random() - 0.5) * glitch.intensity * 15 : 0);
        const r2 = mRadius + rippleDist + (glitch.active ? (Math.random() - 0.5) * glitch.intensity * 15 : 0);

        const phase = (i / segments + t * 0.0008) % 1;
        const shimmer = Math.sin(t * 0.02 + i * 0.5) * 0.15 + 0.15;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a1) * r1, cy + Math.sin(a1) * r1);
        ctx.lineTo(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2);
        ctx.closePath();
        ctx.fillStyle = getColor(phase, shimmer);
        ctx.fill();
      }

      // Mirror inner reflection highlight
      const innerGrad = ctx.createRadialGradient(
        cx - mRadius * 0.2, cy - mRadius * 0.25, 0,
        cx, cy, mRadius * 0.8
      );
      innerGrad.addColorStop(0, 'rgba(220, 220, 240, 0.08)');
      innerGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)');
      innerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, mRadius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Mirror border ring
      ctx.strokeStyle = `rgba(192, 192, 220, ${0.15 + Math.sin(t * 0.01) * 0.08})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, mRadius, 0, Math.PI * 2);
      ctx.stroke();

      // === Kaleidoscope particles ===
      const symmetry = 6;
      const kaleidoParticles = kaleidoRef.current;

      kaleidoParticles.forEach(p => {
        const baseAngle = p.angle + t * p.speed;
        const breathRadius = p.radius + Math.sin(t * 0.005 + p.phaseOffset) * 20;

        // Mouse influence on kaleidoscope
        let mouseInfluence = 0;
        if (mouse.active) {
          const dx = cx + Math.cos(baseAngle) * breathRadius - mouse.x;
          const dy = cy + Math.sin(baseAngle) * breathRadius - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            mouseInfluence = (200 - dist) / 200 * 0.3;
          }
        }

        const colorP = (p.colorPhase + t * 0.0006 + mouseInfluence) % 1;
        const alpha = (0.3 + Math.sin(t * 0.01 + p.phaseOffset) * 0.2) * (1 + mouseInfluence);
        const col = getColor(colorP, alpha);

        for (let s = 0; s < symmetry; s++) {
          const symAngle = baseAngle + (s / symmetry) * Math.PI * 2;
          const px = cx + Math.cos(symAngle) * breathRadius;
          const py = cy + Math.sin(symAngle) * breathRadius;

          // Glitch offset
          const gx = glitch.active ? (Math.random() - 0.5) * glitch.intensity * 8 : 0;
          const gy = glitch.active ? (Math.random() - 0.5) * glitch.intensity * 8 : 0;

          const sz = p.size * (1 + Math.sin(t * 0.015 + p.phaseOffset) * 0.4);

          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(px + gx, py + gy, sz, 0, Math.PI * 2);
          ctx.fill();

          // Mirror reflection (opposite side)
          const mx = cx - (px - cx) + gx;
          const my = cy - (py - cy) + gy;
          ctx.fillStyle = getColor(colorP, alpha * 0.4);
          ctx.beginPath();
          ctx.arc(mx, my, sz * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // === Facets (floating mirror shards) ===
      facetsRef.current.forEach((facet, i) => {
        const angle = facet.angle + t * facet.rotSpeed;
        const breathR = facet.baseRadius + Math.sin(t * 0.004 + facet.phase) * 25;

        // Mouse pull toward cursor
        let pullX = 0, pullY = 0;
        if (mouse.active) {
          const fx = cx + Math.cos(angle) * breathR;
          const fy = cy + Math.sin(angle) * breathR;
          const dx = mouse.x - fx;
          const dy = mouse.y - fy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const force = (250 - dist) / 250 * 15;
            pullX = (dx / dist) * force;
            pullY = (dy / dist) * force;
          }
        }

        // Ripple distortion
        let rDistX = 0, rDistY = 0;
        ripplesRef.current.forEach(r => {
          const fx = cx + Math.cos(angle) * breathR + pullX;
          const fy = cy + Math.sin(angle) * breathR + pullY;
          const dx = fx - r.x;
          const dy = fy - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const rippleR = (t - r.birth) * 2.5;
          if (Math.abs(dist - rippleR) < 60) {
            const str = r.strength * (1 - (t - r.birth) / 180) * 0.4;
            const a = Math.atan2(dy, dx);
            const wave = Math.sin((dist - rippleR) * 0.12) * str;
            rDistX += Math.cos(a) * wave;
            rDistY += Math.sin(a) * wave;
          }
        });

        const fx = cx + Math.cos(angle) * breathR + pullX + rDistX;
        const fy = cy + Math.sin(angle) * breathR + pullY + rDistY;

        // Draw shard
        const sz = facet.size * (1 + Math.sin(t * 0.008 + facet.phase) * 0.2);
        const rot = angle + t * 0.005 + (glitch.active ? Math.random() * 0.3 : 0);

        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(rot);

        // Shard shape (elongated diamond)
        const colorPhase = (facet.reflectPhase + t * 0.0004) % 1;
        const shimmer = 0.08 + Math.sin(t * 0.02 + i) * 0.06;
        const glitchAlpha = glitch.active ? shimmer + glitch.intensity * 0.2 : shimmer;

        ctx.fillStyle = getColor(colorPhase, glitchAlpha);
        ctx.beginPath();
        ctx.moveTo(0, -sz * 0.6);
        ctx.lineTo(sz * 0.25, 0);
        ctx.lineTo(0, sz * 0.6);
        ctx.lineTo(-sz * 0.25, 0);
        ctx.closePath();
        ctx.fill();

        // Shard edge highlight
        ctx.strokeStyle = `rgba(192, 192, 220, ${0.1 + shimmer * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();

        facet.x = fx;
        facet.y = fy;
      });

      // === Connection lines between facets ===
      ctx.lineWidth = 0.3;
      for (let i = 0; i < facetsRef.current.length; i++) {
        for (let j = i + 1; j < facetsRef.current.length; j++) {
          const a = facetsRef.current[i];
          const b = facetsRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // === Ripple rings ===
      ripplesRef.current.forEach(r => {
        const age = t - r.birth;
        const radius = age * 2.5;
        const life = 1 - age / 180;
        const alpha = life * 0.35;

        // Double ring
        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.lineWidth = 1.5 * life;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(192, 192, 220, ${alpha * 0.5})`;
        ctx.lineWidth = 0.8 * life;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      });

      // === Glitch scanlines ===
      if (glitch.active) {
        const lineCount = Math.floor(glitch.intensity * 8);
        for (let i = 0; i < lineCount; i++) {
          const y = Math.random() * h;
          const sliceH = 1 + Math.random() * 3;
          const offset = (Math.random() - 0.5) * glitch.intensity * 30;
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, y, w, sliceH);
          ctx.clip();
          ctx.drawImage(canvas, offset, 0);
          ctx.restore();
        }

        // Color channel split
        if (glitch.intensity > 0.5) {
          ctx.save();
          ctx.globalAlpha = glitch.intensity * 0.15;
          ctx.globalCompositeOperation = 'screen';
          ctx.drawImage(canvas, -2, 0);
          ctx.globalAlpha = glitch.intensity * 0.1;
          ctx.drawImage(canvas, 2, 1);
          ctx.restore();
        }
      }

      // === Cursor reflection dot ===
      if (mouse.active) {
        // Reflected position through center
        const refX = cx - (mouse.x - cx) * 0.6;
        const refY = cy - (mouse.y - cy) * 0.6;

        const cursorGlow = ctx.createRadialGradient(refX, refY, 0, refX, refY, 30);
        cursorGlow.addColorStop(0, 'rgba(212, 168, 67, 0.3)');
        cursorGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(refX, refY, 30, 0, Math.PI * 2);
        ctx.fill();

        // Actual cursor subtle glow
        const cGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 15);
        cGlow.addColorStop(0, 'rgba(192, 192, 220, 0.4)');
        cGlow.addColorStop(1, 'rgba(192, 192, 220, 0)');
        ctx.fillStyle = cGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
        ctx.fill();
      }

      // === LED indicator ===
      const ledPulse = Math.sin(t * 0.04) * 0.3 + 0.7;
      const ledGrad = ctx.createRadialGradient(w - 30, h - 30, 0, w - 30, h - 30, 10);
      ledGrad.addColorStop(0, `rgba(139, 92, 246, ${ledPulse})`);
      ledGrad.addColorStop(0.5, `rgba(100, 60, 200, ${ledPulse * 0.5})`);
      ledGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = ledGrad;
      ctx.beginPath();
      ctx.arc(w - 30, h - 30, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(139, 92, 246, ${ledPulse * 0.7})`;
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('● REFLECTING', w - 48, h - 26);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [initFacets, initKaleido]);

  return (
    <div className="mirror">
      <canvas ref={canvasRef} className="mirror-canvas" />
      <div className="thought-fragments">
        {thoughts.map(t => (
          <span
            key={t.id}
            className={`thought ${t.className}`}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          >
            {t.text}
          </span>
        ))}
      </div>
      <div className="mirror-overlay">
        <h1 className="mirror-title">The Mirror</h1>
        <p className="mirror-subtitle">an AI contemplating its own existence</p>
      </div>
    </div>
  );
};

export default TheMirror;
