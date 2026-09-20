import type { HelpEntry } from "./types";

export const TROUBLESHOOTING_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // GENERAL METHODOLOGY
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-systematic",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "What is the best way to troubleshoot electronics?",
    variations: [
      "What is the best way to troubleshoot electronics",
      "How to debug electronics systematically",
      "Best troubleshooting method",
      "How to find a fault in a circuit",
      "Step by step troubleshooting",
      "Systematic troubleshooting",
    ],
    keywords: ["troubleshooting", "systematic", "fault", "debug", "method"],
    answer:
      "Work from the known to the unknown: verify power and ground, confirm wiring and connections, check voltages and signals, isolate subsystems, test one change at a time and compare behavior against expected results. Avoid changing multiple things at once because it makes the cause harder to identify.",
    priority: 15,
  },

  {
    id: "troubleshooting-not-working",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "My circuit is not working. What should I check?",
    variations: [
      "My circuit is not working. What should I check",
      "My electronics project does not work",
      "Why is my circuit not working",
      "My Arduino project is not working",
      "How do I troubleshoot a circuit",
      "My device does nothing",
    ],
    keywords: ["troubleshoot", "circuit", "not", "working", "problem"],
    answer:
      "Start with power and ground, then verify wiring, component orientation, voltage levels, pin assignments, communication settings and firmware behavior. Test one subsystem at a time instead of debugging the entire system simultaneously.",
    priority: 15,
  },

  {
    id: "troubleshooting-first-power-up",
    category: "troubleshooting",
    intent: "troubleshooting",
    question:
      "What should I check before powering a circuit for the first time?",
    variations: [
      "What should I check before powering a circuit for the first time",
      "First time power up checklist",
      "How to avoid damaging a new circuit",
      "Before applying power what to check",
      "How to safely test a new board",
      "First power up checklist",
    ],
    keywords: ["power", "first", "check", "safety", "test"],
    answer:
      "Inspect for shorts, verify polarity, confirm component orientation, check supply voltage and current limits, ensure wiring matches the schematic and use a current-limited supply where possible. Testing in stages reduces the risk of damaging components.",
    priority: 13,
  },

  {
    id: "troubleshooting-multimeter",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I use a multimeter to debug a circuit?",
    variations: [
      "How do I use a multimeter to debug a circuit",
      "How to measure voltage with multimeter",
      "How to check continuity",
      "What multimeter settings should I use",
      "How to test if a wire is broken",
      "How to measure current",
    ],
    keywords: [
      "multimeter",
      "measure",
      "voltage",
      "current",
      "continuity",
      "resistance",
    ],
    answer:
      "Select the correct mode and range before probing. Voltage is measured in parallel with the points being tested, current is measured in series with the circuit path, and resistance or continuity is measured with power removed. Always verify the meter's probe connections and rating for the circuit being tested.",
    priority: 15,
  },

  {
    id: "troubleshooting-oscilloscope",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "When should I use an oscilloscope?",
    variations: [
      "When should I use an oscilloscope",
      "Do I need an oscilloscope",
      "How can an oscilloscope help debug",
      "What can I see with a scope",
      "Why use a scope instead of a multimeter",
      "Oscilloscope debugging",
    ],
    keywords: ["oscilloscope", "scope", "signal", "waveform", "debug"],
    answer:
      "An oscilloscope is useful when a multimeter cannot show fast signal behavior, such as PWM waveforms, UART data, clock signals, noise, glitches or timing problems. It shows signal amplitude over time, which can reveal issues that a simple average measurement hides.",
    priority: 13,
  },

  {
    id: "troubleshooting-datasheet",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I use a datasheet to debug a component?",
    variations: [
      "How do I use a datasheet to debug a component",
      "Why is datasheet important",
      "How to read a datasheet",
      "Where to find pinout and ratings",
      "How to check if component is used correctly",
      "Datasheet for debugging",
    ],
    keywords: ["datasheet", "pinout", "rating", "specification", "component"],
    answer:
      "A datasheet provides pinout, electrical ratings, timing, recommended operating conditions and application information. Checking the actual circuit against the datasheet helps identify incorrect voltage, current, timing, wiring or configuration issues.",
    priority: 13,
  },

  {
    id: "troubleshooting-simulation",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Can simulation replace real testing?",
    variations: [
      "Can simulation replace real testing",
      "Is simulation enough",
      "Why does simulation work but real circuit not",
      "Should I simulate before building",
      "Simulation vs real circuit",
      "Simulation versus real testing",
    ],
    keywords: ["simulation", "testing", "real", "circuit", "model"],
    answer:
      "Simulation is useful for understanding and checking design intent, but it cannot fully represent every real-world effect such as noise, tolerance, wiring resistance, thermal behavior, signal integrity or component variation. Real testing remains important.",
    priority: 10,
  },

  {
    id: "troubleshooting-documentation",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why should I document my circuit and code?",
    variations: [
      "Why should I document my circuit and code",
      "Why document electronics project",
      "How to keep track of wiring",
      "Why label wires and pins",
      "Documentation for debugging",
      "Documenting a project",
    ],
    keywords: ["documentation", "schematic", "wiring", "code", "debug"],
    answer:
      "Good documentation such as schematics, pin maps, wiring notes, code comments and version history makes debugging, modification and maintenance much easier. It also reduces the chance of repeating mistakes or miswiring during future work.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // POWER / SUPPLY
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-no-power",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "What should I check if my board has no power?",
    variations: [
      "What should I check if my board has no power",
      "Arduino has no power",
      "ESP32 will not turn on",
      "My board is dead",
      "Circuit is not receiving power",
      "Board not powering on",
    ],
    keywords: ["power", "board", "arduino", "esp32", "voltage"],
    answer:
      "Check the power source, polarity, cable, connector, supply voltage, current capability and ground connection. Measure the actual voltage at the board rather than assuming the supply is reaching it.",
    priority: 15,
  },

  {
    id: "troubleshooting-power-supply",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I choose a power supply for my project?",
    variations: [
      "How do I choose a power supply for my project",
      "What power supply do I need",
      "How many amps should my supply provide",
      "Can I use a phone charger",
      "How to size a power supply",
      "Power supply selection",
    ],
    keywords: ["power", "supply", "voltage", "current", "adapter"],
    answer:
      "Choose a supply with the correct voltage and enough current capability for the worst-case load, including startup or peak currents. Also consider connector type, polarity, regulation, noise and safety requirements. A supply that is too weak can cause resets, instability or overheating.",
    priority: 13,
  },

  {
    id: "troubleshooting-battery",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my battery-powered project not working?",
    variations: [
      "Why is my battery-powered project not working",
      "Battery dies quickly",
      "Project does not run on battery",
      "Battery voltage drops under load",
      "Battery powered circuit unstable",
      "Battery project issues",
    ],
    keywords: ["battery", "power", "voltage", "current", "runtime"],
    answer:
      "Check battery voltage under load, capacity, discharge current capability, regulator requirements and idle current consumption. A battery can show a normal open-circuit voltage but still be unable to supply the required current or maintain voltage during operation.",
    priority: 13,
  },

  {
    id: "troubleshooting-brownout",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my board reset when a motor or relay turns on?",
    variations: [
      "Why does my board reset when a motor or relay turns on",
      "Arduino resets when motor starts",
      "Arduino restarts with relay",
      "Board resets when load turns on",
      "Microcontroller resets when driving a load",
      "Resets when a load turns on",
    ],
    keywords: ["arduino", "reset", "motor", "relay", "load", "power"],
    answer:
      "Motors, relays and other inductive loads can cause voltage drops or electrical noise that disturb the microcontroller. Use a separate appropriately rated supply for the load, add decoupling, use a flyback diode where needed and ensure common ground and adequate current capability.",
    priority: 15,
  },

  {
    id: "troubleshooting-fuse-blowing",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my fuse keep blowing?",
    variations: [
      "Why does my fuse keep blowing",
      "Fuse blows immediately",
      "Why is my fuse burning out",
      "Fuse keeps blowing on power supply",
      "Circuit blows fuse",
      "Fuse keeps blowing",
    ],
    keywords: ["fuse", "blowing", "current", "short", "protection"],
    answer:
      "A repeatedly blowing fuse usually indicates excessive current, a short circuit, incorrect fuse rating, inrush current or a wiring fault. Investigate the cause rather than installing a larger fuse, which can remove protection and damage the circuit.",
    priority: 15,
  },

  {
    id: "troubleshooting-short-circuit",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I find a short circuit?",
    variations: [
      "How do I find a short circuit",
      "My circuit has a short",
      "Why is my board drawing too much current",
      "How to locate a short on a PCB",
      "Power supply goes into protection mode",
      "Finding a short",
    ],
    keywords: ["short", "circuit", "current", "protection", "continuity"],
    answer:
      "Disconnect power and use a multimeter in continuity or resistance mode to check for unexpected low-resistance paths between power and ground. Inspect solder bridges, damaged components, stray wire strands and connector faults. On a powered system, a short often causes excessive current, voltage collapse or protection shutdown.",
    priority: 15,
  },

  {
    id: "troubleshooting-reverse-polarity",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "What happens if I connect power backwards?",
    variations: [
      "What happens if I connect power backwards",
      "Reverse polarity damage",
      "I connected power the wrong way",
      "Board damaged by reverse voltage",
      "Why did my circuit stop after wrong wiring",
      "Reverse polarity effects",
    ],
    keywords: ["reverse", "polarity", "damage", "power", "protection"],
    answer:
      "Reverse polarity can damage components, destroy ICs or blow protection devices. Some circuits include reverse-polarity protection, but many do not. Disconnect power immediately if reverse polarity is suspected and inspect for damage before reapplying power.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // MICROCONTROLLER / FIRMWARE
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-serial",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is serial communication not working?",
    variations: [
      "Why is serial communication not working",
      "UART not working",
      "Serial monitor shows nothing",
      "Arduino serial communication problem",
      "Why can two devices not communicate over UART",
      "Serial communication issues",
    ],
    keywords: ["serial", "uart", "communication", "baud", "tx", "rx"],
    answer:
      "Check baud rate, TX/RX wiring, common ground, voltage levels, selected serial port and firmware configuration. TX from one device generally connects to RX of the other when using a conventional UART connection.",
    priority: 15,
  },

  {
    id: "troubleshooting-i2c",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my I2C device not detected?",
    variations: [
      "Why is my I2C device not detected",
      "I2C sensor not working",
      "I2C device not found",
      "Why does I2C scanner show nothing",
      "Arduino cannot detect I2C device",
      "I2C device detection issues",
    ],
    keywords: ["i2c", "sensor", "address", "sda", "scl"],
    answer:
      "Check SDA and SCL wiring, common ground, supply voltage, device address, pull-up resistors and whether the device actually supports I²C. Address conflicts can also prevent multiple devices from working correctly on the same bus.",
    priority: 15,
  },

  {
    id: "troubleshooting-spi",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my SPI device not working?",
    variations: [
      "Why is my SPI device not working",
      "SPI sensor not working",
      "SPI communication problem",
      "Why is my RFID SPI connection failing",
      "How do I troubleshoot SPI",
      "SPI device issues",
    ],
    keywords: ["spi", "communication", "mosi", "miso", "sck", "cs"],
    answer:
      "Check MOSI, MISO, clock and chip-select wiring, power, common ground and the SPI mode expected by the device. Also verify that the correct chip-select line and clock frequency are being used.",
    priority: 15,
  },

  {
    id: "troubleshooting-gpio",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my GPIO input unstable?",
    variations: [
      "Why is my GPIO input unstable",
      "GPIO keeps changing",
      "Digital input is random",
      "Input pin is floating",
      "Button gives random readings",
      "Unstable GPIO input",
    ],
    keywords: ["gpio", "input", "floating", "button", "pullup"],
    answer:
      "A GPIO input can behave unpredictably if it is electrically floating. Use an appropriate pull-up or pull-down configuration and ensure the signal has a defined logic level. Mechanical buttons may also require debouncing.",
    priority: 15,
  },

  {
    id: "troubleshooting-reset",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my microcontroller keep resetting?",
    variations: [
      "Why does my microcontroller keep resetting",
      "Arduino keeps restarting",
      "ESP32 randomly resets",
      "Microcontroller resets under load",
      "Why does my board reboot",
      "Microcontroller resetting",
    ],
    keywords: ["reset", "restart", "reboot", "arduino", "esp32", "power"],
    answer:
      "Common causes include unstable power, voltage drops, excessive current demand, electrical noise, watchdog resets, software faults and thermal issues. Check reset logs where available and measure the supply during the failure rather than only at idle.",
    priority: 15,
  },

  {
    id: "troubleshooting-upload",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why can I not upload firmware to my board?",
    variations: [
      "Why can I not upload firmware to my board",
      "Arduino code will not upload",
      "ESP32 upload failed",
      "Board not detected by computer",
      "Why does programming fail",
      "Firmware upload failure",
    ],
    keywords: ["upload", "firmware", "programming", "usb", "board"],
    answer:
      "Check the USB cable, selected board and port, drivers, boot/programming mode, power and any other software using the serial port. Also verify that the correct board configuration is selected in the development environment.",
    priority: 15,
  },

  {
    id: "troubleshooting-esp32-boot",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my ESP32 keep booting or restarting?",
    variations: [
      "Why does my ESP32 keep booting or restarting",
      "ESP32 boot loop",
      "ESP32 brownout reset",
      "ESP32 keeps restarting",
      "ESP32 not booting properly",
      "ESP32 boot issues",
    ],
    keywords: ["esp32", "boot", "reset", "brownout", "power"],
    answer:
      "Common causes include insufficient power supply current, brownout conditions, unstable USB power, floating boot pins or a firmware crash. Check the serial boot log, ensure a suitable power source, verify EN and BOOT pin states and confirm the firmware is not triggering a watchdog or exception.",
    priority: 15,
  },

  {
    id: "troubleshooting-software-bug",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I debug embedded firmware?",
    variations: [
      "How do I debug embedded firmware",
      "My code does not work",
      "Firmware bug debugging",
      "How to debug Arduino code",
      "Why is my program behaving incorrectly",
      "Debugging embedded firmware",
    ],
    keywords: ["debug", "firmware", "code", "bug", "logic"],
    answer:
      "Use serial logging, test inputs, controlled outputs, breakpoints where supported and systematic isolation of code paths. Confirm that hardware assumptions are correct, and test small parts of the program independently before combining them.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // SENSORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-sensor-reading",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my sensor giving wrong readings?",
    variations: [
      "Why is my sensor giving wrong readings",
      "Sensor values are incorrect",
      "My sensor reading is always the same",
      "Sensor output is not changing",
      "Why is my sensor inaccurate",
      "Wrong sensor readings",
    ],
    keywords: ["sensor", "reading", "wrong", "inaccurate", "value"],
    answer:
      "Check supply voltage, wiring, signal type, reference voltage, calibration and whether the sensor requires a specific warm-up or timing. For analog sensors, verify the ADC range and input limits. For digital sensors, verify the communication interface and configuration.",
    priority: 15,
  },

  {
    id: "troubleshooting-noise",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I reduce electrical noise in my circuit?",
    variations: [
      "How do I reduce electrical noise in my circuit",
      "My circuit has noise",
      "How to reduce interference",
      "Why is my signal noisy",
      "How to filter noise",
      "Reducing electrical noise",
    ],
    keywords: ["noise", "interference", "filter", "decoupling", "ground"],
    answer:
      "Use proper grounding, short signal paths, decoupling capacitors near ICs, twisted or shielded wiring where appropriate, filtering and separation of noisy loads from sensitive signals. The correct approach depends on the noise source and the affected signal.",
    priority: 15,
  },

  {
    id: "troubleshooting-ground-loop",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "What is a ground loop and why is it a problem?",
    variations: [
      "What is a ground loop and why is it a problem",
      "Ground loop noise",
      "Why do I have a ground loop",
      "How to fix ground loop",
      "Multiple ground paths causing noise",
      "Ground loop problems",
    ],
    keywords: ["ground", "loop", "noise", "hum", "reference"],
    answer:
      "A ground loop occurs when multiple ground paths create a closed loop, allowing circulating currents and voltage differences that can add noise or interference. Careful grounding, single-point references, isolation or appropriate signal conditioning can reduce the problem.",
    priority: 13,
  },

  {
    id: "troubleshooting-emi",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my circuit interfere with other devices?",
    variations: [
      "Why does my circuit interfere with other devices",
      "EMI from my project",
      "My circuit causes interference",
      "How to reduce electromagnetic interference",
      "Radio interference from electronics",
      "EMI from a project",
    ],
    keywords: ["emi", "interference", "noise", "radio", "shielding"],
    answer:
      "Switching supplies, motors, relays, long wires and fast digital signals can radiate or conduct interference. Proper layout, filtering, shielding, twisted pairs, snubbers and separation of noisy and sensitive circuits can reduce EMI depending on the source.",
    priority: 13,
  },

  {
    id: "troubleshooting-sensor-i2c",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my I2C sensor unstable?",
    variations: [
      "Why is my I2C sensor unstable",
      "I2C sensor drops out",
      "I2C bus locks up",
      "Sensor disappears on I2C",
      "I2C communication unstable",
      "Unstable I2C sensor",
    ],
    keywords: ["i2c", "sensor", "unstable", "lockup", "pullup"],
    answer:
      "Check pull-up resistor values, cable length, capacitance, supply stability and clock speed. Long wires or weak pull-ups can cause unreliable signaling, especially at higher speeds. Some sensors require specific initialization or warm-up.",
    priority: 13,
  },

  {
    id: "troubleshooting-analog-noise",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my analog sensor reading noisy?",
    variations: [
      "Why is my analog sensor reading noisy",
      "ADC reading jumps",
      "Analog input unstable",
      "Sensor value fluctuates",
      "Noisy analog signal",
      "Analog sensor noise",
    ],
    keywords: ["analog", "sensor", "noisy", "adc", "filter"],
    answer:
      "Common causes include unstable supply, ground noise, long wires, high source impedance and reference instability. Filtering, averaging, using a lower-impedance source and improving grounding usually help.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // ACTUATORS / MOTORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-relay",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my relay not switching?",
    variations: [
      "Why is my relay not switching",
      "Relay does not click",
      "Relay module not working",
      "Can not control relay with Arduino",
      "Relay stays on or off",
      "Relay switching issues",
    ],
    keywords: ["relay", "switch", "click", "arduino", "module"],
    answer:
      "Check the relay module supply voltage, input signal level, active-high or active-low logic, wiring and whether the microcontroller pin can drive the module input. Also verify the relay contacts and load circuit are connected correctly and rated for the load.",
    priority: 13,
  },

  {
    id: "troubleshooting-motor",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my motor not running?",
    variations: [
      "Why is my motor not running",
      "Motor does not spin",
      "DC motor not working",
      "Stepper motor not moving",
      "Servo not responding",
      "Motor not running",
    ],
    keywords: ["motor", "spin", "driver", "power", "control"],
    answer:
      "Check the motor supply, driver, control signals, common ground and wiring. Many motors require a driver because a GPIO pin cannot supply enough current. For steppers and servos, verify the control pulses, step sequence and power requirements.",
    priority: 15,
  },

  {
    id: "troubleshooting-motor-reset",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my board reset when the motor starts?",
    variations: [
      "Why does my board reset when the motor starts",
      "Arduino resets when motor starts",
      "Motor causes reset",
      "Board restarts when motor runs",
      "Motor inrush causes reset",
      "Motor reset problem",
    ],
    keywords: ["motor", "reset", "board", "inrush", "power"],
    answer:
      "Motor startup current can cause supply voltage drops or noise that resets the microcontroller. Use a separate supply for the motor if possible, add bulk capacitance, ensure adequate current capability and keep logic and motor wiring separated.",
    priority: 15,
  },

  {
    id: "troubleshooting-stepper-missing-steps",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my stepper motor losing steps?",
    variations: [
      "Why is my stepper motor losing steps",
      "Stepper missing steps",
      "Stepper skips steps",
      "Stepper not accurate",
      "Stepper loses position",
      "Stepper missing steps",
    ],
    keywords: ["stepper", "missing", "steps", "motor", "position"],
    answer:
      "Missing steps can be caused by insufficient current, excessive speed, mechanical binding, acceleration too high or driver limitations. Adjust current within the motor rating, reduce speed or improve mechanics.",
    priority: 13,
  },

  {
    id: "troubleshooting-servo",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my servo jitter or reset the board?",
    variations: [
      "Why does my servo jitter or reset the board",
      "Servo jitter",
      "Servo resets Arduino",
      "Servo power problem",
      "Servo unstable",
      "Servo jitter or reset",
    ],
    keywords: ["servo", "power", "jitter", "reset", "supply"],
    answer:
      "Servos can draw significant current, especially under load. If powered from the same supply as the microcontroller, voltage drops can cause resets or jitter. Use a separate, adequately rated supply with common ground.",
    priority: 15,
  },

  {
    id: "troubleshooting-motor-overheat",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my motor or driver get hot?",
    variations: [
      "Why does my motor or driver get hot",
      "Motor driver overheating",
      "Motor getting hot",
      "Why is my driver hot",
      "Motor heat problem",
      "Motor or driver overheating",
    ],
    keywords: ["motor", "driver", "hot", "overheating", "current"],
    answer:
      "Excessive heat usually indicates current too high, insufficient cooling or a load that exceeds the motor/driver's rating. Verify the rated current, use appropriate heatsinking or airflow and consider reducing duty cycle.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PCB / SOLDERING
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-solder-joint",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I know if a solder joint is bad?",
    variations: [
      "How do I know if a solder joint is bad",
      "Cold solder joint symptoms",
      "Why is my solder connection unreliable",
      "How to check solder joints",
      "Intermittent connection on PCB",
      "Bad solder joint",
    ],
    keywords: ["solder", "joint", "cold", "connection", "pcb"],
    answer:
      "A good solder joint is usually smooth and shiny with a proper fillet. A cold or poor joint may look dull, lumpy, cracked or ball-shaped, and can cause intermittent connections. Reflowing the joint with proper heat and solder often fixes the problem.",
    priority: 13,
  },

  {
    id: "troubleshooting-connector",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my circuit work when I press on a connector?",
    variations: [
      "Why does my circuit work when I press on a connector",
      "Loose connector problem",
      "Connector intermittent",
      "Pressing board makes it work",
      "Bad connection in wiring",
      "Intermittent connector",
    ],
    keywords: ["connector", "loose", "intermittent", "contact", "wiring"],
    answer:
      "That behavior strongly suggests a loose, dirty, cracked or poorly soldered connection. Inspect connectors, headers, solder joints and wire terminations. Re-seat or replace the faulty connection rather than relying on pressure to maintain contact.",
    priority: 15,
  },

  {
    id: "troubleshooting-intermittent",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my project work sometimes and fail sometimes?",
    variations: [
      "Why does my project work sometimes and fail sometimes",
      "My circuit works intermittently",
      "Device randomly stops working",
      "Why is my electronics project unreliable",
      "Sometimes it works sometimes it does not",
      "Intermittent failures",
    ],
    keywords: ["intermittent", "random", "unstable", "reliable", "connection"],
    answer:
      "Intermittent problems often come from loose connections, unstable power, electrical noise, timing issues, floating inputs, marginal component ratings or environmental conditions. Reproduce the failure consistently and isolate each subsystem systematically.",
    priority: 15,
  },

  {
    id: "troubleshooting-replace-component",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I know if a component is damaged?",
    variations: [
      "How do I know if a component is damaged",
      "How to test if a component is dead",
      "Component failure symptoms",
      "How to check a burned component",
      "Is my IC damaged",
      "Damaged component detection",
    ],
    keywords: ["component", "damaged", "test", "failure", "replace"],
    answer:
      "Visual signs include burning, cracks, bulging or discoloration. Electrical testing depends on the component type and may require removing it from the circuit. Comparing behavior with a known-good component or substituting a replacement can help confirm a fault.",
    priority: 13,
  },

  {
    id: "troubleshooting-fake-components",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why do some of my components behave differently?",
    variations: [
      "Why do some of my components behave differently",
      "Counterfeit components symptoms",
      "Fake IC problems",
      "Component behaves unexpectedly",
      "Inconsistent component behavior",
      "Suspicious components",
    ],
    keywords: ["counterfeit", "fake", "component", "inconsistent", "symptoms"],
    answer:
      "Counterfeit or out-of-spec components can behave inconsistently, fail early or perform worse than expected. Buy from reputable suppliers, test samples, and be cautious of unusually low prices or inconsistent markings.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DISPLAYS / INDICATORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-display",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my display not working?",
    variations: [
      "Why is my display not working",
      "LCD not showing anything",
      "OLED display blank",
      "Display shows garbage",
      "Why is my screen not turning on",
      "Display problems",
    ],
    keywords: ["display", "lcd", "oled", "screen", "blank", "garbage"],
    answer:
      "Check power, ground, communication interface, contrast or brightness settings, pin assignments and library configuration. A blank display may be a power or initialization issue, while garbage output often indicates a wiring, baud, address or timing problem.",
    priority: 13,
  },

  {
    id: "troubleshooting-led",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my LED not lighting up?",
    variations: [
      "Why is my LED not lighting up",
      "LED not working",
      "LED is dim",
      "Why does my LED burn out",
      "LED does not turn on",
      "LED problems",
    ],
    keywords: ["led", "light", "resistor", "current", "polarity"],
    answer:
      "Check polarity, resistor value, driving current, pin assignment and supply voltage. An LED without a current-limiting resistor can burn out quickly, and reversed polarity prevents it from lighting.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // COMMUNICATION / WIRELESS
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-communication",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why can two devices not communicate?",
    variations: [
      "Why can two devices not communicate",
      "Modules cannot talk to each other",
      "Communication between devices failing",
      "Why is my data link not working",
      "Two boards not communicating",
      "Device communication failure",
    ],
    keywords: ["communication", "devices", "protocol", "wiring", "ground"],
    answer:
      "Verify the protocol, wiring, logic levels, common ground, baud or clock settings, addressing and power. Both devices must agree on the communication parameters and must be electrically compatible, or level shifting or isolation may be required.",
    priority: 15,
  },

  {
    id: "troubleshooting-wifi",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my device not connecting to WiFi?",
    variations: [
      "Why is my device not connecting to WiFi",
      "ESP32 WiFi not connecting",
      "WiFi connection failed",
      "Cannot connect to WiFi",
      "WiFi unstable",
      "WiFi connection issues",
    ],
    keywords: ["wifi", "connect", "esp32", "network", "ssid"],
    answer:
      "Check the SSID, password, signal strength, router band, security type and whether the device supports the required frequency band. Verify firmware configuration, power stability and any access restrictions on the network.",
    priority: 15,
  },

  {
    id: "troubleshooting-bluetooth",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my Bluetooth not working?",
    variations: [
      "Why is my Bluetooth not working",
      "Bluetooth not connecting",
      "BLE connection failed",
      "Cannot pair Bluetooth device",
      "Bluetooth unstable",
      "Bluetooth connection issues",
    ],
    keywords: ["bluetooth", "ble", "pair", "connection", "advertise"],
    answer:
      "Check pairing mode, distance, interference, firmware configuration and device compatibility. Classic Bluetooth and BLE have different profiles and connection procedures, so ensure both devices are using the same technology and profile.",
    priority: 13,
  },

  {
    id: "troubleshooting-mqtt",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my MQTT connection failing?",
    variations: [
      "Why is my MQTT connection failing",
      "MQTT not connecting",
      "ESP32 MQTT failure",
      "Cannot connect to broker",
      "MQTT disconnects",
      "MQTT connection problems",
    ],
    keywords: ["mqtt", "broker", "connect", "iot", "network"],
    answer:
      "Verify broker address, port, credentials, TLS settings, client ID and topic permissions. Check network connectivity, DNS resolution and whether the broker is reachable. Logs on both the device and broker help identify the specific cause.",
    priority: 13,
  },

  {
    id: "troubleshooting-nrf24",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my nRF24 not communicating?",
    variations: [
      "Why is my nRF24 not communicating",
      "nRF24 not working",
      "nRF24L01 communication failure",
      "RF module not transmitting",
      "nRF24 problems",
      "nRF24 issues",
    ],
    keywords: ["nrf24", "rf", "communication", "wireless", "module"],
    answer:
      "Check SPI wiring, power supply quality, antenna, common ground, channel and address settings. The nRF24 is sensitive to power noise, so adding a decoupling capacitor across the module supply often improves reliability.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // THERMAL / MECHANICAL / ENVIRONMENTAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-overheating",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my electronic component overheating?",
    variations: [
      "Why is my electronic component overheating",
      "Why is my chip getting hot",
      "Why does my regulator overheat",
      "Why is my MOSFET hot",
      "Electronic component too hot",
      "Component overheating",
    ],
    keywords: [
      "hot",
      "heat",
      "overheating",
      "regulator",
      "mosfet",
      "component",
    ],
    answer:
      "Excessive heat can result from too much current, excessive voltage drop, insufficient cooling, incorrect component selection, switching losses or a fault condition. Check power dissipation and operating ratings against the actual circuit conditions.",
    priority: 15,
  },

  {
    id: "troubleshooting-thermal",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I troubleshoot a thermal problem?",
    variations: [
      "How do I troubleshoot a thermal problem",
      "Circuit gets hot over time",
      "Why does it fail when warm",
      "Thermal shutdown issue",
      "Component works cold but not hot",
      "Thermal troubleshooting",
    ],
    keywords: ["thermal", "heat", "temperature", "shutdown", "failure"],
    answer:
      "Check power dissipation, airflow, ambient temperature, component ratings and thermal paths. Some devices reduce performance or shut down when hot. Measuring temperature and supply current under load can help identify whether the issue is thermal or related to another fault.",
    priority: 13,
  },

  {
    id: "troubleshooting-esd",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Can static electricity damage my components?",
    variations: [
      "Can static electricity damage my components",
      "ESD damage electronics",
      "How to prevent static damage",
      "Do I need ESD protection",
      "Component damaged by static",
      "ESD damage",
    ],
    keywords: ["esd", "static", "damage", "protection", "component"],
    answer:
      "Yes. Electrostatic discharge can damage or degrade sensitive components, sometimes without immediate visible signs. Use proper grounding, anti-static mats or wrist straps where appropriate and handle boards by their edges when possible.",
    priority: 13,
  },

  {
    id: "troubleshooting-wire-gauge",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Does wire thickness matter in a circuit?",
    variations: [
      "Does wire thickness matter in a circuit",
      "What wire gauge should I use",
      "Why is my wire getting hot",
      "Can thin wire cause voltage drop",
      "Wire size for current",
      "Wire thickness effects",
    ],
    keywords: ["wire", "gauge", "thickness", "current", "voltage drop"],
    answer:
      "Yes. Wire must be able to carry the expected current without excessive heating or voltage drop. Thin wires have higher resistance, which can cause voltage drops and heating, especially in power and motor circuits.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SOFTWARE / TOOLS
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-arduino-driver",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my board not recognized by the computer?",
    variations: [
      "Why is my board not recognized by the computer",
      "Arduino not detected",
      "USB device not recognized",
      "Board not showing in IDE",
      "Driver problem board",
      "Board not detected",
    ],
    keywords: ["board", "usb", "driver", "detected", "computer"],
    answer:
      "Check the USB cable (some are power-only), install the correct driver, try a different USB port and verify the board is powered. On some boards, the boot mode may need to be selected.",
    priority: 13,
  },

  {
    id: "troubleshooting-compile-error",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my code not compile?",
    variations: [
      "Why does my code not compile",
      "Arduino compile error",
      "Firmware build fails",
      "Compilation error",
      "Build error embedded",
      "Code compile issues",
    ],
    keywords: ["compile", "build", "error", "code", "firmware"],
    answer:
      "Read the first error reported, as later messages are often consequences. Check library versions, missing dependencies, syntax errors and correct board selection. Clear build caches when the toolchain behaves unexpectedly.",
    priority: 13,
  },

  {
    id: "troubleshooting-upload-port",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is the wrong port selected when uploading?",
    variations: [
      "Why is the wrong port selected when uploading",
      "Wrong COM port Arduino",
      "Cannot find port",
      "Port not showing",
      "Multiple ports listed",
      "Upload port issues",
    ],
    keywords: ["port", "upload", "com", "serial", "board"],
    answer:
      "Disconnect other USB serial devices, check the device manager or IDE port list and select the port that appears when the board is connected. Some boards require a driver installation for the correct port to appear.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // POWER INTEGRITY / SIGNAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-capacitor",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does adding a capacitor help unstable circuits?",
    variations: [
      "Why does adding a capacitor help unstable circuits",
      "Why add capacitor to power supply",
      "How does capacitor stabilize voltage",
      "Decoupling capacitor purpose",
      "Why capacitor near IC",
      "Capacitor stabilizing circuits",
    ],
    keywords: ["capacitor", "stability", "decoupling", "power", "voltage"],
    answer:
      "Capacitors can supply charge quickly during transient current demands and help filter noise on power rails. Decoupling capacitors placed near ICs reduce local voltage fluctuations, which can improve stability in digital and mixed-signal circuits.",
    priority: 13,
  },

  {
    id: "troubleshooting-grounding",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is grounding important for stable operation?",
    variations: [
      "Why is grounding important for stable operation",
      "Poor grounding symptoms",
      "Ground noise issues",
      "Why common ground matters",
      "Grounding problems",
      "Grounding stability",
    ],
    keywords: ["ground", "grounding", "noise", "stability", "reference"],
    answer:
      "Ground provides the reference for signals and the return path for currents. Poor grounding causes noise, unstable readings, resets and communication errors. Short, low-impedance ground connections and a proper ground plane reduce these issues.",
    priority: 13,
  },

  {
    id: "troubleshooting-current-limiting",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "When should I use a current-limited supply for testing?",
    variations: [
      "When should I use a current-limited supply for testing",
      "Current limited bench supply",
      "Testing with current limit",
      "Protect circuit during testing",
      "Current limited power supply",
      "Using current limit for testing",
    ],
    keywords: ["current", "limit", "supply", "testing", "protection"],
    answer:
      "Use a current-limited supply whenever testing a new or suspect circuit. It protects against shorts, wiring mistakes and unexpected current draw, and it helps identify faults by limiting damage.",
    priority: 13,
  },

  {
    id: "troubleshooting-voltage-drop",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is the voltage lower at the load than at the supply?",
    variations: [
      "Why is the voltage lower at the load than at the supply",
      "Voltage drop problem",
      "Load voltage too low",
      "Why does voltage drop under load",
      "Voltage drop diagnosis",
      "Voltage lower than expected",
    ],
    keywords: ["voltage", "drop", "load", "wire", "resistance"],
    answer:
      "Voltage drops across wiring, connectors and components carrying current. Thin wires, poor connections, long cables and high current cause larger drops. Measuring the voltage at multiple points helps localize where the drop occurs.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PCB-LEVEL
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-pcb-trace",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "What should I check if a PCB trace is suspected broken?",
    variations: [
      "What should I check if a PCB trace is suspected broken",
      "Broken PCB trace",
      "How to check PCB trace continuity",
      "Trace damage diagnosis",
      "PCB trace failure",
      "Broken trace diagnosis",
    ],
    keywords: ["pcb", "trace", "broken", "continuity", "diagnosis"],
    answer:
      "Use continuity mode on a multimeter to test the suspected trace. Visually inspect for cracks, corrosion or poor soldering. If the trace is broken, it can often be repaired with a jumper wire or by reflowing the break.",
    priority: 13,
  },

  {
    id: "troubleshooting-cold-joint-pcb",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I rework a bad solder joint on a PCB?",
    variations: [
      "How do I rework a bad solder joint on a PCB",
      "Rework solder joint",
      "Fix cold solder joint",
      "Reflow bad joint",
      "Repair solder connection",
      "Solder joint rework",
    ],
    keywords: ["solder", "joint", "rework", "pcb", "repair"],
    answer:
      "Clean and flux the joint, apply enough heat with a suitable tip and add fresh solder if needed. The joint should form a smooth fillet. Avoid excessive heat that could damage pads or nearby components.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // AUTOMATION / SYSTEM LEVEL
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-automation",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I debug an automation system?",
    variations: [
      "How do I debug an automation system",
      "Automation not working",
      "How to troubleshoot control system",
      "Why is my automated system failing",
      "Debug PLC or microcontroller automation",
      "Automation debugging",
    ],
    keywords: ["debug", "automation", "troubleshoot", "control", "logic"],
    answer:
      "Verify inputs, outputs, power and communication first, then trace the control logic step by step. Use status indicators, logs or test modes where available, and test each subsystem independently before running the complete sequence.",
    priority: 15,
  },

  {
    id: "troubleshooting-safety-interlock",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my safety interlock preventing operation?",
    variations: [
      "Why is my safety interlock preventing operation",
      "Interlock triggered",
      "Machine won't start interlock",
      "Safety system preventing operation",
      "Interlock fault",
      "Interlock preventing operation",
    ],
    keywords: ["interlock", "safety", "prevent", "operation", "fault"],
    answer:
      "An interlock stops operation when a safety condition is not met. Check the sensors, switches and logic used by the interlock, and verify that all required conditions are actually satisfied. Do not bypass interlocks; find the underlying cause.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PROCESS / WORKFLOW
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-reliability",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I make my circuit more reliable?",
    variations: [
      "How do I make my circuit more reliable",
      "How to improve reliability",
      "Why does my project keep failing",
      "How to make electronics robust",
      "Design for reliability tips",
      "Circuit reliability",
    ],
    keywords: ["reliability", "robust", "failure", "design", "protection"],
    answer:
      "Use components within their ratings, include appropriate protection, provide stable power, manage heat, secure connections, minimize noise and test under realistic conditions. Reliability often comes from careful design margins and thorough testing rather than from a single change.",
    priority: 13,
  },

  {
    id: "troubleshooting-aging",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my circuit fail after some time?",
    variations: [
      "Why does my circuit fail after some time",
      "Circuit fails over time",
      "Intermittent after running",
      "Why does my project degrade",
      "Aging failures",
      "Circuit aging failure",
    ],
    keywords: ["aging", "failure", "time", "degrade", "intermittent"],
    answer:
      "Aging can be caused by thermal stress, voltage stress, electrolytic capacitor wear, solder fatigue, contamination or mechanical vibration. Long-duration tests and inspection help identify components or joints that degrade over time.",
    priority: 13,
  },

  {
    id: "troubleshooting-systematic-isolation",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I isolate a fault between hardware and firmware?",
    variations: [
      "How do I isolate a fault between hardware and firmware",
      "Hardware or software fault",
      "Is it my code or circuit",
      "Isolate hardware software bug",
      "Hardware firmware bug isolation",
      "Isolating hardware vs software",
    ],
    keywords: ["hardware", "firmware", "isolate", "fault", "debug"],
    answer:
      "Test hardware with a known-good program and test the firmware on known-good hardware. If behavior changes with only one of these variables, the fault is likely in the other. Serial logs and test points help confirm the boundary.",
    priority: 13,
  },

  {
    id: "troubleshooting-field-failure",
    category: "troubleshooting",
    intent: "troubleshooting",
    question:
      "What should I do if my project works on the bench but fails in the field?",
    variations: [
      "What should I do if my project works on the bench but fails in the field",
      "Works on bench fails in field",
      "Field failure diagnosis",
      "Bench vs field failure",
      "Why does it fail in the field",
      "Field failure troubleshooting",
    ],
    keywords: ["field", "failure", "bench", "environment", "diagnosis"],
    answer:
      "Consider environmental factors such as temperature, humidity, vibration, power quality, EMI, enclosure fit and user behavior. Logging, monitoring and reproducing field conditions on the bench help identify the cause.",
    priority: 13,
  },

  {
    id: "troubleshooting-cost",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I minimize debugging time?",
    variations: [
      "How do I minimize debugging time",
      "Debug faster",
      "Reduce troubleshooting time",
      "Efficient debugging",
      "Speed up debugging",
      "Faster troubleshooting",
    ],
    keywords: ["debug", "time", "efficient", "troubleshooting", "process"],
    answer:
      "Test in stages, document your design, keep a working reference, log important events, isolate subsystems and change one thing at a time. Planning for testability in the original design usually has the biggest impact.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SPECIFIC COMMON SCENARIOS
  // ─────────────────────────────────────────────────────────────
  {
    id: "troubleshooting-board-dead",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "My board is dead. How do I know if it can be repaired?",
    variations: [
      "My board is dead. How do I know if it can be repaired",
      "Dead board diagnosis",
      "Can I fix a dead board",
      "Board not working after fault",
      "Repair dead board",
      "Dead board assessment",
    ],
    keywords: ["board", "dead", "repair", "diagnosis", "fault"],
    answer:
      "Check for visible damage, shorts, burnt components and reverse polarity. Measure the supply rails. If the fault is limited to a component or a trace, it is often repairable. If the MCU or multiple components are damaged, repair may not be economical.",
    priority: 13,
  },

  {
    id: "troubleshooting-first-flash",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "What should I do if my firmware does not run after flashing?",
    variations: [
      "What should I do if my firmware does not run after flashing",
      "Firmware does not start",
      "Board does not run new code",
      "Flash succeeded but no output",
      "Firmware not running",
      "Firmware not starting after flash",
    ],
    keywords: ["firmware", "flash", "run", "output", "boot"],
    answer:
      "Verify the boot mode, reset the board, check power and confirm the correct firmware was uploaded. Look at serial boot messages and check for a watchdog or hard fault. Confirm that the code is running from the expected flash region.",
    priority: 13,
  },

  {
    id: "troubleshooting-i2c-lockup",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my I2C bus lock up?",
    variations: [
      "Why does my I2C bus lock up",
      "I2C hangs",
      "I2C bus stuck",
      "I2C dead after error",
      "I2C lockup",
      "I2C bus problems",
    ],
    keywords: ["i2c", "lock", "hang", "stuck", "bus"],
    answer:
      "Bus lockups can happen when a slave holds SDA low, when an interrupt occurs mid-transaction or when a device glitches. Clock stretching, power glitches and shared-bus conflicts are common causes. Recovery may require a bus reset sequence.",
    priority: 13,
  },

  {
    id: "troubleshooting-bootloop",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my device stuck in a boot loop?",
    variations: [
      "Why is my device stuck in a boot loop",
      "Boot loop problem",
      "Device keeps restarting",
      "Reboot loop embedded",
      "Firmware boot loop",
      "Boot loop",
    ],
    keywords: ["boot", "loop", "reset", "firmware", "power"],
    answer:
      "Boot loops are usually caused by power issues, brownout, firmware faults, watchdog resets or corrupted flash. Check the reset cause, power stability and firmware state. A recovery bootloader or factory image may be needed.",
    priority: 13,
  },

  {
    id: "troubleshooting-flickering",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my LED or display flicker?",
    variations: [
      "Why does my LED or display flicker",
      "LED flickers",
      "Display flickers",
      "Screen flickering",
      "Lights flicker",
      "Flickering output",
    ],
    keywords: ["flicker", "led", "display", "pwm", "refresh"],
    answer:
      "Flicker can be caused by low PWM frequency, unstable power, insufficient refresh rate, poor ground or noise on signal lines. Increasing PWM frequency, improving supply decoupling and refreshing the display properly usually help.",
    priority: 13,
  },

  {
    id: "troubleshooting-servo-twitch",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my servo twitch or move unexpectedly?",
    variations: [
      "Why does my servo twitch or move unexpectedly",
      "Servo twitching",
      "Servo moves randomly",
      "Servo wrong position",
      "Servo unexpected movement",
      "Servo twitch",
    ],
    keywords: ["servo", "twitch", "random", "power", "signal"],
    answer:
      "Power instability, shared supply with logic, signal noise or incorrect pulse timing commonly cause servo twitching. Use a dedicated supply, add decoupling, ensure common ground and verify the servo pulse range.",
    priority: 13,
  },

  {
    id: "troubleshooting-bluetooth-ble",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my BLE connection dropping?",
    variations: [
      "Why is my BLE connection dropping",
      "BLE disconnects",
      "Bluetooth disconnection",
      "BLE unstable",
      "Connection drops BLE",
      "BLE disconnect problem",
    ],
    keywords: ["ble", "disconnect", "drop", "connection", "bluetooth"],
    answer:
      "BLE drops can result from distance, interference, connection parameters, power saving or firmware bugs. Check supervision timeout, connection interval and any behavior that could block the radio or reset the stack.",
    priority: 13,
  },

  {
    id: "troubleshooting-power-rail",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my power rail voltage unstable?",
    variations: [
      "Why is my power rail voltage unstable",
      "Unstable power rail",
      "Voltage fluctuates",
      "Rail noise",
      "Power rail ripple",
      "Power rail problems",
    ],
    keywords: ["power", "rail", "unstable", "voltage", "ripple"],
    answer:
      "Rail instability can come from inadequate bulk capacitance, insufficient regulator headroom, high load transients, long wires, feedback issues or thermal problems. Scope the rail under load to see the actual behavior.",
    priority: 13,
  },

  {
    id: "troubleshooting-reset-cause",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I determine the reset cause of a microcontroller?",
    variations: [
      "How do I determine the reset cause of a microcontroller",
      "Reset cause diagnosis",
      "Why did my board reset",
      "Reset source MCU",
      "Determine reset cause",
      "Reset diagnosis",
    ],
    keywords: ["reset", "cause", "diagnosis", "mcu", "firmware"],
    answer:
      "Most microcontrollers provide reset status registers that indicate power-on, external reset, watchdog, brownout or software reset. Firmware can read and log these at startup to help identify the source.",
    priority: 13,
  },

  {
    id: "troubleshooting-spi-signal",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my SPI signal distorted?",
    variations: [
      "Why is my SPI signal distorted",
      "SPI signal quality",
      "SPI ringing",
      "SPI clock too fast",
      "SPI waveform problems",
      "SPI signal issues",
    ],
    keywords: ["spi", "signal", "distorted", "ringing", "clock"],
    answer:
      "SPI signal distortion often comes from long wires, high clock speed, impedance mismatch or poor grounding. Reducing clock speed, shortening traces and adding series resistors can improve signal quality.",
    priority: 13,
  },

  {
    id: "troubleshooting-microcontroller-hang",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my microcontroller hanging?",
    variations: [
      "Why is my microcontroller hanging",
      "MCU freezes",
      "Microcontroller stuck",
      "Firmware lockup",
      "MCU stops responding",
      "Microcontroller hang",
    ],
    keywords: ["mcu", "hang", "freeze", "stuck", "firmware"],
    answer:
      "Common causes include infinite loops, blocked waits, unhandled interrupts, watchdog problems or hardware faults. Debugging with logs, a watchdog and a debugger usually helps identify where execution is stuck.",
    priority: 13,
  },

  {
    id: "troubleshooting-memory-corruption",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I detect memory corruption in firmware?",
    variations: [
      "How do I detect memory corruption in firmware",
      "Memory corruption detection",
      "Variable changes unexpectedly",
      "Buffer overflow symptoms",
      "Stack corruption diagnosis",
      "Memory corruption",
    ],
    keywords: ["memory", "corruption", "buffer", "overflow", "firmware"],
    answer:
      "Symptoms include variables changing unexpectedly, hard faults, random resets and corrupted data. Stack overflow, buffer overruns and dangling pointers are common causes. Guard patterns, bounds checks and debug tooling help locate the source.",
    priority: 13,
  },

  {
    id: "troubleshooting-overtemperature",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my system shut down when it gets hot?",
    variations: [
      "Why does my system shut down when it gets hot",
      "Overheat shutdown",
      "Thermal protection trip",
      "System shuts down when hot",
      "Overtemperature shutdown",
      "Thermal shutdown",
    ],
    keywords: ["thermal", "shutdown", "hot", "protection", "system"],
    answer:
      "Many systems include thermal protection that disables outputs when a temperature limit is exceeded. Improve cooling, reduce power dissipation or use higher-rated components. Do not disable thermal protection without redesigning the thermal path.",
    priority: 13,
  },

  {
    id: "troubleshooting-brownout-detect",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "How do I know if my device is brownout resetting?",
    variations: [
      "How do I know if my device is brownout resetting",
      "Brownout reset detection",
      "Low voltage reset diagnosis",
      "Device resets under load",
      "Brownout detection",
      "Brownout diagnosis",
    ],
    keywords: ["brownout", "reset", "voltage", "detection", "diagnosis"],
    answer:
      "Most microcontrollers record the last reset cause. If the cause is brownout, the supply voltage likely dropped below a safe threshold, especially under load or during power transitions. Measure the rail during the failure to confirm.",
    priority: 13,
  },

  {
    id: "troubleshooting-rc-filter",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "When should I add an RC filter to a signal?",
    variations: [
      "When should I add an RC filter to a signal",
      "RC filter noise",
      "Signal filtering RC",
      "Reduce noise with RC",
      "RC filter purpose",
      "RC filter use",
    ],
    keywords: ["rc", "filter", "signal", "noise", "analog"],
    answer:
      "RC filters are useful when a signal is slow and noise is high-frequency. They can be placed on analog inputs, buttons and power rails. The cutoff must be chosen so real signal changes are preserved while noise is attenuated.",
    priority: 13,
  },

  {
    id: "troubleshooting-debounce",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my button or switch trigger multiple times?",
    variations: [
      "Why does my button or switch trigger multiple times",
      "Button triggers twice",
      "Switch bounces",
      "Button multiple presses",
      "Switch debounce problem",
      "Button bounce",
    ],
    keywords: ["button", "switch", "debounce", "bounce", "input"],
    answer:
      "Mechanical switches bounce, producing multiple transitions for a single press. Debouncing in hardware or firmware is required to register only one event.",
    priority: 13,
  },

  {
    id: "troubleshooting-bootloader",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my board not enter the bootloader?",
    variations: [
      "Why does my board not enter the bootloader",
      "Bootloader not starting",
      "Cannot enter boot mode",
      "Board stuck in application",
      "Bootloader entry problem",
      "Bootloader issues",
    ],
    keywords: ["bootloader", "boot", "mode", "entry", "board"],
    answer:
      "Bootloader entry is usually triggered by a button, pin state or timeout. Check the boot pin or button, the reset sequence and firmware behavior. Some bootloaders are overwritten or disabled, requiring a hardware programmer.",
    priority: 13,
  },

  {
    id: "troubleshooting-comms-noisy",
    category: "troubleshooting",
    intent: "troubleshooting",
    question:
      "Why does my communication fail when motors or relays are running?",
    variations: [
      "Why does my communication fail when motors or relays are running",
      "Communication fails with motors",
      "Relay causes communication noise",
      "Data errors when motor runs",
      "Motor noise affecting communication",
      "Communication noise from loads",
    ],
    keywords: ["communication", "noise", "motor", "relay", "load"],
    answer:
      "Motors and relays generate electrical noise that can couple into signal lines. Use proper grounding, twisted or shielded wires, filtering, snubbers and separation of noisy and sensitive signals.",
    priority: 13,
  },

  {
    id: "troubleshooting-antenna",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why is my wireless range poor?",
    variations: [
      "Why is my wireless range poor",
      "Poor wireless range",
      "Short RF range",
      "WiFi range problem",
      "RF module range poor",
      "Wireless range issues",
    ],
    keywords: ["wireless", "range", "rf", "antenna", "signal"],
    answer:
      "Range can be reduced by obstructions, interference, antenna design, ground plane, power or protocol settings. Verify antenna is appropriate for the frequency, is not blocked and is properly matched to the module.",
    priority: 13,
  },

  {
    id: "troubleshooting-calibration-drift",
    category: "troubleshooting",
    intent: "troubleshooting",
    question: "Why does my sensor reading drift over time?",
    variations: [
      "Why does my sensor reading drift over time",
      "Sensor drift over time",
      "Reading changes slowly",
      "Sensor long term drift",
      "Drifting sensor value",
      "Sensor drift diagnosis",
    ],
    keywords: ["sensor", "drift", "time", "calibration", "temperature"],
    answer:
      "Drift can come from temperature changes, aging, power instability, contamination or reference drift. Periodic recalibration, temperature compensation and stable power improve long-term accuracy.",
    priority: 13,
  },
];
