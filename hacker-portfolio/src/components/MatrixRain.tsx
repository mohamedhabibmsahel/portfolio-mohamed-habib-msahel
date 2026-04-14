'use client';
import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ∑∆Ωμπ';
    let cols: number, drops: number[], fontSize: number;
    let animId: number;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fontSize = Math.max(10, Math.floor(window.innerWidth / 120));
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -canvas.height / fontSize);
    }

    function draw() {
      ctx.fillStyle = 'rgba(2,11,2,0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const brightness = 0.15 + Math.random() * 0.4;
        // Occasionally a bright white drop at the head
        if (drops[i] > 0 && Math.random() > 0.95) {
          ctx.fillStyle = `rgba(200,255,200,${brightness + 0.3})`;
        } else {
          ctx.fillStyle = `rgba(0,${Math.floor(180 + Math.random() * 75)},0,${brightness})`;
        }
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.42;
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
}
