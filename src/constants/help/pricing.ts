import type { HelpEntry } from "./types";

export const PRICING_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // OVERVIEW
  // ─────────────────────────────────────────────────────────────
  {
    id: "pricing-how-much",
    category: "pricing",
    intent: "pricing",
    question: "How much does a MECTEC project cost?",
    variations: [
      "How much does a MECTEC project cost",
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
    priority: 20,
  },

  {
    id: "pricing-fixed-price",
    category: "pricing",
    intent: "pricing",
    question: "Do all projects have the same price?",
    variations: [
      "Do all projects have the same price",
      "Are project prices fixed",
      "Do all projects cost the same",
      "Is there one fixed project price",
      "Why do project prices vary",
      "Are electronics projects priced individually",
    ],
    keywords: ["fixed", "price", "same", "cost", "vary", "different"],
    answer:
      "No. Custom projects are priced according to their actual requirements. A simple sensor project and a connected multi-device system can have very different hardware and development requirements.",
    priority: 15,
  },

  {
    id: "pricing-quotation",
    category: "pricing",
    intent: "pricing",
    question: "How do I get a quotation?",
    variations: [
      "How do I get a quotation",
      "How to get a quote",
      "Can I get an estimate",
      "Request a quotation",
      "Price quote process",
    ],
    keywords: ["quotation", "quote", "estimate", "process", "request"],
    answer:
      "Submit your project details through the project request form. Once the requirements are understood, a scope and estimate can be discussed.",
    priority: 15,
  },

  {
    id: "pricing-no-automatic-quote",
    category: "pricing",
    intent: "pricing",
    question: "Can the website automatically give me an exact project quote?",
    variations: [
      "Can the website automatically give me an exact project quote",
      "Can I get an instant quote",
      "Does the website calculate project price",
      "Can the assistant tell me exact price",
      "Can I get a price immediately",
    ],
    keywords: ["instant", "quote", "exact", "price", "automatic"],
    answer:
      "The Help Assistant does not generate project quotations. Custom pricing requires understanding the actual project requirements and hardware scope.",
    priority: 15,
  },

  {
    id: "pricing-component-cost",
    category: "pricing",
    intent: "pricing",
    question: "Does project cost include components?",
    variations: [
      "Does project cost include components",
      "Are components included in the price",
      "Does the price include hardware",
      "Are electronic parts included",
      "Do I pay separately for components",
      "Is hardware included in project cost",
    ],
    keywords: ["components", "hardware", "parts", "included", "cost"],
    answer:
      "Component costs depend on the specific project arrangement and scope. The exact hardware requirements should be identified before a final project cost is determined.",
    priority: 13,
  },

  {
    id: "pricing-budget-unknown",
    category: "pricing",
    intent: "pricing",
    question: "What if I do not know my budget?",
    variations: [
      "What if I do not know my budget",
      "I do not know my budget",
      "I have no budget estimate",
      "Can I submit without knowing cost",
      "I do not know how much my project should cost",
      "Can you estimate my project",
    ],
    keywords: ["budget", "unknown", "estimate", "cost", "price"],
    answer:
      "That is fine. Describe the project and its requirements first. If your budget is not decided, it can be left undecided where the request form allows it.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // COST FACTORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "pricing-factors",
    category: "pricing",
    intent: "pricing",
    question: "What factors affect project cost?",
    variations: [
      "What factors affect project cost",
      "What makes a project expensive",
      "What increases project cost",
      "Cost factors for electronics",
      "What determines project price",
    ],
    keywords: ["factors", "cost", "price", "expensive", "determine"],
    answer:
      "Project cost depends on hardware, components, complexity, firmware development, enclosure, quantity, testing, documentation, delivery and support requirements.",
    priority: 15,
  },

  {
    id: "pricing-complexity",
    category: "pricing",
    intent: "pricing",
    question: "Does complexity affect the price?",
    variations: [
      "Does complexity affect the price",
      "Is complex project more expensive",
      "Does difficulty change cost",
      "Complexity and price",
      "How complexity affects price",
    ],
    keywords: ["complexity", "price", "cost", "difficulty", "affect"],
    answer:
      "Yes. More complex projects require more design, development, testing and integration effort, which affects the total cost.",
    priority: 13,
  },

  {
    id: "pricing-hardware-cost",
    category: "pricing",
    intent: "pricing",
    question: "How much do the hardware components cost?",
    variations: [
      "How much do the hardware components cost",
      "Cost of components",
      "Hardware price",
      "How much for parts",
      "Component cost estimate",
    ],
    keywords: ["hardware", "components", "cost", "price", "parts"],
    answer:
      "Hardware cost depends on the components selected. Simple modules are inexpensive, while specialized sensors, drivers, displays and enclosures can significantly increase the total.",
    priority: 13,
  },

  {
    id: "pricing-firmware-cost",
    category: "pricing",
    intent: "pricing",
    question: "Is firmware development part of the cost?",
    variations: [
      "Is firmware development part of the cost",
      "Does coding cost extra",
      "Is software included in price",
      "How much for firmware",
      "Does programming affect cost",
    ],
    keywords: ["firmware", "software", "coding", "cost", "price"],
    answer:
      "Firmware development is part of the project effort and is reflected in the cost. Complexity, features and testing requirements affect the amount of development needed.",
    priority: 13,
  },

  {
    id: "pricing-pcb-cost",
    category: "pricing",
    intent: "pricing",
    question: "How much does PCB design and manufacturing cost?",
    variations: [
      "How much does PCB design and manufacturing cost",
      "PCB design price",
      "Cost of PCB",
      "PCB manufacturing cost",
      "How much for PCB",
    ],
    keywords: ["pcb", "design", "manufacturing", "cost", "price"],
    answer:
      "PCB cost depends on design complexity, board size, layer count, material, quantity and manufacturing options. Small boards with standard specs are cheaper per unit at higher quantities.",
    priority: 13,
  },

  {
    id: "pricing-enclosure-cost",
    category: "pricing",
    intent: "pricing",
    question: "Does the enclosure affect the price?",
    variations: [
      "Does the enclosure affect the price",
      "Cost of enclosure",
      "How much for a case",
      "Enclosure pricing",
      "Does housing increase cost",
    ],
    keywords: ["enclosure", "case", "cost", "price", "housing"],
    answer:
      "Yes. Enclosure type, material, custom fabrication, IP rating and finish affect the total cost. Standard enclosures are usually cheaper than custom designs.",
    priority: 10,
  },

  {
    id: "pricing-quantity",
    category: "pricing",
    intent: "pricing",
    question: "Does quantity affect the price?",
    variations: [
      "Does quantity affect the price",
      "Is it cheaper in bulk",
      "Cost for multiple units",
      "Quantity discount",
      "Price for more units",
    ],
    keywords: ["quantity", "bulk", "multiple", "units", "discount"],
    answer:
      "Yes. Per-unit cost typically decreases with higher quantity because design, setup and tooling costs are spread across more units.",
    priority: 13,
  },

  {
    id: "pricing-prototype-vs-production",
    category: "pricing",
    intent: "comparison",
    question: "Is a prototype cheaper than production?",
    variations: [
      "Is a prototype cheaper than production",
      "Prototype vs production cost",
      "Why is prototype expensive",
      "Price difference prototype",
      "Prototype cost vs final",
    ],
    keywords: ["prototype", "production", "cost", "price", "difference"],
    answer:
      "A prototype may have a higher per-unit cost than mass production because setup, customization and testing are concentrated in a single unit. Production cost per unit decreases with volume.",
    priority: 13,
  },

  {
    id: "pricing-software-cost",
    category: "pricing",
    intent: "pricing",
    question: "Does software development cost extra?",
    variations: [
      "Does software development cost extra",
      "Is software included in project",
      "App development cost",
      "Web dashboard price",
      "Software pricing",
    ],
    keywords: ["software", "app", "web", "dashboard", "cost"],
    answer:
      "Software development such as mobile apps, web dashboards or cloud integration is separate from hardware unless included in the project scope. The cost depends on features and complexity.",
    priority: 10,
  },

  {
    id: "pricing-cloud-cost",
    category: "pricing",
    intent: "pricing",
    question: "Are there ongoing cloud or data costs?",
    variations: [
      "Are there ongoing cloud or data costs",
      "Cloud subscription cost",
      "Data plan cost",
      "Monthly IoT cost",
      "Ongoing costs for IoT",
    ],
    keywords: ["cloud", "data", "ongoing", "subscription", "cost"],
    answer:
      "Ongoing costs can include cloud services, data plans, storage and maintenance. These depend on the platform and usage and should be considered during planning.",
    priority: 13,
  },

  {
    id: "pricing-maintenance-cost",
    category: "pricing",
    intent: "pricing",
    question: "Is there ongoing maintenance cost?",
    variations: [
      "Is there ongoing maintenance cost",
      "Maintenance fees",
      "Do I pay for updates",
      "Long term support cost",
      "Maintenance contract",
    ],
    keywords: ["maintenance", "ongoing", "support", "cost", "updates"],
    answer:
      "Maintenance and support arrangements depend on the project and MECTEC policy. These should be discussed during planning so both sides understand expectations.",
    priority: 13,
  },

  {
    id: "pricing-support-cost",
    category: "pricing",
    intent: "pricing",
    question: "Does after-sales support cost extra?",
    variations: [
      "Does after-sales support cost extra",
      "Support cost",
      "Is help included after delivery",
      "Do I pay for support",
      "After sales pricing",
    ],
    keywords: ["support", "after", "sales", "cost", "extra"],
    answer:
      "Support terms depend on the project and agreement. Contact MECTEC directly to discuss support arrangements.",
    priority: 10,
  },

  {
    id: "pricing-training-cost",
    category: "pricing",
    intent: "pricing",
    question: "Does training cost extra?",
    variations: [
      "Does training cost extra",
      "Training fees",
      "Is training included",
      "Cost for handover training",
      "Do I pay for training",
    ],
    keywords: ["training", "handover", "cost", "included", "fees"],
    answer:
      "Training and handover arrangements depend on the project. Mention your requirements during planning or contact MECTEC directly.",
    priority: 10,
  },

  {
    id: "pricing-delivery-cost",
    category: "pricing",
    intent: "pricing",
    question: "Is delivery or shipping included?",
    variations: [
      "Is delivery or shipping included",
      "Shipping cost",
      "Delivery included",
      "Do I pay for delivery",
      "Shipping charges",
    ],
    keywords: ["delivery", "shipping", "cost", "included", "charges"],
    answer:
      "Delivery or shipping is typically arranged separately and may depend on location and project size. Discuss delivery options with MECTEC.",
    priority: 10,
  },

  {
    id: "pricing-component-sourcing",
    category: "pricing",
    intent: "pricing",
    question: "Does component sourcing affect the price?",
    variations: [
      "Does component sourcing affect the price",
      "Parts availability cost",
      "Sourcing components price",
      "Supply chain cost",
      "Component lead time cost",
    ],
    keywords: ["sourcing", "components", "price", "availability", "lead"],
    answer:
      "Yes. Component availability, lead time and source affect cost. Difficult-to-find or long-lead parts may increase both price and timeline.",
    priority: 13,
  },

  {
    id: "pricing-testing-cost",
    category: "pricing",
    intent: "pricing",
    question: "Does testing add to the project cost?",
    variations: [
      "Does testing add to the project cost",
      "Testing charges",
      "Is testing included",
      "Cost for validation",
      "Testing affects price",
    ],
    keywords: ["testing", "cost", "validation", "included", "price"],
    answer:
      "Testing is part of the development effort and is included in the project cost. Extensive validation or certification testing can add significantly.",
    priority: 13,
  },

  {
    id: "pricing-certification-cost",
    category: "pricing",
    intent: "pricing",
    question: "Does certification add to the cost?",
    variations: [
      "Does certification add to the cost",
      "CE certification cost",
      "FCC testing cost",
      "Compliance testing price",
      "Certification fees",
    ],
    keywords: ["certification", "ce", "fcc", "testing", "cost"],
    answer:
      "Certification and compliance testing usually involve additional cost and time. Requirements depend on the product and target market.",
    priority: 13,
  },

  {
    id: "pricing-documentation-cost",
    category: "pricing",
    intent: "pricing",
    question: "Is documentation included in the price?",
    variations: [
      "Is documentation included in the price",
      "Documentation fees",
      "Do I pay for schematics",
      "Source code cost",
      "Documentation included",
    ],
    keywords: ["documentation", "schematics", "source", "code", "cost"],
    answer:
      "Basic documentation is typically part of the project. The extent of documentation, source code or detailed manufacturing files should be discussed as part of the scope.",
    priority: 13,
  },

  {
    id: "pricing-cost-drivers",
    category: "pricing",
    intent: "pricing",
    question: "What are the main cost drivers in a project?",
    variations: [
      "What are the main cost drivers in a project",
      "What drives cost up",
      "Most expensive part of project",
      "Cost drivers",
      "What adds cost",
    ],
    keywords: ["cost", "drivers", "expensive", "add", "main"],
    answer:
      "Main cost drivers include component selection, firmware complexity, PCB and enclosure requirements, testing, documentation, quantity and delivery.",
    priority: 13,
  },

  {
    id: "pricing-reduce-cost",
    category: "pricing",
    intent: "pricing",
    question: "How can I reduce the project cost?",
    variations: [
      "How can I reduce the project cost",
      "Make project cheaper",
      "Lower the cost",
      "Reduce price",
      "Cost reduction options",
    ],
    keywords: ["reduce", "cost", "cheaper", "lower", "options"],
    answer:
      "Reduce features, use simpler components, reduce enclosure complexity, increase quantity, or extend the timeline. The right approach depends on which requirements are essential.",
    priority: 13,
  },

  {
    id: "pricing-cheap-components",
    category: "pricing",
    intent: "pricing",
    question: "Can a project be designed around a limited budget?",
    variations: [
      "Can a project be designed around a limited budget",
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
    priority: 15,
  },

  {
    id: "pricing-fixed-budget",
    category: "pricing",
    intent: "pricing",
    question: "Can you work within a fixed budget?",
    variations: [
      "Can you work within a fixed budget",
      "Fixed budget project",
      "Can you design for my budget",
      "Budget limited project",
      "Work within my price",
    ],
    keywords: ["fixed", "budget", "work", "limit", "price"],
    answer:
      "Yes. Provide the budget and priorities so the design can be adjusted to fit where practical. Trade-offs may be needed for scope or features.",
    priority: 13,
  },

  {
    id: "pricing-budget-range",
    category: "pricing",
    intent: "pricing",
    question: "Should I provide a budget range?",
    variations: [
      "Should I provide a budget range",
      "Is budget required",
      "Should I mention my budget",
      "Do you need my budget",
      "Budget range helpful",
    ],
    keywords: ["budget", "range", "provide", "required", "helpful"],
    answer:
      "A budget range is helpful because it allows the scope and design to be matched to your expectations. If unknown, it can be left undecided where the form allows.",
    priority: 13,
  },

  {
    id: "pricing-budget-mismatch",
    category: "pricing",
    intent: "pricing",
    question: "What if my budget does not match the project cost?",
    variations: [
      "What if my budget does not match the project cost",
      "Budget is too low",
      "Project costs more than I can pay",
      "Can you fit my budget",
      "Reduce cost to match budget",
    ],
    keywords: ["budget", "mismatch", "low", "cost", "fit"],
    answer:
      "Discussing the budget early helps identify practical options. Features, components or scope may be adjusted to better match the available budget.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PAYMENT TERMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "pricing-payment-terms",
    category: "pricing",
    intent: "pricing",
    question: "What are the payment terms?",
    variations: [
      "What are the payment terms",
      "How do I pay",
      "Payment schedule",
      "Do I pay upfront",
      "Installment options",
    ],
    keywords: ["payment", "terms", "schedule", "upfront", "installment"],
    answer:
      "Payment terms depend on the project and agreement. Contact MECTEC directly to discuss the applicable payment schedule.",
    priority: 13,
  },

  {
    id: "pricing-upfront",
    category: "pricing",
    intent: "pricing",
    question: "Do I need to pay upfront?",
    variations: [
      "Do I need to pay upfront",
      "Is advance payment required",
      "Do I pay before project starts",
      "Upfront payment",
      "Deposit required",
    ],
    keywords: ["upfront", "advance", "deposit", "payment", "required"],
    answer:
      "Upfront or advance payment requirements depend on the project agreement. Contact MECTEC directly for the applicable terms.",
    priority: 13,
  },

  {
    id: "pricing-milestone",
    category: "pricing",
    intent: "pricing",
    question: "Can payment be milestone-based?",
    variations: [
      "Can payment be milestone-based",
      "Pay in stages",
      "Milestone payments",
      "Partial payments",
      "Installment plan",
    ],
    keywords: ["milestone", "payment", "stages", "installment", "partial"],
    answer:
      "Milestone or installment payment structures may be possible depending on the project. Discuss this with MECTEC during planning.",
    priority: 10,
  },

  {
    id: "pricing-invoice",
    category: "pricing",
    intent: "pricing",
    question: "Do you provide an invoice?",
    variations: [
      "Do you provide an invoice",
      "Can I get an invoice",
      "Receipt for payment",
      "Billing document",
      "Do you issue invoices",
    ],
    keywords: ["invoice", "receipt", "billing", "payment", "document"],
    answer:
      "Invoicing arrangements depend on the project and agreement. Contact MECTEC directly for billing-related questions.",
    priority: 10,
  },

  {
    id: "pricing-tax",
    category: "pricing",
    intent: "pricing",
    question: "Is tax included in the price?",
    variations: [
      "Is tax included in the price",
      "Does price include tax",
      "Tax on projects",
      "Is VAT included",
      "Price before or after tax",
    ],
    keywords: ["tax", "vat", "included", "price", "project"],
    answer:
      "Tax treatment depends on your location and the applicable regulations. Contact MECTEC directly for clarification.",
    priority: 10,
  },

  {
    id: "pricing-currency",
    category: "pricing",
    intent: "pricing",
    question: "What currency do you accept?",
    variations: [
      "What currency do you accept",
      "Which currency for payment",
      "Do you accept dollars",
      "Local currency",
      "Payment currency",
    ],
    keywords: ["currency", "payment", "dollars", "local", "accept"],
    answer:
      "Currency and payment methods depend on the arrangement. Contact MECTEC directly for the applicable options.",
    priority: 10,
  },

  {
    id: "pricing-refund",
    category: "pricing",
    intent: "pricing",
    question: "Can I get a refund?",
    variations: [
      "Can I get a refund",
      "What is the refund policy",
      "Do you offer refunds",
      "What happens if I cancel",
      "Can project payments be refunded",
    ],
    keywords: ["refund", "cancel", "payment", "money"],
    answer:
      "The Help Assistant does not define refund or cancellation terms. For a specific project, contact MECTEC directly for the applicable arrangement.",
    priority: 13,
  },

  {
    id: "pricing-cancellation",
    category: "pricing",
    intent: "pricing",
    question: "Can I cancel a project?",
    variations: [
      "Can I cancel a project",
      "What if I cancel",
      "Cancellation policy",
      "Can I stop the project",
      "Project cancellation terms",
    ],
    keywords: ["cancel", "cancellation", "project", "terms", "stop"],
    answer:
      "Cancellation terms depend on the project agreement and progress. Contact MECTEC directly to discuss the applicable arrangement.",
    priority: 13,
  },

  {
    id: "pricing-scope-change",
    category: "pricing",
    intent: "pricing",
    question: "Does changing requirements affect the price?",
    variations: [
      "Does changing requirements affect the price",
      "Can I add features later",
      "What if I change my mind",
      "Scope change cost",
      "Change of requirements price",
    ],
    keywords: ["change", "scope", "requirements", "price", "affect"],
    answer:
      "Yes. Adding features or changing requirements can affect cost and timeline. Discuss changes as early as possible so they can be planned.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // COMPARISONS / VALUE
  // ─────────────────────────────────────────────────────────────
  {
    id: "pricing-estimate-accuracy",
    category: "pricing",
    intent: "pricing",
    question: "How accurate is the initial estimate?",
    variations: [
      "How accurate is the initial estimate",
      "Is the estimate final",
      "Can the price change",
      "Estimate vs final price",
      "Why is the estimate different",
    ],
    keywords: ["estimate", "accurate", "final", "change", "price"],
    answer:
      "Initial estimates are based on the information provided. If requirements change or additional details emerge, the final price may differ. Confirming scope early improves accuracy.",
    priority: 13,
  },

  {
    id: "pricing-breakdown",
    category: "pricing",
    intent: "pricing",
    question: "Can I see a cost breakdown?",
    variations: [
      "Can I see a cost breakdown",
      "Detailed cost estimate",
      "Breakdown of project cost",
      "Itemized quote",
      "Cost components",
    ],
    keywords: ["breakdown", "cost", "estimate", "itemized", "quote"],
    answer:
      "Detailed cost breakdowns depend on the project and agreement. Contact MECTEC directly to discuss how costs are structured.",
    priority: 10,
  },

  {
    id: "pricing-price-vs-quality",
    category: "pricing",
    intent: "pricing",
    question: "Does lower price mean lower quality?",
    variations: [
      "Does lower price mean lower quality",
      "Cheaper project quality",
      "Is cheaper worse",
      "Price vs quality",
      "Why are some quotes lower",
    ],
    keywords: ["price", "quality", "cheaper", "lower", "quote"],
    answer:
      "Lower cost may mean simpler hardware, fewer features or reduced testing. The right balance depends on the project requirements and the value of reliability.",
    priority: 10,
  },

  {
    id: "pricing-cost-vs-time",
    category: "pricing",
    intent: "pricing",
    question: "Can I pay more to get the project faster?",
    variations: [
      "Can I pay more to get the project faster",
      "Rush fee",
      "Expedited project",
      "Faster delivery cost",
      "Urgent project pricing",
    ],
    keywords: ["faster", "rush", "urgent", "cost", "expedite"],
    answer:
      "Urgent or expedited projects may be possible depending on scope and capacity. Contact MECTEC directly to discuss timing and any effect on cost.",
    priority: 10,
  },

  {
    id: "pricing-competitive",
    category: "pricing",
    intent: "pricing",
    question: "Are your prices competitive?",
    variations: [
      "Are your prices competitive",
      "Is MECTEC expensive",
      "How do your prices compare",
      "Price comparison",
      "Are you affordable",
    ],
    keywords: ["competitive", "price", "compare", "affordable", "expensive"],
    answer:
      "Pricing is based on the actual project requirements. Cost should be compared on scope, quality, support and reliability, not price alone.",
    priority: 10,
  },

  {
    id: "pricing-comparison",
    category: "pricing",
    intent: "pricing",
    question: "How do I compare quotes from different providers?",
    variations: [
      "How do I compare quotes from different providers",
      "Compare quotes",
      "How to evaluate price",
      "Price comparison tips",
      "Choosing between quotes",
    ],
    keywords: ["compare", "quotes", "providers", "price", "evaluate"],
    answer:
      "Compare scope, quality, support, timeline, documentation and warranty—not only the headline price. A lower quote may not include the same features or reliability.",
    priority: 10,
  },

  {
    id: "pricing-total-ownership",
    category: "pricing",
    intent: "pricing",
    question: "What is the total cost of ownership?",
    variations: [
      "What is the total cost of ownership",
      "Total cost over time",
      "Long term cost",
      "Cost of running project",
      "Ongoing and upfront cost",
    ],
    keywords: ["total", "ownership", "long", "term", "cost"],
    answer:
      "Total cost includes hardware, development, deployment, cloud, maintenance, updates and support. Considering all of these gives a realistic picture.",
    priority: 13,
  },

  {
    id: "pricing-hidden-cost",
    category: "pricing",
    intent: "pricing",
    question: "Are there any hidden costs?",
    variations: [
      "Are there any hidden costs",
      "Hidden fees",
      "Unexpected costs",
      "Extra charges",
      "Any hidden charges",
    ],
    keywords: ["hidden", "cost", "fees", "extra", "charges"],
    answer:
      "Costs should be discussed clearly during planning. Components, delivery, cloud, maintenance and support may be separate from development cost depending on the project.",
    priority: 13,
  },

  {
    id: "pricing-negotiable",
    category: "pricing",
    intent: "pricing",
    question: "Is the price negotiable?",
    variations: [
      "Is the price negotiable",
      "Can we negotiate price",
      "Is there room for discount",
      "Can you reduce the quote",
      "Price flexibility",
    ],
    keywords: ["negotiable", "negotiate", "discount", "flexibility", "price"],
    answer:
      "Some flexibility may exist depending on scope, quantity and requirements. Discuss options directly with MECTEC.",
    priority: 10,
  },

  {
    id: "pricing-best-value",
    category: "pricing",
    intent: "pricing",
    question: "What is the best value option?",
    variations: [
      "What is the best value option",
      "Best price performance",
      "Value for money",
      "Cheapest good option",
      "Most cost effective",
    ],
    keywords: ["value", "best", "price", "performance", "cost"],
    answer:
      "Best value depends on requirements. The right balance between cost, reliability, features and support should be defined during planning.",
    priority: 10,
  },

  {
    id: "pricing-not-for-profit",
    category: "pricing",
    intent: "pricing",
    question: "Do you offer discounts for students or non-profits?",
    variations: [
      "Do you offer discounts for students or non-profits",
      "Student discount",
      "Discount for school project",
      "Non profit pricing",
      "Affordable student project",
    ],
    keywords: ["discount", "student", "school", "nonprofit", "affordable"],
    answer:
      "Discounts or special pricing depend on current MECTEC policy. Contact MECTEC directly to discuss your situation.",
    priority: 10,
  },

  {
    id: "pricing-bulk-discount",
    category: "pricing",
    intent: "pricing",
    question: "Do you offer bulk discounts?",
    variations: [
      "Do you offer bulk discounts",
      "Discount for multiple units",
      "Quantity discount",
      "Bulk pricing",
      "Price for many units",
    ],
    keywords: ["bulk", "discount", "quantity", "multiple", "price"],
    answer:
      "Per-unit cost typically decreases with quantity. Contact MECTEC with the expected quantity for an accurate estimate.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // COST BREAKDOWN BY CATEGORY
  // ─────────────────────────────────────────────────────────────
  {
    id: "pricing-single-unit",
    category: "pricing",
    intent: "pricing",
    question: "Can you build just one unit?",
    variations: [
      "Can you build just one unit",
      "One-off project",
      "Single prototype",
      "Just one device",
      "Custom single unit",
    ],
    keywords: ["single", "one", "unit", "prototype", "custom"],
    answer:
      "Yes. Single-unit prototypes and custom builds are possible, but the per-unit cost is typically higher than volume production.",
    priority: 13,
  },

  {
    id: "pricing-replacement-cost",
    category: "pricing",
    intent: "pricing",
    question: "Can I order a replacement unit?",
    variations: [
      "Can I order a replacement unit",
      "Replacement project",
      "Order another copy",
      "Duplicate my project",
      "Build another unit",
    ],
    keywords: ["replacement", "order", "duplicate", "build", "unit"],
    answer:
      "Replacement or duplicate units can be discussed depending on the original design and component availability. Contact MECTEC for pricing.",
    priority: 10,
  },

  {
    id: "pricing-upgrade-cost",
    category: "pricing",
    intent: "pricing",
    question: "How much does an upgrade cost?",
    variations: [
      "How much does an upgrade cost",
      "Upgrade pricing",
      "Cost to add features",
      "Modify project cost",
      "Enhancement price",
    ],
    keywords: ["upgrade", "cost", "features", "modify", "enhancement"],
    answer:
      "Upgrade cost depends on the change and the existing design. Discuss the desired changes with MECTEC for an estimate.",
    priority: 10,
  },

  {
    id: "pricing-ongoing-updates",
    category: "pricing",
    intent: "pricing",
    question: "Are firmware updates included?",
    variations: [
      "Are firmware updates included",
      "Cost for firmware updates",
      "Future code changes",
      "Updates after delivery",
      "Update pricing",
    ],
    keywords: ["firmware", "updates", "cost", "future", "changes"],
    answer:
      "Firmware update arrangements depend on the project and agreement. Discuss expected updates during planning.",
    priority: 10,
  },

  {
    id: "pricing-training-handover",
    category: "pricing",
    intent: "pricing",
    question: "Is training included with the project?",
    variations: [
      "Is training included with the project",
      "Training included",
      "Handover session",
      "Do I get training",
      "Training part of project",
    ],
    keywords: ["training", "included", "handover", "session", "project"],
    answer:
      "Training or handover arrangements depend on the project. Mention your requirements during planning.",
    priority: 10,
  },

  {
    id: "pricing-component-markup",
    category: "pricing",
    intent: "pricing",
    question: "Is there a markup on components?",
    variations: [
      "Is there a markup on components",
      "Parts markup",
      "Do you charge extra for components",
      "Component price",
      "How are parts billed",
    ],
    keywords: ["markup", "components", "billed", "price", "parts"],
    answer:
      "How components are billed depends on the project arrangement. This should be clarified during the quotation process.",
    priority: 10,
  },

  {
    id: "pricing-service-vs-hardware",
    category: "pricing",
    intent: "pricing",
    question: "Are design services separate from hardware?",
    variations: [
      "Are design services separate from hardware",
      "Design fee vs components",
      "Is design included",
      "Hardware vs service cost",
      "Separate design charge",
    ],
    keywords: ["design", "services", "hardware", "cost", "separate"],
    answer:
      "Cost structure depends on the project. Some arrangements separate design effort from hardware, while others include both in a single project price.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MISC / PROCESS
  // ─────────────────────────────────────────────────────────────
  {
    id: "pricing-support-duration",
    category: "pricing",
    intent: "pricing",
    question: "How long is support included?",
    variations: [
      "How long is support included",
      "Support period",
      "How long do you support",
      "Support duration after delivery",
      "Warranty duration",
    ],
    keywords: ["support", "duration", "period", "warranty", "delivery"],
    answer:
      "Support duration depends on the project agreement and MECTEC policy. Contact MECTEC directly for the applicable terms.",
    priority: 13,
  },

  {
    id: "pricing-warranty",
    category: "pricing",
    intent: "pricing",
    question: "Is there a warranty?",
    variations: [
      "Is there a warranty",
      "Do you offer warranty",
      "Warranty terms",
      "What if the project breaks",
      "Is repair covered",
    ],
    keywords: ["warranty", "guarantee", "repair", "broken", "terms"],
    answer:
      "Warranty terms depend on the specific project and current MECTEC policy. Please contact MECTEC directly for the applicable terms.",
    priority: 13,
  },

  {
    id: "pricing-repair-cost",
    category: "pricing",
    intent: "pricing",
    question: "How much does repair cost?",
    variations: [
      "How much does repair cost",
      "Repair charges",
      "Cost to fix project",
      "Repair pricing",
      "Fixing fee",
    ],
    keywords: ["repair", "cost", "fix", "pricing", "charges"],
    answer:
      "Repair cost depends on the fault and the project. Contact MECTEC with details about the problem for an accurate assessment.",
    priority: 13,
  },

  {
    id: "pricing-cost-estimate-request",
    category: "pricing",
    intent: "pricing",
    question: "How do I request a cost estimate?",
    variations: [
      "How do I request a cost estimate",
      "Request estimate",
      "Get a quote",
      "Ask for pricing",
      "How to get cost",
    ],
    keywords: ["request", "estimate", "quote", "pricing", "cost"],
    answer:
      "Submit your project details through the project request form. Provide as much useful information as possible so the scope can be understood and an estimate prepared.",
    priority: 15,
  },

  {
    id: "pricing-budget-planning",
    category: "pricing",
    intent: "pricing",
    question: "How should I plan my project budget?",
    variations: [
      "How should I plan my project budget",
      "Budget planning",
      "How to budget project",
      "What to include in budget",
      "Project budget tips",
    ],
    keywords: ["budget", "planning", "project", "include", "tips"],
    answer:
      "Include hardware, development, enclosure, testing, delivery, deployment, cloud, maintenance and support. Adding a contingency for changes is also advisable.",
    priority: 13,
  },

  {
    id: "pricing-best-practices",
    category: "pricing",
    intent: "pricing",
    question: "What are best practices for project pricing?",
    variations: [
      "What are best practices for project pricing",
      "Pricing best practices",
      "How to handle project cost",
      "Pricing guidelines",
      "Cost planning tips",
    ],
    keywords: ["best", "practices", "pricing", "cost", "planning"],
    answer:
      "Define requirements clearly, plan for all cost components, allow contingency, compare scope rather than just price, and communicate budget and expectations early.",
    priority: 15,
  },

  {
    id: "pricing-no-cost-consultation",
    category: "pricing",
    intent: "pricing",
    question: "Is the initial consultation free?",
    variations: [
      "Is the initial consultation free",
      "Free consultation",
      "Do you charge for quotes",
      "Is discussing free",
      "Initial advice cost",
    ],
    keywords: ["consultation", "free", "quotes", "advice", "cost"],
    answer:
      "Consultation and quotation arrangements depend on MECTEC policy. Contact MECTEC directly to discuss.",
    priority: 10,
  },

  {
    id: "pricing-price-transparency",
    category: "pricing",
    intent: "pricing",
    question: "How transparent is the pricing?",
    variations: [
      "How transparent is the pricing",
      "Clear pricing",
      "Do you explain cost",
      "Cost transparency",
      "Is pricing open",
    ],
    keywords: ["transparent", "pricing", "clear", "cost", "explain"],
    answer:
      "Pricing is discussed based on the project scope. Clear communication of scope and cost is important for both sides.",
    priority: 10,
  },
];
