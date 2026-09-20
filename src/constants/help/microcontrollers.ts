import type { HelpEntry } from "./types";

export const MICROCONTROLLER_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // CANONICAL DEFINITIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-what-is",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a microcontroller?",
    variations: [
      "What is a microcontroller",
      "Explain microcontroller",
      "What is an MCU",
      "What does a microcontroller do",
      "How does an embedded controller work",
      "Define microcontroller",
      "What is a microcontroller used for",
      "Difference between microcontroller and microprocessor",
    ],
    keywords: [
      "microcontroller",
      "mcu",
      "embedded",
      "controller",
      "processor",
      "memory",
      "gpio",
    ],
    answer:
      "A microcontroller is a programmable integrated circuit containing a processor, memory and peripherals such as GPIO, timers and communication interfaces. It reads inputs, executes logic and controls outputs in embedded systems.",
    priority: 14,
  },

  {
    id: "mcu-arduino",
    category: "microcontrollers",
    intent: "definition",
    question: "What is Arduino?",
    variations: [
      "What is an Arduino board?",
      "What is the Arduino platform?",
      "Tell me about Arduino",
      "Explain Arduino",
      "What does Arduino mean?",
    ],
    keywords: [
      "arduino",
      "board",
      "platform",
      "microcontroller",
      "development",
      "embedded",
    ],
    answer:
      "Arduino is an open-source electronics platform built around development boards that use microcontrollers. It provides a straightforward environment for writing programs, connecting electronic components, reading sensors and controlling outputs. Arduino is widely used for learning, prototyping, automation, robotics and embedded projects.",
    priority: 20,
  },

  {
    id: "mcu-arduino-capability",
    category: "microcontrollers",
    intent: "capability",
    question: "What can Arduino do?",
    variations: [
      "What can it do?",
      "What can Arduino be used for?",
      "What can I do with Arduino?",
      "What are Arduino capabilities?",
      "What can Arduino control?",
      "What can Arduino be used to control?",
      "What projects can I make with Arduino?",
      "What projects can I make with it?",
      "What kind of projects can Arduino do?",
      "What applications can Arduino be used for?",
    ],
    keywords: [
      "arduino",
      "capability",
      "capabilities",
      "control",
      "projects",
      "applications",
      "sensors",
      "motors",
      "relays",
      "displays",
      "automation",
    ],
    answer:
      "Arduino can read inputs from sensors, buttons and other devices, process that information using programmed logic, and control outputs such as LEDs, motors, displays and relays. It can also communicate with other electronic modules. This makes Arduino useful for automation, robotics, monitoring systems, interactive electronics, IoT prototypes and many other embedded projects.",
    priority: 25,
  },

  {
    id: "mcu-arduino-how-it-works",
    category: "microcontrollers",
    intent: "procedure",
    question: "How does Arduino work?",
    variations: [
      "How does Arduino actually work?",
      "How does an Arduino work?",
      "How does it work?",
      "How does Arduino function?",
      "How does Arduino operate?",
      "What is the working principle of Arduino?",
      "How does an Arduino board work?",
    ],
    keywords: [
      "arduino",
      "work",
      "working",
      "function",
      "operate",
      "microcontroller",
      "input",
      "output",
      "program",
      "logic",
    ],
    answer:
      "Arduino works by running a program stored on its microcontroller. The program reads inputs such as sensors, buttons or other signals, processes them according to the programmed logic, and then controls outputs such as LEDs, motors, displays or relays. This process repeats continuously while the board is powered, allowing Arduino to respond to changes in its environment.",
    priority: 24,
  },

  {
    id: "mcu-arduino-how-to-use",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I use Arduino?",
    variations: [
      "How do I use it?",
      "How to use Arduino?",
      "How can I use Arduino?",
      "How do I start using Arduino?",
      "How do I program Arduino?",
      "How do I start an Arduino project?",
    ],
    keywords: [
      "arduino",
      "use",
      "program",
      "programming",
      "ide",
      "sketch",
      "upload",
      "board",
      "computer",
    ],
    answer:
      "To use Arduino, choose a compatible Arduino board, connect it to your computer, install the Arduino IDE, write or load a program called a sketch, and upload it to the board. You can then connect components such as LEDs, sensors, displays, motors or relays and control them through your code. A simple LED project is a good starting point before moving to sensors, communication and more advanced circuits.",
    priority: 23,
  },

  {
    id: "mcu-arduino-components",
    category: "microcontrollers",
    intent: "requirements",
    question: "What components can I connect to Arduino?",
    variations: [
      "What components can I connect to it?",
      "What can I connect to Arduino?",
      "What parts can I use with Arduino?",
      "What hardware can I connect to Arduino?",
      "Which components work with Arduino?",
      "What devices can Arduino control?",
      "What can I connect to an Arduino board?",
    ],
    keywords: [
      "arduino",
      "components",
      "parts",
      "hardware",
      "led",
      "sensor",
      "display",
      "motor",
      "relay",
      "button",
      "module",
    ],
    answer:
      "Arduino can be connected to many types of electronic components and modules, including LEDs, buttons, potentiometers, sensors, displays, buzzers, relays, servo motors, DC motors through suitable drivers, communication modules and other input/output devices. The exact components depend on the project and the electrical requirements of the board.",
    priority: 24,
  },

  {
    id: "mcu-arduino-projects",
    category: "microcontrollers",
    intent: "capability",
    question: "What projects can I make with Arduino?",
    variations: [
      "What projects can I make with it?",
      "What projects can I build with Arduino?",
      "What can I build using Arduino?",
      "What Arduino projects can I make?",
      "What kind of Arduino projects can I build?",
      "What can I make with Arduino?",
    ],
    keywords: [
      "arduino",
      "projects",
      "build",
      "make",
      "automation",
      "robotics",
      "sensors",
      "monitoring",
      "control",
      "iot",
    ],
    answer:
      "Arduino can be used for projects such as automatic lighting, temperature and environmental monitoring, sensor systems, RFID access control, small robots, motor control, display systems, home-automation prototypes and interactive electronics. The type of project depends on the Arduino board, connected components and the required functionality.",
    priority: 25,
  },

  {
    id: "mcu-esp32",
    category: "microcontrollers",
    intent: "definition",
    question: "What is ESP32?",
    variations: [
      "What is ESP32",
      "Explain ESP32",
      "What is an ESP32 board",
      "ESP32 definition",
      "Tell me about ESP32",
      "What can ESP32 do",
    ],
    keywords: ["esp32", "wifi", "bluetooth", "iot", "microcontroller"],
    answer:
      "ESP32 is a family of microcontrollers commonly used for connected embedded projects. Many ESP32 variants provide wireless connectivity such as Wi-Fi and Bluetooth along with GPIO and other peripherals.",
    priority: 14,
  },

  {
    id: "mcu-raspberry-pi",
    category: "microcontrollers",
    intent: "definition",
    question: "What is Raspberry Pi?",
    variations: [
      "What is Raspberry Pi",
      "Explain Raspberry Pi",
      "What is a Raspberry Pi board",
      "Is Raspberry Pi a microcontroller",
      "Raspberry Pi definition",
      "What is Raspberry Pi used for",
    ],
    keywords: ["raspberry", "pi", "linux", "computer", "single board"],
    answer:
      "Raspberry Pi boards are generally small single-board computers rather than traditional microcontrollers. They run an operating system such as Linux and are useful when a project needs more computing capability, networking or a full OS.",
    priority: 14,
  },

  {
    id: "mcu-avr",
    category: "microcontrollers",
    intent: "definition",
    question: "What is AVR?",
    variations: [
      "What is AVR",
      "Explain AVR microcontroller",
      "What is an AVR chip",
      "AVR vs ARM",
      "AVR definition",
      "What is ATmega",
    ],
    keywords: ["avr", "atmega", "microcontroller", "architecture", "8bit"],
    answer:
      "AVR is an 8-bit microcontroller family originally from Atmel and now part of Microchip. It is used in many Arduino boards, including the ATmega328P, and is known for its simple architecture and good performance in many embedded tasks.",
    priority: 14,
  },

  {
    id: "mcu-arm-cortex-m",
    category: "microcontrollers",
    intent: "definition",
    question: "What is ARM Cortex-M?",
    variations: [
      "What is ARM Cortex-M",
      "Explain Cortex-M",
      "What is ARM Cortex",
      "ARM Cortex-M series",
      "Cortex M0 M3 M4 M7",
      "ARM microcontroller",
    ],
    keywords: ["arm", "cortex", "m", "microcontroller", "architecture"],
    answer:
      "ARM Cortex-M is a family of 32-bit microcontroller cores used in many modern devices. Variants such as M0, M3, M4 and M7 offer different performance levels, DSP and floating-point capabilities.",
    priority: 14,
  },

  {
    id: "mcu-stm32",
    category: "microcontrollers",
    intent: "definition",
    question: "What is STM32?",
    variations: [
      "What is STM32",
      "Explain STM32",
      "What is an STM32 board",
      "STM32 definition",
      "Why use STM32",
      "STM32 vs Arduino",
    ],
    keywords: ["stm32", "microcontroller", "arm", "board", "embedded"],
    answer:
      "STM32 is a family of ARM Cortex-M microcontrollers from STMicroelectronics. They are widely used in industry and hobby projects and offer a range of performance levels, peripherals and packages.",
    priority: 13,
  },

  {
    id: "mcu-pic",
    category: "microcontrollers",
    intent: "definition",
    question: "What is PIC?",
    variations: [
      "What is PIC",
      "Explain PIC microcontroller",
      "What is a PIC chip",
      "PIC vs AVR",
      "PIC microcontroller family",
      "Should I use PIC",
    ],
    keywords: [
      "pic",
      "microcontroller",
      "architecture",
      "embedded",
      "microchip",
    ],
    answer:
      "PIC is a family of microcontrollers from Microchip. They are available in 8-bit, 16-bit and 32-bit variants and are used in many industrial and consumer applications.",
    priority: 13,
  },

  {
    id: "mcu-riscv",
    category: "microcontrollers",
    intent: "definition",
    question: "What is RISC-V?",
    variations: [
      "What is RISC-V",
      "Explain RISC-V",
      "RISC-V microcontroller",
      "RISC-V vs ARM",
      "RISC-V architecture",
      "Is RISC-V good for embedded",
    ],
    keywords: ["risc", "v", "microcontroller", "architecture", "embedded"],
    answer:
      "RISC-V is an open instruction set architecture available for microcontrollers and processors. It is gaining popularity in embedded systems because of its open nature and flexibility.",
    priority: 13,
  },

  {
    id: "mcu-microcontroller-vs-microprocessor",
    category: "microcontrollers",
    intent: "comparison",
    question:
      "What is the difference between a microcontroller and a microprocessor?",
    variations: [
      "Microcontroller vs microprocessor",
      "MCU vs CPU",
      "Difference between MCU and MPU",
      "Is a microcontroller a microprocessor",
      "MCU vs microprocessor comparison",
      "Which is better MCU or microprocessor",
    ],
    keywords: ["microcontroller", "microprocessor", "mcu", "cpu", "difference"],
    answer:
      "A microcontroller integrates a processor, memory and peripherals on one chip and is designed for embedded control. A microprocessor is typically just the processing unit and relies on external memory and peripherals, often running a full operating system.",
    priority: 13,
  },

  {
    id: "mcu-8bit-vs-32bit",
    category: "microcontrollers",
    intent: "comparison",
    question:
      "What is the difference between 8-bit and 32-bit microcontrollers?",
    variations: [
      "8-bit vs 32-bit MCU",
      "Should I use 8-bit or 32-bit",
      "Microcontroller bit width",
      "32-bit vs 8-bit embedded",
      "Difference 8 bit 32 bit microcontroller",
      "When to use 8-bit vs 32-bit",
    ],
    keywords: [
      "8bit",
      "32bit",
      "microcontroller",
      "difference",
      "architecture",
    ],
    answer:
      "8-bit microcontrollers are simpler and often lower power, suitable for basic tasks. 32-bit microcontrollers offer more processing power, memory and advanced peripherals, suitable for more complex applications.",
    priority: 12,
  },

  // ─────────────────────────────────────────────────────────────
  // PURPOSE ENTRIES (one canonical purpose per topic)
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-arduino-purpose",
    category: "microcontrollers",
    intent: "purpose",
    question: "What is Arduino used for?",
    variations: [
      "What is Arduino used for",
      "What can Arduino do",
      "What can I use Arduino for",
      "Arduino applications",
      "Where is Arduino used",
      "What can I build with Arduino",
      "Why use Arduino",
      "Arduino use cases",
    ],
    keywords: [
      "arduino",
      "used",
      "purpose",
      "application",
      "automation",
      "sensors",
      "motors",
      "rfid",
      "iot",
    ],
    answer:
      "Arduino is commonly used for learning electronics, prototyping, sensor reading, actuator control, automation, communication, displays, RFID, IoT and other embedded projects where a simple, well-supported microcontroller platform is appropriate.",
    priority: 12,
  },

  {
    id: "mcu-esp32-purpose",
    category: "microcontrollers",
    intent: "purpose",
    question: "What is ESP32 used for?",
    variations: [
      "What is ESP32 used for",
      "What can ESP32 do",
      "ESP32 applications",
      "Where is ESP32 used",
      "Why use ESP32",
      "ESP32 use cases",
      "What can I build with ESP32",
      "Is ESP32 good for IoT",
    ],
    keywords: ["esp32", "used", "purpose", "application", "iot", "wifi"],
    answer:
      "ESP32 is commonly used for Wi-Fi and Bluetooth connected projects, IoT devices, sensor hubs, web-controlled hardware, remote monitoring and automation where wireless connectivity or higher processing power is needed.",
    priority: 12,
  },

  {
    id: "mcu-raspberry-pi-purpose",
    category: "microcontrollers",
    intent: "purpose",
    question: "What is Raspberry Pi used for?",
    variations: [
      "What is Raspberry Pi used for",
      "What can Raspberry Pi do",
      "Raspberry Pi applications",
      "Where is Raspberry Pi used",
      "Why use Raspberry Pi",
      "Raspberry Pi use cases",
      "What can I build with Raspberry Pi",
      "Is Raspberry Pi good for projects",
    ],
    keywords: ["raspberry", "pi", "used", "purpose", "linux", "projects"],
    answer:
      "Raspberry Pi is used for projects that need a full operating system, networking, media, servers, computer vision, education or higher-level software. It complements microcontrollers rather than replacing them for real-time control tasks.",
    priority: 12,
  },

  {
    id: "mcu-stm32-purpose",
    category: "microcontrollers",
    intent: "purpose",
    question: "What is STM32 used for?",
    variations: [
      "What is STM32 used for",
      "What can STM32 do",
      "STM32 applications",
      "Why use STM32",
      "STM32 use cases",
      "Where is STM32 used",
    ],
    keywords: ["stm32", "used", "purpose", "application", "embedded"],
    answer:
      "STM32 is used in industrial control, motor control, consumer devices, medical equipment, IoT nodes and other embedded applications where a capable ARM Cortex-M core and rich peripherals are needed.",
    priority: 12,
  },

  // ─────────────────────────────────────────────────────────────
  // PROCEDURE ENTRIES (one canonical procedure per actionable topic)
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-arduino-project-procedure",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I make an Arduino project?",
    variations: [
      "How do I make an Arduino project",
      "How to build an Arduino project",
      "How can I build an Arduino project",
      "How do I create an Arduino project",
      "How can I create an Arduino project",
      "Steps to make an Arduino project",
      "Arduino project procedure",
      "Arduino project steps",
      "How do I start an Arduino project",
    ],
    keywords: [
      "arduino",
      "project",
      "build",
      "make",
      "create",
      "steps",
      "procedure",
      "wiring",
      "code",
    ],
    answer:
      "A practical workflow is: 1) define what the project should do, 2) select the Arduino board and components, 3) plan the wiring, 4) assemble the circuit, 5) write the firmware, 6) upload and test the code, 7) troubleshoot hardware or software problems, and 8) refine the project into a more permanent build if required.",
    priority: 15,
  },

  {
    id: "mcu-arduino-programming",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I program Arduino?",
    variations: [
      "How do I program Arduino",
      "How to program Arduino",
      "How do I code Arduino",
      "How can I program an Arduino board",
      "How do I write Arduino code",
      "How do I upload code to Arduino",
      "How does Arduino programming work",
      "Arduino programming steps",
    ],
    keywords: [
      "arduino",
      "program",
      "programming",
      "code",
      "upload",
      "sketch",
      "ide",
      "firmware",
    ],
    answer:
      "Arduino is commonly programmed using the Arduino IDE. You write a sketch, select the correct board and port, compile the code, and upload it to the board through USB. Most Arduino sketches use setup() for one-time initialization and loop() for the main program logic.",
    priority: 15,
  },

  {
    id: "mcu-esp32-programming",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I program ESP32?",
    variations: [
      "How do I program ESP32",
      "How to program ESP32",
      "How do I code ESP32",
      "How do I upload code to ESP32",
      "ESP32 programming steps",
      "ESP32 development environment",
      "How to flash ESP32",
      "ESP32 programming options",
    ],
    keywords: [
      "esp32",
      "program",
      "programming",
      "arduino",
      "esp-idf",
      "platformio",
      "upload",
    ],
    answer:
      "ESP32 can be programmed using the Arduino framework, ESP-IDF, PlatformIO and other environments. Connect the board, select the correct target and port, then compile and upload. The appropriate tool depends on required features and familiarity.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // COMPARISONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-arduino-vs-esp32",
    category: "microcontrollers",
    intent: "comparison",
    question: "Arduino vs ESP32 — which should I use?",
    variations: [
      "Arduino vs ESP32",
      "Should I use Arduino or ESP32",
      "Which is better Arduino or ESP32",
      "ESP32 versus Arduino",
      "What board should I choose",
      "Arduino or ESP32 for IoT",
      "Arduino vs ESP32 comparison",
    ],
    keywords: ["arduino", "esp32", "board", "choose", "wifi", "comparison"],
    answer:
      "Neither is universally better. Arduino boards can be convenient for straightforward embedded projects, while ESP32 boards are particularly useful when wireless connectivity or greater processing capability is needed. The correct choice depends on the project requirements.",
    priority: 13,
  },

  {
    id: "mcu-arduino-vs-raspberry-pi",
    category: "microcontrollers",
    intent: "comparison",
    question: "What is the difference between Arduino and Raspberry Pi?",
    variations: [
      "Arduino vs Raspberry Pi",
      "Microcontroller vs Raspberry Pi",
      "Which is better Arduino or Pi",
      "Do I need a Pi or Arduino",
      "Arduino or Raspberry Pi for project",
      "Difference between Arduino and Pi",
    ],
    keywords: ["arduino", "raspberry", "pi", "difference", "microcontroller"],
    answer:
      "Arduino boards are microcontrollers that run a single program with deterministic timing and low power. Raspberry Pi is a small computer that runs an operating system, suitable when more processing power, networking or a full OS is needed.",
    priority: 13,
  },

  {
    id: "mcu-esp32-vs-stm32",
    category: "microcontrollers",
    intent: "comparison",
    question: "ESP32 vs STM32 — which should I use?",
    variations: [
      "ESP32 vs STM32",
      "Should I use ESP32 or STM32",
      "Which is better ESP32 or STM32",
      "ESP32 versus STM32",
      "STM32 or ESP32 comparison",
      "ESP32 vs STM32 for embedded",
    ],
    keywords: ["esp32", "stm32", "comparison", "microcontroller", "embedded"],
    answer:
      "ESP32 is convenient when built-in wireless connectivity is required. STM32 offers a broader family of ARM Cortex-M devices with different performance and peripheral options, often chosen for industrial or deterministic control applications.",
    priority: 12,
  },

  // ─────────────────────────────────────────────────────────────
  // GPIO / PERIPHERALS
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-gpio",
    category: "microcontrollers",
    intent: "definition",
    question: "What is GPIO?",
    variations: [
      "What is GPIO",
      "What does GPIO mean",
      "What are GPIO pins",
      "How do GPIO pins work",
      "What can I connect to GPIO",
      "GPIO definition",
    ],
    keywords: ["gpio", "pin", "input", "output", "microcontroller"],
    answer:
      "GPIO means General-Purpose Input/Output. GPIO pins can commonly be configured to read digital inputs or control digital outputs, subject to the electrical limits and special functions of the specific microcontroller.",
    priority: 13,
  },

  {
    id: "mcu-gpio-electrical-limits",
    category: "microcontrollers",
    intent: "requirements",
    question: "What are GPIO electrical limits?",
    variations: [
      "GPIO current limit MCU",
      "Microcontroller GPIO voltage",
      "GPIO electrical specs",
      "GPIO drive strength",
      "How much current can a GPIO supply",
      "GPIO voltage and current limits",
    ],
    keywords: ["gpio", "electrical", "limits", "microcontroller", "current"],
    answer:
      "GPIO pins have voltage and current limits. Exceeding them can damage the pin or the microcontroller. External drivers are needed for higher loads.",
    priority: 10,
  },

  {
    id: "mcu-5v-tolerant",
    category: "microcontrollers",
    intent: "compatibility",
    question: "What does 5V tolerant mean?",
    variations: [
      "5V tolerant MCU",
      "5V tolerant GPIO",
      "Can I use 5V with 3.3V MCU",
      "5V input microcontroller",
      "What is a 5V tolerant pin",
      "Is my MCU 5V tolerant",
    ],
    keywords: ["5v", "tolerant", "microcontroller", "gpio", "voltage"],
    answer:
      "A 5V tolerant pin can accept 5V logic levels without damage, even if the microcontroller operates at a lower voltage. Not all pins are 5V tolerant, so the datasheet should be checked.",
    priority: 10,
  },

  {
    id: "mcu-logic-level",
    category: "microcontrollers",
    intent: "definition",
    question: "What is logic level?",
    variations: [
      "What is logic level",
      "Logic level MCU",
      "3.3V vs 5V logic",
      "Logic level voltage",
      "Level shifting MCU",
      "Logic level explained",
    ],
    keywords: ["logic", "level", "microcontroller", "voltage", "shifting"],
    answer:
      "Logic level refers to the voltage ranges that represent digital low and high. A 3.3V and 5V device may not be directly compatible, so level shifting may be required.",
    priority: 10,
  },

  {
    id: "mcu-level-shifter",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a level shifter?",
    variations: [
      "What is a level shifter",
      "Level shifter MCU",
      "Logic level converter",
      "3.3V to 5V shifter",
      "Level shifting circuit",
      "Why use a level shifter",
    ],
    keywords: ["level", "shifter", "microcontroller", "converter", "voltage"],
    answer:
      "A level shifter converts digital signal levels between voltage domains, such as 3.3V and 5V. The correct circuit depends on direction, speed and interface.",
    priority: 10,
  },

  {
    id: "mcu-pullup",
    category: "microcontrollers",
    intent: "definition",
    question: "What are internal pull-up resistors?",
    variations: [
      "What are internal pull-up resistors",
      "Internal pullup MCU",
      "Pullup resistor microcontroller",
      "Enable pullup GPIO",
      "Pull-up vs external",
      "Why use a pull-up resistor",
    ],
    keywords: ["pullup", "microcontroller", "gpio", "resistor", "input"],
    answer:
      "Many microcontrollers include internal pull-up resistors that can be enabled for digital inputs. They simplify button and switch circuits but may not be suitable in noisy environments.",
    priority: 10,
  },

  {
    id: "mcu-open-drain",
    category: "microcontrollers",
    intent: "definition",
    question: "What is open-drain output?",
    variations: [
      "What is open-drain output",
      "Open drain MCU",
      "Open collector output",
      "GPIO open drain",
      "Open drain vs push pull",
      "Why use open drain",
    ],
    keywords: ["open", "drain", "microcontroller", "gpio", "output"],
    answer:
      "An open-drain output can pull a line low but cannot drive it high; an external pull-up provides the high level. It is used for shared buses and level shifting.",
    priority: 9,
  },

  {
    id: "mcu-tristate",
    category: "microcontrollers",
    intent: "definition",
    question: "What is tri-state output?",
    variations: [
      "What is tri-state output",
      "Tri state GPIO",
      "High impedance MCU",
      "Tri-state output microcontroller",
      "Floating output GPIO",
      "Tri-state buffer",
    ],
    keywords: ["tri", "state", "microcontroller", "gpio", "output"],
    answer:
      "A tri-state output can be high, low or high-impedance. High impedance effectively disconnects the output, allowing shared lines or external signals to control the node.",
    priority: 9,
  },

  {
    id: "mcu-alternate-function",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an alternate function?",
    variations: [
      "What is an alternate function",
      "Alternate function MCU",
      "Pin alternate function",
      "GPIO alternate function",
      "Pin muxing embedded",
      "Alternate function pin",
    ],
    keywords: ["alternate", "function", "microcontroller", "gpio", "pin"],
    answer:
      "Many microcontroller pins can serve multiple functions, such as GPIO, UART or PWM. The selected function is configured through registers or a pin mux.",
    priority: 9,
  },

  {
    id: "mcu-pin-mux",
    category: "microcontrollers",
    intent: "definition",
    question: "What is pin muxing?",
    variations: [
      "What is pin muxing",
      "Pin mux MCU",
      "Pin multiplexing microcontroller",
      "Configure pin function",
      "Pin mapping embedded",
      "Why use pin mux",
    ],
    keywords: ["pin", "mux", "microcontroller", "function", "configuration"],
    answer:
      "Pin muxing selects which internal peripheral is connected to a physical pin. It allows flexible use of limited pins.",
    priority: 9,
  },

  {
    id: "mcu-pwm",
    category: "microcontrollers",
    intent: "definition",
    question: "What is PWM?",
    variations: [
      "What is PWM",
      "What does PWM mean",
      "How does PWM work",
      "Can PWM control LED brightness",
      "Can PWM control motor speed",
      "What is pulse width modulation",
    ],
    keywords: ["pwm", "pulse", "width", "modulation", "motor", "led"],
    answer:
      "PWM, or Pulse Width Modulation, rapidly switches a digital signal and varies its duty cycle. It is commonly used for LED brightness, motor control and other applications where average power or timing needs to be controlled.",
    priority: 13,
  },

  {
    id: "mcu-adc",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an ADC?",
    variations: [
      "What is an ADC",
      "What does ADC mean",
      "What is analog to digital conversion",
      "How does a microcontroller read analog voltage",
      "How do analog pins work",
      "ADC definition",
    ],
    keywords: ["adc", "analog", "digital", "voltage", "sensor"],
    answer:
      "An ADC, or Analog-to-Digital Converter, converts a continuously varying analog voltage into a digital number that software can process. Resolution and reference voltage determine how finely the input can be represented.",
    priority: 13,
  },

  {
    id: "mcu-interrupt",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an interrupt?",
    variations: [
      "What is an interrupt",
      "How do interrupts work",
      "What is a hardware interrupt",
      "Why use interrupts",
      "Interrupt versus polling",
      "Interrupt definition MCU",
    ],
    keywords: ["interrupt", "polling", "event", "gpio", "timer"],
    answer:
      "An interrupt allows hardware or another event to signal the processor so that software can respond without continuously checking the event in a polling loop. Interrupt handlers should generally be short and carefully designed.",
    priority: 13,
  },

  {
    id: "mcu-interrupt-priority",
    category: "microcontrollers",
    intent: "definition",
    question: "How do interrupt priorities work?",
    variations: [
      "How do interrupt priorities work",
      "Interrupt priority MCU",
      "Priority levels microcontroller",
      "Nested interrupts",
      "Interrupt priority embedded",
      "What is interrupt priority",
    ],
    keywords: [
      "interrupt",
      "priority",
      "microcontroller",
      "nested",
      "embedded",
    ],
    answer:
      "Interrupt priorities determine which interrupt is serviced first when multiple occur. Higher-priority interrupts can preempt lower-priority ones.",
    priority: 9,
  },

  {
    id: "mcu-nvic",
    category: "microcontrollers",
    intent: "definition",
    question: "What is NVIC?",
    variations: [
      "What is NVIC",
      "NVIC ARM",
      "Nested vectored interrupt controller",
      "NVIC microcontroller",
      "Interrupt controller ARM",
      "NVIC definition",
    ],
    keywords: ["nvic", "arm", "interrupt", "controller", "microcontroller"],
    answer:
      "NVIC, or Nested Vectored Interrupt Controller, is part of ARM Cortex-M processors. It manages interrupt priorities and dispatching.",
    priority: 9,
  },

  {
    id: "mcu-timer",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a timer in a microcontroller?",
    variations: [
      "What is a timer in a microcontroller",
      "Timer MCU",
      "What does timer do",
      "Hardware timer microcontroller",
      "Timer peripheral MCU",
      "Timer definition",
    ],
    keywords: ["timer", "microcontroller", "hardware", "peripheral", "timing"],
    answer:
      "A timer counts clock cycles to measure time or generate events. It can produce interrupts, PWM, delays or input capture.",
    priority: 13,
  },

  {
    id: "mcu-counter",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a counter in a microcontroller?",
    variations: [
      "What is a counter in a microcontroller",
      "Counter MCU",
      "What does counter do",
      "Count external events",
      "Counter peripheral",
      "Counter definition",
    ],
    keywords: ["counter", "microcontroller", "events", "timer", "peripheral"],
    answer:
      "A counter counts external events or pulses. It can be used for frequency measurement, position tracking and event counting.",
    priority: 9,
  },

  {
    id: "mcu-systick",
    category: "microcontrollers",
    intent: "definition",
    question: "What is SysTick?",
    variations: [
      "What is SysTick",
      "SysTick timer ARM",
      "System tick MCU",
      "SysTick interrupt",
      "SysTick timer",
      "SysTick definition",
    ],
    keywords: ["systick", "arm", "timer", "microcontroller", "tick"],
    answer:
      "SysTick is a system timer in ARM Cortex-M processors. It is often used for RTOS ticks, delays and periodic tasks.",
    priority: 9,
  },

  {
    id: "mcu-dma",
    category: "microcontrollers",
    intent: "definition",
    question: "What is DMA in a microcontroller?",
    variations: [
      "What is DMA in a microcontroller",
      "DMA MCU",
      "Direct memory access microcontroller",
      "How does DMA work",
      "Use DMA embedded",
      "DMA definition",
    ],
    keywords: ["dma", "microcontroller", "memory", "access", "peripheral"],
    answer:
      "DMA, or Direct Memory Access, moves data between peripherals and memory without continuous CPU involvement. It improves performance and reduces CPU load.",
    priority: 13,
  },

  {
    id: "mcu-watchdog",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a watchdog timer?",
    variations: [
      "What is a watchdog timer",
      "What is watchdog",
      "Why use a watchdog timer",
      "Can watchdog restart a microcontroller",
      "Why does my controller automatically reset",
      "Watchdog definition",
    ],
    keywords: ["watchdog", "timer", "reset", "microcontroller", "recovery"],
    answer:
      "A watchdog timer can reset a microcontroller if software fails to service it within an expected period. It is commonly used as a recovery mechanism for systems that need to continue operating after certain software faults.",
    priority: 13,
  },

  {
    id: "mcu-brownout",
    category: "microcontrollers",
    intent: "definition",
    question: "What is brownout detection?",
    variations: [
      "What is brownout detection",
      "Brownout MCU",
      "Low voltage reset",
      "Brownout detection microcontroller",
      "BOD MCU",
      "Brownout definition",
    ],
    keywords: ["brownout", "microcontroller", "voltage", "reset", "detection"],
    answer:
      "Brownout detection holds the microcontroller in reset when supply voltage drops below a safe threshold, preventing unreliable operation.",
    priority: 13,
  },

  {
    id: "mcu-power-on-reset",
    category: "microcontrollers",
    intent: "definition",
    question: "What is power-on reset?",
    variations: [
      "What is power-on reset",
      "Power on reset MCU",
      "POR microcontroller",
      "Reset at startup",
      "Power on reset circuit",
      "POR definition",
    ],
    keywords: ["power", "on", "reset", "microcontroller", "startup"],
    answer:
      "Power-on reset ensures the microcontroller starts in a known state when power is applied. It may be internal or require an external circuit.",
    priority: 9,
  },

  {
    id: "mcu-reset-pin",
    category: "microcontrollers",
    intent: "definition",
    question: "What does the reset pin do?",
    variations: [
      "What does the reset pin do",
      "Reset pin microcontroller",
      "What is reset MCU",
      "How does reset work",
      "Reset circuit MCU",
      "Reset pin function",
    ],
    keywords: ["reset", "pin", "microcontroller", "boot", "startup"],
    answer:
      "The reset pin restarts the microcontroller. When asserted, it initializes the processor and starts execution from the reset vector.",
    priority: 9,
  },

  {
    id: "mcu-reset-circuit",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a reset circuit?",
    variations: [
      "What is a reset circuit",
      "Reset circuit MCU",
      "Microcontroller reset",
      "Reset button MCU",
      "External reset circuit",
      "Reset circuit purpose",
    ],
    keywords: ["reset", "circuit", "microcontroller", "button", "external"],
    answer:
      "A reset circuit holds the microcontroller in reset until the power supply is stable, or provides a manual reset button. It may also include debouncing and protection.",
    priority: 9,
  },

  {
    id: "mcu-clock",
    category: "microcontrollers",
    intent: "definition",
    question: "What is the system clock?",
    variations: [
      "What is the system clock",
      "What is clock speed MCU",
      "Microcontroller clock",
      "Why clock speed matters",
      "System clock embedded",
      "Clock definition MCU",
    ],
    keywords: ["clock", "speed", "microcontroller", "frequency", "system"],
    answer:
      "The system clock determines instruction timing and peripheral speeds. It can be generated internally or from an external source. Higher clock speeds increase performance but also power consumption.",
    priority: 13,
  },

  {
    id: "mcu-crystal",
    category: "microcontrollers",
    intent: "definition",
    question: "Why use an external crystal?",
    variations: [
      "Why use an external crystal",
      "External crystal MCU",
      "Why crystal oscillator",
      "Crystal vs internal oscillator",
      "Do I need a crystal",
      "Crystal purpose MCU",
    ],
    keywords: ["crystal", "oscillator", "external", "clock", "microcontroller"],
    answer:
      "An external crystal provides a more accurate and stable clock than internal oscillators, which is important for communication, timing and precision applications.",
    priority: 9,
  },

  {
    id: "mcu-oscillator",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an internal oscillator?",
    variations: [
      "What is an internal oscillator",
      "Internal oscillator MCU",
      "RC oscillator microcontroller",
      "Internal clock MCU",
      "Oscillator vs crystal",
      "Internal oscillator purpose",
    ],
    keywords: ["oscillator", "internal", "microcontroller", "clock", "rc"],
    answer:
      "An internal oscillator provides a clock without external components. It is convenient but often less accurate than an external crystal or resonator.",
    priority: 9,
  },

  {
    id: "mcu-pll",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a PLL?",
    variations: [
      "What is a PLL",
      "PLL MCU",
      "Phase locked loop microcontroller",
      "What does PLL do",
      "PLL clock MCU",
      "PLL definition",
    ],
    keywords: ["pll", "microcontroller", "clock", "frequency", "multiply"],
    answer:
      "A PLL, or Phase-Locked Loop, multiplies or stabilizes a clock frequency. It allows the microcontroller to run at higher speeds than the source oscillator.",
    priority: 9,
  },

  {
    id: "mcu-fpu",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an FPU?",
    variations: [
      "What is an FPU",
      "FPU microcontroller",
      "Floating point unit MCU",
      "Hardware floating point",
      "FPU ARM Cortex",
      "FPU definition",
    ],
    keywords: ["fpu", "microcontroller", "floating", "point", "hardware"],
    answer:
      "An FPU, or Floating-Point Unit, performs floating-point arithmetic in hardware. It improves performance for math-heavy applications.",
    priority: 9,
  },

  {
    id: "mcu-dsp",
    category: "microcontrollers",
    intent: "definition",
    question: "What is DSP in microcontrollers?",
    variations: [
      "What is DSP in microcontrollers",
      "DSP microcontroller",
      "Digital signal processing MCU",
      "DSP instructions ARM",
      "DSP embedded",
      "DSP definition MCU",
    ],
    keywords: [
      "dsp",
      "microcontroller",
      "signal",
      "processing",
      "instructions",
    ],
    answer:
      "DSP refers to digital signal processing capabilities, such as specialized instructions or hardware for filtering, FFT and other algorithms. Some microcontrollers include DSP extensions.",
    priority: 9,
  },

  {
    id: "mcu-mpu",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an MPU?",
    variations: [
      "What is an MPU",
      "MPU microcontroller",
      "Memory protection unit MCU",
      "MPU vs MMU",
      "Memory protection embedded",
      "MPU definition",
    ],
    keywords: ["mpu", "microcontroller", "memory", "protection", "embedded"],
    answer:
      "An MPU, or Memory Protection Unit, defines access permissions for memory regions. It can detect invalid accesses and improve system robustness.",
    priority: 9,
  },

  {
    id: "mcu-mmu",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an MMU?",
    variations: [
      "What is an MMU",
      "MMU microcontroller",
      "Memory management unit MCU",
      "MMU vs MPU",
      "Virtual memory embedded",
      "MMU definition",
    ],
    keywords: ["mmu", "microcontroller", "memory", "management", "virtual"],
    answer:
      "An MMU, or Memory Management Unit, translates virtual addresses to physical addresses and can provide memory protection. It is common in application processors but less common in small microcontrollers.",
    priority: 9,
  },

  {
    id: "mcu-cache",
    category: "microcontrollers",
    intent: "definition",
    question: "What is cache in a microcontroller?",
    variations: [
      "What is cache in a microcontroller",
      "Cache MCU",
      "Instruction cache microcontroller",
      "Cache memory MCU",
      "Why cache matters",
      "Cache definition MCU",
    ],
    keywords: ["cache", "microcontroller", "memory", "performance", "speed"],
    answer:
      "Some microcontrollers include instruction or data caches to improve performance when accessing slower memory. Cache behavior should be considered in timing-critical code.",
    priority: 9,
  },

  {
    id: "mcu-pipeline",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a pipeline?",
    variations: [
      "What is a pipeline",
      "Pipeline microcontroller",
      "Instruction pipeline MCU",
      "Pipelining embedded",
      "CPU pipeline",
      "Pipeline definition",
    ],
    keywords: [
      "pipeline",
      "microcontroller",
      "instruction",
      "cpu",
      "performance",
    ],
    answer:
      "A pipeline allows the processor to overlap instruction execution stages, improving throughput. Pipelines are common in modern microcontrollers.",
    priority: 9,
  },

  {
    id: "mcu-alu",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an ALU?",
    variations: [
      "What is an ALU",
      "ALU microcontroller",
      "Arithmetic logic unit MCU",
      "What does ALU do",
      "ALU embedded",
      "ALU definition",
    ],
    keywords: ["alu", "microcontroller", "arithmetic", "logic", "unit"],
    answer:
      "An ALU, or Arithmetic Logic Unit, performs arithmetic and logical operations. It is a core part of the processor.",
    priority: 9,
  },

  {
    id: "mcu-register",
    category: "microcontrollers",
    intent: "definition",
    question: "What are registers in a microcontroller?",
    variations: [
      "What are registers in a microcontroller",
      "Registers MCU",
      "CPU registers microcontroller",
      "What are registers",
      "Register vs memory",
      "Register definition MCU",
    ],
    keywords: ["register", "microcontroller", "cpu", "memory", "embedded"],
    answer:
      "Registers are small, fast storage locations inside the processor. They hold operands, addresses and status information during execution.",
    priority: 9,
  },

  {
    id: "mcu-memory-map",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a memory map?",
    variations: [
      "What is a memory map",
      "Memory map MCU",
      "Microcontroller memory map",
      "Memory layout MCU",
      "Address map embedded",
      "Memory map definition",
    ],
    keywords: ["memory", "map", "microcontroller", "address", "layout"],
    answer:
      "A memory map describes the address ranges for flash, RAM, peripherals and other regions. Understanding it is important for low-level programming.",
    priority: 9,
  },

  {
    id: "mcu-peripheral",
    category: "microcontrollers",
    intent: "definition",
    question: "What are peripherals in a microcontroller?",
    variations: [
      "What are peripherals in a microcontroller",
      "Peripherals MCU",
      "Microcontroller peripherals",
      "What are peripherals",
      "On-chip peripherals",
      "Peripheral definition",
    ],
    keywords: [
      "peripheral",
      "microcontroller",
      "onchip",
      "hardware",
      "embedded",
    ],
    answer:
      "Peripherals are hardware modules inside the microcontroller, such as timers, UART, SPI, I2C, ADC and PWM. They extend the processor's capabilities.",
    priority: 9,
  },
  // ─────────────────────────────────────────────────────────────
  // COMMUNICATION INTERFACES
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-uart",
    category: "microcontrollers",
    intent: "definition",
    question: "What is UART?",
    variations: [
      "What is UART",
      "What does UART mean",
      "UART communication MCU",
      "How does UART work",
      "UART vs USART",
      "UART definition",
    ],
    keywords: ["uart", "communication", "microcontroller", "serial", "usart"],
    answer:
      "UART is a serial communication interface that transmits and receives data asynchronously. It is commonly used for communication with sensors, modules and other devices.",
    priority: 13,
  },

  {
    id: "mcu-i2c",
    category: "microcontrollers",
    intent: "definition",
    question: "What is I2C?",
    variations: [
      "What is I2C",
      "What does I2C mean",
      "I2C communication MCU",
      "How does I2C work",
      "I2C vs SPI",
      "I2C definition",
    ],
    keywords: ["i2c", "communication", "microcontroller", "serial", "bus"],
    answer:
      "I2C is a two-wire serial bus for communication between devices. It supports multiple devices on the same bus using addresses.",
    priority: 13,
  },

  {
    id: "mcu-spi",
    category: "microcontrollers",
    intent: "definition",
    question: "What is SPI?",
    variations: [
      "What is SPI",
      "What does SPI mean",
      "SPI communication MCU",
      "How does SPI work",
      "SPI vs I2C",
      "SPI definition",
    ],
    keywords: ["spi", "communication", "microcontroller", "serial", "bus"],
    answer:
      "SPI is a synchronous serial interface with separate clock, data in, data out and chip select lines. It is fast and commonly used for displays, memory and sensors.",
    priority: 13,
  },

  {
    id: "mcu-uart-vs-i2c-vs-spi",
    category: "microcontrollers",
    intent: "comparison",
    question: "UART vs I2C vs SPI — which should I use?",
    variations: [
      "UART vs I2C vs SPI",
      "Which serial protocol to use",
      "Compare UART I2C SPI",
      "I2C vs SPI vs UART",
      "Best serial interface MCU",
      "When to use UART I2C SPI",
    ],
    keywords: ["uart", "i2c", "spi", "comparison", "serial", "protocol"],
    answer:
      "UART is point-to-point and simple, I2C supports multiple devices on two wires, and SPI is fastest with separate chip selects. The correct choice depends on speed, distance, device count and available pins.",
    priority: 12,
  },

  {
    id: "mcu-can",
    category: "microcontrollers",
    intent: "definition",
    question: "What is CAN?",
    variations: [
      "What is CAN",
      "What is CAN bus",
      "CAN communication MCU",
      "How does CAN work",
      "CAN vs UART",
      "CAN definition",
    ],
    keywords: ["can", "communication", "microcontroller", "bus", "automotive"],
    answer:
      "CAN is a robust serial bus used in automotive and industrial systems. It supports multi-master communication and error detection.",
    priority: 13,
  },

  {
    id: "mcu-usb",
    category: "microcontrollers",
    intent: "definition",
    question: "What is USB in microcontrollers?",
    variations: [
      "What is USB in microcontrollers",
      "USB MCU",
      "USB communication microcontroller",
      "USB device MCU",
      "USB host embedded",
      "USB definition MCU",
    ],
    keywords: ["usb", "microcontroller", "communication", "device", "host"],
    answer:
      "Some microcontrollers include USB peripherals for device, host or OTG functions. USB is used for communication, programming, data transfer and power.",
    priority: 13,
  },

  {
    id: "mcu-ethernet",
    category: "microcontrollers",
    intent: "compatibility",
    question: "Can a microcontroller use Ethernet?",
    variations: [
      "Can a microcontroller use Ethernet",
      "Ethernet MCU",
      "Microcontroller Ethernet",
      "W5500 MCU",
      "Network microcontroller",
      "Ethernet on microcontroller",
    ],
    keywords: [
      "ethernet",
      "microcontroller",
      "network",
      "communication",
      "w5500",
    ],
    answer:
      "Yes. Some microcontrollers include an Ethernet MAC or can use an external controller such as W5500. A TCP/IP stack is required for network protocols.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MEMORY
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-ram-vs-flash",
    category: "microcontrollers",
    intent: "comparison",
    question: "What is the difference between RAM and flash memory?",
    variations: [
      "RAM vs flash",
      "What is microcontroller RAM",
      "What is flash memory",
      "Where is firmware stored",
      "Where are variables stored",
      "Difference RAM and flash",
    ],
    keywords: ["ram", "flash", "memory", "firmware", "variables"],
    answer:
      "RAM is typically used for temporary runtime data and loses its contents when power is removed. Flash memory is non-volatile and commonly stores program firmware and other persistent data.",
    priority: 13,
  },

  {
    id: "mcu-eeprom",
    category: "microcontrollers",
    intent: "definition",
    question: "What is EEPROM?",
    variations: [
      "What is EEPROM",
      "What is EEPROM MCU",
      "EEPROM vs flash",
      "Store data EEPROM",
      "EEPROM microcontroller",
      "EEPROM definition",
    ],
    keywords: ["eeprom", "microcontroller", "storage", "memory", "nonvolatile"],
    answer:
      "EEPROM is non-volatile memory used to store small amounts of data such as configuration and calibration. It has limited write cycles.",
    priority: 10,
  },

  {
    id: "mcu-flash-storage",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I store data in flash?",
    variations: [
      "How do I store data in flash",
      "Store data flash MCU",
      "Flash storage microcontroller",
      "Write flash MCU",
      "Non-volatile storage MCU",
      "Save data to flash",
    ],
    keywords: ["flash", "storage", "microcontroller", "data", "nonvolatile"],
    answer:
      "Flash can store configuration, logs and other data. Writes are limited in number, so wear leveling and careful write patterns are important.",
    priority: 10,
  },

  {
    id: "mcu-rtc",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an RTC?",
    variations: [
      "What is an RTC",
      "What is real time clock MCU",
      "RTC microcontroller",
      "How does RTC work",
      "RTC vs timer",
      "RTC definition",
    ],
    keywords: ["rtc", "microcontroller", "clock", "time", "real"],
    answer:
      "An RTC, or Real-Time Clock, keeps track of time and date, often with a backup battery. It can generate alarms and wake the microcontroller.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DEVELOPMENT ENVIRONMENT / FRAMEWORKS
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-arduino-ide",
    category: "microcontrollers",
    intent: "definition",
    question: "What is the Arduino IDE?",
    variations: [
      "What is the Arduino IDE",
      "Arduino IDE",
      "How to use Arduino IDE",
      "Arduino software",
      "Arduino programming environment",
      "Arduino IDE definition",
    ],
    keywords: ["arduino", "ide", "software", "programming", "environment"],
    answer:
      "The Arduino IDE is a development environment for writing, compiling and uploading code to Arduino boards. It includes libraries and board support.",
    priority: 13,
  },

  {
    id: "mcu-arduino-sketch",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an Arduino sketch?",
    variations: [
      "What is an Arduino sketch",
      "Arduino sketch",
      "What is a sketch",
      "Arduino program",
      "Sketch structure Arduino",
      "Arduino sketch definition",
    ],
    keywords: ["arduino", "sketch", "program", "structure", "code"],
    answer:
      "An Arduino sketch is a program written for Arduino. It typically includes setup() and loop() functions and may use libraries.",
    priority: 10,
  },

  {
    id: "mcu-setup-loop",
    category: "microcontrollers",
    intent: "definition",
    question: "What are setup() and loop() in Arduino?",
    variations: [
      "What are setup and loop in Arduino",
      "setup loop Arduino",
      "Arduino setup function",
      "Arduino loop function",
      "How setup and loop work",
      "Arduino program structure",
    ],
    keywords: ["setup", "loop", "arduino", "function", "structure"],
    answer:
      "setup() runs once at startup for initialization. loop() runs repeatedly after setup() and contains the main program logic.",
    priority: 10,
  },

  {
    id: "mcu-arduino-library",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an Arduino library?",
    variations: [
      "What is an Arduino library",
      "Arduino library",
      "How to use Arduino libraries",
      "Install Arduino library",
      "Arduino library manager",
      "Arduino library definition",
    ],
    keywords: ["arduino", "library", "code", "install", "manager"],
    answer:
      "An Arduino library provides pre-written code for sensors, displays, communication and other functions. Libraries can be installed via the Library Manager or manually.",
    priority: 10,
  },

  {
    id: "mcu-esp-idf",
    category: "microcontrollers",
    intent: "definition",
    question: "What is ESP-IDF?",
    variations: [
      "What is ESP-IDF",
      "ESP-IDF",
      "Espressif development framework",
      "ESP32 IDF",
      "ESP-IDF vs Arduino",
      "ESP-IDF definition",
    ],
    keywords: ["esp", "idf", "esp32", "framework", "development"],
    answer:
      "ESP-IDF is Espressif's official development framework for ESP32 and related chips. It provides drivers, libraries, build tools and support for advanced features.",
    priority: 13,
  },

  {
    id: "mcu-platformio",
    category: "microcontrollers",
    intent: "definition",
    question: "What is PlatformIO?",
    variations: [
      "What is PlatformIO",
      "PlatformIO",
      "PlatformIO vs Arduino IDE",
      "PlatformIO development",
      "Build firmware PlatformIO",
      "PlatformIO definition",
    ],
    keywords: ["platformio", "development", "build", "ide", "embedded"],
    answer:
      "PlatformIO is a cross-platform build system and development environment for embedded projects. It supports many frameworks and boards, with dependency management and testing features.",
    priority: 13,
  },

  {
    id: "mcu-stm32cube",
    category: "microcontrollers",
    intent: "definition",
    question: "What is STM32Cube?",
    variations: [
      "What is STM32Cube",
      "STM32Cube",
      "STM32CubeMX",
      "STM32 development tools",
      "STM32 HAL",
      "STM32Cube definition",
    ],
    keywords: ["stm32", "cube", "hal", "development", "tools"],
    answer:
      "STM32Cube is STMicroelectronics' ecosystem for STM32 development, including configuration tools, HAL libraries, middleware and examples.",
    priority: 13,
  },

  {
    id: "mcu-mbed",
    category: "microcontrollers",
    intent: "definition",
    question: "What is Mbed?",
    variations: [
      "What is Mbed",
      "Mbed OS",
      "ARM Mbed",
      "Mbed development",
      "Mbed vs Arduino",
      "Mbed definition",
    ],
    keywords: ["mbed", "arm", "framework", "embedded", "development"],
    answer:
      "Mbed is an open-source embedded development platform from ARM, providing an RTOS, drivers and cloud connectivity for compatible microcontrollers.",
    priority: 10,
  },

  {
    id: "mcu-zephyr",
    category: "microcontrollers",
    intent: "definition",
    question: "What is Zephyr?",
    variations: [
      "What is Zephyr",
      "Zephyr RTOS",
      "Zephyr firmware",
      "Zephyr vs FreeRTOS",
      "Zephyr embedded",
      "Zephyr definition",
    ],
    keywords: ["zephyr", "rtos", "firmware", "embedded", "framework"],
    answer:
      "Zephyr is an open-source real-time operating system designed for connected, resource-constrained devices. It includes a kernel, drivers, communication stacks and build system.",
    priority: 13,
  },

  {
    id: "mcu-freertos",
    category: "microcontrollers",
    intent: "definition",
    question: "What is FreeRTOS?",
    variations: [
      "What is FreeRTOS",
      "FreeRTOS firmware",
      "FreeRTOS tasks",
      "How to use FreeRTOS",
      "FreeRTOS vs bare metal",
      "FreeRTOS definition",
    ],
    keywords: ["freertos", "rtos", "firmware", "task", "embedded"],
    answer:
      "FreeRTOS is a popular real-time operating system kernel for embedded systems. It provides tasks, queues, semaphores, timers and other features for building multi-tasking firmware.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // RTOS vs BARE METAL / RTOS CONCEPTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-bare-metal",
    category: "microcontrollers",
    intent: "definition",
    question: "What is bare-metal programming?",
    variations: [
      "What is bare-metal programming",
      "Bare metal MCU",
      "Bare metal embedded",
      "No RTOS firmware",
      "Bare metal vs RTOS",
      "Bare metal definition",
    ],
    keywords: ["bare", "metal", "microcontroller", "firmware", "embedded"],
    answer:
      "Bare-metal programming runs directly on the microcontroller without an operating system. It can be simpler and more predictable for small or timing-critical applications.",
    priority: 13,
  },

  {
    id: "mcu-rtos",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an RTOS?",
    variations: [
      "What is an RTOS",
      "What is real time operating system",
      "RTOS MCU",
      "Why use RTOS",
      "RTOS vs bare metal",
      "RTOS definition",
    ],
    keywords: ["rtos", "microcontroller", "real", "time", "tasks"],
    answer:
      "An RTOS, or Real-Time Operating System, manages tasks, scheduling and resources with timing constraints. It can simplify complex embedded applications with multiple concurrent activities.",
    priority: 13,
  },

  {
    id: "mcu-bare-metal-vs-rtos",
    category: "microcontrollers",
    intent: "comparison",
    question: "Bare metal vs RTOS — which should I use?",
    variations: [
      "Bare metal vs RTOS",
      "Should I use an RTOS",
      "When to use RTOS",
      "RTOS or bare metal",
      "Bare metal versus RTOS",
      "Do I need an RTOS",
    ],
    keywords: ["bare", "metal", "rtos", "comparison", "embedded"],
    answer:
      "Bare metal is simpler and predictable for small or timing-critical systems. An RTOS helps organize larger applications with multiple concurrent tasks, but adds complexity and resource overhead.",
    priority: 12,
  },

  {
    id: "mcu-rtos-task",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a task in an RTOS?",
    variations: [
      "What is a task in an RTOS",
      "RTOS task",
      "Task in FreeRTOS",
      "What is a task MCU",
      "Task vs thread embedded",
      "Task definition RTOS",
    ],
    keywords: ["task", "rtos", "microcontroller", "thread", "embedded"],
    answer:
      "A task is an independent thread of execution managed by the RTOS. Each task has its own stack and priority.",
    priority: 10,
  },

  {
    id: "mcu-rtos-scheduler",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an RTOS scheduler?",
    variations: [
      "What is an RTOS scheduler",
      "RTOS scheduler",
      "Task scheduling MCU",
      "How scheduler works",
      "Scheduler embedded",
      "Scheduler definition",
    ],
    keywords: ["scheduler", "rtos", "microcontroller", "task", "embedded"],
    answer:
      "The scheduler decides which task runs based on priority, state and timing. It can be preemptive or cooperative.",
    priority: 10,
  },

  {
    id: "mcu-rtos-priority",
    category: "microcontrollers",
    intent: "definition",
    question: "How do RTOS priorities work?",
    variations: [
      "How do RTOS priorities work",
      "RTOS priority",
      "Task priority MCU",
      "Set task priority",
      "Priority levels RTOS",
      "RTOS priority definition",
    ],
    keywords: ["priority", "rtos", "microcontroller", "task", "scheduler"],
    answer:
      "Tasks are assigned priorities. Higher-priority tasks run before lower-priority ones. Priorities should reflect timing and importance.",
    priority: 9,
  },

  {
    id: "mcu-rtos-queue",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a queue in an RTOS?",
    variations: [
      "What is a queue in an RTOS",
      "RTOS queue",
      "Message queue MCU",
      "How to use queue RTOS",
      "Queue vs semaphore",
      "Queue definition RTOS",
    ],
    keywords: ["queue", "rtos", "microcontroller", "message", "task"],
    answer:
      "A queue passes data between tasks or between an interrupt and a task in a first-in, first-out manner. It is safe for concurrent use.",
    priority: 9,
  },

  {
    id: "mcu-rtos-semaphore",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a semaphore in an RTOS?",
    variations: [
      "What is a semaphore in an RTOS",
      "RTOS semaphore",
      "Binary semaphore MCU",
      "Counting semaphore",
      "Semaphore vs mutex",
      "Semaphore definition RTOS",
    ],
    keywords: ["semaphore", "rtos", "microcontroller", "task", "mutex"],
    answer:
      "A semaphore is a synchronization primitive used for signaling or resource counting. Binary semaphores signal events, while counting semaphores manage multiple resources.",
    priority: 9,
  },

  {
    id: "mcu-rtos-mutex",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a mutex in an RTOS?",
    variations: [
      "What is a mutex in an RTOS",
      "RTOS mutex",
      "Mutex MCU",
      "Mutex vs semaphore",
      "Protect shared resource RTOS",
      "Mutex definition RTOS",
    ],
    keywords: ["mutex", "rtos", "microcontroller", "shared", "resource"],
    answer:
      "A mutex is used to protect shared resources from concurrent access. It includes priority inheritance to reduce priority inversion.",
    priority: 9,
  },

  {
    id: "mcu-rtos-timer",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a software timer in an RTOS?",
    variations: [
      "What is a software timer in an RTOS",
      "RTOS timer",
      "Software timer MCU",
      "Timer callback RTOS",
      "One shot vs periodic timer",
      "Software timer definition",
    ],
    keywords: ["timer", "rtos", "microcontroller", "callback", "software"],
    answer:
      "A software timer runs a callback when a specified time elapses. It can be one-shot or periodic and is managed by the RTOS.",
    priority: 9,
  },

  {
    id: "mcu-rtos-critical",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a critical section in an RTOS?",
    variations: [
      "What is a critical section in an RTOS",
      "Critical section RTOS",
      "Disable interrupts MCU",
      "Protect code RTOS",
      "taskENTER_CRITICAL",
      "Critical section definition",
    ],
    keywords: ["critical", "section", "rtos", "microcontroller", "interrupt"],
    answer:
      "A critical section is code that must not be interrupted. It is protected by disabling interrupts or using RTOS primitives.",
    priority: 9,
  },

  {
    id: "mcu-rtos-stack",
    category: "microcontrollers",
    intent: "requirements",
    question: "How much stack does a task need?",
    variations: [
      "How much stack does a task need",
      "Task stack size RTOS",
      "How much stack MCU",
      "Stack size embedded",
      "Stack overflow RTOS",
      "Task stack requirements",
    ],
    keywords: ["stack", "task", "rtos", "microcontroller", "size"],
    answer:
      "Task stack size depends on local variables, function calls and interrupt nesting. It should be measured and monitored to prevent overflow.",
    priority: 9,
  },

  {
    id: "mcu-rtos-heap",
    category: "microcontrollers",
    intent: "comparison",
    question: "What heap schemes are available in FreeRTOS?",
    variations: [
      "What heap schemes are available in FreeRTOS",
      "FreeRTOS heap schemes",
      "RTOS heap MCU",
      "Heap management RTOS",
      "heap_1 heap_4",
      "FreeRTOS heap options",
    ],
    keywords: ["heap", "freertos", "rtos", "microcontroller", "memory"],
    answer:
      "FreeRTOS provides heap_1 through heap_5. heap_1 is simplest but cannot free. heap_4 adds coalescing. heap_5 supports multiple memory regions.",
    priority: 9,
  },

  {
    id: "mcu-rtos-idle",
    category: "microcontrollers",
    intent: "definition",
    question: "What is the idle task in an RTOS?",
    variations: [
      "What is the idle task in an RTOS",
      "Idle task RTOS",
      "What does idle task do",
      "Idle hook MCU",
      "Low priority task",
      "Idle task definition",
    ],
    keywords: ["idle", "task", "rtos", "microcontroller", "hook"],
    answer:
      "The idle task runs when no other task is ready. It can be used for low-priority background work via an idle hook.",
    priority: 9,
  },

  {
    id: "mcu-rtos-tick",
    category: "microcontrollers",
    intent: "definition",
    question: "What is the RTOS tick?",
    variations: [
      "What is the RTOS tick",
      "RTOS tick",
      "Tick rate MCU",
      "Tick interrupt RTOS",
      "configTICK_RATE_HZ",
      "RTOS tick definition",
    ],
    keywords: ["tick", "rtos", "microcontroller", "scheduler", "timer"],
    answer:
      "The tick is a periodic interrupt that drives the scheduler and timekeeping. A higher tick rate improves timing resolution but adds overhead.",
    priority: 9,
  },

  {
    id: "mcu-rtos-tickless",
    category: "microcontrollers",
    intent: "definition",
    question: "What is tickless idle?",
    variations: [
      "What is tickless idle",
      "Tickless idle RTOS",
      "Low power RTOS",
      "Tickless idle mode",
      "FreeRTOS tickless",
      "Tickless idle definition",
    ],
    keywords: ["tickless", "idle", "rtos", "low", "power", "firmware"],
    answer:
      "Tickless idle allows the RTOS to suppress periodic ticks when the system is idle, enabling longer low-power sleep. The timer is programmed to wake at the next scheduled event.",
    priority: 9,
  },

  {
    id: "mcu-rtos-priority-inversion",
    category: "microcontrollers",
    intent: "troubleshooting",
    question: "What is priority inversion?",
    variations: [
      "What is priority inversion",
      "Priority inversion RTOS",
      "Mutex priority inheritance",
      "Task priority problem",
      "RTOS priority bug",
      "Why does high priority task wait",
    ],
    keywords: ["priority", "inversion", "rtos", "microcontroller", "mutex"],
    answer:
      "Priority inversion occurs when a high-priority task waits for a resource held by a low-priority task, while medium-priority tasks run. Mutexes with priority inheritance reduce this.",
    priority: 10,
  },

  {
    id: "mcu-rtos-deadlock",
    category: "microcontrollers",
    intent: "troubleshooting",
    question: "What is a deadlock in an RTOS?",
    variations: [
      "What is a deadlock in an RTOS",
      "Deadlock RTOS",
      "Task deadlock MCU",
      "Why does my task hang",
      "Mutex deadlock",
      "RTOS deadlock definition",
    ],
    keywords: ["deadlock", "rtos", "microcontroller", "task", "mutex"],
    answer:
      "A deadlock occurs when tasks wait indefinitely for resources held by each other. Careful resource ordering, timeouts and avoiding nested locks reduce risk.",
    priority: 10,
  },

  {
    id: "mcu-rtos-starvation",
    category: "microcontrollers",
    intent: "troubleshooting",
    question: "What is task starvation?",
    variations: [
      "What is task starvation",
      "Task starvation RTOS",
      "Low priority task never runs",
      "Starvation MCU",
      "Fair scheduling RTOS",
      "Task starvation definition",
    ],
    keywords: ["starvation", "task", "rtos", "microcontroller", "scheduling"],
    answer:
      "Task starvation occurs when a task cannot get processor time because higher-priority tasks or continuous events keep it from running.",
    priority: 9,
  },

  {
    id: "mcu-rtos-notification",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a task notification?",
    variations: [
      "What is a task notification",
      "Task notification RTOS",
      "FreeRTOS notification",
      "Lightweight signaling MCU",
      "Task notify vs semaphore",
      "Task notification definition",
    ],
    keywords: ["notification", "task", "rtos", "microcontroller", "freertos"],
    answer:
      "A task notification is a lightweight way to signal a task directly. It uses less overhead than a semaphore or queue.",
    priority: 9,
  },

  {
    id: "mcu-rtos-event-group",
    category: "microcontrollers",
    intent: "definition",
    question: "What is an event group in an RTOS?",
    variations: [
      "What is an event group in an RTOS",
      "Event group RTOS",
      "FreeRTOS event group",
      "Event flags MCU",
      "Multiple event wait",
      "Event group definition",
    ],
    keywords: ["event", "group", "rtos", "microcontroller", "freertos"],
    answer:
      "An event group allows tasks to wait for combinations of event flags. It is useful for synchronizing multiple conditions.",
    priority: 9,
  },

  {
    id: "mcu-rtos-stream-buffer",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a stream buffer in FreeRTOS?",
    variations: [
      "What is a stream buffer in FreeRTOS",
      "Stream buffer FreeRTOS",
      "RTOS stream buffer",
      "Byte stream MCU",
      "Stream buffer vs queue",
      "Stream buffer definition",
    ],
    keywords: ["stream", "buffer", "freertos", "rtos", "microcontroller"],
    answer:
      "A stream buffer passes a continuous stream of bytes between tasks or between an interrupt and a task. It is efficient for byte-oriented data.",
    priority: 9,
  },

  {
    id: "mcu-rtos-message-buffer",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a message buffer in FreeRTOS?",
    variations: [
      "What is a message buffer in FreeRTOS",
      "Message buffer FreeRTOS",
      "RTOS message buffer",
      "Message passing MCU",
      "Message buffer vs stream",
      "Message buffer definition",
    ],
    keywords: ["message", "buffer", "freertos", "rtos", "microcontroller"],
    answer:
      "A message buffer passes variable-length messages between tasks or between an interrupt and a task. It preserves message boundaries.",
    priority: 9,
  },

  {
    id: "mcu-rtos-selection",
    category: "microcontrollers",
    intent: "comparison",
    question: "How do I choose an RTOS?",
    variations: [
      "How do I choose an RTOS",
      "Which RTOS to use",
      "FreeRTOS vs Zephyr",
      "RTOS selection MCU",
      "Best RTOS embedded",
      "Choose an RTOS",
    ],
    keywords: ["rtos", "choose", "freertos", "zephyr", "microcontroller"],
    answer:
      "RTOS selection depends on hardware support, licensing, features, memory footprint, toolchain, community and certification needs. Popular options include FreeRTOS, Zephyr and ThreadX.",
    priority: 10,
  },

  {
    id: "mcu-low-power-rtos",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I use low-power modes with an RTOS?",
    variations: [
      "How do I use low-power modes with an RTOS",
      "Low power RTOS",
      "Tickless idle RTOS",
      "Sleep with RTOS",
      "Power saving RTOS",
      "RTOS power saving",
    ],
    keywords: ["low", "power", "rtos", "microcontroller", "tickless"],
    answer:
      "Use tickless idle to suppress periodic ticks when idle, allowing longer sleep. The RTOS wakes at the next scheduled event.",
    priority: 10,
  },

  {
    id: "mcu-watchdog-rtos",
    category: "microcontrollers",
    intent: "procedure",
    question: "How does a watchdog interact with an RTOS?",
    variations: [
      "How does a watchdog interact with an RTOS",
      "Watchdog RTOS",
      "Service watchdog task",
      "Watchdog with tasks",
      "RTOS watchdog code",
      "RTOS watchdog handling",
    ],
    keywords: ["watchdog", "rtos", "microcontroller", "task", "service"],
    answer:
      "The watchdog should be serviced only when critical tasks are confirmed to be running. A monitor task or logic can check task health before servicing.",
    priority: 9,
  },

  {
    id: "mcu-rtos-debug",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I debug an RTOS application?",
    variations: [
      "How do I debug an RTOS application",
      "Debug RTOS",
      "RTOS debugging",
      "Task debugging MCU",
      "FreeRTOS debugging",
      "RTOS debug techniques",
    ],
    keywords: ["debug", "rtos", "microcontroller", "task", "trace"],
    answer:
      "Use trace tools, task status, stack usage and event logging. Debugging RTOS issues often involves timing, priorities and resource sharing.",
    priority: 10,
  },

  {
    id: "mcu-rtos-trace",
    category: "microcontrollers",
    intent: "definition",
    question: "What is RTOS tracing?",
    variations: [
      "What is RTOS tracing",
      "RTOS trace",
      "Task trace MCU",
      "SystemView RTOS",
      "Trace RTOS",
      "RTOS tracing definition",
    ],
    keywords: ["trace", "rtos", "microcontroller", "systemview", "debug"],
    answer:
      "RTOS tracing records task switches, interrupts and events for analysis. Tools like SystemView help visualize timing and behavior.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // PROGRAMMING / BOOT / DEBUG INTERFACES
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-programming",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I program a microcontroller?",
    variations: [
      "How do I program a microcontroller",
      "How to program MCU",
      "Program microcontroller",
      "Flashing firmware MCU",
      "Upload code microcontroller",
      "Microcontroller programming methods",
    ],
    keywords: ["program", "microcontroller", "flash", "upload", "firmware"],
    answer:
      "Microcontrollers can be programmed using a bootloader, debug interface (JTAG/SWD), or a dedicated programmer. The method depends on the device and board.",
    priority: 15,
  },

  {
    id: "mcu-bootloader",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a bootloader?",
    variations: [
      "What is a bootloader",
      "Bootloader MCU",
      "What does a bootloader do",
      "Why use a bootloader",
      "Custom bootloader embedded",
      "Bootloader definition",
    ],
    keywords: ["bootloader", "microcontroller", "firmware", "update", "boot"],
    answer:
      "A bootloader is a small program that runs before the main firmware and can load or update the application. It enables programming without a dedicated hardware programmer.",
    priority: 13,
  },

  {
    id: "mcu-programmer",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a programmer?",
    variations: [
      "What is a programmer",
      "Programmer MCU",
      "Microcontroller programmer",
      "What is a programmer",
      "USB programmer MCU",
      "Programmer definition",
    ],
    keywords: ["programmer", "microcontroller", "usb", "flash", "debug"],
    answer:
      "A programmer is a hardware tool used to load firmware into a microcontroller. Common interfaces include ICSP, JTAG, SWD and bootloader-based programming.",
    priority: 13,
  },

  {
    id: "mcu-jtag",
    category: "microcontrollers",
    intent: "definition",
    question: "What is JTAG?",
    variations: [
      "What is JTAG",
      "JTAG MCU",
      "JTAG debugging",
      "JTAG vs SWD",
      "JTAG interface",
      "JTAG definition",
    ],
    keywords: ["jtag", "microcontroller", "debug", "interface", "programming"],
    answer:
      "JTAG is a standard interface for programming and debugging microcontrollers. It provides access to the processor for testing, breakpoints and memory inspection.",
    priority: 13,
  },

  {
    id: "mcu-swd",
    category: "microcontrollers",
    intent: "definition",
    question: "What is SWD?",
    variations: [
      "What is SWD",
      "SWD MCU",
      "Serial wire debug",
      "SWD vs JTAG",
      "SWD interface",
      "SWD definition",
    ],
    keywords: ["swd", "microcontroller", "debug", "arm", "interface"],
    answer:
      "SWD, or Serial Wire Debug, is a two-wire debug interface for ARM Cortex devices. It provides similar debugging capability to JTAG with fewer pins.",
    priority: 13,
  },

  {
    id: "mcu-icsp",
    category: "microcontrollers",
    intent: "definition",
    question: "What is ICSP?",
    variations: [
      "What is ICSP",
      "ICSP MCU",
      "In circuit serial programming",
      "ICSP header",
      "Program chip in circuit",
      "ICSP definition",
    ],
    keywords: ["icsp", "microcontroller", "programming", "circuit", "header"],
    answer:
      "ICSP, or In-Circuit Serial Programming, allows a microcontroller to be programmed while installed in the circuit. It typically uses a small header and a compatible programmer.",
    priority: 13,
  },

  {
    id: "mcu-debug",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I debug a microcontroller?",
    variations: [
      "How do I debug a microcontroller",
      "Debug MCU",
      "Microcontroller debugging",
      "How to debug embedded",
      "Debugging techniques microcontroller",
      "Debug embedded firmware",
    ],
    keywords: ["debug", "microcontroller", "embedded", "breakpoint", "swd"],
    answer:
      "Debugging can use serial output, breakpoints, JTAG/SWD, logic analyzers and oscilloscopes. The best method depends on the issue and available tools.",
    priority: 15,
  },

  {
    id: "mcu-fuse",
    category: "microcontrollers",
    intent: "definition",
    question: "What are fuse bits?",
    variations: [
      "What are fuse bits",
      "Fuse bits MCU",
      "Microcontroller fuses",
      "What are fuses",
      "Configure fuse bits",
      "Fuse bits definition",
    ],
    keywords: ["fuse", "bits", "microcontroller", "configuration", "avr"],
    answer:
      "Fuse bits configure hardware options such as clock source, boot size and reset behavior on some microcontrollers. Incorrect settings can prevent programming or cause incorrect operation.",
    priority: 13,
  },

  {
    id: "mcu-lock-bits",
    category: "microcontrollers",
    intent: "definition",
    question: "What are lock bits?",
    variations: [
      "What are lock bits",
      "Lock bits MCU",
      "Microcontroller lock bits",
      "Protect firmware read",
      "Lock bits AVR",
      "Lock bits definition",
    ],
    keywords: ["lock", "bits", "microcontroller", "protection", "security"],
    answer:
      "Lock bits prevent reading or modifying firmware in the microcontroller. They are used to protect intellectual property but do not provide strong security against all attacks.",
    priority: 13,
  },

  {
    id: "mcu-signature",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a device signature?",
    variations: [
      "What is a device signature",
      "Device signature MCU",
      "Microcontroller signature",
      "Chip signature",
      "Read device signature",
      "Device signature definition",
    ],
    keywords: [
      "signature",
      "device",
      "microcontroller",
      "id",
      "identification",
    ],
    answer:
      "A device signature is a value that identifies the microcontroller type or revision. Programmers and bootloaders may check it to ensure compatibility.",
    priority: 9,
  },

  {
    id: "mcu-calibration",
    category: "microcontrollers",
    intent: "definition",
    question: "What is calibration data in a microcontroller?",
    variations: [
      "What is calibration data in a microcontroller",
      "Calibration data MCU",
      "Factory calibration microcontroller",
      "Calibration values MCU",
      "Use calibration constants",
      "Calibration data definition",
    ],
    keywords: [
      "calibration",
      "data",
      "microcontroller",
      "factory",
      "constants",
    ],
    answer:
      "Calibration data corrects for internal oscillator, ADC or sensor variation. It may be stored during manufacturing and read by firmware.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // PACKAGES / PHYSICAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-package",
    category: "microcontrollers",
    intent: "comparison",
    question: "What package types are available for microcontrollers?",
    variations: [
      "What package types are available for microcontrollers",
      "MCU package types",
      "Microcontroller packages",
      "DIP vs QFP vs QFN",
      "SMD vs through hole MCU",
      "Microcontroller package types",
    ],
    keywords: ["package", "microcontroller", "dip", "qfp", "qfn"],
    answer:
      "Common packages include DIP, QFP, QFN, BGA and SOIC. The choice depends on size, pin count, thermal requirements and assembly method.",
    priority: 10,
  },

  {
    id: "mcu-smd",
    category: "microcontrollers",
    intent: "definition",
    question: "What is SMD?",
    variations: [
      "What is SMD",
      "SMD microcontroller",
      "Surface mount device",
      "SMD vs through hole",
      "Surface mount MCU",
      "SMD definition",
    ],
    keywords: ["smd", "microcontroller", "surface", "mount", "package"],
    answer:
      "SMD, or Surface-Mount Device, is mounted directly onto the PCB surface. It allows smaller, denser designs than through-hole components.",
    priority: 9,
  },

  {
    id: "mcu-through-hole",
    category: "microcontrollers",
    intent: "definition",
    question: "What is through-hole mounting?",
    variations: [
      "What is through-hole mounting",
      "Through hole MCU",
      "Through hole vs SMD",
      "DIP package microcontroller",
      "Through hole mounting",
      "Through-hole definition",
    ],
    keywords: ["through", "hole", "microcontroller", "dip", "mounting"],
    answer:
      "Through-hole components have leads that pass through holes in the PCB and are soldered on the other side. They are easier to hand-solder but larger than SMD parts.",
    priority: 9,
  },

  {
    id: "mcu-dev-board",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a development board?",
    variations: [
      "What is a development board",
      "Dev board MCU",
      "Development board microcontroller",
      "What is a dev board",
      "Arduino dev board",
      "Development board definition",
    ],
    keywords: [
      "development",
      "board",
      "microcontroller",
      "arduino",
      "prototype",
    ],
    answer:
      "A development board provides a microcontroller with supporting circuitry, connectors and often a programmer, making prototyping and testing easier.",
    priority: 13,
  },

  {
    id: "mcu-breakout",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a breakout board?",
    variations: [
      "What is a breakout board",
      "Breakout board MCU",
      "Breakout board microcontroller",
      "What is breakout board",
      "Breakout module",
      "Breakout board definition",
    ],
    keywords: ["breakout", "board", "microcontroller", "module", "prototype"],
    answer:
      "A breakout board exposes the pins or features of a component or module on a larger, more accessible board. It simplifies prototyping and wiring.",
    priority: 9,
  },

  {
    id: "mcu-shield",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a shield?",
    variations: [
      "What is a shield",
      "Arduino shield",
      "Shield MCU",
      "What is a shield board",
      "Add-on board microcontroller",
      "Shield definition",
    ],
    keywords: ["shield", "arduino", "microcontroller", "addon", "board"],
    answer:
      "A shield is an add-on board that plugs into a development board to add functionality such as motor drivers, displays, communication or sensors.",
    priority: 9,
  },

  {
    id: "mcu-hat",
    category: "microcontrollers",
    intent: "definition",
    question: "What is a HAT?",
    variations: [
      "What is a HAT",
      "Raspberry Pi HAT",
      "HAT board",
      "What is a HAT",
      "Hardware attached on top",
      "HAT definition",
    ],
    keywords: ["hat", "raspberry", "pi", "addon", "board"],
    answer:
      "A HAT, or Hardware Attached on Top, is an add-on board for Raspberry Pi. It follows a standard form factor and can include EEPROM for identification.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // LOW POWER
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-power",
    category: "microcontrollers",
    intent: "procedure",
    question: "How do I reduce microcontroller power consumption?",
    variations: [
      "How do I reduce microcontroller power consumption",
      "Low power MCU",
      "Reduce power microcontroller",
      "Sleep mode MCU",
      "Power saving embedded",
      "MCU power reduction",
    ],
    keywords: ["power", "consumption", "sleep", "microcontroller", "low"],
    answer:
      "Use sleep modes, disable unused peripherals, reduce clock speed, minimize wake-ups and use efficient communication. Measure actual current to verify savings.",
    priority: 15,
  },

  {
    id: "mcu-sleep",
    category: "microcontrollers",
    intent: "definition",
    question: "What are sleep modes in a microcontroller?",
    variations: [
      "What are sleep modes in a microcontroller",
      "Sleep mode MCU",
      "Microcontroller sleep",
      "Low power modes",
      "Idle vs sleep MCU",
      "Sleep modes definition",
    ],
    keywords: ["sleep", "mode", "microcontroller", "low", "power"],
    answer:
      "Sleep modes reduce power by stopping parts of the microcontroller. Common modes include idle, sleep, deep sleep and standby, with different wake sources and power levels.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // BEST PRACTICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "mcu-best-practices",
    category: "microcontrollers",
    intent: "procedure",
    question: "What are best practices for microcontroller development?",
    variations: [
      "What are best practices for microcontroller development",
      "MCU best practices",
      "Good embedded design",
      "Microcontroller development guidelines",
      "How to write good firmware",
      "Embedded development best practices",
    ],
    keywords: [
      "best",
      "practices",
      "microcontroller",
      "development",
      "firmware",
    ],
    answer:
      "Use version control, modular code, clear documentation, appropriate abstraction, testing, static analysis and reliable power design. Follow the datasheet and design for maintainability.",
    priority: 10,
  },
];
