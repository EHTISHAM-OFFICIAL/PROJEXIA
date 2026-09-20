export const ELECTRONICS_HELP = [
  {
    id: "electronics-voltage-current",
    category: "electronics",
    question: "What is the difference between voltage and current?",
    variations: [
      "Explain voltage and current",
      "Voltage vs current",
      "What does voltage mean",
      "What does current mean",
      "What is volts and amps",
    ],
    keywords: ["voltage", "current", "volts", "amps", "electricity"],
    answer:
      "Voltage is the electrical potential difference that drives charge through a circuit, while current is the rate at which electric charge flows. Voltage is measured in volts (V), and current is measured in amperes (A).",
    priority: 8,
  },

  {
    id: "electronics-ohms-law",
    category: "electronics",
    question: "What is Ohms law?",
    variations: [
      "Explain Ohm law",
      "What is V equals IR",
      "How do I calculate voltage current resistance",
      "How are voltage current and resistance related",
    ],
    keywords: ["ohm", "ohms", "voltage", "current", "resistance", "resistor"],
    answer:
      "Ohm’s law describes the relationship between voltage, current and resistance: V = I × R. Therefore, I = V/R and R = V/I.",
    priority: 8,
  },

  {
    id: "electronics-power",
    category: "electronics",
    question: "How is electrical power calculated?",
    variations: [
      "How do I calculate power",
      "What is the power formula",
      "How many watts does a circuit use",
      "How do I calculate watts",
    ],
    keywords: ["power", "watts", "voltage", "current", "watt"],
    answer:
      "Electrical power can be calculated as P = V × I, where P is power in watts, V is voltage and I is current. Other useful forms include P = I²R and P = V²/R.",
    priority: 8,
  },

  {
    id: "electronics-ac-dc",
    category: "electronics",
    question: "What is the difference between AC and DC?",
    variations: [
      "AC vs DC",
      "What is alternating current",
      "What is direct current",
      "Difference between AC and DC electricity",
    ],
    keywords: ["ac", "dc", "alternating", "direct", "current"],
    answer:
      "DC flows with a fixed polarity, while AC periodically changes direction and voltage. Batteries commonly provide DC, while household mains electricity is AC.",
    priority: 8,
  },

  {
    id: "electronics-series-parallel",
    category: "electronics",
    question: "What is the difference between series and parallel circuits?",
    variations: [
      "Series vs parallel",
      "How do series circuits work",
      "How do parallel circuits work",
      "What happens to voltage in series",
      "What happens to current in parallel",
    ],
    keywords: ["series", "parallel", "circuit", "voltage", "current"],
    answer:
      "In a series circuit, components share the same current path and their voltage drops add. In a parallel circuit, branches share the same voltage while current divides between the branches.",
    priority: 8,
  },

  {
    id: "electronics-resistor",
    category: "electronics",
    question: "What does a resistor do?",
    variations: [
      "What is a resistor",
      "Why use resistors",
      "What is the purpose of a resistor",
      "How does a resistor work",
    ],
    keywords: ["resistor", "resistance", "current", "voltage"],
    answer:
      "A resistor limits or controls current and creates a voltage drop according to Ohm’s law. Resistors are also used for biasing, pull-ups, pull-downs, voltage dividers and signal conditioning.",
    priority: 8,
  },

  {
    id: "electronics-capacitor",
    category: "electronics",
    question: "What does a capacitor do?",
    variations: [
      "What is a capacitor",
      "Why use capacitors",
      "What are capacitors used for",
      "How does a capacitor work",
    ],
    keywords: ["capacitor", "capacitance", "filter", "noise", "voltage"],
    answer:
      "A capacitor stores electrical energy in an electric field. In circuits it can be used for filtering, decoupling, smoothing, timing and coupling signals.",
    priority: 8,
  },

  {
    id: "electronics-inductor",
    category: "electronics",
    question: "What does an inductor do?",
    variations: [
      "What is an inductor",
      "What are coils used for",
      "How does an inductor work",
      "Why use an inductor",
    ],
    keywords: ["inductor", "coil", "inductance", "magnetic"],
    answer:
      "An inductor stores energy in a magnetic field and resists changes in current. Inductors are used in filtering, power converters, energy storage and electromagnetic circuits.",
    priority: 7,
  },

  {
    id: "electronics-diode",
    category: "electronics",
    question: "What does a diode do?",
    variations: [
      "What is a diode",
      "How does a diode work",
      "Why use a diode",
      "What is diode used for",
    ],
    keywords: ["diode", "rectifier", "current", "voltage"],
    answer:
      "A diode primarily allows current to flow in one direction and blocks it in the opposite direction. Different diode types are used for rectification, protection, voltage regulation, switching and signal applications.",
    priority: 8,
  },

  {
    id: "electronics-led",
    category: "electronics",
    question: "What is an LED?",
    variations: [
      "How does an LED work",
      "What is light emitting diode",
      "How do I connect an LED",
      "Why does an LED need a resistor",
    ],
    keywords: ["led", "light", "diode", "resistor"],
    answer:
      "An LED is a light-emitting diode. It normally requires current limiting, commonly provided by a series resistor when driven directly from a GPIO or supply.",
    priority: 8,
  },

  {
    id: "electronics-transistor",
    category: "electronics",
    question: "What is a transistor?",
    variations: [
      "How does a transistor work",
      "What are transistors used for",
      "Why use a transistor",
      "Can a transistor switch a load",
    ],
    keywords: ["transistor", "switch", "amplifier", "mosfet", "bjt"],
    answer:
      "A transistor is a semiconductor device commonly used for switching or amplification. MOSFETs and BJTs are two major transistor families used in electronic circuits.",
    priority: 8,
  },

  {
    id: "electronics-mosfet",
    category: "electronics",
    question: "What is a MOSFET used for?",
    variations: [
      "Why use a MOSFET",
      "Can a MOSFET control a motor",
      "Can I use a MOSFET as a switch",
      "What is a MOSFET",
    ],
    keywords: ["mosfet", "switch", "motor", "load", "gate"],
    answer:
      "A MOSFET can act as an electronically controlled switch and is often used to control loads such as motors, LEDs, solenoids and other DC loads. Its voltage, current, resistance and gate-drive requirements must match the application.",
    priority: 8,
  },

  {
    id: "electronics-relay",
    category: "electronics",
    question: "What is a relay?",
    variations: [
      "How does a relay work",
      "What is a relay module",
      "Can a microcontroller control a relay",
      "Why use a relay",
    ],
    keywords: ["relay", "switch", "load", "microcontroller", "module"],
    answer:
      "A relay is an electrically controlled switch. A relay module can allow a low-voltage control circuit to switch a separate load, but the relay, module, wiring and load must be rated appropriately.",
    priority: 8,
  },

  {
    id: "electronics-pullup",
    category: "electronics",
    question: "What is a pull-up resistor?",
    variations: [
      "Why use pull up resistors",
      "What does pullup mean",
      "Why is my input floating",
      "What is a pull down resistor",
    ],
    keywords: [
      "pullup",
      "pull-up",
      "pulldown",
      "floating",
      "input",
      "resistor",
    ],
    answer:
      "A pull-up resistor biases a digital input toward a defined high state when nothing else is actively driving it. A pull-down resistor similarly biases an input toward a low state. They help prevent floating digital inputs.",
    priority: 9,
  },

  {
    id: "electronics-debouncing",
    category: "electronics",
    question: "What is switch debouncing?",
    variations: [
      "Why does a button trigger multiple times",
      "How do I debounce a button",
      "What is button debounce",
      "Why does my switch bounce",
    ],
    keywords: ["debounce", "button", "switch", "bounce", "input"],
    answer:
      "Mechanical switches can rapidly change state for a short period when pressed or released. Debouncing prevents those transitions from being interpreted as multiple button presses. It can be handled in hardware, software, or both.",
    priority: 9,
  },

  {
    id: "electronics-decoupling",
    category: "electronics",
    question: "Why are decoupling capacitors used?",
    variations: [
      "Why put capacitor near IC",
      "What is a decoupling capacitor",
      "Why does my microcontroller reset",
      "Why put capacitors near power pins",
    ],
    keywords: ["decoupling", "capacitor", "noise", "ic", "reset", "power"],
    answer:
      "Decoupling capacitors provide a local source of charge for fast current changes and help reduce high-frequency noise on power rails. They are normally placed close to the relevant IC power pins.",
    priority: 9,
  },

  {
    id: "electronics-ground",
    category: "electronics",
    question: "Why is common ground important?",
    variations: [
      "Do two modules need common ground",
      "Why connect grounds together",
      "What happens without common ground",
      "Why is my sensor communication not working",
    ],
    keywords: ["ground", "gnd", "common", "modules", "communication"],
    answer:
      "Digital signals are interpreted relative to a reference voltage. When separate modules communicate electrically, they commonly need a shared ground reference unless the interface is specifically isolated.",
    priority: 9,
  },

  {
    id: "electronics-voltage-divider",
    category: "electronics",
    question: "What is a voltage divider?",
    variations: [
      "How does a voltage divider work",
      "How can I reduce voltage with resistors",
      "What is resistor voltage divider",
      "Can I use resistors to measure voltage",
    ],
    keywords: ["voltage", "divider", "resistor", "adc", "measure"],
    answer:
      "A voltage divider uses resistors to produce a fraction of an input voltage. For two resistors, the unloaded output is approximately Vout = Vin × R2/(R1 + R2). Loading from the connected circuit must also be considered.",
    priority: 8,
  },
] as const;
