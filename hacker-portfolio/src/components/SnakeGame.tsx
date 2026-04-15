'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { type Lang, I18N } from '@/data/i18n';
import { Sound } from './SoundEngine';

interface SnakeGameProps {
  lang: Lang;
  onWin: () => void;
  onLose: () => void;
  onBack: () => void;
}

const GRID_SIZE = 15;
const TICK_RATE = 150; // ms
const WIN_SCORE = 10;

type Point = { x: number; y: number };

export default function SnakeGame({ lang, onWin, onLose, onBack }: SnakeGameProps) {
  const [snake, setSnake] = useState<Point[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Point>({ x: 10, y: 3 });
  const [dir, setDir] = useState<Point>({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const dirRef = useRef(dir);
  
  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const placeFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line
      const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    setFood(newFood);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default scrolling for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    if (isGameOver) return;
    
    const { x, y } = dirRef.current;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (y !== 1) setDir({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (y !== -1) setDir({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (x !== 1) setDir({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (x !== -1) setDir({ x: 1, y: 0 });
        break;
      case ' ':
        setIsPaused(p => !p);
        break;
    }
  }, [isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = {
          x: head.x + dirRef.current.x,
          y: head.y + dirRef.current.y
        };

        // Wall collision
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          Sound.denied();
          return prev;
        }

        // Self collision
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setIsGameOver(true);
          Sound.denied();
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          Sound.key();
          const newScore = score + 1;
          setScore(newScore);
          
          if (newScore >= WIN_SCORE) {
            Sound.success();
            onWin();
            return prev; // Stop moving
          } else {
            placeFood(newSnake);
          }
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, TICK_RATE);

    return () => clearInterval(interval);
  }, [food, isGameOver, isPaused, score, onWin, placeFood]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ color: 'var(--green)', fontSize: 13, marginBottom: 12, letterSpacing: 1, opacity: 0.8 }}>
        Execute net_worm.exe --target=packets
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 280, marginBottom: 8 }}>
        <span style={{ color: 'var(--dim)', fontSize: 12 }}>SCORE: <span style={{ color: 'var(--green)' }}>{score}</span>/{WIN_SCORE}</span>
        {isPaused && <span style={{ color: 'var(--yellow)', fontSize: 12 }} className="blink">PAUSED</span>}
      </div>

      {/* Grid container */}
      <div style={{
        background: 'var(--bg)',
        border: '2px solid var(--border)',
        boxShadow: '0 0 10px rgba(0,255,0,0.1)',
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        width: 280,
        height: 280,
        position: 'relative'
      }}>
        {/* Draw cells */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isFood = food.x === x && food.y === y;
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;

          return (
            <div
              key={i}
              style={{
                background: isHead ? 'var(--green)' : isSnake ? 'var(--green-dim)' : isFood ? 'var(--red)' : 'transparent',
                border: '1px solid rgba(0,255,0,0.03)',
                boxShadow: isFood ? '0 0 8px var(--red)' : isHead ? '0 0 8px var(--green)' : 'none',
                opacity: isSnake && !isHead ? 0.7 : 1,
                borderRadius: isFood ? '50%' : '1px',
                transform: isFood ? 'scale(0.7)' : 'scale(0.9)'
              }}
            />
          );
        })}
        {isGameOver && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,0,0,0.15)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <span style={{ color: 'var(--red)', fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>CONNECTION LOST</span>
            <button
              onClick={onLose}
              style={{
                background: 'rgba(255,0,0,0.2)', border: '1px solid var(--red)',
                color: 'var(--red)', padding: '6px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)'
              }}
            >
              EXIT
            </button>
          </div>
        )}
      </div>

      <div style={{ color: 'var(--dim)', fontSize: 10, marginTop: 16 }}>
        Use Arrow Keys or W A S D to move. Space to pause.
      </div>
      
      <button
        onClick={onBack}
        style={{
          marginTop: 16, background: 'transparent', border: 'none',
          color: 'var(--dim)', fontFamily: 'var(--font-mono)',
          fontSize: 11, cursor: 'pointer', padding: 0,
        }}
      >
        ← abort process
      </button>
    </motion.div>
  );
}
