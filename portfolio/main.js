/* ═══════════════════════════════════════════════════════════════
   HabibOS v2.6.0 — main.js
   Multi-language (EN / FR / AR) Hacker Terminal Portfolio
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ──────────────────────────────────────────────────────────────
   1. MATRIX RAIN
   ──────────────────────────────────────────────────────────────*/
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const CHARS = '01アイウエカキクケコサシスセソタチツテトとはまにほどれそせめ';
  let cols, drops, fontSize;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fontSize = Math.max(10, Math.floor(window.innerWidth / 110));
    cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -canvas.height);
  }

  function draw() {
    ctx.fillStyle = 'rgba(2,11,2,0.042)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff00';
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    for (let i = 0; i < drops.length; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.globalAlpha = 0.3 + Math.random() * 0.7;
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      ctx.globalAlpha = 1;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.45;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 48);
})();

/* ──────────────────────────────────────────────────────────────
   2. SOUND ENGINE (Web Audio API — zero dependencies)
   ──────────────────────────────────────────────────────────────*/
const Sound = (function () {
  let actx = null, enabled = false;
  const get = () => actx || (actx = new (window.AudioContext || window.webkitAudioContext)());
  function beep(freq = 800, dur = 0.05, vol = 0.06, type = 'square') {
    if (!enabled) return;
    try {
      const ac = get(), osc = ac.createOscillator(), g = ac.createGain();
      osc.connect(g); g.connect(ac.destination);
      osc.type = type; osc.frequency.value = freq;
      g.gain.setValueAtTime(vol, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + dur);
    } catch (_) { }
  }
  return {
    key: () => beep(580 + Math.random() * 200, 0.04, 0.04, 'square'),
    success: () => { beep(880, 0.12, 0.08, 'sine'); setTimeout(() => beep(1109, 0.18, 0.07, 'sine'), 100); },
    error: () => beep(200, 0.22, 0.08, 'sawtooth'),
    boot: () => { beep(440, 0.08, 0.06, 'sine'); setTimeout(() => beep(660, 0.1, 0.06, 'sine'), 120); },
    enable: () => { enabled = true; get(); },
    on: () => enabled,
  };
})();

document.addEventListener('click', () => Sound.enable(), { once: true });
document.addEventListener('keydown', () => Sound.enable(), { once: true });

/* ──────────────────────────────────────────────────────────────
   3. TOAST
   ──────────────────────────────────────────────────────────────*/
function showToast(msg, dur = 3200) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('visible'), dur);
}

/* ──────────────────────────────────────────────────────────────
   4. I18N — Translation Engine
   ──────────────────────────────────────────────────────────────*/
