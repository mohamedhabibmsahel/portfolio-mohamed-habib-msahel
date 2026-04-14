'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Lang, I18N } from '@/data/i18n';
import { Sound } from './SoundEngine';

interface MiniGameProps {
  lang: Lang;
  onClose: () => void;
  onWin: () => void;
}

type GameState = 'idle' | 'playing' | 'won' | 'lost';

interface LogEntry {
  attempt: number;
  guess: number;
  hint: string;
  remaining: number;
}

export default function MiniGame({ lang, onClose, onWin }: MiniGameProps) {
  const d = I18N[lang];
  const MAX_ATTEMPTS = 7;
  const [gameState, setGameState] = useState<GameState>('idle');
  const [secret, setSecret] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [log, setLog] = useState<LogEntry[]>([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [crackProgress, setCrackProgress] = useState(0);
  const [showBinaryChallenge, setShowBinaryChallenge] = useState(false);
  const [binaryAnswer, setBinaryAnswer] = useState('');
  const [binaryStatus, setBinaryStatus] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  function startGame() {
    const s = Math.floor(Math.random() * 100) + 1;
    setSecret(s);
    setAttempts(0);
    setLog([]);
    setStatusMsg('');
    setCrackProgress(0);
    setGameState('playing');
    setShowBinaryChallenge(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  function guess() {
    if (gameState !== 'playing') return;
    const val = parseInt(inputVal);
    if (!val || val < 1 || val > 100) {
      setStatusMsg(d.game_invalid);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setInputVal('');
    const remaining = MAX_ATTEMPTS - newAttempts;

    // Update crack progress visual
    const progressPct = (newAttempts / MAX_ATTEMPTS) * 100;
    setCrackProgress(progressPct);

    if (val === secret) {
      setLog(prev => [...prev, { attempt: newAttempts, guess: val, hint: '✓ CRACKED', remaining }]);
      setStatusMsg(d.game_cracked(secret, newAttempts));
      setGameState('won');
      Sound.access();
      onWin();
      return;
    }

    if (remaining <= 0) {
      setLog(prev => [...prev, { attempt: newAttempts, guess: val, hint: '✗ FAIL', remaining: 0 }]);
      setStatusMsg(d.game_locked(secret));
      setGameState('lost');
      Sound.denied();
      return;
    }

    const hint = val < secret ? d.game_low : d.game_high;
    setLog(prev => [...prev, { attempt: newAttempts, guess: val, hint, remaining }]);
    setStatusMsg('');
    Sound.key();
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handleBinarySubmit() {
    // The binary 01001000 01000001 01000010 01001001 01000010 = HABIB
    const correct = binaryAnswer.trim().toUpperCase() === 'HABIB';
    if (correct) {
      setBinaryStatus('🔓 CORRECT! Binary decoded successfully.');
      Sound.access();
      setTimeout(() => {
        setShowBinaryChallenge(false);
        onWin();
      }, 1500);
    } else {
      setBinaryStatus('❌ Incorrect. Try again.');
      Sound.error();
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          className="modal-box"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ color: 'var(--green)', fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>
                🔐 {d.game_title}
              </div>
              <div style={{ color: 'var(--dim)', fontSize: 11, marginTop: 2 }}>
                // MAINFRAME SECURITY PROTOCOL v3.1
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--dim)', fontFamily: 'var(--font-mono)',
                fontSize: 12, padding: '4px 10px', borderRadius: 4, cursor: 'pointer',
              }}
            >
              [X] exit
            </button>
          </div>

          {/* Idle state */}
          {gameState === 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ color: 'var(--white)', marginBottom: 12 }}>
                {d.game_intro1} <span style={{ color: 'var(--yellow)' }}>1–100</span>.
              </p>
              <p style={{ color: 'var(--dim)', marginBottom: 20 }}>
                {d.game_intro2} <span style={{ color: 'var(--yellow)' }}>{MAX_ATTEMPTS}</span> {d.game_attempts_label}
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={startGame}
                  style={{
                    background: 'rgba(0,255,0,0.1)', border: '1px solid var(--green)',
                    color: 'var(--green)', fontFamily: 'var(--font-mono)',
                    fontSize: 13, padding: '10px 24px', borderRadius: 4, cursor: 'pointer',
                    letterSpacing: 1,
                  }}
                >
                  ./crack_mainframe.sh
                </button>
                <button
                  onClick={() => setShowBinaryChallenge(true)}
                  style={{
                    background: 'rgba(0,255,255,0.06)', border: '1px solid var(--cyan)',
                    color: 'var(--cyan)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, padding: '10px 18px', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  binary_decode.sh
                </button>
              </div>
            </motion.div>
          )}

          {/* Binary challenge */}
          {showBinaryChallenge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 8 }}
            >
              <p style={{ color: 'var(--cyan)', marginBottom: 8 }}>🔢 BINARY DECODING CHALLENGE</p>
              <div style={{
                background: 'rgba(0,255,255,0.04)', border: '1px solid var(--cyan)',
                padding: 12, borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 13,
                color: 'var(--white)', marginBottom: 8, letterSpacing: 2,
              }}>
                01001000 01000001 01000010 01001001 01000010
              </div>
              <p style={{ color: 'var(--dim)', fontSize: 11, marginBottom: 12 }}>
                {I18N[lang].classified_hint}
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={binaryAnswer}
                  onChange={e => setBinaryAnswer(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleBinarySubmit()}
                  placeholder="Your answer..."
                  style={{
                    background: 'transparent', border: '1px solid var(--border)',
                    borderBottom: '1px solid var(--green)', color: 'var(--white)',
                    fontFamily: 'var(--font-mono)', fontSize: 13,
                    padding: '6px 10px', outline: 'none', borderRadius: 4, flex: 1,
                  }}
                />
                <button
                  onClick={handleBinarySubmit}
                  style={{
                    background: 'rgba(0,255,0,0.1)', border: '1px solid var(--green)',
                    color: 'var(--green)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, padding: '6px 16px', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  DECODE
                </button>
              </div>
              {binaryStatus && (
                <p style={{ marginTop: 8, color: binaryStatus.startsWith('🔓') ? 'var(--green)' : 'var(--red)', fontSize: 12 }}>
                  {binaryStatus}
                </p>
              )}
              <button
                onClick={() => setShowBinaryChallenge(false)}
                style={{
                  marginTop: 10, background: 'transparent', border: 'none',
                  color: 'var(--dim)', fontFamily: 'var(--font-mono)',
                  fontSize: 11, cursor: 'pointer', padding: 0,
                }}
              >
                ← back to main game
              </button>
            </motion.div>
          )}

          {/* Playing state */}
          {gameState === 'playing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Crack progress bar */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--dim)', marginBottom: 4 }}>
                  CRACK PROGRESS: <span style={{ color: crackProgress > 70 ? 'var(--red)' : 'var(--yellow)' }}>{Math.round(crackProgress)}%</span>
                  {' '}| Attempts: <span style={{ color: 'var(--green)' }}>{attempts}/{MAX_ATTEMPTS}</span>
                </div>
                <div className="progress-bar-outer">
                  <div
                    className="progress-bar-inner"
                    style={{
                      width: `${crackProgress}%`,
                      background: crackProgress > 70
                        ? 'linear-gradient(90deg, var(--orange), var(--red))'
                        : 'linear-gradient(90deg, var(--green-dim), var(--green))',
                    }}
                  />
                </div>
              </div>

              {/* Log */}
              <div
                ref={logRef}
                style={{
                  maxHeight: 180, overflowY: 'auto', marginBottom: 12,
                  background: 'rgba(0,0,0,0.3)', borderRadius: 4, padding: '8px 10px',
                  border: '1px solid var(--border)',
                }}
              >
                {log.length === 0 && (
                  <p style={{ color: 'var(--dim)', fontSize: 12 }}>
                    crack@mainframe:~$ Awaiting injection...
                  </p>
                )}
                {log.map((entry, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ fontSize: 12, lineHeight: 1.7 }}
                  >
                    <span style={{ color: 'var(--dim)' }}>×{entry.attempt}:</span>
                    {' '}
                    <span style={{ color: 'var(--white)' }}>{entry.guess}</span>
                    {' → '}
                    <span style={{
                      color: entry.hint === '✓ CRACKED' ? 'var(--green)'
                        : entry.hint === '✗ FAIL' ? 'var(--red)'
                          : 'var(--cyan)',
                    }}>
                      {entry.hint}
                    </span>
                    {' '}
                    <span style={{ color: 'var(--dim)', fontSize: 11 }}>
                      ({d.game_left(entry.remaining)})
                    </span>
                  </motion.p>
                ))}
              </div>

              {/* Input */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: 'var(--green)', fontSize: 12 }}>crack@mainframe:~$</span>
                <input
                  ref={inputRef}
                  type="number"
                  min={1}
                  max={100}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && guess()}
                  placeholder="1-100"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--green)',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    outline: 'none',
                    width: 80,
                    padding: '2px 4px',
                  }}
                />
                <button
                  onClick={guess}
                  style={{
                    background: 'rgba(0,255,0,0.1)', border: '1px solid var(--green)',
                    color: 'var(--green)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, padding: '5px 16px', borderRadius: 4, cursor: 'pointer',
                    letterSpacing: 1,
                  }}
                >
                  INJECT
                </button>
              </div>
              {statusMsg && (
                <p style={{ marginTop: 8, fontSize: 12, color: 'var(--dim)' }}>{statusMsg}</p>
              )}
            </motion.div>
          )}

          {/* Won state */}
          {gameState === 'won' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ textAlign: 'center', padding: '20px 0' }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
              <div style={{ color: 'var(--green)', fontSize: 22, fontWeight: 800, letterSpacing: 4, marginBottom: 8 }}>
                ACCESS LEVEL UPGRADED
              </div>
              <div
                style={{ color: 'var(--white)', fontSize: 13, marginBottom: 20 }}
                dangerouslySetInnerHTML={{ __html: d.game_cracked(secret, attempts) }}
              />
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button
                  onClick={startGame}
                  style={{
                    background: 'rgba(0,255,0,0.1)', border: '1px solid var(--green)',
                    color: 'var(--green)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  ./restart_game.sh
                </button>
                <button
                  onClick={onClose}
                  style={{
                    background: 'transparent', border: '1px solid var(--border)',
                    color: 'var(--dim)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  exit
                </button>
              </div>
            </motion.div>
          )}

          {/* Lost state */}
          {gameState === 'lost' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '20px 0' }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
              <div style={{ color: 'var(--red)', fontSize: 18, fontWeight: 700, letterSpacing: 3, marginBottom: 8 }}>
                SYSTEM LOCKED
              </div>
              <div
                style={{ color: 'var(--dim)', fontSize: 13, marginBottom: 20 }}
                dangerouslySetInnerHTML={{ __html: d.game_locked(secret) }}
              />
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button
                  onClick={startGame}
                  style={{
                    background: 'rgba(255,0,64,0.08)', border: '1px solid var(--red)',
                    color: 'var(--red)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  ./restart_game.sh
                </button>
                <button
                  onClick={onClose}
                  style={{
                    background: 'transparent', border: '1px solid var(--border)',
                    color: 'var(--dim)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, padding: '8px 20px', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  exit
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
