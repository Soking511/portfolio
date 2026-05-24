export type Lang = "en" | "ar";

export type Strings = {
  dir: "ltr" | "rtl";
  nav: {
    items: Array<[string, string]>;
    available: string;
    langLabel: string;
  };
  hero: {
    employment_label: string;
    employment: string[];
    eyebrow: string;
    since: string;
    available: string;
    name: string;
    headline_pre: string;
    headline_em: string;
    headline_post: string;
    sub_label: string;
    sub_text_a: string;
    sub_text_b: string;
    glance_title: string;
    glance_rows: Array<[string, string]>;
    cta_works: string;
    cta_contact: string;
    resume: string;
  };
  about: {
    eyebrow: string;
    sub: string;
    headline_a: string;
    headline_em: string;
    headline_b: string;
    p1: string;
    p2: string;
    p3: string;
    stats: Array<[string, string]>;
  };
  works: {
    eyebrow: string;
    sub: string;
    headline_a: string;
    headline_em: string;
    headline_b: string;
    intro: string;
    role_label: string;
    items: Array<{
      n: string;
      title: string;
      kicker: string;
      blurb: string;
      role: string;
      year: string;
      stack: string[];
      tags: string[];
    }>;
  };
  stack: {
    eyebrow: string;
    sub: string;
    headline_pre: string;
    headline_em: string;
    headline_post: string;
    intro: string;
    groups: Array<{ label: string; items: Array<[string, string]> }>;
    extras_label: string;
    extras: string[];
  };
  cv: {
    eyebrow: string;
    sub: string;
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
    sub: string;
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
    closing_label: string;
    closing_a: string;
    closing_em: string;
    closing_b: string;
    closing_cta: string;
    closing_or: string;
    identity_label: string;
    identity_name: string;
    identity_tagline: string;
    availability_label: string;
    availability_window: string;
    monogram_rows: Array<[string, string]>;
    colophon_label: string;
    colophon_text: string;
    index_label: string;
    elsewhere_label: string;
    direct_label: string;
    direct_note: string;
    copyright: string;
    last_shipped: string;
    to_top: string;
  };
  misc: {
    visit_project: string;
  };
};