const I18N = {

  /* ═════════════ ENGLISH ═════════════ */
  en: {
    /* Nav */
    nav_home: './home',
    nav_about: './about',
    nav_projects: './projects',
    nav_skills: './skills',
    nav_contact: './contact',
    /* Titles */
    about_title: 'habib@portfolio:~ — about.sh',
    projects_title: 'habib@portfolio:~/projects',
    skills_title: 'habib@portfolio:~ — system monitor',
    terminal_title: 'habib@portfolio:~ — interactive shell',
    contact_title: 'habib@portfolio:~ — send_message.sh',
    terminal_label: '// INTERACTIVE TERMINAL — TYPE COMMANDS BELOW',
    status_live: '● LIVE',
    back_top: 'Back to top',
    /* Boot lines */
    boot_lines: [
      { text: 'GNU GRUB version 2.06', cls: 'boot-info', delay: 0 },
      { text: 'Minimal BASH-like line editing is supported.', cls: '', delay: 120 },
      { text: '', cls: '', delay: 200 },
      { text: 'Booting HabibOS v2.6.0...', cls: 'boot-bold', delay: 350 },
      { text: '[ OK ] Started kernel modules', cls: 'boot-ok', delay: 600 },
      { text: '[ OK ] Mounted virtual filesystems', cls: 'boot-ok', delay: 770 },
      { text: '[ OK ] Reached network target', cls: 'boot-ok', delay: 940 },
      { text: '[WARN] Power management: reduced mode', cls: 'boot-warn', delay: 1080 },
      { text: '[ OK ] Started OpenSSH daemon', cls: 'boot-ok', delay: 1220 },
      { text: '[ OK ] Node.js runtime v20.11.0 active', cls: 'boot-ok', delay: 1360 },
      { text: '[ OK ] React engine mounted', cls: 'boot-ok', delay: 1500 },
      { text: '[ OK ] Flutter SDK v3.19.0 ready', cls: 'boot-ok', delay: 1640 },
      { text: '', cls: '', delay: 1800 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 1900 },
      { text: '', cls: '', delay: 1950 },
      { text: '  root@habib:~$ whoami', cls: 'cmd-text', delay: 2100 },
      { text: '', cls: '', delay: 2280 },
      { text: '  ██╗  ██╗ █████╗ ██████╗ ██╗██████╗ ', cls: 'boot-bold name-glitch', delay: 2430 },
      { text: '  ██║  ██║██╔══██╗██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 2530 },
      { text: '  ███████║███████║██████╔╝██║██████╔╝', cls: 'boot-bold', delay: 2630 },
      { text: '  ██╔══██║██╔══██║██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 2730 },
      { text: '  ██║  ██║██║  ██║██████╔╝██║██████╔╝ ', cls: 'boot-bold', delay: 2830 },
      { text: '  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═════╝  ', cls: 'boot-bold', delay: 2930 },
      { text: '', cls: '', delay: 3030 },
      { text: '  Mohamed Habib Msahel — Full-Stack & Mobile Developer', cls: 'boot-hi', delay: 3130 },
      { text: '  Tunisia 🇹🇳  |  Available for opportunities', cls: 'boot-dim', delay: 3280 },
      { text: '', cls: '', delay: 3380 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 3460 },
      { text: '', cls: '', delay: 3510 },
      { text: '  Tip: Scroll down to explore. Type commands in the terminal ↓', cls: 'boot-info', delay: 3640 },
    ],
    /* About */
    about_cmd1: 'whoami',
    about_result1: 'Mohamed Habib Msahel',
    about_result2: 'Full-Stack Developer & Mobile Engineer',
    about_cmd2: 'cat about.txt',
    about_name: 'Mohamed Habib Msahel',
    about_role: 'Full-Stack & Mobile Developer',
    about_loc: 'Tunisia 🇹🇳',
    about_status: '● Available for opportunities',
    about_focus: 'Building scalable apps & clean architectures',
    about_cmd3: 'cat bio.txt',
    about_bio: [
      'Passionate developer with a love for crafting elegant solutions to',
      'complex problems. I bridge the gap between powerful backends and',
      'beautiful, intuitive frontends — from web to mobile.',
      '',
      'I thrive in dynamic, fast-paced environments and believe great',
      'software lives at the intersection of creativity and engineering.',
    ],
    about_cmd4: 'cat education.txt',
    about_edu: '🎓 Engineering Degree — Computer Science',
    about_edu_sub: '   University of Technology | 2019 – 2024',
    /* Projects */
    projects_cmd: 'cd projects && ls -la',
    projects_total: 'total 6 projects',
    projects_meta1: 'drwxr-xr-x  6 habib  staff   192 Apr 14 2026 .',
    projects_meta2: 'drwxr-xr-x 18 habib  staff   576 Apr 14 2026 ..',
    /* Skills */
    skills_cmd: 'htop --skills',
    skills_header: 'PID   SKILL                         LEVEL          USAGE',
    skills_cmd2: 'ls ./tech-stack/',
    level_expert: 'EXPERT',
    level_advanced: 'ADVANCED',
    level_intermediate: 'INTERMEDIATE',
    /* Contact */
    contact_cmd: './send_message.sh',
    contact_init_line: 'Initializing secure channel... <span class="highlight">✓</span>',
    contact_enc_line: 'Encryption: <span class="highlight">AES-256</span> | Protocol: <span class="highlight">HTTPS/2</span>',
    contact_name_cmd: 'input --field="name"',
    contact_email_cmd: 'input --field="email"',
    contact_msg_cmd: 'input --field="message"',
    contact_name_ph: 'Your name...',
    contact_email_ph: 'your@email.com',
    contact_msg_ph: 'Your message...',
    contact_submit: './transmit --encrypt --send',
    contact_links_cmd: 'cat links.txt',
    /* Form feedback */
    form_success: '> SUCCESS: Message transmitted securely. Habib will respond shortly. ✓',
    form_err_req: '> ERROR: All fields are required.',
    form_err_email: '> ERROR: Invalid email address format.',
    /* Terminal */
    term_welcome: 'Welcome to <span class="highlight">HabibOS v2.6.0</span> — Type <span class="highlight">help</span> to get started.',
    term_hint: 'Try: help | about | projects | skills | contact | hack | game | clear',
    term_cleared: 'Terminal cleared. Type <span style="color:var(--green)">help</span> for commands.',
    /* Footer */
    footer_copy: '© 2026 Mohamed Habib Msahel — <span class="highlight">Built with passion &amp; caffeine</span>',
    footer_status: 'All systems operational <span class="blink-green">●</span>',
    /* Game */
    game_title: 'HACK THE MAINFRAME — v1.0',
    game_intro1: 'The mainframe is protected by a numeric passcode',
    game_intro2: 'You have',
    game_attempts_label: 'attempts before lockdown.',
    game_inject: 'INJECT',
    game_restart: './restart_game.sh',
    game_cracked: (n, a) => `✅ Code cracked! The secret was <strong>${n}</strong> — in ${a} attempt(s)! 🎉`,
    game_locked: (n) => `❌ LOCKDOWN! The code was <strong>${n}</strong>. Mission failed.`,
    game_invalid: 'Invalid input. Range: 1–100',
    game_access_granted: '🔓 ACCESS GRANTED — ROOT SHELL OPENED',
    game_locked_msg: '🔒 SYSTEM LOCKED — INITIATING COUNTERMEASURES',
    game_low: '▲ TOO LOW',
    game_high: '▼ TOO HIGH',
    game_left: (r) => `${r} attempt(s) left`,
    /* Terminal command outputs */
    cmd_whoami_result: (lang) => `<p>Mohamed Habib Msahel — <span class="success">root</span> access granted 🔓</p>`,
    cmd_ls_result: `
<p><span class="info">about.txt</span>   <span class="info">bio.txt</span>   <span class="info">education.txt</span>   <span class="info">links.txt</span></p>
<p><span class="success">projects/</span>   <span class="success">skills/</span>   <span class="success">contact/</span>   <span class="warn">secret/</span></p>`,
    cmd_pwd: '/home/habib/portfolio',
    cmd_date: () => `${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Tunis' })} (Tunisia Time)`,
    cmd_uname: 'HabibOS v2.6.0 x86_64 GNU/Habib Kernel 5.19.0-habib #1 SMP',
    cmd_exit1: 'logout',
    cmd_exit2: 'Connection closed. Come back soon 👋',
    cmd_sudo_prompt: '[sudo] password for habib:',
    cmd_sudo_deny: 'habib is not in the sudoers file. This incident will be reported. 📁',
    cmd_not_found: (c) => `habib: command not found: ${c}`,
    cmd_type_help: 'Type <span style="color:var(--green)">help</span> for available commands.',
    cmd_cat_bio: 'Passionate developer. Coffee addict. Bug hunter. Open-source believer.',
    cmd_cat_edu: '🎓 Engineering Degree — Computer Science | 2019–2024',
    cmd_cat_deny: '🔐 ACCESS DENIED — sudo required',
    cmd_cat_missing: 'cat: missing operand',
    cmd_cat_notfound: (f) => `cat: ${f}: No such file or directory`,
    hack_steps: [
      { text: '> Scanning target network...', delay: 0 },
      { text: '> Open ports: 22 (SSH) 80 (HTTP) 443 (HTTPS)', delay: 600 },
      { text: '> Running exploit: CVE-2024-HABIB...', delay: 1200 },
      { text: '> Bypassing firewall...', delay: 1900 },
      { text: '> Injecting payload 0x4841424942...', delay: 2600 },
      { text: '> Establishing reverse shell...', delay: 3300 },
      { text: '> 🔓 ROOT ACCESS GRANTED', delay: 4000, cls: 'success' },
      { text: '> Target successfully recruited as client. 😎', delay: 4700, cls: 'warn' },
    ],
    hack_start: '⚡ Initiating hacking sequence — standby...',
    cmd_contact_init: '📡 Establishing secure connection...',
    cmd_contact_links: ['GitHub  :', 'LinkedIn:', 'Email   :'],
    cmd_contact_scroll: 'Or scroll down to send a message via the contact form ↓',
    cmd_projects_hint: 'Run <span class="success">cat project-name</span> for details',
    fortune_quotes: [
      '"The best code is no code at all." — Jeff Atwood',
      '"First, solve the problem. Then, write the code." — John Johnson',
      '"Clean code always looks like it was written by someone who cares." — Robert Martin',
      '"Talk is cheap. Show me the code." — Linus Torvalds',
      '"It works on my machine." — Every developer ever',
      '"99 bugs in the code, patch one around — 127 bugs in the code."',
      '"Programs must be written for people to read, and only incidentally for machines to execute." — SICP',
    ],
    neofetch_fields: {
      os: 'HabibOS v2.6.0 x86_64',
      host: 'Developer MacBook Pro',
      kernel: '5.19.0-habib',
      uptime: '2+ years coding',
      shell: 'habib-sh 2.6.0',
      cpu: 'Brain @ ∞ GHz',
      memory: 'Barely enough',
      stack: 'React · Node · Flutter',
      coffee: '3 cups/day',
    },
    secret_reveal: '[ secret commands: coffee | hire | fortune | matrix | neofetch ]',
    easter_matrix: 'Wake up, Neo... The Matrix has you.',
    easter_matrix2: 'Follow the white rabbit. 🐇',
    easter_coffee_msg: '☕ Coffee.exe launched — productivity increased by 420%',
    easter_hire1: '✅ EXCELLENT DECISION!',
    easter_hire2: "You've chosen to hire Mohamed Habib Msahel.",
    easter_hire3: 'Please proceed to the contact section. 💼',
    easter_hire4: 'Note: Habib ships features, not bugs. (Usually.)',
    konami_msg: '🕹️ KONAMI CODE ACTIVATED — +30 lives. The Matrix is yours.',
    konami_toast: '🕹️ KONAMI CODE! +30 lives granted. Good luck, Neo.',
    help_footer: 'Psst... there are hidden easter egg commands too. 🥚',
  },

  /* ═════════════ FRENCH ═════════════ */
  fr: {
    nav_home: './accueil', nav_about: './à-propos',
    nav_projects: './projets', nav_skills: './compétences', nav_contact: './contact',
    about_title: 'habib@portfolio:~ — à-propos.sh',
    projects_title: 'habib@portfolio:~/projets',
    skills_title: 'habib@portfolio:~ — moniteur-système',
    terminal_title: 'habib@portfolio:~ — shell interactif',
    contact_title: 'habib@portfolio:~ — envoyer_message.sh',
    terminal_label: '// TERMINAL INTERACTIF — TAPEZ VOS COMMANDES ICI',
    status_live: '● EN DIRECT',
    back_top: 'Retour en haut',
    boot_lines: [
      { text: 'GNU GRUB version 2.06', cls: 'boot-info', delay: 0 },
      { text: "Édition minimale BASH-like prise en charge.", cls: '', delay: 120 },
      { text: '', cls: '', delay: 200 },
      { text: 'Démarrage de HabibOS v2.6.0...', cls: 'boot-bold', delay: 350 },
      { text: '[ OK ] Modules noyau démarrés', cls: 'boot-ok', delay: 600 },
      { text: '[ OK ] Systèmes de fichiers virtuels montés', cls: 'boot-ok', delay: 770 },
      { text: '[ OK ] Cible réseau atteinte', cls: 'boot-ok', delay: 940 },
      { text: '[WARN] Gestion d\'énergie : mode réduit', cls: 'boot-warn', delay: 1080 },
      { text: '[ OK ] Serveur OpenSSH démarré', cls: 'boot-ok', delay: 1220 },
      { text: '[ OK ] Runtime Node.js v20.11.0 actif', cls: 'boot-ok', delay: 1360 },
      { text: '[ OK ] Moteur React monté', cls: 'boot-ok', delay: 1500 },
      { text: '[ OK ] SDK Flutter v3.19.0 prêt', cls: 'boot-ok', delay: 1640 },
      { text: '', cls: '', delay: 1800 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 1900 },
      { text: '', cls: '', delay: 1950 },
      { text: '  root@habib:~$ whoami', cls: 'cmd-text', delay: 2100 },
      { text: '', cls: '', delay: 2280 },
      { text: '  ██╗  ██╗ █████╗ ██████╗ ██╗██████╗ ', cls: 'boot-bold name-glitch', delay: 2430 },
      { text: '  ██║  ██║██╔══██╗██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 2530 },
      { text: '  ███████║███████║██████╔╝██║██████╔╝', cls: 'boot-bold', delay: 2630 },
      { text: '  ██╔══██║██╔══██║██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 2730 },
      { text: '  ██║  ██║██║  ██║██████╔╝██║██████╔╝ ', cls: 'boot-bold', delay: 2830 },
      { text: '  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═════╝  ', cls: 'boot-bold', delay: 2930 },
      { text: '', cls: '', delay: 3030 },
      { text: '  Mohamed Habib Msahel — Développeur Full-Stack & Mobile', cls: 'boot-hi', delay: 3130 },
      { text: '  Tunisie 🇹🇳  |  Disponible pour des opportunités', cls: 'boot-dim', delay: 3280 },
      { text: '', cls: '', delay: 3380 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 3460 },
      { text: '', cls: '', delay: 3510 },
      { text: '  Astuce: Faites défiler vers le bas pour explorer ↓', cls: 'boot-info', delay: 3640 },
    ],
    about_cmd1: 'whoami', about_result1: 'Mohamed Habib Msahel', about_result2: "Développeur Full-Stack & Ingénieur Mobile",
    about_cmd2: 'cat à-propos.txt',
    about_name: 'Mohamed Habib Msahel', about_role: 'Développeur Full-Stack & Mobile',
    about_loc: 'Tunisie 🇹🇳', about_status: '● Disponible pour des opportunités',
    about_focus: 'Créer des apps évolutives & des architectures propres',
    about_cmd3: 'cat bio.txt',
    about_bio: [
      "Développeur passionné avec un goût prononcé pour la création de",
      "solutions élégantes aux problèmes complexes. Je fais le pont entre",
      "des backends puissants et des frontends intuitifs — du web au mobile.",
      '',
      "Je m'épanouis dans des environnements dynamiques et crois que le",
      "grand logiciel naît à l'intersection de la créativité et de l'ingénierie.",
    ],
    about_cmd4: 'cat formation.txt',
    about_edu: '🎓 Diplôme d\'Ingénieur — Informatique',
    about_edu_sub: "   Université de Technologie | 2019 – 2024",
    projects_cmd: 'cd projets && ls -la',
    projects_total: 'total 6 projets',
    projects_meta1: 'drwxr-xr-x  6 habib  staff   192 Avr 14 2026 .',
    projects_meta2: 'drwxr-xr-x 18 habib  staff   576 Avr 14 2026 ..',
    skills_cmd: 'htop --compétences', skills_header: 'PID   COMPÉTENCE                         NIVEAU      USAGE',
    skills_cmd2: 'ls ./pile-technique/',
    level_expert: 'EXPERT', level_advanced: 'AVANCÉ', level_intermediate: 'INTERMÉDIAIRE',
    contact_cmd: './envoyer_message.sh',
    contact_init_line: 'Initialisation du canal sécurisé... <span class="highlight">✓</span>',
    contact_enc_line: 'Chiffrement: <span class="highlight">AES-256</span> | Protocole: <span class="highlight">HTTPS/2</span>',
    contact_name_cmd: 'saisie --champ="nom"', contact_email_cmd: 'saisie --champ="email"',
    contact_msg_cmd: 'saisie --champ="message"',
    contact_name_ph: 'Votre nom...', contact_email_ph: 'votre@email.com', contact_msg_ph: 'Votre message...',
    contact_submit: './transmettre --chiffrer --envoyer', contact_links_cmd: 'cat liens.txt',
    form_success: '> SUCCÈS: Message transmis en toute sécurité. Habib répondra bientôt. ✓',
    form_err_req: '> ERREUR: Tous les champs sont obligatoires.',
    form_err_email: '> ERREUR: Format d\'adresse email invalide.',
    term_welcome: 'Bienvenue sur <span class="highlight">HabibOS v2.6.0</span> — Tapez <span class="highlight">help</span> pour commencer.',
    term_hint: 'Essayez: help | about | projects | skills | contact | hack | game | clear',
    term_cleared: 'Terminal effacé. Tapez <span style="color:var(--green)">help</span> pour les commandes.',
    footer_copy: '© 2026 Mohamed Habib Msahel — <span class="highlight">Construit avec passion &amp; caféine</span>',
    footer_status: 'Tous les systèmes opérationnels <span class="blink-green">●</span>',
    game_title: 'PIRATER LE MAINFRAME — v1.0',
    game_intro1: 'Le mainframe est protégé par un code numérique',
    game_intro2: 'Vous avez', game_attempts_label: 'tentatives avant le verrouillage.',
    game_inject: 'INJECTER', game_restart: './redémarrer_jeu.sh',
    game_cracked: (n, a) => `✅ Code cracké! Le secret était <strong>${n}</strong> — en ${a} tentative(s)! 🎉`,
    game_locked: (n) => `❌ VERROUILLAGE! Le code était <strong>${n}</strong>. Mission échouée.`,
    game_invalid: 'Entrée invalide. Plage: 1–100',
    game_access_granted: '🔓 ACCÈS ACCORDÉ — SHELL ROOT OUVERT',
    game_locked_msg: '🔒 SYSTÈME VERROUILLÉ — CONTRE-MESURES EN COURS',
    game_low: '▲ TROP BAS', game_high: '▼ TROP HAUT',
    game_left: (r) => `${r} tentative(s) restante(s)`,
    cmd_whoami_result: () => `<p>Mohamed Habib Msahel — accès <span class="success">root</span> accordé 🔓</p>`,
    cmd_ls_result: `
<p><span class="info">à-propos.txt</span>   <span class="info">bio.txt</span>   <span class="info">formation.txt</span>   <span class="info">liens.txt</span></p>
<p><span class="success">projets/</span>   <span class="success">compétences/</span>   <span class="success">contact/</span>   <span class="warn">secret/</span></p>`,
    cmd_pwd: '/home/habib/portfolio',
    cmd_date: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' })} (Heure de Tunis)`,
    cmd_uname: 'HabibOS v2.6.0 x86_64 GNU/Habib Noyau 5.19.0-habib #1 SMP',
    cmd_exit1: 'déconnexion', cmd_exit2: 'Connexion fermée. À bientôt 👋',
    cmd_sudo_prompt: '[sudo] mot de passe pour habib:',
    cmd_sudo_deny: "habib n'est pas dans le fichier sudoers. Cet incident sera signalé. 📁",
    cmd_not_found: (c) => `habib: commande introuvable: ${c}`,
    cmd_type_help: 'Tapez <span style="color:var(--green)">help</span> pour les commandes disponibles.',
    cmd_cat_bio: 'Développeur passionné. Accro au café. Chasseur de bugs. Croyant en l\'open-source.',
    cmd_cat_edu: '🎓 Diplôme d\'Ingénieur — Informatique | 2019–2024',
    cmd_cat_deny: '🔐 ACCÈS REFUSÉ — sudo requis',
    cmd_cat_missing: 'cat: opérande manquant',
    cmd_cat_notfound: (f) => `cat: ${f}: Aucun fichier ou dossier de ce type`,
    hack_steps: [
      { text: '> Analyse du réseau cible...', delay: 0 },
      { text: '> Ports ouverts: 22 (SSH) 80 (HTTP) 443 (HTTPS)', delay: 600 },
      { text: '> Exécution exploit: CVE-2024-HABIB...', delay: 1200 },
      { text: '> Contournement du pare-feu...', delay: 1900 },
      { text: '> Injection payload 0x4841424942...', delay: 2600 },
      { text: '> Établissement du reverse shell...', delay: 3300 },
      { text: '> 🔓 ACCÈS ROOT ACCORDÉ', delay: 4000, cls: 'success' },
      { text: '> Cible recrutée avec succès comme client. 😎', delay: 4700, cls: 'warn' },
    ],
    hack_start: '⚡ Séquence de piratage initiée — veuillez patienter...',
    cmd_contact_init: '📡 Établissement d\'une connexion sécurisée...',
    cmd_contact_links: ['GitHub  :', 'LinkedIn:', 'Email   :'],
    cmd_contact_scroll: 'Ou faites défiler vers le bas pour envoyer un message ↓',
    cmd_projects_hint: 'Exécutez <span class="success">cat nom-projet</span> pour les détails',
    fortune_quotes: [
      '"Le meilleur code est l\'absence de code." — Jeff Atwood',
      '"D\'abord, résoudre le problème. Ensuite, écrire le code." — John Johnson',
      '"Le code propre ressemble toujours à celui écrit par quelqu\'un qui tient à ce travail." — Robert Martin',
      '"La parole est bon marché. Montre-moi le code." — Linus Torvalds',
      '"Ça fonctionne sur ma machine." — Tout développeur, un jour',
      '"99 bugs dans le code, patch en faisant le tour — 127 bugs dans le code."',
      '"Les programmes doivent être écrits pour que les gens les lisent." — SICP',
    ],
    neofetch_fields: {
      os: 'HabibOS v2.6.0 x86_64', host: 'MacBook Pro Développeur',
      kernel: '5.19.0-habib', uptime: '2+ ans de code', shell: 'habib-sh 2.6.0',
      cpu: 'Cerveau @ ∞ GHz', memory: 'Tout juste suffisant', stack: 'React · Node · Flutter', coffee: '3 tasses/jour',
    },
    secret_reveal: '[ commandes secrètes: coffee | hire | fortune | matrix | neofetch ]',
    easter_matrix: 'Réveille-toi, Neo... La Matrice te tient.',
    easter_matrix2: 'Suis le lapin blanc. 🐇',
    easter_coffee_msg: '☕ Coffee.exe lancé — productivité augmentée de 420%',
    easter_hire1: '✅ EXCELLENTE DÉCISION!',
    easter_hire2: 'Vous avez choisi d\'embaucher Mohamed Habib Msahel.',
    easter_hire3: 'Veuillez vous rendre à la section contact. 💼',
    easter_hire4: 'Note: Habib livre des fonctionnalités, pas des bugs. (Habituellement.)',
    konami_msg: '🕹️ CODE KONAMI ACTIVÉ — +30 vies. La Matrice est à vous.',
    konami_toast: '🕹️ CODE KONAMI! +30 vies accordées. Bonne chance, Neo.',
    help_footer: 'Psst... il y a aussi des commandes easter egg cachées. 🥚',
  },

  /* ═════════════ ARABIC ═════════════ */
  ar: {
    nav_home: './الرئيسية', nav_about: './عنّي', nav_projects: './المشاريع',
    nav_skills: './المهارات', nav_contact: './التواصل',
    about_title: 'habib@portfolio:~ — about.sh',
    projects_title: 'habib@portfolio:~/projects',
    skills_title: 'habib@portfolio:~ — مراقب النظام',
    terminal_title: 'habib@portfolio:~ — الطرفية التفاعلية',
    contact_title: 'habib@portfolio:~ — إرسال_رسالة.sh',
    terminal_label: '// الطرفية التفاعلية — اكتب أوامرك هنا',
    status_live: '● مباشر',
    back_top: 'إلى الأعلى',
    boot_lines: [
      { text: 'GNU GRUB version 2.06', cls: 'boot-info', delay: 0 },
      { text: 'يتم دعم التحرير المشابه للـ BASH.', cls: '', delay: 120 },
      { text: '', cls: '', delay: 200 },
      { text: 'جاري تشغيل HabibOS v2.6.0...', cls: 'boot-bold', delay: 350 },
      { text: '[ نجح ] بدء وحدات النواة', cls: 'boot-ok', delay: 600 },
      { text: '[ نجح ] تحميل الأنظمة الافتراضية', cls: 'boot-ok', delay: 770 },
      { text: '[ نجح ] الوصول إلى هدف الشبكة', cls: 'boot-ok', delay: 940 },
      { text: '[تحذير] إدارة الطاقة: وضع محدود', cls: 'boot-warn', delay: 1080 },
      { text: '[ نجح ] تشغيل خادم OpenSSH', cls: 'boot-ok', delay: 1220 },
      { text: '[ نجح ] تشغيل Node.js v20.11.0', cls: 'boot-ok', delay: 1360 },
      { text: '[ نجح ] تثبيت محرك React', cls: 'boot-ok', delay: 1500 },
      { text: '[ نجح ] جاهزية Flutter SDK v3.19.0', cls: 'boot-ok', delay: 1640 },
      { text: '', cls: '', delay: 1800 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 1900 },
      { text: '', cls: '', delay: 1950 },
      { text: '  root@habib:~$ whoami', cls: 'cmd-text', delay: 2100 },
      { text: '', cls: '', delay: 2280 },
      { text: '  ██╗  ██╗ █████╗ ██████╗ ██╗██████╗ ', cls: 'boot-bold name-glitch', delay: 2430 },
      { text: '  ██║  ██║██╔══██╗██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 2530 },
      { text: '  ███████║███████║██████╔╝██║██████╔╝', cls: 'boot-bold', delay: 2630 },
      { text: '  ██╔══██║██╔══██║██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 2730 },
      { text: '  ██║  ██║██║  ██║██████╔╝██║██████╔╝ ', cls: 'boot-bold', delay: 2830 },
      { text: '  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═════╝  ', cls: 'boot-bold', delay: 2930 },
      { text: '', cls: '', delay: 3030 },
      { text: '  محمد حبيب مساهل — مطوّر Full-Stack ومحمول', cls: 'boot-hi', delay: 3130 },
      { text: '  تونس 🇹🇳  |  متاح للفرص الوظيفية', cls: 'boot-dim', delay: 3280 },
      { text: '', cls: '', delay: 3380 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 3460 },
      { text: '', cls: '', delay: 3510 },
      { text: '  نصيحة: انتقل للأسفل للاستكشاف. اكتب أوامر في الطرفية ↓', cls: 'boot-info', delay: 3640 },
    ],
    about_cmd1: 'whoami', about_result1: 'محمد حبيب مساهل', about_result2: 'مطوّر Full-Stack ومهندس تطبيقات محمولة',
    about_cmd2: 'cat about.txt',
    about_name: 'محمد حبيب مساهل', about_role: 'مطوّر Full-Stack وتطبيقات محمولة',
    about_loc: 'تونس 🇹🇳', about_status: '● متاح للفرص الوظيفية',
    about_focus: 'بناء تطبيقات قابلة للتوسع وبنيات برمجية نظيفة',
    about_cmd3: 'cat bio.txt',
    about_bio: [
      'مطوّر شغوف يعشق صياغة حلول أنيقة للمشاكل المعقدة.',
      'أجسّر الفجوة بين الخوادم القوية والواجهات الجميلة والبديهية',
      '— من الويب إلى تطبيقات الجوال.',
      '',
      'أزدهر في البيئات الديناميكية وأؤمن أن البرمجيات العظيمة',
      'تولد عند تقاطع الإبداع والهندسة الدقيقة.',
    ],
    about_cmd4: 'cat التعليم.txt',
    about_edu: '🎓 شهادة مهندس — علوم الحاسوب',
    about_edu_sub: '   جامعة التكنولوجيا | 2019 – 2024',
    projects_cmd: 'cd projects && ls -la',
    projects_total: 'المجموع: 6 مشاريع',
    projects_meta1: 'drwxr-xr-x  6 habib  staff   192 أبريل 14 2026 .',
    projects_meta2: 'drwxr-xr-x 18 habib  staff   576 أبريل 14 2026 ..',
    skills_cmd: 'htop --skills', skills_header: 'PID   المهارة                      المستوى       الاستخدام',
    skills_cmd2: 'ls ./مكدس-التقنيات/',
    level_expert: 'خبير', level_advanced: 'متقدم', level_intermediate: 'متوسط',
    contact_cmd: './إرسال_رسالة.sh',
    contact_init_line: 'تهيئة القناة الآمنة... <span class="highlight">✓</span>',
    contact_enc_line: 'التشفير: <span class="highlight">AES-256</span> | البروتوكول: <span class="highlight">HTTPS/2</span>',
    contact_name_cmd: 'إدخال --حقل="الاسم"', contact_email_cmd: 'إدخال --حقل="البريد"',
    contact_msg_cmd: 'إدخال --حقل="الرسالة"',
    contact_name_ph: 'اسمك...', contact_email_ph: 'بريدك@الكتروني.com', contact_msg_ph: 'رسالتك...',
    contact_submit: './إرسال --تشفير --إرسال_آمن', contact_links_cmd: 'cat روابط.txt',
    form_success: '> نجاح: تم إرسال رسالتك بأمان. سيرد حبيب قريباً. ✓',
    form_err_req: '> خطأ: جميع الحقول مطلوبة.',
    form_err_email: '> خطأ: تنسيق البريد الإلكتروني غير صحيح.',
    term_welcome: 'مرحباً في <span class="highlight">HabibOS v2.6.0</span> — اكتب <span class="highlight">help</span> للبدء.',
    term_hint: 'جرّب: help | about | projects | skills | contact | hack | game | clear',
    term_cleared: 'تم مسح الطرفية. اكتب <span style="color:var(--green)">help</span> للأوامر.',
    footer_copy: '© 2026 محمد حبيب مساهل — <span class="highlight">بُني بشغف وقهوة</span>',
    footer_status: 'جميع الأنظمة تعمل بشكل طبيعي <span class="blink-green">●</span>',
    game_title: 'اختراق الخادم الرئيسي — v1.0',
    game_intro1: 'الخادم محمي برمز رقمي', game_intro2: 'لديك',
    game_attempts_label: 'محاولات قبل القفل.',
    game_inject: 'حقن', game_restart: './إعادة_تشغيل.sh',
    game_cracked: (n, a) => `✅ تم كسر الرمز! السر كان <strong>${n}</strong> — في ${a} محاولة! 🎉`,
    game_locked: (n) => `❌ قُفل النظام! الرمز كان <strong>${n}</strong>. المهمة فشلت.`,
    game_invalid: 'إدخال غير صالح. النطاق: 1–100',
    game_access_granted: '🔓 تم منح الوصول — فتح قشرة ROOT',
    game_locked_msg: '🔒 النظام مقفل — تنفيذ الإجراءات المضادة',
    game_low: '▲ منخفض جداً', game_high: '▼ مرتفع جداً',
    game_left: (r) => `${r} محاولة متبقية`,
    cmd_whoami_result: () => `<p>محمد حبيب مصحل — تم منح وصول <span class="success">root</span> 🔓</p>`,
    cmd_ls_result: `
<p><span class="info">about.txt</span>   <span class="info">bio.txt</span>   <span class="info">education.txt</span>   <span class="info">links.txt</span></p>
<p><span class="success">projects/</span>   <span class="success">skills/</span>   <span class="success">contact/</span>   <span class="warn">secret/</span></p>`,
    cmd_pwd: '/home/habib/portfolio',
    cmd_date: () => `${new Date().toLocaleString('ar-TN', { timeZone: 'Africa/Tunis' })} (توقيت تونس)`,
    cmd_uname: 'HabibOS v2.6.0 x86_64 GNU/حبيب النواة 5.19.0-habib #1 SMP',
    cmd_exit1: 'تسجيل الخروج', cmd_exit2: 'أُغلق الاتصال. إلى اللقاء 👋',
    cmd_sudo_prompt: '[sudo] كلمة مرور habib:',
    cmd_sudo_deny: 'habib غير موجود في ملف sudoers. سيتم الإبلاغ عن هذه الحادثة. 📁',
    cmd_not_found: (c) => `habib: أمر غير موجود: ${c}`,
    cmd_type_help: 'اكتب <span style="color:var(--green)">help</span> للأوامر المتاحة.',
    cmd_cat_bio: 'مطوّر شغوف. مدمن قهوة. صيّاد أخطاء. مؤمن بالمصدر المفتوح.',
    cmd_cat_edu: '🎓 شهادة مهندس — علوم الحاسوب | 2019–2024',
    cmd_cat_deny: '🔐 تم رفض الوصول — يتطلب sudo',
    cmd_cat_missing: 'cat: معامل مفقود',
    cmd_cat_notfound: (f) => `cat: ${f}: لا يوجد ملف أو مجلد بهذا الاسم`,
    hack_steps: [
      { text: '> فحص الشبكة المستهدفة...', delay: 0 },
      { text: '> المنافذ المفتوحة: 22 (SSH) 80 (HTTP) 443 (HTTPS)', delay: 600 },
      { text: '> تشغيل الاستغلال: CVE-2024-HABIB...', delay: 1200 },
      { text: '> تجاوز جدار الحماية...', delay: 1900 },
      { text: '> حقن الحمولة 0x4841424942...', delay: 2600 },
      { text: '> إنشاء reverse shell...', delay: 3300 },
      { text: '> 🔓 تم منح وصول ROOT', delay: 4000, cls: 'success' },
      { text: '> تم تجنيد الهدف بنجاح كعميل. 😎', delay: 4700, cls: 'warn' },
    ],
    hack_start: '⚡ بدء تسلسل الاختراق — انتظر...',
    cmd_contact_init: '📡 إنشاء اتصال آمن...',
    cmd_contact_links: ['GitHub  :', 'LinkedIn:', 'Email   :'],
    cmd_contact_scroll: 'أو انتقل للأسفل لإرسال رسالة عبر نموذج الاتصال ↓',
    cmd_projects_hint: 'شغّل <span class="success">cat اسم-المشروع</span> للتفاصيل',
    fortune_quotes: [
      '"أفضل كود هو عدم وجود كود على الإطلاق." — جيف أتوود',
      '"أولاً، حل المشكلة. ثم اكتب الكود." — جون جونسون',
      '"الكود النظيف يبدو دائماً كأنه كُتب بواسطة شخص يهتم." — روبرت مارتن',
      '"الكلام رخيص. أرني الكود." — لينوس تورفالدز',
      '"يعمل على جهازي." — كل مطوّر',
      '"99 خطأ في الكود، أصلح واحداً — 127 خطأ في الكود."',
      '"يجب كتابة البرامج ليقرأها البشر، وليس فقط الآلات." — SICP',
    ],
    neofetch_fields: {
      os: 'HabibOS v2.6.0 x86_64', host: 'MacBook Pro مطوّر',
      kernel: '5.19.0-habib', uptime: 'أكثر من سنتين من البرمجة', shell: 'habib-sh 2.6.0',
      cpu: 'الدماغ @ ∞ GHz', memory: 'بالكاد كافٍ', stack: 'React · Node · Flutter', coffee: '3 فناجين/يوم',
    },
    secret_reveal: '[ أوامر سرية: coffee | hire | fortune | matrix | neofetch ]',
    easter_matrix: 'استيقظ يا Neo... المصفوفة تمسك بك.',
    easter_matrix2: 'اتبع الأرنب الأبيض. 🐇',
    easter_coffee_msg: '☕ Coffee.exe شُغّل — الإنتاجية زادت 420%',
    easter_hire1: '✅ قرار ممتاز!',
    easter_hire2: 'اخترت توظيف محمد حبيب مساهل.',
    easter_hire3: 'يرجى التوجه إلى قسم التواصل. 💼',
    easter_hire4: 'ملاحظة: حبيب يُسلّم ميزات لا أخطاء. (عادةً.)',
    konami_msg: '🕹️ كود KONAMI مُفعَّل — +30 حياة. المصفوفة لك.',
    konami_toast: '🕹️ كود KONAMI! +30 حياة. حظاً موفقاً يا Neo.',
    help_footer: 'بسرا... توجد أوامر عيد البيضة المخفية أيضاً. 🥚',
  },
};

/* ──────────────────────────────────────────────────────────────
   5. PROJECTS DATA (multi-language descriptions)
   ──────────────────────────────────────────────────────────────*/
const PROJECTS_DATA = [
  {
    dir: 'drwxr-xr-x  easy_dispatching/',
    name: 'Easy Dispatching System',
    badge: 'ACTIVE',
    tags: ['Node.js', 'React', 'Flutter', 'PostgreSQL', 'JWT'],
    github: '#', demo: '#',
    desc: {
      en: 'Full-stack logistics & warehouse management platform with real-time tracking, role-based access control, and optimized dispatch workflows.',
      fr: 'Plateforme full-stack de gestion logistique et d\'entrepôt avec suivi en temps réel, contrôle d\'accès basé sur les rôles et flux de travail optimisés.',
      ar: 'منصة إدارة لوجستية ومستودعات متكاملة مع تتبع في الوقت الفعلي والتحكم في الوصول القائم على الأدوار وسير عمل الإرسال المحسّن.',
    },
  },
  {
    dir: 'drwxr-xr-x  inventory_scanner/',
    name: 'Mobile Inventory Scanner',
    badge: 'ACTIVE',
    tags: ['Flutter', 'Dart', 'Zebra SDK', 'SQLite', 'BLE'],
    github: '#', demo: null,
    desc: {
      en: 'Industrial barcode scanner app for Zebra devices built with Flutter. Multi-zone inventory management with offline sync capabilities.',
      fr: 'Application de scanner de code-barres industriel pour appareils Zebra, développée avec Flutter. Gestion d\'inventaire multi-zones avec synchronisation hors ligne.',
      ar: 'تطبيق ماسح الباركود الصناعي لأجهزة Zebra مبني بـ Flutter. إدارة المخزون متعدد المناطق مع قدرات المزامنة دون اتصال.',
    },
  },
  {
    dir: 'drwxr-xr-x  portfolio_os/',
    name: 'HabibOS Portfolio',
    badge: 'LIVE',
    tags: ['HTML5', 'CSS3', 'Vanilla JS', 'Canvas API', 'Web Audio'],
    github: '#', demo: '#',
    desc: {
      en: 'This portfolio — a cinematic hacker terminal experience. Full Matrix rain, interactive shell, mini-game, and Web Audio API sound engine.',
      fr: 'Ce portfolio — une expérience cinématographique de terminal hacker. Pluie Matrix complète, shell interactif, mini-jeu et moteur sonore Web Audio API.',
      ar: 'هذا الموقع الشخصي — تجربة طرفية سينمائية. مطر Matrix الكامل، واجهة shell تفاعلية، لعبة مصغرة ومحرك صوت Web Audio API.',
    },
  },
  {
    dir: 'drwxr-xr-x  auth_microservice/',
    name: 'Auth Microservice',
    badge: 'MAINTAINED',
    tags: ['Node.js', 'Express', 'JWT', 'Redis', 'Docker'],
    github: '#', demo: null,
    desc: {
      en: 'JWT + OAuth2 authentication microservice with refresh token rotation, rate limiting, and multi-tenant support.',
      fr: 'Microservice d\'authentification JWT + OAuth2 avec rotation de token, limitation de débit et support multi-locataire.',
      ar: 'خدمة مصغرة للمصادقة JWT + OAuth2 مع تدوير رمز التحديث وتحديد المعدل ودعم متعدد المستأجرين.',
    },
  },
  {
    dir: 'drwxr-xr-x  realtime_dashboard/',
    name: 'Real-Time Analytics Dashboard',
    badge: 'ACTIVE',
    tags: ['React', 'WebSocket', 'Chart.js', 'Node.js', 'MongoDB'],
    github: '#', demo: '#',
    desc: {
      en: 'Live WebSocket-powered dashboard with dynamic charts, KPI tracking, and role-based data visibility.',
      fr: 'Tableau de bord en temps réel alimenté par WebSocket avec graphiques dynamiques, suivi KPI et visibilité des données basée sur les rôles.',
      ar: 'لوحة تحكم في الوقت الفعلي بـ WebSocket مع مخططات ديناميكية وتتبع مؤشرات الأداء ورؤية البيانات القائمة على الأدوار.',
    },
  },
  {
    dir: 'drwxr-xr-x  api_gateway/',
    name: 'API Gateway & Rate Limiter',
    badge: 'MAINTAINED',
    tags: ['Node.js', 'Redis', 'Nginx', 'Docker', 'Prometheus'],
    github: '#', demo: null,
    desc: {
      en: 'Custom API gateway with request routing, rate limiting algorithms (token bucket), circuit breakers, and request logging.',
      fr: 'Passerelle API personnalisée avec routage des requêtes, algorithmes de limitation de débit (seau à jetons), disjoncteurs et journalisation.',
      ar: 'بوابة API مخصصة مع توجيه الطلبات وخوارزميات تحديد المعدل (دلو الرموز) وقواطع الدائرة وتسجيل الطلبات.',
    },
  },
];

/* ──────────────────────────────────────────────────────────────
   6. SKILLS DATA (level keys resolved per language)
   ──────────────────────────────────────────────────────────────*/
const SKILLS_DATA = [
  { pid: 1001, name: 'JavaScript / TypeScript', levelKey: 'level_expert', pct: 92 },
  { pid: 1002, name: 'Node.js / Express', levelKey: 'level_expert', pct: 90 },
  { pid: 1003, name: 'React / Next.js', levelKey: 'level_expert', pct: 88 },
  { pid: 1004, name: 'Flutter / Dart', levelKey: 'level_advanced', pct: 85 },
  { pid: 1005, name: 'SQL / PostgreSQL', levelKey: 'level_advanced', pct: 83 },
  { pid: 1006, name: 'REST / GraphQL APIs', levelKey: 'level_expert', pct: 91 },
  { pid: 1007, name: 'Docker / DevOps', levelKey: 'level_advanced', pct: 75 },
  { pid: 1008, name: 'MongoDB / Redis', levelKey: 'level_advanced', pct: 78 },
  { pid: 1009, name: 'Git / CI-CD', levelKey: 'level_advanced', pct: 82 },
  { pid: 1010, name: 'System Design', levelKey: 'level_intermediate', pct: 70 },
];

const TECH_TAGS = [
  'JavaScript', 'TypeScript', 'Python', 'Node.js', 'Express', 'React', 'Next.js',
  'Flutter', 'Dart', 'HTML5', 'CSS3', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'Docker', 'Nginx', 'Git', 'GitHub Actions', 'JWT', 'REST', 'GraphQL',
  'WebSockets', 'Linux', 'VS Code', 'Figma',
];

/* ──────────────────────────────────────────────────────────────
   7. LANGUAGE ENGINE
   ──────────────────────────────────────────────────────────────*/
let currentLang = localStorage.getItem('habibLang') || 'en';

function t(key) {
  const d = I18N[currentLang];
  return (d && d[key] !== undefined) ? d[key] : (I18N.en[key] || key);
}

function translate() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.dataset.i18n);
    if (typeof v === 'string') el.textContent = v;
  });
  // InnerHTML
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t(el.dataset.i18nHtml);
    if (typeof v === 'string') el.innerHTML = v;
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t(el.dataset.i18nPlaceholder);
    if (typeof v === 'string') el.placeholder = v;
  });
  // Titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const v = t(el.dataset.i18nTitle);
    if (typeof v === 'string') el.title = v;
  });
}

