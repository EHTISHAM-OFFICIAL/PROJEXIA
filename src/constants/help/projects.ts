import type { HelpEntry } from "./types";

export const PROJECT_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // FOUNDATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-types",
    category: "projects",
    intent: "capability",
    question: "What kind of projects can ProjexiaHub build?",
    variations: [
      "What kind of projects can ProjexiaHub build",
      "What projects does ProjexiaHub make",
      "What can ProjexiaHub build",
      "What type of electronics projects do you make",
      "Can ProjexiaHub build a custom electronics project",
      "What systems can you develop",
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
      "ProjexiaHub can work on a wide range of electronics and embedded projects, including automation systems, sensor-based devices, RFID systems, microcontroller projects, IoT devices, motor-control systems, prototypes, PCB-based products, and custom hardware/software solutions. The exact approach depends on your requirements.",
    priority: 14,
  },

  {
    id: "project-custom",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build a completely custom project?",
    variations: [
      "Can ProjexiaHub build a completely custom project",
      "Can you make a custom electronics project",
      "Can ProjexiaHub build my own idea",
      "I have an idea can you build it",
      "Can you develop something from scratch",
    ],
    keywords: ["custom", "idea", "scratch", "project", "prototype"],
    answer:
      "Yes. You can describe your idea, requirements, expected behavior, available components, budget range, and deadline. ProjexiaHub can then evaluate the project and determine a suitable hardware, firmware, and implementation approach.",
    priority: 15,
  },

  {
    id: "project-idea-only",
    category: "projects",
    intent: "capability",
    question: "I only have an idea. Can ProjexiaHub help?",
    variations: [
      "I only have an idea. Can ProjexiaHub help",
      "I do not have a circuit yet",
      "I only have a project concept",
      "Can you turn my idea into a project",
      "I have an idea but no design",
    ],
    keywords: ["idea", "concept", "design", "project", "circuit"],
    answer:
      "Yes. You can start with an idea or problem statement. The requirements can be refined into functions, components, wiring, firmware, and an implementation plan before development begins.",
    priority: 15,
  },

  {
    id: "project-existing",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub improve an existing project?",
    variations: [
      "Can ProjexiaHub improve an existing project",
      "Can you modify my existing project",
      "Can you fix and improve my project",
      "I already have a prototype",
      "Can ProjexiaHub upgrade my circuit",
    ],
    keywords: ["existing", "prototype", "modify", "upgrade", "improve", "fix"],
    answer:
      "Yes. Existing projects can be reviewed for hardware, wiring, firmware, performance, reliability, or feature improvements. Providing the current circuit, code, photos, symptoms, and desired changes makes evaluation easier.",
    priority: 13,
  },

  {
    id: "project-prototype",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub make prototypes?",
    variations: [
      "Can ProjexiaHub make prototypes",
      "Do you build prototypes",
      "Can you prototype an electronics idea",
      "Can you make a working prototype",
    ],
    keywords: ["prototype", "prototyping", "working model", "electronics"],
    answer:
      "Yes. Prototype development can involve component selection, breadboard or modular testing, firmware development, debugging, and preparation for a more permanent PCB-based design where appropriate.",
    priority: 13,
  },

  {
    id: "project-hardware-software",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub handle both hardware and software?",
    variations: [
      "Can ProjexiaHub handle both hardware and software",
      "Do you develop hardware and software",
      "Can you make the circuit and code",
      "Can ProjexiaHub handle firmware too",
    ],
    keywords: ["hardware", "software", "firmware", "code", "circuit"],
    answer:
      "Yes. A project can involve hardware design, wiring, microcontroller programming, firmware logic, sensor integration, communication interfaces, and supporting software depending on the requirements.",
    priority: 13,
  },

  {
    id: "project-purpose",
    category: "projects",
    intent: "purpose",
    question: "What does ProjexiaHub do for projects?",
    variations: [
      "What does ProjexiaHub do for projects",
      "What does ProjexiaHub provide",
      "What is ProjexiaHub's role in a project",
      "What do you handle in a project",
      "What is included in a project",
      "ProjexiaHub project scope",
    ],
    keywords: ["mectec", "project", "scope", "provide", "role"],
    answer:
      "For a typical project, ProjexiaHub can handle design, component selection, prototyping, firmware development, testing, documentation, and handover. The exact scope depends on the project and is defined during planning.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // CATEGORIES / PROJECT TYPES
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-arduino",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build Arduino projects?",
    variations: [
      "Can ProjexiaHub build Arduino projects",
      "Do you make Arduino projects",
      "Can you program Arduino",
      "Can ProjexiaHub build a microcontroller project",
    ],
    keywords: ["arduino", "project", "microcontroller", "embedded", "code"],
    answer:
      "Yes. Arduino-based projects can include sensor reading, actuator control, communication, automation logic, displays, and other embedded applications.",
    priority: 13,
  },

  {
    id: "project-esp32",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build ESP32 projects?",
    variations: [
      "Can ProjexiaHub build ESP32 projects",
      "Do you make ESP32 projects",
      "Can you build a WiFi project with ESP32",
      "Can ProjexiaHub program ESP32",
    ],
    keywords: ["esp32", "project", "wifi", "bluetooth", "iot"],
    answer:
      "Yes. ESP32 projects can include GPIO control, sensors, displays, Wi-Fi, Bluetooth, web interfaces, IoT communication, and automation.",
    priority: 13,
  },

  {
    id: "project-raspberry-pi",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build Raspberry Pi projects?",
    variations: [
      "Can ProjexiaHub build Raspberry Pi projects",
      "Do you work with Raspberry Pi",
      "Can you build a Pi project",
      "Can ProjexiaHub program Raspberry Pi",
    ],
    keywords: ["raspberry", "pi", "project", "linux", "computer"],
    answer:
      "Yes. Raspberry Pi and similar single-board computers can be used when a project needs more computing power, networking, or a full operating system.",
    priority: 13,
  },

  {
    id: "project-iot",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build IoT projects?",
    variations: [
      "Can ProjexiaHub build IoT projects",
      "Do you make IoT systems",
      "Can you create a WiFi project",
      "Can you make an internet-connected device",
    ],
    keywords: ["IoT", "internet", "WiFi", "ESP32", "connected device"],
    answer:
      "Yes. IoT projects can use platforms such as ESP32 and suitable communication protocols or cloud services. The design depends on whether the project requires remote monitoring, control, data logging, alerts, or other connected features.",
    priority: 13,
  },

  {
    id: "project-automation",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build automation systems?",
    variations: [
      "Can ProjexiaHub build automation systems",
      "Do you make automation projects",
      "Can you automate a device",
      "Can ProjexiaHub build automatic control systems",
    ],
    keywords: ["automation", "automatic", "control", "relay", "system"],
    answer:
      "Yes. Automation systems can include sensors, microcontrollers, relays, motor drivers, timers, displays, user controls, and feedback mechanisms depending on the application.",
    priority: 13,
  },

  {
    id: "project-sensor",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build sensor-based projects?",
    variations: [
      "Can ProjexiaHub build sensor-based projects",
      "Do you work with sensors",
      "Can you make a sensor system",
      "Can ProjexiaHub combine multiple sensors",
    ],
    keywords: ["sensor", "sensors", "measurement", "monitoring"],
    answer:
      "Yes. Multiple sensors can be integrated into a single system. The appropriate sensor, interface, sampling method, calibration, filtering, and firmware logic depend on what needs to be measured.",
    priority: 13,
  },

  {
    id: "project-rfid",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build RFID projects?",
    variations: [
      "Can ProjexiaHub build RFID projects",
      "Do you make RFID systems",
      "Can you make RFID door locks",
      "Can you build RFID attendance systems",
    ],
    keywords: ["RFID", "door lock", "attendance", "reader", "tag"],
    answer:
      "Yes. RFID can be used for projects such as access-control prototypes, attendance systems, identification systems, and other applications where compatible RFID readers and tags are appropriate.",
    priority: 13,
  },

  {
    id: "project-pcb",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub design a PCB for my project?",
    variations: [
      "Can ProjexiaHub design a PCB for my project",
      "Can you make a PCB",
      "Do you design circuit boards",
      "Can ProjexiaHub convert my circuit into a PCB",
    ],
    keywords: ["pcb", "design", "circuit", "board", "layout"],
    answer:
      "Yes. PCB design can be part of a project when a permanent or compact circuit is required. The process starts with a verified schematic and continues with layout, design-rule checks, and manufacturing files.",
    priority: 13,
  },

  {
    id: "project-firmware",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub write firmware for my project?",
    variations: [
      "Can ProjexiaHub write firmware for my project",
      "Do you write firmware",
      "Can you program my device",
      "Can ProjexiaHub develop embedded software",
    ],
    keywords: ["firmware", "code", "program", "embedded", "software"],
    answer:
      "Yes. Firmware can be developed for microcontrollers such as Arduino, ESP32, STM32 and others, covering sensor reading, control logic, communication, displays, and other functions.",
    priority: 13,
  },

  {
    id: "project-robotics",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build robotics projects?",
    variations: [
      "Can ProjexiaHub build robotics projects",
      "Do you make robots",
      "Can you build a robot",
      "Robotics project",
    ],
    keywords: ["robotics", "robot", "automation", "control", "motor"],
    answer:
      "Yes. Robotics projects can involve microcontrollers, motor drivers, sensors, feedback, and communication. The approach depends on the required behavior and environment.",
    priority: 13,
  },

  {
    id: "project-drone",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build drone projects?",
    variations: [
      "Can ProjexiaHub build drone projects",
      "Do you make drones",
      "Can you build a UAV",
      "Can you work on flight controllers",
    ],
    keywords: ["drone", "uav", "flight", "controller", "robotics"],
    answer:
      "Drone and UAV projects involve flight controllers, sensors, communication, and power systems. Feasibility depends on the specific requirements and regulatory considerations.",
    priority: 10,
  },

  {
    id: "project-smart-home",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build smart home projects?",
    variations: [
      "Can ProjexiaHub build smart home projects",
      "Do you make smart home devices",
      "Can you automate my home",
      "Smart home project",
    ],
    keywords: ["smart", "home", "automation", "iot", "devices"],
    answer:
      "Yes. Smart home projects can include lighting, sensors, appliances, security, and connected control using Wi-Fi, Bluetooth, Zigbee, or other technologies.",
    priority: 13,
  },

  {
    id: "project-industrial",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build industrial projects?",
    variations: [
      "Can ProjexiaHub build industrial projects",
      "Do you work on industrial systems",
      "Industrial automation project",
      "Can you build industrial controllers",
    ],
    keywords: ["industrial", "automation", "factory", "control", "plc"],
    answer:
      "Industrial projects can involve PLCs, industrial communication, sensors, motor control, and robust enclosures. Requirements and safety standards should be discussed.",
    priority: 10,
  },

  {
    id: "project-medical",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build medical projects?",
    variations: [
      "Can ProjexiaHub build medical projects",
      "Do you make medical devices",
      "Medical electronics project",
      "Can you build medical equipment",
    ],
    keywords: ["medical", "healthcare", "device", "electronics", "safety"],
    answer:
      "Medical and healthcare-related electronics may involve additional regulatory, safety, and reliability requirements. Discuss the specific application with ProjexiaHub.",
    priority: 9,
  },

  {
    id: "project-automotive",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build automotive projects?",
    variations: [
      "Can ProjexiaHub build automotive projects",
      "Do you work on automotive electronics",
      "Car electronics project",
      "Can you build vehicle systems",
    ],
    keywords: ["automotive", "car", "vehicle", "electronics", "control"],
    answer:
      "Automotive projects may involve specific voltage ranges, communication protocols, environmental requirements, and safety standards. Discuss the specific application with ProjexiaHub.",
    priority: 9,
  },

  {
    id: "project-agriculture",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build agriculture projects?",
    variations: [
      "Can ProjexiaHub build agriculture projects",
      "Do you make agriculture systems",
      "Smart farming project",
      "Irrigation automation",
    ],
    keywords: ["agriculture", "farming", "irrigation", "iot", "automation"],
    answer:
      "Agriculture projects can include sensors, irrigation control, monitoring, and automation. The approach depends on the environment, power availability, and required reliability.",
    priority: 10,
  },

  {
    id: "project-security",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build security projects?",
    variations: [
      "Can ProjexiaHub build security projects",
      "Do you make security systems",
      "Alarm system project",
      "Access control system",
    ],
    keywords: ["security", "alarm", "access", "control", "system"],
    answer:
      "Security projects can include alarms, access control, sensors, cameras, and communication. The design should consider reliability, tamper resistance, and power backup.",
    priority: 13,
  },

  {
    id: "project-monitoring",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build monitoring systems?",
    variations: [
      "Can ProjexiaHub build monitoring systems",
      "Do you make monitoring devices",
      "Remote monitoring project",
      "Sensor monitoring system",
    ],
    keywords: ["monitoring", "remote", "sensor", "logging", "system"],
    answer:
      "Monitoring systems can measure temperature, humidity, pressure, motion, current, and other values. Data can be logged locally or transmitted for remote access.",
    priority: 13,
  },

  {
    id: "project-control",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build control systems?",
    variations: [
      "Can ProjexiaHub build control systems",
      "Do you make control systems",
      "Process control project",
      "Closed loop control",
    ],
    keywords: ["control", "system", "closed", "loop", "controller"],
    answer:
      "Control systems can use sensors, microcontrollers, and actuators to regulate temperature, speed, position, flow, or other variables. The control strategy depends on the application.",
    priority: 13,
  },

  {
    id: "project-data-logging",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build data logging systems?",
    variations: [
      "Can ProjexiaHub build data logging systems",
      "Do you make data loggers",
      "Sensor data logging project",
      "Data acquisition system",
    ],
    keywords: ["data", "logging", "logger", "record", "acquisition"],
    answer:
      "Data logging systems can record sensor values to SD card, flash, EEPROM, or a network service. Timestamps, storage capacity, and power requirements should be considered.",
    priority: 13,
  },

  {
    id: "project-display",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub add a display to my project?",
    variations: [
      "Can ProjexiaHub add a display to my project",
      "Can you add a screen",
      "Display for my project",
      "Can you use an LCD or OLED",
    ],
    keywords: ["display", "screen", "lcd", "oled", "interface"],
    answer:
      "Yes. Displays can be added for status, data, menus, or user interaction. The choice depends on size, readability, interface, and power requirements.",
    priority: 10,
  },

  {
    id: "project-user-interface",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub design a user interface?",
    variations: [
      "Can ProjexiaHub design a user interface",
      "Can you make a user interface",
      "Buttons and display design",
      "How will I control the system",
    ],
    keywords: ["user", "interface", "buttons", "display", "control"],
    answer:
      "Yes. User interfaces can include buttons, switches, displays, touch, mobile apps, or web interfaces depending on the project and user requirements.",
    priority: 10,
  },

  {
    id: "project-mobile-app",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build a mobile app?",
    variations: [
      "Can ProjexiaHub build a mobile app",
      "Can you make an app",
      "Mobile app for device",
      "Phone control app",
    ],
    keywords: ["mobile", "app", "android", "ios", "control"],
    answer:
      "Mobile app development depends on the project scope. Some projects can use existing apps or web interfaces; others may need a custom app. Discuss requirements with ProjexiaHub.",
    priority: 10,
  },

  {
    id: "project-web-dashboard",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build a web dashboard?",
    variations: [
      "Can ProjexiaHub build a web dashboard",
      "Can you make a web interface",
      "Dashboard for my device",
      "Web control panel",
    ],
    keywords: ["web", "dashboard", "interface", "monitoring", "control"],
    answer:
      "Web interfaces and dashboards can be added for monitoring and control. The approach depends on the device capability, connectivity, and required features.",
    priority: 10,
  },

  {
    id: "project-cloud",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub connect my project to the cloud?",
    variations: [
      "Can ProjexiaHub connect my project to the cloud",
      "Can you use cloud services",
      "Cloud connected device",
      "IoT cloud platform",
    ],
    keywords: ["cloud", "iot", "connected", "data", "platform"],
    answer:
      "Cloud connectivity can be added for remote monitoring, control, data storage, or analytics. The platform and protocol depend on the project requirements.",
    priority: 13,
  },

  {
    id: "project-student",
    category: "projects",
    intent: "capability",
    question: "Does ProjexiaHub work on university or educational projects?",
    variations: [
      "Does ProjexiaHub work on university or educational projects",
      "Can you make university projects",
      "Do you help students",
      "Can ProjexiaHub build an FYP",
    ],
    keywords: ["university", "student", "FYP", "educational", "engineering"],
    answer:
      "ProjexiaHub can work on educational and engineering project requirements, including prototypes, embedded systems, automation, sensors, RFID, IoT, and other electronics-focused projects. Requirements should be provided before confirming feasibility.",
    priority: 13,
  },

  {
    id: "project-competition",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub build competition projects?",
    variations: [
      "Can ProjexiaHub build competition projects",
      "Competition project",
      "Hackathon project",
      "Science fair project",
    ],
    keywords: ["competition", "hackathon", "science", "fair", "robotics"],
    answer:
      "Competition and educational projects can be supported. Provide the competition requirements and deadline when submitting the project request.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // REQUIREMENTS / SCOPING
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-requirements",
    category: "projects",
    intent: "project_requirements",
    question: "What information should I provide for a project?",
    variations: [
      "What information should I provide for a project",
      "What details do you need for my project",
      "What should I send when requesting a project",
      "How do I explain my electronics project",
    ],
    keywords: ["requirements", "details", "project", "information", "request"],
    answer:
      "Useful information includes the project goal, required features, expected inputs and outputs, preferred components if any, power source, approximate size, operating environment, deadline, budget range, and any existing circuit, code, schematic, or prototype.",
    priority: 15,
  },

  {
    id: "project-scope",
    category: "projects",
    intent: "project_requirements",
    question: "How is the project scope decided?",
    variations: [
      "How is the project scope decided",
      "How do you decide what will be built",
      "Project scoping process",
      "How is scope defined",
      "How do you plan a project",
      "Project scoping",
    ],
    keywords: ["scope", "project", "planning", "decide", "requirements"],
    answer:
      "Scope is decided by reviewing your requirements together with practical constraints such as time, budget, and available components. The agreed scope is then used to plan design, development, and testing.",
    priority: 13,
  },

  {
    id: "project-features",
    category: "projects",
    intent: "project_requirements",
    question: "How do I choose which features to include?",
    variations: [
      "How do I choose which features to include",
      "How to decide project features",
      "Feature selection project",
      "Must have vs nice to have",
      "Feature priorities",
      "Choosing features",
    ],
    keywords: ["features", "priorities", "project", "include", "scope"],
    answer:
      "List the must-have features first and separate them from nice-to-have features. Prioritizing the core functions helps control cost and timeline, and additional features can be added later if needed.",
    priority: 13,
  },

  {
    id: "project-component-selection",
    category: "projects",
    intent: "procedure",
    question: "Can ProjexiaHub select the components for my project?",
    variations: [
      "Can ProjexiaHub select the components for my project",
      "Can you choose components",
      "Who decides which components to use",
      "Can ProjexiaHub recommend the right sensor or microcontroller",
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
    priority: 13,
  },

  {
    id: "project-existing-code",
    category: "projects",
    intent: "compatibility",
    question: "Can I provide my existing code or design?",
    variations: [
      "Can I provide my existing code or design",
      "I already have code",
      "Can you use my existing circuit",
      "I have existing hardware",
      "Can you build on my existing work",
      "Providing existing work",
    ],
    keywords: ["existing", "code", "design", "circuit", "hardware"],
    answer:
      "Yes. Existing code, circuit diagrams, or prototypes can be reviewed and, where practical, used or adapted. Providing these materials helps ProjexiaHub understand the starting point.",
    priority: 13,
  },

  {
    id: "project-constraints",
    category: "projects",
    intent: "project_requirements",
    question: "Should I mention my constraints?",
    variations: [
      "Should I mention my constraints",
      "Project constraints",
      "Limitations to consider",
      "Restrictions for project",
      "Constraints I have",
      "Project limitations",
    ],
    keywords: [
      "constraints",
      "limitations",
      "restrictions",
      "project",
      "consider",
    ],
    answer:
      "Yes. Budget, timeline, size, power and environment are common constraints. Mentioning them helps the design fit your situation.",
    priority: 13,
  },

  {
    id: "project-size-constraint",
    category: "projects",
    intent: "project_requirements",
    question: "Should I specify the physical size of the project?",
    variations: [
      "Should I specify the physical size of the project",
      "Size requirements",
      "Dimensions of project",
      "How big should it be",
      "Space constraints",
      "Physical size of project",
    ],
    keywords: ["size", "dimensions", "space", "physical", "constraints"],
    answer:
      "Yes. Physical size and mounting constraints affect component and enclosure selection.",
    priority: 10,
  },

  {
    id: "project-quantity",
    category: "projects",
    intent: "project_requirements",
    question: "Should I state how many units I need?",
    variations: [
      "Should I state how many units I need",
      "Quantity required",
      "How many devices",
      "One or many",
      "Production quantity",
      "Project quantity",
    ],
    keywords: ["quantity", "units", "many", "one", "production"],
    answer:
      "Yes. Stating whether you need a single prototype or multiple units helps with planning and cost estimation.",
    priority: 13,
  },

  {
    id: "project-environment",
    category: "projects",
    intent: "project_requirements",
    question: "Should I describe the operating environment?",
    variations: [
      "Should I describe the operating environment",
      "Where will project be used",
      "Environment requirements",
      "Indoor or outdoor",
      "Operating conditions",
      "Operating environment",
    ],
    keywords: ["environment", "operating", "indoor", "outdoor", "conditions"],
    answer:
      "Yes. Environment affects enclosure, temperature, IP rating and component selection. Describe where the project will be used.",
    priority: 13,
  },

  {
    id: "project-power-source",
    category: "projects",
    intent: "project_requirements",
    question: "Should I mention the power source?",
    variations: [
      "Should I mention the power source",
      "Mains or battery",
      "Power requirements",
      "How will project be powered",
      "Power source for project",
      "Project power source",
    ],
    keywords: ["power", "source", "battery", "mains", "requirements"],
    answer:
      "Yes. Specifying whether the project will run from mains, battery, USB, solar or another source affects the design.",
    priority: 13,
  },

  {
    id: "project-wireless",
    category: "projects",
    intent: "project_requirements",
    question: "Should I specify wireless or network requirements?",
    variations: [
      "Should I specify wireless or network requirements",
      "WiFi Bluetooth needed",
      "Wireless requirement",
      "Communication needs",
      "Network connectivity",
      "Wireless requirements",
    ],
    keywords: ["wireless", "wifi", "bluetooth", "communication", "network"],
    answer:
      "Yes. Mentioning whether the project needs Wi-Fi, Bluetooth, cellular, LoRa, or other connectivity affects the design.",
    priority: 13,
  },

  {
    id: "project-use-case",
    category: "projects",
    intent: "project_requirements",
    question: "Should I describe the use case?",
    variations: [
      "Should I describe the use case",
      "Describe how project will be used",
      "Use case description",
      "Where project will be used",
      "Explain application",
      "Project use case",
    ],
    keywords: ["use", "case", "application", "describe", "project"],
    answer:
      "Yes. Describing how the project will be used and the environment helps ensure the design matches real conditions.",
    priority: 13,
  },

  {
    id: "project-inputs-outputs",
    category: "projects",
    intent: "project_requirements",
    question: "Should I list inputs and outputs?",
    variations: [
      "Should I list inputs and outputs",
      "List inputs outputs",
      "What does project connect to",
      "Sensors and actuators list",
      "Describe inputs outputs",
      "Project inputs and outputs",
    ],
    keywords: ["inputs", "outputs", "sensors", "actuators", "connect"],
    answer:
      "Yes. Listing expected inputs (sensors, buttons, communication) and outputs (motors, relays, displays) helps define the design.",
    priority: 13,
  },

  {
    id: "project-references",
    category: "projects",
    intent: "project_requirements",
    question: "Can I include reference designs or examples?",
    variations: [
      "Can I include reference designs or examples",
      "Reference project",
      "Similar existing device",
      "Example design",
      "Links to references",
      "Project references",
    ],
    keywords: ["reference", "example", "similar", "design", "links"],
    answer:
      "Yes. Reference designs, similar products or examples can clarify expectations, though they do not guarantee identical results.",
    priority: 10,
  },

  {
    id: "project-photos",
    category: "projects",
    intent: "project_requirements",
    question: "Should I include photos of my existing project?",
    variations: [
      "Should I include photos of my existing project",
      "Send photos of hardware",
      "Upload pictures of prototype",
      "Include images in request",
      "Photos of circuit",
      "Photos of project",
    ],
    keywords: ["photos", "images", "hardware", "prototype", "circuit"],
    answer:
      "Yes. Photos of existing hardware, wiring, or prototype can clarify the current state and help identify what is needed.",
    priority: 10,
  },

  {
    id: "project-standards",
    category: "projects",
    intent: "project_requirements",
    question: "Should I mention standards or certifications?",
    variations: [
      "Should I mention standards or certifications",
      "Compliance requirements",
      "CE FCC needed",
      "Standards for project",
      "Certification needs",
      "Project standards and certifications",
    ],
    keywords: ["standards", "certification", "compliance", "ce", "fcc"],
    answer:
      "Yes. Mentioning any required standards or certifications helps ensure the design and process meet them.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DEVELOPMENT / DELIVERY
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-development",
    category: "projects",
    intent: "procedure",
    question: "How is a project developed?",
    variations: [
      "How is a project developed",
      "Project development process",
      "How does ProjexiaHub build a project",
      "What are the project phases",
      "Development workflow",
      "Project workflow",
    ],
    keywords: ["development", "project", "process", "workflow", "phases"],
    answer:
      "Typical phases include requirements clarification, design, prototyping, firmware development, testing, and handover. Larger projects may be split into milestones so progress can be tracked.",
    priority: 15,
  },

  {
    id: "project-prototype-phase",
    category: "projects",
    intent: "procedure",
    question: "What happens during the prototype phase?",
    variations: [
      "What happens during the prototype phase",
      "Prototype phase",
      "Prototyping stage",
      "Project prototyping",
      "How is the prototype built",
      "Prototype stage",
    ],
    keywords: ["prototype", "phase", "stage", "build", "testing"],
    answer:
      "The prototype phase tests the basic idea with real hardware and firmware. It usually reveals issues that are corrected before the final build or PCB design.",
    priority: 13,
  },

  {
    id: "project-testing",
    category: "projects",
    intent: "procedure",
    question: "How is a project tested?",
    variations: [
      "How is a project tested",
      "Project testing process",
      "What tests are done",
      "Testing during development",
      "How do you verify the project",
      "Project testing",
    ],
    keywords: ["testing", "project", "verify", "development", "process"],
    answer:
      "Testing includes bench verification of each subsystem, integration tests of the full system, and tests under realistic operating conditions. Issues found during testing are corrected before delivery.",
    priority: 15,
  },

  {
    id: "project-deliverables",
    category: "projects",
    intent: "project_requirements",
    question: "What deliverables are provided?",
    variations: [
      "What deliverables are provided",
      "What do I receive",
      "Project deliverables",
      "What is included at handover",
      "Deliverables for a project",
      "Project deliverables",
    ],
    keywords: ["deliverables", "project", "receive", "handover", "included"],
    answer:
      "Deliverables depend on the project and can include the working prototype or device, schematics, source code, firmware, documentation, and any agreed manufacturing files.",
    priority: 15,
  },

  {
    id: "project-handover",
    category: "projects",
    intent: "procedure",
    question: "What happens at project handover?",
    variations: [
      "What happens at project handover",
      "Project handover",
      "How is the project delivered",
      "Handover process",
      "What is included in handover",
      "Handover stage",
    ],
    keywords: ["handover", "project", "delivery", "documentation", "transfer"],
    answer:
      "Handover typically includes delivery of the working project, documentation, source code and firmware (where agreed), and a walkthrough of how to use and maintain the system.",
    priority: 13,
  },

  {
    id: "project-documentation",
    category: "projects",
    intent: "requirements",
    question: "What documentation should a project include?",
    variations: [
      "What documentation should a project include",
      "Project documentation",
      "What documents are needed",
      "Handover documents",
      "Documentation with project",
      "Project documentation requirements",
    ],
    keywords: ["documentation", "schematic", "code", "handover", "project"],
    answer:
      "Documentation can include schematics, wiring diagrams, source code, build instructions, calibration data, and user information. The exact set depends on the project.",
    priority: 13,
  },

  {
    id: "project-source-code",
    category: "projects",
    intent: "compatibility",
    question: "Do I receive the source code?",
    variations: [
      "Do I receive the source code",
      "Do I own the source code",
      "Will you give me the firmware",
      "Can I get the project code",
      "Do you keep the code",
      "Project source code",
    ],
    keywords: ["source", "code", "firmware", "ownership", "program"],
    answer:
      "Source code, firmware and relevant schematics are handed over with the finished ProjexiaHub build.",
    priority: 15,
  },

  {
    id: "project-schematics",
    category: "projects",
    intent: "compatibility",
    question: "Do I receive schematics?",
    variations: [
      "Do I receive schematics",
      "Will I get the circuit diagram",
      "Do you provide wiring diagrams",
      "Can I receive the schematic",
      "Do I get hardware documentation",
      "Project schematics",
    ],
    keywords: ["schematic", "diagram", "wiring", "documentation"],
    answer:
      "Relevant schematics and circuit documentation are handed over with the finished build where applicable.",
    priority: 15,
  },

  {
    id: "project-training",
    category: "projects",
    intent: "compatibility",
    question: "Do you provide training?",
    variations: [
      "Do you provide training",
      "Can you train me on the project",
      "Do you offer training",
      "Can you teach me how to use it",
      "Project handover training",
      "Project training",
    ],
    keywords: ["training", "teach", "learn", "handover", "use"],
    answer:
      "Training or handover arrangements depend on the project. Mention your requirements in the project request or contact ProjexiaHub directly.",
    priority: 10,
  },

  {
    id: "project-delivery",
    category: "projects",
    intent: "compatibility",
    question: "Do you deliver projects?",
    variations: [
      "Do you deliver projects",
      "Can you ship my project",
      "Do you deliver to my location",
      "How do I receive my project",
      "Project delivery options",
      "Project delivery",
    ],
    keywords: ["delivery", "ship", "receive", "location", "options"],
    answer:
      "Delivery arrangements depend on the project and location. Contact ProjexiaHub directly to discuss how the finished project will be delivered.",
    priority: 10,
  },

  {
    id: "project-installation",
    category: "projects",
    intent: "capability",
    question: "Do you install projects on-site?",
    variations: [
      "Do you install projects on-site",
      "Can you install my project",
      "Do you do on-site work",
      "Can you set up the system",
    ],
    keywords: ["installation", "install", "site", "setup", "service"],
    answer:
      "Installation arrangements depend on the project scope and location. Contact ProjexiaHub directly to discuss on-site requirements.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SUPPORT / MAINTENANCE / IP
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-support",
    category: "projects",
    intent: "compatibility",
    question: "Do you provide support after the project?",
    variations: [
      "Do you provide support after the project",
      "Post project support",
      "Can I get help after delivery",
      "Do you offer after-sales support",
    ],
    keywords: ["support", "after", "delivery", "post", "help"],
    answer:
      "Support arrangements depend on the project and current ProjexiaHub policy. Contact ProjexiaHub directly to discuss post-project support.",
    priority: 13,
  },

  {
    id: "project-maintenance",
    category: "projects",
    intent: "compatibility",
    question: "Do you provide maintenance?",
    variations: [
      "Do you provide maintenance",
      "Can you maintain my project",
      "Do you offer maintenance service",
      "Long term maintenance",
    ],
    keywords: ["maintenance", "service", "long", "term", "project"],
    answer:
      "Maintenance arrangements depend on the project. Contact ProjexiaHub directly to discuss maintenance requirements.",
    priority: 10,
  },

  {
    id: "project-repair",
    category: "projects",
    intent: "capability",
    question: "Can you repair my project?",
    variations: [
      "Can you repair my project",
      "Can you fix my circuit",
      "My project is broken",
      "Repair service",
    ],
    keywords: ["repair", "fix", "broken", "service", "circuit"],
    answer:
      "Repair feasibility depends on the project and the fault. Provide details about the problem and any relevant photos or measurements when contacting ProjexiaHub.",
    priority: 13,
  },

  {
    id: "project-update",
    category: "projects",
    intent: "compatibility",
    question: "Can the project be updated later?",
    variations: [
      "Can the project be updated later",
      "Can I add features later",
      "Can the project be upgraded",
      "Can you update the firmware later",
    ],
    keywords: ["update", "upgrade", "future", "modify", "firmware"],
    answer:
      "Yes. Projects can often be updated or extended later. Discuss future requirements during planning so the design can accommodate changes where practical.",
    priority: 10,
  },

  {
    id: "project-scalability",
    category: "projects",
    intent: "procedure",
    question: "Can the project be expanded later?",
    variations: [
      "Can the project be expanded later",
      "Can I add more sensors later",
      "Can the system grow",
      "Can I expand the system",
    ],
    keywords: ["expand", "scale", "grow", "add", "sensors"],
    answer:
      "Scalability depends on the design. Using modular architecture, appropriate communication, and sufficient I/O capacity can make future expansion easier.",
    priority: 10,
  },

  {
    id: "project-ip",
    category: "projects",
    intent: "compatibility",
    question: "Who owns the intellectual property?",
    variations: [
      "Who owns the intellectual property",
      "IP ownership",
      "Who owns the design",
      "Do I own the project",
    ],
    keywords: ["ip", "intellectual", "property", "ownership", "design"],
    answer:
      "Intellectual property arrangements depend on the project agreement. Discuss IP ownership with ProjexiaHub before starting the project.",
    priority: 13,
  },

  {
    id: "project-nda",
    category: "projects",
    intent: "compatibility",
    question: "Can we sign an NDA?",
    variations: [
      "Can we sign an NDA",
      "Do you sign NDA",
      "Non disclosure agreement",
      "Confidential project",
    ],
    keywords: ["nda", "confidential", "agreement", "protect", "idea"],
    answer:
      "Confidentiality arrangements can be discussed with ProjexiaHub. Use the contact options to raise this before sharing sensitive information.",
    priority: 13,
  },

  {
    id: "project-idea-protection",
    category: "projects",
    intent: "procedure",
    question: "How do I protect my project idea?",
    variations: [
      "How do I protect my project idea",
      "Protect my idea",
      "Can someone steal my idea",
      "Idea ownership",
    ],
    keywords: ["idea", "protect", "confidential", "ownership", "project"],
    answer:
      "Discuss confidentiality and IP arrangements with ProjexiaHub before sharing sensitive details. Legal protection depends on your jurisdiction and circumstances.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // MANUFACTURING / BULK / QUALITY
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-bulk",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub produce multiple units?",
    variations: [
      "Can ProjexiaHub produce multiple units",
      "Can you make multiple copies",
      "Do you do small batch production",
      "Can you produce quantity",
    ],
    keywords: ["bulk", "multiple", "quantity", "production", "units"],
    answer:
      "Small-batch or multiple-unit production can be discussed depending on the design, components, and quantity. PCB assembly and enclosure production may also be involved.",
    priority: 10,
  },

  {
    id: "project-manufacturing",
    category: "projects",
    intent: "capability",
    question: "Can ProjexiaHub help with manufacturing?",
    variations: [
      "Can ProjexiaHub help with manufacturing",
      "Manufacturing support",
      "Produce my design",
      "PCB assembly service",
    ],
    keywords: ["manufacturing", "production", "assembly", "pcb", "design"],
    answer:
      "Manufacturing support depends on the project and scope. PCB fabrication, assembly, and enclosure production can be discussed with ProjexiaHub.",
    priority: 10,
  },

  {
    id: "project-quality",
    category: "projects",
    intent: "procedure",
    question: "How do you ensure quality?",
    variations: [
      "How do you ensure quality",
      "Quality assurance",
      "Testing and quality",
      "Quality control",
    ],
    keywords: ["quality", "assurance", "testing", "control", "check"],
    answer:
      "Quality practices include design review, testing, inspection, and verification against requirements. The exact process depends on the project.",
    priority: 13,
  },

  {
    id: "project-certification",
    category: "projects",
    intent: "compatibility",
    question: "Can ProjexiaHub help with certification?",
    variations: [
      "Can ProjexiaHub help with certification",
      "Do you handle certification",
      "CE FCC certification",
      "Product certification",
    ],
    keywords: ["certification", "ce", "fcc", "compliance", "testing"],
    answer:
      "Certification requirements and support depend on the product and target market. Discuss certification needs with ProjexiaHub during planning.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // RELIABILITY / MAINTAINABILITY / TESTABILITY
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-reliability",
    category: "projects",
    intent: "procedure",
    question: "How do I make my project reliable?",
    variations: [
      "How do I make my project reliable",
      "Improve reliability",
      "Robust design",
      "Long term reliability",
    ],
    keywords: ["reliability", "robust", "failures", "design", "long"],
    answer:
      "Use components within their ratings, provide stable power, manage heat, secure connections, minimize noise, and test under realistic conditions.",
    priority: 13,
  },

  {
    id: "project-maintainability",
    category: "projects",
    intent: "procedure",
    question: "How do I make my project maintainable?",
    variations: [
      "How do I make my project maintainable",
      "Maintainable design",
      "Easy to repair",
      "Serviceable project",
    ],
    keywords: ["maintainable", "repair", "service", "documentation", "design"],
    answer:
      "Use modular design, clear documentation, accessible components, and labeled connections. Good maintenance planning reduces downtime and cost.",
    priority: 10,
  },

  {
    id: "project-testability",
    category: "projects",
    intent: "procedure",
    question: "How do I make my project testable?",
    variations: [
      "How do I make my project testable",
      "Testable design",
      "Add test points",
      "Diagnostic features",
    ],
    keywords: ["testable", "test", "points", "diagnostics", "design"],
    answer:
      "Include test points, status indicators, diagnostic modes, and modular subsystems. Design for testing from the beginning.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MISCELLANEOUS / GENERAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-meeting",
    category: "projects",
    intent: "contact",
    question: "Can I schedule a meeting?",
    variations: [
      "Can I schedule a meeting",
      "Can I book a meeting",
      "Can we discuss my project",
      "Can I have a consultation",
    ],
    keywords: ["meeting", "schedule", "consultation", "discuss", "book"],
    answer:
      "Meeting arrangements depend on availability and the purpose. Use the contact options on the website to request a meeting or discussion.",
    priority: 10,
  },

  {
    id: "project-consultation",
    category: "projects",
    intent: "contact",
    question: "Can I get a consultation for my project?",
    variations: [
      "Can I get a consultation for my project",
      "Can you advise on my project",
      "Can I discuss my idea",
      "Project consultation",
    ],
    keywords: ["consultation", "advice", "discuss", "idea", "project"],
    answer:
      "Consultations can be arranged depending on availability. Use the contact options on the website to discuss your project idea.",
    priority: 10,
  },

  {
    id: "project-best-practices",
    category: "projects",
    intent: "procedure",
    question: "What are best practices for project development?",
    variations: [
      "What are best practices for project development",
      "Project best practices",
      "Good project design",
      "How to develop a project properly",
    ],
    keywords: ["best", "practices", "project", "development", "design"],
    answer:
      "Use clear requirements, modular design, version control, testing, documentation, and iterative development. Planning and review help avoid costly mistakes.",
    priority: 13,
  },
];
