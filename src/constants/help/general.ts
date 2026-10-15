import { SITE } from "../site";
import { PROJECT_CATEGORIES } from "../categories";

export const GENERAL_HELP = [
  {
    id: "general-what-is-mectec",
    category: "general",
    question: "What is ProjexiaHub?",
    variations: [
      "What is ProjexiaHub",
      "Tell me about ProjexiaHub",
      "What does ProjexiaHub do",
      "What is this website",
      "What is this company",
      "What does this business do",
      "What is ProjexiaHub about",
      "Can you explain ProjexiaHub",
      "Who is ProjexiaHub",
    ],
    keywords: [
      "mectec",
      "company",
      "business",
      "website",
      "electronics",
      "projects",
    ],
    answer:
      "ProjexiaHub is an electronics and technology-focused business that develops practical hardware, embedded, automation, IoT and related technical projects. The website lets you explore completed projects and submit your own project idea or request.",
    priority: 10,
  },

  {
    id: "general-what-does-mectec-build",
    category: "general",
    question: "What does ProjexiaHub build?",
    variations: [
      "What can ProjexiaHub build",
      "What kind of projects does ProjexiaHub make",
      "What systems can you build",
      "What devices can you build",
      "What products can ProjexiaHub develop",
      "What sort of electronics projects do you build",
      "What can you make",
    ],
    keywords: [
      "build",
      "make",
      "develop",
      "system",
      "device",
      "project",
      "electronics",
    ],
    answer: `ProjexiaHub works on a range of electronics and technology projects, including embedded systems, automation, IoT, sensor-based systems, microcontroller projects and other custom hardware/software solutions. Current project areas include ${PROJECT_CATEGORIES.join(", ")}.`,
    priority: 9,
  },

  {
    id: "general-project-categories",
    category: "general",
    question: "What project categories does ProjexiaHub cover?",
    variations: [
      "What categories do you have",
      "What types of projects do you accept",
      "Which project types do you build",
      "What kind of technology do you work with",
      "What services categories are available",
      "What areas does ProjexiaHub work in",
    ],
    keywords: [
      "category",
      "categories",
      "type",
      "types",
      "technology",
      "services",
      "projects",
    ],
    answer: `ProjexiaHub currently works across: ${PROJECT_CATEGORIES.join(", ")}.`,
    priority: 9,
  },

  {
    id: "general-is-mectec-custom",
    category: "general",
    question: "Does ProjexiaHub build custom projects?",
    variations: [
      "Can you make a custom project",
      "Do you make custom electronics",
      "Can ProjexiaHub build something unique",
      "Can you build my own idea",
      "Do you accept custom projects",
      "Can I request a custom system",
    ],
    keywords: [
      "custom",
      "unique",
      "own",
      "idea",
      "build",
      "project",
      "request",
    ],
    answer:
      "Yes. ProjexiaHub is designed around custom project requests. You can describe what you want the system to accomplish, even if you do not yet know the exact components or technical implementation.",
    priority: 9,
  },

  {
    id: "general-who-is-site-for",
    category: "general",
    question: "Who is ProjexiaHub for?",
    variations: [
      "Who can use ProjexiaHub",
      "Who are your services for",
      "Can students use ProjexiaHub",
      "Can businesses use ProjexiaHub",
      "Who can request a project",
      "Who do you build projects for",
    ],
    keywords: [
      "students",
      "businesses",
      "customers",
      "clients",
      "people",
      "request",
      "project",
    ],
    answer:
      "ProjexiaHub can work with people who need electronics, embedded, automation, IoT or related technical projects. You can submit an idea through the request form and explain what you need.",
    priority: 7,
  },

  {
    id: "general-need-technical-knowledge",
    category: "general",
    question: "Do I need technical knowledge to request a project?",
    variations: [
      "Do I need to know electronics",
      "I do not know electronics",
      "I am not technical",
      "Can I request a project without knowing components",
      "I do not know what board to use",
      "Do I need to understand Arduino",
      "Can beginners request projects",
    ],
    keywords: [
      "technical",
      "knowledge",
      "beginner",
      "electronics",
      "components",
      "arduino",
      "board",
    ],
    answer:
      "No. You do not need to know the technical implementation. Describe what you want the system to do, and the required hardware, platform and implementation can be worked out from the project requirements.",
    priority: 8,
  },

  {
    id: "general-response-time",
    category: "general",
    question: "How quickly does ProjexiaHub respond?",
    variations: [
      "How long until you reply",
      "When will I get a response",
      "How fast do you respond",
      "When will ProjexiaHub contact me",
      "How soon will you reply",
      "How quickly will someone respond",
    ],
    keywords: [
      "reply",
      "response",
      "respond",
      "contact",
      "quickly",
      "soon",
      "time",
    ],
    answer: `ProjexiaHub typically replies ${SITE.responseTime} to a submitted request.`,
    priority: 8,
  },

  {
    id: "general-real-person",
    category: "general",
    question: "Can I talk to a real person?",
    variations: [
      "Can I contact a real person",
      "Can I speak to someone",
      "I want to talk to someone",
      "Is there a human I can contact",
      "Can someone from ProjexiaHub answer me",
      "How do I speak with ProjexiaHub",
    ],
    keywords: ["person", "human", "speak", "talk", "contact", "someone"],
    answer: `Yes. The Help Assistant is only a quick information tool. For a specific project or anything that requires a real response, use the contact page or email ProjexiaHub at ${SITE.email}.`,
    priority: 9,
  },

  {
    id: "general-services-overview",
    category: "general",
    question: "What services does ProjexiaHub provide?",
    variations: [
      "What services do you offer",
      "What can ProjexiaHub do for me",
      "List your services",
      "What do you provide",
      "What kind of work do you do",
    ],
    keywords: ["services", "offer", "provide", "work", "help"],
    answer:
      "ProjexiaHub provides electronics, embedded systems, automation, IoT, sensor-based systems, microcontroller projects, prototypes, PCB-related work and custom hardware/software development. Submit a project request for a more specific discussion.",
    priority: 10,
  },

  {
    id: "general-pricing-overview",
    category: "general",
    question: "How much does a project cost?",
    variations: [
      "What is your pricing",
      "How much do you charge",
      "Project cost",
      "What is the price of a project",
      "How expensive are projects",
      "What do projects cost",
    ],
    keywords: ["price", "cost", "charge", "pricing", "expensive", "budget"],
    answer:
      "There is no single fixed price for custom projects. Cost depends on the hardware, components, complexity, software, enclosure, quantity and other requirements. Submit the project details for a more meaningful scope and estimate.",
    priority: 10,
  },

  {
    id: "general-timeline-overview",
    category: "general",
    question: "How long does a project take?",
    variations: [
      "Project duration",
      "How many days for a project",
      "How long will my project take",
      "Development time",
      "How quickly can you build it",
    ],
    keywords: ["time", "duration", "days", "weeks", "timeline", "deadline"],
    answer:
      "Project duration depends on scope. A small electronics build may require much less development time than a larger system involving multiple hardware modules, firmware, communication, testing and an enclosure.",
    priority: 10,
  },

  {
    id: "general-how-to-start-project",
    category: "general",
    question: "How do I start a project with ProjexiaHub?",
    variations: [
      "How do I begin a project",
      "How to start a project",
      "I want to start a project",
      "How do I request work",
      "Start a new project",
    ],
    keywords: ["start", "project", "request", "begin", "work"],
    answer:
      "Use the Project Request option in the website navigation to open the request form. Describe what you want the system to do and include as much detail as you can about requirements, hardware, timeline and budget where available.",
    priority: 10,
  },

  {
    id: "general-idea-only",
    category: "general",
    question: "Can I submit just a project idea?",
    variations: [
      "I only have an idea",
      "Can I request without details",
      "I do not have technical details",
      "Can I explain only what I want",
      "I have a concept only",
      "Can I submit a rough idea",
    ],
    keywords: ["idea", "concept", "details", "technical", "rough", "request"],
    answer:
      "Yes. You can start with an idea or a description of what you want the system to do. You do not need to know the exact components, board or technical implementation before submitting a request.",
    priority: 10,
  },

  {
    id: "general-existing-project",
    category: "general",
    question: "Can ProjexiaHub improve an existing project?",
    variations: [
      "Can you modify my existing project",
      "I already have a prototype",
      "Can you finish my project",
      "Can you work on existing hardware",
      "I have existing code",
      "Can you fix or complete my prototype",
    ],
    keywords: ["existing", "prototype", "modify", "finish", "complete", "fix"],
    answer:
      "Yes. If you already have hardware, code, a circuit, a prototype or a partially completed project, describe what you already have and what remains to be completed. The request form can be used to provide those details and relevant photos.",
    priority: 9,
  },

  {
    id: "general-photos",
    category: "general",
    question: "Can I attach photos to my request?",
    variations: [
      "Can I upload images",
      "Can I send photos",
      "Can I attach pictures",
      "Can I upload my circuit",
      "Can I send a prototype photo",
      "Can I show my existing hardware",
    ],
    keywords: ["photo", "photos", "image", "upload", "attach", "prototype"],
    answer:
      "Yes. If your request involves existing hardware, wiring, a prototype, a circuit or another physical setup, relevant photos can help explain the current situation.",
    priority: 8,
  },

  {
    id: "general-email",
    category: "general",
    question: "What is the ProjexiaHub email?",
    variations: [
      "How can I email ProjexiaHub",
      "What email should I use",
      "Give me the ProjexiaHub email",
      "Where can I send an email",
      "What is your email address",
    ],
    keywords: ["email", "mail", "address", "contact"],
    answer: `ProjexiaHub can be contacted by email at ${SITE.email}.`,
    priority: 10,
  },

  {
    id: "general-whatsapp",
    category: "general",
    question: "Does ProjexiaHub have WhatsApp?",
    variations: [
      "Can I WhatsApp ProjexiaHub",
      "How do I contact you on WhatsApp",
      "Can I message you on WhatsApp",
      "Is WhatsApp available",
    ],
    keywords: ["whatsapp", "message", "contact", "chat"],
    answer: SITE.whatsapp
      ? "Yes. ProjexiaHub provides WhatsApp contact through the WhatsApp button available on the website."
      : `ProjexiaHub can be reached through the contact page and email at ${SITE.email}.`,
    priority: 10,
  },

  {
    id: "general-location",
    category: "general",
    question: "Where is ProjexiaHub located?",
    variations: [
      "Where is ProjexiaHub",
      "Where is your shop",
      "What is your address",
      "Where can I visit",
      "Location address",
    ],
    keywords: ["location", "address", "shop", "where", "visit"],
    answer:
      "ProjexiaHub location details are not listed in the Help Assistant yet. Please use the Contact section of the website for the latest location information.",
    priority: 10,
  },

  {
    id: "general-hours",
    category: "general",
    question: "When is ProjexiaHub open?",
    variations: [
      "What are your opening hours",
      "What time do you open",
      "What time do you close",
      "When can I visit",
      "Are you open today",
      "Shop timing",
    ],
    keywords: ["open", "hours", "timing", "visit", "close"],
    answer:
      "ProjexiaHub is normally open Monday through Thursday and Saturday through Sunday from 10:00 AM to 10:00 PM. Friday is officially closed, but we may operate on Fridays when there is an unusually high workload or urgent work. For Friday availability, please contact ProjexiaHub directly.",
    priority: 10,
  },

  {
    id: "general-friday",
    category: "general",
    question: "Are you open on Friday?",
    variations: [
      "Friday opening hours",
      "Is ProjexiaHub open on Friday",
      "Friday shop timing",
      "Do you work on Friday",
      "Can I visit on Friday",
    ],
    keywords: ["friday", "open", "hours", "timing", "visit"],
    answer:
      "Friday is officially closed for ProjexiaHub, but we may operate on Fridays when there is an unusually high workload or urgent work. Please contact ProjexiaHub directly to confirm Friday availability.",
    priority: 10,
  },

  {
    id: "general-services-electronics",
    category: "general",
    question: "Does ProjexiaHub work on electronics projects?",
    variations: [
      "Do you build electronics projects",
      "Can you make electronic systems",
      "Can ProjexiaHub develop electronics",
      "Do you work with electronic circuits",
      "Can you build hardware projects",
    ],
    keywords: ["electronics", "electronic", "hardware", "circuits", "projects"],
    answer:
      "Yes. Electronics and embedded hardware are central areas of ProjexiaHub projects, including sensor systems, microcontroller projects, automation and other custom electronic solutions.",
    priority: 9,
  },

  {
    id: "general-services-embedded",
    category: "general",
    question: "Does ProjexiaHub build embedded systems?",
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
      "Yes. ProjexiaHub works with embedded systems involving microcontrollers, sensors, actuators, communication modules and firmware.",
    priority: 9,
  },

  {
    id: "general-services-automation",
    category: "general",
    question: "Does ProjexiaHub build automation systems?",
    variations: [
      "Can you build automation",
      "Do you make automated systems",
      "Can you automate a process",
      "Can ProjexiaHub automate my project",
      "Do you work on control systems",
    ],
    keywords: ["automation", "automate", "control", "system", "process"],
    answer:
      "Yes. Automation projects can combine sensors, controllers, motors, relays, communication modules and programmed logic to perform tasks automatically.",
    priority: 9,
  },

  {
    id: "general-services-iot",
    category: "general",
    question: "Does ProjexiaHub work with IoT?",
    variations: [
      "Can you build IoT projects",
      "Do you make internet connected devices",
      "Can you connect hardware to the internet",
      "Do you develop smart devices",
      "Can you make a WiFi project",
    ],
    keywords: ["iot", "internet", "wifi", "connected", "smart", "device"],
    answer:
      "Yes. IoT projects can use connected microcontrollers, sensors, dashboards, APIs and other communication technologies depending on the requirements.",
    priority: 9,
  },

  {
    id: "general-services-sensors",
    category: "general",
    question: "Does ProjexiaHub work with sensors?",
    variations: [
      "Can you build sensor projects",
      "Do you use sensors",
      "Can you make a temperature sensor system",
      "Can you make motion detection",
      "Can you build sensor based automation",
    ],
    keywords: ["sensor", "sensors", "temperature", "motion", "detection"],
    answer:
      "Yes. Sensor-based systems are supported, including projects that measure environmental conditions, detect movement or objects, monitor values and trigger other hardware based on sensor readings.",
    priority: 8,
  },

  {
    id: "general-services-rfid",
    category: "general",
    question: "Can ProjexiaHub build RFID projects?",
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
    id: "general-services-prototyping",
    category: "general",
    question: "Can ProjexiaHub help with prototypes?",
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

  {
    id: "general-hardware-software",
    category: "general",
    question: "Can ProjexiaHub handle both hardware and software?",
    variations: [
      "Do you develop hardware and software",
      "Can you make the circuit and code",
      "Can ProjexiaHub handle firmware too",
      "Do you do both hardware and firmware",
    ],
    keywords: ["hardware", "software", "firmware", "code", "circuit"],
    answer:
      "Yes. A project can involve hardware design, wiring, microcontroller programming, firmware logic, sensor integration, communication interfaces and supporting software depending on the requirements.",
    priority: 9,
  },

  {
    id: "general-student-projects",
    category: "general",
    question: "Does ProjexiaHub work on university or educational projects?",
    variations: [
      "Can you make university projects",
      "Do you help students",
      "Can ProjexiaHub build an FYP",
      "Can you make an engineering project",
    ],
    keywords: ["university", "student", "FYP", "educational", "engineering"],
    answer:
      "ProjexiaHub can work on educational and engineering project requirements, including prototypes, embedded systems, automation, sensors, RFID, IoT and other electronics-focused projects. Requirements should be provided before confirming feasibility.",
    priority: 9,
  },

  {
    id: "general-pcb-design",
    category: "general",
    question: "Can ProjexiaHub design PCBs?",
    variations: [
      "Can you make a PCB",
      "Do you design circuit boards",
      "Can ProjexiaHub convert my circuit into a PCB",
      "Do you do PCB layout",
    ],
    keywords: ["pcb", "design", "circuit", "board", "layout"],
    answer:
      "PCB design can be part of a project when a permanent or compact circuit is required. The process normally starts with a verified schematic and continues with component placement, routing, design-rule checks and manufacturing files.",
    priority: 9,
  },

  {
    id: "general-source-code",
    category: "general",
    question: "Do I receive the source code?",
    variations: [
      "Do I own the source code",
      "Will you give me the firmware",
      "Can I get the project code",
      "Do you keep the code",
      "Do I get the program",
    ],
    keywords: ["source", "code", "firmware", "ownership", "program"],
    answer:
      "Source code, firmware and relevant schematics are handed over with the finished ProjexiaHub build.",
    priority: 10,
  },

  {
    id: "general-schematics",
    category: "general",
    question: "Do I receive schematics?",
    variations: [
      "Will I get the circuit diagram",
      "Do you provide wiring diagrams",
      "Can I receive the schematic",
      "Do I get hardware documentation",
    ],
    keywords: ["schematic", "diagram", "wiring", "documentation"],
    answer:
      "Relevant schematics and circuit documentation are handed over with the finished build where applicable.",
    priority: 10,
  },

  {
    id: "general-warranty",
    category: "general",
    question: "Does ProjexiaHub provide a warranty?",
    variations: [
      "Is there a warranty",
      "Do you offer warranty",
      "How long is the warranty",
      "What happens if the project breaks",
      "Is repair covered",
    ],
    keywords: ["warranty", "guarantee", "repair", "broken"],
    answer:
      "The Help Assistant does not provide a warranty policy because warranty terms depend on the specific project and the current ProjexiaHub policy. Please contact ProjexiaHub directly for the applicable terms.",
    priority: 10,
  },

  {
    id: "general-refund",
    category: "general",
    question: "What is the refund policy?",
    variations: [
      "Can I get a refund",
      "Do you offer refunds",
      "What happens if I cancel",
      "Can project payments be refunded",
    ],
    keywords: ["refund", "cancel", "payment", "money"],
    answer:
      "The Help Assistant does not define refund or cancellation terms. For a specific project, contact ProjexiaHub directly for the applicable arrangement.",
    priority: 10,
  },

  {
    id: "general-payment",
    category: "general",
    question: "How do I pay for a project?",
    variations: [
      "What payment methods do you accept",
      "How can I pay",
      "Do you accept online payments",
      "Can I pay for a project",
    ],
    keywords: ["payment", "pay", "money", "method"],
    answer:
      "Payment arrangements are not defined by the Help Assistant. For a specific project, contact ProjexiaHub to discuss the applicable payment arrangement.",
    priority: 10,
  },

  {
    id: "general-custom-requirements",
    category: "general",
    question: "Can project requirements be customized?",
    variations: [
      "Can I request custom features",
      "Can I change the project requirements",
      "Can I add features",
      "Can the system be customized",
    ],
    keywords: ["custom", "features", "requirements", "project"],
    answer:
      "Yes. ProjexiaHub projects can be based on custom requirements. Describe the required behavior and features in the project request so the scope can be understood accurately.",
    priority: 9,
  },

  {
    id: "general-arduino",
    category: "general",
    question: "Can ProjexiaHub program Arduino boards?",
    variations: [
      "Can you write Arduino code",
      "Do you program Arduino",
      "Arduino firmware development",
      "Can you build Arduino projects",
    ],
    keywords: ["arduino", "programming", "firmware", "code", "board"],
    answer:
      "Yes. Arduino-based projects can be programmed for sensor reading, actuator control, communication, automation logic, displays, RFID and other embedded applications.",
    priority: 10,
  },

  {
    id: "general-esp32",
    category: "general",
    question: "Can ProjexiaHub program ESP32 boards?",
    variations: [
      "Can you develop ESP32 firmware",
      "ESP32 programming",
      "Can you make ESP32 IoT projects",
      "Do you work with ESP32",
    ],
    keywords: ["esp32", "firmware", "wifi", "bluetooth", "iot"],
    answer:
      "Yes. ESP32 firmware can be developed for GPIO control, sensors, displays, Wi-Fi, Bluetooth, web interfaces, IoT communication, automation and other embedded applications.",
    priority: 10,
  },

  {
    id: "general-raspberry-pi",
    category: "general",
    question: "Does ProjexiaHub work with Raspberry Pi?",
    variations: [
      "Can you build Raspberry Pi projects",
      "Do you use Raspberry Pi",
      "Can you program Raspberry Pi",
      "Raspberry Pi development",
    ],
    keywords: ["raspberry", "pi", "linux", "development", "projects"],
    answer:
      "Raspberry Pi and similar single-board computers can be used when a project needs more computing capability, networking or a full operating system. The appropriate platform depends on the requirements.",
    priority: 9,
  },

  {
    id: "general-sensor-selection",
    category: "general",
    question: "Can ProjexiaHub select sensors for my project?",
    variations: [
      "Can you choose sensors",
      "Who decides which sensors to use",
      "Can ProjexiaHub recommend the right sensor",
      "Can you pick components",
    ],
    keywords: ["sensor", "selection", "choose", "recommend", "components"],
    answer:
      "Yes. Component and sensor selection can be based on electrical requirements, accuracy, current consumption, communication interfaces, availability, cost and the required reliability.",
    priority: 9,
  },

  {
    id: "general-motor-control",
    category: "general",
    question: "Can ProjexiaHub build motor-control systems?",
    variations: [
      "Can you control motors",
      "Can ProjexiaHub automate motors",
      "Can you build a motor controller",
      "Do you work with motors",
    ],
    keywords: ["motor", "control", "controller", "automation", "driver"],
    answer:
      "Yes. Motor-control projects can use suitable drivers, PWM, direction control, feedback, limit switches, encoders and microcontrollers depending on the required speed, torque and positioning behavior.",
    priority: 9,
  },

  {
    id: "general-pcb-prototype",
    category: "general",
    question: "Should I test a circuit on a breadboard before making a PCB?",
    variations: [
      "Do I need a breadboard first",
      "Should I prototype before PCB",
      "Breadboard vs PCB",
      "Prototype testing before manufacturing",
    ],
    keywords: ["breadboard", "prototype", "pcb", "testing", "circuit"],
    answer:
      "For many projects, breadboard or modular prototyping is useful before committing to a PCB. It allows the basic circuit and firmware behavior to be tested and corrected before finalizing the board design.",
    priority: 8,
  },

  {
    id: "general-what-to-provide",
    category: "general",
    question: "What information should I provide for a project?",
    variations: [
      "What details do you need for my project",
      "What should I send when requesting a project",
      "How do I explain my electronics project",
      "What information is required",
    ],
    keywords: ["requirements", "details", "project", "information", "request"],
    answer:
      "Useful information includes the project goal, required features, expected inputs and outputs, preferred components if any, power source, approximate size, operating environment, deadline, budget range and any existing circuit, code, schematic or prototype.",
    priority: 10,
  },

  {
    id: "general-budget-unknown",
    category: "general",
    question: "What if I do not know my budget?",
    variations: [
      "I do not know my budget",
      "I have no budget estimate",
      "Can I submit without knowing cost",
      "I do not know how much my project should cost",
      "Can you estimate my project",
    ],
    keywords: ["budget", "unknown", "estimate", "cost", "price"],
    answer:
      "That is fine. Describe the project and its requirements first. If your budget is not decided, it can be left undecided where the request form allows it.",
    priority: 9,
  },

  {
    id: "general-deadline",
    category: "general",
    question: "Can I provide a project deadline?",
    variations: [
      "Can I specify a deadline",
      "I need the project urgently",
      "Can you build it by a certain date",
      "Where do I mention my deadline",
      "Can I request an urgent project",
    ],
    keywords: ["deadline", "urgent", "date", "timeline", "fast", "quick"],
    answer:
      "Yes. If you have a target date or deadline, include it in the request. The timeline can then be considered together with the project scope and complexity.",
    priority: 8,
  },

  {
    id: "general-after-submission",
    category: "general",
    question: "What happens after I submit a request?",
    variations: [
      "What happens after submitting",
      "What happens when I send the form",
      "What happens next",
      "What happens after my project request",
      "What do you do with my request",
    ],
    keywords: ["after", "submit", "submission", "next", "request", "form"],
    answer: `After submission, the request can be reviewed and followed up through ProjexiaHub's normal contact process. ProjexiaHub typically replies ${SITE.responseTime}.`,
    priority: 9,
  },

  {
    id: "general-no-response",
    category: "general",
    question: "What if I do not get a response?",
    variations: [
      "No reply from ProjexiaHub",
      "I did not hear back",
      "My email was not answered",
      "No response to my request",
    ],
    keywords: ["response", "reply", "answer", "request", "contact"],
    answer: `ProjexiaHub typically replies ${SITE.responseTime} to submitted requests. If you have not received a response, check the contact details were correct, look in your spam folder and send a polite follow-up with your original message details.`,
    priority: 9,
  },

  {
    id: "general-existing-project-upgrade",
    category: "general",
    question: "Can ProjexiaHub upgrade my existing circuit?",
    variations: [
      "Can you upgrade my project",
      "Can you modify my circuit",
      "Can you improve my existing hardware",
      "Can you add features to my project",
    ],
    keywords: ["upgrade", "modify", "improve", "existing", "circuit"],
    answer:
      "Yes. Existing projects can be reviewed for hardware, wiring, firmware, performance, reliability or feature improvements. Providing the current circuit, code, photos, symptoms and desired changes makes evaluation easier.",
    priority: 9,
  },

  {
    id: "general-electronics-basics",
    category: "general",
    question: "Does ProjexiaHub explain electronics basics?",
    variations: [
      "Can you teach electronics",
      "Do you explain how circuits work",
      "Can you help me learn electronics",
      "Do you provide tutorials",
    ],
    keywords: ["explain", "learn", "teach", "tutorial", "basics"],
    answer:
      "The Help Assistant can answer general questions about electronics, embedded systems, sensors, microcontrollers, communication and related topics from the local knowledge library.",
    priority: 8,
  },

  {
    id: "general-arduino-vs-esp32",
    category: "general",
    question: "Arduino vs ESP32 - which should I use?",
    variations: [
      "Should I use Arduino or ESP32",
      "Which is better Arduino or ESP32",
      "ESP32 versus Arduino",
      "What board should I choose",
    ],
    keywords: ["arduino", "esp32", "board", "choose", "wifi"],
    answer:
      "Neither is universally better. Arduino boards can be convenient for straightforward embedded projects, while ESP32 boards are particularly useful when wireless connectivity or greater processing capability is needed. The correct choice depends on the project requirements.",
    priority: 10,
  },

  {
    id: "general-microcontroller-vs-pi",
    category: "general",
    question:
      "What is the difference between a microcontroller and Raspberry Pi?",
    variations: [
      "Microcontroller vs Raspberry Pi",
      "Arduino vs Raspberry Pi",
      "Which is better MCU or Pi",
      "Do I need a Pi or Arduino",
    ],
    keywords: ["microcontroller", "raspberry", "pi", "arduino", "difference"],
    answer:
      "A microcontroller runs a single program with deterministic timing and low power. A Raspberry Pi is a small computer that runs an operating system and is suitable when more processing power, networking or a full OS is needed.",
    priority: 9,
  },

  {
    id: "general-power-supply",
    category: "general",
    question: "How do I choose a power supply for my project?",
    variations: [
      "What power supply do I need",
      "How many amps should my supply provide",
      "Can I use a phone charger",
      "How to size a power supply",
    ],
    keywords: ["power", "supply", "voltage", "current", "adapter"],
    answer:
      "Choose a supply with the correct voltage and enough current capability for the worst-case load, including startup or peak currents. Also consider connector type, polarity, regulation, noise and safety requirements.",
    priority: 9,
  },

  {
    id: "general-battery",
    category: "general",
    question: "How do I choose a battery for my project?",
    variations: [
      "What battery should I use",
      "How do I select battery capacity",
      "How much battery capacity do I need",
      "What battery is suitable for my project",
    ],
    keywords: ["battery", "capacity", "voltage", "current", "power"],
    answer:
      "Battery selection depends on required voltage, average and peak current, operating time, physical constraints, charging requirements and the battery chemistry. Capacity alone is not enough; discharge capability and safe charging also matter.",
    priority: 9,
  },

  {
    id: "general-enclosure",
    category: "general",
    question: "How do I choose an enclosure for my project?",
    variations: [
      "What box should I use",
      "Enclosure selection",
      "How to house electronics",
      "IP rating enclosure",
    ],
    keywords: ["enclosure", "box", "housing", "ip", "protection"],
    answer:
      "Enclosure selection depends on size, material, mounting, environmental protection, ventilation, cable entry, accessibility and appearance. For outdoor or industrial use, consider IP ratings and appropriate sealing or cooling.",
    priority: 8,
  },

  {
    id: "general-weatherproofing",
    category: "general",
    question: "How do I make my project weatherproof?",
    variations: [
      "Can I use my project outdoors",
      "How to protect electronics from water",
      "Weatherproof enclosure",
      "Outdoor electronics protection",
    ],
    keywords: ["weatherproof", "outdoor", "water", "protection", "ip"],
    answer:
      "Weatherproofing can include an IP-rated enclosure, conformal coating, gaskets, cable glands and careful sealing. The required protection depends on the environment and exposure.",
    priority: 8,
  },

  {
    id: "general-testing",
    category: "general",
    question: "How should I test an electronic circuit?",
    variations: [
      "How to test a new circuit",
      "Circuit testing procedure",
      "How to verify a design",
      "Bench testing electronics",
    ],
    keywords: ["test", "testing", "circuit", "verify", "bench"],
    answer:
      "Test in stages: verify power and ground, check no-load voltages, confirm each subsystem independently, then test the complete system under expected conditions. Use appropriate instruments and compare measurements against design expectations.",
    priority: 10,
  },

  {
    id: "general-tools",
    category: "general",
    question: "What tools do I need for electronics work?",
    variations: [
      "Basic electronics tools",
      "What tools for soldering",
      "Recommended tools for circuit building",
      "Starter electronics toolkit",
    ],
    keywords: ["tools", "soldering", "multimeter", "pliers", "workbench"],
    answer:
      "Common tools include a soldering iron, multimeter, wire cutters, pliers, screwdrivers, helping hands or vice, solder, flux, heat shrink and a power supply or test source. The exact tools depend on the type of work being done.",
    priority: 8,
  },

  {
    id: "general-safety",
    category: "general",
    question: "What safety precautions should I take with electronics?",
    variations: [
      "Electronics safety tips",
      "How to work safely with electricity",
      "Mains voltage safety",
      "Battery safety",
    ],
    keywords: ["safety", "electricity", "mains", "battery", "protection"],
    answer:
      "Work with low voltages when learning, disconnect power before modifying circuits, use appropriate insulation and enclosures for mains, protect batteries from short circuits and overheating, and never rely only on software for safety-critical functions.",
    priority: 10,
  },

  {
    id: "general-warranty-vs-guarantee",
    category: "general",
    question: "What is the difference between warranty and guarantee?",
    variations: [
      "Warranty vs guarantee",
      "Do you guarantee your work",
      "Is there a guarantee",
      "What happens if the project fails",
    ],
    keywords: ["warranty", "guarantee", "difference", "work", "fails"],
    answer:
      "Warranty and guarantee terms depend on the specific project and current ProjexiaHub policy. Contact ProjexiaHub directly for the applicable terms.",
    priority: 8,
  },

  {
    id: "general-delivery",
    category: "general",
    question: "Do you deliver projects?",
    variations: [
      "Can you ship my project",
      "Do you deliver to my location",
      "How do I receive my project",
      "Project delivery options",
    ],
    keywords: ["delivery", "ship", "receive", "location", "options"],
    answer:
      "Delivery arrangements depend on the project and location. Contact ProjexiaHub directly to discuss how the finished project will be delivered.",
    priority: 8,
  },

  {
    id: "general-meeting",
    category: "general",
    question: "Can I schedule a meeting?",
    variations: [
      "Can I book a meeting",
      "Can we discuss my project",
      "Can I have a consultation",
      "How do I schedule a meeting",
    ],
    keywords: ["meeting", "schedule", "consultation", "discuss", "book"],
    answer:
      "Meeting arrangements depend on availability and the purpose. Use the contact options on the website to request a meeting or discussion.",
    priority: 8,
  },

  {
    id: "general-installation",
    category: "general",
    question: "Do you install projects on-site?",
    variations: [
      "Can you install my project",
      "Do you do on-site work",
      "Can you set up the system",
      "Installation service",
    ],
    keywords: ["installation", "install", "site", "setup", "service"],
    answer:
      "Installation arrangements depend on the project scope and location. Contact ProjexiaHub directly to discuss on-site requirements.",
    priority: 8,
  },

  {
    id: "general-training",
    category: "general",
    question: "Do you provide training?",
    variations: [
      "Can you train me on the project",
      "Do you offer training",
      "Can you teach me how to use it",
      "Project handover training",
    ],
    keywords: ["training", "teach", "learn", "handover", "use"],
    answer:
      "Training or handover arrangements depend on the project. Mention your requirements in the project request or contact ProjexiaHub directly.",
    priority: 7,
  },

  {
    id: "general-documentation-delivery",
    category: "general",
    question: "What documentation is provided with a project?",
    variations: [
      "What documents do I get",
      "Do I get wiring diagrams",
      "What documentation is included",
      "Project documentation handover",
    ],
    keywords: ["documentation", "documents", "wiring", "diagrams", "handover"],
    answer:
      "Relevant schematics, wiring information and source code are handed over where applicable. The exact documentation depends on the project scope.",
    priority: 9,
  },

  {
    id: "general-future-updates",
    category: "general",
    question: "Can the project be updated later?",
    variations: [
      "Can I add features later",
      "Can the project be upgraded",
      "Future modifications",
      "Can you update the firmware later",
    ],
    keywords: ["update", "upgrade", "future", "modify", "firmware"],
    answer:
      "Yes. Projects can often be updated or extended later. Discuss future requirements during planning so the design can accommodate changes where practical.",
    priority: 8,
  },

  {
    id: "general-scalability",
    category: "general",
    question: "Can the project be expanded later?",
    variations: [
      "Can I add more sensors later",
      "Can the system grow",
      "Scalability of the project",
      "Can I expand the system",
    ],
    keywords: ["expand", "scale", "grow", "add", "sensors"],
    answer:
      "Scalability depends on the design. Using modular architecture, appropriate communication and sufficient I/O capacity can make future expansion easier.",
    priority: 8,
  },

  {
    id: "general-support",
    category: "general",
    question: "Do you provide support after the project?",
    variations: [
      "Post project support",
      "Can I get help after delivery",
      "Do you offer after-sales support",
      "Support after completion",
    ],
    keywords: ["support", "after", "delivery", "post", "help"],
    answer:
      "Support arrangements depend on the project and current ProjexiaHub policy. Contact ProjexiaHub directly to discuss post-project support.",
    priority: 9,
  },

  {
    id: "general-maintenance",
    category: "general",
    question: "Do you provide maintenance?",
    variations: [
      "Can you maintain my project",
      "Do you offer maintenance service",
      "Project maintenance",
      "Long term maintenance",
    ],
    keywords: ["maintenance", "service", "long", "term", "project"],
    answer:
      "Maintenance arrangements depend on the project. Contact ProjexiaHub directly to discuss maintenance requirements.",
    priority: 8,
  },

  {
    id: "general-repair",
    category: "general",
    question: "Can you repair my project?",
    variations: [
      "Can you fix my circuit",
      "My project is broken",
      "Repair service",
      "Can you fix electronics",
    ],
    keywords: ["repair", "fix", "broken", "service", "circuit"],
    answer:
      "Repair feasibility depends on the project and the fault. Provide details about the problem and any relevant photos or measurements when contacting ProjexiaHub.",
    priority: 9,
  },

  {
    id: "general-components",
    category: "general",
    question: "Can ProjexiaHub supply components?",
    variations: [
      "Do you provide parts",
      "Can you buy components for me",
      "Do you source components",
      "Component procurement",
    ],
    keywords: ["components", "parts", "supply", "source", "procurement"],
    answer:
      "Component sourcing can be part of a project depending on the arrangement. Discuss your requirements in the project request or contact ProjexiaHub directly.",
    priority: 8,
  },

  {
    id: "general-firmware-update",
    category: "general",
    question: "Can the firmware be updated later?",
    variations: [
      "Can I update the firmware",
      "Firmware update support",
      "Can you change the code later",
      "Future firmware changes",
    ],
    keywords: ["firmware", "update", "code", "change", "future"],
    answer:
      "Firmware updates can be possible depending on the project design and arrangement. Discuss update requirements during project planning.",
    priority: 9,
  },

  {
    id: "general-wireless",
    category: "general",
    question: "Can ProjexiaHub build wireless projects?",
    variations: [
      "Do you make wireless devices",
      "Can you build WiFi projects",
      "Can you make Bluetooth projects",
      "Wireless communication projects",
    ],
    keywords: ["wireless", "wifi", "bluetooth", "communication", "projects"],
    answer:
      "Yes. Wireless projects can use Wi-Fi, Bluetooth, LoRa, cellular or other communication technologies depending on range, data rate, power and infrastructure requirements.",
    priority: 9,
  },

  {
    id: "general-cellular",
    category: "general",
    question: "Can ProjexiaHub build cellular projects?",
    variations: [
      "Do you work with 4G modules",
      "Can you make a GSM project",
      "Cellular IoT project",
      "Can you build LTE devices",
    ],
    keywords: ["cellular", "gsm", "lte", "4g", "iot"],
    answer:
      "Cellular connectivity can be used for projects requiring wide-area coverage. The modem, data plan, power requirements and application architecture should be considered.",
    priority: 8,
  },

  {
    id: "general-lora",
    category: "general",
    question: "Can ProjexiaHub build LoRa projects?",
    variations: [
      "Do you make LoRa devices",
      "Can you build long range wireless",
      "LoRaWAN project",
      "Long range IoT",
    ],
    keywords: ["lora", "lorawan", "long", "range", "wireless"],
    answer:
      "Yes. LoRa and LoRaWAN can be used for long-range, low-power IoT applications such as remote sensing and monitoring.",
    priority: 8,
  },

  {
    id: "general-ai-ml",
    category: "general",
    question: "Can ProjexiaHub build AI or machine learning projects?",
    variations: [
      "Do you work with AI",
      "Can you make machine learning projects",
      "Edge AI project",
      "TinyML project",
    ],
    keywords: ["ai", "machine", "learning", "edge", "tinyml"],
    answer:
      "Some embedded projects can include simple machine learning or edge AI. Feasibility depends on the processing power, memory and specific application requirements.",
    priority: 8,
  },

  {
    id: "general-robotics",
    category: "general",
    question: "Can ProjexiaHub build robotics projects?",
    variations: [
      "Do you make robots",
      "Can you build a robot",
      "Robotics project",
      "Can you automate a machine",
    ],
    keywords: ["robotics", "robot", "automation", "machine", "control"],
    answer:
      "Robotics and motion-control projects can involve microcontrollers, motor drivers, sensors, feedback and communication. The approach depends on the required behavior and environment.",
    priority: 9,
  },

  {
    id: "general-drone",
    category: "general",
    question: "Can ProjexiaHub build drone projects?",
    variations: [
      "Do you make drones",
      "Can you build a UAV",
      "Drone electronics",
      "Can you work on flight controllers",
    ],
    keywords: ["drone", "uav", "flight", "controller", "robotics"],
    answer:
      "Drone and UAV projects involve flight controllers, sensors, communication and power systems. Feasibility depends on the specific requirements and regulatory considerations.",
    priority: 8,
  },

  {
    id: "general-smart-home",
    category: "general",
    question: "Can ProjexiaHub build smart home projects?",
    variations: [
      "Do you make smart home devices",
      "Can you automate my home",
      "Home automation project",
      "Smart home system",
    ],
    keywords: ["smart", "home", "automation", "iot", "devices"],
    answer:
      "Yes. Smart home projects can include lighting, sensors, appliances, security and connected control using Wi-Fi, Bluetooth, Zigbee or other technologies.",
    priority: 9,
  },

  {
    id: "general-industrial",
    category: "general",
    question: "Can ProjexiaHub build industrial projects?",
    variations: [
      "Do you work on industrial systems",
      "Industrial automation project",
      "Can you build industrial controllers",
      "Factory automation",
    ],
    keywords: ["industrial", "automation", "factory", "control", "plc"],
    answer:
      "Industrial projects can involve PLCs, industrial communication, sensors, motor control and robust enclosures. Requirements and safety standards should be discussed.",
    priority: 8,
  },

  {
    id: "general-medical",
    category: "general",
    question: "Can ProjexiaHub build medical projects?",
    variations: [
      "Do you make medical devices",
      "Medical electronics project",
      "Healthcare device",
      "Can you build medical equipment",
    ],
    keywords: ["medical", "healthcare", "device", "electronics", "safety"],
    answer:
      "Medical and healthcare-related electronics may involve additional regulatory, safety and reliability requirements. Discuss the specific application with ProjexiaHub.",
    priority: 7,
  },

  {
    id: "general-automotive",
    category: "general",
    question: "Can ProjexiaHub build automotive projects?",
    variations: [
      "Do you work on automotive electronics",
      "Car electronics project",
      "Automotive control",
      "Can you build vehicle systems",
    ],
    keywords: ["automotive", "car", "vehicle", "electronics", "control"],
    answer:
      "Automotive projects may involve specific voltage ranges, communication protocols, environmental requirements and safety standards. Discuss the specific application with ProjexiaHub.",
    priority: 7,
  },

  {
    id: "general-agriculture",
    category: "general",
    question: "Can ProjexiaHub build agriculture projects?",
    variations: [
      "Do you make agriculture systems",
      "Smart farming project",
      "Irrigation automation",
      "Agriculture IoT",
    ],
    keywords: ["agriculture", "farming", "irrigation", "iot", "automation"],
    answer:
      "Agriculture projects can include sensors, irrigation control, monitoring and automation. The approach depends on the environment, power availability and required reliability.",
    priority: 8,
  },

  {
    id: "general-security",
    category: "general",
    question: "Can ProjexiaHub build security projects?",
    variations: [
      "Do you make security systems",
      "Alarm system project",
      "Access control system",
      "Security automation",
    ],
    keywords: ["security", "alarm", "access", "control", "system"],
    answer:
      "Security projects can include alarms, access control, sensors, cameras and communication. The design should consider reliability, tamper resistance and power backup.",
    priority: 9,
  },

  {
    id: "general-monitoring",
    category: "general",
    question: "Can ProjexiaHub build monitoring systems?",
    variations: [
      "Do you make monitoring devices",
      "Remote monitoring project",
      "Sensor monitoring system",
      "Data logging system",
    ],
    keywords: ["monitoring", "remote", "sensor", "logging", "system"],
    answer:
      "Monitoring systems can measure temperature, humidity, pressure, motion, current and other values. Data can be logged locally or transmitted for remote access.",
    priority: 9,
  },

  {
    id: "general-control",
    category: "general",
    question: "Can ProjexiaHub build control systems?",
    variations: [
      "Do you make control systems",
      "Process control project",
      "Closed loop control",
      "Controller design",
    ],
    keywords: ["control", "system", "closed", "loop", "controller"],
    answer:
      "Control systems can use sensors, microcontrollers and actuators to regulate temperature, speed, position, flow or other variables. The control strategy depends on the application.",
    priority: 9,
  },

  {
    id: "general-data-logging",
    category: "general",
    question: "Can ProjexiaHub build data logging systems?",
    variations: [
      "Do you make data loggers",
      "Sensor data logging project",
      "Record data system",
      "Data acquisition",
    ],
    keywords: ["data", "logging", "logger", "record", "acquisition"],
    answer:
      "Data logging systems can record sensor values to SD card, flash, EEPROM or a network service. Timestamps, storage capacity and power requirements should be considered.",
    priority: 9,
  },

  {
    id: "general-display",
    category: "general",
    question: "Can ProjexiaHub add a display to my project?",
    variations: [
      "Can you add a screen",
      "Display for my project",
      "Can you use an LCD or OLED",
      "User interface display",
    ],
    keywords: ["display", "screen", "lcd", "oled", "interface"],
    answer:
      "Yes. Displays can be added for status, data, menus or user interaction. The choice depends on size, readability, interface and power requirements.",
    priority: 8,
  },

  {
    id: "general-user-interface",
    category: "general",
    question: "Can ProjexiaHub design a user interface for my project?",
    variations: [
      "Can you make a user interface",
      "Buttons and display design",
      "How will I control the system",
      "User interaction design",
    ],
    keywords: ["user", "interface", "buttons", "display", "control"],
    answer:
      "Yes. User interfaces can include buttons, switches, displays, touch, mobile apps or web interfaces depending on the project and user requirements.",
    priority: 8,
  },

  {
    id: "general-mobile-app",
    category: "general",
    question: "Can ProjexiaHub build a mobile app for my project?",
    variations: [
      "Can you make an app",
      "Mobile app for device",
      "Phone control app",
      "Android iOS app",
    ],
    keywords: ["mobile", "app", "android", "ios", "control"],
    answer:
      "Mobile app development depends on the project scope. Some projects can use existing apps or web interfaces; others may need a custom app. Discuss requirements with ProjexiaHub.",
    priority: 8,
  },

  {
    id: "general-web-dashboard",
    category: "general",
    question: "Can ProjexiaHub build a web dashboard?",
    variations: [
      "Can you make a web interface",
      "Dashboard for my device",
      "Web control panel",
      "Remote monitoring website",
    ],
    keywords: ["web", "dashboard", "interface", "monitoring", "control"],
    answer:
      "Web interfaces and dashboards can be added for monitoring and control. The approach depends on the device capability, connectivity and required features.",
    priority: 8,
  },

  {
    id: "general-cloud",
    category: "general",
    question: "Can ProjexiaHub connect my project to the cloud?",
    variations: [
      "Can you use cloud services",
      "Cloud connected device",
      "IoT cloud platform",
      "Remote data storage",
    ],
    keywords: ["cloud", "iot", "connected", "data", "platform"],
    answer:
      "Cloud connectivity can be added for remote monitoring, control, data storage or analytics. The platform and protocol depend on the project requirements.",
    priority: 9,
  },

  {
    id: "general-api",
    category: "general",
    question: "Can ProjexiaHub integrate with an API?",
    variations: [
      "Can you use an API",
      "API integration project",
      "Connect to external service",
      "Third party API",
    ],
    keywords: ["api", "integration", "service", "connect", "external"],
    answer:
      "API integration can be included depending on the project. Provide the API documentation and required behavior when discussing the project.",
    priority: 8,
  },

  {
    id: "general-database",
    category: "general",
    question: "Can ProjexiaHub work with databases?",
    variations: [
      "Can you store data in a database",
      "Database integration",
      "Data storage solution",
      "SQL database project",
    ],
    keywords: ["database", "data", "storage", "sql", "integration"],
    answer:
      "Database integration can be part of a larger system for storing and retrieving data. The database choice depends on the application and infrastructure.",
    priority: 7,
  },

  {
    id: "general-analytics",
    category: "general",
    question: "Can ProjexiaHub provide data analytics?",
    variations: [
      "Can you analyze data",
      "Data analytics project",
      "Dashboard analytics",
      "Usage reporting",
    ],
    keywords: ["analytics", "data", "analysis", "reporting", "dashboard"],
    answer:
      "Data analytics can be included for monitoring, reporting and insights. The scope depends on the data, processing requirements and desired output.",
    priority: 7,
  },

  {
    id: "general-notifications",
    category: "general",
    question: "Can ProjexiaHub add notifications to my project?",
    variations: [
      "Can you send alerts",
      "Notification system",
      "Email SMS alerts",
      "Push notifications",
    ],
    keywords: ["notifications", "alerts", "email", "sms", "push"],
    answer:
      "Notifications can be sent via email, SMS, push services or other channels depending on connectivity and requirements.",
    priority: 8,
  },

  {
    id: "general-remote-control",
    category: "general",
    question: "Can I control my project remotely?",
    variations: [
      "Remote control project",
      "Control from phone",
      "Remote access device",
      "Control over internet",
    ],
    keywords: ["remote", "control", "phone", "internet", "access"],
    answer:
      "Remote control can be added using network connectivity, mobile apps, web interfaces or cloud services. Security and fail-safe behavior should be considered.",
    priority: 9,
  },

  {
    id: "general-data-security",
    category: "general",
    question: "How is data secured in a project?",
    variations: [
      "Data security project",
      "Secure communication",
      "Encrypt data device",
      "Protect user data",
    ],
    keywords: ["security", "data", "encryption", "communication", "protect"],
    answer:
      "Data security can include encryption, authentication, secure storage and secure communication. The required measures depend on the sensitivity of the data and the threat model.",
    priority: 9,
  },

  {
    id: "general-updates",
    category: "general",
    question: "Can the device be updated remotely?",
    variations: [
      "Remote update project",
      "OTA update support",
      "Firmware update over internet",
      "Wireless update",
    ],
    keywords: ["update", "remote", "ota", "firmware", "wireless"],
    answer:
      "Remote updates can be supported where the hardware and connectivity allow. The update mechanism should include security and recovery features.",
    priority: 9,
  },

  {
    id: "general-scalable-architecture",
    category: "general",
    question: "How do I make my project scalable?",
    variations: [
      "Scalable project design",
      "Add more devices later",
      "Grow the system",
      "Future expansion",
    ],
    keywords: ["scalable", "expand", "grow", "future", "architecture"],
    answer:
      "Use modular design, appropriate communication, sufficient I/O and clear interfaces. Planning for growth reduces rework when requirements change.",
    priority: 8,
  },

  {
    id: "general-reliability",
    category: "general",
    question: "How do I make my project reliable?",
    variations: [
      "Improve reliability",
      "Robust design",
      "Prevent failures",
      "Long term reliability",
    ],
    keywords: ["reliability", "robust", "failures", "design", "long"],
    answer:
      "Use components within their ratings, provide stable power, manage heat, secure connections, minimize noise and test under realistic conditions.",
    priority: 9,
  },

  {
    id: "general-maintainability",
    category: "general",
    question: "How do I make my project maintainable?",
    variations: [
      "Maintainable design",
      "Easy to repair",
      "Serviceable project",
      "Documentation for maintenance",
    ],
    keywords: ["maintainable", "repair", "service", "documentation", "design"],
    answer:
      "Use modular design, clear documentation, accessible components and labeled connections. Good maintenance planning reduces downtime and cost.",
    priority: 8,
  },

  {
    id: "general-testability",
    category: "general",
    question: "How do I make my project testable?",
    variations: [
      "Testable design",
      "Add test points",
      "Diagnostic features",
      "How to test the system",
    ],
    keywords: ["testable", "test", "points", "diagnostics", "design"],
    answer:
      "Include test points, status indicators, diagnostic modes and modular subsystems. Design for testing from the beginning.",
    priority: 8,
  },

  {
    id: "general-documentation-design",
    category: "general",
    question: "What documentation should a project include?",
    variations: [
      "Project documentation",
      "What documents are needed",
      "Schematic and code documentation",
      "Handover documents",
    ],
    keywords: ["documentation", "schematic", "code", "handover", "project"],
    answer:
      "Documentation can include schematics, wiring diagrams, source code, build instructions, calibration data and user information. The exact set depends on the project.",
    priority: 8,
  },

  {
    id: "general-standards",
    category: "general",
    question: "What standards apply to electronics projects?",
    variations: [
      "Electronics standards",
      "Compliance requirements",
      "Safety standards",
      "EMC standards",
    ],
    keywords: ["standards", "compliance", "safety", "emc", "electronics"],
    answer:
      "Standards depend on the application and market, such as safety, EMC, radio and industry-specific requirements. These should be identified during project planning.",
    priority: 8,
  },

  {
    id: "general-certification",
    category: "general",
    question: "Can ProjexiaHub help with certification?",
    variations: [
      "Do you handle certification",
      "CE FCC certification",
      "Product certification",
      "Compliance testing",
    ],
    keywords: ["certification", "ce", "fcc", "compliance", "testing"],
    answer:
      "Certification requirements and support depend on the product and target market. Discuss certification needs with ProjexiaHub during planning.",
    priority: 8,
  },

  {
    id: "general-ip",
    category: "general",
    question: "Who owns the intellectual property?",
    variations: [
      "IP ownership",
      "Who owns the design",
      "Do I own the project",
      "Intellectual property rights",
    ],
    keywords: ["ip", "intellectual", "property", "ownership", "design"],
    answer:
      "Intellectual property arrangements depend on the project agreement. Discuss IP ownership with ProjexiaHub before starting the project.",
    priority: 9,
  },

  {
    id: "general-nda",
    category: "general",
    question: "Can we sign an NDA?",
    variations: [
      "Do you sign NDA",
      "Non disclosure agreement",
      "Confidential project",
      "Protect my idea",
    ],
    keywords: ["nda", "confidential", "agreement", "protect", "idea"],
    answer:
      "Confidentiality arrangements can be discussed with ProjexiaHub. Use the contact options to raise this before sharing sensitive information.",
    priority: 8,
  },

  {
    id: "general-idea-protection",
    category: "general",
    question: "How do I protect my project idea?",
    variations: [
      "Protect my idea",
      "Can someone steal my idea",
      "Confidentiality for project",
      "Idea ownership",
    ],
    keywords: ["idea", "protect", "confidential", "ownership", "project"],
    answer:
      "Discuss confidentiality and IP arrangements with ProjexiaHub before sharing sensitive details. Legal protection depends on your jurisdiction and circumstances.",
    priority: 9,
  },

  {
    id: "general-competition",
    category: "general",
    question: "Can ProjexiaHub build competition projects?",
    variations: [
      "Competition project",
      "Hackathon project",
      "Science fair project",
      "Robotics competition",
    ],
    keywords: ["competition", "hackathon", "science", "fair", "robotics"],
    answer:
      "Competition and educational projects can be supported. Provide the competition requirements and deadline when submitting the project request.",
    priority: 8,
  },

  {
    id: "general-bulk",
    category: "general",
    question: "Can ProjexiaHub produce multiple units?",
    variations: [
      "Can you make multiple copies",
      "Bulk production",
      "Small batch manufacturing",
      "Quantity production",
    ],
    keywords: ["bulk", "multiple", "production", "quantity", "units"],
    answer:
      "Small-batch or multiple-unit production can be discussed depending on the design, components and quantity. PCB assembly and enclosure production may also be involved.",
    priority: 8,
  },

  {
    id: "general-manufacturing",
    category: "general",
    question: "Can ProjexiaHub help with manufacturing?",
    variations: [
      "Manufacturing support",
      "Produce my design",
      "PCB assembly service",
      "Production help",
    ],
    keywords: ["manufacturing", "production", "assembly", "pcb", "design"],
    answer:
      "Manufacturing support depends on the project and scope. PCB fabrication, assembly and enclosure production can be discussed with ProjexiaHub.",
    priority: 8,
  },

  {
    id: "general-quality",
    category: "general",
    question: "How do you ensure quality?",
    variations: [
      "Quality assurance",
      "Testing and quality",
      "How do you check the project",
      "Quality control",
    ],
    keywords: ["quality", "assurance", "testing", "control", "check"],
    answer:
      "Quality practices include design review, testing, inspection and verification against requirements. The exact process depends on the project.",
    priority: 9,
  },
] as const;
