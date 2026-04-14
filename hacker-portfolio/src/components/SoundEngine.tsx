'use client';
import { useEffect, useRef, useCallback } from 'react';

let _ctx: AudioContext | null = null;
let _enabled = false;

function getCtx(): AudioContext {
  if (!_ctx) _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return _ctx;
}

function beep(freq = 800, dur = 0.05, vol = 0.05, type: OscillatorType = 'square') {
  if (!_enabled) return;
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(vol, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + dur);
  } catch (_) {}
}

export const Sound = {
  enable: () => { _enabled = true; getCtx(); },
  disable: () => { _enabled = false; },
  isOn: () => _enabled,
  toggle: () => { _enabled ? Sound.disable() : Sound.enable(); return _enabled; },
  key: () => beep(480 + Math.random() * 220, 0.035, 0.04, 'square'),
  success: () => {
    beep(880, 0.12, 0.08, 'sine');
    setTimeout(() => beep(1109, 0.18, 0.07, 'sine'), 110);
    setTimeout(() => beep(1318, 0.14, 0.06, 'sine'), 240);
  },
  error: () => beep(200, 0.22, 0.08, 'sawtooth'),
  boot: () => {
    beep(440, 0.08, 0.06, 'sine');
    setTimeout(() => beep(660, 0.1, 0.06, 'sine'), 120);
  },
  access: () => {
    [440, 550, 660, 880].forEach((f, i) =>
      setTimeout(() => beep(f, 0.15, 0.07, 'sine'), i * 80)
    );
  },
  denied: () => {
    beep(300, 0.15, 0.1, 'sawtooth');
    setTimeout(() => beep(200, 0.3, 0.1, 'sawtooth'), 150);
  },
  type: () => beep(600 + Math.random() * 100, 0.02, 0.03, 'square'),
  click: () => beep(1000, 0.03, 0.04, 'sine'),
};

export default function SoundEngineInit() {
  const enable = useCallback(() => Sound.enable(), []);
  useEffect(() => {
    document.addEventListener('click', enable, { once: true });
    document.addEventListener('keydown', enable, { once: true });
    return () => {
      document.removeEventListener('click', enable);
      document.removeEventListener('keydown', enable);
    };
  }, [enable]);
  return null;
}
