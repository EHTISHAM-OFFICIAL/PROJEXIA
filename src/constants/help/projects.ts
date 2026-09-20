import type { HelpEntry } from "./types";

export const PROJECT_HELP: HelpEntry[] = [
  {
    id: "project-types",
    category: "projects",
    question: "What kind of projects can MECTEC build?",
    variations: [
      "What projects does MECTEC make?",
      "What can MECTEC build?",
      "What type of electronics projects do you make?",
      "Can MECTEC build a custom electronics project?",
      "What systems can you develop?",
    ],
    keywords: [
      "projects",
      "custom project",
      "electronics",
      "system",
      "build",
      "develop",
    ],
    answer:
      "MECTEC can work on a wide range of electronics and embedded projects, including automation systems, sensor-based devices, RFID systems, microcontroller projects, IoT devices, motor-control systems, prototypes, PCB-based products, and custom hardware/software solutions. The exact approach depends on your requirements.",
  },
  {
    id: "custom-project",
    category: "projects",
    question: "Can MECTEC build a completely custom project?",
    variations: [
      "Can you make a custom electronics project?",
      "Can MECTEC build my own idea?",
      "I have an idea can you build it?",
      "Can you develop something from scratch?",
    ],
    keywords: ["custom", "idea", "scratch", "project", "prototype"],
    answer:
      "Yes. You can describe your idea, requirements, expected behavior, available components, budget range, and deadline. MECTEC can then evaluate the project and determine a suitable hardware, firmware, and implementation approach.",
  },
  {
    id: "idea-only",
    category: "projects",
    question: "I only have an idea. Can MECTEC help?",
    variations: [
      "I do not have a circuit yet",
      "I only have a project concept",
      "Can you turn my idea into a project?",
      "I have an idea but no design",
    ],
    keywords: ["idea", "concept", "design", "project", "circuit"],
    answer:
      "Yes. You can start with an idea or problem statement. The requirements can be refined into functions, components, wiring, firmware, and an implementation plan before development begins.",
  },
  {
    id: "existing-project",
    category: "projects",
    question: "Can MECTEC improve an existing project?",
    variations: [
      "Can you modify my existing project?",
      "Can you fix and improve my project?",
      "I already have a prototype",
      "Can MECTEC upgrade my circuit?",
    ],
    keywords: ["existing", "prototype", "modify", "upgrade", "improve", "fix"],
    answer:
      "Yes. Existing projects can be reviewed for hardware, wiring, firmware, performance, reliability, or feature improvements. Providing the current circuit, code, photos, symptoms, and desired changes makes evaluation easier.",
  },
  {
    id: "prototype",
    category: "projects",
    question: "Can MECTEC make prototypes?",
    variations: [
      "Do you build prototypes?",
      "Can you prototype an electronics idea?",
      "Can you make a working prototype?",
    ],
    keywords: ["prototype", "prototyping", "working model", "electronics"],
    answer:
      "Yes. Prototype development can involve component selection, breadboard or modular testing, firmware development, debugging, and preparation for a more permanent PCB-based design where appropriate.",
  },
  {
    id: "hardware-software",
    category: "projects",
    question: "Can MECTEC handle both hardware and software?",
    variations: [
      "Do you develop hardware and software?",
      "Can you make the circuit and code?",
      "Can MECTEC handle firmware too?",
    ],
    keywords: ["hardware", "software", "firmware", "code", "circuit"],
    answer:
      "Yes. A project can involve hardware design, wiring, microcontroller programming, firmware logic, sensor integration, communication interfaces, and supporting software depending on the requirements.",
  },
  {
    id: "student-project",
    category: "projects",
    question: "Does MECTEC work on university or educational projects?",
    variations: [
      "Can you make university projects?",
      "Do you help students?",
      "Can MECTEC build an FYP?",
      "Can you make an engineering project?",
    ],
    keywords: [
      "university",
      "student",
      "FYP",
      "educational",
      "engineering",
      "project",
    ],
    answer:
      "MECTEC can work on educational and engineering project requirements, including prototypes, embedded systems, automation, sensors, RFID, IoT, and other electronics-focused projects. Requirements should be provided before confirming feasibility.",
  },
  {
    id: "iot-project",
    category: "projects",
    question: "Can MECTEC build IoT projects?",
    variations: [
      "Do you make IoT systems?",
      "Can you create a WiFi project?",
      "Can you make an internet-connected device?",
    ],
    keywords: ["IoT", "internet", "WiFi", "ESP32", "connected device"],
    answer:
      "Yes. IoT projects can use platforms such as ESP32 and suitable communication protocols or cloud services. The design depends on whether the project requires remote monitoring, control, data logging, alerts, or other connected features.",
  },
  {
    id: "automation-project",
    category: "projects",
    question: "Can MECTEC build automation systems?",
    variations: [
      "Do you make automation projects?",
      "Can you automate a device?",
      "Can MECTEC build automatic control systems?",
    ],
    keywords: ["automation", "automatic", "control", "relay", "system"],
    answer:
      "Yes. Automation systems can include sensors, microcontrollers, relays, motor drivers, timers, displays, user controls, and feedback mechanisms depending on the application.",
  },
  {
    id: "project-requirements",
    category: "projects",
    question: "What information should I provide for a project?",
    variations: [
      "What details do you need for my project?",
      "What should I send when requesting a project?",
      "How do I explain my electronics project?",
    ],
    keywords: ["requirements", "details", "project", "information", "request"],
    answer:
      "Useful information includes the project goal, required features, expected inputs and outputs, preferred components if any, power source, approximate size, operating environment, deadline, budget range, and any existing circuit, code, schematic, or prototype.",
  },
  {
    id: "component-selection",
    category: "projects",
    question: "Can MECTEC select the components for my project?",
    variations: [
      "Can you choose components?",
      "Who decides which components to use?",
      "Can MECTEC recommend the right sensor or microcontroller?",
    ],
    keywords: [
      "components",
      "selection",
      "sensor",
      "microcontroller",
      "recommend",
    ],
    answer:
      "Yes. Component selection can be based on electrical requirements, accuracy, current consumption, communication interfaces, availability, cost, physical constraints, and the required reliability.",
  },
  {
    id: "sensor-project",
    category: "projects",
    question: "Can MECTEC build sensor-based projects?",
    variations: [
      "Do you work with sensors?",
      "Can you make a sensor system?",
      "Can MECTEC combine multiple sensors?",
    ],
    keywords: ["sensor", "sensors", "measurement", "monitoring"],
    answer:
      "Yes. Multiple sensors can be integrated into a single system. The appropriate sensor, interface, sampling method, calibration, filtering, and firmware logic depend on what needs to be measured.",
  },
  {
    id: "rfid-project",
    category: "projects",
    question: "Can MECTEC build RFID projects?",
    variations: [
      "Do you make RFID systems?",
      "Can you make RFID door locks?",
      "Can you build RFID attendance systems?",
    ],
    keywords: ["RFID", "door lock", "attendance", "reader", "tag"],
    answer:
      "Yes. RFID can be used for projects such as access-control prototypes, attendance systems, identification systems, and other applications where compatible RFID readers and tags are appropriate.",
  },
];
