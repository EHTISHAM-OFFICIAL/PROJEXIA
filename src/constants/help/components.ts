import type { HelpEntry } from "./types";

export const COMPONENT_HELP: HelpEntry[] = [
  {
    id: "components-how-to-select",
    category: "components",
    question: "How do I choose electronic components?",
    variations: [
      "How should I select components",
      "How do I choose parts",
      "Which components should I use",
      "How do I select hardware",
      "What should I consider when choosing components",
    ],
    keywords: ["components", "parts", "select", "choose", "hardware"],
    answer:
      "Component selection should be based on electrical requirements, voltage, current, accuracy, speed, environmental conditions, physical size, communication interfaces, availability and cost.",
    priority: 9,
  },

  {
    id: "components-voltage-rating",
    category: "components",
    question: "Why does voltage rating matter?",
    variations: [
      "What voltage rating should I use",
      "Can I use a higher voltage rated component",
      "Why check component voltage",
      "What happens if voltage is too high",
    ],
    keywords: ["voltage", "rating", "component", "maximum"],
    answer:
      "A component must operate within its specified voltage limits. Exceeding the maximum rating can cause malfunction, overheating or permanent damage. A suitable design also considers transients and tolerances rather than only nominal voltage.",
    priority: 9,
  },

  {
    id: "components-current-rating",
    category: "components",
    question: "Why does current rating matter?",
    variations: [
      "What current rating do I need",
      "Can a component handle more current",
      "Why check amps",
      "How do I size a component for current",
    ],
    keywords: ["current", "rating", "amps", "load", "component"],
    answer:
      "The current rating indicates how much current a component can safely carry under specified conditions. Exceeding it can cause excessive heating, voltage drop or failure.",
    priority: 9,
  },

  {
    id: "components-resistor-led",
    category: "components",
    question: "How do I choose an LED resistor?",
    variations: [
      "What resistor for an LED",
      "How much resistor does an LED need",
      "LED current limiting resistor",
      "Calculate LED resistor",
    ],
    keywords: ["led", "resistor", "current", "voltage", "calculate"],
    answer:
      "For a simple LED circuit, the resistor can be estimated with R = (Vsupply − VLED) / ILED. The chosen LED current should stay within the LED and GPIO/output limits.",
    priority: 9,
  },

  {
    id: "components-breadboard",
    category: "components",
    question: "What is a breadboard?",
    variations: [
      "What is a prototyping breadboard",
      "How does a breadboard work",
      "Can I build a circuit on a breadboard",
      "What is a solderless breadboard",
    ],
    keywords: ["breadboard", "prototype", "circuit", "solderless"],
    answer:
      "A solderless breadboard is a reusable prototyping board with internally connected contact groups. It is useful for temporary circuits and experimentation, although it is less suitable than a PCB for many permanent or high-current applications.",
    priority: 8,
  },

  {
    id: "components-logic-level",
    category: "components",
    question: "What is a logic level?",
    variations: [
      "What are logic levels",
      "What does 3.3V logic mean",
      "What is 5V logic",
      "Can 3.3V and 5V devices communicate",
      "Do I need a level shifter",
    ],
    keywords: ["logic", "level", "3.3v", "5v", "level shifter"],
    answer:
      "A logic level defines the voltage ranges interpreted as digital low and high. A 3.3 V device and a 5 V device may not be directly compatible, so the input/output specifications should be checked and level shifting may be required.",
    priority: 10,
  },

  {
    id: "components-level-shifter",
    category: "components",
    question: "What is a logic level shifter?",
    variations: [
      "Why use a level shifter",
      "What does a level converter do",
      "How do I connect 5V to 3.3V logic",
      "Can a level shifter protect GPIO",
    ],
    keywords: ["level", "shifter", "converter", "3.3v", "5v", "gpio"],
    answer:
      "A logic level shifter converts digital signal levels between voltage domains, such as 3.3 V and 5 V. The correct circuit depends on the direction, speed and interface being used.",
    priority: 9,
  },

  {
    id: "components-regulator",
    category: "components",
    question: "What does a voltage regulator do?",
    variations: [
      "What is a voltage regulator",
      "Why use a regulator",
      "How do I get 5V from a higher voltage",
      "What does a buck converter do",
      "What does an LDO do",
    ],
    keywords: ["regulator", "voltage", "buck", "boost", "ldo", "power"],
    answer:
      "A voltage regulator provides a controlled output voltage from a suitable input. Linear regulators such as LDOs dissipate excess voltage as heat, while switching regulators such as buck and boost converters transfer energy more efficiently for many applications.",
    priority: 9,
  },

  {
    id: "components-battery",
    category: "components",
    question: "How do I choose a battery?",
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
    id: "components-fuse",
    category: "components",
    question: "Why use a fuse?",
    variations: [
      "What does a fuse do",
      "Why put a fuse in a circuit",
      "How does a fuse protect electronics",
      "Do I need a fuse",
    ],
    keywords: ["fuse", "protection", "current", "short", "safety"],
    answer:
      "A fuse is an overcurrent protection device. It is designed to interrupt a circuit when current exceeds its intended range for long enough to operate the fuse, helping protect wiring and equipment from certain fault conditions.",
    priority: 8,
  },
] as const;
