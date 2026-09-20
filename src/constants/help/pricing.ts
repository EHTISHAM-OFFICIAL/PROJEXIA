export const PRICING_HELP = [
  {
    id: "pricing-how-much",
    category: "pricing",
    question: "How much does a MECTEC project cost?",
    variations: [
      "How much will my project cost",
      "What is the price of a project",
      "How expensive are projects",
      "What do you charge",
      "How much do you charge",
      "What is your project price",
      "How much money do I need",
    ],
    keywords: ["price", "cost", "charge", "budget", "money", "expensive"],
    answer:
      "There is no single fixed price for custom projects. Cost depends on the hardware, components, complexity, software, enclosure, quantity and other requirements. Submit the project details for a more meaningful scope and estimate.",
    priority: 10,
  },

  {
    id: "pricing-fixed-price",
    category: "pricing",
    question: "Do all projects have the same price?",
    variations: [
      "Are project prices fixed",
      "Do all projects cost the same",
      "Is there one fixed project price",
      "Why do project prices vary",
      "Are electronics projects priced individually",
    ],
    keywords: ["fixed", "price", "same", "cost", "vary", "different"],
    answer:
      "No. Custom projects are priced according to their actual requirements. A simple sensor project and a connected multi-device system can have very different hardware and development requirements.",
    priority: 9,
  },

  {
    id: "pricing-budget-unknown",
    category: "pricing",
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
    id: "pricing-component-cost",
    category: "pricing",
    question: "Does project cost include components?",
    variations: [
      "Are components included in the price",
      "Does the price include hardware",
      "Are electronic parts included",
      "Do I pay separately for components",
      "Is hardware included in project cost",
    ],
    keywords: ["components", "hardware", "parts", "included", "cost"],
    answer:
      "Component costs depend on the specific project arrangement and scope. The exact hardware requirements should be identified before a final project cost is determined.",
    priority: 8,
  },

  {
    id: "pricing-cheap-components",
    category: "pricing",
    question: "Can a project be designed around a limited budget?",
    variations: [
      "Can you make it cheaper",
      "Can you use cheaper components",
      "Can the project fit my budget",
      "Can you reduce hardware cost",
      "I have a small budget",
      "Can you build a low cost version",
    ],
    keywords: ["cheap", "budget", "low", "cost", "affordable", "components"],
    answer:
      "A limited budget can be considered during project planning. Component selection, features, performance requirements and architecture can affect the final cost, so clearly stating your budget helps identify practical options.",
    priority: 9,
  },

  {
    id: "pricing-no-automatic-quote",
    category: "pricing",
    question: "Can the website automatically give me an exact project quote?",
    variations: [
      "Can I get an instant quote",
      "Does the website calculate project price",
      "Can the assistant tell me exact price",
      "Can I get a price immediately",
    ],
    keywords: ["instant", "quote", "exact", "price", "automatic"],
    answer:
      "The Help Assistant does not generate project quotations. Custom pricing requires understanding the actual project requirements and hardware scope.",
    priority: 10,
  },
] as const;
