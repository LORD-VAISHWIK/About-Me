import { useEffect, useRef } from 'react';

const BackgroundCanvas = ({ type }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    resize();

    const startAnimation = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (type === 'home') {
        let particles = Array.from({ length: window.innerWidth < 768 ? 35 : 90 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '59, 130, 246' : '34, 211, 238'
        }));

        const draw = () => {
          ctx.clearRect(0, 0, width, height);
          const rect = canvas.getBoundingClientRect();
          const mx = mouseRef.current.x - rect.left;
          const my = mouseRef.current.y - rect.top;

          particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, 0.6)`;
            ctx.fill();

            // Connect lines
            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
              if (dist < (window.innerWidth < 768 ? 80 : 130)) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }

            // Mouse interaction
            const distM = Math.hypot(p.x - mx, p.y - my);
            if (distM < 180) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distM / 180) * 0.6})`;
              ctx.lineWidth = 0.8;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mx, my);
              ctx.stroke();
              p.x -= (p.x - mx) * 0.02;
              p.y -= (p.y - my) * 0.02;
            }
          });
          animationFrameId = requestAnimationFrame(draw);
        };
        draw();
      } else if (type === 'experience') {
        const gridSize = 30;
        let travelers = Array.from({ length: window.innerWidth < 768 ? 5 : 15 }, () => createTraveler(width, height, gridSize));

        function createTraveler(w, h, g) {
          return {
            x: Math.floor(Math.random() * (w / g)) * g,
            y: Math.floor(Math.random() * (h / g)) * g,
            dir: Math.floor(Math.random() * 4),
            path: [],
            maxLength: Math.floor(Math.random() * 20) + 10,
            speed: 2,
            progress: 0,
            color: Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(34, 211, 238, 0.6)'
          };
        }

        const draw = () => {
          ctx.clearRect(0, 0, width, height);
          travelers.forEach((t, i) => {
            t.progress += 1;
            let tipX = t.x, tipY = t.y;
            if (t.dir === 0) tipX += t.progress;
            else if (t.dir === 1) tipY += t.progress;
            else if (t.dir === 2) tipX -= t.progress;
            else if (t.dir === 3) tipY -= t.progress;

            if (t.progress >= gridSize) {
              t.x = tipX; t.y = tipY; t.progress = 0;
              t.path.push({ x: t.x, y: t.y });
              if (t.path.length > t.maxLength) t.path.shift();
              if (Math.random() > 0.6) t.dir = (t.dir + (Math.random() > 0.5 ? 1 : 3)) % 4;
              if (t.x < -50 || t.x > width + 50 || t.y < -50 || t.y > height + 50) travelers[i] = createTraveler(width, height, gridSize);
            }

            if (t.path.length > 1) {
              ctx.beginPath();
              ctx.strokeStyle = t.color;
              ctx.lineWidth = 2;
              ctx.moveTo(t.path[0].x, t.path[0].y);
              t.path.forEach(p => ctx.lineTo(p.x, p.y));
              ctx.lineTo(tipX, tipY);
              ctx.stroke();
            }
          });
          animationFrameId = requestAnimationFrame(draw);
        };
        draw();
      } else if (type === 'skills') {
        const fontSize = 14;
        const cols = Math.floor(width / fontSize);
        let drops = Array.from({ length: cols }, () => Math.random() * -100);

        const draw = () => {
          ctx.fillStyle = 'rgba(2, 4, 10, 0.15)';
          ctx.fillRect(0, 0, width, height);
          ctx.font = `${fontSize}px monospace`;
          drops.forEach((d, i) => {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctx.fillStyle = `rgba(0, ${Math.random() * 100 + 155}, ${Math.random() * 255}, 0.4)`;
            ctx.fillText(text, i * fontSize, d * fontSize);
            if (d * fontSize > height && Math.random() > 0.985) drops[i] = 0;
            drops[i] += 0.15;
          });
          animationFrameId = requestAnimationFrame(draw);
        };
        draw();
      } else if (type === 'projects') {
        const hexRadius = 30;
        const hexWidth = Math.sqrt(3) * hexRadius;
        const hexHeight = 2 * hexRadius;
        const vertDist = hexHeight * 0.75;
        const horizDist = hexWidth;
        const cols = Math.ceil(width / horizDist) + 2;
        const rows = Math.ceil(height / vertDist) + 2;
        let hexGrid = [];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            let xOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
            hexGrid.push({ x: c * horizDist + xOffset - hexWidth / 2, y: r * vertDist - hexHeight / 2, activeLevel: 0 });
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, width, height);
          const rect = canvas.getBoundingClientRect();
          const mx = mouseRef.current.x - rect.left;
          const my = mouseRef.current.y - rect.top;

          hexGrid.forEach(hex => {
            const dist = Math.hypot(hex.x - mx, hex.y - my);
            const targetLevel = dist < 250 ? (1 - dist / 250) : 0;
            hex.activeLevel += (targetLevel - hex.activeLevel) * 0.1;

            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * 60 + 30) * Math.PI / 180;
              const px = hex.x + (hexRadius - 2) * Math.cos(angle);
              const py = hex.y + (hexRadius - 2) * Math.sin(angle);
              if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.strokeStyle = hex.activeLevel > 0.01 ? `rgba(34, 211, 238, ${0.1 + hex.activeLevel * 0.6})` : 'rgba(255, 255, 255, 0.03)';
            ctx.stroke();
            if (hex.activeLevel > 0.01) {
              ctx.fillStyle = `rgba(59, 130, 246, ${hex.activeLevel * 0.1})`;
              ctx.fill();
            }
          });
          animationFrameId = requestAnimationFrame(draw);
        };
        draw();
      } else if (type === 'contact') {
        let time = 0;
        const draw = () => {
          ctx.clearRect(0, 0, width, height);
          time += 0.01;
          const waves = [
            { color: 'rgba(59, 130, 246, 0.3)', freq: 0.01, offset: 0 },
            { color: 'rgba(34, 211, 238, 0.3)', freq: 0.02, offset: 2 },
            { color: 'rgba(139, 92, 246, 0.3)', freq: 0.015, offset: 4 }
          ].slice(0, window.innerWidth < 768 ? 2 : 3);

          waves.forEach(w => {
            ctx.beginPath();
            ctx.strokeStyle = w.color;
            ctx.lineWidth = 2;
            const centerY = height / 2 + 50;
            ctx.moveTo(0, centerY);
            for (let x = 0; x < width; x += (window.innerWidth < 768 ? 5 : 1)) {
              const y = Math.sin(x * w.freq + time + w.offset) * Math.sin(x * 0.005 + time * 2) * 50 * (1 + Math.sin(time));
              ctx.lineTo(x, centerY + y);
            }
            ctx.stroke();
            ctx.lineTo(width, height); ctx.lineTo(0, height);
            ctx.fillStyle = w.color.replace('0.3', '0.05');
            ctx.fill();
          });
          animationFrameId = requestAnimationFrame(draw);
        };
        draw();
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) startAnimation();
      else cancelAnimationFrame(animationFrameId);
    }, { threshold: 0.01 });
    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [type]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[-1] pointer-events-none w-full h-full" />;
};

export default BackgroundCanvas;
