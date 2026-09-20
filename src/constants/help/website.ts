export const WEBSITE_HELP = [
  {
    id: "website-projects",
    category: "website",
    question: "Where is the Projects page?",
    variations: [
      "How do I find projects",
      "Where can I browse projects",
      "Show me the portfolio",
      "Where are MECTEC projects",
    ],
    keywords: ["projects", "page", "portfolio", "browse"],
    answer:
      "Use the Projects section in the website navigation to browse MECTEC project entries.",
    priority: 9,
  },

  {
    id: "website-request",
    category: "website",
    question: "Where is the project request form?",
    variations: [
      "How do I find the request form",
      "Where can I submit a project",
      "Where is the project form",
      "How do I request a build",
    ],
    keywords: ["request", "form", "project", "submit"],
    answer:
      "Use the project request option in the MECTEC website navigation to open the request form.",
    priority: 10,
  },

  {
    id: "website-contact",
    category: "website",
    question: "Where is the contact page?",
    variations: [
      "How do I find contact",
      "Where can I contact MECTEC",
      "Show me contact information",
      "Where is contact",
    ],
    keywords: ["contact", "page", "email", "whatsapp"],
    answer:
      "Use the Contact option in the website navigation to find MECTEC contact information and available communication options.",
    priority: 10,
  },

  {
    id: "website-help",
    category: "website",
    question: "What can the Help Assistant answer?",
    variations: [
      "What can I ask the chatbot",
      "What questions can I ask",
      "What does this assistant know",
      "What is the help assistant for",
    ],
    keywords: ["assistant", "help", "chatbot", "questions", "answer"],
    answer:
      "The Help Assistant provides instant answers from MECTEC’s local knowledge library. It covers MECTEC information, project requests, services, electronics, embedded systems, components, sensors, automation, IoT, troubleshooting and related topics included in the library.",
    priority: 10,
  },

  {
    id: "website-off-topic",
    category: "website",
    question: "Can the Help Assistant answer unrelated questions?",
    variations: [
      "Can I ask anything",
      "Can you answer general questions",
      "Can this chatbot answer everything",
      "Does the assistant know everything",
      "Can I ask about politics",
      "Can I ask about the weather",
    ],
    keywords: [
      "anything",
      "everything",
      "unrelated",
      "general",
      "weather",
      "politics",
    ],
    answer:
      "The Help Assistant is intentionally limited to information in the MECTEC knowledge library. Questions outside its supported topics may receive a fallback response instead of an invented answer.",
    priority: 10,
  },

  {
    id: "website-instant",
    category: "website",
    question: "Does the Help Assistant use AI?",
    variations: [
      "Is this chatbot AI",
      "Does this assistant use artificial intelligence",
      "Is an AI answering me",
      "Does this use an API",
      "Does the chatbot call a server",
    ],
    keywords: ["ai", "artificial", "intelligence", "api", "server", "chatbot"],
    answer:
      "The MECTEC Help Assistant is a local rule-based knowledge system. Its answers come from the website’s built-in knowledge library rather than a generative AI service.",
    priority: 10,
  },

  {
    id: "website-speed",
    category: "website",
    question: "Why does the Help Assistant respond instantly?",
    variations: [
      "Why is the chatbot so fast",
      "How does it answer immediately",
      "Why is there no waiting",
      "Does the assistant fetch answers online",
    ],
    keywords: ["fast", "instant", "speed", "waiting", "local"],
    answer:
      "The assistant searches its local knowledge library directly in the browser. It does not need to send each question to an external AI service before returning a predefined answer.",
    priority: 10,
  },
] as const;
