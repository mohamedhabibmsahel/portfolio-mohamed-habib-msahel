'use client';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type Lang, I18N } from '@/data/i18n';
import { Sound } from './SoundEngine';

interface WordleGameProps {
  lang: Lang;
  onWin: () => void;
  onLose: () => void;
  onBack: () => void;
}

const WORDS = ['VIRUS', 'PROXY', 'TOKEN', 'LINUX', 'ADMIN', 'CYBER', 'MACRO', 'LOGIC', 'SHELL', 'CACHE', 'CRACK', 'DEBUG', 'BYTES'];
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

type Status = 'correct' | 'present' | 'absent' | 'empty';

export default function WordleGame({ lang, onWin, onLose, onBack }: WordleGameProps) {
  const [secret, setSecret] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setSecret(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2000);
  }, []);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      showToast('INCOMPLETE PAYLOAD');
      Sound.error();
      return;
    }

    // Evaluate guess
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === secret) {
      Sound.access();
      setIsGameOver(true);
      setTimeout(() => onWin(), 1500);
      return;
    }

    if (newGuesses.length >= MAX_GUESSES) {
      Sound.denied();
      setIsGameOver(true);
      setTimeout(() => onLose(), 2500);
      return;
    }

    Sound.key();
  }, [currentGuess, guesses, secret, onWin, onLose, showToast]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isGameOver) return;

    if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      Sound.type();
      return;
    }

    if (e.key === 'Enter') {
      submitGuess();
      return;
    }

    // Letters only
    if (/^[A-Za-z]$/.test(e.key)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => (prev + e.key).toUpperCase());
        Sound.type();
      }
    }
  }, [currentGuess, isGameOver, submitGuess]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getLetterStatus = (letter: string, index: number, word: string): Status => {
    if (word[index] === secret[index]) return 'correct';
    if (secret.includes(word[index])) return 'present';
    return 'absent';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ color: 'var(--yellow)', fontSize: 13, marginBottom: 4, letterSpacing: 1 }}>
        ./brute_force.sh --target=passkey
      </div>
      <div style={{ color: 'var(--dim)', fontSize: 11, marginBottom: 16 }}>
        Crack the {WORD_LENGTH}-letter admin password.
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {Array.from({ length: MAX_GUESSES }).map((_, rIdx) => {
          const isCurrentRow = rIdx === guesses.length;
          const guess = rIdx < guesses.length ? guesses[rIdx] : isCurrentRow ? currentGuess : '';

          return (
            <div key={rIdx} style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: WORD_LENGTH }).map((_, cIdx) => {
                const letter = guess[cIdx] || '';
                const isSubmitted = rIdx < guesses.length;
                let status: Status = 'empty';
                if (isSubmitted) {
                  status = getLetterStatus(letter, cIdx, guess);
                }

                const bgColor = status === 'correct' ? 'rgba(0,255,0,0.15)'
                  : status === 'present' ? 'rgba(255,255,0,0.15)'
                    : status === 'absent' ? 'rgba(255,255,255,0.05)'
                      : 'transparent';

                const borderColor = status === 'correct' ? 'var(--green)'
                  : status === 'present' ? 'var(--yellow)'
                    : status === 'absent' ? 'var(--dim)'
                      : isCurrentRow && letter ? 'var(--cyan)'
                        : 'var(--border)';

                const color = status === 'correct' ? 'var(--green)'
                  : status === 'present' ? 'var(--yellow)'
                    : status === 'absent' ? 'var(--dim)'
                      : 'var(--white)';

                return (
                  <motion.div
                    key={cIdx}
                    initial={isSubmitted ? { rotateX: 90 } : false}
                    animate={isSubmitted ? { rotateX: 0 } : false}
                    transition={{ delay: isSubmitted ? cIdx * 0.15 : 0 }}
                    style={{
                      width: 40, height: 40,
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      background: bgColor, border: `1px solid ${borderColor}`,
                      color, fontSize: 20, fontFamily: 'var(--font-mono)', fontWeight: 'bold'
                    }}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>
          );
        })}

        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                background: 'var(--bg)', border: '1px solid var(--red)',
                color: 'var(--red)', padding: '6px 12px', fontSize: 11,
                fontFamily: 'var(--font-mono)', zIndex: 10
              }}
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isGameOver && guesses.length >= MAX_GUESSES && guesses[guesses.length - 1] !== secret && (
        <div style={{ color: 'var(--red)', fontSize: 12, marginBottom: 12 }}>
          ACCESS DENIED. TOKEN WAS: <span style={{ color: 'var(--white)' }}>{secret}</span>
        </div>
      )}

      <div style={{ color: 'var(--dim)', fontSize: 10, textAlign: 'center', maxWidth: 260 }}>
        Type on keyboard. Green = Correct position, Yellow = Wrong position, Gray = Incorrect.
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