export const STRINGS: Record<Lang, Strings> = {
  en: {
    dir: "ltr",
    nav: {
      items: [
        ["Home", "#index"],
        ["About", "#about"],
        ["Work", "#works"],
        ["Skills", "#stack"],
        ["Résumé", "#cv"],
        ["Contact", "#contact"],
      ],
      available: "Available",
      langLabel: "العربية",
    },
    hero: {
      employment_label: "Employment",
      employment: ["The POST", "Damanhour University"],
      eyebrow: "01 / HOME",
      since: "WORKING WITH CLIENTS SINCE 2023",
      available: "AVAILABLE FOR NEW PROJECTS",
      name: "Youseef Tareq",
      headline_pre: "I build ",
      headline_em: "fast, beautiful websites",
      headline_post: " that help your business grow.",
      sub_label: "In short",
      sub_text_a:
        "Full-stack web developer based in Cairo. I help startups, agencies, and small businesses ship reliable, well-designed software — from a simple marketing site to a full SaaS platform.",
      sub_text_b:
        "Three years in. Fifteen-plus shipped projects. Honest pricing, clear communication, on-time delivery.",
      glance_title: "At a glance",
      glance_rows: [
        ["Role", "Full-Stack Web Developer"],
        ["Best for", "Startups · SaaS · E-commerce · Dashboards"],
        ["Languages", "English · Arabic (with RTL support)"],
        ["Tools", "Angular · Node.js · TypeScript · MongoDB"],
        ["Reply time", "Within 24 hours, weekdays"],
      ],
      cta_works: "See my work",
      cta_contact: "Request a quote",
      resume: "↓ Download résumé (PDF)",
    },
    about: {
      eyebrow: "02 / ABOUT",
      sub: "A LITTLE ABOUT ME",
      headline_a: "I make the web ",
      headline_em: "work harder",
      headline_b: " for your business.",
      p1:
        "Hi, I’m Youseef — a full-stack web developer working out of Cairo. I currently develop with The POST, and I take on independent projects with clients around the world.",
      p2:
        "I specialize in three things: e-commerce stores that convert, dashboards that make data easy to read, and platforms that need to handle traffic without breaking a sweat. I write clean, modern code that’s easy to update later — so you’re never locked in.",
      p3:
        "Most importantly, I care about how the work feels to use. Fast load times. Clear layouts. Properly working Arabic. Designs that look good on a phone, a laptop, and a 4K monitor.",
      stats: [
        ["3+", "Years of experience"],
        ["15+", "Projects delivered"],
        ["7", "Featured below"],
        ["100%", "On-time delivery"],
      ],
    },
    works: {
      eyebrow: "03 / WORK",
      sub: "SCROLL HORIZONTALLY — 7 PROJECTS",
      headline_a: "Recent ",
      headline_em: "work",
      headline_b: ", 2024 — 2026",
      intro:
        "A selection of real projects I’ve shipped for clients and teams. Drag, scroll, or use the arrows.",
      role_label: "My role",
      items: [
        {
          n: "01",
          title: "EG-Pricey",
          kicker: "Real-time prices for the Egyptian market",
          blurb:
            "A live tracker for currencies, gold, fuel, and food prices in Egypt — plus interactive calculators for loans and investments. Always up-to-date, always fast.",
          role: "Lead developer · Full project",
          year: "2025",
          stack: ["MongoDB", "Express", "Angular", "Node.js", "Sockets"],
          tags: ["Live data", "Finance"],
        },
        {
          n: "02",
          title: "XTranslator",
          kicker: "A translation platform for the world",
          blurb:
            "A subscription translation service supporting many languages and regions. Secure global payments and traffic protection — ready to scale on day one.",
          role: "Full project",
          year: "2025",
          stack: ["Lemon Squeezy", "Angular", "Node.js"],
          tags: ["SaaS", "Payments"],
        },
        {
          n: "03",
          title: "TileGreen",
          kicker: "A startup with a real mission",
          blurb:
            "The official website for an Egyptian startup turning plastic waste into building tiles. Designed to attract investors, customers, and press — not just clicks.",
          role: "Front-end developer",
          year: "2024",
          stack: ["Angular", "SCSS", "Motion"],
          tags: ["Brand", "Startup"],
        },
        {
          n: "04",
          title: "UFeed",
          kicker: "HR analytics, made simple",
          blurb:
            "A platform that automates employee evaluations and turns HR data into clear, useful dashboards. Built for teams that need to make decisions with confidence.",
          role: "Full-stack developer",
          year: "2024",
          stack: ["Angular", "Django", "PostgreSQL"],
          tags: ["Dashboards", "HR"],
        },
        {
          n: "05",
          title: "Jafy",
          kicker: "A premium furniture brand online",
          blurb:
            "An online store that feels like flipping through a beautiful magazine — big imagery, calm layouts, smooth browsing, and a checkout that just works.",
          role: "Front-end developer",
          year: "2024",
          stack: ["Angular", "TypeScript"],
          tags: ["E-commerce", "Brand"],
        },
        {
          n: "06",
          title: "Dr. Genedy",
          kicker: "Trust, for a medical clinic",
          blurb:
            "A medical and aesthetic surgery website that feels professional, calming, and trustworthy — helping patients find the right service and book with confidence.",
          role: "Front-end developer",
          year: "2024",
          stack: ["Angular", "SCSS"],
          tags: ["Healthcare"],
        },
        {
          n: "07",
          title: "Faculty of Nursing — DMU",
          kicker: "A university, online",
          blurb:
            "The official website for the Faculty of Nursing at Damanhour University. Built to last for a decade, work on any device, and present the institution clearly.",
          role: "Front-end developer",
          year: "2024",
          stack: ["Angular", "Responsive"],
          tags: ["Education", "Institution"],
        },
      ],
    },
    stack: {
      eyebrow: "04 / SKILLS",
      sub: "WHAT I WORK WITH",
      headline_pre: "A toolkit I ",
      headline_em: "trust",
      headline_post: ".",
      intro:
        "Modern, proven tools — the same ones used by Google, Microsoft, and many of the websites you visit every day. I pick what fits your project, not what’s trendy this week.",
      groups: [
        {
          label: "Front-end (what people see)",
          items: [
            ["Angular", "My main framework"],
            ["TypeScript", "For reliable code"],
            ["Tailwind CSS", "For polished design"],
          ],
        },
        {
          label: "Back-end (what powers it)",
          items: [
            ["Node.js", "Fast, modern servers"],
            ["Express", "Clean APIs"],
            ["Django", "When the project needs it"],
          ],
        },
        {
          label: "Data (how it’s stored)",
          items: [
            ["MongoDB", "Flexible data"],
            ["PostgreSQL", "For strict structures"],
            ["Redis", "For speed & safety"],
          ],
        },
        {
          label: "Hosting (where it lives)",
          items: [
            ["Docker", "Easy deployment"],
            ["Cloudflare", "Speed & protection"],
            ["Linux VPS", "Full control"],
          ],
        },
      ],
      extras_label: "Also comfortable with",
      extras: [
        "Sockets",
        "Lemon Squeezy",
        "Stripe",
        "Framer Motion",
        "Lua",
        "C# / .NET",
        "SCSS",
        "Vite",
        "GitHub Actions",
      ],
    },
    cv: {
      eyebrow: "05 / RÉSUMÉ",
      sub: "EXPERIENCE & EDUCATION",
      headline_pre: "On ",
      headline_em: "paper",
      headline_post: ".",
      download: "↓ Download full résumé (PDF)",
      rows: [
        {
          years: "2025 — Now",
          role: "Full-Stack Developer",
          org: "The POST",
          loc: "Remote",
          tags: ["Angular", "Node", "Mongo", "TS"],
          blurb:
            "Working with a team to build internal tools, analytics dashboards, and customer-facing portals. Shipping new features every week without compromising on quality.",
        },
        {
          years: "2024 — 25",
          role: "Freelance Developer",
          org: "Upwork · Fiverr · Khamsat",
          loc: "Remote",
          tags: ["Angular", "Django", "Node"],
          blurb:
            "Delivered a wide range of contract projects for clients across many countries and industries. Learned to listen carefully, communicate clearly, and ship reliably.",
        },
        {
          years: "2023",
          role: "Full-Stack Training",
          org: "NTI · National Telecom Institute",
          loc: "Cairo",
          tags: ["JS", "MEAN"],
          blurb:
            "A focused program on modern web development — covering everything from front-end design to server deployment and security.",
        },
        {
          years: "2020 — 25",
          role: "B.Sc. Computer Science",
          org: "Cairo Higher Institute",
          loc: "Cairo",
          tags: ["CS", "Software"],
          blurb:
            "A four-year degree in computer science, covering software engineering, algorithms, databases, and web development.",
        },
      ],
    },
    contact: {
      eyebrow: "06 / CONTACT",
      sub: "AVAILABLE FOR PROJECTS, Q3 — Q4 2026",
      headline_a: "Let’s build something ",
      headline_em: "great",
      headline_b: " together.",
      lead:
        "Have a project in mind? Tell me a little about it — budget range, timeline, what you’re trying to build. I read every message personally and reply within a day.",
      details_label: "Direct contact",
      rows: [
        ["Email", "youseeftareq5176@gmail.com", "mailto:youseeftareq5176@gmail.com"],
        ["WhatsApp", "+20 155 733 7989", "https://wa.me/201557337989"],
        ["Discord", "soking_", null],
        ["LinkedIn", "/in/youseef-tareq", "https://linkedin.com/in/youseef-tareq"],
        ["Based", "Cairo · Remote worldwide", null],
      ],
      availability: "Currently available · I reply within 24 hours",
      form_label: "Project enquiry",
      f_name: "Your name",
      f_name_p: "e.g. Sarah Chen",
      f_email: "Email",
      f_email_p: "sarah@company.com",
      f_msg: "Tell me about your project",
      f_msg_p: "A few lines is plenty — what, when, and roughly how big.",
      f_send: "Send message",
      sending: "Sending…",
      e_required: "Required",
      e_email: "Please enter a valid email",
      e_msg: "A few more words, please",
      e_submit: "Could not send. Try again or email me directly.",
      sent_label: "● MESSAGE SENT",
      sent_title: (name: string) => `Thanks, ${name}.`,
      sent_body:
        "I’ll get back to you from youseeftareq5176@gmail.com within a day. For anything urgent, WhatsApp is fastest.",
      sent_again: "Send another →",
    },
    footer: {
      closing_label: "● CLOSING NOTE",
      closing_a: "Taking on ",
      closing_em: "a few",
      closing_b: " new projects for Q3 — Q4 2026.",
      closing_cta: "Start a conversation",
      closing_or: "or use the form above",
      identity_label: "Identity card",
      identity_name: "Youseef Tareq",
      identity_tagline: "Full-stack web developer building reliable digital products.",
      availability_label: "Available",
      availability_window: "Q3 — Q4 2026",
      monogram_rows: [
        ["Name", "Youseef Tareq · Full-Stack Developer"],
        ["Based in", "Cairo · GMT+2"],
        ["Email", "youseeftareq5176@gmail.com"],
      ],
      colophon_label: "Colophon",
      colophon_text:
        "Designed and built end-to-end. Bilingual (English & العربية), light and dark themes, fully responsive. No analytics. No cookies. No pop-ups.",
      index_label: "Navigate",
      elsewhere_label: "Find me on",
      direct_label: "Or directly",
      direct_note: "or scroll up to the form",
      copyright: "© 2026 Youseef Tareq · All rights reserved",
      last_shipped: "v26.05 · Last updated",
      to_top: "↑ Back to top",
    },
    misc: {
      visit_project: "Visit live ↗",
    },
  },

  ar: {
    dir: "rtl",
    nav: {
      items: [
        ["الرئيسية", "#index"],
        ["عني", "#about"],
        ["أعمالي", "#works"],
        ["مهاراتي", "#stack"],
        ["السيرة الذاتية", "#cv"],
        ["تواصل", "#contact"],
      ],
      available: "متاح",
      langLabel: "EN",
    },
    hero: {
      employment_label: "العمل",
      employment: ["The POST", "جامعة دمنهور"],
      eyebrow: "01 / الرئيسية",
      since: "أعمل مع العملاء منذ 2023",
      available: "متاح لاستقبال مشاريع جديدة",
      name: "يوسف طارق",
      headline_pre: "أبني مواقع وتطبيقات ويب ",
      headline_em: "سريعة وجميلة",
      headline_post: " تساعد عملك على النمو.",
      sub_label: "باختصار",
      sub_text_a:
        "مطور ويب شامل من القاهرة. أساعد الشركات الناشئة والوكالات والأعمال الصغيرة على إطلاق منتجات رقمية موثوقة ومصممة بإتقان — من موقع تعريفي بسيط إلى منصة كاملة.",
      sub_text_b:
        "ثلاث سنوات من الخبرة. أكثر من خمسة عشر مشروعًا منجزًا. أسعار واضحة، تواصل مباشر، وتسليم في الموعد.",
      glance_title: "لمحة سريعة",
      glance_rows: [
        ["التخصص", "مطور ويب شامل (Full-Stack)"],
        ["الأنسب لـ", "الشركات الناشئة · SaaS · متاجر إلكترونية · لوحات تحكم"],
        ["اللغات", "الإنجليزية · العربية (مع دعم RTL)"],
        ["الأدوات", "Angular · Node.js · TypeScript · MongoDB"],
        ["وقت الرد", "خلال 24 ساعة في أيام العمل"],
      ],
      cta_works: "استعرض أعمالي",
      cta_contact: "اطلب عرض سعر",
      resume: "↓ تحميل السيرة الذاتية (PDF)",
    },
    about: {
      eyebrow: "02 / عني",
      sub: "نبذة عني",
      headline_a: "أجعل الإنترنت يعمل ",
      headline_em: "بشكل أفضل",
      headline_b: " لصالح عملك.",
      p1:
        "مرحبًا، أنا يوسف — مطور ويب شامل من القاهرة. أعمل حاليًا مع The POST، وأتولى مشاريع مستقلة مع عملاء حول العالم.",
      p2:
        "أتخصص في ثلاثة أمور: متاجر إلكترونية تحقق مبيعات حقيقية، ولوحات تحكم تجعل البيانات سهلة الفهم، ومنصات قادرة على التعامل مع أحمال عالية دون مشاكل. أكتب كودًا نظيفًا وحديثًا يسهل تطويره لاحقًا — حتى لا تكون مقيدًا بمطور واحد.",
      p3:
        "والأهم من ذلك أنني أهتم بتجربة المستخدم: سرعة تحميل عالية، تصميم واضح، دعم كامل للغة العربية، وتجربة مثالية على الموبايل وعلى أي شاشة.",
      stats: [
        ["+3", "سنوات من الخبرة"],
        ["+15", "مشروع منجز"],
        ["7", "معروضة في الأسفل"],
        ["100%", "تسليم في الموعد"],
      ],
    },
    works: {
      eyebrow: "03 / الأعمال",
      sub: "تمرير أفقي — 7 مشاريع",
      headline_a: "أحدث ",
      headline_em: "أعمالي",
      headline_b: "، 2024 — 2026",
      intro:
        "مجموعة من المشاريع الحقيقية التي قمت بتنفيذها لعملاء وفرق عمل. اسحب أو مرر أو استخدم الأزرار للتنقل.",
      role_label: "دوري",
      items: [
        {
          n: "01",
          title: "EG-Pricey",
          kicker: "منصة لمتابعة الأسعار في السوق المصري",
          blurb:
            "متابعة لحظية لأسعار العملات والذهب والوقود والمواد الغذائية في مصر، مع حاسبات تفاعلية للقروض والاستثمار. دائمًا محدّث، دائمًا سريع.",
          role: "مطور رئيسي · مشروع كامل",
          year: "2025",
          stack: ["MongoDB", "Express", "Angular", "Node.js", "Sockets"],
          tags: ["بيانات لحظية", "مالية"],
        },
        {
          n: "02",
          title: "XTranslator",
          kicker: "منصة ترجمة عالمية",
          blurb:
            "منصة ترجمة باشتراك تدعم لغات ومناطق متعددة، مع نظام دفع عالمي آمن وحماية ضد إساءة الاستخدام. جاهزة للتوسع منذ اليوم الأول.",
          role: "مشروع كامل",
          year: "2025",
          stack: ["Lemon Squeezy", "Angular", "Node.js"],
          tags: ["SaaS", "مدفوعات"],
        },
        {
          n: "03",
          title: "TileGreen",
          kicker: "شركة ناشئة برسالة حقيقية",
          blurb:
            "الموقع الرسمي لشركة مصرية ناشئة تحوّل النفايات البلاستيكية إلى بلاط بناء. مصمم لجذب المستثمرين والعملاء والصحافة — لا مجرد زيارات.",
          role: "مطور واجهات أمامية",
          year: "2024",
          stack: ["Angular", "SCSS", "Motion"],
          tags: ["هوية", "شركة ناشئة"],
        },
        {
          n: "04",
          title: "UFeed",
          kicker: "تحليلات موارد بشرية بشكل مبسّط",
          blurb:
            "منصة تؤتمت تقييم الموظفين وتحوّل بيانات الموارد البشرية إلى لوحات تحكم واضحة ومفيدة. مصممة للفرق التي تتخذ قرارات مبنية على بيانات حقيقية.",
          role: "مطور شامل",
          year: "2024",
          stack: ["Angular", "Django", "PostgreSQL"],
          tags: ["لوحات تحكم", "موارد بشرية"],
        },
        {
          n: "05",
          title: "Jafy",
          kicker: "علامة أثاث فاخرة على الإنترنت",
          blurb:
            "متجر إلكتروني بإحساس مجلة فاخرة — صور كبيرة، تصميم هادئ، تصفّح سلس، وتجربة شراء بلا تعقيدات.",
          role: "مطور واجهات أمامية",
          year: "2024",
          stack: ["Angular", "TypeScript"],
          tags: ["تجارة إلكترونية", "هوية"],
        },
        {
          n: "06",
          title: "Dr. Genedy",
          kicker: "موقع طبي يبعث على الثقة",
          blurb:
            "موقع لعيادة جراحات تجميلية وطبية بمظهر احترافي وهادئ ومُطمئن — يساعد المرضى على العثور على الخدمة المناسبة والحجز بثقة.",
          role: "مطور واجهات أمامية",
          year: "2024",
          stack: ["Angular", "SCSS"],
          tags: ["صحة"],
        },
        {
          n: "07",
          title: "كلية التمريض — جامعة دمنهور",
          kicker: "موقع جامعي رسمي",
          blurb:
            "الموقع الرسمي لكلية التمريض بجامعة دمنهور. مصمم ليصمد لعقد كامل، ويعمل على أي جهاز، ويقدّم الكلية بشكل واضح ومنظم.",
          role: "مطور واجهات أمامية",
          year: "2024",
          stack: ["Angular", "تصميم متجاوب"],
          tags: ["تعليم", "مؤسسة"],
        },
      ],
    },
    stack: {
      eyebrow: "04 / المهارات",
      sub: "الأدوات التي أعمل بها",
      headline_pre: "مجموعة أدوات ",
      headline_em: "موثوقة",
      headline_post: ".",
      intro:
        "أدوات حديثة ومُجرَّبة — نفس الأدوات التي تستخدمها Google وMicrosoft وكثير من المواقع التي تزورها يوميًا. أختار ما يناسب مشروعك، لا ما هو رائج هذا الأسبوع.",
      groups: [
        {
          label: "الواجهة الأمامية (ما يراه المستخدم)",
          items: [
            ["Angular", "إطار العمل الرئيسي"],
            ["TypeScript", "لكتابة كود موثوق"],
            ["Tailwind CSS", "لتصميم متقن"],
          ],
        },
        {
          label: "الواجهة الخلفية (ما يُشغّلها)",
          items: [
            ["Node.js", "خوادم سريعة وحديثة"],
            ["Express", "واجهات API نظيفة"],
            ["Django", "عند الحاجة إليه"],
          ],
        },
        {
          label: "البيانات (كيف تُخزَّن)",
          items: [
            ["MongoDB", "بيانات مرنة"],
            ["PostgreSQL", "للهياكل الصارمة"],
            ["Redis", "للسرعة والأمان"],
          ],
        },
        {
          label: "الاستضافة (مكان التشغيل)",
          items: [
            ["Docker", "نشر مبسّط"],
            ["Cloudflare", "سرعة وحماية"],
            ["Linux VPS", "تحكم كامل"],
          ],
        },
      ],
      extras_label: "أعمل أيضًا بـ",
      extras: [
        "Sockets",
        "Lemon Squeezy",
        "Stripe",
        "Framer Motion",
        "Lua",
        "C# / .NET",
        "SCSS",
        "Vite",
        "GitHub Actions",
      ],
    },
    cv: {
      eyebrow: "05 / السيرة الذاتية",
      sub: "الخبرات والتعليم",
      headline_pre: "على ",
      headline_em: "الورق",
      headline_post: ".",
      download: "↓ تحميل السيرة الذاتية كاملة (PDF)",
      rows: [
        {
          years: "2025 — حتى الآن",
          role: "مطور ويب شامل",
          org: "The POST",
          loc: "عمل عن بُعد",
          tags: ["Angular", "Node", "Mongo", "TS"],
          blurb:
            "العمل ضمن فريق على بناء أدوات داخلية ولوحات تحليلات وبوابات للعملاء. شحن ميزات جديدة كل أسبوع دون التنازل عن الجودة.",
        },
        {
          years: "2024 — 25",
          role: "مطور مستقل",
          org: "Upwork · Fiverr · Khamsat",
          loc: "عمل عن بُعد",
          tags: ["Angular", "Django", "Node"],
          blurb:
            "تنفيذ مشاريع متنوعة لعملاء من دول وصناعات مختلفة. تعلمت الاستماع جيدًا، والتواصل بوضوح، والتسليم بثقة.",
        },
        {
          years: "2023",
          role: "تدريب احترافي",
          org: "المعهد القومي للاتصالات (NTI)",
          loc: "القاهرة",
          tags: ["JS", "MEAN"],
          blurb:
            "برنامج مكثف في تطوير الويب الحديث — من تصميم الواجهات إلى نشر الخوادم وتأمينها.",
        },
        {
          years: "2020 — 25",
          role: "بكالوريوس علوم الحاسب",
          org: "معهد القاهرة العالي",
          loc: "القاهرة",
          tags: ["CS", "هندسة برمجيات"],
          blurb:
            "دراسة جامعية أربع سنوات في علوم الحاسب — هندسة برمجيات وخوارزميات وقواعد بيانات وتطوير ويب.",
        },
      ],
    },
    contact: {
      eyebrow: "06 / تواصل",
      sub: "متاح لاستقبال مشاريع، الربع الثالث والرابع 2026",
      headline_a: "لنبني شيئًا ",
      headline_em: "مميزًا",
      headline_b: " معًا.",
      lead:
        "لديك فكرة مشروع؟ أخبرني عنها — الميزانية التقريبية، الجدول الزمني، وما الذي تريد بناءه. أقرأ كل رسالة بنفسي وأرد خلال يوم.",
      details_label: "تواصل مباشر",
      rows: [
        ["البريد", "youseeftareq5176@gmail.com", "mailto:youseeftareq5176@gmail.com"],
        ["واتساب", "+20 155 733 7989", "https://wa.me/201557337989"],
        ["ديسكورد", "soking_", null],
        ["لينكدإن", "/in/youseef-tareq", "https://linkedin.com/in/youseef-tareq"],
        ["الموقع", "القاهرة · عمل عن بُعد عالميًا", null],
      ],
      availability: "متاح حاليًا · أرد خلال 24 ساعة",
      form_label: "نموذج طلب مشروع",
      f_name: "اسمك",
      f_name_p: "مثال: سارة أحمد",
      f_email: "البريد الإلكتروني",
      f_email_p: "sarah@company.com",
      f_msg: "أخبرني عن مشروعك",
      f_msg_p: "بضعة أسطر تكفي — ماذا، ومتى، وحجم تقريبي.",
      f_send: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      e_required: "مطلوب",
      e_email: "الرجاء إدخال بريد إلكتروني صحيح",
      e_msg: "بضع كلمات إضافية من فضلك",
      e_submit: "تعذر الإرسال. حاول مرة أخرى أو راسلني مباشرة.",
      sent_label: "● تم إرسال الرسالة",
      sent_title: (name: string) => `شكرًا لك يا ${name}.`,
      sent_body:
        "سأرد عليك من youseeftareq5176@gmail.com خلال يوم. للحالات العاجلة، واتساب أسرع.",
      sent_again: "إرسال رسالة أخرى →",
    },
    footer: {
      closing_label: "● ملاحظة ختامية",
      closing_a: "مفتوح حاليًا لاستقبال ",
      closing_em: "مشاريع جديدة",
      closing_b: " للربع الثالث والرابع من 2026.",
      closing_cta: "ابدأ المحادثة",
      closing_or: "أو استخدم النموذج بالأعلى",
      identity_label: "بطاقة التعريف",
      identity_name: "يوسف طارق",
      identity_tagline: "مطور ويب شامل، يبني منتجات رقمية موثوقة.",
      availability_label: "متاح",
      availability_window: "Q3 — Q4 2026",
      monogram_rows: [
        ["الاسم", "يوسف طارق · مطور ويب شامل"],
        ["الموقع", "القاهرة · GMT+2"],
        ["البريد", "youseeftareq5176@gmail.com"],
      ],
      colophon_label: "عن الموقع",
      colophon_text:
        "تصميم وبرمجة كاملة من البداية للنهاية. ثنائي اللغة (إنجليزي وعربي)، وضع فاتح وداكن، يعمل على كل الأجهزة. بدون تتبّع، بدون كوكيز، بدون نوافذ منبثقة.",
      index_label: "الأقسام",
      elsewhere_label: "تابعني",
      direct_label: "تواصل مباشر",
      direct_note: "أو ارجع للأعلى للنموذج",
      copyright: "© 2026 يوسف طارق · جميع الحقوق محفوظة",
      last_shipped: "الإصدار 26.05 · آخر تحديث",
      to_top: "↑ للأعلى",
    },
    misc: {
      visit_project: "زيارة الموقع ↗",
    },
  },
};
