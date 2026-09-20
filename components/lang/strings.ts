export type Lang = "en" | "ar";

/** A featured project gets the full four-beat story treatment. */
export type FeaturedWork = {
  n: string;
  title: string;
  kicker: string;
  problem: string;
  built: string;
  decision: string;
  role: string;
  year: string;
  stack: string[];
  /** Real, verifiable outcome. Left undefined until there are honest numbers. */
  outcome?: string;
};

/** A selected project is one scannable row. */
export type SelectedWork = {
  n: string;
  title: string;
  kicker: string;
  blurb: string;
  role: string;
  year: string;
  stack: string[];
};

export type Strings = {
  dir: "ltr" | "rtl";
  nav: {
    items: Array<[string, string]>;
    available: string;
    langLabel: string;
    themeLabel: string;
    menuLabel: string;
  };
  hero: {
    name: string;
    headline_pre: string;
    headline_em: string;
    headline_post: string;
    sub: string;
    status: string[];
    cta_works: string;
    cta_contact: string;
    resume: string;
  };
  works: {
    eyebrow: string;
    headline_pre: string;
    headline_em: string;
    headline_post: string;
    intro: string;
    label_problem: string;
    label_built: string;
    label_decision: string;
    label_role: string;
    featured: FeaturedWork[];
    selected_eyebrow: string;
    selected_headline: string;
    selected_note: string;
    selected: SelectedWork[];
    offline_note: string;
  };
  principles: {
    eyebrow: string;
    headline_pre: string;
    headline_em: string;
    headline_post: string;
    items: Array<{ n: string; title: string; body: string; anchor: string }>;
    tools_label: string;
    tools: Array<[string, string]>;
  };
  about: {
    eyebrow: string;
    headline_pre: string;
    headline_em: string;
    headline_post: string;
    p1: string;
    p2: string;
    p3: string;
  };
  cv: {
    eyebrow: string;
    headline_pre: string;
    headline_em: string;
    headline_post: string;
    download: string;
    rows: Array<{
      years: string;
      role: string;
      org: string;
      loc: string;
      tags: string[];
      blurb: string;
    }>;
  };
  contact: {
    eyebrow: string;
    headline_a: string;
    headline_em: string;
    headline_b: string;
    lead: string;
    details_label: string;
    rows: Array<[string, string, string | null]>;
    availability: string;
    form_label: string;
    f_name: string;
    f_name_p: string;
    f_email: string;
    f_email_p: string;
    f_msg: string;
    f_msg_p: string;
    f_send: string;
    sending: string;
    e_required: string;
    e_email: string;
    e_msg: string;
    e_submit: string;
    sent_label: string;
    sent_title: (name: string) => string;
    sent_body: string;
    sent_again: string;
  };
  footer: {
    identity_tagline: string;
    index_label: string;
    elsewhere_label: string;
    direct_label: string;
    colophon_text: string;
    copyright: string;
    to_top: string;
  };
  misc: {
    visit_project: string;
    screenshot_alt: (title: string) => string;
  };
};

