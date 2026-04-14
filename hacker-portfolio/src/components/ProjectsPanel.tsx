'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, SKILLS } from '@/data/portfolio';
import { type Lang, I18N } from '@/data/i18n';
import { Sound } from './SoundEngine';

interface ProjectsPanelProps {
  lang: Lang;
  classifiedUnlocked: boolean;
}

export default function ProjectsPanel({ lang, classifiedUnlocked }: ProjectsPanelProps) {
  const d = I18N[lang];
  const [skillBarsVisible, setSkillBarsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setSkillBarsVisible(true);
    }, { threshold: 0.1 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const badgeCls = (badge: string) => {
    if (badge === 'ACTIVE' || badge === 'LIVE') return 'badge badge-active';
    if (badge === 'ACADEMIC') return 'badge badge-academic';
    if (badge === 'CLASSIFIED') return '';
    return 'badge badge-maintained';
  };

  const levelLabel = (key: string) =>
    key === 'expert' ? d.level_expert : key === 'advanced' ? d.level_advanced : d.level_intermediate;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingBottom: 60 }}>

      {/* ── FILE SYSTEM HEADER ── */}
      <div style={{
        background: 'rgba(0,255,0,0.02)',
        border: '1px solid var(--border)',
        borderRadius: 4, padding: '12px 16px',
      }}>
        <div className="terminal-titlebar" style={{ padding: '6px 0', background: 'transparent', border: 'none' }}>
          <span style={{ color: 'var(--dim)', fontSize: 12 }}>
            <span style={{ color: 'var(--green)' }}>habib@portfolio</span>:<span style={{ color: 'var(--cyan)' }}>~/projects</span>$ ls -la
          </span>
        </div>
        <div style={{ color: 'var(--dim)', fontSize: 11, marginTop: 6 }}>
          {lang === 'fr' ? 'total 13 projets' : lang === 'ar' ? 'إجمالي 13 مشروعاً' : 'total 13 projects'} | drwxr-xr-x Apr 14 2026
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="projects-grid">
        {PROJECTS.map((p, i) => {
          const isLocked = p.classified && !classifiedUnlocked;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={isLocked ? 'classified-card' : 'proj-card'}
            >
              {/* Badge + Dir */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ color: 'var(--dim)', fontSize: 10, letterSpacing: 0.3 }}>{p.dir}</div>
                {isLocked ? (
                  <span style={{ fontSize: 10, color: 'var(--red)', border: '1px solid var(--red)', padding: '1px 6px', borderRadius: 2 }}>
                    🔒 ENCRYPTED
                  </span>
                ) : (
                  <span className={badgeCls(p.badge)}>{p.badge}</span>
                )}
              </div>

              {/* Media */}
              {p.media && !isLocked && (
                <div className="proj-media">
                  {p.media.type === 'image' ? (
                    <img
                      src={p.media.url}
                      alt={p.name}
                      loading="lazy"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div className="video-wrapper">
                      <iframe
                        src={`${p.media.url}?enablejsapi=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        loading="lazy"
                        title={p.name}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Name */}
              <div style={{
                color: isLocked ? 'var(--red)' : 'var(--white)',
                fontWeight: 600,
                fontSize: 14,
                marginBottom: 6,
                textShadow: isLocked ? '0 0 8px rgba(255,0,64,0.4)' : undefined,
              }}>
                {isLocked ? '??? [CLASSIFIED FILE]' : p.name}
              </div>

              {/* Desc */}
              <div style={{ color: 'var(--dim)', fontSize: 11.5, lineHeight: 1.65, marginBottom: 10 }}>
                {isLocked
                  ? d.classified_puzzle.slice(0, 70) + '...'
                  : (p.desc[lang] || p.desc.en)}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {p.tags.map((tag, ti) => (
                  <span key={`${tag}-${ti}`} className="tag-pill">
                    {isLocked ? `???${ti + 1}` : tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {!isLocked && (
                <div style={{ display: 'flex', gap: 10 }}>
                  {p.github && p.github !== '#' && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => Sound.click()}
                      style={{ color: 'var(--dim)', fontSize: 11, transition: 'color 0.2s' }}
                      onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'var(--green)'; }}
                      onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'var(--dim)'; }}
                    >
                      ⬡ GitHub
                    </a>
                  )}
                  {p.demo && !p.demo.includes('youtube') && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => Sound.click()}
                      style={{ color: 'var(--cyan)', fontSize: 11 }}
                    >
                      ⬡ Live Demo
                    </a>
                  )}
                </div>
              )}
              {isLocked && (
                <div style={{ color: 'var(--red)', fontSize: 11, marginTop: 4 }}>
                  Type <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>unlock classified</span> in terminal
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── SKILLS ── */}
      <div ref={skillsRef}>
        <div style={{
          background: 'rgba(0,255,0,0.02)',
          border: '1px solid var(--border)',
          borderRadius: 4, padding: '16px',
        }}>
          <div style={{ color: 'var(--dim)', fontSize: 11, marginBottom: 16 }}>
            <span style={{ color: 'var(--green)' }}>habib@portfolio</span>:<span style={{ color: 'var(--cyan)' }}>~</span>$ htop --skills
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SKILLS.map((s, i) => (
              <div key={s.pid}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'var(--white)', fontSize: 12 }}>{s.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: 9,
                      color: s.levelKey === 'expert' ? 'var(--green)' : s.levelKey === 'advanced' ? 'var(--cyan)' : 'var(--yellow)',
                      letterSpacing: 0.5,
                    }}>
                      {levelLabel(s.levelKey)}
                    </span>
                    <span style={{ color: 'var(--dim)', fontSize: 11 }}>{s.pct}%</span>
                  </div>
                </div>
                <div className="skill-bar-outer">
                  <motion.div
                    className="skill-bar-inner"
                    initial={{ width: 0 }}
                    animate={{ width: skillBarsVisible ? `${s.pct}%` : 0 }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer message */}
      <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--dim)', fontSize: 12 }}>
        <span style={{ color: 'var(--green)' }}>System exit...</span> but the developer remains.
      </div>
    </div>
  );
}
