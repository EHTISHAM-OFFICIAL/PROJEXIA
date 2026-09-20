export const SERVICES_HELP = [
  {
    id: "services-electronics",
    category: "services",
    question: "Does MECTEC work on electronics projects?",
    variations: [
      "Do you build electronics projects",
      "Can you make electronic systems",
      "Can MECTEC develop electronics",
      "Do you work with electronic circuits",
      "Can you build hardware projects",
    ],
    keywords: ["electronics", "electronic", "hardware", "circuits", "projects"],
    answer:
      "Yes. Electronics and embedded hardware are central areas of MECTEC projects, including sensor systems, microcontroller projects, automation and other custom electronic solutions.",
    priority: 9,
  },

  {
    id: "services-embedded",
    category: "services",
    question: "Does MECTEC build embedded systems?",
    variations: [
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
      "Yes. MECTEC works with embedded systems involving microcontrollers, sensors, actuators, communication modules and firmware.",
    priority: 9,
  },

  {
    id: "services-automation",
    category: "services",
    question: "Does MECTEC build automation systems?",
    variations: [
      "Can you build automation",
      "Do you make automated systems",
      "Can you automate a process",
      "Can MECTEC automate my project",
      "Do you work on control systems",
    ],
    keywords: ["automation", "automate", "control", "system", "process"],
    answer:
      "Yes. Automation projects can combine sensors, controllers, motors, relays, communication modules and programmed logic to perform tasks automatically.",
    priority: 9,
  },

  {
    id: "services-iot",
    category: "services",
    question: "Does MECTEC work with IoT?",
    variations: [
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
    priority: 9,
  },

  {
    id: "services-sensors",
    category: "services",
    question: "Does MECTEC work with sensors?",
    variations: [
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
    priority: 8,
  },

  {
    id: "services-rfid",
    category: "services",
    question: "Can MECTEC build RFID projects?",
    variations: [
      "Do you make RFID systems",
      "Can you build RFID access control",
      "Can you make an RFID door lock",
      "Can you work with RFID cards",
      "Can you build RFID attendance",
    ],
    keywords: ["rfid", "card", "tag", "access", "door", "attendance"],
    answer:
      "Yes. RFID can be used for projects such as identification, access control, authentication and other systems where cards or tags need to be detected.",
    priority: 9,
  },

  {
    id: "services-prototyping",
    category: "services",
    question: "Can MECTEC help with prototypes?",
    variations: [
      "Can you make prototypes",
      "Do you build prototypes",
      "Can you turn an idea into a prototype",
      "Can you develop a proof of concept",
      "Can you make an initial working model",
    ],
    keywords: ["prototype", "prototyping", "proof", "concept", "model", "idea"],
    answer:
      "Yes. A project request can be based on an idea that needs to be turned into a working prototype. Describe the desired behavior and requirements as clearly as possible.",
    priority: 8,
  },
] as const;