const en: Strings = {
  dir: "ltr",
  nav: {
    items: [
      ["Work", "#work"],
      ["About", "#about"],
      ["Résumé", "#cv"],
      ["Contact", "#contact"],
    ],
    available: "Available",
    langLabel: "العربية",
    themeLabel: "Toggle dark mode",
    menuLabel: "Menu",
  },
  hero: {
    name: "Youseef Tareq",
    headline_pre: "I build web products that ",
    headline_em: "hold up",
    headline_post: " in production.",
    sub: "Full-stack engineer in Cairo. Currently at The POST, building live-data platforms, subscription products and internal dashboards.",
    status: ["Cairo · GMT+2", "Available for new work", "Angular · Node · TypeScript"],
    cta_works: "See the work",
    cta_contact: "Get in touch",
    resume: "Résumé (PDF)",
  },
  works: {
    eyebrow: "Featured work",
    headline_pre: "Three projects, ",
    headline_em: "in full",
    headline_post: ".",
    intro: "The problem, what I built, and the one decision that mattered.",
    label_problem: "Problem",
    label_built: "What I built",
    label_decision: "Key decision",
    label_role: "Role",
    featured: [
      {
        n: "01",
        title: "EG-Pricey",
        kicker: "Live currency, gold and fuel prices for Egypt",
        problem:
          "Egyptians check the dollar and gold rate several times a day, across a dozen sources that rarely agree.",
        built:
          "One live tracker for currencies, gold, fuel and food prices, with loan and investment calculators on top of it. Arabic-first, RTL throughout.",
        decision:
          "Prices push over WebSockets instead of polling, so a tab left open all morning stays correct without hammering the API. A stale price is worse than no price, so the interface announces a reconnect rather than quietly showing an old number.",
        role: "Lead developer · full project",
        year: "2025",
        stack: ["Angular", "Node.js", "Express", "MongoDB", "Socket.IO"],
      },
      {
        n: "02",
        title: "XTranslator",
        kicker: "A subscription translation platform, sold worldwide",
        problem:
          "Selling a subscription internationally is a tax, currency and fraud problem long before it is a translation problem.",
        built:
          "A translation service covering many languages and regions, with accounts, subscription billing and abuse protection from day one.",
        decision:
          "Billing runs through Lemon Squeezy as merchant of record, so VAT and cross-border compliance are bought rather than rebuilt badly. Traffic sits behind Cloudflare for rate limiting and bot filtering, which keeps the origin small.",
        role: "Full project",
        year: "2025",
        stack: ["Angular", "Node.js", "Lemon Squeezy", "Cloudflare"],
      },
      {
        n: "03",
        title: "TileGreen",
        kicker: "Turning plastic waste into building materials",
        problem:
          "A climate-tech startup needed a site that would hold up in front of investors and industrial buyers, not just look current.",
        built:
          "The public site for an Egyptian company recycling plastic waste into construction tiles — bilingual, image-heavy, structured around the technology rather than the brand.",
        decision:
          "English and Arabic share one layout system instead of two templates, so the RTL site is the same site and not a mirrored copy that drifts. Motion paces the story down the page and stops there.",
        role: "Front-end developer",
        year: "2024",
        stack: ["Angular", "SCSS", "Motion"],
      },
    ],
    selected_eyebrow: "Selected work",
    selected_headline: "Also shipped",
    selected_note: "Client and institutional projects, 2024 — 2025.",
    selected: [
      {
        n: "04",
        title: "UFeed",
        kicker: "HR evaluation, automated",
        blurb:
          "Turns employee evaluation cycles into dashboards a team can act on, instead of spreadsheets nobody opens twice.",
        role: "Full-stack developer",
        year: "2024",
        stack: ["Angular", "Django", "PostgreSQL"],
      },
      {
        n: "05",
        title: "Jafy",
        kicker: "Premium furniture, online",
        blurb:
          "A furniture and lighting store built to browse like a catalogue — large imagery, calm pacing, a checkout that stays out of the way.",
        role: "Front-end developer",
        year: "2024",
        stack: ["Angular", "TypeScript"],
      },
      {
        n: "06",
        title: "Faculty of Nursing — Damanhour University",
        kicker: "A public faculty, online",
        blurb:
          "The official faculty site: bilingual, readable on old devices and slow connections, built to stay current for a decade.",
        role: "Front-end developer",
        year: "2024",
        stack: ["Angular", "Responsive"],
      },
      {
        n: "07",
        title: "Dr. Genedy",
        kicker: "A clinic people can trust",
        blurb:
          "A surgery and aesthetics clinic site built around helping patients find the right procedure and book with confidence.",
        role: "Front-end developer",
        year: "2024",
        stack: ["Angular", "SCSS"],
      },
    ],
    offline_note: "Site offline",
  },
  principles: {
    eyebrow: "How I work",
    headline_pre: "Three things I ",
    headline_em: "actually",
    headline_post: " believe.",
    items: [
      {
        n: "01",
        title: "Correct beats clever.",
        body: "A price that has silently gone stale is worse than no price at all. I would rather spend the week on the failure cases than on the animation.",
        anchor: "EG-Pricey · live data",
      },
      {
        n: "02",
        title: "Arabic is not a translation.",
        body: "RTL changes layout, typography and numerals, not just text direction. I build both directions from one system so neither is the afterthought.",
        anchor: "TileGreen · this site",
      },
      {
        n: "03",
        title: "Buy the hard parts.",
        body: "Tax, compliance and bot traffic are solved problems owned by other people. I reach for a merchant of record and an edge proxy before writing my own.",
        anchor: "XTranslator · billing",
      },
    ],
    tools_label: "What I reach for",
    tools: [
      ["Front-end", "Angular · TypeScript · Tailwind"],
      ["Back-end", "Node.js · Express · Django"],
      ["Data", "MongoDB · PostgreSQL · Redis"],
      ["Infrastructure", "Docker · Cloudflare · Linux VPS"],
    ],
  },
  about: {
    eyebrow: "About",
    headline_pre: "Cairo. ",
    headline_em: "Building",
    headline_post: " since 2023.",
    p1: "I’m Youseef. I build web products end to end — currently with The POST, and independently for clients who need something shipped properly rather than quickly.",
    p2: "Most of the work is live-data platforms, subscription products and internal dashboards. Angular and Node by default; Django and Postgres when the data model earns it.",
    p3: "I care about the parts people actually feel: first load, forms that don’t lose your work, and Arabic that behaves like a first language instead of a mirrored afterthought.",
  },
  cv: {
    eyebrow: "Résumé",
    headline_pre: "On ",
    headline_em: "paper",
    headline_post: ".",
    download: "Download full résumé (PDF)",
    rows: [
      {
        years: "2025 — Now",
        role: "Full-Stack Developer",
        org: "The POST",
        loc: "Remote",
        tags: ["Angular", "Node", "Mongo", "TS"],
        blurb:
          "Internal tools, analytics dashboards and customer-facing portals, shipped in weekly increments alongside a small team.",
      },
      {
        years: "2024 — 25",
        role: "Freelance Developer",
        org: "Upwork · Fiverr · Khamsat",
        loc: "Remote",
        tags: ["Angular", "Django", "Node"],
        blurb:
          "Contract work across several countries and industries — where I learned to scope honestly, ask the awkward question early, and ship on the date I gave.",
      },
      {
        years: "2023",
        role: "Full-Stack Training",
        org: "NTI · National Telecom Institute",
        loc: "Cairo",
        tags: ["JS", "MEAN"],
        blurb:
          "A focused programme on modern web development, from front-end through server deployment and security.",
      },
      {
        years: "2020 — 25",
        role: "B.Sc. Computer Science",
        org: "Cairo Higher Institute",
        loc: "Cairo",
        tags: ["CS", "Software"],
        blurb: "Software engineering, algorithms, databases and web development.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline_a: "Let’s build something ",
    headline_em: "good",
    headline_b: ".",
    lead: "Tell me roughly what you’re building, when you need it, and the budget range. I read every message myself and reply within a day.",
    details_label: "Direct",
    rows: [
      ["Email", "youseeftareq5176@gmail.com", "mailto:youseeftareq5176@gmail.com"],
      ["WhatsApp", "+20 155 733 7989", "https://wa.me/201557337989"],
      ["LinkedIn", "/in/youseef-tareq", "https://linkedin.com/in/youseef-tareq"],
      ["Discord", "soking_", null],
      ["Based", "Cairo · Remote worldwide", null],
    ],
    availability: "Available for new work · replies within 24 hours",
    form_label: "Project enquiry",
    f_name: "Your name",
    f_name_p: "e.g. Sarah Chen",
    f_email: "Email",
    f_email_p: "sarah@company.com",
    f_msg: "What are you building?",
    f_msg_p: "A few lines is plenty — what, when, and roughly how big.",
    f_send: "Send message",
    sending: "Sending…",
    e_required: "Required",
    e_email: "Please enter a valid email",
    e_msg: "A few more words, please",
    e_submit: "Could not send. Try again, or email me directly.",
    sent_label: "Message sent",
    sent_title: (name: string) => `Thanks, ${name}.`,
    sent_body:
      "I’ll reply from youseeftareq5176@gmail.com within a day. For anything urgent, WhatsApp is fastest.",
    sent_again: "Send another",
  },
  footer: {
    identity_tagline: "Full-stack engineer · Cairo",
    index_label: "Navigate",
    elsewhere_label: "Elsewhere",
    direct_label: "Direct",
    colophon_text:
      "Designed and built end to end. Bilingual, light and dark, no analytics, no cookies, no pop-ups.",
    copyright: "© 2026 Youseef Tareq",
    to_top: "Back to top",
  },
  misc: {
    visit_project: "Visit live site",
    screenshot_alt: (title: string) => `Screenshot of the ${title} website`,
  },
};

const ar: Strings = {
  dir: "rtl",
  nav: {
    items: [
      ["الأعمال", "#work"],
      ["نبذة", "#about"],
      ["السيرة الذاتية", "#cv"],
      ["تواصل", "#contact"],
    ],
    available: "متاح",
    langLabel: "English",
    themeLabel: "تبديل الوضع الداكن",
    menuLabel: "القائمة",
  },
  hero: {
    name: "يوسف طارق",
    headline_pre: "أبني منتجات ويب ",
    headline_em: "تصمد",
    headline_post: " في التشغيل الفعلي.",
    sub: "مهندس ويب شامل من القاهرة. أعمل حاليًا مع The POST على منصات البيانات الحية ومنتجات الاشتراك ولوحات التحكم الداخلية.",
    status: ["القاهرة · GMT+2", "متاح لمشاريع جديدة", "Angular · Node · TypeScript"],
    cta_works: "شاهد الأعمال",
    cta_contact: "تواصل معي",
    resume: "السيرة الذاتية (PDF)",
  },
  works: {
    eyebrow: "أعمال مختارة",
    headline_pre: "ثلاثة مشاريع، ",
    headline_em: "بالتفصيل",
    headline_post: ".",
    intro: "المشكلة، وما الذي بنيته، والقرار الذي صنع الفارق.",
    label_problem: "المشكلة",
    label_built: "ما بنيته",
    label_decision: "القرار الأهم",
    label_role: "دوري",
    featured: [
      {
        n: "٠١",
        title: "EG-Pricey",
        kicker: "أسعار العملات والذهب والوقود في مصر، لحظة بلحظة",
        problem:
          "يتابع المصريون سعر الدولار والذهب عدة مرات يوميًا، عبر مصادر متفرقة نادرًا ما تتفق على رقم واحد.",
        built:
          "متتبع واحد لأسعار العملات والذهب والوقود والسلع، وفوقه حاسبات للقروض والاستثمار. عربي أولًا، ومن اليمين إلى اليسار بالكامل.",
        decision:
          "الأسعار تُدفع عبر WebSockets بدلًا من الاستعلام المتكرر، فتبقى الصفحة المفتوحة طوال الصباح صحيحة دون إرهاق الخادم. السعر المتقادم أسوأ من غياب السعر، لذا تُعلن الواجهة إعادة الاتصال بدل أن تعرض رقمًا قديمًا بصمت.",
        role: "مطور رئيسي · المشروع كاملًا",
        year: "٢٠٢٥",
        stack: ["Angular", "Node.js", "Express", "MongoDB", "Socket.IO"],
      },
      {
        n: "٠٢",
        title: "XTranslator",
        kicker: "منصة ترجمة بالاشتراك، تُباع حول العالم",
        problem:
          "بيع اشتراك دوليًا مسألة ضرائب وعملات واحتيال قبل أن يكون مسألة ترجمة.",
        built:
          "خدمة ترجمة تغطي لغات ومناطق متعددة، مع حسابات وفوترة اشتراكات وحماية من إساءة الاستخدام منذ اليوم الأول.",
        decision:
          "الفوترة تمر عبر Lemon Squeezy كبائع مسجَّل، فتُشترى مسائل الضريبة والامتثال بدل إعادة بنائها بشكل ناقص. وحركة المرور خلف Cloudflare للحد من الطلبات وتصفية الروبوتات، وهو ما يبقي الخادم الأصلي صغيرًا.",
        role: "المشروع كاملًا",
        year: "٢٠٢٥",
        stack: ["Angular", "Node.js", "Lemon Squeezy", "Cloudflare"],
      },
      {
        n: "٠٣",
        title: "TileGreen",
        kicker: "تحويل النفايات البلاستيكية إلى مواد بناء",
        problem:
          "شركة ناشئة في تقنيات المناخ احتاجت موقعًا يصمد أمام المستثمرين والمشترين الصناعيين، لا أن يبدو عصريًا فحسب.",
        built:
          "الموقع الرسمي لشركة مصرية تعيد تدوير البلاستيك إلى بلاط بناء — ثنائي اللغة، غني بالصور، مبني حول التقنية لا حول العلامة.",
        decision:
          "الإنجليزية والعربية تتشاركان نظام تخطيط واحدًا بدل قالبين، فالنسخة العربية هي الموقع نفسه لا نسخة معكوسة تتباعد مع الوقت. والحركة تنظّم إيقاع السرد ثم تتوقف عند ذلك.",
        role: "مطور واجهات أمامية",
        year: "٢٠٢٤",
        stack: ["Angular", "SCSS", "Motion"],
      },
    ],
    selected_eyebrow: "أعمال أخرى",
    selected_headline: "كذلك أطلقت",
    selected_note: "مشاريع لعملاء ومؤسسات، ٢٠٢٤ — ٢٠٢٥.",
    selected: [
      {
        n: "٠٤",
        title: "UFeed",
        kicker: "تقييم الموظفين، آليًا",
        blurb:
          "يحوّل دورات تقييم الموظفين إلى لوحات تحكم يمكن للفريق التصرف بناءً عليها، بدل جداول لا يفتحها أحد مرتين.",
        role: "مطور ويب شامل",
        year: "٢٠٢٤",
        stack: ["Angular", "Django", "PostgreSQL"],
      },
      {
        n: "٠٥",
        title: "Jafy",
        kicker: "أثاث راقٍ، أونلاين",
        blurb:
          "متجر أثاث وإضاءة يُتصفَّح كأنه كتالوج — صور كبيرة، وإيقاع هادئ، وإتمام شراء لا يعترض الطريق.",
        role: "مطور واجهات أمامية",
        year: "٢٠٢٤",
        stack: ["Angular", "TypeScript"],
      },
      {
        n: "٠٦",
        title: "كلية التمريض — جامعة دمنهور",
        kicker: "كلية حكومية، أونلاين",
        blurb:
          "الموقع الرسمي للكلية: ثنائي اللغة، مقروء على الأجهزة القديمة والاتصالات البطيئة، مبني ليبقى صالحًا لعقد كامل.",
        role: "مطور واجهات أمامية",
        year: "٢٠٢٤",
        stack: ["Angular", "Responsive"],
      },
      {
        n: "٠٧",
        title: "Dr. Genedy",
        kicker: "عيادة تبعث على الثقة",
        blurb:
          "موقع لعيادة جراحة وتجميل، مبني حول مساعدة المريض على اختيار الإجراء المناسب والحجز بثقة.",
        role: "مطور واجهات أمامية",
        year: "٢٠٢٤",
        stack: ["Angular", "SCSS"],
      },
    ],
    offline_note: "الموقع غير متاح",
  },
  principles: {
    eyebrow: "طريقتي في العمل",
    headline_pre: "ثلاثة مبادئ ",
    headline_em: "أؤمن",
    headline_post: " بها فعلًا.",
    items: [
      {
        n: "٠١",
        title: "الصحيح قبل الذكي.",
        body: "سعر تقادم بصمت أسوأ من غياب السعر تمامًا. أفضّل أن أنفق الأسبوع على حالات الفشل بدل الحركة البصرية.",
        anchor: "EG-Pricey · البيانات الحية",
      },
      {
        n: "٠٢",
        title: "العربية ليست ترجمة.",
        body: "الاتجاه من اليمين لليسار يغيّر التخطيط والطباعة والأرقام، لا النص وحده. أبني الاتجاهين من نظام واحد كي لا يكون أحدهما لاحقًا.",
        anchor: "TileGreen · هذا الموقع",
      },
      {
        n: "٠٣",
        title: "اشترِ الأجزاء الصعبة.",
        body: "الضرائب والامتثال وحركة الروبوتات مسائل محلولة يملكها آخرون. ألجأ إلى بائع مسجَّل ووسيط حافة قبل أن أكتب بديلًا بنفسي.",
        anchor: "XTranslator · الفوترة",
      },
    ],
    tools_label: "ما أستخدمه",
    tools: [
      ["الواجهة الأمامية", "Angular · TypeScript · Tailwind"],
      ["الواجهة الخلفية", "Node.js · Express · Django"],
      ["البيانات", "MongoDB · PostgreSQL · Redis"],
      ["البنية التحتية", "Docker · Cloudflare · Linux VPS"],
    ],
  },
  about: {
    eyebrow: "نبذة",
    headline_pre: "القاهرة. ",
    headline_em: "أبني",
    headline_post: " منذ ٢٠٢٣.",
    p1: "أنا يوسف. أبني منتجات ويب من أولها إلى آخرها — حاليًا مع The POST، وبشكل مستقل لعملاء يريدون عملًا مُتقنًا لا سريعًا.",
    p2: "معظم عملي منصات بيانات حية ومنتجات اشتراك ولوحات تحكم داخلية. Angular وNode افتراضيًا، وDjango وPostgres حين يستحق نموذج البيانات ذلك.",
    p3: "يهمني ما يشعر به الناس فعلًا: زمن التحميل الأول، ونماذج لا تضيّع ما كتبته، وعربية تتصرف كلغة أصلية لا كانعكاس لاحق.",
  },
  cv: {
    eyebrow: "السيرة الذاتية",
    headline_pre: "على ",
    headline_em: "الورق",
    headline_post: ".",
    download: "تحميل السيرة الذاتية كاملة (PDF)",
    rows: [
      {
        years: "٢٠٢٥ — الآن",
        role: "مطور ويب شامل",
        org: "The POST",
        loc: "عن بُعد",
        tags: ["Angular", "Node", "Mongo", "TS"],
        blurb:
          "أدوات داخلية ولوحات تحليلات وبوابات للعملاء، تُطلق على دفعات أسبوعية بالعمل مع فريق صغير.",
      },
      {
        years: "٢٠٢٤ — ٢٥",
        role: "مطور مستقل",
        org: "Upwork · Fiverr · خمسات",
        loc: "عن بُعد",
        tags: ["Angular", "Django", "Node"],
        blurb:
          "مشاريع تعاقدية في بلدان وصناعات مختلفة — تعلّمت فيها تقدير النطاق بصدق، وطرح السؤال المحرج مبكرًا، والتسليم في الموعد الذي أعطيته.",
      },
      {
        years: "٢٠٢٣",
        role: "تدريب احترافي شامل",
        org: "المعهد القومي للاتصالات (NTI)",
        loc: "القاهرة",
        tags: ["JS", "MEAN"],
        blurb:
          "برنامج مركّز في تطوير الويب الحديث، من الواجهة الأمامية حتى نشر الخوادم وتأمينها.",
      },
      {
        years: "٢٠٢٠ — ٢٥",
        role: "بكالوريوس علوم الحاسب",
        org: "معهد القاهرة العالي",
        loc: "القاهرة",
        tags: ["CS", "Software"],
        blurb: "هندسة البرمجيات والخوارزميات وقواعد البيانات وتطوير الويب.",
      },
    ],
  },
  contact: {
    eyebrow: "تواصل",
    headline_a: "لنبنِ شيئًا ",
    headline_em: "جيدًا",
    headline_b: ".",
    lead: "أخبرني باختصار بما تبنيه، وموعدك، والنطاق التقريبي للميزانية. أقرأ كل رسالة بنفسي وأرد خلال يوم.",
    details_label: "مباشر",
    rows: [
      ["البريد", "youseeftareq5176@gmail.com", "mailto:youseeftareq5176@gmail.com"],
      ["واتساب", "+20 155 733 7989", "https://wa.me/201557337989"],
      ["لينكدإن", "/in/youseef-tareq", "https://linkedin.com/in/youseef-tareq"],
      ["ديسكورد", "soking_", null],
      ["المقر", "القاهرة · عن بُعد حول العالم", null],
    ],
    availability: "متاح لمشاريع جديدة · أرد خلال ٢٤ ساعة",
    form_label: "استفسار عن مشروع",
    f_name: "اسمك",
    f_name_p: "مثال: سارة أحمد",
    f_email: "البريد الإلكتروني",
    f_email_p: "sarah@company.com",
    f_msg: "ما الذي تبنيه؟",
    f_msg_p: "بضعة أسطر تكفي — ماذا، ومتى، وما حجمه تقريبًا.",
    f_send: "إرسال الرسالة",
    sending: "جارٍ الإرسال…",
    e_required: "مطلوب",
    e_email: "يرجى إدخال بريد إلكتروني صحيح",
    e_msg: "بضع كلمات أخرى من فضلك",
    e_submit: "تعذّر الإرسال. حاول مجددًا أو راسلني مباشرة.",
    sent_label: "تم إرسال الرسالة",
    sent_title: (name: string) => `شكرًا لك، ${name}.`,
    sent_body:
      "سأرد من youseeftareq5176@gmail.com خلال يوم. وللأمور العاجلة، واتساب أسرع.",
    sent_again: "إرسال رسالة أخرى",
  },
  footer: {
    identity_tagline: "مهندس ويب شامل · القاهرة",
    index_label: "تصفّح",
    elsewhere_label: "في أماكن أخرى",
    direct_label: "مباشر",
    colophon_text:
      "مصمَّم ومبني بالكامل. ثنائي اللغة، فاتح وداكن، بلا تتبّع ولا كوكيز ولا نوافذ منبثقة.",
    copyright: "© ٢٠٢٦ يوسف طارق",
    to_top: "العودة إلى الأعلى",
  },
  misc: {
    visit_project: "زيارة الموقع",
    screenshot_alt: (title: string) => `لقطة شاشة من موقع ${title}`,
  },
};

export const STRINGS: Record<Lang, Strings> = { en, ar };
