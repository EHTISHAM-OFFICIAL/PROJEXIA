import type { HelpEntry } from "./types";

export const IOT_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // FOUNDATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-what-is",
    category: "iot",
    intent: "definition",
    question: "What is IoT?",
    variations: [
      "What is IoT",
      "Explain Internet of Things",
      "What does IoT mean",
      "What is an IoT device",
      "How does IoT work",
      "IoT definition",
      "What is the Internet of Things",
      "IoT meaning",
    ],
    keywords: ["iot", "internet", "things", "connected", "device"],
    answer:
      "IoT, or Internet of Things, refers to physical devices that collect, process or exchange data over a network. An IoT system can include sensors, controllers, communication networks, servers or cloud services and user interfaces.",
    priority: 14,
  },

  {
    id: "iot-purpose",
    category: "iot",
    intent: "purpose",
    question: "What is IoT used for?",
    variations: [
      "What is IoT used for",
      "What can IoT do",
      "Where is IoT used",
      "What are the uses of IoT",
      "What is the purpose of IoT",
      "IoT applications",
      "IoT use cases",
      "Why use IoT",
    ],
    keywords: ["iot", "used", "purpose", "application", "monitoring"],
    answer:
      "IoT is used to connect devices to a network so they can monitor conditions, send data, receive commands and support automation. Common uses include smart home, industrial monitoring, agriculture, healthcare, logistics, energy and asset tracking.",
    priority: 14,
  },

  {
    id: "iot-device",
    category: "iot",
    intent: "definition",
    question: "What is an IoT device?",
    variations: [
      "What is an IoT device",
      "What makes a device IoT",
      "IoT device meaning",
      "Examples of IoT devices",
      "What counts as IoT",
      "IoT device definition",
    ],
    keywords: ["iot", "device", "connected", "sensor", "network"],
    answer:
      "An IoT device is a physical device that can collect or act on data and communicate over a network. It usually combines sensing, processing, communication and often some form of local or cloud integration.",
    priority: 13,
  },

  {
    id: "iot-architecture",
    category: "iot",
    intent: "definition",
    question: "What is the architecture of an IoT system?",
    variations: [
      "What is the architecture of an IoT system",
      "IoT architecture",
      "How is IoT structured",
      "Layers of IoT",
      "IoT system components",
      "IoT architecture layers",
    ],
    keywords: ["iot", "architecture", "layers", "components", "system"],
    answer:
      "A typical IoT architecture includes devices and sensors, connectivity, data processing, cloud or local services and a user interface. The exact structure depends on the application.",
    priority: 13,
  },

  {
    id: "iot-edge",
    category: "iot",
    intent: "definition",
    question: "What is edge computing in IoT?",
    variations: [
      "What is edge computing in IoT",
      "Edge computing IoT",
      "Process data at the edge",
      "Edge vs cloud IoT",
      "Local data processing IoT",
      "Edge computing definition",
    ],
    keywords: ["edge", "computing", "iot", "local", "cloud"],
    answer:
      "Edge computing processes data near the source, such as on the device or a local gateway. It can reduce latency, bandwidth and dependence on cloud connectivity.",
    priority: 13,
  },

  {
    id: "iot-gateway",
    category: "iot",
    intent: "definition",
    question: "What is an IoT gateway?",
    variations: [
      "What is an IoT gateway",
      "IoT gateway",
      "Gateway device IoT",
      "Connect sensors to cloud",
      "Edge gateway",
      "IoT gateway definition",
    ],
    keywords: ["gateway", "iot", "connect", "cloud", "edge"],
    answer:
      "An IoT gateway connects local devices to a wider network or cloud service. It may translate protocols, aggregate data, provide local processing and manage device connectivity.",
    priority: 13,
  },

  {
    id: "iot-sensor",
    category: "iot",
    intent: "definition",
    question: "What sensors are commonly used in IoT?",
    variations: [
      "What sensors are commonly used in IoT",
      "IoT sensors",
      "Common IoT sensors",
      "Which sensors for IoT",
      "Sensor types IoT",
      "IoT sensor examples",
    ],
    keywords: ["sensor", "iot", "temperature", "humidity", "motion"],
    answer:
      "Common IoT sensors include temperature, humidity, pressure, motion, light, current, gas and distance sensors. The choice depends on what needs to be measured.",
    priority: 13,
  },

  {
    id: "iot-actuator",
    category: "iot",
    intent: "definition",
    question: "What is an actuator in IoT?",
    variations: [
      "What is an actuator in IoT",
      "IoT actuator",
      "What does an actuator do IoT",
      "Actuator examples IoT",
      "Control output IoT",
      "IoT actuator definition",
    ],
    keywords: ["actuator", "iot", "output", "control", "relay"],
    answer:
      "An actuator converts a control signal into physical action. In IoT, actuators include relays, motors, servos, valves and other devices that are controlled based on sensor data or remote commands.",
    priority: 13,
  },

  {
    id: "iot-protocol-selection",
    category: "iot",
    intent: "comparison",
    question: "Which IoT protocol should I use?",
    variations: [
      "Which IoT protocol should I use",
      "How to choose IoT protocol",
      "IoT protocol comparison",
      "Best protocol for IoT",
      "MQTT vs CoAP vs HTTP",
      "IoT protocol selection",
    ],
    keywords: ["iot", "protocol", "choose", "mqtt", "coap", "http"],
    answer:
      "The correct protocol depends on bandwidth, latency, power, reliability and infrastructure. MQTT suits messaging, CoAP suits constrained devices, HTTP suits request/response APIs, and cellular or LoRaWAN suit long-range or low-power applications.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // CONNECTIVITY TECHNOLOGIES
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-wifi",
    category: "iot",
    intent: "definition",
    question: "Can ESP32 be used for IoT?",
    variations: [
      "Can ESP32 be used for IoT",
      "Is ESP32 good for IoT",
      "Can ESP32 connect to WiFi",
      "Can I make an IoT project with ESP32",
      "Can ESP32 send sensor data online",
      "ESP32 for IoT",
    ],
    keywords: ["esp32", "iot", "wifi", "sensor", "internet"],
    answer:
      "Yes. ESP32 devices are commonly used for IoT applications because many variants provide Wi-Fi and other connectivity features. The system can collect sensor data and communicate with a server or other network service.",
    priority: 13,
  },

  {
    id: "iot-cellular",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use cellular connectivity?",
    variations: [
      "Can IoT use cellular connectivity",
      "Cellular IoT",
      "4G IoT device",
      "GSM IoT",
      "Cellular module IoT",
      "Cellular connectivity for IoT",
    ],
    keywords: ["cellular", "iot", "4g", "gsm", "module"],
    answer:
      "Yes. Cellular connectivity is used when wide-area coverage is needed. Modems and data plans must be considered, along with power and cost.",
    priority: 13,
  },

  {
    id: "iot-wifi-vs-cellular",
    category: "iot",
    intent: "comparison",
    question: "WiFi vs cellular for IoT — which is better?",
    variations: [
      "WiFi vs cellular for IoT",
      "WiFi vs cellular IoT",
      "Which connectivity for IoT",
      "Cellular or WiFi IoT",
      "Compare IoT connectivity",
      "WiFi vs cellular comparison",
    ],
    keywords: ["wifi", "cellular", "iot", "compare", "connectivity"],
    answer:
      "WiFi is lower cost and higher bandwidth but limited to coverage areas. Cellular provides wide coverage but has ongoing data costs and higher power. The choice depends on the application.",
    priority: 13,
  },

  {
    id: "iot-ble",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use Bluetooth Low Energy?",
    variations: [
      "Can IoT use Bluetooth Low Energy",
      "BLE IoT",
      "Bluetooth IoT device",
      "BLE sensor IoT",
      "BLE vs WiFi IoT",
      "BLE for IoT",
    ],
    keywords: ["ble", "bluetooth", "iot", "low", "energy"],
    answer:
      "Yes. BLE is used for short-range, low-power IoT applications such as wearables, sensors and device configuration.",
    priority: 13,
  },

  {
    id: "iot-zigbee",
    category: "iot",
    intent: "definition",
    question: "What is Zigbee?",
    variations: [
      "What is Zigbee",
      "Zigbee IoT",
      "Zigbee protocol",
      "Zigbee mesh network",
      "Zigbee vs WiFi",
      "Zigbee definition",
    ],
    keywords: ["zigbee", "iot", "mesh", "protocol", "network"],
    answer:
      "Zigbee is a low-power mesh networking protocol used in home and industrial automation. It operates on IEEE 802.15.4 and supports many devices in a mesh.",
    priority: 13,
  },

  {
    id: "iot-thread",
    category: "iot",
    intent: "definition",
    question: "What is Thread?",
    variations: [
      "What is Thread",
      "Thread protocol IoT",
      "Thread mesh network",
      "Thread vs Zigbee",
      "Thread IoT",
      "Thread definition",
    ],
    keywords: ["thread", "iot", "mesh", "protocol", "network"],
    answer:
      "Thread is a low-power mesh networking protocol for IoT. It uses IPv6 and is designed for reliable, secure communication.",
    priority: 13,
  },

  {
    id: "iot-matter",
    category: "iot",
    intent: "definition",
    question: "What is Matter?",
    variations: [
      "What is Matter",
      "Matter IoT",
      "Matter smart home",
      "Matter protocol",
      "Matter vs Zigbee",
      "Matter definition",
    ],
    keywords: ["matter", "iot", "smart", "home", "protocol"],
    answer:
      "Matter is an interoperability standard for smart home devices. It runs over Thread, Wi-Fi or Ethernet and aims to simplify device integration.",
    priority: 13,
  },

  {
    id: "iot-zwave",
    category: "iot",
    intent: "definition",
    question: "What is Z-Wave?",
    variations: [
      "What is Z-Wave",
      "Z-Wave IoT",
      "Z-Wave protocol",
      "Z-Wave home automation",
      "Z-Wave vs Zigbee",
      "Z-Wave definition",
    ],
    keywords: ["zwave", "iot", "home", "automation", "protocol"],
    answer:
      "Z-Wave is a wireless mesh protocol for home automation. It operates in sub-GHz bands and is designed for low power.",
    priority: 13,
  },

  {
    id: "iot-lorawan",
    category: "iot",
    intent: "definition",
    question: "What is LoRaWAN?",
    variations: [
      "What is LoRaWAN",
      "LoRaWAN IoT",
      "LoRa protocol",
      "Long range IoT",
      "LoRaWAN architecture",
      "LoRaWAN definition",
    ],
    keywords: ["lorawan", "iot", "long", "range", "lora"],
    answer:
      "LoRaWAN is a low-power wide-area networking protocol built on LoRa radio. It is used for long-range, low-bandwidth IoT applications such as remote sensing and metering.",
    priority: 13,
  },

  {
    id: "iot-nbiot",
    category: "iot",
    intent: "definition",
    question: "What is NB-IoT?",
    variations: [
      "What is NB-IoT",
      "NB-IoT",
      "Narrowband IoT",
      "Cellular IoT",
      "NB-IoT vs LoRa",
      "NB-IoT definition",
    ],
    keywords: ["nbiot", "iot", "cellular", "narrowband", "network"],
    answer:
      "NB-IoT is a narrowband cellular technology designed for IoT. It provides wide coverage, low power and good penetration for devices with low data requirements.",
    priority: 13,
  },

  {
    id: "iot-lte-m",
    category: "iot",
    intent: "definition",
    question: "What is LTE-M?",
    variations: [
      "What is LTE-M",
      "LTE-M",
      "LTE Cat M1",
      "Cellular IoT LTE",
      "LTE-M vs NB-IoT",
      "LTE-M definition",
    ],
    keywords: ["lte", "m", "iot", "cellular", "cat"],
    answer:
      "LTE-M is a cellular IoT technology that supports higher data rates and mobility compared to NB-IoT. It is used for applications needing voice or moderate bandwidth.",
    priority: 13,
  },

  {
    id: "iot-lora-vs-nbiot",
    category: "iot",
    intent: "comparison",
    question: "LoRaWAN vs NB-IoT — which should I use?",
    variations: [
      "LoRaWAN vs NB-IoT",
      "Which is better LoRaWAN or NB-IoT",
      "LoRa vs NB-IoT",
      "Compare LoRaWAN and NB-IoT",
      "LoRaWAN or NB-IoT",
      "LPWAN comparison",
    ],
    keywords: ["lorawan", "nbiot", "compare", "lpwan", "iot"],
    answer:
      "LoRaWAN typically uses unlicensed spectrum with private gateways. NB-IoT uses licensed cellular networks and may have ongoing data costs. Coverage, power, cost and infrastructure determine the best choice.",
    priority: 13,
  },

  {
    id: "iot-sigfox",
    category: "iot",
    intent: "definition",
    question: "What is Sigfox?",
    variations: [
      "What is Sigfox",
      "Sigfox IoT",
      "Sigfox network",
      "Sigfox vs LoRa",
      "Sigfox protocol",
      "Sigfox definition",
    ],
    keywords: ["sigfox", "iot", "network", "lpwan", "long"],
    answer:
      "Sigfox is a low-power wide-area network technology for very low data rate IoT applications. Coverage and availability depend on the operator.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MESSAGING PROTOCOLS
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-mqtt",
    category: "iot",
    intent: "definition",
    question: "What is MQTT?",
    variations: [
      "What is MQTT",
      "Explain MQTT",
      "What is MQTT protocol",
      "How does MQTT work",
      "Why use MQTT for IoT",
      "MQTT definition",
    ],
    keywords: ["mqtt", "iot", "protocol", "publish", "subscribe"],
    answer:
      "MQTT is a lightweight messaging protocol commonly used for IoT. Devices typically publish messages to topics through a broker, while subscribers receive messages from topics they subscribe to.",
    priority: 14,
  },

  {
    id: "iot-mqtt-broker",
    category: "iot",
    intent: "definition",
    question: "What is an MQTT broker?",
    variations: [
      "What is an MQTT broker",
      "MQTT broker",
      "What does broker do MQTT",
      "MQTT server",
      "Message broker IoT",
      "MQTT broker definition",
    ],
    keywords: ["mqtt", "broker", "iot", "server", "message"],
    answer:
      "An MQTT broker receives messages from publishers and forwards them to subscribers. It manages topics, connections, QoS and retained messages.",
    priority: 13,
  },

  {
    id: "iot-mqtt-topic",
    category: "iot",
    intent: "procedure",
    question: "How do I design MQTT topics?",
    variations: [
      "How do I design MQTT topics",
      "MQTT topic design",
      "Topic structure MQTT",
      "Naming topics IoT",
      "MQTT hierarchy",
      "MQTT topic structure",
    ],
    keywords: ["mqtt", "topic", "iot", "design", "structure"],
    answer:
      "Topics are hierarchical and should be designed for clarity, scalability and access control. Common patterns include device ID, data type and location.",
    priority: 13,
  },

  {
    id: "iot-mqtt-qos",
    category: "iot",
    intent: "definition",
    question: "What is MQTT QoS?",
    variations: [
      "What is MQTT QoS",
      "MQTT QoS levels",
      "Quality of service MQTT",
      "MQTT delivery guarantee",
      "QoS 0 1 2 MQTT",
      "MQTT QoS definition",
    ],
    keywords: ["mqtt", "qos", "iot", "quality", "service"],
    answer:
      "MQTT QoS levels define delivery guarantees: 0 (at most once), 1 (at least once) and 2 (exactly once). Higher levels add overhead and latency.",
    priority: 13,
  },

  {
    id: "iot-mqtt-retain",
    category: "iot",
    intent: "definition",
    question: "What is MQTT retained message?",
    variations: [
      "What is MQTT retained message",
      "MQTT retain flag",
      "Retained message MQTT",
      "Last known value MQTT",
      "MQTT retain purpose",
      "MQTT retained message",
    ],
    keywords: ["mqtt", "retain", "iot", "message", "last"],
    answer:
      "A retained message is stored by the broker and sent to new subscribers, providing the last known value for a topic.",
    priority: 13,
  },

  {
    id: "iot-mqtt-will",
    category: "iot",
    intent: "definition",
    question: "What is MQTT last will?",
    variations: [
      "What is MQTT last will",
      "MQTT will message",
      "Last will testament",
      "Offline notification MQTT",
      "Will flag MQTT",
      "MQTT last will definition",
    ],
    keywords: ["mqtt", "will", "iot", "offline", "message"],
    answer:
      "The last will is a message the broker publishes if the client disconnects unexpectedly. It is useful for offline detection and alerts.",
    priority: 13,
  },

  {
    id: "iot-mqtt-security",
    category: "iot",
    intent: "procedure",
    question: "How do I secure MQTT?",
    variations: [
      "How do I secure MQTT",
      "MQTT security",
      "Secure MQTT TLS",
      "MQTT authentication",
      "Protect MQTT IoT",
      "MQTT security best practices",
    ],
    keywords: ["mqtt", "security", "iot", "tls", "authentication"],
    answer:
      "Use TLS for encryption, authentication for clients and authorization for topic access. Avoid default credentials and protect keys.",
    priority: 14,
  },

  {
    id: "iot-coap",
    category: "iot",
    intent: "definition",
    question: "What is CoAP?",
    variations: [
      "What is CoAP",
      "CoAP protocol",
      "Constrained application protocol",
      "CoAP vs MQTT",
      "CoAP IoT",
      "CoAP definition",
    ],
    keywords: ["coap", "iot", "protocol", "constrained", "udp"],
    answer:
      "CoAP, or Constrained Application Protocol, is designed for constrained devices and networks. It uses UDP and a request/response model, and is often used in IoT and M2M applications.",
    priority: 13,
  },

  {
    id: "iot-http",
    category: "iot",
    intent: "comparison",
    question: "What is the difference between MQTT and HTTP for IoT?",
    variations: [
      "What is the difference between MQTT and HTTP for IoT",
      "MQTT vs HTTP",
      "Should I use MQTT or HTTP",
      "Which protocol is better for IoT",
      "Can IoT use REST APIs",
      "MQTT vs HTTP comparison",
    ],
    keywords: ["mqtt", "http", "iot", "api", "protocol"],
    answer:
      "HTTP follows a request/response model and is widely used for web APIs. MQTT uses a publish/subscribe model and can be efficient for device messaging. The appropriate choice depends on architecture, communication patterns, infrastructure and requirements.",
    priority: 13,
  },

  {
    id: "iot-websocket",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use WebSocket?",
    variations: [
      "Can IoT use WebSocket",
      "WebSocket IoT",
      "Real time IoT communication",
      "WebSocket vs MQTT",
      "WebSocket dashboard IoT",
      "WebSocket in IoT",
    ],
    keywords: ["websocket", "iot", "real", "time", "communication"],
    answer:
      "WebSocket provides a persistent bidirectional connection and can be used for real-time IoT control or monitoring, especially with web dashboards.",
    priority: 13,
  },

  {
    id: "iot-http-api",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT devices use REST APIs?",
    variations: [
      "Can IoT devices use REST APIs",
      "REST API IoT",
      "HTTP API device",
      "IoT RESTful communication",
      "API for IoT device",
      "REST APIs in IoT",
    ],
    keywords: ["rest", "api", "iot", "http", "device"],
    answer:
      "Yes. IoT devices can send data to or receive commands from REST APIs using HTTP. This is common for cloud integration and dashboards.",
    priority: 13,
  },

  {
    id: "iot-amqp",
    category: "iot",
    intent: "definition",
    question: "Can IoT use AMQP?",
    variations: [
      "Can IoT use AMQP",
      "AMQP IoT",
      "AMQP vs MQTT",
      "Message queue AMQP IoT",
      "AMQP protocol",
      "AMQP in IoT",
    ],
    keywords: ["amqp", "iot", "protocol", "message", "queue"],
    answer:
      "AMQP is a message-oriented protocol used in enterprise messaging. It can be used in IoT but is heavier than MQTT and typically found in gateway or cloud layers rather than on constrained devices.",
    priority: 10,
  },

  {
    id: "iot-protocol-translation",
    category: "iot",
    intent: "procedure",
    question: "What is protocol translation in IoT?",
    variations: [
      "What is protocol translation in IoT",
      "Protocol translation IoT",
      "Convert protocols IoT",
      "Modbus to MQTT",
      "Protocol converter IoT",
      "Protocol translation",
    ],
    keywords: ["protocol", "translation", "iot", "gateway", "convert"],
    answer:
      "Protocol translation converts data between different communication protocols, such as Modbus to MQTT. It is often implemented on a gateway or controller with multiple interfaces.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // CLOUD / PLATFORMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-cloud",
    category: "iot",
    intent: "compatibility",
    question: "Does an IoT device need cloud services?",
    variations: [
      "Does an IoT device need cloud services",
      "Does IoT require cloud",
      "Can IoT work without cloud",
      "Do I need a server for IoT",
      "Can I run IoT locally",
      "IoT cloud requirement",
    ],
    keywords: ["iot", "cloud", "server", "local", "internet"],
    answer:
      "No. IoT systems can communicate with local devices or local servers without a public cloud. Cloud services are useful when remote access, centralized storage, analytics or multi-location connectivity is required.",
    priority: 13,
  },

  {
    id: "iot-cloud-platform",
    category: "iot",
    intent: "comparison",
    question: "Which cloud platforms are used for IoT?",
    variations: [
      "Which cloud platforms are used for IoT",
      "IoT cloud platforms",
      "AWS IoT Azure IoT",
      "IoT platform choices",
      "Cloud for IoT",
      "IoT cloud platform options",
    ],
    keywords: ["cloud", "iot", "platform", "aws", "azure"],
    answer:
      "Common IoT cloud platforms include AWS IoT, Azure IoT, Google Cloud IoT and others. The choice depends on features, cost and integration needs.",
    priority: 13,
  },

  {
    id: "iot-aws",
    category: "iot",
    intent: "definition",
    question: "What is AWS IoT?",
    variations: [
      "What is AWS IoT",
      "AWS IoT Core",
      "Amazon IoT",
      "AWS IoT services",
      "AWS IoT platform",
      "AWS IoT definition",
    ],
    keywords: ["aws", "iot", "amazon", "cloud", "platform"],
    answer:
      "AWS IoT is Amazon's IoT platform. It provides device connectivity, messaging, rules, storage and analytics services.",
    priority: 13,
  },

  {
    id: "iot-azure",
    category: "iot",
    intent: "definition",
    question: "What is Azure IoT?",
    variations: [
      "What is Azure IoT",
      "Azure IoT Hub",
      "Microsoft IoT",
      "Azure IoT services",
      "Azure IoT platform",
      "Azure IoT definition",
    ],
    keywords: ["azure", "iot", "microsoft", "cloud", "platform"],
    answer:
      "Azure IoT is Microsoft's IoT platform. It provides device connectivity, management, analytics and integration with Azure services.",
    priority: 13,
  },

  {
    id: "iot-firebase",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use Firebase?",
    variations: [
      "Can IoT use Firebase",
      "Firebase IoT",
      "Firebase realtime database IoT",
      "Firebase ESP32",
      "Firebase cloud IoT",
      "Firebase in IoT",
    ],
    keywords: ["firebase", "iot", "cloud", "database", "esp32"],
    answer:
      "Firebase can be used for IoT applications to store data, send notifications and provide real-time updates. It is commonly used with ESP32 and similar devices.",
    priority: 10,
  },

  {
    id: "iot-thingspeak",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use ThingSpeak?",
    variations: [
      "Can IoT use ThingSpeak",
      "ThingSpeak IoT",
      "ThingSpeak ESP32",
      "ThingSpeak platform",
      "ThingSpeak for sensor data",
      "ThingSpeak in IoT",
    ],
    keywords: ["thingspeak", "iot", "platform", "sensor", "data"],
    answer:
      "ThingSpeak is an IoT analytics platform used for collecting, visualizing and analyzing sensor data. It is popular for small to medium projects and educational use.",
    priority: 10,
  },

  {
    id: "iot-blynk",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use Blynk?",
    variations: [
      "Can IoT use Blynk",
      "Blynk IoT",
      "Blynk ESP32",
      "Blynk app",
      "Blynk platform",
      "Blynk in IoT",
    ],
    keywords: ["blynk", "iot", "app", "platform", "esp32"],
    answer:
      "Blynk is a platform for building IoT apps that control devices and display data, commonly used with ESP32 and similar boards.",
    priority: 10,
  },

  {
    id: "iot-device-shadow",
    category: "iot",
    intent: "definition",
    question: "What is a device shadow?",
    variations: [
      "What is a device shadow",
      "Device shadow IoT",
      "Digital twin IoT",
      "Shadow document AWS",
      "Device state cloud",
      "Device shadow definition",
    ],
    keywords: ["shadow", "device", "iot", "cloud", "state"],
    answer:
      "A device shadow is a cloud representation of a device's state. It allows applications to read or update desired state even when the device is offline, with synchronization when it reconnects.",
    priority: 13,
  },

  {
    id: "iot-digital-twin",
    category: "iot",
    intent: "definition",
    question: "What is a digital twin?",
    variations: [
      "What is a digital twin",
      "Digital twin IoT",
      "Virtual representation device",
      "Twin cloud IoT",
      "Digital twin purpose",
      "Digital twin definition",
    ],
    keywords: ["digital", "twin", "iot", "cloud", "representation"],
    answer:
      "A digital twin is a virtual representation of a physical device or system. It can be used for monitoring, simulation and analysis.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DEVICE MANAGEMENT / LIFECYCLE
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-device-management",
    category: "iot",
    intent: "definition",
    question: "What is IoT device management?",
    variations: [
      "What is IoT device management",
      "Device management IoT",
      "Manage IoT fleet",
      "Remote device management",
      "IoT fleet management",
      "IoT device management definition",
    ],
    keywords: ["device", "management", "iot", "fleet", "remote"],
    answer:
      "IoT device management includes provisioning, configuration, monitoring, updates and decommissioning of devices at scale.",
    priority: 13,
  },

  {
    id: "iot-provisioning",
    category: "iot",
    intent: "procedure",
    question: "What is IoT device provisioning?",
    variations: [
      "What is IoT device provisioning",
      "Device provisioning IoT",
      "Provision IoT device",
      "Setup IoT device",
      "IoT onboarding",
      "IoT provisioning definition",
    ],
    keywords: ["provisioning", "iot", "device", "setup", "onboarding"],
    answer:
      "Provisioning configures a device with credentials, network settings and identity for deployment. It can be done in the factory, on-site or through a setup process.",
    priority: 13,
  },

  {
    id: "iot-provisioning-options",
    category: "iot",
    intent: "comparison",
    question: "What are common IoT provisioning methods?",
    variations: [
      "What are common IoT provisioning methods",
      "IoT provisioning options",
      "How to provision IoT device",
      "BLE provisioning vs AP provisioning",
      "Provisioning methods IoT",
      "IoT provisioning methods",
    ],
    keywords: ["provisioning", "iot", "methods", "ble", "wifi"],
    answer:
      "Common methods include factory provisioning, Wi-Fi setup access point, BLE provisioning, serial provisioning and cloud onboarding. The best method depends on the device, user experience and security requirements.",
    priority: 13,
  },

  {
    id: "iot-ota",
    category: "iot",
    intent: "procedure",
    question: "What is OTA update in IoT?",
    variations: [
      "What is OTA update in IoT",
      "OTA IoT",
      "Over the air update IoT",
      "Remote firmware update IoT",
      "IoT firmware update",
      "OTA update in IoT",
    ],
    keywords: ["ota", "iot", "update", "firmware", "remote"],
    answer:
      "OTA update allows firmware to be updated wirelessly or over a network without a physical connection. It is useful for deployed devices but requires security and recovery design.",
    priority: 14,
  },

  {
    id: "iot-ota-rollback",
    category: "iot",
    intent: "procedure",
    question: "How does OTA rollback work?",
    variations: [
      "How does OTA rollback work",
      "OTA rollback IoT",
      "Revert firmware IoT",
      "Failed update recovery IoT",
      "IoT update rollback",
      "OTA rollback",
    ],
    keywords: ["ota", "rollback", "iot", "firmware", "recovery"],
    answer:
      "The device keeps a known-good firmware image. If the new image fails, the bootloader or update system reverts to the previous version.",
    priority: 13,
  },

  {
    id: "iot-fleet-management",
    category: "iot",
    intent: "definition",
    question: "What is fleet management in IoT?",
    variations: [
      "What is fleet management in IoT",
      "IoT fleet",
      "Manage many devices IoT",
      "Fleet management IoT",
      "Device fleet IoT",
      "IoT fleet management",
    ],
    keywords: ["fleet", "management", "iot", "devices", "scale"],
    answer:
      "Fleet management involves monitoring, updating and managing many IoT devices from a centralized system. It usually includes dashboards, alerting and remote configuration.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // DATA / ANALYTICS / DASHBOARDS
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-data-storage",
    category: "iot",
    intent: "procedure",
    question: "Where is IoT data stored?",
    variations: [
      "Where is IoT data stored",
      "IoT data storage",
      "Store IoT data",
      "IoT database",
      "IoT cloud storage",
      "IoT data storage options",
    ],
    keywords: ["data", "storage", "iot", "database", "cloud"],
    answer:
      "IoT data can be stored on the device, at a gateway, on a local server or in the cloud. The choice depends on volume, retention, access and cost.",
    priority: 13,
  },

  {
    id: "iot-time-series",
    category: "iot",
    intent: "definition",
    question: "What is a time-series database for IoT?",
    variations: [
      "What is a time-series database for IoT",
      "Time series database IoT",
      "IoT time series data",
      "Store sensor data time series",
      "TSDB IoT",
      "Time-series database for IoT",
    ],
    keywords: ["time", "series", "database", "iot", "sensor"],
    answer:
      "Time-series databases are optimized for timestamped data such as sensor readings. They support efficient storage and querying of large volumes of time-based data.",
    priority: 13,
  },

  {
    id: "iot-influxdb",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use InfluxDB?",
    variations: [
      "Can IoT use InfluxDB",
      "InfluxDB IoT",
      "Time series database IoT",
      "Store IoT data InfluxDB",
      "InfluxDB sensor data",
      "InfluxDB in IoT",
    ],
    keywords: ["influxdb", "iot", "time", "series", "database"],
    answer:
      "InfluxDB is a time-series database often used to store IoT sensor data. It is optimized for high write throughput and time-based queries.",
    priority: 10,
  },

  {
    id: "iot-grafana",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use Grafana?",
    variations: [
      "Can IoT use Grafana",
      "Grafana IoT",
      "Grafana dashboard",
      "IoT visualization Grafana",
      "Grafana for sensor data",
      "Grafana in IoT",
    ],
    keywords: ["grafana", "iot", "dashboard", "visualization", "data"],
    answer:
      "Grafana is commonly used to visualize IoT data from databases or time-series stores. It supports dashboards, alerts and many data sources.",
    priority: 10,
  },

  {
    id: "iot-dashboard",
    category: "iot",
    intent: "procedure",
    question: "How do I create an IoT dashboard?",
    variations: [
      "How do I create an IoT dashboard",
      "IoT dashboard",
      "Monitor IoT data",
      "Dashboard for IoT device",
      "Visualize IoT data",
      "IoT dashboard creation",
    ],
    keywords: ["dashboard", "iot", "monitor", "visualize", "data"],
    answer:
      "An IoT dashboard displays device data and can provide controls. It can be built with web technologies, cloud platforms or specialized IoT dashboard tools.",
    priority: 13,
  },

  {
    id: "iot-node-red",
    category: "iot",
    intent: "definition",
    question: "What is Node-RED?",
    variations: [
      "What is Node-RED",
      "Node-RED IoT",
      "Node-RED flow",
      "IoT automation Node-RED",
      "Node-RED dashboard",
      "Node-RED definition",
    ],
    keywords: ["node-red", "iot", "flow", "automation", "dashboard"],
    answer:
      "Node-RED is a flow-based development tool for wiring together devices, APIs and services. It is commonly used for IoT automation and prototyping.",
    priority: 10,
  },

  {
    id: "iot-home-assistant",
    category: "iot",
    intent: "definition",
    question: "What is Home Assistant?",
    variations: [
      "What is Home Assistant",
      "Home Assistant IoT",
      "Home Assistant integration",
      "Home automation platform",
      "Home Assistant ESP32",
      "Home Assistant definition",
    ],
    keywords: ["home", "assistant", "iot", "automation", "integration"],
    answer:
      "Home Assistant is an open-source home automation platform. It can integrate many IoT devices and provide dashboards, automation and remote access.",
    priority: 10,
  },

  {
    id: "iot-analytics",
    category: "iot",
    intent: "procedure",
    question: "How is IoT data analyzed?",
    variations: [
      "How is IoT data analyzed",
      "IoT analytics",
      "Analyze IoT data",
      "IoT data processing",
      "Sensor data analysis",
      "IoT data analytics",
    ],
    keywords: ["analytics", "iot", "data", "analysis", "processing"],
    answer:
      "IoT data can be analyzed locally, at the edge or in the cloud using statistics, rules or machine learning. The approach depends on the volume and latency requirements.",
    priority: 13,
  },

  {
    id: "iot-machine-learning",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use machine learning?",
    variations: [
      "Can IoT use machine learning",
      "Machine learning IoT",
      "AI in IoT",
      "Edge AI IoT",
      "ML for IoT data",
      "Machine learning in IoT",
    ],
    keywords: ["machine", "learning", "iot", "ai", "edge"],
    answer:
      "Yes. Machine learning can be used for anomaly detection, predictive maintenance, classification and other tasks, either at the edge or in the cloud.",
    priority: 13,
  },

  {
    id: "iot-predictive",
    category: "iot",
    intent: "definition",
    question: "What is predictive maintenance in IoT?",
    variations: [
      "What is predictive maintenance in IoT",
      "Predictive maintenance IoT",
      "Predict failure IoT",
      "Condition monitoring IoT",
      "Maintenance prediction IoT",
      "Predictive maintenance",
    ],
    keywords: ["predictive", "maintenance", "iot", "monitoring", "failure"],
    answer:
      "Predictive maintenance uses sensor data and models to estimate when maintenance is needed, reducing downtime and cost.",
    priority: 13,
  },

  {
    id: "iot-anomaly",
    category: "iot",
    intent: "procedure",
    question: "How is anomaly detection used in IoT?",
    variations: [
      "How is anomaly detection used in IoT",
      "Anomaly detection IoT",
      "Detect abnormal IoT data",
      "Outlier detection IoT",
      "IoT fault detection",
      "Anomaly detection in IoT",
    ],
    keywords: ["anomaly", "detection", "iot", "data", "fault"],
    answer:
      "Anomaly detection identifies unusual patterns in IoT data. It can be used for fault detection, security and process monitoring.",
    priority: 13,
  },

  {
    id: "iot-alert",
    category: "iot",
    intent: "procedure",
    question: "How do IoT systems send alerts?",
    variations: [
      "How do IoT systems send alerts",
      "IoT alerts",
      "Send notification IoT",
      "IoT alarm system",
      "Alert on condition IoT",
      "IoT alerting",
    ],
    keywords: ["alert", "iot", "notification", "alarm", "condition"],
    answer:
      "Alerts can be sent via email, SMS, push notifications, dashboards or other channels. They are often triggered by thresholds, events or analytics.",
    priority: 13,
  },

  {
    id: "iot-rules-engine",
    category: "iot",
    intent: "definition",
    question: "What is an IoT rules engine?",
    variations: [
      "What is an IoT rules engine",
      "IoT rules engine",
      "Rules for IoT data",
      "Automation rules IoT",
      "Cloud rules IoT",
      "IoT rules engine definition",
    ],
    keywords: ["rules", "engine", "iot", "automation", "cloud"],
    answer:
      "A rules engine evaluates incoming IoT data against conditions and triggers actions, such as sending alerts, storing data or controlling other devices.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SECURITY / PRIVACY
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-security",
    category: "iot",
    intent: "procedure",
    question: "How should an IoT device be secured?",
    variations: [
      "How should an IoT device be secured",
      "Is IoT secure",
      "How do I secure an IoT device",
      "How can I protect connected hardware",
      "IoT security basics",
      "IoT security practices",
    ],
    keywords: ["iot", "security", "password", "authentication", "encryption"],
    answer:
      "IoT security should include appropriate authentication, protected credentials, encrypted communication where appropriate, restricted network access, secure firmware practices and careful handling of device updates. Security requirements depend heavily on the application.",
    priority: 14,
  },

  {
    id: "iot-offline",
    category: "iot",
    intent: "compatibility",
    question: "Can an IoT project work when the internet goes down?",
    variations: [
      "Can an IoT project work when the internet goes down",
      "Can IoT work offline",
      "What happens if WiFi disconnects",
      "Can ESP32 continue without internet",
      "Can a connected device have offline mode",
      "IoT offline operation",
    ],
    keywords: ["iot", "offline", "wifi", "internet", "disconnect"],
    answer:
      "Yes, if the firmware is designed for local operation. A robust IoT device can continue core functions locally and reconnect when network access becomes available again.",
    priority: 13,
  },

  {
    id: "iot-reconnect",
    category: "iot",
    intent: "procedure",
    question: "How should an IoT device handle WiFi disconnections?",
    variations: [
      "How should an IoT device handle WiFi disconnections",
      "How do I reconnect ESP32 WiFi",
      "What if WiFi drops",
      "How can IoT reconnect automatically",
      "ESP32 keeps losing WiFi",
      "IoT WiFi reconnection",
    ],
    keywords: ["wifi", "disconnect", "reconnect", "esp32", "iot"],
    answer:
      "Firmware can monitor the connection state, retry with controlled backoff and continue local functions while disconnected. The design should avoid blocking the entire application while repeatedly attempting to reconnect.",
    priority: 13,
  },

  {
    id: "iot-device-identity",
    category: "iot",
    intent: "procedure",
    question: "How is IoT device identity handled?",
    variations: [
      "How is IoT device identity handled",
      "Device identity IoT",
      "Unique identity IoT",
      "Certificate device IoT",
      "Device authentication IoT",
      "IoT device identity",
    ],
    keywords: ["identity", "device", "iot", "certificate", "authentication"],
    answer:
      "Device identity can be based on unique IDs, certificates, keys or tokens. Identity should be provisioned securely and protected against cloning or misuse.",
    priority: 13,
  },

  {
    id: "iot-zero-trust",
    category: "iot",
    intent: "definition",
    question: "What is zero trust for IoT?",
    variations: [
      "What is zero trust for IoT",
      "Zero trust embedded",
      "Zero trust firmware",
      "Never trust always verify",
      "Zero trust IoT",
      "Zero trust in IoT",
    ],
    keywords: ["zero", "trust", "iot", "security", "embedded"],
    answer:
      "Zero trust means not automatically trusting any device or network, even inside a perimeter. Each access is authenticated and authorized.",
    priority: 10,
  },

  {
    id: "iot-privacy",
    category: "iot",
    intent: "procedure",
    question: "How should IoT systems handle user privacy?",
    variations: [
      "How should IoT systems handle user privacy",
      "IoT privacy",
      "Protect user data IoT",
      "Privacy for IoT device",
      "Data privacy IoT",
      "IoT privacy best practices",
    ],
    keywords: ["privacy", "iot", "data", "user", "protect"],
    answer:
      "IoT systems should collect only the data they need, protect it in transit and at rest, provide transparency about data use, and comply with applicable privacy regulations.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // INDUSTRIAL / VERTICALS
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-industrial",
    category: "iot",
    intent: "definition",
    question: "What is Industrial IoT?",
    variations: [
      "What is Industrial IoT",
      "Industrial IoT",
      "IIoT",
      "IoT in industry",
      "Factory IoT",
      "Industrial IoT definition",
    ],
    keywords: ["industrial", "iot", "iiot", "factory", "automation"],
    answer:
      "Industrial IoT applies IoT concepts to manufacturing, energy, transportation and other industrial sectors. It often involves robust hardware, industrial protocols and strict reliability requirements.",
    priority: 13,
  },

  {
    id: "iot-modbus",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use Modbus?",
    variations: [
      "Can IoT use Modbus",
      "Modbus IoT",
      "Modbus to MQTT",
      "Modbus RTU IoT",
      "Modbus gateway IoT",
      "Modbus in IoT",
    ],
    keywords: ["modbus", "iot", "protocol", "gateway", "industrial"],
    answer:
      "Yes. Modbus is a common industrial protocol and can be integrated with IoT systems, often through a gateway that converts Modbus to MQTT or another cloud protocol.",
    priority: 13,
  },

  {
    id: "iot-opcua",
    category: "iot",
    intent: "definition",
    question: "What is OPC UA?",
    variations: [
      "What is OPC UA",
      "OPC UA IoT",
      "OPC Unified Architecture",
      "OPC UA vs Modbus",
      "Industrial protocol OPC UA",
      "OPC UA definition",
    ],
    keywords: ["opc", "ua", "iot", "industrial", "protocol"],
    answer:
      "OPC UA is an industrial communication standard for exchanging data between machines and systems. It is used in industrial IoT and Industry 4.0 applications.",
    priority: 13,
  },

  {
    id: "iot-smart-home",
    category: "iot",
    intent: "definition",
    question: "What is smart home IoT?",
    variations: [
      "What is smart home IoT",
      "Smart home IoT",
      "Home automation IoT",
      "IoT home devices",
      "Connected home",
      "Smart home IoT definition",
    ],
    keywords: ["smart", "home", "iot", "automation", "devices"],
    answer:
      "Smart home IoT includes connected devices for lighting, security, climate, appliances and entertainment. Protocols include Wi-Fi, BLE, Zigbee, Z-Wave and Matter.",
    priority: 13,
  },

  {
    id: "iot-smart-agriculture",
    category: "iot",
    intent: "definition",
    question: "What is smart agriculture IoT?",
    variations: [
      "What is smart agriculture IoT",
      "Smart agriculture IoT",
      "IoT farming",
      "Precision agriculture",
      "Agriculture sensors IoT",
      "Smart agriculture IoT",
    ],
    keywords: ["agriculture", "iot", "farming", "sensors", "monitoring"],
    answer:
      "Smart agriculture uses IoT sensors and automation for soil, weather, irrigation and livestock monitoring. It can improve efficiency and resource use.",
    priority: 13,
  },

  {
    id: "iot-smart-city",
    category: "iot",
    intent: "definition",
    question: "What is smart city IoT?",
    variations: [
      "What is smart city IoT",
      "Smart city IoT",
      "IoT for cities",
      "Urban IoT",
      "City sensors IoT",
      "Smart city IoT definition",
    ],
    keywords: ["smart", "city", "iot", "urban", "sensors"],
    answer:
      "Smart city IoT includes applications such as traffic management, waste management, lighting, parking and environmental monitoring.",
    priority: 13,
  },

  {
    id: "iot-healthcare",
    category: "iot",
    intent: "definition",
    question: "Can IoT be used in healthcare?",
    variations: [
      "Can IoT be used in healthcare",
      "Healthcare IoT",
      "Medical IoT",
      "IoT health monitoring",
      "Wearable health IoT",
      "Healthcare IoT",
    ],
    keywords: ["healthcare", "iot", "medical", "monitoring", "wearable"],
    answer:
      "IoT can be used for remote monitoring, wearables, asset tracking and other healthcare applications. Regulatory and privacy requirements must be considered.",
    priority: 13,
  },

  {
    id: "iot-wearable",
    category: "iot",
    intent: "definition",
    question: "What is a wearable IoT device?",
    variations: [
      "What is a wearable IoT device",
      "Wearable IoT",
      "IoT wearable device",
      "Smartwatch IoT",
      "Fitness tracker IoT",
      "Wearable IoT device",
    ],
    keywords: ["wearable", "iot", "device", "fitness", "smartwatch"],
    answer:
      "Wearable IoT devices are worn on the body and often measure activity, health or environment. They typically use BLE and may connect to a phone or cloud.",
    priority: 13,
  },

  {
    id: "iot-tracker",
    category: "iot",
    intent: "procedure",
    question: "How do IoT asset trackers work?",
    variations: [
      "How do IoT asset trackers work",
      "Asset tracker IoT",
      "IoT tracking device",
      "GPS tracker IoT",
      "Track assets IoT",
      "IoT asset tracking",
    ],
    keywords: ["tracker", "asset", "iot", "gps", "tracking"],
    answer:
      "Asset trackers use GPS, cellular, LoRa or other technologies to report location and status. They often include motion, temperature or other sensors.",
    priority: 13,
  },

  {
    id: "iot-fleet",
    category: "iot",
    intent: "definition",
    question: "What is fleet management IoT?",
    variations: [
      "What is fleet management IoT",
      "Fleet management IoT",
      "Vehicle tracking IoT",
      "IoT fleet",
      "Fleet telematics",
      "Fleet management IoT definition",
    ],
    keywords: ["fleet", "management", "iot", "vehicle", "tracking"],
    answer:
      "Fleet management IoT uses telematics, GPS and sensors to monitor vehicles, driver behavior, fuel use and maintenance.",
    priority: 13,
  },

  {
    id: "iot-energy",
    category: "iot",
    intent: "procedure",
    question: "Can IoT help with energy management?",
    variations: [
      "Can IoT help with energy management",
      "Energy management IoT",
      "Smart energy IoT",
      "IoT energy monitoring",
      "Power monitoring IoT",
      "Energy management with IoT",
    ],
    keywords: ["energy", "management", "iot", "monitoring", "power"],
    answer:
      "IoT can monitor and control energy use in buildings, factories and homes. It supports efficiency, demand response and cost reduction.",
    priority: 13,
  },

  {
    id: "iot-metering",
    category: "iot",
    intent: "definition",
    question: "What is smart metering?",
    variations: [
      "What is smart metering",
      "Smart metering IoT",
      "Smart meter",
      "IoT utility meter",
      "Remote metering",
      "Smart metering definition",
    ],
    keywords: ["metering", "smart", "iot", "utility", "remote"],
    answer:
      "Smart meters use IoT connectivity to report usage and enable remote monitoring or control for utilities.",
    priority: 13,
  },

  {
    id: "iot-environment",
    category: "iot",
    intent: "procedure",
    question: "Can IoT monitor the environment?",
    variations: [
      "Can IoT monitor the environment",
      "Environmental monitoring IoT",
      "IoT air quality",
      "Weather IoT",
      "Environmental sensors IoT",
      "Environmental monitoring with IoT",
    ],
    keywords: ["environment", "monitoring", "iot", "air", "weather"],
    answer:
      "IoT can monitor air quality, weather, water, soil and other environmental parameters using distributed sensors and communication.",
    priority: 13,
  },

  {
    id: "iot-water",
    category: "iot",
    intent: "procedure",
    question: "Can IoT be used for water management?",
    variations: [
      "Can IoT be used for water management",
      "Water management IoT",
      "IoT water monitoring",
      "Smart water",
      "Water quality IoT",
      "Water management with IoT",
    ],
    keywords: ["water", "management", "iot", "monitoring", "quality"],
    answer:
      "IoT can monitor water levels, flow, quality and leaks. It supports irrigation, distribution and conservation.",
    priority: 13,
  },

  {
    id: "iot-waste",
    category: "iot",
    intent: "procedure",
    question: "Can IoT help with waste management?",
    variations: [
      "Can IoT help with waste management",
      "Waste management IoT",
      "Smart bin IoT",
      "IoT waste collection",
      "Bin level sensor",
      "Waste management with IoT",
    ],
    keywords: ["waste", "management", "iot", "bin", "collection"],
    answer:
      "IoT sensors can monitor bin fill levels and optimize collection routes, reducing cost and improving service.",
    priority: 10,
  },

  {
    id: "iot-parking",
    category: "iot",
    intent: "definition",
    question: "What is smart parking IoT?",
    variations: [
      "What is smart parking IoT",
      "Smart parking IoT",
      "Parking sensor IoT",
      "IoT parking system",
      "Parking availability IoT",
      "Smart parking IoT definition",
    ],
    keywords: ["parking", "smart", "iot", "sensor", "availability"],
    answer:
      "Smart parking uses sensors and connectivity to detect available spaces and guide drivers, improving traffic and convenience.",
    priority: 10,
  },

  {
    id: "iot-traffic",
    category: "iot",
    intent: "procedure",
    question: "Can IoT manage traffic?",
    variations: [
      "Can IoT manage traffic",
      "Traffic management IoT",
      "Smart traffic IoT",
      "IoT traffic sensors",
      "Traffic monitoring IoT",
      "Traffic management with IoT",
    ],
    keywords: ["traffic", "management", "iot", "sensors", "monitoring"],
    answer:
      "IoT can monitor traffic flow, control signals and provide real-time information to reduce congestion.",
    priority: 10,
  },

  {
    id: "iot-lighting",
    category: "iot",
    intent: "definition",
    question: "What is smart lighting IoT?",
    variations: [
      "What is smart lighting IoT",
      "Smart lighting IoT",
      "IoT lighting control",
      "Connected lighting",
      "Smart street lights",
      "Smart lighting IoT definition",
    ],
    keywords: ["lighting", "smart", "iot", "control", "connected"],
    answer:
      "Smart lighting uses IoT for remote control, scheduling, occupancy sensing and energy efficiency.",
    priority: 10,
  },

  {
    id: "iot-hvac",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT control HVAC systems?",
    variations: [
      "Can IoT control HVAC systems",
      "HVAC IoT",
      "Smart HVAC control",
      "IoT thermostat",
      "Climate control IoT",
      "HVAC control with IoT",
    ],
    keywords: ["hvac", "iot", "climate", "control", "thermostat"],
    answer:
      "IoT can monitor and control heating, ventilation and air conditioning for comfort and efficiency, often integrating with building management systems.",
    priority: 10,
  },

  {
    id: "iot-building",
    category: "iot",
    intent: "definition",
    question: "What is a smart building?",
    variations: [
      "What is a smart building",
      "Smart building IoT",
      "Building automation IoT",
      "IoT building management",
      "Intelligent building",
      "Smart building definition",
    ],
    keywords: ["building", "smart", "iot", "automation", "management"],
    answer:
      "Smart buildings use IoT for energy, security, lighting, HVAC and occupancy management, improving efficiency and comfort.",
    priority: 10,
  },

  {
    id: "iot-retail",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT be used in retail?",
    variations: [
      "Can IoT be used in retail",
      "Retail IoT",
      "IoT in stores",
      "Smart retail",
      "Inventory IoT",
      "IoT in retail",
    ],
    keywords: ["retail", "iot", "stores", "inventory", "smart"],
    answer:
      "IoT can be used for inventory tracking, customer analytics, smart shelves and supply chain visibility.",
    priority: 10,
  },

  {
    id: "iot-logistics",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT be used in logistics?",
    variations: [
      "Can IoT be used in logistics",
      "Logistics IoT",
      "Supply chain IoT",
      "IoT tracking logistics",
      "Smart logistics",
      "IoT in logistics",
    ],
    keywords: ["logistics", "iot", "supply", "chain", "tracking"],
    answer:
      "IoT enables real-time tracking, condition monitoring and optimization across supply chains and logistics.",
    priority: 13,
  },

  {
    id: "iot-cold-chain",
    category: "iot",
    intent: "definition",
    question: "What is cold chain monitoring IoT?",
    variations: [
      "What is cold chain monitoring IoT",
      "Cold chain IoT",
      "Temperature monitoring logistics",
      "IoT cold chain",
      "Vaccine cold chain IoT",
      "Cold chain monitoring IoT",
    ],
    keywords: ["cold", "chain", "iot", "temperature", "monitoring"],
    answer:
      "Cold chain monitoring uses IoT sensors to track temperature and conditions during transport and storage of sensitive goods.",
    priority: 10,
  },

  {
    id: "iot-security-system",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT be used for security systems?",
    variations: [
      "Can IoT be used for security systems",
      "IoT security system",
      "Smart security IoT",
      "IoT alarm",
      "Connected security",
      "IoT for security",
    ],
    keywords: ["security", "iot", "alarm", "system", "monitoring"],
    answer:
      "IoT security systems can include cameras, sensors, alarms and remote monitoring. Security of the IoT system itself is important.",
    priority: 13,
  },

  {
    id: "iot-camera",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use cameras?",
    variations: [
      "Can IoT use cameras",
      "IoT camera",
      "IP camera IoT",
      "Connected camera",
      "Camera IoT project",
      "Cameras in IoT",
    ],
    keywords: ["camera", "iot", "ip", "connected", "video"],
    answer:
      "Cameras can be part of IoT systems for surveillance, monitoring or image analysis. Bandwidth, storage and privacy should be considered.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PROTOCOLS / HARDWARE BRIDGES
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-nfc",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use NFC?",
    variations: [
      "Can IoT use NFC",
      "NFC IoT",
      "NFC tag IoT",
      "Near field communication IoT",
      "Tap IoT device",
      "NFC in IoT",
    ],
    keywords: ["nfc", "iot", "tag", "communication", "tap"],
    answer:
      "NFC can be used for identification, pairing, configuration and simple data exchange in IoT devices.",
    priority: 10,
  },

  {
    id: "iot-rfid",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use RFID?",
    variations: [
      "Can IoT use RFID",
      "RFID IoT",
      "RFID sensor IoT",
      "IoT asset tracking RFID",
      "RFID connected device",
      "RFID in IoT",
    ],
    keywords: ["rfid", "iot", "tracking", "asset", "identification"],
    answer:
      "RFID can be used in IoT for identification, tracking and access control. Readers can connect to networks for real-time visibility.",
    priority: 13,
  },

  {
    id: "iot-barcode",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use barcodes or QR codes?",
    variations: [
      "Can IoT use barcodes or QR codes",
      "Barcode IoT",
      "QR code IoT",
      "Scanner IoT",
      "IoT identification code",
      "Barcodes and QR codes in IoT",
    ],
    keywords: ["barcode", "qr", "iot", "scanner", "identification"],
    answer:
      "Barcodes and QR codes can be used in IoT for identification, tracking and configuration, often with scanner modules or cameras.",
    priority: 10,
  },

  {
    id: "iot-gps",
    category: "iot",
    intent: "compatibility",
    question: "Can IoT use GPS?",
    variations: [
      "Can IoT use GPS",
      "GPS IoT",
      "IoT location tracking",
      "GPS tracker IoT",
      "Location IoT device",
      "GPS in IoT",
    ],
    keywords: ["gps", "iot", "location", "tracking", "device"],
    answer:
      "GPS is commonly used in IoT for location tracking, navigation and timing. It is often combined with cellular or other connectivity.",
    priority: 13,
  },

  {
    id: "iot-geofence",
    category: "iot",
    intent: "definition",
    question: "What is geofencing in IoT?",
    variations: [
      "What is geofencing in IoT",
      "Geofence IoT",
      "IoT location boundary",
      "Virtual fence IoT",
      "Geofencing tracker",
      "Geofencing in IoT",
    ],
    keywords: ["geofence", "iot", "location", "boundary", "tracking"],
    answer:
      "Geofencing defines a virtual boundary around a location. IoT devices can trigger alerts or actions when entering or leaving the area.",
    priority: 13,
  },

  {
    id: "iot-sim",
    category: "iot",
    intent: "definition",
    question: "What SIM options exist for IoT?",
    variations: [
      "What SIM options exist for IoT",
      "IoT SIM",
      "M2M SIM",
      "eSIM IoT",
      "IoT cellular SIM",
      "SIM options for IoT",
    ],
    keywords: ["sim", "iot", "m2m", "esim", "cellular"],
    answer:
      "IoT devices can use standard, M2M or eSIM options. The choice depends on deployment, coverage, management and cost.",
    priority: 10,
  },

  {
    id: "iot-esim",
    category: "iot",
    intent: "definition",
    question: "What is eSIM?",
    variations: [
      "What is eSIM",
      "eSIM IoT",
      "Embedded SIM",
      "eSIM device",
      "eSIM vs physical SIM",
      "eSIM definition",
    ],
    keywords: ["esim", "iot", "embedded", "sim", "cellular"],
    answer:
      "An eSIM is soldered into the device and can be provisioned remotely. It is useful for IoT deployments that require flexibility and durability.",
    priority: 10,
  },

  {
    id: "iot-data-plan",
    category: "iot",
    intent: "procedure",
    question: "Do IoT devices need a data plan?",
    variations: [
      "Do IoT devices need a data plan",
      "IoT data plan",
      "SIM plan IoT",
      "Cellular data IoT",
      "IoT connectivity plan",
      "IoT data plans",
    ],
    keywords: ["data", "plan", "iot", "sim", "cellular"],
    answer:
      "Cellular IoT devices require a data plan. Wi-Fi and LoRa may use existing or private networks, which have different cost and management implications.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // ENGINEERING / PRACTICE
  // ─────────────────────────────────────────────────────────────
  {
    id: "iot-scalability",
    category: "iot",
    intent: "procedure",
    question: "How do I make an IoT system scalable?",
    variations: [
      "How do I make an IoT system scalable",
      "Scalable IoT",
      "IoT growth",
      "Expand IoT system",
      "IoT architecture scalability",
      "IoT scalability",
    ],
    keywords: ["scalable", "iot", "growth", "expand", "architecture"],
    answer:
      "Use standard protocols, modular design, appropriate cloud services and clear data models. Planning for growth reduces rework.",
    priority: 13,
  },

  {
    id: "iot-reliability",
    category: "iot",
    intent: "procedure",
    question: "How do I make an IoT system reliable?",
    variations: [
      "How do I make an IoT system reliable",
      "Reliable IoT",
      "IoT reliability",
      "Robust IoT device",
      "IoT system reliability",
      "IoT reliability practices",
    ],
    keywords: ["reliable", "iot", "reliability", "robust", "system"],
    answer:
      "Use robust hardware, stable power, watchdog timers, connection management, error handling and testing under real conditions.",
    priority: 14,
  },

  {
    id: "iot-watchdog",
    category: "iot",
    intent: "procedure",
    question: "How does a watchdog help an IoT device?",
    variations: [
      "How does a watchdog help an IoT device",
      "IoT watchdog",
      "Watchdog timer IoT",
      "Recover IoT device",
      "Watchdog reset IoT",
      "Watchdog in IoT",
    ],
    keywords: ["watchdog", "iot", "timer", "reset", "recovery"],
    answer:
      "A watchdog timer resets the device if firmware fails to service it, helping recover from crashes or hangs.",
    priority: 13,
  },

  {
    id: "iot-power",
    category: "iot",
    intent: "procedure",
    question: "How do I power an IoT device?",
    variations: [
      "How do I power an IoT device",
      "IoT power supply",
      "Power IoT device",
      "Battery IoT",
      "Energy harvesting IoT",
      "Powering an IoT device",
    ],
    keywords: ["power", "iot", "battery", "energy", "supply"],
    answer:
      "IoT devices can be powered by mains, batteries, solar or energy harvesting. The choice depends on location, power requirements and maintenance.",
    priority: 13,
  },

  {
    id: "iot-battery-life",
    category: "iot",
    intent: "procedure",
    question: "How do I extend IoT battery life?",
    variations: [
      "How do I extend IoT battery life",
      "IoT battery life",
      "Low power IoT",
      "Extend battery IoT",
      "Power saving IoT",
      "Extending IoT battery life",
    ],
    keywords: ["battery", "life", "iot", "low", "power"],
    answer:
      "Use sleep modes, reduce wake-ups, minimize radio usage, choose low-power components and optimize communication.",
    priority: 13,
  },

  {
    id: "iot-energy-harvesting",
    category: "iot",
    intent: "definition",
    question: "What is energy harvesting for IoT?",
    variations: [
      "What is energy harvesting for IoT",
      "Energy harvesting IoT",
      "Harvest energy IoT",
      "Solar IoT",
      "Self powered IoT",
      "Energy harvesting in IoT",
    ],
    keywords: ["energy", "harvesting", "iot", "solar", "power"],
    answer:
      "Energy harvesting uses ambient sources such as solar, vibration or heat to power IoT devices, reducing battery dependence.",
    priority: 13,
  },

  {
    id: "iot-cost",
    category: "iot",
    intent: "procedure",
    question: "What are the ongoing costs of an IoT system?",
    variations: [
      "What are the ongoing costs of an IoT system",
      "IoT costs",
      "IoT operating cost",
      "Cloud cost IoT",
      "Data plan IoT",
      "Ongoing IoT costs",
    ],
    keywords: ["cost", "iot", "cloud", "data", "plan"],
    answer:
      "Ongoing costs can include connectivity, cloud services, storage, maintenance and support. These should be considered during planning.",
    priority: 13,
  },

  {
    id: "iot-device-lifecycle",
    category: "iot",
    intent: "procedure",
    question: "What is the IoT device lifecycle?",
    variations: [
      "What is the IoT device lifecycle",
      "IoT device lifecycle",
      "Device lifecycle IoT",
      "Stages of IoT device",
      "IoT deployment lifecycle",
      "IoT lifecycle",
    ],
    keywords: ["lifecycle", "device", "iot", "deployment", "management"],
    answer:
      "The IoT device lifecycle typically includes design, prototype, provisioning, deployment, operation, updates, maintenance and decommissioning.",
    priority: 13,
  },

  {
    id: "iot-decommission",
    category: "iot",
    intent: "procedure",
    question: "How do I decommission an IoT device?",
    variations: [
      "How do I decommission an IoT device",
      "IoT decommission",
      "Retire IoT device",
      "Dispose IoT device",
      "End of life IoT",
      "IoT device decommissioning",
    ],
    keywords: ["decommission", "iot", "device", "retire", "end"],
    answer:
      "Decommissioning should securely erase sensitive data, revoke credentials and keys, and ensure the device cannot access services.",
    priority: 13,
  },

  {
    id: "iot-best-practices",
    category: "iot",
    intent: "procedure",
    question: "What are IoT best practices?",
    variations: [
      "What are IoT best practices",
      "IoT best practices",
      "Good IoT design",
      "IoT development guidelines",
      "How to build good IoT",
      "IoT best practices guide",
    ],
    keywords: ["best", "practices", "iot", "design", "guidelines"],
    answer:
      "Follow secure design, reliable connectivity, efficient power use, clear data models, robust update mechanisms and thorough testing. Documentation and monitoring are also important.",
    priority: 14,
  },

  {
    id: "iot-comparison-microcontroller-vs-iot-platform",
    category: "iot",
    intent: "comparison",
    question: "Do I need an IoT platform to build an IoT product?",
    variations: [
      "Do I need an IoT platform to build an IoT product",
      "IoT platform requirement",
      "Can I build IoT without a platform",
      "IoT platform vs custom backend",
      "Choose IoT platform",
      "IoT platform necessity",
    ],
    keywords: ["platform", "iot", "product", "backend", "requirement"],
    answer:
      "Not always. Small systems can use custom backends or local servers. Platforms are useful for scaling, device management, analytics and integration across many devices.",
    priority: 13,
  },
];
