import type { HelpEntry } from "./types";

export const WEBSITE_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // NAVIGATION & PAGES
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-navigation",
    category: "website",
    intent: "general",
    question: "How do I navigate the MECTEC website?",
    variations: [
      "How do I navigate the MECTEC website",
      "How to use the website",
      "Where are the website sections",
      "How do I find different pages",
      "Website navigation help",
    ],
    keywords: ["navigate", "navigation", "website", "menu", "sections"],
    answer:
      "The website navigation provides access to the main sections such as Projects, Project Request and Contact. Use the navigation menu to move between sections, and use the Help Assistant for quick answers about MECTEC and related technical topics.",
    priority: 90,
  },

  {
    id: "website-projects",
    category: "website",
    intent: "general",
    question: "Where is the Projects page?",
    variations: [
      "Where is the Projects page",
      "How do I find projects",
      "Where can I browse projects",
      "Show me the portfolio",
      "Where are MECTEC projects",
    ],
    keywords: ["projects", "page", "portfolio", "browse"],
    answer:
      "Use the Projects section in the website navigation to browse MECTEC project entries.",
    priority: 90,
  },

  {
    id: "website-request",
    category: "website",
    intent: "project_request",
    question: "Where is the project request form?",
    variations: [
      "Where is the project request form",
      "How do I find the request form",
      "Where can I submit a project",
      "Where is the project form",
      "How do I request a build",
    ],
    keywords: ["request", "form", "project", "submit"],
    answer:
      "Use the project request option in the MECTEC website navigation to open the request form.",
    priority: 100,
  },

  {
    id: "website-contact",
    category: "website",
    intent: "contact",
    question: "Where is the contact page?",
    variations: [
      "Where is the contact page",
      "How do I find contact",
      "Where can I contact MECTEC",
      "Show me contact information",
      "Where is contact",
    ],
    keywords: ["contact", "page", "email", "whatsapp"],
    answer:
      "Use the Contact option in the website navigation to find MECTEC contact information and available communication options.",
    priority: 100,
  },

  {
    id: "website-project-pages",
    category: "website",
    intent: "general",
    question: "Where can I read detailed project pages?",
    variations: [
      "Where can I read detailed project pages",
      "Project details pages",
      "Where to read case studies",
      "How to open a project",
      "Project information pages",
    ],
    keywords: ["project", "pages", "details", "case", "studies"],
    answer:
      "Open the Projects section in the navigation, then select an individual project entry to see the available details.",
    priority: 90,
  },

  {
    id: "website-project-categories",
    category: "website",
    intent: "general",
    question: "Can I filter projects by category on the website?",
    variations: [
      "Can I filter projects by category on the website",
      "Filter projects on site",
      "Project categories in website",
      "Browse by category",
      "Find project by type",
    ],
    keywords: ["filter", "category", "projects", "browse", "type"],
    answer:
      "Filtering options depend on the current Projects page implementation. Use the available category or project navigation controls to find relevant builds.",
    priority: 80,
  },

  {
    id: "website-project-inquiry",
    category: "website",
    intent: "contact",
    question: "How do I ask about a project on the website?",
    variations: [
      "How do I ask about a project on the website",
      "Ask about project",
      "Project question",
      "Contact about a project",
      "Inquiry about project",
    ],
    keywords: ["ask", "project", "question", "contact", "inquiry"],
    answer:
      "Use the Contact section and reference the project you are asking about. Include any relevant details so the request can be answered accurately.",
    priority: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // HELP ASSISTANT
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-help",
    category: "website",
    intent: "definition",
    question: "What can the Help Assistant answer?",
    variations: [
      "What can the Help Assistant answer",
      "What can I ask the chatbot",
      "What questions can I ask",
      "What does this assistant know",
      "What is the help assistant for",
    ],
    keywords: ["assistant", "help", "chatbot", "questions", "answer"],
    answer:
      "The Help Assistant provides instant answers from MECTEC's local knowledge library. It covers MECTEC information, project requests, services, electronics, embedded systems, components, sensors, automation, IoT, troubleshooting and related topics included in the library.",
    priority: 100,
  },

  {
    id: "website-off-topic",
    category: "website",
    intent: "definition",
    question: "Can the Help Assistant answer unrelated questions?",
    variations: [
      "Can the Help Assistant answer unrelated questions",
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
    priority: 100,
  },

  {
    id: "website-instant",
    category: "website",
    intent: "definition",
    question: "Does the Help Assistant use AI?",
    variations: [
      "Does the Help Assistant use AI",
      "Is this chatbot AI",
      "Does this assistant use artificial intelligence",
      "Is an AI answering me",
      "Does this use an API",
      "Does the chatbot call a server",
    ],
    keywords: ["ai", "artificial", "intelligence", "api", "server", "chatbot"],
    answer:
      "The MECTEC Help Assistant is a local rule-based knowledge system. Its answers come from the website's built-in knowledge library rather than a generative AI service.",
    priority: 100,
  },

  {
    id: "website-speed",
    category: "website",
    intent: "general",
    question: "Why does the Help Assistant respond instantly?",
    variations: [
      "Why does the Help Assistant respond instantly",
      "Why is the chatbot so fast",
      "How does it answer immediately",
      "Why is there no waiting",
      "Does the assistant fetch answers online",
    ],
    keywords: ["fast", "instant", "speed", "waiting", "local"],
    answer:
      "The assistant searches its local knowledge library directly in the browser. It does not need to send each question to an external AI service before returning a predefined answer.",
    priority: 90,
  },

  {
    id: "website-help-limitations",
    category: "website",
    intent: "definition",
    question: "What are the limits of the Help Assistant?",
    variations: [
      "What are the limits of the Help Assistant",
      "What can't the assistant do",
      "Help Assistant limits",
      "Assistant restrictions",
      "Chatbot limitations",
    ],
    keywords: ["limits", "assistant", "restrictions", "limitations", "chatbot"],
    answer:
      "The Help Assistant only answers questions covered by the local knowledge library. It does not send requests, process payments or provide project-specific quotations.",
    priority: 100,
  },

  {
    id: "website-help-accuracy",
    category: "website",
    intent: "definition",
    question: "How accurate are the Help Assistant answers?",
    variations: [
      "How accurate are the Help Assistant answers",
      "Assistant accuracy",
      "Are chatbot answers correct",
      "Reliability of assistant",
      "Trust chatbot answers",
    ],
    keywords: ["accuracy", "assistant", "answers", "reliability", "trust"],
    answer:
      "The assistant returns predefined answers from the local knowledge library. It does not generate new information. For project-specific or high-impact decisions, confirm with MECTEC directly.",
    priority: 100,
  },

  {
    id: "website-help-updates",
    category: "website",
    intent: "general",
    question: "Is the Help Assistant updated?",
    variations: [
      "Is the Help Assistant updated",
      "Assistant updates",
      "New answers in assistant",
      "Knowledge library updates",
      "Chatbot improvements",
    ],
    keywords: ["updates", "assistant", "library", "knowledge", "improvements"],
    answer:
      "The knowledge library can be updated as MECTEC adds new topics and information. The most current answers appear when the library is updated.",
    priority: 90,
  },

  {
    id: "website-help-topic-coverage",
    category: "website",
    intent: "definition",
    question: "What topics does the Help Assistant cover?",
    variations: [
      "What topics does the Help Assistant cover",
      "Assistant topics",
      "What can I ask the assistant",
      "Help Assistant coverage",
      "Knowledge library topics",
    ],
    keywords: ["topics", "assistant", "coverage", "knowledge", "library"],
    answer:
      "The assistant covers MECTEC information, project requests, services, pricing, electronics, embedded systems, microcontrollers, components, sensors, motors, RFID, PCB, firmware, IoT, automation and troubleshooting topics present in the library.",
    priority: 100,
  },

  {
    id: "website-help-suggest-topic",
    category: "website",
    intent: "contact",
    question: "Can I suggest a topic for the Help Assistant?",
    variations: [
      "Can I suggest a topic for the Help Assistant",
      "Suggest topic for chatbot",
      "Add question to assistant",
      "Assistant topic request",
      "Improve knowledge library",
    ],
    keywords: ["suggest", "topic", "assistant", "question", "library"],
    answer:
      "Yes. Use the Contact section to suggest a topic or question for the knowledge library.",
    priority: 80,
  },

  {
    id: "website-help-report",
    category: "website",
    intent: "contact",
    question: "How do I report a wrong answer from the assistant?",
    variations: [
      "How do I report a wrong answer from the assistant",
      "Wrong chatbot answer",
      "Assistant gave incorrect info",
      "Report wrong answer",
      "Chatbot mistake",
    ],
    keywords: ["report", "wrong", "assistant", "incorrect", "mistake"],
    answer:
      "Use the Contact section to report a wrong or missing answer. Describe the question and the issue so the knowledge library can be improved.",
    priority: 90,
  },

  {
    id: "website-help-disclaimer",
    category: "website",
    intent: "definition",
    question: "Is the Help Assistant a replacement for human support?",
    variations: [
      "Is the Help Assistant a replacement for human support",
      "Is chatbot enough",
      "Do I need to contact a person",
      "Assistant vs human",
      "Can the assistant replace support",
    ],
    keywords: ["assistant", "human", "support", "replace", "chatbot"],
    answer:
      "No. The Help Assistant is a quick reference tool. For project-specific decisions, quotations or direct support, contact MECTEC through the website contact options.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // FORMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-request-form-help",
    category: "website",
    intent: "project_request",
    question: "How do I fill the project request form?",
    variations: [
      "How do I fill the project request form",
      "Request form help",
      "How to complete request",
      "Project request form guide",
      "Filling the project form",
    ],
    keywords: ["request", "form", "help", "guide", "fill"],
    answer:
      "Describe the project goal, key features, any hardware or code you already have, and any budget or deadline constraints. More useful detail helps MECTEC understand the request.",
    priority: 100,
  },

  {
    id: "website-request-fields",
    category: "website",
    intent: "project_request",
    question: "What fields are in the project request form?",
    variations: [
      "What fields are in the project request form",
      "Request form fields",
      "What does request form ask",
      "Form details website",
      "Request form information",
    ],
    keywords: ["request", "form", "fields", "details", "information"],
    answer:
      "The form typically asks for project description, requirements, preferred platform, budget and timeline information. The exact fields depend on the current form design.",
    priority: 90,
  },

  {
    id: "website-request-attachments",
    category: "website",
    intent: "project_request",
    question: "Can I attach files to the request form?",
    variations: [
      "Can I attach files to the request form",
      "Upload files to request",
      "Attach photos to form",
      "Send schematic with request",
      "File upload on request form",
    ],
    keywords: ["attach", "files", "upload", "form", "request"],
    answer:
      "Attachment support depends on the current form. If attachments are supported, photos, schematics or code can help explain the project.",
    priority: 90,
  },

  {
    id: "website-contact-form-help",
    category: "website",
    intent: "contact",
    question: "How do I use the contact form?",
    variations: [
      "How do I use the contact form",
      "Contact form help",
      "How to send message",
      "Contact page guide",
      "Filling contact form",
    ],
    keywords: ["contact", "form", "help", "guide", "message"],
    answer:
      "Use the Contact section to reach MECTEC. Provide a clear subject, message and any relevant project details so the request can be routed correctly.",
    priority: 90,
  },

  {
    id: "website-form-error",
    category: "website",
    intent: "troubleshooting",
    question: "What if the request form shows an error?",
    variations: [
      "What if the request form shows an error",
      "Form error",
      "Request form not working",
      "Error submitting form",
      "Cannot submit request",
    ],
    keywords: ["form", "error", "submit", "request", "working"],
    answer:
      "Try again, check required fields and refresh the page. If the problem continues, contact MECTEC directly with the details.",
    priority: 90,
  },

  {
    id: "website-broken-form",
    category: "website",
    intent: "troubleshooting",
    question: "What if the contact form is broken?",
    variations: [
      "What if the contact form is broken",
      "Contact form not working",
      "Contact form error",
      "Cannot send message",
      "Form issue",
    ],
    keywords: ["contact", "form", "broken", "error", "message"],
    answer:
      "Try refreshing the page or using another browser. If the problem continues, use the email contact option or report the issue to MECTEC.",
    priority: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // CONTACT LINKS / EXTERNAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-email-link",
    category: "website",
    intent: "contact",
    question: "Where can I find the email link?",
    variations: [
      "Where can I find the email link",
      "Email on website",
      "Where to find MECTEC email",
      "Contact email page",
      "Email link location",
    ],
    keywords: ["email", "link", "contact", "website", "location"],
    answer:
      "The email contact option is available in the Contact section of the website. Use that page for direct email contact.",
    priority: 90,
  },

  {
    id: "website-whatsapp-link",
    category: "website",
    intent: "contact",
    question: "Where is the WhatsApp button?",
    variations: [
      "Where is the WhatsApp button",
      "WhatsApp button location",
      "How to find WhatsApp",
      "Contact via WhatsApp website",
      "WhatsApp link on site",
    ],
    keywords: ["whatsapp", "button", "location", "contact", "website"],
    answer:
      "Where supported, the WhatsApp option is available through the website's contact options. If you do not see it, use the contact page for other communication methods.",
    priority: 90,
  },

  {
    id: "website-location-map",
    category: "website",
    intent: "location",
    question: "Is there a map on the website?",
    variations: [
      "Is there a map on the website",
      "Map on MECTEC site",
      "Location map website",
      "Where is the map",
      "Google maps link",
    ],
    keywords: ["map", "location", "website", "google", "link"],
    answer:
      "Location details, including any map link, are provided in the Contact section of the website.",
    priority: 80,
  },

  {
    id: "website-social-links",
    category: "website",
    intent: "contact",
    question: "Where are the social media links?",
    variations: [
      "Where are the social media links",
      "Social links on website",
      "Facebook Instagram links",
      "Follow MECTEC",
      "Social media icons",
    ],
    keywords: ["social", "links", "facebook", "instagram", "follow"],
    answer:
      "Social media links, if available, are usually shown in the website footer or contact section.",
    priority: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // MOBILE / BROWSER / DEVICE
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-mobile",
    category: "website",
    intent: "compatibility",
    question: "Does the MECTEC website work on mobile?",
    variations: [
      "Does the MECTEC website work on mobile",
      "Can I use the website on my phone",
      "Is the site mobile friendly",
      "Does it work on tablets",
      "Mobile access to MECTEC",
    ],
    keywords: ["mobile", "phone", "tablet", "responsive", "device"],
    answer:
      "The website is designed to be usable across common screen sizes, including mobile devices. If a specific layout issue occurs, try refreshing the page or using an updated browser.",
    priority: 80,
  },

  {
    id: "website-navigation-mobile",
    category: "website",
    intent: "general",
    question: "How do I use the mobile navigation?",
    variations: [
      "How do I use the mobile navigation",
      "Mobile menu",
      "Navigation on phone",
      "How to open menu on mobile",
      "Mobile website menu",
    ],
    keywords: ["mobile", "menu", "navigation", "phone", "website"],
    answer:
      "On mobile, the navigation is usually accessible through a menu button. Use it to reach the main sections such as Projects, Request and Contact.",
    priority: 80,
  },

  {
    id: "website-browser",
    category: "website",
    intent: "compatibility",
    question: "Which browser should I use for the website?",
    variations: [
      "Which browser should I use for the website",
      "What browser is supported",
      "Why is the website not loading",
      "Browser compatibility",
      "Best browser for MECTEC",
    ],
    keywords: [
      "browser",
      "chrome",
      "firefox",
      "safari",
      "edge",
      "compatibility",
    ],
    answer:
      "Modern browsers such as current versions of Chrome, Firefox, Safari or Edge are generally recommended for the best experience. If the website behaves unexpectedly, try updating the browser or clearing cached data.",
    priority: 80,
  },

  {
    id: "website-search",
    category: "website",
    intent: "general",
    question: "Is there a search feature on the website?",
    variations: [
      "Is there a search feature on the website",
      "Can I search the website",
      "How do I find something on the site",
      "Website search",
      "How to find content quickly",
    ],
    keywords: ["search", "find", "website", "content"],
    answer:
      "Available search or filtering features depend on the current website implementation. The Help Assistant can also answer many questions directly from the local knowledge library.",
    priority: 70,
  },

  // ─────────────────────────────────────────────────────────────
  // ACCOUNTS / PRIVACY / TERMS / FAQ
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-account",
    category: "website",
    intent: "general",
    question: "Do I need an account to use MECTEC?",
    variations: [
      "Do I need an account to use MECTEC",
      "How do I create an account",
      "Do I need to sign up",
      "Can I submit a project without an account",
      "Is login required",
    ],
    keywords: ["account", "login", "signup", "register", "user"],
    answer:
      "The need for an account depends on the current website features. Basic browsing and project request submission may be available without a full account system. Check the website interface or contact MECTEC for the latest requirements.",
    priority: 70,
  },

  {
    id: "website-request-no-account",
    category: "website",
    intent: "project_request",
    question: "Can I submit a request without an account?",
    variations: [
      "Can I submit a request without an account",
      "Request without login",
      "Submit without account",
      "Do I need to register",
      "Guest submission",
    ],
    keywords: ["request", "account", "login", "register", "guest"],
    answer:
      "Account requirements depend on the current website. Basic request submission may be available without an account.",
    priority: 90,
  },

  {
    id: "website-privacy",
    category: "website",
    intent: "contact",
    question: "How is my information handled on the website?",
    variations: [
      "How is my information handled on the website",
      "Is my data safe",
      "Website privacy",
      "What happens to my submitted information",
      "Data protection on MECTEC",
    ],
    keywords: ["privacy", "data", "information", "security"],
    answer:
      "Information handling depends on the website's current policies. For specific privacy or data questions, contact MECTEC directly through the contact options provided on the website.",
    priority: 80,
  },

  {
    id: "website-privacy-policy",
    category: "website",
    intent: "general",
    question: "Where is the privacy policy?",
    variations: [
      "Where is the privacy policy",
      "Website privacy policy",
      "Data policy page",
      "Where is privacy info",
      "GDPR policy",
    ],
    keywords: ["privacy", "policy", "data", "gdpr", "website"],
    answer:
      "Privacy policy location depends on the current website. If not clearly listed, contact MECTEC for information about data handling.",
    priority: 80,
  },

  {
    id: "website-terms",
    category: "website",
    intent: "general",
    question: "Where are the website terms?",
    variations: [
      "Where are the website terms",
      "Terms of use",
      "Website terms and conditions",
      "Legal info on site",
      "Where are terms",
    ],
    keywords: ["terms", "conditions", "legal", "website", "use"],
    answer:
      "Terms and conditions location depends on the current website. If you cannot find them, contact MECTEC for clarification.",
    priority: 80,
  },

  {
    id: "website-faq",
    category: "website",
    intent: "general",
    question: "Is there an FAQ on the website?",
    variations: [
      "Is there an FAQ on the website",
      "Frequently asked questions",
      "Where is FAQ",
      "FAQ page",
      "Common questions website",
    ],
    keywords: ["faq", "questions", "frequently", "website", "page"],
    answer:
      "FAQ availability depends on the current website. The Help Assistant also answers many common questions directly.",
    priority: 80,
  },

  {
    id: "website-blog",
    category: "website",
    intent: "general",
    question: "Does MECTEC have a blog?",
    variations: [
      "Does MECTEC have a blog",
      "Blog on website",
      "Articles page",
      "News section",
      "MECTEC blog",
    ],
    keywords: ["blog", "articles", "news", "website", "section"],
    answer:
      "Blog or article availability depends on the current website. Check the navigation for any blog or news section.",
    priority: 70,
  },

  // ─────────────────────────────────────────────────────────────
  // LANGUAGE / LOCALIZATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-language",
    category: "website",
    intent: "compatibility",
    question: "Is the website available in other languages?",
    variations: [
      "Is the website available in other languages",
      "Website language options",
      "Can I change language",
      "Multi language website",
      "English only",
    ],
    keywords: ["language", "website", "options", "multi", "english"],
    answer:
      "Language support depends on the current website. If additional languages are available, they will appear in the website settings or navigation.",
    priority: 70,
  },

  {
    id: "website-language-change",
    category: "website",
    intent: "general",
    question: "Can I change the website language?",
    variations: [
      "Can I change the website language",
      "Change language",
      "Language switch",
      "Website language setting",
      "Multi language switch",
    ],
    keywords: ["language", "change", "switch", "setting", "website"],
    answer:
      "Language change options depend on the current website. If available, they usually appear in the website settings or navigation.",
    priority: 70,
  },

  // ─────────────────────────────────────────────────────────────
  // ERRORS / PERFORMANCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-error",
    category: "website",
    intent: "troubleshooting",
    question: "What should I do if the website shows an error?",
    variations: [
      "What should I do if the website shows an error",
      "Website not loading",
      "Page shows error",
      "Something is broken on the site",
      "Website glitch",
    ],
    keywords: ["error", "broken", "loading", "issue", "website"],
    answer:
      "Try refreshing the page, checking your internet connection, using an updated browser and clearing the cache if necessary. If the problem continues, contact MECTEC through the provided contact options and describe what happened.",
    priority: 80,
  },

  {
    id: "website-loading",
    category: "website",
    intent: "troubleshooting",
    question: "Why is the website slow to load?",
    variations: [
      "Why is the website slow to load",
      "Website slow",
      "Page takes long to load",
      "Slow site",
      "Loading issues",
    ],
    keywords: ["slow", "loading", "speed", "page", "website"],
    answer:
      "Loading speed depends on your connection, device and the current website state. If the issue continues, try refreshing, switching browsers or reporting the problem to MECTEC.",
    priority: 80,
  },

  {
    id: "website-loading-forever",
    category: "website",
    intent: "troubleshooting",
    question: "Why does the page keep loading?",
    variations: [
      "Why does the page keep loading",
      "Page stuck loading",
      "Website not loading",
      "Endless spinner",
      "Page never loads",
    ],
    keywords: ["loading", "stuck", "spinner", "page", "website"],
    answer:
      "Try refreshing the page, checking your internet connection and using an updated browser. If the issue continues, contact MECTEC and describe the page and behavior.",
    priority: 80,
  },

  {
    id: "website-broken-link",
    category: "website",
    intent: "troubleshooting",
    question: "What if a link is broken on the website?",
    variations: [
      "What if a link is broken on the website",
      "Broken link",
      "Link does not work",
      "Page not found",
      "404 error",
    ],
    keywords: ["broken", "link", "page", "404", "error"],
    answer:
      "If a link does not work, try navigating from the main menu or use the contact options to report the issue. Include the page and link you tried.",
    priority: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // FEEDBACK / SUGGESTIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-feedback",
    category: "website",
    intent: "contact",
    question: "How can I give feedback about the website?",
    variations: [
      "How can I give feedback about the website",
      "I found a problem with the site",
      "How to report a website issue",
      "Website feedback",
      "Suggest an improvement",
    ],
    keywords: ["feedback", "report", "issue", "suggestion", "website"],
    answer:
      "Use the Contact section to report a website issue or send feedback. Describe the page, what you expected and what happened, and include a screenshot if possible.",
    priority: 80,
  },

  {
    id: "website-content-suggestion",
    category: "website",
    intent: "contact",
    question: "Can I suggest website content?",
    variations: [
      "Can I suggest website content",
      "Suggest website content",
      "Idea for website",
      "Content suggestion",
      "Add information to site",
    ],
    keywords: ["suggest", "content", "website", "idea", "information"],
    answer:
      "Yes. Send suggestions through the Contact section. Clear and specific ideas help MECTEC evaluate improvements.",
    priority: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // SEARCH / FINDABILITY
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-search-projects",
    category: "website",
    intent: "general",
    question: "How do I find a specific project on the website?",
    variations: [
      "How do I find a specific project on the website",
      "Find project on site",
      "Search projects",
      "Locate a specific project",
      "Where is a particular project",
    ],
    keywords: ["find", "project", "search", "specific", "website"],
    answer:
      "Use the Projects section and any available filtering or navigation controls. If the specific project is not listed, contact MECTEC directly.",
    priority: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // PROJECT-RELATED WEBSITE META
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-project-pricing",
    category: "website",
    intent: "pricing",
    question: "Does the website show project prices?",
    variations: [
      "Does the website show project prices",
      "Project price on site",
      "Cost shown in projects",
      "Pricing displayed on website",
      "Where to see prices",
    ],
    keywords: ["pricing", "cost", "price", "projects", "website"],
    answer:
      "Project entries may not include prices because cost depends on requirements. Submit the project details for a more meaningful estimate.",
    priority: 90,
  },

  {
    id: "website-project-request-status",
    category: "website",
    intent: "project_request",
    question: "Can I check my request status on the website?",
    variations: [
      "Can I check my request status on the website",
      "Request status on site",
      "Track project request",
      "Check submission status",
      "Where to see request progress",
    ],
    keywords: ["status", "request", "track", "submission", "progress"],
    answer:
      "The current website may not provide a request tracking feature. Contact MECTEC through the provided options to check the status of a submitted request.",
    priority: 90,
  },

  {
    id: "website-projects-images",
    category: "website",
    intent: "general",
    question: "Are there images of projects on the website?",
    variations: [
      "Are there images of projects on the website",
      "Project images website",
      "Photos of builds on site",
      "Project gallery website",
      "See project pictures",
    ],
    keywords: ["images", "photos", "projects", "gallery", "website"],
    answer:
      "Project images may be included in individual project entries. Open a project from the Projects section to view available media.",
    priority: 80,
  },

  {
    id: "website-projects-videos",
    category: "website",
    intent: "general",
    question: "Are there videos on the website?",
    variations: [
      "Are there videos on the website",
      "Videos of projects",
      "Project demo videos",
      "Watch MECTEC videos",
      "Video content website",
    ],
    keywords: ["videos", "projects", "demo", "watch", "website"],
    answer:
      "Video availability depends on the individual project entry. Some projects may include demonstration or build videos.",
    priority: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // ASSISTANT / SYSTEM META
  // ─────────────────────────────────────────────────────────────
  {
    id: "website-assistant-uses",
    category: "website",
    intent: "definition",
    question: "What is the Help Assistant best used for?",
    variations: [
      "What is the Help Assistant best used for",
      "When should I use the assistant",
      "Best use of the chatbot",
      "When to ask the assistant",
      "How to use the assistant well",
    ],
    keywords: ["assistant", "use", "chatbot", "best", "when"],
    answer:
      "Use the assistant for quick questions about MECTEC, services, pricing overview, electronics, embedded systems, sensors, motors, RFID, PCB, firmware, IoT and troubleshooting. For project-specific decisions, use the contact options.",
    priority: 100,
  },

  {
    id: "website-best-practices",
    category: "website",
    intent: "procedure",
    question: "What are best practices for using the website?",
    variations: [
      "What are best practices for using the website",
      "Website best practices",
      "How to use the site well",
      "Website usage tips",
      "Best way to use MECTEC site",
    ],
    keywords: ["best", "practices", "website", "tips", "use"],
    answer:
      "Use the navigation to explore main sections, reference the Projects page for examples, submit clear requests through the request form, and use the Help Assistant for quick information.",
    priority: 100,
  },

  {
    id: "website-report-wrong-answer",
    category: "website",
    intent: "contact",
    question: "What if the assistant gave me a wrong answer?",
    variations: [
      "What if the assistant gave me a wrong answer",
      "Assistant wrong answer",
      "Chatbot incorrect info",
      "Wrong assistant response",
      "Assistant mistake",
    ],
    keywords: ["wrong", "assistant", "answer", "mistake", "report"],
    answer:
      "Use the Contact section to report a wrong or missing answer. Describe the question and the response so the knowledge library can be reviewed and improved.",
    priority: 90,
  },

  {
    id: "website-help-suggest-improvement",
    category: "website",
    intent: "contact",
    question: "Can I suggest an improvement for the website?",
    variations: [
      "Can I suggest an improvement for the website",
      "Suggest a website improvement",
      "Idea for the site",
      "Website improvement suggestion",
      "Feedback for the website",
    ],
    keywords: ["suggest", "improvement", "website", "idea", "feedback"],
    answer:
      "Yes. Send suggestions through the Contact section. Clear and specific ideas help MECTEC evaluate improvements.",
    priority: 80,
  },
];
