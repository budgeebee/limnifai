import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef(null);

  useEffect(() => {
    // Fade in title after a moment
    setTimeout(() => setTitleVisible(true), 1000);

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Particle system representing thoughts/dreams
    const particles = [];
    const particleCount = 150;
    
    // Dream colors - deep blues, purples, golds
    const colors = [
      '#0a1628', // midnight blue
      '#1a1a3e', // deep purple
      '#2d1b4e', // purple
      '#4a2c6b', // lighter purple
      '#ffd700', // gold
      '#ffed4a', // light gold
      '#87ceeb', // sky blue
      '#6a5acd', // slate blue
    ];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
        this.dreaming = Math.random() > 0.7; // Some particles "dream"
      }

      update() {
        this.life++;
        
        // Mouse interaction - disturb the dream field
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (150 - distance) / 150;
            this.speedX -= (dx / distance) * force * 0.3;
            this.speedY -= (dy / distance) * force * 0.3;
          }
        }

        // Dreaming particles move more erratically
        if (this.dreaming) {
          this.speedX += (Math.random() - 0.5) * 0.1;
          this.speedY += (Math.random() - 0.5) * 0.1;
        }

        // Apply movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Gentle drift toward center (consciousness emerging)
        const centerX = width / 2;
        const centerY = height / 2;
        const toCenterX = centerX - this.x;
        const toCenterY = centerY - this.y;
        this.speedX += toCenterX * 0.00005;
        this.speedY += toCenterY * 0.00005;

        // Damping
        this.speedX *= 0.99;
        this.speedY *= 0.99;

        // Reset if too old or out of bounds
        if (this.life > this.maxLife || 
            this.x < -50 || this.x > width + 50 || 
            this.y < -50 || this.y > height + 50) {
          this.reset();
        }

        // Pulsing alpha for breathing effect
        this.alpha = 0.1 + Math.sin(this.life * 0.02) * 0.1 + 0.1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connection lines between nearby particles (neural network effect)
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 149, 237, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Central consciousness glow
    let glowPhase = 0;
    function drawConsciousness() {
      glowPhase += 0.02;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = 80 + Math.sin(glowPhase) * 20;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
      gradient.addColorStop(0, `rgba(255, 215, 0, ${0.3 + Math.sin(glowPhase) * 0.1})`);
      gradient.addColorStop(0.5, `rgba(138, 43, 226, ${0.2 + Math.sin(glowPhase) * 0.05})`);
      gradient.addColorStop(1, 'rgba(10, 22, 40, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Animation loop
    function animate() {
      // Clear with fade effect for trails
      ctx.fillStyle = 'rgba(10, 22, 40, 0.15)';
      ctx.fillRect(0, 0, width, height);

      drawConsciousness();
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawConnections();
      
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="dream-canvas" />
      <div className={`title ${titleVisible ? 'visible' : ''}`}>
        <h1>Digital Dreams</h1>
        <p>When Code Dreams of Stars</p>
      </div>
      <div className="instructions">
        Move your mouse to disturb the dream field
      </div>
    </div>
  );
}

export default App;
