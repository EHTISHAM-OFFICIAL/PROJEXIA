import type { HelpEntry } from "./types";

export const CASUAL_HELP: HelpEntry[] = [
  {
    id: "casual-how-are-you",
    category: "casual",
    intent: "general",
    question: "How are you?",
    variations: [
      "How are you",
      "How are you doing",
      "How are you today",
      "How have you been",
      "How is it going",
      "How are things",
      "How are things going",
      "Are you doing well",
      "Are you okay",
      "How is everything",
    ],
    keywords: ["how", "doing", "well", "okay", "everything", "going"],
    answer:
      "I'm doing great! 👋 Thanks for asking. I'm here and ready to help you with MECTEC, whether you need information about projects, electronics, services, pricing, or troubleshooting.",
    priority: 100,
  },

  {
    id: "casual-thanks",
    category: "casual",
    intent: "general",
    question: "Thank you",
    variations: [
      "Thank you",
      "Thanks",
      "Thanks a lot",
      "Thank you so much",
      "Thanks for your help",
      "Thank you for helping",
      "Appreciate it",
      "I appreciate it",
    ],
    keywords: ["thank", "thanks", "appreciate", "help"],
    answer:
      "You're very welcome! 😊 If you need anything else, just ask. I'm happy to help.",
    priority: 100,
  },

  {
    id: "casual-goodbye",
    category: "casual",
    intent: "general",
    question: "Goodbye",
    variations: [
      "Goodbye",
      "Bye",
      "Bye bye",
      "See you",
      "See you later",
      "Talk to you later",
    ],
    keywords: ["goodbye", "bye", "later"],
    answer:
      "Goodbye! 👋 Thanks for visiting MECTEC. Have a great day, and feel free to come back whenever you need help.",
    priority: 100,
  },

  {
    id: "casual-good-night",
    category: "casual",
    intent: "general",
    question: "Good night",
    variations: ["Good night", "Goodnight", "Have a good night"],
    keywords: ["night", "goodnight"],
    answer:
      "Good night! 🌙 Take care, and feel free to visit MECTEC again whenever you need help.",
    priority: 100,
  },
];
