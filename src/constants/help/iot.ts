export const IOT_HELP = [
  {
    id: "iot-what-is",
    category: "iot",
    question: "What is IoT?",
    variations: [
      "Explain Internet of Things",
      "What does IoT mean",
      "What is an IoT device",
      "How does IoT work",
    ],
    keywords: ["iot", "internet", "things", "connected", "device"],
    answer:
      "IoT, or Internet of Things, refers to physical devices that collect, process or exchange data over a network. An IoT system can include sensors, controllers, communication networks, servers or cloud services and user interfaces.",
    priority: 10,
  },

  {
    id: "iot-wifi",
    category: "iot",
    question: "Can ESP32 be used for IoT?",
    variations: [
      "Is ESP32 good for IoT",
      "Can ESP32 connect to WiFi",
      "Can I make an IoT project with ESP32",
      "Can ESP32 send sensor data online",
    ],
    keywords: ["esp32", "iot", "wifi", "sensor", "internet"],
    answer:
      "Yes. ESP32 devices are commonly used for IoT applications because many variants provide Wi-Fi and other connectivity features. The system can collect sensor data and communicate with a server or other network service.",
    priority: 10,
  },

  {
    id: "iot-mqtt",
    category: "iot",
    question: "What is MQTT?",
    variations: [
      "Explain MQTT",
      "What is MQTT protocol",
      "How does MQTT work",
      "Why use MQTT for IoT",
    ],
    keywords: ["mqtt", "iot", "protocol", "publish", "subscribe"],
    answer:
      "MQTT is a lightweight messaging protocol commonly used for IoT. Devices typically publish messages to topics through a broker, while subscribers receive messages from topics they subscribe to.",
    priority: 10,
  },

  {
    id: "iot-http",
    category: "iot",
    question: "What is the difference between MQTT and HTTP for IoT?",
    variations: [
      "MQTT vs HTTP",
      "Should I use MQTT or HTTP",
      "Which protocol is better for IoT",
      "Can IoT use REST APIs",
    ],
    keywords: ["mqtt", "http", "iot", "api", "protocol"],
    answer:
      "HTTP follows a request/response model and is widely used for web APIs. MQTT uses a publish/subscribe model and can be efficient for device messaging. The appropriate choice depends on architecture, communication patterns, infrastructure and requirements.",
    priority: 9,
  },

  {
    id: "iot-cloud",
    category: "iot",
    question: "Does an IoT device need cloud services?",
    variations: [
      "Does IoT require cloud",
      "Can IoT work without cloud",
      "Do I need a server for IoT",
      "Can I run IoT locally",
    ],
    keywords: ["iot", "cloud", "server", "local", "internet"],
    answer:
      "No. IoT systems can communicate with local devices or local servers without a public cloud. Cloud services are useful when remote access, centralized storage, analytics or multi-location connectivity is required.",
    priority: 9,
  },

  {
    id: "iot-security",
    category: "iot",
    question: "How should an IoT device be secured?",
    variations: [
      "Is IoT secure",
      "How do I secure an IoT device",
      "How can I protect connected hardware",
      "IoT security basics",
    ],
    keywords: ["iot", "security", "password", "authentication", "encryption"],
    answer:
      "IoT security should include appropriate authentication, protected credentials, encrypted communication where appropriate, restricted network access, secure firmware practices and careful handling of device updates. Security requirements depend heavily on the application.",
    priority: 10,
  },

  {
    id: "iot-offline",
    category: "iot",
    question: "Can an IoT project work when the internet goes down?",
    variations: [
      "Can IoT work offline",
      "What happens if WiFi disconnects",
      "Can ESP32 continue without internet",
      "Can a connected device have offline mode",
    ],
    keywords: ["iot", "offline", "wifi", "internet", "disconnect"],
    answer:
      "Yes, if the firmware is designed for local operation. A robust IoT device can continue core functions locally and reconnect when network access becomes available again.",
    priority: 9,
  },

  {
    id: "iot-reconnect",
    category: "iot",
    question: "How should an IoT device handle WiFi disconnections?",
    variations: [
      "How do I reconnect ESP32 WiFi",
      "What if WiFi drops",
      "How can IoT reconnect automatically",
      "ESP32 keeps losing WiFi",
    ],
    keywords: ["wifi", "disconnect", "reconnect", "esp32", "iot"],
    answer:
      "Firmware can monitor the connection state, retry with controlled backoff and continue local functions while disconnected. The design should avoid blocking the entire application while repeatedly attempting to reconnect.",
    priority: 9,
  },
] as const;