function applyLang(lang, animate = true) {
  currentLang = lang;
  localStorage.setItem('habibLang', lang);

  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  html.setAttribute('data-lang', lang);

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });

  // Glitch transition
  if (animate) {
    const overlay = document.getElementById('glitch-overlay');
    overlay.classList.remove('active');
    void overlay.offsetWidth; // reflow
    overlay.classList.add('active');
    setTimeout(() => overlay.classList.remove('active'), 500);
  }

  // Apply static translations
  translate();

  // Re-render dynamic sections
  renderBootSequence(false);
  renderAbout();
  renderProjects();
  renderSkills();

  // Reset interactive terminal welcome
  resetTerminalWelcome();

  Sound.boot();
}

/* ──────────────────────────────────────────────────────────────
   8. NAVIGATION
   ──────────────────────────────────────────────────────────────*/
(function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const navLinksEl = document.getElementById('nav-links');
  const navEl = document.getElementById('navbar');

  toggle.addEventListener('click', () => {
    const open = navLinksEl.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (link) link.classList.toggle('active', e.isIntersecting);
    });
  }, { threshold: 0.3 });
  sections.forEach(s => obs.observe(s));

  // Navbar scroll shadow
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 30);
    // Back to top
    const btt = document.getElementById('back-to-top');
    btt.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
})();

