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
    id: 'librairie_bosphore',
    dir: 'drwxr-xr-x  librairie_le_bosphore/',
    name: 'Librairie Le Bosphore',
    badge: 'LIVE',
    tags: ['Flutter', 'Dart', 'GetX', 'Firebase', 'iOS'],
    demo: 'https://apps.apple.com/tn/app/librairie-le-bosphore/id6784185155',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/app-librairie.jpg' },
    desc: {
      en: 'E-commerce app for a bookstore and stationery chain — catalog browsing, ordering, Firebase authentication and push notifications. Published on the App Store.',
      fr: "Application e-commerce pour une librairie et papeterie — catalogue, commandes, authentification et notifications push Firebase. Publiée sur l'App Store.",
      ar: 'تطبيق تجارة إلكترونية لمكتبة وقرطاسية — تصفح الكتالوج والطلبات، مصادقة وإشعارات فورية عبر Firebase. منشور على App Store.',
    },
  },
  {
    id: 'bosphore_statistics',
    dir: 'drwxr-xr-x  bosphore_statistics/',
    name: 'Bosphore Statistics',
    badge: 'LIVE',
    tags: ['Flutter', 'Dart', 'GetX', 'fl_chart', 'Excel Export'],
    demo: 'https://apps.apple.com/tn/app/bosphore-statistics/id6788696519',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/app-statistics.jpg' },
    desc: {
      en: 'iOS reporting app for management: interactive dashboards, KPI charts and one-tap Excel export. 27 screens, shipped and maintained through v1.2.2.',
      fr: "Application iOS de reporting : tableaux de bord interactifs, graphiques KPI et export Excel en un tap. 27 écrans, livrée et maintenue jusqu'en v1.2.2.",
      ar: 'تطبيق iOS لإعداد التقارير: لوحات تفاعلية ورسوم بيانية لمؤشرات الأداء وتصدير Excel بنقرة واحدة. 27 شاشة، تمت صيانته حتى الإصدار 1.2.2.',
    },
  },
  {
    id: 'bosphore_dispatching',
    dir: 'drwxr-xr-x  bosphore_dispatching/',
    name: 'Bosphore Dispatching',
    badge: 'LIVE',
    tags: ['Flutter', 'Node.js', 'Sequelize', 'MySQL', 'Socket.io'],
    demo: 'https://apps.apple.com/tn/app/bosphore-dispatching/id6783056595',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/app-dispatching.jpg' },
    desc: {
      en: 'Logistics and delivery dispatch app — barcode scanning, GPS tracking and offline-first SQLite sync, backed by a Node.js/Sequelize API with Socket.io real-time updates. 32 screens.',
      fr: "Application de dispatch logistique et livraison — scan de codes-barres, suivi GPS et synchronisation offline SQLite, adossée à une API Node.js/Sequelize avec temps réel Socket.io. 32 écrans.",
      ar: 'تطبيق إدارة التوزيع والتوصيل — مسح الباركود وتتبع GPS ومزامنة دون اتصال، مدعوم بواجهة Node.js/Sequelize مع تحديثات فورية. 32 شاشة.',
    },
  },
  {
    id: 'bosphore_rh',
    dir: 'drwxr-xr-x  le_bosphore_rh/',
    name: 'Le Bosphore RH',
    badge: 'LIVE',
    tags: ['Flutter', 'Node.js', 'Prisma', 'MariaDB', 'Firebase'],
    demo: 'https://apps.apple.com/tn/app/le-bosphore-rh/id6797465768',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/app-rh.jpg' },
    desc: {
      en: 'Internal HR platform — employee management, geolocated clock-in, document handling and push notifications. 44 screens, backed by a Prisma/MariaDB API.',
      fr: "Plateforme RH interne — gestion des employés, pointage géolocalisé, gestion documentaire et notifications push. 44 écrans, API Prisma/MariaDB.",
      ar: 'منصة موارد بشرية داخلية — إدارة الموظفين وتسجيل الحضور بتحديد الموقع وإدارة الوثائق والإشعارات. 44 شاشة مع واجهة Prisma/MariaDB.',
    },
  },
  {
    id: 'inventory_scanner',
    dir: 'drwxr-xr-x  inventory_scanner/',
    name: 'Zebra Inventory Scanner',
    badge: 'ACTIVE',
    tags: ['Flutter', 'Dart', 'Zebra', 'SQLite', 'Barcode'],
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/app-inventory.jpg' },
    desc: {
      en: 'Industrial barcode scanner for Zebra handheld terminals — multi-zone inventory counting with offline SQLite sync.',
      fr: "Scanner de codes-barres industriel pour terminaux Zebra — inventaire multi-zones avec synchronisation offline SQLite.",
      ar: 'ماسح باركود صناعي لأجهزة Zebra المحمولة — جرد متعدد المناطق مع مزامنة دون اتصال.',
    },
  },
  {
    id: 'pos_finance',
    dir: 'drwxr-xr-x  pos_finance_backend/',
    name: 'POS & Finance Backend',
    badge: 'ACTIVE',
    tags: ['Node.js', 'Express', 'MySQL', 'Redis', 'Socket.io', 'Swagger'],
    desc: {
      en: 'Point-of-sale and finance backend: REST API over MySQL with Redis caching, Socket.io real-time events and Swagger documentation. 1,500+ commits over 15 months.',
      fr: "Backend de caisse et gestion financière : API REST sur MySQL avec cache Redis, événements temps réel Socket.io et documentation Swagger. Plus de 1 500 commits sur 15 mois.",
      ar: 'واجهة خلفية لنقاط البيع والإدارة المالية: REST API على MySQL مع تخزين مؤقت Redis وأحداث فورية وتوثيق Swagger. أكثر من 1500 إيداع خلال 15 شهرًا.',
    },
  },
  {
    id: 'portfolio_os',
    dir: 'drwxr-xr-x  portfolio_os/',
    name: 'HabibOS Portfolio',
    badge: 'LIVE',
    tags: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Web Audio'],
    github: 'https://github.com/mohamedhabibmsahel/portfolio-mohamed-habib-msahel',
    demo: 'https://mohamedhabibmsahel.github.io/portfolio-mohamed-habib-msahel/',
    desc: {
      en: 'This portfolio — a cinematic hacker terminal experience. Matrix rain, interactive shell, mini-game, dual-mode UI, and Web Audio sound engine.',
      fr: 'Ce portfolio — une expérience cinématographique de terminal hacker. Pluie Matrix, shell interactif, mini-jeu, UI dual-mode et moteur sonore.',
      ar: 'هذا الموقع الشخصي — تجربة طرفية سينمائية. مطر Matrix، واجهة shell تفاعلية، لعبة مصغرة ووضع مزدوج.',
    },
  },
  {
    id: 'witch_undo',
    dir: '-rwxr-xr-x  witch_undo_game.exe',
    name: 'Witch Undo The Spell',
    badge: 'ACADEMIC',
    tags: ['C', 'SDL 1.2', 'Linux', 'Photoshop'],
    github: 'https://github.com/mohamedhabibmsahel/witch-undo-the-spell',
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
    github: 'https://github.com/mohamedhabibmsahel/Library-managment-arduino-BrainStorm-',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/Library-Management.jpeg' },
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
    github: 'https://github.com/mohamedhabibmsahel/EuroRentACar',
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
    github: 'https://github.com/mohamedhabibmsahel/FanArtSymfony',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/theratre.jpeg' },
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
    github: 'https://github.com/mohamedhabibmsahel/khadamni-front-android',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/khadamni.jpeg' },
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
    github: 'https://github.com/mohamedhabibmsahel/SportpalWeb',
    media: { type: 'image', url: '/portfolio-mohamed-habib-msahel/assets/sportpal.jpeg' },
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

// Ordered deliberately: mobile first. This list is what a recruiter scanning
// for a Flutter specialist reads, so Flutter/Dart leads and web sits below it.
export const SKILLS = [
  { pid: 1001, name: 'Flutter / Dart',            levelKey: 'expert',       pct: 93 },
  { pid: 1002, name: 'JavaScript / TypeScript',   levelKey: 'expert',       pct: 92 },
  { pid: 1003, name: 'Node.js / Express',         levelKey: 'expert',       pct: 91 },
  { pid: 1004, name: 'REST APIs',                 levelKey: 'expert',       pct: 90 },
  { pid: 1005, name: 'Firebase (Auth, FCM)',      levelKey: 'advanced',     pct: 86 },
  { pid: 1006, name: 'SQL / MySQL',               levelKey: 'advanced',     pct: 84 },
  { pid: 1007, name: 'Redis / Socket.io',         levelKey: 'advanced',     pct: 81 },
  { pid: 1008, name: 'React / Next.js',           levelKey: 'advanced',     pct: 80 },
  { pid: 1009, name: 'Git / CI-CD',               levelKey: 'advanced',     pct: 79 },
  { pid: 1010, name: 'Docker / DevOps',           levelKey: 'advanced',     pct: 74 },
];

export const TECH_TAGS = [
  'Flutter', 'Dart', 'iOS', 'Android', 'GetX', 'Firebase', 'SQLite',
  'App Store Connect', 'JavaScript', 'TypeScript', 'Node.js', 'Express',
  'Prisma', 'Sequelize', 'MySQL', 'Redis', 'Socket.io', 'Swagger', 'JWT',
  'REST', 'React', 'Next.js', 'Docker', 'Nginx', 'Git', 'GitHub Actions',
  'Linux', 'VS Code', 'Figma',
];
