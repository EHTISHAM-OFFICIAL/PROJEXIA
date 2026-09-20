export const SENSOR_HELP = [
  {
    id: "sensor-what-is",
    category: "sensors",
    question: "What is a sensor?",
    variations: [
      "What does a sensor do",
      "Explain sensors",
      "How do sensors work",
      "What is a sensor used for",
    ],
    keywords: ["sensor", "measurement", "input", "detect"],
    answer:
      "A sensor detects or measures a physical quantity such as temperature, light, distance, motion, pressure or humidity and provides information that a controller can process.",
    priority: 9,
  },

  {
    id: "sensor-temperature",
    category: "sensors",
    question: "What sensors can measure temperature?",
    variations: [
      "How do I measure temperature",
      "Which temperature sensor should I use",
      "Can Arduino measure temperature",
      "What temperature sensors are available",
    ],
    keywords: ["temperature", "sensor", "thermometer", "arduino"],
    answer:
      "Temperature can be measured using many sensor types, including thermistors, analog sensors and digital temperature sensors. Selection depends on the required range, accuracy, response time, interface and environment.",
    priority: 8,
  },

  {
    id: "sensor-ultrasonic",
    category: "sensors",
    question: "How does an ultrasonic distance sensor work?",
    variations: [
      "How does ultrasonic sensor measure distance",
      "What is an ultrasonic sensor",
      "Can ultrasonic detect objects",
      "How do I measure distance with ultrasonic",
    ],
    keywords: ["ultrasonic", "distance", "sensor", "echo", "object"],
    answer:
      "An ultrasonic sensor sends an acoustic pulse and measures the time taken for the reflected echo to return. Distance can then be estimated from the travel time and the speed of sound, with environmental conditions affecting accuracy.",
    priority: 9,
  },

  {
    id: "sensor-ir",
    category: "sensors",
    question: "What is an IR sensor?",
    variations: [
      "What does infrared sensor do",
      "How does IR detection work",
      "Can IR detect objects",
      "What is an infrared sensor",
    ],
    keywords: ["ir", "infrared", "sensor", "object", "detection"],
    answer:
      "An infrared sensor uses infrared light for detection, measurement or communication depending on its design. Different IR sensors are used for proximity detection, reflective sensing, remote control and other applications.",
    priority: 8,
  },

  {
    id: "sensor-pir",
    category: "sensors",
    question: "What is a PIR sensor?",
    variations: [
      "How does PIR motion sensor work",
      "What is PIR",
      "Can PIR detect movement",
      "How does motion detection work",
    ],
    keywords: ["pir", "motion", "movement", "sensor", "detection"],
    answer:
      "A PIR sensor detects changes in infrared radiation associated with movement of warm objects. It is commonly used for motion detection and occupancy-related applications.",
    priority: 9,
  },

  {
    id: "sensor-ldr",
    category: "sensors",
    question: "What is an LDR?",
    variations: [
      "What is photoresistor",
      "How does an LDR work",
      "Can LDR detect light",
      "How can I measure light with Arduino",
    ],
    keywords: ["ldr", "photoresistor", "light", "sensor", "analog"],
    answer:
      "An LDR, or light-dependent resistor, changes resistance according to the amount of incident light. It can be combined with a voltage divider and read by an ADC to estimate light level.",
    priority: 8,
  },

  {
    id: "sensor-humidity",
    category: "sensors",
    question: "How can humidity be measured?",
    variations: [
      "What sensor measures humidity",
      "Can I measure humidity with Arduino",
      "How do humidity sensors work",
      "Which sensor measures temperature and humidity",
    ],
    keywords: ["humidity", "temperature", "sensor", "dht"],
    answer:
      "Humidity can be measured using dedicated humidity sensors, many of which also measure temperature. The appropriate sensor depends on required accuracy, operating range, interface and environmental conditions.",
    priority: 8,
  },

  {
    id: "sensor-calibration",
    category: "sensors",
    question: "Why do sensors need calibration?",
    variations: [
      "What is sensor calibration",
      "Why is my sensor inaccurate",
      "How can I improve sensor accuracy",
      "Why does the sensor reading differ",
    ],
    keywords: ["sensor", "calibration", "accuracy", "reading", "measurement"],
    answer:
      "Calibration establishes or corrects the relationship between a sensor's output and the physical quantity being measured. Sensor tolerance, temperature, supply voltage, installation and environmental conditions can all affect readings.",
    priority: 9,
  },

  {
    id: "sensor-noisy",
    category: "sensors",
    question: "Why are my sensor readings noisy?",
    variations: [
      "Sensor readings keep changing",
      "Why does my sensor fluctuate",
      "How do I reduce sensor noise",
      "My analog sensor is unstable",
      "Why is ADC reading noisy",
    ],
    keywords: ["sensor", "noise", "noisy", "adc", "reading", "filter"],
    answer:
      "Possible causes include electrical noise, unstable power, long wiring, grounding problems, environmental variation and sensor limitations. Filtering, averaging, better wiring, decoupling and appropriate sensor placement can help depending on the cause.",
    priority: 10,
  },

  {
    id: "sensor-analog-digital",
    category: "sensors",
    question: "What is the difference between analog and digital sensors?",
    variations: [
      "Analog sensor vs digital sensor",
      "What is analog sensor output",
      "What is digital sensor output",
      "Which sensor type is better",
    ],
    keywords: ["analog", "digital", "sensor", "output"],
    answer:
      "An analog sensor provides a continuously varying signal that normally requires an ADC to measure. A digital sensor communicates measurements as digital data or provides discrete states. Neither is universally better; the appropriate type depends on the application.",
    priority: 9,
  },
] as const;
