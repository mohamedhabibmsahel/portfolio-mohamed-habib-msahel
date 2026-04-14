'use client';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { type Lang } from '@/data/i18n';
import SoundEngineInit from '@/components/SoundEngine';
import StatusBar from '@/components/StatusBar';

// Dynamic imports for heavy components
const MatrixRain    = dynamic(() => import('@/components/MatrixRain'),    { ssr: false });
const BootScreen    = dynamic(() => import('@/components/BootScreen'),    { ssr: false });
const TerminalWindow = dynamic(() => import('@/components/TerminalWindow'), { ssr: false });
const ProjectsPanel = dynamic(() => import('@/components/ProjectsPanel'), { ssr: false });
const MiniGame      = dynamic(() => import('@/components/MiniGame'),      { ssr: false });
const RecruiterMode = dynamic(() => import('@/components/RecruiterMode'), { ssr: false });

type AppState = 'boot' | 'hacker' | 'recruiter';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('boot');
  const [lang, setLang] = useState<Lang>('en');
  const [showGame, setShowGame] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [classifiedUnlocked, setClassifiedUnlocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Persist lang
  useEffect(() => {
    const saved = localStorage.getItem('habibLang') as Lang | null;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  const handleLangChange = useCallback((l: Lang) => {
    setLang(l);
    localStorage.setItem('habibLang', l);
    document.documentElement.setAttribute('lang', l);
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
  }, []);

  const showToast = useCallback((msg: string, dur = 3000) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), dur);
  }, []);

  const handleBootComplete = useCallback(() => {
    setAppState('hacker');
  }, []);

  const handleSwitchMode = useCallback(() => {
    if (appState === 'hacker') {
      showToast('⟳ Switching to recruiter interface...');
      setTimeout(() => setAppState('recruiter'), 600);
    } else {
      showToast('⟳ Switching back to hacker mode...');
      setTimeout(() => setAppState('hacker'), 600);
    }
  }, [appState, showToast]);

  const handleGameWin = useCallback(() => {
    setGameWon(true);
    setClassifiedUnlocked(true);
    showToast('🏆 ACCESS LEVEL UPGRADED — Classified project unlocked!', 5000);
  }, [showToast]);

  const handleUnlockClassified = useCallback(() => {
    setClassifiedUnlocked(true);
    showToast('🔓 Classified project unlocked!', 4000);
  }, [showToast]);

  // Konami code easter egg
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      idx = e.key === seq[idx] ? idx + 1 : 0;
      if (idx === seq.length) {
        idx = 0;
        showToast('🕹️ KONAMI CODE! +30 lives granted. The Matrix is yours.', 5000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showToast]);

  return (
    <>
      <SoundEngineInit />

      {/* Matrix rain always in background */}
      <MatrixRain />

      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <StatusBar mode={appState === 'recruiter' ? 'recruiter' : 'hacker'} />

      {/* Mini-game modal */}
      <AnimatePresence>
        {showGame && (
          <MiniGame
            lang={lang}
            onClose={() => setShowGame(false)}
            onWin={() => { handleGameWin(); }}
          />
        )}
      </AnimatePresence>

      {/* ── BOOT SCREEN ── */}
      <AnimatePresence>
        {appState === 'boot' && (
          <BootScreen lang={lang} onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {/* ── RECRUITER MODE ── */}
      <AnimatePresence>
        {appState === 'recruiter' && (
          <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
            <RecruiterMode
              lang={lang}
              onLangChange={handleLangChange}
              onSwitchBack={handleSwitchMode}
              classifiedUnlocked={classifiedUnlocked}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── HACKER MODE ── */}
      <AnimatePresence>
        {appState === 'hacker' && (
          <motion.div
            key="hacker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.99, filter: 'blur(4px)' }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'relative',
              zIndex: 10,
              minHeight: '100vh',
              padding: '0 0 30px 0',
            }}
          >
            {/* ── TOP NAV ── */}
            <div style={{
              position: 'sticky',
              top: 0,
              zIndex: 50,
              background: 'rgba(2,11,2,0.92)',
              borderBottom: '1px solid var(--border)',
              backdropFilter: 'blur(8px)',
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              {/* Logo / title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  color: 'var(--green)', fontSize: 15, fontWeight: 800,
                  letterSpacing: 2,
                  textShadow: '0 0 12px rgba(0,255,0,0.5)',
                }}>
                  HabibOS <span style={{ color: 'var(--dim)', fontWeight: 400 }}>v3.0</span>
                </span>
                {gameWon && (
                  <span style={{
                    fontSize: 9, padding: '1px 7px', borderRadius: 10,
                    background: 'rgba(0,255,0,0.12)', border: '1px solid var(--green)',
                    color: 'var(--green)', letterSpacing: 1,
                  }}>
                    ACCESS UPGRADED
                  </span>
                )}
              </div>

              {/* Nav links */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                {[
                  { href: '#terminal-section', label: '~/terminal' },
                  { href: '#projects-section', label: '~/projects' },
                ].map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    style={{
                      color: 'var(--dim)', fontSize: 11, padding: '3px 10px',
                      border: '1px solid var(--border)', borderRadius: 3,
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.color = 'var(--green)';
                      el.style.borderColor = 'var(--green)';
                      el.style.background = 'rgba(0,255,0,0.05)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.color = 'var(--dim)';
                      el.style.borderColor = 'var(--border)';
                      el.style.background = 'transparent';
                    }}
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={() => setShowGame(true)}
                  style={{
                    background: 'rgba(0,255,0,0.06)', border: '1px solid var(--border)',
                    color: 'var(--green)', fontFamily: 'var(--font-mono)',
                    fontSize: 11, padding: '3px 10px', borderRadius: 3, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  🔐 game
                </button>
                <button
                  className="switch-btn"
                  style={{ fontSize: 10, padding: '3px 10px' }}
                  onClick={handleSwitchMode}
                >
                  recruiter-mode
                </button>
              </div>
            </div>

            {/* ── MAIN LAYOUT: Terminal left, Projects right on wide screens ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: 0,
              maxWidth: 1600,
              margin: '0 auto',
            }}>

              {/* Left — Terminal */}
              <div
                id="terminal-section"
                style={{
                  position: 'sticky',
                  top: 52,
                  height: 'calc(100vh - 52px - 24px)',
                  padding: '16px 12px 16px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TerminalWindow
                  lang={lang}
                  onLangChange={handleLangChange}
                  onSwitchMode={handleSwitchMode}
                  onOpenGame={() => setShowGame(true)}
                  onOpenContact={() => setShowContact(true)}
                  classifiedUnlocked={classifiedUnlocked}
                  onUnlockClassified={handleUnlockClassified}
                />
              </div>

              {/* Right — Projects & Skills */}
              <div
                id="projects-section"
                style={{
                  padding: '16px 16px 16px 12px',
                  overflowY: 'auto',
                  maxHeight: 'calc(100vh - 52px - 24px)',
                  position: 'sticky',
                  top: 52,
                  borderLeft: '1px solid var(--border)',
                }}
              >
                <ProjectsPanel lang={lang} classifiedUnlocked={classifiedUnlocked} />
              </div>
            </div>

            {/* ── CONTACT MODAL ── */}
            <AnimatePresence>
              {showContact && (
                <motion.div
                  className="modal-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={e => { if (e.target === e.currentTarget) setShowContact(false); }}
                >
                  <motion.div
                    className="modal-box"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                      <div style={{ color: 'var(--green)', fontWeight: 700, letterSpacing: 2 }}>
                        📡 ./send_message.sh
                      </div>
                      <button
                        onClick={() => setShowContact(false)}
                        style={{
                          background: 'transparent', border: '1px solid var(--border)',
                          color: 'var(--dim)', fontFamily: 'var(--font-mono)',
                          fontSize: 12, padding: '3px 10px', borderRadius: 3, cursor: 'pointer',
                        }}
                      >
                        [X]
                      </button>
                    </div>
                    <ContactForm lang={lang} onClose={() => setShowContact(false)} onToast={showToast} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE: Show panels vertically ── */}
      <style>{`
        @media (max-width: 768px) {
          .hacker-layout {
            grid-template-columns: 1fr !important;
          }
          #terminal-section {
            position: static !important;
            height: 70vh !important;
            max-height: 70vh;
          }
          #projects-section {
            position: static !important;
            max-height: none !important;
            border-left: none !important;
            border-top: 1px solid var(--border);
          }
        }
      `}</style>
    </>
  );
}

/* ── INLINE CONTACT FORM ── */
function ContactForm({
  lang,
  onClose,
  onToast,
}: {
  lang: Lang;
  onClose: () => void;
  onToast: (msg: string, dur?: number) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1800));
    setStatus('sent');
    onToast('✉️ Message transmitted securely!', 4000);
    setTimeout(onClose, 2000);
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(0,255,0,0.03)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    color: 'var(--white)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    padding: '8px 12px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    color: 'var(--green)',
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 4,
    display: 'block',
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ color: 'var(--dim)', fontSize: 11, marginBottom: 4 }}>
        Encryption: <span style={{ color: 'var(--green)' }}>AES-256</span> | Protocol: <span style={{ color: 'var(--green)' }}>HTTPS/3</span>
      </div>

      <div>
        <label style={labelStyle}>input --field=&quot;name&quot;</label>
        <input
          style={inputStyle}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={lang === 'ar' ? 'اسمك...' : lang === 'fr' ? 'Votre nom...' : 'Your name...'}
          onFocus={e => { e.target.style.borderColor = 'var(--green)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
        />
      </div>

      <div>
        <label style={labelStyle}>input --field=&quot;email&quot;</label>
        <input
          type="email"
          style={inputStyle}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          onFocus={e => { e.target.style.borderColor = 'var(--green)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
        />
      </div>

      <div>
        <label style={labelStyle}>input --field=&quot;message&quot;</label>
        <textarea
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={lang === 'ar' ? 'رسالتك...' : lang === 'fr' ? 'Votre message...' : 'Your message...'}
          onFocus={e => { e.target.style.borderColor = 'var(--green)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
        />
      </div>

      {status === 'error' && (
        <div style={{ color: 'var(--red)', fontSize: 12 }}>
          &gt; ERROR: All fields required. Valid email format needed.
        </div>
      )}
      {status === 'sent' && (
        <div style={{ color: 'var(--green)', fontSize: 12 }}>
          &gt; SUCCESS: Message transmitted securely. Habib will respond shortly. ✓
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        style={{
          background: 'rgba(0,255,0,0.08)',
          border: '1px solid var(--green)',
          color: 'var(--green)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          padding: '10px 24px',
          borderRadius: 4,
          cursor: status === 'sending' || status === 'sent' ? 'not-allowed' : 'pointer',
          letterSpacing: 1,
          transition: 'all 0.2s',
          opacity: status === 'sending' || status === 'sent' ? 0.6 : 1,
        }}
      >
        {status === 'sending' ? '⟳ Transmitting...' : status === 'sent' ? '✓ Sent!' : './transmit --encrypt --send'}
      </button>

      {/* Social links */}
      <div style={{ display: 'flex', gap: 16, marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        {[
          { label: 'GitHub', url: 'https://github.com/habibmsahel' },
          { label: 'LinkedIn', url: 'https://linkedin.com/in/habibmsahel' },
          { label: 'Email', url: 'mailto:habib.msahel@email.com' },
        ].map(l => (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--dim)', fontSize: 11,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--cyan)'; }}
            onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--dim)'; }}
          >
            ⬡ {l.label}
          </a>
        ))}
      </div>
    </form>
  );
}
