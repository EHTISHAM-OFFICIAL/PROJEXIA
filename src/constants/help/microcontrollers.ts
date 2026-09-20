export const MICROCONTROLLER_HELP = [
  {
    id: "mcu-what-is",
    category: "microcontrollers",
    question: "What is a microcontroller?",
    variations: [
      "Explain microcontroller",
      "What is an MCU",
      "What does a microcontroller do",
      "Is Arduino a microcontroller",
      "How does an embedded controller work",
    ],
    keywords: ["microcontroller", "mcu", "embedded", "controller", "arduino"],
    answer:
      "A microcontroller is a programmable integrated circuit containing a processor, memory and peripherals such as GPIO, timers and communication interfaces. It can read inputs, execute logic and control outputs in embedded systems.",
    priority: 10,
  },

  {
    id: "mcu-arduino",
    category: "microcontrollers",
    question: "What is Arduino?",
    variations: [
      "What is an Arduino board",
      "How does Arduino work",
      "Can Arduino be used for projects",
      "What is Arduino used for",
    ],
    keywords: ["arduino", "board", "microcontroller", "embedded"],
    answer:
      "Arduino is an ecosystem of development boards, software and libraries designed to make microcontroller development accessible. Different Arduino boards use different microcontrollers and provide different capabilities.",
    priority: 10,
  },

  {
    id: "mcu-esp32",
    category: "microcontrollers",
    question: "What is ESP32?",
    variations: [
      "What is an ESP32 board",
      "What can ESP32 do",
      "Why use ESP32",
      "Can ESP32 connect to WiFi",
      "Is ESP32 good for IoT",
    ],
    keywords: ["esp32", "wifi", "bluetooth", "iot", "microcontroller"],
    answer:
      "ESP32 is a family of microcontrollers commonly used for connected embedded projects. Many ESP32 variants provide wireless connectivity such as Wi-Fi and Bluetooth along with GPIO and other peripherals.",
    priority: 10,
  },

  {
    id: "mcu-rpi",
    category: "microcontrollers",
    question: "What is Raspberry Pi?",
    variations: [
      "What is a Raspberry Pi",
      "Is Raspberry Pi a microcontroller",
      "Can Raspberry Pi run Linux",
      "What is Raspberry Pi used for",
    ],
    keywords: ["raspberry", "pi", "linux", "computer", "microcontroller"],
    answer:
      "Raspberry Pi boards are generally small single-board computers rather than traditional microcontrollers. They can run operating systems such as Linux and are useful when an application needs substantially more computing capability, networking or a full operating system.",
    priority: 10,
  },

  {
    id: "mcu-arduino-vs-esp32",
    category: "microcontrollers",
    question: "Arduino vs ESP32?",
    variations: [
      "Should I use Arduino or ESP32",
      "Which is better Arduino or ESP32",
      "ESP32 versus Arduino",
      "What board should I choose",
    ],
    keywords: ["arduino", "esp32", "board", "choose", "wifi"],
    answer:
      "Neither is universally better. Arduino boards can be convenient for straightforward embedded projects, while ESP32 boards are particularly useful when wireless connectivity or greater processing capability is needed. The correct choice depends on the project requirements.",
    priority: 10,
  },

  {
    id: "mcu-gpio",
    category: "microcontrollers",
    question: "What is GPIO?",
    variations: [
      "What does GPIO mean",
      "What are GPIO pins",
      "How do GPIO pins work",
      "What can I connect to GPIO",
    ],
    keywords: ["gpio", "pin", "input", "output", "microcontroller"],
    answer:
      "GPIO means General-Purpose Input/Output. GPIO pins can commonly be configured to read digital inputs or control digital outputs, subject to the electrical limits and special functions of the specific microcontroller.",
    priority: 9,
  },

  {
    id: "mcu-pwm",
    category: "microcontrollers",
    question: "What is PWM?",
    variations: [
      "What does PWM mean",
      "How does PWM work",
      "Can PWM control LED brightness",
      "Can PWM control motor speed",
      "What is pulse width modulation",
    ],
    keywords: ["pwm", "pulse", "width", "modulation", "motor", "led"],
    answer:
      "PWM, or Pulse Width Modulation, rapidly switches a digital signal and varies its duty cycle. It is commonly used for LED brightness, motor control and other applications where average power or timing needs to be controlled.",
    priority: 10,
  },

  {
    id: "mcu-adc",
    category: "microcontrollers",
    question: "What is an ADC?",
    variations: [
      "What does ADC mean",
      "What is analog to digital conversion",
      "How does a microcontroller read analog voltage",
      "How do analog pins work",
    ],
    keywords: ["adc", "analog", "digital", "voltage", "sensor"],
    answer:
      "An ADC, or Analog-to-Digital Converter, converts a continuously varying analog voltage into a digital number that software can process. Resolution and reference voltage determine how finely the input can be represented.",
    priority: 9,
  },

  {
    id: "mcu-interrupt",
    category: "microcontrollers",
    question: "What is an interrupt?",
    variations: [
      "How do interrupts work",
      "What is a hardware interrupt",
      "Why use interrupts",
      "Interrupt versus polling",
    ],
    keywords: ["interrupt", "polling", "event", "gpio", "timer"],
    answer:
      "An interrupt allows hardware or another event to signal the processor so that software can respond without continuously checking the event in a polling loop. Interrupt handlers should generally be short and carefully designed.",
    priority: 9,
  },

  {
    id: "mcu-watchdog",
    category: "microcontrollers",
    question: "What is a watchdog timer?",
    variations: [
      "What is watchdog",
      "Why use a watchdog timer",
      "Can watchdog restart a microcontroller",
      "Why does my controller automatically reset",
    ],
    keywords: ["watchdog", "timer", "reset", "microcontroller", "recovery"],
    answer:
      "A watchdog timer can reset a microcontroller if software fails to service it within an expected period. It is commonly used as a recovery mechanism for systems that need to continue operating after certain software faults.",
    priority: 9,
  },

  {
    id: "mcu-memory",
    category: "microcontrollers",
    question: "What is the difference between RAM and flash memory?",
    variations: [
      "RAM vs flash",
      "What is microcontroller RAM",
      "What is flash memory",
      "Where is firmware stored",
      "Where are variables stored",
    ],
    keywords: ["ram", "flash", "memory", "firmware", "variables"],
    answer:
      "RAM is typically used for temporary runtime data and loses its contents when power is removed. Flash memory is non-volatile and commonly stores program firmware and other persistent data.",
    priority: 9,
  },
] as const;