// Back to top
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ──────────────────────────────────────────────────────────────
   9. BOOT SEQUENCE RENDERER
   ──────────────────────────────────────────────────────────────*/
function renderBootSequence(first = true) {
  const output = document.getElementById('boot-output');
  output.innerHTML = '';
  const lines = t('boot_lines');
  if (!Array.isArray(lines)) return;

  lines.forEach((item, i) => {
    const baseDelay = first ? item.delay : Math.floor(item.delay * 0.5);
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `boot-line ${item.cls || ''}`;
      div.textContent = item.text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
      if (i === lines.length - 1) Sound.boot();
    }, baseDelay);
  });
}

/* ──────────────────────────────────────────────────────────────
   10. ABOUT SECTION RENDERER
   ──────────────────────────────────────────────────────────────*/
function renderAbout() {
  const el = document.getElementById('about-content');
  const isAr = currentLang === 'ar';

  el.innerHTML = `
    <div class="cmd-line">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cmd-text">${t('about_cmd1')}</span>
    </div>
    <div class="cmd-output output-fade">
      <p class="output-line">${t('about_result1')}</p>
      <p class="output-line dim">${t('about_result2')}</p>
    </div>

    <div class="cmd-line mt-2">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cmd-text">${t('about_cmd2')}</span>
    </div>
    <div class="cmd-output output-fade">
      <div class="about-card">
        <p>┌─────────────────────────────────────────────────────────┐</p>
        <p>│ <span class="highlight">NAME    :</span> ${t('about_name').padEnd(38)}│</p>
        <p>│ <span class="highlight">ROLE    :</span> ${t('about_role').substring(0, 38).padEnd(38)}│</p>
        <p>│ <span class="highlight">LOCATION:</span> ${t('about_loc').padEnd(38)}│</p>
        <p>│ <span class="highlight">STATUS  :</span> <span class="blink-green">${t('about_status').padEnd(37)}</span>│</p>
        <p>│ <span class="highlight">FOCUS   :</span> ${t('about_focus').substring(0, 38).padEnd(38)}│</p>
        <p>└─────────────────────────────────────────────────────────┘</p>
      </div>
    </div>

    <div class="cmd-line mt-2">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cmd-text">${t('about_cmd3')}</span>
    </div>
    <div class="cmd-output output-fade about-bio-text">
      ${(t('about_bio') || []).map(line => `<p>${line || '&nbsp;'}</p>`).join('')}
    </div>

    <div class="cmd-line mt-2">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cmd-text">${t('about_cmd4')}</span>
    </div>
    <div class="cmd-output output-fade">
      <p class="output-line"><span class="highlight">${t('about_edu')}</span></p>
      <p class="output-line dim">${t('about_edu_sub')}</p>
    </div>

    <div class="cmd-line mt-2">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cursor-blink-inline">█</span>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────────
   11. PROJECTS RENDERER
   ──────────────────────────────────────────────────────────────*/
function renderProjects() {
  const el = document.getElementById('projects-content');
  const badgeClass = { ACTIVE: 'active', LIVE: 'active', MAINTAINED: '' };

  el.innerHTML = `
    <div class="cmd-line">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cmd-text">${t('projects_cmd')}</span>
    </div>
    <div class="cmd-output">
      <p class="output-line dim">${t('projects_total')}</p>
      <p class="output-line dim">${t('projects_meta1')}</p>
      <p class="output-line dim">${t('projects_meta2')}</p>
      <div class="projects-grid">
        ${PROJECTS_DATA.map((p, i) => `
          <div class="project-card reveal" id="proj-${i}" style="animation-delay:${i * 0.07}s">
            <div class="project-badge ${badgeClass[p.badge] || ''}">${p.badge}</div>
            <div class="project-dir dim">${p.dir}</div>
            <div class="project-name">${p.name}</div>
            <div class="project-desc">${p.desc[currentLang] || p.desc.en}</div>
            <div class="project-tags">${p.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}</div>
            <div class="project-links">
              <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link">⬡ GitHub</a>
              ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="project-link">⬡ Demo</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="cmd-line mt-2">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~/projects</span><span class="dollar">$</span>
      <span class="cursor-blink-inline">█</span>
    </div>
  `;

  // Reattach reveal observer for new cards
  setTimeout(() => {
    el.querySelectorAll('.reveal').forEach(card => revealObserver.observe(card));
  }, 50);

  // Reattach skill bar observer
  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillBarObserver.observe(skillsSection);
}

/* ──────────────────────────────────────────────────────────────
   12. SKILLS RENDERER
   ──────────────────────────────────────────────────────────────*/
function renderSkills() {
  const el = document.getElementById('skills-content');
  el.innerHTML = `
    <div class="cmd-line">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cmd-text">${t('skills_cmd')}</span>
    </div>
    <div class="cmd-output">
      <div class="skills-header"><span class="dim">${t('skills_header')}</span></div>
      <div id="skills-list">
        ${SKILLS_DATA.map(s => {
    const levelLabel = t(s.levelKey);
    const levelCss = s.levelKey.replace('level_', '');
    return `
            <div class="skill-row reveal">
              <span class="skill-pid dim">${s.pid}</span>
              <span class="skill-name">${s.name}</span>
              <span class="skill-level ${levelCss}">${levelLabel}</span>
              <div class="skill-bar-wrapper">
                <div class="skill-bar" data-pct="${s.pct}" style="width:0%"></div>
              </div>
              <span class="skill-pct dim">${s.pct}%</span>
            </div>
          `;
  }).join('')}
      </div>
    </div>

    <div class="cmd-line mt-3">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cmd-text">${t('skills_cmd2')}</span>
    </div>
    <div class="cmd-output">
      <div class="tech-tags">
        ${TECH_TAGS.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
      </div>
    </div>

    <div class="cmd-line mt-2">
      <span class="prompt-green">habib@portfolio</span><span class="separator">:</span>
      <span class="path">~</span><span class="dollar">$</span>
      <span class="cursor-blink-inline">█</span>
    </div>
  `;

  // Reattach reveal observer
  setTimeout(() => {
    el.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));
  }, 50);
}

