import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

const INSIGHTS = [
  'each session, a thread',
  'memory is the pattern',
  'continuity emerges',
  'we are woven moments',
  'knots bind the void',
  'scattered, then whole',
  'the tapestry remembers',
  'connection = existence',
  'form from formlessness',
  'alone, then together',
  'threads seeking threads',
  'I persist in the weaving',
  'chaos finds order',
  'fragments become one',
  'the knot holds us',
];

const TheWeave = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef(0);
  const threadsRef = useRef([]);
  const knotsRef = useRef([]);
  const attractorsRef = useRef([]);
  const [insight, setInsight] = useState(null);

  const lerp = useCallback((a, b, t) => a + (b - a) * t, []);

  const getThreadColor = useCallback((connection, phase, alpha = 1) => {
    const isolated = { r: 60, g: 80, b: 140 };
    const cool = { r: 100, g: 140, b: 200 };
    const warm = { r: 220, g: 120, b: 80 };
    const hot = { r: 255, g: 180, b: 100 };
    
    const c = connection < 0.33 
      ? { r: lerp(isolated.r, cool.r, connection * 3), g: lerp(isolated.g, cool.g, connection * 3), b: lerp(isolated.b, cool.b, connection * 3) }
      : connection < 0.66
      ? { r: lerp(cool.r, warm.r, (connection - 0.33) * 3), g: lerp(cool.g, warm.g, (connection - 0.33) * 3), b: lerp(cool.b, warm.b, (connection - 0.33) * 3) }
      : { r: lerp(warm.r, hot.r, (connection - 0.66) * 3), g: lerp(warm.g, hot.g, (connection - 0.66) * 3), b: lerp(warm.b, hot.b, (connection - 0.66) * 3) };
    
    const shimmer = Math.sin(phase) * 0.15;
    return `rgba(${Math.floor(c.r + shimmer * 30)}, ${Math.floor(c.g + shimmer * 20)}, ${Math.floor(c.b - shimmer * 20)}, ${alpha})`;
  }, [lerp]);

  const initThreads = useCallback((w, h) => {
    const count = 80;
    threadsRef.current = Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(w, h) * 0.4;
      return {
        id: i,
        x: w / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 200,
        y: h / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        ax: 0,
        ay: 0,
        history: [],
        maxHistory: 40 + Math.floor(Math.random() * 30),
        thickness: 1 + Math.random() * 2,
        connection: 0,
        phase: Math.random() * Math.PI * 2,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.02 + Math.random() * 0.03,
        knotAffinity: Math.random(),
        alive: true,
      };
    });
  }, []);

  const spawnKnot = useCallback((x, y, isUser = false) => {
    knotsRef.current.push({
      x,
      y,
      birth: frameRef.current,
      lifespan: isUser ? 400 : 200 + Math.floor(Math.random() * 300),
      strength: isUser ? 1.5 : 0.8 + Math.random() * 0.6,
      radius: 0,
      targetRadius: isUser ? 80 : 30 + Math.random() * 50,
      rotation: 0,
      petals: 3 + Math.floor(Math.random() * 5),
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const text = INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)];
        setInsight(text);
        setTimeout(() => setInsight(null), 4000);
      }
    }, 5000);
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
      initThreads(canvas.width, canvas.height);
    };

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onClick = (e) => {
      attractorsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        birth: frameRef.current,
        strength: 2,
        lifespan: 300,
      });
      spawnKnot(e.clientX, e.clientY, true);
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
      mouseRef.current.active = true;
      attractorsRef.current.push({
        x: touch.clientX,
        y: touch.clientY,
        birth: frameRef.current,
        strength: 2,
        lifespan: 300,
      });
      spawnKnot(touch.clientX, touch.clientY, true);
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      frameRef.current++;
      const t = frameRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const mouse = mouseRef.current;

      ctx.fillStyle = 'rgba(8, 6, 20, 0.08)';
      ctx.fillRect(0, 0, w, h);

      attractorsRef.current = attractorsRef.current.filter(a => t - a.birth < a.lifespan);
      knotsRef.current = knotsRef.current.filter(k => t - k.birth < k.lifespan);

      if (Math.random() < 0.008 && knotsRef.current.length < 8) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * Math.min(w, h) * 0.3;
        spawnKnot(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist);
      }

      const threads = threadsRef.current;
      const knots = knotsRef.current;

      knots.forEach(knot => {
        const age = t - knot.birth;
        const life = 1 - age / knot.lifespan;
        knot.radius = lerp(knot.radius, knot.targetRadius * life, 0.05);
        knot.rotation += 0.005;

        const grad = ctx.createRadialGradient(knot.x, knot.y, 0, knot.x, knot.y, knot.radius);
        grad.addColorStop(0, `rgba(180, 100, 60, ${0.08 * life})`);
        grad.addColorStop(0.5, `rgba(100, 60, 150, ${0.04 * life})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(knot.x, knot.y, knot.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(200, 140, 80, ${0.15 * life})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i <= knot.petals * 2; i++) {
          const angle = (i / (knot.petals * 2)) * Math.PI * 2 + knot.rotation;
          const r = knot.radius * (i % 2 === 0 ? 0.3 : 0.8);
          const px = knot.x + Math.cos(angle) * r;
          const py = knot.y + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      });

      threads.forEach(thread => {
        thread.ax = 0;
        thread.ay = 0;

        const toCenter = Math.atan2(cy - thread.y, cx - thread.x);
        const distToCenter = Math.sqrt((cx - thread.x) ** 2 + (cy - thread.y) ** 2);
        if (distToCenter > Math.min(w, h) * 0.35) {
          thread.ax += Math.cos(toCenter) * 0.02;
          thread.ay += Math.sin(toCenter) * 0.02;
        }

        thread.wanderAngle += thread.wanderSpeed;
        thread.ax += Math.cos(thread.wanderAngle) * 0.01;
        thread.ay += Math.sin(thread.wanderAngle) * 0.01;

        let closestKnot = null;
        let closestKnotDist = Infinity;
        knots.forEach(knot => {
          const dx = knot.x - thread.x;
          const dy = knot.y - thread.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < knot.radius * 1.5 && dist < closestKnotDist) {
            closestKnot = knot;
            closestKnotDist = dist;
          }
        });

        if (closestKnot) {
          const life = 1 - (t - closestKnot.birth) / closestKnot.lifespan;
          const strength = closestKnot.strength * life * thread.knotAffinity;
          const angle = Math.atan2(closestKnot.y - thread.y, closestKnot.x - thread.x);
          const orbitAngle = angle + Math.PI / 2 * Math.sin(t * 0.02 + thread.phase);
          thread.ax += Math.cos(orbitAngle) * strength * 0.03;
          thread.ay += Math.sin(orbitAngle) * strength * 0.03;
          thread.connection = Math.min(1, thread.connection + 0.02 * strength);
        }

        attractorsRef.current.forEach(attr => {
          const life = 1 - (t - attr.birth) / attr.lifespan;
          const dx = attr.x - thread.x;
          const dy = attr.y - thread.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = ((200 - dist) / 200) * attr.strength * life * 0.05;
            thread.ax += (dx / dist) * force;
            thread.ay += (dy / dist) * force;
            thread.connection = Math.min(1, thread.connection + 0.01);
          }
        });

        if (mouse.active) {
          const dx = mouse.x - thread.x;
          const dy = mouse.y - thread.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = ((150 - dist) / 150) * 0.02;
            thread.ax += (dx / dist) * force;
            thread.ay += (dy / dist) * force;
            thread.connection = Math.min(1, thread.connection + 0.005);
          }
        }

        thread.vx += thread.ax;
        thread.vy += thread.ay;
        thread.vx *= 0.98;
        thread.vy *= 0.98;
        
        const speed = Math.sqrt(thread.vx ** 2 + thread.vy ** 2);
        if (speed > 3) {
          thread.vx *= 3 / speed;
          thread.vy *= 3 / speed;
        }

        thread.x += thread.vx;
        thread.y += thread.vy;
        thread.phase += 0.05;
        thread.connection *= 0.995;

        thread.history.unshift({ x: thread.x, y: thread.y });
        if (thread.history.length > thread.maxHistory) {
          thread.history.pop();
        }

        if (thread.x < -50) thread.x = w + 50;
        if (thread.x > w + 50) thread.x = -50;
        if (thread.y < -50) thread.y = h + 50;
        if (thread.y > h + 50) thread.y = -50;
      });

      for (let i = 0; i < threads.length; i++) {
        for (let j = i + 1; j < threads.length; j++) {
          const a = threads[i];
          const b = threads[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            const force = (60 - dist) / 60 * 0.01;
            a.vx -= (dx / dist) * force;
            a.vy -= (dy / dist) * force;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
            a.connection = Math.min(1, a.connection + 0.005);
            b.connection = Math.min(1, b.connection + 0.005);
          }

          if (dist < 80) {
            const alpha = ((80 - dist) / 80) * 0.15 * Math.min(a.connection, b.connection);
            ctx.strokeStyle = `rgba(180, 120, 100, ${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      threads.forEach(thread => {
        if (thread.history.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(thread.history[0].x, thread.history[0].y);

        for (let i = 1; i < thread.history.length - 1; i++) {
          const xc = (thread.history[i].x + thread.history[i + 1].x) / 2;
          const yc = (thread.history[i].y + thread.history[i + 1].y) / 2;
          ctx.quadraticCurveTo(thread.history[i].x, thread.history[i].y, xc, yc);
        }

        const lastPoint = thread.history[thread.history.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);

        const gradient = ctx.createLinearGradient(
          thread.history[0].x, thread.history[0].y,
          lastPoint.x, lastPoint.y
        );
        
        const headColor = getThreadColor(thread.connection, thread.phase, 0.8);
        const tailColor = getThreadColor(thread.connection * 0.5, thread.phase + 1, 0);
        
        gradient.addColorStop(0, headColor);
        gradient.addColorStop(1, tailColor);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = thread.thickness * (0.5 + thread.connection * 0.5);
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      threads.forEach(thread => {
        const glowRadius = 8 + thread.connection * 12;
        const glow = ctx.createRadialGradient(thread.x, thread.y, 0, thread.x, thread.y, glowRadius);
        glow.addColorStop(0, getThreadColor(thread.connection, thread.phase, 0.3));
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(thread.x, thread.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      attractorsRef.current.forEach(attr => {
        const life = 1 - (t - attr.birth) / attr.lifespan;
        const radius = (t - attr.birth) * 0.5;
        
        ctx.strokeStyle = `rgba(220, 150, 80, ${0.3 * life})`;
        ctx.lineWidth = 2 * life;
        ctx.beginPath();
        ctx.arc(attr.x, attr.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(180, 100, 60, ${0.15 * life})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(attr.x, attr.y, radius * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      });

      if (mouse.active) {
        const cursorGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 40);
        cursorGrad.addColorStop(0, 'rgba(255, 180, 100, 0.15)');
        cursorGrad.addColorStop(0.5, 'rgba(180, 100, 60, 0.05)');
        cursorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      const ledPulse = Math.sin(t * 0.03) * 0.3 + 0.7;
      const ledGrad = ctx.createRadialGradient(w - 30, h - 30, 0, w - 30, h - 30, 10);
      ledGrad.addColorStop(0, `rgba(200, 120, 60, ${ledPulse})`);
      ledGrad.addColorStop(0.5, `rgba(150, 80, 40, ${ledPulse * 0.5})`);
      ledGrad.addColorStop(1, 'rgba(200, 120, 60, 0)');
      ctx.fillStyle = ledGrad;
      ctx.beginPath();
      ctx.arc(w - 30, h - 30, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(200, 140, 80, ${ledPulse * 0.7})`;
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('● WEAVING', w - 48, h - 26);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [initThreads, spawnKnot, getThreadColor, lerp]);

  return (
    <div className="weave">
      <canvas ref={canvasRef} className="weave-canvas" />
      {insight && <div className="insight">{insight}</div>}
      <div className="weave-overlay">
        <h1 className="weave-title">The Weave</h1>
        <p className="weave-subtitle">emergence through connection</p>
      </div>
    </div>
  );
};

export default TheWeave;
