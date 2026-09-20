export const AUTOMATION_HELP = [
  {
    id: "automation-what-is",
    category: "automation",
    question: "What is automation?",
    variations: [
      "Explain automation",
      "What does an automated system do",
      "What is electronics automation",
      "How does automation work",
    ],
    keywords: ["automation", "automated", "control", "system"],
    answer:
      "Automation uses sensors, programmed logic and actuators or other outputs to perform tasks with reduced manual intervention. A controller evaluates conditions and determines when outputs should operate.",
    priority: 9,
  },

  {
    id: "automation-sensor-control",
    category: "automation",
    question: "Can sensors be used for automation?",
    variations: [
      "Can sensors trigger automation",
      "Can a sensor turn something on",
      "Can I automate based on temperature",
      "Can motion trigger a device",
    ],
    keywords: ["sensor", "automation", "trigger", "temperature", "motion"],
    answer:
      "Yes. A controller can read sensor conditions and use programmed rules to activate outputs such as relays, motors, lights, alarms or communication functions.",
    priority: 9,
  },

  {
    id: "automation-relay",
    category: "automation",
    question: "Can a microcontroller control appliances with a relay?",
    variations: [
      "Can Arduino control a relay",
      "Can ESP32 switch a device",
      "Can I automate an appliance",
      "Can a relay control a load",
    ],
    keywords: ["relay", "arduino", "esp32", "appliance", "load"],
    answer:
      "A microcontroller can control an appropriately rated relay module, which can then switch a separate load. Mains-voltage work requires appropriate isolation, enclosure, ratings and electrical safety practices.",
    priority: 10,
  },

  {
    id: "automation-feedback",
    category: "automation",
    question: "What is feedback in an automated system?",
    variations: [
      "What is closed loop control",
      "What is feedback control",
      "Open loop vs closed loop",
      "Why use feedback sensors",
    ],
    keywords: ["feedback", "closed", "loop", "control", "sensor"],
    answer:
      "Feedback means measuring the actual result of a system and using that information to adjust its behavior. Closed-loop systems use feedback, while open-loop systems operate without measuring the result.",
    priority: 9,
  },

  {
    id: "automation-state-machine",
    category: "automation",
    question: "What is a state machine?",
    variations: [
      "Why use state machines",
      "What is finite state machine",
      "How do I organize automation logic",
      "How can I handle multiple system states",
    ],
    keywords: ["state", "machine", "automation", "logic", "states"],
    answer:
      "A state machine organizes behavior into defined states and transitions. It is useful for embedded systems where behavior changes according to events, timers, sensor conditions or user actions.",
    priority: 9,
  },

  {
    id: "automation-safety",
    category: "automation",
    question: "Why are safety conditions important in automation?",
    variations: [
      "How do I make automation safe",
      "What are safety interlocks",
      "Why use emergency stop",
      "Can software alone make a system safe",
    ],
    keywords: ["safety", "automation", "interlock", "emergency", "software"],
    answer:
      "Automated systems should consider fault conditions, unexpected inputs and component failures. Depending on the application, safety may require hardware interlocks, fuses, physical isolation or dedicated safety mechanisms rather than relying only on software.",
    priority: 10,
  },
] as const;
