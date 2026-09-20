import type { HelpEntry } from "./types";

export const ELECTRONICS_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // CANONICAL DEFINITIONS / PURPOSE
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-purpose",
    category: "electronics",
    intent: "purpose",
    question: "What is electronics used for?",
    variations: [
      "What is electronics used for",
      "What is electronics",
      "What can electronics do",
      "Where is electronics used",
      "What is the purpose of electronics",
      "Electronics applications",
      "Why use electronics",
      "Electronics use cases",
    ],
    keywords: ["electronics", "used", "purpose", "application", "circuit"],
    answer:
      "Electronics is used to process, control and communicate information and energy through circuits. It powers computing, communication, sensing, automation, robotics, IoT, entertainment and many other modern systems.",
    priority: 14,
  },

  {
    id: "electronics-voltage-current",
    category: "electronics",
    intent: "definition",
    question: "What is the difference between voltage and current?",
    variations: [
      "What is the difference between voltage and current",
      "Explain voltage and current",
      "Voltage vs current",
      "What does voltage mean",
      "What does current mean",
      "What is volts and amps",
      "Voltage and current difference",
    ],
    keywords: ["voltage", "current", "volts", "amps", "electricity"],
    answer:
      "Voltage is the electrical potential difference that drives charge through a circuit, while current is the rate at which electric charge flows. Voltage is measured in volts (V), and current is measured in amperes (A).",
    priority: 13,
  },

  {
    id: "electronics-ohms-law",
    category: "electronics",
    intent: "definition",
    question: "What is Ohm's law?",
    variations: [
      "What is Ohm's law",
      "Explain Ohm law",
      "What is V equals IR",
      "How do I calculate voltage current resistance",
      "How are voltage current and resistance related",
      "Ohm's law definition",
    ],
    keywords: ["ohm", "ohms", "voltage", "current", "resistance", "resistor"],
    answer:
      "Ohm's law describes the relationship between voltage, current and resistance: V = I × R. Therefore, I = V/R and R = V/I.",
    priority: 13,
  },

  {
    id: "electronics-power",
    category: "electronics",
    intent: "definition",
    question: "How is electrical power calculated?",
    variations: [
      "How is electrical power calculated",
      "How do I calculate power",
      "What is the power formula",
      "How many watts does a circuit use",
      "How do I calculate watts",
      "Electrical power formula",
    ],
    keywords: ["power", "watts", "voltage", "current", "watt"],
    answer:
      "Electrical power can be calculated as P = V × I, where P is power in watts, V is voltage and I is current. Other useful forms include P = I²R and P = V²/R.",
    priority: 13,
  },

  {
    id: "electronics-ac-dc",
    category: "electronics",
    intent: "comparison",
    question: "What is the difference between AC and DC?",
    variations: [
      "What is the difference between AC and DC",
      "AC vs DC",
      "What is alternating current",
      "What is direct current",
      "Difference between AC and DC electricity",
      "AC and DC difference",
    ],
    keywords: ["ac", "dc", "alternating", "direct", "current"],
    answer:
      "DC flows with a fixed polarity, while AC periodically changes direction and voltage. Batteries commonly provide DC, while household mains electricity is AC.",
    priority: 13,
  },

  {
    id: "electronics-series-parallel",
    category: "electronics",
    intent: "comparison",
    question: "What is the difference between series and parallel circuits?",
    variations: [
      "What is the difference between series and parallel circuits",
      "Series vs parallel",
      "How do series circuits work",
      "How do parallel circuits work",
      "What happens to voltage in series",
      "What happens to current in parallel",
    ],
    keywords: ["series", "parallel", "circuit", "voltage", "current"],
    answer:
      "In a series circuit, components share the same current path and their voltage drops add. In a parallel circuit, branches share the same voltage while current divides between the branches.",
    priority: 13,
  },

  {
    id: "electronics-resistance",
    category: "electronics",
    intent: "definition",
    question: "What is resistance?",
    variations: [
      "What is resistance",
      "What does resistance mean",
      "What is electrical resistance",
      "Resistance vs conductance",
      "How does resistance affect current",
      "Resistance definition",
    ],
    keywords: ["resistance", "ohm", "current", "voltage", "electrical"],
    answer:
      "Resistance is the opposition to the flow of electric current. It is measured in ohms and depends on the material, geometry and temperature of the conductor.",
    priority: 13,
  },

  {
    id: "electronics-conductance",
    category: "electronics",
    intent: "definition",
    question: "What is conductance?",
    variations: [
      "What is conductance",
      "What does conductance mean",
      "Conductance vs resistance",
      "What is siemens",
      "How is conductance calculated",
      "Conductance definition",
    ],
    keywords: ["conductance", "siemens", "resistance", "current", "electrical"],
    answer:
      "Conductance is the reciprocal of resistance and indicates how easily current flows. It is measured in siemens (S).",
    priority: 10,
  },

  {
    id: "electronics-energy",
    category: "electronics",
    intent: "definition",
    question: "What is electrical energy?",
    variations: [
      "What is electrical energy",
      "Energy vs power electronics",
      "How is energy calculated",
      "What is kWh",
      "Electrical energy definition",
      "Electrical energy meaning",
    ],
    keywords: ["energy", "power", "kwh", "joule", "electrical"],
    answer:
      "Electrical energy is the total work done by electrical power over time. It is often measured in joules or kilowatt-hours and is distinct from power, which is the rate of energy transfer.",
    priority: 10,
  },

  {
    id: "electronics-charge",
    category: "electronics",
    intent: "definition",
    question: "What is electric charge?",
    variations: [
      "What is electric charge",
      "What is charge in electronics",
      "Charge vs current",
      "What is a coulomb",
      "Electric charge definition",
      "Electric charge meaning",
    ],
    keywords: ["charge", "coulomb", "current", "electron", "electric"],
    answer:
      "Electric charge is a fundamental property of matter that causes it to experience a force in an electric field. It is measured in coulombs, and current is the rate of charge flow.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // COMPONENT CONCEPTS (generic, not part-level)
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-resistor",
    category: "electronics",
    intent: "definition",
    question: "What does a resistor do?",
    variations: [
      "What does a resistor do",
      "What is a resistor",
      "Why use resistors",
      "What is the purpose of a resistor",
      "How does a resistor work",
      "Resistor function",
    ],
    keywords: ["resistor", "resistance", "current", "voltage"],
    answer:
      "A resistor limits or controls current and creates a voltage drop according to Ohm's law. Resistors are also used for biasing, pull-ups, pull-downs, voltage dividers and signal conditioning.",
    priority: 13,
  },

  {
    id: "electronics-capacitor",
    category: "electronics",
    intent: "definition",
    question: "What does a capacitor do?",
    variations: [
      "What does a capacitor do",
      "What is a capacitor",
      "Why use capacitors",
      "What are capacitors used for",
      "How does a capacitor work",
      "Capacitor function",
    ],
    keywords: ["capacitor", "capacitance", "filter", "noise", "voltage"],
    answer:
      "A capacitor stores electrical energy in an electric field. In circuits it can be used for filtering, decoupling, smoothing, timing and coupling signals.",
    priority: 13,
  },

  {
    id: "electronics-inductor",
    category: "electronics",
    intent: "definition",
    question: "What does an inductor do?",
    variations: [
      "What does an inductor do",
      "What is an inductor",
      "What are coils used for",
      "How does an inductor work",
      "Why use an inductor",
      "Inductor function",
    ],
    keywords: ["inductor", "coil", "inductance", "magnetic"],
    answer:
      "An inductor stores energy in a magnetic field and resists changes in current. Inductors are used in filtering, power converters, energy storage and electromagnetic circuits.",
    priority: 13,
  },

  {
    id: "electronics-diode",
    category: "electronics",
    intent: "definition",
    question: "What does a diode do?",
    variations: [
      "What does a diode do",
      "What is a diode",
      "How does a diode work",
      "Why use a diode",
      "What is diode used for",
      "Diode function",
    ],
    keywords: ["diode", "rectifier", "current", "voltage"],
    answer:
      "A diode primarily allows current to flow in one direction and blocks it in the opposite direction. Different diode types are used for rectification, protection, voltage regulation, switching and signal applications.",
    priority: 13,
  },

  {
    id: "electronics-led",
    category: "electronics",
    intent: "definition",
    question: "What is an LED?",
    variations: [
      "What is an LED",
      "How does an LED work",
      "What is light emitting diode",
      "How do I connect an LED",
      "Why does an LED need a resistor",
      "LED definition",
    ],
    keywords: ["led", "light", "diode", "resistor"],
    answer:
      "An LED is a light-emitting diode. It normally requires current limiting, commonly provided by a series resistor when driven directly from a GPIO or supply.",
    priority: 13,
  },

  {
    id: "electronics-transistor",
    category: "electronics",
    intent: "definition",
    question: "What is a transistor?",
    variations: [
      "What is a transistor",
      "How does a transistor work",
      "What are transistors used for",
      "Why use a transistor",
      "Can a transistor switch a load",
      "Transistor definition",
    ],
    keywords: ["transistor", "switch", "amplifier", "mosfet", "bjt"],
    answer:
      "A transistor is a semiconductor device commonly used for switching or amplification. MOSFETs and BJTs are two major transistor families used in electronic circuits.",
    priority: 13,
  },

  {
    id: "electronics-mosfet",
    category: "electronics",
    intent: "definition",
    question: "What is a MOSFET used for?",
    variations: [
      "What is a MOSFET used for",
      "Why use a MOSFET",
      "Can a MOSFET control a motor",
      "Can I use a MOSFET as a switch",
      "What is a MOSFET",
      "MOSFET function",
    ],
    keywords: ["mosfet", "switch", "motor", "load", "gate"],
    answer:
      "A MOSFET can act as an electronically controlled switch and is often used to control loads such as motors, LEDs, solenoids and other DC loads. Its voltage, current, resistance and gate-drive requirements must match the application.",
    priority: 13,
  },

  {
    id: "electronics-relay",
    category: "electronics",
    intent: "definition",
    question: "What is a relay?",
    variations: [
      "What is a relay",
      "How does a relay work",
      "What is a relay module",
      "Can a microcontroller control a relay",
      "Why use a relay",
      "Relay definition",
    ],
    keywords: ["relay", "switch", "load", "microcontroller", "module"],
    answer:
      "A relay is an electrically controlled switch. A relay module can allow a low-voltage control circuit to switch a separate load, but the relay, module, wiring and load must be rated appropriately.",
    priority: 13,
  },

  {
    id: "electronics-pullup",
    category: "electronics",
    intent: "definition",
    question: "What is a pull-up resistor?",
    variations: [
      "What is a pull-up resistor",
      "Why use pull up resistors",
      "What does pullup mean",
      "Why is my input floating",
      "What is a pull down resistor",
      "Pull-up resistor definition",
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
    priority: 13,
  },

  {
    id: "electronics-debouncing",
    category: "electronics",
    intent: "definition",
    question: "What is switch debouncing?",
    variations: [
      "What is switch debouncing",
      "Why does a button trigger multiple times",
      "How do I debounce a button",
      "What is button debounce",
      "Why does my switch bounce",
      "Switch debouncing definition",
    ],
    keywords: ["debounce", "button", "switch", "bounce", "input"],
    answer:
      "Mechanical switches can rapidly change state for a short period when pressed or released. Debouncing prevents those transitions from being interpreted as multiple button presses. It can be handled in hardware, software, or both.",
    priority: 13,
  },

  {
    id: "electronics-decoupling",
    category: "electronics",
    intent: "definition",
    question: "Why are decoupling capacitors used?",
    variations: [
      "Why are decoupling capacitors used",
      "Why put capacitor near IC",
      "What is a decoupling capacitor",
      "Why does my microcontroller reset",
      "Why put capacitors near power pins",
      "Decoupling capacitor purpose",
    ],
    keywords: ["decoupling", "capacitor", "noise", "ic", "reset", "power"],
    answer:
      "Decoupling capacitors provide a local source of charge for fast current changes and help reduce high-frequency noise on power rails. They are normally placed close to the relevant IC power pins.",
    priority: 13,
  },

  {
    id: "electronics-decoupling-vs-bypass",
    category: "electronics",
    intent: "comparison",
    question:
      "What is the difference between decoupling and bypass capacitors?",
    variations: [
      "What is the difference between decoupling and bypass capacitors",
      "Decoupling vs bypass capacitor",
      "What is a bypass capacitor",
      "Why use bypass capacitors",
      "Decoupling capacitor purpose",
      "Decoupling vs bypass",
    ],
    keywords: ["decoupling", "bypass", "capacitor", "noise", "power"],
    answer:
      "Both provide a local low-impedance path for high-frequency currents. Decoupling typically refers to capacitors near IC power pins that supply transient current and reduce power rail noise. Bypass often refers to providing an AC path around a component or to ground. The terms are sometimes used interchangeably.",
    priority: 10,
  },

  {
    id: "electronics-ground",
    category: "electronics",
    intent: "definition",
    question: "Why is common ground important?",
    variations: [
      "Why is common ground important",
      "Do two modules need common ground",
      "Why connect grounds together",
      "What happens without common ground",
      "Why is my sensor communication not working",
      "Common ground purpose",
    ],
    keywords: ["ground", "gnd", "common", "modules", "communication"],
    answer:
      "Digital signals are interpreted relative to a reference voltage. When separate modules communicate electrically, they commonly need a shared ground reference unless the interface is specifically isolated.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // CIRCUIT ANALYSIS
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-voltage-divider",
    category: "electronics",
    intent: "definition",
    question: "What is a voltage divider?",
    variations: [
      "What is a voltage divider",
      "How does a voltage divider work",
      "How can I reduce voltage with resistors",
      "What is resistor voltage divider",
      "Can I use resistors to measure voltage",
      "Voltage divider definition",
    ],
    keywords: ["voltage", "divider", "resistor", "adc", "measure"],
    answer:
      "A voltage divider uses resistors to produce a fraction of an input voltage. For two resistors, the unloaded output is approximately Vout = Vin × R2/(R1 + R2). Loading from the connected circuit must also be considered.",
    priority: 13,
  },

  {
    id: "electronics-kirchhoff",
    category: "electronics",
    intent: "definition",
    question: "What are Kirchhoff's laws?",
    variations: [
      "What are Kirchhoff's laws",
      "Explain Kirchhoff voltage law",
      "What is KVL and KCL",
      "Kirchhoff current law",
      "How to analyze a circuit with Kirchhoff",
      "Kirchhoff laws definition",
    ],
    keywords: ["kirchhoff", "kvl", "kcl", "circuit", "law"],
    answer:
      "Kirchhoff's current law states that the sum of currents entering a node equals the sum leaving it. Kirchhoff's voltage law states that the algebraic sum of voltages around a closed loop is zero. These laws are used to analyze complex circuits.",
    priority: 13,
  },

  {
    id: "electronics-thevenin",
    category: "electronics",
    intent: "definition",
    question: "What is Thevenin's theorem?",
    variations: [
      "What is Thevenin's theorem",
      "Explain Thevenin equivalent",
      "How to simplify a circuit",
      "Thevenin vs Norton",
      "What is Thevenin voltage",
      "Thevenin theorem definition",
    ],
    keywords: ["thevenin", "equivalent", "circuit", "voltage", "resistance"],
    answer:
      "Thevenin's theorem allows a linear circuit to be represented as a single voltage source and series resistance. This simplifies analysis, especially when only the behavior at a particular load or terminal pair is needed.",
    priority: 10,
  },

  {
    id: "electronics-impedance",
    category: "electronics",
    intent: "definition",
    question: "What is impedance?",
    variations: [
      "What is impedance",
      "What is electrical impedance",
      "Impedance vs resistance",
      "How does impedance affect a circuit",
      "What is AC impedance",
      "Impedance definition",
    ],
    keywords: ["impedance", "resistance", "ac", "reactance", "circuit"],
    answer:
      "Impedance is the opposition to alternating current and includes resistance plus reactance from capacitors and inductors. It is frequency-dependent and is important in AC circuits, filters and signal transmission.",
    priority: 13,
  },

  {
    id: "electronics-reactance",
    category: "electronics",
    intent: "definition",
    question: "What is reactance?",
    variations: [
      "What is reactance",
      "Capacitive vs inductive reactance",
      "Reactance vs resistance",
      "How is reactance calculated",
      "Reactance definition",
      "Reactance meaning",
    ],
    keywords: ["reactance", "capacitive", "inductive", "ac", "impedance"],
    answer:
      "Reactance is the opposition to AC caused by capacitance or inductance. It is frequency-dependent and, together with resistance, forms impedance.",
    priority: 10,
  },

  {
    id: "electronics-filter",
    category: "electronics",
    intent: "definition",
    question: "What is a filter circuit?",
    variations: [
      "What is a filter circuit",
      "What is a low pass filter",
      "High pass vs low pass",
      "How do filters work",
      "What is a filter used for",
      "Filter circuit definition",
    ],
    keywords: ["filter", "low", "high", "pass", "frequency"],
    answer:
      "A filter circuit selectively passes or blocks certain frequencies. Low-pass filters pass lower frequencies, high-pass filters pass higher frequencies, and band-pass or band-stop filters pass or block a range. They are commonly built with resistors, capacitors and inductors.",
    priority: 13,
  },

  {
    id: "electronics-rectifier",
    category: "electronics",
    intent: "definition",
    question: "What is a rectifier?",
    variations: [
      "What is a rectifier",
      "How does a rectifier work",
      "What is a bridge rectifier",
      "Half wave vs full wave rectifier",
      "How to convert AC to DC",
      "Rectifier definition",
    ],
    keywords: ["rectifier", "ac", "dc", "bridge", "diode"],
    answer:
      "A rectifier converts alternating current into direct current using diodes. Half-wave rectifiers use a single diode, while full-wave and bridge rectifiers use multiple diodes to use both halves of the AC waveform.",
    priority: 13,
  },

  {
    id: "electronics-regulator",
    category: "electronics",
    intent: "definition",
    question: "How does a voltage regulator work?",
    variations: [
      "How does a voltage regulator work",
      "What is a linear regulator",
      "What is a switching regulator",
      "Linear vs switching regulator",
      "What is an LDO",
      "Voltage regulator definition",
    ],
    keywords: ["regulator", "linear", "switching", "ldo", "buck", "boost"],
    answer:
      "A linear regulator adjusts its resistance to maintain a stable output voltage, dissipating excess power as heat. A switching regulator rapidly switches energy through inductors and capacitors for higher efficiency. The choice depends on input/output voltages, current, efficiency and noise requirements.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // GROUNDING / NOISE / EMI
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-grounding",
    category: "electronics",
    intent: "procedure",
    question: "What are good grounding practices?",
    variations: [
      "What are good grounding practices",
      "How to ground a circuit",
      "Why is grounding important",
      "Star ground vs ground plane",
      "How to reduce ground noise",
      "Grounding best practices",
    ],
    keywords: ["ground", "grounding", "noise", "plane", "star"],
    answer:
      "Use a low-impedance ground reference, keep high-current return paths separate from sensitive signals where appropriate, and consider a ground plane for PCBs. Poor grounding can cause noise, instability and measurement errors.",
    priority: 13,
  },

  {
    id: "electronics-ground-loop",
    category: "electronics",
    intent: "troubleshooting",
    question: "What is a ground loop and why is it a problem?",
    variations: [
      "What is a ground loop and why is it a problem",
      "Ground loop noise",
      "Why do I have a ground loop",
      "How to fix ground loop",
      "Multiple ground paths causing noise",
      "Ground loop definition",
    ],
    keywords: ["ground", "loop", "noise", "hum", "reference"],
    answer:
      "A ground loop occurs when multiple ground paths create a closed loop, allowing circulating currents and voltage differences that can add noise or interference. Careful grounding, single-point references, isolation or appropriate signal conditioning can reduce the problem.",
    priority: 10,
  },

  {
    id: "electronics-noise-coupling",
    category: "electronics",
    intent: "definition",
    question: "How does noise couple into circuits?",
    variations: [
      "How does noise couple into circuits",
      "How does interference get into a circuit",
      "Capacitive coupling noise",
      "Inductive coupling noise",
      "Conducted vs radiated noise",
      "Noise coupling definition",
    ],
    keywords: ["noise", "coupling", "capacitive", "inductive", "conducted"],
    answer:
      "Noise can couple capacitively through electric fields, inductively through magnetic fields, conductively through shared power or ground paths, or radiate through space. Understanding the coupling path helps choose effective filtering, shielding, grounding or layout improvements.",
    priority: 13,
  },

  {
    id: "electronics-common-mode",
    category: "electronics",
    intent: "definition",
    question: "What is common-mode noise?",
    variations: [
      "What is common-mode noise",
      "Common mode vs differential mode",
      "How to reduce common mode noise",
      "What is common mode voltage",
      "Common mode choke",
      "Common-mode noise definition",
    ],
    keywords: ["common", "mode", "noise", "differential", "choke"],
    answer:
      "Common-mode noise appears equally on both signal lines relative to ground, while differential-mode noise appears between the lines. Common-mode chokes, balanced wiring and isolation can reduce common-mode interference in cables and interfaces.",
    priority: 10,
  },

  {
    id: "electronics-isolation",
    category: "electronics",
    intent: "definition",
    question: "What is galvanic isolation?",
    variations: [
      "What is galvanic isolation",
      "What is electrical isolation",
      "Why use optocoupler",
      "Isolation in circuits",
      "Digital isolator vs optocoupler",
      "Galvanic isolation definition",
    ],
    keywords: ["isolation", "galvanic", "optocoupler", "transformer", "safety"],
    answer:
      "Galvanic isolation prevents direct electrical conduction between two parts of a circuit while still allowing signal or power transfer. It is used for safety, ground-loop breaking, noise reduction and interfacing different voltage domains. Common methods include optocouplers, digital isolators and transformers.",
    priority: 13,
  },

  {
    id: "electronics-emi",
    category: "electronics",
    intent: "troubleshooting",
    question: "Why does my circuit interfere with other devices?",
    variations: [
      "Why does my circuit interfere with other devices",
      "EMI from my project",
      "My circuit causes interference",
      "How to reduce electromagnetic interference",
      "Radio interference from electronics",
      "EMI causes and fixes",
    ],
    keywords: ["emi", "interference", "noise", "radio", "shielding"],
    answer:
      "Switching supplies, motors, relays, long wires and fast digital signals can radiate or conduct interference. Proper layout, filtering, shielding, twisted pairs, snubbers and separation of noisy and sensitive circuits can reduce EMI depending on the source.",
    priority: 10,
  },

  {
    id: "electronics-emc",
    category: "electronics",
    intent: "definition",
    question: "What is EMC?",
    variations: [
      "What is EMC",
      "What is electromagnetic compatibility",
      "Why does EMC matter",
      "How to design for EMC",
      "EMI vs EMC",
      "EMC definition",
    ],
    keywords: ["emc", "emi", "compatibility", "noise", "interference"],
    answer:
      "EMC, or electromagnetic compatibility, means a device operates without causing excessive interference and without being unduly affected by interference. Good layout, filtering, shielding and grounding help achieve EMC.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // INDUCTIVE LOADS / INRUSH / PROTECTION
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-inductive-load",
    category: "electronics",
    intent: "definition",
    question: "Why do inductive loads need protection?",
    variations: [
      "Why do inductive loads need protection",
      "Why use a flyback diode",
      "What happens when a relay turns off",
      "Inductive kickback protection",
      "Motor back EMF protection",
      "Inductive load protection",
    ],
    keywords: ["inductive", "flyback", "diode", "relay", "motor", "back emf"],
    answer:
      "Inductive loads such as relays, solenoids and motors can generate a voltage spike when current is interrupted. A flyback diode, snubber or other suppression method can protect the driving circuit from damage.",
    priority: 13,
  },

  {
    id: "electronics-inrush",
    category: "electronics",
    intent: "definition",
    question: "What is inrush current?",
    variations: [
      "What is inrush current",
      "Why does my fuse blow at startup",
      "What is inrush current",
      "Why does my power supply trip on start",
      "Capacitive load startup current",
      "Inrush current definition",
    ],
    keywords: ["inrush", "startup", "current", "capacitor", "fuse"],
    answer:
      "Inrush current is a brief high current that can occur when a circuit starts, especially with capacitive loads, motors or transformers. It can trip fuses, reset supplies or stress components. Soft-start circuits or appropriate ratings can help manage it.",
    priority: 13,
  },

  {
    id: "electronics-current-limit",
    category: "electronics",
    intent: "procedure",
    question: "How do I limit current in a circuit?",
    variations: [
      "How do I limit current in a circuit",
      "Current limiting methods",
      "How to limit current",
      "Resistor current limit",
      "Current limit circuit",
      "Current limiting techniques",
    ],
    keywords: ["current", "limit", "resistor", "protection", "circuit"],
    answer:
      "Current can be limited with series resistors, dedicated current-limit ICs, active current sources, or by choosing drivers and supplies with built-in current limiting. The method depends on efficiency, accuracy and protection requirements.",
    priority: 10,
  },

  {
    id: "electronics-fuse-selection",
    category: "electronics",
    intent: "requirements",
    question: "How do I choose a fuse?",
    variations: [
      "How do I choose a fuse",
      "What fuse rating should I use",
      "How to size a fuse",
      "Fuse voltage and current rating",
      "Fast blow vs slow blow fuse",
      "Fuse selection guide",
    ],
    keywords: ["fuse", "rating", "current", "voltage", "slow", "fast"],
    answer:
      "Select a fuse with the correct current rating, voltage rating and breaking capacity for the circuit. Consider normal operating current, inrush current and the required time-current behavior. The fuse should protect the wiring and equipment without nuisance blowing.",
    priority: 13,
  },

  {
    id: "electronics-circuit-protection",
    category: "electronics",
    intent: "procedure",
    question: "What protection should I add to a circuit?",
    variations: [
      "What protection should I add to a circuit",
      "Circuit protection methods",
      "How to protect from overvoltage",
      "Reverse polarity protection",
      "Overcurrent protection",
      "Circuit protection options",
    ],
    keywords: ["protection", "overvoltage", "overcurrent", "reverse", "esd"],
    answer:
      "Depending on the application, protection can include fuses, resettable fuses, TVS diodes, reverse-polarity protection, overvoltage clamps, ESD protection and isolation. The correct combination depends on the expected fault conditions and the value of the equipment being protected.",
    priority: 13,
  },

  {
    id: "electronics-thermal",
    category: "electronics",
    intent: "procedure",
    question: "How do I manage heat in electronic circuits?",
    variations: [
      "How do I manage heat in electronic circuits",
      "How to cool electronics",
      "Why do components get hot",
      "Thermal management basics",
      "How to calculate heatsink",
      "Thermal management options",
    ],
    keywords: ["heat", "thermal", "cooling", "heatsink", "temperature"],
    answer:
      "Heat can be managed by reducing power dissipation, using efficient components, providing copper area or heatsinks, ensuring airflow and keeping components within their temperature ratings. Thermal calculations should consider ambient temperature and enclosure conditions.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SUPPLIES / BATTERIES / CHARGING
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-power-supply",
    category: "electronics",
    intent: "definition",
    question: "What is a power supply?",
    variations: [
      "What is a power supply",
      "What does power supply do",
      "Types of power supplies",
      "How to choose power supply",
      "Linear vs switching power supply",
      "Power supply definition",
    ],
    keywords: ["power", "supply", "linear", "switching", "voltage"],
    answer:
      "A power supply converts input power to a suitable output voltage and current for a circuit. Types include linear, switching, bench and wall adapters.",
    priority: 13,
  },

  {
    id: "electronics-battery-chemistry",
    category: "electronics",
    intent: "comparison",
    question: "What are common battery chemistries?",
    variations: [
      "What are common battery chemistries",
      "Lithium vs NiMH",
      "Battery types",
      "What is LiPo",
      "Lead acid vs lithium",
      "Battery chemistry comparison",
    ],
    keywords: ["battery", "lithium", "nimh", "lipo", "chemistry", "lead"],
    answer:
      "Common chemistries include alkaline, NiMH, lithium-ion, lithium-polymer and lead-acid. Each has different voltage, energy density, discharge capability, cycle life, safety and charging requirements. Selection depends on the application.",
    priority: 13,
  },

  {
    id: "electronics-charging",
    category: "electronics",
    intent: "procedure",
    question: "How do I charge a battery safely?",
    variations: [
      "How do I charge a battery safely",
      "Battery charging circuit",
      "Can I charge lithium with any charger",
      "How to charge LiPo",
      "Why do batteries need special chargers",
      "Battery charging safety",
    ],
    keywords: ["battery", "charge", "charger", "lithium", "safety"],
    answer:
      "Battery charging must match the chemistry and cell configuration, with correct voltage, current and termination method. Lithium batteries require proper charge control and protection. Using an unsuitable charger can damage the battery or create a safety hazard.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // MOSFET / TRANSISTOR DRIVING / OP-AMP / COMPARATOR
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-mosfet-drive",
    category: "electronics",
    intent: "procedure",
    question: "How do I drive a MOSFET gate?",
    variations: [
      "How do I drive a MOSFET gate",
      "Why does my MOSFET get hot",
      "MOSFET gate resistor",
      "How to drive a MOSFET with 3.3V",
      "High side vs low side MOSFET",
      "MOSFET gate driving",
    ],
    keywords: ["mosfet", "gate", "drive", "resistor", "voltage"],
    answer:
      "The gate must be driven to a voltage that fully enhances the MOSFET for the intended current. A gate resistor may be used to control switching speed and ringing. Logic-level MOSFETs are available for lower gate-drive voltages. High-side switching usually needs additional drive circuitry.",
    priority: 13,
  },

  {
    id: "electronics-transistor-switch",
    category: "electronics",
    intent: "procedure",
    question: "How do I use a transistor as a switch?",
    variations: [
      "How do I use a transistor as a switch",
      "Transistor switch circuit",
      "How to switch a relay with transistor",
      "Why does my transistor get hot",
      "Base resistor calculation",
      "Transistor as a switch",
    ],
    keywords: ["transistor", "switch", "base", "resistor", "relay"],
    answer:
      "For a BJT switch, the base is driven through a resistor so the transistor saturates for the load current. For a MOSFET, the gate is driven to the appropriate voltage. The transistor must be rated for the load voltage and current, and inductive loads may need a flyback diode.",
    priority: 13,
  },

  {
    id: "electronics-opamp-basics",
    category: "electronics",
    intent: "definition",
    question: "How does an operational amplifier work?",
    variations: [
      "How does an operational amplifier work",
      "Op-amp basics",
      "What is an op-amp used for",
      "How to use an op-amp",
      "Inverting vs non-inverting amplifier",
      "Op-amp definition",
    ],
    keywords: ["opamp", "amplifier", "gain", "inverting", "non-inverting"],
    answer:
      "An op-amp amplifies the difference between its inputs and is normally used with feedback to set gain and behavior. Common configurations include inverting, non-inverting, buffer, summing and filter circuits. Supply range, bandwidth and input limits must be considered.",
    priority: 13,
  },

  {
    id: "electronics-comparator",
    category: "electronics",
    intent: "definition",
    question: "How does a voltage comparator work?",
    variations: [
      "How does a voltage comparator work",
      "What is a comparator",
      "Comparator vs op-amp",
      "How to detect a voltage threshold",
      "Comparator with hysteresis",
      "Comparator definition",
    ],
    keywords: ["comparator", "voltage", "threshold", "hysteresis", "opamp"],
    answer:
      "A comparator compares two input voltages and produces a digital output indicating which is higher. Hysteresis is often added to prevent output chatter when the input is near the threshold.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PWM / ADC / DAC / SIGNAL CONDITIONING (electronics-level)
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-pwm",
    category: "electronics",
    intent: "definition",
    question: "What is PWM in electronics?",
    variations: [
      "What is PWM in electronics",
      "What is pulse width modulation",
      "How does PWM control power",
      "Why use PWM for motors",
      "PWM duty cycle",
      "PWM definition",
    ],
    keywords: ["pwm", "pulse", "width", "modulation", "duty", "motor"],
    answer:
      "PWM rapidly switches a signal between on and off states and varies the duty cycle. The average power delivered to a load can be controlled, making PWM useful for motor speed, LED brightness and heating control.",
    priority: 13,
  },

  {
    id: "electronics-adc",
    category: "electronics",
    intent: "definition",
    question: "How does an ADC work?",
    variations: [
      "How does an ADC work",
      "What is analog to digital conversion",
      "ADC resolution",
      "How to read analog voltage",
      "What is ADC reference voltage",
      "ADC definition",
    ],
    keywords: ["adc", "analog", "digital", "resolution", "reference"],
    answer:
      "An ADC converts an analog voltage into a digital number. Resolution determines the number of steps, and the reference voltage sets the conversion range. Accuracy depends on reference stability, noise, input impedance and sampling method.",
    priority: 13,
  },

  {
    id: "electronics-dac",
    category: "electronics",
    intent: "definition",
    question: "What is a DAC?",
    variations: [
      "What is a DAC",
      "What is digital to analog conversion",
      "How does a DAC work",
      "Where is a DAC used",
      "PWM vs DAC",
      "DAC definition",
    ],
    keywords: ["dac", "digital", "analog", "conversion", "output"],
    answer:
      "A DAC converts a digital value into an analog voltage or current. DACs are used for audio, waveform generation, control outputs and other applications where an analog signal is needed. PWM with filtering can approximate a DAC in some cases.",
    priority: 13,
  },

  {
    id: "electronics-sensor-signal",
    category: "electronics",
    intent: "procedure",
    question: "How do I condition a sensor signal?",
    variations: [
      "How do I condition a sensor signal",
      "Sensor signal conditioning",
      "How to amplify sensor output",
      "How to filter sensor signal",
      "Why condition a sensor signal",
      "Sensor signal conditioning methods",
    ],
    keywords: ["sensor", "signal", "conditioning", "amplify", "filter"],
    answer:
      "Signal conditioning may include amplification, filtering, level shifting, isolation, linearization or impedance matching so the sensor output is compatible with the ADC or controller input. The required conditioning depends on the sensor and measurement environment.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SIGNAL / AC CONCEPTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-decibel",
    category: "electronics",
    intent: "definition",
    question: "What is a decibel in electronics?",
    variations: [
      "What is a decibel in electronics",
      "What is dB",
      "How to calculate decibels",
      "What does -3dB mean",
      "Decibel in signal measurement",
      "Decibel definition",
    ],
    keywords: ["decibel", "db", "signal", "gain", "power"],
    answer:
      "A decibel is a logarithmic unit used to express ratios of power or amplitude. It is commonly used for gain, loss, signal levels and frequency response. For power, dB = 10 log(P2/P1); for voltage or amplitude, dB = 20 log(V2/V1).",
    priority: 10,
  },

  {
    id: "electronics-rms",
    category: "electronics",
    intent: "definition",
    question: "What is RMS voltage?",
    variations: [
      "What is RMS voltage",
      "What is root mean square",
      "RMS vs peak voltage",
      "How to calculate RMS",
      "Why use RMS for AC",
      "RMS definition",
    ],
    keywords: ["rms", "root", "mean", "square", "ac", "voltage"],
    answer:
      "RMS, or root mean square, is a way to express the effective value of an alternating voltage or current. It represents the equivalent DC value that would produce the same heating effect. For a sine wave, Vrms = Vpeak / √2.",
    priority: 10,
  },

  {
    id: "electronics-power-factor",
    category: "electronics",
    intent: "definition",
    question: "What is power factor?",
    variations: [
      "What is power factor",
      "Explain power factor",
      "Why is power factor important",
      "Power factor correction",
      "Real vs apparent power",
      "Power factor definition",
    ],
    keywords: ["power", "factor", "ac", "real", "apparent"],
    answer:
      "Power factor is the ratio of real power to apparent power in an AC circuit. It is affected by inductive or capacitive loads. Low power factor means more current is required for the same real power, which can affect efficiency and supply sizing.",
    priority: 10,
  },

  {
    id: "electronics-harmonics",
    category: "electronics",
    intent: "definition",
    question: "What are harmonics in electronics?",
    variations: [
      "What are harmonics in electronics",
      "What causes harmonics",
      "Harmonics in power systems",
      "Why are harmonics a problem",
      "How to reduce harmonics",
      "Harmonics definition",
    ],
    keywords: ["harmonics", "frequency", "power", "distortion", "noise"],
    answer:
      "Harmonics are frequency components that are integer multiples of a fundamental frequency. They can be caused by non-linear loads and can cause heating, interference and power quality issues. Filtering and good design can reduce their impact.",
    priority: 10,
  },

  {
    id: "electronics-dc-offset",
    category: "electronics",
    intent: "definition",
    question: "What is DC offset?",
    variations: [
      "What is DC offset",
      "What does DC offset mean",
      "How to remove DC offset",
      "Why is there DC on my signal",
      "AC coupling capacitor",
      "DC offset definition",
    ],
    keywords: ["dc", "offset", "signal", "ac", "coupling"],
    answer:
      "DC offset is a constant voltage component added to a signal. It can be intentional for biasing or unwanted due to circuit conditions. AC coupling with a capacitor or offset correction can remove it where necessary.",
    priority: 10,
  },

  {
    id: "electronics-frequency-response",
    category: "electronics",
    intent: "definition",
    question: "What is frequency response?",
    variations: [
      "What is frequency response",
      "Explain frequency response",
      "Why does gain change with frequency",
      "What is bandwidth",
      "How to measure frequency response",
      "Frequency response definition",
    ],
    keywords: ["frequency", "response", "bandwidth", "gain", "signal"],
    answer:
      "Frequency response describes how a circuit's gain or output amplitude varies with frequency. Bandwidth is the range over which the circuit operates within specified limits. It is important for amplifiers, filters and communication circuits.",
    priority: 10,
  },

  {
    id: "electronics-slew-rate",
    category: "electronics",
    intent: "definition",
    question: "What is slew rate?",
    variations: [
      "What is slew rate",
      "What does slew rate mean",
      "Why does an op-amp have slew rate",
      "How does slew rate affect signals",
      "Slew rate limitation",
      "Slew rate definition",
    ],
    keywords: ["slew", "rate", "opamp", "signal", "speed"],
    answer:
      "Slew rate is the maximum rate of change of a circuit's output voltage, typically expressed in volts per microsecond. It limits how fast a signal can change and can cause distortion in high-frequency or large-amplitude applications.",
    priority: 10,
  },

  {
    id: "electronics-phase",
    category: "electronics",
    intent: "definition",
    question: "What is phase in electronics?",
    variations: [
      "What is phase in electronics",
      "What is phase angle",
      "Phase difference between signals",
      "Why is phase important",
      "Phase in AC circuits",
      "Phase definition",
    ],
    keywords: ["phase", "angle", "ac", "signal", "difference"],
    answer:
      "Phase describes the timing relationship between two periodic signals or between voltage and current in an AC circuit. Phase differences are important in power, filters, oscillators and communication systems.",
    priority: 9,
  },

  {
    id: "electronics-oscillator",
    category: "electronics",
    intent: "definition",
    question: "What is an oscillator?",
    variations: [
      "What is an oscillator",
      "How does an oscillator work",
      "What is an oscillator used for",
      "Types of oscillators",
      "Why does my circuit oscillate",
      "Oscillator definition",
    ],
    keywords: ["oscillator", "frequency", "clock", "signal", "wave"],
    answer:
      "An oscillator generates a periodic signal, such as a sine, square or triangle wave. It is used for clocks, timing, communication and signal generation. Oscillators can be based on crystals, RC networks, LC tanks or other resonant elements.",
    priority: 13,
  },

  {
    id: "electronics-feedback",
    category: "electronics",
    intent: "definition",
    question: "What is feedback in electronics?",
    variations: [
      "What is feedback in electronics",
      "Negative feedback vs positive feedback",
      "Why use feedback in amplifiers",
      "How does feedback work",
      "Feedback in op-amp circuits",
      "Feedback definition",
    ],
    keywords: ["feedback", "negative", "positive", "amplifier", "control"],
    answer:
      "Feedback returns a portion of the output to the input. Negative feedback improves stability, linearity and bandwidth in amplifiers. Positive feedback can cause oscillation or switching behavior and is used in oscillators and comparators with hysteresis.",
    priority: 13,
  },

  {
    id: "electronics-common-emitter",
    category: "electronics",
    intent: "definition",
    question: "What is a common emitter amplifier?",
    variations: [
      "What is a common emitter amplifier",
      "Common emitter configuration",
      "How does a BJT amplifier work",
      "Common emitter gain",
      "Transistor amplifier basics",
      "Common emitter definition",
    ],
    keywords: ["common", "emitter", "amplifier", "bjt", "gain"],
    answer:
      "A common-emitter amplifier uses a BJT with the emitter as the common terminal for input and output. It provides voltage and current gain and inverts the signal. Biasing, gain and bandwidth depend on the surrounding components.",
    priority: 9,
  },

  {
    id: "electronics-differential-pair",
    category: "electronics",
    intent: "definition",
    question: "What is a differential pair?",
    variations: [
      "What is a differential pair",
      "Differential pair explained",
      "Why use differential signals",
      "Differential vs single ended",
      "Differential pair in op-amp",
      "Differential pair definition",
    ],
    keywords: ["differential", "pair", "signal", "noise", "opamp"],
    answer:
      "A differential pair uses two complementary signal paths to carry information. It improves noise immunity and is fundamental in op-amp input stages and high-speed signal transmission. The difference between the two signals carries the information.",
    priority: 10,
  },

  {
    id: "electronics-differential-signaling",
    category: "electronics",
    intent: "definition",
    question: "What is differential signaling?",
    variations: [
      "What is differential signaling",
      "Differential signal advantages",
      "Why use differential pairs",
      "RS485 differential",
      "USB differential",
      "Differential signaling definition",
    ],
    keywords: ["differential", "signaling", "pair", "noise", "rs485"],
    answer:
      "Differential signaling transmits information as the difference between two complementary signals. It provides better noise immunity, reduced EMI and improved signal integrity, and is used in interfaces such as RS-485, USB and Ethernet.",
    priority: 13,
  },

  {
    id: "electronics-single-ended",
    category: "electronics",
    intent: "definition",
    question: "What is single-ended signaling?",
    variations: [
      "What is single-ended signaling",
      "Single ended vs differential",
      "What is single ended signal",
      "Single ended advantages",
      "When to use single ended",
      "Single-ended definition",
    ],
    keywords: ["single", "ended", "signal", "differential", "ground"],
    answer:
      "Single-ended signaling uses one conductor referenced to ground. It is simpler and requires fewer wires but is more susceptible to noise and ground differences than differential signaling. It is common for short, low-speed connections.",
    priority: 10,
  },

  {
    id: "electronics-impedance-matching",
    category: "electronics",
    intent: "definition",
    question: "What is impedance matching?",
    variations: [
      "What is impedance matching",
      "Why match impedance",
      "How to match impedance",
      "What happens if impedance is mismatched",
      "RF impedance matching",
      "Impedance matching definition",
    ],
    keywords: ["impedance", "matching", "rf", "signal", "reflection"],
    answer:
      "Impedance matching ensures maximum power transfer or minimizes signal reflection between a source and load. It is especially important in RF, high-speed digital and communication systems. Matching networks use components such as resistors, capacitors, inductors or transformers.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PCB-AS-CONCEPT (electronics perspective)
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-pcb-trace",
    category: "electronics",
    intent: "requirements",
    question: "How wide should a PCB trace be?",
    variations: [
      "How wide should a PCB trace be",
      "PCB trace width calculation",
      "How to size traces for current",
      "Why do traces need width",
      "Trace width vs current",
      "PCB trace width guide",
    ],
    keywords: ["pcb", "trace", "width", "current", "temperature"],
    answer:
      "Trace width depends on current, allowable temperature rise, copper thickness and environment. Wider traces have lower resistance and can carry more current. Online calculators and IPC guidelines can help estimate suitable widths.",
    priority: 13,
  },

  {
    id: "electronics-current-capacity",
    category: "electronics",
    intent: "requirements",
    question: "How much current can a PCB trace carry?",
    variations: [
      "How much current can a PCB trace carry",
      "PCB trace current capacity",
      "How to calculate trace current",
      "Why do traces heat up",
      "Trace width for amps",
      "PCB trace current guide",
    ],
    keywords: ["pcb", "trace", "current", "capacity", "width", "temperature"],
    answer:
      "Trace current capacity depends on width, copper thickness, allowable temperature rise and environment. IPC guidelines or calculators can estimate suitable values. External traces generally carry more current than internal traces for the same width.",
    priority: 10,
  },

  {
    id: "electronics-pcb-layers",
    category: "electronics",
    intent: "requirements",
    question: "How many layers should a PCB have?",
    variations: [
      "How many layers should a PCB have",
      "Single layer vs double layer PCB",
      "When to use 4 layer PCB",
      "PCB layer stackup",
      "How to choose PCB layers",
      "PCB layer count guide",
    ],
    keywords: ["pcb", "layers", "single", "double", "four", "stackup"],
    answer:
      "The number of layers depends on routing complexity, signal integrity, power distribution, EMI requirements, cost and manufacturing constraints. Simple projects may use one or two layers, while high-speed or dense designs often benefit from four or more layers.",
    priority: 13,
  },

  {
    id: "electronics-via",
    category: "electronics",
    intent: "definition",
    question: "What is a via in a PCB?",
    variations: [
      "What is a via in a PCB",
      "What does a via do",
      "Via types",
      "Blind vs buried via",
      "Why use vias",
      "Via definition",
    ],
    keywords: ["via", "pcb", "layers", "connection", "drill"],
    answer:
      "A via is a plated hole that connects conductive layers in a PCB. Vias can be through-hole, blind or buried depending on the layer connection and manufacturing process. They are used for routing, thermal conduction and ground connections.",
    priority: 13,
  },

  {
    id: "electronics-via-types",
    category: "electronics",
    intent: "comparison",
    question: "What are the different via types?",
    variations: [
      "What are the different via types",
      "Through hole vs blind via",
      "Buried via PCB",
      "Via types explained",
      "Microvia PCB",
      "PCB via types",
    ],
    keywords: ["via", "types", "through", "blind", "buried"],
    answer:
      "Via types include through-hole (top to bottom), blind (outer to inner layer), buried (inner to inner layer) and microvias. The type affects routing flexibility, cost and manufacturing complexity.",
    priority: 10,
  },

  {
    id: "electronics-return-path",
    category: "electronics",
    intent: "definition",
    question: "Why is the return path important?",
    variations: [
      "Why is the return path important",
      "Signal return path",
      "Ground return current",
      "Why does return path matter in PCB",
      "Current return path",
      "Return path definition",
    ],
    keywords: ["return", "path", "ground", "current", "signal"],
    answer:
      "Every signal current must return to its source. The return path should be direct and low-impedance, especially for high-speed signals. Poor return paths cause noise, EMI and signal integrity problems. Ground planes help provide a controlled return path.",
    priority: 13,
  },

  {
    id: "electronics-pcb-ground-plane",
    category: "electronics",
    intent: "definition",
    question: "What is a PCB ground plane?",
    variations: [
      "What is a PCB ground plane",
      "Why use ground plane",
      "Ground plane benefits",
      "How to design ground plane",
      "Ground plane vs traces",
      "Ground plane definition",
    ],
    keywords: ["pcb", "ground", "plane", "return", "noise"],
    answer:
      "A ground plane is a large conductive area, usually on a PCB layer, that provides a low-impedance return path and helps shield signals. It reduces noise, improves signal integrity and supports controlled impedance for high-speed traces.",
    priority: 13,
  },

  {
    id: "electronics-star-ground",
    category: "electronics",
    intent: "definition",
    question: "What is star grounding?",
    variations: [
      "What is star grounding",
      "Star ground vs ground plane",
      "How to implement star ground",
      "Why use star grounding",
      "Grounding for mixed signal circuits",
      "Star grounding definition",
    ],
    keywords: ["star", "ground", "grounding", "noise", "analog"],
    answer:
      "Star grounding connects separate circuit grounds to a single reference point to avoid shared ground currents causing interference. It is often used in mixed analog/digital or power systems, though PCB ground planes are common for high-speed designs.",
    priority: 10,
  },

  {
    id: "electronics-analog-digital-ground",
    category: "electronics",
    intent: "procedure",
    question: "Should analog and digital grounds be separated?",
    variations: [
      "Should analog and digital grounds be separated",
      "Analog ground vs digital ground",
      "Do I need separate grounds",
      "Mixed signal grounding",
      "How to connect analog and digital ground",
      "Analog digital ground separation",
    ],
    keywords: ["analog", "digital", "ground", "mixed", "signal"],
    answer:
      "Analog and digital grounds are often separated to keep digital return currents away from sensitive analog signals, then joined at a suitable point. The best approach depends on the design, and a solid ground plane with careful partitioning may be preferable in many cases.",
    priority: 10,
  },

  {
    id: "electronics-thermal-via",
    category: "electronics",
    intent: "definition",
    question: "What are thermal vias?",
    variations: [
      "What are thermal vias",
      "Thermal via purpose",
      "How to use thermal vias",
      "PCB heat dissipation",
      "Thermal relief vs thermal via",
      "Thermal via definition",
    ],
    keywords: ["thermal", "via", "pcb", "heat", "dissipation"],
    answer:
      "Thermal vias conduct heat from a component or copper area to other layers or a heatsink. They are commonly used under power components and in thermal pads to improve heat dissipation.",
    priority: 10,
  },

  {
    id: "electronics-copper-pour",
    category: "electronics",
    intent: "definition",
    question: "What is a copper pour?",
    variations: [
      "What is a copper pour",
      "Copper pour purpose",
      "Why use copper pour on PCB",
      "Copper fill in PCB",
      "Ground pour",
      "Copper pour definition",
    ],
    keywords: ["copper", "pour", "fill", "pcb", "ground"],
    answer:
      "A copper pour is a large area of copper on a PCB layer, often connected to ground or a power rail. It can provide a low-impedance return path, improve thermal performance and help with shielding, but its design should avoid unintended coupling or thermal issues.",
    priority: 10,
  },

  {
    id: "electronics-crosstalk",
    category: "electronics",
    intent: "troubleshooting",
    question: "What is crosstalk?",
    variations: [
      "What is crosstalk",
      "What causes crosstalk",
      "How to reduce crosstalk in PCB",
      "Crosstalk in cables",
      "Signal interference between traces",
      "Crosstalk definition",
    ],
    keywords: ["crosstalk", "pcb", "signal", "interference", "traces"],
    answer:
      "Crosstalk is unwanted coupling of a signal from one conductor to another, often through capacitive or inductive coupling. It can be reduced by increasing spacing, using ground planes, minimizing parallel runs and controlling impedance.",
    priority: 10,
  },

  {
    id: "electronics-high-speed",
    category: "electronics",
    intent: "definition",
    question: "What is considered high-speed in PCB design?",
    variations: [
      "What is considered high-speed in PCB design",
      "High speed PCB design rules",
      "When does signal integrity matter",
      "What is a transmission line",
      "High speed vs low speed signals",
      "High-speed definition",
    ],
    keywords: ["high", "speed", "pcb", "signal", "integrity", "transmission"],
    answer:
      "A signal becomes high-speed when its rise time is short relative to the trace length, causing transmission line effects such as reflections, crosstalk and EMI. Controlled impedance, proper return paths and length matching may be required.",
    priority: 10,
  },

  {
    id: "electronics-controlled-impedance",
    category: "electronics",
    intent: "definition",
    question: "What is controlled impedance?",
    variations: [
      "What is controlled impedance",
      "Controlled impedance PCB",
      "Why controlled impedance",
      "Impedance controlled traces",
      "High speed impedance",
      "Controlled impedance definition",
    ],
    keywords: ["impedance", "controlled", "pcb", "high", "speed"],
    answer:
      "Controlled impedance means the trace geometry is designed to provide a specific characteristic impedance, important for high-speed signals and RF. It depends on trace width, dielectric thickness, copper thickness and material.",
    priority: 10,
  },

  {
    id: "electronics-length-matching",
    category: "electronics",
    intent: "requirements",
    question: "Why is length matching important?",
    variations: [
      "Why is length matching important",
      "PCB length matching",
      "Why match trace lengths",
      "Length tuning PCB",
      "Signal skew PCB",
      "Length matching purpose",
    ],
    keywords: ["length", "matching", "pcb", "skew", "timing"],
    answer:
      "Length matching ensures signals arrive at the same time, important for high-speed parallel buses and differential pairs. Mismatched lengths cause skew and timing errors.",
    priority: 10,
  },

  {
    id: "electronics-ringing",
    category: "electronics",
    intent: "troubleshooting",
    question: "What is ringing in a signal?",
    variations: [
      "What is ringing in a signal",
      "Why does my signal ring",
      "How to reduce ringing",
      "Overshoot and ringing",
      "Signal integrity ringing",
      "Ringing definition",
    ],
    keywords: ["ringing", "signal", "overshoot", "integrity", "damping"],
    answer:
      "Ringing is oscillation that occurs after a fast signal transition, often due to parasitic inductance and capacitance. It can cause false switching, EMI and component stress. Series resistors, proper layout and controlled impedance can reduce it.",
    priority: 10,
  },

  {
    id: "electronics-glitch",
    category: "electronics",
    intent: "definition",
    question: "What is a glitch in a digital circuit?",
    variations: [
      "What is a glitch in a digital circuit",
      "What causes glitches",
      "How to avoid glitches",
      "Glitch in logic circuit",
      "False pulse in digital signal",
      "Glitch definition",
    ],
    keywords: ["glitch", "digital", "logic", "pulse", "false"],
    answer:
      "A glitch is a brief unwanted change in a digital signal, often caused by timing differences, race conditions or noise. Glitches can cause incorrect logic operation. Careful design, synchronization and filtering can reduce them.",
    priority: 10,
  },

  {
    id: "electronics-metastability",
    category: "electronics",
    intent: "definition",
    question: "What is metastability?",
    variations: [
      "What is metastability",
      "Metastability in digital circuits",
      "Why synchronize signals",
      "Clock domain crossing",
      "Metastability flip flop",
      "Metastability definition",
    ],
    keywords: ["metastability", "digital", "synchronizer", "clock", "flip"],
    answer:
      "Metastability occurs when a flip-flop or latch input changes too close to the clock edge, causing an uncertain output for a short time. Synchronizers are used when signals cross clock domains to reduce the risk of unreliable behavior.",
    priority: 10,
  },

  {
    id: "electronics-debounce-hardware",
    category: "electronics",
    intent: "procedure",
    question: "How do I debounce a switch in hardware?",
    variations: [
      "How do I debounce a switch in hardware",
      "Hardware debounce circuit",
      "RC debounce",
      "Schmitt trigger debounce",
      "Software vs hardware debounce",
      "Hardware debouncing methods",
    ],
    keywords: ["debounce", "hardware", "rc", "schmitt", "switch"],
    answer:
      "Hardware debouncing can use an RC filter with a Schmitt trigger input, or a dedicated debounce IC. The time constant should be chosen for the switch characteristics and the required response speed.",
    priority: 10,
  },

  {
    id: "electronics-encoder",
    category: "electronics",
    intent: "definition",
    question: "How does a rotary encoder work?",
    variations: [
      "How does a rotary encoder work",
      "What is a rotary encoder",
      "Encoder vs potentiometer",
      "How to read an encoder",
      "Quadrature encoder signals",
      "Rotary encoder definition",
    ],
    keywords: ["encoder", "rotary", "quadrature", "position", "rotation"],
    answer:
      "A rotary encoder converts rotation into digital signals. Incremental encoders typically output two quadrature signals that indicate direction and amount of movement. They are used for user interfaces, motor feedback and position sensing.",
    priority: 13,
  },

  {
    id: "electronics-esd",
    category: "electronics",
    intent: "definition",
    question: "What is ESD?",
    variations: [
      "What is ESD",
      "What is electrostatic discharge",
      "How does ESD damage electronics",
      "How to prevent ESD",
      "ESD protection methods",
      "ESD definition",
    ],
    keywords: ["esd", "electrostatic", "discharge", "protection", "damage"],
    answer:
      "ESD is the sudden flow of electricity between objects at different potentials. It can damage or degrade electronic components. Prevention includes grounding, anti-static materials, handling precautions and on-board protection components for exposed interfaces.",
    priority: 13,
  },

  {
    id: "electronics-firmware-hardware",
    category: "electronics",
    intent: "definition",
    question: "How do hardware and firmware interact?",
    variations: [
      "How do hardware and firmware interact",
      "Hardware vs firmware",
      "How does firmware control hardware",
      "Why does firmware matter for circuits",
      "Hardware and software debugging",
      "Hardware firmware interaction",
    ],
    keywords: ["hardware", "firmware", "software", "control", "interaction"],
    answer:
      "Firmware reads hardware inputs, applies logic and controls outputs according to the program. Correct operation depends on both correct hardware design and correct firmware behavior, so debugging often requires checking both the circuit and the code.",
    priority: 13,
  },

  {
    id: "electronics-test-equipment",
    category: "electronics",
    intent: "requirements",
    question: "What test equipment is useful for electronics?",
    variations: [
      "What test equipment is useful for electronics",
      "What tools for debugging circuits",
      "Multimeter vs oscilloscope",
      "Do I need a logic analyzer",
      "Bench power supply",
      "Test equipment for electronics",
    ],
    keywords: ["test", "equipment", "multimeter", "oscilloscope", "analyzer"],
    answer:
      "Common test equipment includes a multimeter, oscilloscope, logic analyzer, bench power supply and signal generator. The needed equipment depends on whether the work involves basic measurements, timing, communication, analog signals or power.",
    priority: 13,
  },

  {
    id: "electronics-resistance-measurement",
    category: "electronics",
    intent: "procedure",
    question: "How do I measure resistance?",
    variations: [
      "How do I measure resistance",
      "How to use a multimeter for resistance",
      "Why is resistance reading wrong",
      "How to check a resistor",
      "Measuring resistance in circuit",
      "Resistance measurement",
    ],
    keywords: ["resistance", "measure", "multimeter", "resistor", "circuit"],
    answer:
      "Resistance is measured with a multimeter in resistance mode, normally with the component or circuit unpowered. In-circuit measurements can be affected by parallel paths, so accurate value checks often require removing or isolating the component.",
    priority: 13,
  },

  {
    id: "electronics-continuity",
    category: "electronics",
    intent: "procedure",
    question: "How do I use continuity mode?",
    variations: [
      "How do I use continuity mode",
      "How to check continuity",
      "What does continuity mean",
      "How to test a wire",
      "Continuity vs resistance",
      "Continuity mode usage",
    ],
    keywords: ["continuity", "mode", "multimeter", "wire", "test"],
    answer:
      "Continuity mode indicates whether a low-resistance path exists between two points. It is useful for checking wires, connections, switches and PCB traces. Power should be removed from the circuit during the test.",
    priority: 13,
  },

  {
    id: "electronics-voltage-measurement",
    category: "electronics",
    intent: "procedure",
    question: "How do I measure voltage correctly?",
    variations: [
      "How do I measure voltage correctly",
      "How to use a multimeter for voltage",
      "Why is my voltage reading wrong",
      "How to measure DC voltage",
      "How to measure AC voltage",
      "Voltage measurement",
    ],
    keywords: ["voltage", "measure", "multimeter", "dc", "ac"],
    answer:
      "Set the multimeter to the correct voltage mode and range, connect the probes in parallel with the points being measured, and ensure the meter can handle the expected voltage. For DC, observe polarity; for AC, select the AC voltage mode.",
    priority: 13,
  },

  {
    id: "electronics-current-measurement",
    category: "electronics",
    intent: "procedure",
    question: "How do I measure current correctly?",
    variations: [
      "How do I measure current correctly",
      "How to use a multimeter for current",
      "Why does current measurement short a circuit",
      "How to measure amps",
      "Current measure in series",
      "Current measurement",
    ],
    keywords: ["current", "measure", "multimeter", "amps", "series"],
    answer:
      "Current is measured by placing the meter in series with the circuit path, not in parallel. The meter must be set to the correct current mode and range, and the circuit should be opened to insert the meter. An incorrect setting or parallel connection can short the circuit or blow the meter fuse.",
    priority: 13,
  },

  {
    id: "electronics-power-measurement",
    category: "electronics",
    intent: "procedure",
    question: "How do I measure power consumption?",
    variations: [
      "How do I measure power consumption",
      "How to measure watts",
      "How to calculate power usage",
      "How to measure current and voltage together",
      "Power measurement methods",
      "Power consumption measurement",
    ],
    keywords: ["power", "measure", "watts", "voltage", "current"],
    answer:
      "Power can be calculated from simultaneous voltage and current measurements as P = V × I for DC or resistive loads. For AC or non-resistive loads, power factor and true RMS measurements may be needed. Dedicated power meters can simplify the measurement.",
    priority: 10,
  },

  {
    id: "electronics-capacitance-measurement",
    category: "electronics",
    intent: "procedure",
    question: "How do I measure capacitance?",
    variations: [
      "How do I measure capacitance",
      "How to test a capacitor",
      "Why is my capacitor reading wrong",
      "How to use a multimeter for capacitance",
      "How to check if capacitor is bad",
      "Capacitance measurement",
    ],
    keywords: ["capacitance", "measure", "capacitor", "multimeter", "test"],
    answer:
      "Many multimeters include a capacitance mode. Measure with the capacitor discharged and isolated from the circuit where possible. In-circuit readings can be affected by other components, and some failures may only appear under voltage.",
    priority: 10,
  },

  {
    id: "electronics-diode-test",
    category: "electronics",
    intent: "procedure",
    question: "How do I test a diode?",
    variations: [
      "How do I test a diode",
      "How to check if a diode is bad",
      "Diode test mode",
      "How to test LED",
      "Why does my diode read wrong",
      "Diode testing",
    ],
    keywords: ["diode", "test", "multimeter", "forward", "reverse"],
    answer:
      "Use the diode test mode on a multimeter. A good diode typically shows a forward voltage drop in one direction and no conduction in the other. In-circuit readings can be affected by other components, so isolation may be needed for a reliable check.",
    priority: 10,
  },

  {
    id: "electronics-transistor-test",
    category: "electronics",
    intent: "procedure",
    question: "How do I test a transistor?",
    variations: [
      "How do I test a transistor",
      "How to check if a transistor is bad",
      "Transistor test with multimeter",
      "How to test MOSFET",
      "Why is my transistor not switching",
      "Transistor testing",
    ],
    keywords: ["transistor", "test", "multimeter", "bjt", "mosfet"],
    answer:
      "BJT testing with a multimeter typically checks the base-emitter and base-collector junctions like diodes. MOSFET testing can be more involved because of the insulated gate. In-circuit tests may not be reliable, so removal or substitution may be needed.",
    priority: 10,
  },

  {
    id: "electronics-resistor-color",
    category: "electronics",
    intent: "procedure",
    question: "How do I read resistor color codes?",
    variations: [
      "How do I read resistor color codes",
      "Resistor color code chart",
      "How to identify resistor value",
      "What does each color band mean",
      "Resistor tolerance band",
      "Resistor color code reading",
    ],
    keywords: ["resistor", "color", "code", "bands", "value"],
    answer:
      "Resistor color bands encode the value and tolerance. Common four-band resistors use two significant digits, a multiplier and a tolerance band. Five and six band types add precision or temperature coefficient. Reading from the correct end is important.",
    priority: 10,
  },

  {
    id: "electronics-capacitor-marking",
    category: "electronics",
    intent: "procedure",
    question: "How do I read capacitor markings?",
    variations: [
      "How do I read capacitor markings",
      "Capacitor code reading",
      "How to identify capacitor value",
      "What do numbers on capacitor mean",
      "Ceramic capacitor marking",
      "Capacitor marking reading",
    ],
    keywords: ["capacitor", "marking", "code", "value", "ceramic"],
    answer:
      "Capacitor markings vary by type. Ceramic capacitors often use a three-digit code where the first two digits are significant and the third is a multiplier in picofarads. Electrolytic capacitors usually show capacitance, voltage and polarity directly.",
    priority: 10,
  },

  {
    id: "electronics-led-resistor",
    category: "electronics",
    intent: "procedure",
    question: "How do I calculate an LED resistor?",
    variations: [
      "How do I calculate an LED resistor",
      "What resistor for LED",
      "LED resistor formula",
      "How to size LED resistor",
      "Why does my LED burn out",
      "LED resistor calculation",
    ],
    keywords: ["led", "resistor", "calculate", "current", "voltage"],
    answer:
      "Use R = (Vsupply − VLED) / ILED. Choose an LED current within the LED rating and the output capability of the driving pin. For high-power LEDs, a constant-current driver is usually more appropriate than a simple resistor.",
    priority: 13,
  },

  {
    id: "electronics-voltage-drop",
    category: "electronics",
    intent: "definition",
    question: "What is voltage drop?",
    variations: [
      "What is voltage drop",
      "Why does voltage drop in wires",
      "How to calculate voltage drop",
      "What causes voltage drop",
      "Voltage drop in cables",
      "Voltage drop definition",
    ],
    keywords: ["voltage", "drop", "wire", "resistance", "current"],
    answer:
      "Voltage drop is the reduction in voltage along a conductor or component due to its resistance and the current flowing through it. Excessive voltage drop can cause devices to malfunction, especially in low-voltage or high-current circuits.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // AGING / RELIABILITY / FAILURE
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-aging",
    category: "electronics",
    intent: "definition",
    question: "What causes electronic components to age?",
    variations: [
      "What causes electronic components to age",
      "Why do electronics wear out",
      "Component aging factors",
      "Electrolytic capacitor aging",
      "How to improve product life",
      "Component aging causes",
    ],
    keywords: ["aging", "wear", "life", "component", "reliability"],
    answer:
      "Aging can be caused by thermal stress, voltage stress, current stress, humidity, contamination and mechanical wear. Electrolytic capacitors are a common wear item. Designing with margin, managing heat and using quality components can improve lifetime.",
    priority: 10,
  },

  {
    id: "electronics-mtbf",
    category: "electronics",
    intent: "definition",
    question: "What is MTBF?",
    variations: [
      "What is MTBF",
      "Mean time between failures",
      "What does MTBF mean",
      "How to calculate MTBF",
      "Reliability MTBF",
      "MTBF definition",
    ],
    keywords: ["mtbf", "reliability", "failure", "mean", "time"],
    answer:
      "MTBF, or Mean Time Between Failures, is a reliability metric often estimated from component failure rates. It is not a guarantee of how long a specific unit will last, but it can be used for comparison and planning.",
    priority: 10,
  },

  {
    id: "electronics-failure-analysis",
    category: "electronics",
    intent: "procedure",
    question: "How do I analyze an electronic failure?",
    variations: [
      "How do I analyze an electronic failure",
      "Failure analysis electronics",
      "Why did my circuit fail",
      "How to find root cause of failure",
      "Component failure investigation",
      "Electronic failure analysis",
    ],
    keywords: ["failure", "analysis", "root", "cause", "investigation"],
    answer:
      "Failure analysis involves documenting the failure, checking operating conditions, inspecting for damage, measuring key signals and testing components. Root cause may be electrical, thermal, mechanical, environmental or related to a component or manufacturing defect.",
    priority: 13,
  },

  {
    id: "electronics-derating",
    category: "electronics",
    intent: "procedure",
    question: "Why is derating important in electronics?",
    variations: [
      "Why is derating important in electronics",
      "What is derating",
      "Component derating guidelines",
      "Why operate below maximum ratings",
      "Reliability derating",
      "Derating definition",
    ],
    keywords: ["derating", "rating", "reliability", "stress", "margin"],
    answer:
      "Derating means operating components below their maximum stress ratings to improve reliability and provide margin against unexpected conditions. Common derating parameters include voltage, current, power and temperature.",
    priority: 10,
  },

  {
    id: "electronics-mean-time",
    category: "electronics",
    intent: "procedure",
    question: "How long will my electronic project last?",
    variations: [
      "How long will my electronic project last",
      "Product lifetime electronics",
      "How long do circuits last",
      "What affects electronic lifespan",
      "Expected life of electronics",
      "Electronic lifetime",
    ],
    keywords: ["lifetime", "life", "last", "electronics", "reliability"],
    answer:
      "Lifetime depends on component quality, operating conditions, thermal management, environmental exposure and design margins. There is no single answer, but good design and appropriate derating can significantly improve long-term reliability.",
    priority: 10,
  },

  {
    id: "electronics-reliability",
    category: "electronics",
    intent: "procedure",
    question: "How do I make my circuit more reliable?",
    variations: [
      "How do I make my circuit more reliable",
      "How to improve reliability",
      "Why does my project keep failing",
      "How to make electronics robust",
      "Design for reliability tips",
      "Electronic reliability improvement",
    ],
    keywords: ["reliability", "robust", "failure", "design", "protection"],
    answer:
      "Use components within their ratings, include appropriate protection, provide stable power, manage heat, secure connections, minimize noise and test under realistic conditions. Reliability often comes from careful design margins and thorough testing rather than from a single change.",
    priority: 13,
  },

  {
    id: "electronics-testing",
    category: "electronics",
    intent: "procedure",
    question: "How should I test an electronic circuit?",
    variations: [
      "How should I test an electronic circuit",
      "How to test a new circuit",
      "Circuit testing procedure",
      "How to verify a design",
      "Bench testing electronics",
      "Electronic circuit testing",
    ],
    keywords: ["test", "testing", "circuit", "verify", "bench"],
    answer:
      "Test in stages: verify power and ground, check no-load voltages, confirm each subsystem independently, then test the complete system under expected conditions. Use appropriate instruments and compare measurements against design expectations.",
    priority: 15,
  },

  {
    id: "electronics-prototype",
    category: "electronics",
    intent: "procedure",
    question: "Should I prototype before building a final version?",
    variations: [
      "Should I prototype before building a final version",
      "Why prototype a circuit",
      "Breadboard vs PCB prototype",
      "How to prototype electronics",
      "Prototyping benefits",
      "Electronics prototyping",
    ],
    keywords: ["prototype", "breadboard", "pcb", "test", "build"],
    answer:
      "Prototyping allows the circuit and firmware to be tested and modified before committing to a final PCB or enclosure. Breadboards or modular assemblies are common for early testing, while a more permanent prototype may be used for reliability and environmental testing.",
    priority: 13,
  },

  {
    id: "electronics-final-design",
    category: "electronics",
    intent: "procedure",
    question: "What should I consider before finalizing a circuit design?",
    variations: [
      "What should I consider before finalizing a circuit design",
      "Design review checklist",
      "Before PCB manufacturing what to check",
      "Final electronics design considerations",
      "How to prepare a design for manufacturing",
      "Final design checklist",
    ],
    keywords: [
      "final",
      "design",
      "review",
      "manufacturing",
      "check",
      "checklist",
    ],
    answer:
      "Review power, grounding, signal integrity, component ratings, thermal performance, protection, connector accessibility, test points, manufacturing rules and documentation. Testing and design review help catch issues before production.",
    priority: 13,
  },

  {
    id: "electronics-safety",
    category: "electronics",
    intent: "procedure",
    question: "What safety precautions should I take with electronics?",
    variations: [
      "What safety precautions should I take with electronics",
      "Electronics safety tips",
      "How to work safely with electricity",
      "Mains voltage safety",
      "Battery safety",
      "Electronics safety precautions",
    ],
    keywords: ["safety", "electricity", "mains", "battery", "protection"],
    answer:
      "Work with low voltages when learning, disconnect power before modifying circuits, use appropriate insulation and enclosures for mains, protect batteries from short circuits and overheating, and never rely only on software for safety-critical functions. Mains and high-energy work should follow applicable safety standards.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // ASSEMBLY-LEVEL CONCEPTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-assembly",
    category: "electronics",
    intent: "definition",
    question: "What is involved in PCB assembly?",
    variations: [
      "What is involved in PCB assembly",
      "PCB assembly process",
      "SMT vs through hole",
      "How are components placed on PCB",
      "Soldering methods",
      "PCB assembly overview",
    ],
    keywords: ["assembly", "pcb", "smt", "through", "solder"],
    answer:
      "PCB assembly involves placing and soldering components onto the board. Methods include hand soldering, through-hole assembly, surface-mount technology and reflow soldering. The appropriate method depends on the components, volume and reliability requirements.",
    priority: 13,
  },

  {
    id: "electronics-conformal-coating",
    category: "electronics",
    intent: "procedure",
    question: "What is conformal coating?",
    variations: [
      "What is conformal coating",
      "Why use conformal coating",
      "PCB protective coating",
      "How to apply conformal coating",
      "Moisture protection for circuits",
      "Conformal coating definition",
    ],
    keywords: ["conformal", "coating", "protection", "pcb", "moisture"],
    answer:
      "Conformal coating is a thin protective layer applied to a PCB to protect against moisture, dust, chemicals and other environmental factors. It can improve reliability in harsh environments but must be compatible with the components and connectors.",
    priority: 10,
  },

  {
    id: "electronics-potting",
    category: "electronics",
    intent: "procedure",
    question: "What is potting electronics?",
    variations: [
      "What is potting electronics",
      "Why pot electronics",
      "Potting compound for circuits",
      "How to pot a PCB",
      "Environmental protection potting",
      "Potting definition",
    ],
    keywords: [
      "potting",
      "electronics",
      "protection",
      "compound",
      "encapsulation",
    ],
    answer:
      "Potting encapsulates electronics in a compound to protect against moisture, vibration, chemicals and physical damage. The compound must be compatible with the components, thermal requirements and serviceability needs.",
    priority: 10,
  },

  {
    id: "electronics-enclosure-cooling",
    category: "electronics",
    intent: "procedure",
    question: "How do I cool electronics in an enclosure?",
    variations: [
      "How do I cool electronics in an enclosure",
      "Enclosure cooling methods",
      "How to ventilate an enclosure",
      "Passive vs active cooling",
      "Thermal management in sealed enclosures",
      "Enclosure cooling",
    ],
    keywords: [
      "enclosure",
      "cooling",
      "ventilation",
      "thermal",
      "fan",
      "heatsink",
    ],
    answer:
      "Cooling in an enclosure can use vents, fans, heat sinks, thermal pads, metal enclosures or liquid cooling depending on the heat load and environment. Sealed enclosures may require heat conduction to the case or external heat sinks.",
    priority: 10,
  },

  {
    id: "electronics-ingress-protection",
    category: "electronics",
    intent: "requirements",
    question: "What is an IP rating?",
    variations: [
      "What is an IP rating",
      "What does IP67 mean",
      "IP rating explained",
      "Waterproof enclosure rating",
      "Dust protection rating",
      "IP rating definition",
    ],
    keywords: ["ip", "rating", "waterproof", "dust", "enclosure"],
    answer:
      "An IP rating indicates the level of protection against dust and water. The first digit is solids and the second is liquids. For example, IP67 means dust-tight and protected against temporary immersion. The rating must be maintained through proper enclosure design and sealing.",
    priority: 13,
  },

  {
    id: "electronics-temperature-rating",
    category: "electronics",
    intent: "requirements",
    question: "Why does temperature rating matter for components?",
    variations: [
      "Why does temperature rating matter for components",
      "Component temperature range",
      "Why do components have temperature ratings",
      "What happens if components get too hot",
      "Industrial temperature range",
      "Temperature rating importance",
    ],
    keywords: ["temperature", "rating", "component", "range", "heat"],
    answer:
      "Components have specified operating temperature ranges. Exceeding them can cause parameter drift, reduced life, malfunction or permanent damage. Temperature ratings are especially important in automotive, industrial and outdoor applications.",
    priority: 13,
  },

  {
    id: "electronics-documentation",
    category: "electronics",
    intent: "procedure",
    question: "Why should I document my circuit and code?",
    variations: [
      "Why should I document my circuit and code",
      "Why document electronics project",
      "How to keep track of wiring",
      "Why label wires and pins",
      "Documentation for debugging",
      "Electronics documentation purpose",
    ],
    keywords: ["documentation", "schematic", "wiring", "code", "debug"],
    answer:
      "Good documentation such as schematics, pin maps, wiring notes, code comments and version history makes debugging, modification and maintenance much easier. It also reduces the chance of repeating mistakes or miswiring during future work.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // BRIDGE / CONCEPTUAL ENTRIES
  // ─────────────────────────────────────────────────────────────
  {
    id: "electronics-schematic-symbol",
    category: "electronics",
    intent: "definition",
    question: "What is a schematic symbol?",
    variations: [
      "What is a schematic symbol",
      "Schematic symbol meaning",
      "How to read a schematic",
      "Symbol vs footprint",
      "Common schematic symbols",
      "Schematic symbol definition",
    ],
    keywords: ["schematic", "symbol", "diagram", "circuit", "read"],
    answer:
      "A schematic symbol is a graphical representation of a component in a circuit diagram. It shows the electrical connections and function, while the footprint defines the physical PCB layout.",
    priority: 10,
  },

  {
    id: "electronics-footprint",
    category: "electronics",
    intent: "definition",
    question: "What is a component footprint?",
    variations: [
      "What is a component footprint",
      "PCB footprint meaning",
      "How to choose a footprint",
      "Footprint vs symbol",
      "Land pattern in PCB",
      "Component footprint definition",
    ],
    keywords: ["footprint", "pcb", "component", "land", "pattern"],
    answer:
      "A footprint is the physical land pattern on a PCB where a component is mounted, including pads, holes and outline. The footprint must match the actual component package and the manufacturing process.",
    priority: 10,
  },

  {
    id: "electronics-design-rule",
    category: "electronics",
    intent: "definition",
    question: "What are PCB design rules?",
    variations: [
      "What are PCB design rules",
      "Design rule check",
      "PCB DRC",
      "Minimum trace spacing",
      "Manufacturing design rules",
      "PCB design rules definition",
    ],
    keywords: ["pcb", "design", "rules", "drc", "spacing", "manufacturing"],
    answer:
      "Design rules define constraints such as minimum trace width, spacing, via size, annular ring and clearance. They are set by the manufacturer's capabilities and the electrical requirements. A design rule check helps catch violations before manufacturing.",
    priority: 10,
  },

  {
    id: "electronics-equivalent-circuit",
    category: "electronics",
    intent: "definition",
    question: "What is an equivalent circuit?",
    variations: [
      "What is an equivalent circuit",
      "Equivalent circuit meaning",
      "Why use equivalent circuits",
      "Model a circuit",
      "Equivalent circuit examples",
      "Equivalent circuit definition",
    ],
    keywords: ["equivalent", "circuit", "model", "analysis", "thevenin"],
    answer:
      "An equivalent circuit is a simplified representation that behaves electrically like a more complex circuit for a defined purpose. It is used to analyze or design circuits more easily, often alongside techniques such as Thevenin's theorem.",
    priority: 9,
  },

  {
    id: "electronics-diode-bridge",
    category: "electronics",
    intent: "definition",
    question: "What is a diode bridge?",
    variations: [
      "What is a diode bridge",
      "Diode bridge vs rectifier",
      "How does diode bridge work",
      "Bridge rectifier purpose",
      "Diode bridge definition",
      "Diode bridge meaning",
    ],
    keywords: ["diode", "bridge", "rectifier", "ac", "dc"],
    answer:
      "A diode bridge is a configuration of four diodes that provides full-wave rectification, converting AC into pulsating DC. It is a common part of many power supply circuits.",
    priority: 10,
  },

  {
    id: "electronics-snubber",
    category: "electronics",
    intent: "definition",
    question: "What is a snubber circuit?",
    variations: [
      "What is a snubber circuit",
      "Snubber purpose",
      "RC snubber",
      "How does snubber work",
      "Snubber vs flyback diode",
      "Snubber definition",
    ],
    keywords: ["snubber", "circuit", "protection", "noise", "inductive"],
    answer:
      "A snubber is a small circuit, often an RC network, used to absorb voltage spikes or damp ringing in a circuit. It protects switches and reduces EMI in circuits with inductive or fast-switching loads.",
    priority: 9,
  },

  {
    id: "electronics-clamp",
    category: "electronics",
    intent: "definition",
    question: "What is a clamp circuit?",
    variations: [
      "What is a clamp circuit",
      "Clamp diode purpose",
      "How does a clamp work",
      "Voltage clamp circuit",
      "Clamping diode definition",
      "Clamp circuit definition",
    ],
    keywords: ["clamp", "diode", "voltage", "protection", "circuit"],
    answer:
      "A clamp circuit limits a signal or node voltage to a defined range, usually with diodes. It is used for protection against overvoltage and for signal conditioning.",
    priority: 9,
  },

  {
    id: "electronics-load-line",
    category: "electronics",
    intent: "definition",
    question: "What is a load line?",
    variations: [
      "What is a load line",
      "Load line analysis",
      "Load line in circuits",
      "Why use a load line",
      "Load line definition",
      "Load line meaning",
    ],
    keywords: ["load", "line", "analysis", "circuit", "graph"],
    answer:
      "A load line is a graphical representation of how a component's current and voltage relate for a given load or source. It is used in circuit analysis to find the operating point of nonlinear devices such as diodes and transistors.",
    priority: 7,
  },

  {
    id: "electronics-quiescent",
    category: "electronics",
    intent: "definition",
    question: "What is quiescent current?",
    variations: [
      "What is quiescent current",
      "Quiescent current meaning",
      "Why does quiescent current matter",
      "Standby current electronics",
      "Quiescent current definition",
      "Quiescent current explained",
    ],
    keywords: ["quiescent", "current", "standby", "power", "electronics"],
    answer:
      "Quiescent current is the current a device or circuit draws when it is idle or not driving a load. It matters for battery life, standby power and thermal design in low-power electronics.",
    priority: 10,
  },

  {
    id: "electronics-storage-oscilloscope",
    category: "electronics",
    intent: "procedure",
    question: "When should I use an oscilloscope?",
    variations: [
      "When should I use an oscilloscope",
      "Do I need an oscilloscope",
      "How can an oscilloscope help debug",
      "What can I see with a scope",
      "Why use a scope instead of a multimeter",
      "Oscilloscope usage",
    ],
    keywords: ["oscilloscope", "scope", "signal", "waveform", "debug"],
    answer:
      "An oscilloscope is useful when a multimeter cannot show fast signal behavior, such as PWM waveforms, UART data, clock signals, noise, glitches or timing problems. It shows signal amplitude over time, which can reveal issues that a simple average measurement hides.",
    priority: 13,
  },
];
