import type { HelpEntry } from "./types";

export const BASIC_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // GREETINGS
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-greeting",
    category: "general",
    intent: "greeting",
    question: "Hello",
    variations: [
      "Hello",
      "Hi",
      "Hi there",
      "Hey",
      "Hey there",
      "Hello there",
      "Good morning",
      "Good afternoon",
      "Good evening",
      "Good day",
      "Salam",
      "Assalam o Alaikum",
      "Assalamu Alaikum",
      "AOA",
    ],
    keywords: ["hi", "hello", "hey", "greeting", "salam", "assalam", "aoa"],
    answer:
      "Hi! Welcome to ProjexiaHub. 👋 How can I help you today? You can ask about our projects, services, pricing, electronics, components, Arduino, ESP32, sensors, motors, RFID, PCB design, firmware, IoT, automation, or troubleshooting.",
    priority: 100,
  },

  {
    id: "basic-good-morning",
    category: "general",
    intent: "greeting",
    question: "Good morning",
    variations: [
      "Good morning",
      "Morning",
      "Top of the morning",
      "Mornin",
      "Good morning to you",
      "Have a good morning",
    ],
    keywords: ["morning", "good", "greeting"],
    answer: "Good morning! ☀️ Welcome to ProjexiaHub. How can I help you today?",
    priority: 100,
  },

  {
    id: "basic-good-afternoon",
    category: "general",
    intent: "greeting",
    question: "Good afternoon",
    variations: [
      "Good afternoon",
      "Afternoon",
      "Good afternoon to you",
      "Have a good afternoon",
      "Afternoon greeting",
    ],
    keywords: ["afternoon", "good", "greeting"],
    answer: "Good afternoon! 👋 Welcome to ProjexiaHub. What can I help you with?",
    priority: 100,
  },

  {
    id: "basic-good-evening",
    category: "general",
    intent: "greeting",
    question: "Good evening",
    variations: [
      "Good evening",
      "Evening",
      "Good evening to you",
      "Have a good evening",
      "Evening greeting",
    ],
    keywords: ["evening", "good", "greeting"],
    answer: "Good evening! 🌆 Welcome to ProjexiaHub. How can I assist you today?",
    priority: 100,
  },

  {
    id: "basic-greeting-short",
    category: "general",
    intent: "greeting",
    question: "Salam",
    variations: [
      "Salam",
      "Assalam o Alaikum",
      "Assalamu Alaikum",
      "Wa Alaikum Assalam",
      "Salam Alaikum",
      "AOA",
    ],
    keywords: ["salam", "assalam", "alaikum", "aoa", "greeting"],
    answer:
      "Wa Alaikum Assalam! 👋 Welcome to ProjexiaHub. How can I help you today?",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // OPENING HOURS
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-opening-hours",
    category: "general",
    intent: "hours",
    question: "When is ProjexiaHub open?",
    variations: [
      "When is ProjexiaHub open",
      "When is your shop open",
      "When is the shop open",
      "When does ProjexiaHub open",
      "When do you open",
      "What time do you open",
      "What time does ProjexiaHub open",
      "What are your opening hours",
      "What are ProjexiaHub opening hours",
      "What are your business hours",
      "What are your working hours",
      "What time do you close",
      "When do you close",
      "What is your shop timing",
      "What are your shop timings",
      "Shop timing",
      "Shop timings",
      "ProjexiaHub timing",
      "ProjexiaHub timings",
      "Are you open today",
      "Are you open",
      "Is the shop open",
      "Is ProjexiaHub open",
      "When can I visit",
      "When can I come",
    ],
    keywords: [
      "open",
      "opening",
      "close",
      "closing",
      "hours",
      "timing",
      "timings",
      "working",
      "business",
      "shop",
      "visit",
    ],
    answer:
      "ProjexiaHub is normally open Monday through Thursday and Saturday through Sunday from 10:00 AM to 10:00 PM. Friday is officially closed, but we may operate on Fridays when there is an unusually high workload or urgent work. For Friday availability, please contact ProjexiaHub directly.",
    priority: 100,
  },

  {
    id: "basic-hours-friday",
    category: "general",
    intent: "hours",
    question: "Are you open on Friday?",
    variations: [
      "Are you open on Friday",
      "Friday opening hours",
      "Is ProjexiaHub open on Friday",
      "Friday shop timing",
      "Do you work on Friday",
      "Can I visit on Friday",
      "Friday availability",
      "Are you closed on Friday",
      "Friday timings",
      "What are your Friday hours",
    ],
    keywords: ["friday", "open", "hours", "timing", "visit", "closed"],
    answer:
      "Friday is officially closed for ProjexiaHub, but we may operate on Fridays when there is an unusually high workload or urgent work. Please contact ProjexiaHub directly to confirm Friday availability.",
    priority: 100,
  },

  {
    id: "basic-hours-weekend",
    category: "general",
    intent: "hours",
    question: "Are you open on weekends?",
    variations: [
      "Are you open on weekends",
      "Saturday opening hours",
      "Sunday opening hours",
      "Weekend shop timing",
      "Are you open on Saturday",
      "Are you open on Sunday",
      "Weekend availability",
      "Do you work on weekends",
      "Weekend timings",
      "What are your weekend hours",
    ],
    keywords: ["saturday", "sunday", "weekend", "open", "hours"],
    answer:
      "ProjexiaHub is normally open on Saturday and Sunday from 10:00 AM to 10:00 PM. For any changes or special conditions, contact ProjexiaHub directly.",
    priority: 100,
  },

  {
    id: "basic-hours-saturday",
    category: "general",
    intent: "hours",
    question: "Are you open on Saturday?",
    variations: [
      "Are you open on Saturday",
      "Saturday opening hours",
      "Is ProjexiaHub open on Saturday",
      "Saturday shop timing",
      "Do you work on Saturday",
      "Can I visit on Saturday",
      "Saturday availability",
      "Saturday timings",
      "What are your Saturday hours",
    ],
    keywords: ["saturday", "open", "hours", "timing", "visit"],
    answer:
      "ProjexiaHub is normally open on Saturday from 10:00 AM to 10:00 PM. For specific availability, contact ProjexiaHub directly.",
    priority: 100,
  },

  {
    id: "basic-hours-sunday",
    category: "general",
    intent: "hours",
    question: "Are you open on Sunday?",
    variations: [
      "Are you open on Sunday",
      "Sunday opening hours",
      "Is ProjexiaHub open on Sunday",
      "Sunday shop timing",
      "Do you work on Sunday",
      "Can I visit on Sunday",
      "Sunday availability",
      "Sunday timings",
      "What are your Sunday hours",
    ],
    keywords: ["sunday", "open", "hours", "timing", "visit"],
    answer:
      "ProjexiaHub is normally open on Sunday from 10:00 AM to 10:00 PM. For specific availability, contact ProjexiaHub directly.",
    priority: 100,
  },

  {
    id: "basic-hours-weekday",
    category: "general",
    intent: "hours",
    question: "Are you open on weekdays?",
    variations: [
      "Are you open on weekdays",
      "Weekday opening hours",
      "Monday to Thursday hours",
      "Weekday shop timing",
      "Do you open on Monday",
      "Do you open on Tuesday",
      "Do you open on Wednesday",
      "Do you open on Thursday",
      "Weekday availability",
    ],
    keywords: ["weekday", "monday", "tuesday", "wednesday", "thursday", "open"],
    answer:
      "ProjexiaHub is normally open Monday through Thursday from 10:00 AM to 10:00 PM. For specific availability, contact ProjexiaHub directly.",
    priority: 100,
  },

  {
    id: "basic-hours-monday",
    category: "general",
    intent: "hours",
    question: "Are you open on Monday?",
    variations: [
      "Are you open on Monday",
      "Monday opening hours",
      "Is ProjexiaHub open on Monday",
      "Monday shop timing",
      "Do you work on Monday",
      "Monday availability",
      "Monday timings",
    ],
    keywords: ["monday", "open", "hours", "timing"],
    answer:
      "ProjexiaHub is normally open on Monday from 10:00 AM to 10:00 PM. For specific availability, contact ProjexiaHub directly.",
    priority: 90,
  },

  {
    id: "basic-hours-tuesday",
    category: "general",
    intent: "hours",
    question: "Are you open on Tuesday?",
    variations: [
      "Are you open on Tuesday",
      "Tuesday opening hours",
      "Is ProjexiaHub open on Tuesday",
      "Tuesday shop timing",
      "Do you work on Tuesday",
      "Tuesday availability",
      "Tuesday timings",
    ],
    keywords: ["tuesday", "open", "hours", "timing"],
    answer:
      "ProjexiaHub is normally open on Tuesday from 10:00 AM to 10:00 PM. For specific availability, contact ProjexiaHub directly.",
    priority: 90,
  },

  {
    id: "basic-hours-wednesday",
    category: "general",
    intent: "hours",
    question: "Are you open on Wednesday?",
    variations: [
      "Are you open on Wednesday",
      "Wednesday opening hours",
      "Is ProjexiaHub open on Wednesday",
      "Wednesday shop timing",
      "Do you work on Wednesday",
      "Wednesday availability",
      "Wednesday timings",
    ],
    keywords: ["wednesday", "open", "hours", "timing"],
    answer:
      "ProjexiaHub is normally open on Wednesday from 10:00 AM to 10:00 PM. For specific availability, contact ProjexiaHub directly.",
    priority: 90,
  },

  {
    id: "basic-hours-thursday",
    category: "general",
    intent: "hours",
    question: "Are you open on Thursday?",
    variations: [
      "Are you open on Thursday",
      "Thursday opening hours",
      "Is ProjexiaHub open on Thursday",
      "Thursday shop timing",
      "Do you work on Thursday",
      "Thursday availability",
      "Thursday timings",
    ],
    keywords: ["thursday", "open", "hours", "timing"],
    answer:
      "ProjexiaHub is normally open on Thursday from 10:00 AM to 10:00 PM. For specific availability, contact ProjexiaHub directly.",
    priority: 90,
  },

  {
    id: "basic-hours-today",
    category: "general",
    intent: "hours",
    question: "What time do you open today?",
    variations: [
      "What time do you open today",
      "Today opening time",
      "Are you open today",
      "What are today's hours",
      "Today shop timing",
      "Can I visit today",
      "Today availability",
      "Today timings",
    ],
    keywords: ["today", "open", "hours", "timing", "visit"],
    answer:
      "ProjexiaHub is normally open Monday through Thursday and Saturday through Sunday from 10:00 AM to 10:00 PM. Friday is officially closed unless there is urgent or unusually high workload. For today's actual availability, please contact ProjexiaHub directly.",
    priority: 100,
  },

  {
    id: "basic-hours-now",
    category: "general",
    intent: "hours",
    question: "Are you open right now?",
    variations: [
      "Are you open right now",
      "Are you open now",
      "Is ProjexiaHub open right now",
      "Current opening status",
      "Are you currently open",
      "Is the shop open now",
    ],
    keywords: ["open", "now", "current", "status", "right"],
    answer:
      "Current opening status depends on the day and time. Normal hours are 10:00 AM to 10:00 PM, Monday through Thursday and Saturday through Sunday. Contact ProjexiaHub directly if unsure.",
    priority: 100,
  },

  {
    id: "basic-hours-closing",
    category: "general",
    intent: "hours",
    question: "What time do you close?",
    variations: [
      "What time do you close",
      "Closing time",
      "When do you close",
      "What time does ProjexiaHub close",
      "Shop closing time",
      "Last time to visit",
      "What time do you shut",
    ],
    keywords: ["close", "closing", "time", "shop", "visit", "shut"],
    answer:
      "ProjexiaHub normally closes at 10:00 PM on operating days. Friday is officially closed unless there is urgent or unusually high workload. Please contact ProjexiaHub directly if you need confirmation for a specific day.",
    priority: 100,
  },

  {
    id: "basic-hours-holiday",
    category: "general",
    intent: "hours",
    question: "Are you open on holidays?",
    variations: [
      "Are you open on holidays",
      "Holiday opening hours",
      "Are you open on public holidays",
      "Holiday timing",
      "Do you work on holidays",
      "Special holiday hours",
    ],
    keywords: ["holiday", "open", "hours", "public", "special"],
    answer:
      "Holiday hours may differ from normal opening hours. Contact ProjexiaHub directly to confirm availability on a specific holiday.",
    priority: 90,
  },

  {
    id: "basic-hours-ramadan",
    category: "general",
    intent: "hours",
    question: "Do your hours change during Ramadan?",
    variations: [
      "Do your hours change during Ramadan",
      "Ramadan timing",
      "Ramadan opening hours",
      "Ramadan schedule",
      "Do you open in Ramadan",
      "Fasting month hours",
    ],
    keywords: ["ramadan", "timing", "hours", "schedule", "fasting"],
    answer:
      "Ramadan hours may differ from normal opening hours. Contact ProjexiaHub directly to confirm the schedule during Ramadan.",
    priority: 90,
  },

  {
    id: "basic-hours-lunch",
    category: "general",
    intent: "hours",
    question: "Do you close for lunch?",
    variations: [
      "Do you close for lunch",
      "Lunch break timing",
      "Do you take a lunch break",
      "Midday closure",
      "Lunch hours",
      "Are you closed at lunch",
    ],
    keywords: ["lunch", "break", "midday", "closure", "hours"],
    answer:
      "ProjexiaHub does not currently have a listed lunch closure. For specific timing on a particular day, contact ProjexiaHub directly.",
    priority: 80,
  },

  {
    id: "basic-hours-early",
    category: "general",
    intent: "hours",
    question: "Do you open early?",
    variations: [
      "Do you open early",
      "Early opening",
      "Do you open before 10",
      "Can I come early",
      "Early morning hours",
      "Pre-opening visit",
    ],
    keywords: ["early", "open", "before", "morning", "hours"],
    answer:
      "Normal opening is 10:00 AM. For early visits or special arrangements, contact ProjexiaHub directly.",
    priority: 80,
  },

  {
    id: "basic-hours-late",
    category: "general",
    intent: "hours",
    question: "Do you stay open late?",
    variations: [
      "Do you stay open late",
      "Late closing",
      "Do you close after 10",
      "Can I come late",
      "Evening hours",
      "Late night visit",
    ],
    keywords: ["late", "close", "evening", "night", "hours"],
    answer:
      "Normal closing is 10:00 PM. For late visits or special arrangements, contact ProjexiaHub directly.",
    priority: 80,
  },

  {
    id: "basic-appointment",
    category: "general",
    intent: "hours",
    question: "Do I need an appointment to visit?",
    variations: [
      "Do I need an appointment to visit",
      "Can I just walk in",
      "Do I need to book a visit",
      "Should I call before visiting",
      "Walk-in allowed",
      "Do I need to schedule a meeting",
      "Can I visit without appointment",
    ],
    keywords: ["appointment", "visit", "walk", "schedule", "book"],
    answer:
      "Appointment requirements depend on the purpose of your visit and current workload. For general information, visiting during normal opening hours is usually suitable. For a specific project discussion, contacting ProjexiaHub first can help ensure someone is available.",
    priority: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // LOCATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-location",
    category: "general",
    intent: "location",
    question: "Where is ProjexiaHub located?",
    variations: [
      "Where is ProjexiaHub located",
      "Where is ProjexiaHub",
      "Where is your shop",
      "Where is the ProjexiaHub shop",
      "Where are you located",
      "What is your location",
      "What's your location",
      "Where can I find ProjexiaHub",
      "Where can I find your shop",
      "Where can I find the shop",
      "What is your address",
      "What's your address",
      "What is the ProjexiaHub address",
      "What is the shop address",
      "Shop address",
      "ProjexiaHub address",
      "Give me your address",
      "How can I find your shop",
      "How do I find ProjexiaHub",
    ],
    keywords: [
      "location",
      "address",
      "shop",
      "where",
      "located",
      "find",
      "mectec",
    ],
    answer:
      "ProjexiaHub location details are not listed in the Help Assistant yet. Please use the Contact section of the website for the latest location information.",
    priority: 100,
  },

  {
    id: "basic-location-landmark",
    category: "general",
    intent: "location",
    question: "What is near ProjexiaHub?",
    variations: [
      "What is near ProjexiaHub",
      "Landmark near ProjexiaHub",
      "How do I recognize the shop",
      "Nearby landmark",
      "How to find the shop easily",
      "What is around ProjexiaHub",
    ],
    keywords: ["landmark", "near", "location", "find", "shop"],
    answer:
      "ProjexiaHub location details are not listed in the Help Assistant yet. Please use the Contact section of the website for the latest location and landmark information.",
    priority: 90,
  },

  {
    id: "basic-location-directions",
    category: "general",
    intent: "location",
    question: "How do I get directions to ProjexiaHub?",
    variations: [
      "How do I get directions to ProjexiaHub",
      "Directions to ProjexiaHub",
      "How to reach your shop",
      "Give me directions",
      "How do I drive to ProjexiaHub",
      "How to find ProjexiaHub location",
    ],
    keywords: ["directions", "route", "reach", "location", "map"],
    answer:
      "ProjexiaHub location details are not listed in the Help Assistant yet. Please use the Contact section of the website for the latest location information and directions.",
    priority: 90,
  },

  {
    id: "basic-location-map",
    category: "general",
    intent: "location",
    question: "Is there a map to ProjexiaHub?",
    variations: [
      "Is there a map to ProjexiaHub",
      "Map of shop location",
      "Google Maps link",
      "Can I see location on map",
      "Map directions",
    ],
    keywords: ["map", "location", "google", "directions", "shop"],
    answer:
      "Location details, including any map link, are provided in the Contact section of the website.",
    priority: 90,
  },

  {
    id: "basic-location-parking",
    category: "general",
    intent: "location",
    question: "Is there parking near ProjexiaHub?",
    variations: [
      "Is there parking near ProjexiaHub",
      "Parking at ProjexiaHub",
      "Can I park nearby",
      "Parking availability",
      "Where to park",
      "Is parking available",
    ],
    keywords: ["parking", "location", "near", "availability", "car"],
    answer:
      "Parking details are not listed in the Help Assistant yet. Please use the Contact section of the website for the latest location information.",
    priority: 80,
  },

  {
    id: "basic-location-public-transport",
    category: "general",
    intent: "location",
    question: "Can I reach ProjexiaHub by public transport?",
    variations: [
      "Can I reach ProjexiaHub by public transport",
      "Public transport to ProjexiaHub",
      "Bus route",
      "Metro nearby",
      "How to reach by bus",
      "Nearest station",
    ],
    keywords: ["public", "transport", "bus", "metro", "station"],
    answer:
      "Public transport details are not listed in the Help Assistant yet. Please use the Contact section of the website for the latest location information.",
    priority: 80,
  },

  // ─────────────────────────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-contact-via-website",
    category: "general",
    intent: "contact",
    question: "How can I contact ProjexiaHub?",
    variations: [
      "How can I contact ProjexiaHub",
      "How do I reach you",
      "Contact options",
      "How to get in touch",
      "Can I contact ProjexiaHub online",
      "Where can I send a message",
      "How to reach ProjexiaHub",
    ],
    keywords: ["contact", "reach", "message", "email", "website"],
    answer:
      "Use the Contact section of the ProjexiaHub website to find the available communication options. For project-specific questions, the project request form is usually the best starting point.",
    priority: 100,
  },

  {
    id: "basic-contact-email",
    category: "general",
    intent: "contact",
    question: "What is the ProjexiaHub email?",
    variations: [
      "What is the ProjexiaHub email",
      "How can I email ProjexiaHub",
      "What email should I use",
      "Give me the ProjexiaHub email",
      "Where can I send an email",
      "What is your email address",
    ],
    keywords: ["email", "mail", "address", "contact"],
    answer:
      "ProjexiaHub can be contacted by email. The exact email address is shown in the Contact section of the website.",
    priority: 100,
  },

  {
    id: "basic-contact-whatsapp",
    category: "general",
    intent: "contact",
    question: "Does ProjexiaHub have WhatsApp?",
    variations: [
      "Does ProjexiaHub have WhatsApp",
      "Can I WhatsApp ProjexiaHub",
      "How do I contact you on WhatsApp",
      "Can I message you on WhatsApp",
      "Is WhatsApp available",
      "WhatsApp contact",
    ],
    keywords: ["whatsapp", "message", "contact", "chat"],
    answer:
      "ProjexiaHub provides WhatsApp contact through the WhatsApp button available on the website, where supported. Otherwise, use the contact page for other options.",
    priority: 100,
  },

  {
    id: "basic-contact-phone",
    category: "general",
    intent: "contact",
    question: "What is the ProjexiaHub phone number?",
    variations: [
      "What is the ProjexiaHub phone number",
      "Can I call ProjexiaHub",
      "What is your phone number",
      "How do I call you",
      "Do you have a contact number",
      "Phone contact",
    ],
    keywords: ["phone", "call", "number", "contact"],
    answer:
      "ProjexiaHub contact details are available through the Contact section of the website. You can also reach ProjexiaHub by email.",
    priority: 100,
  },

  {
    id: "basic-contact-human",
    category: "general",
    intent: "contact",
    question: "Can I talk to a real person?",
    variations: [
      "Can I talk to a real person",
      "Can I speak to someone",
      "I want to talk to a human",
      "Can a real person answer me",
      "Is there a human I can contact",
      "Can someone from ProjexiaHub help me",
    ],
    keywords: ["human", "person", "speak", "talk", "contact"],
    answer:
      "Yes. The Help Assistant is only a quick information tool. For a specific project or anything that requires a real response, use the contact options on the website.",
    priority: 100,
  },

  {
    id: "basic-contact-urgent",
    category: "general",
    intent: "contact",
    question: "How do I contact ProjexiaHub for an urgent matter?",
    variations: [
      "How do I contact ProjexiaHub for an urgent matter",
      "Urgent contact",
      "I need to reach ProjexiaHub quickly",
      "Emergency contact",
      "Time sensitive request",
    ],
    keywords: ["urgent", "emergency", "quickly", "time", "contact"],
    answer:
      "For urgent matters, use the direct contact options available on the website and clearly mark your message as urgent. Include enough details so the situation can be understood quickly.",
    priority: 90,
  },

  {
    id: "basic-response-time",
    category: "general",
    intent: "contact",
    question: "How quickly will ProjexiaHub reply?",
    variations: [
      "How quickly will ProjexiaHub reply",
      "When will I get a reply",
      "How long for a response",
      "Reply time",
      "When will someone contact me",
      "How fast do you reply",
    ],
    keywords: ["reply", "response", "contact", "time", "quickly"],
    answer:
      "ProjexiaHub typically replies within its normal response time to submitted requests. For the latest information, use the contact options provided on the website.",
    priority: 90,
  },

  {
    id: "basic-contact-form",
    category: "general",
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
      "Use the Contact section of the website to find the contact form or available contact options. Provide clear details about your question or project so ProjexiaHub can respond appropriately.",
    priority: 90,
  },

  {
    id: "basic-contact-social",
    category: "general",
    intent: "contact",
    question: "Does ProjexiaHub have social media?",
    variations: [
      "Does ProjexiaHub have social media",
      "Are you on Facebook",
      "Do you have Instagram",
      "Social media links",
      "Where can I follow ProjexiaHub",
    ],
    keywords: ["social", "media", "facebook", "instagram", "follow"],
    answer:
      "Social media availability depends on the current ProjexiaHub online presence. Check the website or contact ProjexiaHub directly for the latest official channels.",
    priority: 80,
  },

  {
    id: "basic-contact-email-support",
    category: "general",
    intent: "contact",
    question: "Is there an email for support?",
    variations: [
      "Is there an email for support",
      "Support email",
      "Where to send support request",
      "Technical support contact",
      "Help email",
    ],
    keywords: ["support", "email", "contact", "help"],
    answer:
      "Use the contact options on the website for support. For project-specific issues, provide relevant details so the request can be routed correctly.",
    priority: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // PRICING / SERVICES / REQUESTS OVERVIEW
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-pricing-general",
    category: "general",
    intent: "pricing",
    question: "How much does a project cost?",
    variations: [
      "How much does a project cost",
      "Project price",
      "How much do you charge",
      "What is your pricing",
      "Cost of a custom project",
      "How expensive is a project",
      "What is the price of a project",
    ],
    keywords: ["price", "cost", "charge", "pricing", "expensive"],
    answer:
      "There is no single fixed price for custom projects. Cost depends on hardware, components, complexity, software, enclosure, quantity and other requirements. Submit the project details for a more meaningful scope and estimate.",
    priority: 100,
  },

  {
    id: "basic-services-overview",
    category: "general",
    intent: "capability",
    question: "What services does ProjexiaHub provide?",
    variations: [
      "What services does ProjexiaHub provide",
      "What do you offer",
      "What services are available",
      "What can ProjexiaHub do for me",
      "List your services",
      "What can you help with",
    ],
    keywords: ["services", "offer", "provide", "available", "help"],
    answer:
      "ProjexiaHub works on electronics, embedded systems, automation, IoT, sensor-based projects, microcontroller projects, prototypes, PCB-related work and custom hardware/software solutions. Submit a project request with your requirements for a more specific discussion.",
    priority: 100,
  },

  {
    id: "basic-project-request-start",
    category: "general",
    intent: "project_request",
    question: "How do I start a project with ProjexiaHub?",
    variations: [
      "How do I start a project with ProjexiaHub",
      "I want to start a project",
      "How to begin a project",
      "How do I request work",
      "Start a new project",
      "How to get a project made",
    ],
    keywords: ["start", "project", "request", "begin", "work"],
    answer:
      "Use the Project Request option in the website navigation to open the request form. Describe what you want the system to do, and include as much detail as you can about requirements, hardware, timeline and budget where available.",
    priority: 100,
  },

  {
    id: "basic-project-idea-only",
    category: "general",
    intent: "project_requirements",
    question: "Can I submit just a project idea?",
    variations: [
      "Can I submit just a project idea",
      "I have only an idea",
      "Can I request without details",
      "I do not have technical details",
      "Can I explain only what I want",
      "I have a concept only",
      "Can I submit a rough idea",
    ],
    keywords: ["idea", "concept", "details", "technical", "request"],
    answer:
      "Yes. You can start with an idea or a description of what you want the system to do. You do not need to know the exact components, board or technical implementation before submitting a request.",
    priority: 100,
  },

  {
    id: "basic-general-mectec",
    category: "general",
    intent: "definition",
    question: "What is ProjexiaHub?",
    variations: [
      "What is ProjexiaHub",
      "Tell me about ProjexiaHub",
      "What does ProjexiaHub do",
      "What is this company",
      "Who is ProjexiaHub",
      "Explain ProjexiaHub",
      "What is ProjexiaHub about",
    ],
    keywords: ["mectec", "company", "business", "what", "about"],
    answer:
      "ProjexiaHub is an electronics and technology-focused business that develops practical hardware, embedded, automation, IoT and related technical projects. The website lets you explore completed projects and submit your own project idea or request.",
    priority: 100,
  },

  {
    id: "basic-general-contact-human",
    category: "general",
    intent: "contact",
    question: "Can I talk to a real person?",
    variations: [
      "Can I talk to a real person",
      "Can I speak to someone",
      "I want to talk to a human",
      "Can a real person answer me",
      "Is there a human I can contact",
      "Can someone from ProjexiaHub help me",
    ],
    keywords: ["human", "person", "speak", "talk", "contact"],
    answer:
      "Yes. The Help Assistant is only a quick information tool. For a specific project or anything that requires a real response, use the contact options on the website.",
    priority: 100,
  },

  {
    id: "basic-services-student",
    category: "general",
    intent: "capability",
    question: "Do you help students?",
    variations: [
      "Do you help students",
      "Can you help with a student project",
      "Do you work with students",
      "Student project help",
      "Do you make university projects",
      "FYP help",
    ],
    keywords: ["student", "university", "fyp", "project", "help"],
    answer:
      "Yes. ProjexiaHub can work on student and educational projects. Provide the project requirements and deadline through the project request form.",
    priority: 90,
  },

  {
    id: "basic-services-custom",
    category: "general",
    intent: "capability",
    question: "Can you build something custom?",
    variations: [
      "Can you build something custom",
      "Custom project request",
      "Can you build my idea",
      "Idea to product",
      "Custom electronics",
      "Unique project",
    ],
    keywords: ["custom", "idea", "project", "build", "unique"],
    answer:
      "Yes. ProjexiaHub accepts custom project requests. Describe what you want the system to do, and the technical approach can be worked out from the requirements.",
    priority: 100,
  },

  {
    id: "basic-services-arduino",
    category: "general",
    intent: "capability",
    question: "Do you work with Arduino?",
    variations: [
      "Do you work with Arduino",
      "Can you program Arduino",
      "Arduino project help",
      "Do you use Arduino",
      "Arduino firmware",
    ],
    keywords: ["arduino", "project", "programming", "firmware"],
    answer:
      "Yes. Arduino-based projects can be developed for sensor reading, actuator control, communication, automation and other embedded applications.",
    priority: 100,
  },

  {
    id: "basic-services-esp32",
    category: "general",
    intent: "capability",
    question: "Do you work with ESP32?",
    variations: [
      "Do you work with ESP32",
      "Can you program ESP32",
      "ESP32 project help",
      "Do you use ESP32",
      "ESP32 firmware",
    ],
    keywords: ["esp32", "project", "programming", "firmware", "iot"],
    answer:
      "Yes. ESP32 firmware can be developed for Wi-Fi, Bluetooth, GPIO control, sensors, displays, IoT communication and other embedded applications.",
    priority: 100,
  },

  {
    id: "basic-timeline-overview",
    category: "general",
    intent: "timeline",
    question: "How long does a project take?",
    variations: [
      "How long does a project take",
      "Project duration",
      "How many days for a project",
      "How long will my project take",
      "Development time",
      "How quickly can you build it",
    ],
    keywords: ["time", "duration", "days", "weeks", "timeline", "deadline"],
    answer:
      "Project duration depends on scope. A small electronics build may require much less development time than a larger system involving multiple hardware modules, firmware, communication, testing and an enclosure.",
    priority: 100,
  },

  {
    id: "basic-policy-source-code",
    category: "general",
    intent: "compatibility",
    question: "Do I receive the source code?",
    variations: [
      "Do I receive the source code",
      "Do I own the source code",
      "Will you give me the firmware",
      "Can I get the project code",
      "Do you keep the code",
    ],
    keywords: ["source", "code", "firmware", "ownership"],
    answer:
      "Yes. Source code, firmware and relevant schematics are handed over with the finished ProjexiaHub build.",
    priority: 100,
  },

  {
    id: "basic-policy-schematics",
    category: "general",
    intent: "compatibility",
    question: "Do I receive schematics?",
    variations: [
      "Do I receive schematics",
      "Will I get the circuit diagram",
      "Do you provide wiring diagrams",
      "Can I receive the schematic",
      "Do I get hardware documentation",
    ],
    keywords: ["schematic", "diagram", "wiring", "documentation"],
    answer:
      "Relevant schematics and circuit documentation are handed over with the finished build where applicable.",
    priority: 100,
  },

  {
    id: "basic-portfolio",
    category: "general",
    intent: "capability",
    question: "Where can I see your previous projects?",
    variations: [
      "Where can I see your previous projects",
      "Show me your projects",
      "Where is the portfolio",
      "Can I see previous work",
      "Where can I see completed projects",
    ],
    keywords: ["projects", "portfolio", "previous", "work", "examples"],
    answer:
      "Visit the Projects section of the ProjexiaHub website to explore available project entries and case studies.",
    priority: 100,
  },

  {
    id: "basic-website-request-form",
    category: "general",
    intent: "project_request",
    question: "Where is the project request form?",
    variations: [
      "Where is the project request form",
      "How do I find the request form",
      "Where can I submit a project",
      "Where is the project form",
      "How do I request a build",
    ],
    keywords: ["request", "form", "project", "submit", "location"],
    answer:
      "Use the Project Request option in the website navigation to open the request form.",
    priority: 100,
  },

  {
    id: "basic-website-contact-page",
    category: "general",
    intent: "contact",
    question: "Where is the contact page?",
    variations: [
      "Where is the contact page",
      "How do I find contact",
      "Where can I contact ProjexiaHub",
      "Show me contact information",
      "Where is contact",
    ],
    keywords: ["contact", "page", "email", "whatsapp"],
    answer:
      "Use the Contact option in the website navigation to find ProjexiaHub contact information and available communication options.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // GENERAL FALLBACK / HELP ASSISTANT
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-help-assistant-what",
    category: "general",
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
      "The Help Assistant provides instant answers from ProjexiaHub's local knowledge library. It covers ProjexiaHub information, project requests, services, electronics, embedded systems, components, sensors, automation, IoT, troubleshooting and related topics included in the library.",
    priority: 100,
  },

  {
    id: "basic-off-topic",
    category: "general",
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
      "The Help Assistant is intentionally limited to information in the ProjexiaHub knowledge library. Questions outside its supported topics may receive a fallback response instead of an invented answer.",
    priority: 100,
  },

  {
    id: "basic-help-not-covered",
    category: "general",
    intent: "contact",
    question: "What if the assistant cannot answer my question?",
    variations: [
      "What if the assistant cannot answer my question",
      "Assistant does not know",
      "Question not in knowledge base",
      "Assistant cannot answer",
      "Not covered by help assistant",
    ],
    keywords: ["assistant", "question", "covered", "cannot", "answer"],
    answer:
      "If your question is not covered, use the contact options on the website to ask ProjexiaHub directly. Providing detail helps ensure a useful reply.",
    priority: 100,
  },
  // ─────────────────────────────────────────────────────────────
  // GENERAL RESPONSE / FALLBACK (continued)
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-thanks",
    category: "general",
    intent: "general",
    question: "Thanks",
    variations: [
      "Thanks",
      "Thank you",
      "Thanks a lot",
      "Thanks so much",
      "Many thanks",
      "Thank you very much",
      "Thanks for your help",
      "Appreciate it",
      "I appreciate it",
    ],
    keywords: ["thanks", "thank", "appreciate", "help"],
    answer:
      "You're very welcome! 😊 If you need anything else, just ask. I'm happy to help.",
    priority: 100,
  },

  {
    id: "basic-okay",
    category: "general",
    intent: "general",
    question: "Okay",
    variations: [
      "Okay",
      "Ok",
      "Alright",
      "All right",
      "Got it",
      "Understood",
      "I see",
      "Sounds good",
    ],
    keywords: ["okay", "ok", "alright", "got", "understood"],
    answer: "Great! 👍 If you need anything else, just ask.",
    priority: 100,
  },

  {
    id: "basic-yes",
    category: "general",
    intent: "general",
    question: "Yes",
    variations: [
      "Yes",
      "Yeah",
      "Yep",
      "Sure",
      "Absolutely",
      "Of course",
      "Definitely",
    ],
    keywords: ["yes", "yeah", "yep", "sure", "absolutely"],
    answer: "Got it! 👍 What would you like to ask or do next?",
    priority: 100,
  },

  {
    id: "basic-no",
    category: "general",
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
    keywords: ["no", "nope", "thanks", "not"],
    answer:
      "Alright. 😊 If you change your mind or have another question, I'm here to help.",
    priority: 100,
  },

  {
    id: "basic-maybe",
    category: "general",
    intent: "general",
    question: "Maybe",
    variations: ["Maybe", "Perhaps", "I am not sure", "Possibly", "I might"],
    keywords: ["maybe", "perhaps", "unsure", "possibly"],
    answer:
      "That's okay. Take your time. If you want, describe what you are considering and I can share relevant information from the ProjexiaHub knowledge library.",
    priority: 100,
  },

  {
    id: "basic-goodbye",
    category: "general",
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
    ],
    keywords: ["goodbye", "bye", "later"],
    answer:
      "Goodbye! 👋 Thanks for visiting ProjexiaHub. Have a great day, and feel free to come back whenever you need help.",
    priority: 100,
  },

  {
    id: "basic-welcome",
    category: "general",
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
      "Happy to help! 😊 If you have another question about ProjexiaHub, electronics, projects or anything else in the knowledge library, just ask.",
    priority: 100,
  },

  {
    id: "basic-congratulations",
    category: "general",
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
    id: "basic-good-luck",
    category: "general",
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
    id: "basic-have-a-nice-day",
    category: "general",
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
    id: "basic-take-care",
    category: "general",
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
      "You too! 😊 Take care and visit ProjexiaHub again whenever you need help.",
    priority: 100,
  },

  // ─────────────────────────────────────────────────────────────
  // HELP / HANDBOOKS / MISC
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-how-can-you-help",
    category: "general",
    intent: "general",
    question: "How can you help me?",
    variations: [
      "How can you help me",
      "What can you do for me",
      "How can you assist",
      "What kind of help can you give",
      "How do I use this assistant",
      "What is the purpose of this assistant",
    ],
    keywords: ["help", "assist", "purpose", "assistant", "how"],
    answer:
      "I can answer questions about ProjexiaHub, its projects, services, pricing, timelines, and technical topics like electronics, sensors, microcontrollers, motors, RFID, PCB design, firmware, IoT, automation and troubleshooting. For anything project-specific, use the contact options to reach ProjexiaHub directly.",
    priority: 100,
  },

  {
    id: "basic-what-can-i-ask",
    category: "general",
    intent: "general",
    question: "What can I ask you?",
    variations: [
      "What can I ask you",
      "What kind of questions can I ask",
      "What topics do you cover",
      "What questions do you answer",
      "What is in your knowledge base",
    ],
    keywords: ["ask", "questions", "topics", "cover", "knowledge"],
    answer:
      "You can ask about ProjexiaHub's services, project requests, pricing, timelines, policies, the portfolio, and technical topics such as electronics, microcontrollers, sensors, motors, RFID, PCB design, firmware, IoT and automation.",
    priority: 100,
  },

  {
    id: "basic-are-you-a-bot",
    category: "general",
    intent: "general",
    question: "Are you a bot?",
    variations: [
      "Are you a bot",
      "Are you a robot",
      "Are you a human",
      "Are you real",
      "Is this a real person",
      "Am I talking to a machine",
    ],
    keywords: ["bot", "robot", "human", "real", "machine"],
    answer:
      "Yes, I'm the ProjexiaHub Help Assistant — a local knowledge-based bot. For a real person, use the contact options on the website.",
    priority: 100,
  },

  {
    id: "basic-are-you-ai",
    category: "general",
    intent: "general",
    question: "Are you AI?",
    variations: [
      "Are you AI",
      "Do you use AI",
      "Is this an AI chatbot",
      "Do you use ChatGPT",
      "Is this powered by AI",
      "Is this a generative AI",
    ],
    keywords: ["ai", "chatgpt", "generative", "intelligence", "powered"],
    answer:
      "No. The ProjexiaHub Help Assistant is a local rule-based knowledge system. Its answers come from the website's built-in knowledge library rather than a generative AI service.",
    priority: 100,
  },

  {
    id: "basic-are-you-connected-to-internet",
    category: "general",
    intent: "general",
    question: "Do you have internet access?",
    variations: [
      "Do you have internet access",
      "Can you search the internet",
      "Do you use Google",
      "Can you look things up online",
      "Are you connected to the internet",
    ],
    keywords: ["internet", "search", "google", "online", "connected"],
    answer:
      "No. I answer from the ProjexiaHub local knowledge library and do not browse the internet or search online services.",
    priority: 100,
  },

  {
    id: "basic-language",
    category: "general",
    intent: "general",
    question: "What languages do you speak?",
    variations: [
      "What languages do you speak",
      "Can you speak Urdu",
      "Do you speak English",
      "Can you understand other languages",
      "Is the assistant multilingual",
    ],
    keywords: ["language", "urdu", "english", "speak", "multilingual"],
    answer:
      "The Help Assistant is primarily designed for English. You can still message ProjexiaHub directly in the language you are most comfortable with using the contact options on the website.",
    priority: 90,
  },

  {
    id: "basic-feedback",
    category: "general",
    intent: "contact",
    question: "How can I give feedback?",
    variations: [
      "How can I give feedback",
      "Can I send feedback",
      "How to report a problem",
      "Send a suggestion",
      "Where can I comment",
    ],
    keywords: ["feedback", "suggestion", "report", "comment", "problem"],
    answer:
      "Use the Contact section of the website to send feedback, suggestions or reports. Provide clear details so the message can be routed correctly.",
    priority: 90,
  },

  {
    id: "basic-report-wrong-answer",
    category: "general",
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
      "Use the Contact section of the website to report a wrong or missing answer. Describe the question and the issue so the knowledge library can be improved.",
    priority: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // PROJECT CATEGORIES SUMMARY
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-categories-electronics",
    category: "general",
    intent: "capability",
    question: "Do you build electronics projects?",
    variations: [
      "Do you build electronics projects",
      "Can you make electronic systems",
      "Do you work with electronic circuits",
      "Can you build hardware projects",
      "Electronics project help",
    ],
    keywords: ["electronics", "electronic", "hardware", "circuits", "projects"],
    answer:
      "Yes. Electronics and embedded hardware are central areas of ProjexiaHub projects, including sensor systems, microcontroller projects, automation and other custom electronic solutions.",
    priority: 100,
  },

  {
    id: "basic-categories-embedded",
    category: "general",
    intent: "capability",
    question: "Do you build embedded systems?",
    variations: [
      "Do you build embedded systems",
      "Can you make embedded projects",
      "Can you build microcontroller systems",
      "Do you develop embedded hardware",
      "Embedded project help",
    ],
    keywords: ["embedded", "microcontroller", "firmware", "systems"],
    answer:
      "Yes. ProjexiaHub works with embedded systems involving microcontrollers, sensors, actuators, communication modules and firmware.",
    priority: 100,
  },

  {
    id: "basic-categories-automation",
    category: "general",
    intent: "capability",
    question: "Do you build automation systems?",
    variations: [
      "Do you build automation systems",
      "Can you build automation",
      "Do you make automated systems",
      "Can you automate a process",
      "Automation project help",
    ],
    keywords: ["automation", "automate", "control", "system", "process"],
    answer:
      "Yes. Automation projects can combine sensors, controllers, motors, relays, communication modules and programmed logic to perform tasks automatically.",
    priority: 100,
  },

  {
    id: "basic-categories-iot",
    category: "general",
    intent: "capability",
    question: "Do you work with IoT?",
    variations: [
      "Do you work with IoT",
      "Can you build IoT projects",
      "Do you make internet connected devices",
      "Can you connect hardware to the internet",
      "IoT project help",
    ],
    keywords: ["iot", "internet", "wifi", "connected", "smart"],
    answer:
      "Yes. IoT projects can use connected microcontrollers, sensors, dashboards, APIs and other communication technologies depending on the requirements.",
    priority: 100,
  },

  {
    id: "basic-categories-pcb",
    category: "general",
    intent: "capability",
    question: "Do you design PCBs?",
    variations: [
      "Do you design PCBs",
      "Can you make a PCB",
      "Do you design circuit boards",
      "Can ProjexiaHub convert my circuit into a PCB",
      "PCB design help",
    ],
    keywords: ["pcb", "design", "circuit", "board", "layout"],
    answer:
      "PCB design can be part of a project when a permanent or compact circuit is required. The process normally starts with a verified schematic and continues with component placement, routing, design-rule checks and manufacturing files.",
    priority: 100,
  },

  {
    id: "basic-categories-firmware",
    category: "general",
    intent: "capability",
    question: "Do you write firmware?",
    variations: [
      "Do you write firmware",
      "Can you write firmware",
      "Can you program microcontrollers",
      "Do you develop embedded software",
      "Firmware help",
    ],
    keywords: ["firmware", "code", "program", "embedded", "software"],
    answer:
      "Yes. Firmware can be developed for microcontrollers such as Arduino, ESP32, STM32 and others, covering sensor reading, control logic, communication, displays and other functions.",
    priority: 100,
  },

  {
    id: "basic-categories-rfid",
    category: "general",
    intent: "capability",
    question: "Do you work with RFID?",
    variations: [
      "Do you work with RFID",
      "Can you build RFID projects",
      "Do you make RFID systems",
      "Can you build RFID access control",
      "RFID project help",
    ],
    keywords: ["rfid", "card", "tag", "access", "attendance"],
    answer:
      "Yes. RFID can be used for projects such as identification, access control, authentication and other systems where cards or tags need to be detected.",
    priority: 100,
  },

  {
    id: "basic-categories-robotics",
    category: "general",
    intent: "capability",
    question: "Do you build robots?",
    variations: [
      "Do you build robots",
      "Can you build a robot",
      "Robotics project help",
      "Do you make robotics projects",
      "Can you automate a machine",
    ],
    keywords: ["robotics", "robot", "automation", "machine", "control"],
    answer:
      "Robotics and motion-control projects can involve microcontrollers, motor drivers, sensors, feedback and communication. The approach depends on the required behavior and environment.",
    priority: 90,
  },

  {
    id: "basic-categories-security",
    category: "general",
    intent: "capability",
    question: "Do you make security systems?",
    variations: [
      "Do you make security systems",
      "Do you build security projects",
      "Alarm system project",
      "Access control system",
      "Security project help",
    ],
    keywords: ["security", "alarm", "access", "control", "system"],
    answer:
      "Security projects can include alarms, access control, sensors, cameras and communication. The design should consider reliability, tamper resistance and power backup.",
    priority: 90,
  },

  {
    id: "basic-categories-monitoring",
    category: "general",
    intent: "capability",
    question: "Do you make monitoring systems?",
    variations: [
      "Do you make monitoring systems",
      "Do you build monitoring devices",
      "Remote monitoring project",
      "Sensor monitoring system",
      "Monitoring project help",
    ],
    keywords: ["monitoring", "remote", "sensor", "logging", "system"],
    answer:
      "Monitoring systems can measure temperature, humidity, pressure, motion, current and other values. Data can be logged locally or transmitted for remote access.",
    priority: 90,
  },

  {
    id: "basic-categories-student",
    category: "general",
    intent: "capability",
    question: "Do you help students with projects?",
    variations: [
      "Do you help students with projects",
      "Can you make university projects",
      "Student project help",
      "Do you make FYP projects",
      "Educational project help",
    ],
    keywords: ["student", "university", "fyp", "educational", "help"],
    answer:
      "ProjexiaHub can work on educational and engineering project requirements, including prototypes, embedded systems, automation, sensors, RFID, IoT and other electronics-focused projects. Requirements should be provided before confirming feasibility.",
    priority: 90,
  },

  {
    id: "basic-categories-startup",
    category: "general",
    intent: "capability",
    question: "Can you help with startup products?",
    variations: [
      "Can you help with startup products",
      "Startup project help",
      "MVP development",
      "Can you build a product prototype",
      "Startup prototype help",
    ],
    keywords: ["startup", "mvp", "product", "prototype", "help"],
    answer:
      "Yes. Startups can request prototypes or early-stage product development. Requirements, budget and timeline should be discussed.",
    priority: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // GENERAL PROCESS / EXPECTATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-process-after-request",
    category: "general",
    intent: "project_request",
    question: "What happens after I submit a request?",
    variations: [
      "What happens after I submit a request",
      "What happens after submitting",
      "What happens when I send the form",
      "What happens next",
      "What do you do with my request",
    ],
    keywords: ["after", "submit", "submission", "next", "request"],
    answer:
      "After submission, the request is reviewed and followed up through ProjexiaHub's normal contact process. Response time depends on the current workload.",
    priority: 100,
  },

  {
    id: "basic-process-info-required",
    category: "general",
    intent: "project_requirements",
    question: "What information do you need for a project?",
    variations: [
      "What information do you need for a project",
      "What should I provide for a project",
      "What details are required",
      "What do you need from me",
      "How should I describe my project",
    ],
    keywords: ["information", "details", "required", "project", "describe"],
    answer:
      "Useful information includes the project goal, important features, inputs and outputs, preferred components, power source, size, environment, deadline, budget range and any existing circuit, code or prototype.",
    priority: 100,
  },

  {
    id: "basic-process-existing-project",
    category: "general",
    intent: "capability",
    question: "Can I submit a project that already exists?",
    variations: [
      "Can I submit a project that already exists",
      "I have a prototype already",
      "I already built part of it",
      "Can you finish my project",
      "Can you work on existing hardware",
    ],
    keywords: ["existing", "prototype", "already", "hardware", "finish"],
    answer:
      "Yes. If you already have hardware, code, a circuit or a partially completed project, describe what you have and what remains. The request form can be used to provide those details and relevant photos.",
    priority: 100,
  },

  {
    id: "basic-process-photos",
    category: "general",
    intent: "project_request",
    question: "Can I attach photos to my request?",
    variations: [
      "Can I attach photos to my request",
      "Can I upload images",
      "Can I send photos",
      "Can I upload my circuit",
      "Can I send a prototype photo",
    ],
    keywords: ["photo", "photos", "image", "upload", "attach"],
    answer:
      "Yes. If your request involves existing hardware, wiring, a prototype or a circuit, relevant photos can help explain the current situation.",
    priority: 90,
  },

  {
    id: "basic-process-budget",
    category: "general",
    intent: "pricing",
    question: "Do I need to know my budget before submitting?",
    variations: [
      "Do I need to know my budget before submitting",
      "Can I submit without a budget",
      "What if I do not know my budget",
      "Is budget required",
      "Can I leave budget undecided",
    ],
    keywords: ["budget", "cost", "required", "undecided", "unknown"],
    answer:
      "You can submit a request even if your budget is not decided yet. A budget range is useful when available because it helps identify practical component and implementation options.",
    priority: 90,
  },

  {
    id: "basic-process-deadline",
    category: "general",
    intent: "timeline",
    question: "Can I provide a deadline?",
    variations: [
      "Can I provide a deadline",
      "Can I specify a deadline",
      "I need the project urgently",
      "Can you build it by a certain date",
      "Where do I mention my deadline",
    ],
    keywords: ["deadline", "urgent", "date", "timeline", "quick"],
    answer:
      "Yes. If you have a target date or deadline, include it in the request. The timeline can then be considered together with the project scope and complexity.",
    priority: 90,
  },

  {
    id: "basic-process-no-response",
    category: "general",
    intent: "contact",
    question: "What if I do not get a response?",
    variations: [
      "What if I do not get a response",
      "No reply from ProjexiaHub",
      "I did not hear back",
      "My email was not answered",
      "No response to my request",
    ],
    keywords: ["response", "reply", "answer", "request", "contact"],
    answer:
      "ProjexiaHub typically replies within its normal response time to submitted requests. If you have not received a response, check the contact details were correct, look in your spam folder and send a polite follow-up with your original message details.",
    priority: 100,
  },

  {
    id: "basic-process-follow-up",
    category: "general",
    intent: "contact",
    question: "How do I follow up on my request?",
    variations: [
      "How do I follow up on my request",
      "Follow up request",
      "No response to request",
      "Check request status",
      "How to contact about request",
    ],
    keywords: ["follow", "request", "status", "reply", "contact"],
    answer:
      "Use the contact options on the website to follow up. Include your original request details so it can be located quickly.",
    priority: 90,
  },

  {
    id: "basic-process-meeting",
    category: "general",
    intent: "contact",
    question: "Can I schedule a meeting?",
    variations: [
      "Can I schedule a meeting",
      "Can I book a meeting",
      "Can we discuss my project",
      "Can I have a consultation",
      "How do I schedule a meeting",
    ],
    keywords: ["meeting", "schedule", "consultation", "discuss", "book"],
    answer:
      "Meeting arrangements depend on availability and the purpose. Use the contact options on the website to request a meeting or discussion.",
    priority: 90,
  },

  {
    id: "basic-process-consultation",
    category: "general",
    intent: "contact",
    question: "Can I get a consultation for my project?",
    variations: [
      "Can I get a consultation for my project",
      "Can you advise on my project",
      "Can I discuss my idea",
      "Project consultation",
      "Can you help me plan",
    ],
    keywords: ["consultation", "advice", "discuss", "idea", "project"],
    answer:
      "Consultations can be arranged depending on availability. Use the contact options on the website to discuss your project idea.",
    priority: 90,
  },

  {
    id: "basic-process-repair",
    category: "general",
    intent: "capability",
    question: "Can you repair my project?",
    variations: [
      "Can you repair my project",
      "Can you fix my circuit",
      "My project is broken",
      "Repair service",
      "Can you fix electronics",
    ],
    keywords: ["repair", "fix", "broken", "service", "circuit"],
    answer:
      "Repair feasibility depends on the project and the fault. Provide details about the problem and any relevant photos or measurements when contacting ProjexiaHub.",
    priority: 90,
  },

  {
    id: "basic-process-maintenance",
    category: "general",
    intent: "compatibility",
    question: "Do you provide maintenance?",
    variations: [
      "Do you provide maintenance",
      "Can you maintain my project",
      "Do you offer maintenance service",
      "Project maintenance",
      "Long term maintenance",
    ],
    keywords: ["maintenance", "service", "long", "term", "project"],
    answer:
      "Maintenance arrangements depend on the project. Contact ProjexiaHub directly to discuss maintenance requirements.",
    priority: 90,
  },

  // ─────────────────────────────────────────────────────────────
  // COMMON WORD VARIATIONS / ELLIPSES
  // ─────────────────────────────────────────────────────────────
  {
    id: "basic-help",
    category: "general",
    intent: "general",
    question: "Help",
    variations: [
      "Help",
      "I need help",
      "Can you help",
      "Help me please",
      "Assistance needed",
      "Need help",
      "Please help",
    ],
    keywords: ["help", "assistance", "please", "need"],
    answer:
      "Of course! 😊 Tell me what you need help with. I can answer questions about ProjexiaHub, electronics, embedded systems, sensors, IoT, firmware, PCB design, troubleshooting and more.",
    priority: 100,
  },

  {
    id: "basic-question",
    category: "general",
    intent: "general",
    question: "I have a question",
    variations: [
      "I have a question",
      "Can I ask something",
      "Can I ask you a question",
      "Quick question",
      "I want to ask",
      "Can I ask a question",
    ],
    keywords: ["question", "ask", "quick", "something"],
    answer:
      "Sure! 😊 Go ahead and ask. I'll answer based on the ProjexiaHub knowledge library.",
    priority: 100,
  },

  {
    id: "basic-more-info",
    category: "general",
    intent: "general",
    question: "Can I have more information?",
    variations: [
      "Can I have more information",
      "Tell me more",
      "Can you explain more",
      "More details please",
      "Can you elaborate",
    ],
    keywords: ["more", "information", "details", "explain", "elaborate"],
    answer:
      "Sure! Tell me which topic you'd like more detail on and I'll share what I know from the knowledge library.",
    priority: 100,
  },

  {
    id: "basic-what-next",
    category: "general",
    intent: "general",
    question: "What should I do next?",
    variations: [
      "What should I do next",
      "What now",
      "What is the next step",
      "Where do I go from here",
      "What is the next action",
    ],
    keywords: ["next", "step", "action", "now", "proceed"],
    answer:
      "Tell me your goal — whether it is a project, a question, or exploring the portfolio — and I'll point you to the next step in the ProjexiaHub knowledge library. For anything project-specific, use the contact or project request options.",
    priority: 100,
  },

  {
    id: "basic-which-page",
    category: "general",
    intent: "general",
    question: "Which page should I visit?",
    variations: [
      "Which page should I visit",
      "Where do I go on the website",
      "Which section should I use",
      "Where should I click",
      "What page has what I need",
    ],
    keywords: ["page", "section", "click", "visit", "website"],
    answer:
      "For projects, visit the Projects section. For a new request, use the Project Request form. For anything else, use the Contact section. Tell me what you need and I'll point you to the right area.",
    priority: 100,
  },

  {
    id: "basic-who-are-you",
    category: "general",
    intent: "general",
    question: "Who are you?",
    variations: [
      "Who are you",
      "What are you",
      "What is your name",
      "Who is this",
      "Introduce yourself",
      "What should I call you",
    ],
    keywords: ["who", "what", "name", "yourself", "introduce"],
    answer:
      "I'm the ProjexiaHub Help Assistant — a local knowledge-based bot for the ProjexiaHub website. I answer questions from the ProjexiaHub knowledge library. What can I help you with?",
    priority: 100,
  },

  {
    id: "basic-purpose-of-mectec",
    category: "general",
    intent: "purpose",
    question: "What is the purpose of ProjexiaHub?",
    variations: [
      "What is the purpose of ProjexiaHub",
      "Why does ProjexiaHub exist",
      "What is ProjexiaHub for",
      "What is the point of ProjexiaHub",
      "Why use ProjexiaHub",
    ],
    keywords: ["purpose", "mectec", "why", "point", "use"],
    answer:
      "ProjexiaHub exists to design and build practical electronics and technology projects for individuals and businesses that need custom hardware, firmware or automation solutions.",
    priority: 90,
  },

  {
    id: "basic-services-list",
    category: "general",
    intent: "capability",
    question: "Can you list your services briefly?",
    variations: [
      "Can you list your services briefly",
      "Give me a quick list of services",
      "Summary of services",
      "Short list of what you do",
      "What are your main services",
    ],
    keywords: ["list", "services", "summary", "brief", "main"],
    answer:
      "Quick list: electronics, embedded systems, automation, IoT, sensors, RFID, PCB design, firmware development, prototyping, robotics, motor control, monitoring systems, security and custom hardware/software. Ask about any of these for details.",
    priority: 100,
  },

  {
    id: "basic-latest",
    category: "general",
    intent: "general",
    question: "What is new at ProjexiaHub?",
    variations: [
      "What is new at ProjexiaHub",
      "Any new projects",
      "Latest updates",
      "What is the latest at ProjexiaHub",
      "New offerings",
    ],
    keywords: ["new", "latest", "updates", "mectec", "offerings"],
    answer:
      "New projects and updates appear in the Projects section of the website. For announcements or news, check the website or contact ProjexiaHub directly.",
    priority: 90,
  },

  {
    id: "basic-start-here",
    category: "general",
    intent: "general",
    question: "Where should I start?",
    variations: [
      "Where should I start",
      "I'm new here",
      "First time here",
      "How do I begin",
      "I just arrived",
    ],
    keywords: ["start", "new", "begin", "first", "arrived"],
    answer:
      "Welcome! Start by telling me what you're looking for — a project, product information, a quote, or general info. I'll point you in the right direction. For a project, the request form is the best first step.",
    priority: 100,
  },
];
