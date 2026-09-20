import type { HelpEntry } from "./types";

export const PCB_HELP: HelpEntry[] = [
  {
    id: "pcb-definition",
    category: "pcb",
    question: "What is a PCB?",
    variations: [
      "What does PCB mean?",
      "What is a printed circuit board?",
      "Explain PCB",
    ],
    keywords: ["PCB", "printed circuit board", "board", "circuit"],
    answer:
      "PCB stands for Printed Circuit Board. It mechanically supports electronic components and electrically connects them through conductive copper traces, pads, vias, and other board features.",
  },
  {
    id: "pcb-design",
    category: "pcb",
    question: "Can MECTEC design PCBs?",
    variations: [
      "Can you make a PCB?",
      "Do you design circuit boards?",
      "Can MECTEC convert my circuit into a PCB?",
    ],
    keywords: ["PCB design", "PCB", "circuit board", "layout"],
    answer:
      "PCB design can be part of a project when a permanent or compact circuit is required. The process normally starts with a verified schematic and continues with component placement, routing, design-rule checks, and manufacturing files.",
  },
  {
    id: "schematic-vs-pcb",
    category: "pcb",
    question: "What is the difference between a schematic and a PCB?",
    variations: ["Schematic vs PCB", "Is a schematic the same as a PCB?"],
    keywords: ["schematic", "PCB", "diagram", "layout"],
    answer:
      "A schematic describes the logical electrical connections between components. A PCB layout turns those connections into physical component footprints, copper traces, vias, and board geometry.",
  },
  {
    id: "pcb-traces",
    category: "pcb",
    question: "What are PCB traces?",
    variations: ["What is a copper trace?", "What do PCB tracks do?"],
    keywords: ["PCB traces", "tracks", "copper", "routing"],
    answer:
      "PCB traces are conductive copper paths used to electrically connect components and other points on a circuit board. Their width, spacing, and geometry should be appropriate for the current, voltage, signal type, and manufacturing requirements.",
  },
  {
    id: "pcb-vias",
    category: "pcb",
    question: "What are vias in a PCB?",
    variations: ["Why are vias used?", "What is a PCB via?"],
    keywords: ["via", "vias", "PCB", "layers"],
    answer:
      "A via is a plated hole that electrically connects conductive layers of a PCB. Vias are commonly used when routing signals or power between different board layers.",
  },
  {
    id: "breadboard-pcb",
    category: "pcb",
    question: "Should I test a circuit on a breadboard before making a PCB?",
    variations: [
      "Do I need a breadboard first?",
      "Should I prototype before PCB?",
    ],
    keywords: ["breadboard", "prototype", "PCB", "testing"],
    answer:
      "For many projects, breadboard or modular prototyping is useful before committing to a PCB. It allows the basic circuit and firmware behavior to be tested and corrected before finalizing the board design.",
  },
];
