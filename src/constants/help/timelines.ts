import type { HelpEntry } from "./types";
import { SITE } from "../site";

export const TIMELINE_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // OVERVIEW
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-project-duration",
    category: "timelines",
    intent: "timeline",
    question: "How long does a project take?",
    variations: [
      "How long does a project take",
      "How many days does a project take",
      "How long will my project take",
      "What is the development time",
      "How quickly can you build it",
      "How many weeks does a project need",
    ],
    keywords: ["time", "duration", "days", "weeks", "timeline", "deadline"],
    answer:
      "Project duration depends on scope. A small electronics build may require much less development time than a larger system involving multiple hardware modules, firmware, communication, testing and an enclosure.",
    priority: 20,
  },

  {
    id: "timeline-factors",
    category: "timelines",
    intent: "timeline",
    question: "What factors affect project duration?",
    variations: [
      "What factors affect project duration",
      "Why do projects take time",
      "What makes a project longer",
      "Timeline factors",
      "Project duration factors",
    ],
    keywords: ["factors", "duration", "timeline", "affect", "longer"],
    answer:
      "Key factors include project complexity, number of hardware modules, firmware difficulty, component availability, testing needs, enclosure design, documentation and delivery requirements.",
    priority: 15,
  },

  {
    id: "timeline-complexity",
    category: "timelines",
    intent: "timeline",
    question: "Does complexity affect the timeline?",
    variations: [
      "Does complexity affect the timeline",
      "Is complex project longer",
      "Does difficulty change time",
      "Complexity and timeline",
      "How complexity affects duration",
    ],
    keywords: ["complexity", "timeline", "duration", "difficulty", "affect"],
    answer:
      "Yes. More complex projects require more design, development, testing and integration effort, which usually increases the total duration.",
    priority: 13,
  },

  {
    id: "timeline-features",
    category: "timelines",
    intent: "timeline",
    question: "Do more features mean a longer timeline?",
    variations: [
      "Do more features mean a longer timeline",
      "Features and time",
      "Does more functionality take longer",
      "Additional features timeline",
      "Feature count affects duration",
    ],
    keywords: ["features", "functionality", "timeline", "longer", "duration"],
    answer:
      "Yes. Adding features increases development, testing and integration time. Prioritizing must-have features helps keep the timeline realistic.",
    priority: 13,
  },

  {
    id: "timeline-accuracy",
    category: "timelines",
    intent: "timeline",
    question: "How accurate is the initial timeline estimate?",
    variations: [
      "How accurate is the initial timeline estimate",
      "Timeline estimate accuracy",
      "Is the timeline final",
      "Can timeline change",
      "Estimate vs actual timeline",
    ],
    keywords: ["accurate", "timeline", "estimate", "change", "final"],
    answer:
      "Initial timelines are estimates based on the information available. Changes in scope, component availability or testing can affect the final duration.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SIMPLE / URGENT / RUSH
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-simple-project",
    category: "timelines",
    intent: "timeline",
    question: "How long does a simple electronics project take?",
    variations: [
      "How long does a simple electronics project take",
      "How fast can a basic project be made",
      "How long for a small circuit",
      "How long for a simple Arduino project",
      "How long for a basic sensor project",
    ],
    keywords: ["simple", "basic", "small", "arduino", "sensor", "days"],
    answer:
      "Simple projects generally require less development time, but the actual timeline depends on the required features, hardware availability, testing and any enclosure or documentation requirements.",
    priority: 13,
  },

  {
    id: "timeline-urgent",
    category: "timelines",
    intent: "timeline",
    question: "Can I request an urgent project?",
    variations: [
      "Can I request an urgent project",
      "Can you make my project urgently",
      "I need it quickly",
      "Can you finish it fast",
      "Can I request a rush project",
      "I have a very short deadline",
    ],
    keywords: ["urgent", "rush", "fast", "quick", "deadline"],
    answer:
      "You can state an urgent deadline in your request. Whether it is practical depends on the project scope, component availability and development/testing requirements.",
    priority: 13,
  },

  {
    id: "timeline-fast-track",
    category: "timelines",
    intent: "timeline",
    question: "Can the project be fast-tracked?",
    variations: [
      "Can the project be fast-tracked",
      "Fast track project",
      "Speed up development",
      "Accelerate timeline",
      "Quick project turnaround",
    ],
    keywords: ["fast", "track", "accelerate", "timeline", "speed"],
    answer:
      "Fast-tracking may be possible by prioritizing work, using readily available components, or simplifying scope. It usually involves trade-offs and may increase cost.",
    priority: 13,
  },

  {
    id: "timeline-reduce",
    category: "timelines",
    intent: "timeline",
    question: "How can I shorten the timeline?",
    variations: [
      "How can I shorten the timeline",
      "Speed up project",
      "Reduce development time",
      "Shorter timeline",
      "Faster project delivery",
    ],
    keywords: ["shorten", "reduce", "timeline", "faster", "speed"],
    answer:
      "Reduce scope, prioritize features, choose readily available components, allow parallel work and provide clear requirements early.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // RESPONSE / START
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-response",
    category: "timelines",
    intent: "timeline",
    question: "How long does MECTEC take to respond?",
    variations: [
      "How long does MECTEC take to respond",
      "When will you reply",
      "How soon will I get a reply",
      "What is the response time",
      "When will someone contact me",
    ],
    keywords: ["response", "reply", "contact", "time"],
    answer: `MECTEC typically replies ${SITE.responseTime} to a submitted request.`,
    priority: 15,
  },

  {
    id: "timeline-availability",
    category: "timelines",
    intent: "timeline",
    question: "Does MECTEC availability affect the timeline?",
    variations: [
      "Does MECTEC availability affect the timeline",
      "Current workload timeline",
      "Busy schedule project",
      "Capacity for new projects",
      "When can you start",
    ],
    keywords: ["availability", "workload", "schedule", "timeline", "start"],
    answer:
      "Yes. Current workload and scheduling can affect when work starts and how quickly it progresses. Contact MECTEC to discuss availability.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PHASES
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-design-phase",
    category: "timelines",
    intent: "timeline",
    question: "How long does the design phase take?",
    variations: [
      "How long does the design phase take",
      "Design phase duration",
      "Time for planning",
      "Project design timeline",
      "Design stage length",
    ],
    keywords: ["design", "phase", "timeline", "duration", "planning"],
    answer:
      "Design phase duration depends on complexity. It includes requirements clarification, component selection, schematic design and review.",
    priority: 13,
  },

  {
    id: "timeline-prototype-phase",
    category: "timelines",
    intent: "timeline",
    question: "How long does the prototype phase take?",
    variations: [
      "How long does the prototype phase take",
      "Prototype phase duration",
      "Time for prototyping",
      "Prototype stage timeline",
      "Build first prototype time",
    ],
    keywords: ["prototype", "phase", "timeline", "duration", "build"],
    answer:
      "Prototype phase duration depends on hardware and firmware complexity. Iterations and debugging often add to this time.",
    priority: 13,
  },

  {
    id: "timeline-testing-phase",
    category: "timelines",
    intent: "timeline",
    question: "How long does the testing phase take?",
    variations: [
      "How long does the testing phase take",
      "Testing phase duration",
      "Time for validation",
      "Testing stage timeline",
      "How long for tests",
    ],
    keywords: ["testing", "phase", "timeline", "duration", "validation"],
    answer:
      "Testing phase duration depends on required test types. Functional testing is quicker; environmental, reliability or compliance testing takes longer.",
    priority: 13,
  },

  {
    id: "timeline-final-phase",
    category: "timelines",
    intent: "timeline",
    question: "How long does the final build take?",
    variations: [
      "How long does the final build take",
      "Final build duration",
      "Time for finishing",
      "Production stage timeline",
      "Final project stage",
    ],
    keywords: ["final", "build", "timeline", "duration", "production"],
    answer:
      "Final build time depends on enclosure, assembly and finishing requirements. Small builds are faster; larger production runs take longer.",
    priority: 13,
  },

  {
    id: "timeline-prototype",
    category: "timelines",
    intent: "timeline",
    question: "How long does a prototype take?",
    variations: [
      "How long does a prototype take",
      "Prototype duration",
      "Time for a prototype",
      "How long for a working prototype",
      "Prototype timeline",
    ],
    keywords: ["prototype", "duration", "time", "working", "timeline"],
    answer:
      "Prototype duration depends on what needs to be proven and tested. A simple functional prototype can be quicker than a polished, production-ready design.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SUBSYSTEM DURATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-firmware",
    category: "timelines",
    intent: "timeline",
    question: "How long does firmware development take?",
    variations: [
      "How long does firmware development take",
      "Firmware timeline",
      "How long for code",
      "Embedded software duration",
      "Programming time",
    ],
    keywords: ["firmware", "code", "timeline", "development", "duration"],
    answer:
      "Firmware development time depends on required features, communication, user interface, testing and debugging. More complex logic and hardware bring longer timelines.",
    priority: 15,
  },

  {
    id: "timeline-pcb",
    category: "timelines",
    intent: "timeline",
    question: "How long does PCB design and manufacturing take?",
    variations: [
      "How long does PCB design and manufacturing take",
      "PCB timeline",
      "How long for PCB",
      "PCB design duration",
      "PCB manufacturing time",
    ],
    keywords: ["pcb", "design", "manufacturing", "timeline", "duration"],
    answer:
      "PCB design time depends on complexity. Fabrication and assembly add lead time, typically from days to weeks depending on the service and options.",
    priority: 13,
  },

  {
    id: "timeline-enclosure",
    category: "timelines",
    intent: "timeline",
    question: "Does enclosure design add to the timeline?",
    variations: [
      "Does enclosure design add to the timeline",
      "Enclosure timeline",
      "Time for case design",
      "Custom enclosure duration",
      "Housing adds time",
    ],
    keywords: ["enclosure", "case", "timeline", "design", "duration"],
    answer:
      "Yes. Enclosure design and fabrication add time, especially for custom sizes, IP rating, mounting, cutouts and finish requirements.",
    priority: 10,
  },

  {
    id: "timeline-production",
    category: "timelines",
    intent: "timeline",
    question: "How long does production take?",
    variations: [
      "How long does production take",
      "Production timeline",
      "Time for manufacturing",
      "How long to produce units",
      "Mass production duration",
    ],
    keywords: ["production", "manufacturing", "timeline", "units", "duration"],
    answer:
      "Production time depends on quantity, PCB fabrication and assembly, enclosure production, component lead times and testing. Higher quantities generally take longer.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DEPENDENCIES / COMPONENT LEAD TIME
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-component-availability",
    category: "timelines",
    intent: "timeline",
    question: "Does component availability affect the timeline?",
    variations: [
      "Does component availability affect the timeline",
      "Part availability timeline",
      "Component lead time",
      "What if parts are delayed",
      "Supply chain affects timeline",
    ],
    keywords: ["components", "availability", "lead", "timeline", "delay"],
    answer:
      "Yes. Long lead times, backorders or sourcing difficulties can extend the timeline. Confirming components early helps reduce the risk of delay.",
    priority: 15,
  },

  {
    id: "timeline-dependencies",
    category: "timelines",
    intent: "timeline",
    question: "What are project dependencies?",
    variations: [
      "What are project dependencies",
      "Project dependencies",
      "What must happen first",
      "Order of project tasks",
      "Task dependencies",
    ],
    keywords: ["dependencies", "order", "tasks", "project", "timeline"],
    answer:
      "Dependencies are tasks or items that must be completed or available before another can begin, such as components arriving before assembly.",
    priority: 10,
  },

  {
    id: "timeline-critical-path",
    category: "timelines",
    intent: "timeline",
    question: "What is the critical path in a project?",
    variations: [
      "What is the critical path in a project",
      "Critical path timeline",
      "Longest path project",
      "Critical path meaning",
      "What delays project",
    ],
    keywords: ["critical", "path", "timeline", "delay", "project"],
    answer:
      "The critical path is the sequence of tasks that determines the shortest possible project duration. Delays in the critical path delay the entire project.",
    priority: 10,
  },

  {
    id: "timeline-parallel",
    category: "timelines",
    intent: "timeline",
    question: "Can phases run in parallel?",
    variations: [
      "Can phases run in parallel",
      "Parallel tasks in project",
      "Run phases together",
      "Overlap project phases",
      "Concurrent development",
    ],
    keywords: ["parallel", "phases", "overlap", "concurrent", "timeline"],
    answer:
      "Some phases can run in parallel, such as firmware development with PCB fabrication. Dependencies and risks should be managed carefully.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // TESTING / VALIDATION / CERTIFICATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-testing",
    category: "timelines",
    intent: "timeline",
    question: "Does testing take part of the project time?",
    variations: [
      "Does testing take part of the project time",
      "Do you test projects",
      "Is testing included in development",
      "Why does hardware testing take time",
      "Does debugging affect the timeline",
    ],
    keywords: ["testing", "debugging", "development", "time", "hardware"],
    answer:
      "Yes. Hardware projects need testing and debugging in addition to writing code or assembling components. Real-world testing is important because wiring, power, sensors and physical components can behave differently from a simulation or first prototype.",
    priority: 13,
  },

  {
    id: "timeline-testing-validation",
    category: "timelines",
    intent: "timeline",
    question: "How long does testing and validation take?",
    variations: [
      "How long does testing and validation take",
      "Testing timeline",
      "Validation duration",
      "How long for testing",
      "Project validation time",
    ],
    keywords: ["testing", "validation", "timeline", "duration", "project"],
    answer:
      "Testing and validation time depends on project complexity. Functional, environmental and long-duration tests can add significant time.",
    priority: 13,
  },

  {
    id: "timeline-certification",
    category: "timelines",
    intent: "timeline",
    question: "Does certification affect the timeline?",
    variations: [
      "Does certification affect the timeline",
      "Certification timeline",
      "CE FCC testing duration",
      "Compliance timeline",
      "Certification adds time",
    ],
    keywords: [
      "certification",
      "timeline",
      "testing",
      "compliance",
      "duration",
    ],
    answer:
      "Yes. Certification and compliance testing can add weeks or more, depending on the standards, test lab availability and any required design changes.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DOCUMENTATION / DELIVERY
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-documentation",
    category: "timelines",
    intent: "timeline",
    question: "Does documentation add to the timeline?",
    variations: [
      "Does documentation add to the timeline",
      "Documentation timeline",
      "Time for documentation",
      "Reports add duration",
      "Documentation affects timeline",
    ],
    keywords: ["documentation", "timeline", "reports", "duration", "project"],
    answer:
      "Yes. Preparing schematics, source code comments, build instructions and user documentation takes time, especially for larger projects.",
    priority: 10,
  },

  {
    id: "timeline-documentation-timeline",
    category: "timelines",
    intent: "timeline",
    question: "When is documentation prepared?",
    variations: [
      "When is documentation prepared",
      "Documentation timing",
      "When is documentation done",
      "Documentation phase",
      "Reports during project",
    ],
    keywords: ["documentation", "timing", "phase", "project", "reports"],
    answer:
      "Documentation can be prepared throughout the project and finalized at the end. Early documentation supports testing and handover.",
    priority: 10,
  },

  {
    id: "timeline-delivery",
    category: "timelines",
    intent: "timeline",
    question: "Does delivery add to the timeline?",
    variations: [
      "Does delivery add to the timeline",
      "Delivery timeline",
      "Shipping time",
      "How long for delivery",
      "Delivery duration",
    ],
    keywords: ["delivery", "shipping", "timeline", "duration", "project"],
    answer:
      "Delivery or shipping time is separate from development time. It depends on the destination, carrier and any customs requirements.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MILESTONES / REVIEWS
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-milestones",
    category: "timelines",
    intent: "timeline",
    question: "Can the project be broken into milestones?",
    variations: [
      "Can the project be broken into milestones",
      "Milestones for project",
      "Stage-based development",
      "Phased project",
      "Project stages",
    ],
    keywords: ["milestones", "stages", "phases", "project", "timeline"],
    answer:
      "Yes. Larger projects can be divided into milestones such as design, prototype, testing and final build. This makes progress easier to track.",
    priority: 13,
  },

  {
    id: "timeline-phased",
    category: "timelines",
    intent: "timeline",
    question: "Can the project be delivered in phases?",
    variations: [
      "Can the project be delivered in phases",
      "Phased delivery",
      "Split project",
      "Deliver in parts",
      "Staged project delivery",
    ],
    keywords: ["phased", "delivery", "split", "parts", "staged"],
    answer:
      "Yes. Phased delivery allows partial results earlier and reduces risk. Scope, timeline and cost should be planned for each phase.",
    priority: 13,
  },

  {
    id: "timeline-mvp",
    category: "timelines",
    intent: "timeline",
    question: "What is an MVP in a project?",
    variations: [
      "What is an MVP in a project",
      "Minimum viable product",
      "MVP project",
      "MVP development",
      "First usable version",
    ],
    keywords: ["mvp", "minimum", "viable", "product", "project"],
    answer:
      "An MVP is the simplest version that delivers the core functionality. It allows early testing and feedback before adding more features.",
    priority: 13,
  },

  {
    id: "timeline-quick-win",
    category: "timelines",
    intent: "timeline",
    question: "Can I start with a quick version and improve later?",
    variations: [
      "Can I start with a quick version and improve later",
      "MVP project timeline",
      "Start small project",
      "Minimal version first",
      "Phased approach",
    ],
    keywords: ["quick", "version", "improve", "mvp", "phased"],
    answer:
      "Yes. Starting with a minimal version allows earlier testing and feedback. Improvements can be added in later phases.",
    priority: 13,
  },

  {
    id: "timeline-review",
    category: "timelines",
    intent: "timeline",
    question: "Are there review points in the project?",
    variations: [
      "Are there review points in the project",
      "Project reviews",
      "Review checkpoints",
      "Milestone reviews",
      "Design review timing",
    ],
    keywords: ["review", "checkpoints", "milestones", "project", "timeline"],
    answer:
      "Yes. Review points such as design review, prototype testing and final inspection help ensure quality and alignment with requirements.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // UPDATES / PROGRESS
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-weekly-update",
    category: "timelines",
    intent: "timeline",
    question: "Can I get regular progress updates?",
    variations: [
      "Can I get regular progress updates",
      "Weekly project update",
      "Progress report",
      "Project status update",
      "How often updates",
    ],
    keywords: ["progress", "update", "regular", "report", "status"],
    answer:
      "Update frequency depends on the project agreement. Contact MECTEC to discuss how progress will be communicated.",
    priority: 13,
  },

  {
    id: "timeline-status-check",
    category: "timelines",
    intent: "timeline",
    question: "How do I check project status?",
    variations: [
      "How do I check project status",
      "Project status",
      "How is my project going",
      "Check progress",
      "Update on my request",
    ],
    keywords: ["status", "progress", "check", "update", "project"],
    answer:
      "Use the contact options to request a status update. Providing the project reference speeds up the process.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DELAYS / REVISIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-delay",
    category: "timelines",
    intent: "timeline",
    question: "What should I do if the project is delayed?",
    variations: [
      "What should I do if the project is delayed",
      "Project delayed",
      "Why is my project late",
      "Delay in timeline",
      "Project not on time",
    ],
    keywords: ["delay", "late", "timeline", "project", "on time"],
    answer:
      "Contact MECTEC to understand the cause and revised timeline. Delays can come from components, testing, revisions or scheduling.",
    priority: 13,
  },

  {
    id: "timeline-delay-cause",
    category: "timelines",
    intent: "timeline",
    question: "What are common causes of project delays?",
    variations: [
      "What are common causes of project delays",
      "Why projects are delayed",
      "Common delay causes",
      "What slows a project",
      "Delay reasons",
    ],
    keywords: ["delay", "causes", "project", "timeline", "common"],
    answer:
      "Common causes include component lead times, design changes, testing issues, debugging, certification and workload. Early planning reduces risk.",
    priority: 13,
  },

  {
    id: "timeline-revisions",
    category: "timelines",
    intent: "timeline",
    question: "Do revisions add to the timeline?",
    variations: [
      "Do revisions add to the timeline",
      "Revision time",
      "Changes add duration",
      "How long for revisions",
      "Extra iterations time",
    ],
    keywords: ["revisions", "changes", "timeline", "duration", "iterations"],
    answer:
      "Yes. Revisions add time because they require redesign, retesting or reassembly. Good initial requirements reduce the number of revisions.",
    priority: 13,
  },

  {
    id: "timeline-scope-change",
    category: "timelines",
    intent: "timeline",
    question: "Does scope change affect the timeline?",
    variations: [
      "Does scope change affect the timeline",
      "Scope change timeline",
      "Adding features time",
      "Changes affect duration",
      "Timeline impact of change",
    ],
    keywords: ["scope", "change", "timeline", "duration", "affect"],
    answer:
      "Yes. Adding features or changing requirements affects both timeline and cost. Changes should be discussed as early as possible.",
    priority: 13,
  },

  {
    id: "timeline-iteration",
    category: "timelines",
    intent: "timeline",
    question: "How many iterations are typically needed?",
    variations: [
      "How many iterations are typically needed",
      "Project iterations",
      "How many prototypes",
      "Iteration count",
      "Revisions needed",
    ],
    keywords: ["iterations", "prototypes", "revisions", "count", "project"],
    answer:
      "Iteration count depends on complexity and testing results. Simple projects may need one or two; complex ones may require more.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PLANNING / BUFFER / COMMUNICATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "timeline-buffer",
    category: "timelines",
    intent: "timeline",
    question: "Should I allow extra time?",
    variations: [
      "Should I allow extra time",
      "Project buffer",
      "Contingency time",
      "Extra time for project",
      "Add buffer to timeline",
    ],
    keywords: ["buffer", "extra", "contingency", "timeline", "project"],
    answer:
      "Yes. Adding buffer helps absorb delays from components, revisions, testing or unexpected issues. It makes the timeline more realistic.",
    priority: 13,
  },

  {
    id: "timeline-communication",
    category: "timelines",
    intent: "timeline",
    question: "How can communication help the timeline?",
    variations: [
      "How can communication help the timeline",
      "Communication project timeline",
      "Faster with communication",
      "Why updates matter",
      "Keep project on track",
    ],
    keywords: ["communication", "timeline", "updates", "project", "track"],
    answer:
      "Regular communication helps identify issues early, clarifies requirements and reduces delays caused by misunderstandings.",
    priority: 13,
  },

  {
    id: "timeline-commitment",
    category: "timelines",
    intent: "timeline",
    question: "Do you guarantee a deadline?",
    variations: [
      "Do you guarantee a deadline",
      "Deadline guarantee",
      "Can you commit to a date",
      "Timeline promise",
      "Delivery guarantee",
    ],
    keywords: ["deadline", "guarantee", "commit", "timeline", "delivery"],
    answer:
      "Deadline commitments depend on the project and agreement. Contact MECTEC to discuss realistic timelines for your specific project.",
    priority: 13,
  },

  {
    id: "timeline-planning",
    category: "timelines",
    intent: "timeline",
    question: "How should I plan my project timeline?",
    variations: [
      "How should I plan my project timeline",
      "Timeline planning",
      "How to plan project time",
      "Timeline tips",
      "Project schedule planning",
    ],
    keywords: ["planning", "timeline", "project", "schedule", "tips"],
    answer:
      "Define requirements clearly, allow buffer, confirm component lead times and consider testing and certification. Review with MECTEC to align expectations.",
    priority: 15,
  },

  {
    id: "timeline-research",
    category: "timelines",
    intent: "timeline",
    question: "How long does research and feasibility take?",
    variations: [
      "How long does research and feasibility take",
      "Feasibility study time",
      "Research timeline",
      "How long to check feasibility",
      "Project research duration",
    ],
    keywords: ["research", "feasibility", "timeline", "duration", "study"],
    answer:
      "Research and feasibility time depends on the novelty of the project. Complex or experimental ideas may require more investigation before implementation.",
    priority: 10,
  },

  {
    id: "timeline-best-practices",
    category: "timelines",
    intent: "timeline",
    question: "What are best practices for managing project timelines?",
    variations: [
      "What are best practices for managing project timelines",
      "Timeline best practices",
      "How to manage project time",
      "Timeline tips",
      "Project schedule best practices",
    ],
    keywords: ["best", "practices", "timeline", "manage", "schedule"],
    answer:
      "Define scope clearly, plan phases with dependencies, allow buffer, confirm components early, communicate often and review progress regularly.",
    priority: 15,
  },
];
