import type { HelpEntry } from "./types";

export const PCB_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // FOUNDATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-definition",
    category: "pcb",
    intent: "definition",
    question: "What is a PCB?",
    variations: [
      "What is a PCB",
      "What does PCB mean",
      "What is a printed circuit board",
      "Explain PCB",
      "PCB definition",
      "PCB meaning",
    ],
    keywords: ["PCB", "printed circuit board", "board", "circuit"],
    answer:
      "PCB stands for Printed Circuit Board. It mechanically supports electronic components and electrically connects them through conductive copper traces, pads, vias, and other board features.",
    priority: 14,
  },

  {
    id: "pcb-purpose",
    category: "pcb",
    intent: "purpose",
    question: "What is PCB design used for?",
    variations: [
      "What is PCB design used for",
      "What is a PCB used for",
      "What can PCB do",
      "What is it used for",
      "Why use PCB design",
      "What is the purpose of a PCB",
    ],
    keywords: ["pcb", "used", "purpose", "application", "board"],
    answer:
      "PCB design is used to turn a circuit into a permanent, reliable board with proper copper routing, component footprints and mechanical support. It is used for production, compact builds, better electrical performance and repeatability compared to breadboards or hand-wired prototypes.",
    priority: 14,
  },

  {
    id: "pcb-schematic-vs-pcb",
    category: "pcb",
    intent: "comparison",
    question: "What is the difference between a schematic and a PCB?",
    variations: [
      "What is the difference between a schematic and a PCB",
      "Schematic vs PCB",
      "Is a schematic the same as a PCB",
      "Schematic and PCB difference",
      "PCB layout vs schematic",
      "Schematic vs layout",
    ],
    keywords: ["schematic", "PCB", "diagram", "layout", "difference"],
    answer:
      "A schematic describes the logical electrical connections between components. A PCB layout turns those connections into physical component footprints, copper traces, vias, and board geometry.",
    priority: 14,
  },

  {
    id: "pcb-trace",
    category: "pcb",
    intent: "definition",
    question: "What are PCB traces?",
    variations: [
      "What are PCB traces",
      "What is a copper trace",
      "What do PCB tracks do",
      "PCB trace meaning",
      "Trace definition PCB",
      "Copper traces on PCB",
    ],
    keywords: ["PCB traces", "tracks", "copper", "routing", "connection"],
    answer:
      "PCB traces are conductive copper paths used to electrically connect components and other points on a circuit board. Their width, spacing, and geometry should be appropriate for the current, voltage, signal type, and manufacturing requirements.",
    priority: 13,
  },

  {
    id: "pcb-via",
    category: "pcb",
    intent: "definition",
    question: "What are vias in a PCB?",
    variations: [
      "What are vias in a PCB",
      "Why are vias used",
      "What is a PCB via",
      "Via in PCB",
      "Via meaning PCB",
      "Through hole via",
    ],
    keywords: ["via", "vias", "PCB", "layers", "connection"],
    answer:
      "A via is a plated hole that electrically connects conductive layers of a PCB. Vias are commonly used when routing signals or power between different board layers.",
    priority: 13,
  },

  {
    id: "pcb-via-types",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-footprint",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-schematic-symbol",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-design",
    category: "pcb",
    intent: "capability",
    question: "Can ProjexiaHub design PCBs?",
    variations: [
      "Can ProjexiaHub design PCBs",
      "Can you make a PCB",
      "Do you design circuit boards",
      "Can ProjexiaHub convert my circuit into a PCB",
      "PCB design service",
      "PCB design capability",
    ],
    keywords: ["PCB design", "PCB", "circuit board", "layout"],
    answer:
      "PCB design can be part of a project when a permanent or compact circuit is required. The process normally starts with a verified schematic and continues with component placement, routing, design-rule checks, and manufacturing files.",
    priority: 13,
  },

  {
    id: "pcb-breadboard",
    category: "pcb",
    intent: "procedure",
    question: "Should I test a circuit on a breadboard before making a PCB?",
    variations: [
      "Should I test a circuit on a breadboard before making a PCB",
      "Do I need a breadboard first",
      "Should I prototype before PCB",
      "Breadboard vs PCB",
      "Prototype testing before manufacturing",
      "Breadboard before PCB",
    ],
    keywords: ["breadboard", "prototype", "PCB", "testing", "circuit"],
    answer:
      "For many projects, breadboard or modular prototyping is useful before committing to a PCB. It allows the basic circuit and firmware behavior to be tested and corrected before finalizing the board design.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DESIGN WORKFLOW
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-design-workflow",
    category: "pcb",
    intent: "procedure",
    question: "What is the PCB design workflow?",
    variations: [
      "What is the PCB design workflow",
      "PCB design process",
      "How to design a PCB",
      "PCB design steps",
      "PCB design workflow",
      "Steps for PCB design",
    ],
    keywords: ["pcb", "design", "process", "workflow", "steps"],
    answer:
      "A typical workflow is schematic capture, netlist generation, component placement, routing, design rule checks, review, and finally export of manufacturing files such as Gerbers and drill files.",
    priority: 15,
  },

  {
    id: "pcb-schematic-capture",
    category: "pcb",
    intent: "procedure",
    question: "What is schematic capture?",
    variations: [
      "What is schematic capture",
      "Schematic capture",
      "Draw schematic",
      "Schematic entry",
      "PCB schematic design",
      "Schematic capture meaning",
    ],
    keywords: ["schematic", "capture", "design", "pcb", "entry"],
    answer:
      "Schematic capture is the process of drawing the circuit diagram in a design tool. It defines components and connections for the PCB layout.",
    priority: 13,
  },

  {
    id: "pcb-netlist",
    category: "pcb",
    intent: "definition",
    question: "What is a netlist?",
    variations: [
      "What is a netlist",
      "Netlist PCB",
      "What does netlist do",
      "Netlist vs schematic",
      "Import netlist",
      "Netlist definition",
    ],
    keywords: ["netlist", "pcb", "schematic", "connections", "layout"],
    answer:
      "A netlist describes the electrical connections between components. It is generated from the schematic and used by the PCB layout tool.",
    priority: 13,
  },

  {
    id: "pcb-annotation",
    category: "pcb",
    intent: "procedure",
    question: "What is annotation in PCB design?",
    variations: [
      "What is annotation in PCB design",
      "Annotation PCB",
      "Reference designators",
      "Annotate schematic",
      "Component numbering",
      "Annotation definition",
    ],
    keywords: ["annotation", "pcb", "reference", "designator", "schematic"],
    answer:
      "Annotation assigns unique reference designators to components in the schematic. Consistent annotation is important for BOM and assembly.",
    priority: 10,
  },

  {
    id: "pcb-layout",
    category: "pcb",
    intent: "definition",
    question: "What is PCB layout?",
    variations: [
      "What is PCB layout",
      "PCB layout",
      "Board layout",
      "PCB routing",
      "How to layout PCB",
      "PCB layout definition",
    ],
    keywords: ["layout", "pcb", "routing", "placement", "design"],
    answer:
      "PCB layout is the process of placing components and routing traces on the board based on the schematic and design rules.",
    priority: 14,
  },

  {
    id: "pcb-placement",
    category: "pcb",
    intent: "procedure",
    question: "How should I place components on a PCB?",
    variations: [
      "How should I place components on a PCB",
      "Component placement PCB",
      "How to place components",
      "Placement guidelines",
      "PCB layout placement",
      "Component placement",
    ],
    keywords: ["placement", "pcb", "components", "layout", "guidelines"],
    answer:
      "Place components to minimize trace length, keep sensitive circuits away from noisy ones, allow thermal management and support assembly. Connectors and mounting holes should be positioned first.",
    priority: 15,
  },

  {
    id: "pcb-routing",
    category: "pcb",
    intent: "procedure",
    question: "How should I route traces on a PCB?",
    variations: [
      "How should I route traces on a PCB",
      "PCB routing guidelines",
      "How to route PCB",
      "Trace routing rules",
      "Routing best practices",
      "PCB routing",
    ],
    keywords: ["routing", "pcb", "traces", "guidelines", "layout"],
    answer:
      "Route power and ground first, keep high-speed signals short, avoid sharp angles, maintain spacing and consider return paths. Follow design rules for width and clearance.",
    priority: 15,
  },

  {
    id: "pcb-design-rules",
    category: "pcb",
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
    priority: 14,
  },

  {
    id: "pcb-drc",
    category: "pcb",
    intent: "procedure",
    question: "What is DRC?",
    variations: [
      "What is DRC",
      "Design rule check",
      "PCB DRC",
      "What does DRC do",
      "DRC errors PCB",
      "DRC definition",
    ],
    keywords: ["drc", "design", "rule", "check", "pcb"],
    answer:
      "DRC, or Design Rule Check, automatically verifies that the layout meets defined constraints such as minimum width, spacing and via size. It catches errors before manufacturing.",
    priority: 13,
  },

  {
    id: "pcb-erc",
    category: "pcb",
    intent: "procedure",
    question: "What is ERC?",
    variations: [
      "What is ERC",
      "Electrical rule check",
      "ERC PCB",
      "What does ERC do",
      "ERC errors schematic",
      "ERC definition",
    ],
    keywords: ["erc", "electrical", "rule", "check", "schematic"],
    answer:
      "ERC, or Electrical Rule Check, verifies the schematic for electrical issues such as unconnected pins, conflicting outputs and missing power connections.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // LAYERS / STACKUP
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-layers",
    category: "pcb",
    intent: "requirements",
    question: "How many layers should a PCB have?",
    variations: [
      "How many layers should a PCB have",
      "Single layer vs double layer PCB",
      "When to use 4 layer PCB",
      "PCB layer stackup",
      "How to choose PCB layers",
      "PCB layer count",
    ],
    keywords: ["pcb", "layers", "single", "double", "four", "stackup"],
    answer:
      "The number of layers depends on routing complexity, signal integrity, power distribution, EMI requirements, cost and manufacturing constraints. Simple projects may use one or two layers, while high-speed or dense designs often benefit from four or more layers.",
    priority: 14,
  },

  {
    id: "pcb-stackup",
    category: "pcb",
    intent: "procedure",
    question: "What is a PCB stackup?",
    variations: [
      "What is a PCB stackup",
      "PCB stackup",
      "Layer stackup PCB",
      "Stackup design",
      "How to design stackup",
      "PCB stackup definition",
    ],
    keywords: ["stackup", "pcb", "layers", "design", "copper"],
    answer:
      "A stackup defines the order and thickness of copper, dielectric and other layers in a PCB. It affects impedance, signal integrity, mechanical properties and manufacturing cost.",
    priority: 13,
  },

  {
    id: "pcb-ground-plane",
    category: "pcb",
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
    id: "pcb-power-plane",
    category: "pcb",
    intent: "definition",
    question: "What is a power plane?",
    variations: [
      "What is a power plane",
      "Power plane PCB",
      "Why use power plane",
      "Power vs ground plane",
      "PCB power distribution",
      "Power plane definition",
    ],
    keywords: ["power", "plane", "pcb", "distribution", "ground"],
    answer:
      "A power plane is a dedicated layer or copper area that distributes a supply voltage. It reduces impedance and improves noise performance compared to thin traces.",
    priority: 13,
  },

  {
    id: "pcb-copper-pour",
    category: "pcb",
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
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // TRACES / VIAS / RULES
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-trace-width",
    category: "pcb",
    intent: "requirements",
    question: "How wide should a PCB trace be?",
    variations: [
      "How wide should a PCB trace be",
      "PCB trace width calculation",
      "How to size traces for current",
      "Why do traces need width",
      "Trace width vs current",
      "PCB trace width",
    ],
    keywords: ["pcb", "trace", "width", "current", "temperature"],
    answer:
      "Trace width depends on current, allowable temperature rise, copper thickness and environment. Wider traces have lower resistance and can carry more current. Online calculators and IPC guidelines can help estimate suitable widths.",
    priority: 15,
  },

  {
    id: "pcb-trace-current",
    category: "pcb",
    intent: "requirements",
    question: "How much current can a PCB trace carry?",
    variations: [
      "How much current can a PCB trace carry",
      "PCB trace current capacity",
      "How to calculate trace current",
      "Why do traces heat up",
      "Trace width for amps",
      "PCB trace current capacity",
    ],
    keywords: ["pcb", "trace", "current", "capacity", "width", "temperature"],
    answer:
      "Trace current capacity depends on width, copper thickness, allowable temperature rise and environment. IPC guidelines or calculators can estimate suitable values. External traces generally carry more current than internal traces for the same width.",
    priority: 14,
  },

  {
    id: "pcb-differential-pair",
    category: "pcb",
    intent: "procedure",
    question: "How do I route differential pairs on a PCB?",
    variations: [
      "How do I route differential pairs on a PCB",
      "Differential pair routing",
      "PCB differential pair rules",
      "Length matching differential",
      "Differential pair design",
      "Differential pair routing",
    ],
    keywords: ["differential", "pair", "pcb", "routing", "length"],
    answer:
      "Differential pairs should be routed together with consistent spacing and length matching. Avoid vias where possible and maintain a continuous reference plane.",
    priority: 13,
  },

  {
    id: "pcb-length-matching",
    category: "pcb",
    intent: "procedure",
    question: "Why is length matching important?",
    variations: [
      "Why is length matching important",
      "PCB length matching",
      "Why match trace lengths",
      "Length tuning PCB",
      "Signal skew PCB",
      "Length matching",
    ],
    keywords: ["length", "matching", "pcb", "skew", "timing"],
    answer:
      "Length matching ensures signals arrive at the same time, important for high-speed parallel buses and differential pairs. Mismatched lengths cause skew and timing errors.",
    priority: 13,
  },

  {
    id: "pcb-controlled-impedance",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-crosstalk",
    category: "pcb",
    intent: "troubleshooting",
    question: "How do I reduce crosstalk on a PCB?",
    variations: [
      "How do I reduce crosstalk on a PCB",
      "Crosstalk PCB",
      "Reduce crosstalk",
      "Why do traces interfere",
      "PCB crosstalk prevention",
      "Reducing crosstalk",
    ],
    keywords: ["crosstalk", "pcb", "signal", "interference", "traces"],
    answer:
      "Crosstalk can be reduced by increasing spacing, minimizing parallel runs, using ground planes, controlling impedance and separating sensitive signals from noisy ones.",
    priority: 13,
  },

  {
    id: "pcb-return-path",
    category: "pcb",
    intent: "definition",
    question: "Why is the return path important in PCB design?",
    variations: [
      "Why is the return path important in PCB design",
      "Signal return path",
      "Ground return current",
      "Why does return path matter in PCB",
      "Current return path",
      "Return path in PCB",
    ],
    keywords: ["return", "path", "ground", "current", "signal"],
    answer:
      "Every signal current must return to its source. The return path should be direct and low-impedance, especially for high-speed signals. Poor return paths cause noise, EMI and signal integrity problems. Ground planes help provide a controlled return path.",
    priority: 14,
  },

  {
    id: "pcb-high-speed",
    category: "pcb",
    intent: "definition",
    question: "What is considered high-speed in PCB design?",
    variations: [
      "What is considered high-speed in PCB design",
      "High speed PCB design rules",
      "When does signal integrity matter",
      "What is a transmission line",
      "High speed vs low speed signals",
      "High-speed PCB",
    ],
    keywords: ["high", "speed", "pcb", "signal", "integrity", "transmission"],
    answer:
      "A signal becomes high-speed when its rise time is short relative to the trace length, causing transmission line effects such as reflections, crosstalk and EMI. Controlled impedance, proper return paths and length matching may be required.",
    priority: 13,
  },

  {
    id: "pcb-emc",
    category: "pcb",
    intent: "procedure",
    question: "How do I design a PCB for EMC?",
    variations: [
      "How do I design a PCB for EMC",
      "EMC PCB design",
      "PCB EMC guidelines",
      "Reduce EMI on PCB",
      "EMC compliant board",
      "EMC PCB design",
    ],
    keywords: ["emc", "pcb", "design", "emi", "compliance"],
    answer:
      "EMC design includes proper grounding, controlled return paths, filtering, shielding, minimizing loop areas and separating noisy and sensitive circuits. Following EMC guidelines early prevents problems later.",
    priority: 14,
  },

  // ─────────────────────────────────────────────────────────────
  // MECHANICAL / MANUFACTURING-ORIENTED DESIGN
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-board-outline",
    category: "pcb",
    intent: "procedure",
    question: "What is a board outline?",
    variations: [
      "What is a board outline",
      "PCB board outline",
      "Board edge",
      "How to define board shape",
      "Edge cuts PCB",
      "Board outline definition",
    ],
    keywords: ["outline", "pcb", "board", "edge", "shape"],
    answer:
      "The board outline defines the physical shape of the PCB. It is used by the manufacturer to cut the board and should include mounting holes and cutouts.",
    priority: 13,
  },

  {
    id: "pcb-mounting-hole",
    category: "pcb",
    intent: "procedure",
    question: "How do I add mounting holes to a PCB?",
    variations: [
      "How do I add mounting holes to a PCB",
      "PCB mounting holes",
      "How to add mounting holes",
      "Mounting hole size",
      "Board mounting",
      "PCB mounting holes",
    ],
    keywords: ["mounting", "hole", "pcb", "board", "mechanical"],
    answer:
      "Mounting holes are drilled holes for screws or standoffs. They should be sized for the hardware and positioned to avoid traces and components.",
    priority: 13,
  },

  {
    id: "pcb-keepout",
    category: "pcb",
    intent: "definition",
    question: "What is a keepout area?",
    variations: [
      "What is a keepout area",
      "Keepout PCB",
      "Keepout zone",
      "Why use keepout",
      "PCB keepout area",
      "Keepout definition",
    ],
    keywords: ["keepout", "pcb", "area", "layout", "restriction"],
    answer:
      "A keepout area is a region where certain objects (traces, vias, components) are not allowed. It is used for mechanical constraints, isolation or antennas.",
    priority: 13,
  },

  {
    id: "pcb-fiducials",
    category: "pcb",
    intent: "definition",
    question: "What are fiducials on a PCB?",
    variations: [
      "What are fiducials on a PCB",
      "Fiducial marks PCB",
      "Why use fiducials",
      "PCB alignment marks",
      "Fiducials for assembly",
      "Fiducial definition",
    ],
    keywords: ["fiducial", "pcb", "alignment", "assembly", "marks"],
    answer:
      "Fiducials are reference marks used by pick-and-place machines to align the PCB during assembly. They improve placement accuracy.",
    priority: 13,
  },

  {
    id: "pcb-test-points",
    category: "pcb",
    intent: "procedure",
    question: "Why add test points to a PCB?",
    variations: [
      "Why add test points to a PCB",
      "Test points PCB",
      "Why use test points",
      "How to add test points",
      "Debugging test points",
      "PCB test points",
    ],
    keywords: ["test", "point", "pcb", "debug", "measurement"],
    answer:
      "Test points provide designated locations for measuring signals or voltages during testing and debugging. They simplify troubleshooting and verification.",
    priority: 13,
  },

  {
    id: "pcb-thermal-relief",
    category: "pcb",
    intent: "definition",
    question: "What is thermal relief?",
    variations: [
      "What is thermal relief",
      "Thermal relief PCB",
      "Why use thermal relief",
      "Thermal relief vs solid",
      "Soldering thermal relief",
      "Thermal relief definition",
    ],
    keywords: ["thermal", "relief", "pcb", "soldering", "copper"],
    answer:
      "A thermal relief connects a pad to a copper plane with narrow spokes, reducing heat loss during soldering. It balances thermal and electrical performance.",
    priority: 13,
  },

  {
    id: "pcb-thermal-via",
    category: "pcb",
    intent: "definition",
    question: "What are thermal vias?",
    variations: [
      "What are thermal vias",
      "Thermal via purpose",
      "How to use thermal vias",
      "PCB heat dissipation",
      "Thermal relief vs thermal via",
      "Thermal vias definition",
    ],
    keywords: ["thermal", "via", "pcb", "heat", "dissipation"],
    answer:
      "Thermal vias conduct heat from a component or copper area to other layers or a heatsink. They are commonly used under power components and in thermal pads to improve heat dissipation.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // FILES / OUTPUT
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-gerber",
    category: "pcb",
    intent: "definition",
    question: "What are Gerber files?",
    variations: [
      "What are Gerber files",
      "Gerber files explained",
      "What is a Gerber",
      "PCB manufacturing files",
      "Gerber vs drill file",
      "Gerber definition",
    ],
    keywords: ["gerber", "files", "pcb", "manufacturing", "drill"],
    answer:
      "Gerber files describe the copper, solder mask, silkscreen and other layers of a PCB for manufacturing. A drill file (Excellon) defines hole positions. Together they are used by the PCB fabricator.",
    priority: 14,
  },

  {
    id: "pcb-drill-file",
    category: "pcb",
    intent: "definition",
    question: "What is a drill file?",
    variations: [
      "What is a drill file",
      "Excellon drill file",
      "PCB drill file purpose",
      "Drill file vs Gerber",
      "Hole data PCB",
      "Drill file definition",
    ],
    keywords: ["drill", "file", "pcb", "excellon", "holes"],
    answer:
      "A drill file defines the positions, sizes and plating of holes in a PCB. It is usually in Excellon format and is provided alongside Gerber files for fabrication.",
    priority: 13,
  },

  {
    id: "pcb-bom",
    category: "pcb",
    intent: "definition",
    question: "What is a BOM for PCB assembly?",
    variations: [
      "What is a BOM for PCB assembly",
      "BOM PCB",
      "Bill of materials assembly",
      "BOM vs schematic",
      "How to make BOM",
      "BOM definition PCB",
    ],
    keywords: ["bom", "pcb", "assembly", "materials", "components"],
    answer:
      "A BOM, or Bill of Materials, lists all components required for assembly, including reference designators, values, packages and quantities. It is essential for procurement and assembly.",
    priority: 14,
  },

  {
    id: "pcb-pick-place",
    category: "pcb",
    intent: "definition",
    question: "What is a pick-and-place file?",
    variations: [
      "What is a pick-and-place file",
      "Pick and place file",
      "PnP file PCB",
      "Assembly position file",
      "Centroid file",
      "Pick-and-place definition",
    ],
    keywords: ["pick", "place", "pcb", "assembly", "position"],
    answer:
      "A pick-and-place file lists component positions, rotations and reference designators for automated assembly. It is used by the assembly machine to place components.",
    priority: 13,
  },

  {
    id: "pcb-stencil",
    category: "pcb",
    intent: "definition",
    question: "What is a solder stencil?",
    variations: [
      "What is a solder stencil",
      "Solder paste stencil",
      "Stencil PCB",
      "Why use stencil",
      "SMT stencil",
      "Solder stencil definition",
    ],
    keywords: ["stencil", "solder", "paste", "pcb", "smt"],
    answer:
      "A solder stencil is a thin sheet with cutouts for solder paste application. It is used in SMT assembly to deposit paste accurately on pads.",
    priority: 13,
  },

  {
    id: "pcb-3d-view",
    category: "pcb",
    intent: "procedure",
    question: "Can I see a 3D view of my PCB?",
    variations: [
      "Can I see a 3D view of my PCB",
      "3D PCB view",
      "PCB 3D preview",
      "3D model board",
      "Visualize PCB",
      "PCB 3D view",
    ],
    keywords: ["3d", "pcb", "view", "model", "preview"],
    answer:
      "Most modern PCB design tools provide a 3D view showing component placement and board geometry. It helps verify fit and appearance before manufacturing.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SOLDERING / ASSEMBLY
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-reflow",
    category: "pcb",
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
    id: "pcb-wave",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-hand-solder",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-hot-air",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-assembly",
    category: "pcb",
    intent: "definition",
    question: "What is PCB assembly?",
    variations: [
      "What is PCB assembly",
      "PCB assembly process",
      "SMT vs through hole assembly",
      "How are components placed on PCB",
      "PCBA meaning",
      "PCB assembly definition",
    ],
    keywords: ["assembly", "pcb", "smt", "through", "solder"],
    answer:
      "PCB assembly involves placing and soldering components onto the board. Methods include hand soldering, through-hole assembly, surface-mount technology and reflow soldering. The appropriate method depends on the components, volume and reliability requirements.",
    priority: 14,
  },

  {
    id: "pcb-assembly-service",
    category: "pcb",
    intent: "procedure",
    question: "Should I use a PCB assembly service?",
    variations: [
      "Should I use a PCB assembly service",
      "PCBA service",
      "Should I assemble myself",
      "Turnkey PCB assembly",
      "Assembly service vs hand soldering",
      "PCB assembly service",
    ],
    keywords: ["assembly", "service", "pcb", "pcba", "turnkey"],
    answer:
      "Assembly services are useful for SMD boards, high component counts or volume production. Hand assembly is feasible for simple through-hole or prototype boards.",
    priority: 13,
  },

  {
    id: "pcb-solder-paste",
    category: "pcb",
    intent: "definition",
    question: "What is solder paste?",
    variations: [
      "What is solder paste",
      "Solder paste PCB",
      "How to use solder paste",
      "Solder paste vs wire",
      "SMT solder paste",
      "Solder paste definition",
    ],
    keywords: ["solder", "paste", "pcb", "smt", "reflow"],
    answer:
      "Solder paste is a mixture of solder powder and flux used in SMT assembly. It is applied with a stencil and melted during reflow.",
    priority: 13,
  },

  {
    id: "pcb-flux",
    category: "pcb",
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
    priority: 10,
  },

  {
    id: "pcb-cleaning",
    category: "pcb",
    intent: "procedure",
    question: "Do I need to clean my PCB after soldering?",
    variations: [
      "Do I need to clean my PCB after soldering",
      "PCB cleaning",
      "Clean flux residue",
      "How to clean PCB",
      "No clean vs cleaning",
      "PCB cleaning",
    ],
    keywords: ["cleaning", "pcb", "flux", "residue", "solder"],
    answer:
      "Cleaning depends on the flux type and application. No-clean fluxes may not require cleaning, but residue can be removed with appropriate solvents for reliability or appearance.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MATERIALS / FINISHES
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-material",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-surface-finish",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-solder-mask",
    category: "pcb",
    intent: "definition",
    question: "What is solder mask?",
    variations: [
      "What is solder mask",
      "Solder mask purpose",
      "Why is PCB green",
      "Solder mask colors",
      "Solder resist",
      "Solder mask definition",
    ],
    keywords: ["solder", "mask", "pcb", "protection", "color"],
    answer:
      "Solder mask is a protective layer that covers the PCB except where components are soldered. It prevents solder bridges, protects copper from oxidation and is available in various colors.",
    priority: 13,
  },

  {
    id: "pcb-silkscreen",
    category: "pcb",
    intent: "definition",
    question: "What is silkscreen on a PCB?",
    variations: [
      "What is silkscreen on a PCB",
      "Silkscreen purpose",
      "PCB silkscreen layer",
      "What does silkscreen show",
      "Legend on PCB",
      "Silkscreen definition",
    ],
    keywords: ["silkscreen", "pcb", "legend", "text", "marking"],
    answer:
      "Silkscreen is the printed layer that shows component references, outlines and other markings on the PCB. It helps with assembly, inspection and troubleshooting.",
    priority: 13,
  },

  {
    id: "pcb-flex",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-rigid",
    category: "pcb",
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
    priority: 10,
  },

  {
    id: "pcb-metal-core",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-high-frequency",
    category: "pcb",
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
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // MANUFACTURING / FABRICATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-fab",
    category: "pcb",
    intent: "definition",
    question: "What is PCB fabrication?",
    variations: [
      "What is PCB fabrication",
      "PCB fabrication process",
      "How are PCBs made",
      "PCB manufacturing steps",
      "PCB fab vs assembly",
      "PCB fabrication definition",
    ],
    keywords: ["fabrication", "pcb", "manufacturing", "process", "fab"],
    answer:
      "PCB fabrication is the process of manufacturing the bare board from design files. It includes copper etching, drilling, plating, solder mask and silkscreen. Assembly is a separate step where components are soldered.",
    priority: 14,
  },

  {
    id: "pcb-panelization",
    category: "pcb",
    intent: "procedure",
    question: "What is PCB panelization?",
    variations: [
      "What is PCB panelization",
      "PCB panelization",
      "Why panelize PCBs",
      "Panel vs single PCB",
      "PCB array",
      "Panelization definition",
    ],
    keywords: ["panelization", "pcb", "panel", "assembly", "production"],
    answer:
      "Panelization arranges multiple copies of a PCB into a single panel for manufacturing and assembly. It improves efficiency and reduces cost per board.",
    priority: 13,
  },

  {
    id: "pcb-v-score",
    category: "pcb",
    intent: "definition",
    question: "What is V-scoring?",
    variations: [
      "What is V-scoring",
      "V score PCB",
      "V cut panel",
      "PCB depanelization",
      "Scoring vs routing",
      "V-scoring definition",
    ],
    keywords: ["vscore", "v", "score", "pcb", "depanel"],
    answer:
      "V-scoring cuts a V-shaped groove along the edges of boards in a panel. The boards can be snapped apart after assembly. It is simple but less suitable for complex shapes.",
    priority: 10,
  },

  {
    id: "pcb-tab-routing",
    category: "pcb",
    intent: "definition",
    question: "What is tab routing?",
    variations: [
      "What is tab routing",
      "Tab routing PCB",
      "Breakaway tabs",
      "PCB depanel tabs",
      "Routing vs V score",
      "Tab routing definition",
    ],
    keywords: ["tab", "routing", "pcb", "depanel", "breakaway"],
    answer:
      "Tab routing connects boards in a panel with small tabs that are cut or broken after assembly. It allows irregular shapes and reduces stress on components.",
    priority: 10,
  },

  {
    id: "pcb-cost",
    category: "pcb",
    intent: "procedure",
    question: "What affects PCB cost?",
    variations: [
      "What affects PCB cost",
      "PCB cost factors",
      "Why are PCBs expensive",
      "How to reduce PCB cost",
      "PCB pricing",
      "PCB cost factors",
    ],
    keywords: ["cost", "pcb", "price", "factors", "reduce"],
    answer:
      "PCB cost depends on size, layer count, material, finish, hole count, tolerances, quantity and lead time. Reducing complexity and increasing quantity lowers per-board cost.",
    priority: 14,
  },

  {
    id: "pcb-manufacturer",
    category: "pcb",
    intent: "procedure",
    question: "How do I choose a PCB manufacturer?",
    variations: [
      "How do I choose a PCB manufacturer",
      "PCB manufacturer selection",
      "Best PCB fab",
      "How to pick a PCB supplier",
      "PCB vendor",
      "PCB manufacturer selection",
    ],
    keywords: ["manufacturer", "pcb", "supplier", "choose", "vendor"],
    answer:
      "Consider capabilities, quality, price, lead time, communication and reviews. For advanced boards, ensure the manufacturer supports the required layer count, materials and tolerances.",
    priority: 14,
  },

  {
    id: "pcb-standards",
    category: "pcb",
    intent: "definition",
    question: "What standards apply to PCB design?",
    variations: [
      "What standards apply to PCB design",
      "PCB standards",
      "IPC standards PCB",
      "Compliance PCB",
      "PCB design standards",
      "PCB standards definition",
    ],
    keywords: ["standards", "pcb", "ipc", "compliance", "design"],
    answer:
      "Common standards include IPC-2221 (design), IPC-7351 (footprints), IPC-A-610 (assembly) and IPC-6012 (qualification). Other standards may apply for specific industries.",
    priority: 13,
  },

  {
    id: "pcb-class",
    category: "pcb",
    intent: "definition",
    question: "What are PCB classes?",
    variations: [
      "What are PCB classes",
      "IPC class 1 2 3",
      "PCB class meaning",
      "Class 2 vs class 3 PCB",
      "PCB class differences",
      "PCB classes definition",
    ],
    keywords: ["class", "pcb", "ipc", "quality", "level"],
    answer:
      "IPC classes define PCB quality levels: Class 1 for general electronics, Class 2 for dedicated service, and Class 3 for high-reliability applications. Higher classes have stricter acceptance criteria.",
    priority: 13,
  },

  {
    id: "pcb-turnaround",
    category: "pcb",
    intent: "procedure",
    question: "What PCB turnaround options are available?",
    variations: [
      "What PCB turnaround options are available",
      "PCB lead time",
      "Fast PCB prototyping",
      "Standard vs expedited PCB",
      "PCB delivery time",
      "PCB turnaround",
    ],
    keywords: ["turnaround", "pcb", "lead", "time", "expedited"],
    answer:
      "PCB fabricators offer standard and expedited options. Faster turnaround usually costs more and depends on the manufacturer's capacity.",
    priority: 10,
  },

  {
    id: "pcb-testing",
    category: "pcb",
    intent: "procedure",
    question: "How are PCBs tested during manufacturing?",
    variations: [
      "How are PCBs tested during manufacturing",
      "PCB testing methods",
      "AOI PCB",
      "X-ray PCB",
      "Flying probe test",
      "PCB testing methods",
    ],
    keywords: ["testing", "pcb", "aoi", "x-ray", "probe"],
    answer:
      "Common tests include automatic optical inspection (AOI), X-ray for hidden joints, flying probe or bed-of-nails electrical test, and functional tests on the assembled board.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DESIGN SOFTWARE
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-design-software",
    category: "pcb",
    intent: "comparison",
    question: "What PCB design software is available?",
    variations: [
      "What PCB design software is available",
      "PCB design software",
      "KiCad vs Altium",
      "EasyEDA PCB",
      "Best PCB software",
      "PCB design software options",
    ],
    keywords: ["pcb", "software", "kicad", "altium", "easyeda"],
    answer:
      "Common PCB design tools include KiCad (free), EasyEDA, Eagle, Altium Designer and OrCAD. The choice depends on features, cost and experience.",
    priority: 13,
  },

  {
    id: "pcb-kicad",
    category: "pcb",
    intent: "definition",
    question: "What is KiCad?",
    variations: [
      "What is KiCad",
      "KiCad PCB",
      "KiCad vs Eagle",
      "Is KiCad good",
      "KiCad tutorial",
      "KiCad definition",
    ],
    keywords: ["kicad", "pcb", "software", "design", "free"],
    answer:
      "KiCad is a free, open-source PCB design suite with schematic capture, PCB layout and 3D viewing. It is widely used for hobby and professional projects.",
    priority: 13,
  },

  {
    id: "pcb-altium",
    category: "pcb",
    intent: "definition",
    question: "What is Altium Designer?",
    variations: [
      "What is Altium Designer",
      "Altium PCB",
      "Altium vs KiCad",
      "Is Altium worth it",
      "Altium Designer",
      "Altium definition",
    ],
    keywords: ["altium", "pcb", "software", "design", "professional"],
    answer:
      "Altium Designer is a professional PCB design tool with advanced features for complex boards. It is widely used in industry but has significant cost.",
    priority: 13,
  },

  {
    id: "pcb-easyeda",
    category: "pcb",
    intent: "definition",
    question: "What is EasyEDA?",
    variations: [
      "What is EasyEDA",
      "EasyEDA PCB",
      "EasyEDA vs KiCad",
      "Online PCB design",
      "EasyEDA tutorial",
      "EasyEDA definition",
    ],
    keywords: ["easyeda", "pcb", "online", "design", "software"],
    answer:
      "EasyEDA is an online PCB design tool with integrated parts library and manufacturing services. It is convenient for beginners and quick projects.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PROTECTION / COATING / RELIABILITY
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-conformal-coating",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-potting",
    category: "pcb",
    intent: "procedure",
    question: "What is potting a PCB?",
    variations: [
      "What is potting a PCB",
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
    priority: 13,
  },

  {
    id: "pcb-ip-rating",
    category: "pcb",
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
    priority: 13,
  },

  {
    id: "pcb-aging",
    category: "pcb",
    intent: "definition",
    question: "What causes PCB aging?",
    variations: [
      "What causes PCB aging",
      "PCB aging",
      "Why do PCBs degrade",
      "PCB lifetime",
      "PCB reliability over time",
      "PCB aging causes",
    ],
    keywords: ["aging", "pcb", "degrade", "lifetime", "reliability"],
    answer:
      "PCB aging can result from thermal stress, moisture, contamination, electrochemical migration, mechanical stress and component wear. Proper design, coating and materials improve long-term reliability.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // BEST PRACTICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "pcb-best-practices",
    category: "pcb",
    intent: "procedure",
    question: "What are PCB design best practices?",
    variations: [
      "What are PCB design best practices",
      "PCB best practices",
      "Good PCB design",
      "PCB layout tips",
      "PCB design guidelines",
      "PCB design best practices",
    ],
    keywords: ["best", "practices", "pcb", "design", "layout"],
    answer:
      "Plan the stackup, place components carefully, route power and ground first, follow design rules, keep sensitive signals clean, add test points and document everything. Review before manufacturing.",
    priority: 15,
  },

  {
    id: "pcb-thermal-management",
    category: "pcb",
    intent: "procedure",
    question: "How do I manage heat on a PCB?",
    variations: [
      "How do I manage heat on a PCB",
      "PCB thermal management",
      "Cooling PCB",
      "Thermal design PCB",
      "Heat dissipation PCB",
      "PCB thermal management",
    ],
    keywords: ["thermal", "pcb", "heat", "cooling", "management"],
    answer:
      "Use copper areas, thermal vias, heatsinks, airflow and appropriate component ratings. Place hot components away from heat-sensitive parts and consider enclosure airflow.",
    priority: 13,
  },

  {
    id: "pcb-signal-integrity",
    category: "pcb",
    intent: "procedure",
    question: "How do I improve signal integrity on a PCB?",
    variations: [
      "How do I improve signal integrity on a PCB",
      "Signal integrity PCB",
      "Improve signal quality",
      "Reduce noise PCB",
      "Signal integrity design",
      "PCB signal integrity",
    ],
    keywords: ["signal", "integrity", "pcb", "noise", "design"],
    answer:
      "Use controlled impedance, proper return paths, adequate spacing, minimizing vias, separating noisy and sensitive signals and following high-speed design rules.",
    priority: 13,
  },

  {
    id: "pcb-documentation",
    category: "pcb",
    intent: "procedure",
    question: "What documentation should a PCB project include?",
    variations: [
      "What documentation should a PCB project include",
      "PCB documentation",
      "PCB design documentation",
      "Schematic and layout docs",
      "PCB handover documentation",
      "PCB documentation",
    ],
    keywords: ["documentation", "pcb", "schematic", "layout", "handover"],
    answer:
      "Documentation should include schematics, layout files, BOM, assembly drawings, fabrication notes, test points and any calibration or configuration details.",
    priority: 13,
  },
];