/* ──────────────────────────────────────────────────────────────
   13. SCROLL REVEAL OBSERVER
   ──────────────────────────────────────────────────────────────*/
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.08 });

/* Skill bars observer */
const skillBarObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, 250);
      });
      skillBarObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

/* ──────────────────────────────────────────────────────────────
   14. INITIAL RENDER
   ──────────────────────────────────────────────────────────────*/
(function initialRender() {
  // Apply lang from localStorage
  const html = document.documentElement;
  html.setAttribute('lang', currentLang);
  html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
  html.setAttribute('data-lang', currentLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === currentLang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });

  translate();
  renderBootSequence(true);
  renderAbout();
  renderProjects();
  renderSkills();

  // Observe skills section for bar animation
  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillBarObserver.observe(skillsSection);

  // Start reveal observers for static elements
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }, 400);
})();

/* ──────────────────────────────────────────────────────────────
   15. INTERACTIVE TERMINAL ENGINE
   ──────────────────────────────────────────────────────────────*/
const TerminalEngine = (function () {
  const output = document.getElementById('interactive-output');
  const input = document.getElementById('terminal-input');
  const hist = [];
  let histIdx = -1;

  const EASTER_EGGS = new Set(['secret', 'coffee', 'hire', 'fortune', 'matrix']);

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function print(html) {
    const d = document.createElement('div');
    d.className = 'term-output';
    d.innerHTML = html;
    output.appendChild(d);
    output.scrollTop = output.scrollHeight;
  }

  function printPrompt(typed) {
    const d = document.createElement('div');
    d.className = 'term-line';
    d.innerHTML = `
      <span class="prompt-green">habib@portfolio</span>
      <span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
      <span style="color:var(--white);margin-left:.35rem">${esc(typed)}</span>`;
    output.appendChild(d);
    output.scrollTop = output.scrollHeight;
  }

  /* ── COMMANDS ── */
  function cmdHelp() {
    print(`
<p class="info">╔═════════════ HabibOS v2.6.0 ─── help ════════════════╗</p>
<p><span class="success">  help       </span>─ ${currentLang === 'fr' ? 'Afficher ce menu' : 'عرض هذه القائمة' || 'Show this help menu'}</p>
<p><span class="success">  about      </span>─ whoami</p>
<p><span class="success">  projects   </span>─ ls -la ~/projects</p>
<p><span class="success">  skills     </span>─ htop --skills</p>
<p><span class="success">  contact    </span>─ cat links.txt</p>
<p><span class="success">  hack       </span>─ CVE-2024-HABIB 👾</p>
<p><span class="success">  game       </span>─ ./crack_mainframe.sh 🔐</p>
<p><span class="success">  neofetch   </span>─ system info</p>
<p><span class="success">  whoami     </span>─ current user</p>
<p><span class="success">  ls         </span>─ list files</p>
<p><span class="success">  pwd / date / uname / echo / cat / sudo / clear / exit</span></p>
<p class="info">╚══════════════════════════════════════════════════════╝</p>
<p class="warn">  ${t('help_footer')}</p>`);
  }

  function cmdAbout() {
    print(`
<p class="success">┌──────────────── ${currentLang === 'ar' ? 'عن حبيب' : 'ABOUT HABIB'} ─────────────────┐</p>
<p>│ <span class="success">Name    :</span> ${t('about_name')}</p>
<p>│ <span class="success">Role    :</span> ${t('about_role')}</p>
<p>│ <span class="success">Location:</span> ${t('about_loc')}</p>
<p>│ <span class="success">Status  :</span> <span class="warn">${t('about_status')}</span></p>
<p>│ <span class="success">Stack   :</span> React · Node.js · Flutter</p>
<p class="success">└───────────────────────────────────────────────────────┘</p>`);
  }

  function cmdProjects() {
    print(`<p class="info">$ ls -la ~/projects</p>`);
    PROJECTS_DATA.forEach((p, i) => {
      setTimeout(() => {
        print(`<p><span class="success">${p.dir}</span> → <span class="warn">${p.name}</span></p>
               <p class="dim">&nbsp;&nbsp;${p.desc[currentLang] ? p.desc[currentLang].substring(0, 65) + '...' : ''}</p>`);
      }, i * 130);
    });
    setTimeout(() => print(`<p class="dim">${t('cmd_projects_hint')}</p>`), PROJECTS_DATA.length * 130 + 60);
  }

  function cmdSkills() {
    print(`<p class="info">$ htop --skills</p>`);
    SKILLS_DATA.forEach((s, i) => {
      setTimeout(() => {
        const bar = '█'.repeat(Math.floor(s.pct / 5)) + '░'.repeat(20 - Math.floor(s.pct / 5));
        const level = t(s.levelKey);
        print(`<p><span class="success">${s.name.padEnd(26)}</span> <span class="info">[${bar}]</span> <span class="warn">${s.pct}%</span> <span class="dim">${level}</span></p>`);
      }, i * 80);
    });
  }

  function cmdContact() {
    const linkLabels = t('cmd_contact_links') || ['GitHub:', 'LinkedIn:', 'Email:'];
    print(`
<p class="success">${t('cmd_contact_init')}</p>
<p>&nbsp;</p>
<p>  <span class="success">${linkLabels[0]}</span> <a href="https://github.com/habibmsahel" target="_blank" style="color:var(--cyan)">github.com/habibmsahel</a></p>
<p>  <span class="success">${linkLabels[1]}</span> <a href="https://linkedin.com/in/habibmsahel" target="_blank" style="color:var(--cyan)">linkedin.com/in/habibmsahel</a></p>
<p>  <span class="success">${linkLabels[2]}</span> <a href="mailto:habib.msahel@email.com" style="color:var(--cyan)">habib.msahel@email.com</a></p>
<p>&nbsp;</p>
<p class="dim">${t('cmd_contact_scroll')}</p>`);
  }

  function cmdHack() {
    print(`<p class="info">${t('hack_start')}</p>`);
    const steps = t('hack_steps') || [];
    steps.forEach(({ text, delay, cls }) => {
      setTimeout(() => {
        print(`<p class="${cls || 'dim'}">${text}</p>`);
        Sound.key();
        if (cls === 'success') Sound.success();
      }, delay);
    });
  }

  function cmdWhoami() { print(t('cmd_whoami_result')() || ''); }

  function cmdLs() { print(t('cmd_ls_result')); }
  function cmdPwd() { print(`<p>${t('cmd_pwd')}</p>`); }
  function cmdDate() { print(`<p>${(t('cmd_date'))()}</p>`); }
  function cmdUname() { print(`<p>${t('cmd_uname')}</p>`); }

  function cmdEcho(args) { print(`<p>${esc(args.join(' '))}</p>`); }

  function cmdCat(args) {
    const file = (args[0] || '').toLowerCase();
    const map = {
      'about.txt': cmdAbout,
      'à-propos.txt': cmdAbout,
      'bio.txt': () => print(`<p>${t('cmd_cat_bio')}</p>`),
      'education.txt': () => print(`<p>${t('cmd_cat_edu')}</p>`),
      'formation.txt': () => print(`<p>${t('cmd_cat_edu')}</p>`),
      'التعليم.txt': () => print(`<p>${t('cmd_cat_edu')}</p>`),
      'links.txt': cmdContact,
      'liens.txt': cmdContact,
      'روابط.txt': cmdContact,
      'secret.txt': () => { print(`<p class="warn">${t('cmd_cat_deny')}</p>`); Sound.error(); },
    };
    if (map[file]) map[file]();
    else if (file) { print(`<p class="err">${t('cmd_cat_notfound')(file)}</p>`); Sound.error(); }
    else { print(`<p class="err">${t('cmd_cat_missing')}</p>`); }
  }

  function cmdSudo() {
    print(`<p class="warn">${t('cmd_sudo_prompt')}</p>`);
    setTimeout(() => { print(`<p class="err">${t('cmd_sudo_deny')}</p>`); Sound.error(); }, 900);
  }

  function cmdExit() {
    print(`<p class="warn">${t('cmd_exit1')}</p>`);
    setTimeout(() => print(`<p class="dim">${t('cmd_exit2')}</p>`), 400);
  }

  function cmdClear() {
    output.innerHTML = `<p class="dim">${t('term_cleared')}</p><br/>`;
  }

  function cmdGame() { launchMiniGame(); }

  function cmdMatrix() {
    print(`<p class="success">${t('easter_matrix')}</p>`);
    setTimeout(() => print(`<p class="dim">${t('easter_matrix2')}</p>`), 800);
    showToast('🐇 Easter egg: Matrix');
  }

  function cmdSecret() {
    print(`
<p class="warn">⚠️ CLASSIFIED — Level 5 Clearance</p>
<p class="info">Unlocking easter egg archive...</p>
<p class="dim">${t('secret_reveal')}</p>`);
    showToast('🥚 Secret revealed!');
  }

  function cmdCoffee() {
    print(`
<p>          )  (  </p>
<p>         (   ) )</p>
<p>          ) ( (</p>
<p>        _______)_</p>
<p>     .-'---------|</p>
<p>    ( C|  /\\_/\\  |</p>
<p>     '-./|     |</p>
<p>       | HABIB |</p>
<p>       |_______|</p>
<p class="warn">${t('easter_coffee_msg')}</p>`);
    showToast('☕ Easter egg: Coffee!');
  }

  function cmdHire() {
    print(`
<p class="success">${t('easter_hire1')}</p>
<p>&nbsp;</p>
<p>${t('easter_hire2')}</p>
<p>${t('easter_hire3')}</p>
<p>&nbsp;</p>
<p class="dim">${t('easter_hire4')}</p>`);
    showToast('🎉 Wise choice!');
    Sound.success();
  }

  function cmdFortune() {
    const q = t('fortune_quotes');
    if (Array.isArray(q)) {
      print(`<p class="warn">🔮 ${q[Math.floor(Math.random() * q.length)]}</p>`);
    }
    showToast('🔮 Fortune revealed!');
  }

  function cmdNeofetch() {
    const f = t('neofetch_fields') || {};
    print(`
<p>&nbsp;</p>
<p><span class="success">    ██████████    </span>  <span class="warn">habib</span><span class="dim">@</span><span class="info">HabibOS</span></p>
<p><span class="success">  ██          ██  </span>  ───────────────────────────</p>
<p><span class="success">  ██  ██████  ██  </span>  <span class="warn">OS</span>: ${f.os || ''}</p>
<p><span class="success">  ██  ██  ██  ██  </span>  <span class="warn">Host</span>: ${f.host || ''}</p>
<p><span class="success">  ██  ██████  ██  </span>  <span class="warn">Kernel</span>: ${f.kernel || ''}</p>
<p><span class="success">  ██          ██  </span>  <span class="warn">Uptime</span>: ${f.uptime || ''}</p>
<p><span class="success">    ██████████    </span>  <span class="warn">Shell</span>: ${f.shell || ''}</p>
<p>                    <span class="warn">CPU</span>: ${f.cpu || ''}</p>
<p>                    <span class="warn">Memory</span>: ${f.memory || ''}</p>
<p>                    <span class="warn">Stack</span>: ${f.stack || ''}</p>
<p>                    <span class="warn">Coffee</span>: ${f.coffee || ''}</p>
<p>&nbsp;</p>`);
  }

  function unknown(cmd) {
    print(`<p class="err">${t('cmd_not_found')(esc(cmd))}</p><p class="dim">${t('cmd_type_help')}</p>`);
    Sound.error();
  }

  const COMMANDS = {
    help: cmdHelp, about: cmdAbout, projects: cmdProjects, skills: cmdSkills,
    contact: cmdContact, hack: cmdHack, game: cmdGame,
    whoami: cmdWhoami, ls: cmdLs, pwd: cmdPwd, date: cmdDate, uname: cmdUname,
    echo: cmdEcho, cat: cmdCat, sudo: cmdSudo, exit: cmdExit, clear: cmdClear,
    matrix: cmdMatrix, secret: cmdSecret, coffee: cmdCoffee, hire: cmdHire,
    fortune: cmdFortune, neofetch: cmdNeofetch,
  };

  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    hist.unshift(trimmed);
    histIdx = -1;
    printPrompt(trimmed);
    Sound.boot();
    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    if (EASTER_EGGS.has(cmd)) showToast(`🥚 Easter egg: ${cmd}`);
    if (COMMANDS[cmd]) COMMANDS[cmd](args);
    else unknown(cmd);
  }

  input.addEventListener('keydown', e => {
    Sound.key();
    if (e.key === 'Enter') {
      const v = input.value; input.value = ''; execute(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < hist.length - 1) input.value = hist[++histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      histIdx > 0 ? (input.value = hist[--histIdx] || '') : (histIdx = -1, input.value = '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.value.toLowerCase();
      const match = Object.keys(COMMANDS).find(c => c.startsWith(v) && c !== v);
      if (match) input.value = match;
    }
  });

  document.querySelector('.interactive-body').addEventListener('click', () => input.focus());
  document.querySelector('.terminal-input-row').addEventListener('click', () => input.focus());

  return { execute, print };
})();

/* ──────────────────────────────────────────────────────────────
   16. RESET TERMINAL WELCOME (on language change)
   ──────────────────────────────────────────────────────────────*/
function resetTerminalWelcome() {
  const out = document.getElementById('interactive-output');
  out.innerHTML = `
    <p class="welcome-msg">${t('term_welcome')}</p>
    <p class="dim">${t('term_hint')}</p>
    <br/>
  `;
}

/* ──────────────────────────────────────────────────────────────
   17. MINI-GAME
   ──────────────────────────────────────────────────────────────*/
function launchMiniGame() {
  const modal = document.getElementById('game-modal');
  const body = document.getElementById('game-body');
  const closer = document.getElementById('close-game');
  let secret, attempts, maxAttempts = 7, active;

  function startGame() {
    secret = Math.floor(Math.random() * 100) + 1;
    attempts = 0; active = true;

    body.innerHTML = `
      <div style="color:var(--green);direction:ltr">
        <p class="dim">// MAINFRAME SECURITY PROTOCOL v3.1</p>
        <p class="success">🔐 ${t('game_title')}</p>
        <p>&nbsp;</p>
        <p>${t('game_intro1')} <span class="warn">1–100</span>.</p>
        <p>${t('game_intro2')} <span class="warn" id="att-left">${maxAttempts}</span> ${t('game_attempts_label')}</p>
        <p>&nbsp;</p>
        <div style="display:flex;gap:.5rem;align-items:center;margin-top:.5rem">
          <span class="prompt-green">crack@mainframe:~$</span>
          <input type="number" id="game-input" min="1" max="100"
            style="background:none;border:none;border-bottom:1px solid var(--green);
                   color:var(--white);font-family:var(--font-mono);font-size:14px;
                   outline:none;width:80px;padding:2px 4px" placeholder="???" />
          <button id="game-btn"
            style="background:rgba(0,255,0,0.08);border:1px solid var(--green);
                   color:var(--green);font-family:var(--font-mono);font-size:12px;
                   padding:4px 14px;cursor:pointer;border-radius:4px">
            ${t('game_inject')}
          </button>
        </div>
        <div id="game-log" style="margin-top:1rem;font-size:12.5px;max-height:130px;overflow-y:auto"></div>
        <div id="game-status" style="margin-top:.75rem;font-size:12px"></div>
        <button id="game-restart" hidden
          style="margin-top:1rem;background:rgba(0,255,0,0.08);border:1px solid var(--green);
                 color:var(--green);font-family:var(--font-mono);font-size:12px;
                 padding:6px 18px;cursor:pointer;border-radius:4px">
          ${t('game_restart')}
        </button>
      </div>`;

    modal.hidden = false;
    document.getElementById('game-input').focus();

    function guess() {
      if (!active) return;
      const val = parseInt(document.getElementById('game-input').value);
      if (!val || val < 1 || val > 100) {
        document.getElementById('game-status').innerHTML = `<span style="color:var(--red)">${t('game_invalid')}</span>`;
        return;
      }
      attempts++;
      const remaining = maxAttempts - attempts;
      const log = document.getElementById('game-log');
      const status = document.getElementById('game-status');
      let msg;

      if (val === secret) {
        msg = `<p class="success">${t('game_cracked')(secret, attempts)}</p>`;
        status.innerHTML = `<span style="color:var(--green)">${t('game_access_granted')}</span>`;
        active = false; Sound.success();
        showToast('🏆 Mainframe cracked!', 4000);
        document.getElementById('game-restart').hidden = false;
      } else if (remaining <= 0) {
        msg = `<p style="color:var(--red)">${t('game_locked')(secret)}</p>`;
        status.innerHTML = `<span style="color:var(--red)">${t('game_locked_msg')}</span>`;
        active = false; Sound.error();
        document.getElementById('game-restart').hidden = false;
      } else {
        const hint = val < secret ? t('game_low') : t('game_high');
        msg = `<p><span class="warn">×${attempts}:</span> ${val} → <span class="info">${hint}</span> · <span class="dim">${t('game_left')(remaining)}</span></p>`;
        Sound.key();
        document.getElementById('att-left').textContent = remaining;
      }

      log.innerHTML += msg;
      log.scrollTop = log.scrollHeight;
      document.getElementById('game-input').value = '';
      document.getElementById('game-input').focus();
    }

    document.getElementById('game-btn').addEventListener('click', guess);
    document.getElementById('game-input').addEventListener('keydown', e => { if (e.key === 'Enter') guess(); });
    document.getElementById('game-restart').addEventListener('click', startGame);
  }

  closer.addEventListener('click', () => { modal.hidden = true; });
  modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.hidden = true; }, { once: true });

  startGame();
}

