import type { HelpEntry } from "./types";
import { SITE } from "../site";

export const REQUEST_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // HOW TO START / SUBMIT
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-request-how",
    category: "requests",
    intent: "project_request",
    question: "How can I request a project?",
    variations: [
      "How can I request a project",
      "How do I request a project",
      "How do I submit a project",
      "How can I submit a project",
      "How do I place a project request",
      "How can I send a project request",
      "Where can I request a project",
      "Where can I submit a project",
      "How do I start a project request",
      "How can I ask MECTEC for a project",
      "How do I get a project made",
      "How can I get a project made",
    ],
    keywords: ["project", "request", "submit", "send", "form"],
    answer:
      "Use the Project Request option in the MECTEC website navigation to open the project request form. Fill in the available project details and submit your request.",
    priority: 20,
  },

  {
    id: "request-how-to-start",
    category: "requests",
    intent: "project_request",
    question: "How do I start a project?",
    variations: [
      "How do I start a project",
      "How can I start a project",
      "How do I start a project with MECTEC",
      "How do I begin a project",
      "How to start a project",
      "I want to start a project",
      "How do I request work",
      "Start a new project",
      "I want MECTEC to build something",
      "Where do I start",
      "How do I commission a project",
      "I want to order a custom project",
    ],
    keywords: [
      "request",
      "project",
      "start",
      "submit",
      "commission",
      "order",
      "idea",
    ],
    answer:
      "Start by opening the project request form and describing what you want the system to do. Provide as much useful information as you can about the idea, requirements, platform, budget and timeline. Fields that do not apply can be left optional where available.",
    priority: 20,
  },

  {
    id: "request-incomplete-idea",
    category: "requests",
    intent: "project_request",
    question: "Can I submit an incomplete project idea?",
    variations: [
      "Can I submit an incomplete project idea",
      "My idea is not complete",
      "I only have a basic idea",
      "I do not know exactly what I want",
      "Can I submit a rough idea",
      "I only know what the project should do",
      "Can you help define my project",
      "I do not know the components yet",
    ],
    keywords: [
      "idea",
      "rough",
      "incomplete",
      "basic",
      "components",
      "requirements",
    ],
    answer:
      "Yes. A rough description is enough to start. Explain the result or behavior you want from the system. You do not need to know every component, board or technical detail before submitting a request.",
    priority: 20,
  },

  {
    id: "request-existing-prototype",
    category: "requests",
    intent: "project_request",
    question: "Can I submit a project I already started?",
    variations: [
      "Can I submit a project I already started",
      "I already have a prototype",
      "I already built part of it",
      "Can you finish my project",
      "Can you work on existing hardware",
      "I have existing code",
      "I already have the circuit",
      "Can you fix or complete my prototype",
    ],
    keywords: [
      "existing",
      "prototype",
      "already",
      "code",
      "hardware",
      "circuit",
      "finish",
    ],
    answer:
      "Yes. If you already have hardware, code, a circuit, a prototype or a partially completed project, describe what you already have and what remains to be completed. The request form can be used to provide those details and relevant photos.",
    priority: 15,
  },

  {
    id: "request-components",
    category: "requests",
    intent: "project_request",
    question: "Do I need to choose the components?",
    variations: [
      "Do I need to choose the components",
      "Do I have to select components",
      "Who chooses the components",
      "Can MECTEC choose the parts",
      "I do not know which components to buy",
      "Can you recommend hardware",
      "Do I need to specify Arduino or ESP32",
    ],
    keywords: [
      "components",
      "parts",
      "hardware",
      "arduino",
      "esp32",
      "choose",
      "select",
    ],
    answer:
      "No. If you are unsure about the hardware, explain the required functionality instead. Component and platform selection can be based on the project requirements.",
    priority: 15,
  },

  {
    id: "request-photos",
    category: "requests",
    intent: "project_request",
    question: "Can I attach photos to my request?",
    variations: [
      "Can I attach photos to my request",
      "Can I upload images",
      "Can I send photos",
      "Can I attach pictures",
      "Can I upload my circuit",
      "Can I send a prototype photo",
      "Can I show my existing hardware",
    ],
    keywords: [
      "photo",
      "photos",
      "image",
      "images",
      "upload",
      "attach",
      "prototype",
      "hardware",
    ],
    answer:
      "Yes. If your request involves existing hardware, wiring, a prototype, a circuit or another physical setup, relevant photos can help explain the current situation.",
    priority: 13,
  },

  {
    id: "request-project-description",
    category: "requests",
    intent: "project_requirements",
    question: "What should I include in my project request?",
    variations: [
      "What should I include in my project request",
      "What information should I provide",
      "What details do you need",
      "What should I write in the request",
      "How should I describe my project",
      "What information is required",
      "What do you need from me",
    ],
    keywords: [
      "information",
      "details",
      "description",
      "requirements",
      "request",
      "project",
    ],
    answer:
      "Include the goal of the project, what you want it to do, important features, any hardware or code you already have, preferred platform if known, budget range if available, and deadline if you have one. More useful detail generally makes it easier to understand the request.",
    priority: 15,
  },

  {
    id: "project-request-information",
    category: "requests",
    intent: "project_requirements",
    question: "What information should I provide for a project?",
    variations: [
      "What information should I provide for a project",
      "What details do you need for my project",
      "What information do you need for my project",
      "What should I include in my project request",
      "What details should I send",
      "What do you need to know about my project",
      "What information is required for a project",
      "What details should I provide",
      "What should I tell you about my project",
      "What information do I need to give for a project",
    ],
    keywords: [
      "project",
      "information",
      "details",
      "requirements",
      "features",
      "goal",
      "deadline",
      "budget",
    ],
    answer:
      "Useful information includes the project goal, required features, expected inputs and outputs, preferred components if any, power source, approximate size, operating environment, deadline, budget range, and any existing circuit, code, schematic, or prototype.",
    priority: 20,
  },

  // ─────────────────────────────────────────────────────────────
  // FORM USAGE / FIELDS
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-form-location",
    category: "requests",
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
    priority: 15,
  },

  {
    id: "request-form-fields",
    category: "requests",
    intent: "project_request",
    question: "What fields are in the request form?",
    variations: [
      "What fields are in the request form",
      "What does the form ask",
      "What fields are required",
      "Form details",
      "Request form contents",
    ],
    keywords: ["form", "fields", "required", "details", "request"],
    answer:
      "The form typically asks for project description, requirements, preferred platform, budget and timeline information. The exact fields depend on the current form design.",
    priority: 13,
  },

  {
    id: "request-optional-fields",
    category: "requests",
    intent: "project_request",
    question: "Can I skip optional fields?",
    variations: [
      "Can I skip optional fields",
      "Are all fields required",
      "Can I leave fields empty",
      "Optional fields in form",
      "Do I need to fill everything",
    ],
    keywords: ["optional", "fields", "required", "skip", "form"],
    answer:
      "Optional fields can be left blank. Providing as much relevant information as possible helps with understanding and planning.",
    priority: 10,
  },

  {
    id: "request-budget-optional",
    category: "requests",
    intent: "project_request",
    question: "Do I need to know my budget before submitting?",
    variations: [
      "Do I need to know my budget before submitting",
      "Can I submit without a budget",
      "What if I do not know my budget",
      "Is budget required",
      "I have no idea about the cost",
      "Can I leave budget undecided",
      "I do not know how much it should cost",
    ],
    keywords: ["budget", "cost", "price", "required", "undecided", "unknown"],
    answer:
      "You can submit a request even if your budget is not decided yet. A budget range is useful when available because it helps identify practical component and implementation options.",
    priority: 15,
  },

  {
    id: "request-deadline",
    category: "requests",
    intent: "project_request",
    question: "Can I provide a project deadline?",
    variations: [
      "Can I provide a project deadline",
      "Can I specify a deadline",
      "I need the project urgently",
      "Can you build it by a certain date",
      "Where do I mention my deadline",
      "Can I request an urgent project",
      "Do you accept deadline requirements",
    ],
    keywords: ["deadline", "urgent", "date", "timeline", "fast", "quick"],
    answer:
      "Yes. If you have a target date or deadline, include it in the request. The timeline can then be considered together with the project scope and complexity.",
    priority: 13,
  },

  {
    id: "request-urgent",
    category: "requests",
    intent: "project_request",
    question: "Can I mark my request as urgent?",
    variations: [
      "Can I mark my request as urgent",
      "Urgent request",
      "I need it fast",
      "Rush project request",
      "Time sensitive project",
    ],
    keywords: ["urgent", "rush", "fast", "request", "sensitive"],
    answer:
      "You can indicate urgency and provide a deadline in the request. Whether it is practical depends on scope, component availability and current capacity.",
    priority: 15,
  },

  {
    id: "request-attachment-types",
    category: "requests",
    intent: "project_request",
    question: "What files can I attach to my request?",
    variations: [
      "What files can I attach to my request",
      "Can I upload PDF",
      "What file types can I send",
      "Attachment formats",
      "Upload schematic",
    ],
    keywords: ["attach", "files", "upload", "formats", "schematic"],
    answer:
      "Relevant files such as photos, schematics, code files or documents can help explain the project. Accepted formats depend on the form.",
    priority: 10,
  },

  {
    id: "request-attachment-size",
    category: "requests",
    intent: "project_request",
    question: "Is there a limit on attachments?",
    variations: [
      "Is there a limit on attachments",
      "Maximum file size",
      "Attachment size limit",
      "How many photos can I send",
      "Upload limit",
    ],
    keywords: ["attachment", "size", "limit", "upload", "maximum"],
    answer:
      "Attachment size and count limits depend on the form. If your files are large, you may need to compress them or share them through another method.",
    priority: 10,
  },

  {
    id: "request-form-help",
    category: "requests",
    intent: "project_request",
    question: "Can I get help filling the request form?",
    variations: [
      "Can I get help filling the request form",
      "Help with form",
      "Assistance submitting request",
      "Guidance for form",
      "How to complete request",
    ],
    keywords: ["help", "form", "assistance", "guidance", "request"],
    answer:
      "Yes. If you need help with the form, use the contact options to reach MECTEC for guidance.",
    priority: 10,
  },

  {
    id: "request-revision",
    category: "requests",
    intent: "project_request",
    question: "Can I update my request after submitting it?",
    variations: [
      "Can I update my request after submitting it",
      "Can I change my request",
      "Can I edit after submitting",
      "Update project request",
      "Modify submitted request",
    ],
    keywords: ["update", "edit", "change", "request", "submit"],
    answer:
      "If you need to update your request, contact MECTEC with the new information. Changes can be considered as part of the project discussion.",
    priority: 15,
  },

  {
    id: "request-duplicate",
    category: "requests",
    intent: "project_request",
    question: "What if I accidentally submit twice?",
    variations: [
      "What if I accidentally submit twice",
      "Duplicate request",
      "I submitted twice",
      "Form submitted multiple times",
      "Double submission",
    ],
    keywords: ["duplicate", "submit", "twice", "multiple", "request"],
    answer:
      "If you submitted the same request more than once, contact MECTEC to clarify. They can consolidate the information and continue from a single request.",
    priority: 10,
  },

  {
    id: "request-confirmation",
    category: "requests",
    intent: "project_request",
    question: "Will I get a confirmation after submitting?",
    variations: [
      "Will I get a confirmation after submitting",
      "Submit confirmation",
      "Do I get a receipt",
      "Confirmation email",
      "Confirmation after request",
    ],
    keywords: ["confirmation", "submit", "receipt", "email", "request"],
    answer:
      "Confirmation behavior depends on the form and platform. If you are unsure whether the request was received, contact MECTEC directly.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // RESPONSE / FOLLOW-UP
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-response-time",
    category: "requests",
    intent: "project_request",
    question: "How long until I get a response?",
    variations: [
      "How long until I get a response",
      "Response time after request",
      "When will you reply",
      "How soon will I hear back",
      "Reply timeframe",
    ],
    keywords: ["response", "reply", "time", "request", "hear"],
    answer: `MECTEC typically replies ${SITE.responseTime} to submitted requests.`,
    priority: 15,
  },

  {
    id: "request-after-submission",
    category: "requests",
    intent: "project_request",
    question: "What happens after I submit a request?",
    variations: [
      "What happens after I submit a request",
      "What happens after submitting",
      "What happens when I send the form",
      "What happens next",
      "What happens after my project request",
      "What do you do with my request",
      "What is the next step",
    ],
    keywords: ["after", "submit", "submission", "next", "request", "form"],
    answer: `After submission, the request can be reviewed and followed up through MECTEC's normal contact process. MECTEC typically replies ${SITE.responseTime}.`,
    priority: 15,
  },

  {
    id: "request-follow-up",
    category: "requests",
    intent: "project_request",
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
    priority: 13,
  },

  {
    id: "request-no-response",
    category: "requests",
    intent: "project_request",
    question: "What if I do not get a response?",
    variations: [
      "What if I do not get a response",
      "No reply from MECTEC",
      "I did not hear back",
      "Request ignored",
      "No response to my request",
    ],
    keywords: ["response", "reply", "request", "contact", "hear"],
    answer: `MECTEC typically replies ${SITE.responseTime}. If you have not received a response, check your spam folder, verify contact details and send a polite follow-up.`,
    priority: 13,
  },

  {
    id: "request-status",
    category: "requests",
    intent: "project_request",
    question: "Can I check the status of my project request?",
    variations: [
      "Can I check the status of my project request",
      "Project request status",
      "How is my request going",
      "Check request progress",
      "Update on my request",
    ],
    keywords: ["status", "request", "progress", "check", "update"],
    answer:
      "Request status updates depend on the arrangement. Use the contact options to ask for an update on a submitted request.",
    priority: 13,
  },

  {
    id: "request-completion",
    category: "requests",
    intent: "project_request",
    question: "How will I know when the project is complete?",
    variations: [
      "How will I know when the project is complete",
      "Project completion notice",
      "How do I receive the finished project",
      "Completion update",
      "Final delivery",
    ],
    keywords: ["completion", "finished", "delivery", "notice", "project"],
    answer:
      "Completion and delivery arrangements depend on the project. Contact MECTEC for specific information about your request.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // MODIFICATION / CANCELLATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-scope-change",
    category: "requests",
    intent: "project_request",
    question: "Can I change the scope after submitting?",
    variations: [
      "Can I change the scope after submitting",
      "Change project scope",
      "Add features after request",
      "Modify requirements",
      "Adjust project later",
    ],
    keywords: ["scope", "change", "modify", "requirements", "project"],
    answer:
      "Scope changes can be discussed as part of the project planning. Changes may affect cost and timeline depending on when they are introduced.",
    priority: 13,
  },

  {
    id: "request-cancel",
    category: "requests",
    intent: "project_request",
    question: "Can I cancel my request?",
    variations: [
      "Can I cancel my request",
      "Cancel project request",
      "Withdraw request",
      "Stop the project",
      "Request cancellation",
    ],
    keywords: ["cancel", "request", "withdraw", "stop", "project"],
    answer:
      "Cancellation terms depend on the project stage and agreement. Contact MECTEC as soon as possible to discuss.",
    priority: 13,
  },

  {
    id: "request-modify",
    category: "requests",
    intent: "project_request",
    question: "Can I modify my request after submission?",
    variations: [
      "Can I modify my request after submission",
      "Update request",
      "Change project details",
      "Modify submitted request",
      "Amend request",
    ],
    keywords: ["modify", "update", "request", "change", "amend"],
    answer:
      "Yes. Contact MECTEC with the updated information. Changes can be considered as part of the project discussion.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // CONTACT PREFERENCE / PRIVACY / NDA
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-preferred-contact",
    category: "requests",
    intent: "project_request",
    question: "Can I choose how MECTEC contacts me?",
    variations: [
      "Can I choose how MECTEC contacts me",
      "Preferred contact method",
      "Email or phone",
      "How will you reply",
      "Contact preference",
    ],
    keywords: ["contact", "preferred", "email", "phone", "reply"],
    answer:
      "Contact preference can be indicated where the form allows. Otherwise, MECTEC will use the contact details provided.",
    priority: 10,
  },

  {
    id: "request-privacy",
    category: "requests",
    intent: "project_request",
    question: "Is my request information private?",
    variations: [
      "Is my request information private",
      "Is request confidential",
      "Will my idea be shared",
      "Privacy of project request",
      "Is my submission secure",
    ],
    keywords: ["privacy", "confidential", "secure", "request", "information"],
    answer:
      "Information handling depends on the website's current policies. For specific privacy questions, contact MECTEC directly.",
    priority: 13,
  },

  {
    id: "request-nda",
    category: "requests",
    intent: "project_request",
    question: "Can I submit under an NDA?",
    variations: [
      "Can I submit under an NDA",
      "NDA before submission",
      "Confidential request",
      "Sign NDA for project",
      "Protect idea in request",
    ],
    keywords: ["nda", "confidential", "request", "protect", "idea"],
    answer:
      "Confidentiality arrangements can be discussed with MECTEC. Contact MECTEC before sharing sensitive information if an NDA is required.",
    priority: 13,
  },

  {
    id: "request-idea-protection",
    category: "requests",
    intent: "project_request",
    question: "Is my idea protected when I submit it?",
    variations: [
      "Is my idea protected when I submit it",
      "Will my idea be stolen",
      "Protect my project idea",
      "Idea ownership in request",
      "Intellectual property in request",
    ],
    keywords: ["idea", "protect", "ownership", "request", "property"],
    answer:
      "Discuss confidentiality and IP arrangements with MECTEC before sharing sensitive details. Legal protection depends on your jurisdiction and circumstances.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PROJECT TYPES (REQUEST-ORIENTED)
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-project-type",
    category: "requests",
    intent: "project_request",
    question: "What types of projects can I request?",
    variations: [
      "What types of projects can I request",
      "What projects can I ask for",
      "What can I request",
      "Project types accepted",
      "Can I request anything",
    ],
    keywords: ["project", "types", "request", "accepted", "anything"],
    answer:
      "MECTEC can work on a wide range of electronics, embedded, automation, IoT, sensor, RFID and custom hardware/software projects. Describe your requirement and it can be evaluated.",
    priority: 15,
  },

  {
    id: "request-custom-idea",
    category: "requests",
    intent: "project_request",
    question: "Can I request something completely custom?",
    variations: [
      "Can I request something completely custom",
      "Custom project request",
      "Idea for a new device",
      "Build something unique",
      "Novel project request",
    ],
    keywords: ["custom", "unique", "request", "idea", "build"],
    answer:
      "Yes. Custom projects can be requested. Describe what the system should do, and the technical approach can be worked out as part of the project.",
    priority: 15,
  },

  {
    id: "request-existing-commercial",
    category: "requests",
    intent: "project_request",
    question: "Can you copy an existing product?",
    variations: [
      "Can you copy an existing product",
      "Clone a product",
      "Replicate existing device",
      "Copy design",
      "Build similar to product",
    ],
    keywords: ["copy", "clone", "replicate", "existing", "product"],
    answer:
      "Copying existing products may involve intellectual property and legal considerations. Discuss the specific situation with MECTEC before proceeding.",
    priority: 10,
  },

  {
    id: "request-not-sure-feasible",
    category: "requests",
    intent: "project_request",
    question: "What if I am not sure my project is possible?",
    variations: [
      "What if I am not sure my project is possible",
      "Is my idea possible",
      "Can you do this",
      "Feasibility of project",
      "Maybe impossible project",
    ],
    keywords: ["feasible", "possible", "idea", "project", "sure"],
    answer:
      "Submit the idea and requirements. Feasibility can be assessed based on the description, and alternatives can be discussed if needed.",
    priority: 15,
  },

  {
    id: "request-existing-code",
    category: "requests",
    intent: "project_request",
    question: "Can I submit my own code with the request?",
    variations: [
      "Can I submit my own code with the request",
      "Send existing code",
      "Upload firmware",
      "Provide code in request",
      "I have code already",
    ],
    keywords: ["code", "firmware", "submit", "existing", "request"],
    answer:
      "Yes. If you already have code, it can be provided along with the request so it can be reviewed or integrated where appropriate.",
    priority: 13,
  },

  {
    id: "request-existing-schematic",
    category: "requests",
    intent: "project_request",
    question: "Can I send my schematic or circuit diagram?",
    variations: [
      "Can I send my schematic or circuit diagram",
      "Upload schematic",
      "Send circuit diagram",
      "Provide wiring diagram",
      "I have a schematic",
    ],
    keywords: ["schematic", "circuit", "diagram", "wiring", "upload"],
    answer:
      "Yes. Providing a schematic or wiring diagram helps MECTEC understand the existing design and any changes required.",
    priority: 13,
  },

  {
    id: "request-existing-photos",
    category: "requests",
    intent: "project_request",
    question: "Should I include photos of my existing project?",
    variations: [
      "Should I include photos of my existing project",
      "Send photos of hardware",
      "Upload pictures of prototype",
      "Include images in request",
      "Photos of circuit",
    ],
    keywords: ["photos", "images", "hardware", "prototype", "circuit"],
    answer:
      "Yes. Photos of existing hardware, wiring, or prototype can clarify the current state and help identify what is needed.",
    priority: 13,
  },

  {
    id: "request-project-name",
    category: "requests",
    intent: "project_request",
    question: "Do I need to provide a project name?",
    variations: [
      "Do I need to provide a project name",
      "Project title required",
      "Name my project",
      "Project name optional",
      "Give project a title",
    ],
    keywords: ["project", "name", "title", "required", "optional"],
    answer:
      "A project name is optional but helpful. It can simplify communication and reference during discussions.",
    priority: 10,
  },

  {
    id: "request-use-case",
    category: "requests",
    intent: "project_request",
    question: "Should I describe the use case?",
    variations: [
      "Should I describe the use case",
      "Describe how project will be used",
      "Use case description",
      "Where project will be used",
      "Explain application",
    ],
    keywords: ["use", "case", "application", "describe", "project"],
    answer:
      "Yes. Describing how the project will be used and the environment helps ensure the design matches real conditions.",
    priority: 13,
  },

  {
    id: "request-inputs-outputs",
    category: "requests",
    intent: "project_request",
    question: "Should I list inputs and outputs?",
    variations: [
      "Should I list inputs and outputs",
      "List inputs outputs",
      "What does project connect to",
      "Sensors and actuators list",
      "Describe inputs outputs",
    ],
    keywords: ["inputs", "outputs", "sensors", "actuators", "connect"],
    answer:
      "Yes. Listing expected inputs (sensors, buttons, communication) and outputs (motors, relays, displays) helps define the design.",
    priority: 13,
  },

  {
    id: "request-interface",
    category: "requests",
    intent: "project_request",
    question: "Should I specify the user interface?",
    variations: [
      "Should I specify the user interface",
      "Buttons or display",
      "User interface requirements",
      "How will user interact",
      "Specify interface",
    ],
    keywords: ["interface", "user", "buttons", "display", "interaction"],
    answer:
      "Yes. Describing how the user will interact with the system (buttons, display, app, web) helps define the interface design.",
    priority: 10,
  },

  {
    id: "request-communication",
    category: "requests",
    intent: "project_request",
    question: "Should I specify wireless or network requirements?",
    variations: [
      "Should I specify wireless or network requirements",
      "WiFi Bluetooth needed",
      "Wireless requirement",
      "Communication needs",
      "Network connectivity",
    ],
    keywords: ["wireless", "wifi", "bluetooth", "communication", "network"],
    answer:
      "Yes. Mentioning whether the project needs Wi-Fi, Bluetooth, cellular, LoRa, or other connectivity affects the design.",
    priority: 13,
  },

  {
    id: "request-power",
    category: "requests",
    intent: "project_request",
    question: "Should I mention the power source?",
    variations: [
      "Should I mention the power source",
      "Mains or battery",
      "Power requirements",
      "How will project be powered",
      "Power source for project",
    ],
    keywords: ["power", "source", "battery", "mains", "requirements"],
    answer:
      "Yes. Specifying whether the project will run from mains, battery, USB, solar or another source affects the design.",
    priority: 13,
  },

  {
    id: "request-environment",
    category: "requests",
    intent: "project_request",
    question: "Should I describe the operating environment?",
    variations: [
      "Should I describe the operating environment",
      "Where will project be used",
      "Environment requirements",
      "Indoor or outdoor",
      "Operating conditions",
    ],
    keywords: ["environment", "operating", "indoor", "outdoor", "conditions"],
    answer:
      "Yes. Environment affects enclosure, temperature, IP rating and component selection. Describe where the project will be used.",
    priority: 13,
  },

  {
    id: "request-size",
    category: "requests",
    intent: "project_request",
    question: "Should I specify the physical size?",
    variations: [
      "Should I specify the physical size",
      "Size requirements",
      "Dimensions of project",
      "How big should it be",
      "Space constraints",
    ],
    keywords: ["size", "dimensions", "space", "physical", "constraints"],
    answer:
      "Yes. Physical size and mounting constraints affect component and enclosure selection.",
    priority: 10,
  },

  {
    id: "request-quantity",
    category: "requests",
    intent: "project_request",
    question: "Should I state how many units I need?",
    variations: [
      "Should I state how many units I need",
      "Quantity required",
      "How many devices",
      "One or many",
      "Production quantity",
    ],
    keywords: ["quantity", "units", "many", "one", "production"],
    answer:
      "Yes. Stating whether you need a single prototype or multiple units helps with planning and cost estimation.",
    priority: 13,
  },

  {
    id: "request-standards",
    category: "requests",
    intent: "project_request",
    question: "Should I mention standards or certifications?",
    variations: [
      "Should I mention standards or certifications",
      "Compliance requirements",
      "CE FCC needed",
      "Standards for project",
      "Certification needs",
    ],
    keywords: ["standards", "certification", "compliance", "ce", "fcc"],
    answer:
      "Yes. Mentioning any required standards or certifications helps ensure the design and process meet them.",
    priority: 13,
  },

  {
    id: "request-references",
    category: "requests",
    intent: "project_request",
    question: "Can I include reference designs or examples?",
    variations: [
      "Can I include reference designs or examples",
      "Reference project",
      "Similar existing device",
      "Example design",
      "Links to references",
    ],
    keywords: ["reference", "example", "similar", "design", "links"],
    answer:
      "Yes. Reference designs, similar products or examples can clarify expectations, though they do not guarantee identical results.",
    priority: 10,
  },

  {
    id: "request-constraints",
    category: "requests",
    intent: "project_request",
    question: "Should I mention constraints?",
    variations: [
      "Should I mention constraints",
      "Project constraints",
      "Limitations to consider",
      "Restrictions for project",
      "Constraints I have",
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
    id: "request-priority",
    category: "requests",
    intent: "project_request",
    question: "Can I indicate which features are essential?",
    variations: [
      "Can I indicate which features are essential",
      "Must have features",
      "Priority of features",
      "Nice to have features",
      "Essential requirements",
    ],
    keywords: ["priority", "features", "essential", "must", "have"],
    answer:
      "Yes. Indicating must-have versus nice-to-have features helps with scope planning and cost control.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PROJECT CATEGORY REQUESTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-commercial",
    category: "requests",
    intent: "project_request",
    question: "Can I request a commercial project?",
    variations: [
      "Can I request a commercial project",
      "Commercial product development",
      "Business project",
      "Product for sale",
      "Commercial request",
    ],
    keywords: ["commercial", "business", "product", "sale", "development"],
    answer:
      "Yes. Commercial projects are possible but may involve additional planning around compliance, production, documentation and support.",
    priority: 13,
  },

  {
    id: "request-student",
    category: "requests",
    intent: "project_request",
    question: "Can I submit a student project request?",
    variations: [
      "Can I submit a student project request",
      "University project request",
      "FYP project",
      "School project",
      "Student project help",
    ],
    keywords: ["student", "university", "school", "fyp", "project"],
    answer:
      "Yes. Student and educational projects can be submitted. Providing the requirements and deadline helps with planning.",
    priority: 13,
  },

  {
    id: "request-competition",
    category: "requests",
    intent: "project_request",
    question: "Can I submit a competition project request?",
    variations: [
      "Can I submit a competition project request",
      "Hackathon project",
      "Robotics competition",
      "Science fair project",
      "Competition entry",
    ],
    keywords: ["competition", "hackathon", "robotics", "science", "entry"],
    answer:
      "Yes. Competition projects can be requested. Providing the competition rules and deadline helps with planning.",
    priority: 10,
  },

  {
    id: "request-research",
    category: "requests",
    intent: "project_request",
    question: "Can I submit a research project request?",
    variations: [
      "Can I submit a research project request",
      "Research and development",
      "R&D project",
      "Experimental project",
      "Prototype for research",
    ],
    keywords: [
      "research",
      "development",
      "experimental",
      "prototype",
      "project",
    ],
    answer:
      "Yes. Research-oriented projects can be discussed, including prototypes and experimental systems. Scope and requirements should be clear.",
    priority: 10,
  },

  {
    id: "request-startup",
    category: "requests",
    intent: "project_request",
    question: "Can MECTEC help with a startup product?",
    variations: [
      "Can MECTEC help with a startup product",
      "Startup project",
      "MVP development",
      "New product idea",
      "Product prototype for startup",
    ],
    keywords: ["startup", "mvp", "product", "prototype", "idea"],
    answer:
      "Yes. Startups can request prototypes or early-stage product development. Requirements, budget and timeline should be discussed.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // FEEDBACK / PROBLEMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-feedback",
    category: "requests",
    intent: "project_request",
    question: "Can I give feedback about the request process?",
    variations: [
      "Can I give feedback about the request process",
      "Request process feedback",
      "Feedback on form",
      "Suggestions for requests",
      "Improve request process",
    ],
    keywords: ["feedback", "request", "process", "form", "suggestions"],
    answer:
      "Yes. Feedback can be sent through the contact options. Describe what worked or what could be improved.",
    priority: 10,
  },

  {
    id: "request-problem",
    category: "requests",
    intent: "project_request",
    question: "What if I have a problem with the request form?",
    variations: [
      "What if I have a problem with the request form",
      "Form not working",
      "Cannot submit request",
      "Error submitting form",
      "Request form issue",
    ],
    keywords: ["problem", "form", "submit", "error", "issue"],
    answer:
      "If the form does not work, try again later or contact MECTEC directly with the details of the problem.",
    priority: 13,
  },

  {
    id: "request-alternate",
    category: "requests",
    intent: "project_request",
    question: "Is there another way to submit a project?",
    variations: [
      "Is there another way to submit a project",
      "Alternative to form",
      "Submit by email",
      "Can I send project by message",
      "Request without form",
    ],
    keywords: ["alternative", "form", "email", "submit", "project"],
    answer:
      "If the form is not suitable, contact MECTEC through the website contact options and provide the project details there.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // BEST PRACTICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "request-best-practices",
    category: "requests",
    intent: "project_request",
    question: "What are best practices for submitting a request?",
    variations: [
      "What are best practices for submitting a request",
      "Request best practices",
      "How to write a good request",
      "Tips for project request",
      "Improve request quality",
    ],
    keywords: ["best", "practices", "request", "tips", "quality"],
    answer:
      "Describe the goal clearly, list important features, mention constraints, include existing materials, and state budget and timeline if known. More detail helps with planning.",
    priority: 15,
  },
];
