export const TROUBLESHOOTING_HELP = [
  {
    id: "troubleshooting-not-working",
    category: "troubleshooting",
    question: "My circuit is not working. What should I check?",
    variations: [
      "My electronics project does not work",
      "Why is my circuit not working",
      "My Arduino project is not working",
      "How do I troubleshoot a circuit",
      "My device does nothing",
    ],
    keywords: ["troubleshoot", "circuit", "not", "working", "problem"],
    answer:
      "Start with power and ground, then verify wiring, component orientation, voltage levels, pin assignments, communication settings and firmware behavior. Test one subsystem at a time instead of debugging the entire system simultaneously.",
    priority: 10,
  },

  {
    id: "troubleshooting-no-power",
    category: "troubleshooting",
    question: "What should I check if my board has no power?",
    variations: [
      "Arduino has no power",
      "ESP32 will not turn on",
      "My board is dead",
      "Circuit is not receiving power",
    ],
    keywords: ["power", "board", "arduino", "esp32", "voltage"],
    answer:
      "Check the power source, polarity, cable, connector, supply voltage, current capability and ground connection. Measure the actual voltage at the board rather than assuming the supply is reaching it.",
    priority: 10,
  },

  {
    id: "troubleshooting-serial",
    category: "troubleshooting",
    question: "Why is serial communication not working?",
    variations: [
      "UART not working",
      "Serial monitor shows nothing",
      "Arduino serial communication problem",
      "Why can two devices not communicate over UART",
    ],
    keywords: ["serial", "uart", "communication", "baud", "tx", "rx"],
    answer:
      "Check baud rate, TX/RX wiring, common ground, voltage levels, selected serial port and firmware configuration. TX from one device generally connects to RX of the other when using a conventional UART connection.",
    priority: 10,
  },

  {
    id: "troubleshooting-i2c",
    category: "troubleshooting",
    question: "Why is my I2C device not detected?",
    variations: [
      "I2C sensor not working",
      "I2C device not found",
      "Why does I2C scanner show nothing",
      "Arduino cannot detect I2C device",
    ],
    keywords: ["i2c", "sensor", "address", "sda", "scl"],
    answer:
      "Check SDA and SCL wiring, common ground, supply voltage, device address, pull-up resistors and whether the device actually supports I²C. Address conflicts can also prevent multiple devices from working correctly on the same bus.",
    priority: 10,
  },

  {
    id: "troubleshooting-spi",
    category: "troubleshooting",
    question: "Why is my SPI device not working?",
    variations: [
      "SPI sensor not working",
      "SPI communication problem",
      "Why is my RFID SPI connection failing",
      "How do I troubleshoot SPI",
    ],
    keywords: ["spi", "communication", "mosi", "miso", "sck", "cs"],
    answer:
      "Check MOSI, MISO, clock and chip-select wiring, power, common ground and the SPI mode expected by the device. Also verify that the correct chip-select line and clock frequency are being used.",
    priority: 10,
  },

  {
    id: "troubleshooting-gpio",
    category: "troubleshooting",
    question: "Why is my GPIO input unstable?",
    variations: [
      "GPIO keeps changing",
      "Digital input is random",
      "Input pin is floating",
      "Button gives random readings",
    ],
    keywords: ["gpio", "input", "floating", "button", "pullup"],
    answer:
      "A GPIO input can behave unpredictably if it is electrically floating. Use an appropriate pull-up or pull-down configuration and ensure the signal has a defined logic level. Mechanical buttons may also require debouncing.",
    priority: 10,
  },

  {
    id: "troubleshooting-reset",
    category: "troubleshooting",
    question: "Why does my microcontroller keep resetting?",
    variations: [
      "Arduino keeps restarting",
      "ESP32 randomly resets",
      "Microcontroller resets under load",
      "Why does my board reboot",
    ],
    keywords: ["reset", "restart", "reboot", "arduino", "esp32", "power"],
    answer:
      "Common causes include unstable power, voltage drops, excessive current demand, electrical noise, watchdog resets, software faults and thermal issues. Check reset logs where available and measure the supply during the failure rather than only at idle.",
    priority: 10,
  },

  {
    id: "troubleshooting-upload",
    category: "troubleshooting",
    question: "Why can I not upload firmware to my board?",
    variations: [
      "Arduino code will not upload",
      "ESP32 upload failed",
      "Board not detected by computer",
      "Why does programming fail",
    ],
    keywords: ["upload", "firmware", "programming", "usb", "board"],
    answer:
      "Check the USB cable, selected board and port, drivers, boot/programming mode, power and any other software using the serial port. Also verify that the correct board configuration is selected in the development environment.",
    priority: 9,
  },

  {
    id: "troubleshooting-overheating",
    category: "troubleshooting",
    question: "Why is my electronic component overheating?",
    variations: [
      "Why is my chip getting hot",
      "Why does my regulator overheat",
      "Why is my MOSFET hot",
      "Electronic component too hot",
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
    priority: 10,
  },

  {
    id: "troubleshooting-intermittent",
    category: "troubleshooting",
    question: "Why does my project work sometimes and fail sometimes?",
    variations: [
      "My circuit works intermittently",
      "Device randomly stops working",
      "Why is my electronics project unreliable",
      "Sometimes it works sometimes it does not",
    ],
    keywords: ["intermittent", "random", "unstable", "reliable", "connection"],
    answer:
      "Intermittent problems often come from loose connections, unstable power, electrical noise, timing issues, floating inputs, marginal component ratings or environmental conditions. Reproduce the failure consistently and isolate each subsystem systematically.",
    priority: 10,
  },
] as const;
