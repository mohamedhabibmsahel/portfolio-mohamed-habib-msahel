'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Lang, I18N } from '@/data/i18n';
import { PROJECTS, SKILLS, TECH_TAGS } from '@/data/portfolio';
import { Sound } from './SoundEngine';

interface TerminalWindowProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onSwitchMode: () => void;
  onOpenGame: () => void;
  onOpenContact: () => void;
  classifiedUnlocked: boolean;
  onUnlockClassified: () => void;
}

interface TermLine {
  id: number;
  type: 'prompt' | 'output';
  content: string;
  isHtml?: boolean;
}

const ALL_COMMANDS = [
  'help', 'about', 'projects', 'skills', 'contact', 'hack', 'game', 'whoami',
  'ls', 'pwd', 'date', 'uname', 'echo', 'cat', 'sudo', 'exit', 'clear',
  'matrix', 'coffee', 'hire', 'fortune', 'neofetch', 'secret',
  'switch-mode', 'unlock', 'start-contact', 'lang',
];

let lineId = 0;
function lid() { return ++lineId; }

export default function TerminalWindow({
  lang, onLangChange, onSwitchMode, onOpenGame, onOpenContact,
  classifiedUnlocked, onUnlockClassified,
}: TerminalWindowProps) {
  const d = I18N[lang];
  const [lines, setLines] = useState<TermLine[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  const [soundOn, setSoundOn] = useState(false);
  const [glitchName, setGlitchName] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const print = useCallback((content: string, isHtml = true) => {
    setLines(prev => [...prev, { id: lid(), type: 'output', content, isHtml }]);
  }, []);

  const printPrompt = useCallback((cmd: string) => {
    setLines(prev => [...prev, {
      id: lid(), type: 'prompt',
      content: `habib@portfolio:~$ ${cmd}`,
    }]);
  }, []);

  const scroll = () => {
    setTimeout(() => {
      outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
  };

  useEffect(() => {
    // Welcome message
    setLines([
      {
        id: lid(), type: 'output',
        content: `<p class="hl-green" style="font-size:16px;margin-bottom:4px">╔══════════════════════════════════════════════════╗</p>
<p style="color:var(--white)">  Welcome to <span class="hl-green" style="font-weight:700">HabibOS v3.0</span> — Interactive Shell</p>
<p class="hl-dim">  Type <span class="hl-green">help</span> to see all commands</p>
<p class="hl-green" style="font-size:16px;margin-top:4px">╚══════════════════════════════════════════════════╝</p>`,
        isHtml: true,
      },
    ]);
  }, [lang]);

  // Auto-scroll on new lines
  useEffect(scroll, [lines]);

  // Glitch name effect
  useEffect(() => {
    const id = setInterval(() => {
      setGlitchName(true);
      setTimeout(() => setGlitchName(false), 180);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Autocomplete suggestion
  useEffect(() => {
    if (!inputVal) { setSuggestion(''); return; }
    const match = ALL_COMMANDS.find(
      c => c.startsWith(inputVal.toLowerCase()) && c !== inputVal.toLowerCase()
    );
    setSuggestion(match ? match.slice(inputVal.length) : '');
  }, [inputVal]);

  /* ─── COMMAND HANDLERS ─── */

  function cmdHelp() {
    print(`
<p class="hl-cyan">╔══════════ HabibOS v3.0 — HELP ══════════════╗</p>
<p>&nbsp;</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">about</span><span class="hl-dim">——</span> whoami / profile info</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">projects</span><span class="hl-dim">——</span> ls -la ~/projects</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">skills</span><span class="hl-dim">——</span> htop --skills</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">contact</span><span class="hl-dim">——</span> cat links.txt</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">hack</span><span class="hl-dim">——</span> simulate CVE exploit 👾</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">game</span><span class="hl-dim">——</span> ./crack_mainframe.sh 🔐</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">switch-mode</span><span class="hl-dim">——</span> toggle hacker ↔ recruiter UI</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">lang &lt;en|fr|ar&gt;</span><span class="hl-dim">——</span> change language</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">neofetch</span><span class="hl-dim">——</span> system info</p>
<p><span class="hl-green" style="min-width:120px;display:inline-block">whoami ls pwd date uname echo cat sudo exit clear</span></p>
<p>&nbsp;</p>
<p class="hl-cyan">╚═════════════════════════════════════════════╝</p>
<p class="hl-yellow" style="margin-top:4px">  ${d.help_footer}</p>`);
  }

  function cmdAbout() {
    setTimeout(() => {
      print(`
<p class="hl-green">┌──────────────── ABOUT HABIB ─────────────────┐</p>
<p>│ <span class="hl-green">Name    :</span> <span class="${glitchName ? 'glitch-text' : ''}" style="color:var(--white);font-weight:600">${d.about_name}</span></p>
<p>│ <span class="hl-green">Role    :</span> ${d.about_role}</p>
<p>│ <span class="hl-green">Location:</span> ${d.about_loc}</p>
<p>│ <span class="hl-green">Status  :</span> <span class="hl-yellow">${d.about_status}</span></p>
<p>│ <span class="hl-green">Stack   :</span> <span class="hl-cyan">React · Node.js · Flutter · PostgreSQL</span></p>
<p>│ <span class="hl-green">GitHub  :</span> <a href="https://github.com/habibmsahel" target="_blank" style="color:var(--cyan)">github.com/habibmsahel</a></p>
<p class="hl-green">└──────────────────────────────────────────────┘</p>
<p>&nbsp;</p>
${d.about_bio.map(l => `<p style="color:var(--white)">${l || '&nbsp;'}</p>`).join('')}
<p>&nbsp;</p>
<p>🎓 <span class="hl-green">${d.about_edu}</span></p>
<p class="hl-dim">${d.about_edu_sub}</p>`);
    }, 100);
  }

  function cmdProjects(filterArg?: string) {
    print(`<p class="hl-dim">$ ls -la ~/projects/</p>`);
    const projs = filterArg
      ? PROJECTS.filter(p => p.tags.some(t => t.toLowerCase().includes(filterArg.toLowerCase())))
      : PROJECTS;

    projs.forEach((p, i) => {
      setTimeout(() => {
        const isClassified = p.classified && !classifiedUnlocked;
        const badgeCls = p.badge === 'ACTIVE' || p.badge === 'LIVE' ? 'hl-green'
          : p.badge === 'ACADEMIC' ? 'hl-cyan'
          : p.badge === 'CLASSIFIED' ? 'hl-red'
          : 'hl-dim';
        print(`<p>
<span class="hl-dim">${p.dir.padEnd(42)}</span>
<span class="${badgeCls}" style="margin-right:8px">[${p.badge}]</span>
<span style="color:var(--white);font-weight:600">${isClassified ? '??? [ENCRYPTED]' : p.name}</span>
</p>
<p class="hl-dim" style="margin-left:16px;font-size:12px">${isClassified ? d.classified_puzzle.slice(0, 55) + '...' : (p.desc[lang] || p.desc.en).slice(0, 80) + '...'}</p>`);
        Sound.key();
      }, i * 120);
    });

    setTimeout(() => {
      print(`<p class="hl-dim" style="margin-top:8px">${d.cmd_projects_hint}</p>`);
    }, projs.length * 120 + 80);
  }

  function cmdSkills() {
    print(`<p class="hl-dim">$ htop --skills</p><p>&nbsp;</p>`);
    SKILLS.forEach((s, i) => {
      setTimeout(() => {
        const filled = Math.floor(s.pct / 5);
        const bar = Array(20).fill(0).map((_, j) =>
          j < filled ? '<span class="hl-green">█</span>' : '<span class="hl-dim">░</span>'
        ).join('');
        const levelLabel = s.levelKey === 'expert' ? d.level_expert
          : s.levelKey === 'advanced' ? d.level_advanced
          : d.level_intermediate;
        const levelColor = s.levelKey === 'expert' ? 'hl-green'
          : s.levelKey === 'advanced' ? 'hl-cyan'
          : 'hl-yellow';
        print(`<p>
<span class="hl-dim" style="min-width:28px;display:inline-block">${s.pid}</span>
<span style="color:var(--white);min-width:220px;display:inline-block">${s.name}</span>
<span class="${levelColor}" style="min-width:90px;display:inline-block">${levelLabel}</span>
<span>[${bar}]</span>
<span class="hl-yellow" style="margin-left:8px">${s.pct}%</span>
</p>`);
        Sound.key();
      }, i * 90);
    });
    setTimeout(() => {
      print(`<p>&nbsp;</p><p class="hl-dim">$ ls ./tech-stack/</p>`);
      print(`<p>${TECH_TAGS.map(t =>
        `<span class="tag-pill" style="margin:2px;display:inline-block">${t}</span>`
      ).join(' ')}</p>`);
    }, SKILLS.length * 90 + 100);
  }

  function cmdContact() {
    const links = d.cmd_contact_links;
    print(`
<p class="hl-green">${d.cmd_contact_init}</p>
<p class="hl-dim">Encryption: <span class="hl-green">AES-256</span> | Protocol: <span class="hl-green">HTTPS/3</span></p>
<p>&nbsp;</p>
<p><span class="hl-green">${links[0]}</span> <a href="https://github.com/habibmsahel" target="_blank" style="color:var(--cyan)">github.com/habibmsahel</a></p>
<p><span class="hl-green">${links[1]}</span> <a href="https://linkedin.com/in/habibmsahel" target="_blank" style="color:var(--cyan)">linkedin.com/in/habibmsahel</a></p>
<p><span class="hl-green">${links[2]}</span> <a href="mailto:habib.msahel@email.com" style="color:var(--cyan)">habib.msahel@email.com</a></p>
<p>&nbsp;</p>
<p class="hl-dim">${d.cmd_contact_scroll}</p>`);
  }

  function cmdHack() {
    print(`<p class="hl-yellow">${d.hack_start}</p>`);
    d.hack_steps.forEach(({ text, delay, cls }) => {
      setTimeout(() => {
        print(`<p class="${cls || 'hl-dim'}">${text}</p>`);
        Sound.key();
        if (cls === 'hl-green') Sound.success();
      }, delay);
    });
  }

  function cmdWhoami() {
    print(`<p>${d.cmd_whoami}</p>`);
  }

  function cmdLs() {
    print(`
<p><span class="hl-cyan">about.txt</span>   <span class="hl-cyan">bio.txt</span>   <span class="hl-cyan">education.txt</span>   <span class="hl-cyan">links.txt</span></p>
<p><span class="hl-green">projects/</span>   <span class="hl-green">skills/</span>   <span class="hl-green">contact/</span>   <span class="hl-yellow">secret/</span>   <span class="hl-red">[CLASSIFIED].enc</span></p>`);
  }

  function cmdCat(args: string[]) {
    const file = args.join(' ').toLowerCase().replace('.txt', '').replace('.sh', '');
    const map: Record<string, () => void> = {
      'about': cmdAbout,
      'bio': () => print(`<p style="color:var(--white)">${d.cmd_cat_bio}</p>`),
      'education': () => print(`<p class="hl-green">${d.cmd_cat_edu}</p>`),
      'formation': () => print(`<p class="hl-green">${d.cmd_cat_edu}</p>`),
      'التعليم': () => print(`<p class="hl-green">${d.cmd_cat_edu}</p>`),
      'links': cmdContact,
      'liens': cmdContact,
      'روابط': cmdContact,
      'secret': () => { print(`<p class="hl-red">${d.cmd_cat_deny}</p>`); Sound.error(); },
    };

    // Check for project by id
    const project = PROJECTS.find(p => p.id === file || p.name.toLowerCase().includes(file));
    if (project) {
      if (project.classified && !classifiedUnlocked) {
        print(`<p class="hl-red">🔐 ENCRYPTED FILE — Access denied.</p>
<p class="hl-yellow">${d.classified_puzzle}</p>
<p class="hl-dim">${d.classified_hint}</p>
<p class="hl-dim">Type <span class="hl-green">unlock classified</span> to attempt decryption.</p>`);
        Sound.error();
        return;
      }
      const p = project;
      const badgeColor = p.badge === 'CLASSIFIED' ? 'hl-red' : p.badge === 'ACTIVE' || p.badge === 'LIVE' ? 'hl-green' : 'hl-cyan';
      print(`
<p class="hl-green">┌── ${p.name} ──┐</p>
<p>│ <span class="hl-green">Dir   :</span> <span class="hl-dim">${p.dir}</span></p>
<p>│ <span class="hl-green">Status:</span> <span class="${badgeColor}">[${p.badge}]</span></p>
<p>│ <span class="hl-green">Tags  :</span> ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join(' ')}</p>
<p>│</p>
<p>│ ${(p.desc[lang] || p.desc.en)}</p>
<p>│</p>
${p.github ? `<p>│ <span class="hl-green">GitHub:</span> <a href="${p.github}" target="_blank" style="color:var(--cyan)">${p.github}</a></p>` : ''}
${p.demo && !p.demo.includes('youtube') ? `<p>│ <span class="hl-green">Demo  :</span> <a href="${p.demo}" target="_blank" style="color:var(--cyan)">${p.demo}</a></p>` : ''}
<p class="hl-green">└────────────────────────────────────────────────┘</p>`);
      Sound.success();
      return;
    }

    if (map[file]) map[file]();
    else if (file) { print(`<p class="hl-red">${d.cmd_cat_notfound(file)}</p>`); Sound.error(); }
    else { print(`<p class="hl-red">cat: missing operand</p>`); }
  }

  function cmdSudo(args: string[]) {
    const subcmd = args.join(' ').toLowerCase();
    if (subcmd === 'hire-me' || subcmd === 'hire') {
      cmdHire();
      return;
    }
    if (subcmd === 'reveal-secrets') {
      cmdSecret();
      return;
    }
    print(`<p class="hl-yellow">${d.cmd_sudo_deny.replace('habib is not', 'sudo: habib is not')}</p>`);
    Sound.error();
  }

  function cmdExit() {
    print(`<p class="hl-dim">logout</p>`);
    setTimeout(() => {
      print(`<p class="hl-dim">${d.cmd_exit2}</p>`);
      setTimeout(() => print(`<p style="color:var(--green);font-size:18px;text-align:center;padding:20px">System exit... but the developer remains.</p>`), 800);
    }, 400);
  }

  function cmdClear() {
    setLines([{
      id: lid(), type: 'output',
      content: `<p class="hl-dim">${d.term_cleared}</p>`,
      isHtml: true,
    }]);
  }

  function cmdMatrix() {
    print(`<p class="hl-green">${d.easter_matrix}</p>`);
    setTimeout(() => print(`<p class="hl-dim">${d.easter_matrix2}</p>`), 800);
    Sound.success();
  }

  function cmdSecret() {
    print(`
<p class="hl-yellow">⚠️  CLASSIFIED — Level 5 Clearance Required</p>
<p class="hl-cyan">Unlocking easter egg archive...</p>
<p class="hl-dim">${d.secret_reveal}</p>
<p>&nbsp;</p>
<p class="hl-green">Hidden commands discovered:</p>
<p class="hl-dim">  coffee | hire | fortune | matrix | neofetch | sudo reveal-secrets</p>`);
    Sound.success();
  }

  function cmdCoffee() {
    print(`
<p>          )  (  </p>
<p>         (   ) )</p>
<p>          ) ( ( </p>
<p>        _______)</p>
<p>     .-'--------'.</p>
<p>    ( C|  /\\_/\\  |</p>
<p>     '-./|     | </p>
<p>       | HABIB |</p>
<p>       |_______|</p>
<p class="hl-yellow">${d.easter_coffee_msg}</p>`);
    Sound.success();
  }

  function cmdHire() {
    print(`
<p class="hl-green">${d.easter_hire1}</p>
<p>&nbsp;</p>
<p style="color:var(--white)">${d.easter_hire2}</p>
<p style="color:var(--white)">${d.easter_hire3}</p>
<p>&nbsp;</p>
<p class="hl-dim">${d.easter_hire4}</p>`);
    Sound.success();
  }

  function cmdFortune() {
    const q = d.fortune_quotes;
    print(`<p class="hl-yellow">🔮 ${q[Math.floor(Math.random() * q.length)]}</p>`);
    Sound.key();
  }

  function cmdNeofetch() {
    const f = d.neofetch_fields;
    print(`
<p>&nbsp;</p>
<p><span class="hl-green">    ██████████    </span>  <span class="hl-yellow">habib</span><span class="hl-dim">@</span><span class="hl-cyan">HabibOS</span></p>
<p><span class="hl-green">  ██          ██  </span>  ───────────────────────────</p>
<p><span class="hl-green">  ██  ██████  ██  </span>  <span class="hl-yellow">OS</span>: ${f.os}</p>
<p><span class="hl-green">  ██  ██  ██  ██  </span>  <span class="hl-yellow">Host</span>: ${f.host}</p>
<p><span class="hl-green">  ██  ██████  ██  </span>  <span class="hl-yellow">Kernel</span>: ${f.kernel}</p>
<p><span class="hl-green">  ██          ██  </span>  <span class="hl-yellow">Uptime</span>: ${f.uptime}</p>
<p><span class="hl-green">    ██████████    </span>  <span class="hl-yellow">Shell</span>: ${f.shell}</p>
<p>                    <span class="hl-yellow">CPU</span>: ${f.cpu}</p>
<p>                    <span class="hl-yellow">Memory</span>: ${f.memory}</p>
<p>                    <span class="hl-yellow">Stack</span>: <span class="hl-cyan">${f.stack}</span></p>
<p>                    <span class="hl-yellow">Coffee/day</span>: <span class="hl-green">${f.coffee}</span></p>
<p>&nbsp;</p>`);
  }

  function cmdSwitchMode() {
    print(`<p class="hl-cyan">⟳ ${d.switch_to_recruiter}</p>`);
    Sound.success();
    setTimeout(() => onSwitchMode(), 900);
  }

  function cmdLang(args: string[]) {
    const l = (args[0] || '').toLowerCase();
    if (['en', 'fr', 'ar'].includes(l)) {
      print(`<p class="hl-green">Language changed to <span style="color:var(--cyan)">${l.toUpperCase()}</span></p>`);
      Sound.boot();
      setTimeout(() => onLangChange(l as Lang), 600);
    } else {
      print(`<p class="hl-red">Invalid lang. Usage: <span class="hl-green">lang &lt;en|fr|ar&gt;</span></p>`);
    }
  }

  function cmdUnlock(args: string[]) {
    const target = args.join(' ').toLowerCase();
    if (target !== 'classified') {
      print(`<p class="hl-red">unlock: unknown target. Try: <span class="hl-green">unlock classified</span></p>`);
      return;
    }
    if (classifiedUnlocked) {
      print(`<p class="hl-green">✓ Classified project already unlocked. Run <span class="hl-cyan">cat classified_1</span></p>`);
      return;
    }

    print(`<p class="hl-yellow">🔓 DECRYPTION CHALLENGE</p>
<p class="hl-dim">${d.classified_puzzle}</p>
<p class="hl-dim">${d.classified_hint}</p>
<p class="hl-dim">Type your answer below:</p>`);

    // Next input will be the answer
    setInputVal('');
    setTimeout(() => inputRef.current?.focus(), 100);
    // Flag for next command
    sessionStorage.setItem('awaitClassifiedAnswer', '1');
  }

  function cmdEcho(args: string[]) {
    print(`<p style="color:var(--white)">${args.join(' ')}</p>`);
  }

  function cmdPwd() {
    print(`<p style="color:var(--white)">/home/habib/portfolio</p>`);
  }

  function cmdDate() {
    const now = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Tunis' });
    print(`<p style="color:var(--white)">${now} (Tunisia / UTC+1)</p>`);
  }

  function cmdUname() {
    print(`<p style="color:var(--white)">HabibOS v3.0 x86_64 GNU/Habib Kernel 5.19.0-habib #1 SMP</p>`);
  }

  function cmdUnknown(cmd: string) {
    print(`<p style="color:var(--red)">${d.cmd_not_found(cmd)}</p><p class="hl-dim">${d.cmd_type_help}</p>`);
    Sound.error();
  }

  /* ─── COMMAND DISPATCHER ─── */
  const execute = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Check if awaiting classified answer
    if (sessionStorage.getItem('awaitClassifiedAnswer') === '1') {
      sessionStorage.removeItem('awaitClassifiedAnswer');
      printPrompt(trimmed);
      if (trimmed.toUpperCase() === I18N[lang].classified_answer) {
        onUnlockClassified();
        print(`<p class="hl-green" style="font-size:16px">${d.classified_unlocked}</p>
<p class="hl-dim">Run <span class="hl-cyan">cat classified_1</span> to view the project.</p>`);
        Sound.access();
      } else {
        print(`<p class="hl-red">❌ Wrong answer. Try: <span class="hl-green">unlock classified</span> again.</p>`);
        Sound.error();
      }
      setHistory(h => [trimmed, ...h]);
      setHistIdx(-1);
      return;
    }

    setHistory(h => [trimmed, ...h]);
    setHistIdx(-1);
    printPrompt(trimmed);
    Sound.boot();

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);

    const cmdMap: Record<string, (args: string[]) => void> = {
      'help': () => cmdHelp(),
      'about': () => cmdAbout(),
      'projects': () => cmdProjects(args[0]),
      'skills': () => cmdSkills(),
      'contact': () => cmdContact(),
      'start-contact': () => { cmdContact(); onOpenContact(); },
      'hack': () => cmdHack(),
      'game': () => { print(`<p class="hl-cyan">⚙ Launching hack_mainframe.sh...</p>`); setTimeout(() => onOpenGame(), 800); },
      'whoami': () => cmdWhoami(),
      'ls': () => cmdLs(),
      'pwd': () => cmdPwd(),
      'date': () => cmdDate(),
      'uname': () => cmdUname(),
      'echo': (a) => cmdEcho(a),
      'cat': (a) => cmdCat(a),
      'sudo': (a) => cmdSudo(a),
      'exit': () => cmdExit(),
      'clear': () => cmdClear(),
      'matrix': () => cmdMatrix(),
      'secret': () => cmdSecret(),
      'coffee': () => cmdCoffee(),
      'hire': () => cmdHire(),
      'fortune': () => cmdFortune(),
      'neofetch': () => cmdNeofetch(),
      'switch-mode': () => cmdSwitchMode(),
      'lang': (a) => cmdLang(a),
      'unlock': (a) => cmdUnlock(a),
    };

    if (cmdMap[cmd]) {
      cmdMap[cmd](args);
    } else {
      cmdUnknown(trimmed.split(' ')[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, classifiedUnlocked, d, printPrompt, print, onLangChange, onSwitchMode, onOpenGame, onOpenContact, onUnlockClassified]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    Sound.type();
    if (e.key === 'Enter') {
      execute(inputVal);
      setInputVal('');
      setSuggestion('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) setInputVal(inputVal + suggestion);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      if (history[next]) setInputVal(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInputVal(''); }
      else { setHistIdx(next); setInputVal(history[next] || ''); }
    }
  };

  /* ─── RENDER ─── */
  return (
    <div
      className="terminal-wrap"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="titlebar-dots">
          <div className="dot dot-red" />
          <div className="dot dot-yellow" />
          <div className="dot dot-green" />
        </div>
        <div className="titlebar-title">
          habib@portfolio:~ — interactive shell
        </div>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Lang buttons */}
          {(['en', 'fr', 'ar'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={e => { e.stopPropagation(); onLangChange(l); Sound.click(); }}
              style={{
                background: lang === l ? 'rgba(0,255,0,0.15)' : 'transparent',
                border: `1px solid ${lang === l ? 'var(--green)' : 'var(--border)'}`,
                color: lang === l ? 'var(--green)' : 'var(--dim)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                padding: '1px 6px',
                borderRadius: 3,
                cursor: 'pointer',
                letterSpacing: 1,
                transition: 'all 0.15s',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
          {/* Sound toggle */}
          <button
            onClick={e => {
              e.stopPropagation();
              const next = Sound.toggle();
              setSoundOn(next);
            }}
            title={soundOn ? 'Mute' : 'Enable sound'}
            style={{
              background: 'transparent',
              border: 'none',
              color: soundOn ? 'var(--green)' : 'var(--dim)',
              cursor: 'pointer',
              fontSize: 14,
              lineHeight: 1,
              padding: '2px 4px',
            }}
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
          {/* Switch mode */}
          <button
            className="switch-btn"
            style={{ padding: '2px 10px', fontSize: 10 }}
            onClick={e => { e.stopPropagation(); cmdSwitchMode(); }}
          >
            switch-mode
          </button>
        </div>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="terminal-body"
        style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 220px)' }}
      >
        <AnimatePresence initial={false}>
          {lines.map(line => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
            >
              {line.type === 'prompt' ? (
                <div className="term-line" style={{ marginBottom: 2 }}>
                  <span className="prompt-green">habib@portfolio</span>
                  <span className="separator">:</span>
                  <span className="path">~</span>
                  <span className="dollar">$</span>
                  <span style={{ color: 'var(--white)', marginLeft: '0.35rem' }}>
                    {line.content.replace('habib@portfolio:~$ ', '')}
                  </span>
                </div>
              ) : line.isHtml ? (
                <div
                  className="term-output"
                  dangerouslySetInnerHTML={{ __html: line.content }}
                />
              ) : (
                <div className="term-output">{line.content}</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input row */}
      <div className="input-row">
        <span className="prompt-green">habib@portfolio</span>
        <span className="separator">:</span>
        <span className="path">~</span>
        <span className="dollar">$</span>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            ref={inputRef}
            className="term-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="type a command..."
            style={{ color: 'var(--white)', caretColor: 'var(--green)' }}
          />
          {/* Autocomplete ghost */}
          {suggestion && (
            <span style={{
              position: 'absolute',
              left: `${inputVal.length}ch`,
              color: 'var(--dim)',
              pointerEvents: 'none',
              whiteSpace: 'pre',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
            }}>
              {suggestion}
            </span>
          )}
        </div>
        <span className="cursor" style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
}
