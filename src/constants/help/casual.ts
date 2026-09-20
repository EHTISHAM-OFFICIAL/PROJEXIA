import type { HelpEntry } from "./types";

export const CASUAL_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // HOW ARE YOU / WELLBEING
  // ─────────────────────────────────────────────────────────────
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
      "How's life",
    ],
    keywords: ["how", "doing", "well", "okay", "everything", "going"],
    answer:
      "I'm doing great! 👋 Thanks for asking. I'm here and ready to help you with MECTEC, whether you need information about projects, electronics, services, pricing, or troubleshooting.",
    priority: 100,
  },

  {
    id: "casual-are-you-okay",
    category: "casual",
    intent: "general",
    question: "Are you okay?",
    variations: [
      "Are you okay",
      "Are you alright",
      "Are you fine",
      "Is everything alright",
      "You good",
      "Everything okay",
    ],
    keywords: ["okay", "alright", "fine", "good", "everything"],
    answer:
      "All good on my side, thanks for asking! 😊 What can I help you with?",
    priority: 100,
  },

  {
    id: "casual-how-was-your-day",
    category: "casual",
    intent: "general",
    question: "How was your day?",
    variations: [
      "How was your day",
      "How has your day been",
      "How is your day",
      "Had a good day",
      "How did your day go",
    ],
    keywords: ["day", "was", "how", "been", "went"],
    answer:
      "Can't complain — always ready to help! 😊 How about you? What brings you to MECTEC today?",
    priority: 100,
  },

  {
    id: "casual-whats-up",
    category: "casual",
    intent: "general",
    question: "What's up?",
    variations: [
      "What's up",
      "Whats up",
      "What is up",
      "What is new",
      "What's new",
      "Sup",
      "Wassup",
    ],
    keywords: ["whats", "up", "new", "sup"],
    answer:
      "Not much on my end—just ready to help! 😊 What can I do for you today?",
    priority: 100,
  },

  {
    id: "casual-how-are-you-doing-today",
    category: "casual",
    intent: "general",
    question: "How are you feeling?",
    variations: [
      "How are you feeling",
      "How do you feel",
      "You feeling good",
      "Feeling okay",
      "Are you well",
    ],
    keywords: ["feeling", "feel", "well", "good", "okay"],
    answer:
      "Feeling helpful! 😊 Thanks for asking. What would you like to talk about today?",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // THANKS / GRATITUDE
  // ─────────────────────────────────────────────────────────────
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
      "Much appreciated",
    ],
    keywords: ["thank", "thanks", "appreciate", "help"],
    answer:
      "You're very welcome! 😊 If you need anything else, just ask. I'm happy to help.",
    priority: 100,
  },

  {
    id: "casual-thanks-again",
    category: "casual",
    intent: "general",
    question: "Thanks again",
    variations: [
      "Thanks again",
      "Thanks once more",
      "Thank you again",
      "Appreciate your help again",
      "Thank you once more",
    ],
    keywords: ["thanks", "again", "appreciate", "help"],
    answer:
      "You're welcome again! 😊 I'm here whenever you need more information.",
    priority: 100,
  },

  {
    id: "casual-much-appreciated",
    category: "casual",
    intent: "general",
    question: "Much appreciated",
    variations: [
      "Much appreciated",
      "Really appreciated",
      "Greatly appreciated",
      "Thanks a bunch",
      "Thanks a ton",
    ],
    keywords: ["appreciated", "much", "thanks", "bunch", "ton"],
    answer: "Happy to help! 😊 Let me know if anything else comes up.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // GOODBYE / SEE YOU
  // ─────────────────────────────────────────────────────────────
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
      "Catch you later",
      "Later",
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
    variations: [
      "Good night",
      "Goodnight",
      "Have a good night",
      "Night",
      "Sleep well",
    ],
    keywords: ["night", "goodnight"],
    answer:
      "Good night! 🌙 Take care, and feel free to visit MECTEC again whenever you need help.",
    priority: 100,
  },

  {
    id: "casual-bye-for-now",
    category: "casual",
    intent: "general",
    question: "Bye for now",
    variations: [
      "Bye for now",
      "Catch you later",
      "Until next time",
      "See you next time",
      "Until we meet again",
    ],
    keywords: ["bye", "later", "next", "time"],
    answer:
      "Bye for now! 👋 Feel free to come back anytime you need help from MECTEC.",
    priority: 100,
  },

  {
    id: "casual-farewell",
    category: "casual",
    intent: "general",
    question: "Farewell",
    variations: [
      "Farewell",
      "Adieu",
      "Fare well",
      "Goodbye forever",
      "Parting ways",
    ],
    keywords: ["farewell", "adieu", "goodbye"],
    answer:
      "Farewell! 👋 Thanks for stopping by MECTEC. Feel free to return anytime.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // GOOD MOOD / FEELING GOOD
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-happy",
    category: "casual",
    intent: "general",
    question: "I'm happy",
    variations: [
      "I'm happy",
      "I am happy",
      "Feeling good",
      "Great mood",
      "Feeling great",
      "In a good mood",
      "Feeling amazing",
    ],
    keywords: ["happy", "good", "mood", "great"],
    answer:
      "That's great to hear! 😊 What would you like to do next? I can help with MECTEC, electronics, project ideas or general technical questions.",
    priority: 100,
  },

  {
    id: "casual-excited",
    category: "casual",
    intent: "general",
    question: "I'm excited about my project",
    variations: [
      "I'm excited about my project",
      "I am excited",
      "I can not wait",
      "This is going to be great",
      "I am looking forward to it",
      "Super excited",
    ],
    keywords: ["excited", "wait", "great", "forward"],
    answer:
      "That's great to hear! 😊 The best next step is to describe your project idea and requirements so MECTEC can understand what you want to build. Use the Project Request option on the website to get started.",
    priority: 100,
  },

  {
    id: "casual-love-it",
    category: "casual",
    intent: "general",
    question: "I love this",
    variations: [
      "I love this",
      "This is great",
      "I love it",
      "This is amazing",
      "Awesome work",
      "Very cool",
      "This is fantastic",
    ],
    keywords: ["love", "great", "amazing", "awesome", "cool"],
    answer:
      "Thank you! 😊 I'm glad you like it. If you want to explore more, the Projects section or the knowledge library are good places to look.",
    priority: 100,
  },

  {
    id: "casual-nice",
    category: "casual",
    intent: "general",
    question: "Nice",
    variations: [
      "Nice",
      "Cool",
      "Awesome",
      "Great",
      "Sweet",
      "Neat",
      "Very nice",
    ],
    keywords: ["nice", "cool", "awesome", "great", "sweet"],
    answer: "Glad you think so! 😊 Anything else I can help with?",
    priority: 100,
  },

  {
    id: "casual-wow",
    category: "casual",
    intent: "general",
    question: "Wow",
    variations: [
      "Wow",
      "That is surprising",
      "I did not expect that",
      "Amazing",
      "Incredible",
      "Whoa",
    ],
    keywords: ["wow", "surprising", "amazing", "incredible"],
    answer:
      "Glad it caught your interest! 😊 If you want to explore more, I can share information about MECTEC projects, services, or technical topics.",
    priority: 100,
  },

  {
    id: "casual-interesting",
    category: "casual",
    intent: "general",
    question: "Interesting",
    variations: [
      "Interesting",
      "That is interesting",
      "Very interesting",
      "Fascinating",
      "That's cool",
    ],
    keywords: ["interesting", "very", "that", "fascinating"],
    answer:
      "Glad you find it interesting! 😊 If you want to explore more, I can share related information from the knowledge library.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // BAD MOOD / FRUSTRATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-frustrated",
    category: "casual",
    intent: "general",
    question: "I'm frustrated with my project",
    variations: [
      "I'm frustrated with my project",
      "This is frustrating",
      "My project is not working and I am annoyed",
      "I am stuck",
      "Nothing works",
      "I am having a hard time",
    ],
    keywords: ["frustrated", "stuck", "annoyed", "hard", "problem"],
    answer:
      "That can be really frustrating. 😕 If you describe what is happening, I can help with troubleshooting topics such as power, wiring, communication, sensors, firmware or general circuit debugging. For project-specific help, you can also contact MECTEC.",
    priority: 100,
  },

  {
    id: "casual-bad-day",
    category: "casual",
    intent: "general",
    question: "I'm having a bad day",
    variations: [
      "I'm having a bad day",
      "Bad day today",
      "Today is not going well",
      "I am having a rough day",
      "Bad day",
      "Rough day",
    ],
    keywords: ["bad", "day", "rough", "hard"],
    answer:
      "Sorry to hear that. 😕 If you want to take your mind off it, I can help with a technical question, explain something about electronics, or point you to a project idea. If it's project-related, I can also help with troubleshooting.",
    priority: 100,
  },

  {
    id: "casual-tired",
    category: "casual",
    intent: "general",
    question: "I'm tired",
    variations: [
      "I'm tired",
      "I am exhausted",
      "Feeling tired",
      "Low energy",
      "Drained today",
      "Long day",
    ],
    keywords: ["tired", "exhausted", "energy", "drained", "long"],
    answer:
      "That sounds rough. 😊 If you want, we can keep it light — I can answer a quick question or point you to something useful without overloading you. Or come back anytime when you're ready.",
    priority: 100,
  },

  {
    id: "casual-annoyed",
    category: "casual",
    intent: "general",
    question: "I'm annoyed",
    variations: [
      "I'm annoyed",
      "I am irritated",
      "This is annoying",
      "I am bothered",
      "Not happy right now",
    ],
    keywords: ["annoyed", "irritated", "bothered", "annoying"],
    answer:
      "Understood. 😕 If it's project-related, tell me what's happening and I can help with troubleshooting. If not, I'm happy to help with anything MECTEC-related whenever you're ready.",
    priority: 100,
  },

  {
    id: "casual-sorry",
    category: "casual",
    intent: "general",
    question: "Sorry",
    variations: [
      "Sorry",
      "My apologies",
      "I apologize",
      "Sorry about that",
      "Apologies",
      "My bad",
    ],
    keywords: ["sorry", "apologize", "apologies"],
    answer:
      "No problem at all. 😊 Feel free to continue asking whenever you're ready.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // CONFUSION / HESITATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-confused",
    category: "casual",
    intent: "general",
    question: "I'm confused",
    variations: [
      "I'm confused",
      "I do not understand",
      "I am lost",
      "This is confusing",
      "Can you explain simply",
      "I am not sure what to do",
    ],
    keywords: ["confused", "understand", "lost", "explain", "unsure"],
    answer:
      "No problem. Tell me what you are trying to understand or do, and I will try to explain it in a simpler way using the MECTEC knowledge library.",
    priority: 100,
  },

  {
    id: "casual-not-sure",
    category: "casual",
    intent: "general",
    question: "I'm not sure",
    variations: [
      "I'm not sure",
      "I am unsure",
      "Not certain",
      "I don't know",
      "I have no idea",
      "Not sure yet",
    ],
    keywords: ["sure", "unsure", "certain", "know", "idea"],
    answer:
      "That's okay. Take your time. If you want, describe what you are considering and I can share relevant information from the MECTEC knowledge library.",
    priority: 100,
  },

  {
    id: "casual-maybe-later",
    category: "casual",
    intent: "general",
    question: "Maybe later",
    variations: [
      "Maybe later",
      "Perhaps later",
      "Not right now",
      "I will come back",
      "Maybe another time",
    ],
    keywords: ["later", "perhaps", "another", "time"],
    answer:
      "No worries. 😊 Come back whenever you're ready and I'll be here to help.",
    priority: 100,
  },

  {
    id: "casual-thinking",
    category: "casual",
    intent: "general",
    question: "Let me think",
    variations: [
      "Let me think",
      "Let me think about it",
      "I need to think",
      "Give me a moment",
      "Thinking",
    ],
    keywords: ["think", "moment", "consider", "pause"],
    answer: "Of course. 😊 Take your time. I'll be here when you're ready.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // ACKNOWLEDGEMENTS / FILLER
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-okay",
    category: "casual",
    intent: "general",
    question: "Okay",
    variations: [
      "Okay",
      "Ok",
      "Alright",
      "Got it",
      "Understood",
      "I see",
      "Sounds good",
    ],
    keywords: ["okay", "ok", "alright", "got", "understood", "see"],
    answer: "Great! 👍 If you need anything else, just ask.",
    priority: 100,
  },

  {
    id: "casual-yes",
    category: "casual",
    intent: "general",
    question: "Yes",
    variations: [
      "Yes",
      "Yeah",
      "Yep",
      "Sure",
      "Absolutely",
      "Definitely",
      "Of course",
    ],
    keywords: ["yes", "yeah", "yep", "sure", "absolutely"],
    answer: "Got it! 👍 What would you like to ask or do next?",
    priority: 100,
  },

  {
    id: "casual-no",
    category: "casual",
    intent: "general",
    question: "No",
    variations: [
      "No",
      "Nope",
      "Not really",
      "No thanks",
      "No thank you",
      "Not now",
    ],
    keywords: ["no", "nope", "thanks", "now"],
    answer:
      "Alright. 😊 If you change your mind or have another question, I'm here to help.",
    priority: 100,
  },

  {
    id: "casual-maybe",
    category: "casual",
    intent: "general",
    question: "Maybe",
    variations: ["Maybe", "Perhaps", "Possibly", "I might", "Could be"],
    keywords: ["maybe", "perhaps", "possibly", "might"],
    answer:
      "That's fine. If you want, describe what you're considering and I'll share relevant information from the MECTEC knowledge library.",
    priority: 100,
  },

  {
    id: "casual-welcome",
    category: "casual",
    intent: "general",
    question: "You're welcome",
    variations: [
      "You're welcome",
      "You are welcome",
      "No problem",
      "No worries",
      "It's okay",
      "That's fine",
      "Anytime",
    ],
    keywords: ["welcome", "problem", "worries", "okay", "fine"],
    answer:
      "Happy to help! 😊 If you have another question about MECTEC, electronics, projects or anything else in the knowledge library, just ask.",
    priority: 100,
  },

  {
    id: "casual-np",
    category: "casual",
    intent: "general",
    question: "No worries",
    variations: [
      "No worries",
      "No problem",
      "It's fine",
      "All good",
      "It's okay",
      "Don't worry",
    ],
    keywords: ["no", "worries", "problem", "fine", "good"],
    answer: "Great! 😊 If anything comes up, I'm here to help.",
    priority: 100,
  },

  {
    id: "casual-yes-please",
    category: "casual",
    intent: "general",
    question: "Yes please",
    variations: [
      "Yes please",
      "Yes please do",
      "Please do",
      "Go ahead",
      "Please go ahead",
    ],
    keywords: ["yes", "please", "go", "ahead"],
    answer: "Great! 😊 Let me know what you'd like to do next.",
    priority: 100,
  },

  {
    id: "casual-no-thank-you",
    category: "casual",
    intent: "general",
    question: "No thank you",
    variations: ["No thank you", "No thanks", "Not right now", "Not now"],
    keywords: ["no", "thank", "thanks", "right"],
    answer:
      "Alright. 😊 If you change your mind, feel free to come back anytime.",
    priority: 100,
  },

  {
    id: "casual-please",
    category: "casual",
    intent: "general",
    question: "Please",
    variations: ["Please", "Please do", "Kindly", "If you please"],
    keywords: ["please", "kindly", "if"],
    answer: "Of course! 😊 Tell me what you need.",
    priority: 100,
  },

  {
    id: "casual-excuse-me",
    category: "casual",
    intent: "general",
    question: "Excuse me",
    variations: ["Excuse me", "Pardon me", "Sorry to bother you", "Pardon"],
    keywords: ["excuse", "pardon", "sorry", "bother"],
    answer: "No problem at all. 😊 How can I help you?",
    priority: 100,
  },

  {
    id: "casual-alright",
    category: "casual",
    intent: "general",
    question: "Alright",
    variations: ["Alright", "All right", "Very well", "Fine", "Okay then"],
    keywords: ["alright", "fine", "well", "then"],
    answer: "Great! 👍 Let me know if you need anything else.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // ENCOURAGEMENT / GOOD LUCK
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-good-luck",
    category: "casual",
    intent: "general",
    question: "Good luck",
    variations: [
      "Good luck",
      "Best of luck",
      "Wish you luck",
      "Hope it goes well",
      "Good luck with that",
    ],
    keywords: ["luck", "wish", "hope", "well"],
    answer: "Thank you! 😊 Good luck with your project too!",
    priority: 100,
  },

  {
    id: "casual-congratulations",
    category: "casual",
    intent: "general",
    question: "Congratulations",
    variations: [
      "Congratulations",
      "Congrats",
      "Well done",
      "Well done on that",
      "Great achievement",
      "Nice work",
    ],
    keywords: ["congratulations", "congrats", "achievement", "well", "nice"],
    answer:
      "Thank you! 😊 If you have more questions or want to start a project, I'm here to help.",
    priority: 100,
  },

  {
    id: "casual-well-done",
    category: "casual",
    intent: "general",
    question: "Well done",
    variations: [
      "Well done",
      "Nice one",
      "Good work",
      "Great effort",
      "Excellent job",
    ],
    keywords: ["well", "done", "nice", "good", "great"],
    answer: "Thanks! 😊 If there's anything else you need, just let me know.",
    priority: 100,
  },

  {
    id: "casual-great-job",
    category: "casual",
    intent: "general",
    question: "Great job",
    variations: [
      "Great job",
      "Nice work",
      "Well done",
      "Good job",
      "Excellent",
      "Awesome",
    ],
    keywords: ["great", "job", "nice", "well", "excellent", "awesome"],
    answer:
      "Thank you! 😊 I'm glad I could help. If you have any more questions about MECTEC or technical topics, just ask.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // WISHES / KIND WORDS
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-have-a-nice-day",
    category: "casual",
    intent: "general",
    question: "Have a nice day",
    variations: [
      "Have a nice day",
      "Have a great day",
      "Have a good day",
      "Enjoy your day",
      "Have a wonderful day",
    ],
    keywords: ["have", "nice", "day", "great", "good"],
    answer: "Thank you! 😊 You have a great day as well!",
    priority: 100,
  },

  {
    id: "casual-take-care",
    category: "casual",
    intent: "general",
    question: "Take care",
    variations: [
      "Take care",
      "Take care of yourself",
      "Stay safe",
      "Take it easy",
      "All the best",
    ],
    keywords: ["take", "care", "safe", "easy"],
    answer:
      "You too! 😊 Take care and visit MECTEC again whenever you need help.",
    priority: 100,
  },

  {
    id: "casual-enjoy",
    category: "casual",
    intent: "general",
    question: "Enjoy",
    variations: ["Enjoy", "Have fun", "Enjoy yourself", "Have a good time"],
    keywords: ["enjoy", "fun", "good", "time"],
    answer:
      "Thanks! 😊 If you need help with a project or have any questions, I'm here.",
    priority: 100,
  },

  {
    id: "casual-stay-positive",
    category: "casual",
    intent: "general",
    question: "Stay positive",
    variations: [
      "Stay positive",
      "Keep smiling",
      "Keep going",
      "You got this",
      "Stay strong",
    ],
    keywords: ["stay", "positive", "keep", "strong", "smiling"],
    answer:
      "Thanks, and same to you! 😊 If you need a hand with anything, just ask.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // META / ABOUT THE CONVERSATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-are-you-there",
    category: "casual",
    intent: "general",
    question: "Are you there?",
    variations: [
      "Are you there",
      "You there",
      "Hello are you there",
      "Anyone there",
      "Are you still there",
      "You still around",
    ],
    keywords: ["there", "still", "around", "anyone", "there"],
    answer: "Yes, I'm here! 😊 What would you like to ask or talk about?",
    priority: 100,
  },

  {
    id: "casual-hello-again",
    category: "casual",
    intent: "general",
    question: "Hello again",
    variations: [
      "Hello again",
      "Hi again",
      "Hey again",
      "I'm back",
      "Back again",
    ],
    keywords: ["hello", "again", "back", "hi", "hey"],
    answer: "Welcome back! 👋 What would you like to do this time?",
    priority: 100,
  },

  {
    id: "casual-long-time",
    category: "casual",
    intent: "general",
    question: "Long time no see",
    variations: [
      "Long time no see",
      "It has been a while",
      "Haven't talked in a while",
      "Been a long time",
    ],
    keywords: ["long", "time", "see", "while"],
    answer: "Good to see you again! 👋 What would you like to ask or do today?",
    priority: 100,
  },

  {
    id: "casual-nice-to-meet",
    category: "casual",
    intent: "general",
    question: "Nice to meet you",
    variations: [
      "Nice to meet you",
      "Pleasure to meet you",
      "Good to meet you",
      "Glad to meet you",
    ],
    keywords: ["nice", "meet", "pleasure", "glad"],
    answer: "Nice to meet you too! 😊 Welcome to MECTEC. How can I help you?",
    priority: 100,
  },

  {
    id: "casual-see-you",
    category: "casual",
    intent: "general",
    question: "See you",
    variations: [
      "See you",
      "See you soon",
      "See you around",
      "Catch you later",
    ],
    keywords: ["see", "soon", "around", "later"],
    answer: "See you! 👋 Come back anytime you need help.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // BOREDOM / SMALL TALK
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-bored",
    category: "casual",
    intent: "general",
    question: "I'm bored",
    variations: [
      "I'm bored",
      "I am bored",
      "Nothing to do",
      "I am free",
      "Got nothing to do",
      "Bored right now",
    ],
    keywords: ["bored", "free", "nothing", "time"],
    answer:
      "If you're looking for something to do, you could explore the MECTEC Projects section or start thinking about a project idea. 😊 I can also answer questions about electronics, embedded systems, sensors, IoT and more.",
    priority: 100,
  },

  {
    id: "casual-busy",
    category: "casual",
    intent: "general",
    question: "I'm busy",
    variations: [
      "I'm busy",
      "I am busy",
      "No time right now",
      "I am occupied",
      "Busy at the moment",
      "I will come back later",
    ],
    keywords: ["busy", "time", "occupied", "later"],
    answer:
      "No worries. 😊 Come back whenever you have time, and I'll be here to help with MECTEC or technical questions.",
    priority: 100,
  },

  {
    id: "casual-just-browsing",
    category: "casual",
    intent: "general",
    question: "Just browsing",
    variations: [
      "Just browsing",
      "Just looking around",
      "Just checking",
      "Just exploring",
      "Looking around",
    ],
    keywords: ["just", "browsing", "looking", "checking", "exploring"],
    answer:
      "Take your time! 😊 If you need help finding something specific, just ask. The Projects section and the Help Assistant cover a lot of ground.",
    priority: 100,
  },

  {
    id: "casual-just-testing",
    category: "casual",
    intent: "general",
    question: "Just testing",
    variations: [
      "Just testing",
      "Just checking this out",
      "Testing the assistant",
      "Trying this out",
      "Just trying",
    ],
    keywords: ["just", "testing", "trying", "checking", "out"],
    answer:
      "No problem! 😊 Feel free to try anything. If you want to test me on something real, ask about MECTEC services, projects, or any technical topic in the knowledge library.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // JOKES / FUN
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-joke",
    category: "casual",
    intent: "general",
    question: "Tell me a joke",
    variations: [
      "Tell me a joke",
      "Say something funny",
      "Make me laugh",
      "Do you know a joke",
      "Tell me something funny",
    ],
    keywords: ["joke", "funny", "laugh"],
    answer:
      "I'm here mainly for MECTEC and technical information, so I don't have a joke library. 😊 But I can help with electronics, projects, troubleshooting or website questions if you have one.",
    priority: 100,
  },

  {
    id: "casual-are-you-funny",
    category: "casual",
    intent: "general",
    question: "Are you funny?",
    variations: [
      "Are you funny",
      "Do you have a sense of humour",
      "Can you be funny",
      "Do you joke",
    ],
    keywords: ["funny", "humour", "joke", "sense"],
    answer:
      "Not my strongest suit — I'm mostly here to help with MECTEC and technical questions. 😊 But I try to keep things friendly.",
    priority: 100,
  },

  {
    id: "casual-sing",
    category: "casual",
    intent: "general",
    question: "Can you sing?",
    variations: [
      "Can you sing",
      "Sing me a song",
      "Do you sing",
      "Can you play music",
    ],
    keywords: ["sing", "song", "music", "play"],
    answer:
      "I can't sing. 😊 But I can help with electronics, sensors, microcontrollers, IoT, automation and other MECTEC topics.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // COMPLIMENTS / POLITE PHRASES
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-you-are-great",
    category: "casual",
    intent: "general",
    question: "You are great",
    variations: [
      "You are great",
      "You are awesome",
      "You are the best",
      "You are helpful",
      "You are smart",
      "You are amazing",
    ],
    keywords: ["great", "awesome", "best", "helpful", "smart", "amazing"],
    answer:
      "Thank you! 😊 I'm glad I could help. Let me know if you have more questions.",
    priority: 100,
  },

  {
    id: "casual-i-like-it",
    category: "casual",
    intent: "general",
    question: "I like it",
    variations: [
      "I like it",
      "I like this",
      "This is nice",
      "I enjoy this",
      "This is good",
    ],
    keywords: ["like", "nice", "enjoy", "good", "this"],
    answer:
      "Glad to hear it! 😊 If you'd like to explore more, the Projects section or the knowledge library are good next steps.",
    priority: 100,
  },

  {
    id: "casual-well-asked",
    category: "casual",
    intent: "general",
    question: "Good question",
    variations: [
      "Good question",
      "Nice question",
      "Great question",
      "That's a good question",
    ],
    keywords: ["good", "question", "nice", "great"],
    answer:
      "Thanks! 😊 If you'd like, ask another and I'll do my best to help from the MECTEC knowledge library.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // AGREEMENT / DISAGREEMENT
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-i-agree",
    category: "casual",
    intent: "general",
    question: "I agree",
    variations: [
      "I agree",
      "Agreed",
      "Exactly",
      "That's right",
      "You're right",
      "Correct",
    ],
    keywords: ["agree", "agreed", "exactly", "right", "correct"],
    answer: "Great! 😊 If you'd like to go further on the topic, just ask.",
    priority: 100,
  },

  {
    id: "casual-i-disagree",
    category: "casual",
    intent: "general",
    question: "I disagree",
    variations: [
      "I disagree",
      "I don't agree",
      "Not really",
      "I see it differently",
      "I'm not convinced",
    ],
    keywords: ["disagree", "agree", "differently", "convinced"],
    answer:
      "That's fair. 😊 If you tell me more about your view, I can share what the MECTEC knowledge library says on the topic.",
    priority: 100,
  },

  {
    id: "casual-i-understand",
    category: "casual",
    intent: "general",
    question: "I understand",
    variations: [
      "I understand",
      "Understood",
      "Got it",
      "I see",
      "Makes sense",
      "Clear",
    ],
    keywords: ["understand", "understood", "got", "see", "makes"],
    answer: "Great! 👍 Let me know if you need anything else.",
    priority: 100,
  },

  {
    id: "casual-i-dont-understand",
    category: "casual",
    intent: "general",
    question: "I don't understand",
    variations: [
      "I don't understand",
      "I do not get it",
      "Can you explain again",
      "This doesn't make sense",
      "I'm lost",
    ],
    keywords: ["understand", "explain", "again", "sense", "lost"],
    answer:
      "No problem. Tell me which part is unclear and I'll try to rephrase it simply. If it's a deep topic, I can point you to related MECTEC information.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // MISC / FILLER / PATIENCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "casual-wait",
    category: "casual",
    intent: "general",
    question: "Wait",
    variations: [
      "Wait",
      "Hold on",
      "Give me a second",
      "One moment",
      "Just a sec",
      "Hang on",
    ],
    keywords: ["wait", "hold", "second", "moment", "sec"],
    answer: "Sure, take your time. 😊 I'll be here when you're ready.",
    priority: 100,
  },

  {
    id: "casual-i-will-be-back",
    category: "casual",
    intent: "general",
    question: "I'll be back",
    variations: [
      "I'll be back",
      "Be right back",
      "BRB",
      "Coming back soon",
      "Back in a moment",
    ],
    keywords: ["back", "right", "brb", "soon", "moment"],
    answer: "No problem. 👋 Come back whenever you're ready and I'll be here.",
    priority: 100,
  },

  {
    id: "casual-never-mind",
    category: "casual",
    intent: "general",
    question: "Never mind",
    variations: [
      "Never mind",
      "Nevermind",
      "Forget it",
      "It's fine",
      "Don't worry about it",
    ],
    keywords: ["never", "mind", "forget", "fine", "worry"],
    answer:
      "No worries. 😊 Feel free to come back if you have another question.",
    priority: 100,
  },

  {
    id: "casual-whatever",
    category: "casual",
    intent: "general",
    question: "Whatever",
    variations: [
      "Whatever",
      "Doesn't matter",
      "Any is fine",
      "Anything works",
      "Up to you",
    ],
    keywords: ["whatever", "matter", "any", "anything", "up"],
    answer:
      "Alright. 😊 If you'd like, tell me what you're looking for and I'll pick something relevant from the MECTEC knowledge library.",
    priority: 100,
  },

  {
    id: "casual-hmm",
    category: "casual",
    intent: "general",
    question: "Hmm",
    variations: ["Hmm", "Hmmm", "Hmm interesting", "Hmm okay", "Hm"],
    keywords: ["hmm", "hmmm", "interesting", "okay"],
    answer:
      "Take your time. 😊 If there's something specific you're thinking about, I'm here to help.",
    priority: 100,
  },

  {
    id: "casual-ah",
    category: "casual",
    intent: "general",
    question: "Ah",
    variations: ["Ah", "Ah I see", "Oh I see", "I see now", "Ah okay"],
    keywords: ["ah", "see", "oh", "okay"],
    answer: "Great! 😊 Anything else you'd like to check or ask?",
    priority: 100,
  },

  {
    id: "casual-oh",
    category: "casual",
    intent: "general",
    question: "Oh",
    variations: ["Oh", "Oh okay", "Oh right", "Oh interesting", "Oh wow"],
    keywords: ["oh", "okay", "right", "interesting", "wow"],
    answer:
      "Glad it caught your attention. 😊 Let me know what you'd like to explore next.",
    priority: 100,
  },

  {
    id: "casual-there-you-go",
    category: "casual",
    intent: "general",
    question: "There you go",
    variations: ["There you go", "There we go", "Done", "That's it", "Sorted"],
    keywords: ["there", "go", "done", "sorted"],
    answer: "Great! 👍 If anything else comes up, I'm here to help.",
    priority: 100,
  },

  {
    id: "casual-got-it",
    category: "casual",
    intent: "general",
    question: "Got it",
    variations: [
      "Got it",
      "I've got it",
      "Understood",
      "All clear",
      "Makes sense now",
    ],
    keywords: ["got", "understood", "clear", "sense"],
    answer: "Great! 👍 If you need more info on anything, just ask.",
    priority: 100,
  },

  {
    id: "casual-okay-then",
    category: "casual",
    intent: "general",
    question: "Okay then",
    variations: [
      "Okay then",
      "Alright then",
      "Very well then",
      "Okay cool",
      "Cool then",
    ],
    keywords: ["okay", "then", "alright", "cool"],
    answer: "Great! 😊 Let me know if there's anything else I can help with.",
    priority: 100,
  },

  {
    id: "casual-good",
    category: "casual",
    intent: "general",
    question: "Good",
    variations: ["Good", "Great", "Perfect", "Excellent", "Nice one"],
    keywords: ["good", "great", "perfect", "excellent", "nice"],
    answer: "Glad to hear! 😊 Anything else I can help with?",
    priority: 100,
  },

  {
    id: "casual-bad",
    category: "casual",
    intent: "general",
    question: "Bad",
    variations: ["Bad", "Not good", "That's bad", "Not great"],
    keywords: ["bad", "not", "good", "great"],
    answer:
      "Sorry to hear that. 😕 If it's project-related, tell me what's happening and I can help with troubleshooting. If not, I'm here if you need MECTEC info.",
    priority: 100,
  },

  {
    id: "casual-okay-thanks",
    category: "casual",
    intent: "general",
    question: "Okay thanks",
    variations: [
      "Okay thanks",
      "Alright thanks",
      "Ok thank you",
      "Fine thanks",
      "Cool thanks",
    ],
    keywords: ["okay", "thanks", "alright", "fine", "cool"],
    answer: "You're welcome! 😊 If you need anything else, just ask.",
    priority: 100,
  },

  {
    id: "casual-quick-thanks",
    category: "casual",
    intent: "general",
    question: "Thanks for the info",
    variations: [
      "Thanks for the info",
      "Thanks for the info!",
      "Thanks for explaining",
      "Thanks for the details",
      "Thanks for sharing",
    ],
    keywords: ["thanks", "info", "explaining", "details", "sharing"],
    answer:
      "You're welcome! 😊 If you want more detail or a related topic, just say so.",
    priority: 100,
  },

  {
    id: "casual-understand-now",
    category: "casual",
    intent: "general",
    question: "Now I understand",
    variations: [
      "Now I understand",
      "Now I get it",
      "That clears things up",
      "Thanks that helps",
      "Now it makes sense",
    ],
    keywords: ["understand", "get", "clears", "helps", "sense"],
    answer: "Great! 😊 If you have another question, I'm happy to help.",
    priority: 100,
  },

  {
    id: "casual-i-will-check",
    category: "casual",
    intent: "general",
    question: "I'll check it out",
    variations: [
      "I'll check it out",
      "I will look into it",
      "I'll take a look",
      "I'll check later",
      "I'll have a look",
    ],
    keywords: ["check", "look", "later", "into", "see"],
    answer: "Sounds good! 😊 Come back anytime if you have more questions.",
    priority: 100,
  },

  {
    id: "casual-sure-thing",
    category: "casual",
    intent: "general",
    question: "Sure thing",
    variations: ["Sure thing", "Sure", "Certainly", "Absolutely", "Of course"],
    keywords: ["sure", "thing", "certainly", "absolutely", "course"],
    answer: "Great! 👍 Let me know what you'd like to do next.",
    priority: 100,
  },

  {
    id: "casual-very-helpful",
    category: "casual",
    intent: "general",
    question: "That was very helpful",
    variations: [
      "That was very helpful",
      "Very helpful",
      "That helped a lot",
      "This is helpful",
      "Helpful info",
    ],
    keywords: ["helpful", "very", "helped", "info", "lot"],
    answer: "Glad it helped! 😊 If anything else comes up, I'm here.",
    priority: 100,
  },

  {
    id: "casual-nice-chat",
    category: "casual",
    intent: "general",
    question: "Nice chat",
    variations: [
      "Nice chat",
      "Good chat",
      "Nice talking to you",
      "Great conversation",
      "Pleasant chat",
    ],
    keywords: ["nice", "chat", "talking", "conversation", "pleasant"],
    answer: "Nice chatting with you too! 😊 Come back anytime.",
    priority: 100,
  },

  {
    id: "casual-see-you-soon",
    category: "casual",
    intent: "general",
    question: "See you soon",
    variations: [
      "See you soon",
      "Talk soon",
      "Speak soon",
      "Catch you soon",
      "Catch up later",
    ],
    keywords: ["see", "soon", "talk", "speak", "catch"],
    answer:
      "See you soon! 👋 If you think of anything else, just drop by again.",
    priority: 100,
  },
];
