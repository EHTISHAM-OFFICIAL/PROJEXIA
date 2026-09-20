import type { HelpEntry } from "./types";

export const COMPONENT_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // SELECTION & RATINGS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-how-to-select",
    category: "components",
    intent: "procedure",
    question: "How do I choose electronic components?",
    variations: [
      "How do I choose electronic components",
      "How should I select components",
      "How do I choose parts",
      "Which components should I use",
      "How do I select hardware",
      "What should I consider when choosing components",
      "Component selection guide",
    ],
    keywords: ["components", "parts", "select", "choose", "hardware"],
    answer:
      "Component selection should be based on electrical requirements, voltage, current, accuracy, speed, environmental conditions, physical size, communication interfaces, availability and cost.",
    priority: 15,
  },

  {
    id: "components-voltage-rating",
    category: "components",
    intent: "requirements",
    question: "Why does voltage rating matter?",
    variations: [
      "Why does voltage rating matter",
      "What voltage rating should I use",
      "Can I use a higher voltage rated component",
      "Why check component voltage",
      "What happens if voltage is too high",
      "Voltage rating purpose",
    ],
    keywords: ["voltage", "rating", "component", "maximum"],
    answer:
      "A component must operate within its specified voltage limits. Exceeding the maximum rating can cause malfunction, overheating or permanent damage. A suitable design also considers transients and tolerances rather than only nominal voltage.",
    priority: 13,
  },

  {
    id: "components-current-rating",
    category: "components",
    intent: "requirements",
    question: "Why does current rating matter?",
    variations: [
      "Why does current rating matter",
      "What current rating do I need",
      "Can a component handle more current",
      "Why check amps",
      "How do I size a component for current",
      "Current rating purpose",
    ],
    keywords: ["current", "rating", "amps", "load", "component"],
    answer:
      "The current rating indicates how much current a component can safely carry under specified conditions. Exceeding it can cause excessive heating, voltage drop or failure.",
    priority: 13,
  },

  {
    id: "components-tolerance",
    category: "components",
    intent: "definition",
    question: "What does component tolerance mean?",
    variations: [
      "What does component tolerance mean",
      "What is resistor tolerance",
      "Component accuracy",
      "Why tolerance matters",
      "1% vs 5% resistor",
      "Component tolerance definition",
    ],
    keywords: ["tolerance", "accuracy", "resistor", "variation", "precision"],
    answer:
      "Tolerance indicates how much a component's actual value may differ from its nominal value. Tighter tolerance generally improves accuracy but may increase cost. The required tolerance depends on the sensitivity of the circuit to that component's value.",
    priority: 13,
  },

  {
    id: "components-derating",
    category: "components",
    intent: "procedure",
    question: "What is component derating?",
    variations: [
      "What is component derating",
      "Why derate components",
      "Component derating guidelines",
      "Operating below maximum rating",
      "Reliability derating",
      "Component derating definition",
    ],
    keywords: ["derating", "rating", "reliability", "margin", "stress"],
    answer:
      "Derating means operating a component below its maximum rated stress levels to improve reliability and margin. This can involve voltage, current, power, temperature or frequency, depending on the component and application.",
    priority: 10,
  },

  {
    id: "components-substitution",
    category: "components",
    intent: "procedure",
    question: "Can I substitute a different component?",
    variations: [
      "Can I substitute a different component",
      "Can I replace a component with another",
      "Component substitution rules",
      "Can I use a different value resistor",
      "Equivalent component replacement",
      "Component substitution guidelines",
    ],
    keywords: ["substitute", "replace", "equivalent", "component", "value"],
    answer:
      "Substitution is possible when the replacement meets or exceeds the critical electrical, thermal, mechanical and timing requirements of the original part. Check voltage, current, tolerance, speed, pinout and environmental ratings before substituting.",
    priority: 13,
  },

  {
    id: "components-fake-components",
    category: "components",
    intent: "procedure",
    question: "How can I avoid counterfeit components?",
    variations: [
      "How can I avoid counterfeit components",
      "Fake electronic components",
      "How to spot counterfeit parts",
      "Where to buy genuine components",
      "Counterfeit ICs",
      "Avoiding counterfeit components",
    ],
    keywords: ["counterfeit", "fake", "genuine", "supplier", "component"],
    answer:
      "Buy from reputable suppliers, check markings, packaging and documentation, test samples where possible and be cautious of unusually low prices or inconsistent performance. Counterfeit parts can cause reliability, safety and performance problems.",
    priority: 13,
  },

  {
    id: "components-rohs",
    category: "components",
    intent: "definition",
    question: "What does RoHS mean?",
    variations: [
      "What does RoHS mean",
      "What is RoHS compliance",
      "RoHS component meaning",
      "Why RoHS matters",
      "Lead-free regulations",
      "RoHS definition",
    ],
    keywords: ["rohs", "compliance", "lead", "environment", "regulation"],
    answer:
      "RoHS refers to restrictions on the use of certain hazardous substances in electrical and electronic equipment. RoHS-compliant components and manufacturing processes avoid or limit substances such as lead, mercury and cadmium.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PASSIVES
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-resistor",
    category: "components",
    intent: "definition",
    question: "What is a resistor used for?",
    variations: [
      "What is a resistor used for",
      "What does a resistor do",
      "Why use resistors",
      "How to choose a resistor",
      "Types of resistors",
      "Resistor purpose",
    ],
    keywords: ["resistor", "resistance", "current", "voltage", "pullup"],
    answer:
      "A resistor limits current, creates voltage drops, sets bias points, divides voltages and provides pull-up or pull-down functions. Selection depends on resistance value, power rating, tolerance and the required stability.",
    priority: 13,
  },

  {
    id: "components-resistor-power",
    category: "components",
    intent: "procedure",
    question: "How do I calculate resistor power rating?",
    variations: [
      "How do I calculate resistor power rating",
      "What wattage resistor do I need",
      "Resistor power dissipation",
      "How to choose resistor wattage",
      "Why is my resistor getting hot",
      "Resistor power rating",
    ],
    keywords: ["resistor", "power", "watt", "dissipation", "heat"],
    answer:
      "Resistor power dissipation can be calculated as P = V × I, P = I²R or P = V²/R. Choose a resistor with a power rating comfortably above the expected dissipation, considering ambient temperature and enclosure conditions.",
    priority: 13,
  },

  {
    id: "components-resistor-network",
    category: "components",
    intent: "definition",
    question: "What is a resistor network?",
    variations: [
      "What is a resistor network",
      "What is a resistor array",
      "Why use a resistor network",
      "Resistor network vs individual resistors",
      "How to use resistor array",
      "Resistor network definition",
    ],
    keywords: ["resistor", "network", "array", "pack", "pullup"],
    answer:
      "A resistor network or array contains multiple resistors in a single package. It can save space and simplify assembly when several similar resistors, such as pull-ups or current limiters, are needed.",
    priority: 10,
  },

  {
    id: "components-capacitor",
    category: "components",
    intent: "definition",
    question: "What is a capacitor used for?",
    variations: [
      "What is a capacitor used for",
      "What does a capacitor do",
      "Why use capacitors",
      "Types of capacitors",
      "How to choose a capacitor",
      "Capacitor purpose",
    ],
    keywords: ["capacitor", "capacitance", "filter", "decoupling", "energy"],
    answer:
      "A capacitor stores energy in an electric field and is commonly used for filtering, decoupling, smoothing, timing and coupling. Selection depends on capacitance, voltage rating, tolerance, temperature behavior and the application.",
    priority: 13,
  },

  {
    id: "components-capacitor-voltage",
    category: "components",
    intent: "requirements",
    question: "How do I choose a capacitor voltage rating?",
    variations: [
      "How do I choose a capacitor voltage rating",
      "What voltage capacitor do I need",
      "Capacitor voltage rating",
      "Can I use a higher voltage capacitor",
      "Why do capacitors have voltage ratings",
      "Capacitor voltage rating guide",
    ],
    keywords: ["capacitor", "voltage", "rating", "maximum", "derating"],
    answer:
      "A capacitor's voltage rating is the maximum voltage it can safely withstand. Choose a rating above the highest expected voltage, including transients, and consider derating for reliability. Exceeding the rating can damage the capacitor or cause failure.",
    priority: 13,
  },

  {
    id: "components-inductor",
    category: "components",
    intent: "definition",
    question: "What is an inductor used for?",
    variations: [
      "What is an inductor used for",
      "What does an inductor do",
      "Why use inductors",
      "How to choose an inductor",
      "Inductor vs capacitor",
      "Inductor purpose",
    ],
    keywords: ["inductor", "coil", "inductance", "magnetic", "filter"],
    answer:
      "An inductor stores energy in a magnetic field and resists changes in current. Inductors are used in filtering, power conversion, energy storage and electromagnetic applications. Selection depends on inductance, current rating, resistance and core type.",
    priority: 10,
  },

  {
    id: "components-inductor-selection",
    category: "components",
    intent: "procedure",
    question: "How do I choose an inductor?",
    variations: [
      "How do I choose an inductor",
      "What inductor do I need",
      "Inductor selection guide",
      "How to pick an inductor",
      "Inductance value calculation",
      "Inductor selection",
    ],
    keywords: ["inductor", "selection", "inductance", "current", "core"],
    answer:
      "Inductor selection depends on inductance value, saturation current, RMS current, DC resistance, core material and size. The inductor must handle the peak current without saturating and meet the frequency and thermal requirements.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // DIODES / LEDS / TRANSISTORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-diode",
    category: "components",
    intent: "definition",
    question: "What is a diode used for?",
    variations: [
      "What is a diode used for",
      "What does a diode do",
      "Why use a diode",
      "Types of diodes",
      "How to choose a diode",
      "Diode purpose",
    ],
    keywords: ["diode", "rectifier", "protection", "current", "voltage"],
    answer:
      "A diode allows current to flow primarily in one direction. Diodes are used for rectification, protection, voltage regulation, switching and signal applications. Selection depends on forward current, reverse voltage, speed and application.",
    priority: 13,
  },

  {
    id: "components-diode-selection",
    category: "components",
    intent: "procedure",
    question: "How do I choose a diode?",
    variations: [
      "How do I choose a diode",
      "What diode should I use",
      "Diode selection guide",
      "How to pick a diode",
      "Fast vs standard diode",
      "Diode selection",
    ],
    keywords: ["diode", "selection", "forward", "reverse", "speed"],
    answer:
      "Diode selection depends on forward current, reverse voltage, forward voltage drop, recovery speed and application. Common types include standard rectifier, Schottky, fast recovery and Zener diodes.",
    priority: 10,
  },

  {
    id: "components-zener",
    category: "components",
    intent: "definition",
    question: "What is a Zener diode used for?",
    variations: [
      "What is a Zener diode used for",
      "What does Zener diode do",
      "Zener voltage regulator",
      "How to use Zener diode",
      "Zener vs normal diode",
      "Zener diode purpose",
    ],
    keywords: ["zener", "diode", "voltage", "regulator", "clamp"],
    answer:
      "A Zener diode conducts in reverse when the voltage reaches its breakdown value, providing a stable reference or clamping voltage. It is used for voltage regulation, protection and level shifting.",
    priority: 10,
  },

  {
    id: "components-schottky",
    category: "components",
    intent: "definition",
    question: "What is a Schottky diode?",
    variations: [
      "What is a Schottky diode",
      "What does Schottky diode do",
      "Schottky vs normal diode",
      "Why use Schottky diode",
      "Schottky forward voltage",
      "Schottky diode definition",
    ],
    keywords: ["schottky", "diode", "forward", "voltage", "fast"],
    answer:
      "A Schottky diode has a low forward voltage drop and fast switching. It is used in power supplies, reverse polarity protection and high-frequency applications.",
    priority: 10,
  },

  {
    id: "components-tvs",
    category: "components",
    intent: "definition",
    question: "What is a TVS diode?",
    variations: [
      "What is a TVS diode",
      "What does TVS diode do",
      "Transient voltage suppression",
      "How to use TVS diode",
      "TVS vs Zener",
      "TVS diode definition",
    ],
    keywords: ["tvs", "diode", "transient", "protection", "esd"],
    answer:
      "A TVS, or Transient Voltage Suppression, diode protects circuits from voltage spikes and ESD. It clamps fast transients to a safe level.",
    priority: 10,
  },

  {
    id: "components-tvs-selection",
    category: "components",
    intent: "procedure",
    question: "How do I choose a TVS diode?",
    variations: [
      "How do I choose a TVS diode",
      "TVS diode selection",
      "How to pick TVS",
      "TVS voltage rating",
      "ESD protection TVS",
      "TVS diode selection guide",
    ],
    keywords: ["tvs", "selection", "diode", "voltage", "protection"],
    answer:
      "TVS selection depends on standoff voltage, breakdown voltage, clamping voltage, peak pulse current and capacitance. It should protect the circuit without affecting normal signals.",
    priority: 10,
  },

  {
    id: "components-varistor",
    category: "components",
    intent: "definition",
    question: "What is a varistor?",
    variations: [
      "What is a varistor",
      "What does varistor do",
      "MOV varistor",
      "How to use varistor",
      "Varistor vs TVS",
      "Varistor definition",
    ],
    keywords: ["varistor", "mov", "protection", "voltage", "surge"],
    answer:
      "A varistor, often an MOV (Metal Oxide Varistor), protects against voltage surges by changing resistance when the voltage exceeds a threshold. It is used in power supplies and surge protection.",
    priority: 10,
  },

  {
    id: "components-varistor-selection",
    category: "components",
    intent: "procedure",
    question: "How do I choose a varistor?",
    variations: [
      "How do I choose a varistor",
      "MOV selection",
      "Varistor voltage rating",
      "How to pick a varistor",
      "Surge protection varistor",
      "Varistor selection",
    ],
    keywords: ["varistor", "mov", "selection", "voltage", "surge"],
    answer:
      "Varistor selection depends on the maximum continuous voltage, clamping voltage, energy rating and response time. It must protect the circuit without conducting during normal operation.",
    priority: 9,
  },

  {
    id: "components-led",
    category: "components",
    intent: "definition",
    question: "How do I choose an LED?",
    variations: [
      "How do I choose an LED",
      "What LED should I use",
      "LED types and colors",
      "How to select an LED",
      "LED forward voltage",
      "LED selection guide",
    ],
    keywords: ["led", "light", "color", "voltage", "current"],
    answer:
      "LED selection depends on color, forward voltage, forward current, brightness, viewing angle, package size and application. A current-limiting resistor or constant-current driver is normally required.",
    priority: 13,
  },

  {
    id: "components-thermistor",
    category: "components",
    intent: "definition",
    question: "What is a thermistor?",
    variations: [
      "What is a thermistor",
      "What does thermistor do",
      "NTC vs PTC thermistor",
      "How to use thermistor",
      "Thermistor temperature sensing",
      "Thermistor definition",
    ],
    keywords: ["thermistor", "ntc", "ptc", "temperature", "resistor"],
    answer:
      "A thermistor is a resistor whose resistance changes with temperature. NTC decreases with temperature; PTC increases. They are used for temperature sensing, compensation and protection.",
    priority: 13,
  },

  {
    id: "components-ldr",
    category: "components",
    intent: "definition",
    question: "What is an LDR?",
    variations: [
      "What is an LDR",
      "What does LDR do",
      "Light dependent resistor",
      "How to use LDR",
      "LDR vs photodiode",
      "LDR definition",
    ],
    keywords: ["ldr", "light", "resistor", "sensor", "photoresistor"],
    answer:
      "An LDR, or Light Dependent Resistor, changes resistance with light. It is used for light sensing, automatic lighting and brightness control.",
    priority: 10,
  },

  {
    id: "components-transistor",
    category: "components",
    intent: "definition",
    question: "What is a transistor used for?",
    variations: [
      "What is a transistor used for",
      "What does a transistor do",
      "Why use a transistor",
      "BJT vs MOSFET",
      "How to choose a transistor",
      "Transistor purpose",
    ],
    keywords: ["transistor", "bjt", "mosfet", "switch", "amplifier"],
    answer:
      "A transistor is commonly used for switching or amplification. BJTs and MOSFETs are two major families, with selection based on voltage, current, drive requirements, speed and application.",
    priority: 13,
  },

  {
    id: "components-mosfet-selection",
    category: "components",
    intent: "procedure",
    question: "How do I choose a MOSFET for switching?",
    variations: [
      "How do I choose a MOSFET for switching",
      "What MOSFET should I use",
      "MOSFET selection guide",
      "How to pick a MOSFET",
      "N-channel vs P-channel MOSFET",
      "MOSFET selection",
    ],
    keywords: ["mosfet", "switch", "channel", "voltage", "current", "gate"],
    answer:
      "MOSFET selection depends on load voltage and current, required on-resistance, gate drive voltage, switching speed, thermal requirements and whether high-side or low-side switching is needed. N-channel and P-channel devices have different drive requirements.",
    priority: 13,
  },

  {
    id: "components-opamp",
    category: "components",
    intent: "definition",
    question: "What is an operational amplifier used for?",
    variations: [
      "What is an operational amplifier used for",
      "What is an op-amp",
      "Why use an op-amp",
      "How to choose an op-amp",
      "Op-amp applications",
      "Op-amp purpose",
    ],
    keywords: ["opamp", "op-amp", "amplifier", "signal", "analog"],
    answer:
      "An operational amplifier amplifies and processes analog signals. It is used in filters, amplifiers, comparators, buffers and signal-conditioning circuits. Selection depends on bandwidth, gain, input offset, supply range and noise requirements.",
    priority: 10,
  },

  {
    id: "components-comparator",
    category: "components",
    intent: "definition",
    question: "What is a comparator used for?",
    variations: [
      "What is a comparator used for",
      "What is a voltage comparator",
      "Why use a comparator",
      "Comparator vs op-amp",
      "How to choose a comparator",
      "Comparator purpose",
    ],
    keywords: ["comparator", "voltage", "reference", "signal", "output"],
    answer:
      "A comparator compares two voltages and provides a digital output indicating which is higher. It is used for threshold detection, level sensing and signal conditioning. Unlike an op-amp, it is intended for fast saturated switching rather than linear amplification.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // OPTO / ISOLATION / SWITCHING PARTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-optocoupler",
    category: "components",
    intent: "definition",
    question: "What is an optocoupler?",
    variations: [
      "What is an optocoupler",
      "What does optocoupler do",
      "How to use optocoupler",
      "Optocoupler vs relay",
      "Optoisolator",
      "Optocoupler definition",
    ],
    keywords: [
      "optocoupler",
      "isolation",
      "optoisolator",
      "signal",
      "protection",
    ],
    answer:
      "An optocoupler transfers signals between isolated circuits using light. It provides electrical isolation and is used for noise immunity, safety and level shifting.",
    priority: 13,
  },

  {
    id: "components-digital-isolator",
    category: "components",
    intent: "definition",
    question: "What is a digital isolator?",
    variations: [
      "What is a digital isolator",
      "What does digital isolator do",
      "Digital isolator vs optocoupler",
      "How to use digital isolator",
      "Isolation IC",
      "Digital isolator definition",
    ],
    keywords: ["digital", "isolator", "isolation", "ic", "signal"],
    answer:
      "A digital isolator transfers digital signals across an isolation barrier using capacitive or magnetic coupling. It offers higher speed and reliability than optocouplers in some applications.",
    priority: 10,
  },

  {
    id: "components-relay",
    category: "components",
    intent: "definition",
    question: "What is a relay used for?",
    variations: [
      "What is a relay used for",
      "What does a relay do",
      "Why use a relay",
      "Relay module vs solid state relay",
      "How to choose a relay",
      "Relay purpose",
    ],
    keywords: ["relay", "switch", "load", "isolation", "module"],
    answer:
      "A relay is an electrically controlled switch that can isolate a control circuit from a load. Selection depends on coil voltage, contact rating, load type, switching frequency and whether isolation is required.",
    priority: 13,
  },

  {
    id: "components-relay-module",
    category: "components",
    intent: "definition",
    question: "What is a relay module?",
    variations: [
      "What is a relay module",
      "What does relay module do",
      "How to use relay module",
      "Relay module vs relay",
      "Optocoupler relay module",
      "Relay module definition",
    ],
    keywords: ["relay", "module", "optocoupler", "switch", "load"],
    answer:
      "A relay module combines a relay with driver circuitry, often including an optocoupler, making it easy to control higher-power loads from a microcontroller.",
    priority: 13,
  },

  {
    id: "components-solid-state-relay",
    category: "components",
    intent: "definition",
    question: "What is a solid state relay?",
    variations: [
      "What is a solid state relay",
      "What does SSR do",
      "Solid state relay vs mechanical",
      "How to use SSR",
      "SSR applications",
      "Solid state relay definition",
    ],
    keywords: ["ssr", "relay", "solid", "state", "switch"],
    answer:
      "A solid state relay switches loads without moving parts, using semiconductors. It has fast switching, no contact wear and no acoustic noise, but may have leakage and heat dissipation.",
    priority: 13,
  },

  {
    id: "components-contactor",
    category: "components",
    intent: "definition",
    question: "What is a contactor?",
    variations: [
      "What is a contactor",
      "What does contactor do",
      "Contactor vs relay",
      "How to use contactor",
      "Contactor applications",
      "Contactor definition",
    ],
    keywords: ["contactor", "relay", "power", "switch", "industrial"],
    answer:
      "A contactor is a heavy-duty relay for switching high-power loads. It is used in motor control and industrial power circuits.",
    priority: 10,
  },

  {
    id: "components-mcb",
    category: "components",
    intent: "definition",
    question: "What is a miniature circuit breaker?",
    variations: [
      "What is a miniature circuit breaker",
      "What does MCB do",
      "MCB vs fuse",
      "How to choose MCB",
      "Circuit breaker types",
      "MCB definition",
    ],
    keywords: ["mcb", "breaker", "protection", "current", "fuse"],
    answer:
      "An MCB, or Miniature Circuit Breaker, protects circuits from overcurrent and short circuits. Unlike a fuse, it can be reset after tripping.",
    priority: 10,
  },

  {
    id: "components-rcd",
    category: "components",
    intent: "definition",
    question: "What is an RCD?",
    variations: [
      "What is an RCD",
      "What does RCD do",
      "Residual current device",
      "RCD vs MCB",
      "Ground fault protection",
      "RCD definition",
    ],
    keywords: ["rcd", "protection", "current", "safety", "ground"],
    answer:
      "An RCD, or Residual Current Device, disconnects power when it detects a current imbalance, protecting against electric shock. It is used in mains installations.",
    priority: 10,
  },

  {
    id: "components-fuse",
    category: "components",
    intent: "definition",
    question: "Why use a fuse?",
    variations: [
      "Why use a fuse",
      "What does a fuse do",
      "Why put a fuse in a circuit",
      "How does a fuse protect electronics",
      "Do I need a fuse",
      "Fuse purpose",
    ],
    keywords: ["fuse", "protection", "current", "short", "safety"],
    answer:
      "A fuse is an overcurrent protection device. It is designed to interrupt a circuit when current exceeds its intended range for long enough to operate the fuse, helping protect wiring and equipment from certain fault conditions.",
    priority: 10,
  },

  {
    id: "components-esd-protection",
    category: "components",
    intent: "definition",
    question: "What is ESD protection?",
    variations: [
      "What is ESD protection",
      "How to protect against static",
      "ESD protection components",
      "Why use TVS diodes",
      "How to protect GPIO from ESD",
      "ESD protection definition",
    ],
    keywords: ["esd", "protection", "tvs", "static", "gpio"],
    answer:
      "ESD protection prevents damage from electrostatic discharge using components such as TVS diodes, varistors or dedicated protection ICs. Protection is especially important for external interfaces, user-accessible connectors and exposed signals.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SENSOR MODULES / IOT MODULES
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-sensor-module",
    category: "components",
    intent: "procedure",
    question: "What should I know about sensor modules?",
    variations: [
      "What should I know about sensor modules",
      "How to choose a sensor module",
      "Sensor module vs raw sensor",
      "Why use a sensor breakout board",
      "Sensor module voltage",
      "Sensor module considerations",
    ],
    keywords: ["sensor", "module", "breakout", "voltage", "interface"],
    answer:
      "Sensor modules often include supporting circuitry such as regulation, level shifting or signal conditioning. Check supply voltage, output type, interface, accuracy, range and compatibility with the controller before selecting one.",
    priority: 13,
  },

  {
    id: "components-rfid-module",
    category: "components",
    intent: "definition",
    question: "What is an RFID module?",
    variations: [
      "What is an RFID module",
      "What does RFID module do",
      "RC522 RFID module",
      "How to use RFID module",
      "RFID reader module",
      "RFID module definition",
    ],
    keywords: ["rfid", "module", "rc522", "reader", "tag"],
    answer:
      "An RFID module reads or writes RFID tags and cards. Common modules include RC522 for 13.56MHz tags. They are used for access control, identification and tracking.",
    priority: 13,
  },

  {
    id: "components-nfc-module",
    category: "components",
    intent: "definition",
    question: "What is an NFC module?",
    variations: [
      "What is an NFC module",
      "What does NFC module do",
      "PN532 NFC module",
      "How to use NFC module",
      "NFC vs RFID module",
      "NFC module definition",
    ],
    keywords: ["nfc", "module", "pn532", "reader", "tag"],
    answer:
      "An NFC module supports near-field communication for reading/writing tags and peer-to-peer communication. Common modules include PN532.",
    priority: 10,
  },

  {
    id: "components-rf-module",
    category: "components",
    intent: "definition",
    question: "What is an RF module?",
    variations: [
      "What is an RF module",
      "What does RF module do",
      "Types of RF modules",
      "How to use RF module",
      "433MHz RF module",
      "RF module definition",
    ],
    keywords: ["rf", "module", "radio", "wireless", "communication"],
    answer:
      "An RF module transmits and receives radio signals for wireless communication. Common types include 433MHz ASK modules, nRF24L01 and LoRa modules.",
    priority: 10,
  },

  {
    id: "components-wifi-module",
    category: "components",
    intent: "definition",
    question: "What is a WiFi module?",
    variations: [
      "What is a WiFi module",
      "What does WiFi module do",
      "ESP8266 WiFi module",
      "How to use WiFi module",
      "WiFi module vs ESP32",
      "WiFi module definition",
    ],
    keywords: ["wifi", "module", "esp8266", "wireless", "communication"],
    answer:
      "A WiFi module provides wireless network connectivity. Common modules include ESP8266 and ESP32, which can also run user firmware.",
    priority: 13,
  },

  {
    id: "components-bluetooth-module",
    category: "components",
    intent: "definition",
    question: "What is a Bluetooth module?",
    variations: [
      "What is a Bluetooth module",
      "What does Bluetooth module do",
      "HC-05 Bluetooth module",
      "BLE module types",
      "How to use Bluetooth module",
      "Bluetooth module definition",
    ],
    keywords: ["bluetooth", "module", "hc05", "ble", "wireless"],
    answer:
      "A Bluetooth module provides wireless communication over Bluetooth. Classic modules like HC-05 support serial profiles, while BLE modules are used for low-power applications.",
    priority: 13,
  },

  {
    id: "components-gps-module",
    category: "components",
    intent: "definition",
    question: "What is a GPS module?",
    variations: [
      "What is a GPS module",
      "What does GPS module do",
      "NEO-6M GPS module",
      "How to use GPS module",
      "GPS module output",
      "GPS module definition",
    ],
    keywords: ["gps", "module", "location", "nmea", "position"],
    answer:
      "A GPS module receives satellite signals to determine position, time and speed. It typically outputs NMEA data over UART.",
    priority: 13,
  },

  {
    id: "components-gsm-module",
    category: "components",
    intent: "definition",
    question: "What is a GSM module?",
    variations: [
      "What is a GSM module",
      "What does GSM module do",
      "SIM800L module",
      "How to use GSM module",
      "GSM vs LTE module",
      "GSM module definition",
    ],
    keywords: ["gsm", "module", "sim800", "cellular", "sms"],
    answer:
      "A GSM module provides cellular connectivity for voice, SMS and data. Common modules include SIM800L and SIM900. Newer designs may use LTE modules.",
    priority: 13,
  },

  {
    id: "components-lora-module",
    category: "components",
    intent: "definition",
    question: "What is a LoRa module?",
    variations: [
      "What is a LoRa module",
      "What does LoRa module do",
      "SX1276 LoRa module",
      "How to use LoRa module",
      "LoRa vs RF module",
      "LoRa module definition",
    ],
    keywords: ["lora", "module", "sx1276", "long", "range"],
    answer:
      "A LoRa module provides long-range, low-power wireless communication. Common modules include SX1276 and SX1278. They are used for IoT and remote sensing.",
    priority: 13,
  },

  {
    id: "components-camera-module",
    category: "components",
    intent: "definition",
    question: "What is a camera module?",
    variations: [
      "What is a camera module",
      "What does camera module do",
      "OV7670 camera module",
      "ESP32 camera module",
      "How to use camera module",
      "Camera module definition",
    ],
    keywords: ["camera", "module", "ov7670", "esp32", "image"],
    answer:
      "A camera module captures images or video for processing, storage or transmission. Interface types include parallel, SPI and dedicated camera interfaces.",
    priority: 10,
  },

  {
    id: "components-display-module",
    category: "components",
    intent: "definition",
    question: "What display modules are available?",
    variations: [
      "What display modules are available",
      "LCD display module",
      "OLED display module",
      "TFT display module",
      "Character LCD module",
      "Display module types",
    ],
    keywords: ["display", "module", "lcd", "oled", "tft"],
    answer:
      "Common display modules include character LCDs (e.g. 16x2), graphic LCDs, OLED displays and TFT displays. They differ in size, resolution, interface and power consumption.",
    priority: 10,
  },

  {
    id: "components-lcd",
    category: "components",
    intent: "procedure",
    question: "What display should I use for my project?",
    variations: [
      "What display should I use for my project",
      "LCD vs OLED",
      "How to choose a display",
      "Display module types",
      "Which display for Arduino",
      "Display choice guide",
    ],
    keywords: ["display", "lcd", "oled", "screen", "interface"],
    answer:
      "Display selection depends on size, resolution, interface, readability, power consumption, environmental conditions and cost. Common options include character LCDs, graphic LCDs and OLED displays, with different communication interfaces and library support.",
    priority: 10,
  },

  {
    id: "components-keypad",
    category: "components",
    intent: "definition",
    question: "What is a keypad?",
    variations: [
      "What is a keypad",
      "What does keypad do",
      "4x4 keypad",
      "How to use keypad",
      "Matrix keypad",
      "Keypad definition",
    ],
    keywords: ["keypad", "matrix", "input", "button", "interface"],
    answer:
      "A keypad is a set of buttons arranged in a matrix, allowing many keys with few pins. It is used for user input in embedded systems.",
    priority: 10,
  },

  {
    id: "components-touch-panel",
    category: "components",
    intent: "definition",
    question: "What is a touch panel?",
    variations: [
      "What is a touch panel",
      "What does touch panel do",
      "Capacitive touch panel",
      "Resistive touch panel",
      "How to use touch panel",
      "Touch panel definition",
    ],
    keywords: ["touch", "panel", "capacitive", "resistive", "interface"],
    answer:
      "A touch panel detects user touch for input. Capacitive panels are common in modern devices; resistive panels work with pressure and are used in industrial applications.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MOTOR-AS-COMPONENT / ACTUATORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-motor-driver",
    category: "components",
    intent: "definition",
    question: "What is a motor driver?",
    variations: [
      "What is a motor driver",
      "What does motor driver do",
      "L298N motor driver",
      "How to use motor driver",
      "Motor driver vs transistor",
      "Motor driver definition",
    ],
    keywords: ["motor", "driver", "l298n", "hbridge", "control"],
    answer:
      "A motor driver provides the current and control needed to drive a motor from a microcontroller. Types include H-bridge, MOSFET-based and dedicated modules like L298N or DRV8825.",
    priority: 13,
  },

  {
    id: "components-servo",
    category: "components",
    intent: "definition",
    question: "What is a servo motor?",
    variations: [
      "What is a servo motor",
      "What does servo do",
      "How to control servo",
      "Servo vs DC motor",
      "Servo motor types",
      "Servo motor definition",
    ],
    keywords: ["servo", "motor", "position", "control", "pwm"],
    answer:
      "A servo motor is designed for controlled angular positioning. It contains internal feedback and is controlled by a PWM signal.",
    priority: 13,
  },

  {
    id: "components-stepper",
    category: "components",
    intent: "definition",
    question: "What is a stepper motor?",
    variations: [
      "What is a stepper motor",
      "What does stepper motor do",
      "How to control stepper",
      "Stepper vs DC motor",
      "Stepper motor driver",
      "Stepper motor definition",
    ],
    keywords: ["stepper", "motor", "step", "position", "driver"],
    answer:
      "A stepper motor moves in discrete steps and is used for precise positioning. It requires a driver to sequence the coils.",
    priority: 13,
  },

  {
    id: "components-bldc",
    category: "components",
    intent: "definition",
    question: "What is a BLDC motor?",
    variations: [
      "What is a BLDC motor",
      "What does BLDC motor do",
      "Brushless DC motor",
      "How to control BLDC",
      "BLDC vs brushed motor",
      "BLDC motor definition",
    ],
    keywords: ["bldc", "brushless", "motor", "esc", "control"],
    answer:
      "A BLDC, or Brushless DC, motor uses electronic commutation instead of brushes. It is efficient and long-lasting but requires a controller or ESC.",
    priority: 13,
  },

  {
    id: "components-solenoid",
    category: "components",
    intent: "definition",
    question: "What is a solenoid?",
    variations: [
      "What is a solenoid",
      "What does solenoid do",
      "How to control solenoid",
      "Solenoid vs motor",
      "Solenoid valve",
      "Solenoid definition",
    ],
    keywords: ["solenoid", "coil", "actuator", "valve", "control"],
    answer:
      "A solenoid is an electromagnetic actuator that converts electrical current into linear motion. It is used in valves, locks and other mechanisms.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // POWER COMPONENTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-power-bank",
    category: "components",
    intent: "compatibility",
    question: "Can I use a power bank for my project?",
    variations: [
      "Can I use a power bank for my project",
      "Power bank for electronics",
      "Can I power Arduino with power bank",
      "Power bank output current",
      "Using USB power bank for project",
      "Power bank usage",
    ],
    keywords: ["power", "bank", "usb", "battery", "current"],
    answer:
      "Power banks can power many USB-compatible projects, but check the output voltage and current capability, whether it shuts off at low current and whether it can supply peak loads. Some power banks automatically turn off if the load is too small.",
    priority: 10,
  },

  {
    id: "components-dc-dc",
    category: "components",
    intent: "definition",
    question: "What is a DC-DC converter?",
    variations: [
      "What is a DC-DC converter",
      "What does DC-DC converter do",
      "Buck boost converter",
      "How to use DC-DC converter",
      "DC-DC vs linear regulator",
      "DC-DC converter definition",
    ],
    keywords: ["dc", "converter", "buck", "boost", "efficiency"],
    answer:
      "A DC-DC converter changes one DC voltage to another, often with high efficiency. Types include buck (step-down), boost (step-up) and buck-boost.",
    priority: 13,
  },

  {
    id: "components-regulator",
    category: "components",
    intent: "definition",
    question: "What does a voltage regulator do?",
    variations: [
      "What does a voltage regulator do",
      "What is a voltage regulator",
      "Why use a regulator",
      "How do I get 5V from a higher voltage",
      "What does a buck converter do",
      "What does an LDO do",
    ],
    keywords: ["regulator", "voltage", "buck", "boost", "ldo", "power"],
    answer:
      "A voltage regulator provides a controlled output voltage from a suitable input. Linear regulators such as LDOs dissipate excess voltage as heat, while switching regulators such as buck and boost converters transfer energy more efficiently for many applications.",
    priority: 13,
  },

  {
    id: "components-battery",
    category: "components",
    intent: "procedure",
    question: "How do I choose a battery?",
    variations: [
      "How do I choose a battery",
      "What battery should I use",
      "How do I select battery capacity",
      "How much battery capacity do I need",
      "What battery is suitable for my project",
      "Battery selection guide",
    ],
    keywords: ["battery", "capacity", "voltage", "current", "power"],
    answer:
      "Battery selection depends on required voltage, average and peak current, operating time, physical constraints, charging requirements and the battery chemistry. Capacity alone is not enough; discharge capability and safe charging also matter.",
    priority: 13,
  },

  {
    id: "components-charger",
    category: "components",
    intent: "definition",
    question: "What is a battery charger IC?",
    variations: [
      "What is a battery charger IC",
      "What does charger IC do",
      "TP4056 charger",
      "How to charge battery",
      "Battery charger module",
      "Charger IC definition",
    ],
    keywords: ["charger", "battery", "tp4056", "lithium", "charging"],
    answer:
      "A battery charger IC manages charging current and voltage for a specific battery chemistry. Common examples include TP4056 for lithium cells.",
    priority: 13,
  },

  {
    id: "components-bms",
    category: "components",
    intent: "definition",
    question: "What is a BMS?",
    variations: [
      "What is a BMS",
      "What does BMS do",
      "Battery management system",
      "How to use BMS",
      "BMS for lithium battery",
      "BMS definition",
    ],
    keywords: ["bms", "battery", "management", "protection", "lithium"],
    answer:
      "A BMS, or Battery Management System, protects and manages battery cells, providing overcharge, overdischarge, overcurrent and temperature protection. It may also balance cells.",
    priority: 13,
  },

  {
    id: "components-fuel-gauge",
    category: "components",
    intent: "definition",
    question: "What is a fuel gauge IC?",
    variations: [
      "What is a fuel gauge IC",
      "What does fuel gauge do",
      "Battery fuel gauge",
      "How to measure battery level",
      "MAX17043 fuel gauge",
      "Fuel gauge IC definition",
    ],
    keywords: ["fuel", "gauge", "battery", "level", "monitor"],
    answer:
      "A fuel gauge IC estimates battery state of charge using voltage, current and temperature. It provides more accurate battery level information than voltage alone.",
    priority: 10,
  },

  {
    id: "components-supercapacitor",
    category: "components",
    intent: "definition",
    question: "What is a supercapacitor?",
    variations: [
      "What is a supercapacitor",
      "What does supercapacitor do",
      "Supercapacitor vs battery",
      "How to use supercapacitor",
      "Supercapacitor applications",
      "Supercapacitor definition",
    ],
    keywords: ["supercapacitor", "energy", "storage", "battery", "power"],
    answer:
      "A supercapacitor stores energy through electrostatic charge. It has high power density and long cycle life but lower energy density than batteries.",
    priority: 10,
  },

  {
    id: "components-transformer",
    category: "components",
    intent: "definition",
    question: "What is a transformer?",
    variations: [
      "What is a transformer",
      "What does transformer do",
      "How does transformer work",
      "Transformer types",
      "Step up vs step down transformer",
      "Transformer definition",
    ],
    keywords: ["transformer", "voltage", "isolation", "ac", "coil"],
    answer:
      "A transformer transfers energy between circuits through magnetic coupling. It can step voltage up or down and provide isolation. Transformers work with AC, not DC.",
    priority: 10,
  },

  {
    id: "components-power-supply",
    category: "components",
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

  // ─────────────────────────────────────────────────────────────
  // ADC / DAC / DIGITAL / MEMORY ICS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-adc-ic",
    category: "components",
    intent: "definition",
    question: "What is an ADC IC?",
    variations: [
      "What is an ADC IC",
      "What does ADC IC do",
      "External ADC",
      "How to use ADC IC",
      "ADC vs microcontroller ADC",
      "ADC IC definition",
    ],
    keywords: ["adc", "ic", "analog", "digital", "converter"],
    answer:
      "An ADC IC converts analog signals to digital data. External ADCs offer higher resolution, speed or channel count than many microcontroller ADCs.",
    priority: 13,
  },

  {
    id: "components-dac-ic",
    category: "components",
    intent: "definition",
    question: "What is a DAC IC?",
    variations: [
      "What is a DAC IC",
      "What does DAC IC do",
      "External DAC",
      "How to use DAC IC",
      "DAC vs PWM",
      "DAC IC definition",
    ],
    keywords: ["dac", "ic", "digital", "analog", "converter"],
    answer:
      "A DAC IC converts digital data to an analog voltage or current. It is used for audio, waveform generation and precise control outputs.",
    priority: 13,
  },

  {
    id: "components-digital-pot",
    category: "components",
    intent: "definition",
    question: "What is a digital potentiometer?",
    variations: [
      "What is a digital potentiometer",
      "What does digital pot do",
      "Digital potentiometer IC",
      "How to use digital pot",
      "Digital pot vs mechanical",
      "Digital potentiometer definition",
    ],
    keywords: ["digital", "potentiometer", "ic", "resistance", "control"],
    answer:
      "A digital potentiometer is an IC that provides adjustable resistance controlled digitally. It is used for calibration, gain control and programmable references.",
    priority: 10,
  },

  {
    id: "components-multiplexer",
    category: "components",
    intent: "definition",
    question: "What is a multiplexer?",
    variations: [
      "What is a multiplexer",
      "What does multiplexer do",
      "MUX IC",
      "How to use multiplexer",
      "Analog multiplexer",
      "Multiplexer definition",
    ],
    keywords: ["multiplexer", "mux", "ic", "analog", "switch"],
    answer:
      "A multiplexer selects one of several inputs and routes it to a single output. It is used to expand ADC channels or switch signals.",
    priority: 10,
  },

  {
    id: "components-demultiplexer",
    category: "components",
    intent: "definition",
    question: "What is a demultiplexer?",
    variations: [
      "What is a demultiplexer",
      "What does demultiplexer do",
      "DEMUX IC",
      "How to use demultiplexer",
      "Demux vs multiplexer",
      "Demultiplexer definition",
    ],
    keywords: ["demultiplexer", "demux", "ic", "output", "switch"],
    answer:
      "A demultiplexer routes one input to one of several outputs based on a select signal. It is the opposite of a multiplexer.",
    priority: 10,
  },

  {
    id: "components-shift-register",
    category: "components",
    intent: "definition",
    question: "What is a shift register?",
    variations: [
      "What is a shift register",
      "What does shift register do",
      "74HC595 shift register",
      "How to use shift register",
      "Shift register vs multiplexer",
      "Shift register definition",
    ],
    keywords: ["shift", "register", "ic", "serial", "parallel"],
    answer:
      "A shift register converts serial data to parallel or vice versa. It is used to expand I/O pins, drive displays and interface with LEDs.",
    priority: 13,
  },

  {
    id: "components-io-expander",
    category: "components",
    intent: "definition",
    question: "What is an I/O expander?",
    variations: [
      "What is an I/O expander",
      "What does I/O expander do",
      "PCF8574 I/O expander",
      "MCP23017 expander",
      "How to add more IO pins",
      "I/O expander definition",
    ],
    keywords: ["io", "expander", "pcf8574", "mcp23017", "pins"],
    answer:
      "An I/O expander adds input/output pins over a bus such as I2C or SPI. It is useful when a microcontroller has insufficient pins.",
    priority: 13,
  },

  {
    id: "components-rtc-module",
    category: "components",
    intent: "definition",
    question: "What is an RTC module?",
    variations: [
      "What is an RTC module",
      "What does RTC module do",
      "DS3231 RTC module",
      "How to use RTC module",
      "RTC module with battery",
      "RTC module definition",
    ],
    keywords: ["rtc", "module", "ds3231", "time", "clock"],
    answer:
      "An RTC module keeps time and date, often with a backup battery. Common modules include DS1307 and DS3231.",
    priority: 13,
  },

  {
    id: "components-eeprom-ic",
    category: "components",
    intent: "definition",
    question: "What is an EEPROM IC?",
    variations: [
      "What is an EEPROM IC",
      "What does EEPROM IC do",
      "External EEPROM",
      "How to use EEPROM IC",
      "I2C EEPROM",
      "EEPROM IC definition",
    ],
    keywords: ["eeprom", "ic", "memory", "storage", "nonvolatile"],
    answer:
      "An EEPROM IC provides non-volatile memory for storing configuration or data. It is often interfaced over I2C or SPI.",
    priority: 10,
  },

  {
    id: "components-flash-ic",
    category: "components",
    intent: "definition",
    question: "What is a flash memory IC?",
    variations: [
      "What is a flash memory IC",
      "What does flash IC do",
      "External flash memory",
      "SPI flash chip",
      "How to use flash IC",
      "Flash IC definition",
    ],
    keywords: ["flash", "ic", "memory", "spi", "storage"],
    answer:
      "A flash memory IC provides non-volatile storage for code or data. SPI flash is common for firmware, file systems and logging.",
    priority: 13,
  },

  {
    id: "components-sd-card",
    category: "components",
    intent: "definition",
    question: "What is an SD card?",
    variations: [
      "What is an SD card",
      "What does SD card do",
      "How to use SD card",
      "SD card module",
      "microSD card interface",
      "SD card definition",
    ],
    keywords: ["sd", "card", "storage", "module", "filesystem"],
    answer:
      "An SD card provides removable non-volatile storage. It can be interfaced via SPI or SDIO and used with a file system.",
    priority: 13,
  },

  {
    id: "components-fram",
    category: "components",
    intent: "definition",
    question: "What is FRAM?",
    variations: [
      "What is FRAM",
      "What does FRAM do",
      "FRAM vs EEPROM",
      "How to use FRAM",
      "Ferroelectric memory",
      "FRAM definition",
    ],
    keywords: ["fram", "memory", "ferroelectric", "nonvolatile", "storage"],
    answer:
      "FRAM is non-volatile memory with fast writes and high endurance. It is useful for frequent logging and configuration storage.",
    priority: 10,
  },

  {
    id: "components-nvram",
    category: "components",
    intent: "definition",
    question: "What is NVRAM?",
    variations: [
      "What is NVRAM",
      "What does NVRAM do",
      "NVRAM vs RAM",
      "How to use NVRAM",
      "Non volatile RAM",
      "NVRAM definition",
    ],
    keywords: ["nvram", "memory", "nonvolatile", "ram", "storage"],
    answer:
      "NVRAM retains data without power. It can be battery-backed SRAM, FRAM, MRAM or other technologies.",
    priority: 10,
  },

  {
    id: "components-otp",
    category: "components",
    intent: "definition",
    question: "What is OTP memory?",
    variations: [
      "What is OTP memory",
      "OTP firmware",
      "One time programmable memory",
      "OTP storage MCU",
      "Write once memory",
      "OTP memory definition",
    ],
    keywords: ["otp", "memory", "programmable", "once", "storage"],
    answer:
      "OTP, or One-Time Programmable, memory can be written once and cannot be erased or rewritten. It is used for keys, calibration or permanent data.",
    priority: 10,
  },

  {
    id: "components-efuse",
    category: "components",
    intent: "definition",
    question: "What is an eFuse?",
    variations: [
      "What is an eFuse",
      "eFuse firmware",
      "Electronic fuse memory",
      "OTP eFuse MCU",
      "Program eFuse",
      "eFuse definition",
    ],
    keywords: ["efuse", "memory", "otp", "program", "protection"],
    answer:
      "An eFuse is a one-time programmable memory bit used for configuration, keys or device identity. Once programmed, it cannot be changed.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SWITCHES / MECHANICAL / CONNECTORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-switch",
    category: "components",
    intent: "procedure",
    question: "What switch should I use in my circuit?",
    variations: [
      "What switch should I use in my circuit",
      "Types of switches",
      "How to choose a switch",
      "Push button vs toggle switch",
      "Switch current rating",
      "Switch selection guide",
    ],
    keywords: ["switch", "button", "toggle", "current", "rating"],
    answer:
      "Switch selection depends on the circuit voltage and current, the number of poles and throws, mounting, actuation type and environment. The switch must be rated for the load being switched.",
    priority: 10,
  },

  {
    id: "components-tactile-switch",
    category: "components",
    intent: "definition",
    question: "What is a tactile switch?",
    variations: [
      "What is a tactile switch",
      "Tactile push button",
      "How to use tactile switch",
      "Tactile switch vs regular",
      "Momentary switch",
      "Tactile switch definition",
    ],
    keywords: ["tactile", "switch", "button", "momentary", "input"],
    answer:
      "A tactile switch provides tactile feedback when pressed. It is a momentary switch commonly used for user input.",
    priority: 10,
  },

  {
    id: "components-slide-switch",
    category: "components",
    intent: "definition",
    question: "What is a slide switch?",
    variations: [
      "What is a slide switch",
      "Slide switch uses",
      "How to use slide switch",
      "SPDT slide switch",
      "Slide vs toggle switch",
      "Slide switch definition",
    ],
    keywords: ["slide", "switch", "spdt", "toggle", "control"],
    answer:
      "A slide switch is a mechanical switch that selects between positions. It is used for power and mode selection.",
    priority: 9,
  },

  {
    id: "components-toggle-switch",
    category: "components",
    intent: "definition",
    question: "What is a toggle switch?",
    variations: [
      "What is a toggle switch",
      "Toggle switch uses",
      "SPST toggle",
      "SPDT toggle",
      "Toggle vs slide switch",
      "Toggle switch definition",
    ],
    keywords: ["toggle", "switch", "spst", "spdt", "control"],
    answer:
      "A toggle switch has a lever that selects between positions. It is available in SPST, SPDT and other configurations for power and control.",
    priority: 9,
  },

  {
    id: "components-dip-switch",
    category: "components",
    intent: "definition",
    question: "What is a DIP switch?",
    variations: [
      "What is a DIP switch",
      "DIP switch uses",
      "How to use DIP switch",
      "DIP switch configuration",
      "DIP switch vs jumper",
      "DIP switch definition",
    ],
    keywords: ["dip", "switch", "configuration", "settings", "hardware"],
    answer:
      "A DIP switch is a set of small switches in a dual in-line package, used for hardware configuration and settings.",
    priority: 10,
  },

  {
    id: "components-rotary-switch",
    category: "components",
    intent: "definition",
    question: "What is a rotary switch?",
    variations: [
      "What is a rotary switch",
      "Rotary switch uses",
      "How to use rotary switch",
      "Rotary switch vs potentiometer",
      "Multi position switch",
      "Rotary switch definition",
    ],
    keywords: ["rotary", "switch", "position", "selection", "control"],
    answer:
      "A rotary switch selects one of several positions, often for mode or range selection. It provides discrete settings.",
    priority: 9,
  },

  {
    id: "components-jumper",
    category: "components",
    intent: "definition",
    question: "What is a jumper?",
    variations: [
      "What is a jumper",
      "Jumper wire",
      "Jumper pins",
      "How to use jumper",
      "Solder jumper",
      "Jumper definition",
    ],
    keywords: ["jumper", "wire", "pin", "solder", "configuration"],
    answer:
      "A jumper is a short conductor used to connect or configure circuits. Types include wire jumpers, jumper pins and solder jumpers.",
    priority: 9,
  },

  {
    id: "components-pcb-standoff",
    category: "components",
    intent: "definition",
    question: "What are PCB standoffs?",
    variations: [
      "What are PCB standoffs",
      "PCB standoff uses",
      "How to mount PCB",
      "Standoff types",
      "PCB mounting hardware",
      "PCB standoff definition",
    ],
    keywords: ["pcb", "standoff", "mount", "hardware", "spacer"],
    answer:
      "PCB standoffs hold a board at a fixed distance from a surface or another board, providing mechanical support and clearance.",
    priority: 9,
  },

  {
    id: "components-test-point",
    category: "components",
    intent: "definition",
    question: "What is a test point?",
    variations: [
      "What is a test point",
      "Test point PCB",
      "Why use test points",
      "How to add test points",
      "Debugging test points",
      "Test point definition",
    ],
    keywords: ["test", "point", "pcb", "debug", "measurement"],
    answer:
      "A test point is a designated location for measuring signals or voltages during testing and debugging. It simplifies troubleshooting and verification.",
    priority: 10,
  },

  {
    id: "components-connector",
    category: "components",
    intent: "procedure",
    question: "How do I choose a connector?",
    variations: [
      "How do I choose a connector",
      "What connector should I use",
      "Connector types for electronics",
      "How to select connectors",
      "Connector current rating",
      "Connector selection guide",
    ],
    keywords: ["connector", "plug", "socket", "current", "voltage"],
    answer:
      "Connector selection depends on voltage, current, number of contacts, size, environment, mating cycles, ease of assembly and reliability requirements. The connector must also be compatible with the wire or cable being used.",
    priority: 13,
  },

  {
    id: "components-connector-types",
    category: "components",
    intent: "comparison",
    question: "What connector types are common?",
    variations: [
      "What connector types are common",
      "Connector types",
      "JST connector",
      "Dupont connector",
      "Screw terminal vs plug",
      "Common connector types",
    ],
    keywords: ["connector", "types", "jst", "dupont", "terminal"],
    answer:
      "Common connector types include Dupont, JST, screw terminals, barrel jacks, USB, HDMI and board-to-board connectors. Selection depends on application, size, current and mating cycles.",
    priority: 10,
  },

  {
    id: "components-wire",
    category: "components",
    intent: "procedure",
    question: "What wire should I use for my project?",
    variations: [
      "What wire should I use for my project",
      "Wire gauge selection",
      "How to choose hookup wire",
      "Stranded vs solid wire",
      "What wire for electronics",
      "Wire selection guide",
    ],
    keywords: ["wire", "gauge", "stranded", "solid", "current"],
    answer:
      "Wire selection depends on current, voltage, flexibility, routing environment and connection method. Stranded wire is generally more flexible, while solid wire can be easier for breadboards or fixed wiring. The gauge must safely carry the expected current.",
    priority: 10,
  },

  {
    id: "components-wire-gauge",
    category: "components",
    intent: "procedure",
    question: "What wire gauge should I use?",
    variations: [
      "What wire gauge should I use",
      "Wire gauge selection",
      "AWG wire size",
      "How to choose wire gauge",
      "Wire current capacity",
      "Wire gauge guide",
    ],
    keywords: ["wire", "gauge", "awg", "current", "size"],
    answer:
      "Wire gauge should be chosen based on current, voltage drop, insulation, flexibility and environment. AWG tables and calculators can help select a safe size.",
    priority: 13,
  },

  {
    id: "components-heat-shrink",
    category: "components",
    intent: "definition",
    question: "What is heat shrink tubing?",
    variations: [
      "What is heat shrink tubing",
      "Heat shrink uses",
      "How to use heat shrink",
      "Heat shrink sizes",
      "Insulation for wires",
      "Heat shrink definition",
    ],
    keywords: ["heat", "shrink", "tubing", "insulation", "wire"],
    answer:
      "Heat shrink tubing shrinks when heated to insulate, protect and strain-relieve wires and connections. It is available in various sizes and materials.",
    priority: 9,
  },

  {
    id: "components-cable-tie",
    category: "components",
    intent: "definition",
    question: "What are cable ties used for?",
    variations: [
      "What are cable ties used for",
      "Cable tie uses",
      "How to organize wires",
      "Zip tie",
      "Wire management",
      "Cable tie definition",
    ],
    keywords: ["cable", "tie", "wire", "management", "organize"],
    answer:
      "Cable ties secure and organize wires and cables. They are available in many sizes and materials.",
    priority: 7,
  },

  {
    id: "components-solder",
    category: "components",
    intent: "procedure",
    question: "What solder should I use?",
    variations: [
      "What solder should I use",
      "Leaded vs lead-free solder",
      "Solder types",
      "What is rosin core solder",
      "Best solder for electronics",
      "Solder selection guide",
    ],
    keywords: ["solder", "leaded", "lead-free", "rosin", "flux"],
    answer:
      "Common electronics solders include leaded and lead-free alloys, often with a rosin or no-clean flux core. Leaded solder is generally easier to work with, while lead-free solder is preferred where lead use is restricted. The choice also depends on health, environmental and process requirements.",
    priority: 9,
  },

  {
    id: "components-flux",
    category: "components",
    intent: "definition",
    question: "What is flux used for?",
    variations: [
      "What is flux used for",
      "Flux PCB",
      "Why use flux",
      "Flux types",
      "No clean flux",
      "Flux definition",
    ],
    keywords: ["flux", "pcb", "soldering", "clean", "solder"],
    answer:
      "Flux removes oxidation and improves solder flow. Types include rosin, no-clean and water-soluble. Some residues should be cleaned after soldering.",
    priority: 9,
  },

  {
    id: "components-tools",
    category: "components",
    intent: "requirements",
    question: "What tools do I need for electronics work?",
    variations: [
      "What tools do I need for electronics work",
      "Basic electronics tools",
      "What tools for soldering",
      "Recommended tools for circuit building",
      "Starter electronics toolkit",
      "Electronics tools list",
    ],
    keywords: ["tools", "soldering", "multimeter", "pliers", "workbench"],
    answer:
      "Common tools include a soldering iron, multimeter, wire cutters, pliers, screwdrivers, helping hands or vice, solder, flux, heat shrink and a power supply or test source. The exact tools depend on the type of work being done.",
    priority: 13,
  },

  {
    id: "components-kit",
    category: "components",
    intent: "procedure",
    question: "Should I buy an electronics kit?",
    variations: [
      "Should I buy an electronics kit",
      "Are starter kits worth it",
      "What kit should I buy",
      "Arduino kit vs individual parts",
      "Best electronics kit for beginners",
      "Electronics kit advice",
    ],
    keywords: ["kit", "starter", "arduino", "beginner", "parts"],
    answer:
      "Starter kits can be useful for learning because they include common components and examples. For a specific project, buying individual parts may be more appropriate because a kit may not contain the exact components or quantities needed.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // PACKAGES / FOOTPRINTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-dip-package",
    category: "components",
    intent: "definition",
    question: "What is a DIP package?",
    variations: [
      "What is a DIP package",
      "DIP package IC",
      "Through hole IC",
      "DIP vs SOIC",
      "DIP package uses",
      "DIP package definition",
    ],
    keywords: ["dip", "package", "ic", "through", "hole"],
    answer:
      "A DIP, or Dual In-line Package, is a through-hole IC package with two rows of pins. It is easy to handle and prototype but larger than SMD packages.",
    priority: 10,
  },

  {
    id: "components-soic",
    category: "components",
    intent: "definition",
    question: "What is an SOIC package?",
    variations: [
      "What is an SOIC package",
      "SOIC package IC",
      "SMD package types",
      "SOIC vs DIP",
      "Surface mount IC",
      "SOIC definition",
    ],
    keywords: ["soic", "package", "smd", "ic", "surface"],
    answer:
      "SOIC, or Small Outline Integrated Circuit, is a surface-mount IC package. It is smaller than DIP and common for modern designs.",
    priority: 10,
  },

  {
    id: "components-qfn",
    category: "components",
    intent: "definition",
    question: "What is a QFN package?",
    variations: [
      "What is a QFN package",
      "QFN package IC",
      "QFN vs QFP",
      "SMD package QFN",
      "Quad flat no leads",
      "QFN definition",
    ],
    keywords: ["qfn", "package", "ic", "smd", "surface"],
    answer:
      "QFN, or Quad Flat No-leads, is a compact surface-mount IC package with pads underneath. It provides good thermal performance but requires careful soldering.",
    priority: 10,
  },

  {
    id: "components-qfp",
    category: "components",
    intent: "definition",
    question: "What is a QFP package?",
    variations: [
      "What is a QFP package",
      "QFP package IC",
      "QFP vs QFN",
      "Quad flat package",
      "SMD package QFP",
      "QFP definition",
    ],
    keywords: ["qfp", "package", "ic", "smd", "surface"],
    answer:
      "QFP, or Quad Flat Package, is a surface-mount IC package with pins on all four sides. It is easy to inspect but larger than QFN.",
    priority: 10,
  },

  {
    id: "components-bga",
    category: "components",
    intent: "definition",
    question: "What is a BGA package?",
    variations: [
      "What is a BGA package",
      "BGA package IC",
      "Ball grid array",
      "BGA vs QFN",
      "BGA soldering",
      "BGA definition",
    ],
    keywords: ["bga", "package", "ic", "ball", "grid"],
    answer:
      "BGA, or Ball Grid Array, is a surface-mount package with solder balls underneath. It allows high pin counts but is difficult to inspect and repair.",
    priority: 10,
  },

  {
    id: "components-to-package",
    category: "components",
    intent: "definition",
    question: "What is a TO package?",
    variations: [
      "What is a TO package",
      "TO-220 package",
      "TO-92 transistor",
      "TO package types",
      "Transistor packages",
      "TO package definition",
    ],
    keywords: ["to", "package", "transistor", "power", "through"],
    answer:
      "TO packages are used for transistors, voltage regulators and power devices. Common types include TO-92 (small signal) and TO-220 (power).",
    priority: 10,
  },

  {
    id: "components-sot",
    category: "components",
    intent: "definition",
    question: "What is a SOT package?",
    variations: [
      "What is a SOT package",
      "SOT-23 package",
      "SOT transistor",
      "Small outline transistor",
      "SOT package types",
      "SOT definition",
    ],
    keywords: ["sot", "package", "transistor", "smd", "small"],
    answer:
      "SOT, or Small Outline Transistor, is a small surface-mount package for transistors, diodes and ICs. SOT-23 is very common.",
    priority: 10,
  },

  {
    id: "components-0603",
    category: "components",
    intent: "definition",
    question: "What does 0603 mean?",
    variations: [
      "What does 0603 mean",
      "0603 package size",
      "SMD resistor size",
      "0402 vs 0603",
      "SMD package sizes",
      "0603 package definition",
    ],
    keywords: ["0603", "package", "size", "smd", "resistor"],
    answer:
      "0603 is a surface-mount package size (0.06 x 0.03 inches). Common sizes include 0402, 0603, 0805 and 1206, with smaller sizes being harder to hand-solder.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SOLDERING / REWORK
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-reflow",
    category: "components",
    intent: "procedure",
    question: "What is reflow soldering?",
    variations: [
      "What is reflow soldering",
      "Reflow soldering process",
      "How does reflow work",
      "Reflow vs wave soldering",
      "SMT reflow",
      "Reflow definition",
    ],
    keywords: ["reflow", "soldering", "pcb", "smt", "solder"],
    answer:
      "Reflow soldering applies solder paste, places components and heats the board so the paste melts and forms joints. It is the standard method for SMT assembly.",
    priority: 13,
  },

  {
    id: "components-wave",
    category: "components",
    intent: "procedure",
    question: "What is wave soldering?",
    variations: [
      "What is wave soldering",
      "Wave soldering process",
      "Wave vs reflow",
      "Through hole soldering",
      "Wave solder PCB",
      "Wave soldering definition",
    ],
    keywords: ["wave", "soldering", "pcb", "through", "hole"],
    answer:
      "Wave soldering passes boards over a wave of molten solder, soldering through-hole components. It is used in high-volume production and mixed assemblies.",
    priority: 10,
  },

  {
    id: "components-hand-solder",
    category: "components",
    intent: "procedure",
    question: "Can I hand-solder a PCB?",
    variations: [
      "Can I hand-solder a PCB",
      "Hand soldering PCB",
      "How to solder PCB",
      "Hand solder SMD",
      "Manual soldering",
      "Hand soldering",
    ],
    keywords: ["hand", "solder", "pcb", "manual", "smd"],
    answer:
      "Yes. Hand soldering works well for through-hole and larger SMD components. Small SMD parts require a fine tip, flux, good lighting and steady hands.",
    priority: 10,
  },

  {
    id: "components-hot-air",
    category: "components",
    intent: "procedure",
    question: "What is hot air rework?",
    variations: [
      "What is hot air rework",
      "Hot air rework",
      "Reflow hot air",
      "How to remove SMD",
      "Hot air station",
      "Hot air rework definition",
    ],
    keywords: ["hot", "air", "rework", "pcb", "smt"],
    answer:
      "Hot air rework uses a controlled stream of hot air to melt solder for component removal or reflow. It is useful for SMD repair and prototyping.",
    priority: 10,
  },

  {
    id: "components-heat-sink",
    category: "components",
    intent: "definition",
    question: "When do I need a heat sink?",
    variations: [
      "When do I need a heat sink",
      "Do I need a heatsink",
      "Why use a heat sink",
      "How to choose a heat sink",
      "Component getting hot without heatsink",
      "Heat sink selection",
    ],
    keywords: ["heat", "sink", "thermal", "cooling", "power"],
    answer:
      "A heat sink is needed when a component dissipates enough power that its temperature would exceed safe limits without additional cooling. Selection depends on power dissipation, thermal resistance, airflow and maximum allowed temperature.",
    priority: 10,
  },

  {
    id: "components-heatsink-selection",
    category: "components",
    intent: "procedure",
    question: "How do I choose a heat sink?",
    variations: [
      "How do I choose a heat sink",
      "Heatsink selection",
      "Thermal resistance heatsink",
      "How to size heatsink",
      "Calculate heatsink",
      "Heatsink selection guide",
    ],
    keywords: ["heatsink", "selection", "thermal", "resistance", "cooling"],
    answer:
      "Heat sink selection depends on power dissipation, maximum allowable temperature, ambient temperature, airflow and thermal resistance. Calculations help choose an adequate heat sink.",
    priority: 10,
  },

  {
    id: "components-fan",
    category: "components",
    intent: "procedure",
    question: "How do I choose a fan?",
    variations: [
      "How do I choose a fan",
      "Fan selection",
      "Cooling fan size",
      "How to pick a fan",
      "Fan airflow and noise",
      "Fan selection guide",
    ],
    keywords: ["fan", "selection", "cooling", "airflow", "noise"],
    answer:
      "Fan selection depends on required airflow, static pressure, noise, voltage, size and bearing type. The cooling requirement determines the needed airflow.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // PCB MATERIALS / FINISHES
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-pcb-material",
    category: "components",
    intent: "definition",
    question: "What materials are PCBs made from?",
    variations: [
      "What materials are PCBs made from",
      "What is FR4",
      "PCB material types",
      "What is a PCB made of",
      "PCB substrate materials",
      "PCB material definition",
    ],
    keywords: ["pcb", "fr4", "material", "substrate", "copper"],
    answer:
      "Common PCBs use an insulating substrate such as FR4 with copper layers for conduction. Other materials may be used for high-frequency, flexible or high-temperature applications. The choice affects electrical, mechanical and thermal performance.",
    priority: 10,
  },

  {
    id: "components-surface-finish",
    category: "components",
    intent: "comparison",
    question: "What PCB surface finishes are available?",
    variations: [
      "What PCB surface finishes are available",
      "PCB surface finish",
      "HASL vs ENIG",
      "PCB plating options",
      "Which PCB finish to use",
      "PCB surface finish options",
    ],
    keywords: ["surface", "finish", "pcb", "hasl", "enig"],
    answer:
      "Common finishes include HASL, lead-free HASL, ENIG, OSP, immersion silver and immersion tin. The choice affects solderability, shelf life, cost and appearance.",
    priority: 10,
  },

  {
    id: "components-metal-core",
    category: "components",
    intent: "definition",
    question: "What is a metal core PCB?",
    variations: [
      "What is a metal core PCB",
      "Metal core PCB",
      "Aluminum PCB",
      "MCPCB",
      "Thermal PCB",
      "Metal core PCB definition",
    ],
    keywords: ["metal", "core", "pcb", "aluminum", "thermal"],
    answer:
      "A metal core PCB uses a metal substrate, often aluminum, for better heat dissipation. It is used in LED and power applications.",
    priority: 10,
  },

  {
    id: "components-high-frequency-pcb",
    category: "components",
    intent: "definition",
    question: "What materials are used for high-frequency PCBs?",
    variations: [
      "What materials are used for high-frequency PCBs",
      "High frequency PCB material",
      "Rogers PCB",
      "RF PCB material",
      "Low loss PCB",
      "High-frequency PCB material",
    ],
    keywords: ["high", "frequency", "pcb", "rogers", "rf"],
    answer:
      "High-frequency PCBs use materials such as Rogers, PTFE or specialized laminates with low dielectric loss and stable properties. They are used for RF and microwave circuits.",
    priority: 10,
  },

  {
    id: "components-flex",
    category: "components",
    intent: "definition",
    question: "What is a flexible PCB?",
    variations: [
      "What is a flexible PCB",
      "Flex PCB",
      "Flexible circuit board",
      "Rigid flex PCB",
      "When to use flex PCB",
      "Flex PCB definition",
    ],
    keywords: ["flex", "pcb", "flexible", "rigid", "circuit"],
    answer:
      "A flexible PCB uses a flexible substrate allowing it to bend or fold. It is used in compact or moving applications. Rigid-flex combines rigid and flexible sections.",
    priority: 10,
  },

  {
    id: "components-rigid",
    category: "components",
    intent: "definition",
    question: "What is a rigid PCB?",
    variations: [
      "What is a rigid PCB",
      "Rigid PCB",
      "Standard PCB",
      "Rigid vs flex PCB",
      "Rigid board",
      "Rigid PCB definition",
    ],
    keywords: ["rigid", "pcb", "standard", "board", "flex"],
    answer:
      "A rigid PCB uses a stiff substrate such as FR4. It is the most common type and suitable for most applications.",
    priority: 9,
  },

  {
    id: "components-ip-rating",
    category: "components",
    intent: "requirements",
    question: "What IP rating do I need for my PCB?",
    variations: [
      "What IP rating do I need for my PCB",
      "IP rating PCB",
      "Waterproof PCB",
      "Dust proof board",
      "Environmental protection PCB",
      "PCB IP rating",
    ],
    keywords: ["ip", "rating", "pcb", "waterproof", "environment"],
    answer:
      "The required IP rating depends on the environment. Outdoor or wet applications need higher protection against dust and water. The enclosure, coating and sealing all contribute.",
    priority: 10,
  },

  {
    id: "components-ip-rating-explained",
    category: "components",
    intent: "definition",
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
    id: "components-enclosure",
    category: "components",
    intent: "procedure",
    question: "How do I choose an enclosure for my project?",
    variations: [
      "How do I choose an enclosure for my project",
      "What box should I use",
      "Enclosure selection",
      "How to house electronics",
      "IP rating enclosure",
      "Enclosure selection guide",
    ],
    keywords: ["enclosure", "box", "housing", "ip", "protection"],
    answer:
      "Enclosure selection depends on size, material, mounting, environmental protection, ventilation, cable entry, accessibility and appearance. For outdoor or industrial use, consider IP ratings and appropriate sealing or cooling.",
    priority: 13,
  },

  {
    id: "components-enclosure-cooling",
    category: "components",
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

  // ─────────────────────────────────────────────────────────────
  // ELECTROMECHANICAL / MISC
  // ─────────────────────────────────────────────────────────────
  {
    id: "components-ferrite",
    category: "components",
    intent: "definition",
    question: "What is a ferrite bead used for?",
    variations: [
      "What is a ferrite bead used for",
      "What does a ferrite bead do",
      "Why use ferrite on cables",
      "How to choose a ferrite bead",
      "Ferrite bead vs inductor",
      "Ferrite bead purpose",
    ],
    keywords: ["ferrite", "bead", "noise", "emi", "filter"],
    answer:
      "A ferrite bead suppresses high-frequency noise on a wire or trace. It is commonly used for EMI reduction and power or signal filtering, with selection based on frequency range, current rating and impedance.",
    priority: 9,
  },

  {
    id: "components-potentiometer",
    category: "components",
    intent: "definition",
    question: "What is a potentiometer used for?",
    variations: [
      "What is a potentiometer used for",
      "What does a pot do",
      "Why use a potentiometer",
      "How to read a potentiometer",
      "Potentiometer vs variable resistor",
      "Potentiometer purpose",
    ],
    keywords: ["potentiometer", "pot", "variable", "resistor", "adjust"],
    answer:
      "A potentiometer is an adjustable resistor with three terminals, commonly used as a voltage divider for user input or calibration. It can also be connected as a variable resistor depending on the application.",
    priority: 10,
  },

  {
    id: "components-crystal",
    category: "components",
    intent: "definition",
    question: "What is a crystal oscillator used for?",
    variations: [
      "What is a crystal oscillator used for",
      "What does a crystal do",
      "Why use an external crystal",
      "Crystal vs resonator",
      "How to choose a crystal",
      "Crystal oscillator purpose",
    ],
    keywords: ["crystal", "oscillator", "clock", "frequency", "resonator"],
    answer:
      "A crystal oscillator provides a stable frequency reference, commonly used for microcontroller clocks, communication and timing circuits. Selection depends on frequency, accuracy, load capacitance and application requirements.",
    priority: 13,
  },

  {
    id: "components-encoder",
    category: "components",
    intent: "definition",
    question: "What is a rotary encoder?",
    variations: [
      "What is a rotary encoder",
      "What does a rotary encoder do",
      "Encoder vs potentiometer",
      "How does a rotary encoder work",
      "How to use an encoder with Arduino",
      "Rotary encoder definition",
    ],
    keywords: ["encoder", "rotary", "position", "rotation", "pulse"],
    answer:
      "A rotary encoder converts rotational movement into electrical signals that indicate direction and amount of rotation. Incremental encoders output pulses, while absolute encoders provide position information. They are used for user interfaces, motor feedback and position sensing.",
    priority: 10,
  },

  {
    id: "components-buzzer",
    category: "components",
    intent: "definition",
    question: "What is a buzzer used for?",
    variations: [
      "What is a buzzer used for",
      "How to use a buzzer",
      "Active vs passive buzzer",
      "Why is my buzzer not working",
      "How to choose a buzzer",
      "Buzzer purpose",
    ],
    keywords: ["buzzer", "sound", "alarm", "active", "passive"],
    answer:
      "A buzzer produces sound for alarms, notifications or user feedback. Active buzzers contain their own oscillator and usually only need a DC signal, while passive buzzers require an AC drive signal such as PWM.",
    priority: 9,
  },

  {
    id: "components-speaker",
    category: "components",
    intent: "definition",
    question: "What is a speaker?",
    variations: [
      "What is a speaker",
      "What does speaker do",
      "How to drive speaker",
      "Speaker vs buzzer",
      "Speaker amplifier",
      "Speaker definition",
    ],
    keywords: ["speaker", "audio", "sound", "amplifier", "output"],
    answer:
      "A speaker converts electrical signals into sound. It usually requires an amplifier to drive it properly.",
    priority: 9,
  },

  {
    id: "components-microphone",
    category: "components",
    intent: "definition",
    question: "What is a microphone?",
    variations: [
      "What is a microphone",
      "What does microphone do",
      "Types of microphones",
      "How to use microphone",
      "Microphone amplifier",
      "Microphone definition",
    ],
    keywords: ["microphone", "audio", "sound", "input", "sensor"],
    answer:
      "A microphone converts sound into an electrical signal. Types include electret, MEMS and dynamic microphones. Amplification is often required.",
    priority: 9,
  },

  {
    id: "components-piezo",
    category: "components",
    intent: "definition",
    question: "What is a piezo element?",
    variations: [
      "What is a piezo element",
      "What does piezo do",
      "Piezo buzzer vs speaker",
      "How to use piezo",
      "Piezo sensor applications",
      "Piezo element definition",
    ],
    keywords: ["piezo", "buzzer", "speaker", "sensor", "vibration"],
    answer:
      "A piezo element converts electrical signals to mechanical motion or vice versa. It is used in buzzers, speakers, vibration sensors and energy harvesting.",
    priority: 9,
  },

  {
    id: "components-amplifier",
    category: "components",
    intent: "definition",
    question: "What is an amplifier?",
    variations: [
      "What is an amplifier",
      "What does amplifier do",
      "Types of amplifiers",
      "How to choose amplifier",
      "Audio amplifier IC",
      "Amplifier definition",
    ],
    keywords: ["amplifier", "signal", "gain", "audio", "opamp"],
    answer:
      "An amplifier increases the amplitude of a signal. Types include operational amplifiers, audio amplifiers and RF amplifiers, selected based on frequency, gain, power and noise requirements.",
    priority: 13,
  },

  {
    id: "components-current-sense",
    category: "components",
    intent: "procedure",
    question: "How can I measure current in a circuit?",
    variations: [
      "How can I measure current in a circuit",
      "How to measure current",
      "Current sensing methods",
      "Shunt resistor current measurement",
      "Hall effect current sensor",
      "Current sensing methods",
    ],
    keywords: ["current", "measure", "shunt", "hall", "sensor"],
    answer:
      "Current can be measured using a shunt resistor and amplifier, a Hall-effect sensor, a current transformer or an integrated current-sense IC. The correct method depends on voltage range, isolation, accuracy, bandwidth and whether high-side or low-side sensing is needed.",
    priority: 10,
  },

  {
    id: "components-load-switch",
    category: "components",
    intent: "definition",
    question: "What is a load switch?",
    variations: [
      "What is a load switch",
      "Load switch IC",
      "High side switch",
      "Power switch IC",
      "Controlled power",
      "Load switch definition",
    ],
    keywords: ["load", "switch", "ic", "power", "control"],
    answer:
      "A load switch controls power to a subsystem or load. It may include protection, soft-start and enable control.",
    priority: 10,
  },

  {
    id: "components-ideal-diode",
    category: "components",
    intent: "definition",
    question: "What is an ideal diode?",
    variations: [
      "What is an ideal diode",
      "Ideal diode IC",
      "Ideal diode vs Schottky",
      "Power ORing",
      "Reverse polarity protection IC",
      "Ideal diode definition",
    ],
    keywords: ["ideal", "diode", "ic", "power", "protection"],
    answer:
      "An ideal diode uses a MOSFET and control circuit to emulate a diode with very low forward voltage drop. It is used for reverse polarity protection, power ORing and efficiency improvements.",
    priority: 10,
  },

  {
    id: "components-efuse-protection",
    category: "components",
    intent: "definition",
    question: "What is an eFuse?",
    variations: [
      "What is an eFuse",
      "eFuse IC",
      "Electronic fuse",
      "Programmable fuse",
      "Overcurrent protection IC",
      "eFuse protection definition",
    ],
    keywords: ["efuse", "fuse", "protection", "current", "ic"],
    answer:
      "An eFuse is an electronic fuse that protects against overcurrent, overvoltage and reverse polarity. It can be reset and may include monitoring features.",
    priority: 10,
  },

  {
    id: "components-hot-swap",
    category: "components",
    intent: "definition",
    question: "What is a hot swap controller?",
    variations: [
      "What is a hot swap controller",
      "Hot swap IC",
      "Hot plug protection",
      "Inrush limiting",
      "Hot swap controller",
      "Hot swap definition",
    ],
    keywords: ["hot", "swap", "controller", "protection", "power"],
    answer:
      "A hot swap controller manages power-up for boards or modules inserted into a live system, limiting inrush current and protecting against faults.",
    priority: 9,
  },

  {
    id: "components-oring",
    category: "components",
    intent: "definition",
    question: "What is power ORing?",
    variations: [
      "What is power ORing",
      "Power ORing IC",
      "Redundant power",
      "Ideal diode ORing",
      "Power path ORing",
      "Power ORing definition",
    ],
    keywords: ["power", "oring", "redundant", "diode", "supply"],
    answer:
      "Power ORing combines multiple power sources so the system draws from the best or highest available source. It is used for redundancy and backup supplies.",
    priority: 10,
  },

  {
    id: "components-io-expander-adv",
    category: "components",
    intent: "procedure",
    question: "How do I add more IO pins?",
    variations: [
      "How do I add more IO pins",
      "I/O expander usage",
      "How to expand GPIO",
      "Add more pins microcontroller",
      "IO expander vs shift register",
      "Adding IO pins",
    ],
    keywords: ["io", "expand", "pins", "expander", "gpio"],
    answer:
      "More I/O can be added with shift registers, I/O expanders over I2C or SPI, multiplexers or secondary controllers. The best option depends on required speed, pin count and interface.",
    priority: 10,
  },

  {
    id: "components-best-practices",
    category: "components",
    intent: "procedure",
    question: "What are best practices for using components?",
    variations: [
      "What are best practices for using components",
      "Component best practices",
      "Good component design",
      "How to use components properly",
      "Component reliability tips",
      "Component best practices",
    ],
    keywords: ["best", "practices", "components", "design", "reliability"],
    answer:
      "Select components within their ratings, derate where appropriate, use quality parts, verify pinouts and packages, protect against ESD, and test under realistic conditions. Document choices and substitute only with equivalent parts.",
    priority: 10,
  },
];
