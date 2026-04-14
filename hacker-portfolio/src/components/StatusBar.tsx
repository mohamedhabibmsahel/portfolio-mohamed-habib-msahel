'use client';
import { useEffect, useState, useRef } from 'react';

interface StatusBarProps {
  mode: 'hacker' | 'recruiter';
}

export default function StatusBar({ mode }: StatusBarProps) {
  const [time, setTime] = useState('');
  const [packets, setPackets] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [netActivity, setNetActivity] = useState<string[]>([]);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const tunisiaTime = now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Tunis', hour12: false });
      setTime(tunisiaTime);
      setUptime(Math.floor((Date.now() - startTime.current) / 1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPackets(p => p + Math.floor(Math.random() * 12 + 1));
    }, 800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const events = [
      'SSH handshake...', 'TLS 1.3 OK', 'Sync: projects/', 'GET /skills',
      'WebSocket ●', 'ping 12ms', 'Decrypt OK', 'Auth: root ✓',
    ];
    const id = setInterval(() => {
      setNetActivity(prev => {
        const next = [events[Math.floor(Math.random() * events.length)], ...prev].slice(0, 2);
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  if (mode === 'recruiter') {
    return (
      <div className="status-bar" style={{ background: '#0a0a0f', borderColor: 'rgba(99,102,241,0.2)', color: '#64748b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Mohamed Habib Msahel</span>
          <span style={{ color: '#6366f1' }}>●</span>
          <span>Full-Stack & Mobile Developer</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Tunisia 🇹🇳</span>
          <span>|</span>
          <span>{time} TUN</span>
          <span style={{ color: '#06b6d4' }}>● Open to Work</span>
        </div>
      </div>
    );
  }

  return (
    <div className="status-bar">
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span>
          <span className="status-dot" style={{ background: 'var(--green)', boxShadow: '0 0 6px var(--green)' }} />
          <span style={{ color: 'var(--green)' }}>HabibOS v3.0</span>
        </span>
        <span style={{ color: 'var(--dim)' }}>|</span>
        <span style={{ color: 'var(--dim)' }}>uptime: <span style={{ color: 'var(--cyan)' }}>{uptime}s</span></span>
        <span style={{ color: 'var(--dim)' }}>|</span>
        <span style={{ color: 'var(--dim)' }}>pkts: <span style={{ color: 'var(--green)' }}>{packets}</span></span>
      </div>

      {/* Center — net activity */}
      <div className="status-network" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--dim)', fontSize: 9 }}>
        {netActivity.map((a, i) => (
          <span key={i} style={{ opacity: i === 0 ? 1 : 0.5, color: 'var(--dim)' }}>
            <span style={{ color: 'var(--cyan)', marginRight: 3 }}>▶</span>{a}
          </span>
        ))}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--dim)' }}>TUN:</span>
        <span style={{ color: 'var(--green)', fontWeight: 600 }}>{time}</span>
        <span style={{ color: 'var(--dim)' }}>|</span>
        <span>
          <span className="status-dot" style={{ background: 'var(--green)', animation: 'networkPulse 2s infinite' }} />
          <span style={{ color: 'var(--cyan)', fontSize: 9 }}>SECURE</span>
        </span>
      </div>
    </div>
  );
}
