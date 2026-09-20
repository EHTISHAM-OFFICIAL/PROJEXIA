import { SITE } from "../site";

export const TIMELINE_HELP = [
  {
    id: "timeline-project-duration",
    category: "timelines",
    question: "How long does a project take?",
    variations: [
      "How many days does a project take",
      "How long will my project take",
      "What is the development time",
      "How quickly can you build it",
      "How many weeks does a project need",
    ],
    keywords: ["time", "duration", "days", "weeks", "timeline", "deadline"],
    answer:
      "Project duration depends on scope. A small electronics build may require much less development time than a larger system involving multiple hardware modules, firmware, communication, testing and an enclosure.",
    priority: 10,
  },

  {
    id: "timeline-simple-project",
    category: "timelines",
    question: "How long does a simple electronics project take?",
    variations: [
      "How fast can a basic project be made",
      "How long for a small circuit",
      "How long for a simple Arduino project",
      "How long for a basic sensor project",
    ],
    keywords: ["simple", "basic", "small", "arduino", "sensor", "days"],
    answer:
      "Simple projects generally require less development time, but the actual timeline depends on the required features, hardware availability, testing and any enclosure or documentation requirements.",
    priority: 8,
  },

  {
    id: "timeline-urgent",
    category: "timelines",
    question: "Can I request an urgent project?",
    variations: [
      "Can you make my project urgently",
      "I need it quickly",
      "Can you finish it fast",
      "Can I request a rush project",
      "I have a very short deadline",
    ],
    keywords: ["urgent", "rush", "fast", "quick", "deadline"],
    answer:
      "You can state an urgent deadline in your request. Whether it is practical depends on the project scope, component availability and development/testing requirements.",
    priority: 9,
  },

  {
    id: "timeline-response",
    category: "timelines",
    question: "How long does MECTEC take to respond?",
    variations: [
      "When will you reply",
      "How soon will I get a reply",
      "What is the response time",
      "When will someone contact me",
    ],
    keywords: ["response", "reply", "contact", "time"],
    answer: `MECTEC typically replies ${SITE.responseTime} to a submitted request.`,
    priority: 10,
  },

  {
    id: "timeline-testing",
    category: "timelines",
    question: "Does testing take part of the project time?",
    variations: [
      "Do you test projects",
      "Is testing included in development",
      "Why does hardware testing take time",
      "Does debugging affect the timeline",
    ],
    keywords: ["testing", "debugging", "development", "time", "hardware"],
    answer:
      "Yes. Hardware projects need testing and debugging in addition to writing code or assembling components. Real-world testing is important because wiring, power, sensors and physical components can behave differently from a simulation or first prototype.",
    priority: 8,
  },
] as const;