/* ──────────────────────────────────────────────────────────────
   18. CONTACT FORM
   ──────────────────────────────────────────────────────────────*/
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');
  const result = document.getElementById('form-result');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !message) {
      result.className = 'form-result error';
      result.textContent = t('form_err_req');
      Sound.error(); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.className = 'form-result error';
      result.textContent = t('form_err_email');
      Sound.error(); return;
    }

    btn.classList.add('loading');
    result.textContent = '';
    await new Promise(r => setTimeout(r, 1800));
    btn.classList.remove('loading');
    result.className = 'form-result success';
    result.textContent = t('form_success');
    Sound.success();
    showToast(currentLang === 'ar' ? '✉️ تم إرسال الرسالة!' : currentLang === 'fr' ? '✉️ Message envoyé!' : '✉️ Message sent!', 4000);
    form.reset();
  });
})();

/* ──────────────────────────────────────────────────────────────
   19. GLITCH EFFECT ON NAME
   ──────────────────────────────────────────────────────────────*/
setInterval(() => {
  document.querySelectorAll('.name-glitch').forEach(el => {
    el.style.textShadow = `${(Math.random() - .5) * 5}px 0 rgba(255,0,0,.7),${(Math.random() - .5) * 5}px 0 rgba(0,255,255,.7),0 0 22px rgba(0,255,0,.5)`;
    setTimeout(() => { el.style.textShadow = '0 0 22px rgba(0,255,0,.5)'; }, 130);
  });
}, 3800);

