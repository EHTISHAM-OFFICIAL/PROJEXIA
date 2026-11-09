import type { HelpEntry } from "./types";

export const SERVICES_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // COMPLETE SERVICE OVERVIEW
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-overview",
    category: "services",
    intent: "capability",
    question: "What services does ProjexiaHub provide?",
    variations: [
      "What services does ProjexiaHub provide",
      "What services does the studio provide",
      "What services do you provide",
      "What kind of services do you offer",
      "What does ProjexiaHub do",
      "What work does ProjexiaHub do",
      "What projects can you make",
      "What types of projects do you build",
      "Can you tell me about your services",
      "Give me an overview of your services",
      "What are your main services",
      "Do you make school projects and models",
      "Do you provide school college and university projects",
      "Can you make electronics and mechanical projects",
      "Do you make Arduino and breadboard projects",
      "Do you offer customized projects",
    ],
    keywords: [
      "services", "service", "studio", "provide", "offer", "work",
      "school", "college", "university", "FYP", "project", "projects",
      "model", "models", "chart", "charts", "electronics", "mechanical",
      "breadboard", "analog", "Arduino", "custom", "customized",
    ],
    answer:
      "ProjexiaHub provides project-building services for students and custom project requirements. Our services include:\n\n• School projects, educational models and charts\n• College projects and practical demonstrations\n• University projects and Final Year Projects (FYPs)\n• Electronics and mechanical projects\n• Breadboard circuits and prototypes\n• Analog electronics projects\n• Arduino-based and other microcontroller projects\n• Customized projects developed around the requirements you provide\n\nShare your project idea, required features and deadline through the Project Request form so the requirements can be reviewed. Pricing and feasibility are discussed according to the specific project; we do not quote a fixed price before reviewing its requirements.",
    priority: 120,
  },

  // ─────────────────────────────────────────────────────────────
  // CORE ENGINEERING SERVICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-electronics",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work on electronics projects?",
    variations: [
      "Does ProjexiaHub work on electronics projects",
      "Do you build electronics projects",
      "Can you make electronic systems",
      "Can ProjexiaHub develop electronics",
      "Do you work with electronic circuits",
      "Can you build hardware projects",
    ],
    keywords: ["electronics", "electronic", "hardware", "circuits", "projects"],
    answer:
      "Yes. Electronics and embedded hardware are central areas of ProjexiaHub projects, including sensor systems, microcontroller projects, automation and other custom electronic solutions.",
    priority: 13,
  },

  {
    id: "services-embedded",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub build embedded systems?",
    variations: [
      "Does ProjexiaHub build embedded systems",
      "Do you work with embedded systems",
      "Can you make embedded projects",
      "Can you build microcontroller systems",
      "Do you develop embedded hardware",
      "Can you program embedded devices",
    ],
    keywords: [
      "embedded",
      "microcontroller",
      "firmware",
      "hardware",
      "systems",
    ],
    answer:
      "Yes. ProjexiaHub works with embedded systems involving microcontrollers, sensors, actuators, communication modules and firmware.",
    priority: 13,
  },

  {
    id: "services-automation",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub build automation systems?",
    variations: [
      "Does ProjexiaHub build automation systems",
      "Can you build automation",
      "Do you make automated systems",
      "Can you automate a process",
      "Can ProjexiaHub automate my project",
      "Do you work on control systems",
    ],
    keywords: ["automation", "automate", "control", "system", "process"],
    answer:
      "Yes. Automation projects can combine sensors, controllers, motors, relays, communication modules and programmed logic to perform tasks automatically.",
    priority: 13,
  },

  {
    id: "services-iot",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work with IoT?",
    variations: [
      "Does ProjexiaHub work with IoT",
      "Can you build IoT projects",
      "Do you make internet connected devices",
      "Can you connect hardware to the internet",
      "Do you develop smart devices",
      "Can you make a WiFi project",
      "Can you build cloud connected hardware",
    ],
    keywords: ["iot", "internet", "wifi", "connected", "smart", "device"],
    answer:
      "Yes. IoT projects can use connected microcontrollers, sensors, dashboards, APIs and other communication technologies depending on the requirements.",
    priority: 13,
  },

  {
    id: "services-sensors",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work with sensors?",
    variations: [
      "Does ProjexiaHub work with sensors",
      "Can you build sensor projects",
      "Do you use sensors",
      "Can you make a temperature sensor system",
      "Can you make motion detection",
      "Can you build sensor based automation",
    ],
    keywords: [
      "sensor",
      "sensors",
      "temperature",
      "motion",
      "detection",
      "measurement",
    ],
    answer:
      "Yes. Sensor-based systems are supported, including projects that measure environmental conditions, detect movement or objects, monitor values and trigger other hardware based on sensor readings.",
    priority: 13,
  },

  {
    id: "services-rfid",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub build RFID projects?",
    variations: [
      "Can ProjexiaHub build RFID projects",
      "Do you make RFID systems",
      "Can you build RFID access control",
      "Can you make an RFID door lock",
      "Can you work with RFID cards",
      "Can you build RFID attendance",
    ],
    keywords: ["rfid", "card", "tag", "access", "door", "attendance"],
    answer:
      "Yes. RFID can be used for projects such as identification, access control, authentication and other systems where cards or tags need to be detected.",
    priority: 13,
  },

  {
    id: "services-prototyping",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub help with prototypes?",
    variations: [
      "Can ProjexiaHub help with prototypes",
      "Can you make prototypes",
      "Do you build prototypes",
      "Can you turn an idea into a prototype",
      "Can you develop a proof of concept",
      "Can you make an initial working model",
    ],
    keywords: ["prototype", "prototyping", "proof", "concept", "model", "idea"],
    answer:
      "Yes. A project request can be based on an idea that needs to be turned into a working prototype. Describe the desired behavior and requirements as clearly as possible.",
    priority: 13,
  },

  {
    id: "services-pcb",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub design PCBs?",
    variations: [
      "Can ProjexiaHub design PCBs",
      "Can you make a PCB",
      "Do you design circuit boards",
      "Can ProjexiaHub convert my circuit into a PCB",
      "Do you do PCB layout",
    ],
    keywords: ["pcb", "design", "circuit", "board", "layout"],
    answer:
      "PCB design can be part of a project when a permanent or compact circuit is required. The process normally starts with a verified schematic and continues with component placement, routing, design-rule checks and manufacturing files.",
    priority: 13,
  },

  {
    id: "services-firmware",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub write firmware?",
    variations: [
      "Can ProjexiaHub write firmware",
      "Do you write firmware",
      "Can you program microcontrollers",
      "Can you develop embedded software",
      "Do you write code for projects",
    ],
    keywords: ["firmware", "code", "program", "embedded", "software"],
    answer:
      "Yes. Firmware can be developed for microcontrollers such as Arduino, ESP32, STM32 and others, covering sensor reading, control logic, communication, displays and other functions.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // PLATFORMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-arduino",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub program Arduino boards?",
    variations: [
      "Does ProjexiaHub program Arduino boards",
      "Can you write Arduino code",
      "Do you program Arduino",
      "Arduino firmware development",
      "Can you build Arduino projects",
    ],
    keywords: ["arduino", "programming", "firmware", "code", "board"],
    answer:
      "Yes. Arduino-based projects can be programmed for sensor reading, actuator control, communication, automation logic, displays, RFID and other embedded applications.",
    priority: 15,
  },

  {
    id: "services-esp32",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub program ESP32 boards?",
    variations: [
      "Does ProjexiaHub program ESP32 boards",
      "Can you develop ESP32 firmware",
      "ESP32 programming",
      "Can you make ESP32 IoT projects",
      "Do you work with ESP32",
    ],
    keywords: ["esp32", "firmware", "wifi", "bluetooth", "iot"],
    answer:
      "Yes. ESP32 firmware can be developed for GPIO control, sensors, displays, Wi-Fi, Bluetooth, web interfaces, IoT communication, automation and other embedded applications.",
    priority: 15,
  },

  {
    id: "services-raspberry-pi",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work with Raspberry Pi?",
    variations: [
      "Does ProjexiaHub work with Raspberry Pi",
      "Can you build Raspberry Pi projects",
      "Do you use Raspberry Pi",
      "Can you program Raspberry Pi",
      "Raspberry Pi development",
    ],
    keywords: ["raspberry", "pi", "linux", "development", "projects"],
    answer:
      "Raspberry Pi and similar single-board computers can be used when a project needs more computing capability, networking or a full operating system. The appropriate platform depends on the requirements.",
    priority: 13,
  },

  {
    id: "services-stm32",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work with STM32?",
    variations: [
      "Does ProjexiaHub work with STM32",
      "Can you develop STM32 firmware",
      "STM32 projects",
      "Can you program STM32",
      "Do you use STM32 microcontrollers",
    ],
    keywords: ["stm32", "arm", "firmware", "microcontroller", "embedded"],
    answer:
      "Yes. STM32 firmware can be developed for a range of applications including motor control, communication, sensors and industrial interfaces.",
    priority: 13,
  },

  {
    id: "services-microcontrollers",
    category: "services",
    intent: "capability",
    question: "Which microcontrollers does ProjexiaHub work with?",
    variations: [
      "Which microcontrollers does ProjexiaHub work with",
      "What boards do you use",
      "Do you work with microcontrollers",
      "What platform do you recommend",
      "Which MCU for my project",
    ],
    keywords: [
      "microcontroller",
      "mcu",
      "arduino",
      "esp32",
      "stm32",
      "platform",
    ],
    answer:
      "ProjexiaHub works with a range of microcontrollers including Arduino-based boards, ESP32, STM32 and others. The appropriate platform is selected based on the project requirements.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // MOTION / ROBOTICS
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-motor-control",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub build motor-control systems?",
    variations: [
      "Can ProjexiaHub build motor-control systems",
      "Can you control motors",
      "Can ProjexiaHub automate motors",
      "Can you build a motor controller",
      "Do you work with motors",
    ],
    keywords: ["motor", "control", "controller", "automation", "driver"],
    answer:
      "Yes. Motor-control projects can use suitable drivers, PWM, direction control, feedback, limit switches, encoders and microcontrollers depending on the required speed, torque and positioning behavior.",
    priority: 13,
  },

  {
    id: "services-robotics",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub build robotics projects?",
    variations: [
      "Can ProjexiaHub build robotics projects",
      "Do you make robots",
      "Can you build a robot",
      "Robotics project",
      "Can you automate a machine",
    ],
    keywords: ["robotics", "robot", "automation", "machine", "control"],
    answer:
      "Robotics and motion-control projects can involve microcontrollers, motor drivers, sensors, feedback and communication. The approach depends on the required behavior and environment.",
    priority: 13,
  },

  {
    id: "services-smart-home",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub build smart home systems?",
    variations: [
      "Can ProjexiaHub build smart home systems",
      "Do you make smart home devices",
      "Can you automate my home",
      "Home automation project",
      "Smart home system",
    ],
    keywords: ["smart", "home", "automation", "iot", "devices"],
    answer:
      "Yes. Smart home projects can include lighting, sensors, appliances, security and connected control using Wi-Fi, Bluetooth, Zigbee or other technologies.",
    priority: 13,
  },

  {
    id: "services-industrial",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work on industrial projects?",
    variations: [
      "Does ProjexiaHub work on industrial projects",
      "Do you work on industrial systems",
      "Industrial automation project",
      "Can you build industrial controllers",
      "Factory automation",
    ],
    keywords: ["industrial", "automation", "factory", "control", "plc"],
    answer:
      "Industrial projects can involve PLCs, industrial communication, sensors, motor control and robust enclosures. Requirements and safety standards should be discussed.",
    priority: 10,
  },

  {
    id: "services-medical",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work on medical projects?",
    variations: [
      "Does ProjexiaHub work on medical projects",
      "Do you make medical devices",
      "Medical electronics project",
      "Healthcare device",
      "Can you build medical equipment",
    ],
    keywords: ["medical", "healthcare", "device", "electronics", "safety"],
    answer:
      "Medical and healthcare-related electronics may involve additional regulatory, safety and reliability requirements. Discuss the specific application with ProjexiaHub.",
    priority: 9,
  },

  {
    id: "services-automotive",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work on automotive projects?",
    variations: [
      "Does ProjexiaHub work on automotive projects",
      "Do you work on automotive electronics",
      "Car electronics project",
      "Automotive control",
      "Can you build vehicle systems",
    ],
    keywords: ["automotive", "car", "vehicle", "electronics", "control"],
    answer:
      "Automotive projects may involve specific voltage ranges, communication protocols, environmental requirements and safety standards. Discuss the specific application with ProjexiaHub.",
    priority: 9,
  },

  {
    id: "services-agriculture",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub work on agriculture projects?",
    variations: [
      "Does ProjexiaHub work on agriculture projects",
      "Do you make agriculture systems",
      "Smart farming project",
      "Irrigation automation",
      "Agriculture IoT",
    ],
    keywords: ["agriculture", "farming", "irrigation", "iot", "automation"],
    answer:
      "Agriculture projects can include sensors, irrigation control, monitoring and automation. The approach depends on the environment, power availability and required reliability.",
    priority: 10,
  },

  {
    id: "services-security",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub build security systems?",
    variations: [
      "Does ProjexiaHub build security systems",
      "Do you make security systems",
      "Alarm system project",
      "Access control system",
      "Security automation",
    ],
    keywords: ["security", "alarm", "access", "control", "system"],
    answer:
      "Security projects can include alarms, access control, sensors, cameras and communication. The design should consider reliability, tamper resistance and power backup.",
    priority: 13,
  },

  {
    id: "services-monitoring",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub build monitoring systems?",
    variations: [
      "Does ProjexiaHub build monitoring systems",
      "Do you make monitoring devices",
      "Remote monitoring project",
      "Sensor monitoring system",
      "Data logging system",
    ],
    keywords: ["monitoring", "remote", "sensor", "logging", "system"],
    answer:
      "Monitoring systems can measure temperature, humidity, pressure, motion, current and other values. Data can be logged locally or transmitted for remote access.",
    priority: 13,
  },

  {
    id: "services-data-logging",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub build data logging systems?",
    variations: [
      "Does ProjexiaHub build data logging systems",
      "Do you make data loggers",
      "Sensor data logging project",
      "Record data system",
      "Data acquisition",
    ],
    keywords: ["data", "logging", "logger", "record", "acquisition"],
    answer:
      "Data logging systems can record sensor values to SD card, flash, EEPROM or a network service. Timestamps, storage capacity and power requirements should be considered.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // USER INTERFACE / SOFTWARE
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-display",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub add a display to my project?",
    variations: [
      "Can ProjexiaHub add a display to my project",
      "Can you add a screen",
      "Display for my project",
      "Can you use an LCD or OLED",
      "User interface display",
    ],
    keywords: ["display", "screen", "lcd", "oled", "interface"],
    answer:
      "Yes. Displays can be added for status, data, menus or user interaction. The choice depends on size, readability, interface and power requirements.",
    priority: 10,
  },

  {
    id: "services-ui",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub design a user interface?",
    variations: [
      "Can ProjexiaHub design a user interface",
      "Can you make a user interface",
      "Buttons and display design",
      "How will I control the system",
      "User interaction design",
    ],
    keywords: ["user", "interface", "buttons", "display", "control"],
    answer:
      "Yes. User interfaces can include buttons, switches, displays, touch, mobile apps or web interfaces depending on the project and user requirements.",
    priority: 10,
  },

  {
    id: "services-mobile-app",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub build a mobile app?",
    variations: [
      "Can ProjexiaHub build a mobile app",
      "Can you make an app",
      "Mobile app for device",
      "Phone control app",
      "Android iOS app",
    ],
    keywords: ["mobile", "app", "android", "ios", "control"],
    answer:
      "Mobile app development depends on the project scope. Some projects can use existing apps or web interfaces; others may need a custom app. Discuss requirements with ProjexiaHub.",
    priority: 10,
  },

  {
    id: "services-web-dashboard",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub build a web dashboard?",
    variations: [
      "Can ProjexiaHub build a web dashboard",
      "Can you make a web interface",
      "Dashboard for my device",
      "Web control panel",
      "Remote monitoring website",
    ],
    keywords: ["web", "dashboard", "interface", "monitoring", "control"],
    answer:
      "Web interfaces and dashboards can be added for monitoring and control. The approach depends on the device capability, connectivity and required features.",
    priority: 10,
  },

  {
    id: "services-cloud",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub connect my project to the cloud?",
    variations: [
      "Can ProjexiaHub connect my project to the cloud",
      "Can you use cloud services",
      "Cloud connected device",
      "IoT cloud platform",
      "Remote data storage",
    ],
    keywords: ["cloud", "iot", "connected", "data", "platform"],
    answer:
      "Cloud connectivity can be added for remote monitoring, control, data storage or analytics. The platform and protocol depend on the project requirements.",
    priority: 13,
  },

  {
    id: "services-api",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub integrate with an API?",
    variations: [
      "Can ProjexiaHub integrate with an API",
      "Can you use an API",
      "API integration project",
      "Connect to external service",
      "Third party API",
    ],
    keywords: ["api", "integration", "service", "connect", "external"],
    answer:
      "API integration can be included depending on the project. Provide the API documentation and required behavior when discussing the project.",
    priority: 10,
  },

  {
    id: "services-database",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub work with databases?",
    variations: [
      "Can ProjexiaHub work with databases",
      "Can you store data in a database",
      "Database integration",
      "Data storage solution",
      "SQL database project",
    ],
    keywords: ["database", "data", "storage", "sql", "integration"],
    answer:
      "Database integration can be part of a larger system for storing and retrieving data. The database choice depends on the application and infrastructure.",
    priority: 9,
  },

  {
    id: "services-analytics",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub provide data analytics?",
    variations: [
      "Can ProjexiaHub provide data analytics",
      "Can you analyze data",
      "Data analytics project",
      "Dashboard analytics",
      "Usage reporting",
    ],
    keywords: ["analytics", "data", "analysis", "reporting", "dashboard"],
    answer:
      "Data analytics can be included for monitoring, reporting and insights. The scope depends on the data, processing requirements and desired output.",
    priority: 9,
  },

  {
    id: "services-notifications",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub add notifications?",
    variations: [
      "Can ProjexiaHub add notifications",
      "Can you send alerts",
      "Notification system",
      "Email SMS alerts",
      "Push notifications",
    ],
    keywords: ["notifications", "alerts", "email", "sms", "push"],
    answer:
      "Notifications can be sent via email, SMS, push services or other channels depending on connectivity and requirements.",
    priority: 10,
  },

  {
    id: "services-remote-control",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub add remote control?",
    variations: [
      "Can ProjexiaHub add remote control",
      "Remote control project",
      "Control from phone",
      "Remote access device",
      "Control over internet",
    ],
    keywords: ["remote", "control", "phone", "internet", "access"],
    answer:
      "Remote control can be added using network connectivity, mobile apps, web interfaces or cloud services. Security and fail-safe behavior should be considered.",
    priority: 13,
  },

  {
    id: "services-data-security",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub secure project data?",
    variations: [
      "Can ProjexiaHub secure project data",
      "Data security project",
      "Secure communication",
      "Encrypt data device",
      "Protect user data",
    ],
    keywords: ["security", "data", "encryption", "communication", "protect"],
    answer:
      "Data security can include encryption, authentication, secure storage and secure communication. The required measures depend on the sensitivity of the data and the threat model.",
    priority: 13,
  },

  {
    id: "services-remote-update",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub implement remote updates?",
    variations: [
      "Can ProjexiaHub implement remote updates",
      "Remote update project",
      "OTA update support",
      "Firmware update over internet",
      "Wireless update",
    ],
    keywords: ["update", "remote", "ota", "firmware", "wireless"],
    answer:
      "Remote updates can be supported where the hardware and connectivity allow. The update mechanism should include security and recovery features.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // QUALITY / PROCESS
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-scalability",
    category: "services",
    intent: "capability",
    question: "How do I make my project scalable?",
    variations: [
      "How do I make my project scalable",
      "Scalable project design",
      "Add more devices later",
      "Grow the system",
      "Future expansion",
    ],
    keywords: ["scalable", "expand", "grow", "future", "architecture"],
    answer:
      "Use modular design, appropriate communication, sufficient I/O and clear interfaces. Planning for growth reduces rework when requirements change.",
    priority: 10,
  },

  {
    id: "services-reliability",
    category: "services",
    intent: "capability",
    question: "How do I make my project reliable?",
    variations: [
      "How do I make my project reliable",
      "Improve reliability",
      "Robust design",
      "Prevent failures",
      "Long term reliability",
    ],
    keywords: ["reliability", "robust", "failures", "design", "long"],
    answer:
      "Use components within their ratings, provide stable power, manage heat, secure connections, minimize noise and test under realistic conditions.",
    priority: 13,
  },

  {
    id: "services-maintainability",
    category: "services",
    intent: "capability",
    question: "How do I make my project maintainable?",
    variations: [
      "How do I make my project maintainable",
      "Maintainable design",
      "Easy to repair",
      "Serviceable project",
      "Documentation for maintenance",
    ],
    keywords: ["maintainable", "repair", "service", "documentation", "design"],
    answer:
      "Use modular design, clear documentation, accessible components and labeled connections. Good maintenance planning reduces downtime and cost.",
    priority: 10,
  },

  {
    id: "services-testability",
    category: "services",
    intent: "capability",
    question: "How do I make my project testable?",
    variations: [
      "How do I make my project testable",
      "Testable design",
      "Add test points",
      "Diagnostic features",
      "How to test the system",
    ],
    keywords: ["testable", "test", "points", "diagnostics", "design"],
    answer:
      "Include test points, status indicators, diagnostic modes and modular subsystems. Design for testing from the beginning.",
    priority: 10,
  },

  {
    id: "services-documentation",
    category: "services",
    intent: "capability",
    question: "What documentation does ProjexiaHub provide?",
    variations: [
      "What documentation does ProjexiaHub provide",
      "Project documentation",
      "What documents are provided",
      "Schematic and code documentation",
      "Handover documents",
    ],
    keywords: ["documentation", "schematic", "code", "handover", "project"],
    answer:
      "Documentation can include schematics, wiring diagrams, source code, build instructions, calibration data and user information. The exact set depends on the project.",
    priority: 10,
  },

  {
    id: "services-standards",
    category: "services",
    intent: "capability",
    question: "What standards apply to ProjexiaHub projects?",
    variations: [
      "What standards apply to ProjexiaHub projects",
      "Electronics standards",
      "Compliance requirements",
      "Safety standards",
      "EMC standards",
    ],
    keywords: ["standards", "compliance", "safety", "emc", "electronics"],
    answer:
      "Standards depend on the application and market, such as safety, EMC, radio and industry-specific requirements. These should be identified during project planning.",
    priority: 10,
  },

  {
    id: "services-certification",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub help with certification?",
    variations: [
      "Can ProjexiaHub help with certification",
      "Do you handle certification",
      "CE FCC certification",
      "Product certification",
      "Compliance testing",
    ],
    keywords: ["certification", "ce", "fcc", "compliance", "testing"],
    answer:
      "Certification requirements and support depend on the product and target market. Discuss certification needs with ProjexiaHub during planning.",
    priority: 10,
  },

  {
    id: "services-ip",
    category: "services",
    intent: "capability",
    question: "Who owns the intellectual property?",
    variations: [
      "Who owns the intellectual property",
      "IP ownership",
      "Who owns the design",
      "Do I own the project",
      "Intellectual property rights",
    ],
    keywords: ["ip", "intellectual", "property", "ownership", "design"],
    answer:
      "Intellectual property arrangements depend on the project agreement. Discuss IP ownership with ProjexiaHub before starting the project.",
    priority: 13,
  },

  {
    id: "services-nda",
    category: "services",
    intent: "capability",
    question: "Can we sign an NDA?",
    variations: [
      "Can we sign an NDA",
      "Do you sign NDA",
      "Non disclosure agreement",
      "Confidential project",
      "Protect my idea",
    ],
    keywords: ["nda", "confidential", "agreement", "protect", "idea"],
    answer:
      "Confidentiality arrangements can be discussed with ProjexiaHub. Use the contact options to raise this before sharing sensitive information.",
    priority: 10,
  },

  {
    id: "services-idea-protection",
    category: "services",
    intent: "capability",
    question: "How do I protect my project idea?",
    variations: [
      "How do I protect my project idea",
      "Protect my idea",
      "Can someone steal my idea",
      "Confidentiality for project",
      "Idea ownership",
    ],
    keywords: ["idea", "protect", "confidential", "ownership", "project"],
    answer:
      "Discuss confidentiality and IP arrangements with ProjexiaHub before sharing sensitive details. Legal protection depends on your jurisdiction and circumstances.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PRODUCTION / MANUFACTURING
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-bulk",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub produce multiple units?",
    variations: [
      "Can ProjexiaHub produce multiple units",
      "Can you make multiple copies",
      "Bulk production",
      "Small batch manufacturing",
      "Quantity production",
    ],
    keywords: ["bulk", "multiple", "production", "quantity", "units"],
    answer:
      "Small-batch or multiple-unit production can be discussed depending on the design, components and quantity. PCB assembly and enclosure production may also be involved.",
    priority: 10,
  },

  {
    id: "services-manufacturing",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub help with manufacturing?",
    variations: [
      "Can ProjexiaHub help with manufacturing",
      "Manufacturing support",
      "Produce my design",
      "PCB assembly service",
      "Production help",
    ],
    keywords: ["manufacturing", "production", "assembly", "pcb", "design"],
    answer:
      "Manufacturing support depends on the project and scope. PCB fabrication, assembly and enclosure production can be discussed with ProjexiaHub.",
    priority: 10,
  },

  {
    id: "services-quality",
    category: "services",
    intent: "capability",
    question: "How does ProjexiaHub ensure quality?",
    variations: [
      "How does ProjexiaHub ensure quality",
      "Quality assurance",
      "Testing and quality",
      "How do you check the project",
      "Quality control",
    ],
    keywords: ["quality", "assurance", "testing", "control", "check"],
    answer:
      "Quality practices include design review, testing, inspection and verification against requirements. The exact process depends on the project.",
    priority: 13,
  },

  {
    id: "services-repair",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub repair my project?",
    variations: [
      "Can ProjexiaHub repair my project",
      "Can you fix my circuit",
      "My project is broken",
      "Repair service",
      "Can you fix electronics",
    ],
    keywords: ["repair", "fix", "broken", "service", "circuit"],
    answer:
      "Repair feasibility depends on the project and the fault. Provide details about the problem and any relevant photos or measurements when contacting ProjexiaHub.",
    priority: 13,
  },

  {
    id: "services-maintenance",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub provide maintenance?",
    variations: [
      "Does ProjexiaHub provide maintenance",
      "Can you maintain my project",
      "Do you offer maintenance service",
      "Project maintenance",
      "Long term maintenance",
    ],
    keywords: ["maintenance", "service", "long", "term", "project"],
    answer:
      "Maintenance arrangements depend on the project. Contact ProjexiaHub directly to discuss maintenance requirements.",
    priority: 10,
  },

  {
    id: "services-training",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub provide training?",
    variations: [
      "Does ProjexiaHub provide training",
      "Can you train me on the project",
      "Do you offer training",
      "Can you teach me how to use it",
      "Project handover training",
    ],
    keywords: ["training", "teach", "learn", "handover", "use"],
    answer:
      "Training or handover arrangements depend on the project. Mention your requirements in the project request or contact ProjexiaHub directly.",
    priority: 9,
  },

  {
    id: "services-delivery",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub deliver projects?",
    variations: [
      "Does ProjexiaHub deliver projects",
      "Can you ship my project",
      "Do you deliver to my location",
      "How do I receive my project",
      "Project delivery options",
    ],
    keywords: ["delivery", "ship", "receive", "location", "options"],
    answer:
      "Delivery arrangements depend on the project and location. Contact ProjexiaHub directly to discuss how the finished project will be delivered.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // CONSULTATION / SUPPORT
  // ─────────────────────────────────────────────────────────────
  {
    id: "services-meeting",
    category: "services",
    intent: "capability",
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
    priority: 10,
  },

  {
    id: "services-consultation",
    category: "services",
    intent: "capability",
    question: "Can I get a consultation?",
    variations: [
      "Can I get a consultation",
      "Can you advise on my project",
      "Can I discuss my idea",
      "Project consultation",
      "Can you help me plan",
    ],
    keywords: ["consultation", "advice", "discuss", "idea", "project"],
    answer:
      "Consultations can be arranged depending on availability. Use the contact options on the website to discuss your project idea.",
    priority: 10,
  },

  {
    id: "services-electronics-basics",
    category: "services",
    intent: "capability",
    question: "Does ProjexiaHub explain electronics basics?",
    variations: [
      "Does ProjexiaHub explain electronics basics",
      "Can you teach electronics",
      "Do you explain how circuits work",
      "Can you help me learn electronics",
      "Do you provide tutorials",
    ],
    keywords: ["explain", "learn", "teach", "tutorial", "basics"],
    answer:
      "The Help Assistant can answer general questions about electronics, embedded systems, sensors, microcontrollers, communication and related topics from the local knowledge library.",
    priority: 10,
  },

  {
    id: "services-sensor-selection",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub select sensors for my project?",
    variations: [
      "Can ProjexiaHub select sensors for my project",
      "Can you choose sensors",
      "Who decides which sensors to use",
      "Can ProjexiaHub recommend the right sensor",
      "Can you pick components",
    ],
    keywords: ["sensor", "selection", "choose", "recommend", "components"],
    answer:
      "Yes. Component and sensor selection can be based on electrical requirements, accuracy, current consumption, communication interfaces, availability, cost and the required reliability.",
    priority: 13,
  },

  {
    id: "services-motor-selection",
    category: "services",
    intent: "capability",
    question: "Can ProjexiaHub help me choose a motor?",
    variations: [
      "Can ProjexiaHub help me choose a motor",
      "Can you recommend a motor",
      "Which motor should I use",
      "Can you help select a motor",
      "Motor selection help",
    ],
    keywords: ["motor", "selection", "choose", "recommend", "help"],
    answer:
      "Yes. Motor selection depends on torque, speed, positioning, power, environment and control requirements. Discuss the application to identify a suitable motor and driver.",
    priority: 13,
  },

  {
    id: "services-best-practices",
    category: "services",
    intent: "capability",
    question: "What are best practices for service projects?",
    variations: [
      "What are best practices for service projects",
      "Service best practices",
      "Good project service",
      "How to manage a project",
      "Service quality tips",
    ],
    keywords: ["best", "practices", "service", "project", "quality"],
    answer:
      "Use clear requirements, modular design, version control, testing, documentation and iterative development. Planning and review help avoid costly mistakes.",
    priority: 13,
  },
];
