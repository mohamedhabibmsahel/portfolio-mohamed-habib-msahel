export interface Project {
  id: string;
  dir: string;
  name: string;
  badge: 'ACTIVE' | 'LIVE' | 'MAINTAINED' | 'ACADEMIC' | 'CLASSIFIED';
  tags: string[];
  github?: string;
  demo?: string;
  media?: { type: 'video' | 'image'; url: string };
  classified?: boolean;
  desc: { en: string; fr: string; ar: string };
}

export const PROJECTS: Project[] = [
  {
    id: 'easy_dispatching',
    dir: 'drwxr-xr-x  easy_dispatching/',
    name: 'Easy Dispatching System',
    badge: 'ACTIVE',
    tags: ['Node.js', 'React', 'Flutter', 'PostgreSQL', 'JWT'],
    github: 'https://github.com/mohamedhabibmsahel',
    demo: '#',
    desc: {
      en: 'Full-stack logistics & warehouse management platform with real-time tracking, role-based access control, and optimized dispatch workflows.',
      fr: "Plateforme full-stack de gestion logistique et d'entrepôt avec suivi en temps réel, contrôle d'accès basé sur les rôles et flux de travail optimisés.",
      ar: 'منصة إدارة لوجستية ومستودعات متكاملة مع تتبع في الوقت الفعلي والتحكم في الوصول القائم على الأدوار.',
    },
  },
  {
    id: 'inventory_scanner',
    dir: 'drwxr-xr-x  inventory_scanner/',
    name: 'Mobile Inventory Scanner',
    badge: 'ACTIVE',
    tags: ['Flutter', 'Dart', 'Zebra SDK', 'SQLite', 'BLE'],
    github: 'https://github.com/mohamedhabibmsahel',
    desc: {
      en: 'Industrial barcode scanner app for Zebra devices built with Flutter. Multi-zone inventory management with offline sync capabilities.',
      fr: "Application de scanner de code-barres industriel pour appareils Zebra. Gestion d'inventaire multi-zones avec synchronisation hors ligne.",
      ar: 'تطبيق ماسح الباركود الصناعي لأجهزة Zebra مبني بـ Flutter. إدارة المخزون متعدد المناطق مع المزامنة دون اتصال.',
    },
  },
  {
    id: 'portfolio_os',
    dir: 'drwxr-xr-x  portfolio_os/',
    name: 'HabibOS Portfolio',
    badge: 'LIVE',
    tags: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Web Audio'],
    github: 'https://github.com/mohamedhabibmsahel',
    demo: '#',
    desc: {
      en: 'This portfolio — a cinematic hacker terminal experience. Matrix rain, interactive shell, mini-game, dual-mode UI, and Web Audio sound engine.',
      fr: 'Ce portfolio — une expérience cinématographique de terminal hacker. Pluie Matrix, shell interactif, mini-jeu, UI dual-mode et moteur sonore.',
      ar: 'هذا الموقع الشخصي — تجربة طرفية سينمائية. مطر Matrix، واجهة shell تفاعلية، لعبة مصغرة ووضع مزدوج.',
    },
  },
  {
    id: 'auth_microservice',
    dir: 'drwxr-xr-x  auth_microservice/',
    name: 'Auth Microservice',
    badge: 'MAINTAINED',
    tags: ['Node.js', 'Express', 'JWT', 'Redis', 'Docker'],
    github: 'https://github.com/mohamedhabibmsahel',
    desc: {
      en: 'JWT + OAuth2 authentication microservice with refresh token rotation, rate limiting, and multi-tenant support.',
      fr: "Microservice d'authentification JWT + OAuth2 avec rotation de token, limitation de débit et support multi-locataire.",
      ar: 'خدمة مصغرة للمصادقة JWT + OAuth2 مع تدوير رمز التحديث وتحديد المعدل ودعم متعدد المستأجرين.',
    },
  },
  {
    id: 'realtime_dashboard',
    dir: 'drwxr-xr-x  realtime_dashboard/',
    name: 'Real-Time Analytics Dashboard',
    badge: 'ACTIVE',
    tags: ['React', 'WebSocket', 'Chart.js', 'Node.js', 'MongoDB'],
    github: 'https://github.com/mohamedhabibmsahel',
    demo: '#',
    desc: {
      en: 'Live WebSocket-powered dashboard with dynamic charts, KPI tracking, and role-based data visibility.',
      fr: 'Tableau de bord en temps réel alimenté par WebSocket avec graphiques dynamiques et suivi KPI.',
      ar: 'لوحة تحكم في الوقت الفعلي بـ WebSocket مع مخططات ديناميكية وتتبع مؤشرات الأداء.',
    },
  },
  {
    id: 'api_gateway',
    dir: 'drwxr-xr-x  api_gateway/',
    name: 'API Gateway & Rate Limiter',
    badge: 'MAINTAINED',
    tags: ['Node.js', 'Redis', 'Nginx', 'Docker', 'Prometheus'],
    github: 'https://github.com/mohamedhabibmsahel',
    desc: {
      en: 'Custom API gateway with request routing, rate limiting (token bucket), circuit breakers, and request logging.',
      fr: 'Passerelle API personnalisée avec routage, limitation de débit (seau à jetons), disjoncteurs et journalisation.',
      ar: 'بوابة API مخصصة مع توجيه الطلبات وخوارزميات تحديد المعدل وقواطع الدائرة.',
    },
  },
  {
    id: 'witch_undo',
    dir: '-rwxr-xr-x  witch_undo_game.exe',
    name: 'Witch Undo The Spell',
    badge: 'ACADEMIC',
    tags: ['C', 'SDL 1.2', 'Linux', 'Photoshop'],
    demo: 'https://www.youtube-nocookie.com/embed/la9lIbC8o2o',
    media: { type: 'video', url: 'https://www.youtube-nocookie.com/embed/la9lIbC8o2o' },
    desc: {
      en: '2D video game developed in C with SDL. A witch bewitches a village, and you play as "Foulen" to save them with a magic wand.',
      fr: 'Jeu vidéo 2D développé en C avec SDL. Une sorcière envoûte un village, vous incarnez "Foulen" pour les sauver.',
      ar: 'لعبة فيديو ثنائية الأبعاد تم تطويرها بلغة C باستخدام SDL. تقوم ساحرة بسحر قرية وتلعب دور "فولان" لإنقاذهم.',
    },
  },
  {
    id: 'library_mgmt',
    dir: '-rwxr-xr-x  library_mgmt.exe',
    name: 'Library Management System',
    badge: 'ACADEMIC',
    tags: ['C++', 'QT Framework', 'SQL', 'Arduino'],
    github: 'https://github.com/mohamedhabibmsahel',
    media: { type: 'image', url: '/assets/Library-Management.jpeg' },
    desc: {
      en: 'Desktop application for managing libraries with integrated fire and gas leak detection sensors via Arduino.',
      fr: "Application de bureau pour la gestion de bibliothèques avec des capteurs de détection d'incendie via Arduino.",
      ar: 'تطبيق سطح مكتب لإدارة المكتبات مع مستشعرات متكاملة للكشف عن الحريق عبر Arduino.',
    },
  },
  {
    id: 'euro_rent',
    dir: '-rwxr-xr-x  euro_rent_a_car.php',
    name: 'EuroRentACar',
    badge: 'ACADEMIC',
    tags: ['PHP', 'Oracle', 'HTML/CSS', 'GitHub'],
    demo: 'https://www.youtube-nocookie.com/embed/-_b6Y2YNlw4',
    media: { type: 'video', url: 'https://www.youtube-nocookie.com/embed/-_b6Y2YNlw4' },
    desc: {
      en: 'A car rental website allowing users to book vehicles and request professional drivers.',
      fr: 'Un site de location de voitures permettant de réserver des véhicules et de demander des chauffeurs professionnels.',
      ar: 'موقع لتأجير السيارات يتيح للمستخدمين حجز المركبات وطلب سائقين محترفين.',
    },
  },
  {
    id: 'fanart',
    dir: '-rwxr-xr-x  fanart_platform/',
    name: 'FanArt Platform',
    badge: 'ACADEMIC',
    tags: ['Symfony 4', 'JavaFX', 'Codename One', 'SQL'],
    github: 'https://github.com/mohamedhabibmsahel',
    media: { type: 'image', url: '/assets/theratre.jpeg' },
    desc: {
      en: 'Multi-platform system (Web, Mobile, Desktop) for theater management and artist scheduling.',
      fr: 'Système multi-plateforme (Web, Mobile, Bureau) pour la gestion des théâtres et la planification des artistes.',
      ar: 'نظام متعدد المنصات (ويب، محمول، سطح مكتب) لإدارة المسارح وجدولة الفنانين.',
    },
  },
  {
    id: 'khadamni',
    dir: '-rwxr-xr-x  khadamni_app/',
    name: 'Khadamni',
    badge: 'ACADEMIC',
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Android Studio'],
    github: 'https://github.com/mohamedhabibmsahel',
    media: { type: 'image', url: '/assets/khadamni.jpeg' },
    desc: {
      en: 'Native mobile app connecting users with public service providers (plumbers, carpenters, etc.) with online payment integration.',
      fr: "Application mobile native connectant les utilisateurs à des prestataires de services publics avec paiement en ligne.",
      ar: 'تطبيق جوال أصيل يربط المستخدمين بمزودي الخدمات العامة مع دمج الدفع عبر الإنترنت.',
    },
  },
  {
    id: 'sportpal',
    dir: '-rwxr-xr-x  sportpal_app/',
    name: 'SportPal',
    badge: 'ACADEMIC',
    tags: ['Flutter', 'Node.js', 'MongoDB', 'Heroku', 'Angular'],
    github: 'https://github.com/mohamedhabibmsahel',
    media: { type: 'image', url: '/assets/sportpal.jpeg' },
    desc: {
      en: 'Cross-platform mobile application for sports match-making, tournament organization, and player management.',
      fr: "Application mobile multiplateforme pour la mise en relation de partenaires sportifs et l'organisation de tournois.",
      ar: 'تطبيق جوال متعدد المنصات لمطابقة الشركاء الرياضيين وتنظيم البطولات وإدارة اللاعبين.',
    },
  },
  {
    id: 'classified_1',
    dir: '-r--------  [CLASSIFIED].enc',
    name: '???  CLASSIFIED PROJECT',
    badge: 'CLASSIFIED',
    classified: true,
    tags: ['???', '???', '???'],
    desc: {
      en: 'This file is encrypted. Solve the terminal puzzle to unlock access. Type: unlock classified',
      fr: 'Ce fichier est chiffré. Résolvez le puzzle terminal pour déverrouiller. Tapez: unlock classified',
      ar: 'هذا الملف مشفر. حل لغز الطرفية للوصول. اكتب: unlock classified',
    },
  },
];

