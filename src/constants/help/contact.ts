import type { HelpEntry } from "./types";
import { SITE } from "../site";

export const CONTACT_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // PRIMARY CHANNELS
  // ─────────────────────────────────────────────────────────────
  {
    id: "contact-email",
    category: "contact",
    intent: "contact",
    question: "What is the MECTEC email?",
    variations: [
      "What is the MECTEC email",
      "How can I email MECTEC",
      "What email should I use",
      "Give me the MECTEC email",
      "Where can I send an email",
      "What is your email address",
    ],
    keywords: ["email", "mail", "address", "contact"],
    answer: `MECTEC can be contacted by email at ${SITE.email}.`,
    priority: 15,
  },

  {
    id: "contact-whatsapp",
    category: "contact",
    intent: "contact",
    question: "Can I contact MECTEC through WhatsApp?",
    variations: [
      "Can I contact MECTEC through WhatsApp",
      "Do you have WhatsApp",
      "Can I WhatsApp MECTEC",
      "How do I contact you on WhatsApp",
      "Can I message you on WhatsApp",
      "Is WhatsApp available",
    ],
    keywords: ["whatsapp", "message", "contact", "chat"],
    answer: SITE.whatsapp
      ? "Yes. MECTEC provides WhatsApp contact through the WhatsApp button available on the website."
      : `MECTEC can be reached through the contact page and email at ${SITE.email}.`,
    priority: 15,
  },

  {
    id: "contact-form",
    category: "contact",
    intent: "contact",
    question: "How do I use the contact form?",
    variations: [
      "How do I use the contact form",
      "Where is the contact form",
      "How to send a message",
      "Contact form help",
      "How to submit a contact request",
    ],
    keywords: ["contact", "form", "message", "submit", "request"],
    answer:
      "Use the Contact section of the website to find the contact form or available contact options. Provide clear details about your question or project so MECTEC can respond appropriately.",
    priority: 13,
  },

  {
    id: "contact-phone",
    category: "contact",
    intent: "contact",
    question: "What is the MECTEC phone number?",
    variations: [
      "What is the MECTEC phone number",
      "Can I call MECTEC",
      "What is your phone number",
      "How do I call you",
      "Do you have a contact number",
      "Phone contact",
    ],
    keywords: ["phone", "call", "number", "contact"],
    answer: `MECTEC contact details are available through the Contact section of the website. You can also reach MECTEC by email at ${SITE.email}.`,
    priority: 13,
  },

  {
    id: "contact-social",
    category: "contact",
    intent: "contact",
    question: "Does MECTEC have social media?",
    variations: [
      "Does MECTEC have social media",
      "Are you on Facebook",
      "Do you have Instagram",
      "Social media links",
      "Where can I follow MECTEC",
    ],
    keywords: ["social", "media", "facebook", "instagram", "follow"],
    answer:
      "Social media availability depends on the current MECTEC online presence. Check the website or contact MECTEC directly for the latest official channels.",
    priority: 10,
  },

  {
    id: "contact-project",
    category: "contact",
    intent: "contact",
    question: "Where should I contact MECTEC about a project?",
    variations: [
      "Where should I contact MECTEC about a project",
      "Where do I send my project idea",
      "How do I discuss a project",
      "Who do I contact about a project",
      "Where can I ask about a custom project",
    ],
    keywords: ["project", "contact", "idea", "request", "custom"],
    answer:
      "For a new project, the project request form is the best starting point because it collects the information needed to understand the requirements. You can also use the contact options provided on the website.",
    priority: 15,
  },

  {
    id: "contact-project-form",
    category: "contact",
    intent: "contact",
    question: "Where is the project request form?",
    variations: [
      "Where is the project request form",
      "How to submit a project",
      "Where is the request form",
      "Project form location",
      "How to request a build",
    ],
    keywords: ["project", "request", "form", "submit", "build"],
    answer:
      "Use the Project Request option in the website navigation to open the project request form. Provide as much detail as possible about your requirements.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // RESPONSE / FOLLOW-UP
  // ─────────────────────────────────────────────────────────────
  {
    id: "contact-response",
    category: "contact",
    intent: "contact",
    question: "How long does MECTEC take to respond?",
    variations: [
      "How long does MECTEC take to respond",
      "Response time",
      "When will I get a reply",
      "How fast do you respond",
      "Reply time",
      "When will someone contact me",
    ],
    keywords: ["response", "reply", "contact", "time", "fast"],
    answer: `MECTEC typically replies ${SITE.responseTime} to a submitted request. For the latest information, use the contact options provided on the website.`,
    priority: 15,
  },

  {
    id: "contact-follow-up",
    category: "contact",
    intent: "contact",
    question: "Can I follow up on a submitted request?",
    variations: [
      "Can I follow up on a submitted request",
      "How to follow up",
      "I sent a request and did not get a reply",
      "Can I check my request status",
      "Follow up on project request",
    ],
    keywords: ["follow", "request", "status", "reply", "submitted"],
    answer: `You can follow up using the contact options on the website. MECTEC typically replies ${SITE.responseTime} to submitted requests. If you have not received a response within the expected time, send a follow-up message with your original request details.`,
    priority: 13,
  },

  {
    id: "contact-no-response",
    category: "contact",
    intent: "contact",
    question: "What if I do not get a response?",
    variations: [
      "What if I do not get a response",
      "No reply from MECTEC",
      "I did not hear back",
      "My email was not answered",
      "No response to my request",
    ],
    keywords: ["response", "reply", "answer", "request", "contact"],
    answer: `MECTEC typically replies ${SITE.responseTime} to submitted requests. If you have not received a response, check the contact details were correct, look in your spam folder and send a polite follow-up with your original message details.`,
    priority: 13,
  },

  {
    id: "contact-preferred",
    category: "contact",
    intent: "contact",
    question: "What is the best way to contact MECTEC?",
    variations: [
      "What is the best way to contact MECTEC",
      "How should I contact you",
      "Best contact method",
      "Email or form",
      "Preferred contact",
    ],
    keywords: ["best", "contact", "method", "preferred", "email"],
    answer:
      "For project requests, the project request form is usually the best starting point because it collects the needed details. For general questions, use the contact options provided on the website or email MECTEC directly.",
    priority: 15,
  },

  {
    id: "contact-urgent",
    category: "contact",
    intent: "contact",
    question: "How do I contact MECTEC for an urgent matter?",
    variations: [
      "How do I contact MECTEC for an urgent matter",
      "Urgent contact",
      "I need to reach MECTEC quickly",
      "Emergency contact",
      "Time sensitive request",
    ],
    keywords: ["urgent", "emergency", "quickly", "time", "contact"],
    answer:
      "For urgent matters, use the direct contact options available on the website and clearly mark your message as urgent. Include enough details so the situation can be understood quickly.",
    priority: 13,
  },

  {
    id: "contact-international",
    category: "contact",
    intent: "contact",
    question: "Can I contact MECTEC from another country?",
    variations: [
      "Can I contact MECTEC from another country",
      "International contact",
      "Can I email from outside the country",
      "Do you work with international clients",
      "Overseas contact",
    ],
    keywords: ["international", "country", "overseas", "email", "contact"],
    answer:
      "You can use the email or contact options provided on the website to reach MECTEC. Project feasibility and arrangements may depend on location, shipping and other factors.",
    priority: 10,
  },

  {
    id: "contact-human",
    category: "contact",
    intent: "contact",
    question: "Can I talk to a real person?",
    variations: [
      "Can I talk to a real person",
      "Can I speak to someone",
      "I want to talk to a human",
      "Can a real person answer me",
      "Is there a human I can contact",
      "Can someone from MECTEC help me",
    ],
    keywords: ["human", "person", "speak", "talk", "contact"],
    answer:
      "Yes. The Help Assistant is only a quick information tool. For a specific project or anything that requires a real response, use the contact options on the website.",
    priority: 15,
  },

  {
    id: "contact-help-assistant",
    category: "contact",
    intent: "contact",
    question: "Can the Help Assistant contact MECTEC for me?",
    variations: [
      "Can the Help Assistant contact MECTEC for me",
      "Can the chatbot contact someone",
      "Can this assistant send my request",
      "Can the chatbot email MECTEC",
      "Can you contact MECTEC for me",
    ],
    keywords: ["assistant", "chatbot", "contact", "email", "send"],
    answer:
      "The Help Assistant provides instant information from MECTEC's local knowledge library. For an actual project request or direct conversation, use the request or contact options on the website.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SPECIFIC CONTACT SCENARIOS
  // ─────────────────────────────────────────────────────────────
  {
    id: "contact-payment",
    category: "contact",
    intent: "contact",
    question: "Who do I contact about payment?",
    variations: [
      "Who do I contact about payment",
      "Payment questions",
      "How to pay for a project",
      "Billing contact",
      "Payment arrangements",
    ],
    keywords: ["payment", "billing", "pay", "contact", "project"],
    answer:
      "Payment arrangements are handled directly with MECTEC and are not defined by the Help Assistant. Use the contact options on the website to discuss payment for a specific project.",
    priority: 13,
  },

  {
    id: "contact-warranty",
    category: "contact",
    intent: "contact",
    question: "Who do I contact about a warranty issue?",
    variations: [
      "Who do I contact about a warranty issue",
      "Warranty contact",
      "My project has a problem",
      "Repair or warranty question",
      "Who handles warranty",
    ],
    keywords: ["warranty", "repair", "problem", "contact", "project"],
    answer:
      "Warranty terms depend on the specific project and current MECTEC policy. Use the contact options on the website to discuss a warranty or repair question directly.",
    priority: 13,
  },

  {
    id: "contact-feedback",
    category: "contact",
    intent: "contact",
    question: "How do I send feedback about MECTEC?",
    variations: [
      "How do I send feedback about MECTEC",
      "Give feedback",
      "How to report a problem",
      "Send a suggestion",
      "Customer feedback",
    ],
    keywords: ["feedback", "suggestion", "report", "problem", "contact"],
    answer:
      "Use the contact options on the website to send feedback, suggestions or reports. Describe what you would like to share clearly so it can be reviewed appropriately.",
    priority: 10,
  },

  {
    id: "contact-careers",
    category: "contact",
    intent: "contact",
    question: "Can I work with or join MECTEC?",
    variations: [
      "Can I work with or join MECTEC",
      "Careers at MECTEC",
      "Jobs",
      "Can I join your team",
      "Internship",
    ],
    keywords: ["careers", "jobs", "join", "team", "internship"],
    answer:
      "Career, collaboration or internship opportunities depend on current MECTEC needs and policies. Use the contact options on the website to express your interest and provide relevant details.",
    priority: 9,
  },

  {
    id: "contact-partnership",
    category: "contact",
    intent: "contact",
    question: "Can my business partner with MECTEC?",
    variations: [
      "Can my business partner with MECTEC",
      "Partnership",
      "Business collaboration",
      "Work together",
      "B2B partnership",
    ],
    keywords: ["partnership", "business", "collaboration", "work", "together"],
    answer:
      "Partnership and collaboration opportunities can be discussed directly with MECTEC. Use the contact options on the website and explain the proposed partnership or collaboration.",
    priority: 10,
  },

  {
    id: "contact-address",
    category: "contact",
    intent: "contact",
    question: "What is the MECTEC address?",
    variations: [
      "What is the MECTEC address",
      "Where is MECTEC located",
      "What is your address",
      "Where can I visit",
      "Shop address",
      "Location address",
    ],
    keywords: ["address", "location", "visit", "shop", "where"],
    answer:
      "MECTEC location details are not listed in the Help Assistant yet. Please use the Contact section of the website for the latest location information.",
    priority: 15,
  },

  {
    id: "contact-hours",
    category: "contact",
    intent: "contact",
    question: "When can I contact MECTEC?",
    variations: [
      "When can I contact MECTEC",
      "Contact hours",
      "When are you available",
      "What time can I call",
      "When is support available",
      "Best time to contact",
    ],
    keywords: ["contact", "hours", "available", "time", "support"],
    answer:
      "MECTEC is normally open Monday through Thursday and Saturday through Sunday from 10:00 AM to 10:00 PM. Friday is officially closed unless there is urgent or unusually high workload. For specific contact availability, use the website contact options.",
    priority: 15,
  },

  {
    id: "contact-form-help",
    category: "contact",
    intent: "contact",
    question: "How do I fill the contact form?",
    variations: [
      "How do I fill the contact form",
      "Contact form help",
      "How to send message",
      "Contact page guide",
      "Filling contact form",
    ],
    keywords: ["contact", "form", "help", "guide", "message"],
    answer:
      "Use the Contact section to reach MECTEC. Provide a clear subject, message and any relevant project details so the request can be routed correctly.",
    priority: 10,
  },

  {
    id: "contact-message-tips",
    category: "contact",
    intent: "contact",
    question: "What should I include in a message to MECTEC?",
    variations: [
      "What should I include in a message to MECTEC",
      "How to write a good message",
      "Contact message tips",
      "What to write in message",
      "Message content tips",
    ],
    keywords: ["message", "contact", "tips", "include", "write"],
    answer:
      "Include a clear subject, the purpose of the message, relevant project or order details, and any deadlines or constraints. Concise, complete messages usually get faster and more accurate responses.",
    priority: 13,
  },

  {
    id: "contact-language",
    category: "contact",
    intent: "contact",
    question: "What language should I use to contact MECTEC?",
    variations: [
      "What language should I use to contact MECTEC",
      "Can I write in Urdu",
      "Do you speak English",
      "Language for contact",
      "Contact language",
    ],
    keywords: ["language", "contact", "english", "urdu", "write"],
    answer:
      "You can contact MECTEC in the language you are most comfortable with. If you are unsure, use English or the language shown on the website; MECTEC will respond accordingly.",
    priority: 9,
  },

  {
    id: "contact-confidential",
    category: "contact",
    intent: "contact",
    question: "Can I contact MECTEC confidentially?",
    variations: [
      "Can I contact MECTEC confidentially",
      "Confidential contact",
      "Private message",
      "Secret project contact",
      "NDA before contact",
    ],
    keywords: ["confidential", "contact", "private", "nda", "secret"],
    answer:
      "Confidentiality arrangements can be discussed with MECTEC. If your message contains sensitive information, mention that before sharing details.",
    priority: 13,
  },

  {
    id: "contact-not-listed",
    category: "contact",
    intent: "contact",
    question: "What if my question is not covered by the assistant?",
    variations: [
      "What if my question is not covered by the assistant",
      "Assistant cannot answer",
      "Unanswered question",
      "Not covered by chatbot",
      "Question not in assistant",
    ],
    keywords: ["assistant", "question", "unanswered", "not", "covered"],
    answer:
      "If the Help Assistant cannot answer a question, use the contact options on the website to ask MECTEC directly. Providing details helps ensure a useful reply.",
    priority: 13,
  },

  {
    id: "contact-repeated",
    category: "contact",
    intent: "contact",
    question: "Should I send the same message more than once?",
    variations: [
      "Should I send the same message more than once",
      "Send follow-up again",
      "Multiple messages",
      "Repeat contact",
      "Send same message twice",
    ],
    keywords: ["repeated", "same", "message", "multiple", "twice"],
    answer:
      "Avoid sending the same message repeatedly. If you have not received a response within the expected time, send one polite follow-up with the original details.",
    priority: 10,
  },

  {
    id: "contact-urgency-vs-response",
    category: "contact",
    intent: "contact",
    question: "Does marking a message urgent speed up the response?",
    variations: [
      "Does marking a message urgent speed up the response",
      "Urgent message response",
      "Does urgent help",
      "Priority contact",
      "Urgent request faster",
    ],
    keywords: ["urgent", "response", "speed", "priority", "contact"],
    answer:
      "Marking a message urgent can help MECTEC prioritize, but the actual response depends on capacity and the nature of the request. Provide enough detail for MECTEC to assess urgency accurately.",
    priority: 10,
  },

  {
    id: "contact-support-vs-sales",
    category: "contact",
    intent: "contact",
    question: "Who do I contact for support vs a new project?",
    variations: [
      "Who do I contact for support vs a new project",
      "Support or sales contact",
      "Existing project vs new project contact",
      "New vs existing project contact",
      "Where to send support request",
    ],
    keywords: ["support", "sales", "project", "contact", "existing"],
    answer:
      "Use the project request form for new projects. For support with an existing project, use the contact options and reference the project so the request can be routed correctly.",
    priority: 13,
  },

  {
    id: "contact-after-hours",
    category: "contact",
    intent: "contact",
    question: "Can I contact MECTEC outside normal hours?",
    variations: [
      "Can I contact MECTEC outside normal hours",
      "After hours contact",
      "Contact at night",
      "Weekend contact",
      "Off hours message",
    ],
    keywords: ["after", "hours", "outside", "night", "contact"],
    answer:
      "You can send a message at any time, but responses are typically provided during normal operating hours. Urgent arrangements may depend on current workload and availability.",
    priority: 10,
  },

  {
    id: "contact-verify-official",
    category: "contact",
    intent: "contact",
    question: "How do I verify an official MECTEC contact?",
    variations: [
      "How do I verify an official MECTEC contact",
      "Is this the real MECTEC",
      "Official contact verification",
      "Scam concern contact",
      "Official email check",
    ],
    keywords: ["verify", "official", "contact", "real", "scam"],
    answer:
      "Use contact details listed on the official MECTEC website. If a message claims to be from MECTEC but uses different details, verify through the website before responding.",
    priority: 13,
  },

  {
    id: "contact-alternate-methods",
    category: "contact",
    intent: "contact",
    question: "What other ways can I reach MECTEC?",
    variations: [
      "What other ways can I reach MECTEC",
      "Alternative contact",
      "Other contact methods",
      "How else to contact",
      "Additional contact options",
    ],
    keywords: ["alternative", "contact", "methods", "reach", "options"],
    answer:
      "Available methods depend on the current website setup and can include email, WhatsApp or the contact form. Check the Contact section for the latest options.",
    priority: 10,
  },

  {
    id: "contact-message-clarity",
    category: "contact",
    intent: "contact",
    question: "How can I make my message clearer?",
    variations: [
      "How can I make my message clearer",
      "Message clarity tips",
      "Write clearly to MECTEC",
      "Improve my message",
      "Clear contact message",
    ],
    keywords: ["message", "clear", "clarity", "write", "contact"],
    answer:
      "Use a descriptive subject, state the purpose early, list the key facts, and avoid mixing multiple unrelated topics. Clear messages reduce back-and-forth and get better responses.",
    priority: 10,
  },

  {
    id: "contact-record",
    category: "contact",
    intent: "contact",
    question: "Should I keep a record of the conversation?",
    variations: [
      "Should I keep a record of the conversation",
      "Save contact history",
      "Keep message record",
      "Save email conversation",
      "Contact history",
    ],
    keywords: ["record", "conversation", "history", "save", "contact"],
    answer:
      "Keeping a record of the conversation helps if you need to follow up or reference agreed details. Most email clients and messaging apps retain history automatically.",
    priority: 9,
  },

  {
    id: "contact-multiple-topics",
    category: "contact",
    intent: "contact",
    question: "Can I include multiple topics in one message?",
    variations: [
      "Can I include multiple topics in one message",
      "Multiple questions in one email",
      "Ask several things at once",
      "Combined message",
      "Multi topic contact",
    ],
    keywords: ["multiple", "topics", "message", "questions", "combined"],
    answer:
      "You can, but separating unrelated topics into distinct messages or clearly numbered points usually helps MECTEC respond accurately. Related items in one message are fine.",
    priority: 10,
  },

  {
    id: "contact-best-practices",
    category: "contact",
    intent: "procedure",
    question: "What are best practices for contacting MECTEC?",
    variations: [
      "What are best practices for contacting MECTEC",
      "Contact best practices",
      "How to contact efficiently",
      "Best way to reach MECTEC",
      "Contact guidelines",
    ],
    keywords: ["best", "practices", "contact", "efficiently", "guidelines"],
    answer:
      "Use the appropriate channel for the topic, write clearly, include relevant details, allow reasonable response time and follow up only when needed. For new projects, the request form is usually the best starting point.",
    priority: 15,
  },
];
