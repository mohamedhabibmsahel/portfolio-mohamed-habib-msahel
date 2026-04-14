export type Lang = 'en' | 'fr' | 'ar';

export interface I18nDict {
  // Navigation
  nav_about: string;
  nav_projects: string;
  nav_skills: string;
  nav_contact: string;
  // Boot
  boot_lines: Array<{ text: string; cls: string; delay: number }>;
  // Levels
  level_expert: string;
  level_advanced: string;
  level_intermediate: string;
  // Terminal
  term_welcome: string;
  term_hint: string;
  term_cleared: string;
  // About
  about_name: string;
  about_role: string;
  about_loc: string;
  about_status: string;
  about_bio: string[];
  about_edu: string;
  about_edu_sub: string;
  // Commands
  cmd_whoami: string;
  cmd_not_found: (c: string) => string;
  cmd_type_help: string;
  cmd_sudo_deny: string;
  cmd_exit2: string;
  cmd_cat_bio: string;
  cmd_cat_edu: string;
  cmd_cat_deny: string;
  cmd_cat_notfound: (f: string) => string;
  cmd_contact_init: string;
  cmd_contact_links: string[];
  cmd_contact_scroll: string;
  cmd_projects_hint: string;
  hack_start: string;
  hack_steps: Array<{ text: string; delay: number; cls?: string }>;
  // Game
  game_title: string;
  game_intro1: string;
  game_intro2: string;
  game_attempts_label: string;
  game_cracked: (n: number, a: number) => string;
  game_locked: (n: number) => string;
  game_invalid: string;
  game_access_granted: string;
  game_locked_msg: string;
  game_low: string;
  game_high: string;
  game_left: (r: number) => string;
  // Easter
  easter_matrix: string;
  easter_matrix2: string;
  easter_coffee_msg: string;
  easter_hire1: string;
  easter_hire2: string;
  easter_hire3: string;
  easter_hire4: string;
  fortune_quotes: string[];
  neofetch_fields: Record<string, string>;
  secret_reveal: string;
  help_footer: string;
  // Mode switch
  switch_to_recruiter: string;
  switch_to_hacker: string;
  classified_puzzle: string;
  classified_hint: string;
  classified_answer: string;
  classified_unlocked: string;
}