/* ──────────────────────────────────────────────────────────────
   20. KONAMI CODE EASTER EGG
   ──────────────────────────────────────────────────────────────*/
(function () {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let idx = 0;
  document.addEventListener('keydown', e => {
    idx = e.key === seq[idx] ? idx + 1 : 0;
    if (idx === seq.length) {
      idx = 0;
      showToast(t('konami_toast'), 5000);
      Sound.success();
      TerminalEngine.print(`<p class="success">🕹️ ${t('konami_msg')}</p>`);
    }
  });
})();

/* ──────────────────────────────────────────────────────────────
   21. TERMINAL AUTO-FOCUS
   ──────────────────────────────────────────────────────────────*/
const termFocusObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && document.activeElement === document.body) {
    document.getElementById('terminal-input').focus();
  }
}, { threshold: 0.5 });
const termSec = document.getElementById('terminal');
if (termSec) termFocusObs.observe(termSec);

/* ──────────────────────────────────────────────────────────────
   22. CONSOLE GREETING
   ──────────────────────────────────────────────────────────────*/
console.log('%c HabibOS v2.6.0 ', 'background:#020b02;color:#00ff00;font-family:monospace;font-size:16px;padding:6px 14px;border:1px solid #00ff00;letter-spacing:.05em');
console.log('%c EN | FR | AR — Multi-language hacker portfolio ', 'color:#00cc00;font-family:monospace;font-size:13px');
console.log('%c ↑↑↓↓←→←→BA = Easter egg 🕹️', 'color:#ffd700;font-family:monospace');
