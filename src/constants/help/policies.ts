import type { HelpEntry } from "./types";

export const POLICIES_HELP: HelpEntry[] = [
  {
    id: "policy-source-code",
    category: "policies",
    question: "Do I receive the source code?",
    variations: [
      "Do I own the source code",
      "Will you give me the firmware",
      "Can I get the project code",
      "Do you keep the code",
    ],
    keywords: ["source", "code", "firmware", "ownership"],
    answer:
      "Yes. Source code, firmware and relevant schematics are handed over with the finished MECTEC build.",
    priority: 10,
  },

  {
    id: "policy-schematics",
    category: "policies",
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
    id: "policy-warranty",
    category: "policies",
    question: "Does MECTEC provide a warranty?",
    variations: [
      "Is there a warranty",
      "Do you offer warranty",
      "How long is the warranty",
      "What happens if the project breaks",
      "Is repair covered",
    ],
    keywords: ["warranty", "guarantee", "repair", "broken"],
    answer:
      "The Help Assistant does not provide a warranty policy because warranty terms depend on the specific project and the current MECTEC policy. Please contact MECTEC directly for the applicable terms.",
    priority: 10,
  },

  {
    id: "policy-refund",
    category: "policies",
    question: "What is the refund policy?",
    variations: [
      "Can I get a refund",
      "Do you offer refunds",
      "What happens if I cancel",
      "Can project payments be refunded",
    ],
    keywords: ["refund", "cancel", "payment", "money"],
    answer:
      "The Help Assistant does not define refund or cancellation terms. For a specific project, contact MECTEC directly for the applicable arrangement.",
    priority: 10,
  },

  {
    id: "policy-payment",
    category: "policies",
    question: "How do I pay for a project?",
    variations: [
      "What payment methods do you accept",
      "How can I pay",
      "Do you accept online payments",
      "Can I pay for a project",
    ],
    keywords: ["payment", "pay", "money", "method"],
    answer:
      "Payment arrangements are not defined by the Help Assistant. For a specific project, contact MECTEC to discuss the applicable payment arrangement.",
    priority: 10,
  },

  {
    id: "policy-custom",
    category: "policies",
    question: "Can project requirements be customized?",
    variations: [
      "Can I request custom features",
      "Can I change the project requirements",
      "Can I add features",
      "Can the system be customized",
    ],
    keywords: ["custom", "features", "requirements", "project"],
    answer:
      "Yes. MECTEC projects can be based on custom requirements. Describe the required behavior and features in the project request so the scope can be understood accurately.",
    priority: 9,
  },
] as const;