const EN: I18nDict = {
  nav_about: './about',
  nav_projects: './projects',
  nav_skills: './skills',
  nav_contact: './contact',
  boot_lines: [
    { text: 'GNU GRUB version 2.06', cls: 'boot-info', delay: 0 },
    { text: 'Minimal BASH-like line editing is supported.', cls: '', delay: 120 },
    { text: '', cls: '', delay: 200 },
    { text: 'Booting HabibOS v3.0...', cls: 'boot-bold', delay: 350 },
    { text: '[ OK ] Started kernel modules', cls: 'boot-ok', delay: 600 },
    { text: '[ OK ] Mounted virtual filesystems', cls: 'boot-ok', delay: 770 },
    { text: '[ OK ] Reached network target', cls: 'boot-ok', delay: 940 },
    { text: '[WARN] Power management: reduced mode', cls: 'boot-warn', delay: 1080 },
    { text: '[ OK ] Started OpenSSH daemon', cls: 'boot-ok', delay: 1220 },
    { text: '[ OK ] Node.js runtime v22.0.0 active', cls: 'boot-ok', delay: 1360 },
    { text: '[ OK ] React 19 engine mounted', cls: 'boot-ok', delay: 1500 },
    { text: '[ OK ] Flutter SDK v3.22.0 ready', cls: 'boot-ok', delay: 1640 },
    { text: '', cls: '', delay: 1800 },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 1900 },
    { text: '', cls: '', delay: 1950 },
    { text: '  > Scanning visitor profile...', cls: 'boot-dim', delay: 2050 },
    { text: '  > Detecting system information...', cls: 'boot-dim', delay: 2200 },
    { text: '', cls: '', delay: 2350 },
    { text: '  root@habib:~$ whoami', cls: 'boot-cmd', delay: 2500 },
    { text: '', cls: '', delay: 2650 },
    { text: '  ██╗  ██╗ █████╗ ██████╗ ██╗██████╗ ', cls: 'boot-bold', delay: 2800 },
    { text: '  ██║  ██║██╔══██╗██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 2900 },
    { text: '  ███████║███████║██████╔╝██║██████╔╝', cls: 'boot-bold', delay: 3000 },
    { text: '  ██╔══██║██╔══██║██╔══██╗██║██╔══██╗', cls: 'boot-bold', delay: 3100 },
    { text: '  ██║  ██║██║  ██║██████╔╝██║██████╔╝', cls: 'boot-bold', delay: 3200 },
    { text: '  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═════╝ ', cls: 'boot-bold', delay: 3300 },
    { text: '', cls: '', delay: 3400 },
    { text: '  Mohamed Habib Msahel — Full-Stack & Mobile Developer', cls: 'boot-hi', delay: 3500 },
    { text: '  Tunisia 🇹🇳  |  Available for opportunities', cls: 'boot-dim', delay: 3650 },
    { text: '', cls: '', delay: 3730 },
    { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-dim', delay: 3800 },
  ],
  level_expert: 'EXPERT',
  level_advanced: 'ADVANCED',
  level_intermediate: 'INTERMEDIATE',
  term_welcome: 'Welcome to <span class="hl-green">HabibOS v3.0</span> — Type <span class="hl-green">help</span> to get started.',
  term_hint: 'Try: <span class="hl-cyan">help</span> | <span class="hl-cyan">about</span> | <span class="hl-cyan">projects</span> | <span class="hl-cyan">skills</span> | <span class="hl-cyan">contact</span> | <span class="hl-cyan">hack</span> | <span class="hl-cyan">game</span> | <span class="hl-cyan">switch-mode</span>',
  term_cleared: 'Terminal cleared.',
  about_name: 'Mohamed Habib Msahel',
  about_role: 'Full-Stack & Mobile Developer',
  about_loc: 'Tunisia 🇹🇳',
  about_status: '● Available for opportunities',
  about_bio: [
    'Passionate developer with a love for crafting elegant solutions to',
    'complex problems. I bridge the gap between powerful backends and',
    'beautiful, intuitive frontends — from web to mobile.',
    '',
    'I thrive in dynamic environments and believe great software lives',
    'at the intersection of creativity and engineering.',
  ],
  about_edu: '🎓 Engineering Degree — Computer Science',
  about_edu_sub: '   ESPRIT | Sept 2018 – Present',
  cmd_whoami: 'Mohamed Habib Msahel — <span class="hl-green">root</span> access granted 🔓',
  cmd_not_found: (c: string) => `habib: command not found: <span class="hl-red">${c}</span>`,
  cmd_type_help: 'Type <span class="hl-green">help</span> for available commands.',
  cmd_sudo_deny: 'habib is not in the sudoers file. This incident will be reported. 📁',
  cmd_exit2: 'Connection closed. Come back soon 👋',
  cmd_cat_bio: 'Passionate developer. Coffee addict. Bug hunter. Open-source believer.',
  cmd_cat_edu: '🎓 Engineering Degree — Computer Science | ESPRIT (2018–Present)',
  cmd_cat_deny: '🔐 ACCESS DENIED — sudo required',
  cmd_cat_notfound: (f: string) => `cat: ${f}: No such file or directory`,
  cmd_contact_init: '📡 Establishing secure connection...',
  cmd_contact_links: ['GitHub  :', 'LinkedIn:', 'Email   :'],
  cmd_contact_scroll: 'Type start-contact to open the contact form ↓',
  cmd_projects_hint: 'Run <span class="hl-green">cat &lt;project-id&gt;</span> for full details. Example: <span class="hl-cyan">cat easy_dispatching</span>',
  hack_start: '⚡ Initiating hacking sequence — standby...',
  hack_steps: [
    { text: '> Scanning target network...', delay: 0 },
    { text: '> Open ports: 22 (SSH) 80 (HTTP) 443 (HTTPS)', delay: 600 },
    { text: '> Running exploit: CVE-2024-HABIB...', delay: 1200 },
    { text: '> Bypassing firewall...', delay: 1900 },
    { text: '> Injecting payload 0x4841424942...', delay: 2600 },
    { text: '> Establishing reverse shell...', delay: 3300 },
    { text: '> 🔓 ROOT ACCESS GRANTED', delay: 4000, cls: 'hl-green' },
    { text: '> Target successfully recruited as client. 😎', delay: 4700, cls: 'hl-yellow' },
  ],
  game_title: 'HACK THE MAINFRAME — v2.0',
  game_intro1: 'The mainframe is protected by a numeric passcode',
  game_intro2: 'You have',
  game_attempts_label: 'attempts before lockdown.',
  game_cracked: (n: number, a: number) => `✅ Code cracked! Secret was <strong>${n}</strong> — in ${a} attempt(s)! 🎉`,
  game_locked: (n: number) => `❌ LOCKDOWN! The code was <strong>${n}</strong>. Mission failed.`,
  game_invalid: 'Invalid input. Range: 1–100',
  game_access_granted: '🔓 ACCESS LEVEL UPGRADED — ROOT SHELL OPENED',
  game_locked_msg: '🔒 SYSTEM LOCKED — INITIATING COUNTERMEASURES',
  game_low: '▲ TOO LOW',
  game_high: '▼ TOO HIGH',
  game_left: (r: number) => `${r} attempt(s) left`,
  easter_matrix: 'Wake up, Neo... The Matrix has you.',
  easter_matrix2: 'Follow the white rabbit. 🐇',
  easter_coffee_msg: '☕ Coffee.exe launched — productivity increased by 420%',
  easter_hire1: '✅ EXCELLENT DECISION!',
  easter_hire2: "You've chosen to hire Mohamed Habib Msahel.",
  easter_hire3: 'Please proceed to the contact section. 💼',
  easter_hire4: 'Note: Habib ships features, not bugs. (Usually.)',
  fortune_quotes: [
    '"The best code is no code at all." — Jeff Atwood',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"Clean code always looks like it was written by someone who cares." — Robert C. Martin',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"It works on my machine." — Every developer ever',
    '"99 bugs in the code, patch one around — 127 bugs in the code."',
    '"Programs must be written for people to read." — SICP',
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  ],
  neofetch_fields: {
    os: 'HabibOS v3.0 x86_64',
    host: 'Developer MacBook Pro',
    kernel: '5.19.0-habib',
    uptime: '2+ years coding',
    shell: 'habib-sh 3.0.0',
    cpu: 'Brain @ ∞ GHz',
    memory: 'Barely enough',
    stack: 'React · Node · Flutter',
    coffee: '3 cups/day',
  },
  secret_reveal: '[ secret commands: coffee | hire | fortune | matrix | neofetch | sudo reveal-secrets ]',
  help_footer: 'Psst... there are hidden easter egg commands too 🥚',
  switch_to_recruiter: 'Switching to recruiter interface...',
  switch_to_hacker: 'Switching back to hacker mode...',
  classified_puzzle: 'Decode the binary to unlock: 01001000 01000001 01000010 01001001 01000010',
  classified_hint: 'Hint: Each 8-bit group = one ASCII character',
  classified_answer: 'HABIB',
  classified_unlocked: '🔓 CLASSIFIED PROJECT UNLOCKED — ACCESS LEVEL UPGRADED',
};

const FR: I18nDict = {
  ...EN,
  nav_about: './à-propos',
  nav_projects: './projets',
  nav_skills: './compétences',
  nav_contact: './contact',
  boot_lines: EN.boot_lines.map(l =>
    l.text.startsWith('Booting') ? { ...l, text: 'Démarrage de HabibOS v3.0...' }
    : l.text.includes('Mohamed Habib Msahel — Full') ? { ...l, text: '  Mohamed Habib Msahel — Développeur Full-Stack & Mobile' }
    : l.text.includes('Tunisia') ? { ...l, text: '  Tunisie 🇹🇳  |  Disponible pour des opportunités' }
    : l.text.includes('Available') ? { ...l, text: '  Disponible pour des opportunités' }
    : l
  ),
  level_expert: 'EXPERT',
  level_advanced: 'AVANCÉ',
  level_intermediate: 'INTERMÉDIAIRE',
  term_welcome: 'Bienvenue sur <span class="hl-green">HabibOS v3.0</span> — Tapez <span class="hl-green">help</span> pour commencer.',
  term_hint: 'Essayez: <span class="hl-cyan">help</span> | <span class="hl-cyan">about</span> | <span class="hl-cyan">projects</span> | <span class="hl-cyan">skills</span> | <span class="hl-cyan">contact</span> | <span class="hl-cyan">hack</span> | <span class="hl-cyan">game</span> | <span class="hl-cyan">switch-mode</span>',
  term_cleared: 'Terminal effacé.',
  about_role: 'Développeur Full-Stack & Mobile',
  about_loc: 'Tunisie 🇹🇳',
  about_status: '● Disponible pour des opportunités',
  about_bio: [
    "Développeur passionné avec un goût prononcé pour la création de",
    "solutions élégantes aux problèmes complexes. Je fais le pont entre",
    "des backends puissants et des frontends intuitifs — du web au mobile.",
    '',
    "Je m'épanouis dans des environnements dynamiques et crois que le",
    "grand logiciel naît à l'intersection de la créativité et de l'ingénierie.",
  ],
  about_edu: '🎓 Diplôme d\'Ingénieur — Informatique',
  about_edu_sub: '   ESPRIT | Sept 2018 – Présent',
  cmd_not_found: (c: string) => `habib: commande introuvable: <span class="hl-red">${c}</span>`,
  cmd_type_help: 'Tapez <span class="hl-green">help</span> pour les commandes disponibles.',
  cmd_sudo_deny: "habib n'est pas dans le fichier sudoers. Cet incident sera signalé. 📁",
  cmd_exit2: 'Connexion fermée. À bientôt 👋',
  cmd_cat_bio: "Développeur passionné. Accro au café. Chasseur de bugs. Croyant en l'open-source.",
  cmd_cat_edu: "🎓 Diplôme d'Ingénieur — Informatique | ESPRIT (2018–Présent)",
  cmd_cat_deny: '🔐 ACCÈS REFUSÉ — sudo requis',
  cmd_cat_notfound: (f: string) => `cat: ${f}: Aucun fichier ou dossier de ce type`,
  cmd_contact_init: '📡 Établissement d\'une connexion sécurisée...',
  cmd_contact_scroll: 'Tapez start-contact pour ouvrir le formulaire ↓',
  cmd_projects_hint: 'Exécutez <span class="hl-green">cat &lt;id-projet&gt;</span> pour les détails.',
  hack_start: '⚡ Séquence de piratage initiée — veuillez patienter...',
  hack_steps: [
    { text: '> Analyse du réseau cible...', delay: 0 },
    { text: '> Ports ouverts: 22 (SSH) 80 (HTTP) 443 (HTTPS)', delay: 600 },
    { text: '> Exécution exploit: CVE-2024-HABIB...', delay: 1200 },
    { text: '> Contournement du pare-feu...', delay: 1900 },
    { text: '> Injection payload 0x4841424942...', delay: 2600 },
    { text: '> Établissement du reverse shell...', delay: 3300 },
    { text: '> 🔓 ACCÈS ROOT ACCORDÉ', delay: 4000, cls: 'hl-green' },
    { text: '> Cible recrutée avec succès comme client. 😎', delay: 4700, cls: 'hl-yellow' },
  ],
  game_title: 'PIRATER LE MAINFRAME — v2.0',
  game_intro1: 'Le mainframe est protégé par un code numérique',
  game_intro2: 'Vous avez',
  game_attempts_label: 'tentatives avant le verrouillage.',
  game_cracked: (n: number, a: number) => `✅ Code cracké! Le secret était <strong>${n}</strong> — en ${a} tentative(s)! 🎉`,
  game_locked: (n: number) => `❌ VERROUILLAGE! Le code était <strong>${n}</strong>. Mission échouée.`,
  game_invalid: 'Entrée invalide. Plage: 1–100',
  game_access_granted: '🔓 NIVEAU D\'ACCÈS ÉLEVÉ — SHELL ROOT OUVERT',
  game_locked_msg: '🔒 SYSTÈME VERROUILLÉ — CONTRE-MESURES EN COURS',
  game_low: '▲ TROP BAS',
  game_high: '▼ TROP HAUT',
  game_left: (r: number) => `${r} tentative(s) restante(s)`,
  easter_matrix: 'Réveille-toi, Neo... La Matrice te tient.',
  easter_matrix2: 'Suis le lapin blanc. 🐇',
  easter_coffee_msg: '☕ Coffee.exe lancé — productivité augmentée de 420%',
  easter_hire1: '✅ EXCELLENTE DÉCISION!',
  easter_hire2: "Vous avez choisi d'embaucher Mohamed Habib Msahel.",
  easter_hire3: 'Veuillez vous rendre à la section contact. 💼',
  easter_hire4: 'Note: Habib livre des fonctionnalités, pas des bugs. (Habituellement.)',
  switch_to_recruiter: 'Passage en interface recruteur...',
  switch_to_hacker: 'Retour en mode hacker...',
  classified_puzzle: 'Décodez le binaire pour déverrouiller: 01001000 01000001 01000010 01001001 01000010',
  classified_hint: 'Indice: Chaque groupe de 8 bits = un caractère ASCII',
  classified_answer: 'HABIB',
  classified_unlocked: '🔓 PROJET CLASSIFIÉ DÉVERROUILLÉ — NIVEAU D\'ACCÈS ÉLEVÉ',
};

const AR: I18nDict = {
  ...EN,
  nav_about: './عنّي',
  nav_projects: './المشاريع',
  nav_skills: './المهارات',
  nav_contact: './التواصل',
  boot_lines: EN.boot_lines.map(l =>
    l.text.startsWith('Booting') ? { ...l, text: 'جاري تشغيل HabibOS v3.0...' }
    : l.text.includes('Mohamed Habib Msahel — Full') ? { ...l, text: '  محمد حبيب مساهل — مطوّر Full-Stack ومحمول' }
    : l.text.includes('Tunisia') ? { ...l, text: '  تونس 🇹🇳  |  متاح للفرص الوظيفية' }
    : l
  ),
  level_expert: 'خبير',
  level_advanced: 'متقدم',
  level_intermediate: 'متوسط',
  term_welcome: 'مرحباً في <span class="hl-green">HabibOS v3.0</span> — اكتب <span class="hl-green">help</span> للبدء.',
  term_hint: 'جرّب: <span class="hl-cyan">help</span> | <span class="hl-cyan">about</span> | <span class="hl-cyan">projects</span> | <span class="hl-cyan">skills</span> | <span class="hl-cyan">contact</span> | <span class="hl-cyan">hack</span> | <span class="hl-cyan">game</span>',
  term_cleared: 'تم مسح الطرفية.',
  about_name: 'محمد حبيب مساهل',
  about_role: 'مطوّر Full-Stack وتطبيقات محمولة',
  about_loc: 'تونس 🇹🇳',
  about_status: '● متاح للفرص الوظيفية',
  about_bio: [
    'مطوّر شغوف يعشق صياغة حلول أنيقة للمشاكل المعقدة.',
    'أجسّر الفجوة بين الخوادم القوية والواجهات الجميلة والبديهية',
    '— من الويب إلى تطبيقات الجوال.',
    '',
    'أزدهر في البيئات الديناميكية وأؤمن أن البرمجيات العظيمة',
    'تولد عند تقاطع الإبداع والهندسة الدقيقة.',
  ],
  about_edu: '🎓 شهادة مهندس — علوم الحاسوب',
  about_edu_sub: '   ESPRIT | سبتمبر 2018 – الحاضر',
  cmd_whoami: 'محمد حبيب مساهل — تم منح وصول <span class="hl-green">root</span> 🔓',
  cmd_not_found: (c: string) => `habib: أمر غير موجود: <span class="hl-red">${c}</span>`,
  cmd_type_help: 'اكتب <span class="hl-green">help</span> للأوامر المتاحة.',
  cmd_sudo_deny: 'habib غير موجود في ملف sudoers. سيتم الإبلاغ عن هذه الحادثة. 📁',
  cmd_exit2: 'أُغلق الاتصال. إلى اللقاء 👋',
  cmd_cat_bio: 'مطوّر شغوف. مدمن قهوة. صيّاد أخطاء. مؤمن بالمصدر المفتوح.',
  cmd_cat_edu: '🎓 شهادة مهندس — علوم الحاسوب | ESPRIT (2018–الحاضر)',
  cmd_cat_deny: '🔐 تم رفض الوصول — يتطلب sudo',
  cmd_cat_notfound: (f: string) => `cat: ${f}: لا يوجد ملف أو مجلد بهذا الاسم`,
  cmd_contact_init: '📡 إنشاء اتصال آمن...',
  cmd_contact_scroll: 'اكتب start-contact لفتح نموذج الاتصال ↓',
  cmd_projects_hint: 'شغّل <span class="hl-green">cat &lt;معرف-المشروع&gt;</span> للتفاصيل.',
  hack_start: '⚡ بدء تسلسل الاختراق — انتظر...',
  hack_steps: [
    { text: '> فحص الشبكة المستهدفة...', delay: 0 },
    { text: '> المنافذ المفتوحة: 22 (SSH) 80 (HTTP) 443 (HTTPS)', delay: 600 },
    { text: '> تشغيل الاستغلال: CVE-2024-HABIB...', delay: 1200 },
    { text: '> تجاوز جدار الحماية...', delay: 1900 },
    { text: '> حقن الحمولة 0x4841424942...', delay: 2600 },
    { text: '> إنشاء reverse shell...', delay: 3300 },
    { text: '> 🔓 تم منح وصول ROOT', delay: 4000, cls: 'hl-green' },
    { text: '> تم تجنيد الهدف بنجاح كعميل. 😎', delay: 4700, cls: 'hl-yellow' },
  ],
  game_title: 'اختراق الخادم الرئيسي — v2.0',
  game_intro1: 'الخادم محمي برمز رقمي',
  game_intro2: 'لديك',
  game_attempts_label: 'محاولات قبل القفل.',
  game_cracked: (n: number, a: number) => `✅ تم كسر الرمز! السر كان <strong>${n}</strong> — في ${a} محاولة! 🎉`,
  game_locked: (n: number) => `❌ قُفل النظام! الرمز كان <strong>${n}</strong>. المهمة فشلت.`,
  game_invalid: 'إدخال غير صالح. النطاق: 1–100',
  game_access_granted: '🔓 مستوى الوصول ارتفع — فتح قشرة ROOT',
  game_locked_msg: '🔒 النظام مقفل — تنفيذ الإجراءات المضادة',
  game_low: '▲ منخفض جداً',
  game_high: '▼ مرتفع جداً',
  game_left: (r: number) => `${r} محاولة متبقية`,
  easter_matrix: 'استيقظ يا Neo... المصفوفة تمسك بك.',
  easter_matrix2: 'اتبع الأرنب الأبيض. 🐇',
  easter_coffee_msg: '☕ Coffee.exe شُغّل — الإنتاجية زادت 420%',
  easter_hire1: '✅ قرار ممتاز!',
  easter_hire2: 'اخترت توظيف محمد حبيب مساهل.',
  easter_hire3: 'يرجى التوجه إلى قسم التواصل. 💼',
  easter_hire4: 'ملاحظة: حبيب يُسلّم ميزات لا أخطاء. (عادةً.)',
  switch_to_recruiter: 'التبديل إلى واجهة المجند...',
  switch_to_hacker: 'العودة إلى وضع الهاكر...',
  classified_puzzle: 'فك تشفير الثنائي للوصول: 01001000 01000001 01000010 01001001 01000010',
  classified_hint: 'تلميح: كل مجموعة من 8 بت = حرف ASCII واحد',
  classified_answer: 'HABIB',
  classified_unlocked: '🔓 تم فتح المشروع السري — مستوى الوصول مرتفع',
};

export const I18N: Record<Lang, I18nDict> = { en: EN, fr: FR, ar: AR };

export function t(lang: Lang, key: keyof I18nDict): I18nDict[typeof key] {
  return (I18N[lang] as I18nDict)[key] ?? (I18N.en as I18nDict)[key];
}
