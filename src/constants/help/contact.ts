import { SITE } from "../site";

export const CONTACT_HELP = [
  {
    id: "contact-email",
    category: "contact",
    question: "What is the MECTEC email?",
    variations: [
      "How can I email MECTEC",
      "What email should I use",
      "Give me the MECTEC email",
      "Where can I send an email",
      "What is your email address",
    ],
    keywords: ["email", "mail", "address", "contact"],
    answer: `MECTEC can be contacted by email at ${SITE.email}.`,
    priority: 10,
  },

  {
    id: "contact-whatsapp",
    category: "contact",
    question: "Can I contact MECTEC through WhatsApp?",
    variations: [
      "Do you have WhatsApp",
      "Can I WhatsApp MECTEC",
      "How do I contact you on WhatsApp",
      "Can I message you on WhatsApp",
      "Is WhatsApp available",
    ],
    keywords: ["whatsapp", "message", "contact", "chat"],
    answer: SITE.whatsapp
      ? `Yes. MECTEC provides WhatsApp contact through the WhatsApp button available on the website.`
      : `MECTEC can be reached through the contact page and email at ${SITE.email}.`,
    priority: 10,
  },

  {
    id: "contact-project",
    category: "contact",
    question: "Where should I contact MECTEC about a project?",
    variations: [
      "Where do I send my project idea",
      "How do I discuss a project",
      "Who do I contact about a project",
      "Where can I ask about a custom project",
    ],
    keywords: ["project", "contact", "idea", "request", "custom"],
    answer:
      "For a new project, the project request form is the best starting point because it collects the information needed to understand the requirements. You can also use the contact options provided on the website.",
    priority: 10,
  },

  {
    id: "contact-help-assistant",
    category: "contact",
    question: "Can the Help Assistant contact MECTEC for me?",
    variations: [
      "Can the chatbot contact someone",
      "Can this assistant send my request",
      "Can the chatbot email MECTEC",
      "Can you contact MECTEC for me",
    ],
    keywords: ["assistant", "chatbot", "contact", "email", "send"],
    answer:
      "The Help Assistant provides instant information from MECTEC's local knowledge library. For an actual project request or direct conversation, use the request or contact options on the website.",
    priority: 9,
  },
] as const;
