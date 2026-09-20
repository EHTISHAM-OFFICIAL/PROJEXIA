import type { HelpEntry } from "./types";

export const AUTOMATION_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // FOUNDATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-what-is",
    category: "automation",
    intent: "definition",
    question: "What is automation?",
    variations: [
      "What is automation",
      "Explain automation",
      "What does an automated system do",
      "What is electronics automation",
      "How does automation work",
      "Automation definition",
      "Automation meaning",
    ],
    keywords: ["automation", "automated", "control", "system"],
    answer:
      "Automation uses sensors, programmed logic and actuators or other outputs to perform tasks with reduced manual intervention. A controller evaluates conditions and determines when outputs should operate.",
    priority: 14,
  },

  {
    id: "automation-purpose",
    category: "automation",
    intent: "purpose",
    question: "What is automation used for?",
    variations: [
      "What is automation used for",
      "What can automation do",
      "What is it used for",
      "Where is automation used",
      "What is the purpose of automation",
      "Why use automation",
    ],
    keywords: ["automation", "used", "purpose", "application", "control"],
    answer:
      "Automation is used to perform tasks with minimal manual intervention. Sensors and controllers evaluate conditions and drive actuators, relays, motors, alarms or communication so that processes run reliably and consistently.",
    priority: 14,
  },

  {
    id: "automation-sensor-control",
    category: "automation",
    intent: "definition",
    question: "Can sensors be used for automation?",
    variations: [
      "Can sensors be used for automation",
      "Can sensors trigger automation",
      "Can a sensor turn something on",
      "Can I automate based on temperature",
      "Can motion trigger a device",
    ],
    keywords: ["sensor", "automation", "trigger", "temperature", "motion"],
    answer:
      "Yes. A controller can read sensor conditions and use programmed rules to activate outputs such as relays, motors, lights, alarms or communication functions.",
    priority: 13,
  },

  {
    id: "automation-feedback",
    category: "automation",
    intent: "definition",
    question: "What is feedback in an automated system?",
    variations: [
      "What is feedback in an automated system",
      "What is closed loop control",
      "What is feedback control",
      "Open loop vs closed loop",
      "Why use feedback sensors",
    ],
    keywords: ["feedback", "closed", "loop", "control", "sensor"],
    answer:
      "Feedback means measuring the actual result of a system and using that information to adjust its behavior. Closed-loop systems use feedback, while open-loop systems operate without measuring the result.",
    priority: 14,
  },

  {
    id: "automation-open-loop",
    category: "automation",
    intent: "definition",
    question: "What is open-loop control?",
    variations: [
      "What is open-loop control",
      "Open loop vs closed loop",
      "Open loop automation",
      "Control without feedback",
      "Open loop definition",
      "Open loop meaning",
    ],
    keywords: ["open", "loop", "control", "feedback", "automation"],
    answer:
      "Open-loop control runs a process without measuring the result. It is simple but cannot correct for unexpected disturbances or changes in the system.",
    priority: 13,
  },

  {
    id: "automation-closed-loop",
    category: "automation",
    intent: "definition",
    question: "What is closed-loop control?",
    variations: [
      "What is closed-loop control",
      "Closed loop automation",
      "Feedback loop control",
      "Closed loop vs open loop",
      "Closed loop definition",
      "Closed loop meaning",
    ],
    keywords: ["closed", "loop", "control", "feedback", "automation"],
    answer:
      "Closed-loop control measures the actual output and compares it with a target, then adjusts the control action to reduce the error. It is more accurate but requires a suitable sensor and control algorithm.",
    priority: 13,
  },

  {
    id: "automation-state-machine",
    category: "automation",
    intent: "definition",
    question: "What is a state machine?",
    variations: [
      "What is a state machine",
      "Why use state machines",
      "What is finite state machine",
      "How do I organize automation logic",
      "How can I handle multiple system states",
    ],
    keywords: ["state", "machine", "automation", "logic", "states"],
    answer:
      "A state machine organizes behavior into defined states and transitions. It is useful for embedded systems where behavior changes according to events, timers, sensor conditions or user actions.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // CONTROLLERS / PLC / HMI / SCADA
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-plc",
    category: "automation",
    intent: "definition",
    question: "What is a PLC?",
    variations: [
      "What is a PLC",
      "What is programmable logic controller",
      "PLC vs microcontroller",
      "Why use a PLC",
      "Industrial automation controller",
    ],
    keywords: ["plc", "programmable", "logic", "controller", "industrial"],
    answer:
      "A PLC, or Programmable Logic Controller, is an industrial controller designed for reliable automation and control tasks. PLCs often provide rugged I/O, industrial communication and programming environments suited to factory or process automation.",
    priority: 13,
  },

  {
    id: "automation-hmi",
    category: "automation",
    intent: "definition",
    question: "What is an HMI?",
    variations: [
      "What is an HMI",
      "What is human machine interface",
      "Why use HMI in automation",
      "HMI panel purpose",
      "How does HMI work",
    ],
    keywords: ["hmi", "human", "machine", "interface", "panel"],
    answer:
      "An HMI, or Human-Machine Interface, allows an operator to monitor and interact with a control system. It may display status, allow parameter changes, show alarms and provide controls for the process.",
    priority: 13,
  },

  {
    id: "automation-scada",
    category: "automation",
    intent: "definition",
    question: "What is SCADA?",
    variations: [
      "What is SCADA",
      "Explain SCADA",
      "What is supervisory control and data acquisition",
      "SCADA system purpose",
      "How is SCADA used",
    ],
    keywords: ["scada", "supervisory", "control", "data", "acquisition"],
    answer:
      "SCADA refers to supervisory control and data acquisition systems used to monitor and control processes across a site or larger area. SCADA systems typically collect data from controllers and present it through a central interface for monitoring and operation.",
    priority: 13,
  },

  {
    id: "automation-dcs",
    category: "automation",
    intent: "definition",
    question: "What is a DCS?",
    variations: [
      "What is a DCS",
      "Distributed control system",
      "DCS vs PLC",
      "DCS in automation",
      "Distributed control definition",
    ],
    keywords: ["dcs", "distributed", "control", "system", "automation"],
    answer:
      "A DCS, or Distributed Control System, distributes control functions across multiple controllers that cooperate over a network. It is common in process industries such as chemical, oil and power.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PID / CONTROL LOOP
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-pid",
    category: "automation",
    intent: "definition",
    question: "What is PID control?",
    variations: [
      "What is PID control",
      "Explain PID",
      "What is proportional integral derivative control",
      "How does PID controller work",
      "When should I use PID",
    ],
    keywords: ["pid", "control", "proportional", "integral", "derivative"],
    answer:
      "PID is a control method that combines proportional, integral and derivative terms to reduce error between a measured value and a target. It is commonly used for temperature, speed, position and other continuous control applications, with tuning depending on the system behavior.",
    priority: 15,
  },

  {
    id: "automation-pid-tuning",
    category: "automation",
    intent: "procedure",
    question: "How do I tune a PID controller?",
    variations: [
      "How do I tune a PID controller",
      "PID tuning",
      "How to tune PID",
      "PID tuning steps",
      "PID gains tuning",
    ],
    keywords: ["pid", "tuning", "gains", "control", "process"],
    answer:
      "Start with a proportional term, add integral to remove steady-state error and derivative to reduce overshoot. Test step responses and adjust gradually. The best method depends on the process dynamics and safety requirements.",
    priority: 13,
  },

  {
    id: "automation-control-loop",
    category: "automation",
    intent: "definition",
    question: "What is a control loop?",
    variations: [
      "What is a control loop",
      "Control loop automation",
      "Feedback control loop",
      "How does a control loop work",
      "Control loop definition",
    ],
    keywords: ["control", "loop", "feedback", "automation", "process"],
    answer:
      "A control loop continuously measures a process variable, compares it with a setpoint and adjusts an output to reduce the error. Loops can be simple on/off, PID or another control strategy.",
    priority: 13,
  },

  {
    id: "automation-setpoint",
    category: "automation",
    intent: "definition",
    question: "What is a setpoint in automation?",
    variations: [
      "What is a setpoint in automation",
      "Setpoint meaning",
      "What does setpoint mean",
      "Setpoint vs measured value",
      "Target value control",
    ],
    keywords: ["setpoint", "automation", "target", "control", "value"],
    answer:
      "A setpoint is the desired value for a controlled variable, such as a target temperature or speed. The controller adjusts its output to keep the measured value near the setpoint.",
    priority: 10,
  },

  {
    id: "automation-deadband",
    category: "automation",
    intent: "definition",
    question: "What is a deadband in automation?",
    variations: [
      "What is a deadband in automation",
      "Deadband control",
      "Ignore small changes",
      "Deadband meaning control",
      "Hysteresis deadband",
    ],
    keywords: ["deadband", "automation", "control", "threshold", "change"],
    answer:
      "A deadband ignores small changes around a setpoint, reducing unnecessary output adjustments. It is used in control, sensor processing and user input to prevent jitter or excessive switching.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // TIMERS / COUNTERS / LOGIC
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-timer",
    category: "automation",
    intent: "procedure",
    question: "How can timers be used in automation?",
    variations: [
      "How can timers be used in automation",
      "Why use timers in control",
      "How to delay an output",
      "Timer logic in automation",
      "How to sequence operations",
    ],
    keywords: ["timer", "delay", "sequence", "automation", "control"],
    answer:
      "Timers can delay actions, create sequences, limit run time, debounce inputs or schedule periodic tasks. They are commonly combined with sensor conditions and state logic to control when outputs operate.",
    priority: 13,
  },

  {
    id: "automation-counter",
    category: "automation",
    intent: "procedure",
    question: "How can counters be used in automation?",
    variations: [
      "How can counters be used in automation",
      "Why use counters",
      "How to count items in automation",
      "Counter logic in control systems",
      "How to trigger after a number of events",
    ],
    keywords: ["counter", "count", "event", "automation", "logic"],
    answer:
      "Counters track the number of events such as parts passing a sensor or button presses. They can trigger actions after a set count, track production quantities or support sequencing and batch control.",
    priority: 10,
  },

  {
    id: "automation-sequencing",
    category: "automation",
    intent: "procedure",
    question: "How do I sequence operations in automation?",
    variations: [
      "How do I sequence operations in automation",
      "Sequence logic",
      "Step sequence automation",
      "How to run steps in order",
      "Sequencing process control",
    ],
    keywords: ["sequence", "steps", "automation", "order", "logic"],
    answer:
      "Sequencing uses states, timers and conditions to move a process through ordered steps. Each step waits for a condition (sensor, timer or operator input) before advancing.",
    priority: 13,
  },

  {
    id: "automation-ladder-logic",
    category: "automation",
    intent: "definition",
    question: "What is ladder logic?",
    variations: [
      "What is ladder logic",
      "Ladder diagram PLC",
      "How does ladder logic work",
      "Ladder logic vs structured text",
      "PLC programming language ladder",
    ],
    keywords: ["ladder", "logic", "plc", "programming", "automation"],
    answer:
      "Ladder logic is a graphical programming language used in PLCs. It represents relay-style control circuits using rungs with contacts and coils, making it intuitive for electricians and control engineers.",
    priority: 13,
  },

  {
    id: "automation-function-block",
    category: "automation",
    intent: "definition",
    question: "What is function block programming?",
    variations: [
      "What is function block programming",
      "Function block PLC",
      "FBD PLC",
      "Function block vs ladder",
      "PLC function block diagram",
    ],
    keywords: ["function", "block", "plc", "programming", "automation"],
    answer:
      "Function block programming represents control logic as interconnected function blocks. It is one of the standard IEC 61131-3 PLC languages and is useful for analog and PID control.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // RELAYS / ACTUATORS / INTERLOCKS
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-relay",
    category: "automation",
    intent: "compatibility",
    question: "Can a microcontroller control appliances with a relay?",
    variations: [
      "Can a microcontroller control appliances with a relay",
      "Can Arduino control a relay",
      "Can ESP32 switch a device",
      "Can I automate an appliance",
      "Can a relay control a load",
    ],
    keywords: ["relay", "arduino", "esp32", "appliance", "load"],
    answer:
      "A microcontroller can control an appropriately rated relay module, which can then switch a separate load. Mains-voltage work requires appropriate isolation, enclosure, ratings and electrical safety practices.",
    priority: 15,
  },

  {
    id: "automation-actuator",
    category: "automation",
    intent: "definition",
    question: "What is an actuator?",
    variations: [
      "What is an actuator",
      "What does an actuator do",
      "Actuator examples",
      "Why use actuators in automation",
      "Difference between sensor and actuator",
    ],
    keywords: ["actuator", "output", "motor", "relay", "control"],
    answer:
      "An actuator converts a control signal into physical action. Examples include motors, solenoids, relays, valves and servos. Actuators are the output devices of an automated system, while sensors provide input information.",
    priority: 13,
  },

  {
    id: "automation-sensor-types",
    category: "automation",
    intent: "definition",
    question: "What sensors are commonly used in automation?",
    variations: [
      "What sensors are commonly used in automation",
      "Which sensors for automation",
      "Common industrial sensors",
      "What sensors can detect objects",
      "Automation sensor examples",
    ],
    keywords: [
      "sensor",
      "automation",
      "detection",
      "measurement",
      "industrial",
    ],
    answer:
      "Common automation sensors include proximity, photoelectric, limit switches, temperature, pressure, flow, level, motion and position sensors. The correct sensor depends on what needs to be detected, the environment, required accuracy and output type.",
    priority: 13,
  },

  {
    id: "automation-interlock",
    category: "automation",
    intent: "definition",
    question: "What is an interlock in automation?",
    variations: [
      "What is an interlock in automation",
      "What is safety interlock",
      "Why use interlocks",
      "Interlock vs emergency stop",
      "How to prevent unsafe operation",
    ],
    keywords: ["interlock", "safety", "automation", "prevent", "condition"],
    answer:
      "An interlock prevents an action unless certain conditions are met, or stops an action when an unsafe condition occurs. Interlocks can be implemented in hardware, software or both depending on the required safety and reliability.",
    priority: 15,
  },

  {
    id: "automation-emergency-stop",
    category: "automation",
    intent: "procedure",
    question: "Why is an emergency stop important?",
    variations: [
      "Why is an emergency stop important",
      "What does emergency stop do",
      "Why use E-stop",
      "Emergency stop requirements",
      "How to stop automation quickly",
    ],
    keywords: ["emergency", "stop", "estop", "safety", "shutdown"],
    answer:
      "An emergency stop provides a way to quickly bring a system to a safe state during an unexpected or dangerous condition. Its design should follow the applicable safety requirements and should not rely solely on normal software control.",
    priority: 15,
  },

  {
    id: "automation-safety",
    category: "automation",
    intent: "procedure",
    question: "Why are safety conditions important in automation?",
    variations: [
      "Why are safety conditions important in automation",
      "How do I make automation safe",
      "What are safety interlocks",
      "Why use emergency stop",
      "Can software alone make a system safe",
    ],
    keywords: ["safety", "automation", "interlock", "emergency", "software"],
    answer:
      "Automated systems should consider fault conditions, unexpected inputs and component failures. Depending on the application, safety may require hardware interlocks, fuses, physical isolation or dedicated safety mechanisms rather than relying only on software.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // COMMUNICATION / PROTOCOLS
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-communication",
    category: "automation",
    intent: "definition",
    question: "How do automation devices communicate?",
    variations: [
      "How do automation devices communicate",
      "Industrial communication protocols",
      "How do PLCs communicate",
      "Automation network types",
      "Modbus CAN RS485",
    ],
    keywords: [
      "communication",
      "automation",
      "protocol",
      "modbus",
      "can",
      "rs485",
    ],
    answer:
      "Automation devices can communicate using protocols such as Modbus, CAN, RS-485, Ethernet/IP and others depending on the equipment and environment. The correct choice depends on distance, noise, speed, device support and system architecture.",
    priority: 13,
  },

  {
    id: "automation-modbus",
    category: "automation",
    intent: "definition",
    question: "What is Modbus?",
    variations: [
      "What is Modbus",
      "Modbus RTU",
      "Modbus TCP",
      "Modbus protocol",
      "How does Modbus work",
      "Modbus definition",
    ],
    keywords: ["modbus", "protocol", "automation", "rtu", "tcp"],
    answer:
      "Modbus is a widely used industrial communication protocol. It supports master/slave communication over serial (RTU) or Ethernet (TCP) and is commonly used to read and write registers on PLCs, sensors and drives.",
    priority: 13,
  },

  {
    id: "automation-can",
    category: "automation",
    intent: "definition",
    question: "What is CAN in automation?",
    variations: [
      "What is CAN in automation",
      "CAN bus automation",
      "CAN protocol industrial",
      "CAN vs RS485",
      "CAN bus uses",
    ],
    keywords: ["can", "bus", "automation", "protocol", "industrial"],
    answer:
      "CAN is a robust multi-master serial bus originally designed for automotive use and now widely used in industrial and mobile equipment. It supports error detection and priority-based arbitration.",
    priority: 13,
  },

  {
    id: "automation-rs485",
    category: "automation",
    intent: "definition",
    question: "What is RS-485?",
    variations: [
      "What is RS-485",
      "RS485 vs RS232",
      "RS485 communication",
      "RS485 automation",
      "RS485 uses",
    ],
    keywords: ["rs485", "serial", "automation", "industrial", "communication"],
    answer:
      "RS-485 is a differential serial standard used for long-distance, multi-drop communication in noisy environments. It is commonly used with protocols such as Modbus RTU.",
    priority: 13,
  },

  {
    id: "automation-protocol-choice",
    category: "automation",
    intent: "procedure",
    question: "How do I choose an automation protocol?",
    variations: [
      "How do I choose an automation protocol",
      "Which protocol for automation",
      "Automation protocol selection",
      "Modbus vs CAN vs Ethernet",
      "Choose industrial protocol",
    ],
    keywords: [
      "protocol",
      "automation",
      "choose",
      "industrial",
      "communication",
    ],
    answer:
      "Choice depends on distance, data rate, noise, device support, topology and required reliability. Modbus is simple and widely supported; CAN is robust for multi-node systems; Ethernet is used for higher bandwidth or IT integration.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // APPLICATION PATTERNS
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-lighting",
    category: "automation",
    intent: "capability",
    question: "Can automation control lighting?",
    variations: [
      "Can automation control lighting",
      "Lighting automation",
      "Automated lights",
      "Smart lighting control",
      "Schedule lights automation",
    ],
    keywords: ["lighting", "automation", "control", "schedule", "sensor"],
    answer:
      "Yes. Lighting automation can use time schedules, occupancy sensors, ambient light sensors and relays or dimmers to switch or adjust lights automatically.",
    priority: 10,
  },

  {
    id: "automation-hvac",
    category: "automation",
    intent: "capability",
    question: "Can automation control HVAC?",
    variations: [
      "Can automation control HVAC",
      "HVAC automation",
      "Building HVAC control",
      "Automatic climate control",
      "HVAC scheduling automation",
    ],
    keywords: ["hvac", "automation", "control", "climate", "temperature"],
    answer:
      "Yes. HVAC automation can control heating, ventilation and air conditioning based on schedules, occupancy, temperature and humidity sensors. Control strategies range from simple on/off to PID loops.",
    priority: 10,
  },

  {
    id: "automation-irrigation",
    category: "automation",
    intent: "capability",
    question: "Can automation control irrigation?",
    variations: [
      "Can automation control irrigation",
      "Irrigation automation",
      "Automatic watering system",
      "Smart irrigation",
      "Soil-based irrigation",
    ],
    keywords: ["irrigation", "automation", "control", "soil", "water"],
    answer:
      "Yes. Irrigation automation can use soil moisture, weather or schedule data to open valves or run pumps only when watering is needed.",
    priority: 13,
  },

  {
    id: "automation-conveyor",
    category: "automation",
    intent: "capability",
    question: "Can automation control conveyors?",
    variations: [
      "Can automation control conveyors",
      "Conveyor automation",
      "Conveyor control system",
      "Belt automation",
      "Conveyor start stop",
    ],
    keywords: ["conveyor", "automation", "control", "motor", "belt"],
    answer:
      "Yes. Conveyor automation typically controls motor start/stop, speed and direction, with sensors for part presence and safety interlocks for emergency stop and guarding.",
    priority: 13,
  },

  {
    id: "automation-pump",
    category: "automation",
    intent: "capability",
    question: "Can automation control pumps?",
    variations: [
      "Can automation control pumps",
      "Pump automation",
      "Automatic pump control",
      "Water pump automation",
      "Tank level pump control",
    ],
    keywords: ["pump", "automation", "control", "tank", "level"],
    answer:
      "Yes. Pump automation can run pumps based on level, pressure, flow or schedule, with dry-run protection, overcurrent protection and interlocks for safe operation.",
    priority: 13,
  },

  {
    id: "automation-access-control",
    category: "automation",
    intent: "capability",
    question: "Can automation control access?",
    variations: [
      "Can automation control access",
      "Access control automation",
      "Automated door control",
      "Access control system",
      "Automated gate",
    ],
    keywords: ["access", "control", "automation", "door", "gate"],
    answer:
      "Yes. Access automation can use RFID, keypads, biometrics, or remote commands to control doors, turnstiles or gates, with logging, scheduling and fail-safe or fail-secure behavior.",
    priority: 13,
  },

  {
    id: "automation-alarm",
    category: "automation",
    intent: "capability",
    question: "Can automation handle alarms?",
    variations: [
      "Can automation handle alarms",
      "Alarm automation",
      "Automated alarm system",
      "Condition-based alarm",
      "Alarm logic automation",
    ],
    keywords: ["alarm", "automation", "condition", "system", "monitoring"],
    answer:
      "Yes. Automation can monitor conditions, trigger alarms when thresholds are crossed and take actions such as notifying operators, activating outputs or entering a safe state.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // ENERGY / EFFICIENCY / SCALABILITY
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-energy",
    category: "automation",
    intent: "procedure",
    question: "Can automation help save energy?",
    variations: [
      "Can automation help save energy",
      "Energy saving automation",
      "How automation reduces power use",
      "Smart energy control",
      "Automated lighting and HVAC",
    ],
    keywords: ["energy", "save", "power", "efficiency", "automation"],
    answer:
      "Automation can improve energy efficiency by turning equipment off when not needed, scheduling operation, optimizing setpoints and responding to occupancy or environmental conditions. The actual savings depend on the system and how it is configured.",
    priority: 13,
  },

  {
    id: "automation-scalability",
    category: "automation",
    intent: "procedure",
    question: "How do I make an automation system scalable?",
    variations: [
      "How do I make an automation system scalable",
      "Scaling automation system",
      "Add more sensors to automation",
      "Expand control system later",
      "Design automation for growth",
    ],
    keywords: ["scalable", "expand", "automation", "growth", "design"],
    answer:
      "Use clear architecture, modular code, appropriate communication, sufficient I/O capacity and documented interfaces. Planning for future sensors, devices or control functions reduces rework when the system expands.",
    priority: 13,
  },

  {
    id: "automation-reliability",
    category: "automation",
    intent: "procedure",
    question: "How do I make an automation system reliable?",
    variations: [
      "How do I make an automation system reliable",
      "Reliable automation",
      "Robust control system",
      "Automation reliability",
      "Prevent automation failure",
    ],
    keywords: ["reliability", "automation", "robust", "failure", "control"],
    answer:
      "Use components within their ratings, provide stable power, include hardware protection, add watchdogs and diagnostics, and test under realistic conditions. Fail-safe behavior should be defined for fault cases.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // REMOTE / IOT AUTOMATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-remote",
    category: "automation",
    intent: "capability",
    question: "Can automation systems be controlled remotely?",
    variations: [
      "Can automation systems be controlled remotely",
      "Remote control automation",
      "Can I control automation over internet",
      "Remote monitoring automation",
      "IoT automation control",
    ],
    keywords: ["remote", "control", "internet", "iot", "monitoring"],
    answer:
      "Yes. Remote control or monitoring can be added using network connectivity, IoT platforms or dedicated communication systems. Security, reliability and fail-safe behavior should be considered, especially when controlling physical equipment remotely.",
    priority: 13,
  },

  {
    id: "automation-iot",
    category: "automation",
    intent: "capability",
    question: "Can automation use IoT?",
    variations: [
      "Can automation use IoT",
      "IoT automation",
      "Connected automation",
      "Cloud automation",
      "IoT for control systems",
    ],
    keywords: ["iot", "automation", "connected", "cloud", "control"],
    answer:
      "Yes. IoT can add remote monitoring, data collection, dashboards and remote commands to automation systems. For safety-critical functions, local control and hardware protection should remain the primary mechanism.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DEBUGGING / DIAGNOSTICS
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-debugging",
    category: "automation",
    intent: "troubleshooting",
    question: "How do I debug an automation system?",
    variations: [
      "How do I debug an automation system",
      "Automation not working",
      "How to troubleshoot control system",
      "Why is my automated system failing",
      "Debug PLC or microcontroller automation",
    ],
    keywords: ["debug", "automation", "troubleshoot", "control", "logic"],
    answer:
      "Verify inputs, outputs, power and communication first, then trace the control logic step by step. Use status indicators, logs or test modes where available, and test each subsystem independently before running the complete sequence.",
    priority: 15,
  },

  {
    id: "automation-diagnostics",
    category: "automation",
    intent: "procedure",
    question: "What diagnostics help automation systems?",
    variations: [
      "What diagnostics help automation systems",
      "Automation diagnostics",
      "Diagnostic features control system",
      "PLC diagnostics",
      "Automation health monitoring",
    ],
    keywords: ["diagnostics", "automation", "control", "health", "monitoring"],
    answer:
      "Useful diagnostics include status indicators, error logs, sensor health checks, communication statistics, watchdog reset tracking and diagnostic modes for testing outputs.",
    priority: 10,
  },

  {
    id: "automation-testing",
    category: "automation",
    intent: "procedure",
    question: "How should an automation system be tested?",
    variations: [
      "How should an automation system be tested",
      "Testing automation system",
      "Automation testing steps",
      "How to verify control system",
      "Commissioning automation",
    ],
    keywords: ["testing", "automation", "verify", "commissioning", "control"],
    answer:
      "Test in stages: verify power and wiring, test each input and output, then test the control logic with simulated conditions, and finally run the full sequence under realistic conditions before commissioning.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PROCESS / ENGINEERING
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-requirements",
    category: "automation",
    intent: "project_requirements",
    question: "What should I specify for an automation project?",
    variations: [
      "What should I specify for an automation project",
      "Automation project requirements",
      "What do you need for automation",
      "Automation scope",
      "How to describe automation",
    ],
    keywords: ["automation", "requirements", "specify", "project", "scope"],
    answer:
      "Describe the process, the conditions to sense, the actions to take, safety requirements, environment, power availability, interfaces and any existing equipment. Clear sequences and edge cases are particularly useful.",
    priority: 13,
  },

  {
    id: "automation-safety-standards",
    category: "automation",
    intent: "definition",
    question: "What safety standards apply to automation?",
    variations: [
      "What safety standards apply to automation",
      "Automation safety standards",
      "Machine safety standards",
      "IEC 61508 automation",
      "ISO 13849 automation",
    ],
    keywords: ["safety", "standards", "automation", "machine", "compliance"],
    answer:
      "Standards such as IEC 61508, ISO 13849 and industry-specific standards apply to machinery and automation safety. Specific requirements depend on the application, region and risk assessment.",
    priority: 13,
  },

  {
    id: "automation-risk-assessment",
    category: "automation",
    intent: "procedure",
    question: "What is a risk assessment in automation?",
    variations: [
      "What is a risk assessment in automation",
      "Machine risk assessment",
      "Automation risk assessment",
      "Hazard analysis automation",
      "Safety risk assessment",
    ],
    keywords: ["risk", "assessment", "automation", "hazard", "safety"],
    answer:
      "A risk assessment identifies hazards, evaluates their likelihood and severity, and defines measures to reduce risk. It guides the design of safeguards, interlocks and safe operating procedures.",
    priority: 13,
  },

  {
    id: "automation-commissioning",
    category: "automation",
    intent: "procedure",
    question: "What is commissioning in automation?",
    variations: [
      "What is commissioning in automation",
      "Commissioning automation system",
      "Installation and commissioning",
      "Start up automation",
      "Commissioning process control",
    ],
    keywords: [
      "commissioning",
      "automation",
      "startup",
      "installation",
      "control",
    ],
    answer:
      "Commissioning is the process of installing, testing and verifying an automation system in its final environment. It includes functional tests, safety checks and documented acceptance before normal operation.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // BEST PRACTICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "automation-best-practices",
    category: "automation",
    intent: "procedure",
    question: "What are automation best practices?",
    variations: [
      "What are automation best practices",
      "Automation best practices",
      "Good automation design",
      "Automation guidelines",
      "How to design automation well",
    ],
    keywords: ["best", "practices", "automation", "design", "guidelines"],
    answer:
      "Use clear requirements, modular design, documented interfaces, appropriate safety mechanisms, reliable communication, diagnostics, version control and thorough testing. Document sequences, edge cases and fault behavior.",
    priority: 15,
  },

  {
    id: "automation-documentation",
    category: "automation",
    intent: "procedure",
    question: "What documentation should an automation project include?",
    variations: [
      "What documentation should an automation project include",
      "Automation documentation",
      "Automation project documents",
      "Control system documentation",
      "Automation handover documents",
    ],
    keywords: ["documentation", "automation", "project", "control", "handover"],
    answer:
      "Documentation typically includes schematics, wiring diagrams, I/O lists, control logic descriptions, sequence descriptions, calibration data, safety notes and any configuration details for network or HMI components.",
    priority: 13,
  },
];
