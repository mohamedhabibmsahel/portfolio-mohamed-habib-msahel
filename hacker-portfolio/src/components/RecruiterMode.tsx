import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { type Lang, I18N } from '@/data/i18n';
import { PROJECTS, SKILLS, TECH_TAGS } from '@/data/portfolio';
import { Sound } from './SoundEngine';

const SpaceScene = dynamic(() => import('@/components/SpaceScene'), { ssr: false });

interface RecruiterModeProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onSwitchBack: () => void;
  classifiedUnlocked: boolean;
}

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
};

export default function RecruiterMode({ lang, onLangChange, onSwitchBack, classifiedUnlocked }: RecruiterModeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const d = I18N[lang];
  const visibleProjects = PROJECTS.filter(p => !p.classified || classifiedUnlocked);

  const levelLabel = (key: string) =>
    key === 'expert' ? d.level_expert : key === 'advanced' ? d.level_advanced : d.level_intermediate;

  return (
    <motion.div
      className="recruiter-wrapper"
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: 60, position: 'relative' }}
    >
      <SpaceScene />
      {/* Navbar */}
      <nav className="r-nav">
        <div className="r-logo">MHM.dev</div>
        
        {/* Desktop Nav */}
        <div className="r-nav-desktop" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {[
            { href: '#r-about', label: lang === 'ar' ? 'عنّي' : lang === 'fr' ? 'À Propos' : 'About' },
            { href: '#r-experience', label: lang === 'ar' ? 'الخبرة' : lang === 'fr' ? 'Expérience' : 'Experience' },
            { href: '#r-projects', label: lang === 'ar' ? 'مشاريع' : lang === 'fr' ? 'Projets' : 'Projects' },
            { href: '#r-skills', label: lang === 'ar' ? 'مهارات' : lang === 'fr' ? 'Compétences' : 'Skills' },
            { href: '#r-contact', label: lang === 'ar' ? 'تواصل' : lang === 'fr' ? 'Contact' : 'Contact' },
          ].map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: 'var(--r-muted)', fontSize: 13, fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--r-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--r-muted)')}
            >
              {l.label}
            </a>
          ))}
          {/* Lang switcher */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['en', 'fr', 'ar'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => { onLangChange(l); Sound.click(); }}
                style={{
                  background: lang === l ? 'var(--r-accent)' : 'transparent',
                  border: `1px solid ${lang === l ? 'var(--r-accent)' : 'var(--r-border)'}`,
                  color: lang === l ? 'white' : 'var(--r-muted)',
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  padding: '2px 8px', borderRadius: 4, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {/* Back to hacker mode */}
          <button
            onClick={() => { onSwitchBack(); Sound.access(); }}
            style={{
              background: 'rgba(99,102,241,0.1)', border: '1px solid var(--r-accent)',
              color: 'var(--r-accent)', fontFamily: 'var(--font-mono)',
              fontSize: 11, padding: '6px 16px', borderRadius: 6, cursor: 'pointer',
              letterSpacing: 0.5, transition: 'all 0.2s',
            }}
          >
            &lt;/&gt; hacker mode
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="r-nav-mobile"
          onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); Sound.click(); }}
          style={{
            background: 'transparent', border: 'none', color: 'var(--r-text)',
            cursor: 'pointer', padding: 8,
          }}
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(10, 10, 15, 0.85)',
              backdropFilter: 'blur(16px)',
              padding: '80px 32px 32px',
              display: 'flex', flexDirection: 'column', gap: 32,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { href: '#r-about', label: lang === 'ar' ? 'عنّي' : lang === 'fr' ? 'À Propos' : 'About' },
                { href: '#r-experience', label: lang === 'ar' ? 'الخبرة' : lang === 'fr' ? 'Expérience' : 'Experience' },
                { href: '#r-projects', label: lang === 'ar' ? 'مشاريع' : lang === 'fr' ? 'Projets' : 'Projects' },
                { href: '#r-skills', label: lang === 'ar' ? 'مهارات' : lang === 'fr' ? 'Compétences' : 'Skills' },
                { href: '#r-contact', label: lang === 'ar' ? 'تواصل' : lang === 'fr' ? 'Contact' : 'Contact' },
              ].map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ color: 'var(--r-text)', fontSize: 24, fontWeight: 700, textDecoration: 'none' }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                {(['en', 'fr', 'ar'] as Lang[]).map(l => (
                  <button
                    key={l}
                    onClick={() => { onLangChange(l); Sound.click(); }}
                    style={{
                      flex: 1, background: lang === l ? 'var(--r-accent)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${lang === l ? 'var(--r-accent)' : 'rgba(255,255,255,0.1)'}`,
                      color: 'white', padding: '10px', borderRadius: 8, fontSize: 14,
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { onSwitchBack(); setIsMobileMenuOpen(false); Sound.access(); }}
                style={{
                  background: 'var(--r-accent)', border: 'none', color: 'white',
                  padding: '16px', borderRadius: 12, fontSize: 16, fontWeight: 600,
                }}
              >
                &lt;/&gt; Switch to Hacker Mode
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section
        id="r-about"
        style={{
          paddingTop: 120, paddingBottom: 80,
          maxWidth: 1000, margin: '0 auto', padding: '120px var(--r-px) 80px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ fontSize: 13, color: 'var(--r-accent)', letterSpacing: 2, marginBottom: 12 }}>
                &gt; Hi, my name is
              </div>
              <h1 style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 16,
                background: 'linear-gradient(135deg, var(--r-text) 0%, rgba(226,232,240,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {d.about_name}
              </h1>
              <h2 style={{
                fontSize: 'clamp(20px, 3vw, 36px)',
                fontWeight: 600,
                background: 'linear-gradient(135deg, var(--r-accent), var(--r-accent2))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 24,
              }}>
                {d.about_role}
              </h2>
              <p style={{
                color: 'var(--r-muted)', fontSize: 16, lineHeight: 1.7,
                maxWidth: 600, marginBottom: 32,
              }}>
                {d.about_bio.join(' ').replace('  ', ' ')}
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a
                  href="/portfolio-mohamed-habib-msahel/assets/cv_mohamedhabibmsahel.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="r-btn"
                  onClick={() => Sound.click()}
                  style={{ background: 'var(--r-accent)', color: 'white', border: 'none' }}
                >
                  📄 View CV
                </a>
                <a
                  href="/portfolio-mohamed-habib-msahel/assets/cv_mohamedhabibmsahel.pdf"
                  download
                  className="r-btn"
                  onClick={() => Sound.click()}
                >
                  Download CV ⬇
                </a>
                <a
                  href="https://github.com/mohamedhabibmsahel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="r-btn"
                  onClick={() => Sound.click()}
                >
                  View GitHub →
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-habib-m-sahel-9bb5a0217"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 24px', borderRadius: 8,
                    border: '1px solid var(--r-border)',
                    color: 'var(--r-text)', fontSize: 13, fontWeight: 600,
                    transition: 'border-color 0.2s',
                    background: 'transparent',
                  }}
                >
                  LinkedIn Profile
                </a>
                <button
                  onClick={() => { onSwitchBack(); Sound.access(); }}
                  style={{
                    padding: '10px 24px', borderRadius: 8,
                    border: '1px solid var(--r-border)',
                    color: 'var(--r-muted)', fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.2s',
                  }}
                >
                  🖥 Enter Terminal
                </button>
              </div>
            </div>
            
            {/* Avatar Image */}
            <motion.div 
              style={{ flex: '0 1 300px', display: 'flex', justifyContent: 'center' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div style={{
                width: 250, height: 250, borderRadius: '50%', padding: 4,
                background: 'linear-gradient(135deg, var(--r-accent), var(--r-accent2))',
                boxShadow: '0 0 30px rgba(99,102,241,0.3)'
              }}>
                <img 
                  src="/portfolio-mohamed-habib-msahel/assets/avatar_hacker.png" 
                  alt="Habib Hacker Avatar" 
                  style={{ 
                    width: '100%', height: '100%', objectFit: 'cover', 
                    borderRadius: '50%', backgroundColor: '#000' 
                  }} 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', gap: 32, marginTop: 60, flexWrap: 'wrap' }}
        >
          {[
            { num: '2+', label: lang === 'ar' ? 'سنوات خبرة' : lang === 'fr' ? "Ans d'expérience" : 'Years Experience' },
            { num: `${PROJECTS.filter(p => !p.classified).length}+`, label: lang === 'ar' ? 'مشاريع' : lang === 'fr' ? 'Projets' : 'Projects' },
            { num: `${SKILLS.length}+`, label: lang === 'ar' ? 'تقنية' : lang === 'fr' ? 'Technologies' : 'Technologies' },
            { num: '100%', label: lang === 'ar' ? 'التزام' : lang === 'fr' ? 'Engagement' : 'Commitment' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 36, fontWeight: 800,
                background: 'linear-gradient(135deg, var(--r-accent), var(--r-accent2))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {s.num}
              </div>
              <div style={{ color: 'var(--r-muted)', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Experience */}
      <section id="r-experience" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 var(--r-px) 80px' }}>
        <h2 style={{ color: 'var(--r-text)', fontSize: 28, fontWeight: 700, marginBottom: 32 }}>
          {lang === 'ar' ? 'الخبرة والتعليم' : lang === 'fr' ? 'Expérience & Éducation' : 'Experience & Education'}
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {[
            {
              period: lang === 'fr' ? 'Août 2025 – Présent' : lang === 'ar' ? 'أغسطس 2025 – الحاضر' : 'Aug 2025 – Present',
              title: lang === 'fr' ? 'Développeur Full-Stack Mobile' : lang === 'ar' ? 'مطور Full-Stack' : 'Full Stack Mobile Developer',
              org: 'Lebosphore',
              desc: lang === 'fr' ? 'Développement d\'applications mobiles hybrides avec Flutter et conception du backend avec Node.js & MySQL.'
                : lang === 'ar' ? 'تطوير تطبيقات محمولة باستخدام Flutter وبناء الخلفية باستخدام Node.js و MySQL.'
                : 'Developed hybrid mobile applications with Flutter and designed backend architecture using Node.js & MySQL.',
              type: 'work',
            },
            {
              period: lang === 'fr' ? 'Fév 2025 – Jui 2025' : lang === 'ar' ? 'فبراير 2025 – يوليو 2025' : 'Feb 2025 – Jul 2025',
              title: lang === 'fr' ? 'Développeur Flutter & Node.js' : lang === 'ar' ? 'مطور Flutter و Node.js' : 'Flutter & Node.js Developer',
              org: 'The Landlord',
              desc: lang === 'fr' ? 'Développement d\'applications mobile et web de gestion immobilière avec bases de données MySQL.'
                : lang === 'ar' ? 'تطوير تطبيقات الويب والموبايل لإدارة العقارات وبناء الخلفية الخاصة بها.'
                : 'Built a real-estate management mobile and web application with backend database integration.',
              type: 'work',
            },
            {
              period: lang === 'fr' ? 'Jan 2024 – Sep 2024' : lang === 'ar' ? 'يناير 2024 – سبتمبر 2024' : 'Jan 2024 – Sep 2024',
              title: lang === 'fr' ? 'Développeur Mobile Freelance' : lang === 'ar' ? 'مطور تطبيقات محمولة مستقل' : 'Freelance Mobile Developer',
              org: 'ArcanaSoft',
              desc: lang === 'fr' ? 'Conception et réalisation d\'une application Flutter destinée aux services de nettoyage et de stérilisation.'
                : lang === 'ar' ? 'تصميم وتنفيذ تطبيق لخدمات التنظيف والتعقيم باستخدام Flutter.'
                : 'Designed and implemented an application for cleaning and sterilization services using Flutter.',
              type: 'work',
            },
            {
              period: lang === 'fr' ? 'Sept 2018 – Présent' : lang === 'ar' ? 'سبتمبر 2018 – الحاضر' : 'Sept 2018 – Present',
              title: lang === 'fr' ? 'Diplôme d\'Ingénieur — Informatique' : lang === 'ar' ? 'شهادة مهندس دوله — علوم الحاسب' : 'Engineering Degree — Computer Science',
              org: 'ESPRIT',
              desc: lang === 'fr' ? 'Cycle d\'ingénieur en informatique à l\'École Supérieure Privée d\'Ingénierie et de Technologie (Tunis).'
                : lang === 'ar' ? 'دورة الهندسة في المدرسة العليا الخاصة للهندسة والتكنولوجيا بتونس.'
                : 'Computer Science Engineering cycle at the Higher Private School of Engineering and Technology (Tunis).',
              type: 'edu',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="r-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', gap: 20 }}
            >
              <div style={{
                minWidth: 110, paddingTop: 2,
                fontSize: 11, color: 'var(--r-muted)', letterSpacing: 0.5,
              }}>
                {item.period}
              </div>
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
                }}>
                  <span style={{
                    fontSize: 15, fontWeight: 600, color: 'var(--r-text)',
                  }}>
                    {item.title}
                  </span>
                  <span style={{
                    fontSize: 9, padding: '1px 6px', borderRadius: 20,
                    background: item.type === 'work' ? 'rgba(99,102,241,0.15)' : 'rgba(6,182,212,0.12)',
                    color: item.type === 'work' ? 'var(--r-accent)' : 'var(--r-accent2)',
                    border: `1px solid ${item.type === 'work' ? 'rgba(99,102,241,0.25)' : 'rgba(6,182,212,0.2)'}`,
                    letterSpacing: 1,
                  }}>
                    {item.type === 'work' ? 'WORK' : 'EDUCATION'}
                  </span>
                </div>
                <div style={{ color: 'var(--r-accent)', fontSize: 12, marginBottom: 8 }}>{item.org}</div>
                <p style={{ color: 'var(--r-muted)', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="r-projects" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 var(--r-px) 80px' }}>
        <h2 style={{ color: 'var(--r-text)', fontSize: 28, fontWeight: 700, marginBottom: 32 }}>
          {lang === 'ar' ? 'المشاريع' : lang === 'fr' ? 'Projets' : 'Projects'}
        </h2>
        <motion.div
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="projects-grid"
        >
          {visibleProjects.slice(0, 9).map((p) => (
            <motion.div
              key={p.id}
              variants={stagger.item}
              className="r-card"
            >
              {/* Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{
                  fontSize: 9, padding: '2px 8px', borderRadius: 20, letterSpacing: 1,
                  background: p.badge === 'ACTIVE' || p.badge === 'LIVE'
                    ? 'rgba(16,185,129,0.12)' : p.badge === 'ACADEMIC'
                    ? 'rgba(6,182,212,0.12)' : 'rgba(99,102,241,0.12)',
                  color: p.badge === 'ACTIVE' || p.badge === 'LIVE' ? '#10b981'
                    : p.badge === 'ACADEMIC' ? 'var(--r-accent2)' : 'var(--r-accent)',
                  border: `1px solid ${p.badge === 'ACTIVE' || p.badge === 'LIVE' ? 'rgba(16,185,129,0.25)'
                    : p.badge === 'ACADEMIC' ? 'rgba(6,182,212,0.2)' : 'rgba(99,102,241,0.25)'}`,
                }}>
                  {p.badge}
                </span>
              </div>

              {/* Media */}
              {p.media && (
                <div className="proj-media" style={{ marginBottom: 12 }}>
                  {p.media.type === 'image' ? (
                    <img
                      src={p.media.url}
                      alt={p.name}
                      style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="video-wrapper">
                      <iframe
                        src={p.media.url}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={p.name}
                      />
                    </div>
                  )}
                </div>
              )}

              <h3 style={{ color: 'var(--r-text)', fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                {p.name}
              </h3>
              <p style={{ color: 'var(--r-muted)', fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>
                {p.desc[lang] || p.desc.en}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {p.tags.map(tag => (
                  <span key={tag} className="r-tag">{tag}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 10 }}>
                {p.github && p.github !== '#' && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--r-muted)', fontSize: 11,
                      textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                    }}
                  >
                    ⬡ GitHub
                  </a>
                )}
                {p.demo && !p.demo.includes('youtube') && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--r-accent)', fontSize: 11,
                      textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                    }}
                  >
                    ⬡ Live Demo →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills */}
      <section id="r-skills" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 var(--r-px) 80px' }}>
        <h2 style={{ color: 'var(--r-text)', fontSize: 28, fontWeight: 700, marginBottom: 40 }}>
          {lang === 'ar' ? 'المهارات والتقنيات' : lang === 'fr' ? 'Compétences & Tech' : 'Skills & Technologies'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.pid}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--r-text)', fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                <span style={{
                  fontSize: 10, color: 'var(--r-accent)',
                  background: 'rgba(99,102,241,0.1)', padding: '1px 6px', borderRadius: 3,
                }}>
                  {levelLabel(s.levelKey)}
                </span>
              </div>
              <div style={{
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.15)',
                height: 6, borderRadius: 3, overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--r-accent), var(--r-accent2))',
                    borderRadius: 3,
                  }}
                />
              </div>
              <div style={{ textAlign: 'right', fontSize: 10, color: 'var(--r-muted)' }}>{s.pct}%</div>
            </motion.div>
          ))}
        </div>

        {/* Tech tags */}
        <div style={{ marginTop: 40 }}>
          <div style={{ color: 'var(--r-muted)', fontSize: 12, marginBottom: 12, letterSpacing: 1 }}>
            TECHNOLOGIES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TECH_TAGS.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="r-tag"
                style={{ cursor: 'default' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="r-contact" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="r-card"
          style={{ textAlign: 'center', padding: '48px 32px' }}
        >
          <h2 style={{ color: 'var(--r-text)', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
            {lang === 'ar' ? 'دعنا نتحدث' : lang === 'fr' ? 'Discutons' : "Let's Talk"}
          </h2>
          <p style={{ color: 'var(--r-muted)', fontSize: 15, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            {lang === 'ar' ? 'أنا متاح للفرص الجديدة. تواصل معي!'
              : lang === 'fr' ? 'Je suis disponible pour de nouvelles opportunités. Contactez-moi!'
              : "I'm open to new opportunities. Let's build something great together!"}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:habib.msahel@email.com" className="r-btn">
              ✉ {lang === 'ar' ? 'إرسال بريد' : lang === 'fr' ? 'Envoyer Email' : 'Send Email'}
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-habib-m-sahel-9bb5a0217"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 24px', borderRadius: 8,
                border: '1px solid var(--r-border)',
                color: 'var(--r-text)', fontSize: 13, fontWeight: 600,
                transition: 'border-color 0.2s',
                background: 'transparent',
              }}
            >
              LinkedIn →
            </a>
            <a
              href="https://github.com/mohamedhabibmsahel"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 24px', borderRadius: 8,
                border: '1px solid var(--r-border)',
                color: 'var(--r-text)', fontSize: 13, fontWeight: 600,
                transition: 'border-color 0.2s',
                background: 'transparent',
              }}
            >
              GitHub →
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', color: 'var(--r-muted)', fontSize: 12, padding: '20px 0' }}>
        © 2026 Mohamed Habib Msahel — Built with passion & caffeine ☕
      </footer>
    </motion.div>
  );
}