export const SKILLS = [
  { pid: 1001, name: 'JavaScript / TypeScript', levelKey: 'expert',       pct: 92 },
  { pid: 1002, name: 'Node.js / Express',        levelKey: 'expert',       pct: 90 },
  { pid: 1003, name: 'React / Next.js',           levelKey: 'expert',       pct: 88 },
  { pid: 1004, name: 'Flutter / Dart',            levelKey: 'advanced',     pct: 85 },
  { pid: 1005, name: 'SQL / PostgreSQL',          levelKey: 'advanced',     pct: 83 },
  { pid: 1006, name: 'REST / GraphQL APIs',       levelKey: 'expert',       pct: 91 },
  { pid: 1007, name: 'Docker / DevOps',           levelKey: 'advanced',     pct: 75 },
  { pid: 1008, name: 'MongoDB / Redis',           levelKey: 'advanced',     pct: 78 },
  { pid: 1009, name: 'Git / CI-CD',              levelKey: 'advanced',     pct: 82 },
  { pid: 1010, name: 'System Design',            levelKey: 'intermediate', pct: 70 },
];

export const TECH_TAGS = [
  'JavaScript', 'TypeScript', 'Python', 'Node.js', 'Express', 'React', 'Next.js',
  'Flutter', 'Dart', 'HTML5', 'CSS3', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'Docker', 'Nginx', 'Git', 'GitHub Actions', 'JWT', 'REST', 'GraphQL',
  'WebSockets', 'Linux', 'VS Code', 'Figma',
];
