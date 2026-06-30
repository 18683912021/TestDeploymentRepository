import { useEffect, useRef } from 'react';

// 彩带庆祝效果 — 购买/铸造成功后触发
export default function Confetti({ active, onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const colors = [
      '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
      '#3b82f6', '#fbbf24', '#a78bfa', '#f472b6',
    ];

    const pieces = [];
    for (let i = 0; i < 200; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.5,
        w: Math.random() * 10 + 4,
        h: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 2,
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 10,
        opacity: 1,
        delay: Math.random() * 60,
      });
    }

    let frame = 0;
    let animId;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDone = true;
      for (const p of pieces) {
        if (frame < p.delay) { allDone = false; continue; }
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rotV;
        p.vy += 0.03; // 重力
        p.opacity -= 0.003;

        if (p.opacity <= 0 || p.y > canvas.height + 20) continue;
        allDone = false;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (allDone && frame > 200) {
        cancelAnimationFrame(animId);
        onDone?.();
        return;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [active, onDone]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
