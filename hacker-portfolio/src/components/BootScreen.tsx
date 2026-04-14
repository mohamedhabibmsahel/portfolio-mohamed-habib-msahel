'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Lang } from '@/data/i18n';
import { I18N } from '@/data/i18n';
import { Sound } from './SoundEngine';

interface BootScreenProps {
  lang: Lang;
  onComplete: () => void;
}

export default function BootScreen({ lang, onComplete }: BootScreenProps) {
  const [lines, setLines] = useState<Array<{ text: string; cls: string }>>([]);
  const [showAccess, setShowAccess] = useState(false);
  const [accessType, setAccessType] = useState<'granted' | 'denied'>('granted');
  const [showIp, setShowIp] = useState(false);
  const [fakeInfo, setFakeInfo] = useState({ ip: '', os: '', browser: '' });
  const [progress, setProgress] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate fake system info
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
    const oss = ['Windows 11 x64', 'macOS Ventura 13.6', 'Ubuntu 22.04 LTS', 'Kali Linux 2024.1'];
    const browsers = ['Chrome 124', 'Firefox 125', 'Safari 17.3', 'Edge 124'];
    setFakeInfo({
      ip,
      os: oss[Math.floor(Math.random() * oss.length)],
      browser: browsers[Math.floor(Math.random() * browsers.length)],
    });

    // 10% chance of ACCESS DENIED (fun easter egg)
    const denied = Math.random() < 0.10;
    setAccessType(denied ? 'denied' : 'granted');

    const bootLines = I18N[lang].boot_lines;
    let maxDelay = 0;
    bootLines.forEach(item => {
      if (item.delay > maxDelay) maxDelay = item.delay;
    });

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(p => {
        const next = p + (100 / (maxDelay / 40));
        return next >= 95 ? 95 : next;
      });
    }, 40);

    // Schedule each line
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((item) => {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, { text: item.text, cls: item.cls }]);
        if (item.cls === 'boot-ok') Sound.key();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, item.delay);
      timers.push(timer);
    });

    // Show IP info after a while
    const ipTimer = setTimeout(() => setShowIp(true), 2300);
    timers.push(ipTimer);

    // Show access banner
    const accessTimer = setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);
      setShowAccess(true);
      if (denied) { Sound.denied(); }
      else { Sound.access(); }
    }, maxDelay + 200);
    timers.push(accessTimer);

    // Auto proceed (extra 2s if denied, 1.5s if granted)
    const proceedTimer = setTimeout(() => {
      if (!denied) onComplete();
    }, maxDelay + (denied ? 2800 : 2000));
    timers.push(proceedTimer);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <motion.div
      className="boot-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Scan line animation */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(0,255,0,0.6), transparent)',
        animation: 'scanLine 3s linear infinite',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Content */}
      <div style={{ width: '100%', maxWidth: 760, position: 'relative', zIndex: 3 }}>

        <AnimatePresence>
          {showIp && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute', top: -100, right: 0,
                background: 'rgba(0,255,0,0.06)', border: '1px solid rgba(0,255,0,0.3)',
                boxShadow: '0 0 20px rgba(0,255,0,0.1)',
                borderRadius: 4, padding: '10px 16px', fontSize: 11,
                color: 'var(--green)', lineHeight: 1.7,
                backdropFilter: 'blur(4px)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ color: 'var(--dim)', fontSize: 9, marginBottom: 4 }}>[ SYSTEM DIAGNOSTICS ]</div>
              <div>ID: <span style={{ color: 'var(--cyan)' }}>HACKER-X</span></div>
              <div>LOC: <span style={{ color: 'var(--cyan)' }}>{fakeInfo.ip}</span></div>
              <div>CPU: <span style={{ color: 'var(--yellow)' }}>42°C</span> MEM: <span style={{ color: 'var(--yellow)' }}>85%</span></div>
              <div style={{ fontSize: 9, opacity: 0.6, marginTop: 4 }}>ENCRYPTED: AES-XTS-256</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boot lines */}
        <div style={{ minHeight: 420, maxHeight: '60vh', overflowY: 'auto', paddingBottom: 8 }}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className={`boot-line ${line.cls}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Progress bar */}
        <div className="progress-bar-outer" style={{ marginTop: 16 }}>
          <div
            className="progress-bar-inner"
            style={{ width: `${progress}%`, transition: 'width 0.08s linear' }}
          />
        </div>
        <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 4, textAlign: 'right' }}>
          {Math.round(progress)}% — Loading system components...
        </div>

        {/* Access banner */}
        <AnimatePresence>
          {showAccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              style={{ marginTop: 32, textAlign: 'center' }}
            >
              <div
                className={`access-banner ${accessType === 'granted' ? 'access-granted' : 'access-denied'}`}
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: 6 }}
              >
                {accessType === 'granted' ? '[ ACCESS GRANTED ]' : '[ ACCESS DENIED ]'}
              </div>
              {accessType === 'denied' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ marginTop: 12, color: 'var(--dim)', fontSize: 12 }}
                >
                  <span style={{ color: 'var(--red)' }}>Error 403:</span> Unauthorized access attempt logged.
                  <br />
                  <span style={{ color: 'var(--yellow)' }}>Just kidding 😄</span> — Redirecting...
                  <br /><br />
                  <button
                    onClick={onComplete}
                    style={{
                      background: 'rgba(255,0,64,0.1)', border: '1px solid var(--red)',
                      color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: 12,
                      padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
                    }}
                  >
                    Override — Force Access
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
