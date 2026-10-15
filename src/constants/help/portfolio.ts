import type { HelpEntry } from "./types";

export const PORTFOLIO_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // BROWSING THE PORTFOLIO
  // ─────────────────────────────────────────────────────────────
  {
    id: "portfolio-what-is",
    category: "portfolio",
    intent: "capability",
    question: "Where can I see ProjexiaHub projects?",
    variations: [
      "Where can I see ProjexiaHub projects",
      "Show me your projects",
      "Where is the portfolio",
      "Can I see previous work",
      "Where can I see completed projects",
      "Do you have project examples",
    ],
    keywords: ["projects", "portfolio", "examples", "previous", "work"],
    answer:
      "Visit the Projects section of the ProjexiaHub website to explore available project entries and case studies.",
    priority: 15,
  },

  {
    id: "portfolio-project-details",
    category: "portfolio",
    intent: "definition",
    question: "What information is available about ProjexiaHub projects?",
    variations: [
      "What information is available about ProjexiaHub projects",
      "What do project pages show",
      "Can I see how projects work",
      "Do projects have technical details",
      "What can I learn from a project case study",
    ],
    keywords: ["project", "details", "technical", "case", "study"],
    answer:
      "Project entries can explain the purpose of a build, the problem it addresses, its implementation and the resulting functionality. The exact information depends on the individual project entry.",
    priority: 13,
  },

  {
    id: "portfolio-specific",
    category: "portfolio",
    intent: "capability",
    question: "Can the Help Assistant explain a specific ProjexiaHub project?",
    variations: [
      "Can the Help Assistant explain a specific ProjexiaHub project",
      "Can you tell me about a project",
      "Explain one of your projects",
      "Can the chatbot answer project questions",
      "Tell me about a project in the portfolio",
    ],
    keywords: ["project", "portfolio", "assistant", "explain"],
    answer:
      "The Help Assistant can answer questions that are included in its local knowledge library. Specific project information can be added to the library as the ProjexiaHub portfolio grows.",
    priority: 13,
  },

  {
    id: "portfolio-project-categories",
    category: "portfolio",
    intent: "capability",
    question: "Can I browse projects by category?",
    variations: [
      "Can I browse projects by category",
      "Can I filter projects",
      "Are projects organized by category",
      "How do I find a specific type of project",
      "Can I browse electronics projects",
    ],
    keywords: ["projects", "category", "filter", "browse"],
    answer:
      "Project organization depends on the current Projects page. Use the available category and project navigation controls to find relevant builds.",
    priority: 10,
  },

  {
    id: "portfolio-case-study",
    category: "portfolio",
    intent: "definition",
    question: "What is a project case study?",
    variations: [
      "What is a project case study",
      "What is a case study",
      "Explain project case study",
      "Why case studies are useful",
      "Case study meaning",
    ],
    keywords: ["case", "study", "project", "example", "documentation"],
    answer:
      "A case study documents a project from problem to solution. It typically explains the requirements, approach, implementation and results.",
    priority: 13,
  },

  {
    id: "portfolio-technical-details",
    category: "portfolio",
    intent: "capability",
    question: "Do project pages include technical details?",
    variations: [
      "Do project pages include technical details",
      "Technical documentation in projects",
      "Do projects show schematics",
      "Can I see code from projects",
      "Project technical depth",
    ],
    keywords: ["technical", "details", "schematics", "code", "project"],
    answer:
      "The level of technical detail depends on the individual project entry. Some entries include schematics, code or component lists, while others focus on the outcome.",
    priority: 13,
  },

  {
    id: "portfolio-similar-project",
    category: "portfolio",
    intent: "capability",
    question: "Can I see a project similar to mine?",
    variations: [
      "Can I see a project similar to mine",
      "Similar projects",
      "Projects like mine",
      "Relevant examples",
      "Have you done something like this",
    ],
    keywords: ["similar", "projects", "examples", "relevant", "mine"],
    answer:
      "You can browse the Projects section for related work. If no close match exists, the Help Assistant and ProjexiaHub can still discuss the new requirements.",
    priority: 13,
  },

  {
    id: "portfolio-industry",
    category: "portfolio",
    intent: "capability",
    question: "Do you have projects in my industry?",
    variations: [
      "Do you have projects in my industry",
      "Industry specific projects",
      "Projects for my field",
      "Sector experience",
      "Work in my industry",
    ],
    keywords: ["industry", "field", "sector", "projects", "experience"],
    answer:
      "Project coverage depends on the ProjexiaHub portfolio. Check the Projects section for related work or contact ProjexiaHub to discuss your sector.",
    priority: 10,
  },

  {
    id: "portfolio-search-projects",
    category: "portfolio",
    intent: "capability",
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
      "Use the Projects section and any available filtering or navigation controls. If the specific project is not listed, contact ProjexiaHub directly.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // TECHNOLOGIES SHOWN
  // ─────────────────────────────────────────────────────────────
  {
    id: "portfolio-technology",
    category: "portfolio",
    intent: "capability",
    question: "What technologies have you worked with?",
    variations: [
      "What technologies have you worked with",
      "Technologies used in projects",
      "Platforms you work with",
      "Tech stack",
      "Tools and platforms",
    ],
    keywords: ["technologies", "platforms", "tools", "stack", "projects"],
    answer:
      "ProjexiaHub projects can involve microcontrollers, embedded firmware, sensors, communication modules, PCB design, IoT, automation and related technologies depending on the project.",
    priority: 13,
  },

  {
    id: "portfolio-arduino",
    category: "portfolio",
    intent: "capability",
    question: "Do you have Arduino projects in your portfolio?",
    variations: [
      "Do you have Arduino projects in your portfolio",
      "Arduino portfolio",
      "Arduino project examples",
      "Have you built Arduino projects",
      "Arduino case studies",
    ],
    keywords: ["arduino", "projects", "portfolio", "examples", "case"],
    answer:
      "Arduino projects may appear in the portfolio depending on the individual builds. The Projects section shows available entries.",
    priority: 10,
  },

  {
    id: "portfolio-esp32",
    category: "portfolio",
    intent: "capability",
    question: "Do you have ESP32 projects in your portfolio?",
    variations: [
      "Do you have ESP32 projects in your portfolio",
      "ESP32 portfolio",
      "ESP32 project examples",
      "Have you built ESP32 projects",
      "ESP32 case studies",
    ],
    keywords: ["esp32", "projects", "portfolio", "examples", "iot"],
    answer:
      "ESP32 projects may appear in the portfolio depending on the individual builds. The Projects section shows available entries.",
    priority: 10,
  },

  {
    id: "portfolio-iot",
    category: "portfolio",
    intent: "capability",
    question: "Do you have IoT projects in your portfolio?",
    variations: [
      "Do you have IoT projects in your portfolio",
      "IoT portfolio",
      "IoT project examples",
      "Connected device projects",
      "IoT case studies",
    ],
    keywords: ["iot", "projects", "portfolio", "connected", "examples"],
    answer:
      "IoT projects may appear in the portfolio depending on the individual builds. Check the Projects section for available examples.",
    priority: 13,
  },

  {
    id: "portfolio-automation",
    category: "portfolio",
    intent: "capability",
    question: "Do you have automation projects in your portfolio?",
    variations: [
      "Do you have automation projects in your portfolio",
      "Automation portfolio",
      "Automation project examples",
      "Control system projects",
      "Automation case studies",
    ],
    keywords: ["automation", "projects", "portfolio", "control", "examples"],
    answer:
      "Automation projects may appear in the portfolio depending on the individual builds. Check the Projects section for examples.",
    priority: 13,
  },

  {
    id: "portfolio-rfid",
    category: "portfolio",
    intent: "capability",
    question: "Do you have RFID projects in your portfolio?",
    variations: [
      "Do you have RFID projects in your portfolio",
      "RFID portfolio",
      "RFID project examples",
      "Access control projects",
      "RFID case studies",
    ],
    keywords: ["rfid", "projects", "portfolio", "access", "examples"],
    answer:
      "RFID projects may appear in the portfolio depending on the individual builds. Check the Projects section for available examples.",
    priority: 10,
  },

  {
    id: "portfolio-robotics",
    category: "portfolio",
    intent: "capability",
    question: "Do you have robotics projects in your portfolio?",
    variations: [
      "Do you have robotics projects in your portfolio",
      "Robotics portfolio",
      "Robot project examples",
      "Motion control projects",
      "Robotics case studies",
    ],
    keywords: ["robotics", "projects", "portfolio", "motion", "examples"],
    answer:
      "Robotics and motion control projects may appear in the portfolio depending on the individual builds. Check the Projects section for available examples.",
    priority: 10,
  },

  {
    id: "portfolio-pcb",
    category: "portfolio",
    intent: "capability",
    question: "Do you have PCB design examples?",
    variations: [
      "Do you have PCB design examples",
      "PCB portfolio",
      "Circuit board examples",
      "PCB design work",
      "Board design case study",
    ],
    keywords: ["pcb", "design", "portfolio", "board", "examples"],
    answer:
      "PCB-related work may appear in the portfolio depending on the project. Check the Projects section for board design examples.",
    priority: 10,
  },

  {
    id: "portfolio-firmware",
    category: "portfolio",
    intent: "capability",
    question: "Do you show firmware or code in the portfolio?",
    variations: [
      "Do you show firmware or code in the portfolio",
      "Firmware examples",
      "Code in portfolio",
      "Software in projects",
      "Firmware case study",
    ],
    keywords: ["firmware", "code", "software", "portfolio", "projects"],
    answer:
      "Firmware or code may be referenced in project entries depending on the level of technical detail included.",
    priority: 10,
  },

  {
    id: "portfolio-schematics",
    category: "portfolio",
    intent: "capability",
    question: "Are schematics shown in the portfolio?",
    variations: [
      "Are schematics shown in the portfolio",
      "Schematics in project",
      "Circuit diagrams in portfolio",
      "Wiring diagrams in project",
      "Schematic availability",
    ],
    keywords: ["schematics", "circuit", "wiring", "portfolio", "project"],
    answer:
      "Schematic availability depends on the individual project and any confidentiality considerations. Some entries may include diagrams.",
    priority: 10,
  },

  {
    id: "portfolio-code",
    category: "portfolio",
    intent: "capability",
    question: "Is source code shown in the portfolio?",
    variations: [
      "Is source code shown in the portfolio",
      "Code in projects",
      "Source code examples",
      "Firmware in portfolio",
      "Project code availability",
    ],
    keywords: ["code", "source", "firmware", "portfolio", "projects"],
    answer:
      "Source code may be referenced in project entries, but full code may be part of the delivered project rather than published in the portfolio.",
    priority: 10,
  },

  {
    id: "portfolio-components",
    category: "portfolio",
    intent: "capability",
    question: "Does the portfolio list components used?",
    variations: [
      "Does the portfolio list components used",
      "Component list in project",
      "Parts used in build",
      "BOM in portfolio",
      "Components for project",
    ],
    keywords: ["components", "parts", "bom", "portfolio", "list"],
    answer:
      "Some project entries may list components or describe the hardware used. The level of detail depends on the entry.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MEDIA / DOCUMENTATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "portfolio-images",
    category: "portfolio",
    intent: "capability",
    question: "Are there photos of ProjexiaHub projects?",
    variations: [
      "Are there photos of ProjexiaHub projects",
      "Project photos",
      "Can I see images of builds",
      "Gallery of projects",
      "Pictures of ProjexiaHub work",
    ],
    keywords: ["photos", "images", "gallery", "pictures", "projects"],
    answer:
      "Project entries may include photos or images depending on the entry. Visual documentation helps show the build and its results.",
    priority: 10,
  },

  {
    id: "portfolio-video",
    category: "portfolio",
    intent: "capability",
    question: "Are there videos of projects?",
    variations: [
      "Are there videos of projects",
      "Project videos",
      "Can I watch a demo",
      "Video of build",
      "ProjexiaHub project demo",
    ],
    keywords: ["video", "demo", "project", "watch", "build"],
    answer:
      "Video availability depends on the individual project entry. Some projects may include demonstration or build videos.",
    priority: 9,
  },

  {
    id: "portfolio-media",
    category: "portfolio",
    intent: "capability",
    question: "Can I see more media from a project?",
    variations: [
      "Can I see more media from a project",
      "More photos of project",
      "Additional project images",
      "Project media gallery",
      "See more of build",
    ],
    keywords: ["media", "photos", "images", "gallery", "project"],
    answer:
      "Media availability depends on the individual project entry. Additional photos or videos may be included if available.",
    priority: 9,
  },

  {
    id: "portfolio-documentation",
    category: "portfolio",
    intent: "capability",
    question: "Is documentation available for portfolio projects?",
    variations: [
      "Is documentation available for portfolio projects",
      "Project documentation portfolio",
      "Reports for projects",
      "Technical writeup",
      "Case study documentation",
    ],
    keywords: ["documentation", "portfolio", "reports", "technical", "case"],
    answer:
      "Documentation availability depends on the individual entry. Some projects may include detailed writeups, while others provide an overview.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // CASE STUDY REQUESTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "portfolio-case-study-request",
    category: "portfolio",
    intent: "capability",
    question: "Can I request a case study for a specific project?",
    variations: [
      "Can I request a case study for a specific project",
      "Case study request",
      "Detailed writeup request",
      "More info on project",
      "Request project details",
    ],
    keywords: ["case", "study", "request", "details", "project"],
    answer:
      "Additional project details may be available on request depending on confidentiality. Use the contact options to ask.",
    priority: 10,
  },

  {
    id: "portfolio-contact-project",
    category: "portfolio",
    intent: "contact",
    question: "Who do I contact about a portfolio project?",
    variations: [
      "Who do I contact about a portfolio project",
      "Contact about project example",
      "Ask about portfolio entry",
      "Discuss a project I saw",
      "Question about project",
    ],
    keywords: ["contact", "portfolio", "project", "discuss", "ask"],
    answer:
      "Use the contact options on the website to ask about a project or discuss something similar. Include the project reference if applicable.",
    priority: 13,
  },

  {
    id: "portfolio-request-similar",
    category: "portfolio",
    intent: "project_request",
    question: "Can I request a project similar to one in the portfolio?",
    variations: [
      "Can I request a project similar to one in the portfolio",
      "Build something like this",
      "Request similar project",
      "Copy a portfolio project",
      "Base project on example",
    ],
    keywords: ["request", "similar", "portfolio", "example", "project"],
    answer:
      "Yes. Use the Project Request option to describe what you want, referencing a portfolio example if helpful. The scope can then be discussed.",
    priority: 13,
  },

  {
    id: "portfolio-request-quote",
    category: "portfolio",
    intent: "pricing",
    question: "Can I request a quote for a project like one in the portfolio?",
    variations: [
      "Can I request a quote for a project like one in the portfolio",
      "Quote for similar project",
      "Pricing for portfolio project",
      "How much for similar build",
      "Cost estimate from portfolio",
    ],
    keywords: ["quote", "portfolio", "similar", "project", "cost"],
    answer:
      "Submit a project request referencing the portfolio entry. A scope and estimate can then be discussed based on your specific requirements.",
    priority: 13,
  },

  {
    id: "portfolio-pricing-reference",
    category: "portfolio",
    intent: "pricing",
    question: "Does the portfolio show project prices?",
    variations: [
      "Does the portfolio show project prices",
      "Project prices in portfolio",
      "Cost examples",
      "How much did that project cost",
      "Portfolio pricing",
    ],
    keywords: ["prices", "portfolio", "cost", "examples", "project"],
    answer:
      "Portfolio entries may not include prices because cost depends on the specific requirements. Submit the project details for a more meaningful estimate.",
    priority: 10,
  },

  {
    id: "portfolio-timeline-reference",
    category: "portfolio",
    intent: "timeline",
    question: "Does the portfolio show how long projects took?",
    variations: [
      "Does the portfolio show how long projects took",
      "Project timelines in portfolio",
      "How long did that project take",
      "Portfolio duration",
      "Project time examples",
    ],
    keywords: ["timeline", "portfolio", "duration", "project", "time"],
    answer:
      "Timeline details may or may not be included in individual project entries. Project duration depends on scope and complexity.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PORTFOLIO TYPES / COVERAGE
  // ─────────────────────────────────────────────────────────────
  {
    id: "portfolio-student",
    category: "portfolio",
    intent: "capability",
    question: "Do you show student or educational projects?",
    variations: [
      "Do you show student or educational projects",
      "Student portfolio",
      "University project examples",
      "FYP case studies",
      "Educational projects",
    ],
    keywords: ["student", "educational", "university", "fyp", "projects"],
    answer:
      "Educational and student projects may appear in the portfolio depending on the individual builds. Check the Projects section for available examples.",
    priority: 10,
  },

  {
    id: "portfolio-commercial",
    category: "portfolio",
    intent: "capability",
    question: "Do you show commercial projects?",
    variations: [
      "Do you show commercial projects",
      "Commercial portfolio",
      "Business project examples",
      "Client work",
      "Commercial case studies",
    ],
    keywords: ["commercial", "business", "client", "portfolio", "projects"],
    answer:
      "Commercial project visibility depends on client confidentiality and the individual project. Check the Projects section for available entries.",
    priority: 10,
  },

  {
    id: "portfolio-confidential",
    category: "portfolio",
    intent: "capability",
    question: "Why are some projects not shown?",
    variations: [
      "Why are some projects not shown",
      "Missing projects",
      "Confidential projects",
      "Why is portfolio limited",
      "Projects not listed",
    ],
    keywords: ["confidential", "missing", "portfolio", "limited", "projects"],
    answer:
      "Some projects may not be shown due to confidentiality, client agreements or ongoing development. Available projects appear in the Projects section.",
    priority: 10,
  },

  {
    id: "portfolio-updated",
    category: "portfolio",
    intent: "capability",
    question: "How often is the portfolio updated?",
    variations: [
      "How often is the portfolio updated",
      "New projects added",
      "When is portfolio updated",
      "Latest ProjexiaHub work",
      "Recent projects",
    ],
    keywords: ["updated", "new", "recent", "latest", "portfolio"],
    answer:
      "Portfolio updates depend on project completion and publication. Check the Projects section for the latest entries.",
    priority: 10,
  },

  {
    id: "portfolio-versions",
    category: "portfolio",
    intent: "capability",
    question: "Are older project versions shown?",
    variations: [
      "Are older project versions shown",
      "Previous versions of project",
      "Old project entries",
      "Project history",
      "Updated project versions",
    ],
    keywords: ["versions", "older", "previous", "history", "projects"],
    answer:
      "Portfolio entries typically show the final or documented version. Older versions may not be listed unless specifically documented.",
    priority: 9,
  },

  {
    id: "portfolio-custom",
    category: "portfolio",
    intent: "capability",
    question: "Are all portfolio projects custom?",
    variations: [
      "Are all portfolio projects custom",
      "Custom projects in portfolio",
      "Do you show custom builds",
      "Portfolio includes custom work",
      "Custom project examples",
    ],
    keywords: ["custom", "portfolio", "projects", "builds", "examples"],
    answer:
      "Portfolio projects may include custom builds, prototypes and production work depending on the entry. The Projects section shows available examples.",
    priority: 10,
  },

  {
    id: "portfolio-standard",
    category: "portfolio",
    intent: "capability",
    question: "Do you have standard product examples?",
    variations: [
      "Do you have standard product examples",
      "Standard products",
      "Off the shelf designs",
      "Product lineup",
      "Common builds",
    ],
    keywords: ["standard", "products", "designs", "lineup", "builds"],
    answer:
      "ProjexiaHub focuses on custom and project-based work. Standard product availability should be confirmed with ProjexiaHub directly.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // USING PORTFOLIO / REUSE / ATTRIBUTION
  // ─────────────────────────────────────────────────────────────
  {
    id: "portfolio-trust",
    category: "portfolio",
    intent: "capability",
    question: "How does the portfolio show your capabilities?",
    variations: [
      "How does the portfolio show your capabilities",
      "Portfolio shows skills",
      "Proof of work",
      "Demonstrate experience",
      "Examples of skills",
    ],
    keywords: ["portfolio", "capabilities", "skills", "experience", "examples"],
    answer:
      "The portfolio demonstrates experience through documented projects. Combined with direct discussion, it helps assess fit for your requirements.",
    priority: 10,
  },

  {
    id: "portfolio-non-disclosure",
    category: "portfolio",
    intent: "compatibility",
    question: "Are portfolio projects covered by NDA?",
    variations: [
      "Are portfolio projects covered by NDA",
      "NDA projects",
      "Confidential work",
      "Private projects",
      "Restricted portfolio",
    ],
    keywords: ["nda", "confidential", "private", "restricted", "portfolio"],
    answer:
      "Some projects may be covered by NDA and therefore not published. Available entries appear in the Projects section.",
    priority: 10,
  },

  {
    id: "portfolio-published",
    category: "portfolio",
    intent: "compatibility",
    question: "Can I publish a portfolio project on my website?",
    variations: [
      "Can I publish a portfolio project on my website",
      "Use project images",
      "Publish project info",
      "Share portfolio entry",
      "Repost project",
    ],
    keywords: ["publish", "portfolio", "images", "share", "repost"],
    answer:
      "Permission to republish project information depends on the project and ProjexiaHub policy. Contact ProjexiaHub before using project content externally.",
    priority: 10,
  },

  {
    id: "portfolio-attribution",
    category: "portfolio",
    intent: "compatibility",
    question: "Do I need to attribute ProjexiaHub if I reference a project?",
    variations: [
      "Do I need to attribute ProjexiaHub if I reference a project",
      "Attribution required",
      "Credit ProjexiaHub",
      "Reference project source",
      "Cite portfolio",
    ],
    keywords: ["attribution", "credit", "reference", "cite", "portfolio"],
    answer:
      "Attribution and usage terms depend on the project and ProjexiaHub policy. Contact ProjexiaHub if you plan to reference project content.",
    priority: 9,
  },

  {
    id: "portfolio-licensing",
    category: "portfolio",
    intent: "compatibility",
    question: "Can I reuse project designs from the portfolio?",
    variations: [
      "Can I reuse project designs from the portfolio",
      "Reuse project design",
      "Copy portfolio build",
      "Use project files",
      "Licensing portfolio",
    ],
    keywords: ["reuse", "design", "portfolio", "copy", "licensing"],
    answer:
      "Reuse of project designs depends on IP and licensing terms. Contact ProjexiaHub before reusing any design or content.",
    priority: 13,
  },

  {
    id: "portfolio-open-source",
    category: "portfolio",
    intent: "compatibility",
    question: "Are any portfolio projects open source?",
    variations: [
      "Are any portfolio projects open source",
      "Open source portfolio",
      "Free project designs",
      "Shareable projects",
      "Open hardware",
    ],
    keywords: ["open", "source", "portfolio", "projects", "hardware"],
    answer:
      "Some projects may be open source or include shared resources. Check individual project entries and contact ProjexiaHub for clarity.",
    priority: 10,
  },

  {
    id: "portfolio-permission",
    category: "portfolio",
    intent: "compatibility",
    question: "Can I use a portfolio project as inspiration?",
    variations: [
      "Can I use a portfolio project as inspiration",
      "Use project as inspiration",
      "Learn from portfolio",
      "Reference project idea",
      "Idea from portfolio",
    ],
    keywords: ["inspiration", "portfolio", "learn", "reference", "idea"],
    answer:
      "Yes. Portfolio entries can be used as inspiration. If you want something similar, describe your requirements in a project request.",
    priority: 13,
  },

  {
    id: "portfolio-collaboration",
    category: "portfolio",
    intent: "capability",
    question: "Can I collaborate on a portfolio project?",
    variations: [
      "Can I collaborate on a portfolio project",
      "Collaborate on project",
      "Work together on build",
      "Join project",
      "Project partnership",
    ],
    keywords: ["collaboration", "portfolio", "project", "work", "partnership"],
    answer:
      "Collaboration opportunities depend on the project and ProjexiaHub policy. Use the contact options to discuss possibilities.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // FEEDBACK / SUGGESTIONS / EVALUATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "portfolio-feedback",
    category: "portfolio",
    intent: "contact",
    question: "Can I give feedback on a portfolio project?",
    variations: [
      "Can I give feedback on a portfolio project",
      "Feedback on project",
      "Comment on portfolio",
      "Suggest improvement",
      "Thoughts on a project",
    ],
    keywords: ["feedback", "portfolio", "project", "comment", "improvement"],
    answer:
      "Yes. Feedback can be sent through the contact options. Clear, constructive input is appreciated.",
    priority: 10,
  },

  {
    id: "portfolio-suggest",
    category: "portfolio",
    intent: "project_request",
    question: "Can I suggest a project idea for the portfolio?",
    variations: [
      "Can I suggest a project idea for the portfolio",
      "Suggest project",
      "Propose new build",
      "Idea for ProjexiaHub",
      "Request new project",
    ],
    keywords: ["suggest", "project", "idea", "portfolio", "request"],
    answer:
      "Yes. Submit your idea through the Project Request option. If suitable, it can be considered for development and future portfolio inclusion.",
    priority: 13,
  },

  {
    id: "portfolio-similarity",
    category: "portfolio",
    intent: "capability",
    question: "Can I tell if a portfolio project matches my needs?",
    variations: [
      "Can I tell if a portfolio project matches my needs",
      "Which project matches mine",
      "Compare portfolio to my idea",
      "Relevant portfolio entry",
      "Find matching project",
    ],
    keywords: ["match", "portfolio", "needs", "compare", "relevant"],
    answer:
      "Review the Projects section for related work. If nothing matches exactly, describe your requirements and ProjexiaHub can evaluate the project.",
    priority: 10,
  },

  {
    id: "portfolio-summary",
    category: "portfolio",
    intent: "procedure",
    question: "What should I look for in the portfolio?",
    variations: [
      "What should I look for in the portfolio",
      "What to look for in portfolio",
      "How to review portfolio",
      "Key info in projects",
      "Evaluate portfolio",
    ],
    keywords: ["look", "portfolio", "review", "evaluate", "projects"],
    answer:
      "Look for projects similar to your requirements, the technologies used, the level of documentation and the results achieved. Then discuss your specific needs with ProjexiaHub.",
    priority: 13,
  },

  {
    id: "portfolio-best-practices",
    category: "portfolio",
    intent: "procedure",
    question: "What are best practices for using the portfolio?",
    variations: [
      "What are best practices for using the portfolio",
      "How to use the portfolio",
      "Portfolio tips",
      "Use portfolio effectively",
      "Portfolio best practices",
    ],
    keywords: ["best", "practices", "portfolio", "use", "tips"],
    answer:
      "Use the portfolio to understand capabilities and style, identify similar work, and reference examples in your request. Then discuss your exact requirements directly with ProjexiaHub.",
    priority: 13,
  },
];
