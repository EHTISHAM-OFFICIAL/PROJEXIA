export const PORTFOLIO_HELP = [
  {
    id: "portfolio-what-is",
    category: "portfolio",
    question: "Where can I see MECTEC projects?",
    variations: [
      "Show me your projects",
      "Where is the portfolio",
      "Can I see previous work",
      "Where can I see completed projects",
      "Do you have project examples",
    ],
    keywords: ["projects", "portfolio", "examples", "previous", "work"],
    answer:
      "Visit the Projects section of the MECTEC website to explore available project entries and case studies.",
    priority: 10,
  },

  {
    id: "portfolio-project-details",
    category: "portfolio",
    question: "What information is available about MECTEC projects?",
    variations: [
      "What do project pages show",
      "Can I see how projects work",
      "Do projects have technical details",
      "What can I learn from a project case study",
    ],
    keywords: ["project", "details", "technical", "case", "study"],
    answer:
      "Project entries can explain the purpose of a build, the problem it addresses, its implementation and the resulting functionality. The exact information depends on the individual project entry.",
    priority: 9,
  },

  {
    id: "portfolio-specific",
    category: "portfolio",
    question: "Can the Help Assistant explain a specific MECTEC project?",
    variations: [
      "Can you tell me about a project",
      "Explain one of your projects",
      "Can the chatbot answer project questions",
      "Tell me about a project in the portfolio",
    ],
    keywords: ["project", "portfolio", "assistant", "explain"],
    answer:
      "The Help Assistant can answer questions that are included in its local knowledge library. Specific project information can be added to the library as the MECTEC portfolio grows.",
    priority: 9,
  },

  {
    id: "portfolio-project-categories",
    category: "portfolio",
    question: "Can I browse projects by category?",
    variations: [
      "Can I filter projects",
      "Are projects organized by category",
      "How do I find a specific type of project",
      "Can I browse electronics projects",
    ],
    keywords: ["projects", "category", "filter", "browse"],
    answer:
      "Project organization depends on the current Projects page. Use the available category and project navigation controls to find relevant builds.",
    priority: 7,
  },
] as const;
