import type { HelpEntry } from "./types";

export const POLICIES_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // HANDOVER / DELIVERABLES / OWNERSHIP
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-source-code",
    category: "policies",
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
    priority: 15,
  },

  {
    id: "policy-schematics",
    category: "policies",
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
    priority: 15,
  },

  {
    id: "policy-deliverables",
    category: "policies",
    intent: "compatibility",
    question: "What deliverables are provided with a project?",
    variations: [
      "What deliverables are provided with a project",
      "What do I receive",
      "Project deliverables",
      "What is included at handover",
      "Deliverables for a project",
    ],
    keywords: ["deliverables", "project", "receive", "handover", "included"],
    answer:
      "Deliverables depend on the project and can include the working prototype or device, schematics, source code, firmware, documentation and any agreed manufacturing files.",
    priority: 15,
  },

  {
    id: "policy-hardware-ownership",
    category: "policies",
    intent: "compatibility",
    question: "Who owns the hardware?",
    variations: [
      "Who owns the hardware",
      "Do I own the hardware",
      "Ownership of project",
      "Hardware ownership",
      "Who keeps the prototype",
    ],
    keywords: ["hardware", "ownership", "prototype", "project", "own"],
    answer:
      "Hardware ownership depends on the project agreement. Clarify this with ProjexiaHub during planning.",
    priority: 13,
  },

  {
    id: "policy-components-ownership",
    category: "policies",
    intent: "compatibility",
    question: "Who owns the components?",
    variations: [
      "Who owns the components",
      "Do I own the parts",
      "Component ownership",
      "Who keeps the parts",
      "Parts after project",
    ],
    keywords: ["components", "parts", "ownership", "project", "own"],
    answer:
      "Component ownership depends on the project arrangement. Discuss this with ProjexiaHub if it matters for your project.",
    priority: 10,
  },

  {
    id: "policy-source-ownership",
    category: "policies",
    intent: "compatibility",
    question: "Who owns the source code?",
    variations: [
      "Who owns the source code",
      "Do I own the source code",
      "Code ownership",
      "Who owns the firmware",
      "Source code rights",
    ],
    keywords: ["source", "code", "ownership", "firmware", "rights"],
    answer:
      "Source code ownership depends on the project agreement. Discuss source code and IP terms with ProjexiaHub before starting.",
    priority: 15,
  },

  {
    id: "policy-schematics-ownership",
    category: "policies",
    intent: "compatibility",
    question: "Who owns the schematics?",
    variations: [
      "Who owns the schematics",
      "Do I own the schematic",
      "Schematic ownership",
      "Who keeps the design",
      "Circuit diagram rights",
    ],
    keywords: ["schematics", "ownership", "design", "circuit", "rights"],
    answer:
      "Schematic ownership depends on the project agreement. Clarify this with ProjexiaHub during planning.",
    priority: 13,
  },

  {
    id: "policy-pcb-ownership",
    category: "policies",
    intent: "compatibility",
    question: "Who owns the PCB design files?",
    variations: [
      "Who owns the PCB design files",
      "Do I get PCB files",
      "PCB design ownership",
      "Gerber file ownership",
      "Who keeps the PCB design",
    ],
    keywords: ["pcb", "design", "files", "ownership", "gerber"],
    answer:
      "PCB design file ownership depends on the project agreement. Discuss this with ProjexiaHub if you need the design files.",
    priority: 13,
  },

  {
    id: "policy-bom-ownership",
    category: "policies",
    intent: "compatibility",
    question: "Do I receive the BOM?",
    variations: [
      "Do I receive the BOM",
      "Bill of materials handover",
      "Do I get the BOM",
      "Component list ownership",
      "BOM provided",
    ],
    keywords: ["bom", "bill", "materials", "ownership", "handover"],
    answer:
      "BOM handover depends on the project agreement. Discuss this with ProjexiaHub if you need the component list.",
    priority: 10,
  },

  {
    id: "policy-manufacturing-files",
    category: "policies",
    intent: "compatibility",
    question: "Do I receive manufacturing files?",
    variations: [
      "Do I receive manufacturing files",
      "Gerber files handover",
      "Production files provided",
      "Do I get PCB files",
      "Manufacturing data",
    ],
    keywords: ["manufacturing", "files", "gerber", "production", "data"],
    answer:
      "Manufacturing file handover depends on the project agreement. Discuss this with ProjexiaHub if you plan to produce the design independently.",
    priority: 13,
  },

  {
    id: "policy-firmware-handover",
    category: "policies",
    intent: "compatibility",
    question: "Do I get the firmware?",
    variations: [
      "Do I get the firmware",
      "Firmware handover",
      "Do I receive the firmware",
      "Get the code",
      "Firmware delivery",
    ],
    keywords: ["firmware", "handover", "receive", "code", "delivery"],
    answer:
      "Firmware handover depends on the project agreement. Source code, firmware binary or both may be provided depending on the arrangement.",
    priority: 13,
  },

  {
    id: "policy-documentation",
    category: "policies",
    intent: "compatibility",
    question: "What documentation is provided?",
    variations: [
      "What documentation is provided",
      "What documents do I get",
      "Do I get wiring diagrams",
      "Documentation provided",
      "Handover documents",
    ],
    keywords: ["documentation", "documents", "wiring", "diagrams", "handover"],
    answer:
      "Relevant schematics, wiring information and source code are handed over where applicable. The exact documentation depends on the project scope.",
    priority: 13,
  },

  {
    id: "policy-documentation-handover",
    category: "policies",
    intent: "compatibility",
    question: "How is documentation handed over?",
    variations: [
      "How is documentation handed over",
      "Documentation handover",
      "How do I receive documents",
      "Project files handover",
      "Delivery of documentation",
    ],
    keywords: ["documentation", "handover", "files", "delivery", "project"],
    answer:
      "Documentation handover method depends on the project. Files may be provided digitally or physically depending on size and type.",
    priority: 10,
  },

  {
    id: "policy-source-handover",
    category: "policies",
    intent: "compatibility",
    question: "How is source code handed over?",
    variations: [
      "How is source code handed over",
      "Source code handover",
      "How do I get the code",
      "Firmware delivery",
      "Code delivery method",
    ],
    keywords: ["source", "code", "handover", "firmware", "delivery"],
    answer:
      "Source code handover method depends on the project. It may be provided digitally with documentation and build instructions.",
    priority: 13,
  },

  {
    id: "policy-schematics-handover",
    category: "policies",
    intent: "compatibility",
    question: "How are schematics handed over?",
    variations: [
      "How are schematics handed over",
      "Schematic handover",
      "How do I get the schematic",
      "Circuit diagram delivery",
      "Schematic format",
    ],
    keywords: ["schematic", "handover", "circuit", "diagram", "format"],
    answer:
      "Schematic handover format depends on the project. Files may be provided in a standard design tool format or PDF.",
    priority: 10,
  },

  {
    id: "policy-pcb-files-handover",
    category: "policies",
    intent: "compatibility",
    question: "How are PCB design files handed over?",
    variations: [
      "How are PCB design files handed over",
      "PCB file handover",
      "How do I get Gerbers",
      "Design file delivery",
      "PCB design handover",
    ],
    keywords: ["pcb", "files", "handover", "gerber", "design"],
    answer:
      "PCB design file handover depends on the project agreement. Files may include native design files or manufacturing outputs.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // INTELLECTUAL PROPERTY / NDA / IDEA PROTECTION
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-ip-ownership",
    category: "policies",
    intent: "compatibility",
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
    priority: 15,
  },

  {
    id: "policy-nda",
    category: "policies",
    intent: "compatibility",
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
    priority: 13,
  },

  {
    id: "policy-idea-protection",
    category: "policies",
    intent: "procedure",
    question: "How is my project idea protected?",
    variations: [
      "How is my project idea protected",
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

  {
    id: "policy-confidentiality",
    category: "policies",
    intent: "compatibility",
    question: "Is my project information confidential?",
    variations: [
      "Is my project information confidential",
      "Confidential project",
      "Is my project private",
      "Protect my information",
      "Non disclosure",
    ],
    keywords: ["confidential", "private", "information", "protect", "project"],
    answer:
      "Confidentiality arrangements can be discussed with ProjexiaHub. Raise any confidentiality requirements before sharing sensitive information.",
    priority: 13,
  },

  {
    id: "policy-commercial-use",
    category: "policies",
    intent: "compatibility",
    question: "Can I use the project commercially?",
    variations: [
      "Can I use the project commercially",
      "Commercial use allowed",
      "Sell project",
      "Use in business",
      "Commercial licensing",
    ],
    keywords: ["commercial", "use", "sell", "business", "license"],
    answer:
      "Commercial use arrangements depend on the project agreement and IP terms. Discuss your intended use with ProjexiaHub.",
    priority: 13,
  },

  {
    id: "policy-resale",
    category: "policies",
    intent: "compatibility",
    question: "Can I resell the project or product?",
    variations: [
      "Can I resell the project or product",
      "Resell project",
      "Sell finished product",
      "Distribution rights",
      "Sell my device",
    ],
    keywords: ["resell", "product", "distribution", "rights", "sell"],
    answer:
      "Resale and distribution arrangements depend on the project agreement. Clarify this with ProjexiaHub before proceeding.",
    priority: 13,
  },

  {
    id: "policy-reproduction",
    category: "policies",
    intent: "compatibility",
    question: "Can I reproduce the project?",
    variations: [
      "Can I reproduce the project",
      "Can I build more copies",
      "Reproduction rights",
      "Copy the design",
      "Build another unit",
    ],
    keywords: ["reproduce", "copies", "design", "rights", "build"],
    answer:
      "Reproduction rights depend on the project agreement and IP terms. Clarify this with ProjexiaHub before reproducing the design.",
    priority: 13,
  },

  {
    id: "policy-modifications",
    category: "policies",
    intent: "compatibility",
    question: "Can I modify the project after delivery?",
    variations: [
      "Can I modify the project after delivery",
      "Modify delivered project",
      "Change hardware after build",
      "Edit source code",
      "Alter finished design",
    ],
    keywords: ["modify", "delivered", "change", "hardware", "source"],
    answer:
      "Modification rights depend on the project agreement and IP terms. Discuss this with ProjexiaHub if important.",
    priority: 10,
  },

  {
    id: "policy-licensing",
    category: "policies",
    intent: "compatibility",
    question: "What is the licensing policy?",
    variations: [
      "What is the licensing policy",
      "Project licensing",
      "License for firmware",
      "Software license",
      "Design license",
    ],
    keywords: ["license", "licensing", "firmware", "software", "design"],
    answer:
      "Licensing arrangements depend on the project and IP terms. Clarify how the design and code may be used with ProjexiaHub.",
    priority: 13,
  },

  {
    id: "policy-open-source",
    category: "policies",
    intent: "compatibility",
    question: "Do you use open-source code?",
    variations: [
      "Do you use open-source code",
      "Open source in project",
      "Open source libraries",
      "Third party code",
      "GPL in firmware",
    ],
    keywords: ["open", "source", "library", "code", "gpl"],
    answer:
      "Open-source libraries may be used where appropriate. License terms and compatibility should be considered, and any obligations should be discussed.",
    priority: 13,
  },

  {
    id: "policy-third-party",
    category: "policies",
    intent: "compatibility",
    question: "Do you use third-party components or services?",
    variations: [
      "Do you use third-party components or services",
      "Third party parts",
      "External services",
      "Vendor components",
      "Subcontracting",
    ],
    keywords: ["third", "party", "components", "services", "vendor"],
    answer:
      "Third-party components and services may be part of a project. Their terms, availability and support should be considered during planning.",
    priority: 10,
  },

  {
    id: "policy-non-compete",
    category: "policies",
    intent: "compatibility",
    question: "Is there a non-compete or exclusivity clause?",
    variations: [
      "Is there a non-compete or exclusivity clause",
      "Exclusivity clause",
      "Non compete",
      "Exclusive project",
      "Restrict similar work",
    ],
    keywords: ["exclusivity", "non", "compete", "exclusive", "project"],
    answer:
      "Exclusivity or non-compete terms depend on the project agreement. Discuss this with ProjexiaHub during planning.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // WARRANTY / RETURNS / DEFECTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-warranty",
    category: "policies",
    intent: "compatibility",
    question: "Does ProjexiaHub provide a warranty?",
    variations: [
      "Does ProjexiaHub provide a warranty",
      "Is there a warranty",
      "Do you offer warranty",
      "How long is the warranty",
      "What happens if the project breaks",
      "Is repair covered",
    ],
    keywords: ["warranty", "guarantee", "repair", "broken"],
    answer:
      "The Help Assistant does not provide a warranty policy because warranty terms depend on the specific project and the current ProjexiaHub policy. Please contact ProjexiaHub directly for the applicable terms.",
    priority: 15,
  },

  {
    id: "policy-warranty-vs-guarantee",
    category: "policies",
    intent: "comparison",
    question: "What is the difference between warranty and guarantee?",
    variations: [
      "What is the difference between warranty and guarantee",
      "Warranty vs guarantee",
      "Do you guarantee your work",
      "Is there a guarantee",
      "What happens if the project fails",
    ],
    keywords: ["warranty", "guarantee", "difference", "work", "fails"],
    answer:
      "Warranty and guarantee terms depend on the specific project and current ProjexiaHub policy. Contact ProjexiaHub directly for the applicable terms.",
    priority: 10,
  },

  {
    id: "policy-refund",
    category: "policies",
    intent: "compatibility",
    question: "What is the refund policy?",
    variations: [
      "What is the refund policy",
      "Can I get a refund",
      "Do you offer refunds",
      "What happens if I cancel",
      "Can project payments be refunded",
    ],
    keywords: ["refund", "cancel", "payment", "money"],
    answer:
      "The Help Assistant does not define refund or cancellation terms. For a specific project, contact ProjexiaHub directly for the applicable arrangement.",
    priority: 15,
  },

  {
    id: "policy-return",
    category: "policies",
    intent: "compatibility",
    question: "What is the return policy?",
    variations: [
      "What is the return policy",
      "Can I return a project",
      "Return policy",
      "Send back the device",
      "Project return",
    ],
    keywords: ["return", "policy", "device", "project", "send"],
    answer:
      "Return arrangements depend on the project agreement. Contact ProjexiaHub directly for the applicable policy.",
    priority: 13,
  },

  {
    id: "policy-exchange",
    category: "policies",
    intent: "compatibility",
    question: "Can I exchange a project?",
    variations: [
      "Can I exchange a project",
      "Exchange project",
      "Swap device",
      "Replace with another",
      "Project exchange policy",
    ],
    keywords: ["exchange", "project", "swap", "replace", "policy"],
    answer:
      "Exchange arrangements depend on the project agreement. Contact ProjexiaHub directly to discuss.",
    priority: 10,
  },

  {
    id: "policy-defect",
    category: "policies",
    intent: "troubleshooting",
    question: "What if my project has a defect?",
    variations: [
      "What if my project has a defect",
      "Project defect",
      "Faulty device",
      "Broken on arrival",
      "Manufacturing defect",
    ],
    keywords: ["defect", "faulty", "broken", "arrival", "policy"],
    answer:
      "Defect handling depends on the project agreement and warranty terms. Contact ProjexiaHub directly with details of the issue.",
    priority: 13,
  },

  {
    id: "policy-firmware-bug",
    category: "policies",
    intent: "troubleshooting",
    question: "What if there is a firmware bug?",
    variations: [
      "What if there is a firmware bug",
      "Firmware bug",
      "Software issue after delivery",
      "Code problem",
      "Bug fix policy",
    ],
    keywords: ["firmware", "bug", "software", "code", "policy"],
    answer:
      "Bug handling depends on the project agreement and support terms. Contact ProjexiaHub with a clear description of the problem.",
    priority: 13,
  },

  {
    id: "policy-hardware-failure",
    category: "policies",
    intent: "troubleshooting",
    question: "What if the hardware fails?",
    variations: [
      "What if the hardware fails",
      "Hardware failure",
      "Component failed",
      "Board stopped working",
      "Hardware repair policy",
    ],
    keywords: ["hardware", "failure", "component", "board", "policy"],
    answer:
      "Hardware failure handling depends on the project agreement and warranty terms. Contact ProjexiaHub directly for support.",
    priority: 13,
  },

  {
    id: "policy-repair",
    category: "policies",
    intent: "compatibility",
    question: "What is the repair policy?",
    variations: [
      "What is the repair policy",
      "Can you repair my project",
      "How much for repair",
      "Is repair covered",
      "Repair service policy",
    ],
    keywords: ["repair", "policy", "fix", "broken", "service"],
    answer:
      "Repair policies depend on the specific project and the fault. Contact ProjexiaHub directly with details for the applicable arrangement.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SUPPORT / MAINTENANCE / UPDATES
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-support",
    category: "policies",
    intent: "compatibility",
    question: "Do you provide support after the project?",
    variations: [
      "Do you provide support after the project",
      "Post project support",
      "Can I get help after delivery",
      "Do you offer after-sales support",
      "Support after completion",
    ],
    keywords: ["support", "after", "delivery", "post", "help"],
    answer:
      "Support arrangements depend on the project and current ProjexiaHub policy. Contact ProjexiaHub directly to discuss post-project support.",
    priority: 13,
  },

  {
    id: "policy-support-scope",
    category: "policies",
    intent: "compatibility",
    question: "What is included in support?",
    variations: [
      "What is included in support",
      "Support scope",
      "What support includes",
      "After sales service",
      "Support coverage",
    ],
    keywords: ["support", "scope", "includes", "service", "coverage"],
    answer:
      "Support scope depends on the project agreement. It may include bug fixes, minor updates, guidance or troubleshooting.",
    priority: 13,
  },

  {
    id: "policy-support-duration",
    category: "policies",
    intent: "compatibility",
    question: "How long is support provided?",
    variations: [
      "How long is support provided",
      "Support period",
      "How long do you support",
      "Support duration after delivery",
      "Warranty duration",
    ],
    keywords: ["support", "duration", "period", "warranty", "delivery"],
    answer:
      "Support duration depends on the project agreement and ProjexiaHub policy. Contact ProjexiaHub directly for the applicable terms.",
    priority: 13,
  },

  {
    id: "policy-maintenance",
    category: "policies",
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
    priority: 13,
  },

  {
    id: "policy-updates",
    category: "policies",
    intent: "compatibility",
    question: "What is the policy for project updates?",
    variations: [
      "What is the policy for project updates",
      "Can I add features later",
      "Can the project be updated",
      "Future changes policy",
      "Modify project later",
    ],
    keywords: ["updates", "changes", "features", "modify", "policy"],
    answer:
      "Update and modification arrangements depend on the project. Contact ProjexiaHub directly to discuss future changes.",
    priority: 13,
  },

  {
    id: "policy-firmware-update",
    category: "policies",
    intent: "compatibility",
    question: "What is the firmware update policy?",
    variations: [
      "What is the firmware update policy",
      "Firmware update policy",
      "Can firmware be updated",
      "OTA update policy",
      "Update support",
    ],
    keywords: ["firmware", "update", "policy", "ota", "support"],
    answer:
      "Firmware update arrangements depend on the project and device capabilities. Discuss requirements during planning.",
    priority: 13,
  },

  {
    id: "policy-remote-update",
    category: "policies",
    intent: "compatibility",
    question: "Can the device be updated remotely?",
    variations: [
      "Can the device be updated remotely",
      "Remote update policy",
      "OTA support",
      "Wireless update policy",
      "Remote firmware policy",
    ],
    keywords: ["remote", "update", "policy", "ota", "firmware"],
    answer:
      "Remote update support depends on the hardware and connectivity of the project. Discuss this during planning.",
    priority: 10,
  },

  {
    id: "policy-security",
    category: "policies",
    intent: "compatibility",
    question: "What is the security policy?",
    variations: [
      "What is the security policy",
      "Security policy",
      "How is security handled",
      "Data security policy",
      "Device security",
    ],
    keywords: ["security", "policy", "data", "device", "handled"],
    answer:
      "Security requirements depend on the project. Authentication, encryption, secure storage and update security can be included as required.",
    priority: 13,
  },

  {
    id: "policy-data-privacy",
    category: "policies",
    intent: "compatibility",
    question: "How is my data handled?",
    variations: [
      "How is my data handled",
      "Data privacy policy",
      "How do you use my information",
      "Is my data secure",
      "Privacy policy",
    ],
    keywords: ["data", "privacy", "information", "secure", "policy"],
    answer:
      "Information handling depends on the website's current policies. For specific privacy or data questions, contact ProjexiaHub directly.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // QUALITY / STANDARDS / COMPLIANCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-quality",
    category: "policies",
    intent: "compatibility",
    question: "What is the quality policy?",
    variations: [
      "What is the quality policy",
      "Quality assurance",
      "How do you ensure quality",
      "Quality standards",
      "Testing policy",
    ],
    keywords: ["quality", "assurance", "testing", "standards", "policy"],
    answer:
      "Quality practices include design review, testing, inspection and verification against requirements. The exact process depends on the project.",
    priority: 13,
  },

  {
    id: "policy-standards-compliance",
    category: "policies",
    intent: "compatibility",
    question: "Do you comply with standards?",
    variations: [
      "Do you comply with standards",
      "Standards compliance",
      "Do you follow standards",
      "Compliance policy",
      "Certification requirements",
    ],
    keywords: [
      "standards",
      "compliance",
      "certification",
      "policy",
      "requirements",
    ],
    answer:
      "Standards and certification requirements depend on the application and market. These should be identified during project planning.",
    priority: 13,
  },

  {
    id: "policy-certification",
    category: "policies",
    intent: "compatibility",
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
    priority: 13,
  },

  {
    id: "policy-safety",
    category: "policies",
    intent: "compatibility",
    question: "What is the safety policy?",
    variations: [
      "What is the safety policy",
      "Safety requirements",
      "How do you ensure safety",
      "Safety standards",
      "Safety policy",
    ],
    keywords: ["safety", "policy", "standards", "requirements", "ensure"],
    answer:
      "Safety requirements depend on the application. Mains voltage, batteries, motors and hazardous environments require appropriate design and protection.",
    priority: 15,
  },

  {
    id: "policy-environmental",
    category: "policies",
    intent: "compatibility",
    question: "What is the environmental policy?",
    variations: [
      "What is the environmental policy",
      "Environmental policy",
      "Eco-friendly design",
      "RoHS compliance",
      "Environmental considerations",
    ],
    keywords: ["environmental", "policy", "rohs", "eco", "compliance"],
    answer:
      "Environmental considerations such as RoHS compliance and material selection depend on the project and market. Discuss any specific requirements during planning.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PRODUCTION / BULK / DEADLINES
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-production-support",
    category: "policies",
    intent: "compatibility",
    question: "Do you support production?",
    variations: [
      "Do you support production",
      "Production support",
      "Help with manufacturing",
      "Assistance for production",
      "Mass production support",
    ],
    keywords: ["production", "support", "manufacturing", "mass", "assistance"],
    answer:
      "Production support depends on the project and agreement. PCB assembly, sourcing and enclosure production can be discussed.",
    priority: 13,
  },

  {
    id: "policy-bulk-policy",
    category: "policies",
    intent: "compatibility",
    question: "What is the policy for bulk orders?",
    variations: [
      "What is the policy for bulk orders",
      "Bulk order policy",
      "Multiple units policy",
      "Quantity order terms",
      "Large order policy",
    ],
    keywords: ["bulk", "order", "policy", "quantity", "multiple"],
    answer:
      "Bulk order terms depend on the project and quantity. Contact ProjexiaHub directly to discuss pricing and scheduling.",
    priority: 13,
  },

  {
    id: "policy-deadline",
    category: "policies",
    intent: "compatibility",
    question: "What is the policy for deadlines?",
    variations: [
      "What is the policy for deadlines",
      "Deadline handling",
      "Can I request urgent",
      "Timeline commitment",
      "Deadline requirements",
    ],
    keywords: ["deadline", "urgent", "timeline", "policy", "commitment"],
    answer:
      "Deadlines are considered during planning. Whether they can be met depends on scope, components and current capacity. Contact ProjexiaHub directly for specific timelines.",
    priority: 13,
  },

  {
    id: "policy-deadline-commitment",
    category: "policies",
    intent: "compatibility",
    question: "Do you guarantee deadlines?",
    variations: [
      "Do you guarantee deadlines",
      "Deadline guarantee",
      "Can you commit to a date",
      "Timeline promise",
      "Delivery guarantee",
    ],
    keywords: ["deadline", "guarantee", "commit", "timeline", "delivery"],
    answer:
      "Deadline commitments depend on the project and agreement. Contact ProjexiaHub to discuss realistic timelines for your specific project.",
    priority: 13,
  },

  {
    id: "policy-delivery",
    category: "policies",
    intent: "compatibility",
    question: "What is the delivery policy?",
    variations: [
      "What is the delivery policy",
      "Do you deliver projects",
      "Can you ship my project",
      "How is the project delivered",
      "Delivery terms",
    ],
    keywords: ["delivery", "policy", "ship", "project", "terms"],
    answer:
      "Delivery arrangements depend on the project and location. Contact ProjexiaHub directly to discuss how the finished project will be delivered.",
    priority: 13,
  },

  {
    id: "policy-payment",
    category: "policies",
    intent: "compatibility",
    question: "How do I pay for a project?",
    variations: [
      "How do I pay for a project",
      "What payment methods do you accept",
      "How can I pay",
      "Do you accept online payments",
      "Can I pay for a project",
    ],
    keywords: ["payment", "pay", "money", "method"],
    answer:
      "Payment arrangements are not defined by the Help Assistant. For a specific project, contact ProjexiaHub to discuss the applicable payment arrangement.",
    priority: 13,
  },

  {
    id: "policy-pricing-policy",
    category: "policies",
    intent: "pricing",
    question: "What is the pricing policy?",
    variations: [
      "What is the pricing policy",
      "Pricing policy",
      "Pricing policies",
      "What are your pricing policies",
      "How is price determined",
      "Cost policy",
      "Quote policy",
    ],
    keywords: ["pricing", "policy", "cost", "price", "quote"],
    answer:
      "Pricing is based on the project scope, components, development effort and timeline. Contact ProjexiaHub for a project-specific estimate.",
    priority: 13,
  },

  {
    id: "policy-quote-validity",
    category: "policies",
    intent: "compatibility",
    question: "How long is a quote valid?",
    variations: [
      "How long is a quote valid",
      "Quote validity",
      "Price validity period",
      "How long does estimate last",
      "Quote expiry",
    ],
    keywords: ["quote", "validity", "price", "period", "expiry"],
    answer:
      "Quote validity depends on component pricing and availability. Contact ProjexiaHub directly for details on a specific quote.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PROCESS / AGREEMENTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "policy-custom",
    category: "policies",
    intent: "compatibility",
    question: "Can project requirements be customized?",
    variations: [
      "Can project requirements be customized",
      "Can I request custom features",
      "Can I change the project requirements",
      "Can I add features",
      "Can the system be customized",
    ],
    keywords: ["custom", "features", "requirements", "project"],
    answer:
      "Yes. ProjexiaHub projects can be based on custom requirements. Describe the required behavior and features in the project request so the scope can be understood accurately.",
    priority: 13,
  },

  {
    id: "policy-scope-change",
    category: "policies",
    intent: "compatibility",
    question: "What is the policy for scope changes?",
    variations: [
      "What is the policy for scope changes",
      "Change project scope",
      "Add features after start",
      "Modify requirements",
      "Scope adjustment policy",
    ],
    keywords: ["scope", "change", "features", "requirements", "policy"],
    answer:
      "Scope changes can be discussed and may affect cost and timeline. Early communication is recommended.",
    priority: 13,
  },

  {
    id: "policy-out-of-scope",
    category: "policies",
    intent: "compatibility",
    question: "What happens if I request work outside the original scope?",
    variations: [
      "What happens if I request work outside the original scope",
      "Out of scope work",
      "Extra work policy",
      "New request after project",
      "Additional work",
    ],
    keywords: ["out", "scope", "work", "extra", "additional"],
    answer:
      "Work outside the original scope is typically handled as a new request or change order. Contact ProjexiaHub to discuss scope, cost and timeline.",
    priority: 13,
  },

  {
    id: "policy-cancellation",
    category: "policies",
    intent: "compatibility",
    question: "What is the cancellation policy?",
    variations: [
      "What is the cancellation policy",
      "Can I cancel a project",
      "Cancellation terms",
      "Stop the project",
      "Cancel order",
    ],
    keywords: ["cancel", "cancellation", "policy", "project", "order"],
    answer:
      "Cancellation terms depend on the project stage and agreement. Contact ProjexiaHub directly to discuss.",
    priority: 13,
  },

  {
    id: "policy-escalation",
    category: "policies",
    intent: "procedure",
    question: "How do I escalate an issue?",
    variations: [
      "How do I escalate an issue",
      "Escalate problem",
      "Complaint process",
      "Dispute resolution",
      "Unresolved issue",
    ],
    keywords: ["escalate", "issue", "complaint", "dispute", "resolution"],
    answer:
      "If an issue cannot be resolved through normal contact, request escalation with ProjexiaHub. Provide clear details and documentation.",
    priority: 10,
  },

  {
    id: "policy-dispute",
    category: "policies",
    intent: "compatibility",
    question: "What is the dispute resolution policy?",
    variations: [
      "What is the dispute resolution policy",
      "Dispute resolution",
      "Conflict with ProjexiaHub",
      "Problem with project",
      "Disagreement policy",
    ],
    keywords: ["dispute", "resolution", "conflict", "problem", "policy"],
    answer:
      "Dispute resolution arrangements depend on the project agreement and applicable laws. Contact ProjexiaHub directly to discuss any issue.",
    priority: 10,
  },

  {
    id: "policy-training",
    category: "policies",
    intent: "compatibility",
    question: "Is training provided?",
    variations: [
      "Is training provided",
      "Training policy",
      "Can you train me",
      "Handover training",
      "Project training",
    ],
    keywords: ["training", "policy", "handover", "project", "provide"],
    answer:
      "Training and handover arrangements depend on the project. Mention your requirements during planning or contact ProjexiaHub directly.",
    priority: 10,
  },

  {
    id: "policy-best-practices",
    category: "policies",
    intent: "procedure",
    question: "What are best practices for project agreements?",
    variations: [
      "What are best practices for project agreements",
      "Agreement best practices",
      "How to set up a project",
      "Policy best practices",
      "Clarify project terms",
    ],
    keywords: ["best", "practices", "agreement", "project", "policy"],
    answer:
      "Define scope, deliverables, IP, payment, timeline, support and warranties clearly before starting. Written agreements help both sides avoid misunderstandings.",
    priority: 15,
  },
];
