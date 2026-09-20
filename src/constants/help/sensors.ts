import type { HelpEntry } from "./types";

export const SENSOR_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // CANONICAL DEFINITIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-what-is",
    category: "sensors",
    intent: "definition",
    question: "What is a sensor?",
    variations: [
      "What is a sensor",
      "What does a sensor do",
      "Explain sensors",
      "How do sensors work",
      "What is a sensor used for",
      "Sensor definition",
      "What is the purpose of a sensor",
      "Define sensor",
    ],
    keywords: ["sensor", "measurement", "input", "detect", "transducer"],
    answer:
      "A sensor detects or measures a physical quantity such as temperature, light, distance, motion, pressure or humidity and provides information that a controller can process.",
    priority: 14,
  },

  {
    id: "sensor-purpose",
    category: "sensors",
    intent: "purpose",
    question: "What are sensors used for?",
    variations: [
      "What are sensors used for",
      "What is a sensor used for",
      "What can a sensor do",
      "Where are sensors used",
      "What is the purpose of a sensor",
      "Sensor applications",
      "Why use sensors",
      "Sensor use cases",
    ],
    keywords: ["sensor", "used", "purpose", "application", "measure"],
    answer:
      "Sensors are used to measure or detect a physical quantity such as temperature, humidity, light, motion, pressure, distance or gas, and provide that information to a controller for monitoring, decision making or automation.",
    priority: 14,
  },

  {
    id: "sensor-analog-digital",
    category: "sensors",
    intent: "comparison",
    question: "What is the difference between analog and digital sensors?",
    variations: [
      "Analog sensor vs digital sensor",
      "What is analog sensor output",
      "What is digital sensor output",
      "Which sensor type is better",
      "Analog vs digital sensor output",
      "Difference analog digital sensors",
    ],
    keywords: ["analog", "digital", "sensor", "output", "comparison"],
    answer:
      "An analog sensor provides a continuously varying signal that normally requires an ADC to measure. A digital sensor communicates measurements as digital data or provides discrete states. Neither is universally better; the appropriate type depends on the application.",
    priority: 13,
  },

  {
    id: "sensor-transducer",
    category: "sensors",
    intent: "definition",
    question: "What is a transducer?",
    variations: [
      "What is a transducer",
      "Transducer vs sensor",
      "What does a transducer do",
      "Is a sensor a transducer",
      "Transducer definition",
      "Explain transducer",
    ],
    keywords: ["transducer", "sensor", "conversion", "energy", "measurement"],
    answer:
      "A transducer converts one form of energy into another. Many sensors contain transducers that convert a physical quantity into an electrical signal that a controller can read.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SENSOR SELECTION / GENERAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-selection",
    category: "sensors",
    intent: "procedure",
    question: "How do I choose a sensor?",
    variations: [
      "How do I choose a sensor",
      "Sensor selection",
      "How to choose sensor",
      "Which sensor to use",
      "Sensor selection criteria",
      "What sensor should I use",
      "How to select a sensor",
    ],
    keywords: ["sensor", "selection", "choose", "criteria", "application"],
    answer:
      "Consider the measured quantity, range, accuracy, resolution, response time, environment, interface, power, cost and availability.",
    priority: 15,
  },

  {
    id: "sensor-calibration",
    category: "sensors",
    intent: "procedure",
    question: "How do I calibrate a sensor?",
    variations: [
      "How do I calibrate a sensor",
      "Sensor calibration procedure",
      "How to calibrate sensor",
      "Calibration steps",
      "Two point calibration",
      "Calibrate a sensor",
      "Sensor calibration method",
    ],
    keywords: ["calibration", "sensor", "procedure", "steps", "accuracy"],
    answer:
      "Calibration compares sensor output to a reference or known conditions and adjusts the conversion. It may involve offset, gain, linearity or temperature correction.",
    priority: 15,
  },

  {
    id: "sensor-filtering",
    category: "sensors",
    intent: "procedure",
    question: "How do I filter sensor data?",
    variations: [
      "How do I filter sensor data",
      "Sensor data filtering",
      "How to filter sensor noise",
      "Moving average sensor",
      "Median filter sensor",
      "Filter sensor readings",
      "Reduce sensor noise",
    ],
    keywords: ["filtering", "sensor", "data", "noise", "average"],
    answer:
      "Common filters include moving average, exponential smoothing and median filters. The choice depends on noise characteristics and required response time.",
    priority: 15,
  },

  {
    id: "sensor-fusion",
    category: "sensors",
    intent: "procedure",
    question: "What is sensor fusion?",
    variations: [
      "What is sensor fusion",
      "Sensor fusion",
      "Combine sensor data",
      "Kalman filter sensor fusion",
      "IMU sensor fusion",
      "Sensor fusion meaning",
      "Explain sensor fusion",
    ],
    keywords: ["sensor", "fusion", "combine", "kalman", "imu"],
    answer:
      "Sensor fusion combines data from multiple sensors to produce a more accurate or robust estimate than any single sensor. Common algorithms include complementary and Kalman filters.",
    priority: 13,
  },

  {
    id: "sensor-noisy",
    category: "sensors",
    intent: "troubleshooting",
    question: "Why are my sensor readings noisy?",
    variations: [
      "Why are my sensor readings noisy",
      "Sensor readings keep changing",
      "Why does my sensor fluctuate",
      "How do I reduce sensor noise",
      "My analog sensor is unstable",
      "Why is ADC reading noisy",
    ],
    keywords: ["sensor", "noise", "noisy", "adc", "reading", "filter"],
    answer:
      "Possible causes include electrical noise, unstable power, long wiring, grounding problems, environmental variation and sensor limitations. Filtering, averaging, better wiring, decoupling and appropriate sensor placement can help depending on the cause.",
    priority: 15,
  },

  {
    id: "sensor-accuracy",
    category: "sensors",
    intent: "definition",
    question: "What is sensor accuracy?",
    variations: [
      "What is sensor accuracy",
      "Sensor accuracy",
      "What does accuracy mean",
      "Accuracy vs precision",
      "Improve sensor accuracy",
      "Sensor accuracy definition",
    ],
    keywords: ["accuracy", "sensor", "precision", "measurement", "error"],
    answer:
      "Sensor accuracy is how close the measured value is to the true value. It is affected by calibration, environment and sensor quality.",
    priority: 13,
  },

  {
    id: "sensor-precision",
    category: "sensors",
    intent: "definition",
    question: "What is sensor precision?",
    variations: [
      "What is sensor precision",
      "Sensor precision",
      "What does precision mean",
      "Repeatability sensor",
      "Precision vs accuracy",
      "Sensor precision definition",
    ],
    keywords: [
      "precision",
      "sensor",
      "repeatability",
      "accuracy",
      "measurement",
    ],
    answer:
      "Sensor precision is the repeatability of measurements. A precise sensor gives consistent readings but may still have an offset.",
    priority: 13,
  },

  {
    id: "sensor-resolution",
    category: "sensors",
    intent: "definition",
    question: "What is sensor resolution?",
    variations: [
      "What is sensor resolution",
      "Sensor resolution",
      "What does resolution mean",
      "Sensor precision",
      "Resolution vs accuracy",
      "Sensor resolution definition",
    ],
    keywords: ["resolution", "sensor", "precision", "accuracy", "measurement"],
    answer:
      "Sensor resolution is the smallest change it can detect. It is different from accuracy, which is how close the reading is to the true value.",
    priority: 13,
  },

  {
    id: "sensor-response-time",
    category: "sensors",
    intent: "definition",
    question: "What is sensor response time?",
    variations: [
      "What is sensor response time",
      "Sensor response time",
      "How fast sensor responds",
      "Response time vs sampling",
      "Sensor time constant",
      "Sensor response definition",
    ],
    keywords: ["response", "time", "sensor", "speed", "measurement"],
    answer:
      "Response time is how quickly a sensor reacts to a change in the measured quantity. It affects how fast real changes can be detected.",
    priority: 13,
  },

  {
    id: "sensor-sampling-rate",
    category: "sensors",
    intent: "definition",
    question: "What sampling rate should I use?",
    variations: [
      "What sampling rate should I use",
      "Sensor sampling rate",
      "How often to read sensor",
      "Sampling frequency",
      "Nyquist sensor",
      "Choose sampling rate",
    ],
    keywords: ["sampling", "rate", "sensor", "frequency", "measurement"],
    answer:
      "Sampling should be fast enough to capture changes of interest. The Nyquist theorem requires at least twice the highest frequency of interest.",
    priority: 13,
  },

  {
    id: "sensor-drift",
    category: "sensors",
    intent: "definition",
    question: "What is sensor drift?",
    variations: [
      "What is sensor drift",
      "Sensor drift",
      "Why does sensor reading change over time",
      "Long term drift",
      "Compensate drift",
      "Sensor drift definition",
    ],
    keywords: ["drift", "sensor", "long", "term", "compensation"],
    answer:
      "Sensor drift is a gradual change in output over time, often due to aging or environmental factors. Periodic recalibration compensates for it.",
    priority: 13,
  },

  {
    id: "sensor-hysteresis",
    category: "sensors",
    intent: "definition",
    question: "What is sensor hysteresis?",
    variations: [
      "What is sensor hysteresis",
      "Sensor hysteresis",
      "Hysteresis error",
      "Why does sensor reading differ",
      "Hysteresis compensation",
      "Sensor hysteresis definition",
    ],
    keywords: ["hysteresis", "sensor", "error", "reading", "measurement"],
    answer:
      "Sensor hysteresis is the difference in output when the measured quantity is approached from different directions. It can be characterized and compensated.",
    priority: 10,
  },

  {
    id: "sensor-sensitivity",
    category: "sensors",
    intent: "definition",
    question: "What is sensor sensitivity?",
    variations: [
      "What is sensor sensitivity",
      "Sensor sensitivity",
      "How sensitive is sensor",
      "Sensitivity vs resolution",
      "Improve sensitivity",
      "Sensor sensitivity definition",
    ],
    keywords: ["sensitivity", "sensor", "resolution", "measurement", "output"],
    answer:
      "Sensitivity is how much the sensor output changes for a given change in the measured quantity. Higher sensitivity can improve resolution but may increase noise.",
    priority: 13,
  },

  {
    id: "sensor-range",
    category: "sensors",
    intent: "definition",
    question: "What is sensor range?",
    variations: [
      "What is sensor range",
      "Sensor range",
      "Measurement range",
      "Operating range sensor",
      "Sensor range vs accuracy",
      "Sensor range definition",
    ],
    keywords: ["range", "sensor", "measurement", "operating", "accuracy"],
    answer:
      "Sensor range is the span of values it can measure. Accuracy often varies across the range, so the datasheet should be checked.",
    priority: 13,
  },

  {
    id: "sensor-overload",
    category: "sensors",
    intent: "troubleshooting",
    question: "What happens if a sensor is overloaded?",
    variations: [
      "What happens if a sensor is overloaded",
      "Sensor overload",
      "Overrange sensor",
      "Exceed sensor range",
      "Sensor damage",
      "Sensor overloading effects",
    ],
    keywords: ["overload", "sensor", "overrange", "damage", "range"],
    answer:
      "Exceeding a sensor's range can cause inaccurate readings, saturation or permanent damage. Always stay within the specified limits.",
    priority: 10,
  },

  {
    id: "sensor-temperature-compensation",
    category: "sensors",
    intent: "procedure",
    question: "What is temperature compensation for sensors?",
    variations: [
      "What is temperature compensation for sensors",
      "Temperature compensation sensor",
      "Why compensate temperature",
      "Sensor temperature effect",
      "Temperature correction",
      "Sensor temperature compensation",
    ],
    keywords: [
      "temperature",
      "compensation",
      "sensor",
      "correction",
      "accuracy",
    ],
    answer:
      "Some sensors change behavior with temperature. Temperature compensation corrects the reading using measured or known temperature.",
    priority: 13,
  },

  {
    id: "sensor-linearization",
    category: "sensors",
    intent: "procedure",
    question: "What is sensor linearization?",
    variations: [
      "What is sensor linearization",
      "Sensor linearization",
      "Nonlinear sensor correction",
      "Linearize sensor output",
      "Sensor response curve",
      "Sensor linearization meaning",
    ],
    keywords: [
      "linearization",
      "sensor",
      "nonlinear",
      "correction",
      "response",
    ],
    answer:
      "Sensor linearization corrects a nonlinear response using a formula, lookup table or polynomial so the output is proportional to the measured quantity.",
    priority: 10,
  },

  {
    id: "sensor-offset",
    category: "sensors",
    intent: "definition",
    question: "What is sensor offset?",
    variations: [
      "What is sensor offset",
      "Sensor offset",
      "Zero offset sensor",
      "Sensor bias",
      "Remove offset",
      "Sensor offset definition",
    ],
    keywords: ["offset", "sensor", "zero", "bias", "calibration"],
    answer:
      "Sensor offset is a constant error added to the true value. It can be measured and subtracted during calibration.",
    priority: 10,
  },

  {
    id: "sensor-gain",
    category: "sensors",
    intent: "definition",
    question: "What is sensor gain?",
    variations: [
      "What is sensor gain",
      "Sensor gain",
      "Sensor scale factor",
      "Gain error sensor",
      "Calibrate gain",
      "Sensor gain definition",
    ],
    keywords: ["gain", "sensor", "scale", "factor", "calibration"],
    answer:
      "Sensor gain is the ratio of output change to input change. Gain errors can be corrected during calibration.",
    priority: 10,
  },

  {
    id: "sensor-cross-sensitivity",
    category: "sensors",
    intent: "definition",
    question: "What is cross sensitivity in sensors?",
    variations: [
      "What is cross sensitivity in sensors",
      "Cross sensitivity sensor",
      "Sensor responds to other things",
      "Interference sensor",
      "Selectivity sensor",
      "Cross sensitivity definition",
    ],
    keywords: ["cross", "sensitivity", "sensor", "interference", "selectivity"],
    answer:
      "Cross sensitivity is when a sensor responds to quantities other than the intended one. It can cause errors and is addressed by selection, filtering or compensation.",
    priority: 10,
  },

  {
    id: "sensor-selectivity",
    category: "sensors",
    intent: "definition",
    question: "What is sensor selectivity?",
    variations: [
      "What is sensor selectivity",
      "Sensor selectivity",
      "How selective is sensor",
      "Interference rejection",
      "Choose selective sensor",
      "Sensor selectivity definition",
    ],
    keywords: [
      "selectivity",
      "sensor",
      "interference",
      "choose",
      "measurement",
    ],
    answer:
      "Selectivity is how well a sensor responds only to the intended quantity. High selectivity reduces interference from other factors.",
    priority: 10,
  },

  {
    id: "sensor-environmental",
    category: "sensors",
    intent: "definition",
    question: "How does environment affect sensors?",
    variations: [
      "How does environment affect sensors",
      "Environmental effects sensors",
      "Temperature humidity sensor",
      "Sensor environment",
      "Harsh environment sensor",
      "Sensor environment effects",
    ],
    keywords: ["environment", "sensor", "temperature", "humidity", "harsh"],
    answer:
      "Temperature, humidity, vibration, dust, chemicals and electromagnetic interference can affect sensor performance. Choose sensors rated for the environment and protect them appropriately.",
    priority: 13,
  },

  {
    id: "sensor-ip-rating",
    category: "sensors",
    intent: "requirements",
    question: "What IP rating do sensors need?",
    variations: [
      "What IP rating do sensors need",
      "IP rating sensor",
      "Waterproof sensor",
      "Dust proof sensor",
      "Sensor environmental rating",
      "Sensor IP rating",
    ],
    keywords: ["ip", "rating", "sensor", "waterproof", "environment"],
    answer:
      "The required IP rating depends on the environment. Outdoor or wet applications need higher protection against dust and water.",
    priority: 10,
  },

  {
    id: "sensor-installation",
    category: "sensors",
    intent: "procedure",
    question: "How should sensors be installed?",
    variations: [
      "How should sensors be installed",
      "Sensor installation",
      "How to mount sensor",
      "Sensor placement",
      "Install sensor correctly",
      "Sensor mounting",
    ],
    keywords: ["installation", "sensor", "mount", "placement", "position"],
    answer:
      "Mount sensors securely and in a position that accurately represents the measured quantity. Avoid interference, vibration and temperature effects where possible.",
    priority: 10,
  },

  {
    id: "sensor-shielding",
    category: "sensors",
    intent: "requirements",
    question: "Do sensors need shielding?",
    variations: [
      "Do sensors need shielding",
      "Sensor shielding",
      "EMI protection sensor",
      "Shielded sensor cable",
      "Reduce sensor interference",
      "Sensor shielding requirements",
    ],
    keywords: ["shielding", "sensor", "emi", "protection", "interference"],
    answer:
      "Some sensors benefit from shielding, twisted pairs or filtering to reduce electrical noise and interference. The need depends on the sensor, environment and signal type.",
    priority: 10,
  },

  {
    id: "sensor-cable",
    category: "sensors",
    intent: "requirements",
    question: "What cable should I use for sensors?",
    variations: [
      "What cable should I use for sensors",
      "Sensor cable",
      "Best cable for sensor",
      "Shielded cable sensor",
      "Sensor wiring",
      "Sensor cable choice",
    ],
    keywords: ["cable", "sensor", "wiring", "shielded", "connection"],
    answer:
      "Choose cable based on signal type, distance, noise environment and mechanical requirements. Shielded or twisted-pair cable can reduce interference.",
    priority: 10,
  },

  {
    id: "sensor-interface",
    category: "sensors",
    intent: "definition",
    question: "What interfaces do sensors use?",
    variations: [
      "What interfaces do sensors use",
      "Sensor interfaces",
      "Analog vs digital sensor interface",
      "I2C SPI UART sensor",
      "Sensor communication",
      "Sensor interface types",
    ],
    keywords: ["interface", "sensor", "analog", "digital", "communication"],
    answer:
      "Sensors can use analog voltage or current, digital I/O, I2C, SPI, UART, 1-Wire or other interfaces. The choice depends on the sensor and system.",
    priority: 13,
  },

  {
    id: "sensor-power-supply",
    category: "sensors",
    intent: "requirements",
    question: "How should sensors be powered?",
    variations: [
      "How should sensors be powered",
      "Sensor power supply",
      "Powering sensors",
      "Sensor voltage requirements",
      "Sensor power design",
      "Sensor power options",
    ],
    keywords: ["power", "supply", "sensor", "voltage", "design"],
    answer:
      "Provide the correct voltage and sufficient current for each sensor. Consider noise, stability and isolation where required.",
    priority: 10,
  },

  {
    id: "sensor-grounding",
    category: "sensors",
    intent: "procedure",
    question: "Why is grounding important for sensors?",
    variations: [
      "Why is grounding important for sensors",
      "Sensor grounding",
      "Why common ground sensors",
      "Ground noise sensor",
      "Sensor ground design",
      "Sensor grounding importance",
    ],
    keywords: ["grounding", "sensor", "common", "ground", "noise"],
    answer:
      "Proper grounding provides a stable reference and reduces noise. Poor grounding can cause inaccurate readings, especially for analog and low-level signals.",
    priority: 13,
  },

  {
    id: "sensor-calibration-procedure",
    category: "sensors",
    intent: "procedure",
    question: "What is a sensor calibration procedure?",
    variations: [
      "What is a sensor calibration procedure",
      "Sensor calibration procedure",
      "How to calibrate sensor",
      "Calibration steps",
      "Two point calibration sensor",
      "Sensor calibration steps",
    ],
    keywords: ["calibration", "sensor", "procedure", "steps", "accuracy"],
    answer:
      "A calibration procedure defines reference conditions, measurements, calculations and storage of calibration values. It should be repeatable and documented.",
    priority: 10,
  },

  {
    id: "sensor-calibration-matrix",
    category: "sensors",
    intent: "procedure",
    question: "How do I use a calibration matrix?",
    variations: [
      "How do I use a calibration matrix",
      "Calibration matrix firmware",
      "Sensor calibration matrix",
      "Correct sensor axes",
      "Matrix calibration code",
      "Calibration matrix use",
    ],
    keywords: ["calibration", "matrix", "sensor", "correction", "axes"],
    answer:
      "A calibration matrix corrects for scale, offset and cross-axis errors. Firmware multiplies raw readings by the matrix.",
    priority: 10,
  },

  {
    id: "sensor-cross-axis",
    category: "sensors",
    intent: "definition",
    question: "What is cross-axis sensitivity?",
    variations: [
      "What is cross-axis sensitivity",
      "Cross axis firmware",
      "Sensor axis interference",
      "Cross sensitivity correction",
      "Axis alignment sensor",
      "Cross-axis sensitivity definition",
    ],
    keywords: ["cross", "axis", "sensor", "sensitivity", "correction"],
    answer:
      "Cross-axis sensitivity is when a sensor responds to inputs on other axes. It can be corrected with calibration matrices.",
    priority: 9,
  },

  {
    id: "sensor-bias",
    category: "sensors",
    intent: "definition",
    question: "What is sensor bias?",
    variations: [
      "What is sensor bias",
      "Sensor bias firmware",
      "Offset in sensor",
      "Bias correction",
      "Remove sensor bias",
      "Sensor bias definition",
    ],
    keywords: ["bias", "sensor", "offset", "correction", "calibration"],
    answer:
      "Bias is a constant offset in sensor output. It can be calibrated and subtracted from readings.",
    priority: 10,
  },

  {
    id: "sensor-scale-factor",
    category: "sensors",
    intent: "definition",
    question: "What is a scale factor error?",
    variations: [
      "What is a scale factor error",
      "Scale factor firmware",
      "Sensor gain error",
      "Scale correction",
      "Calibrate scale",
      "Scale factor error definition",
    ],
    keywords: ["scale", "factor", "sensor", "gain", "calibration"],
    answer:
      "Scale factor error means the sensor output changes by the wrong amount for a given input. It can be corrected with calibration.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // TEMPERATURE SENSORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-temperature",
    category: "sensors",
    intent: "definition",
    question: "What sensors can measure temperature?",
    variations: [
      "What sensors can measure temperature",
      "How do I measure temperature",
      "Which temperature sensor should I use",
      "Can Arduino measure temperature",
      "What temperature sensors are available",
      "Temperature sensor types",
    ],
    keywords: [
      "temperature",
      "sensor",
      "thermometer",
      "measurement",
      "arduino",
    ],
    answer:
      "Temperature can be measured using many sensor types, including thermistors, analog sensors and digital temperature sensors. Selection depends on the required range, accuracy, response time, interface and environment.",
    priority: 13,
  },

  {
    id: "sensor-thermistor",
    category: "sensors",
    intent: "definition",
    question: "What is a thermistor?",
    variations: [
      "What is a thermistor",
      "How does thermistor work",
      "NTC vs PTC thermistor",
      "Thermistor temperature sensor",
      "How to use thermistor",
      "Thermistor definition",
    ],
    keywords: ["thermistor", "ntc", "ptc", "temperature", "sensor"],
    answer:
      "A thermistor is a resistor whose resistance changes with temperature. NTC thermistors decrease in resistance as temperature rises; PTC thermistors increase. They are commonly used for temperature measurement and protection.",
    priority: 13,
  },

  {
    id: "sensor-rtd",
    category: "sensors",
    intent: "definition",
    question: "What is an RTD?",
    variations: [
      "What is an RTD",
      "What is resistance temperature detector",
      "PT100 sensor",
      "RTD vs thermistor",
      "How does RTD work",
      "RTD definition",
    ],
    keywords: ["rtd", "pt100", "temperature", "sensor", "resistance"],
    answer:
      "An RTD, or Resistance Temperature Detector, measures temperature through the predictable change in resistance of a metal such as platinum. RTDs are accurate and stable but require more complex signal conditioning than thermistors.",
    priority: 13,
  },

  {
    id: "sensor-thermocouple",
    category: "sensors",
    intent: "definition",
    question: "What is a thermocouple?",
    variations: [
      "What is a thermocouple",
      "How does thermocouple work",
      "Thermocouple vs thermistor",
      "Thermocouple temperature sensor",
      "High temperature sensor",
      "Thermocouple definition",
    ],
    keywords: ["thermocouple", "temperature", "sensor", "high", "voltage"],
    answer:
      "A thermocouple produces a small voltage proportional to the temperature difference between its junctions. It can measure very high temperatures but requires amplification and cold-junction compensation.",
    priority: 13,
  },

  {
    id: "sensor-ds18b20",
    category: "sensors",
    intent: "definition",
    question: "What is a DS18B20 sensor?",
    variations: [
      "What is a DS18B20 sensor",
      "How to use DS18B20",
      "DS18B20 temperature sensor",
      "Digital temperature sensor DS18B20",
      "DS18B20 vs thermistor",
      "DS18B20 definition",
    ],
    keywords: ["ds18b20", "temperature", "sensor", "digital", "onewire"],
    answer:
      "The DS18B20 is a digital temperature sensor that communicates over a 1-Wire interface. It provides calibrated digital temperature readings and can be used in multi-sensor configurations.",
    priority: 13,
  },

  {
    id: "sensor-infrared-temperature",
    category: "sensors",
    intent: "definition",
    question: "What is an infrared temperature sensor?",
    variations: [
      "What is an infrared temperature sensor",
      "How does IR temperature sensor work",
      "Non contact temperature sensor",
      "Thermopile sensor",
      "IR thermometer sensor",
      "Infrared temperature sensor definition",
    ],
    keywords: ["infrared", "temperature", "sensor", "noncontact", "thermopile"],
    answer:
      "An infrared temperature sensor measures temperature without contact by detecting emitted infrared radiation. It is used for safety, industrial and medical applications.",
    priority: 13,
  },

  {
    id: "sensor-thermopile",
    category: "sensors",
    intent: "definition",
    question: "What is a thermopile?",
    variations: [
      "What is a thermopile",
      "Thermopile sensor",
      "IR temperature sensor",
      "Non contact temperature",
      "Thermopile code",
      "Thermopile definition",
    ],
    keywords: ["thermopile", "temperature", "infrared", "sensor", "noncontact"],
    answer:
      "A thermopile measures infrared radiation to determine temperature without contact. Firmware reads the sensor and applies calibration.",
    priority: 10,
  },

  {
    id: "sensor-temperature-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How is temperature measured?",
    variations: [
      "How is temperature measured",
      "Temperature measurement methods",
      "How to measure temperature",
      "Temperature sensor types",
      "Contact vs noncontact temperature",
      "Temperature measurement methods",
    ],
    keywords: ["temperature", "measurement", "sensor", "contact", "noncontact"],
    answer:
      "Temperature can be measured using thermistors, RTDs, thermocouples, digital sensors or infrared sensors depending on the range and application.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // HUMIDITY / ENVIRONMENT
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-humidity",
    category: "sensors",
    intent: "procedure",
    question: "How can humidity be measured?",
    variations: [
      "How can humidity be measured",
      "What sensor measures humidity",
      "Can I measure humidity with Arduino",
      "How do humidity sensors work",
      "Which sensor measures temperature and humidity",
      "Humidity measurement methods",
    ],
    keywords: ["humidity", "temperature", "sensor", "dht", "measurement"],
    answer:
      "Humidity can be measured using dedicated humidity sensors, many of which also measure temperature. The appropriate sensor depends on required accuracy, operating range, interface and environmental conditions.",
    priority: 13,
  },

  {
    id: "sensor-dht",
    category: "sensors",
    intent: "definition",
    question: "What is a DHT sensor?",
    variations: [
      "What is a DHT sensor",
      "DHT11 vs DHT22",
      "How to use DHT sensor",
      "DHT temperature humidity",
      "DHT sensor accuracy",
      "DHT sensor definition",
    ],
    keywords: ["dht", "temperature", "humidity", "sensor", "digital"],
    answer:
      "DHT sensors measure temperature and humidity and provide digital output. DHT22 is generally more accurate and has a wider range than DHT11.",
    priority: 13,
  },

  {
    id: "sensor-humidity-capacitive",
    category: "sensors",
    intent: "definition",
    question: "What is a capacitive humidity sensor?",
    variations: [
      "What is a capacitive humidity sensor",
      "Capacitive humidity sensor",
      "How does humidity sensor work",
      "Humidity sensor types",
      "Capacitive vs resistive humidity",
      "Capacitive humidity definition",
    ],
    keywords: ["humidity", "capacitive", "sensor", "measurement", "moisture"],
    answer:
      "A capacitive humidity sensor measures changes in capacitance due to moisture absorption. It is accurate and stable, commonly used in environmental monitoring.",
    priority: 10,
  },

  {
    id: "sensor-resistive-humidity",
    category: "sensors",
    intent: "definition",
    question: "What is a resistive humidity sensor?",
    variations: [
      "What is a resistive humidity sensor",
      "Resistive humidity sensor",
      "How does resistive humidity work",
      "Humidity sensor resistance",
      "Resistive vs capacitive humidity",
      "Resistive humidity definition",
    ],
    keywords: ["humidity", "resistive", "sensor", "measurement", "moisture"],
    answer:
      "A resistive humidity sensor measures changes in resistance due to moisture. It is simple but less accurate than capacitive types.",
    priority: 10,
  },

  {
    id: "sensor-absolute-humidity",
    category: "sensors",
    intent: "definition",
    question: "What is absolute humidity?",
    variations: [
      "What is absolute humidity",
      "Absolute vs relative humidity",
      "What is absolute humidity",
      "Humidity measurement types",
      "Calculate absolute humidity",
      "Absolute humidity definition",
    ],
    keywords: ["absolute", "humidity", "sensor", "measurement", "water"],
    answer:
      "Absolute humidity is the mass of water vapor per unit volume of air. It differs from relative humidity, which is temperature-dependent.",
    priority: 10,
  },

  {
    id: "sensor-relative-humidity",
    category: "sensors",
    intent: "definition",
    question: "What is relative humidity?",
    variations: [
      "What is relative humidity",
      "What is RH",
      "Relative humidity meaning",
      "How is relative humidity measured",
      "RH sensor",
      "Relative humidity definition",
    ],
    keywords: ["relative", "humidity", "sensor", "rh", "measurement"],
    answer:
      "Relative humidity is the amount of moisture in the air relative to the maximum it can hold at a given temperature. It is commonly measured by humidity sensors.",
    priority: 10,
  },

  {
    id: "sensor-dew-point",
    category: "sensors",
    intent: "definition",
    question: "What is dew point?",
    variations: [
      "What is dew point",
      "Dew point sensor",
      "What is dew point temperature",
      "How to measure dew point",
      "Dew point vs humidity",
      "Dew point definition",
    ],
    keywords: ["dew", "point", "sensor", "temperature", "humidity"],
    answer:
      "Dew point is the temperature at which air becomes saturated and water vapor condenses. It is calculated from temperature and humidity.",
    priority: 10,
  },

  {
    id: "sensor-humidity-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How is humidity measured?",
    variations: [
      "How is humidity measured",
      "Humidity measurement methods",
      "How to measure humidity",
      "Humidity sensor types",
      "Capacitive vs resistive humidity",
      "Humidity measurement",
    ],
    keywords: ["humidity", "measurement", "sensor", "capacitive", "resistive"],
    answer:
      "Humidity is measured using capacitive, resistive or thermal conductivity sensors. Digital sensors often include temperature measurement as well.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // PRESSURE / ALTITUDE
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-pressure",
    category: "sensors",
    intent: "definition",
    question: "What is a pressure sensor?",
    variations: [
      "What is a pressure sensor",
      "How does pressure sensor work",
      "Types of pressure sensors",
      "Pressure sensor applications",
      "Absolute vs gauge pressure",
      "Pressure sensor definition",
    ],
    keywords: ["pressure", "sensor", "absolute", "gauge", "measurement"],
    answer:
      "A pressure sensor measures the force exerted by a fluid or gas. Types include absolute, gauge and differential pressure sensors. They are used in weather, automotive, medical and industrial applications.",
    priority: 13,
  },

  {
    id: "sensor-bmp280",
    category: "sensors",
    intent: "definition",
    question: "What is a BMP280 sensor?",
    variations: [
      "What is a BMP280 sensor",
      "BMP280 pressure sensor",
      "How to use BMP280",
      "BMP280 vs BME280",
      "Pressure and temperature sensor",
      "BMP280 definition",
    ],
    keywords: ["bmp280", "pressure", "temperature", "sensor", "barometric"],
    answer:
      "The BMP280 measures barometric pressure and temperature. BME280 adds humidity measurement. They are used for weather, altitude and environmental monitoring.",
    priority: 13,
  },

  {
    id: "sensor-barometer",
    category: "sensors",
    intent: "definition",
    question: "How do I read a barometer in firmware?",
    variations: [
      "How do I read a barometer in firmware",
      "Barometer firmware",
      "Read pressure altitude",
      "BMP180 code",
      "Barometric sensor MCU",
      "Barometer reading",
    ],
    keywords: ["barometer", "firmware", "pressure", "altitude", "sensor"],
    answer:
      "Barometric sensors measure atmospheric pressure. Firmware reads and converts the value to pressure and altitude.",
    priority: 10,
  },

  {
    id: "sensor-altitude",
    category: "sensors",
    intent: "procedure",
    question: "How is altitude measured?",
    variations: [
      "How is altitude measured",
      "Altitude sensor",
      "Barometric altitude",
      "Measure altitude",
      "GPS vs barometric altitude",
      "Altitude measurement methods",
    ],
    keywords: ["altitude", "sensor", "barometric", "gps", "pressure"],
    answer:
      "Altitude can be estimated from barometric pressure or GPS. Barometric altitude is more responsive but affected by weather.",
    priority: 13,
  },

  {
    id: "sensor-altimeter",
    category: "sensors",
    intent: "procedure",
    question: "How do I use an altimeter in firmware?",
    variations: [
      "How do I use an altimeter in firmware",
      "Altimeter firmware",
      "Altitude measurement MCU",
      "Height sensor code",
      "Barometric altimeter",
      "Altimeter reading",
    ],
    keywords: ["altimeter", "firmware", "altitude", "measure", "pressure"],
    answer:
      "An altimeter measures altitude using pressure or GPS. Firmware applies calibration and may fuse with other sensors.",
    priority: 10,
  },

  {
    id: "sensor-variometer",
    category: "sensors",
    intent: "definition",
    question: "What is a variometer?",
    variations: [
      "What is a variometer",
      "Variometer firmware",
      "Vertical speed MCU",
      "Climb rate sensor",
      "Altitude rate",
      "Variometer definition",
    ],
    keywords: ["variometer", "firmware", "vertical", "speed", "altitude"],
    answer:
      "A variometer measures rate of climb or descent. Firmware calculates the change in altitude over time.",
    priority: 9,
  },

  {
    id: "sensor-differential-pressure",
    category: "sensors",
    intent: "procedure",
    question: "How do I measure differential pressure in firmware?",
    variations: [
      "How do I measure differential pressure in firmware",
      "Differential pressure firmware",
      "Pressure difference MCU",
      "DP sensor code",
      "Airflow pressure",
      "Differential pressure measurement",
    ],
    keywords: ["differential", "pressure", "firmware", "measure", "sensor"],
    answer:
      "A differential pressure sensor measures the difference between two ports. Firmware reads and converts the value.",
    priority: 10,
  },

  {
    id: "sensor-pressure-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How is pressure measured?",
    variations: [
      "How is pressure measured",
      "Pressure measurement methods",
      "How to measure pressure",
      "Pressure sensor types",
      "Absolute gauge differential",
      "Pressure measurement",
    ],
    keywords: ["pressure", "measurement", "sensor", "absolute", "gauge"],
    answer:
      "Pressure can be measured using piezoresistive, capacitive, piezoelectric or optical sensors. Absolute, gauge and differential types are available.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // LIGHT / COLOR / OPTICAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-ldr",
    category: "sensors",
    intent: "definition",
    question: "What is an LDR?",
    variations: [
      "What is an LDR",
      "What is photoresistor",
      "How does an LDR work",
      "Can LDR detect light",
      "How can I measure light with Arduino",
      "LDR definition",
    ],
    keywords: ["ldr", "photoresistor", "light", "sensor", "analog"],
    answer:
      "An LDR, or light-dependent resistor, changes resistance according to the amount of incident light. It can be combined with a voltage divider and read by an ADC to estimate light level.",
    priority: 13,
  },

  {
    id: "sensor-light-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How is light measured?",
    variations: [
      "How is light measured",
      "Light measurement methods",
      "How to measure light",
      "Light sensor types",
      "Lux measurement",
      "Light measurement",
    ],
    keywords: ["light", "measurement", "sensor", "lux", "photodiode"],
    answer:
      "Light can be measured using LDRs, photodiodes, phototransistors or digital light sensors. Units include lux and lumens.",
    priority: 10,
  },

  {
    id: "sensor-photodiode",
    category: "sensors",
    intent: "definition",
    question: "What is a photodiode?",
    variations: [
      "What is a photodiode",
      "How does photodiode work",
      "Photodiode vs phototransistor",
      "Light sensor photodiode",
      "Photodiode applications",
      "Photodiode definition",
    ],
    keywords: ["photodiode", "light", "sensor", "optical", "detection"],
    answer:
      "A photodiode converts light into current. It is used for light measurement, optical communication and detection circuits.",
    priority: 10,
  },

  {
    id: "sensor-phototransistor",
    category: "sensors",
    intent: "definition",
    question: "What is a phototransistor?",
    variations: [
      "What is a phototransistor",
      "How does phototransistor work",
      "Phototransistor vs photodiode",
      "Light sensor phototransistor",
      "Phototransistor applications",
      "Phototransistor definition",
    ],
    keywords: ["phototransistor", "light", "sensor", "optical", "detection"],
    answer:
      "A phototransistor is a light-sensitive transistor that amplifies the photocurrent. It is more sensitive than a photodiode but slower.",
    priority: 10,
  },

  {
    id: "sensor-color",
    category: "sensors",
    intent: "definition",
    question: "What is a color sensor?",
    variations: [
      "What is a color sensor",
      "How does color sensor work",
      "RGB color sensor",
      "TCS3200 color sensor",
      "Color detection sensor",
      "Color sensor definition",
    ],
    keywords: ["color", "sensor", "rgb", "detection", "light"],
    answer:
      "A color sensor measures the intensity of different light components, typically red, green and blue. It is used for color detection and sorting.",
    priority: 10,
  },

  {
    id: "sensor-color-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How is color measured?",
    variations: [
      "How is color measured",
      "Color measurement methods",
      "How to measure color",
      "Color sensor types",
      "RGB color detection",
      "Color measurement",
    ],
    keywords: ["color", "measurement", "sensor", "rgb", "detection"],
    answer:
      "Color is measured using sensors that detect red, green and blue components. They are used for sorting, matching and display calibration.",
    priority: 9,
  },

  {
    id: "sensor-uv",
    category: "sensors",
    intent: "definition",
    question: "What is a UV sensor?",
    variations: [
      "What is a UV sensor",
      "How does UV sensor work",
      "UV index sensor",
      "Ultraviolet sensor",
      "UV detection sensor",
      "UV sensor definition",
    ],
    keywords: ["uv", "sensor", "ultraviolet", "light", "detection"],
    answer:
      "A UV sensor measures ultraviolet radiation. It is used for sun exposure monitoring, weather and industrial applications.",
    priority: 9,
  },

  {
    id: "sensor-thermal-camera",
    category: "sensors",
    intent: "definition",
    question: "What is a thermal camera?",
    variations: [
      "What is a thermal camera",
      "Thermal imaging sensor",
      "How does thermal camera work",
      "IR camera sensor",
      "Thermal camera applications",
      "Thermal camera definition",
    ],
    keywords: ["thermal", "camera", "sensor", "infrared", "imaging"],
    answer:
      "A thermal camera detects infrared radiation and produces images of temperature. It is used for inspection, security and medical screening.",
    priority: 13,
  },

  {
    id: "sensor-machine-vision",
    category: "sensors",
    intent: "definition",
    question: "What is machine vision?",
    variations: [
      "What is machine vision",
      "Machine vision sensor",
      "Vision system",
      "Camera based inspection",
      "Machine vision applications",
      "Machine vision definition",
    ],
    keywords: ["machine", "vision", "camera", "inspection", "automation"],
    answer:
      "Machine vision uses cameras and image processing to inspect, measure or guide automated systems. It is used in quality control, robotics and sorting.",
    priority: 13,
  },

  {
    id: "sensor-spectrometer",
    category: "sensors",
    intent: "definition",
    question: "What is a spectrometer?",
    variations: [
      "What is a spectrometer",
      "Spectrometer sensor",
      "How does spectrometer work",
      "Optical spectrometer",
      "Spectrometer applications",
      "Spectrometer definition",
    ],
    keywords: ["spectrometer", "sensor", "optical", "light", "analysis"],
    answer:
      "A spectrometer measures the spectrum of light or other radiation. It is used for material analysis, color measurement and scientific research.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MOTION / PROXIMITY / DISTANCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-pir",
    category: "sensors",
    intent: "definition",
    question: "What is a PIR sensor?",
    variations: [
      "What is a PIR sensor",
      "How does PIR motion sensor work",
      "What is PIR",
      "Can PIR detect movement",
      "How does motion detection work",
      "PIR sensor definition",
    ],
    keywords: ["pir", "motion", "movement", "sensor", "detection"],
    answer:
      "A PIR sensor detects changes in infrared radiation associated with movement of warm objects. It is commonly used for motion detection and occupancy-related applications.",
    priority: 13,
  },

  {
    id: "sensor-ultrasonic",
    category: "sensors",
    intent: "definition",
    question: "How does an ultrasonic distance sensor work?",
    variations: [
      "How does an ultrasonic distance sensor work",
      "How does ultrasonic sensor measure distance",
      "What is an ultrasonic sensor",
      "Can ultrasonic detect objects",
      "How do I measure distance with ultrasonic",
      "Ultrasonic sensor definition",
    ],
    keywords: ["ultrasonic", "distance", "sensor", "echo", "object"],
    answer:
      "An ultrasonic sensor sends an acoustic pulse and measures the time taken for the reflected echo to return. Distance can then be estimated from the travel time and the speed of sound, with environmental conditions affecting accuracy.",
    priority: 13,
  },

  {
    id: "sensor-ultrasonic-transducer",
    category: "sensors",
    intent: "definition",
    question: "What is an ultrasonic transducer?",
    variations: [
      "What is an ultrasonic transducer",
      "Ultrasonic transducer",
      "How does ultrasonic sensor work",
      "Ultrasonic transmitter receiver",
      "Ultrasonic applications",
      "Ultrasonic transducer definition",
    ],
    keywords: ["ultrasonic", "transducer", "sensor", "sound", "distance"],
    answer:
      "An ultrasonic transducer converts electrical signals to ultrasonic sound and back. It is used for distance measurement, cleaning, welding and medical imaging.",
    priority: 10,
  },

  {
    id: "sensor-ir",
    category: "sensors",
    intent: "definition",
    question: "What is an IR sensor?",
    variations: [
      "What is an IR sensor",
      "What does infrared sensor do",
      "How does IR detection work",
      "Can IR detect objects",
      "What is an infrared sensor",
      "IR sensor definition",
    ],
    keywords: ["ir", "infrared", "sensor", "object", "detection"],
    answer:
      "An infrared sensor uses infrared light for detection, measurement or communication depending on its design. Different IR sensors are used for proximity detection, reflective sensing, remote control and other applications.",
    priority: 13,
  },

  {
    id: "sensor-proximity",
    category: "sensors",
    intent: "definition",
    question: "What is a proximity sensor?",
    variations: [
      "What is a proximity sensor",
      "How does proximity sensor work",
      "Types of proximity sensors",
      "Detect objects without contact",
      "Proximity sensor applications",
      "Proximity sensor definition",
    ],
    keywords: ["proximity", "sensor", "detection", "object", "contactless"],
    answer:
      "A proximity sensor detects nearby objects without physical contact. Types include inductive, capacitive, ultrasonic, optical and magnetic sensors.",
    priority: 13,
  },

  {
    id: "sensor-capacitive",
    category: "sensors",
    intent: "definition",
    question: "What is a capacitive sensor?",
    variations: [
      "What is a capacitive sensor",
      "How does capacitive sensor work",
      "Capacitive touch sensor",
      "Capacitive proximity sensor",
      "Capacitive vs inductive sensor",
      "Capacitive sensor definition",
    ],
    keywords: ["capacitive", "sensor", "touch", "proximity", "detection"],
    answer:
      "A capacitive sensor detects changes in capacitance caused by nearby objects or touch. It is used for touch interfaces, proximity detection and level sensing.",
    priority: 13,
  },

  {
    id: "sensor-inductive",
    category: "sensors",
    intent: "definition",
    question: "What is an inductive sensor?",
    variations: [
      "What is an inductive sensor",
      "How does inductive sensor work",
      "Inductive proximity sensor",
      "Detect metal objects",
      "Inductive vs capacitive sensor",
      "Inductive sensor definition",
    ],
    keywords: ["inductive", "sensor", "proximity", "metal", "detection"],
    answer:
      "An inductive sensor detects metallic objects using electromagnetic fields. It is commonly used in industrial automation for position and presence detection.",
    priority: 13,
  },

  {
    id: "sensor-touch",
    category: "sensors",
    intent: "definition",
    question: "What is a touch sensor?",
    variations: [
      "What is a touch sensor",
      "How does touch sensor work",
      "Capacitive touch sensor",
      "Touch detection sensor",
      "Touch sensor applications",
      "Touch sensor definition",
    ],
    keywords: ["touch", "sensor", "capacitive", "detection", "input"],
    answer:
      "A touch sensor detects physical contact or proximity. Capacitive touch sensors are common in user interfaces and consumer devices.",
    priority: 10,
  },

  {
    id: "sensor-tof",
    category: "sensors",
    intent: "definition",
    question: "What is a time-of-flight sensor?",
    variations: [
      "What is a time-of-flight sensor",
      "How does ToF sensor work",
      "VL53L0X ToF sensor",
      "Laser distance sensor",
      "Time of flight ranging",
      "ToF sensor definition",
    ],
    keywords: ["tof", "time", "flight", "distance", "laser"],
    answer:
      "A time-of-flight sensor measures distance by timing how long light takes to travel to an object and back. It provides accurate ranging in a small package.",
    priority: 13,
  },

  {
    id: "sensor-lidar",
    category: "sensors",
    intent: "definition",
    question: "What is LiDAR?",
    variations: [
      "What is LiDAR",
      "How does LiDAR work",
      "LiDAR vs ultrasonic",
      "LiDAR sensor applications",
      "Laser scanning sensor",
      "LiDAR definition",
    ],
    keywords: ["lidar", "laser", "distance", "scanning", "sensor"],
    answer:
      "LiDAR uses laser pulses to measure distance and create detailed maps of the environment. It is used in robotics, autonomous vehicles and mapping.",
    priority: 13,
  },

  {
    id: "sensor-radar",
    category: "sensors",
    intent: "definition",
    question: "What is a radar sensor?",
    variations: [
      "What is a radar sensor",
      "How does radar sensor work",
      "mmWave radar sensor",
      "Radar vs ultrasonic",
      "Radar presence detection",
      "Radar sensor definition",
    ],
    keywords: ["radar", "mmwave", "sensor", "detection", "presence"],
    answer:
      "A radar sensor uses radio waves to detect objects, motion and distance. It can work through some materials and in poor visibility.",
    priority: 13,
  },

  {
    id: "sensor-distance",
    category: "sensors",
    intent: "procedure",
    question: "How is distance measured?",
    variations: [
      "How is distance measured",
      "Distance sensor types",
      "How to measure distance",
      "Ultrasonic vs IR vs laser distance",
      "Distance measurement sensor",
      "Distance measurement methods",
    ],
    keywords: ["distance", "sensor", "ultrasonic", "laser", "infrared"],
    answer:
      "Distance can be measured using ultrasonic, infrared, laser (ToF) or radar sensors. The choice depends on range, accuracy, environment and cost.",
    priority: 13,
  },

  {
    id: "sensor-gesture",
    category: "sensors",
    intent: "definition",
    question: "What is a gesture sensor?",
    variations: [
      "What is a gesture sensor",
      "How does gesture sensor work",
      "APDS9960 gesture",
      "Gesture detection sensor",
      "Proximity gesture sensor",
      "Gesture sensor definition",
    ],
    keywords: ["gesture", "sensor", "detection", "motion", "hand"],
    answer:
      "A gesture sensor detects hand movements or proximity using infrared or other technologies. It is used for touchless interfaces.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MOTION / IMU
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-mpu6050",
    category: "sensors",
    intent: "definition",
    question: "What is an MPU6050?",
    variations: [
      "What is an MPU6050",
      "MPU6050 accelerometer gyro",
      "How to use MPU6050",
      "IMU sensor MPU6050",
      "MPU6050 vs MPU9250",
      "MPU6050 definition",
    ],
    keywords: ["mpu6050", "imu", "accelerometer", "gyroscope", "sensor"],
    answer:
      "The MPU6050 is a 6-axis IMU combining a 3-axis accelerometer and 3-axis gyroscope. It communicates over I2C and is used for motion, orientation and gesture sensing.",
    priority: 13,
  },

  {
    id: "sensor-accelerometer",
    category: "sensors",
    intent: "definition",
    question: "What is an accelerometer?",
    variations: [
      "What is an accelerometer",
      "How does accelerometer work",
      "What does accelerometer measure",
      "Accelerometer vs gyroscope",
      "Accelerometer uses",
      "Accelerometer definition",
    ],
    keywords: ["accelerometer", "motion", "sensor", "acceleration", "tilt"],
    answer:
      "An accelerometer measures acceleration, including gravity. It is used for tilt sensing, motion detection, vibration measurement and orientation.",
    priority: 13,
  },

  {
    id: "sensor-gyroscope",
    category: "sensors",
    intent: "definition",
    question: "What is a gyroscope?",
    variations: [
      "What is a gyroscope",
      "How does gyroscope work",
      "What does gyroscope measure",
      "Gyroscope vs accelerometer",
      "Gyroscope uses",
      "Gyroscope definition",
    ],
    keywords: ["gyroscope", "rotation", "sensor", "angular", "rate"],
    answer:
      "A gyroscope measures angular velocity or rate of rotation. It is used with accelerometers for orientation, stabilization and motion tracking.",
    priority: 13,
  },

  {
    id: "sensor-magnetometer",
    category: "sensors",
    intent: "definition",
    question: "What is a magnetometer?",
    variations: [
      "What is a magnetometer",
      "How does magnetometer work",
      "What does magnetometer measure",
      "Magnetometer vs compass",
      "Magnetometer uses",
      "Magnetometer definition",
    ],
    keywords: ["magnetometer", "magnetic", "sensor", "compass", "heading"],
    answer:
      "A magnetometer measures magnetic field strength and direction. It is used for compass heading, position sensing and detecting magnetic objects.",
    priority: 13,
  },

  {
    id: "sensor-imu",
    category: "sensors",
    intent: "definition",
    question: "What is an IMU?",
    variations: [
      "What is an IMU",
      "What is inertial measurement unit",
      "IMU sensor",
      "Accelerometer gyroscope combo",
      "IMU uses",
      "IMU definition",
    ],
    keywords: ["imu", "inertial", "measurement", "unit", "sensor"],
    answer:
      "An IMU, or Inertial Measurement Unit, combines accelerometers and gyroscopes, sometimes with magnetometers, to measure motion and orientation.",
    priority: 13,
  },

  {
    id: "sensor-vibration",
    category: "sensors",
    intent: "definition",
    question: "What is a vibration sensor?",
    variations: [
      "What is a vibration sensor",
      "How does vibration sensor work",
      "Vibration detection sensor",
      "Accelerometer vibration",
      "Vibration monitoring sensor",
      "Vibration sensor definition",
    ],
    keywords: ["vibration", "sensor", "detection", "motion", "acceleration"],
    answer:
      "A vibration sensor detects oscillation or movement. It can use accelerometers, piezoelectric elements or other principles and is used for monitoring and protection.",
    priority: 13,
  },

  {
    id: "sensor-tilt",
    category: "sensors",
    intent: "definition",
    question: "What is a tilt sensor?",
    variations: [
      "What is a tilt sensor",
      "How does tilt sensor work",
      "Tilt detection sensor",
      "Mercury tilt switch",
      "Tilt sensor applications",
      "Tilt sensor definition",
    ],
    keywords: ["tilt", "sensor", "orientation", "detection", "angle"],
    answer:
      "A tilt sensor detects changes in orientation or angle. It can use mercury, ball or accelerometer-based mechanisms.",
    priority: 9,
  },

  {
    id: "sensor-shock",
    category: "sensors",
    intent: "definition",
    question: "What is a shock sensor?",
    variations: [
      "What is a shock sensor",
      "How does shock sensor work",
      "Impact detection sensor",
      "Shock detection sensor",
      "Shock sensor applications",
      "Shock sensor definition",
    ],
    keywords: ["shock", "sensor", "impact", "detection", "vibration"],
    answer:
      "A shock sensor detects sudden impacts or acceleration changes. It is used for security, logging and protection systems.",
    priority: 9,
  },

  {
    id: "sensor-hall-effect",
    category: "sensors",
    intent: "definition",
    question: "What is a Hall effect sensor?",
    variations: [
      "What is a Hall effect sensor",
      "How does Hall effect sensor work",
      "Hall effect applications",
      "Hall sensor vs reed switch",
      "Magnetic sensor Hall",
      "Hall effect sensor definition",
    ],
    keywords: ["hall", "effect", "sensor", "magnetic", "detection"],
    answer:
      "A Hall effect sensor detects magnetic fields. It is used for position sensing, speed measurement, current sensing and proximity detection.",
    priority: 13,
  },

  {
    id: "sensor-reed-switch",
    category: "sensors",
    intent: "definition",
    question: "What is a reed switch?",
    variations: [
      "What is a reed switch",
      "How does reed switch work",
      "Reed switch vs Hall sensor",
      "Magnetic reed switch",
      "Reed switch applications",
      "Reed switch definition",
    ],
    keywords: ["reed", "switch", "magnetic", "sensor", "contact"],
    answer:
      "A reed switch is a mechanical switch activated by a magnetic field. It is used for position sensing, door/window detection and pulse counting.",
    priority: 10,
  },

  {
    id: "sensor-encoder",
    category: "sensors",
    intent: "definition",
    question: "What is an encoder?",
    variations: [
      "What is an encoder",
      "How does encoder work",
      "Rotary encoder vs potentiometer",
      "Quadrature encoder",
      "Encoder applications",
      "Encoder definition",
    ],
    keywords: ["encoder", "rotary", "position", "quadrature", "sensor"],
    answer:
      "An encoder converts rotational or linear motion into electrical signals that indicate position, direction and speed. Incremental encoders output pulses; absolute encoders provide position directly.",
    priority: 13,
  },

  {
    id: "sensor-potentiometer",
    category: "sensors",
    intent: "compatibility",
    question: "Can a potentiometer be used as a sensor?",
    variations: [
      "Can a potentiometer be used as a sensor",
      "Potentiometer position sensor",
      "How to use potentiometer as sensor",
      "Potentiometer vs encoder",
      "Analog position sensor",
      "Potentiometer sensor use",
    ],
    keywords: ["potentiometer", "position", "sensor", "analog", "angle"],
    answer:
      "Yes. A potentiometer can measure position or angle by providing a variable voltage. It is simple but has limited life and accuracy compared to encoders.",
    priority: 10,
  },

  {
    id: "sensor-limit-switch",
    category: "sensors",
    intent: "definition",
    question: "What is a limit switch?",
    variations: [
      "What is a limit switch",
      "How does limit switch work",
      "Limit switch applications",
      "End stop switch",
      "Mechanical limit switch",
      "Limit switch definition",
    ],
    keywords: ["limit", "switch", "end", "stop", "position"],
    answer:
      "A limit switch detects when a mechanism reaches a certain position. It is used for end stops, safety interlocks and position feedback.",
    priority: 13,
  },

  {
    id: "sensor-position",
    category: "sensors",
    intent: "procedure",
    question: "How is position measured?",
    variations: [
      "How is position measured",
      "Position sensor types",
      "How to measure position",
      "Linear position sensor",
      "Angular position sensor",
      "Position measurement methods",
    ],
    keywords: ["position", "sensor", "linear", "angular", "measurement"],
    answer:
      "Position can be measured using encoders, potentiometers, Hall sensors, inductive or capacitive sensors, depending on the application.",
    priority: 13,
  },

  {
    id: "sensor-speed",
    category: "sensors",
    intent: "procedure",
    question: "How is speed measured?",
    variations: [
      "How is speed measured",
      "Speed sensor types",
      "How to measure speed",
      "RPM sensor",
      "Velocity measurement sensor",
      "Speed measurement methods",
    ],
    keywords: ["speed", "sensor", "rpm", "velocity", "measurement"],
    answer:
      "Speed can be measured using encoders, Hall sensors, tachometers or by timing pulses from a rotating or moving object.",
    priority: 13,
  },

  {
    id: "sensor-acceleration",
    category: "sensors",
    intent: "procedure",
    question: "How is acceleration measured?",
    variations: [
      "How is acceleration measured",
      "Acceleration sensor",
      "How to measure acceleration",
      "Accelerometer measurement",
      "Vibration and acceleration",
      "Acceleration measurement methods",
    ],
    keywords: [
      "acceleration",
      "sensor",
      "accelerometer",
      "measurement",
      "motion",
    ],
    answer:
      "Acceleration is measured with accelerometers, which can be based on capacitive, piezoelectric or other sensing methods.",
    priority: 13,
  },

  {
    id: "sensor-rotation",
    category: "sensors",
    intent: "procedure",
    question: "How is rotation measured?",
    variations: [
      "How is rotation measured",
      "Rotation sensor types",
      "How to measure rotation",
      "Gyroscope rotation",
      "Angular velocity sensor",
      "Rotation measurement methods",
    ],
    keywords: ["rotation", "sensor", "gyroscope", "angular", "measurement"],
    answer:
      "Rotation can be measured using gyroscopes, encoders, resolvers or other angular sensors depending on the application.",
    priority: 13,
  },

  {
    id: "sensor-torque",
    category: "sensors",
    intent: "definition",
    question: "What is a torque sensor?",
    variations: [
      "What is a torque sensor",
      "How does torque sensor work",
      "Torque measurement sensor",
      "Torque sensor applications",
      "Strain gauge torque sensor",
      "Torque sensor definition",
    ],
    keywords: ["torque", "sensor", "measurement", "rotation", "strain"],
    answer:
      "A torque sensor measures the rotational force applied to a shaft. It is used in motors, automotive and industrial applications.",
    priority: 10,
  },

  {
    id: "sensor-torque-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How is torque measured?",
    variations: [
      "How is torque measured",
      "Torque measurement methods",
      "How to measure torque",
      "Strain gauge torque",
      "Torque sensor types",
      "Torque measurement",
    ],
    keywords: ["torque", "measurement", "strain", "sensor", "rotation"],
    answer:
      "Torque can be measured using strain gauges on a shaft, magnetoelastic sensors or reaction force methods.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // FORCE / WEIGHT / PRESSURE-STYLE
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-load-cell",
    category: "sensors",
    intent: "definition",
    question: "What is a load cell?",
    variations: [
      "What is a load cell",
      "How does load cell work",
      "Load cell weight sensor",
      "Strain gauge load cell",
      "HX711 load cell",
      "Load cell definition",
    ],
    keywords: ["load", "cell", "weight", "force", "sensor"],
    answer:
      "A load cell converts force or weight into an electrical signal, often using strain gauges. It is used in scales, force measurement and industrial weighing.",
    priority: 13,
  },

  {
    id: "sensor-strain-gauge",
    category: "sensors",
    intent: "definition",
    question: "What is a strain gauge?",
    variations: [
      "What is a strain gauge",
      "How does strain gauge work",
      "Strain gauge sensor",
      "Measure strain",
      "Strain gauge applications",
      "Strain gauge definition",
    ],
    keywords: ["strain", "gauge", "sensor", "force", "measurement"],
    answer:
      "A strain gauge measures deformation or strain in an object. Its resistance changes with strain, and it is often used in load cells and structural monitoring.",
    priority: 10,
  },

  {
    id: "sensor-force",
    category: "sensors",
    intent: "definition",
    question: "What is a force sensor?",
    variations: [
      "What is a force sensor",
      "How does force sensor work",
      "Force sensitive resistor",
      "FSR sensor",
      "Force measurement sensor",
      "Force sensor definition",
    ],
    keywords: ["force", "sensor", "fsr", "pressure", "measurement"],
    answer:
      "A force sensor measures applied force or pressure. Force-sensitive resistors (FSRs) change resistance with pressure and are used for touch, weight and grip sensing.",
    priority: 10,
  },

  {
    id: "sensor-force-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How is force measured?",
    variations: [
      "How is force measured",
      "Force measurement methods",
      "How to measure force",
      "Load cell force",
      "Force sensor types",
      "Force measurement",
    ],
    keywords: ["force", "measurement", "load", "cell", "sensor"],
    answer:
      "Force can be measured using load cells, strain gauges, piezoelectric sensors or force-sensitive resistors.",
    priority: 13,
  },

  {
    id: "sensor-weight",
    category: "sensors",
    intent: "procedure",
    question: "How is weight measured?",
    variations: [
      "How is weight measured",
      "Weight sensor types",
      "How to measure weight",
      "Load cell weight",
      "Digital scale sensor",
      "Weight measurement methods",
    ],
    keywords: ["weight", "sensor", "load", "cell", "measurement"],
    answer:
      "Weight is commonly measured using load cells or strain gauges, which convert force into an electrical signal.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // FLOW / LEVEL
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-flow",
    category: "sensors",
    intent: "definition",
    question: "What is a flow sensor?",
    variations: [
      "What is a flow sensor",
      "How does flow sensor work",
      "Types of flow sensors",
      "Flow meter sensor",
      "Measure flow rate",
      "Flow sensor definition",
    ],
    keywords: ["flow", "sensor", "rate", "meter", "measurement"],
    answer:
      "A flow sensor measures the rate of fluid or gas flow. Common types include turbine, ultrasonic, thermal and differential pressure sensors.",
    priority: 13,
  },

  {
    id: "sensor-level",
    category: "sensors",
    intent: "definition",
    question: "What is a level sensor?",
    variations: [
      "What is a level sensor",
      "How does level sensor work",
      "Types of level sensors",
      "Measure liquid level",
      "Tank level sensor",
      "Level sensor definition",
    ],
    keywords: ["level", "sensor", "liquid", "tank", "measurement"],
    answer:
      "A level sensor measures the height of a liquid or solid in a container. Types include float, ultrasonic, capacitive, pressure and optical sensors.",
    priority: 13,
  },

  {
    id: "sensor-water-level",
    category: "sensors",
    intent: "definition",
    question: "What is a water level sensor?",
    variations: [
      "What is a water level sensor",
      "How does water level sensor work",
      "Water level detection",
      "Float switch sensor",
      "Ultrasonic water level",
      "Water level sensor definition",
    ],
    keywords: ["water", "level", "sensor", "float", "detection"],
    answer:
      "A water level sensor measures the height of water in a container or tank. Types include float, ultrasonic, capacitive and pressure sensors.",
    priority: 13,
  },

  {
    id: "sensor-soil-moisture",
    category: "sensors",
    intent: "definition",
    question: "What is a soil moisture sensor?",
    variations: [
      "What is a soil moisture sensor",
      "How does soil moisture sensor work",
      "Soil moisture sensor Arduino",
      "Capacitive vs resistive soil sensor",
      "Irrigation soil sensor",
      "Soil moisture sensor definition",
    ],
    keywords: ["soil", "moisture", "sensor", "irrigation", "water"],
    answer:
      "A soil moisture sensor measures the water content in soil using resistive or capacitive methods. It is used for irrigation and agriculture.",
    priority: 13,
  },

  {
    id: "sensor-rain",
    category: "sensors",
    intent: "definition",
    question: "What is a rain sensor?",
    variations: [
      "What is a rain sensor",
      "How does rain sensor work",
      "Rain detection sensor",
      "Weather rain sensor",
      "Rain sensor applications",
      "Rain sensor definition",
    ],
    keywords: ["rain", "sensor", "detection", "weather", "water"],
    answer:
      "A rain sensor detects precipitation using conductive, capacitive or optical methods. It is used for weather monitoring and irrigation control.",
    priority: 10,
  },

  {
    id: "sensor-rainfall",
    category: "sensors",
    intent: "definition",
    question: "What is a rainfall sensor?",
    variations: [
      "What is a rainfall sensor",
      "How does rain gauge work",
      "Tipping bucket rain sensor",
      "Rainfall measurement",
      "Weather rainfall sensor",
      "Rainfall sensor definition",
    ],
    keywords: ["rainfall", "sensor", "rain", "gauge", "weather"],
    answer:
      "A rainfall sensor measures the amount of precipitation. Tipping bucket types count tips, each corresponding to a known amount of rain.",
    priority: 10,
  },

  {
    id: "sensor-wind-speed",
    category: "sensors",
    intent: "definition",
    question: "What is a wind speed sensor?",
    variations: [
      "What is a wind speed sensor",
      "How does anemometer work",
      "Wind speed measurement",
      "Cup anemometer sensor",
      "Wind sensor applications",
      "Wind speed sensor definition",
    ],
    keywords: ["wind", "speed", "sensor", "anemometer", "weather"],
    answer:
      "A wind speed sensor, or anemometer, measures how fast the wind is blowing. Common types include cup, vane and ultrasonic anemometers.",
    priority: 10,
  },

  {
    id: "sensor-wind-direction",
    category: "sensors",
    intent: "definition",
    question: "What is a wind direction sensor?",
    variations: [
      "What is a wind direction sensor",
      "How does wind vane work",
      "Wind direction measurement",
      "Weather vane sensor",
      "Wind direction sensor applications",
      "Wind direction sensor definition",
    ],
    keywords: ["wind", "direction", "sensor", "vane", "weather"],
    answer:
      "A wind direction sensor, or wind vane, measures the direction from which the wind is blowing. It is used in weather stations and environmental monitoring.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // GAS / AIR QUALITY
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-gas",
    category: "sensors",
    intent: "definition",
    question: "What is a gas sensor?",
    variations: [
      "What is a gas sensor",
      "How does gas sensor work",
      "MQ gas sensor",
      "Gas detection sensor",
      "Air quality gas sensor",
      "Gas sensor definition",
    ],
    keywords: ["gas", "sensor", "detection", "mq", "air"],
    answer:
      "A gas sensor detects the presence or concentration of gases such as carbon monoxide, methane or alcohol. It is used for safety, air quality and industrial monitoring.",
    priority: 13,
  },

  {
    id: "sensor-co2",
    category: "sensors",
    intent: "definition",
    question: "What is a CO2 sensor?",
    variations: [
      "What is a CO2 sensor",
      "How does CO2 sensor work",
      "NDIR CO2 sensor",
      "CO2 measurement sensor",
      "Carbon dioxide sensor",
      "CO2 sensor definition",
    ],
    keywords: ["co2", "sensor", "ndir", "carbon", "dioxide"],
    answer:
      "A CO2 sensor measures carbon dioxide concentration, often using NDIR technology. It is used for air quality, HVAC and safety applications.",
    priority: 13,
  },

  {
    id: "sensor-air-quality",
    category: "sensors",
    intent: "definition",
    question: "What is an air quality sensor?",
    variations: [
      "What is an air quality sensor",
      "Air quality sensor",
      "PM2.5 sensor",
      "Air pollution sensor",
      "AQI sensor",
      "Air quality sensor definition",
    ],
    keywords: ["air", "quality", "sensor", "pm", "pollution"],
    answer:
      "An air quality sensor measures pollutants such as particulates, gases or volatile organic compounds. It is used for environmental monitoring and HVAC control.",
    priority: 13,
  },

  {
    id: "sensor-dust",
    category: "sensors",
    intent: "definition",
    question: "What is a dust sensor?",
    variations: [
      "What is a dust sensor",
      "How does dust sensor work",
      "PM2.5 dust sensor",
      "Particulate matter sensor",
      "Dust detection sensor",
      "Dust sensor definition",
    ],
    keywords: ["dust", "sensor", "pm", "particulate", "air"],
    answer:
      "A dust sensor measures particulate matter in the air using optical or laser methods. It is used for air quality monitoring.",
    priority: 10,
  },

  {
    id: "sensor-smoke",
    category: "sensors",
    intent: "definition",
    question: "What is a smoke sensor?",
    variations: [
      "What is a smoke sensor",
      "How does smoke detector work",
      "Ionization vs optical smoke sensor",
      "Smoke detection sensor",
      "Fire alarm sensor",
      "Smoke sensor definition",
    ],
    keywords: ["smoke", "sensor", "detection", "fire", "alarm"],
    answer:
      "A smoke sensor detects smoke particles using ionization or optical methods. It is used for fire detection and safety systems.",
    priority: 13,
  },

  {
    id: "sensor-flame",
    category: "sensors",
    intent: "definition",
    question: "What is a flame sensor?",
    variations: [
      "What is a flame sensor",
      "How does flame sensor work",
      "Flame detection sensor",
      "IR flame sensor",
      "Fire detection sensor",
      "Flame sensor definition",
    ],
    keywords: ["flame", "sensor", "fire", "detection", "infrared"],
    answer:
      "A flame sensor detects the infrared or ultraviolet radiation emitted by flames. It is used for fire detection and industrial burner control.",
    priority: 10,
  },

  {
    id: "sensor-gas-measurement",
    category: "sensors",
    intent: "procedure",
    question: "How are gases measured?",
    variations: [
      "How are gases measured",
      "Gas measurement methods",
      "How to detect gas",
      "Gas sensor types",
      "Gas concentration measurement",
      "Gas measurement",
    ],
    keywords: ["gas", "measurement", "sensor", "detection", "concentration"],
    answer:
      "Gases can be measured using electrochemical, catalytic, infrared or metal-oxide sensors, depending on the gas and application.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // ACOUSTIC / SOUND / SPECIAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-acoustic",
    category: "sensors",
    intent: "definition",
    question: "What is an acoustic sensor?",
    variations: [
      "What is an acoustic sensor",
      "Sound sensor types",
      "How to measure sound",
      "Microphone sensor",
      "Acoustic detection",
      "Acoustic sensor definition",
    ],
    keywords: ["acoustic", "sound", "sensor", "microphone", "measurement"],
    answer:
      "Acoustic sensors detect sound or vibration. Microphones convert sound to electrical signals and are used for noise measurement, voice detection and monitoring.",
    priority: 13,
  },

  {
    id: "sensor-microphone",
    category: "sensors",
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
    priority: 10,
  },

  {
    id: "sensor-touch-cap",
    category: "sensors",
    intent: "procedure",
    question: "How do I use capacitive touch in firmware?",
    variations: [
      "How do I use capacitive touch in firmware",
      "Capacitive touch firmware",
      "Touch sensing MCU",
      "Touch button code",
      "Capacitive sensor embedded",
      "Capacitive touch usage",
    ],
    keywords: ["capacitive", "touch", "firmware", "button", "sensor"],
    answer:
      "Capacitive touch senses changes in capacitance. Some microcontrollers have dedicated touch peripherals. Firmware configures and reads them, applying thresholds and debouncing.",
    priority: 10,
  },

  {
    id: "sensor-matrix",
    category: "sensors",
    intent: "procedure",
    question: "How do I scan a sensor matrix in firmware?",
    variations: [
      "How do I scan a sensor matrix in firmware",
      "Sensor matrix firmware",
      "Scan matrix embedded",
      "Keypad matrix code",
      "Grid sensor MCU",
      "Sensor matrix scanning",
    ],
    keywords: ["matrix", "firmware", "scan", "sensor", "grid"],
    answer:
      "Matrix scanning drives one axis and reads the other to detect intersections. Firmware handles debouncing and ghosting prevention.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // IMU-ADVANCED
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-imu-calibration",
    category: "sensors",
    intent: "procedure",
    question: "How do I calibrate an IMU in firmware?",
    variations: [
      "How do I calibrate an IMU in firmware",
      "IMU calibration firmware",
      "Calibrate accelerometer gyro",
      "Sensor calibration IMU",
      "Motion sensor calibration",
      "IMU calibration procedure",
    ],
    keywords: ["imu", "calibration", "firmware", "accelerometer", "gyro"],
    answer:
      "Calibration determines offsets and scale factors for each axis. It may involve placing the sensor in known orientations and recording outputs.",
    priority: 10,
  },

  {
    id: "sensor-imu-orientation",
    category: "sensors",
    intent: "procedure",
    question: "How do I get orientation from an IMU?",
    variations: [
      "How do I get orientation from an IMU",
      "IMU orientation firmware",
      "Get roll pitch yaw",
      "Orientation from sensors",
      "IMU attitude code",
      "IMU orientation estimation",
    ],
    keywords: ["imu", "orientation", "firmware", "attitude", "sensor"],
    answer:
      "Orientation can be estimated by integrating gyro data and correcting with accelerometer and magnetometer using sensor fusion.",
    priority: 10,
  },

  {
    id: "sensor-gyro-integration",
    category: "sensors",
    intent: "procedure",
    question: "What is gyro integration?",
    variations: [
      "What is gyro integration",
      "Gyro integration firmware",
      "Integrate gyroscope data",
      "Angle from gyro",
      "Gyro drift integration",
      "Gyro integration definition",
    ],
    keywords: ["gyro", "integration", "firmware", "angle", "drift"],
    answer:
      "Gyro integration sums angular rate over time to estimate angle. It drifts over time, so correction from other sensors is used.",
    priority: 9,
  },

  {
    id: "sensor-attitude",
    category: "sensors",
    intent: "procedure",
    question: "How do I estimate orientation from an IMU?",
    variations: [
      "How do I estimate orientation from an IMU",
      "Attitude estimation firmware",
      "Orientation from IMU",
      "Roll pitch yaw code",
      "Sensor fusion orientation",
      "Estimate orientation IMU",
    ],
    keywords: ["attitude", "firmware", "orientation", "imu", "fusion"],
    answer:
      "Orientation can be estimated using complementary or Kalman filters that combine accelerometer, gyroscope and magnetometer data.",
    priority: 10,
  },

  {
    id: "sensor-quaternion",
    category: "sensors",
    intent: "definition",
    question: "What is a quaternion used for in firmware?",
    variations: [
      "What is a quaternion used for in firmware",
      "Quaternion firmware",
      "Rotation representation embedded",
      "Quaternion vs Euler",
      "Attitude quaternion",
      "Quaternion use in firmware",
    ],
    keywords: ["quaternion", "firmware", "rotation", "attitude", "orientation"],
    answer:
      "Quaternions represent 3D rotations without gimbal lock. They are used in attitude estimation and motion processing.",
    priority: 9,
  },

  {
    id: "sensor-euler",
    category: "sensors",
    intent: "definition",
    question: "What are Euler angles?",
    variations: [
      "What are Euler angles",
      "Euler angles firmware",
      "Roll pitch yaw embedded",
      "Orientation angles",
      "Euler vs quaternion",
      "Euler angles definition",
    ],
    keywords: ["euler", "angles", "firmware", "orientation", "rotation"],
    answer:
      "Euler angles describe orientation using three rotations, commonly roll, pitch and yaw. They are intuitive but can suffer from gimbal lock.",
    priority: 9,
  },

  {
    id: "sensor-gimbal-lock",
    category: "sensors",
    intent: "definition",
    question: "What is gimbal lock?",
    variations: [
      "What is gimbal lock",
      "Gimbal lock firmware",
      "Euler angle problem",
      "Why avoid Euler",
      "Rotation singularity",
      "Gimbal lock definition",
    ],
    keywords: ["gimbal", "lock", "firmware", "euler", "rotation"],
    answer:
      "Gimbal lock is a situation where two rotation axes align, losing a degree of freedom. Quaternions avoid this problem.",
    priority: 9,
  },

  {
    id: "sensor-pedometer",
    category: "sensors",
    intent: "procedure",
    question: "How do I implement a pedometer in firmware?",
    variations: [
      "How do I implement a pedometer in firmware",
      "Pedometer firmware",
      "Step counting code",
      "Detect steps accelerometer",
      "Step counter embedded",
      "Pedometer implementation",
    ],
    keywords: ["pedometer", "firmware", "steps", "accelerometer", "motion"],
    answer:
      "A pedometer detects steps from accelerometer patterns, often using thresholds or peak detection. Filtering and calibration improve accuracy.",
    priority: 10,
  },

  {
    id: "sensor-tap-detection",
    category: "sensors",
    intent: "procedure",
    question: "How do I detect taps with an accelerometer?",
    variations: [
      "How do I detect taps with an accelerometer",
      "Tap detection firmware",
      "Single double tap",
      "Accelerometer tap",
      "Touch alternative sensor",
      "Tap detection implementation",
    ],
    keywords: ["tap", "detection", "firmware", "accelerometer", "motion"],
    answer:
      "Tap detection looks for characteristic acceleration spikes. Some accelerometers provide built-in tap detection.",
    priority: 9,
  },

  {
    id: "sensor-freefall",
    category: "sensors",
    intent: "procedure",
    question: "How do I detect freefall?",
    variations: [
      "How do I detect freefall",
      "Freefall detection firmware",
      "Accelerometer freefall",
      "Detect drop device",
      "Zero g detection",
      "Freefall detection",
    ],
    keywords: ["freefall", "detection", "firmware", "accelerometer", "motion"],
    answer:
      "Freefall is detected when acceleration magnitude is near zero for a period. Some accelerometers include this function.",
    priority: 9,
  },

  {
    id: "sensor-vibration-analysis",
    category: "sensors",
    intent: "procedure",
    question: "How do I analyze vibration in firmware?",
    variations: [
      "How do I analyze vibration in firmware",
      "Vibration analysis firmware",
      "FFT firmware",
      "Frequency analysis MCU",
      "Vibration monitoring",
      "Vibration analysis methods",
    ],
    keywords: ["vibration", "analysis", "firmware", "fft", "frequency"],
    answer:
      "Vibration analysis can use FFT or other transforms to identify frequency components. Microcontrollers can run small FFTs.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SENSOR FUSION / ADVANCED
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-fusion-kalman",
    category: "sensors",
    intent: "procedure",
    question: "How do I implement a Kalman filter in firmware?",
    variations: [
      "How do I implement a Kalman filter in firmware",
      "Kalman filter firmware",
      "Implement Kalman MCU",
      "Sensor fusion Kalman",
      "Kalman filter code",
      "Kalman filter implementation",
    ],
    keywords: ["kalman", "filter", "firmware", "sensor", "fusion"],
    answer:
      "A Kalman filter is implemented using matrix operations and state updates. On microcontrollers, simplified or scalar versions may be used.",
    priority: 10,
  },

  {
    id: "sensor-complementary-filter",
    category: "sensors",
    intent: "procedure",
    question: "How do I implement a complementary filter?",
    variations: [
      "How do I implement a complementary filter",
      "Complementary filter firmware",
      "Implement complementary MCU",
      "Simple sensor fusion",
      "Complementary filter code",
      "Complementary filter implementation",
    ],
    keywords: ["complementary", "filter", "firmware", "sensor", "fusion"],
    answer:
      "A complementary filter combines two signals with a weighted average. It is simple and useful for IMU attitude estimation.",
    priority: 10,
  },

  {
    id: "sensor-madgwick",
    category: "sensors",
    intent: "definition",
    question: "What is the Madgwick filter?",
    variations: [
      "What is the Madgwick filter",
      "Madgwick filter firmware",
      "AHRS algorithm MCU",
      "Orientation filter embedded",
      "Madgwick code",
      "Madgwick filter definition",
    ],
    keywords: ["madgwick", "filter", "firmware", "ahrs", "orientation"],
    answer:
      "The Madgwick filter is an efficient algorithm for orientation estimation from IMU data. It is suitable for microcontrollers.",
    priority: 10,
  },

  {
    id: "sensor-mahony",
    category: "sensors",
    intent: "definition",
    question: "What is the Mahony filter?",
    variations: [
      "What is the Mahony filter",
      "Mahony filter firmware",
      "AHRS algorithm embedded",
      "Orientation estimation MCU",
      "Mahony code",
      "Mahony filter definition",
    ],
    keywords: ["mahony", "filter", "firmware", "ahrs", "orientation"],
    answer:
      "The Mahony filter is a complementary filter for attitude estimation using IMU data. It is computationally efficient.",
    priority: 10,
  },

  {
    id: "sensor-ahrs",
    category: "sensors",
    intent: "definition",
    question: "What is AHRS?",
    variations: [
      "What is AHRS",
      "AHRS firmware",
      "Attitude heading reference",
      "Orientation system embedded",
      "AHRS algorithm MCU",
      "AHRS definition",
    ],
    keywords: ["ahrs", "firmware", "attitude", "orientation", "sensor"],
    answer:
      "AHRS, or Attitude and Heading Reference System, provides orientation using accelerometer, gyroscope and magnetometer data.",
    priority: 10,
  },

  {
    id: "sensor-sensor-fusion-board",
    category: "sensors",
    intent: "definition",
    question: "What is a sensor fusion board?",
    variations: [
      "What is a sensor fusion board",
      "Sensor fusion board",
      "IMU board firmware",
      "9 axis sensor board",
      "Fusion module",
      "Sensor fusion board definition",
    ],
    keywords: ["sensor", "fusion", "board", "firmware", "imu"],
    answer:
      "A sensor fusion board combines multiple sensors and sometimes a processor to provide orientation or motion data.",
    priority: 9,
  },

  {
    id: "sensor-hub",
    category: "sensors",
    intent: "definition",
    question: "What is a sensor hub?",
    variations: [
      "What is a sensor hub",
      "Sensor hub firmware",
      "Sensor processing unit",
      "Hub for sensors",
      "Sensor aggregation MCU",
      "Sensor hub definition",
    ],
    keywords: ["sensor", "hub", "firmware", "processing", "aggregation"],
    answer:
      "A sensor hub manages multiple sensors, processing their data and reducing load on the main processor.",
    priority: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // EDGE AI / ML SENSING
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-edge-ai",
    category: "sensors",
    intent: "definition",
    question: "What is edge AI in firmware?",
    variations: [
      "What is edge AI in firmware",
      "Edge AI firmware",
      "Machine learning embedded",
      "TinyML MCU",
      "AI on microcontroller",
      "Edge AI definition",
    ],
    keywords: ["edge", "ai", "firmware", "machine", "learning"],
    answer:
      "Edge AI runs machine learning models on the device. TinyML frameworks enable simple models on microcontrollers.",
    priority: 10,
  },

  {
    id: "sensor-tinyml",
    category: "sensors",
    intent: "definition",
    question: "What is TinyML?",
    variations: [
      "What is TinyML",
      "TinyML firmware",
      "Tiny machine learning",
      "ML on MCU",
      "Embedded AI",
      "TinyML definition",
    ],
    keywords: ["tinyml", "firmware", "machine", "learning", "embedded"],
    answer:
      "TinyML refers to machine learning on resource-constrained devices. Models are optimized for small memory and low power.",
    priority: 10,
  },

  {
    id: "sensor-tflite",
    category: "sensors",
    intent: "compatibility",
    question: "Can firmware use TensorFlow Lite?",
    variations: [
      "Can firmware use TensorFlow Lite",
      "TensorFlow Lite firmware",
      "TFLite Micro",
      "Run ML model MCU",
      "TensorFlow embedded",
      "TensorFlow Lite on MCU",
    ],
    keywords: ["tensorflow", "lite", "firmware", "ml", "micro"],
    answer:
      "TensorFlow Lite for Microcontrollers allows small models to run on microcontrollers. Memory and processing requirements must be considered.",
    priority: 10,
  },

  {
    id: "sensor-model-quantization",
    category: "sensors",
    intent: "procedure",
    question: "What is model quantization?",
    variations: [
      "What is model quantization",
      "Quantization firmware",
      "Reduce model size",
      "8 bit model MCU",
      "Quantized neural network",
      "Model quantization definition",
    ],
    keywords: ["quantization", "firmware", "model", "size", "ml"],
    answer:
      "Quantization reduces the precision of model weights and activations, decreasing size and improving speed on microcontrollers.",
    priority: 9,
  },

  {
    id: "sensor-neural-network",
    category: "sensors",
    intent: "compatibility",
    question: "Can firmware run a neural network?",
    variations: [
      "Can firmware run a neural network",
      "Neural network firmware",
      "Run NN MCU",
      "AI inference embedded",
      "Deep learning microcontroller",
      "Neural network on MCU",
    ],
    keywords: ["neural", "network", "firmware", "ml", "inference"],
    answer:
      "Small neural networks can run on microcontrollers with optimized libraries. Model size, memory and speed are key constraints.",
    priority: 10,
  },

  {
    id: "sensor-inference",
    category: "sensors",
    intent: "definition",
    question: "What is inference in firmware?",
    variations: [
      "What is inference in firmware",
      "Inference firmware",
      "Run model MCU",
      "AI prediction embedded",
      "Model execution",
      "Inference definition",
    ],
    keywords: ["inference", "firmware", "ml", "model", "prediction"],
    answer:
      "Inference is the process of running a trained model on new data to produce a prediction or classification.",
    priority: 9,
  },

  {
    id: "sensor-anomaly",
    category: "sensors",
    intent: "procedure",
    question: "How do I detect anomalies in firmware?",
    variations: [
      "How do I detect anomalies in firmware",
      "Anomaly detection firmware",
      "Detect abnormal behavior",
      "Outlier sensor data",
      "Fault detection MCU",
      "Anomaly detection implementation",
    ],
    keywords: ["anomaly", "detection", "firmware", "sensor", "data"],
    answer:
      "Anomaly detection can use statistical thresholds, models or comparison to expected behavior. It is used for fault detection and monitoring.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SENSOR SIGNAL PROCESSING
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-dsp",
    category: "sensors",
    intent: "definition",
    question: "What is DSP in firmware?",
    variations: [
      "What is DSP in firmware",
      "DSP firmware",
      "Digital signal processing MCU",
      "Signal processing embedded",
      "DSP code",
      "DSP definition",
    ],
    keywords: ["dsp", "firmware", "signal", "processing", "digital"],
    answer:
      "DSP involves processing signals such as audio, vibration or sensor data. Some microcontrollers include DSP instructions or hardware.",
    priority: 10,
  },

  {
    id: "sensor-filter-design",
    category: "sensors",
    intent: "procedure",
    question: "How do I design a digital filter in firmware?",
    variations: [
      "How do I design a digital filter in firmware",
      "Digital filter firmware",
      "IIR FIR filter MCU",
      "Filter design embedded",
      "Implement filter code",
      "Digital filter design",
    ],
    keywords: ["filter", "design", "firmware", "digital", "iir", "fir"],
    answer:
      "Digital filters can be IIR or FIR. Coefficients are calculated from the desired response and implemented as difference equations.",
    priority: 10,
  },

  {
    id: "sensor-fir",
    category: "sensors",
    intent: "definition",
    question: "What is an FIR filter?",
    variations: [
      "What is an FIR filter",
      "FIR filter firmware",
      "Finite impulse response",
      "FIR vs IIR",
      "FIR code MCU",
      "FIR filter definition",
    ],
    keywords: ["fir", "filter", "firmware", "digital", "signal"],
    answer:
      "An FIR filter uses a finite number of input samples. It is stable and can have linear phase but may require more computation than IIR.",
    priority: 9,
  },

  {
    id: "sensor-iir",
    category: "sensors",
    intent: "definition",
    question: "What is an IIR filter?",
    variations: [
      "What is an IIR filter",
      "IIR filter firmware",
      "Infinite impulse response",
      "IIR vs FIR",
      "IIR code MCU",
      "IIR filter definition",
    ],
    keywords: ["iir", "filter", "firmware", "digital", "signal"],
    answer:
      "An IIR filter uses feedback and can achieve a desired response with fewer coefficients than FIR. Stability must be considered.",
    priority: 9,
  },

  {
    id: "sensor-moving-average-filter",
    category: "sensors",
    intent: "procedure",
    question: "How do I implement a moving average filter?",
    variations: [
      "How do I implement a moving average filter",
      "Moving average filter",
      "Average filter firmware",
      "Smooth data MCU",
      "Rolling average code",
      "Moving average implementation",
    ],
    keywords: ["moving", "average", "filter", "firmware", "smooth"],
    answer:
      "A moving average filter averages a window of recent samples. It is simple and effective for reducing random noise.",
    priority: 9,
  },

  {
    id: "sensor-exponential",
    category: "sensors",
    intent: "procedure",
    question: "What is exponential smoothing?",
    variations: [
      "What is exponential smoothing",
      "Exponential smoothing firmware",
      "EMA filter MCU",
      "Low pass filter code",
      "Smooth sensor data",
      "Exponential smoothing definition",
    ],
    keywords: ["exponential", "smoothing", "firmware", "filter", "sensor"],
    answer:
      "Exponential smoothing applies a weighted average with a decay factor. It uses little memory and provides adjustable smoothing.",
    priority: 9,
  },

  {
    id: "sensor-median-filter",
    category: "sensors",
    intent: "procedure",
    question: "How do I implement a median filter?",
    variations: [
      "How do I implement a median filter",
      "Median filter firmware",
      "Remove spikes sensor",
      "Median filter code MCU",
      "Robust filter",
      "Median filter implementation",
    ],
    keywords: ["median", "filter", "firmware", "sensor", "spike"],
    answer:
      "A median filter sorts a window of samples and selects the middle. It removes spikes while preserving edges.",
    priority: 9,
  },

  {
    id: "sensor-sampling",
    category: "sensors",
    intent: "procedure",
    question: "How do I sample sensors correctly?",
    variations: [
      "How do I sample sensors correctly",
      "Sensor sampling",
      "How often to sample sensor",
      "Sampling frequency sensor",
      "Read sensor timing",
      "Sensor sampling procedure",
    ],
    keywords: ["sampling", "sensor", "frequency", "timing", "procedure"],
    answer:
      "Sample at a rate appropriate for the sensor and application, accounting for sensor response time and the Nyquist requirement. Consistent timing improves filter and control behavior.",
    priority: 10,
  },

  {
    id: "sensor-adc-oversampling",
    category: "sensors",
    intent: "procedure",
    question: "What is ADC oversampling?",
    variations: [
      "What is ADC oversampling",
      "Oversampling ADC",
      "Increase ADC resolution",
      "Average ADC samples",
      "Oversampling firmware",
      "ADC oversampling definition",
    ],
    keywords: ["adc", "oversampling", "firmware", "resolution", "average"],
    answer:
      "Oversampling takes multiple ADC readings and averages them to improve resolution and reduce noise, at the cost of speed and processing.",
    priority: 9,
  },

  {
    id: "sensor-adc-calibration",
    category: "sensors",
    intent: "procedure",
    question: "How do I calibrate an ADC?",
    variations: [
      "How do I calibrate an ADC",
      "ADC calibration firmware",
      "Calibrate analog reading",
      "ADC accuracy improve",
      "Two point ADC calibration",
      "ADC calibration procedure",
    ],
    keywords: ["adc", "calibration", "firmware", "accuracy", "analog"],
    answer:
      "ADC calibration can correct offset and gain errors using known reference voltages. Some microcontrollers provide internal calibration values.",
    priority: 9,
  },

  {
    id: "sensor-adc-reference",
    category: "sensors",
    intent: "requirements",
    question: "What ADC reference should I use?",
    variations: [
      "What ADC reference should I use",
      "ADC reference voltage",
      "Internal vs external reference",
      "Vref ADC firmware",
      "Choose ADC reference",
      "ADC reference selection",
    ],
    keywords: ["adc", "reference", "firmware", "voltage", "vref"],
    answer:
      "The ADC reference sets the measurement range and accuracy. Internal references are convenient; external references can be more accurate or stable. The choice depends on the required precision.",
    priority: 9,
  },

  {
    id: "sensor-adc-input",
    category: "sensors",
    intent: "troubleshooting",
    question: "Why does ADC input impedance matter?",
    variations: [
      "Why does ADC input impedance matter",
      "ADC input impedance",
      "High impedance sensor ADC",
      "Source impedance firmware",
      "ADC sampling time",
      "ADC input impedance effect",
    ],
    keywords: ["adc", "input", "impedance", "firmware", "sensor"],
    answer:
      "High source impedance can prevent the ADC sampling capacitor from charging fully, causing inaccurate readings. Buffering, longer sampling time or a lower impedance source may be needed.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // CURRENT / VOLTAGE SENSING
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-current",
    category: "sensors",
    intent: "procedure",
    question: "How can current be measured?",
    variations: [
      "How can current be measured",
      "Current sensor types",
      "How to measure current",
      "Shunt resistor current",
      "Hall effect current sensor",
      "Current measurement methods",
    ],
    keywords: ["current", "sensor", "shunt", "hall", "measurement"],
    answer:
      "Current can be measured using a shunt resistor and amplifier, a Hall-effect sensor, a current transformer or an integrated current-sense IC.",
    priority: 13,
  },

  {
    id: "sensor-shunt",
    category: "sensors",
    intent: "procedure",
    question: "How do I use a shunt resistor for current sensing?",
    variations: [
      "How do I use a shunt resistor for current sensing",
      "Shunt resistor firmware",
      "Current shunt code",
      "Measure current shunt",
      "Shunt amplifier MCU",
      "Shunt resistor current sensing",
    ],
    keywords: ["shunt", "resistor", "firmware", "current", "sense"],
    answer:
      "A shunt resistor develops a small voltage proportional to current. An amplifier and ADC measure it. Firmware converts the voltage to current.",
    priority: 10,
  },

  {
    id: "sensor-hall-current",
    category: "sensors",
    intent: "procedure",
    question: "How do I use a Hall effect current sensor?",
    variations: [
      "How do I use a Hall effect current sensor",
      "Hall sensor firmware",
      "Hall current code",
      "Magnetic current sensor",
      "Isolated current sense",
      "Hall current sensor usage",
    ],
    keywords: ["hall", "sensor", "firmware", "current", "magnetic"],
    answer:
      "A Hall effect sensor measures current magnetically, providing isolation. Firmware reads its output and converts to current.",
    priority: 10,
  },

  {
    id: "sensor-isolated-sense",
    category: "sensors",
    intent: "requirements",
    question: "Why use an isolated current sensor?",
    variations: [
      "Why use an isolated current sensor",
      "Isolated current sensing",
      "Galvanic isolation current",
      "High voltage current sense",
      "Isolated sensor firmware",
      "Isolated current sensor purpose",
    ],
    keywords: ["isolated", "current", "firmware", "sensor", "isolation"],
    answer:
      "Isolated sensors protect the measurement circuit from high voltages and ground differences. They are used in mains and industrial applications.",
    priority: 9,
  },

  {
    id: "sensor-voltage",
    category: "sensors",
    intent: "procedure",
    question: "How can voltage be measured?",
    variations: [
      "How can voltage be measured",
      "Voltage sensor types",
      "How to measure voltage",
      "Voltage divider sensor",
      "Isolated voltage sensor",
      "Voltage measurement methods",
    ],
    keywords: ["voltage", "sensor", "divider", "measurement", "adc"],
    answer:
      "Voltage can be measured with a resistor divider and ADC, or with isolated or dedicated voltage sensors depending on range and safety requirements.",
    priority: 13,
  },

  {
    id: "sensor-divider",
    category: "sensors",
    intent: "procedure",
    question: "How do I use a voltage divider for sensing?",
    variations: [
      "How do I use a voltage divider for sensing",
      "Voltage divider sensing",
      "Divider ADC firmware",
      "Reduce voltage measurement",
      "Resistor divider code",
      "Voltage divider usage",
    ],
    keywords: ["divider", "firmware", "voltage", "sensing", "adc"],
    answer:
      "A divider scales a voltage to the ADC range. Firmware multiplies the reading by the divider ratio to calculate the actual voltage.",
    priority: 10,
  },

  {
    id: "sensor-isolated-voltage",
    category: "sensors",
    intent: "procedure",
    question: "How do I measure isolated voltage?",
    variations: [
      "How do I measure isolated voltage",
      "Isolated voltage sensing",
      "High voltage measurement",
      "Isolated ADC",
      "Voltage isolation firmware",
      "Isolated voltage measurement",
    ],
    keywords: ["isolated", "voltage", "firmware", "measurement", "safety"],
    answer:
      "Isolated voltage sensing uses transformers, optocouplers or isolated amplifiers to protect the measurement circuit.",
    priority: 9,
  },

  {
    id: "sensor-power",
    category: "sensors",
    intent: "procedure",
    question: "How is power measured?",
    variations: [
      "How is power measured",
      "Power measurement sensor",
      "How to measure power",
      "Power monitoring sensor",
      "Energy meter sensor",
      "Power measurement methods",
    ],
    keywords: ["power", "sensor", "measurement", "energy", "monitoring"],
    answer:
      "Power can be calculated from simultaneous voltage and current measurements. Dedicated power monitoring ICs can simplify the measurement.",
    priority: 10,
  },

  {
    id: "sensor-energy",
    category: "sensors",
    intent: "procedure",
    question: "How is energy measured?",
    variations: [
      "How is energy measured",
      "Energy measurement sensor",
      "Energy meter",
      "kWh measurement",
      "Power and energy sensor",
      "Energy measurement methods",
    ],
    keywords: ["energy", "sensor", "measurement", "kwh", "meter"],
    answer:
      "Energy is the integral of power over time. Energy meters measure voltage and current and accumulate the result.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MAGNETIC / ELECTRIC / RADIATION / BIOSENSOR
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-magnetic-field",
    category: "sensors",
    intent: "procedure",
    question: "How is magnetic field measured?",
    variations: [
      "How is magnetic field measured",
      "Magnetic field sensor",
      "How to measure magnetic field",
      "Hall sensor magnetometer",
      "Magnetic measurement",
      "Magnetic field measurement",
    ],
    keywords: ["magnetic", "field", "sensor", "hall", "magnetometer"],
    answer:
      "Magnetic fields can be measured using Hall effect sensors, magnetometers or fluxgate sensors, depending on the range and application.",
    priority: 13,
  },

  {
    id: "sensor-electric-field",
    category: "sensors",
    intent: "procedure",
    question: "How is electric field measured?",
    variations: [
      "How is electric field measured",
      "Electric field sensor",
      "How to measure electric field",
      "EF sensor",
      "Electric field measurement",
      "Electric field measurement methods",
    ],
    keywords: ["electric", "field", "sensor", "measurement", "voltage"],
    answer:
      "Electric fields can be measured using capacitive or field mill sensors, often for safety, research or industrial applications.",
    priority: 9,
  },

  {
    id: "sensor-ionizing",
    category: "sensors",
    intent: "definition",
    question: "What is an ionizing radiation sensor?",
    variations: [
      "What is an ionizing radiation sensor",
      "Radiation sensor types",
      "How to detect radiation",
      "Geiger counter sensor",
      "Ionizing radiation measurement",
      "Ionizing radiation sensor definition",
    ],
    keywords: ["radiation", "sensor", "geiger", "ionizing", "detection"],
    answer:
      "Ionizing radiation sensors detect alpha, beta, gamma or neutron radiation. Geiger-Mueller tubes are common for general detection.",
    priority: 9,
  },

  {
    id: "sensor-radiation",
    category: "sensors",
    intent: "procedure",
    question: "How do I measure radiation in firmware?",
    variations: [
      "How do I measure radiation in firmware",
      "Radiation sensor firmware",
      "Geiger counter code",
      "Radiation detection MCU",
      "Dose measurement",
      "Radiation measurement methods",
    ],
    keywords: ["radiation", "sensor", "firmware", "geiger", "dose"],
    answer:
      "Radiation sensors such as Geiger-Mueller tubes produce pulses. Firmware counts pulses over time to calculate radiation rate.",
    priority: 10,
  },

  {
    id: "sensor-biosensor",
    category: "sensors",
    intent: "definition",
    question: "What is a biosensor?",
    variations: [
      "What is a biosensor",
      "Biosensor types",
      "How does biosensor work",
      "Biosensor applications",
      "Medical biosensor",
      "Biosensor definition",
    ],
    keywords: ["biosensor", "medical", "sensor", "biological", "detection"],
    answer:
      "A biosensor detects biological or chemical substances using a biological recognition element combined with a transducer. It is used in healthcare, food and environmental monitoring.",
    priority: 9,
  },

  {
    id: "sensor-gas-chromatography",
    category: "sensors",
    intent: "definition",
    question: "What is a gas chromatography sensor?",
    variations: [
      "What is a gas chromatography sensor",
      "Gas chromatography sensor",
      "How does gas chromatography work",
      "GC sensor",
      "Gas analysis sensor",
      "Gas chromatography definition",
    ],
    keywords: ["gas", "chromatography", "sensor", "analysis", "detection"],
    answer:
      "Gas chromatography separates and analyzes gas mixtures. It is often combined with sensors for detecting specific compounds.",
    priority: 7,
  },

  {
    id: "sensor-ph",
    category: "sensors",
    intent: "procedure",
    question: "How do I read a pH sensor in firmware?",
    variations: [
      "How do I read a pH sensor in firmware",
      "pH sensor firmware",
      "Measure pH MCU",
      "pH probe code",
      "Analog pH sensor",
      "pH sensor reading",
    ],
    keywords: ["ph", "sensor", "firmware", "measure", "analog"],
    answer:
      "pH probes produce a high-impedance voltage. A conditioning circuit and ADC are needed. Firmware applies calibration from known buffer solutions.",
    priority: 10,
  },

  {
    id: "sensor-conductivity",
    category: "sensors",
    intent: "procedure",
    question: "How do I measure conductivity in firmware?",
    variations: [
      "How do I measure conductivity in firmware",
      "Conductivity sensor firmware",
      "EC sensor code",
      "Measure water conductivity",
      "TDS sensor firmware",
      "Conductivity measurement",
    ],
    keywords: ["conductivity", "firmware", "sensor", "measure", "water"],
    answer:
      "Conductivity can be measured using an AC excitation and a probe. Firmware reads the result and applies temperature compensation.",
    priority: 10,
  },

  {
    id: "sensor-turbidity",
    category: "sensors",
    intent: "procedure",
    question: "How do I measure turbidity in firmware?",
    variations: [
      "How do I measure turbidity in firmware",
      "Turbidity sensor firmware",
      "Water clarity sensor",
      "Turbidity code MCU",
      "Optical water sensor",
      "Turbidity measurement",
    ],
    keywords: ["turbidity", "firmware", "sensor", "water", "optical"],
    answer:
      "Turbidity sensors often use optical methods. Firmware reads the output and applies calibration to determine turbidity.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SENSOR BEST PRACTICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "sensor-best-practices",
    category: "sensors",
    intent: "procedure",
    question: "What are best practices for using sensors?",
    variations: [
      "What are best practices for using sensors",
      "Sensor best practices",
      "Good sensor design",
      "Sensor usage guidelines",
      "How to use sensors properly",
      "Sensor best practices",
    ],
    keywords: ["best", "practices", "sensor", "design", "usage"],
    answer:
      "Choose the correct sensor for the application, install it properly, power and ground it carefully, calibrate when needed, filter noise, and test under real conditions.",
    priority: 10,
  },
];
