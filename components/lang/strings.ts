import {
  EMAIL,
  GITHUB_DISPLAY,
  GITHUB_URL,
  LINKEDIN_DISPLAY,
  LINKEDIN_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/site";
import type { Budget, Intent, Timeline } from "@/lib/contact";
import type { ProjectStatus } from "@/lib/projects";

export type Lang = "en" | "ar";

/** A real quote from a real person. The section is not rendered while empty. */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Project slug from lib/projects.ts, so a case study can show its own quote. */
  project?: string;
};

/** An architecture diagram, drawn as a list of stages. */
export type Diagram = {
  caption: string;
  /** `bought` marks a third-party service rather than something I built. */
  nodes: Array<{ name: string; note: string; bought?: boolean }>;
};

/**
 * A featured project: what it is, what was built, what I personally did, and
 * the one decision that mattered. Every claim here should match the résumé.
 */
export type FeaturedWork = {
  n: string;
  title: string;
  kicker: string;
  problem: string;
  built: string;
  /** My own part, in plain words, kept apart from what the product is. */
  contribution: string;
  decision: string;
  role: string;
  year: string;
  stack: string[];
  /** Who uses it, or a real, verifiable result. Left undefined until true. */
  outcome?: string;
  /** Long-form sections for the case-study page. Each renders only when filled. */
  caseStudy?: {
    context?: string;
    challenges?: Array<{ title: string; body: string }>;
    differently?: string;
  };
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

/** Something I can build, said plainly, with the projects that show it. */
export type Capability = {
  icon: "app" | "dashboard" | "realtime" | "payments" | "bilingual" | "server";
  title: string;
  body: string;
  /** [project name, anchor id on the home page] — each one a link. */
  proof: Array<[string, string]>;
};

export type Strings = {
  dir: "ltr" | "rtl";
  seo: {
    title: string;
    title_template: string;
    description: string;
    og_alt: string;
  };
  nav: {
    items: Array<[string, string]>;
    /** Contact as a plain link (footer, mobile panel). */
    contact: string;
    /** Contact as the header's call to action. */
    cta: string;
    /** The WhatsApp button in the phone's contact bar. */
    whatsapp: string;
    langLabel: string;
    themeLabel: string;
    menuLabel: string;
    closeLabel: string;
  };
  hero: {
    /** The name in this page's script; the other script is set beneath it. */
    name: string;
    name_alt: string;
    /** Availability as one line, shown above the name on phones. */
    status: string;
    /** One plain sentence: who and what, before anything else. */
    statement: string;
    /** [label, value] — the facts a recruiter scans for in the first seconds. */
    facts: Array<[string, string]>;
    cta_project: string;
    cta_hiring: string;
    /** Written in the *other* language: offered to visitors whose browser prefers it. */
    alt_suggest: string;
  };
  works: {
    title: string;
    intro: string;
    label_problem: string;
    label_built: string;
    label_contribution: string;
    label_decision: string;
    label_role: string;
    label_stack: string;
    outcome_label: string;
    case_study: string;
    featured: FeaturedWork[];
    selected_headline: string;
    selected_note: string;
    selected: SelectedWork[];
    /** Shown instead of a link for anything that is not live. */
    status: Record<Exclude<ProjectStatus, "live" | "source">, string>;
  };
  capabilities: {
    title: string;
    intro: string;
    proof_label: string;
    items: Capability[];
    stack_label: string;
    /** [area, tools] — the stack as plain rows. */
    stack: Array<[string, string]>;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  notes: {
    nav: string;
    title: string;
    intro: string;
    empty: string;
    latest: string;
    all: string;
    cta: string;
    feed: string;
  };
  case: {
    back: string;
    architecture: string;
    context: string;
    challenges: string;
    differently: string;
    gallery: string;
    mobile: string;
    cta_title: string;
    cta_body: string;
    next: string;
  };
  principles: {
    title: string;
    intro: string;
    beliefs_label: string;
    items: Array<{ title: string; body: string; anchor: string }>;
    /** How a project goes: a real sequence, so it is shown as numbered steps. */
    process_title: string;
    steps: string[];
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    portrait_alt: string;
  };
  cv: {
    title: string;
    intro: string;
    download: string;
    recruiter_line: string;
    role_cta: string;
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
    title: string;
    lead: string;
    details_label: string;
    rows: Array<[string, string, string | null]>;
    availability: string;
    copy: string;
    copied: string;
    whatsapp_cta: string;
    whatsapp_href: string;
    booking_cta: string;
    form_label: string;
    intent_label: string;
    intents: Record<Intent, string>;
    budget_label: string;
    budgets: Record<Budget, string>;
    timeline_label: string;
    timelines: Record<Timeline, string>;
    optional: string;
    f_name: string;
    f_name_p: string;
    f_email: string;
    f_email_p: string;
    f_company: string;
    f_company_p: string;
    /** [label, placeholder] for the message field, per intent. */
    f_msg: Record<Intent, [string, string]>;
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
    colophon_text: string;
    copyright: string;
    to_top: string;
  };
  misc: {
    skip: string;
    /** Read by screen readers after a link that opens in a new tab. */
    new_tab: string;
    visit_project: string;
    view_source: string;
    screenshot_alt: (title: string) => string;
    diagrams: Record<"xtranslator" | "eg-pricey" | "menuvista" | "ufeed", Diagram>;
  };
};

const en: Strings = {
  dir: "ltr",
  seo: {
    title: "Youseef Tareq — Software Engineer (MEAN Stack), Cairo",
    title_template: "%s | Youseef Tareq",
    description:
      "Software engineer in Cairo building complete web products with the MEAN stack (MongoDB, Express, Angular, Node.js), in Arabic and English.",
    og_alt: "Youseef Tareq — software engineer, Cairo",
  },
  nav: {
    items: [
      ["Work", "#work"],
      ["Services", "#skills"],
      ["About", "#about"],
      ["Experience", "#cv"],
    ],
    contact: "Contact",
    cta: "Contact me",
    whatsapp: "WhatsApp",
    langLabel: "العربية",
    themeLabel: "Switch between light and dark",
    menuLabel: "Menu",
    closeLabel: "Close",
  },
  hero: {
    name: "Youseef Tareq",
    name_alt: "يوسف طارق",
    status: "Open to projects and full-time roles",
    statement:
      "Software engineer in Cairo. I build complete web products, from the database to the screen, in Arabic and English.",
    facts: [
      ["Open to", "Projects and full-time roles"],
      ["Now", "Full-stack developer at The POST"],
      ["Stack", "MEAN: MongoDB, Express, Angular, Node.js"],
      ["Works in", "Arabic and English, remote or in Cairo"],
    ],
    cta_project: "Start a project",
    cta_hiring: "See my résumé",
    alt_suggest: "هذا الموقع متاح بالعربية",
  },
  works: {
    title: "Work",
    intro: "Six recent projects. Open any one for the full story.",
    label_problem: "The problem",
    label_built: "What it is",
    label_contribution: "My part",
    label_decision: "Key decision",
    label_role: "Role",
    label_stack: "Built with",
    outcome_label: "Used by",
    case_study: "Read the case study",
    featured: [
      {
        n: "01",
        title: "MenuVista",
        kicker: "Digital menus and table ordering for restaurants in Egypt",
        problem:
          "A printed menu is out of date the day prices change, and a QR code that opens a PDF can’t take an order.",
        built:
          "A platform for many restaurants at once. Each gets its own menu in Arabic and English at its own address, opened from a QR code. Diners order from their table without an account, waiters get the orders on their own phones, and owners run menus, branches, staff and their plan from one dashboard.",
        contribution:
          "I built it end to end: the Django back end and data model, the owner dashboard, waiter app and public menus in Angular, the live updates, the subscription plans, and deployment with Docker.",
        decision:
          "Anyone can open a menu link from home, so an order has to prove the diner is at the table. Each order shows a 4-digit code on the diner’s phone; the waiter types it in to accept the order, and five wrong tries lock it. Live updates run over WebSockets, but every screen also checks in every few seconds when the connection drops, because waiters’ phones drop it whenever they’re locked. A lost connection slows an order down; it never stops one.",
        role: "Full-stack developer, whole project",
        year: "2026",
        stack: ["Angular", "Django", "PostgreSQL", "Redis", "WebSockets"],
      },
      {
        n: "02",
        title: "UFeed",
        kicker: "Job evaluation and staff surveys for HR teams",
        outcome: "Companies including Bosta and Breadfast.",
        problem:
          "HR teams grade jobs and survey their staff across spreadsheets and separate tools, and the old UFeed was itself several separate apps.",
        built:
          "One HR platform for companies and their subsidiaries: a job evaluation tool that scores positions into a grading matrix, employee engagement surveys with reports, and a salary survey, in Arabic and English. Each company’s plan decides which of these it gets and how many seats.",
        contribution:
          "At The POST I developed the platform across the Django back end and the Angular app: job evaluation, the engagement surveys and their reports, the plans that switch modules on per company, and the import that brought each client’s data over from the old system.",
        decision:
          "Instead of patching the old apps one by one, the platform was rebuilt as one, and each client’s data was carried across by an import that converts the old exports into the new structure. Companies moved to the new system without starting their evaluations again.",
        role: "Full-stack developer, The POST",
        year: "2025",
        stack: ["Angular", "Django", "PostgreSQL", "Redis"],
      },
      {
        n: "03",
        title: "Damanhour University",
        kicker: "The official websites of the university and its faculties",
        problem:
          "A public university has to present itself, every faculty and their services to students, staff and the public, and many of them open the sites on older phones over slow connections.",
        built:
          "The university’s official site and the sites of all its faculties, in Arabic and English. Each faculty site covers its history and leadership, departments and programmes, services for students and graduates, and its news, and all of them run on the same structure.",
        contribution:
          "I worked across the university site and the faculty sites: the shared structure, connecting the sites to their APIs, and the UI and UX of the services and other parts of the sites.",
        decision:
          "Every faculty site is built on one Angular structure and talks to the same API, so a service or a fix made once can reach every faculty’s site. Speed on older devices and slow connections came first throughout.",
        role: "Front-end developer",
        year: "2025",
        stack: ["Angular", "REST API", "RTL"],
      },
      {
        n: "04",
        title: "EG-Pricey",
        kicker: "Live currency, gold and fuel prices for Egypt",
        problem:
          "People in Egypt check the dollar and gold price several times a day, across a dozen sources that rarely agree.",
        built:
          "One Arabic-first site that tracks currency, gold, fuel and food prices as they change, with loan, investment and savings calculators built on the same data.",
        contribution:
          "I built the whole product: the price API and database, the live updates, the right-to-left Angular interface and the calculators.",
        decision:
          "Prices are pushed to the page the moment they change, instead of the page asking the server every few seconds (WebSockets, not polling). A tab left open all morning stays correct without overloading the server. And because a wrong price is worse than none, the page says so when the connection drops instead of quietly showing an old number.",
        role: "Full-stack developer, whole project",
        year: "2025",
        stack: ["Angular", "Node.js", "Express", "MongoDB", "Socket.IO"],
      },
      {
        n: "05",
        title: "XTranslator",
        kicker: "A subscription translation service, built to sell internationally",
        problem:
          "Selling a subscription to customers in many countries is a tax, currency and fraud problem long before it is a translation problem.",
        built:
          "A translation service for text, documents, images and audio in 41 languages, with user accounts, subscription billing and protection against abuse from day one.",
        contribution:
          "I built the localisation, the subscription billing integration, and the rate limiting and bot filtering that protect the service.",
        decision:
          "Instead of building billing in-house, payments go through Lemon Squeezy as merchant of record. They handle VAT and international tax compliance, which is easy to get wrong. Traffic passes through Cloudflare first, which blocks bots and limits abuse before it reaches the server, so the server itself stays small.",
        role: "Full-stack developer",
        year: "2024",
        stack: ["Angular", "Node.js", "Lemon Squeezy", "Cloudflare"],
      },
      {
        n: "06",
        title: "TileGreen",
        kicker: "The website of a startup turning plastic waste into building materials",
        problem:
          "A climate-tech startup needed a website that would convince investors and industrial buyers.",
        built:
          "The bilingual public site for an Egyptian company that turns non-recyclable plastic into more than 40 building products. It is image-led, and structured around how the technology works rather than around the brand.",
        contribution:
          "I built the front end in English and Arabic, including the page motion that paces the story.",
        decision:
          "English and Arabic share one layout system instead of two separate templates. The Arabic site is the same site, flipped correctly, so the two never drift apart. Motion guides the reader down the page, and stops there.",
        role: "Front-end developer",
        year: "2024",
        stack: ["Angular", "SCSS", "Motion"],
      },
    ],
    selected_headline: "Also shipped",
    selected_note: "Client, employer and personal projects, 2024 – 2025.",
    selected: [
      {
        n: "07",
        title: "Contact Management",
        kicker: "A shared contacts app that prevents editing conflicts",
        blurb:
          "A MEAN-stack app with a secured REST API and an Angular interface. When someone opens a contact it locks for everyone else in real time, and the lock clears itself if they disconnect or go idle.",
        role: "Full-stack developer",
        year: "2025",
        stack: ["Angular", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
      },
      {
        n: "08",
        title: "Jafy",
        kicker: "A furniture and lighting store",
        blurb:
          "An online store for premium furniture and lighting, designed to browse like a printed catalogue: large photography and a calm pace.",
        role: "Front-end developer",
        year: "2024",
        stack: ["Angular", "TypeScript"],
      },
      {
        n: "09",
        title: "Dr. Genedy",
        kicker: "A clinic people can trust",
        blurb:
          "A surgery and aesthetics clinic site built around helping patients find the right procedure and book with confidence.",
        role: "Front-end developer",
        year: "2024",
        stack: ["Angular", "SCSS"],
      },
    ],
    status: {
      private: "Private tool, login required",
      maintenance: "Site under maintenance",
      unreleased: "Not public yet",
      offline: "Site no longer online",
    },
  },
  capabilities: {
    title: "Services",
    intro: "Each one links to a project that shows it.",
    proof_label: "See",
    items: [
      {
        icon: "app",
        title: "Complete web apps",
        body: "Accounts, data, an admin side and the screens people use, built end to end.",
        proof: [["MenuVista", "menuvista"], ["EG-Pricey", "eg-pricey"], ["Contact Management", "contact-management"]],
      },
      {
        icon: "dashboard",
        title: "Dashboards and internal tools",
        body: "Scattered data turned into screens a team can act on.",
        proof: [["UFeed", "ufeed"]],
      },
      {
        icon: "realtime",
        title: "Live, real-time features",
        body: "Prices, alerts and shared editing that update without a refresh.",
        proof: [["MenuVista", "menuvista"], ["EG-Pricey", "eg-pricey"], ["Contact Management", "contact-management"]],
      },
      {
        icon: "payments",
        title: "Subscriptions and payments",
        body: "Plans and billing that handle tax and customers abroad.",
        proof: [["XTranslator", "xtranslator"]],
      },
      {
        icon: "bilingual",
        title: "Arabic and English products",
        body: "Right-to-left done properly: one product in two languages.",
        proof: [["MenuVista", "menuvista"], ["TileGreen", "tilegreen"], ["EG-Pricey", "eg-pricey"]],
      },
      {
        icon: "server",
        title: "APIs, hosting and security",
        body: "Secure APIs, sign-in and bot protection, running on real servers.",
        proof: [["XTranslator", "xtranslator"], ["Contact Management", "contact-management"]],
      },
    ],
    stack_label: "Tools I use",
    stack: [
      ["Front end", "Angular, TypeScript, Tailwind"],
      ["Back end", "Node.js, Express, Django"],
      ["Data", "MongoDB, PostgreSQL, Redis"],
      ["Hosting", "Docker, Cloudflare, Linux servers"],
    ],
  },
  testimonials: {
    title: "What clients say",
    items: [],
  },
  notes: {
    nav: "Notes",
    title: "Notes",
    intro: "Longer versions of the decisions on this site: what I tried, what broke, and what I’d keep.",
    empty: "The first note is on its way.",
    latest: "Latest notes",
    all: "All notes",
    cta: "Working on something like this?",
    feed: "RSS feed",
  },
  case: {
    back: "All work",
    architecture: "How it fits together",
    context: "Context",
    challenges: "What was hard",
    differently: "What I’d do differently",
    gallery: "On a phone",
    mobile: "Phone",
    cta_title: "Want something like {project}?",
    cta_body: "Tell me what you’re building. If you’re hiring, tell me about the role.",
    next: "Next case study",
  },
  principles: {
    title: "How I work",
    intro: "What I believe about building software, and how working with me goes.",
    beliefs_label: "What I believe",
    items: [
      {
        title: "Correct beats clever.",
        body: "A stale price is worse than no price. I work on what happens when things fail before anything else.",
        anchor: "In practice: EG-Pricey’s live prices",
      },
      {
        title: "Arabic is not a translation.",
        body: "Right-to-left changes layout, type and numbers. Both languages come from one system, so neither is an afterthought.",
        anchor: "In practice: TileGreen, and this site",
      },
      {
        title: "Buy the hard parts.",
        body: "Tax, payments and bot traffic are solved problems. I use proven services and spend the time on what makes the product different.",
        anchor: "In practice: XTranslator’s billing",
      },
    ],

    process_title: "How a project goes",
    steps: [
      "We talk through the problem.",
      "I write down what gets built and when.",
      "You try working versions as I go.",
      "After launch I stay reachable.",
    ],
  },
  about: {
    title: "I like owning the whole problem",
    p1: "I’m Youseef Tareq, a software engineer in Cairo. I studied computer science at Cairo Higher Institute, trained on the MEAN stack at NTI, and freelanced for clients in several countries before joining The POST as a full-stack developer.",
    p2: "Freelancing taught me the part of the job that isn’t code: scoping honestly, asking the awkward question early, and delivering on the date I gave. At The POST I build internal tools, dashboards and customer portals with a small remote team, shipping every week.",
    p3: "I care most about what people feel even when they never see it: pages that load fast, forms that don’t lose your work, prices that are never quietly wrong, and Arabic that reads as if it was written first.",
    portrait_alt: "Portrait of Youseef Tareq",
  },
  cv: {
    title: "Experience",
    intro: "Where I’ve worked and studied, newest first.",
    download: "Download résumé (PDF)",
    recruiter_line: "Open to full-time roles, remote or on-site in Cairo.",
    role_cta: "Talk about a role",
    rows: [
      {
        years: "2025–now",
        role: "Full-Stack Developer",
        org: "The POST",
        loc: "Remote",
        tags: ["Angular", "Node.js", "MongoDB", "TypeScript"],
        blurb:
          "Internal tools, analytics dashboards and customer-facing portals, shipped in weekly increments with a small remote product team. Built UFeed, an HR evaluation platform.",
      },
      {
        years: "2024–25",
        role: "Freelance Full-Stack Developer",
        org: "Upwork, Fiverr and Khamsat",
        loc: "Remote",
        tags: ["MEAN", "Django", "C#", "Lua"],
        blurb:
          "Web and desktop applications for clients across several countries and industries. Where I learned to scope honestly, ask the awkward question early, and deliver on the agreed date.",
      },
      {
        years: "2023",
        role: "Full-Stack Web Development (MEAN)",
        org: "National Telecommunication Institute (NTI)",
        loc: "Cairo",
        tags: ["MongoDB", "Express", "Angular", "Node.js"],
        blurb:
          "An intensive programme covering the MEAN stack end to end, from the interface through server deployment and security.",
      },
      {
        years: "2020–25",
        role: "B.Sc. Computer Science",
        org: "Cairo Higher Institute",
        loc: "Cairo",
        tags: ["Algorithms", "Databases"],
        blurb: "Software engineering, algorithms, databases and web development.",
      },
    ],
  },
  contact: {
    title: "Contact",
    lead: "Tell me about a project, a role or a question. A few lines is enough. I read every message myself and reply within a day.",
    details_label: "Direct",
    rows: [
      ["Email", EMAIL, `mailto:${EMAIL}`],
      ["WhatsApp", WHATSAPP_DISPLAY, whatsappLink()],
      ["LinkedIn", LINKEDIN_DISPLAY, LINKEDIN_URL],
      ["GitHub", GITHUB_DISPLAY, GITHUB_URL],
      ["Based", "Cairo, and remote worldwide", null],
    ],
    availability: "Available for projects and roles. I reply within a day.",
    copy: "Copy",
    copied: "Copied",
    whatsapp_cta: "Message on WhatsApp",
    whatsapp_href: whatsappLink("Hi Youseef, I found you through soking.digital."),
    booking_cta: "Book a 20-minute call",
    form_label: "Send a message",
    intent_label: "I’m getting in touch about",
    intents: { project: "A project", role: "A full-time role", other: "Something else" },
    budget_label: "Budget (USD)",
    budgets: {
      lt1k: "Under $1k",
      "1-3k": "$1k – 3k",
      "3-8k": "$3k – 8k",
      "8k+": "$8k +",
      unsure: "Not sure yet",
    },
    timeline_label: "Timeline",
    timelines: { asap: "As soon as possible", "1-3m": "1 – 3 months", flexible: "Flexible" },
    optional: "optional",
    f_name: "Your name",
    f_name_p: "e.g. Sarah Chen",
    f_email: "Email",
    f_email_p: "sarah@company.com",
    f_company: "Company",
    f_company_p: "Where is the role?",
    f_msg: {
      project: [
        "What are you building?",
        "What it is, who it’s for, and anything already built…",
      ],
      role: [
        "Tell me about the role",
        "Team, stack, remote or on-site, and a link to the posting…",
      ],
      other: ["Your message", "What’s on your mind?"],
    },
    f_send: "Send message",
    sending: "Sending…",
    e_required: "Please fill this in",
    e_email: "Please enter a valid email address",
    e_msg: "A few more words, please",
    e_submit: "Your message couldn’t be sent. Please try again, or email me directly.",
    sent_label: "Message sent",
    sent_title: (name: string) => `Thanks, ${name}.`,
    sent_body: `I’ll reply from ${EMAIL} within a day. For anything urgent, WhatsApp is fastest.`,
    sent_again: "Send another",
  },
  footer: {
    identity_tagline: "Software engineer in Cairo, working with the MEAN stack",
    colophon_text:
      "Designed and built by me, with no cookies.",
    copyright: "© 2026 Youseef Tareq",
    to_top: "Back to top",
  },
  misc: {
    skip: "Skip to content",
    new_tab: "(opens in a new tab)",
    visit_project: "Visit live site",
    view_source: "View source on GitHub",
    screenshot_alt: (title: string) => `Screenshot of the ${title} website`,
    diagrams: {
      ufeed: {
        caption: "How a company’s data moves through UFeed. Its plan decides which modules it sees.",
        nodes: [
          { name: "Company and subsidiaries", note: "Departments, positions and employees, with seats set by the company’s plan" },
          { name: "Job evaluation", note: "Each position scored factor by factor into a grading matrix" },
          { name: "Engagement surveys", note: "Built in Arabic or English, sent to employees and collected" },
          { name: "Reports and dashboards", note: "Results per company and per survey, ready to act on" },
        ],
      },
      menuvista: {
        caption: "How an order travels. Every screen also checks in on its own, so a dropped connection slows an order down but never stops it.",
        nodes: [
          { name: "Diner’s phone", note: "Opens the menu from the table’s QR code and sends the order, no account needed" },
          { name: "Django API", note: "Checks the branch can take orders now, saves the order and issues a 4-digit code" },
          { name: "Redis + WebSockets", note: "Tells the waiters’ phones at once, with a push notification if a phone is locked" },
          { name: "Waiter’s phone", note: "The waiter types the code shown on the diner’s phone, which proves they’re at the table" },
        ],
      },
      "eg-pricey": {
        caption: "Prices are pushed to the page as they change, so a tab left open all morning stays correct.",
        nodes: [
          {
            name: "Price sources",
            note: "Currencies, gold, fuel and food, from sources that rarely agree",
          },
          { name: "Node.js + Express", note: "The API, with prices kept in MongoDB" },
          { name: "Socket.IO", note: "Pushes every change to every open tab instead of polling" },
          {
            name: "Angular app",
            note: "Arabic-first and RTL; announces a reconnect rather than show a stale price",
          },
        ],
      },
      xtranslator: {
        caption: "How a request travels. The highlighted stages are bought, not rebuilt.",
        nodes: [
          { name: "Angular app", note: "Accounts and the translation interface" },
          { name: "Cloudflare", note: "Rate limiting and bot filtering at the edge", bought: true },
          { name: "Node.js API", note: "The translation service, a small server behind Cloudflare" },
          {
            name: "Lemon Squeezy",
            note: "Merchant of record: subscriptions, VAT, cross-border compliance",
            bought: true,
          },
        ],
      },
    },
  },
};

const ar: Strings = {
  dir: "rtl",
  seo: {
    title: "يوسف طارق — مهندس برمجيات (MEAN Stack)، القاهرة",
    title_template: "%s | يوسف طارق",
    description:
      "مهندس برمجيات من القاهرة يبني منتجات ويب متكاملة بتقنيات MEAN، بالعربية والإنجليزية.",
    og_alt: "يوسف طارق — مهندس برمجيات، القاهرة",
  },
  nav: {
    items: [
      ["الأعمال", "#work"],
      ["الخدمات", "#skills"],
      ["نبذة", "#about"],
      ["الخبرة", "#cv"],
    ],
    contact: "تواصل",
    cta: "تواصل معي",
    whatsapp: "واتساب",
    langLabel: "English",
    themeLabel: "التبديل بين الوضع الفاتح والداكن",
    menuLabel: "القائمة",
    closeLabel: "إغلاق",
  },
  hero: {
    name: "يوسف طارق",
    name_alt: "Youseef Tareq",
    status: "متاح للمشاريع وللوظائف بدوام كامل",
    statement:
      "مهندس برمجيات من القاهرة. أبني منتجات ويب متكاملة، من قاعدة البيانات حتى الشاشة، بالعربية والإنجليزية.",
    facts: [
      ["متاح", "للمشاريع وللوظائف بدوام كامل"],
      ["حاليًا", "مطوّر Full-Stack في The POST"],
      ["التقنيات", "تقنيات MEAN، أي MongoDB وExpress وAngular وNode.js"],
      ["أعمل", "بالعربية والإنجليزية، عن بُعد أو في القاهرة"],
    ],
    cta_project: "ابدأ مشروعًا",
    cta_hiring: "اطّلع على سيرتي الذاتية",
    alt_suggest: "This site is also in English",
  },
  works: {
    title: "الأعمال",
    intro: "ستة مشاريع حديثة. افتح أيًّا منها لتقرأ القصة كاملة.",
    label_problem: "المشكلة",
    label_built: "ما هو",
    label_contribution: "دوري تحديدًا",
    label_decision: "القرار الأهم",
    label_role: "الدور",
    label_stack: "التقنيات المستخدمة",
    outcome_label: "من يستخدمه",
    case_study: "اقرأ دراسة الحالة",
    featured: [
      {
        n: "٠١",
        title: "MenuVista",
        kicker: "قوائم طعام رقمية وطلب من الطاولة للمطاعم في مصر",
        problem:
          "قائمة المطعم المطبوعة تتقادم يوم تتغير الأسعار، ورمز QR يفتح ملف PDF لا يستطيع استقبال طلب.",
        built:
          "منصة تخدم مطاعم كثيرة في وقت واحد. لكل مطعم قائمته بالعربية والإنجليزية على عنوانه الخاص، تُفتح برمز QR. يطلب الزبون من طاولته دون حساب، وتصل الطلبات إلى النادل على هاتفه، ويدير المالك القوائم والفروع والموظفين واشتراكه من لوحة واحدة.",
        contribution:
          "بنيت المنصة كاملة: الواجهة الخلفية بـ Django ونموذج البيانات، ولوحة المالك وتطبيق النادل والقوائم العامة بـ Angular، والتحديثات اللحظية، وخطط الاشتراك، والنشر عبر Docker.",
        decision:
          "أي شخص يستطيع فتح رابط القائمة من بيته، لذا يجب أن يُثبت الطلب أن صاحبه على الطاولة. يظهر لكل طلب رمز من ٤ أرقام على هاتف الزبون، يكتبه النادل ليقبل الطلب، وخمس محاولات خاطئة تقفله. والتحديثات اللحظية تمر عبر WebSockets، لكن كل شاشة تتحقق بنفسها كل بضع ثوانٍ عند انقطاع الاتصال، لأن هواتف النُّدُل تقطعه كلما أُقفلت. انقطاع الاتصال يبطئ الطلب، ولا يوقفه أبدًا.",
        role: "مطوّر Full-Stack، المشروع كاملًا",
        year: "٢٠٢٦",
        stack: ["Angular", "Django", "PostgreSQL", "Redis", "WebSockets"],
      },
      {
        n: "٠٢",
        title: "UFeed",
        kicker: "تقييم الوظائف واستبيانات الموظفين لفرق الموارد البشرية",
        outcome: "شركات منها Bosta وBreadfast.",
        problem:
          "تُقيّم فرق الموارد البشرية الوظائف وتستطلع آراء الموظفين عبر جداول وأدوات متفرقة، وكان UFeed القديم نفسه عدة تطبيقات منفصلة.",
        built:
          "منصة موارد بشرية واحدة للشركات وفروعها: أداة لتقييم الوظائف تُرتّب المناصب في مصفوفة درجات، واستبيانات لقياس رضا الموظفين وتقاريرها، واستبيان للرواتب، بالعربية والإنجليزية. وتحدد خطة كل شركة ما تحصل عليه منها وعدد المقاعد.",
        contribution:
          "في The POST طوّرت المنصة في الواجهة الخلفية بـ Django وتطبيق Angular: تقييم الوظائف، واستبيانات الموظفين وتقاريرها، والخطط التي تفعّل الوحدات لكل شركة، وأداة الاستيراد التي نقلت بيانات كل عميل من النظام القديم.",
        decision:
          "بدل ترقيع التطبيقات القديمة واحدًا تلو الآخر، أُعيد بناء المنصة كنظام واحد، ونُقلت بيانات كل عميل بأداة استيراد تحوّل ملفات النظام القديم إلى البنية الجديدة. فانتقلت الشركات إلى النظام الجديد دون أن تبدأ تقييماتها من الصفر.",
        role: "مطوّر Full-Stack، The POST",
        year: "٢٠٢٥",
        stack: ["Angular", "Django", "PostgreSQL", "Redis"],
      },
      {
        n: "٠٣",
        title: "جامعة دمنهور",
        kicker: "المواقع الرسمية للجامعة وكلياتها",
        problem:
          "على الجامعة أن تعرّف بنفسها وبكل كلية وخدماتها للطلاب والعاملين والجمهور، وكثير منهم يفتح المواقع من هواتف قديمة وعلى اتصالات بطيئة.",
        built:
          "الموقع الرسمي للجامعة ومواقع جميع كلياتها، بالعربية والإنجليزية. يعرض موقع كل كلية نشأتها وقياداتها، وأقسامها وبرامجها، وخدمات الطلاب والخريجين، وأخبارها، وتعمل المواقع كلها على البنية نفسها.",
        contribution:
          "عملت على موقع الجامعة ومواقع الكليات: البنية المشتركة، وربط المواقع بواجهاتها البرمجية (API)، وواجهة الاستخدام وتجربة المستخدم في الخدمات وأجزاء أخرى من المواقع.",
        decision:
          "تقوم مواقع الكليات كلها على بنية Angular واحدة وتتصل بالواجهة البرمجية نفسها، فالخدمة أو الإصلاح الذي يُبنى مرة واحدة يمكن أن يصل إلى موقع كل كلية. وكانت السرعة على الأجهزة القديمة والاتصالات البطيئة أولوية في كل ذلك.",
        role: "مطوّر واجهات أمامية",
        year: "٢٠٢٥",
        stack: ["Angular", "REST API", "RTL"],
      },
      {
        n: "٠٤",
        title: "EG-Pricey",
        kicker: "أسعار العملات والذهب والوقود في مصر، لحظة بلحظة",
        problem:
          "يتابع الناس في مصر سعر الدولار والذهب عدة مرات في اليوم، عبر مصادر كثيرة نادرًا ما تتفق على رقم واحد.",
        built:
          "موقع عربي أولًا يتابع أسعار العملات والذهب والوقود والسلع الغذائية لحظة تغيّرها، ومعه حاسبات للقروض والاستثمار والادخار مبنية على البيانات نفسها.",
        contribution:
          "بنيت المنتج كاملًا: الواجهة البرمجية للأسعار وقاعدة البيانات، والتحديث اللحظي، وواجهة Angular من اليمين لليسار، والحاسبات.",
        decision:
          "تصل الأسعار إلى الصفحة فور تغيّرها، بدل أن تسأل الصفحة الخادم كل بضع ثوانٍ (WebSockets بدل الاستعلام المتكرر). فتبقى الصفحة المفتوحة طوال الصباح صحيحة دون إرهاق الخادم. ولأن السعر الخاطئ أسوأ من غياب السعر، تُخبر الصفحة المستخدم عند انقطاع الاتصال بدل أن تعرض رقمًا قديمًا بصمت.",
        role: "مطوّر Full-Stack، المشروع كاملًا",
        year: "٢٠٢٥",
        stack: ["Angular", "Node.js", "Express", "MongoDB", "Socket.IO"],
      },
      {
        n: "٠٥",
        title: "XTranslator",
        kicker: "خدمة ترجمة بالاشتراك، مبنية للبيع دوليًا",
        problem:
          "بيع اشتراك لعملاء في دول كثيرة مسألة ضرائب وعملات واحتيال، قبل أن يكون مسألة ترجمة.",
        built:
          "خدمة ترجمة للنصوص والمستندات والصور والصوت في ٤١ لغة، فيها حسابات للمستخدمين وفوترة للاشتراكات وحماية من إساءة الاستخدام منذ اليوم الأول.",
        contribution:
          "بنيت تهيئة المنصة للغات والمناطق، وربط فوترة الاشتراكات، والحدّ من الطلبات وتصفية الروبوتات لحماية الخدمة.",
        decision:
          "بدل بناء نظام دفع داخلي، تمر المدفوعات عبر Lemon Squeezy بصفته البائع المسجَّل (Merchant of Record)، فيتولى ضريبة القيمة المضافة والامتثال الضريبي الدولي، وهي أمور يسهل الخطأ فيها. وتمر حركة الزوار أولًا عبر Cloudflare، الذي يحجب الروبوتات ويحدّ من إساءة الاستخدام قبل وصولها إلى الخادم، فيبقى الخادم نفسه صغيرًا.",
        role: "مطوّر Full-Stack",
        year: "٢٠٢٤",
        stack: ["Angular", "Node.js", "Lemon Squeezy", "Cloudflare"],
      },
      {
        n: "٠٦",
        title: "TileGreen",
        kicker: "موقع شركة ناشئة تحوّل نفايات البلاستيك إلى مواد بناء",
        problem:
          "شركة ناشئة في مجال تقنيات المناخ احتاجت موقعًا يقنع المستثمرين والمشترين من المصانع.",
        built:
          "الموقع الرسمي ثنائي اللغة لشركة مصرية تحوّل البلاستيك غير القابل لإعادة التدوير إلى أكثر من ٤٠ منتجًا للبناء. يعتمد على الصور، ومبني حول طريقة عمل التقنية لا حول العلامة التجارية.",
        contribution:
          "بنيت الواجهة الأمامية بالعربية والإنجليزية، ومعها الحركة التي تنظّم إيقاع القصة على الصفحة.",
        decision:
          "تتشارك العربية والإنجليزية نظام تخطيط واحدًا بدل قالبين منفصلين. فالموقع العربي هو الموقع نفسه بالاتجاه الصحيح، ولا تبتعد النسختان عن بعضهما مع الوقت. والحركة ترشد القارئ على امتداد الصفحة، ثم تتوقف عند ذلك.",
        role: "مطوّر واجهات أمامية",
        year: "٢٠٢٤",
        stack: ["Angular", "SCSS", "Motion"],
      },
    ],
    selected_headline: "أطلقت أيضًا",
    selected_note: "مشاريع لعملاء ولجهة عملي ومشاريع شخصية، ٢٠٢٤ – ٢٠٢٥.",
    selected: [
      {
        n: "٠٧",
        title: "Contact Management",
        kicker: "تطبيق مشترك لجهات الاتصال يمنع تعارض التعديلات",
        blurb:
          "تطبيق بتقنيات MEAN فيه واجهة برمجية REST مؤمّنة وواجهة Angular. عندما يفتح شخص جهة اتصال تُقفل فورًا أمام الباقين، ويُفك القفل تلقائيًا إذا انقطع اتصاله أو توقف عن النشاط.",
        role: "مطوّر Full-Stack",
        year: "٢٠٢٥",
        stack: ["Angular", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
      },
      {
        n: "٠٨",
        title: "Jafy",
        kicker: "متجر أثاث وإضاءة",
        blurb:
          "متجر إلكتروني للأثاث والإضاءة الراقية، مصمَّم ليُتصفَّح كأنه كتالوج مطبوع: صور كبيرة وإيقاع هادئ.",
        role: "مطوّر واجهات أمامية",
        year: "٢٠٢٤",
        stack: ["Angular", "TypeScript"],
      },
      {
        n: "٠٩",
        title: "Dr. Genedy",
        kicker: "عيادة تبعث على الثقة",
        blurb:
          "موقع لعيادة جراحة وتجميل، مبني حول مساعدة المريض على اختيار الإجراء المناسب والحجز بثقة.",
        role: "مطوّر واجهات أمامية",
        year: "٢٠٢٤",
        stack: ["Angular", "SCSS"],
      },
    ],
    status: {
      private: "أداة خاصة، تتطلب تسجيل الدخول",
      maintenance: "الموقع قيد الصيانة",
      unreleased: "غير متاح للعامة بعد",
      offline: "الموقع لم يعد متاحًا",
    },
  },
  capabilities: {
    title: "الخدمات",
    intro: "ولكل مهارة رابط لمشروع يثبتها.",
    proof_label: "شاهد",
    items: [
      {
        icon: "app",
        title: "تطبيقات ويب متكاملة",
        body: "حسابات وبيانات ولوحة إدارة والشاشات التي يستخدمها الناس، مبنية من أولها لآخرها.",
        proof: [["MenuVista", "menuvista"], ["EG-Pricey", "eg-pricey"], ["Contact Management", "contact-management"]],
      },
      {
        icon: "dashboard",
        title: "لوحات تحكم وأدوات داخلية",
        body: "بيانات متفرقة تتحول إلى شاشات يتصرف الفريق بناءً عليها.",
        proof: [["UFeed", "ufeed"]],
      },
      {
        icon: "realtime",
        title: "ميزات لحظية",
        body: "أسعار وتنبيهات وتعديل مشترك يتحدّث دون إعادة تحميل الصفحة.",
        proof: [["MenuVista", "menuvista"], ["EG-Pricey", "eg-pricey"], ["Contact Management", "contact-management"]],
      },
      {
        icon: "payments",
        title: "الاشتراكات والمدفوعات",
        body: "باقات وفوترة تراعي الضرائب والعملاء من دول أخرى.",
        proof: [["XTranslator", "xtranslator"]],
      },
      {
        icon: "bilingual",
        title: "منتجات بالعربية والإنجليزية",
        body: "اتجاه من اليمين لليسار مضبوط: منتج واحد بلغتين.",
        proof: [["MenuVista", "menuvista"], ["TileGreen", "tilegreen"], ["EG-Pricey", "eg-pricey"]],
      },
      {
        icon: "server",
        title: "الواجهات البرمجية والاستضافة والحماية",
        body: "واجهات برمجية آمنة وتسجيل دخول وحماية من الروبوتات، تعمل على خوادم حقيقية.",
        proof: [["XTranslator", "xtranslator"], ["Contact Management", "contact-management"]],
      },
    ],
    stack_label: "الأدوات التي أستخدمها",
    stack: [
      ["الواجهة", "Angular, TypeScript, Tailwind"],
      ["الخادم", "Node.js, Express, Django"],
      ["البيانات", "MongoDB, PostgreSQL, Redis"],
      ["الاستضافة", "Docker, Cloudflare, Linux"],
    ],
  },
  testimonials: {
    title: "ماذا يقول العملاء",
    items: [],
  },
  notes: {
    nav: "ملاحظات",
    title: "ملاحظات",
    intro: "نسخ أطول من القرارات المذكورة في هذا الموقع: ما جرّبته، وما تعطّل، وما سأبقي عليه.",
    empty: "أول ملاحظة في الطريق.",
    latest: "أحدث الملاحظات",
    all: "كل الملاحظات",
    cta: "تعمل على شيء مشابه؟",
    feed: "خلاصة RSS",
  },
  case: {
    back: "كل الأعمال",
    architecture: "كيف تترابط الأجزاء",
    context: "السياق",
    challenges: "ما كان صعبًا",
    differently: "ما كنت سأفعله بشكل مختلف",
    gallery: "على الهاتف",
    mobile: "الهاتف",
    cta_title: "تريد منتجًا مثل {project}؟",
    cta_body: "أخبرني بما تبنيه. وإن كنت توظّف، فحدّثني عن الوظيفة.",
    next: "دراسة الحالة التالية",
  },
  principles: {
    title: "طريقتي في العمل",
    intro: "ما أؤمن به في بناء البرمجيات، وكيف يسير العمل معي.",
    beliefs_label: "ما أؤمن به",
    items: [
      {
        title: "الصحيح قبل الذكي.",
        body: "السعر القديم أسوأ من غياب السعر. أبدأ دائمًا بما يحدث حين يفشل شيء.",
        anchor: "في التطبيق: الأسعار الحية في EG-Pricey",
      },
      {
        title: "العربية ليست ترجمة.",
        body: "الاتجاه من اليمين لليسار يغيّر التخطيط والخطوط والأرقام. اللغتان من نظام واحد، فلا تكون إحداهما فكرة لاحقة.",
        anchor: "في التطبيق: TileGreen، وهذا الموقع",
      },
      {
        title: "اشترِ الأجزاء الصعبة.",
        body: "الضرائب والمدفوعات والروبوتات مشكلات محلولة. أستخدم خدمات مجرَّبة وأوجّه الوقت لما يميّز المنتج.",
        anchor: "في التطبيق: الفوترة في XTranslator",
      },
    ],

    process_title: "كيف يسير المشروع",
    steps: [
      "نتحدث عن المشكلة.",
      "أكتب ما سيُبنى ومتى.",
      "تجرّب نسخًا تعمل أثناء البناء.",
      "بعد الإطلاق أبقى متاحًا.",
    ],
  },
  about: {
    title: "أحب أن أتولى المشكلة كاملة",
    p1: "أنا يوسف طارق، مهندس برمجيات من القاهرة. درست علوم الحاسب في معهد القاهرة العالي، وتدرّبت على تقنيات MEAN في المعهد القومي للاتصالات (NTI)، ثم عملت مستقلًا لعملاء من دول مختلفة قبل أن أنضم إلى The POST مطوّرًا Full-Stack.",
    p2: "علّمني العمل الحر الجزء الذي لا يتعلق بالكود: أن أقدّر نطاق العمل بصدق، وأطرح السؤال المحرج مبكرًا، وأسلّم في الموعد الذي التزمت به. وفي The POST أبني أدوات داخلية ولوحات تحليلات وبوابات للعملاء مع فريق صغير يعمل عن بُعد، ونُطلق تحديثات كل أسبوع.",
    p3: "أكثر ما يهمني هو ما يشعر به الناس حتى لو لم يروه: صفحات تُحمَّل بسرعة، ونماذج لا تضيّع ما كتبته، وأسعار لا تكون خاطئة بصمت، وعربية تُقرأ كأنها كُتبت أولًا.",
    portrait_alt: "صورة يوسف طارق",
  },
  cv: {
    title: "الخبرة",
    intro: "أين عملت ودرست، من الأحدث إلى الأقدم.",
    download: "تحميل السيرة الذاتية (PDF)",
    recruiter_line: "متاح لوظائف بدوام كامل، عن بُعد أو من المقر في القاهرة.",
    role_cta: "تحدّث معي عن وظيفة",
    rows: [
      {
        years: "٢٠٢٥–الآن",
        role: "مطوّر Full-Stack",
        org: "The POST",
        loc: "عن بُعد",
        tags: ["Angular", "Node.js", "MongoDB", "TypeScript"],
        blurb:
          "أدوات داخلية ولوحات تحليلات وبوابات للعملاء، تُطلق على دفعات أسبوعية ضمن فريق منتج صغير يعمل عن بُعد. بنيت فيها UFeed، منصة لتقييم الموظفين.",
      },
      {
        years: "٢٠٢٤–٢٥",
        role: "مطوّر Full-Stack مستقل",
        org: "Upwork وFiverr وخمسات",
        loc: "عن بُعد",
        tags: ["MEAN", "Django", "C#", "Lua"],
        blurb:
          "تطبيقات ويب وسطح مكتب لعملاء من دول وقطاعات مختلفة. هنا تعلّمت أن أقدّر النطاق بصدق، وأطرح السؤال المحرج مبكرًا، وأسلّم في الموعد المتفق عليه.",
      },
      {
        years: "٢٠٢٣",
        role: "تدريب تطوير الويب الشامل (MEAN)",
        org: "المعهد القومي للاتصالات (NTI)",
        loc: "القاهرة",
        tags: ["MongoDB", "Express", "Angular", "Node.js"],
        blurb:
          "برنامج مكثّف يغطي تقنيات MEAN من أولها إلى آخرها، من الواجهة حتى نشر الخادم وتأمينه.",
      },
      {
        years: "٢٠٢٠–٢٥",
        role: "بكالوريوس علوم الحاسب",
        org: "معهد القاهرة العالي",
        loc: "القاهرة",
        tags: ["Algorithms", "Databases"],
        blurb: "هندسة البرمجيات والخوارزميات وقواعد البيانات وتطوير الويب.",
      },
    ],
  },
  contact: {
    title: "التواصل",
    lead: "أخبرني عن مشروع أو وظيفة أو سؤال. بضعة أسطر تكفي. أقرأ كل رسالة بنفسي وأرد خلال يوم.",
    details_label: "مباشر",
    rows: [
      ["البريد", EMAIL, `mailto:${EMAIL}`],
      ["واتساب", WHATSAPP_DISPLAY, whatsappLink()],
      ["لينكدإن", LINKEDIN_DISPLAY, LINKEDIN_URL],
      ["جيت هب", GITHUB_DISPLAY, GITHUB_URL],
      ["المقر", "القاهرة، وعن بُعد حول العالم", null],
    ],
    availability: "متاح للمشاريع والوظائف، وأرد خلال يوم.",
    copy: "نسخ",
    copied: "تم النسخ",
    whatsapp_cta: "راسلني على واتساب",
    whatsapp_href: whatsappLink("مرحبًا يوسف، وصلت إليك عبر soking.digital."),
    booking_cta: "احجز مكالمة لمدة ٢٠ دقيقة",
    form_label: "أرسل رسالة",
    intent_label: "أتواصل بخصوص",
    intents: { project: "مشروع", role: "وظيفة بدوام كامل", other: "أمر آخر" },
    budget_label: "الميزانية (بالدولار)",
    budgets: {
      lt1k: "أقل من ١٬٠٠٠ $",
      "1-3k": "١٬٠٠٠ – ٣٬٠٠٠ $",
      "3-8k": "٣٬٠٠٠ – ٨٬٠٠٠ $",
      "8k+": "أكثر من ٨٬٠٠٠ $",
      unsure: "لم أحدد بعد",
    },
    timeline_label: "الإطار الزمني",
    timelines: { asap: "في أقرب وقت", "1-3m": "من شهر إلى ثلاثة", flexible: "مرن" },
    optional: "اختياري",
    f_name: "اسمك",
    f_name_p: "مثال: سارة أحمد",
    f_email: "البريد الإلكتروني",
    f_email_p: "sarah@company.com",
    f_company: "الشركة",
    f_company_p: "أين هذه الوظيفة؟",
    f_msg: {
      project: [
        "ما الذي تبنيه؟",
        "ما هو، ولمن، وما الذي بُني منه بالفعل…",
      ],
      role: [
        "حدّثني عن الوظيفة",
        "الفريق، والتقنيات، عن بُعد أم من المقر، ورابط الإعلان…",
      ],
      other: ["رسالتك", "بماذا تفكر؟"],
    },
    f_send: "إرسال الرسالة",
    sending: "جارٍ الإرسال…",
    e_required: "يرجى ملء هذا الحقل",
    e_email: "يرجى إدخال بريد إلكتروني صحيح",
    e_msg: "بضع كلمات أخرى من فضلك",
    e_submit: "تعذّر إرسال رسالتك. حاول مجددًا، أو راسلني مباشرة على البريد.",
    sent_label: "تم إرسال الرسالة",
    sent_title: (name: string) => `شكرًا لك، ${name}.`,
    sent_body: `سأرد من ${EMAIL} خلال يوم. وللأمور العاجلة، واتساب أسرع.`,
    sent_again: "إرسال رسالة أخرى",
  },
  footer: {
    identity_tagline: "مهندس برمجيات من القاهرة، أعمل بتقنيات MEAN",
    colophon_text:
      "صمّمته وبنيته بنفسي، وبلا كوكيز.",
    copyright: "© ٢٠٢٦ يوسف طارق",
    to_top: "العودة إلى الأعلى",
  },
  misc: {
    skip: "انتقل إلى المحتوى",
    new_tab: "(يفتح في نافذة جديدة)",
    visit_project: "زيارة الموقع",
    view_source: "الكود على GitHub",
    screenshot_alt: (title: string) => `لقطة شاشة من موقع ${title}`,
    diagrams: {
      ufeed: {
        caption: "رحلة بيانات الشركة داخل UFeed. وتحدد خطتها الوحدات التي تظهر لها.",
        nodes: [
          { name: "الشركة وفروعها", note: "الأقسام والمناصب والموظفون، وعدد المقاعد حسب خطة الشركة" },
          { name: "تقييم الوظائف", note: "كل منصب يُقيَّم عاملًا عاملًا ليأخذ مكانه في مصفوفة الدرجات" },
          { name: "استبيانات الموظفين", note: "تُبنى بالعربية أو الإنجليزية، وتُرسل إلى الموظفين وتُجمع ردودها" },
          { name: "التقارير ولوحات المتابعة", note: "النتائج لكل شركة ولكل استبيان، جاهزة للتصرف بناءً عليها" },
        ],
      },
      menuvista: {
        caption: "رحلة الطلب. كل شاشة تتحقق بنفسها أيضًا، فانقطاع الاتصال يبطئ الطلب ولا يوقفه.",
        nodes: [
          { name: "هاتف الزبون", note: "يفتح القائمة من رمز QR على الطاولة ويرسل الطلب، دون حساب" },
          { name: "Django API", note: "يتأكد أن الفرع يستقبل الطلبات الآن، ويحفظ الطلب ويُصدر رمزًا من ٤ أرقام" },
          { name: "Redis + WebSockets", note: "يُبلغ هواتف النُّدُل فورًا، وبإشعار حتى لو كان الهاتف مقفلًا" },
          { name: "هاتف النادل", note: "يكتب النادل الرمز الظاهر على هاتف الزبون، فيُثبت أنه عند الطاولة" },
        ],
      },
      "eg-pricey": {
        caption: "تصل الأسعار إلى الصفحة فور تغيّرها، فتبقى الصفحة المفتوحة طوال الصباح صحيحة.",
        nodes: [
          { name: "مصادر الأسعار", note: "العملات والذهب والوقود والسلع، من مصادر نادرًا ما تتفق" },
          { name: "Node.js + Express", note: "الواجهة البرمجية، والأسعار محفوظة في MongoDB" },
          { name: "Socket.IO", note: "يدفع كل تغيير إلى كل صفحة مفتوحة بدل الاستعلام المتكرر" },
          {
            name: "Angular app",
            note: "عربي أولًا ومن اليمين لليسار؛ يُعلن إعادة الاتصال بدل عرض سعر قديم",
          },
        ],
      },
      xtranslator: {
        caption: "مسار الطلب. المراحل المميّزة خدمات جاهزة، لا أجزاء أُعيد بناؤها.",
        nodes: [
          { name: "Angular app", note: "الحسابات وواجهة الترجمة" },
          { name: "Cloudflare", note: "الحد من الطلبات وتصفية الروبوتات على الحافة", bought: true },
          { name: "Node.js API", note: "خدمة الترجمة، خادم صغير خلف Cloudflare" },
          {
            name: "Lemon Squeezy",
            note: "البائع المسجَّل: الاشتراكات والضريبة والامتثال الدولي",
            bought: true,
          },
        ],
      },
    },
  },
};

export const STRINGS: Record<Lang, Strings> = { en, ar };
