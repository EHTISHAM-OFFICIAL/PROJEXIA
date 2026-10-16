import type { HelpEntry } from "./types";

export const FIRMWARE_HELP: HelpEntry[] = [
  {
    id: "firmware-definition",
    category: "firmware",
    question: "What is firmware?",
    variations: [
      "What does firmware mean?",
      "Explain firmware",
      "What is microcontroller firmware?",
    ],
    keywords: ["firmware", "microcontroller", "software", "program"],
    answer:
      "Firmware is software programmed into an embedded device or microcontroller that controls how the hardware operates. It can handle inputs, outputs, sensors, communication, timing, control logic, and other device behavior.",
  },
  {
    id: "arduino-programming",
    category: "firmware",
    question: "Can ProjexiaHub program Arduino boards?",
    variations: [
      "Can you write Arduino code?",
      "Do you program Arduino?",
      "Arduino firmware development",
    ],
    keywords: ["Arduino", "programming", "firmware", "code"],
    answer:
      "Yes. Arduino-based projects can be programmed for sensor reading, actuator control, communication, automation logic, displays, RFID, and other embedded applications.",
  },
  {
    id: "esp32-programming",
    category: "firmware",
    question: "Can ProjexiaHub program ESP32 boards?",
    variations: [
      "Can you develop ESP32 firmware?",
      "ESP32 programming",
      "Can you make ESP32 IoT projects?",
    ],
    keywords: ["ESP32", "firmware", "WiFi", "Bluetooth", "IoT"],
    answer:
      "Yes. ESP32 firmware can be developed for GPIO control, sensors, displays, Wi-Fi, Bluetooth, web interfaces, IoT communication, automation, and other embedded applications.",
  },
  {
    id: "source-code",
    category: "firmware",
    question: "Can I receive the source code for my project?",
    variations: [
      "Do you provide source code?",
      "Can I get the firmware code?",
      "Will I receive the program?",
    ],
    keywords: ["source code", "firmware", "code", "program"],
    answer:
      "Source-code handover depends on the agreed project scope and terms. If source code is required, mention it clearly when submitting the project request so it can be considered during project planning.",
  },
  {
    id: "firmware-bugs",
    category: "firmware",
    question: "Can firmware bugs be fixed?",
    variations: [
      "Can you debug my code?",
      "My firmware is not working",
      "Can ProjexiaHub fix embedded software?",
    ],
    keywords: ["firmware", "bug", "debug", "code", "software"],
    answer:
      "Yes. Firmware troubleshooting can involve reproducing the problem, inspecting the code, checking hardware assumptions, testing inputs and outputs, reviewing communication, and correcting the underlying logic.",
  },
  {
    id: "firmware-debugging",
    category: "firmware",
    question: "How is embedded firmware debugged?",
    variations: [
      "How do you debug microcontroller code?",
      "What is firmware debugging?",
    ],
    keywords: ["debugging", "firmware", "serial", "logs", "microcontroller"],
    answer:
      "Firmware can be debugged using serial logs, test points, controlled test inputs, debugging interfaces where supported, measurements with a multimeter or oscilloscope, and systematic isolation of hardware and software behavior.",
  },
  {
    id: "firmware-arduino-ide",
    category: "firmware",
    question: "What software is used to program Arduino?",
    variations: [
      "How to program Arduino",
      "What IDE for Arduino",
      "Arduino development environment",
      "Can I use VS Code for Arduino",
    ],
    keywords: ["arduino", "ide", "software", "program", "development"],
    answer:
      "Arduino boards are commonly programmed using the Arduino IDE, though other environments such as VS Code with extensions or PlatformIO can also be used. The choice depends on preference and project complexity.",
  },
  {
    id: "firmware-esp32-ide",
    category: "firmware",
    question: "What software is used to program ESP32?",
    variations: [
      "How to program ESP32",
      "What IDE for ESP32",
      "ESP32 development environment",
      "ESP-IDF vs Arduino",
    ],
    keywords: ["esp32", "ide", "arduino", "esp-idf", "platformio", "program"],
    answer:
      "ESP32 can be programmed using the Arduino framework, ESP-IDF, PlatformIO and other environments. The appropriate choice depends on required features, performance, familiarity and project architecture.",
  },
  {
    id: "firmware-upload",
    category: "firmware",
    question: "How do I upload firmware to a board?",
    variations: [
      "How to upload code",
      "Why can I not upload to Arduino",
      "How to flash ESP32",
      "Firmware upload process",
    ],
    keywords: ["upload", "firmware", "flash", "arduino", "esp32", "board"],
    answer:
      "Connect the board, select the correct board and port in the development environment, verify the required drivers and boot mode, then upload or flash the firmware. Common problems include wrong port, driver issues, cable problems or boot mode settings.",
  },
  {
    id: "firmware-ota",
    category: "firmware",
    question: "What is OTA firmware update?",
    variations: [
      "Over the air update",
      "Can ESP32 update wirelessly",
      "How does OTA work",
      "Wireless firmware update",
    ],
    keywords: ["ota", "update", "wireless", "firmware", "esp32"],
    answer:
      "OTA, or Over-The-Air, update allows firmware to be updated wirelessly or over a network without a physical programming connection. It is useful for deployed devices but requires careful design for security, reliability and recovery if an update fails.",
  },
  {
    id: "firmware-rtos",
    category: "firmware",
    question: "What is an RTOS?",
    variations: [
      "What is real time operating system",
      "Why use FreeRTOS",
      "RTOS vs bare metal",
      "When to use an RTOS",
    ],
    keywords: ["rtos", "freertos", "real", "time", "task", "scheduler"],
    answer:
      "An RTOS, or Real-Time Operating System, manages tasks, scheduling and resources with timing constraints. It can simplify complex embedded applications with multiple concurrent activities, but adds complexity compared to a simple main loop.",
  },
  {
    id: "firmware-interrupt",
    category: "firmware",
    question: "How do interrupts work in firmware?",
    variations: [
      "What is an interrupt handler",
      "Why use interrupts",
      "Interrupt vs polling",
      "How to write an ISR",
    ],
    keywords: ["interrupt", "isr", "handler", "polling", "event"],
    answer:
      "An interrupt signals the processor to pause normal execution and run a special handler. Interrupts are useful for responding to events quickly without continuous polling. ISRs should generally be short and avoid blocking operations.",
  },
  {
    id: "firmware-state-machine",
    category: "firmware",
    question: "How do I structure firmware using a state machine?",
    variations: [
      "State machine in firmware",
      "How to organize embedded code",
      "Finite state machine embedded",
      "Why use state machines in firmware",
    ],
    keywords: ["state", "machine", "firmware", "embedded", "structure"],
    answer:
      "A state machine organizes behavior into states and transitions based on events, inputs or timers. It improves clarity and maintainability for systems that change behavior depending on conditions or operating modes.",
  },
  {
    id: "firmware-watchdog",
    category: "firmware",
    question: "How do I use a watchdog timer in firmware?",
    variations: [
      "What is watchdog timer",
      "Why does my board reset",
      "How to service watchdog",
      "Watchdog reset embedded",
    ],
    keywords: ["watchdog", "timer", "reset", "firmware", "recovery"],
    answer:
      "A watchdog timer resets the microcontroller if firmware fails to service it within a set time. The firmware should service the watchdog only when the system is operating correctly, and the timeout should be chosen to allow normal operation without causing false resets.",
  },
  {
    id: "firmware-memory",
    category: "firmware",
    question: "What is the difference between RAM and flash in firmware?",
    variations: [
      "RAM vs flash memory",
      "Where is firmware stored",
      "What is stack and heap",
      "Memory in microcontroller",
    ],
    keywords: ["ram", "flash", "memory", "stack", "heap", "firmware"],
    answer:
      "Flash stores non-volatile program code and persistent data, while RAM is used for runtime variables, stack and heap. RAM is limited on microcontrollers, so memory usage should be monitored, especially with large buffers or recursive functions.",
  },
  {
    id: "firmware-libraries",
    category: "firmware",
    question: "Should I use libraries in firmware?",
    variations: [
      "Are Arduino libraries good",
      "When to use libraries",
      "Library vs writing own code",
      "Firmware library management",
    ],
    keywords: ["library", "libraries", "firmware", "code", "dependency"],
    answer:
      "Libraries can speed development and provide tested functionality, but they add dependencies, may use more memory and can have limitations. For critical or resource-constrained applications, writing or adapting code may be preferable.",
  },
  {
    id: "firmware-version",
    category: "firmware",
    question: "Why is firmware version control important?",
    variations: [
      "How to manage firmware versions",
      "Why use git for firmware",
      "Firmware versioning",
      "Track code changes",
    ],
    keywords: ["version", "control", "git", "firmware", "track"],
    answer:
      "Version control tracks changes, supports collaboration and allows reverting to earlier working versions. It is important for maintaining firmware, debugging regressions and managing releases.",
  },
  {
    id: "firmware-testing",
    category: "firmware",
    question: "How do I test firmware?",
    variations: [
      "Firmware testing methods",
      "How to test embedded code",
      "Unit testing firmware",
      "Hardware in the loop testing",
    ],
    keywords: ["testing", "firmware", "unit", "hardware", "loop"],
    answer:
      "Firmware testing can include unit tests for logic, integration tests with hardware, hardware-in-the-loop testing and long-duration reliability tests. Serial logs, test points and controlled inputs help verify behavior under different conditions.",
  },
  {
    id: "firmware-optimization",
    category: "firmware",
    question: "How can I optimize firmware performance?",
    variations: [
      "Make code faster",
      "Reduce memory usage",
      "Firmware optimization tips",
      "How to improve embedded performance",
    ],
    keywords: ["optimization", "performance", "memory", "speed", "firmware"],
    answer:
      "Optimization can include reducing blocking delays, using efficient algorithms, minimizing memory copies, using appropriate data types, avoiding unnecessary floating-point operations and profiling to find bottlenecks. The best approach depends on whether speed, memory or power is the constraint.",
  },
  {
    id: "firmware-power",
    category: "firmware",
    question: "How can firmware reduce power consumption?",
    variations: [
      "Low power firmware",
      "How to save battery in embedded",
      "Sleep modes microcontroller",
      "Power efficient code",
    ],
    keywords: ["power", "consumption", "sleep", "battery", "firmware"],
    answer:
      "Firmware can reduce power by using sleep modes, disabling unused peripherals, reducing clock speed where possible, minimizing wake-ups and using efficient communication. Power profiling helps identify where energy is being consumed.",
  },
  {
    id: "firmware-fault",
    category: "firmware",
    question: "How do I handle faults in firmware?",
    variations: [
      "Firmware error handling",
      "What to do on fault",
      "Safe state embedded",
      "Recovery from firmware error",
    ],
    keywords: ["fault", "error", "handling", "safe", "recovery"],
    answer:
      "Firmware should detect and respond to faults appropriately, which may include logging, entering a safe state, retrying, resetting or alerting. Safety-critical systems should use hardware protection and fail-safe design rather than relying only on software.",
  },
  {
    id: "firmware-communication",
    category: "firmware",
    question: "How do I implement communication in firmware?",
    variations: [
      "UART I2C SPI firmware",
      "How to send data from microcontroller",
      "Serial communication code",
      "Communication protocol implementation",
    ],
    keywords: ["communication", "uart", "i2c", "spi", "firmware", "protocol"],
    answer:
      "Communication firmware depends on the interface and protocol. UART, I2C and SPI have different framing, timing and addressing. Reliable implementations include error checking, timeouts and handling of partial or corrupted data.",
  },
  {
    id: "firmware-time",
    category: "firmware",
    question: "How do I handle timing in firmware?",
    variations: [
      "How to use millis instead of delay",
      "Non blocking code",
      "Timer in microcontroller",
      "Avoid delay in Arduino",
    ],
    keywords: ["timing", "millis", "delay", "timer", "nonblocking"],
    answer:
      "Use non-blocking timing based on timers or millis() where possible instead of long delay() calls, so the firmware can continue responding to inputs. Hardware timers, interrupts and scheduled tasks can provide accurate timing for control and communication.",
  },
  {
    id: "firmware-arduino-delay",
    category: "firmware",
    question: "Why should I avoid delay in Arduino code?",
    variations: [
      "Why is delay bad in Arduino",
      "delay vs millis",
      "How to replace delay",
      "Blocking code problems",
    ],
    keywords: ["delay", "millis", "blocking", "arduino", "timing"],
    answer:
      "delay() blocks the program and prevents it from responding to inputs, communication or other tasks during the delay. For responsive and multi-tasking behavior, non-blocking timing with millis() or timers is usually preferred.",
  },
  {
    id: "firmware-debounce",
    category: "firmware",
    question: "How do I debounce a button in firmware?",
    variations: [
      "Software debounce Arduino",
      "Button debounce code",
      "How to avoid multiple button presses",
      "Debounce without delay",
    ],
    keywords: ["debounce", "button", "software", "firmware", "input"],
    answer:
      "Software debouncing typically ignores further changes for a short period after a transition or requires the input to remain stable for a set time. Non-blocking debounce using millis() or timers is preferred for responsive firmware.",
  },
  {
    id: "firmware-pwm",
    category: "firmware",
    question: "How do I use PWM in firmware?",
    variations: [
      "PWM code Arduino",
      "How to control motor speed with code",
      "analogWrite PWM",
      "PWM frequency in firmware",
    ],
    keywords: ["pwm", "analogwrite", "duty", "motor", "led", "firmware"],
    answer:
      "Firmware can configure PWM duty cycle and sometimes frequency to control average output power. Common uses include LED brightness and motor speed. The available PWM resolution and frequency depend on the microcontroller and timer configuration.",
  },
  {
    id: "firmware-adc",
    category: "firmware",
    question: "How do I read an analog sensor in firmware?",
    variations: [
      "analogRead Arduino",
      "How to read ADC value",
      "Convert ADC to voltage",
      "Analog sensor code",
    ],
    keywords: ["adc", "analog", "read", "sensor", "voltage", "firmware"],
    answer:
      "Firmware reads the ADC value, which corresponds to the input voltage relative to the reference. The raw value can be converted to voltage using the reference and resolution. Averaging or filtering may be used to reduce noise.",
  },
  {
    id: "firmware-i2c",
    category: "firmware",
    question: "How do I use I2C in firmware?",
    variations: [
      "I2C communication code",
      "Wire library Arduino",
      "How to scan I2C addresses",
      "I2C sensor firmware",
    ],
    keywords: ["i2c", "wire", "address", "sensor", "firmware"],
    answer:
      "Firmware uses the appropriate I2C library to initialize the bus, address the device and read or write registers. Address conflicts, wiring, pull-ups and clock speed are common areas to check when troubleshooting.",
  },
  {
    id: "firmware-spi",
    category: "firmware",
    question: "How do I use SPI in firmware?",
    variations: [
      "SPI communication code",
      "SPI library Arduino",
      "How to set SPI mode",
      "SPI device firmware",
    ],
    keywords: ["spi", "mosi", "miso", "sck", "cs", "firmware"],
    answer:
      "Firmware configures the SPI mode, clock speed and chip-select line, then transfers data according to the device requirements. The correct SPI mode, bit order and timing must match the peripheral datasheet.",
  },
  {
    id: "firmware-uart",
    category: "firmware",
    question: "How do I use UART in firmware?",
    variations: [
      "Serial communication code",
      "How to set baud rate",
      "UART read write Arduino",
      "Serial protocol firmware",
    ],
    keywords: ["uart", "serial", "baud", "tx", "rx", "firmware"],
    answer:
      "Firmware initializes the UART with the correct baud rate, data bits, parity and stop bits, then sends and receives bytes. Timeouts and buffer handling are important for reliable communication.",
  },
  {
    id: "firmware-mqtt",
    category: "firmware",
    question: "How do I use MQTT in firmware?",
    variations: [
      "ESP32 MQTT code",
      "How to publish sensor data",
      "MQTT client firmware",
      "Subscribe MQTT topic",
    ],
    keywords: ["mqtt", "publish", "subscribe", "broker", "firmware", "iot"],
    answer:
      "Firmware connects to an MQTT broker, then publishes and subscribes to topics according to the application. Connection management, reconnect logic, message size and security should be considered for reliable operation.",
  },
  {
    id: "firmware-wifi",
    category: "firmware",
    question: "How do I connect a device to Wi-Fi in firmware?",
    variations: [
      "ESP32 WiFi code",
      "How to connect to WiFi",
      "WiFi reconnect firmware",
      "WiFi credentials in code",
    ],
    keywords: ["wifi", "connect", "ssid", "password", "firmware", "esp32"],
    answer:
      "Firmware configures the Wi-Fi mode, credentials and connection parameters, then monitors the connection state. Robust implementations handle disconnects, retries and fallback operation without blocking the rest of the application.",
  },
  {
    id: "firmware-bluetooth",
    category: "firmware",
    question: "How do I use Bluetooth in firmware?",
    variations: [
      "ESP32 Bluetooth code",
      "BLE firmware",
      "Bluetooth serial firmware",
      "How to send data over Bluetooth",
    ],
    keywords: ["bluetooth", "ble", "firmware", "esp32", "communication"],
    answer:
      "Bluetooth or BLE firmware configures the device as a peripheral or central, defines services and characteristics or serial profiles, and handles connection and data exchange. Security, pairing and connection management should be considered.",
  },
  {
    id: "firmware-json",
    category: "firmware",
    question: "Should firmware use JSON?",
    variations: [
      "JSON on microcontroller",
      "How to parse JSON in firmware",
      "JSON vs binary protocol",
      "Send JSON from ESP32",
    ],
    keywords: ["json", "parse", "firmware", "data", "protocol"],
    answer:
      "JSON is readable and convenient for APIs and configuration but uses more memory and processing than compact binary formats. On constrained microcontrollers, consider the available RAM, parsing library and message size.",
  },
  {
    id: "firmware-config",
    category: "firmware",
    question: "How should firmware handle configuration?",
    variations: [
      "Firmware settings storage",
      "How to save configuration",
      "EEPROM vs flash storage",
      "Configuration management embedded",
    ],
    keywords: ["configuration", "settings", "storage", "eeprom", "flash"],
    answer:
      "Configuration can be stored in non-volatile memory such as EEPROM or flash, or provided at runtime through an interface. Consider defaults, validation, versioning and recovery if stored settings are invalid or corrupted.",
  },
  {
    id: "firmware-update",
    category: "firmware",
    question: "How do I update firmware in the field?",
    variations: [
      "Field firmware update",
      "How to update deployed devices",
      "Bootloader firmware update",
      "Remote firmware update",
    ],
    keywords: ["update", "field", "bootloader", "ota", "firmware"],
    answer:
      "Field updates can use a bootloader, OTA update, SD card, USB or another interface. A robust update process includes verification, rollback or recovery options and protection against interrupted updates.",
  },
  {
    id: "firmware-security",
    category: "firmware",
    question: "How do I secure embedded firmware?",
    variations: [
      "Firmware security",
      "Protect firmware from copying",
      "Secure boot embedded",
      "Encrypt firmware",
    ],
    keywords: ["security", "firmware", "encryption", "secure", "boot"],
    answer:
      "Firmware security can include secure boot, encrypted communication, protected debug access, signed updates and secure key storage. The required measures depend on the threat model and the value of the device and data.",
  },
  {
    id: "firmware-bootloader",
    category: "firmware",
    question: "What is a bootloader?",
    variations: [
      "What does a bootloader do",
      "Why use a bootloader",
      "How does Arduino bootloader work",
      "Bootloader vs firmware",
    ],
    keywords: ["bootloader", "firmware", "update", "boot", "program"],
    answer:
      "A bootloader is a small program that runs before the main firmware and can load or update the application. It enables programming without a dedicated hardware programmer and may support recovery or update mechanisms.",
  },
  {
    id: "firmware-debugging-tools",
    category: "firmware",
    question: "What tools are used to debug firmware?",
    variations: [
      "Debugging tools embedded",
      "JTAG SWD debug",
      "Serial debugger",
      "Logic analyzer firmware",
    ],
    keywords: ["debug", "tools", "jtag", "swd", "serial", "logic"],
    answer:
      "Common tools include serial logging, JTAG or SWD debuggers, logic analyzers, oscilloscopes and on-chip debugging features. The best tool depends on whether the issue is in code logic, timing, communication or hardware interaction.",
  },
  {
    id: "firmware-logs",
    category: "firmware",
    question: "How should firmware logging be done?",
    variations: [
      "Serial logging firmware",
      "How to log data embedded",
      "Debug logging levels",
      "Firmware log storage",
    ],
    keywords: ["logging", "serial", "debug", "firmware", "data"],
    answer:
      "Firmware logging can use serial output, memory buffers, external storage or network logging. Logs should be useful without being excessive, and logging should not significantly affect timing or performance in critical systems.",
  },
  {
    id: "firmware-error-code",
    category: "firmware",
    question: "How should firmware handle error codes?",
    variations: [
      "Error code design firmware",
      "How to report errors",
      "Firmware status codes",
      "Error handling embedded",
    ],
    keywords: ["error", "code", "status", "firmware", "handling"],
    answer:
      "A consistent error code scheme makes debugging and integration easier. Codes can indicate category, severity and specific fault. The firmware should also define how errors are reported, logged and recovered from.",
  },
  {
    id: "firmware-task-scheduling",
    category: "firmware",
    question: "How do I schedule tasks in firmware?",
    variations: [
      "Task scheduling embedded",
      "How to run multiple tasks",
      "Cooperative scheduling",
      "RTOS task scheduling",
    ],
    keywords: ["task", "scheduling", "rtos", "cooperative", "firmware"],
    answer:
      "Tasks can be scheduled cooperatively in a main loop, using timer interrupts or with an RTOS. The appropriate approach depends on timing requirements, complexity and available resources.",
  },
  {
    id: "firmware-priority",
    category: "firmware",
    question: "How do I prioritize tasks in firmware?",
    variations: [
      "Task priority embedded",
      "Interrupt priority",
      "Real time priorities",
      "Critical tasks firmware",
    ],
    keywords: ["priority", "task", "interrupt", "real", "time", "firmware"],
    answer:
      "Tasks should be prioritized based on timing criticality, safety and required response. Interrupt priorities and RTOS task priorities must be assigned carefully to avoid blocking critical functions or causing priority inversion.",
  },
  {
    id: "firmware-mutex",
    category: "firmware",
    question: "What is a mutex in firmware?",
    variations: [
      "Mutex RTOS",
      "Why use mutex",
      "Shared resource protection",
      "Semaphore vs mutex",
    ],
    keywords: ["mutex", "semaphore", "rtos", "shared", "resource"],
    answer:
      "A mutex is a synchronization mechanism used to protect shared resources from concurrent access in multi-tasking or interrupt-driven systems. It helps prevent race conditions and data corruption.",
  },
  {
    id: "firmware-race-condition",
    category: "firmware",
    question: "What is a race condition in firmware?",
    variations: [
      "Race condition embedded",
      "Why does shared data corrupt",
      "Concurrent access bug",
      "How to avoid race conditions",
    ],
    keywords: ["race", "condition", "concurrent", "shared", "data"],
    answer:
      "A race condition occurs when the outcome depends on the timing of concurrent events, often involving shared data accessed by interrupts or tasks. Careful synchronization, atomic operations and critical sections can prevent them.",
  },
  {
    id: "firmware-atomic",
    category: "firmware",
    question: "What is an atomic operation in firmware?",
    variations: [
      "Atomic access embedded",
      "Why disable interrupts",
      "Critical section firmware",
      "Atomic variable",
    ],
    keywords: ["atomic", "critical", "section", "interrupt", "firmware"],
    answer:
      "An atomic operation cannot be interrupted partway through. In embedded systems, atomic access to shared variables may require disabling interrupts briefly, using atomic instructions or using appropriate synchronization primitives.",
  },
  {
    id: "firmware-volatile",
    category: "firmware",
    question: "When should I use volatile in firmware?",
    variations: [
      "volatile keyword embedded",
      "Why use volatile",
      "volatile interrupt variable",
      "volatile vs const",
    ],
    keywords: ["volatile", "keyword", "compiler", "interrupt", "variable"],
    answer:
      "volatile tells the compiler that a variable may change outside normal program flow, such as in an interrupt or hardware register. It prevents certain optimizations but does not provide atomicity or synchronization by itself.",
  },
  {
    id: "firmware-const",
    category: "firmware",
    question: "What does const mean in firmware?",
    variations: [
      "const keyword embedded",
      "Why use const",
      "Const vs define",
      "Read only data firmware",
    ],
    keywords: ["const", "keyword", "read", "only", "define", "firmware"],
    answer:
      "const indicates that a variable or data should not be modified by the program. It can help the compiler place data in read-only memory, improve safety and clarify intent. It does not necessarily mean the value is stored in flash on all microcontrollers.",
  },
  {
    id: "firmware-stack",
    category: "firmware",
    question: "What is the stack in firmware?",
    variations: [
      "Stack overflow embedded",
      "What is stack memory",
      "Why does my program crash",
      "Stack vs heap firmware",
    ],
    keywords: ["stack", "overflow", "memory", "heap", "firmware"],
    answer:
      "The stack stores function call information, local variables and return addresses. Stack overflow can occur with deep recursion, large local arrays or excessive interrupt nesting. It can cause crashes or unpredictable behavior, so stack usage should be monitored.",
  },
  {
    id: "firmware-heap",
    category: "firmware",
    question: "Should firmware use dynamic memory allocation?",
    variations: [
      "malloc in embedded",
      "Dynamic memory firmware",
      "Heap fragmentation",
      "Avoid malloc embedded",
    ],
    keywords: ["heap", "malloc", "dynamic", "memory", "firmware"],
    answer:
      "Dynamic memory allocation can be useful but may cause fragmentation, unpredictable timing and failures on memory-constrained systems. Many embedded systems prefer static allocation or carefully managed pools, especially for long-running or safety-critical applications.",
  },
  {
    id: "firmware-floating-point",
    category: "firmware",
    question: "Should firmware use floating-point math?",
    variations: [
      "Float on microcontroller",
      "Fixed point vs floating point",
      "Is floating point slow embedded",
      "Avoid float firmware",
    ],
    keywords: ["floating", "point", "float", "fixed", "math", "firmware"],
    answer:
      "Floating-point operations may be slow or unavailable in hardware on some microcontrollers. Fixed-point arithmetic can be more efficient when appropriate. The choice depends on required precision, performance, memory and the capabilities of the device.",
  },
  {
    id: "firmware-interrupt-latency",
    category: "firmware",
    question: "What is interrupt latency?",
    variations: [
      "Interrupt response time",
      "Why is interrupt delayed",
      "Latency embedded",
      "Critical interrupt timing",
    ],
    keywords: ["interrupt", "latency", "response", "time", "firmware"],
    answer:
      "Interrupt latency is the time between an interrupt event and the start of the interrupt handler. It can be affected by other interrupts, critical sections and processor state. Low-latency systems require careful design.",
  },
  {
    id: "firmware-bare-metal",
    category: "firmware",
    question: "What is bare-metal firmware?",
    variations: [
      "Bare metal programming",
      "Bare metal vs RTOS",
      "What is bare metal embedded",
      "No operating system firmware",
    ],
    keywords: ["bare", "metal", "firmware", "rtos", "embedded"],
    answer:
      "Bare-metal firmware runs directly on the microcontroller without an operating system. It can be simpler and more predictable for small or timing-critical applications, but may become harder to manage as complexity grows.",
  },
  {
    id: "firmware-hal",
    category: "firmware",
    question: "What is a hardware abstraction layer?",
    variations: [
      "HAL embedded",
      "What does HAL do",
      "HAL vs direct register",
      "Hardware abstraction firmware",
    ],
    keywords: ["hal", "hardware", "abstraction", "layer", "firmware"],
    answer:
      "A Hardware Abstraction Layer provides a consistent interface to hardware peripherals, making code more portable and easier to maintain. It may add overhead compared to direct register access, so the trade-off depends on the project.",
  },
  {
    id: "firmware-register",
    category: "firmware",
    question: "What is direct register programming?",
    variations: [
      "Register level programming",
      "Why use registers",
      "Register vs HAL",
      "Bare metal registers",
    ],
    keywords: ["register", "direct", "programming", "hal", "firmware"],
    answer:
      "Direct register programming configures hardware by writing to specific registers. It can be efficient and precise but requires detailed knowledge of the microcontroller. HALs or libraries can simplify development at some cost in abstraction and size.",
  },
  {
    id: "firmware-cmsis",
    category: "firmware",
    question: "What is CMSIS?",
    variations: [
      "CMSIS ARM",
      "What is CMSIS used for",
      "CMSIS vs HAL",
      "ARM Cortex software interface",
    ],
    keywords: ["cmsis", "arm", "cortex", "firmware", "interface"],
    answer:
      "CMSIS is a set of software interfaces and components for ARM Cortex microcontrollers. It provides standardized access to core features and helps improve portability across compatible devices.",
  },
  {
    id: "firmware-boot",
    category: "firmware",
    question: "What happens when a microcontroller boots?",
    variations: [
      "Startup code microcontroller",
      "Boot process embedded",
      "Reset vector firmware",
      "How does firmware start",
    ],
    keywords: ["boot", "startup", "reset", "firmware", "microcontroller"],
    answer:
      "On reset, the microcontroller starts execution from a defined address, initializes the stack and startup code, configures basic hardware and then calls the main program. The boot process may also involve a bootloader or configuration checks.",
  },
  {
    id: "firmware-reset",
    category: "firmware",
    question: "What causes a microcontroller reset?",
    variations: [
      "Why does my board reset",
      "Reset causes embedded",
      "Power on reset vs watchdog",
      "Brown out reset firmware",
    ],
    keywords: ["reset", "watchdog", "brownout", "firmware", "cause"],
    answer:
      "Reset can be caused by power-on, external reset, watchdog timeout, brownout, software reset or fault conditions. Identifying the reset source from status registers can help diagnose intermittent problems.",
  },
  {
    id: "firmware-brownout",
    category: "firmware",
    question: "What is brownout detection?",
    variations: [
      "Brownout reset",
      "Why does my board reset when motor starts",
      "Low voltage detection",
      "BOD firmware",
    ],
    keywords: ["brownout", "detection", "voltage", "reset", "firmware"],
    answer:
      "Brownout detection monitors supply voltage and holds the microcontroller in reset if the voltage drops below a safe threshold. This prevents unreliable operation at low voltage. Repeated brownout resets often indicate a power supply or current problem.",
  },
  {
    id: "firmware-clock",
    category: "firmware",
    question: "How does the system clock affect firmware?",
    variations: [
      "Clock speed firmware",
      "Why change clock speed",
      "Internal vs external clock",
      "PLL microcontroller",
    ],
    keywords: ["clock", "speed", "firmware", "oscillator", "pll"],
    answer:
      "The system clock determines instruction timing and peripheral speeds. Firmware can often select internal or external clock sources and configure PLLs. Higher clock speeds increase performance but also power consumption and timing sensitivity.",
  },
  {
    id: "firmware-low-power",
    category: "firmware",
    question: "How do I implement low-power modes in firmware?",
    variations: [
      "Sleep mode microcontroller",
      "How to save battery firmware",
      "Deep sleep ESP32",
      "Low power embedded firmware",
    ],
    keywords: ["low", "power", "sleep", "deep", "battery", "firmware"],
    answer:
      "Low-power firmware can use sleep modes, disable unused peripherals, reduce clock speed and wake only on events. The specific modes and wake sources depend on the microcontroller. Measuring actual current consumption is important for optimization.",
  },
  {
    id: "firmware-benchmark",
    category: "firmware",
    question: "How do I benchmark firmware performance?",
    variations: [
      "Measure code execution time",
      "How to profile firmware",
      "Benchmark microcontroller",
      "Optimize embedded performance",
    ],
    keywords: ["benchmark", "performance", "profile", "timing", "firmware"],
    answer:
      "Performance can be measured using timers, GPIO toggling, cycle counters or profiling tools. Benchmarking helps identify bottlenecks and verify that timing requirements are met, but should be done under realistic conditions.",
  },
  {
    id: "firmware-portability",
    category: "firmware",
    question: "How can I make firmware portable?",
    variations: [
      "Portable embedded code",
      "HAL portability",
      "Write portable firmware",
      "Cross platform embedded",
    ],
    keywords: ["portable", "portability", "firmware", "hal", "platform"],
    answer:
      "Portable firmware separates hardware-specific code from application logic through abstraction layers, avoids compiler-specific extensions where possible and uses standard interfaces. This makes moving to a different microcontroller or platform easier.",
  },
  {
    id: "firmware-documentation",
    category: "firmware",
    question: "Why document firmware?",
    variations: [
      "Firmware documentation",
      "Why comment code",
      "Document embedded software",
      "Maintain firmware code",
    ],
    keywords: ["documentation", "firmware", "comment", "maintain", "code"],
    answer:
      "Documentation explains design intent, interfaces, assumptions and behavior. It makes maintenance, debugging, handover and future development easier, especially for complex or long-lived embedded systems.",
  },
  {
    id: "firmware-code-review",
    category: "firmware",
    question: "Why is code review important for firmware?",
    variations: [
      "Firmware code review",
      "Peer review embedded code",
      "Review embedded software",
      "Improve code quality firmware",
    ],
    keywords: ["review", "firmware", "code", "quality", "peer"],
    answer:
      "Code review helps find defects, improve design, share knowledge and enforce standards. In firmware, reviews can also catch timing issues, hardware assumptions and safety concerns that may not be obvious in testing alone.",
  },
  {
    id: "firmware-static-analysis",
    category: "firmware",
    question: "What is static analysis for firmware?",
    variations: [
      "Static code analysis embedded",
      "Find bugs without running",
      "Firmware linting",
      "Static analysis tools",
    ],
    keywords: ["static", "analysis", "firmware", "code", "lint"],
    answer:
      "Static analysis examines source code without executing it to find potential bugs, coding standard violations and security issues. It can complement testing and code review, especially in safety-critical firmware.",
  },
  {
    id: "firmware-unit-test",
    category: "firmware",
    question: "How do I unit test firmware?",
    variations: [
      "Unit testing embedded",
      "Test firmware functions",
      "Mock hardware for testing",
      "Firmware test framework",
    ],
    keywords: ["unit", "test", "firmware", "mock", "framework"],
    answer:
      "Unit testing isolates functions or modules and verifies their behavior. Hardware dependencies can be mocked or abstracted. Frameworks and test harnesses can be adapted for embedded development, though hardware-in-the-loop testing is still important.",
  },
  {
    id: "firmware-simulation",
    category: "firmware",
    question: "Can firmware be simulated?",
    variations: [
      "Simulate microcontroller code",
      "Firmware simulation",
      "Proteus Arduino simulation",
      "Simulate embedded code",
    ],
    keywords: ["simulation", "firmware", "simulate", "microcontroller", "test"],
    answer:
      "Firmware can be simulated to test logic and some interactions, but simulation cannot fully represent real hardware behavior, timing, noise and electrical conditions. Simulation is best used alongside real hardware testing.",
  },
  {
    id: "firmware-hardware-in-loop",
    category: "firmware",
    question: "What is hardware-in-the-loop testing?",
    variations: [
      "HIL testing embedded",
      "Hardware in the loop firmware",
      "Test firmware with real hardware",
      "HIL vs simulation",
    ],
    keywords: ["hardware", "loop", "hil", "testing", "firmware"],
    answer:
      "Hardware-in-the-loop testing runs firmware on real hardware while simulated or controlled inputs and loads are applied. It provides more realistic testing than pure simulation without requiring the full final system.",
  },
  {
    id: "firmware-release",
    category: "firmware",
    question: "How should firmware releases be managed?",
    variations: [
      "Firmware release process",
      "Version numbering firmware",
      "Release checklist embedded",
      "Manage firmware versions",
    ],
    keywords: ["release", "firmware", "version", "process", "manage"],
    answer:
      "A firmware release process should include testing, version identification, documentation, build reproducibility and a rollback or recovery plan. Releases should be traceable and consistent.",
  },
  {
    id: "firmware-license",
    category: "firmware",
    question: "What licenses apply to firmware libraries?",
    variations: [
      "Open source firmware license",
      "Can I use GPL in firmware",
      "Library licensing embedded",
      "MIT vs GPL firmware",
    ],
    keywords: ["license", "firmware", "library", "open", "source"],
    answer:
      "Library and tool licenses can affect how firmware may be used, modified or distributed. Common licenses include MIT, BSD, Apache and GPL. Review the terms before using third-party code in a product.",
  },
  {
    id: "firmware-abstraction",
    category: "firmware",
    question: "What is abstraction in firmware?",
    variations: [
      "Abstraction embedded",
      "Why abstract hardware",
      "Layered firmware design",
      "Firmware architecture",
    ],
    keywords: ["abstraction", "firmware", "architecture", "layer", "design"],
    answer:
      "Abstraction hides hardware details behind consistent interfaces, making code easier to read, test and port. Common layers include hardware access, drivers, services and application logic.",
  },
  {
    id: "firmware-architecture",
    category: "firmware",
    question: "How should firmware be architected?",
    variations: [
      "Firmware architecture",
      "How to structure embedded code",
      "Layered firmware design",
      "Modular firmware",
    ],
    keywords: ["architecture", "firmware", "structure", "modular", "design"],
    answer:
      "Firmware architecture depends on complexity and requirements. Common approaches include simple main loops, state machines, event-driven designs, RTOS-based tasks and layered architectures. Clear interfaces, modularity and testability are generally desirable.",
  },
  {
    id: "firmware-event-driven",
    category: "firmware",
    question: "What is event-driven firmware?",
    variations: [
      "Event driven embedded",
      "How to use events in firmware",
      "Event loop microcontroller",
      "Event vs polling firmware",
    ],
    keywords: ["event", "driven", "firmware", "loop", "polling"],
    answer:
      "Event-driven firmware reacts to events such as interrupts, messages or timer expirations rather than continuously polling. It can improve responsiveness and power efficiency in many applications.",
  },
  {
    id: "firmware-polling",
    category: "firmware",
    question: "What is polling in firmware?",
    variations: [
      "Polling vs interrupt",
      "What is polling code",
      "When to use polling",
      "Polling loop embedded",
    ],
    keywords: ["polling", "firmware", "loop", "interrupt", "check"],
    answer:
      "Polling repeatedly checks a condition or input in software. It is simple and predictable but can waste processing time or miss fast events. Interrupts are often preferred for time-critical or low-power applications.",
  },
  {
    id: "firmware-cooperative",
    category: "firmware",
    question: "What is cooperative multitasking?",
    variations: [
      "Cooperative scheduler firmware",
      "Non preemptive tasks",
      "Cooperative vs preemptive",
      "Simple task scheduler",
    ],
    keywords: ["cooperative", "multitasking", "scheduler", "firmware", "task"],
    answer:
      "Cooperative multitasking runs tasks that voluntarily yield control. It avoids some concurrency issues and can be simpler than preemptive scheduling, but a poorly behaved task can block others.",
  },
  {
    id: "firmware-preemptive",
    category: "firmware",
    question: "What is preemptive multitasking?",
    variations: [
      "Preemptive RTOS",
      "Preemptive scheduler",
      "Preemptive vs cooperative",
      "Task preemption firmware",
    ],
    keywords: ["preemptive", "multitasking", "rtos", "scheduler", "firmware"],
    answer:
      "Preemptive multitasking allows the scheduler to interrupt running tasks to switch to higher-priority ones. It provides better responsiveness for complex systems but requires careful synchronization and resource management.",
  },
  {
    id: "firmware-priority-inversion",
    category: "firmware",
    question: "What is priority inversion?",
    variations: [
      "Priority inversion RTOS",
      "Why does high priority task wait",
      "Mutex priority inversion",
      "Real time bug",
    ],
    keywords: ["priority", "inversion", "rtos", "mutex", "task"],
    answer:
      "Priority inversion occurs when a high-priority task waits for a resource held by a lower-priority task, while a medium-priority task runs. Priority inheritance or ceiling protocols can mitigate it in RTOS designs.",
  },
  {
    id: "firmware-deadlock",
    category: "firmware",
    question: "What is a deadlock in firmware?",
    variations: [
      "Deadlock embedded",
      "Why does my firmware hang",
      "Mutex deadlock",
      "Task deadlock RTOS",
    ],
    keywords: ["deadlock", "firmware", "mutex", "task", "hang"],
    answer:
      "A deadlock occurs when tasks wait indefinitely for resources held by each other. Careful resource ordering, timeouts and avoiding nested locks can reduce the risk.",
  },
  {
    id: "firmware-starvation",
    category: "firmware",
    question: "What is task starvation?",
    variations: [
      "Starvation RTOS",
      "Task never runs",
      "Low priority task blocked",
      "Fair scheduling firmware",
    ],
    keywords: ["starvation", "task", "rtos", "priority", "firmware"],
    answer:
      "Task starvation occurs when a task cannot get processor time because higher-priority tasks or continuous events keep it from running. Scheduling design and priority assignment can prevent it.",
  },
  {
    id: "firmware-yield",
    category: "firmware",
    question: "What does yielding mean in firmware?",
    variations: [
      "Task yield",
      "yield function RTOS",
      "Give up CPU firmware",
      "Cooperative yield",
    ],
    keywords: ["yield", "task", "firmware", "rtos", "cooperative"],
    answer:
      "Yielding means a task voluntarily gives up the processor so other tasks can run. In cooperative systems, regular yielding is important to keep the system responsive.",
  },
  {
    id: "firmware-context-switch",
    category: "firmware",
    question: "What is a context switch?",
    variations: [
      "Context switch RTOS",
      "How tasks switch",
      "Save restore context",
      "Task switching overhead",
    ],
    keywords: ["context", "switch", "rtos", "task", "firmware"],
    answer:
      "A context switch saves the state of one task and restores another so execution can continue. It adds overhead, so excessive switching can reduce performance.",
  },
  {
    id: "firmware-timer",
    category: "firmware",
    question: "How do I use hardware timers in firmware?",
    variations: [
      "Timer interrupt firmware",
      "How to configure timer",
      "Timer PWM firmware",
      "Periodic timer embedded",
    ],
    keywords: ["timer", "hardware", "interrupt", "periodic", "firmware"],
    answer:
      "Hardware timers can generate periodic interrupts, measure time, produce PWM or trigger events. Firmware configures the prescaler and period to achieve the required timing.",
  },
  {
    id: "firmware-counter",
    category: "firmware",
    question: "How do I use counters in firmware?",
    variations: [
      "Counter timer embedded",
      "Count external events",
      "Frequency measurement firmware",
      "Counter interrupt",
    ],
    keywords: ["counter", "firmware", "timer", "events", "measure"],
    answer:
      "Counters can count external events or internal clock cycles. They are used for frequency measurement, position tracking, pulse counting and event detection.",
  },
  {
    id: "firmware-capture",
    category: "firmware",
    question: "What is input capture in firmware?",
    variations: [
      "Input capture timer",
      "Measure pulse width",
      "Capture external signal",
      "Frequency measurement capture",
    ],
    keywords: ["capture", "input", "timer", "pulse", "measure"],
    answer:
      "Input capture records the timer value when an external event occurs, allowing precise measurement of pulse width, period or frequency. It is useful for sensors and signal analysis.",
  },
  {
    id: "firmware-compare",
    category: "firmware",
    question: "What is output compare in firmware?",
    variations: [
      "Output compare timer",
      "Generate precise timing",
      "Compare match interrupt",
      "Timer compare firmware",
    ],
    keywords: ["compare", "output", "timer", "match", "firmware"],
    answer:
      "Output compare triggers an action or interrupt when the timer reaches a set value. It can generate precise waveforms, timing events or control signals.",
  },
  {
    id: "firmware-dma",
    category: "firmware",
    question: "What is DMA in firmware?",
    variations: [
      "Direct memory access embedded",
      "How does DMA work",
      "DMA vs CPU copy",
      "Use DMA firmware",
    ],
    keywords: ["dma", "direct", "memory", "access", "firmware"],
    answer:
      "DMA, or Direct Memory Access, moves data between peripherals and memory without continuous CPU involvement. It can improve performance and reduce CPU load for high-speed or continuous data transfers.",
  },
  {
    id: "firmware-ring-buffer",
    category: "firmware",
    question: "What is a ring buffer in firmware?",
    variations: [
      "Circular buffer embedded",
      "Ring buffer UART",
      "How to use circular buffer",
      "FIFO firmware",
    ],
    keywords: ["ring", "buffer", "circular", "fifo", "firmware"],
    answer:
      "A ring or circular buffer stores data in a fixed-size buffer with wraparound. It is commonly used for UART receive/transmit queues and streaming data, and can be made safe for interrupt and main-loop access with proper handling.",
  },
  {
    id: "firmware-uart-ring",
    category: "firmware",
    question: "How do I buffer UART data in firmware?",
    variations: [
      "UART receive buffer",
      "Serial buffer overflow",
      "Ring buffer UART",
      "Non blocking serial read",
    ],
    keywords: ["uart", "buffer", "serial", "ring", "firmware"],
    answer:
      "UART data can be buffered using a ring buffer filled by the receive interrupt and read by the main loop. This prevents data loss and allows non-blocking communication.",
  },
  {
    id: "firmware-protocol",
    category: "firmware",
    question: "How do I design a communication protocol for firmware?",
    variations: [
      "Custom protocol embedded",
      "Protocol framing",
      "Checksum protocol",
      "Reliable serial protocol",
    ],
    keywords: ["protocol", "firmware", "framing", "checksum", "communication"],
    answer:
      "A protocol should define framing, message types, addressing, error checking and handling of incomplete or invalid data. Start and end markers, length fields and checksums or CRCs are common techniques for reliable communication.",
  },
  {
    id: "firmware-crc",
    category: "firmware",
    question: "What is CRC in firmware?",
    variations: [
      "CRC checksum embedded",
      "How to use CRC",
      "Data integrity firmware",
      "CRC vs checksum",
    ],
    keywords: ["crc", "checksum", "firmware", "integrity", "data"],
    answer:
      "CRC, or Cyclic Redundancy Check, is an error-detecting code used to verify data integrity. It is commonly used in communication, storage and firmware updates to detect corruption.",
  },
  {
    id: "firmware-json-lib",
    category: "firmware",
    question: "What library can parse JSON on a microcontroller?",
    variations: [
      "ArduinoJson",
      "Parse JSON ESP32",
      "JSON library embedded",
      "JSON memory usage",
    ],
    keywords: ["json", "arduinojson", "library", "parse", "firmware"],
    answer:
      "Libraries such as ArduinoJson are commonly used to parse and generate JSON on microcontrollers. Memory usage depends on document size and the library configuration, so capacity should be considered.",
  },
  {
    id: "firmware-littlefs",
    category: "firmware",
    question: "What is LittleFS?",
    variations: [
      "LittleFS ESP32",
      "File system embedded",
      "SPIFFS vs LittleFS",
      "Flash file system firmware",
    ],
    keywords: ["littlefs", "spiffs", "file", "system", "firmware"],
    answer:
      "LittleFS is a file system designed for embedded flash storage. It provides wear leveling and power-loss resilience. It is often used on ESP32 and other microcontrollers for configuration, logs and web assets.",
  },
  {
    id: "firmware-fatfs",
    category: "firmware",
    question: "What is FatFS?",
    variations: [
      "FatFS embedded",
      "SD card file system firmware",
      "FAT file system microcontroller",
      "Read SD card embedded",
    ],
    keywords: ["fatfs", "fat", "file", "system", "sd", "firmware"],
    answer:
      "FatFS is a generic file system module for FAT-based storage, commonly used with SD cards and other media on microcontrollers. It allows files to be read and written in a format compatible with computers.",
  },
  {
    id: "firmware-flash-wear",
    category: "firmware",
    question: "What is flash wear leveling?",
    variations: [
      "Flash memory wear",
      "Wear leveling embedded",
      "How many write cycles flash",
      "Protect flash memory",
    ],
    keywords: ["flash", "wear", "leveling", "memory", "firmware"],
    answer:
      "Flash memory has limited write/erase cycles. Wear leveling distributes writes across the memory to extend its life. File systems such as LittleFS include wear leveling, and application firmware should avoid unnecessary writes.",
  },
  {
    id: "firmware-eeprom",
    category: "firmware",
    question: "How do I store data in EEPROM?",
    variations: [
      "EEPROM Arduino",
      "Save settings EEPROM",
      "EEPROM write cycles",
      "Non volatile storage firmware",
    ],
    keywords: ["eeprom", "storage", "firmware", "write", "cycles"],
    answer:
      "EEPROM stores small amounts of non-volatile data, such as configuration settings. It has limited write cycles, so writes should be minimized and structured to avoid wearing out individual locations.",
  },
  {
    id: "firmware-rtc",
    category: "firmware",
    question: "How do I keep time in firmware?",
    variations: [
      "RTC embedded",
      "Real time clock firmware",
      "Keep time without internet",
      "RTC vs millis",
    ],
    keywords: ["rtc", "time", "clock", "firmware", "battery"],
    answer:
      "Time can be kept using a hardware RTC with a backup battery, network time synchronization or an internal timer. A hardware RTC maintains time across power loss, while internal timers reset when power is removed.",
  },
  {
    id: "firmware-ntp",
    category: "firmware",
    question: "How do I get time from the internet?",
    variations: [
      "NTP ESP32",
      "Internet time firmware",
      "Synchronize clock WiFi",
      "NTP client embedded",
    ],
    keywords: ["ntp", "time", "internet", "esp32", "firmware"],
    answer:
      "Firmware can use NTP, or Network Time Protocol, to synchronize with internet time servers. This requires a network connection and may be combined with an RTC to maintain time when offline.",
  },
  {
    id: "firmware-http",
    category: "firmware",
    question: "How do I make HTTP requests from firmware?",
    variations: [
      "ESP32 HTTP client",
      "Send data to server firmware",
      "GET POST embedded",
      "HTTP vs MQTT firmware",
    ],
    keywords: ["http", "request", "server", "firmware", "esp32"],
    answer:
      "Firmware can use an HTTP client library to send GET or POST requests to a server. The response can then be processed. For frequent or low-power messaging, MQTT or another protocol may be more efficient.",
  },
  {
    id: "firmware-webserver",
    category: "firmware",
    question: "Can firmware run a web server?",
    variations: [
      "ESP32 web server",
      "Embedded web interface",
      "Arduino web server",
      "Control device from browser",
    ],
    keywords: ["web", "server", "firmware", "esp32", "browser"],
    answer:
      "Many connected microcontrollers, such as ESP32, can run a lightweight web server. This allows a browser to view status or control the device. Security, performance and concurrent connection limits should be considered.",
  },
  {
    id: "firmware-websocket",
    category: "firmware",
    question: "What is WebSocket in firmware?",
    variations: [
      "ESP32 WebSocket",
      "Real time communication embedded",
      "WebSocket vs HTTP firmware",
      "WebSocket server firmware",
    ],
    keywords: ["websocket", "firmware", "real", "time", "communication"],
    answer:
      "WebSocket provides a persistent, bidirectional connection between a client and server. It is useful for real-time control or monitoring where frequent updates are needed without repeated HTTP requests.",
  },
  {
    id: "firmware-file-transfer",
    category: "firmware",
    question: "How do I transfer files to or from a microcontroller?",
    variations: [
      "Upload file to ESP32",
      "File transfer firmware",
      "SD card file transfer",
      "Send file over serial",
    ],
    keywords: ["file", "transfer", "firmware", "sd", "serial", "network"],
    answer:
      "Files can be transferred over serial, network, USB, SD card or other interfaces depending on the hardware. The method should consider speed, reliability and available storage.",
  },
  {
    id: "firmware-binary",
    category: "firmware",
    question: "How do I handle binary data in firmware?",
    variations: [
      "Binary protocol embedded",
      "Send binary data serial",
      "Endianness firmware",
      "Struct packing embedded",
    ],
    keywords: ["binary", "data", "firmware", "endianness", "protocol"],
    answer:
      "Binary data should be handled with attention to byte order, alignment, packet structure and buffer limits. Explicit serialization is often safer than sending raw structs, especially across different platforms or compilers.",
  },
  {
    id: "firmware-bitwise",
    category: "firmware",
    question: "How do I use bitwise operations in firmware?",
    variations: [
      "Bit manipulation embedded",
      "Set clear toggle bit",
      "Bitwise operators microcontroller",
      "Flags firmware",
    ],
    keywords: ["bitwise", "bit", "flags", "firmware", "registers"],
    answer:
      "Bitwise operations are used to set, clear, toggle and test individual bits, which is common for registers, flags and compact data. Masks and shifts make the intent clear and avoid unintended changes to other bits.",
  },
  {
    id: "firmware-bitfield",
    category: "firmware",
    question: "What is a bitfield?",
    variations: [
      "Bitfield embedded",
      "Bitfield vs bitmask",
      "How to use bitfields",
      "Packed data firmware",
    ],
    keywords: ["bitfield", "bitmask", "firmware", "packed", "data"],
    answer:
      "A bitfield packs multiple values into a single integer or register, allowing compact storage and efficient flags. However, bitfield layout can be compiler-dependent, so explicit masks are often used for portability.",
  },
  {
    id: "firmware-endianness",
    category: "firmware",
    question: "What is endianness in firmware?",
    variations: [
      "Big endian vs little endian",
      "Endianness embedded",
      "Byte order firmware",
      "How to handle endianness",
    ],
    keywords: ["endianness", "byte", "order", "firmware", "data"],
    answer:
      "Endianness defines the byte order used to store multi-byte values. It matters when exchanging data between different systems or interpreting binary formats. Explicit conversion may be needed for portability.",
  },
  {
    id: "firmware-struct",
    category: "firmware",
    question: "Why should I be careful with structs in firmware?",
    variations: [
      "Struct packing embedded",
      "Struct alignment firmware",
      "Send struct over serial",
      "Portable struct firmware",
    ],
    keywords: ["struct", "packing", "alignment", "firmware", "data"],
    answer:
      "Structs may have padding and compiler-dependent layout, which can differ between platforms. For communication or storage, explicitly serialize fields rather than sending raw structs unless the layout is controlled and documented.",
  },
  {
    id: "firmware-union",
    category: "firmware",
    question: "What is a union used for in firmware?",
    variations: [
      "Union embedded",
      "Union vs struct",
      "Type punning firmware",
      "Union data representation",
    ],
    keywords: ["union", "firmware", "data", "representation", "struct"],
    answer:
      "A union allows different data types to share the same memory. It can be used for interpreting data in multiple ways or saving memory, but requires care because the active member and byte representation must be understood.",
  },
  {
    id: "firmware-enum",
    category: "firmware",
    question: "How should I use enums in firmware?",
    variations: [
      "Enum embedded",
      "Why use enums",
      "Enum vs define",
      "State enum firmware",
    ],
    keywords: ["enum", "firmware", "state", "define", "type"],
    answer:
      "Enums provide named constants for related values, improving readability and type safety. They are commonly used for states, modes and error codes.",
  },
  {
    id: "firmware-typedef",
    category: "firmware",
    question: "Why use typedef in firmware?",
    variations: [
      "typedef embedded",
      "Why use typedef",
      "Typedef struct",
      "Portable types firmware",
    ],
    keywords: ["typedef", "firmware", "type", "struct", "portable"],
    answer:
      "typedef creates aliases for types, which can improve readability and portability, especially for fixed-width integer types and function pointers.",
  },
  {
    id: "firmware-stdint",
    category: "firmware",
    question: "Should I use fixed-width integer types in firmware?",
    variations: [
      "uint8_t vs int",
      "Fixed width types embedded",
      "stdint firmware",
      "Portable integer types",
    ],
    keywords: ["stdint", "fixed", "width", "integer", "firmware"],
    answer:
      "Fixed-width types such as uint8_t, uint16_t and int32_t make the intended size explicit and improve portability across compilers and architectures. They are generally preferred in embedded firmware where width matters.",
  },
  {
    id: "firmware-unsigned",
    category: "firmware",
    question:
      "What should I know about signed and unsigned integers in firmware?",
    variations: [
      "Signed vs unsigned embedded",
      "Unsigned underflow firmware",
      "Integer overflow embedded",
      "Type conversion firmware",
    ],
    keywords: ["signed", "unsigned", "integer", "overflow", "firmware"],
    answer:
      "Mixing signed and unsigned types can cause unexpected conversions and comparison results. Unsigned subtraction can underflow. Use appropriate types, explicit casts and careful comparisons to avoid subtle bugs.",
  },
  {
    id: "firmware-overflow",
    category: "firmware",
    question: "How do I avoid integer overflow in firmware?",
    variations: [
      "Integer overflow embedded",
      "Overflow bug firmware",
      "Safe arithmetic embedded",
      "Counter overflow",
    ],
    keywords: ["overflow", "integer", "firmware", "counter", "safe"],
    answer:
      "Use sufficiently wide types, check ranges before arithmetic, avoid unnecessary casts and consider saturation or wrapping behavior explicitly. Overflow can cause incorrect control decisions or safety issues.",
  },
  {
    id: "firmware-watchdog-reset",
    category: "firmware",
    question: "Why does my watchdog keep resetting the board?",
    variations: [
      "Watchdog reset loop",
      "Board resets watchdog",
      "How to debug watchdog reset",
      "Watchdog not serviced",
    ],
    keywords: ["watchdog", "reset", "loop", "debug", "firmware"],
    answer:
      "The watchdog likely is not being serviced within its timeout, or the system is blocked, stuck in a loop or spending too long in an interrupt. Check the reset source, watchdog timeout and code paths that may block execution.",
  },
  {
    id: "firmware-hang",
    category: "firmware",
    question: "Why does my firmware hang or freeze?",
    variations: [
      "Program freezes",
      "Code stops responding",
      "Firmware stuck",
      "Why does my device lock up",
    ],
    keywords: ["hang", "freeze", "stuck", "firmware", "lock"],
    answer:
      "Common causes include infinite loops, blocking waits, deadlocks, stack overflow, memory corruption, unhandled interrupts or hardware faults. Debugging with logs, breakpoints and watchdog reset information can help locate the cause.",
  },
  {
    id: "firmware-crash",
    category: "firmware",
    question: "Why does my firmware crash?",
    variations: [
      "Firmware crash",
      "Program crashes embedded",
      "Hard fault microcontroller",
      "Why does code crash",
    ],
    keywords: ["crash", "firmware", "fault", "hard", "debug"],
    answer:
      "Crashes can be caused by invalid memory access, stack overflow, null pointers, division by zero, unhandled interrupts or hardware faults. Fault status registers and debug tools can help identify the cause.",
  },
  {
    id: "firmware-hardfault",
    category: "firmware",
    question: "What is a hard fault?",
    variations: [
      "Hard fault microcontroller",
      "Why hard fault",
      "Debug hard fault",
      "ARM hard fault",
    ],
    keywords: ["hard", "fault", "arm", "firmware", "debug"],
    answer:
      "A hard fault is an ARM Cortex exception that occurs when a fault cannot be handled by a more specific fault handler. It often indicates invalid memory access, stack issues, unaligned access or a programming error. Fault registers and a debugger help identify the cause.",
  },
  {
    id: "firmware-memory-corruption",
    category: "firmware",
    question: "How do I find memory corruption in firmware?",
    variations: [
      "Memory corruption embedded",
      "Why is my variable changing",
      "Buffer overflow firmware",
      "Stack corruption",
    ],
    keywords: ["memory", "corruption", "buffer", "overflow", "firmware"],
    answer:
      "Memory corruption can come from buffer overflows, out-of-bounds indexing, stack overflow, use-after-free or incorrect pointer handling. Guard patterns, bounds checks, debug tooling and careful code review can help locate the cause.",
  },
  {
    id: "firmware-buffer-overflow",
    category: "firmware",
    question: "How do I prevent buffer overflows in firmware?",
    variations: [
      "Buffer overflow embedded",
      "Array bounds firmware",
      "Safe string firmware",
      "Prevent memory overwrite",
    ],
    keywords: ["buffer", "overflow", "bounds", "firmware", "memory"],
    answer:
      "Validate indices and lengths, use bounded copy functions, check buffer capacities and avoid unsafe string operations. Defensive checks and testing help prevent overflows that could corrupt memory or cause crashes.",
  },
  {
    id: "firmware-string",
    category: "firmware",
    question: "Are strings safe in firmware?",
    variations: [
      "String handling embedded",
      "String memory firmware",
      "Avoid String Arduino",
      "C string firmware",
    ],
    keywords: ["string", "firmware", "memory", "char", "safe"],
    answer:
      "Strings require careful handling because of fixed buffers, null termination and memory use. C-style character arrays are common in embedded firmware. Dynamic string classes can be convenient but may fragment memory on constrained systems.",
  },
  {
    id: "firmware-pointer",
    category: "firmware",
    question: "How should I use pointers in firmware?",
    variations: [
      "Pointers embedded",
      "Why use pointers firmware",
      "Null pointer embedded",
      "Pointer arithmetic",
    ],
    keywords: ["pointer", "firmware", "null", "memory", "address"],
    answer:
      "Pointers allow direct access to memory and hardware, but incorrect use can cause crashes or corruption. Validate pointers before use, avoid out-of-bounds arithmetic and be careful with function pointers in embedded systems.",
  },
  {
    id: "firmware-function-pointer",
    category: "firmware",
    question: "What is a function pointer used for in firmware?",
    variations: [
      "Function pointer embedded",
      "Callback firmware",
      "Jump table firmware",
      "Function pointer uses",
    ],
    keywords: ["function", "pointer", "firmware", "callback", "table"],
    answer:
      "Function pointers allow functions to be called indirectly, enabling callbacks, dispatch tables, state machines and driver interfaces. They require careful initialization and type matching.",
  },
  {
    id: "firmware-callback",
    category: "firmware",
    question: "What is a callback in firmware?",
    variations: [
      "Callback embedded",
      "How to use callbacks",
      "Interrupt callback",
      "Event callback firmware",
    ],
    keywords: ["callback", "firmware", "event", "function", "pointer"],
    answer:
      "A callback is a function supplied by the application that is called by a library, driver or event system when a specific event occurs. Callbacks allow modular and event-driven designs.",
  },
  {
    id: "firmware-interrupt-safety",
    category: "firmware",
    question: "What should be avoided inside an interrupt handler?",
    variations: [
      "ISR best practices",
      "What not to do in interrupt",
      "Interrupt handler rules",
      "Keep ISR short",
    ],
    keywords: ["interrupt", "isr", "handler", "safety", "firmware"],
    answer:
      "Interrupt handlers should generally be short, avoid blocking operations, delay functions, dynamic memory allocation and non-reentrant calls. Shared data should be handled carefully with volatile or appropriate synchronization.",
  },
  {
    id: "firmware-reentrant",
    category: "firmware",
    question: "What is a reentrant function?",
    variations: [
      "Reentrant code embedded",
      "Thread safe function",
      "Reentrancy firmware",
      "Why is my function not reentrant",
    ],
    keywords: ["reentrant", "function", "firmware", "thread", "safe"],
    answer:
      "A reentrant function can be safely called again before its previous invocation completes, such as from an interrupt or multiple tasks. It avoids shared state or protects it appropriately. Many standard library functions are not reentrant.",
  },
  {
    id: "firmware-lock",
    category: "firmware",
    question: "What is a lock in firmware?",
    variations: [
      "Lock RTOS",
      "Spinlock embedded",
      "Mutex lock",
      "Resource locking firmware",
    ],
    keywords: ["lock", "mutex", "spinlock", "rtos", "firmware"],
    answer:
      "A lock prevents concurrent access to a shared resource. Mutexes, semaphores and spinlocks are common mechanisms. Locks must be used carefully to avoid deadlocks and priority inversion.",
  },
  {
    id: "firmware-semaphore",
    category: "firmware",
    question: "What is a semaphore in firmware?",
    variations: [
      "Semaphore RTOS",
      "Binary semaphore",
      "Counting semaphore",
      "Semaphore vs mutex",
    ],
    keywords: ["semaphore", "rtos", "firmware", "binary", "counting"],
    answer:
      "A semaphore is a synchronization primitive used for signaling or resource counting. Binary semaphores can signal events, while counting semaphores manage multiple resources. Unlike mutexes, they do not have ownership.",
  },
  {
    id: "firmware-queue",
    category: "firmware",
    question: "What is a queue in firmware?",
    variations: [
      "Message queue RTOS",
      "Queue embedded",
      "How to use queue",
      "Queue vs ring buffer",
    ],
    keywords: ["queue", "rtos", "firmware", "message", "buffer"],
    answer:
      "A queue passes data between tasks or between an interrupt and a task in a first-in, first-out manner. RTOS queues handle synchronization and can be safer than shared global variables.",
  },
  {
    id: "firmware-event-group",
    category: "firmware",
    question: "What is an event group in an RTOS?",
    variations: [
      "Event group RTOS",
      "FreeRTOS event group",
      "Multiple event flags",
      "Event synchronization firmware",
    ],
    keywords: ["event", "group", "rtos", "freertos", "firmware"],
    answer:
      "An event group allows tasks to wait for combinations of event flags. It is useful for synchronizing multiple conditions or events in a single wait operation.",
  },
  {
    id: "firmware-task-notification",
    category: "firmware",
    question: "What is a task notification in FreeRTOS?",
    variations: [
      "Task notification FreeRTOS",
      "Lightweight signaling RTOS",
      "Task notify vs semaphore",
      "FreeRTOS notification",
    ],
    keywords: ["task", "notification", "freertos", "rtos", "firmware"],
    answer:
      "Task notifications provide a lightweight way to signal a task directly, often with less overhead than a semaphore or queue. They are useful for simple event signaling.",
  },
  {
    id: "firmware-idle-task",
    category: "firmware",
    question: "What is the idle task in an RTOS?",
    variations: [
      "Idle task RTOS",
      "What does idle task do",
      "FreeRTOS idle hook",
      "Low priority task firmware",
    ],
    keywords: ["idle", "task", "rtos", "freertos", "firmware"],
    answer:
      "The idle task runs when no other task is ready. It can be used for low-priority background work, but should not block. Some RTOSes provide an idle hook for such processing.",
  },
  {
    id: "firmware-tick",
    category: "firmware",
    question: "What is an RTOS tick?",
    variations: [
      "RTOS tick rate",
      "Tick interrupt firmware",
      "System tick embedded",
      "Tickless idle",
    ],
    keywords: ["tick", "rtos", "firmware", "timer", "scheduler"],
    answer:
      "An RTOS tick is a periodic interrupt used for timekeeping and scheduling. The tick rate affects timing resolution and overhead. Tickless idle reduces power by suppressing ticks when possible.",
  },
  {
    id: "firmware-tickless",
    category: "firmware",
    question: "What is tickless idle?",
    variations: [
      "Tickless RTOS",
      "Low power RTOS",
      "Tickless idle mode",
      "FreeRTOS tickless",
    ],
    keywords: ["tickless", "idle", "rtos", "low", "power", "firmware"],
    answer:
      "Tickless idle allows the RTOS to suppress periodic ticks when the system is idle, enabling longer low-power sleep. The timer is programmed to wake at the next scheduled event.",
  },
  {
    id: "firmware-trace",
    category: "firmware",
    question: "What is tracing in firmware?",
    variations: [
      "Firmware tracing",
      "Trace RTOS",
      "SystemView trace",
      "Debug trace embedded",
    ],
    keywords: ["trace", "tracing", "firmware", "debug", "rtos"],
    answer:
      "Tracing records events and timing information during execution, helping analyze task scheduling, interrupt behavior and performance. Tools may use SWO, ETM or other debug interfaces.",
  },
  {
    id: "firmware-profiling",
    category: "firmware",
    question: "How do I profile firmware?",
    variations: [
      "Profile embedded code",
      "CPU usage firmware",
      "Where is my code spending time",
      "Performance profiling firmware",
    ],
    keywords: ["profile", "profiling", "firmware", "performance", "cpu"],
    answer:
      "Profiling can use timers, GPIO markers, sampling or trace tools to identify where execution time is spent. The results guide optimization toward the most impactful areas.",
  },
  {
    id: "firmware-code-size",
    category: "firmware",
    question: "How do I reduce firmware code size?",
    variations: [
      "Reduce flash usage embedded",
      "Code size optimization firmware",
      "Firmware too large",
      "Optimize for size embedded",
    ],
    keywords: ["code", "size", "flash", "firmware", "optimize"],
    answer:
      "Code size can be reduced by enabling compiler size optimization, removing unused code, sharing functions, avoiding unnecessary libraries and using smaller data types where appropriate. The trade-off with speed and maintainability should be considered.",
  },
  {
    id: "firmware-ram",
    category: "firmware",
    question: "How do I reduce RAM usage in firmware?",
    variations: [
      "Reduce RAM embedded",
      "Memory optimization firmware",
      "Firmware out of RAM",
      "RAM usage microcontroller",
    ],
    keywords: ["ram", "memory", "firmware", "reduce", "optimize"],
    answer:
      "RAM usage can be reduced by using smaller data types, avoiding large local buffers, moving constant data to flash, reusing buffers and avoiding dynamic allocation. Stack and heap usage should also be measured.",
  },
  {
    id: "firmware-flash",
    category: "firmware",
    question: "How do I reduce flash usage in firmware?",
    variations: [
      "Reduce flash size",
      "Firmware too big for flash",
      "Optimize firmware size",
      "Flash memory usage embedded",
    ],
    keywords: ["flash", "size", "firmware", "reduce", "optimize"],
    answer:
      "Flash usage can be reduced by removing unused features and libraries, enabling size optimization, storing constant strings efficiently and considering compression or external storage where appropriate.",
  },
  {
    id: "firmware-cache",
    category: "firmware",
    question: "What is cache in firmware?",
    variations: [
      "Instruction cache embedded",
      "Cache memory microcontroller",
      "Why cache matters firmware",
      "Cache coherency firmware",
    ],
    keywords: ["cache", "firmware", "memory", "speed", "coherency"],
    answer:
      "Some microcontrollers include instruction or data caches to improve performance when accessing slower memory. Firmware should consider cache behavior, especially with DMA or self-modifying code.",
  },
  {
    id: "firmware-mpu",
    category: "firmware",
    question: "What is an MPU in firmware?",
    variations: [
      "Memory protection unit embedded",
      "MPU firmware",
      "Why use MPU",
      "Memory protection microcontroller",
    ],
    keywords: ["mpu", "memory", "protection", "firmware", "unit"],
    answer:
      "An MPU, or Memory Protection Unit, defines access permissions for memory regions. It can detect invalid accesses and improve system robustness, especially in systems with multiple tasks or untrusted code.",
  },
  {
    id: "firmware-mmu",
    category: "firmware",
    question: "What is an MMU?",
    variations: [
      "Memory management unit embedded",
      "MMU vs MPU",
      "Virtual memory microcontroller",
      "MMU firmware",
    ],
    keywords: ["mmu", "memory", "management", "virtual", "firmware"],
    answer:
      "An MMU, or Memory Management Unit, translates virtual addresses to physical addresses and can provide memory protection. It is common in application processors but less common in small microcontrollers.",
  },
  {
    id: "firmware-trustzone",
    category: "firmware",
    question: "What is TrustZone?",
    variations: [
      "ARM TrustZone",
      "Secure firmware TrustZone",
      "TrustZone embedded",
      "Secure and non secure firmware",
    ],
    keywords: ["trustzone", "arm", "secure", "firmware", "embedded"],
    answer:
      "TrustZone is an ARM security technology that separates secure and non-secure execution environments. It allows sensitive code and data to be isolated from the rest of the system.",
  },
  {
    id: "firmware-secure-boot",
    category: "firmware",
    question: "What is secure boot?",
    variations: [
      "Secure boot embedded",
      "Verify firmware signature",
      "Boot security firmware",
      "Prevent firmware tampering",
    ],
    keywords: ["secure", "boot", "firmware", "security", "signature"],
    answer:
      "Secure boot verifies the authenticity and integrity of firmware before execution using cryptographic signatures. It helps prevent unauthorized or corrupted firmware from running.",
  },
  {
    id: "firmware-encryption",
    category: "firmware",
    question: "How is firmware encrypted?",
    variations: [
      "Encrypt firmware embedded",
      "Firmware encryption",
      "Protect firmware code",
      "Secure firmware storage",
    ],
    keywords: ["encryption", "firmware", "security", "protect", "storage"],
    answer:
      "Firmware encryption protects code and data from unauthorized access. It requires key management and may involve hardware security features or secure elements. Encryption and secure boot are often used together.",
  },
  {
    id: "firmware-key-storage",
    category: "firmware",
    question: "How should cryptographic keys be stored in firmware?",
    variations: [
      "Store keys embedded",
      "Key storage firmware",
      "Secure element keys",
      "Protect firmware keys",
    ],
    keywords: ["keys", "storage", "firmware", "security", "crypto"],
    answer:
      "Keys should be stored in protected hardware such as a secure element, trusted execution environment or protected flash region where available. Hard-coded keys in firmware can be extracted and should be avoided for sensitive applications.",
  },
  {
    id: "firmware-tls",
    category: "firmware",
    question: "Can firmware use TLS?",
    variations: [
      "TLS embedded",
      "HTTPS firmware",
      "Secure socket firmware",
      "Certificate ESP32",
    ],
    keywords: ["tls", "https", "firmware", "security", "certificate"],
    answer:
      "Many connected microcontrollers support TLS for encrypted communication, though it requires more memory and processing. Certificate validation, time synchronization and key storage should be handled carefully.",
  },
  {
    id: "firmware-sntp",
    category: "firmware",
    question: "What is SNTP?",
    variations: [
      "SNTP vs NTP",
      "Simple network time protocol",
      "Time sync firmware",
      "SNTP embedded",
    ],
    keywords: ["sntp", "ntp", "time", "firmware", "sync"],
    answer:
      "SNTP, or Simple Network Time Protocol, is a simplified version of NTP used for basic time synchronization. It is often sufficient for embedded devices that need reasonably accurate time.",
  },
  {
    id: "firmware-mqtts",
    category: "firmware",
    question: "What is MQTTS?",
    variations: [
      "MQTT with TLS",
      "Secure MQTT",
      "MQTTS firmware",
      "MQTT encryption",
    ],
    keywords: ["mqtts", "mqtt", "tls", "secure", "firmware"],
    answer:
      "MQTTS refers to MQTT communication secured with TLS. It provides encryption and server authentication, which is important for IoT devices exchanging sensitive data.",
  },
  {
    id: "firmware-coap",
    category: "firmware",
    question: "What is CoAP?",
    variations: [
      "Constrained application protocol",
      "CoAP vs MQTT",
      "CoAP embedded",
      "UDP protocol firmware",
    ],
    keywords: ["coap", "constrained", "protocol", "firmware", "iot"],
    answer:
      "CoAP, or Constrained Application Protocol, is designed for constrained devices and networks. It uses UDP and a request/response model, and is often used in IoT and M2M applications.",
  },
  {
    id: "firmware-lorawan",
    category: "firmware",
    question: "What is LoRaWAN?",
    variations: [
      "LoRa firmware",
      "Long range IoT",
      "LoRaWAN embedded",
      "Low power wide area network",
    ],
    keywords: ["lorawan", "lora", "firmware", "iot", "long", "range"],
    answer:
      "LoRaWAN is a low-power wide-area networking protocol built on LoRa radio. It is used for long-range, low-bandwidth IoT applications such as remote sensing and metering.",
  },
  {
    id: "firmware-ble",
    category: "firmware",
    question: "What is BLE?",
    variations: [
      "Bluetooth low energy",
      "BLE firmware",
      "BLE vs classic Bluetooth",
      "BLE embedded",
    ],
    keywords: ["ble", "bluetooth", "low", "energy", "firmware"],
    answer:
      "BLE, or Bluetooth Low Energy, is designed for low-power short-range communication. It is widely used in wearables, sensors and mobile device interfaces.",
  },
  {
    id: "firmware-gatt",
    category: "firmware",
    question: "What is GATT in BLE?",
    variations: [
      "GATT BLE",
      "BLE services characteristics",
      "GATT firmware",
      "How GATT works",
    ],
    keywords: ["gatt", "ble", "service", "characteristic", "firmware"],
    answer:
      "GATT, or Generic Attribute Profile, defines how BLE devices structure and exchange data using services and characteristics. It is central to BLE application design.",
  },
  {
    id: "firmware-can",
    category: "firmware",
    question: "How do I use CAN bus in firmware?",
    variations: [
      "CAN bus embedded",
      "CAN firmware",
      "CAN controller microcontroller",
      "CAN protocol firmware",
    ],
    keywords: ["can", "bus", "firmware", "protocol", "embedded"],
    answer:
      "CAN firmware configures the CAN controller, message identifiers, bit timing and filters, then transmits and receives frames. CAN is common in automotive and industrial systems for reliable multi-node communication.",
  },
  {
    id: "firmware-modbus",
    category: "firmware",
    question: "How do I use Modbus in firmware?",
    variations: [
      "Modbus RTU firmware",
      "Modbus TCP embedded",
      "Modbus protocol code",
      "Modbus master slave",
    ],
    keywords: ["modbus", "rtu", "tcp", "firmware", "protocol"],
    answer:
      "Modbus firmware implements register addressing, function codes and timing appropriate to RTU or TCP. It can act as a master or slave, depending on the system architecture.",
  },
  {
    id: "firmware-rs485",
    category: "firmware",
    question: "How do I use RS-485 in firmware?",
    variations: [
      "RS485 firmware",
      "Half duplex serial",
      "RS485 direction control",
      "Modbus RS485",
    ],
    keywords: ["rs485", "firmware", "serial", "half", "duplex"],
    answer:
      "RS-485 firmware controls the transceiver direction for half-duplex communication and handles timing between transmit and receive. Termination, biasing and common grounding are also important.",
  },
  {
    id: "firmware-i2c-multiplexer",
    category: "firmware",
    question: "How do I use an I2C multiplexer?",
    variations: [
      "I2C multiplexer firmware",
      "Multiple I2C devices same address",
      "TCA9548A firmware",
      "I2C address conflict solution",
    ],
    keywords: ["i2c", "multiplexer", "address", "firmware", "conflict"],
    answer:
      "An I2C multiplexer switches the bus to different channels, allowing multiple devices with the same address to be used. Firmware selects the appropriate channel before communicating with the target device.",
  },
  {
    id: "firmware-address",
    category: "firmware",
    question: "How do I change an I2C device address?",
    variations: [
      "I2C address change",
      "Set I2C address",
      "I2C address conflict",
      "Change sensor address",
    ],
    keywords: ["i2c", "address", "change", "firmware", "sensor"],
    answer:
      "Some I2C devices allow the address to be changed using configuration registers, solder bridges or address pins. Others have a fixed address. Check the device datasheet for the available options.",
  },
  {
    id: "firmware-spi-multiple",
    category: "firmware",
    question: "How do I use multiple SPI devices?",
    variations: [
      "Multiple SPI devices",
      "SPI chip select firmware",
      "SPI shared bus",
      "CS pin management",
    ],
    keywords: ["spi", "multiple", "chip", "select", "firmware"],
    answer:
      "Multiple SPI devices share the clock, MOSI and MISO lines but each has a separate chip-select line. Firmware must assert only one chip-select at a time and respect each device's timing and mode requirements.",
  },
  {
    id: "firmware-uart-multiple",
    category: "firmware",
    question: "How do I connect multiple UART devices?",
    variations: [
      "Multiple UART devices",
      "UART multiplexing",
      "Software serial firmware",
      "Share UART bus",
    ],
    keywords: ["uart", "multiple", "serial", "firmware", "multiplex"],
    answer:
      "UART is typically point-to-point. Multiple devices may use separate UART ports, a multiplexer, or a bus protocol such as RS-485. Software serial can add ports but may have timing limitations.",
  },
  {
    id: "firmware-softwareserial",
    category: "firmware",
    question: "What is SoftwareSerial?",
    variations: [
      "Software serial Arduino",
      "Bit bang UART",
      "SoftwareSerial limitations",
      "Extra serial port firmware",
    ],
    keywords: ["softwareserial", "serial", "arduino", "firmware", "uart"],
    answer:
      "SoftwareSerial implements UART communication in software on general-purpose pins. It can add serial ports but may have limitations in baud rate, timing and simultaneous operation, especially at high speeds.",
  },
  {
    id: "firmware-interrupt-pin",
    category: "firmware",
    question: "How do I use an interrupt pin?",
    variations: [
      "External interrupt firmware",
      "attachInterrupt Arduino",
      "GPIO interrupt",
      "Pin change interrupt",
    ],
    keywords: ["interrupt", "pin", "gpio", "firmware", "external"],
    answer:
      "Firmware configures the pin as an input, selects the trigger condition and attaches an interrupt handler. The handler should be short, and shared variables should be handled with volatile and appropriate synchronization.",
  },
  {
    id: "firmware-pin-change",
    category: "firmware",
    question: "What is a pin change interrupt?",
    variations: [
      "Pin change interrupt AVR",
      "GPIO interrupt any pin",
      "PCINT firmware",
      "Port interrupt microcontroller",
    ],
    keywords: ["pin", "change", "interrupt", "firmware", "avr"],
    answer:
      "A pin change interrupt triggers when a group of pins changes state. It allows more pins to be monitored than dedicated external interrupt pins, but the handler must determine which pin changed.",
  },
  {
    id: "firmware-interrupt-debounce",
    category: "firmware",
    question: "How do I debounce in an interrupt handler?",
    variations: [
      "Interrupt debounce",
      "Button interrupt debounce",
      "Debounce in ISR",
      "Avoid multiple interrupts",
    ],
    keywords: ["debounce", "interrupt", "isr", "firmware", "button"],
    answer:
      "Debouncing can be done in the ISR by recording the time of the last accepted transition and ignoring changes within the debounce period. Long or complex debouncing should generally be moved to the main loop or a task.",
  },
  {
    id: "firmware-buttons",
    category: "firmware",
    question: "How do I handle multiple buttons in firmware?",
    variations: [
      "Multiple buttons code",
      "Button array firmware",
      "Matrix keypad firmware",
      "Read many buttons",
    ],
    keywords: ["buttons", "firmware", "matrix", "keypad", "input"],
    answer:
      "Multiple buttons can be read directly if there are enough pins, or through a matrix or external input expander. Firmware should handle debouncing and may support short press, long press and repeat behavior.",
  },
  {
    id: "firmware-keypad",
    category: "firmware",
    question: "How do I read a keypad in firmware?",
    variations: [
      "Matrix keypad Arduino",
      "Keypad scanning firmware",
      "Read 4x4 keypad",
      "Keypad library",
    ],
    keywords: ["keypad", "matrix", "firmware", "scan", "arduino"],
    answer:
      "A matrix keypad is read by driving rows and scanning columns or vice versa. Firmware determines which key is pressed by detecting the intersection. Debouncing and ghosting prevention may be needed.",
  },
  {
    id: "firmware-seven-segment",
    category: "firmware",
    question: "How do I drive a seven-segment display?",
    variations: [
      "Seven segment firmware",
      "Multiplex seven segment",
      "7 segment code",
      "Segment display driver",
    ],
    keywords: ["seven", "segment", "display", "firmware", "multiplex"],
    answer:
      "Seven-segment displays can be driven directly or through a driver. Multiplexing reduces pin count but requires timing to avoid flicker. Current-limiting resistors or a constant-current driver are needed.",
  },
  {
    id: "firmware-charlieplex",
    category: "firmware",
    question: "What is charlieplexing?",
    variations: [
      "Charlieplexing LED",
      "Charlieplex firmware",
      "Drive many LEDs few pins",
      "Charlieplexing limitations",
    ],
    keywords: ["charlieplex", "led", "firmware", "pins", "multiplex"],
    answer:
      "Charlieplexing uses tri-state outputs to drive many LEDs with relatively few pins. It requires careful timing and diode behavior, and can be limited by the number of pins and brightness.",
  },
  {
    id: "firmware-shift-register",
    category: "firmware",
    question: "How do I use a shift register in firmware?",
    variations: [
      "74HC595 firmware",
      "Shift register Arduino",
      "Serial to parallel firmware",
      "Expand GPIO shift register",
    ],
    keywords: ["shift", "register", "firmware", "gpio", "74hc595"],
    answer:
      "A shift register is driven by clocking data in or out serially and latching it to the outputs. This expands the number of outputs available from a few pins. Timing and latch behavior must match the device.",
  },
  {
    id: "firmware-gpio-expander",
    category: "firmware",
    question: "How do I use a GPIO expander?",
    variations: [
      "I2C GPIO expander",
      "PCF8574 firmware",
      "MCP23017 firmware",
      "Expand IO pins",
    ],
    keywords: ["gpio", "expander", "firmware", "i2c", "pins"],
    answer:
      "A GPIO expander adds inputs or outputs over I2C or SPI. Firmware reads and writes the expander registers to control pins. Interrupt outputs on some expanders can signal input changes.",
  },
  {
    id: "firmware-adc-external",
    category: "firmware",
    question: "How do I use an external ADC?",
    variations: [
      "External ADC firmware",
      "ADS1115 firmware",
      "MCP3208 firmware",
      "SPI ADC code",
    ],
    keywords: ["adc", "external", "firmware", "spi", "i2c"],
    answer:
      "An external ADC is configured and read over its interface, often I2C or SPI. Firmware must respect conversion timing, input range, reference and data format. External ADCs can offer higher resolution or more channels than the microcontroller provides.",
  },
  {
    id: "firmware-dac-external",
    category: "firmware",
    question: "How do I use an external DAC?",
    variations: [
      "External DAC firmware",
      "MCP4725 firmware",
      "SPI DAC code",
      "Analog output microcontroller",
    ],
    keywords: ["dac", "external", "firmware", "i2c", "spi"],
    answer:
      "An external DAC converts digital values to analog output. Firmware writes the value over the interface. Output range, reference, resolution and update rate depend on the device.",
  },
  {
    id: "firmware-display",
    category: "firmware",
    question: "How do I drive a display in firmware?",
    variations: [
      "Display firmware",
      "LCD library Arduino",
      "OLED firmware",
      "TFT display code",
    ],
    keywords: ["display", "firmware", "lcd", "oled", "tft"],
    answer:
      "Display firmware uses a library or driver to initialize the display, send commands and data, and update the screen. The interface may be parallel, SPI, I2C or another type. Buffering and update rate should be considered.",
  },
  {
    id: "firmware-graphics",
    category: "firmware",
    question: "How do I draw graphics on a display?",
    variations: [
      "Graphics firmware",
      "Draw shapes OLED",
      "TFT graphics library",
      "Display buffer firmware",
    ],
    keywords: ["graphics", "display", "firmware", "draw", "buffer"],
    answer:
      "Graphics libraries provide functions for drawing pixels, lines, shapes and text. Some use a framebuffer in RAM. Memory usage and refresh rate determine what is practical on a given microcontroller.",
  },
  {
    id: "firmware-font",
    category: "firmware",
    question: "How do I display text on a screen?",
    variations: [
      "Font firmware",
      "Display text OLED",
      "Character display firmware",
      "Custom font embedded",
    ],
    keywords: ["font", "text", "display", "firmware", "character"],
    answer:
      "Text is displayed using a font table or library that maps characters to pixels or character codes. Character LCDs use built-in character sets, while graphic displays require font data and rendering code.",
  },
  {
    id: "firmware-touch",
    category: "firmware",
    question: "How do I handle touch input in firmware?",
    variations: [
      "Touchscreen firmware",
      "Capacitive touch code",
      "Resistive touchscreen firmware",
      "Touch controller I2C",
    ],
    keywords: ["touch", "firmware", "screen", "input", "controller"],
    answer:
      "Touch input is read from a touch controller, often over I2C or SPI. Firmware processes coordinates, detects gestures and handles calibration and debouncing depending on the touch technology.",
  },
  {
    id: "firmware-encoder-firmware",
    category: "firmware",
    question: "How do I read a rotary encoder in firmware?",
    variations: [
      "Rotary encoder code",
      "Quadrature encoder firmware",
      "Encoder interrupt",
      "Read encoder Arduino",
    ],
    keywords: ["encoder", "firmware", "quadrature", "interrupt", "read"],
    answer:
      "Firmware reads the two encoder channels and determines direction from their phase relationship. Interrupts or polling can be used. Debouncing and contact bounce handling are important for mechanical encoders.",
  },
  {
    id: "firmware-servo",
    category: "firmware",
    question: "How do I control a servo in firmware?",
    variations: [
      "Servo Arduino code",
      "Servo PWM firmware",
      "Control servo angle",
      "Servo library",
    ],
    keywords: ["servo", "firmware", "pwm", "angle", "control"],
    answer:
      "A servo is controlled by a PWM signal with a pulse width corresponding to the desired angle. Firmware sets the pulse width within the servo's valid range and may use a library for convenience.",
  },
  {
    id: "firmware-stepper",
    category: "firmware",
    question: "How do I control a stepper motor in firmware?",
    variations: [
      "Stepper motor code",
      "Step direction firmware",
      "AccelStepper library",
      "Stepper driver firmware",
    ],
    keywords: ["stepper", "firmware", "step", "direction", "driver"],
    answer:
      "Firmware controls a stepper driver using step and direction signals or a serial command interface, depending on the driver. Speed, acceleration and position are managed by the firmware or a library.",
  },
  {
    id: "firmware-bldc",
    category: "firmware",
    question: "How do I control a BLDC motor?",
    variations: [
      "BLDC firmware",
      "Brushless motor control",
      "ESC control firmware",
      "Sensorless BLDC",
    ],
    keywords: ["bldc", "brushless", "firmware", "control", "esc"],
    answer:
      "BLDC control can use an ESC with a servo-style signal or implement commutation in firmware using Hall sensors or sensorless techniques. The approach depends on the motor, driver and required performance.",
  },
  {
    id: "firmware-pid",
    category: "firmware",
    question: "How do I implement PID in firmware?",
    variations: [
      "PID code Arduino",
      "PID controller firmware",
      "Tune PID embedded",
      "PID library",
    ],
    keywords: ["pid", "firmware", "control", "tune", "loop"],
    answer:
      "PID firmware computes an output from proportional, integral and derivative terms based on the error between setpoint and measurement. The loop should run at a consistent rate, and gains must be tuned for the system.",
  },
  {
    id: "firmware-control-loop",
    category: "firmware",
    question: "What is a control loop in firmware?",
    variations: [
      "Control loop embedded",
      "Closed loop firmware",
      "Feedback control code",
      "How to implement control loop",
    ],
    keywords: ["control", "loop", "firmware", "feedback", "closed"],
    answer:
      "A control loop reads a measurement, compares it to a setpoint and adjusts an output to reduce the error. It may be simple on/off, PID or another control strategy. Timing consistency is important.",
  },
  {
    id: "firmware-sensor-fusion",
    category: "firmware",
    question: "What is sensor fusion?",
    variations: [
      "Sensor fusion embedded",
      "Combine sensor data",
      "IMU sensor fusion",
      "Kalman filter firmware",
    ],
    keywords: ["sensor", "fusion", "firmware", "imu", "kalman"],
    answer:
      "Sensor fusion combines data from multiple sensors to produce a more accurate or robust estimate than any single sensor. Algorithms range from simple averaging to Kalman filters, depending on the application.",
  },
  {
    id: "firmware-filter",
    category: "firmware",
    question: "How do I filter sensor data in firmware?",
    variations: [
      "Moving average firmware",
      "Low pass filter code",
      "Sensor filtering embedded",
      "Median filter firmware",
    ],
    keywords: ["filter", "sensor", "firmware", "average", "median"],
    answer:
      "Common firmware filters include moving average, exponential smoothing and median filters. The choice depends on the noise characteristics, required response time and available processing and memory.",
  },
  {
    id: "firmware-kalman",
    category: "firmware",
    question: "What is a Kalman filter?",
    variations: [
      "Kalman filter embedded",
      "How does Kalman filter work",
      "Implement Kalman firmware",
      "Kalman vs complementary filter",
    ],
    keywords: ["kalman", "filter", "firmware", "estimation", "sensor"],
    answer:
      "A Kalman filter estimates the state of a system from noisy measurements and a model. It is used in sensor fusion, navigation and control. Implementation complexity depends on the system model and available processing power.",
  },
  {
    id: "firmware-complementary",
    category: "firmware",
    question: "What is a complementary filter?",
    variations: [
      "Complementary filter IMU",
      "Simple sensor fusion",
      "Complementary vs Kalman",
      "Firmware complementary filter",
    ],
    keywords: ["complementary", "filter", "firmware", "imu", "sensor"],
    answer:
      "A complementary filter combines two sensor signals with different noise characteristics using a weighted sum. It is simpler than a Kalman filter and commonly used for IMU attitude estimation.",
  },
  {
    id: "firmware-calibration",
    category: "firmware",
    question: "How do I calibrate sensors in firmware?",
    variations: [
      "Sensor calibration code",
      "Calibrate IMU firmware",
      "Offset and scale calibration",
      "Two point calibration",
    ],
    keywords: ["calibration", "sensor", "firmware", "offset", "scale"],
    answer:
      "Calibration can involve offset, gain, linearity or temperature correction. Firmware may store calibration constants and apply them to raw readings. The procedure depends on the sensor and required accuracy.",
  },
  {
    id: "firmware-temperature",
    category: "firmware",
    question: "How do I read temperature in firmware?",
    variations: [
      "Temperature sensor code",
      "Read thermistor firmware",
      "DS18B20 firmware",
      "Temperature measurement embedded",
    ],
    keywords: ["temperature", "sensor", "firmware", "read", "thermistor"],
    answer:
      "Temperature sensors may be analog, digital or protocol-based. Firmware converts the sensor output to temperature using the device characteristics or library. Calibration and filtering may improve accuracy.",
  },
  {
    id: "firmware-humidity",
    category: "firmware",
    question: "How do I read humidity in firmware?",
    variations: [
      "Humidity sensor code",
      "DHT firmware",
      "SHT31 firmware",
      "Read humidity embedded",
    ],
    keywords: ["humidity", "sensor", "firmware", "read", "dht"],
    answer:
      "Humidity sensors are typically digital and communicate over I2C, SPI or a proprietary protocol. Firmware reads the raw value, applies conversion and may compensate for temperature.",
  },
  {
    id: "firmware-pressure",
    category: "firmware",
    question: "How do I read pressure in firmware?",
    variations: [
      "Pressure sensor code",
      "BMP280 firmware",
      "Read barometric pressure",
      "Pressure sensor embedded",
    ],
    keywords: ["pressure", "sensor", "firmware", "read", "bmp"],
    answer:
      "Pressure sensors may be analog or digital. Firmware reads the sensor and applies calibration coefficients and possibly temperature compensation to calculate pressure.",
  },
  {
    id: "firmware-imu",
    category: "firmware",
    question: "How do I read an IMU in firmware?",
    variations: [
      "IMU firmware",
      "MPU6050 code",
      "Read accelerometer gyro",
      "IMU sensor embedded",
    ],
    keywords: ["imu", "firmware", "accelerometer", "gyro", "mpu"],
    answer:
      "An IMU typically contains accelerometer and gyroscope sensors, often with a magnetometer. Firmware configures the device, reads raw data, applies calibration and may fuse the data for orientation.",
  },
  {
    id: "firmware-gps",
    category: "firmware",
    question: "How do I read GPS data in firmware?",
    variations: [
      "GPS firmware",
      "NMEA parsing code",
      "Read GPS module",
      "GPS position embedded",
    ],
    keywords: ["gps", "firmware", "nmea", "parse", "position"],
    answer:
      "GPS modules typically output NMEA sentences over UART. Firmware parses the sentences for position, time, speed and other data. Some modules support additional binary protocols.",
  },
  {
    id: "firmware-rfid-firmware",
    category: "firmware",
    question: "How do I read RFID in firmware?",
    variations: [
      "RFID reader firmware",
      "MFRC522 code",
      "Read RFID card",
      "RFID firmware Arduino",
    ],
    keywords: ["rfid", "firmware", "reader", "card", "tag"],
    answer:
      "RFID reader firmware initializes the reader, waits for a tag, reads the identifier or data, and then processes or compares it. The interface and protocol depend on the reader module.",
  },
  {
    id: "firmware-fingerprint",
    category: "firmware",
    question: "How do I use a fingerprint sensor in firmware?",
    variations: [
      "Fingerprint firmware",
      "R307 fingerprint code",
      "Biometric firmware",
      "Fingerprint sensor embedded",
    ],
    keywords: ["fingerprint", "sensor", "firmware", "biometric", "enroll"],
    answer:
      "Fingerprint sensor firmware typically handles enrollment, storage and matching through the sensor's protocol. The firmware sends commands and processes responses for identification or verification.",
  },
  {
    id: "firmware-keypad-lock",
    category: "firmware",
    question: "How do I make a keypad lock in firmware?",
    variations: [
      "Keypad lock code",
      "Password lock Arduino",
      "Keypad access firmware",
      "PIN entry firmware",
    ],
    keywords: ["keypad", "lock", "firmware", "password", "access"],
    answer:
      "Keypad lock firmware reads key presses, builds an entered code, compares it to the stored code and controls a lock or output. Debouncing, code storage and lockout behavior should be considered.",
  },
  {
    id: "firmware-door-lock",
    category: "firmware",
    question: "How do I control a door lock in firmware?",
    variations: [
      "Door lock firmware",
      "Electronic lock code",
      "Access control firmware",
      "Lock actuator control",
    ],
    keywords: ["door", "lock", "firmware", "access", "control"],
    answer:
      "Door lock firmware verifies an access credential, then drives an actuator such as a servo, relay or electronic lock for a controlled period. Fail-safe or fail-secure behavior and power backup should be considered.",
  },
  {
    id: "firmware-alarm",
    category: "firmware",
    question: "How do I build an alarm system in firmware?",
    variations: [
      "Alarm firmware",
      "Security system code",
      "Motion alarm embedded",
      "Buzzer alarm firmware",
    ],
    keywords: ["alarm", "firmware", "security", "sensor", "buzzer"],
    answer:
      "Alarm firmware monitors sensors, applies arming and disarming logic, and activates outputs such as buzzers, lights or notifications when conditions are met. Zones, delays and fault handling are common features.",
  },
  {
    id: "firmware-data-logger",
    category: "firmware",
    question: "How do I build a data logger in firmware?",
    variations: [
      "Data logger firmware",
      "Log sensor data to SD",
      "Data logging embedded",
      "Record data microcontroller",
    ],
    keywords: ["data", "logger", "firmware", "sd", "log"],
    answer:
      "Data logger firmware reads sensors at intervals, formats the data, and stores it to SD card, EEPROM, flash or a network service. Timestamps, file management and power loss handling should be considered.",
  },
  {
    id: "firmware-dashboard",
    category: "firmware",
    question: "How do I send data to a dashboard?",
    variations: [
      "Dashboard firmware",
      "Send sensor data to web",
      "IoT dashboard code",
      "ThingSpeak firmware",
    ],
    keywords: ["dashboard", "firmware", "data", "web", "iot"],
    answer:
      "Firmware can send data to a dashboard using HTTP, MQTT, WebSocket or a platform-specific API. The data format and update rate should match the dashboard requirements.",
  },
  {
    id: "firmware-cloud",
    category: "firmware",
    question: "How do I connect firmware to the cloud?",
    variations: [
      "Cloud firmware",
      "IoT cloud connection",
      "AWS IoT firmware",
      "Azure IoT embedded",
    ],
    keywords: ["cloud", "firmware", "iot", "connect", "aws"],
    answer:
      "Cloud connectivity uses a network connection and a protocol such as MQTT or HTTPS, often with authentication and TLS. Cloud platforms provide SDKs, but resource usage and security must be considered.",
  },
  {
    id: "firmware-ota-update",
    category: "firmware",
    question: "How do I implement OTA updates in firmware?",
    variations: [
      "OTA firmware ESP32",
      "Over the air update code",
      "Remote firmware update",
      "OTA update process",
    ],
    keywords: ["ota", "firmware", "update", "remote", "esp32"],
    answer:
      "OTA firmware downloads or receives a new image, verifies it, writes it to a separate flash area and switches to it on reboot. Rollback, integrity checks and recovery from failed updates should be included.",
  },
  {
    id: "firmware-bootloader-custom",
    category: "firmware",
    question: "How do I write a custom bootloader?",
    variations: [
      "Custom bootloader",
      "Bootloader development",
      "Write bootloader firmware",
      "Bootloader design embedded",
    ],
    keywords: ["bootloader", "custom", "firmware", "development", "boot"],
    answer:
      "A custom bootloader is a small program that initializes the system and can load or update the main application. It requires careful memory layout, jump logic, update protocol and recovery handling.",
  },
  {
    id: "firmware-linker",
    category: "firmware",
    question: "What is a linker script?",
    variations: [
      "Linker script embedded",
      "Memory layout firmware",
      "Linker file microcontroller",
      "Section placement firmware",
    ],
    keywords: ["linker", "script", "firmware", "memory", "layout"],
    answer:
      "A linker script defines how sections of code and data are placed in memory. It controls flash, RAM, stack and heap locations, and is important for custom memory layouts or bootloaders.",
  },
  {
    id: "firmware-startup",
    category: "firmware",
    question: "What is startup code in firmware?",
    variations: [
      "Startup file embedded",
      "Reset handler firmware",
      "Startup code microcontroller",
      "C runtime startup",
    ],
    keywords: ["startup", "code", "firmware", "reset", "handler"],
    answer:
      "Startup code runs before main(), initializes the stack and data sections, configures basic hardware and calls the C runtime initialization and main function.",
  },
  {
    id: "firmware-vector-table",
    category: "firmware",
    question: "What is a vector table?",
    variations: [
      "Interrupt vector table",
      "Vector table embedded",
      "Reset vector firmware",
      "Interrupt vectors microcontroller",
    ],
    keywords: ["vector", "table", "firmware", "interrupt", "reset"],
    answer:
      "The vector table contains addresses of exception and interrupt handlers. The processor uses it to find the correct handler when an event occurs. Its location and layout are defined by the architecture.",
  },
  {
    id: "firmware-memory-map",
    category: "firmware",
    question: "What is a memory map in firmware?",
    variations: [
      "Memory map embedded",
      "Flash RAM layout firmware",
      "Peripheral memory map",
      "Memory regions microcontroller",
    ],
    keywords: ["memory", "map", "firmware", "flash", "ram"],
    answer:
      "A memory map describes the address ranges for flash, RAM, peripherals and other regions in the microcontroller. Understanding it is important for low-level programming and debugging.",
  },
  {
    id: "firmware-pullup-internal",
    category: "firmware",
    question: "How do I enable internal pull-up resistors?",
    variations: [
      "Internal pullup Arduino",
      "Enable pullup firmware",
      "INPUT_PULLUP",
      "GPIO pullup microcontroller",
    ],
    keywords: ["pullup", "internal", "gpio", "firmware", "input"],
    answer:
      "Many microcontrollers provide internal pull-up resistors that can be enabled in firmware when configuring a GPIO input. This can simplify button and switch circuits, though external pull-ups may be preferred in noisy environments.",
  },
  {
    id: "firmware-open-drain",
    category: "firmware",
    question: "What is open-drain output?",
    variations: [
      "Open drain GPIO",
      "Open collector firmware",
      "Why use open drain",
      "Open drain I2C",
    ],
    keywords: ["open", "drain", "gpio", "firmware", "output"],
    answer:
      "An open-drain output can pull a line low but cannot drive it high; an external pull-up provides the high level. Open-drain is used for shared buses like I2C and for level shifting.",
  },
  {
    id: "firmware-tristate",
    category: "firmware",
    question: "What is tri-state in firmware?",
    variations: [
      "Tri state GPIO",
      "High impedance firmware",
      "Floating output",
      "Tri-state buffer",
    ],
    keywords: ["tri", "state", "gpio", "firmware", "impedance"],
    answer:
      "A tri-state output can be driven high, driven low or placed in a high-impedance state. High impedance effectively disconnects the output, allowing shared lines or external signals to control the node.",
  },
  {
    id: "firmware-hysteresis",
    category: "firmware",
    question: "How do I implement hysteresis in firmware?",
    variations: [
      "Software hysteresis",
      "Debounce hysteresis",
      "Threshold hysteresis firmware",
      "Avoid toggling around threshold",
    ],
    keywords: ["hysteresis", "firmware", "threshold", "debounce", "toggle"],
    answer:
      "Firmware hysteresis uses separate thresholds for turning on and off, preventing rapid toggling when a signal is near a single threshold. It is useful for sensor comparisons and control decisions.",
  },
  {
    id: "firmware-moving-average",
    category: "firmware",
    question: "How do I implement a moving average?",
    variations: [
      "Moving average code",
      "Average sensor readings",
      "Rolling average firmware",
      "Smooth data embedded",
    ],
    keywords: ["moving", "average", "firmware", "filter", "smooth"],
    answer:
      "A moving average keeps a window of recent samples and averages them. It can be implemented with a circular buffer and running sum. Window size affects smoothness and response time.",
  },
  {
    id: "firmware-median",
    category: "firmware",
    question: "How do I implement a median filter?",
    variations: [
      "Median filter code",
      "Remove spikes sensor",
      "Median vs average firmware",
      "Filter noisy sensor",
    ],
    keywords: ["median", "filter", "firmware", "sensor", "noise"],
    answer:
      "A median filter sorts a window of samples and selects the middle value. It is effective at removing spikes while preserving edges better than averaging, but requires more processing.",
  },
  {
    id: "firmware-deadband",
    category: "firmware",
    question: "What is a deadband in firmware?",
    variations: [
      "Deadband control",
      "Hysteresis deadband",
      "Ignore small changes",
      "Deadband firmware",
    ],
    keywords: ["deadband", "firmware", "control", "threshold", "change"],
    answer:
      "A deadband ignores small changes around a setpoint, reducing unnecessary output adjustments. It is used in control, sensor processing and user input to prevent jitter or excessive switching.",
  },
  {
    id: "firmware-ramp",
    category: "firmware",
    question: "How do I ramp an output in firmware?",
    variations: [
      "Ramp output firmware",
      "Soft start code",
      "Slew rate limit firmware",
      "Gradual change output",
    ],
    keywords: ["ramp", "firmware", "output", "soft", "start"],
    answer:
      "Firmware can gradually change an output over time by incrementing or decrementing toward a target at a controlled rate. This reduces stress on loads and can improve control behavior.",
  },
  {
    id: "firmware-slew",
    category: "firmware",
    question: "How do I limit slew rate in firmware?",
    variations: [
      "Slew rate limit code",
      "Limit output change speed",
      "Ramp PWM firmware",
      "Soft start motor",
    ],
    keywords: ["slew", "rate", "firmware", "limit", "output"],
    answer:
      "Slew rate limiting restricts how quickly an output can change. In firmware, this can be done by updating the output in small steps at a defined rate, protecting mechanical or electrical loads.",
  },
  {
    id: "firmware-open-loop",
    category: "firmware",
    question: "What is open-loop control in firmware?",
    variations: [
      "Open loop firmware",
      "Open vs closed loop",
      "Control without feedback",
      "Open loop motor control",
    ],
    keywords: ["open", "loop", "firmware", "control", "feedback"],
    answer:
      "Open-loop control applies an output without measuring the result. It is simpler but cannot correct for disturbances or component variation. It is suitable when the relationship between input and output is predictable.",
  },
  {
    id: "firmware-closed-loop",
    category: "firmware",
    question: "What is closed-loop control in firmware?",
    variations: [
      "Closed loop firmware",
      "Feedback control code",
      "Closed loop vs open loop",
      "Control with sensor feedback",
    ],
    keywords: ["closed", "loop", "firmware", "feedback", "control"],
    answer:
      "Closed-loop control measures the output and adjusts the input to reduce error. It is more accurate and robust than open-loop control but requires a sensor and a stable control algorithm.",
  },
  {
    id: "firmware-onoff",
    category: "firmware",
    question: "How do I implement on/off control?",
    variations: [
      "Bang bang control",
      "On off controller firmware",
      "Thermostat firmware",
      "Simple control loop",
    ],
    keywords: ["on", "off", "control", "firmware", "thermostat"],
    answer:
      "On/off control turns an output fully on or off based on a threshold, often with hysteresis to prevent rapid switching. It is simple and common for heaters, coolers and alarms.",
  },
  {
    id: "firmware-time-proportional",
    category: "firmware",
    question: "What is time-proportional control?",
    variations: [
      "Time proportional firmware",
      "PWM control heater",
      "Slow PWM control",
      "Time based output",
    ],
    keywords: ["time", "proportional", "firmware", "control", "pwm"],
    answer:
      "Time-proportional control varies the on/off duty cycle over a longer period to approximate analog control. It is useful for slow systems such as heaters where fast PWM is not appropriate.",
  },
  {
    id: "firmware-soft-start",
    category: "firmware",
    question: "How do I implement a soft start?",
    variations: [
      "Soft start firmware",
      "Gradual power up",
      "Motor soft start code",
      "Inrush limiting firmware",
    ],
    keywords: ["soft", "start", "firmware", "ramp", "inrush"],
    answer:
      "Soft start gradually increases output over a defined time to reduce inrush current and mechanical stress. Firmware ramps the control signal from a low value to the target.",
  },
  {
    id: "firmware-emergency-stop",
    category: "firmware",
    question: "How should firmware handle an emergency stop?",
    variations: [
      "Emergency stop firmware",
      "E-stop code",
      "Safe shutdown firmware",
      "Stop all outputs",
    ],
    keywords: ["emergency", "stop", "firmware", "safe", "shutdown"],
    answer:
      "Emergency stop firmware should immediately bring outputs to a safe state, ideally with hardware support, and prevent automatic restart until reset. Safety-critical functions should not depend solely on software.",
  },
  {
    id: "firmware-failsafe",
    category: "firmware",
    question: "What is fail-safe behavior in firmware?",
    variations: [
      "Fail safe firmware",
      "Safe state on fault",
      "What happens on error",
      "Fail secure vs fail safe",
    ],
    keywords: ["fail", "safe", "firmware", "fault", "state"],
    answer:
      "Fail-safe behavior ensures that a fault leads to a safe state. What is safe depends on the application, such as stopping a motor, opening a valve or maintaining a lock position. Hardware and software should be designed together.",
  },
  {
    id: "firmware-redundancy",
    category: "firmware",
    question: "What is redundancy in firmware?",
    variations: [
      "Redundant firmware",
      "Fault tolerant embedded",
      "Backup controller",
      "Redundancy in control systems",
    ],
    keywords: ["redundancy", "firmware", "fault", "tolerant", "backup"],
    answer:
      "Redundancy uses duplicate components, channels or computations to maintain operation despite a failure. It can improve reliability but adds cost and complexity. The appropriate level depends on the application.",
  },
  {
    id: "firmware-watchdog-hardware",
    category: "firmware",
    question: "What is an external watchdog?",
    variations: [
      "External watchdog timer",
      "Hardware watchdog",
      "Watchdog IC firmware",
      "Why use external watchdog",
    ],
    keywords: ["watchdog", "external", "hardware", "firmware", "reset"],
    answer:
      "An external watchdog is a separate IC that resets the microcontroller if it is not serviced. It can be more reliable than an internal watchdog in systems where the microcontroller itself may fail.",
  },
  {
    id: "firmware-brownout-detection",
    category: "firmware",
    question: "How do I use brownout detection?",
    variations: [
      "Brownout detection firmware",
      "BOD microcontroller",
      "Low voltage reset",
      "Prevent operation at low voltage",
    ],
    keywords: ["brownout", "detection", "firmware", "voltage", "reset"],
    answer:
      "Brownout detection holds the microcontroller in reset when the supply voltage is below a safe threshold. Firmware can check the reset cause and should handle unexpected resets gracefully.",
  },
  {
    id: "firmware-power-loss",
    category: "firmware",
    question: "How do I handle power loss in firmware?",
    variations: [
      "Power loss firmware",
      "Unexpected shutdown embedded",
      "Save data before power loss",
      "Power fail detection",
    ],
    keywords: ["power", "loss", "firmware", "save", "shutdown"],
    answer:
      "Power loss handling can use early detection, non-volatile storage and safe shutdown procedures. Critical data should be written in a way that tolerates interruption, and the system should recover cleanly when power returns.",
  },
  {
    id: "firmware-startup-self-test",
    category: "firmware",
    question: "What is a startup self-test?",
    variations: [
      "Self test firmware",
      "POST embedded",
      "Startup diagnostics",
      "Check hardware at boot",
    ],
    keywords: ["self", "test", "firmware", "startup", "diagnostics"],
    answer:
      "A startup self-test checks key hardware such as memory, sensors, communication and outputs before normal operation. It can detect faults early and allow the system to enter a safe state or report a problem.",
  },
  {
    id: "firmware-field-test",
    category: "firmware",
    question: "How should firmware be tested in the field?",
    variations: [
      "Field testing firmware",
      "Real world testing embedded",
      "Long term firmware testing",
      "Environmental testing",
    ],
    keywords: ["field", "test", "firmware", "real", "world"],
    answer:
      "Field testing evaluates the system under real operating conditions, including temperature, power variation, noise, user behavior and long-duration operation. It often reveals issues not seen on the bench.",
  },
  {
    id: "firmware-diagnostics",
    category: "firmware",
    question: "How do I add diagnostics to firmware?",
    variations: [
      "Diagnostics firmware",
      "Health monitoring embedded",
      "Fault reporting firmware",
      "System diagnostics",
    ],
    keywords: ["diagnostics", "firmware", "health", "fault", "reporting"],
    answer:
      "Diagnostics can include status registers, error counters, self-tests, logging and communication of health information. They help with maintenance, debugging and early fault detection.",
  },
  {
    id: "firmware-maintenance",
    category: "firmware",
    question: "How do I plan firmware maintenance?",
    variations: [
      "Firmware maintenance",
      "Updating deployed firmware",
      "Long term firmware support",
      "Manage firmware lifecycle",
    ],
    keywords: ["maintenance", "firmware", "update", "support", "lifecycle"],
    answer:
      "Maintenance planning includes version control, documentation, update mechanisms, compatibility and a way to reproduce builds. It helps ensure the firmware remains supportable over time.",
  },
  {
    id: "firmware-documentation-code",
    category: "firmware",
    question: "How should firmware code be documented?",
    variations: [
      "Document firmware code",
      "Code comments embedded",
      "Firmware documentation best practices",
      "Document embedded software",
    ],
    keywords: ["documentation", "code", "firmware", "comments", "best"],
    answer:
      "Documentation should explain why code is structured as it is, interfaces, assumptions, timing requirements and hardware dependencies. Clear comments and external documents help others maintain and extend the firmware.",
  },
  {
    id: "firmware-code-standard",
    category: "firmware",
    question: "What coding standard should firmware follow?",
    variations: [
      "Embedded coding standard",
      "MISRA firmware",
      "C coding standard embedded",
      "Firmware style guide",
    ],
    keywords: ["coding", "standard", "firmware", "misra", "style"],
    answer:
      "Common standards include MISRA C for safety-related systems and internal style guides for consistency. The appropriate standard depends on the project requirements, team and industry.",
  },
  {
    id: "firmware-misra",
    category: "firmware",
    question: "What is MISRA C?",
    variations: [
      "MISRA firmware",
      "MISRA C rules",
      "Why use MISRA",
      "Automotive coding standard",
    ],
    keywords: ["misra", "c", "firmware", "standard", "automotive"],
    answer:
      "MISRA C is a set of coding guidelines for C in critical systems, originally from the automotive industry. It aims to improve safety, security and reliability by restricting certain language features.",
  },
  {
    id: "firmware-unit-test-framework",
    category: "firmware",
    question: "What unit test framework can be used for firmware?",
    variations: [
      "Unity test framework embedded",
      "Ceedling firmware",
      "Embedded unit testing",
      "Test firmware functions",
    ],
    keywords: ["unit", "test", "framework", "firmware", "unity"],
    answer:
      "Frameworks such as Unity, Ceedling, GoogleTest and custom harnesses can be adapted for embedded development. Testing is often performed on a host with hardware dependencies mocked, plus hardware-in-the-loop for integration.",
  },
  {
    id: "firmware-continuous-integration",
    category: "firmware",
    question: "Can continuous integration be used for firmware?",
    variations: [
      "CI firmware",
      "Automated firmware builds",
      "Firmware pipeline",
      "Continuous integration embedded",
    ],
    keywords: ["continuous", "integration", "firmware", "build", "automation"],
    answer:
      "Yes. Continuous integration can automate builds, static analysis and unit tests for firmware. Hardware testing may require dedicated test rigs, but many issues can be caught before deployment.",
  },
  {
    id: "firmware-rtos-selection",
    category: "firmware",
    question: "How do I choose an RTOS?",
    variations: [
      "Which RTOS to use",
      "FreeRTOS vs Zephyr",
      "RTOS selection embedded",
      "Best RTOS firmware",
    ],
    keywords: ["rtos", "choose", "freertos", "zephyr", "firmware"],
    answer:
      "RTOS selection depends on hardware support, licensing, features, memory footprint, toolchain, community and certification needs. Popular options include FreeRTOS, Zephyr, ThreadX and others.",
  },
  {
    id: "firmware-zephyr",
    category: "firmware",
    question: "What is Zephyr?",
    variations: [
      "Zephyr RTOS",
      "Zephyr firmware",
      "Zephyr vs FreeRTOS",
      "Zephyr embedded",
    ],
    keywords: ["zephyr", "rtos", "firmware", "embedded", "framework"],
    answer:
      "Zephyr is an open-source real-time operating system designed for connected, resource-constrained devices. It includes a kernel, drivers, communication stacks and build system.",
  },
  {
    id: "firmware-freertos",
    category: "firmware",
    question: "What is FreeRTOS?",
    variations: [
      "FreeRTOS firmware",
      "FreeRTOS tasks",
      "How to use FreeRTOS",
      "FreeRTOS vs bare metal",
    ],
    keywords: ["freertos", "rtos", "firmware", "task", "embedded"],
    answer:
      "FreeRTOS is a popular real-time operating system kernel for embedded systems. It provides tasks, queues, semaphores, timers and other features for building multi-tasking firmware.",
  },
  {
    id: "firmware-threadx",
    category: "firmware",
    question: "What is ThreadX?",
    variations: [
      "ThreadX RTOS",
      "Azure RTOS",
      "ThreadX firmware",
      "ThreadX vs FreeRTOS",
    ],
    keywords: ["threadx", "rtos", "firmware", "azure", "embedded"],
    answer:
      "ThreadX is a real-time operating system, now part of Azure RTOS, known for its small footprint and reliability. It is used in many commercial embedded products.",
  },
  {
    id: "firmware-embedded-linux",
    category: "firmware",
    question: "When should I use embedded Linux instead of a microcontroller?",
    variations: [
      "Embedded Linux vs microcontroller",
      "Linux on embedded",
      "When to use Raspberry Pi",
      "Microcontroller vs Linux board",
    ],
    keywords: ["embedded", "linux", "microcontroller", "raspberry", "firmware"],
    answer:
      "Embedded Linux is suitable when the application needs a full operating system, networking, file system, user interface or more processing power. Microcontrollers are often better for deterministic timing, low power and simple dedicated tasks.",
  },
  {
    id: "firmware-rtos-vs-linux",
    category: "firmware",
    question: "What is the difference between an RTOS and embedded Linux?",
    variations: [
      "RTOS vs Linux",
      "Embedded Linux vs RTOS",
      "Which is better RTOS or Linux",
      "Real time Linux vs RTOS",
    ],
    keywords: ["rtos", "linux", "embedded", "real", "time"],
    answer:
      "An RTOS is designed for deterministic timing and small footprints. Embedded Linux provides a full operating system and richer features but typically has higher resource requirements and less deterministic timing unless real-time patches are used.",
  },
  {
    id: "firmware-yocto",
    category: "firmware",
    question: "What is Yocto?",
    variations: [
      "Yocto Project embedded",
      "Build Linux embedded",
      "Yocto firmware",
      "Custom Linux image",
    ],
    keywords: ["yocto", "linux", "embedded", "build", "firmware"],
    answer:
      "Yocto is a framework for building custom Linux distributions for embedded systems. It provides tools and metadata for creating images tailored to specific hardware and applications.",
  },
  {
    id: "firmware-buildroot",
    category: "firmware",
    question: "What is Buildroot?",
    variations: [
      "Buildroot embedded Linux",
      "Buildroot vs Yocto",
      "Buildroot firmware",
      "Custom embedded Linux",
    ],
    keywords: ["buildroot", "linux", "embedded", "build", "firmware"],
    answer:
      "Buildroot is a tool that simplifies building embedded Linux systems by generating a cross-compilation toolchain, bootloader, kernel and root filesystem.",
  },
  {
    id: "firmware-uboot",
    category: "firmware",
    question: "What is U-Boot?",
    variations: [
      "U-Boot bootloader",
      "Das U-Boot embedded",
      "U-Boot firmware",
      "Bootloader Linux embedded",
    ],
    keywords: ["uboot", "bootloader", "embedded", "linux", "firmware"],
    answer:
      "U-Boot is a widely used bootloader for embedded Linux systems. It initializes hardware, loads the kernel and can support update and recovery mechanisms.",
  },
  {
    id: "firmware-device-tree",
    category: "firmware",
    question: "What is a device tree?",
    variations: [
      "Device tree embedded",
      "Linux device tree",
      "Device tree compiler",
      "Hardware description firmware",
    ],
    keywords: ["device", "tree", "linux", "hardware", "firmware"],
    answer:
      "A device tree describes hardware to the Linux kernel, including memory, peripherals and configuration. It allows the same kernel to support different hardware configurations.",
  },
  {
    id: "firmware-kernel",
    category: "firmware",
    question: "What is a kernel?",
    variations: [
      "What does a kernel do",
      "Linux kernel embedded",
      "RTOS kernel",
      "Operating system kernel",
    ],
    keywords: ["kernel", "firmware", "operating", "system", "linux"],
    answer:
      "A kernel is the core of an operating system. It manages tasks, memory, hardware resources and communication. In embedded systems, kernels range from small RTOS kernels to full Linux kernels.",
  },
  {
    id: "firmware-driver",
    category: "firmware",
    question: "What is a driver in firmware?",
    variations: [
      "Driver embedded",
      "Hardware driver firmware",
      "What does a driver do",
      "Device driver microcontroller",
    ],
    keywords: ["driver", "firmware", "hardware", "device", "interface"],
    answer:
      "A driver is software that controls a specific hardware peripheral or device, providing a consistent interface to the rest of the system. It handles initialization, configuration and data transfer.",
  },
  {
    id: "firmware-bsp",
    category: "firmware",
    question: "What is a board support package?",
    variations: [
      "BSP embedded",
      "What is BSP",
      "Board support package firmware",
      "BSP vs HAL",
    ],
    keywords: ["bsp", "board", "support", "package", "firmware"],
    answer:
      "A Board Support Package provides the low-level software needed to run an operating system or framework on a specific board, including drivers, initialization and configuration.",
  },
  {
    id: "firmware-middleware",
    category: "firmware",
    question: "What is middleware in embedded systems?",
    variations: [
      "Middleware firmware",
      "What is middleware embedded",
      "Middleware vs driver",
      "Embedded software layers",
    ],
    keywords: ["middleware", "embedded", "firmware", "layer", "software"],
    answer:
      "Middleware provides services and abstractions between the application and lower-level drivers or the operating system. Examples include communication stacks, file systems and graphics libraries.",
  },
  {
    id: "firmware-application",
    category: "firmware",
    question: "What is application code in firmware?",
    variations: [
      "Application layer firmware",
      "What is application code",
      "Firmware application logic",
      "Top level embedded code",
    ],
    keywords: ["application", "code", "firmware", "logic", "layer"],
    answer:
      "Application code implements the specific behavior of the product, using services from lower layers. It coordinates sensors, outputs, communication and control logic according to the requirements.",
  },
  {
    id: "firmware-framework",
    category: "firmware",
    question: "What is an embedded framework?",
    variations: [
      "Embedded framework",
      "Arduino framework",
      "ESP-IDF framework",
      "Firmware framework",
    ],
    keywords: ["framework", "embedded", "firmware", "arduino", "esp-idf"],
    answer:
      "An embedded framework provides libraries, drivers and conventions that simplify development for a platform. Examples include Arduino, ESP-IDF, STM32Cube and Zephyr.",
  },
  {
    id: "firmware-esp-idf",
    category: "firmware",
    question: "What is ESP-IDF?",
    variations: [
      "ESP-IDF firmware",
      "ESP32 IDF",
      "ESP-IDF vs Arduino",
      "ESP-IDF development",
    ],
    keywords: ["esp-idf", "esp32", "firmware", "framework", "development"],
    answer:
      "ESP-IDF is Espressif's official development framework for ESP32 and related chips. It provides drivers, libraries, build tools and support for advanced features.",
  },
  {
    id: "firmware-stm32cube",
    category: "firmware",
    question: "What is STM32Cube?",
    variations: [
      "STM32Cube firmware",
      "STM32CubeMX",
      "STM32 HAL",
      "STM32 development",
    ],
    keywords: ["stm32", "cube", "firmware", "hal", "development"],
    answer:
      "STM32Cube is STMicroelectronics' ecosystem for STM32 development, including configuration tools, HAL libraries, middleware and examples.",
  },
  {
    id: "firmware-arduino-framework",
    category: "firmware",
    question: "What is the Arduino framework?",
    variations: [
      "Arduino programming framework",
      "How Arduino works",
      "Arduino core",
      "Arduino vs bare metal",
    ],
    keywords: ["arduino", "framework", "firmware", "core", "development"],
    answer:
      "The Arduino framework provides a simplified programming model, core libraries and board support for many microcontrollers. It is convenient for rapid development but may add overhead compared to bare-metal programming.",
  },
  {
    id: "firmware-mbed",
    category: "firmware",
    question: "What is Mbed?",
    variations: [
      "Mbed OS",
      "ARM Mbed firmware",
      "Mbed development",
      "Mbed vs Arduino",
    ],
    keywords: ["mbed", "arm", "firmware", "framework", "embedded"],
    answer:
      "Mbed is an open-source embedded development platform from ARM, providing an RTOS, drivers and cloud connectivity for compatible microcontrollers.",
  },
  {
    id: "firmware-platformio",
    category: "firmware",
    question: "What is PlatformIO?",
    variations: [
      "PlatformIO firmware",
      "PlatformIO vs Arduino IDE",
      "PlatformIO development",
      "Build firmware PlatformIO",
    ],
    keywords: ["platformio", "firmware", "development", "build", "ide"],
    answer:
      "PlatformIO is a cross-platform build system and development environment for embedded projects. It supports many frameworks and boards, with dependency management and testing features.",
  },
  {
    id: "firmware-cmake",
    category: "firmware",
    question: "How is CMake used in firmware?",
    variations: [
      "CMake embedded",
      "CMake firmware build",
      "Build system embedded",
      "CMake vs Makefile firmware",
    ],
    keywords: ["cmake", "firmware", "build", "system", "makefile"],
    answer:
      "CMake can manage the build process for embedded projects, generating build files for different toolchains and configurations. It is common in larger or cross-platform firmware projects.",
  },
  {
    id: "firmware-makefile",
    category: "firmware",
    question: "What is a Makefile in firmware?",
    variations: [
      "Makefile embedded",
      "How to write Makefile firmware",
      "Build firmware make",
      "Makefile vs IDE",
    ],
    keywords: ["makefile", "firmware", "build", "make", "embedded"],
    answer:
      "A Makefile defines how source files are compiled, linked and converted into firmware images. It provides control over compiler flags, dependencies and build steps.",
  },
  {
    id: "firmware-toolchain",
    category: "firmware",
    question: "What is a cross-compiler toolchain?",
    variations: [
      "Cross compiler embedded",
      "ARM GCC toolchain",
      "Toolchain firmware",
      "Compile for microcontroller",
    ],
    keywords: ["toolchain", "cross", "compiler", "firmware", "embedded"],
    answer:
      "A cross-compiler toolchain runs on a host computer but produces code for a different target processor. It includes the compiler, linker, debugger and related tools for embedded development.",
  },
  {
    id: "firmware-gcc",
    category: "firmware",
    question: "Can GCC be used for firmware?",
    variations: [
      "GCC embedded",
      "arm-none-eabi-gcc",
      "GCC firmware",
      "Compiler for microcontroller",
    ],
    keywords: ["gcc", "firmware", "compiler", "embedded", "arm"],
    answer:
      "Yes. GCC is widely used for embedded development, with variants such as arm-none-eabi-gcc for ARM microcontrollers. It supports optimization, debugging and many target architectures.",
  },
  {
    id: "firmware-clang",
    category: "firmware",
    question: "Can Clang be used for firmware?",
    variations: [
      "Clang embedded",
      "LLVM firmware",
      "Clang vs GCC embedded",
      "Compiler firmware",
    ],
    keywords: ["clang", "llvm", "firmware", "embedded", "compiler"],
    answer:
      "Yes. Clang/LLVM can be used for embedded development and supports many target architectures. Toolchain and support vary by platform, so availability should be checked for the specific device.",
  },
  {
    id: "firmware-optimization-level",
    category: "firmware",
    question: "What optimization level should firmware use?",
    variations: [
      "GCC optimization level embedded",
      "O0 vs O2 firmware",
      "Optimize firmware size speed",
      "Compiler optimization embedded",
    ],
    keywords: [
      "optimization",
      "level",
      "firmware",
      "compiler",
      "size",
      "speed",
    ],
    answer:
      "Optimization level depends on the goal: -O0 for debugging, -Os for size, -O2 or -O3 for speed. Higher optimization can change timing and make debugging harder, so testing is important.",
  },
  {
    id: "firmware-debug-info",
    category: "firmware",
    question: "Why include debug information in firmware builds?",
    variations: [
      "Debug symbols firmware",
      "Why debug info",
      "Compile with debug symbols",
      "Debugging embedded build",
    ],
    keywords: ["debug", "info", "symbols", "firmware", "build"],
    answer:
      "Debug information allows debuggers and tools to map machine code back to source lines and variables. It is useful during development and can be omitted from production builds to save space.",
  },
  {
    id: "firmware-size",
    category: "firmware",
    question: "How do I check firmware size?",
    variations: [
      "Firmware size tool",
      "arm-none-eabi-size",
      "Check flash usage",
      "Firmware memory usage",
    ],
    keywords: ["size", "firmware", "flash", "memory", "check"],
    answer:
      "Tools such as arm-none-eabi-size or map files show the size of code and data sections. This helps verify that the firmware fits in flash and RAM and tracks changes over time.",
  },
  {
    id: "firmware-map-file",
    category: "firmware",
    question: "What is a map file?",
    variations: [
      "Linker map file",
      "Map file firmware",
      "How to read map file",
      "Memory usage map",
    ],
    keywords: ["map", "file", "firmware", "linker", "memory"],
    answer:
      "A map file is generated by the linker and shows how symbols and sections are placed in memory. It is useful for understanding memory usage and resolving linking issues.",
  },
  {
    id: "firmware-hex",
    category: "firmware",
    question: "What is a HEX file?",
    variations: [
      "Intel HEX format",
      "HEX vs BIN firmware",
      "What is .hex file",
      "Firmware file format",
    ],
    keywords: ["hex", "file", "firmware", "format", "binary"],
    answer:
      "A HEX file is a text-based representation of binary firmware, often using the Intel HEX format. It includes address and data records and is commonly used for programming microcontrollers.",
  },
  {
    id: "firmware-bin",
    category: "firmware",
    question: "What is a BIN file?",
    variations: [
      "Binary firmware file",
      "BIN vs HEX",
      "What is .bin file",
      "Firmware binary format",
    ],
    keywords: ["bin", "binary", "firmware", "file", "format"],
    answer:
      "A BIN file is a raw binary image of firmware. It contains the data without address information, so the programming tool must know where to place it in memory.",
  },
  {
    id: "firmware-elf",
    category: "firmware",
    question: "What is an ELF file?",
    variations: [
      "ELF firmware",
      "What is .elf file",
      "ELF vs HEX",
      "Executable firmware format",
    ],
    keywords: ["elf", "firmware", "executable", "format", "debug"],
    answer:
      "An ELF file is an executable and linkable format that contains code, data, symbols and debug information. It is often used as the build output and converted to HEX or BIN for programming.",
  },
  {
    id: "firmware-srec",
    category: "firmware",
    question: "What is an S-record file?",
    variations: [
      "S19 file firmware",
      "Motorola S-record",
      "SREC format",
      "Firmware programming format",
    ],
    keywords: ["srec", "s-record", "s19", "firmware", "format"],
    answer:
      "An S-record is a text-based firmware format with address, data and checksum information. It is used by some programming tools and bootloaders.",
  },
  {
    id: "firmware-programmer",
    category: "firmware",
    question: "What is a programmer for microcontrollers?",
    variations: [
      "Microcontroller programmer",
      "How to program chip",
      "ICSP programmer",
      "SWD programmer",
    ],
    keywords: ["programmer", "firmware", "microcontroller", "icsp", "swd"],
    answer:
      "A programmer is a hardware tool used to load firmware into a microcontroller. Common interfaces include ICSP, JTAG, SWD and bootloader-based programming.",
  },
  {
    id: "firmware-jtag",
    category: "firmware",
    question: "What is JTAG?",
    variations: [
      "JTAG debugging",
      "JTAG interface firmware",
      "How to use JTAG",
      "JTAG vs SWD",
    ],
    keywords: ["jtag", "debug", "firmware", "interface", "programming"],
    answer:
      "JTAG is a standard interface for programming and debugging microcontrollers and other devices. It provides access to the processor for testing, breakpoints and memory inspection.",
  },
  {
    id: "firmware-swd",
    category: "firmware",
    question: "What is SWD?",
    variations: [
      "SWD debugging",
      "Serial wire debug",
      "SWD vs JTAG",
      "ARM SWD interface",
    ],
    keywords: ["swd", "debug", "arm", "firmware", "interface"],
    answer:
      "SWD, or Serial Wire Debug, is a two-wire debug interface for ARM Cortex devices. It provides similar debugging capability to JTAG with fewer pins.",
  },
  {
    id: "firmware-icsp",
    category: "firmware",
    question: "What is ICSP?",
    variations: [
      "ICSP programming",
      "In circuit serial programming",
      "ICSP header",
      "Program chip in circuit",
    ],
    keywords: ["icsp", "programming", "firmware", "circuit", "header"],
    answer:
      "ICSP, or In-Circuit Serial Programming, allows a microcontroller to be programmed while installed in the circuit. It typically uses a small header and a compatible programmer.",
  },
  {
    id: "firmware-boot-mode",
    category: "firmware",
    question: "What is boot mode in a microcontroller?",
    variations: [
      "Boot mode ESP32",
      "STM32 boot pins",
      "How to enter bootloader",
      "Programming mode",
    ],
    keywords: ["boot", "mode", "firmware", "programming", "pins"],
    answer:
      "Boot mode determines how the microcontroller starts, such as running flash firmware, entering a bootloader or using a ROM loader. The mode is set by pins, fuses or configuration.",
  },
  {
    id: "firmware-fuse",
    category: "firmware",
    question: "What are fuse bits?",
    variations: [
      "Fuse bits AVR",
      "Microcontroller fuses",
      "What are fuses firmware",
      "Configure fuse bits",
    ],
    keywords: ["fuse", "bits", "firmware", "microcontroller", "configuration"],
    answer:
      "Fuse bits configure hardware options such as clock source, boot size and reset behavior on some microcontrollers. Incorrect fuse settings can prevent programming or cause incorrect operation.",
  },
  {
    id: "firmware-lock",
    category: "firmware",
    question: "What is firmware lock?",
    variations: [
      "Lock bits microcontroller",
      "Protect firmware read",
      "Secure lock bits",
      "Prevent firmware copying",
    ],
    keywords: ["lock", "bits", "firmware", "protection", "security"],
    answer:
      "Lock bits prevent reading or modifying firmware in the microcontroller. They are used to protect intellectual property but do not provide strong security against all attacks.",
  },
  {
    id: "firmware-signature",
    category: "firmware",
    question: "What is a device signature?",
    variations: [
      "Microcontroller signature",
      "Device ID embedded",
      "Chip signature",
      "Read device signature",
    ],
    keywords: ["signature", "device", "firmware", "id", "microcontroller"],
    answer:
      "A device signature is a value that identifies the microcontroller type or revision. Programmers and bootloaders may check it to ensure compatibility.",
  },
  {
    id: "firmware-calibration-constant",
    category: "firmware",
    question: "What are calibration constants in firmware?",
    variations: [
      "Calibration data firmware",
      "Factory calibration embedded",
      "Store calibration values",
      "Use calibration constants",
    ],
    keywords: ["calibration", "constants", "firmware", "data", "factory"],
    answer:
      "Calibration constants correct for sensor or component variation. They may be stored during manufacturing or computed at runtime. Firmware uses them to improve accuracy.",
  },
  {
    id: "firmware-serial-number",
    category: "firmware",
    question: "How do I store a device serial number?",
    variations: [
      "Unique ID firmware",
      "Device serial number embedded",
      "MCU unique ID",
      "Product serial firmware",
    ],
    keywords: ["serial", "number", "firmware", "unique", "id"],
    answer:
      "A serial number can be stored in non-volatile memory, read from a microcontroller unique ID or programmed during manufacturing. It should be protected from modification if required.",
  },
  {
    id: "firmware-config-flags",
    category: "firmware",
    question: "What are configuration flags in firmware?",
    variations: [
      "Config flags embedded",
      "Feature flags firmware",
      "Compile time options",
      "Runtime configuration flags",
    ],
    keywords: ["configuration", "flags", "firmware", "feature", "options"],
    answer:
      "Configuration flags can be compile-time defines or runtime settings that change behavior. They allow the same firmware to support different hardware or features, but should be managed carefully.",
  },
  {
    id: "firmware-version-string",
    category: "firmware",
    question: "How do I include a firmware version?",
    variations: [
      "Firmware version string",
      "Version number embedded",
      "Report firmware version",
      "Build version firmware",
    ],
    keywords: ["version", "string", "firmware", "build", "report"],
    answer:
      "A firmware version string can be compiled in and reported over serial, display or network. It helps identify the running software for support and updates.",
  },
  {
    id: "firmware-build-date",
    category: "firmware",
    question: "Can firmware include build date and time?",
    variations: [
      "Build timestamp firmware",
      "__DATE__ __TIME__",
      "Compile time embedded",
      "Firmware build info",
    ],
    keywords: ["build", "date", "time", "firmware", "timestamp"],
    answer:
      "Yes, firmware can include build date and time using compiler macros or generated files. This information helps identify the build during debugging and support.",
  },
  {
    id: "firmware-asset-tag",
    category: "firmware",
    question: "What is an asset tag in firmware?",
    variations: [
      "Asset tracking firmware",
      "Device identification embedded",
      "Asset tag firmware",
      "Track device identity",
    ],
    keywords: ["asset", "tag", "firmware", "identity", "tracking"],
    answer:
      "An asset tag is an identifier used to track a device through manufacturing, deployment and service. It may be stored in firmware or a separate memory device.",
  },
  {
    id: "firmware-board-id",
    category: "firmware",
    question: "How do I detect the board revision in firmware?",
    variations: [
      "Board revision detection",
      "Hardware version firmware",
      "GPIO board ID",
      "Detect PCB version",
    ],
    keywords: ["board", "revision", "firmware", "detect", "hardware"],
    answer:
      "Board revision can be detected using GPIO strapping, an ID chip, ADC reading or a stored value. Firmware can then adjust configuration or behavior for the specific hardware.",
  },
  {
    id: "firmware-hardware-version",
    category: "firmware",
    question: "How should firmware handle different hardware versions?",
    variations: [
      "Hardware version compatibility",
      "Support multiple board revisions",
      "Firmware for different hardware",
      "Board version handling",
    ],
    keywords: ["hardware", "version", "firmware", "compatibility", "board"],
    answer:
      "Firmware can detect the hardware version and select appropriate drivers, pin mappings or features. Keeping version-specific code isolated improves maintainability.",
  },
  {
    id: "firmware-feature-detect",
    category: "firmware",
    question: "What is feature detection in firmware?",
    variations: [
      "Feature detection embedded",
      "Detect capabilities at runtime",
      "Firmware capability check",
      "Runtime feature detection",
    ],
    keywords: ["feature", "detection", "firmware", "runtime", "capability"],
    answer:
      "Feature detection checks for the presence or capability of hardware or software features at runtime. It allows the same firmware to adapt to different configurations.",
  },
  {
    id: "firmware-pin-mapping",
    category: "firmware",
    question: "How do I manage pin mappings in firmware?",
    variations: [
      "Pin mapping firmware",
      "GPIO configuration embedded",
      "Pin definitions code",
      "Board pin map",
    ],
    keywords: ["pin", "mapping", "firmware", "gpio", "configuration"],
    answer:
      "Pin mappings can be defined in a board-specific header or configuration file. Keeping them separate from application logic makes porting to different hardware easier.",
  },
  {
    id: "firmware-pin-conflict",
    category: "firmware",
    question: "How do I avoid pin conflicts in firmware?",
    variations: [
      "Pin conflict embedded",
      "Two functions same pin",
      "GPIO alternate function",
      "Pin assignment firmware",
    ],
    keywords: ["pin", "conflict", "firmware", "gpio", "alternate"],
    answer:
      "Check the microcontroller datasheet for alternate functions and avoid assigning the same pin to incompatible peripherals. A clear pin map and review help prevent conflicts.",
  },
  {
    id: "firmware-clock-config",
    category: "firmware",
    question: "How do I configure the system clock in firmware?",
    variations: [
      "Clock configuration firmware",
      "Set PLL embedded",
      "System clock source",
      "Configure MCU clock",
    ],
    keywords: ["clock", "configuration", "firmware", "pll", "system"],
    answer:
      "Clock configuration selects the oscillator source, PLL settings and prescalers for the CPU and peripherals. It is often done in startup code or a configuration tool and must respect device limits.",
  },
  {
    id: "firmware-peripheral-init",
    category: "firmware",
    question: "How do I initialize peripherals in firmware?",
    variations: [
      "Peripheral initialization embedded",
      "Configure UART SPI I2C",
      "GPIO initialization firmware",
      "Setup peripherals microcontroller",
    ],
    keywords: [
      "peripheral",
      "initialization",
      "firmware",
      "configure",
      "setup",
    ],
    answer:
      "Peripheral initialization configures pins, clocks, modes, speed and interrupts before use. The required settings depend on the peripheral and the connected device.",
  },
  {
    id: "firmware-deinit",
    category: "firmware",
    question: "What is peripheral de-initialization?",
    variations: [
      "Deinit peripheral firmware",
      "Disable peripheral embedded",
      "Shutdown peripheral code",
      "Reset peripheral configuration",
    ],
    keywords: ["deinit", "peripheral", "firmware", "disable", "shutdown"],
    answer:
      "De-initialization restores a peripheral to a default or low-power state, often to save power or reconfigure it. It may include disabling clocks, interrupts and outputs.",
  },
  {
    id: "firmware-low-power-peripheral",
    category: "firmware",
    question: "How do I disable unused peripherals to save power?",
    variations: [
      "Disable unused peripherals",
      "Save power firmware",
      "Turn off unused hardware",
      "Low power embedded",
    ],
    keywords: ["disable", "unused", "peripherals", "power", "firmware"],
    answer:
      "Unused peripherals can be disabled by turning off their clocks and configuring pins to a low-power state. This reduces power consumption, especially in battery-powered designs.",
  },
  {
    id: "firmware-sleep",
    category: "firmware",
    question: "How do I put a microcontroller to sleep?",
    variations: [
      "Sleep mode firmware",
      "Low power sleep",
      "How to sleep MCU",
      "Wake up on interrupt",
    ],
    keywords: ["sleep", "mode", "firmware", "low", "power", "wake"],
    answer:
      "Sleep mode is entered by configuring wake sources and executing a sleep instruction. The device wakes on an interrupt or event. Firmware should prepare peripherals and save state as needed.",
  },
  {
    id: "firmware-wake-source",
    category: "firmware",
    question: "What wake sources can a microcontroller use?",
    variations: [
      "Wake up sources embedded",
      "Wake on interrupt",
      "RTC wake",
      "GPIO wake firmware",
    ],
    keywords: ["wake", "sources", "firmware", "interrupt", "rtc"],
    answer:
      "Common wake sources include external interrupts, GPIO, RTC alarms, timers, communication activity and comparator events. The available sources depend on the device and sleep mode.",
  },
  {
    id: "firmware-power-profile",
    category: "firmware",
    question: "How do I measure firmware power consumption?",
    variations: [
      "Measure power firmware",
      "Current consumption embedded",
      "Power profiling MCU",
      "How to measure battery drain",
    ],
    keywords: ["power", "measure", "firmware", "current", "profile"],
    answer:
      "Power can be measured with a current meter, power analyzer or dedicated profiling tool. Measuring over realistic operating cycles helps identify where energy is used and how to optimize.",
  },
  {
    id: "firmware-battery-life",
    category: "firmware",
    question: "How do I estimate battery life?",
    variations: [
      "Battery life calculation",
      "How long will battery last",
      "Estimate runtime embedded",
      "Power budget firmware",
    ],
    keywords: ["battery", "life", "estimate", "firmware", "power"],
    answer:
      "Battery life can be estimated from average current consumption and battery capacity, accounting for different operating modes. Real measurements are more accurate than estimates based only on datasheet values.",
  },
  {
    id: "firmware-power-budget",
    category: "firmware",
    question: "What is a power budget?",
    variations: [
      "Power budget embedded",
      "Calculate power requirements",
      "Current budget firmware",
      "Design power consumption",
    ],
    keywords: ["power", "budget", "firmware", "current", "design"],
    answer:
      "A power budget lists the current consumption of each subsystem and operating mode, then sums them for average and peak requirements. It guides battery and supply selection.",
  },
  {
    id: "firmware-peak-current",
    category: "firmware",
    question: "How do I handle peak current in firmware?",
    variations: [
      "Peak current firmware",
      "Inrush current software",
      "Stagger outputs",
      "Power supply current limit",
    ],
    keywords: ["peak", "current", "firmware", "inrush", "supply"],
    answer:
      "Firmware can stagger outputs, ramp loads or avoid turning on multiple high-current devices simultaneously. This reduces peak demand and helps prevent supply voltage drops or resets.",
  },
  {
    id: "firmware-load-shedding",
    category: "firmware",
    question: "What is load shedding in firmware?",
    variations: [
      "Load shedding firmware",
      "Reduce power when limited",
      "Priority power management",
      "Turn off low priority loads",
    ],
    keywords: ["load", "shedding", "firmware", "power", "priority"],
    answer:
      "Load shedding disables lower-priority functions when power or current is limited, helping maintain critical operation. It can be triggered by battery level, supply limits or fault conditions.",
  },
  {
    id: "firmware-brownout-recovery",
    category: "firmware",
    question: "How does firmware recover from a brownout?",
    variations: [
      "Brownout recovery firmware",
      "After low voltage reset",
      "Recover from power dip",
      "Brownout handling",
    ],
    keywords: ["brownout", "recovery", "firmware", "reset", "power"],
    answer:
      "After a brownout reset, firmware should check the reset cause, verify system state and restore safe operation. Persistent data should be validated, and the system may need to wait for stable power.",
  },
  {
    id: "firmware-watchdog-timing",
    category: "firmware",
    question: "How do I choose a watchdog timeout?",
    variations: [
      "Watchdog timeout selection",
      "How long watchdog",
      "Set watchdog period",
      "Watchdog timing firmware",
    ],
    keywords: ["watchdog", "timeout", "firmware", "timing", "period"],
    answer:
      "The watchdog timeout should be longer than the longest normal code path between services but short enough to recover quickly from a fault. It must account for blocking operations and interrupt latency.",
  },
  {
    id: "firmware-watchdog-service",
    category: "firmware",
    question: "Where should I service the watchdog?",
    variations: [
      "Service watchdog firmware",
      "Feed watchdog code",
      "Watchdog reset location",
      "When to kick watchdog",
    ],
    keywords: ["watchdog", "service", "firmware", "feed", "reset"],
    answer:
      "Service the watchdog only when critical tasks are confirmed to be running correctly, not simply from a timer interrupt. This ensures a stuck task cannot keep the watchdog happy.",
  },
  {
    id: "firmware-reset-cause",
    category: "firmware",
    question: "How do I determine the reset cause?",
    variations: [
      "Reset cause firmware",
      "Why did my board reset",
      "Check reset flags",
      "Reset source microcontroller",
    ],
    keywords: ["reset", "cause", "firmware", "flags", "source"],
    answer:
      "Most microcontrollers provide reset status registers that indicate the cause, such as power-on, external reset, watchdog, brownout or software reset. Firmware can read and log these at startup.",
  },
  {
    id: "firmware-safe-state",
    category: "firmware",
    question: "How do I define a safe state in firmware?",
    variations: [
      "Safe state embedded",
      "What is safe state",
      "Define safe outputs",
      "Fault safe state",
    ],
    keywords: ["safe", "state", "firmware", "fault", "outputs"],
    answer:
      "A safe state is a condition where the system poses minimal risk. It depends on the application, such as stopping motion, closing a valve or disabling hazardous outputs. Firmware and hardware should both support it.",
  },
  {
    id: "firmware-recovery",
    category: "firmware",
    question: "How can firmware recover from a fault?",
    variations: [
      "Fault recovery firmware",
      "Recover from error",
      "Restart safe operation",
      "Fault tolerance firmware",
    ],
    keywords: ["recovery", "firmware", "fault", "error", "restart"],
    answer:
      "Recovery can involve resetting the subsystem, reinitializing peripherals, retrying operations or restarting the system. The appropriate response depends on the fault and required availability.",
  },
  {
    id: "firmware-retry",
    category: "firmware",
    question: "How do I implement retry logic in firmware?",
    variations: [
      "Retry code embedded",
      "Retry communication",
      "Backoff firmware",
      "Retry failed operation",
    ],
    keywords: ["retry", "firmware", "communication", "backoff", "error"],
    answer:
      "Retry logic attempts an operation again after a failure, often with a delay or backoff. It should be bounded to avoid infinite loops and should distinguish recoverable from permanent errors.",
  },
  {
    id: "firmware-backoff",
    category: "firmware",
    question: "What is backoff in firmware?",
    variations: [
      "Exponential backoff firmware",
      "Retry delay embedded",
      "Backoff algorithm",
      "WiFi reconnect backoff",
    ],
    keywords: ["backoff", "firmware", "retry", "delay", "reconnect"],
    answer:
      "Backoff increases the delay between retries after repeated failures, reducing network or resource congestion. Exponential backoff with a maximum limit is common.",
  },
  {
    id: "firmware-error-recovery",
    category: "firmware",
    question: "What is error recovery in firmware?",
    variations: [
      "Error recovery embedded",
      "Handle errors firmware",
      "Recover from failure",
      "Fault recovery code",
    ],
    keywords: ["error", "recovery", "firmware", "failure", "handle"],
    answer:
      "Error recovery detects an error and attempts to restore normal operation. It may include retries, fallback modes, subsystem resets or safe shutdown, depending on the severity and criticality.",
  },
  {
    id: "firmware-fallback",
    category: "firmware",
    question: "What is a fallback mode in firmware?",
    variations: [
      "Fallback firmware",
      "Safe fallback mode",
      "Degraded operation",
      "Backup mode embedded",
    ],
    keywords: ["fallback", "firmware", "mode", "safe", "degraded"],
    answer:
      "A fallback mode provides reduced but safe functionality when the primary mode is unavailable. It helps maintain critical operation while a fault is addressed.",
  },
  {
    id: "firmware-degraded",
    category: "firmware",
    question: "What is degraded operation in firmware?",
    variations: [
      "Degraded mode embedded",
      "Limited operation firmware",
      "Partial functionality",
      "Reduced mode control",
    ],
    keywords: ["degraded", "firmware", "operation", "limited", "reduced"],
    answer:
      "Degraded operation continues essential functions with reduced performance or features after a fault or limitation. It is useful when full operation is not possible but complete shutdown is undesirable.",
  },
  {
    id: "firmware-diagnostic-mode",
    category: "firmware",
    question: "What is a diagnostic mode in firmware?",
    variations: [
      "Diagnostic mode embedded",
      "Service mode firmware",
      "Test mode microcontroller",
      "Maintenance mode",
    ],
    keywords: ["diagnostic", "mode", "firmware", "test", "service"],
    answer:
      "A diagnostic mode provides access to tests, status information or configuration for troubleshooting and maintenance. It should be protected from unauthorized access if it exposes sensitive functions.",
  },
  {
    id: "firmware-factory-reset",
    category: "firmware",
    question: "How do I implement a factory reset?",
    variations: [
      "Factory reset firmware",
      "Restore defaults",
      "Reset configuration",
      "Clear settings button",
    ],
    keywords: ["factory", "reset", "firmware", "defaults", "configuration"],
    answer:
      "Factory reset restores configuration to known defaults, often by clearing non-volatile settings or using a dedicated button sequence. The process should be safe and confirm before erasing important data.",
  },
  {
    id: "firmware-nvm",
    category: "firmware",
    question: "What is non-volatile memory in firmware?",
    variations: [
      "NVM embedded",
      "Non volatile storage firmware",
      "Where to store settings",
      "Flash EEPROM storage",
    ],
    keywords: ["non", "volatile", "memory", "firmware", "storage"],
    answer:
      "Non-volatile memory retains data when power is removed, such as flash, EEPROM or FRAM. It is used for configuration, calibration and logs, but has limited write endurance on some types.",
  },
  {
    id: "firmware-settings",
    category: "firmware",
    question: "How should firmware store settings?",
    variations: [
      "Store settings firmware",
      "Configuration storage embedded",
      "Save user settings",
      "Settings in flash",
    ],
    keywords: ["settings", "firmware", "storage", "configuration", "flash"],
    answer:
      "Settings can be stored in non-volatile memory with checksums and version information. Writes should be minimized, and defaults should be available if stored data is invalid.",
  },
  {
    id: "firmware-defaults",
    category: "firmware",
    question: "How should firmware handle default settings?",
    variations: [
      "Default settings firmware",
      "Fallback configuration",
      "Initial configuration embedded",
      "Factory defaults code",
    ],
    keywords: ["defaults", "firmware", "settings", "configuration", "fallback"],
    answer:
      "Defaults should be defined clearly and used when stored settings are missing or invalid. The firmware should be able to restore defaults on request or after detecting corruption.",
  },
  {
    id: "firmware-config-version",
    category: "firmware",
    question: "Why version configuration data?",
    variations: [
      "Configuration versioning firmware",
      "Settings migration",
      "Config version embedded",
      "Upgrade settings format",
    ],
    keywords: ["configuration", "version", "firmware", "settings", "migration"],
    answer:
      "Versioning configuration data allows firmware to detect older formats and migrate or reset them safely when the format changes. It prevents misinterpretation of stored settings.",
  },
  {
    id: "firmware-checksum",
    category: "firmware",
    question: "How do I verify stored data in firmware?",
    variations: [
      "Checksum stored data",
      "Validate settings firmware",
      "CRC stored data",
      "Data integrity embedded",
    ],
    keywords: ["checksum", "verify", "firmware", "data", "integrity"],
    answer:
      "Checksums or CRCs can detect corruption in stored data. The firmware computes the check value when saving and verifies it when loading, falling back to defaults if the data is invalid.",
  },
  {
    id: "firmware-fram",
    category: "firmware",
    question: "What is FRAM?",
    variations: [
      "Ferroelectric RAM embedded",
      "FRAM vs EEPROM",
      "FRAM firmware",
      "Non volatile memory FRAM",
    ],
    keywords: ["fram", "ferroelectric", "memory", "firmware", "nonvolatile"],
    answer:
      "FRAM is a non-volatile memory technology with fast writes and high endurance compared to EEPROM or flash. It is useful for frequent logging or configuration changes.",
  },
  {
    id: "firmware-sd",
    category: "firmware",
    question: "How do I use an SD card in firmware?",
    variations: [
      "SD card firmware",
      "Read write SD embedded",
      "SD card SPI",
      "File system SD card",
    ],
    keywords: ["sd", "card", "firmware", "file", "storage"],
    answer:
      "SD cards can be accessed over SPI or SDIO depending on the microcontroller. Firmware uses a file system library to read and write files. Card initialization, compatibility and power should be considered.",
  },
  {
    id: "firmware-usb",
    category: "firmware",
    question: "How do I use USB in firmware?",
    variations: [
      "USB firmware",
      "USB device microcontroller",
      "USB CDC HID firmware",
      "USB stack embedded",
    ],
    keywords: ["usb", "firmware", "device", "cdc", "hid"],
    answer:
      "USB firmware uses a USB stack to implement device classes such as CDC, HID or MSC. The available stack and complexity depend on the microcontroller and framework.",
  },
  {
    id: "firmware-usb-cdc",
    category: "firmware",
    question: "What is USB CDC?",
    variations: [
      "USB serial firmware",
      "CDC device embedded",
      "Virtual COM port",
      "USB CDC code",
    ],
    keywords: ["usb", "cdc", "serial", "firmware", "virtual"],
    answer:
      "USB CDC is a device class that provides a virtual serial port over USB. It allows a microcontroller to communicate with a computer as if it were a serial device.",
  },
  {
    id: "firmware-usb-hid",
    category: "firmware",
    question: "What is USB HID?",
    variations: [
      "USB HID firmware",
      "Keyboard mouse emulation",
      "HID device embedded",
      "USB human interface device",
    ],
    keywords: ["usb", "hid", "keyboard", "mouse", "firmware"],
    answer:
      "USB HID is a device class for human interface devices such as keyboards, mice and game controllers. Firmware can implement custom HID devices for user input.",
  },
  {
    id: "firmware-usb-msc",
    category: "firmware",
    question: "What is USB MSC?",
    variations: [
      "USB mass storage firmware",
      "MSC device embedded",
      "USB drive emulation",
      "USB storage class",
    ],
    keywords: ["usb", "msc", "mass", "storage", "firmware"],
    answer:
      "USB MSC is a device class for mass storage. Firmware can present internal flash or an SD card as a USB drive to a host computer.",
  },
  {
    id: "firmware-ethernet",
    category: "firmware",
    question: "How do I use Ethernet in firmware?",
    variations: [
      "Ethernet firmware",
      "W5500 firmware",
      "Ethernet microcontroller",
      "TCP IP embedded",
    ],
    keywords: ["ethernet", "firmware", "tcp", "ip", "embedded"],
    answer:
      "Ethernet firmware can use an internal MAC with an external PHY or an external controller such as W5500. A TCP/IP stack is needed for network protocols. The choice depends on the microcontroller and application.",
  },
  {
    id: "firmware-lwip",
    category: "firmware",
    question: "What is lwIP?",
    variations: [
      "lwIP embedded",
      "Lightweight IP stack",
      "TCP IP firmware",
      "lwIP vs full TCP IP",
    ],
    keywords: ["lwip", "tcp", "ip", "firmware", "embedded"],
    answer:
      "lwIP is a lightweight TCP/IP stack designed for embedded systems. It provides IP, TCP, UDP and related protocols with a relatively small footprint.",
  },
  {
    id: "firmware-socket",
    category: "firmware",
    question: "How do I use sockets in firmware?",
    variations: [
      "Socket programming embedded",
      "TCP socket firmware",
      "UDP socket embedded",
      "Network socket code",
    ],
    keywords: ["socket", "firmware", "tcp", "udp", "network"],
    answer:
      "Socket APIs allow firmware to create TCP or UDP connections, send and receive data, and close connections. Error handling and timeouts are important for reliable network operation.",
  },
  {
    id: "firmware-tcp",
    category: "firmware",
    question: "What is TCP in firmware?",
    variations: [
      "TCP vs UDP embedded",
      "How TCP works",
      "TCP communication firmware",
      "Reliable network protocol",
    ],
    keywords: ["tcp", "firmware", "network", "reliable", "protocol"],
    answer:
      "TCP is a connection-oriented protocol that provides reliable, ordered data delivery. It is used when data integrity matters more than minimal latency or overhead.",
  },
  {
    id: "firmware-udp",
    category: "firmware",
    question: "What is UDP in firmware?",
    variations: [
      "UDP vs TCP embedded",
      "How UDP works",
      "UDP communication firmware",
      "Fast network protocol",
    ],
    keywords: ["udp", "firmware", "network", "protocol", "fast"],
    answer:
      "UDP is a connectionless protocol with lower overhead than TCP. It is used for real-time or broadcast communication where some packet loss is acceptable or handled by the application.",
  },
  {
    id: "firmware-dns",
    category: "firmware",
    question: "How does firmware resolve domain names?",
    variations: [
      "DNS firmware",
      "Resolve hostname embedded",
      "DNS lookup code",
      "Domain name microcontroller",
    ],
    keywords: ["dns", "firmware", "hostname", "resolve", "network"],
    answer:
      "Firmware can use a DNS client to resolve domain names to IP addresses. This requires network connectivity and appropriate DNS server configuration.",
  },
  {
    id: "firmware-dhcp",
    category: "firmware",
    question: "What is DHCP in firmware?",
    variations: [
      "DHCP client firmware",
      "Obtain IP address embedded",
      "Automatic IP configuration",
      "Static vs DHCP firmware",
    ],
    keywords: ["dhcp", "firmware", "ip", "address", "network"],
    answer:
      "DHCP allows a device to obtain an IP address and network configuration automatically. Firmware may support DHCP or use a static IP depending on the application.",
  },
  {
    id: "firmware-static-ip",
    category: "firmware",
    question: "How do I set a static IP in firmware?",
    variations: [
      "Static IP firmware",
      "Set IP address embedded",
      "Manual network configuration",
      "Static vs DHCP embedded",
    ],
    keywords: ["static", "ip", "firmware", "network", "configuration"],
    answer:
      "Firmware can configure a static IP address, subnet mask, gateway and DNS servers. Static addressing is useful for servers or devices that need a predictable address.",
  },
  {
    id: "firmware-mac",
    category: "firmware",
    question: "How is a MAC address used in firmware?",
    variations: [
      "MAC address firmware",
      "Ethernet MAC address",
      "Unique MAC embedded",
      "Set MAC address code",
    ],
    keywords: ["mac", "address", "firmware", "ethernet", "network"],
    answer:
      "A MAC address identifies a network interface at the data link layer. It may be stored in hardware, assigned by the manufacturer or configured in firmware for development and testing.",
  },
  {
    id: "firmware-network-security",
    category: "firmware",
    question: "How do I secure network communication in firmware?",
    variations: [
      "Secure network firmware",
      "TLS embedded",
      "Encrypt communication IoT",
      "Network security embedded",
    ],
    keywords: ["network", "security", "firmware", "tls", "encryption"],
    answer:
      "Secure network communication can use TLS, secure protocols and authentication. Key management, certificate validation and firmware update security should also be considered.",
  },
  {
    id: "firmware-certificate",
    category: "firmware",
    question: "How does firmware handle certificates?",
    variations: [
      "Certificate firmware",
      "TLS certificate embedded",
      "Validate server certificate",
      "Certificate storage embedded",
    ],
    keywords: ["certificate", "firmware", "tls", "validate", "security"],
    answer:
      "Firmware may store root certificates or device certificates, validate server certificates and present client certificates where required. Storage, time synchronization and renewal must be managed.",
  },
  {
    id: "firmware-token",
    category: "firmware",
    question: "How should firmware store API tokens?",
    variations: [
      "API token firmware",
      "Store secret embedded",
      "Token security firmware",
      "Protect credentials",
    ],
    keywords: ["token", "firmware", "api", "secret", "security"],
    answer:
      "API tokens and other secrets should be protected using secure storage where available. Hard-coded secrets can be extracted from firmware, so additional measures may be needed for sensitive applications.",
  },
  {
    id: "firmware-cloud-auth",
    category: "firmware",
    question: "How does firmware authenticate to a cloud service?",
    variations: [
      "Cloud authentication firmware",
      "Device authentication IoT",
      "Certificate authentication embedded",
      "API key firmware",
    ],
    keywords: ["cloud", "authentication", "firmware", "device", "security"],
    answer:
      "Authentication methods include API keys, tokens, certificates and hardware-backed identities. The method depends on the cloud platform and security requirements.",
  },
  {
    id: "firmware-provisioning",
    category: "firmware",
    question: "What is device provisioning?",
    variations: [
      "Provisioning firmware",
      "Setup device credentials",
      "Initial configuration IoT",
      "Claim device cloud",
    ],
    keywords: ["provisioning", "firmware", "device", "setup", "cloud"],
    answer:
      "Provisioning is the process of configuring a device with credentials, network settings and identity for deployment. It may be done in the factory, on-site or through a setup process.",
  },
  {
    id: "firmware-claim",
    category: "firmware",
    question: "What is device claiming in IoT?",
    variations: [
      "Device claiming IoT",
      "Register device cloud",
      "Claim firmware",
      "Device onboarding",
    ],
    keywords: ["claim", "device", "iot", "firmware", "cloud"],
    answer:
      "Device claiming associates a device with a user account or cloud service. It often uses a unique identifier, certificate or provisioning code.",
  },
  {
    id: "firmware-shadow",
    category: "firmware",
    question: "What is a device shadow in IoT?",
    variations: [
      "Device shadow AWS",
      "Digital twin firmware",
      "Shadow document IoT",
      "Device state cloud",
    ],
    keywords: ["shadow", "device", "iot", "firmware", "cloud"],
    answer:
      "A device shadow is a cloud representation of a device's state. It allows applications to read or update desired state even when the device is offline, with synchronization when it reconnects.",
  },
  {
    id: "firmware-twin",
    category: "firmware",
    question: "What is a digital twin?",
    variations: [
      "Digital twin firmware",
      "Device twin IoT",
      "Virtual representation device",
      "Twin cloud embedded",
    ],
    keywords: ["digital", "twin", "firmware", "iot", "cloud"],
    answer:
      "A digital twin is a virtual representation of a physical device or system. It can be used for monitoring, simulation and analysis, and is related to the device shadow concept in IoT platforms.",
  },
  {
    id: "firmware-edge",
    category: "firmware",
    question: "What is edge computing in firmware?",
    variations: [
      "Edge computing embedded",
      "Process data locally firmware",
      "Edge vs cloud",
      "Local data processing",
    ],
    keywords: ["edge", "computing", "firmware", "local", "cloud"],
    answer:
      "Edge computing processes data near the source, such as on the device or a local gateway. It can reduce latency, bandwidth and dependence on cloud connectivity.",
  },
  {
    id: "firmware-gateway",
    category: "firmware",
    question: "What is an IoT gateway?",
    variations: [
      "IoT gateway firmware",
      "Gateway device embedded",
      "Connect sensors to cloud",
      "Edge gateway",
    ],
    keywords: ["gateway", "iot", "firmware", "connect", "cloud"],
    answer:
      "An IoT gateway connects local devices to a wider network or cloud service. It may translate protocols, aggregate data, provide local processing and manage device connectivity.",
  },
  {
    id: "firmware-protocol-translation",
    category: "firmware",
    question: "What is protocol translation in firmware?",
    variations: [
      "Protocol translation gateway",
      "Convert protocol firmware",
      "Modbus to MQTT",
      "Protocol converter embedded",
    ],
    keywords: ["protocol", "translation", "firmware", "gateway", "convert"],
    answer:
      "Protocol translation converts data between different communication protocols, such as Modbus to MQTT. It is often implemented on a gateway or controller with multiple interfaces.",
  },
  {
    id: "firmware-data-aggregation",
    category: "firmware",
    question: "What is data aggregation in firmware?",
    variations: [
      "Data aggregation embedded",
      "Combine sensor data",
      "Aggregate before sending",
      "Reduce data transmission",
    ],
    keywords: ["data", "aggregation", "firmware", "sensor", "transmission"],
    answer:
      "Data aggregation combines multiple readings or sources into a smaller set of data before transmission or storage. It can reduce bandwidth, power and storage requirements.",
  },
  {
    id: "firmware-buffering",
    category: "firmware",
    question: "How do I buffer data in firmware?",
    variations: [
      "Data buffering embedded",
      "Buffer sensor data",
      "Store data before sending",
      "Buffer overflow firmware",
    ],
    keywords: ["buffering", "data", "firmware", "buffer", "store"],
    answer:
      "Buffering temporarily stores data to smooth transmission, handle bursts or survive brief disconnections. Buffer size, overflow behavior and power-loss handling should be considered.",
  },
  {
    id: "firmware-store-forward",
    category: "firmware",
    question: "What is store-and-forward in firmware?",
    variations: [
      "Store and forward firmware",
      "Buffer when offline",
      "Send data later",
      "Offline data storage",
    ],
    keywords: ["store", "forward", "firmware", "offline", "buffer"],
    answer:
      "Store-and-forward saves data when a connection is unavailable and sends it later when connectivity returns. It requires non-volatile storage and careful management of capacity and ordering.",
  },
  {
    id: "firmware-timestamp",
    category: "firmware",
    question: "How should firmware timestamp data?",
    variations: [
      "Timestamp firmware",
      "Add time to data",
      "RTC timestamp embedded",
      "Data logging time",
    ],
    keywords: ["timestamp", "firmware", "data", "rtc", "time"],
    answer:
      "Timestamps can come from an RTC, network time or an elapsed counter. The required accuracy, storage format and handling of time synchronization should be considered.",
  },
  {
    id: "firmware-unix-time",
    category: "firmware",
    question: "What is Unix time?",
    variations: [
      "Epoch time firmware",
      "Unix timestamp embedded",
      "Seconds since 1970",
      "Time representation firmware",
    ],
    keywords: ["unix", "time", "epoch", "firmware", "timestamp"],
    answer:
      "Unix time is the number of seconds since 1 January 1970 UTC, excluding leap seconds. It is a common compact representation for timestamps, though 32-bit values overflow in 2038.",
  },
  {
    id: "firmware-timezone",
    category: "firmware",
    question: "How does firmware handle time zones?",
    variations: [
      "Timezone firmware",
      "Local time embedded",
      "UTC vs local time",
      "Daylight saving firmware",
    ],
    keywords: ["timezone", "firmware", "utc", "local", "dst"],
    answer:
      "Firmware often stores time in UTC and converts to local time for display or scheduling. Time zone and daylight saving rules add complexity and may need updates.",
  },
  {
    id: "firmware-calendar",
    category: "firmware",
    question: "How do I handle calendar dates in firmware?",
    variations: [
      "Calendar firmware",
      "Date calculation embedded",
      "Leap year firmware",
      "Day of week code",
    ],
    keywords: ["calendar", "date", "firmware", "leap", "year"],
    answer:
      "Calendar handling includes date arithmetic, leap years, day of week and month lengths. Libraries or careful algorithms help avoid errors, especially across leap years and month boundaries.",
  },
  {
    id: "firmware-scheduling",
    category: "firmware",
    question: "How do I schedule events by time in firmware?",
    variations: [
      "Schedule events firmware",
      "RTC alarm embedded",
      "Time based task",
      "Calendar schedule code",
    ],
    keywords: ["schedule", "events", "firmware", "time", "alarm"],
    answer:
      "Events can be scheduled using RTC alarms, timer comparisons or a software scheduler that checks time conditions. The approach depends on required accuracy and power constraints.",
  },
  {
    id: "firmware-alarm",
    category: "firmware",
    question: "How do I use an RTC alarm in firmware?",
    variations: [
      "RTC alarm firmware",
      "Wake at specific time",
      "Alarm interrupt embedded",
      "Scheduled wake",
    ],
    keywords: ["rtc", "alarm", "firmware", "wake", "scheduled"],
    answer:
      "An RTC alarm can wake the microcontroller or trigger an interrupt at a set time. It is useful for low-power scheduled tasks.",
  },
  {
    id: "firmware-countdown",
    category: "firmware",
    question: "How do I implement a countdown timer in firmware?",
    variations: [
      "Countdown timer code",
      "Timer firmware",
      "Elapsed time tracking",
      "Timeout firmware",
    ],
    keywords: ["countdown", "timer", "firmware", "timeout", "elapsed"],
    answer:
      "A countdown timer tracks remaining time using a hardware timer or software counter. It can trigger an action or timeout when it reaches zero.",
  },
  {
    id: "firmware-timeout",
    category: "firmware",
    question: "How do I implement a timeout in firmware?",
    variations: [
      "Timeout code embedded",
      "Wait with timeout",
      "Communication timeout",
      "Avoid blocking forever",
    ],
    keywords: ["timeout", "firmware", "wait", "blocking", "communication"],
    answer:
      "Timeouts prevent operations from waiting forever. Firmware records a start time and checks elapsed time, returning an error or taking alternative action when the limit is exceeded.",
  },
  {
    id: "firmware-debounce-time",
    category: "firmware",
    question: "How long should a debounce time be?",
    variations: [
      "Debounce time value",
      "Button debounce duration",
      "Switch debounce ms",
      "How long to debounce",
    ],
    keywords: ["debounce", "time", "firmware", "button", "switch"],
    answer:
      "Debounce time depends on the switch characteristics, typically 5–50 ms for mechanical buttons. Too short may allow bounce, too long may feel unresponsive.",
  },
  {
    id: "firmware-long-press",
    category: "firmware",
    question: "How do I detect a long press in firmware?",
    variations: [
      "Long press code",
      "Button hold detection",
      "Short press vs long press",
      "Button timing firmware",
    ],
    keywords: ["long", "press", "firmware", "button", "detection"],
    answer:
      "Long press detection measures how long a button remains pressed. If it exceeds a threshold, a long-press action is triggered. Debouncing and release detection should also be handled.",
  },
  {
    id: "firmware-multi-click",
    category: "firmware",
    question: "How do I detect double clicks in firmware?",
    variations: [
      "Double click code",
      "Multi click detection",
      "Button click counting",
      "Tap detection firmware",
    ],
    keywords: ["double", "click", "firmware", "button", "detection"],
    answer:
      "Double-click detection counts presses within a time window. If a second press occurs before the window expires, it is treated as a double click. Timing and debouncing must be handled carefully.",
  },
  {
    id: "firmware-repeat",
    category: "firmware",
    question: "How do I implement key repeat in firmware?",
    variations: [
      "Key repeat code",
      "Button auto repeat",
      "Hold to repeat",
      "Repeat rate firmware",
    ],
    keywords: ["repeat", "firmware", "button", "key", "rate"],
    answer:
      "Key repeat triggers repeated actions while a button is held, often after an initial delay and then at a set rate. It is common for menus and value adjustment.",
  },
  {
    id: "firmware-menu",
    category: "firmware",
    question: "How do I implement a menu in firmware?",
    variations: [
      "Menu firmware",
      "Embedded menu system",
      "Display menu code",
      "User interface firmware",
    ],
    keywords: ["menu", "firmware", "display", "interface", "navigation"],
    answer:
      "A menu system can use states or a tree structure to navigate options. It handles input, displays choices and executes actions. State machines are commonly used for menu logic.",
  },
  {
    id: "firmware-ui",
    category: "firmware",
    question: "How do I design a user interface for firmware?",
    variations: [
      "User interface embedded",
      "UI firmware design",
      "Display and buttons UI",
      "Embedded interface",
    ],
    keywords: ["user", "interface", "firmware", "design", "ui"],
    answer:
      "Embedded UI design considers the display, input methods, feedback, menu structure and user context. Responsiveness, clarity and error prevention are important.",
  },
  {
    id: "firmware-accessibility",
    category: "firmware",
    question: "Should firmware consider accessibility?",
    variations: [
      "Accessibility embedded",
      "Accessible device design",
      "User needs firmware",
      "Inclusive design electronics",
    ],
    keywords: ["accessibility", "firmware", "design", "user", "inclusive"],
    answer:
      "Accessibility can include clear display, audible or tactile feedback, large controls and simple navigation. It helps ensure the device can be used by a wider range of people.",
  },
  {
    id: "firmware-language",
    category: "firmware",
    question: "How does firmware handle multiple languages?",
    variations: [
      "Localization firmware",
      "Multiple languages embedded",
      "Translation display",
      "Language selection code",
    ],
    keywords: [
      "language",
      "firmware",
      "localization",
      "translation",
      "display",
    ],
    answer:
      "Multi-language firmware stores text strings for each supported language and selects them based on configuration. Storage, font support and translation updates should be considered.",
  },
  {
    id: "firmware-units",
    category: "firmware",
    question: "How should firmware handle units?",
    variations: [
      "Units firmware",
      "Metric imperial embedded",
      "Convert units code",
      "Display units",
    ],
    keywords: ["units", "firmware", "convert", "display", "measurement"],
    answer:
      "Firmware should store values in a consistent internal unit and convert for display or communication. Unit conversion and rounding should be handled carefully to avoid errors.",
  },
  {
    id: "firmware-precision",
    category: "firmware",
    question: "How much precision should firmware use?",
    variations: [
      "Precision firmware",
      "Decimal places embedded",
      "Significant figures code",
      "Rounding firmware",
    ],
    keywords: ["precision", "firmware", "decimal", "rounding", "accuracy"],
    answer:
      "Precision should match the sensor and application requirements. Excess precision wastes processing and storage and can imply accuracy that does not exist.",
  },
  {
    id: "firmware-accuracy",
    category: "firmware",
    question:
      "What is the difference between accuracy and precision in firmware?",
    variations: [
      "Accuracy vs precision",
      "Measurement accuracy firmware",
      "Precision meaning embedded",
      "Sensor accuracy",
    ],
    keywords: ["accuracy", "precision", "firmware", "measurement", "sensor"],
    answer:
      "Accuracy is how close a measurement is to the true value; precision is how repeatable it is. A system can be precise but not accurate if it has a consistent offset.",
  },
  {
    id: "firmware-calibration-procedure",
    category: "firmware",
    question: "How do I create a calibration procedure?",
    variations: [
      "Calibration procedure firmware",
      "How to calibrate sensor",
      "Calibration steps embedded",
      "Two point calibration procedure",
    ],
    keywords: ["calibration", "procedure", "firmware", "sensor", "steps"],
    answer:
      "A calibration procedure defines reference conditions, measurements, calculations and storage of calibration values. It should be repeatable and documented.",
  },
  {
    id: "firmware-self-calibration",
    category: "firmware",
    question: "Can firmware self-calibrate?",
    variations: [
      "Self calibration firmware",
      "Auto calibration embedded",
      "Runtime calibration",
      "Automatic calibration sensor",
    ],
    keywords: ["self", "calibration", "firmware", "auto", "runtime"],
    answer:
      "Some systems can self-calibrate using known references or conditions, such as zeroing at startup or using a reference channel. The feasibility depends on the sensor and available references.",
  },
  {
    id: "firmware-offset",
    category: "firmware",
    question: "How do I correct a sensor offset in firmware?",
    variations: [
      "Sensor offset correction",
      "Zero offset firmware",
      "Remove bias sensor",
      "Calibrate offset code",
    ],
    keywords: ["offset", "sensor", "firmware", "correction", "zero"],
    answer:
      "Offset correction subtracts a measured or stored offset from raw readings. The offset may be determined at calibration or at startup under known conditions.",
  },
  {
    id: "firmware-scaling",
    category: "firmware",
    question: "How do I scale sensor readings in firmware?",
    variations: [
      "Scale sensor data",
      "Raw to engineering units",
      "Linear scaling firmware",
      "Sensor conversion formula",
    ],
    keywords: ["scaling", "sensor", "firmware", "conversion", "linear"],
    answer:
      "Scaling converts raw sensor values to engineering units using a linear or nonlinear function. Calibration constants may define the relationship.",
  },
  {
    id: "firmware-linearization",
    category: "firmware",
    question: "How do I linearize a sensor in firmware?",
    variations: [
      "Sensor linearization",
      "Nonlinear sensor firmware",
      "Lookup table sensor",
      "Polynomial correction",
    ],
    keywords: ["linearization", "sensor", "firmware", "table", "polynomial"],
    answer:
      "Linearization corrects nonlinear sensor response using a lookup table, polynomial or piecewise function. The method depends on the sensor and required accuracy.",
  },
  {
    id: "firmware-lookup-table",
    category: "firmware",
    question: "How do I use a lookup table in firmware?",
    variations: [
      "Lookup table embedded",
      "LUT firmware",
      "Table interpolation code",
      "Calibration table",
    ],
    keywords: ["lookup", "table", "firmware", "interpolation", "lut"],
    answer:
      "A lookup table maps input values to output values. Interpolation between table entries improves accuracy. Table size and storage type should be considered.",
  },
  {
    id: "firmware-interpolation",
    category: "firmware",
    question: "How do I interpolate values in firmware?",
    variations: [
      "Linear interpolation firmware",
      "Interpolate table embedded",
      "Between values code",
      "Interpolation algorithm",
    ],
    keywords: ["interpolation", "firmware", "linear", "table", "values"],
    answer:
      "Linear interpolation estimates values between known points using a straight line. Higher-order interpolation can be used for smoother curves but adds complexity.",
  },
  {
    id: "firmware-dead-reckoning",
    category: "firmware",
    question: "What is dead reckoning in firmware?",
    variations: [
      "Dead reckoning embedded",
      "Estimate position without GPS",
      "Navigation firmware",
      "Odometry code",
    ],
    keywords: ["dead", "reckoning", "firmware", "position", "navigation"],
    answer:
      "Dead reckoning estimates position by integrating speed, heading or motion over time. It drifts over time without external correction, so it is often combined with other sensors.",
  },
  {
    id: "firmware-odometry",
    category: "firmware",
    question: "How do I implement odometry in firmware?",
    variations: [
      "Odometry firmware",
      "Wheel encoder position",
      "Track robot movement",
      "Distance calculation encoder",
    ],
    keywords: ["odometry", "firmware", "encoder", "position", "distance"],
    answer:
      "Odometry uses wheel or motor encoder counts to estimate distance and heading. Wheel circumference, gear ratio and encoder resolution are used in the calculation.",
  },
  {
    id: "firmware-kinematics",
    category: "firmware",
    question: "What is kinematics in firmware?",
    variations: [
      "Kinematics robot firmware",
      "Forward inverse kinematics",
      "Motion calculation embedded",
      "Robot movement code",
    ],
    keywords: ["kinematics", "firmware", "robot", "motion", "calculation"],
    answer:
      "Kinematics describes motion without considering forces. Forward kinematics calculates position from joint values; inverse kinematics calculates joint values for a desired position.",
  },
  {
    id: "firmware-motion-profile",
    category: "firmware",
    question: "What is a motion profile in firmware?",
    variations: [
      "Motion profile firmware",
      "Trapezoidal profile",
      "S curve motion",
      "Acceleration profile embedded",
    ],
    keywords: ["motion", "profile", "firmware", "acceleration", "velocity"],
    answer:
      "A motion profile defines velocity and acceleration over time for smooth movement. Trapezoidal and S-curve profiles are common in motion control.",
  },
  {
    id: "firmware-trajectory",
    category: "firmware",
    question: "How do I plan a trajectory in firmware?",
    variations: [
      "Trajectory planning firmware",
      "Path planning embedded",
      "Motion trajectory code",
      "Robot path firmware",
    ],
    keywords: ["trajectory", "firmware", "planning", "motion", "path"],
    answer:
      "Trajectory planning generates a path and timing for motion, respecting constraints such as speed, acceleration and obstacles. The complexity depends on the application.",
  },
  {
    id: "firmware-safety-monitor",
    category: "firmware",
    question: "What is a safety monitor in firmware?",
    variations: [
      "Safety monitor firmware",
      "Watchdog for safety",
      "Fault detection embedded",
      "Safety supervision",
    ],
    keywords: ["safety", "monitor", "firmware", "fault", "supervision"],
    answer:
      "A safety monitor checks for unsafe conditions and triggers protective actions. It may be implemented in firmware, hardware or both, depending on the required integrity level.",
  },
  {
    id: "firmware-diagnostics-log",
    category: "firmware",
    question: "What should a firmware diagnostics log contain?",
    variations: [
      "Diagnostic log firmware",
      "Fault log embedded",
      "Error history code",
      "Log diagnostics data",
    ],
    keywords: ["diagnostics", "log", "firmware", "fault", "error"],
    answer:
      "A diagnostics log can include timestamps, error codes, reset causes, sensor values and operating conditions. It helps diagnose intermittent and field failures.",
  },
  {
    id: "firmware-black-box",
    category: "firmware",
    question: "What is a black box recorder in firmware?",
    variations: [
      "Black box firmware",
      "Event recorder embedded",
      "Crash log firmware",
      "Data recorder MCU",
    ],
    keywords: ["black", "box", "firmware", "recorder", "crash"],
    answer:
      "A black box recorder stores recent events or data in non-volatile memory so they can be examined after a fault. It is useful for diagnosing intermittent or field failures.",
  },
  {
    id: "firmware-crash-dump",
    category: "firmware",
    question: "What is a crash dump?",
    variations: [
      "Crash dump firmware",
      "Fault dump embedded",
      "Save crash info",
      "Debug crash firmware",
    ],
    keywords: ["crash", "dump", "firmware", "debug", "fault"],
    answer:
      "A crash dump captures processor state, stack or memory contents when a fault occurs. It can be saved to non-volatile memory or transmitted for later analysis.",
  },
  {
    id: "firmware-fault-handler",
    category: "firmware",
    question: "What is a fault handler?",
    variations: [
      "Fault handler firmware",
      "Exception handler embedded",
      "Hard fault handler",
      "Error handler MCU",
    ],
    keywords: ["fault", "handler", "firmware", "exception", "error"],
    answer:
      "A fault handler is code that runs when a processor exception occurs. It can log information, attempt recovery or reset the system safely.",
  },
  {
    id: "firmware-assert",
    category: "firmware",
    question: "Should firmware use assert?",
    variations: [
      "Assert embedded",
      "Assertion firmware",
      "Debug assert code",
      "Runtime checks embedded",
    ],
    keywords: ["assert", "firmware", "debug", "check", "runtime"],
    answer:
      "Asserts check conditions during development and can catch programming errors early. In production, asserts may be disabled or configured to log and recover rather than halt.",
  },
  {
    id: "firmware-defensive",
    category: "firmware",
    question: "What is defensive programming in firmware?",
    variations: [
      "Defensive programming embedded",
      "Robust firmware code",
      "Validate inputs firmware",
      "Safe coding embedded",
    ],
    keywords: ["defensive", "programming", "firmware", "robust", "safe"],
    answer:
      "Defensive programming validates inputs, checks return values, handles unexpected conditions and avoids assumptions. It improves robustness, especially in systems exposed to noise, faults or user error.",
  },
  {
    id: "firmware-code-review-checklist",
    category: "firmware",
    question: "What should I check in a firmware code review?",
    variations: [
      "Firmware code review checklist",
      "What to look for in embedded code",
      "Review embedded software",
      "Code review firmware",
    ],
    keywords: ["code", "review", "firmware", "checklist", "embedded"],
    answer:
      "Check for correct hardware access, timing, error handling, memory safety, concurrency issues, resource limits and adherence to standards. Also verify that assumptions and interfaces are documented.",
  },
  {
    id: "firmware-technical-debt",
    category: "firmware",
    question: "What is technical debt in firmware?",
    variations: [
      "Technical debt embedded",
      "Shortcuts in firmware",
      "Maintainability firmware",
      "Code quality embedded",
    ],
    keywords: ["technical", "debt", "firmware", "maintainability", "quality"],
    answer:
      "Technical debt is the future cost of shortcuts or poor design decisions. In firmware, it can make maintenance, porting and debugging harder. Managing it requires awareness and planned improvement.",
  },
  {
    id: "firmware-refactoring",
    category: "firmware",
    question: "Should firmware be refactored?",
    variations: [
      "Refactor firmware",
      "Improve embedded code",
      "Clean up firmware",
      "Code refactoring embedded",
    ],
    keywords: ["refactoring", "firmware", "code", "improve", "clean"],
    answer:
      "Refactoring improves code structure without changing behavior. It can make firmware easier to maintain and extend, but should be done with testing to avoid introducing regressions.",
  },
  {
    id: "firmware-legacy",
    category: "firmware",
    question: "How do I work with legacy firmware?",
    variations: [
      "Legacy firmware maintenance",
      "Old embedded code",
      "Update legacy firmware",
      "Maintain old firmware",
    ],
    keywords: ["legacy", "firmware", "maintenance", "old", "update"],
    answer:
      "Legacy firmware may lack documentation, use obsolete tools or have undocumented behavior. Careful testing, incremental changes and documentation are important when modifying it.",
  },
  {
    id: "firmware-porting",
    category: "firmware",
    question: "How do I port firmware to a new microcontroller?",
    variations: [
      "Port firmware new MCU",
      "Migrate embedded code",
      "Change microcontroller firmware",
      "Port embedded software",
    ],
    keywords: ["port", "firmware", "microcontroller", "migrate", "embedded"],
    answer:
      "Porting involves adapting hardware access, drivers, timing, memory layout and toolchain. Keeping hardware-specific code isolated simplifies the process.",
  },
  {
    id: "firmware-migration",
    category: "firmware",
    question: "How do I migrate firmware to a new framework?",
    variations: [
      "Migrate firmware framework",
      "Arduino to ESP-IDF",
      "Change firmware framework",
      "Port code framework",
    ],
    keywords: ["migration", "firmware", "framework", "port", "code"],
    answer:
      "Migration requires mapping APIs, adapting build systems and retesting behavior. It may be incremental or a rewrite depending on differences between frameworks.",
  },
  {
    id: "firmware-abstraction-porting",
    category: "firmware",
    question: "How does abstraction help porting firmware?",
    variations: [
      "Abstraction porting firmware",
      "HAL portability embedded",
      "Separate hardware code",
      "Portable firmware design",
    ],
    keywords: ["abstraction", "porting", "firmware", "hal", "portable"],
    answer:
      "Abstraction separates application logic from hardware details, so only the hardware-specific layer needs to change when porting. This reduces effort and risk.",
  },
  {
    id: "firmware-platform",
    category: "firmware",
    question: "What is a firmware platform?",
    variations: [
      "Firmware platform",
      "Embedded platform",
      "Hardware software platform",
      "Platform selection embedded",
    ],
    keywords: ["platform", "firmware", "embedded", "hardware", "software"],
    answer:
      "A firmware platform combines hardware, toolchain, framework and libraries. The choice affects development effort, performance, cost and long-term support.",
  },
  {
    id: "firmware-selection",
    category: "firmware",
    question: "How do I choose a microcontroller for a project?",
    variations: [
      "Choose microcontroller",
      "MCU selection",
      "Which microcontroller to use",
      "Pick MCU for project",
    ],
    keywords: ["microcontroller", "selection", "mcu", "choose", "project"],
    answer:
      "Consider required peripherals, processing power, memory, power consumption, package, temperature range, toolchain, availability, cost and long-term support. The choice should match the project requirements.",
  },
  {
    id: "firmware-tradeoff",
    category: "firmware",
    question: "What trade-offs are common in firmware design?",
    variations: [
      "Firmware design tradeoffs",
      "Speed vs memory embedded",
      "Power vs performance",
      "Tradeoffs embedded systems",
    ],
    keywords: ["tradeoffs", "firmware", "design", "speed", "power"],
    answer:
      "Common trade-offs include speed versus memory, power versus performance, simplicity versus flexibility, cost versus capability and development time versus robustness. The priorities depend on the application.",
  },
  {
    id: "firmware-requirements",
    category: "firmware",
    question: "How do I write firmware requirements?",
    variations: [
      "Firmware requirements",
      "Embedded software requirements",
      "Specify firmware behavior",
      "Requirements document firmware",
    ],
    keywords: [
      "requirements",
      "firmware",
      "embedded",
      "specification",
      "behavior",
    ],
    answer:
      "Firmware requirements should describe functionality, interfaces, performance, timing, safety, environmental conditions and constraints. Clear requirements guide design, testing and verification.",
  },
  {
    id: "firmware-design-doc",
    category: "firmware",
    question: "What is a firmware design document?",
    variations: [
      "Firmware design document",
      "Embedded design doc",
      "Software design firmware",
      "Architecture document embedded",
    ],
    keywords: ["design", "document", "firmware", "architecture", "embedded"],
    answer:
      "A firmware design document describes the architecture, modules, interfaces, data flow, timing and key decisions. It helps communicate the design and supports maintenance.",
  },
  {
    id: "firmware-interface-doc",
    category: "firmware",
    question: "Why document firmware interfaces?",
    variations: [
      "Interface documentation firmware",
      "API documentation embedded",
      "Document module interfaces",
      "Interface specification firmware",
    ],
    keywords: ["interface", "documentation", "firmware", "api", "module"],
    answer:
      "Documenting interfaces clarifies how modules interact, what data is exchanged and what assumptions exist. This reduces integration errors and supports future changes.",
  },
  {
    id: "firmware-state-diagram",
    category: "firmware",
    question: "What is a state diagram used for in firmware?",
    variations: [
      "State diagram firmware",
      "UML state machine embedded",
      "Design state machine",
      "State transition diagram",
    ],
    keywords: ["state", "diagram", "firmware", "design", "transition"],
    answer:
      "A state diagram shows states, transitions, events and actions. It is useful for designing and documenting state-machine-based firmware behavior.",
  },
  {
    id: "firmware-flowchart",
    category: "firmware",
    question: "How can flowcharts help firmware design?",
    variations: [
      "Flowchart firmware",
      "Design flowchart embedded",
      "Algorithm flowchart code",
      "Visualize firmware logic",
    ],
    keywords: ["flowchart", "firmware", "design", "logic", "algorithm"],
    answer:
      "Flowcharts visualize logic and control flow, helping to plan and communicate firmware behavior. They are especially useful for complex decision paths and sequences.",
  },
  {
    id: "firmware-uml",
    category: "firmware",
    question: "Can UML be used for firmware design?",
    variations: [
      "UML embedded",
      "UML firmware design",
      "Class diagram embedded",
      "Sequence diagram firmware",
    ],
    keywords: ["uml", "firmware", "design", "diagram", "embedded"],
    answer:
      "UML can model firmware structure and behavior using class, sequence, state and activity diagrams. It can be useful for larger projects, though many embedded teams use simpler diagrams.",
  },
  {
    id: "firmware-model-based",
    category: "firmware",
    question: "What is model-based firmware development?",
    variations: [
      "Model based firmware",
      "Model driven embedded",
      "Simulink firmware",
      "Generate code from model",
    ],
    keywords: ["model", "based", "firmware", "development", "generate"],
    answer:
      "Model-based development uses models to design and simulate behavior, then generates code or guides implementation. It can improve verification but requires tooling and process discipline.",
  },
  {
    id: "firmware-simulation-model",
    category: "firmware",
    question: "How can simulation help firmware development?",
    variations: [
      "Simulate firmware behavior",
      "Model simulation embedded",
      "Test firmware in simulation",
      "Virtual prototype firmware",
    ],
    keywords: ["simulation", "firmware", "development", "test", "model"],
    answer:
      "Simulation can test control logic, state machines and algorithms before hardware is available. It does not replace hardware testing but can catch design errors early.",
  },
  {
    id: "firmware-test-driven",
    category: "firmware",
    question: "What is test-driven development for firmware?",
    variations: [
      "TDD firmware",
      "Test driven embedded",
      "Write tests first firmware",
      "Unit tests embedded TDD",
    ],
    keywords: ["test", "driven", "development", "firmware", "tdd"],
    answer:
      "Test-driven development writes tests before implementation, then code to pass the tests. It can improve design and confidence, but hardware dependencies may require mocking or abstraction.",
  },
  {
    id: "firmware-mocking",
    category: "firmware",
    question: "How do I mock hardware in firmware tests?",
    variations: [
      "Mock hardware firmware",
      "Fake HAL testing",
      "Stub driver tests",
      "Test without hardware",
    ],
    keywords: ["mock", "hardware", "firmware", "test", "stub"],
    answer:
      "Hardware can be mocked by abstracting drivers behind interfaces and providing test implementations. This allows logic to be tested on a host without physical hardware.",
  },
  {
    id: "firmware-hardware-abstraction-test",
    category: "firmware",
    question: "Why abstract hardware for testing?",
    variations: [
      "Abstraction testing firmware",
      "Testable firmware design",
      "HAL for unit tests",
      "Decouple hardware tests",
    ],
    keywords: ["abstraction", "testing", "firmware", "hal", "decouple"],
    answer:
      "Abstracting hardware allows tests to substitute simulated or mock implementations, making it possible to test application logic without the real device. It also improves portability.",
  },
  {
    id: "firmware-ci-hardware",
    category: "firmware",
    question: "How can hardware be tested in CI?",
    variations: [
      "Hardware in CI",
      "Automated hardware testing",
      "CI test rig firmware",
      "Continuous integration hardware",
    ],
    keywords: ["hardware", "ci", "firmware", "testing", "automation"],
    answer:
      "Hardware-in-the-loop test rigs can run automated tests on real devices as part of CI. This requires infrastructure, but can catch hardware-related issues that host tests miss.",
  },
  {
    id: "firmware-regression",
    category: "firmware",
    question: "What is regression testing in firmware?",
    variations: [
      "Regression testing firmware",
      "Ensure old bugs stay fixed",
      "Retest after changes",
      "Automated regression embedded",
    ],
    keywords: ["regression", "testing", "firmware", "changes", "bugs"],
    answer:
      "Regression testing re-runs tests after changes to ensure existing functionality still works. It helps prevent new changes from breaking previously working behavior.",
  },
  {
    id: "firmware-acceptance",
    category: "firmware",
    question: "What is acceptance testing for firmware?",
    variations: [
      "Acceptance testing firmware",
      "Verify requirements embedded",
      "Final testing firmware",
      "Customer acceptance test",
    ],
    keywords: ["acceptance", "testing", "firmware", "requirements", "verify"],
    answer:
      "Acceptance testing verifies that the firmware meets the agreed requirements and is ready for release. It is often based on the original specification and may include user scenarios.",
  },
  {
    id: "firmware-field-update",
    category: "firmware",
    question: "What should be considered before a field update?",
    variations: [
      "Field update firmware",
      "Before OTA update",
      "Deploy firmware update",
      "Update deployed devices",
    ],
    keywords: ["field", "update", "firmware", "ota", "deploy"],
    answer:
      "Consider compatibility, update mechanism, power availability, network reliability, rollback, data migration and user impact. Testing the update process itself is important.",
  },
  {
    id: "firmware-rollback",
    category: "firmware",
    question: "What is firmware rollback?",
    variations: [
      "Rollback firmware",
      "Revert update embedded",
      "Restore previous firmware",
      "Undo firmware update",
    ],
    keywords: ["rollback", "firmware", "revert", "update", "restore"],
    answer:
      "Rollback restores a previous firmware version if an update fails or causes problems. It requires keeping a known-good image and a safe mechanism to switch back.",
  },
  {
    id: "firmware-a-b",
    category: "firmware",
    question: "What is A/B firmware update?",
    variations: [
      "A/B partition firmware",
      "Dual bank update",
      "Fail safe OTA",
      "Two firmware slots",
    ],
    keywords: ["a", "b", "partition", "firmware", "update"],
    answer:
      "A/B update keeps two firmware images. The new image is written to the inactive slot and tested before switching. If it fails, the system can boot the other slot.",
  },
  {
    id: "firmware-bootloader-update",
    category: "firmware",
    question: "Can a bootloader be updated?",
    variations: [
      "Update bootloader",
      "Bootloader update process",
      "Change bootloader firmware",
      "Bootloader upgrade",
    ],
    keywords: ["bootloader", "update", "firmware", "upgrade", "process"],
    answer:
      "Bootloader updates are possible but require care because a failed update can make the device unrecoverable. A recovery mechanism or protected bootloader area is often used.",
  },
  {
    id: "firmware-recovery-mode",
    category: "firmware",
    question: "What is recovery mode in firmware?",
    variations: [
      "Recovery mode embedded",
      "Safe mode firmware",
      "Restore firmware",
      "Recovery boot",
    ],
    keywords: ["recovery", "mode", "firmware", "restore", "boot"],
    answer:
      "Recovery mode allows the device to be restored or updated when normal firmware cannot start. It may be entered by a button, command or failed boot detection.",
  },
  {
    id: "firmware-factory-programming",
    category: "firmware",
    question: "How is firmware programmed in production?",
    variations: [
      "Production programming firmware",
      "Factory firmware flashing",
      "Mass programming MCU",
      "Programming many devices",
    ],
    keywords: ["production", "programming", "firmware", "factory", "flashing"],
    answer:
      "Production programming can use automated programmers, gang programmers, in-circuit test fixtures or bootloader-based provisioning. It should be reliable, traceable and fast.",
  },
  {
    id: "firmware-serialization",
    category: "firmware",
    question: "What is firmware serialization?",
    variations: [
      "Firmware serialization",
      "Unique data per device",
      "Program serial number production",
      "Device personalization",
    ],
    keywords: ["serialization", "firmware", "unique", "production", "data"],
    answer:
      "Serialization programs unique data such as serial numbers, keys or calibration values into each device during production. It requires secure and reliable data handling.",
  },
  {
    id: "firmware-provisioning-production",
    category: "firmware",
    question: "How is provisioning done during production?",
    variations: [
      "Production provisioning",
      "Factory provisioning device",
      "Setup credentials production",
      "Provision IoT devices",
    ],
    keywords: ["provisioning", "production", "firmware", "device", "factory"],
    answer:
      "Production provisioning configures network credentials, certificates, keys and device identity. It may be integrated with test and serialization steps.",
  },
  {
    id: "firmware-traceability",
    category: "firmware",
    question: "Why is traceability important in firmware production?",
    variations: [
      "Firmware traceability",
      "Track device firmware version",
      "Production trace firmware",
      "Know which firmware on device",
    ],
    keywords: ["traceability", "firmware", "production", "version", "track"],
    answer:
      "Traceability records which firmware version and configuration were programmed into each device. It helps with support, recalls and quality analysis.",
  },
  {
    id: "firmware-quality",
    category: "firmware",
    question: "How do I improve firmware quality?",
    variations: [
      "Firmware quality",
      "Improve embedded software quality",
      "Quality assurance firmware",
      "Better firmware",
    ],
    keywords: ["quality", "firmware", "improve", "assurance", "process"],
    answer:
      "Quality can be improved with clear requirements, design reviews, coding standards, testing, static analysis, version control and continuous improvement. Process discipline matters as much as tools.",
  },
  {
    id: "firmware-metrics",
    category: "firmware",
    question: "What metrics can track firmware quality?",
    variations: [
      "Firmware metrics",
      "Measure embedded quality",
      "Defect density firmware",
      "Code coverage embedded",
    ],
    keywords: ["metrics", "firmware", "quality", "defect", "coverage"],
    answer:
      "Common metrics include defect density, test coverage, code complexity, static analysis findings and mean time between failures. Metrics should guide improvement, not just be collected.",
  },
  {
    id: "firmware-code-coverage",
    category: "firmware",
    question: "What is code coverage in firmware testing?",
    variations: [
      "Code coverage embedded",
      "Coverage testing firmware",
      "Statement branch coverage",
      "How much code tested",
    ],
    keywords: ["code", "coverage", "firmware", "testing", "statement"],
    answer:
      "Code coverage measures how much of the firmware code is exercised by tests, such as statement, branch or condition coverage. It is a useful indicator but not a guarantee of quality.",
  },
  {
    id: "firmware-mutation",
    category: "firmware",
    question: "What is mutation testing?",
    variations: [
      "Mutation testing firmware",
      "Test quality embedded",
      "Mutate code tests",
      "How good are my tests",
    ],
    keywords: ["mutation", "testing", "firmware", "quality", "test"],
    answer:
      "Mutation testing introduces small changes to code and checks whether tests fail. If tests do not catch the mutation, they may be insufficient. It assesses test effectiveness.",
  },
  {
    id: "firmware-fuzz",
    category: "firmware",
    question: "What is fuzz testing for firmware?",
    variations: [
      "Fuzz testing embedded",
      "Fuzzing firmware",
      "Random input testing",
      "Robustness testing firmware",
    ],
    keywords: ["fuzz", "testing", "firmware", "input", "robustness"],
    answer:
      "Fuzz testing feeds random or malformed inputs to the firmware to find crashes, hangs or security issues. It is useful for communication protocols and parsing code.",
  },
  {
    id: "firmware-security-testing",
    category: "firmware",
    question: "How do I test firmware security?",
    variations: [
      "Security testing firmware",
      "Penetration test embedded",
      "Firmware vulnerability testing",
      "Secure firmware testing",
    ],
    keywords: [
      "security",
      "testing",
      "firmware",
      "vulnerability",
      "penetration",
    ],
    answer:
      "Security testing can include threat modeling, static analysis, fuzzing, penetration testing and review of update and authentication mechanisms. The scope depends on the threat model.",
  },
  {
    id: "firmware-threat-model",
    category: "firmware",
    question: "What is a threat model for firmware?",
    variations: [
      "Threat model embedded",
      "Security threats firmware",
      "Identify firmware risks",
      "Security analysis embedded",
    ],
    keywords: ["threat", "model", "firmware", "security", "risk"],
    answer:
      "A threat model identifies potential attackers, assets, attack surfaces and risks. It guides security requirements and testing for the firmware.",
  },
  {
    id: "firmware-attack-surface",
    category: "firmware",
    question: "What is an attack surface in firmware?",
    variations: [
      "Attack surface embedded",
      "Firmware attack vectors",
      "Where can firmware be attacked",
      "Security exposure firmware",
    ],
    keywords: ["attack", "surface", "firmware", "security", "exposure"],
    answer:
      "The attack surface includes all interfaces and features that could be used to attack the device, such as network, USB, debug ports, sensors and update mechanisms. Reducing it improves security.",
  },
  {
    id: "firmware-hardening",
    category: "firmware",
    question: "What is firmware hardening?",
    variations: [
      "Firmware hardening",
      "Secure firmware configuration",
      "Reduce firmware vulnerabilities",
      "Harden embedded device",
    ],
    keywords: [
      "hardening",
      "firmware",
      "security",
      "vulnerabilities",
      "secure",
    ],
    answer:
      "Firmware hardening reduces vulnerabilities by disabling unused features, protecting debug access, enabling security features, validating inputs and following secure coding practices.",
  },
  {
    id: "firmware-debug-security",
    category: "firmware",
    question: "Should debug access be disabled in production?",
    variations: [
      "Disable debug firmware",
      "Production debug port",
      "Secure debug access",
      "Protect JTAG SWD",
    ],
    keywords: ["debug", "security", "firmware", "production", "access"],
    answer:
      "Debug access should generally be restricted or disabled in production to prevent unauthorized access to firmware and memory. The method depends on the device and security requirements.",
  },
  {
    id: "firmware-secure-element",
    category: "firmware",
    question: "What is a secure element?",
    variations: [
      "Secure element embedded",
      "Crypto chip firmware",
      "Hardware security module",
      "ATECC secure element",
    ],
    keywords: ["secure", "element", "firmware", "crypto", "security"],
    answer:
      "A secure element is a tamper-resistant hardware component that stores keys and performs cryptographic operations. It can improve security for authentication, encryption and device identity.",
  },
  {
    id: "firmware-tpm",
    category: "firmware",
    question: "What is a TPM?",
    variations: [
      "Trusted platform module",
      "TPM embedded",
      "Firmware TPM",
      "Hardware security TPM",
    ],
    keywords: ["tpm", "trusted", "platform", "module", "firmware"],
    answer:
      "A TPM, or Trusted Platform Module, is a hardware security chip that provides secure key storage and cryptographic functions. It is used for secure boot, authentication and platform integrity.",
  },
  {
    id: "firmware-hsm",
    category: "firmware",
    question: "What is an HSM?",
    variations: [
      "Hardware security module",
      "HSM firmware",
      "Secure key storage HSM",
      "Cryptographic hardware",
    ],
    keywords: ["hsm", "hardware", "security", "module", "firmware"],
    answer:
      "An HSM, or Hardware Security Module, is a dedicated device for secure cryptographic operations and key management. It is used in systems requiring high security.",
  },
  {
    id: "firmware-random",
    category: "firmware",
    question: "How does firmware generate random numbers?",
    variations: [
      "Random number firmware",
      "RNG embedded",
      "True random vs pseudo random",
      "randomSeed Arduino",
    ],
    keywords: ["random", "number", "firmware", "rng", "seed"],
    answer:
      "Firmware can use a pseudo-random generator with a seed or a hardware true random number generator where available. Cryptographic use requires a secure random source and proper seeding.",
  },
  {
    id: "firmware-crypto",
    category: "firmware",
    question: "What cryptography is used in firmware?",
    variations: [
      "Cryptography embedded",
      "Crypto firmware",
      "Encryption algorithms embedded",
      "Security algorithms firmware",
    ],
    keywords: ["crypto", "firmware", "security", "encryption", "algorithms"],
    answer:
      "Common cryptographic functions include hashing, symmetric encryption, asymmetric encryption and digital signatures. The choice depends on the security requirements and available processing power.",
  },
  {
    id: "firmware-hash",
    category: "firmware",
    question: "What is a hash function used for in firmware?",
    variations: [
      "Hash firmware",
      "SHA-256 embedded",
      "Data integrity hash",
      "Checksum vs hash",
    ],
    keywords: ["hash", "firmware", "integrity", "sha", "checksum"],
    answer:
      "A hash function produces a fixed-size digest from data. It is used for integrity checks, signatures and password storage. Cryptographic hashes are more secure than simple checksums.",
  },
  {
    id: "firmware-hmac",
    category: "firmware",
    question: "What is HMAC?",
    variations: [
      "HMAC firmware",
      "Message authentication code",
      "Verify message authenticity",
      "HMAC vs hash",
    ],
    keywords: ["hmac", "firmware", "authentication", "message", "security"],
    answer:
      "HMAC is a message authentication code that uses a hash function and a secret key. It verifies both integrity and authenticity of a message.",
  },
  {
    id: "firmware-aes",
    category: "firmware",
    question: "What is AES used for in firmware?",
    variations: [
      "AES firmware",
      "Symmetric encryption embedded",
      "Encrypt data MCU",
      "AES hardware acceleration",
    ],
    keywords: ["aes", "firmware", "encryption", "symmetric", "security"],
    answer:
      "AES is a symmetric encryption algorithm used to protect data confidentiality. Many microcontrollers include hardware AES acceleration.",
  },
  {
    id: "firmware-ecc",
    category: "firmware",
    question: "What is ECC in firmware security?",
    variations: [
      "Elliptic curve cryptography",
      "ECC firmware",
      "Asymmetric crypto embedded",
      "ECC vs RSA",
    ],
    keywords: ["ecc", "firmware", "cryptography", "elliptic", "curve"],
    answer:
      "ECC, or Elliptic Curve Cryptography, is a public-key cryptography method that provides strong security with smaller keys than RSA. It is useful in constrained devices.",
  },
  {
    id: "firmware-rsa",
    category: "firmware",
    question: "Can firmware use RSA?",
    variations: [
      "RSA firmware",
      "RSA embedded",
      "RSA vs ECC",
      "Public key crypto MCU",
    ],
    keywords: ["rsa", "firmware", "cryptography", "public", "key"],
    answer:
      "RSA can be used in firmware for encryption, signatures and key exchange, but it requires more processing and memory than ECC. It may be suitable for less constrained devices or where compatibility is required.",
  },
  {
    id: "firmware-signature-verify",
    category: "firmware",
    question: "How does firmware verify a digital signature?",
    variations: [
      "Verify signature firmware",
      "Digital signature embedded",
      "Check firmware signature",
      "Secure update verification",
    ],
    keywords: ["signature", "verify", "firmware", "digital", "secure"],
    answer:
      "Firmware uses the signer's public key to verify that the signature matches the data and that the data has not been altered. This is common in secure boot and update mechanisms.",
  },
  {
    id: "firmware-key-exchange",
    category: "firmware",
    question: "What is key exchange in firmware?",
    variations: [
      "Key exchange embedded",
      "TLS handshake firmware",
      "Session key exchange",
      "Secure communication firmware",
    ],
    keywords: ["key", "exchange", "firmware", "tls", "session"],
    answer:
      "Key exchange establishes a shared secret between two parties, often used to derive session keys. Protocols such as TLS handle this in firmware.",
  },
  {
    id: "firmware-certificate-pinning",
    category: "firmware",
    question: "What is certificate pinning?",
    variations: [
      "Certificate pinning firmware",
      "Pin server certificate",
      "TLS pinning embedded",
      "Prevent MITM firmware",
    ],
    keywords: ["certificate", "pinning", "firmware", "tls", "security"],
    answer:
      "Certificate pinning restricts which certificates or public keys are accepted, reducing the risk of man-in-the-middle attacks. It requires updating if the pinned certificate changes.",
  },
  {
    id: "firmware-mitm",
    category: "firmware",
    question: "What is a man-in-the-middle attack in firmware?",
    variations: [
      "MITM firmware",
      "Man in the middle embedded",
      "Intercept communication IoT",
      "Secure against MITM",
    ],
    keywords: ["mitm", "firmware", "attack", "security", "communication"],
    answer:
      "A man-in-the-middle attack occurs when an attacker intercepts and possibly alters communication between two parties. TLS, authentication and certificate validation help prevent it.",
  },
  {
    id: "firmware-replay",
    category: "firmware",
    question: "What is a replay attack?",
    variations: [
      "Replay attack firmware",
      "Reuse message attack",
      "Prevent replay embedded",
      "Nonce firmware",
    ],
    keywords: ["replay", "attack", "firmware", "security", "nonce"],
    answer:
      "A replay attack reuses a valid message to cause an unauthorized action. Nonces, timestamps and sequence numbers can prevent replay in communication protocols.",
  },
  {
    id: "firmware-nonce",
    category: "firmware",
    question: "What is a nonce in firmware?",
    variations: [
      "Nonce embedded",
      "Random nonce security",
      "Prevent replay nonce",
      "Number used once",
    ],
    keywords: ["nonce", "firmware", "security", "replay", "random"],
    answer:
      "A nonce is a value used once in a cryptographic operation to prevent replay and ensure freshness. It should be unpredictable and not reused.",
  },
  {
    id: "firmware-secure-communication",
    category: "firmware",
    question: "How do I secure communication between devices?",
    variations: [
      "Secure device communication",
      "Encrypt firmware communication",
      "Device to device security",
      "Secure protocol embedded",
    ],
    keywords: ["secure", "communication", "firmware", "devices", "security"],
    answer:
      "Use authenticated and encrypted protocols, manage keys securely and validate identities. The appropriate solution depends on the devices, network and threat model.",
  },
  {
    id: "firmware-identity",
    category: "firmware",
    question: "How does firmware prove device identity?",
    variations: [
      "Device identity firmware",
      "Prove device authentic",
      "Device certificate embedded",
      "Unique identity MCU",
    ],
    keywords: ["identity", "firmware", "device", "certificate", "security"],
    answer:
      "Device identity can be proven using certificates, keys stored in secure hardware or challenge-response protocols. The strength depends on key protection and provisioning.",
  },
  {
    id: "firmware-secure-storage",
    category: "firmware",
    question: "How do I store sensitive data securely in firmware?",
    variations: [
      "Secure storage firmware",
      "Protect data embedded",
      "Encrypt stored data",
      "Store secrets securely",
    ],
    keywords: ["secure", "storage", "firmware", "data", "secrets"],
    answer:
      "Sensitive data should be encrypted or stored in protected hardware where possible. Access controls, key management and tamper resistance should be considered.",
  },
  {
    id: "firmware-tamper",
    category: "firmware",
    question: "What is tamper detection?",
    variations: [
      "Tamper detection firmware",
      "Detect physical tampering",
      "Tamper proof device",
      "Security tamper embedded",
    ],
    keywords: ["tamper", "detection", "firmware", "security", "physical"],
    answer:
      "Tamper detection identifies attempts to physically or electronically modify a device. It can trigger key erasure, logging or disabling of functions depending on the security requirements.",
  },
  {
    id: "firmware-secure-erase",
    category: "firmware",
    question: "What is secure erase in firmware?",
    variations: [
      "Secure erase firmware",
      "Erase keys embedded",
      "Wipe sensitive data",
      "Zeroize firmware",
    ],
    keywords: ["secure", "erase", "firmware", "keys", "data"],
    answer:
      "Secure erase removes sensitive data such as keys or credentials in a way that prevents recovery. It may be triggered by tamper detection, a command or decommissioning.",
  },
  {
    id: "firmware-zeroization",
    category: "firmware",
    question: "What is zeroization?",
    variations: [
      "Zeroization firmware",
      "Zeroize memory",
      "Erase keys automatically",
      "Secure wipe embedded",
    ],
    keywords: ["zeroization", "firmware", "keys", "erase", "security"],
    answer:
      "Zeroization overwrites sensitive data, especially cryptographic keys, to prevent recovery. It is often required in security standards and can be triggered by tamper or decommissioning.",
  },
  {
    id: "firmware-decommission",
    category: "firmware",
    question: "What should firmware do when a device is decommissioned?",
    variations: [
      "Decommission firmware",
      "Retire device securely",
      "Erase data before disposal",
      "End of life device",
    ],
    keywords: ["decommission", "firmware", "erase", "data", "security"],
    answer:
      "Decommissioning should securely erase sensitive data, revoke credentials and keys, and ensure the device cannot access services. The process depends on the device and security requirements.",
  },
  {
    id: "firmware-lifecycle",
    category: "firmware",
    question: "What is the firmware lifecycle?",
    variations: [
      "Firmware lifecycle",
      "Embedded software lifecycle",
      "From development to retirement",
      "Firmware stages",
    ],
    keywords: [
      "lifecycle",
      "firmware",
      "development",
      "maintenance",
      "retirement",
    ],
    answer:
      "The firmware lifecycle includes requirements, design, implementation, testing, release, maintenance, updates and retirement. Planning for the full lifecycle improves long-term success.",
  },
  {
    id: "firmware-end-of-life",
    category: "firmware",
    question: "How do I handle firmware end-of-life?",
    variations: [
      "Firmware end of life",
      "EOL embedded",
      "Last firmware update",
      "Retire firmware",
    ],
    keywords: ["end", "life", "firmware", "eol", "retire"],
    answer:
      "End-of-life planning includes final updates, security patches, documentation, notification to users and secure decommissioning. It helps avoid unsupported devices remaining in service.",
  },
  {
    id: "firmware-obsolescence",
    category: "firmware",
    question: "What is component obsolescence in firmware?",
    variations: [
      "Component obsolescence",
      "Microcontroller discontinued",
      "Firmware component EOL",
      "Handle obsolete hardware",
    ],
    keywords: [
      "obsolescence",
      "firmware",
      "component",
      "discontinued",
      "hardware",
    ],
    answer:
      "Component obsolescence occurs when a microcontroller or peripheral is discontinued. It may require last-time buys, redesign or firmware porting to a new device.",
  },
  {
    id: "firmware-last-time-buy",
    category: "firmware",
    question: "What is a last-time buy?",
    variations: [
      "Last time buy firmware",
      "Buy stock before EOL",
      "Component last time buy",
      "Inventory obsolete parts",
    ],
    keywords: ["last", "time", "buy", "firmware", "component"],
    answer:
      "A last-time buy purchases remaining stock of a component before it is discontinued. It requires forecasting future demand and storage considerations.",
  },
  {
    id: "firmware-redesign",
    category: "firmware",
    question: "When should firmware be redesigned?",
    variations: [
      "Redesign firmware",
      "When to rewrite embedded",
      "Firmware rewrite decision",
      "Replace firmware design",
    ],
    keywords: ["redesign", "firmware", "rewrite", "decision", "embedded"],
    answer:
      "Redesign may be needed when hardware changes, requirements grow significantly, security issues arise or maintenance becomes too costly. The decision should weigh cost, risk and benefit.",
  },
  {
    id: "firmware-future-proof",
    category: "firmware",
    question: "How can I future-proof firmware?",
    variations: [
      "Future proof firmware",
      "Design for change embedded",
      "Extensible firmware",
      "Prepare for future updates",
    ],
    keywords: ["future", "proof", "firmware", "design", "extensible"],
    answer:
      "Future-proofing includes modular design, clear interfaces, update mechanisms, sufficient resources and documentation. It helps accommodate changes without major rework.",
  },
  {
    id: "firmware-scalability",
    category: "firmware",
    question: "How can firmware be made scalable?",
    variations: [
      "Scalable firmware",
      "Grow firmware features",
      "Design for expansion",
      "Extendable embedded code",
    ],
    keywords: ["scalable", "firmware", "expand", "features", "design"],
    answer:
      "Scalability can be improved with modular architecture, abstraction layers, configurable features and adequate memory. Planning for growth reduces rework later.",
  },
  {
    id: "firmware-modularity",
    category: "firmware",
    question: "Why is modularity important in firmware?",
    variations: [
      "Modular firmware",
      "Benefits of modularity embedded",
      "Module design firmware",
      "Reusable firmware modules",
    ],
    keywords: ["modularity", "firmware", "modules", "reuse", "design"],
    answer:
      "Modularity separates responsibilities into independent modules with clear interfaces. It improves testing, reuse, maintainability and porting.",
  },
  {
    id: "firmware-reuse",
    category: "firmware",
    question: "How can firmware code be reused?",
    variations: [
      "Reuse firmware code",
      "Portable embedded modules",
      "Reusable drivers",
      "Share code between projects",
    ],
    keywords: ["reuse", "firmware", "code", "modules", "drivers"],
    answer:
      "Code can be reused by abstracting hardware, using standard interfaces, documenting modules and managing libraries. Reuse saves development time and improves consistency.",
  },
  {
    id: "firmware-library",
    category: "firmware",
    question: "How do I manage firmware libraries?",
    variations: [
      "Firmware library management",
      "Manage dependencies embedded",
      "Version libraries firmware",
      "Library updates embedded",
    ],
    keywords: ["library", "management", "firmware", "dependencies", "version"],
    answer:
      "Libraries should be version-controlled, reviewed, tested and documented. Dependency updates should be evaluated for compatibility and security.",
  },
  {
    id: "firmware-license-management",
    category: "firmware",
    question: "How do I manage firmware licenses?",
    variations: [
      "Firmware license management",
      "Open source licenses embedded",
      "Track licenses firmware",
      "License compliance embedded",
    ],
    keywords: ["license", "management", "firmware", "compliance", "open"],
    answer:
      "Maintain a record of all third-party code and licenses, understand the obligations of each license and ensure compliance. This is important for commercial products.",
  },
  {
    id: "firmware-sbom",
    category: "firmware",
    question: "What is a software bill of materials for firmware?",
    variations: [
      "SBOM firmware",
      "Bill of materials software",
      "Track firmware components",
      "Firmware component inventory",
    ],
    keywords: ["sbom", "firmware", "bill", "materials", "components"],
    answer:
      "A software bill of materials lists the components and dependencies in firmware. It helps with vulnerability tracking, license compliance and supply chain management.",
  },
  {
    id: "firmware-supply-chain",
    category: "firmware",
    question: "What is firmware supply chain security?",
    variations: [
      "Firmware supply chain",
      "Secure build firmware",
      "Supply chain attack embedded",
      "Trusted firmware build",
    ],
    keywords: ["supply", "chain", "firmware", "security", "build"],
    answer:
      "Supply chain security protects the tools, dependencies and processes used to build firmware. Measures include verifying sources, reproducible builds and protecting signing keys.",
  },
  {
    id: "firmware-reproducible",
    category: "firmware",
    question: "What is a reproducible firmware build?",
    variations: [
      "Reproducible build firmware",
      "Same binary from source",
      "Build reproducibility embedded",
      "Verify firmware build",
    ],
    keywords: ["reproducible", "build", "firmware", "source", "verify"],
    answer:
      "A reproducible build produces the same binary from the same source and tools. It helps verify that released firmware matches the reviewed source and supports supply chain integrity.",
  },
  {
    id: "firmware-signing",
    category: "firmware",
    question: "How is firmware signed?",
    variations: [
      "Firmware signing",
      "Sign firmware image",
      "Code signing embedded",
      "Secure firmware release",
    ],
    keywords: ["signing", "firmware", "secure", "release", "image"],
    answer:
      "Firmware signing uses a private key to create a digital signature over the image. The device verifies the signature before accepting or running the firmware, ensuring authenticity and integrity.",
  },
  {
    id: "firmware-key-management",
    category: "firmware",
    question: "What is key management for firmware?",
    variations: [
      "Key management firmware",
      "Manage signing keys",
      "Protect firmware keys",
      "Key lifecycle embedded",
    ],
    keywords: ["key", "management", "firmware", "security", "lifecycle"],
    answer:
      "Key management covers generation, storage, distribution, rotation and revocation of cryptographic keys. It is critical for secure boot, updates and communication.",
  },
  {
    id: "firmware-rotation",
    category: "firmware",
    question: "What is key rotation?",
    variations: [
      "Key rotation firmware",
      "Change keys embedded",
      "Rotate signing keys",
      "Update keys device",
    ],
    keywords: ["rotation", "key", "firmware", "security", "update"],
    answer:
      "Key rotation replaces cryptographic keys periodically or after compromise. Devices must be able to accept new keys securely.",
  },
  {
    id: "firmware-revocation",
    category: "firmware",
    question: "What is key revocation?",
    variations: [
      "Key revocation firmware",
      "Revoke compromised key",
      "Invalidate key embedded",
      "Certificate revocation",
    ],
    keywords: ["revocation", "key", "firmware", "security", "certificate"],
    answer:
      "Key revocation invalidates a key that is no longer trusted, such as after compromise. Devices may use revocation lists or updated trust anchors.",
  },
  {
    id: "firmware-trust-anchor",
    category: "firmware",
    question: "What is a trust anchor?",
    variations: [
      "Trust anchor firmware",
      "Root of trust embedded",
      "Trusted key firmware",
      "Secure boot root",
    ],
    keywords: ["trust", "anchor", "firmware", "security", "root"],
    answer:
      "A trust anchor is a key or certificate that is inherently trusted and serves as the starting point for verifying other keys or certificates. It is fundamental to secure boot and TLS.",
  },
  {
    id: "firmware-root-of-trust",
    category: "firmware",
    question: "What is a root of trust?",
    variations: [
      "Root of trust embedded",
      "Hardware root of trust",
      "Secure boot root",
      "Trusted computing base",
    ],
    keywords: ["root", "trust", "firmware", "security", "hardware"],
    answer:
      "A root of trust is the component or process that is inherently trusted to start the security chain. It may be implemented in hardware, ROM code or protected memory.",
  },
  {
    id: "firmware-chain-of-trust",
    category: "firmware",
    question: "What is a chain of trust?",
    variations: [
      "Chain of trust embedded",
      "Secure boot chain",
      "Verify each stage",
      "Trusted boot firmware",
    ],
    keywords: ["chain", "trust", "firmware", "secure", "boot"],
    answer:
      "A chain of trust verifies each stage of the boot process before executing it, starting from the root of trust. Each stage verifies the next, ensuring only trusted code runs.",
  },
  {
    id: "firmware-measured-boot",
    category: "firmware",
    question: "What is measured boot?",
    variations: [
      "Measured boot firmware",
      "Measure boot stages",
      "Attestation boot",
      "Boot measurement embedded",
    ],
    keywords: ["measured", "boot", "firmware", "attestation", "security"],
    answer:
      "Measured boot records hashes of boot stages without necessarily blocking execution. The measurements can be used for attestation to verify the platform state.",
  },
  {
    id: "firmware-attestation",
    category: "firmware",
    question: "What is device attestation?",
    variations: [
      "Device attestation firmware",
      "Prove device state",
      "Remote attestation embedded",
      "Attestation security",
    ],
    keywords: ["attestation", "firmware", "device", "security", "state"],
    answer:
      "Attestation allows a device to prove its identity and software state to another party. It is used in secure boot, cloud onboarding and zero-trust systems.",
  },
  {
    id: "firmware-zero-trust",
    category: "firmware",
    question: "What is zero trust for embedded devices?",
    variations: [
      "Zero trust embedded",
      "Zero trust firmware",
      "Never trust always verify",
      "Zero trust IoT",
    ],
    keywords: ["zero", "trust", "firmware", "embedded", "security"],
    answer:
      "Zero trust means not automatically trusting any device or network, even inside a perimeter. Each access is authenticated and authorized. For embedded devices, this affects identity, updates and communication.",
  },
  {
    id: "firmware-secure-onboarding",
    category: "firmware",
    question: "What is secure onboarding for IoT devices?",
    variations: [
      "Secure onboarding firmware",
      "IoT device onboarding",
      "Secure provisioning IoT",
      "Onboard device securely",
    ],
    keywords: ["secure", "onboarding", "firmware", "iot", "provisioning"],
    answer:
      "Secure onboarding establishes identity, credentials and configuration without exposing secrets. It may use certificates, secure elements or a trusted provisioning process.",
  },
  {
    id: "firmware-identity-provisioning",
    category: "firmware",
    question: "How is device identity provisioned?",
    variations: [
      "Device identity provisioning",
      "Provision certificate device",
      "Set device identity firmware",
      "Identity setup embedded",
    ],
    keywords: ["identity", "provisioning", "firmware", "device", "certificate"],
    answer:
      "Device identity can be provisioned by injecting keys or certificates during manufacturing, using a secure element or through a secure onboarding process.",
  },
  {
    id: "firmware-certificate-enrollment",
    category: "firmware",
    question: "What is certificate enrollment?",
    variations: [
      "Certificate enrollment firmware",
      "Get certificate device",
      "Enroll certificate embedded",
      "Request certificate IoT",
    ],
    keywords: ["certificate", "enrollment", "firmware", "device", "security"],
    answer:
      "Certificate enrollment is the process by which a device obtains a certificate, often from a certificate authority or enterprise PKI. It requires secure key generation and identity proof.",
  },
  {
    id: "firmware-pki",
    category: "firmware",
    question: "What is PKI?",
    variations: [
      "Public key infrastructure firmware",
      "PKI embedded",
      "Certificate authority IoT",
      "PKI for devices",
    ],
    keywords: ["pki", "firmware", "certificate", "authority", "security"],
    answer:
      "PKI, or Public Key Infrastructure, manages keys and certificates, including issuance, renewal and revocation. It is used for device authentication and secure communication.",
  },
  {
    id: "firmware-ca",
    category: "firmware",
    question: "What is a certificate authority?",
    variations: [
      "Certificate authority firmware",
      "CA embedded",
      "Who signs certificates",
      "Trusted CA device",
    ],
    keywords: ["certificate", "authority", "firmware", "ca", "trust"],
    answer:
      "A certificate authority issues and signs digital certificates. Devices trust certificates signed by a CA whose root certificate is in the device trust store.",
  },
  {
    id: "firmware-root-cert",
    category: "firmware",
    question: "How do I store root certificates in firmware?",
    variations: [
      "Root certificate firmware",
      "Store CA certificate embedded",
      "Trust store firmware",
      "Certificate storage MCU",
    ],
    keywords: ["root", "certificate", "firmware", "trust", "store"],
    answer:
      "Root certificates can be stored in firmware, secure storage or updated through a secure process. Storage and rotation should be planned, especially for long-lived devices.",
  },
  {
    id: "firmware-certificate-expiry",
    category: "firmware",
    question: "How does firmware handle certificate expiry?",
    variations: [
      "Certificate expiry firmware",
      "Expired certificate device",
      "Renew certificate embedded",
      "Certificate lifetime",
    ],
    keywords: ["certificate", "expiry", "firmware", "renew", "time"],
    answer:
      "Firmware should check certificate validity dates, which requires accurate time. Devices may need a renewal mechanism before expiry to avoid losing connectivity.",
  },
  {
    id: "firmware-time-sync-security",
    category: "firmware",
    question: "Why does time matter for firmware security?",
    variations: [
      "Time security firmware",
      "Certificate validation time",
      "Accurate time embedded",
      "Clock for security",
    ],
    keywords: ["time", "security", "firmware", "certificate", "clock"],
    answer:
      "Accurate time is needed for certificate validation, secure protocols and logging. Without a trusted time source, devices may accept expired certificates or mishandle time-based security.",
  },
  {
    id: "firmware-clock-tamper",
    category: "firmware",
    question: "What happens if the clock is tampered with?",
    variations: [
      "Clock tamper firmware",
      "Change time attack",
      "Rollback clock security",
      "Time manipulation",
    ],
    keywords: ["clock", "tamper", "firmware", "security", "time"],
    answer:
      "Tampering with the clock can bypass time-based security checks, cause incorrect logging or affect scheduling. Secure systems may detect clock anomalies or use trusted time.",
  },
  {
    id: "firmware-rollback-protection",
    category: "firmware",
    question: "What is firmware rollback protection?",
    variations: [
      "Rollback protection firmware",
      "Prevent old firmware",
      "Anti rollback embedded",
      "Version enforcement",
    ],
    keywords: ["rollback", "protection", "firmware", "security", "version"],
    answer:
      "Rollback protection prevents a device from accepting an older firmware version that may have known vulnerabilities. It uses version counters or secure storage.",
  },
  {
    id: "firmware-downgrade",
    category: "firmware",
    question: "Can firmware be downgraded?",
    variations: [
      "Downgrade firmware",
      "Install older version",
      "Revert to previous firmware",
      "Firmware downgrade risks",
    ],
    keywords: ["downgrade", "firmware", "older", "version", "risk"],
    answer:
      "Downgrading may be allowed for recovery or compatibility, but can reintroduce vulnerabilities. Security policies should define whether and how downgrades are permitted.",
  },
  {
    id: "firmware-version-counter",
    category: "firmware",
    question: "What is a version counter?",
    variations: [
      "Version counter firmware",
      "Monotonic counter security",
      "Track firmware version",
      "Anti rollback counter",
    ],
    keywords: ["version", "counter", "firmware", "security", "rollback"],
    answer:
      "A version counter tracks the firmware version in a way that cannot be rolled back by an attacker. It is used with rollback protection.",
  },
  {
    id: "firmware-monotonic",
    category: "firmware",
    question: "What is a monotonic counter?",
    variations: [
      "Monotonic counter firmware",
      "Counter only increases",
      "Secure counter embedded",
      "Anti rollback counter",
    ],
    keywords: ["monotonic", "counter", "firmware", "security", "increase"],
    answer:
      "A monotonic counter can only increase, preventing rollback of security-relevant values. It may be implemented in hardware or protected storage.",
  },
  {
    id: "firmware-secure-counter",
    category: "firmware",
    question: "How is a secure counter implemented?",
    variations: [
      "Secure counter firmware",
      "Protected counter embedded",
      "Tamper proof counter",
      "Counter in secure storage",
    ],
    keywords: ["secure", "counter", "firmware", "storage", "tamper"],
    answer:
      "A secure counter can use hardware monotonic counters, secure elements or protected flash with integrity checks. It resists tampering and rollback.",
  },
  {
    id: "firmware-lifecycle-security",
    category: "firmware",
    question: "How does security change over the firmware lifecycle?",
    variations: [
      "Firmware lifecycle security",
      "Security during development production",
      "End to end firmware security",
      "Security stages firmware",
    ],
    keywords: [
      "lifecycle",
      "security",
      "firmware",
      "development",
      "production",
    ],
    answer:
      "Security requirements change from development (protecting source and keys) to production (provisioning and locking) to operation (updates and monitoring) to retirement (decommissioning). Each stage needs appropriate controls.",
  },
  {
    id: "firmware-development-security",
    category: "firmware",
    question: "How do I secure firmware development?",
    variations: [
      "Secure development firmware",
      "Protect source code",
      "Development security embedded",
      "Secure firmware build",
    ],
    keywords: ["development", "security", "firmware", "source", "build"],
    answer:
      "Development security includes access control, secure workstations, protected source code, signed commits, secure build environments and protection of signing keys.",
  },
  {
    id: "firmware-production-security",
    category: "firmware",
    question: "How do I secure firmware production?",
    variations: [
      "Production security firmware",
      "Secure factory programming",
      "Protect production keys",
      "Factory security embedded",
    ],
    keywords: ["production", "security", "firmware", "factory", "keys"],
    answer:
      "Production security includes controlled access, secure programming, key injection, logging, tamper protection and disabling debug interfaces before shipment.",
  },
  {
    id: "firmware-operational-security",
    category: "firmware",
    question: "How do I maintain firmware security in operation?",
    variations: [
      "Operational security firmware",
      "Maintain device security",
      "Monitor firmware security",
      "Field security embedded",
    ],
    keywords: ["operational", "security", "firmware", "monitoring", "field"],
    answer:
      "Operational security includes monitoring for anomalies, applying updates, managing keys and responding to vulnerabilities. It requires ongoing effort over the device lifetime.",
  },
  {
    id: "firmware-vulnerability",
    category: "firmware",
    question: "How do I handle a firmware vulnerability?",
    variations: [
      "Firmware vulnerability",
      "Security bug embedded",
      "Patch firmware vulnerability",
      "Respond to CVE",
    ],
    keywords: ["vulnerability", "firmware", "security", "patch", "cve"],
    answer:
      "Assess the impact, develop and test a fix, and deploy it through a secure update mechanism. Communication with users and coordination may also be required.",
  },
  {
    id: "firmware-cve",
    category: "firmware",
    question: "What is a CVE?",
    variations: [
      "CVE firmware",
      "Common vulnerabilities exposures",
      "Security advisory embedded",
      "Track vulnerabilities firmware",
    ],
    keywords: ["cve", "firmware", "vulnerability", "security", "advisory"],
    answer:
      "CVE, or Common Vulnerabilities and Exposures, is a standardized identifier for publicly known security vulnerabilities. Tracking CVEs helps manage firmware security.",
  },
  {
    id: "firmware-patch",
    category: "firmware",
    question: "How do I patch firmware in the field?",
    variations: [
      "Patch firmware field",
      "Deploy security patch",
      "Update firmware vulnerability",
      "Remote patch embedded",
    ],
    keywords: ["patch", "firmware", "field", "update", "security"],
    answer:
      "Field patching uses the update mechanism to deliver a fixed firmware version. The update should be secure, tested and recoverable in case of failure.",
  },
  {
    id: "firmware-monitoring",
    category: "firmware",
    question: "How can firmware support security monitoring?",
    variations: [
      "Security monitoring firmware",
      "Detect anomalies embedded",
      "Monitor device security",
      "Intrusion detection firmware",
    ],
    keywords: ["monitoring", "security", "firmware", "anomalies", "detection"],
    answer:
      "Firmware can log events, monitor for unexpected behavior and report anomalies. Monitoring data helps detect attacks and diagnose issues.",
  },
  {
    id: "firmware-logging-security",
    category: "firmware",
    question: "What security events should firmware log?",
    variations: [
      "Security logging firmware",
      "Log authentication events",
      "Audit log embedded",
      "Security event logging",
    ],
    keywords: ["security", "logging", "firmware", "events", "audit"],
    answer:
      "Log authentication attempts, configuration changes, update events, faults and tamper detection. Logs should be protected from modification and have limited size.",
  },
  {
    id: "firmware-audit",
    category: "firmware",
    question: "What is an audit log in firmware?",
    variations: [
      "Audit log firmware",
      "Track changes device",
      "Security audit embedded",
      "Event history firmware",
    ],
    keywords: ["audit", "log", "firmware", "security", "changes"],
    answer:
      "An audit log records security-relevant events for review. It should be tamper-evident and retained according to policy.",
  },
  {
    id: "firmware-forensics",
    category: "firmware",
    question: "What is firmware forensics?",
    variations: [
      "Firmware forensics",
      "Investigate device compromise",
      "Analyze firmware attack",
      "Security investigation embedded",
    ],
    keywords: [
      "forensics",
      "firmware",
      "security",
      "investigation",
      "compromise",
    ],
    answer:
      "Firmware forensics examines a device after an incident to determine what happened. It may involve memory dumps, logs and firmware analysis.",
  },
  {
    id: "firmware-incident-response",
    category: "firmware",
    question: "How do I respond to a firmware security incident?",
    variations: [
      "Firmware incident response",
      "Security incident embedded",
      "Respond to device attack",
      "Firmware breach",
    ],
    keywords: ["incident", "response", "firmware", "security", "breach"],
    answer:
      "Incident response includes detection, containment, analysis, remediation and recovery. For firmware, it may involve updating devices, revoking keys and notifying affected parties.",
  },
  {
    id: "firmware-disclosure",
    category: "firmware",
    question: "What is vulnerability disclosure?",
    variations: [
      "Vulnerability disclosure firmware",
      "Report security bug",
      "Coordinated disclosure embedded",
      "Security disclosure policy",
    ],
    keywords: ["disclosure", "vulnerability", "firmware", "security", "report"],
    answer:
      "Vulnerability disclosure is the process of reporting and addressing security issues. Coordinated disclosure gives vendors time to fix before public details are released.",
  },
  {
    id: "firmware-bug-bounty",
    category: "firmware",
    question: "What is a bug bounty program?",
    variations: [
      "Bug bounty firmware",
      "Reward security findings",
      "Crowdsourced security",
      "Vulnerability reward",
    ],
    keywords: ["bug", "bounty", "firmware", "security", "reward"],
    answer:
      "A bug bounty program rewards researchers for finding and reporting security vulnerabilities. It can complement internal security efforts.",
  },
  {
    id: "firmware-security-review",
    category: "firmware",
    question: "How do I perform a firmware security review?",
    variations: [
      "Firmware security review",
      "Review embedded security",
      "Assess firmware security",
      "Security audit firmware",
    ],
    keywords: ["security", "review", "firmware", "audit", "assessment"],
    answer:
      "A security review examines design, code, configuration, update mechanisms, key management and interfaces against threats. It may include static analysis, testing and threat modeling.",
  },
  {
    id: "firmware-hardening-checklist",
    category: "firmware",
    question: "What is a firmware hardening checklist?",
    variations: [
      "Firmware hardening checklist",
      "Security checklist embedded",
      "Secure firmware checklist",
      "Hardening steps firmware",
    ],
    keywords: ["hardening", "checklist", "firmware", "security", "steps"],
    answer:
      "A checklist covers secure boot, debug protection, key management, update security, input validation, memory protection, logging and disabling unused features.",
  },
  {
    id: "firmware-secure-defaults",
    category: "firmware",
    question: "What are secure defaults in firmware?",
    variations: [
      "Secure defaults firmware",
      "Default password embedded",
      "Safe configuration firmware",
      "Ship secure settings",
    ],
    keywords: ["secure", "defaults", "firmware", "configuration", "security"],
    answer:
      "Secure defaults ensure devices ship with safe settings, such as unique credentials, disabled debug and secure communication. Defaults should not require the user to fix security issues.",
  },
  {
    id: "firmware-password",
    category: "firmware",
    question: "How should firmware handle passwords?",
    variations: [
      "Password firmware",
      "Store password embedded",
      "Default password device",
      "Password security MCU",
    ],
    keywords: ["password", "firmware", "security", "store", "default"],
    answer:
      "Passwords should be hashed and salted if stored, never hard-coded as defaults shared across devices, and protected from unauthorized access. Unique per-device credentials are preferred.",
  },
  {
    id: "firmware-authentication",
    category: "firmware",
    question: "How does firmware authenticate users?",
    variations: [
      "User authentication firmware",
      "Login embedded",
      "Authentication device",
      "Access control firmware",
    ],
    keywords: ["authentication", "firmware", "user", "login", "access"],
    answer:
      "User authentication can use passwords, PINs, tokens, certificates or biometrics. The method depends on the device and security requirements.",
  },
  {
    id: "firmware-authorization",
    category: "firmware",
    question: "What is authorization in firmware?",
    variations: [
      "Authorization firmware",
      "Access levels embedded",
      "Permissions device",
      "Role based access firmware",
    ],
    keywords: ["authorization", "firmware", "access", "permissions", "roles"],
    answer:
      "Authorization determines what an authenticated user or process is allowed to do. It may use roles, permissions or access levels.",
  },
  {
    id: "firmware-access-control",
    category: "firmware",
    question: "How do I implement access control in firmware?",
    variations: [
      "Access control firmware",
      "Restrict device functions",
      "Permission checks embedded",
      "Lock configuration firmware",
    ],
    keywords: ["access", "control", "firmware", "permissions", "restrict"],
    answer:
      "Access control checks permissions before allowing actions. It should cover configuration, updates, debug and sensitive functions.",
  },
  {
    id: "firmware-session",
    category: "firmware",
    question: "What is a session in firmware?",
    variations: [
      "Session firmware",
      "Session timeout embedded",
      "Authenticated session device",
      "Connection session",
    ],
    keywords: [
      "session",
      "firmware",
      "authentication",
      "timeout",
      "connection",
    ],
    answer:
      "A session represents an authenticated interaction. Sessions should have timeouts, be protected from hijacking and be properly closed.",
  },
  {
    id: "firmware-token-auth",
    category: "firmware",
    question: "How do I use tokens for authentication in firmware?",
    variations: [
      "Token authentication firmware",
      "API token embedded",
      "Bearer token device",
      "Token based auth",
    ],
    keywords: ["token", "authentication", "firmware", "api", "security"],
    answer:
      "Tokens can authenticate requests or sessions. They should be protected, have limited lifetime and be transmitted securely.",
  },
  {
    id: "firmware-oauth",
    category: "firmware",
    question: "Can firmware use OAuth?",
    variations: [
      "OAuth firmware",
      "OAuth embedded",
      "Device OAuth",
      "Token based cloud auth",
    ],
    keywords: ["oauth", "firmware", "authentication", "cloud", "token"],
    answer:
      "OAuth is possible on connected devices but can be complex due to browser interactions and token management. It depends on the platform and application.",
  },
  {
    id: "firmware-jwt",
    category: "firmware",
    question: "What is JWT?",
    variations: [
      "JWT firmware",
      "JSON web token embedded",
      "Token format security",
      "JWT authentication device",
    ],
    keywords: ["jwt", "firmware", "token", "authentication", "json"],
    answer:
      "JWT, or JSON Web Token, is a compact token format for claims. It is used in authentication and authorization, and should be validated carefully.",
  },
  {
    id: "firmware-api-key",
    category: "firmware",
    question: "How should firmware use API keys?",
    variations: [
      "API key firmware",
      "Store API key device",
      "Protect API key embedded",
      "Cloud API key",
    ],
    keywords: ["api", "key", "firmware", "security", "cloud"],
    answer:
      "API keys should be protected from extraction and transmission in the clear. Where possible, use per-device credentials and rotate keys.",
  },
  {
    id: "firmware-secret",
    category: "firmware",
    question: "How do I protect secrets in firmware?",
    variations: [
      "Protect secrets firmware",
      "Store secret embedded",
      "Avoid hardcoded secrets",
      "Secret management MCU",
    ],
    keywords: ["secret", "firmware", "security", "protect", "management"],
    answer:
      "Use secure storage, avoid hard-coding secrets in source, restrict access and rotate when necessary. Hardware security features can provide stronger protection.",
  },
  {
    id: "firmware-entropy",
    category: "firmware",
    question: "What is entropy in firmware security?",
    variations: [
      "Entropy firmware",
      "Randomness source embedded",
      "Entropy pool device",
      "Secure random seed",
    ],
    keywords: ["entropy", "firmware", "security", "random", "seed"],
    answer:
      "Entropy is the randomness used to generate keys and nonces. A good entropy source is essential for cryptographic security, especially on first boot.",
  },
  {
    id: "firmware-trng",
    category: "firmware",
    question: "What is a TRNG?",
    variations: [
      "True random number generator",
      "TRNG firmware",
      "Hardware random embedded",
      "Random source MCU",
    ],
    keywords: ["trng", "firmware", "random", "hardware", "security"],
    answer:
      "A TRNG, or True Random Number Generator, uses physical processes to produce randomness. It is preferred for cryptographic key generation over software-only generators.",
  },
  {
    id: "firmware-prng",
    category: "firmware",
    question: "What is a PRNG?",
    variations: [
      "Pseudo random generator",
      "PRNG firmware",
      "Software random embedded",
      "Seed random generator",
    ],
    keywords: ["prng", "firmware", "random", "seed", "security"],
    answer:
      "A PRNG, or Pseudo-Random Number Generator, produces deterministic sequences from a seed. It is not suitable for cryptography unless it is a cryptographically secure PRNG and properly seeded.",
  },
  {
    id: "firmware-csprng",
    category: "firmware",
    question: "What is a CSPRNG?",
    variations: [
      "Cryptographically secure PRNG",
      "CSPRNG firmware",
      "Secure random embedded",
      "Random for crypto",
    ],
    keywords: ["csprng", "firmware", "random", "crypto", "security"],
    answer:
      "A CSPRNG is a pseudo-random generator designed to be unpredictable enough for cryptographic use, provided it is seeded with sufficient entropy.",
  },
  {
    id: "firmware-seed",
    category: "firmware",
    question: "Why is seeding important for random numbers?",
    variations: [
      "Random seed firmware",
      "Seed entropy embedded",
      "Bad random seed",
      "Predictable random firmware",
    ],
    keywords: ["seed", "firmware", "random", "entropy", "security"],
    answer:
      "A predictable seed makes random output predictable. For security, seed from a high-entropy source. For non-security uses, a simpler seed may be acceptable.",
  },
  {
    id: "firmware-uniform",
    category: "firmware",
    question: "How do I get a uniform random number in a range?",
    variations: [
      "Random range firmware",
      "Uniform distribution embedded",
      "Avoid modulo bias",
      "Random number between",
    ],
    keywords: ["uniform", "random", "range", "firmware", "modulo"],
    answer:
      "Simple modulo can introduce bias if the range does not divide the generator's output space. Use rejection sampling or an appropriate library to get a uniform distribution.",
  },
  {
    id: "firmware-shuffle",
    category: "firmware",
    question: "How do I shuffle an array in firmware?",
    variations: [
      "Shuffle firmware",
      "Randomize order embedded",
      "Fisher-Yates firmware",
      "Randomize list code",
    ],
    keywords: ["shuffle", "firmware", "random", "array", "order"],
    answer:
      "A Fisher-Yates shuffle is a common method. It requires a random source and careful indexing. For security uses, a CSPRNG may be needed.",
  },
  {
    id: "firmware-uuid",
    category: "firmware",
    question: "How do I generate a UUID in firmware?",
    variations: [
      "UUID firmware",
      "Unique ID embedded",
      "Generate UUID MCU",
      "Random UUID device",
    ],
    keywords: ["uuid", "firmware", "unique", "identifier", "random"],
    answer:
      "UUIDs can be generated using random numbers or a combination of device identity and time. For security-sensitive use, a cryptographically secure random source is needed.",
  },
  {
    id: "firmware-unique-id",
    category: "firmware",
    question: "Does a microcontroller have a unique ID?",
    variations: [
      "MCU unique ID",
      "Device unique identifier",
      "Chip ID firmware",
      "Read unique ID",
    ],
    keywords: ["unique", "id", "firmware", "microcontroller", "device"],
    answer:
      "Many microcontrollers provide a unique device ID that can be read by firmware. It is useful for identification but may not be secret and should be combined with other factors for security.",
  },
  {
    id: "firmware-id-security",
    category: "firmware",
    question: "Can a unique ID be used as a secret?",
    variations: [
      "Unique ID secret",
      "Device ID security",
      "Use chip ID key",
      "Is unique ID secret",
    ],
    keywords: ["unique", "id", "secret", "firmware", "security"],
    answer:
      "A unique ID is generally not secret and may be readable. It should not be used alone as a cryptographic key or password without additional protection.",
  },
  {
    id: "firmware-derive-key",
    category: "firmware",
    question: "How do I derive a key from device identity?",
    variations: [
      "Derive key firmware",
      "Key derivation embedded",
      "HKDF firmware",
      "Generate key from ID",
    ],
    keywords: ["derive", "key", "firmware", "identity", "security"],
    answer:
      "Key derivation functions such as HKDF can derive keys from a secret and context. Using a unique ID alone is not sufficient unless combined with a secret.",
  },
  {
    id: "firmware-hkdf",
    category: "firmware",
    question: "What is HKDF?",
    variations: [
      "HKDF firmware",
      "Key derivation function",
      "HMAC based KDF",
      "Derive keys embedded",
    ],
    keywords: ["hkdf", "firmware", "key", "derivation", "security"],
    answer:
      "HKDF is an HMAC-based key derivation function used to derive cryptographic keys from a shared secret and context information.",
  },
  {
    id: "firmware-pbkdf2",
    category: "firmware",
    question: "What is PBKDF2?",
    variations: [
      "PBKDF2 firmware",
      "Password based key derivation",
      "Derive key from password",
      "Slow hash embedded",
    ],
    keywords: ["pbkdf2", "firmware", "password", "key", "security"],
    answer:
      "PBKDF2 derives a key from a password using repeated hashing and a salt. It slows down brute-force attempts but may be slow on constrained devices.",
  },
  {
    id: "firmware-salt",
    category: "firmware",
    question: "What is a salt?",
    variations: [
      "Salt firmware",
      "Password salt embedded",
      "Why use salt",
      "Random salt security",
    ],
    keywords: ["salt", "firmware", "password", "security", "hash"],
    answer:
      "A salt is random data added to a password before hashing. It prevents identical passwords from producing identical hashes and thwarts precomputed tables.",
  },
  {
    id: "firmware-hash-password",
    category: "firmware",
    question: "How should firmware store passwords?",
    variations: [
      "Store password firmware",
      "Hash password embedded",
      "Password storage security",
      "Never store plain password",
    ],
    keywords: ["password", "store", "firmware", "hash", "security"],
    answer:
      "Passwords should be stored as salted hashes, never in plain text. The hashing method should be appropriate for the threat model and device capabilities.",
  },
  {
    id: "firmware-constant-time",
    category: "firmware",
    question: "What is constant-time comparison?",
    variations: [
      "Constant time compare",
      "Timing attack firmware",
      "Secure compare code",
      "Avoid timing leak",
    ],
    keywords: ["constant", "time", "compare", "firmware", "security"],
    answer:
      "Constant-time comparison avoids timing differences that could leak secret information. It is important for comparing keys, MACs and passwords.",
  },
  {
    id: "firmware-timing-attack",
    category: "firmware",
    question: "What is a timing attack?",
    variations: [
      "Timing attack firmware",
      "Side channel timing",
      "Measure time to extract",
      "Constant time security",
    ],
    keywords: ["timing", "attack", "firmware", "security", "side"],
    answer:
      "A timing attack uses differences in execution time to infer secret information. Constant-time algorithms and careful implementation reduce the risk.",
  },
  {
    id: "firmware-side-channel",
    category: "firmware",
    question: "What is a side-channel attack?",
    variations: [
      "Side channel firmware",
      "Power analysis attack",
      "EM side channel",
      "Physical attack embedded",
    ],
    keywords: ["side", "channel", "firmware", "security", "attack"],
    answer:
      "A side-channel attack extracts secrets from physical characteristics such as power consumption, timing or electromagnetic emissions. Countermeasures include masking, shielding and careful implementation.",
  },
  {
    id: "firmware-fault-injection",
    category: "firmware",
    question: "What is fault injection?",
    variations: [
      "Fault injection firmware",
      "Glitch attack embedded",
      "Voltage glitch security",
      "Induce fault attack",
    ],
    keywords: ["fault", "injection", "firmware", "security", "attack"],
    answer:
      "Fault injection deliberately causes hardware faults, such as voltage or clock glitches, to bypass security. Countermeasures include sensors, redundancy and careful design.",
  },
  {
    id: "firmware-glitch",
    category: "firmware",
    question: "What is a voltage glitch attack?",
    variations: [
      "Voltage glitch firmware",
      "Power glitch security",
      "Bypass secure boot",
      "Glitch attack MCU",
    ],
    keywords: ["voltage", "glitch", "firmware", "security", "attack"],
    answer:
      "A voltage glitch attack momentarily disturbs the power supply to cause processor faults. It can bypass security checks if not protected against. Hardware countermeasures help.",
  },
  {
    id: "firmware-secure-boot-bypass",
    category: "firmware",
    question: "Can secure boot be bypassed?",
    variations: [
      "Bypass secure boot",
      "Secure boot attack",
      "Break secure boot",
      "Secure boot weakness",
    ],
    keywords: ["secure", "boot", "bypass", "firmware", "security"],
    answer:
      "Secure boot can potentially be bypassed through implementation flaws, side-channel attacks or hardware weaknesses. Proper design and testing reduce the risk.",
  },
  {
    id: "firmware-secure-debug",
    category: "firmware",
    question: "What is secure debug?",
    variations: [
      "Secure debug firmware",
      "Authenticated debug",
      "Debug access control",
      "Enable debug securely",
    ],
    keywords: ["secure", "debug", "firmware", "authentication", "access"],
    answer:
      "Secure debug allows authorized debug access while preventing unauthorized use, often using authentication or a challenge-response mechanism.",
  },
  {
    id: "firmware-debug-lock",
    category: "firmware",
    question: "How do I lock debug access?",
    variations: [
      "Debug lock firmware",
      "Disable JTAG production",
      "Lock SWD interface",
      "Protect debug port",
    ],
    keywords: ["debug", "lock", "firmware", "security", "interface"],
    answer:
      "Debug access can be locked by setting fuses, option bytes or security registers. The method depends on the microcontroller and should be part of production provisioning.",
  },
  {
    id: "firmware-unlock",
    category: "firmware",
    question: "Can a locked device be unlocked?",
    variations: [
      "Unlock firmware",
      "Recover locked MCU",
      "Unlock debug port",
      "Reset security fuses",
    ],
    keywords: ["unlock", "firmware", "security", "recover", "debug"],
    answer:
      "Some devices can be unlocked, often erasing protected memory in the process. Others require a full erase or are permanently locked. The behavior depends on the device.",
  },
  {
    id: "firmware-erase",
    category: "firmware",
    question: "What happens when a microcontroller is erased?",
    variations: [
      "Erase microcontroller",
      "Mass erase firmware",
      "Chip erase MCU",
      "Factory reset chip",
    ],
    keywords: ["erase", "firmware", "microcontroller", "reset", "memory"],
    answer:
      "A mass erase clears program and often protected memory, returning the device to a blank state. It may also unlock debug access on some devices.",
  },
  {
    id: "firmware-readout",
    category: "firmware",
    question: "What is readout protection?",
    variations: [
      "Readout protection firmware",
      "Prevent firmware read",
      "Flash protection MCU",
      "Read protection security",
    ],
    keywords: ["readout", "protection", "firmware", "security", "flash"],
    answer:
      "Readout protection prevents external tools from reading firmware from the device. It is a basic security measure but may be bypassed by sophisticated attacks.",
  },
  {
    id: "firmware-option-bytes",
    category: "firmware",
    question: "What are option bytes?",
    variations: [
      "Option bytes firmware",
      "STM32 option bytes",
      "Configuration bytes MCU",
      "Security option bytes",
    ],
    keywords: ["option", "bytes", "firmware", "configuration", "security"],
    answer:
      "Option bytes configure low-level device settings such as readout protection, boot mode and watchdog behavior. Incorrect settings can affect programming and operation.",
  },
  {
    id: "firmware-fuse-bits",
    category: "firmware",
    question: "What are fuse bits used for?",
    variations: [
      "Fuse bits firmware",
      "AVR fuses",
      "Configure microcontroller fuses",
      "Security fuses MCU",
    ],
    keywords: ["fuse", "bits", "firmware", "configuration", "security"],
    answer:
      "Fuse bits configure hardware options such as clock source, boot size and protection. They are set during programming and can affect device behavior and security.",
  },
  {
    id: "firmware-jtag-fuse",
    category: "firmware",
    question: "What is a JTAG disable fuse?",
    variations: [
      "Disable JTAG fuse",
      "JTAGEN fuse",
      "Turn off JTAG",
      "Debug fuse firmware",
    ],
    keywords: ["jtag", "fuse", "firmware", "disable", "security"],
    answer:
      "A JTAG disable fuse turns off the JTAG interface, often to free pins or improve security. Disabling it may require a high-voltage programmer to re-enable.",
  },
  {
    id: "firmware-spi-fuse",
    category: "firmware",
    question: "What is an SPI enable fuse?",
    variations: [
      "SPIEN fuse",
      "Enable SPI programming",
      "Serial programming fuse",
      "AVR SPI fuse",
    ],
    keywords: ["spi", "fuse", "firmware", "programming", "avr"],
    answer:
      "An SPI enable fuse allows serial programming through the SPI interface. If disabled, other programming methods may be required.",
  },
  {
    id: "firmware-bod-fuse",
    category: "firmware",
    question: "What is a brownout detection fuse?",
    variations: [
      "BOD fuse",
      "Brownout fuse AVR",
      "Enable brownout detection",
      "BODLEVEL fuse",
    ],
    keywords: ["bod", "fuse", "firmware", "brownout", "detection"],
    answer:
      "A brownout detection fuse enables or sets the brownout reset threshold. It helps prevent operation at unsafe voltages.",
  },
  {
    id: "firmware-ckdiv",
    category: "firmware",
    question: "What is CKDIV8?",
    variations: [
      "CKDIV8 fuse",
      "Clock divide by 8",
      "AVR clock fuse",
      "System clock prescaler",
    ],
    keywords: ["ckdiv8", "fuse", "firmware", "clock", "avr"],
    answer:
      "CKDIV8 is an AVR fuse that divides the system clock by 8 by default. Disabling it allows the full clock speed but may affect timing and power.",
  },
  {
    id: "firmware-clock-fuse",
    category: "firmware",
    question: "What is a clock source fuse?",
    variations: [
      "Clock fuse microcontroller",
      "Select clock source",
      "Internal external clock fuse",
      "CKSEL fuse",
    ],
    keywords: ["clock", "fuse", "firmware", "source", "microcontroller"],
    answer:
      "Clock source fuses select the oscillator or clock source used by the microcontroller. Incorrect settings can prevent the device from running or programming.",
  },
  {
    id: "firmware-boot-fuse",
    category: "firmware",
    question: "What is a boot size fuse?",
    variations: [
      "Boot fuse microcontroller",
      "Bootloader size fuse",
      "BOOTSZ fuse",
      "Boot section fuse",
    ],
    keywords: ["boot", "fuse", "firmware", "bootloader", "size"],
    answer:
      "Boot size fuses define the size of the bootloader section and reset vector location on some microcontrollers. They are important when using a bootloader.",
  },
  {
    id: "firmware-lock-fuse",
    category: "firmware",
    question: "What is a lock fuse?",
    variations: [
      "Lock fuse microcontroller",
      "Lock bits AVR",
      "Prevent flash read",
      "Firmware protection fuse",
    ],
    keywords: ["lock", "fuse", "firmware", "protection", "security"],
    answer:
      "Lock fuses or lock bits prevent reading or writing firmware. They are used to protect intellectual property but can be bypassed by advanced attacks.",
  },
  {
    id: "firmware-calibration-fuse",
    category: "firmware",
    question: "What is a calibration fuse?",
    variations: [
      "Calibration fuse AVR",
      "Internal oscillator calibration",
      "Factory calibration byte",
      "Calibration memory MCU",
    ],
    keywords: ["calibration", "fuse", "firmware", "oscillator", "factory"],
    answer:
      "Some microcontrollers store factory calibration values in a special memory area or fuse-like location. Firmware can read and use them for accurate timing or analog measurements.",
  },
  {
    id: "firmware-signature-row",
    category: "firmware",
    question: "What is a signature row?",
    variations: [
      "Signature row AVR",
      "Device signature memory",
      "Factory data MCU",
      "Calibration row firmware",
    ],
    keywords: ["signature", "row", "firmware", "calibration", "device"],
    answer:
      "A signature row contains factory data such as device ID, calibration values and serial number. It is read-only and can be used by firmware.",
  },
  {
    id: "firmware-user-row",
    category: "firmware",
    question: "What is a user row?",
    variations: [
      "User row AVR",
      "User signature memory",
      "Custom data MCU",
      "User row firmware",
    ],
    keywords: ["user", "row", "firmware", "memory", "data"],
    answer:
      "A user row is a small non-volatile memory area for user data, such as configuration or identification. It is separate from program flash.",
  },
  {
    id: "firmware-eeprom-emulation",
    category: "firmware",
    question: "How do I emulate EEPROM in flash?",
    variations: [
      "EEPROM emulation flash",
      "Flash emulated EEPROM",
      "Wear leveling EEPROM",
      "Store data without EEPROM",
    ],
    keywords: ["eeprom", "emulation", "flash", "firmware", "wear"],
    answer:
      "EEPROM can be emulated in flash using wear leveling and careful write patterns. This is useful when the microcontroller lacks dedicated EEPROM.",
  },
  {
    id: "firmware-flash-page",
    category: "firmware",
    question: "How does flash page programming work?",
    variations: [
      "Flash page firmware",
      "Write flash memory MCU",
      "Erase page flash",
      "Flash programming code",
    ],
    keywords: ["flash", "page", "firmware", "programming", "erase"],
    answer:
      "Flash is typically erased in pages and programmed in words or blocks. Firmware must respect alignment and timing requirements and avoid writing to the same location without erasing.",
  },
  {
    id: "firmware-flash-write",
    category: "firmware",
    question: "How do I write to flash in firmware?",
    variations: [
      "Write flash firmware",
      "Flash write code MCU",
      "Program flash from application",
      "Self programming flash",
    ],
    keywords: ["flash", "write", "firmware", "programming", "memory"],
    answer:
      "Flash write functions are provided by the microcontroller or libraries. The process typically involves unlocking, erasing, writing and verifying. Timing and interrupts may need to be managed.",
  },
  {
    id: "firmware-flash-latency",
    category: "firmware",
    question: "What is flash latency?",
    variations: [
      "Flash wait states",
      "Flash access time MCU",
      "Latency flash firmware",
      "Wait state configuration",
    ],
    keywords: ["flash", "latency", "wait", "states", "firmware"],
    answer:
      "Flash memory may require wait states at higher clock speeds. Firmware or startup code configures the number of wait states to ensure reliable operation.",
  },
  {
    id: "firmware-flash-cache",
    category: "firmware",
    question: "What is a flash cache?",
    variations: [
      "Flash cache MCU",
      "Instruction cache flash",
      "Prefetch buffer firmware",
      "Cache flash access",
    ],
    keywords: ["flash", "cache", "firmware", "memory", "speed"],
    answer:
      "Some microcontrollers include a cache or prefetch buffer to improve flash access speed. Understanding its behavior can help with performance tuning.",
  },
  {
    id: "firmware-flash-lock",
    category: "firmware",
    question: "How do I protect flash from writes?",
    variations: [
      "Flash lock firmware",
      "Protect flash memory",
      "Write protect flash",
      "Flash security firmware",
    ],
    keywords: ["flash", "lock", "protect", "firmware", "security"],
    answer:
      "Flash protection can be provided by hardware lock bits, memory protection units or secure boot. The available mechanisms depend on the microcontroller.",
  },
  {
    id: "firmware-flash-partition",
    category: "firmware",
    question: "What is flash partitioning?",
    variations: [
      "Flash partition firmware",
      "Partition table embedded",
      "Memory layout flash",
      "Application data partition",
    ],
    keywords: ["flash", "partition", "firmware", "layout", "memory"],
    answer:
      "Flash partitioning divides flash memory into regions for bootloader, application, configuration and data. The layout should be planned for updates and future growth.",
  },
  {
    id: "firmware-partition-table",
    category: "firmware",
    question: "What is a partition table?",
    variations: [
      "Partition table ESP32",
      "Flash partition table",
      "Memory partition embedded",
      "Partition layout firmware",
    ],
    keywords: ["partition", "table", "firmware", "flash", "layout"],
    answer:
      "A partition table describes the location and size of flash regions. It is used by bootloaders and update systems to manage firmware and data.",
  },
  {
    id: "firmware-ota-partition",
    category: "firmware",
    question: "How do OTA partitions work?",
    variations: [
      "OTA partition firmware",
      "Update partition embedded",
      "A/B partition OTA",
      "OTA flash layout",
    ],
    keywords: ["ota", "partition", "firmware", "update", "flash"],
    answer:
      "OTA partitions store current and updated firmware images. The bootloader selects which image to run, often supporting rollback if the update fails.",
  },
  {
    id: "firmware-factory-partition",
    category: "firmware",
    question: "What is a factory partition?",
    variations: [
      "Factory partition firmware",
      "Recovery partition embedded",
      "Original firmware partition",
      "Fallback partition",
    ],
    keywords: ["factory", "partition", "firmware", "recovery", "fallback"],
    answer:
      "A factory partition may hold the original or recovery firmware image. It can be used to restore the device if updates fail.",
  },
  {
    id: "firmware-nvs",
    category: "firmware",
    question: "What is NVS in ESP32?",
    variations: [
      "NVS ESP32",
      "Non volatile storage ESP32",
      "Key value storage firmware",
      "NVS partition",
    ],
    keywords: ["nvs", "esp32", "firmware", "storage", "partition"],
    answer:
      "NVS, or Non-Volatile Storage, is a key-value storage system in ESP32. It stores configuration and calibration data in flash with wear leveling.",
  },
  {
    id: "firmware-preferences",
    category: "firmware",
    question: "How do I store preferences in Arduino?",
    variations: [
      "Arduino preferences library",
      "Store settings ESP32",
      "Preferences firmware",
      "Save config Arduino",
    ],
    keywords: ["preferences", "arduino", "firmware", "storage", "settings"],
    answer:
      "The Preferences library on ESP32 and similar platforms provides a simple key-value API for storing settings in non-volatile storage.",
  },
  {
    id: "firmware-spiffs",
    category: "firmware",
    question: "What is SPIFFS?",
    variations: [
      "SPIFFS ESP32",
      "Flash file system ESP",
      "SPIFFS vs LittleFS",
      "File system firmware",
    ],
    keywords: ["spiffs", "firmware", "file", "system", "flash"],
    answer:
      "SPIFFS is a file system for SPI flash memory, often used on ESP8266 and ESP32. It has been largely replaced by LittleFS due to limitations in wear leveling and reliability.",
  },
  {
    id: "firmware-file-system",
    category: "firmware",
    question: "How do I use a file system in firmware?",
    variations: [
      "File system firmware",
      "Read write files embedded",
      "File system MCU",
      "Storage files microcontroller",
    ],
    keywords: ["file", "system", "firmware", "storage", "embedded"],
    answer:
      "File systems such as LittleFS, FatFS or SPIFFS provide file operations on flash or SD cards. They handle storage organization, directories and file access.",
  },
  {
    id: "firmware-directory",
    category: "firmware",
    question: "Can firmware use directories?",
    variations: [
      "Directory firmware",
      "Folder structure embedded",
      "Create folder MCU",
      "Organize files embedded",
    ],
    keywords: ["directory", "firmware", "folder", "files", "structure"],
    answer:
      "Some file systems support directories, while others use a flat structure. The available features depend on the file system and storage.",
  },
  {
    id: "firmware-web-assets",
    category: "firmware",
    question: "How do I store web assets in firmware?",
    variations: [
      "Web assets ESP32",
      "Store HTML CSS firmware",
      "Embed web files",
      "SPIFFS web server",
    ],
    keywords: ["web", "assets", "firmware", "html", "css", "storage"],
    answer:
      "Web assets such as HTML, CSS and JavaScript can be stored in flash or a file system and served by the device's web server. Compression and caching may reduce storage and bandwidth.",
  },
  {
    id: "firmware-compression",
    category: "firmware",
    question: "Can firmware use compression?",
    variations: [
      "Compression firmware",
      "Compress data embedded",
      "Minify web assets",
      "Reduce firmware size compression",
    ],
    keywords: ["compression", "firmware", "data", "size", "storage"],
    answer:
      "Compression can reduce storage and transmission size but requires processing and memory. Common uses include web assets, logs and firmware updates.",
  },
  {
    id: "firmware-encryption-storage",
    category: "firmware",
    question: "How do I encrypt stored data in firmware?",
    variations: [
      "Encrypt stored data firmware",
      "Secure storage encryption",
      "Protect files embedded",
      "Data at rest encryption",
    ],
    keywords: ["encryption", "storage", "firmware", "data", "security"],
    answer:
      "Stored data can be encrypted using symmetric algorithms. Keys must be protected, and the system should handle initialization vectors and integrity.",
  },
  {
    id: "firmware-integrity-storage",
    category: "firmware",
    question: "How do I ensure stored data integrity?",
    variations: [
      "Data integrity firmware",
      "Checksum stored data",
      "CRC storage",
      "Detect data corruption",
    ],
    keywords: ["integrity", "storage", "firmware", "checksum", "crc"],
    answer:
      "Use checksums, CRCs or hashes to detect corruption. For security, use cryptographic hashes or message authentication codes.",
  },
  {
    id: "firmware-journaling",
    category: "firmware",
    question: "What is journaling in firmware storage?",
    variations: [
      "Journaling file system",
      "Power loss safe storage",
      "Atomic file update",
      "Journal firmware",
    ],
    keywords: ["journaling", "firmware", "storage", "power", "loss"],
    answer:
      "Journaling records changes before applying them, allowing recovery after power loss or corruption. It improves storage reliability.",
  },
  {
    id: "firmware-atomic-write",
    category: "firmware",
    question: "What is an atomic write?",
    variations: [
      "Atomic write firmware",
      "Safe file update",
      "Power loss safe write",
      "All or nothing write",
    ],
    keywords: ["atomic", "write", "firmware", "power", "safe"],
    answer:
      "An atomic write either completes fully or not at all, preventing partial or corrupted data. Techniques include journaling, copy-on-write and dual-bank storage.",
  },
  {
    id: "firmware-double-buffer",
    category: "firmware",
    question: "What is double buffering in firmware?",
    variations: [
      "Double buffer firmware",
      "Ping pong buffer",
      "Two buffers embedded",
      "Avoid tearing display",
    ],
    keywords: ["double", "buffer", "firmware", "ping", "pong"],
    answer:
      "Double buffering uses two buffers, one being filled or processed while the other is in use. It avoids tearing and improves performance.",
  },
  {
    id: "firmware-ring-buffer-interrupt",
    category: "firmware",
    question: "How do I use a ring buffer with interrupts?",
    variations: [
      "Ring buffer interrupt firmware",
      "Lock free buffer",
      "Producer consumer embedded",
      "Safe buffer ISR",
    ],
    keywords: ["ring", "buffer", "interrupt", "firmware", "safe"],
    answer:
      "A ring buffer can be shared between an ISR and main code if head and tail indices are handled carefully. Volatile and atomic access may be needed for safety.",
  },
  {
    id: "firmware-lockfree",
    category: "firmware",
    question: "What is a lock-free data structure?",
    variations: [
      "Lock free firmware",
      "Wait free structure",
      "Atomic data structure embedded",
      "Concurrent safe code",
    ],
    keywords: ["lockfree", "firmware", "atomic", "concurrent", "data"],
    answer:
      "Lock-free structures use atomic operations instead of locks, avoiding priority inversion and deadlock. They can be complex to implement correctly.",
  },
  {
    id: "firmware-atomic-operation",
    category: "firmware",
    question: "How do I perform atomic operations in firmware?",
    variations: [
      "Atomic operation firmware",
      "Critical section embedded",
      "Disable interrupts atomic",
      "Atomic access MCU",
    ],
    keywords: ["atomic", "operation", "firmware", "critical", "section"],
    answer:
      "Atomic operations can use special instructions, disabling interrupts briefly or using RTOS primitives. They ensure that a value is accessed without interruption.",
  },
  {
    id: "firmware-memory-barrier",
    category: "firmware",
    question: "What is a memory barrier?",
    variations: [
      "Memory barrier firmware",
      "Compiler barrier embedded",
      "Ordering memory access",
      "Fence instruction",
    ],
    keywords: ["memory", "barrier", "firmware", "ordering", "compiler"],
    answer:
      "A memory barrier prevents the compiler or processor from reordering memory accesses across the barrier. It is important in concurrent and hardware access code.",
  },
  {
    id: "firmware-dmb",
    category: "firmware",
    question: "What is a DMB instruction?",
    variations: [
      "DMB ARM barrier",
      "Data memory barrier",
      "Memory ordering ARM",
      "DMB firmware",
    ],
    keywords: ["dmb", "arm", "barrier", "memory", "firmware"],
    answer:
      "DMB, or Data Memory Barrier, is an ARM instruction that ensures memory accesses before the barrier complete before those after it, in program order.",
  },
  {
    id: "firmware-dsb",
    category: "firmware",
    question: "What is a DSB instruction?",
    variations: [
      "DSB ARM barrier",
      "Data synchronization barrier",
      "Memory barrier ARM",
      "DSB firmware",
    ],
    keywords: ["dsb", "arm", "barrier", "firmware", "memory"],
    answer:
      "DSB, or Data Synchronization Barrier, ensures all previous memory accesses complete before continuing. It is used for hardware synchronization.",
  },
  {
    id: "firmware-isb",
    category: "firmware",
    question: "What is an ISB instruction?",
    variations: [
      "ISB ARM barrier",
      "Instruction synchronization barrier",
      "Flush pipeline ARM",
      "ISB firmware",
    ],
    keywords: ["isb", "arm", "barrier", "firmware", "instruction"],
    answer:
      "ISB, or Instruction Synchronization Barrier, flushes the pipeline and ensures subsequent instructions are fetched after the barrier. It is used after changing system configuration.",
  },
  {
    id: "firmware-memory-ordering",
    category: "firmware",
    question: "Why does memory ordering matter in firmware?",
    variations: [
      "Memory ordering firmware",
      "Compiler reordering embedded",
      "Volatile memory access",
      "Ordering hardware registers",
    ],
    keywords: ["memory", "ordering", "firmware", "compiler", "volatile"],
    answer:
      "Compilers and processors can reorder memory accesses for performance. This can cause problems when accessing hardware registers or sharing data. Volatile, barriers and atomic operations control ordering.",
  },
  {
    id: "firmware-volatile-register",
    category: "firmware",
    question: "Why use volatile for hardware registers?",
    variations: [
      "Volatile hardware register",
      "Register access volatile",
      "Why volatile GPIO",
      "Memory mapped volatile",
    ],
    keywords: ["volatile", "hardware", "register", "firmware", "gpio"],
    answer:
      "Hardware registers can change outside program control, so volatile prevents the compiler from optimizing away or reordering accesses. It does not provide atomicity or memory barriers by itself.",
  },
  {
    id: "firmware-register-access",
    category: "firmware",
    question: "How do I access hardware registers in firmware?",
    variations: [
      "Access hardware register",
      "Memory mapped IO firmware",
      "Read write register MCU",
      "Register access code",
    ],
    keywords: ["register", "access", "firmware", "memory", "mapped"],
    answer:
      "Hardware registers are accessed through memory-mapped addresses, often defined by the device header. Use volatile pointers and follow the device access rules.",
  },
  {
    id: "firmware-bit-mask",
    category: "firmware",
    question: "How do I set and clear bits in a register?",
    variations: [
      "Set clear bit register",
      "Bit manipulation firmware",
      "Register bitmask",
      "Toggle bit MCU",
    ],
    keywords: ["bit", "mask", "register", "firmware", "set", "clear"],
    answer:
      "Set bits with |=, clear bits with &= ~mask and toggle with ^=. Always use masks to avoid changing unrelated bits.",
  },
  {
    id: "firmware-read-modify-write",
    category: "firmware",
    question: "What is read-modify-write in firmware?",
    variations: [
      "Read modify write register",
      "RMW firmware",
      "Why is RMW risky",
      "Atomic bit set register",
    ],
    keywords: ["read", "modify", "write", "firmware", "register"],
    answer:
      "Read-modify-write reads a register, changes some bits and writes it back. It can be unsafe if interrupts or other code modify the same register between read and write.",
  },
  {
    id: "firmware-interrupt-safe-register",
    category: "firmware",
    question: "How do I safely modify a register shared with an ISR?",
    variations: [
      "Shared register ISR",
      "Protect register access",
      "Disable interrupt register",
      "Atomic register update",
    ],
    keywords: ["register", "interrupt", "safe", "firmware", "shared"],
    answer:
      "Use atomic access, disable interrupts briefly during the read-modify-write or use hardware features such as bit-band or set/clear registers.",
  },
  {
    id: "firmware-bit-band",
    category: "firmware",
    question: "What is bit-banding?",
    variations: [
      "Bit banding ARM",
      "Atomic bit access",
      "Bit band firmware",
      "Set bit without RMW",
    ],
    keywords: ["bit", "banding", "arm", "firmware", "atomic"],
    answer:
      "Bit-banding maps individual bits to 32-bit words so they can be accessed atomically. It is supported on some ARM Cortex-M devices.",
  },
  {
    id: "firmware-gpio-set-clear",
    category: "firmware",
    question: "How do I set and clear GPIO atomically?",
    variations: [
      "Atomic GPIO firmware",
      "GPIO set clear register",
      "BSRR register",
      "Toggle GPIO safely",
    ],
    keywords: ["gpio", "atomic", "set", "clear", "firmware"],
    answer:
      "Many microcontrollers provide set and clear registers (such as BSRR) that allow atomic GPIO changes without read-modify-write.",
  },
  {
    id: "firmware-gpio-toggle",
    category: "firmware",
    question: "How do I toggle a GPIO quickly?",
    variations: [
      "Toggle GPIO firmware",
      "Fast pin toggle",
      "GPIO XOR register",
      "Blink LED fast",
    ],
    keywords: ["gpio", "toggle", "firmware", "fast", "pin"],
    answer:
      "GPIO can be toggled by writing to the appropriate output register or using a dedicated toggle register if available. Direct register access is faster than high-level functions.",
  },
  {
    id: "firmware-gpio-speed",
    category: "firmware",
    question: "How fast can I toggle a GPIO in firmware?",
    variations: [
      "GPIO speed firmware",
      "Maximum toggle rate",
      "Pin speed MCU",
      "Toggle frequency GPIO",
    ],
    keywords: ["gpio", "speed", "firmware", "toggle", "frequency"],
    answer:
      "GPIO toggle speed depends on the microcontroller, clock speed, code efficiency and output driver. Direct register writes in a tight loop achieve the highest rates, limited by the GPIO and bus.",
  },
  {
    id: "firmware-gpio-slew",
    category: "firmware",
    question: "What is GPIO slew rate control?",
    variations: [
      "GPIO slew rate",
      "Pin drive strength firmware",
      "Output speed setting",
      "Reduce EMI GPIO",
    ],
    keywords: ["gpio", "slew", "rate", "firmware", "drive"],
    answer:
      "Some microcontrollers allow GPIO slew rate or drive strength to be configured. Slower edges reduce EMI but may limit high-speed signaling.",
  },
  {
    id: "firmware-gpio-drive",
    category: "firmware",
    question: "What is GPIO drive strength?",
    variations: [
      "GPIO drive strength",
      "Pin current capability",
      "Output driver firmware",
      "GPIO source sink current",
    ],
    keywords: ["gpio", "drive", "strength", "firmware", "current"],
    answer:
      "GPIO drive strength indicates how much current a pin can source or sink. It must be considered when driving LEDs, capacitive loads or other circuits.",
  },
  {
    id: "firmware-gpio-protection",
    category: "firmware",
    question: "How do I protect GPIO pins?",
    variations: [
      "Protect GPIO firmware",
      "GPIO overvoltage",
      "Pin protection circuit",
      "Safe GPIO design",
    ],
    keywords: ["gpio", "protection", "firmware", "overvoltage", "circuit"],
    answer:
      "GPIO protection can include series resistors, clamping diodes, TVS devices and level shifting. The correct protection depends on the expected voltages and environment.",
  },
  {
    id: "firmware-adc-noise",
    category: "firmware",
    question: "Why is my ADC reading noisy?",
    variations: [
      "ADC noise firmware",
      "Noisy analog reading",
      "ADC unstable MCU",
      "Reduce ADC noise",
    ],
    keywords: ["adc", "noise", "firmware", "reading", "filter"],
    answer:
      "ADC noise can come from power supply, ground, input impedance, reference noise or digital activity. Filtering, averaging, decoupling and careful layout help reduce it.",
  },
  {
    id: "firmware-adc-oversampling",
    category: "firmware",
    question: "What is ADC oversampling?",
    variations: [
      "Oversampling ADC",
      "Increase ADC resolution",
      "Average ADC samples",
      "Oversampling firmware",
    ],
    keywords: ["adc", "oversampling", "firmware", "resolution", "average"],
    answer:
      "Oversampling takes multiple ADC readings and averages them to improve resolution and reduce noise, at the cost of speed and processing.",
  },
  {
    id: "firmware-adc-calibration",
    category: "firmware",
    question: "How do I calibrate an ADC?",
    variations: [
      "ADC calibration firmware",
      "Calibrate analog reading",
      "ADC accuracy improve",
      "Two point ADC calibration",
    ],
    keywords: ["adc", "calibration", "firmware", "accuracy", "analog"],
    answer:
      "ADC calibration can correct offset and gain errors using known reference voltages. Some microcontrollers provide internal calibration values.",
  },
  {
    id: "firmware-adc-reference",
    category: "firmware",
    question: "What ADC reference should I use?",
    variations: [
      "ADC reference voltage",
      "Internal vs external reference",
      "Vref ADC firmware",
      "Choose ADC reference",
    ],
    keywords: ["adc", "reference", "firmware", "voltage", "vref"],
    answer:
      "The ADC reference sets the measurement range and accuracy. Internal references are convenient; external references can be more accurate or stable. The choice depends on the required precision.",
  },
  {
    id: "firmware-adc-input",
    category: "firmware",
    question: "Why does ADC input impedance matter?",
    variations: [
      "ADC input impedance",
      "High impedance sensor ADC",
      "Source impedance firmware",
      "ADC sampling time",
    ],
    keywords: ["adc", "input", "impedance", "firmware", "sensor"],
    answer:
      "High source impedance can prevent the ADC sampling capacitor from charging fully, causing inaccurate readings. Buffering, longer sampling time or a lower impedance source may be needed.",
  },
  {
    id: "firmware-dac-output",
    category: "firmware",
    question: "How do I generate an analog output in firmware?",
    variations: [
      "DAC firmware",
      "Analog output MCU",
      "Generate voltage firmware",
      "PWM as analog output",
    ],
    keywords: ["dac", "output", "firmware", "analog", "pwm"],
    answer:
      "A DAC provides a true analog output. If unavailable, PWM with filtering can approximate an analog voltage for some applications.",
  },
  {
    id: "firmware-pwm-frequency",
    category: "firmware",
    question: "How do I choose PWM frequency?",
    variations: [
      "PWM frequency selection",
      "Best PWM frequency",
      "Motor PWM frequency",
      "LED PWM frequency",
    ],
    keywords: ["pwm", "frequency", "firmware", "motor", "led"],
    answer:
      "PWM frequency depends on the load and application. Motors often use a few kHz to tens of kHz; LEDs can use higher frequencies to avoid visible flicker. Audible noise and switching losses should also be considered.",
  },
  {
    id: "firmware-pwm-resolution",
    category: "firmware",
    question: "What is PWM resolution?",
    variations: [
      "PWM resolution bits",
      "PWM steps firmware",
      "Duty cycle resolution",
      "10 bit PWM",
    ],
    keywords: ["pwm", "resolution", "firmware", "duty", "bits"],
    answer:
      "PWM resolution is the number of steps available for the duty cycle, often 8 or 10 bits. Higher resolution allows finer control but may require lower frequency.",
  },
  {
    id: "firmware-pwm-duty",
    category: "firmware",
    question: "What is PWM duty cycle?",
    variations: [
      "Duty cycle firmware",
      "PWM percentage",
      "On time PWM",
      "Change duty cycle",
    ],
    keywords: ["pwm", "duty", "cycle", "firmware", "percentage"],
    answer:
      "The duty cycle is the proportion of time the PWM signal is on. It determines the average output power for loads such as LEDs and motors.",
  },
  {
    id: "firmware-pwm-complementary",
    category: "firmware",
    question: "What is complementary PWM?",
    variations: [
      "Complementary PWM firmware",
      "Dead time PWM",
      "H bridge PWM",
      "Advanced timer PWM",
    ],
    keywords: ["pwm", "complementary", "firmware", "dead", "time"],
    answer:
      "Complementary PWM outputs two signals with opposite polarity, often with dead time to prevent shoot-through in bridge circuits. It is common in motor control.",
  },
  {
    id: "firmware-pwm-deadtime",
    category: "firmware",
    question: "What is dead time in PWM?",
    variations: [
      "Dead time PWM",
      "Prevent shoot through",
      "H bridge dead time",
      "Deadtime firmware",
    ],
    keywords: ["pwm", "dead", "time", "firmware", "bridge"],
    answer:
      "Dead time is a brief delay between turning off one switch and turning on another in a bridge circuit. It prevents shoot-through current.",
  },
  {
    id: "firmware-pwm-sync",
    category: "firmware",
    question: "How do I synchronize multiple PWM channels?",
    variations: [
      "Synchronize PWM firmware",
      "Sync timers",
      "Multiple PWM channels",
      "Timer synchronization",
    ],
    keywords: ["pwm", "synchronize", "firmware", "timers", "channels"],
    answer:
      "Timers can be synchronized using master-slave configuration or a common trigger. This ensures PWM channels maintain a fixed phase relationship.",
  },
  {
    id: "firmware-pwm-phase",
    category: "firmware",
    question: "What is PWM phase control?",
    variations: [
      "PWM phase firmware",
      "Phase shift PWM",
      "Phase correct PWM",
      "Adjust PWM phase",
    ],
    keywords: ["pwm", "phase", "firmware", "shift", "control"],
    answer:
      "Phase control adjusts the timing relationship between PWM signals. It can reduce EMI, improve efficiency in multiphase systems or control bridge circuits.",
  },
  {
    id: "firmware-timer-prescaler",
    category: "firmware",
    question: "What is a timer prescaler?",
    variations: [
      "Timer prescaler firmware",
      "Set prescaler MCU",
      "Timer clock division",
      "Prescaler calculation",
    ],
    keywords: ["timer", "prescaler", "firmware", "clock", "division"],
    answer:
      "A prescaler divides the timer input clock to produce the desired counting rate. It allows a wide range of periods from a fixed clock.",
  },
  {
    id: "firmware-timer-period",
    category: "firmware",
    question: "How do I calculate timer period?",
    variations: [
      "Timer period formula",
      "Calculate timer frequency",
      "Timer count value",
      "Period register firmware",
    ],
    keywords: ["timer", "period", "firmware", "frequency", "calculation"],
    answer:
      "Timer period = (prescaler × (period + 1)) / timer clock. The exact formula depends on the timer mode and counting behavior.",
  },
  {
    id: "firmware-timer-overflow",
    category: "firmware",
    question: "What is timer overflow?",
    variations: [
      "Timer overflow firmware",
      "Counter wrap around",
      "Overflow interrupt timer",
      "Timer rollover",
    ],
    keywords: ["timer", "overflow", "firmware", "interrupt", "wrap"],
    answer:
      "Timer overflow occurs when the counter reaches its maximum and wraps to zero. It can generate an interrupt and is used for periodic timing.",
  },
  {
    id: "firmware-timer-interrupt",
    category: "firmware",
    question: "How do I use a timer interrupt?",
    variations: [
      "Timer interrupt firmware",
      "Periodic interrupt MCU",
      "Set timer ISR",
      "Timer callback",
    ],
    keywords: ["timer", "interrupt", "firmware", "periodic", "isr"],
    answer:
      "Configure the timer period, enable the interrupt and write a short handler. Timer interrupts are useful for periodic tasks, sampling and control loops.",
  },
  {
    id: "firmware-timer-callback",
    category: "firmware",
    question: "What is a timer callback?",
    variations: [
      "Timer callback firmware",
      "Callback on timer",
      "Function called by timer",
      "Timer event handler",
    ],
    keywords: ["timer", "callback", "firmware", "function", "event"],
    answer:
      "A timer callback is a function called when a timer event occurs. It allows periodic or delayed execution without blocking the main loop.",
  },
  {
    id: "firmware-software-timer",
    category: "firmware",
    question: "What is a software timer?",
    variations: [
      "Software timer firmware",
      "Virtual timer embedded",
      "millis timer",
      "Software timer library",
    ],
    keywords: ["software", "timer", "firmware", "virtual", "millis"],
    answer:
      "A software timer uses a hardware time base, such as a tick or millis counter, to manage multiple timeouts without dedicated hardware timers.",
  },
  {
    id: "firmware-timeout-manager",
    category: "firmware",
    question: "How do I manage multiple timeouts in firmware?",
    variations: [
      "Multiple timeouts firmware",
      "Timeout manager embedded",
      "Track several timers",
      "Non blocking timeouts",
    ],
    keywords: ["timeout", "manager", "firmware", "timers", "nonblocking"],
    answer:
      "A timeout manager stores start times and durations for multiple events and checks them in the main loop or a timer tick. It avoids blocking delays.",
  },
  {
    id: "firmware-elapsed",
    category: "firmware",
    question: "How do I measure elapsed time in firmware?",
    variations: [
      "Elapsed time firmware",
      "Measure duration embedded",
      "Time difference millis",
      "Stopwatch code MCU",
    ],
    keywords: ["elapsed", "time", "firmware", "measure", "duration"],
    answer:
      "Record the start time using a timer or counter, then compute the difference at the end. Handle counter overflow if the interval can exceed the counter range.",
  },
  {
    id: "firmware-overflow-time",
    category: "firmware",
    question: "How do I handle timer overflow in time calculations?",
    variations: [
      "Timer overflow time",
      "millis overflow",
      "Counter rollover handling",
      "Wrap around time firmware",
    ],
    keywords: ["overflow", "timer", "firmware", "wrap", "time"],
    answer:
      "Use unsigned arithmetic for time differences; it handles wraparound correctly if the interval is less than half the counter range. Alternatively, use a wider counter or track overflows.",
  },
  {
    id: "firmware-rtc-overflow",
    category: "firmware",
    question: "What is the Year 2038 problem?",
    variations: [
      "Year 2038 firmware",
      "32 bit time overflow",
      "Unix time overflow embedded",
      "2038 problem MCU",
    ],
    keywords: ["2038", "time", "overflow", "firmware", "unix"],
    answer:
      "32-bit signed Unix time overflows in January 2038. Embedded devices using 32-bit time may need 64-bit time or a different representation to avoid problems.",
  },
  {
    id: "firmware-leap-second",
    category: "firmware",
    question: "How does firmware handle leap seconds?",
    variations: [
      "Leap second firmware",
      "Time correction embedded",
      "UTC leap second",
      "Handle leap seconds",
    ],
    keywords: ["leap", "second", "firmware", "time", "utc"],
    answer:
      "Leap seconds are occasional one-second adjustments to UTC. Many embedded systems ignore them or handle them through time synchronization. Applications needing precise time should consider them.",
  },
  {
    id: "firmware-gps-time",
    category: "firmware",
    question: "How do I get precise time from GPS?",
    variations: [
      "GPS time firmware",
      "PPS GPS",
      "Accurate time GPS",
      "GPS time sync",
    ],
    keywords: ["gps", "time", "firmware", "precise", "pps"],
    answer:
      "GPS provides time and often a pulse-per-second (PPS) signal for precise synchronization. Firmware can use these to set and discipline the system clock.",
  },
  {
    id: "firmware-pps",
    category: "firmware",
    question: "What is PPS in firmware?",
    variations: [
      "Pulse per second firmware",
      "PPS GPS time",
      "1PPS interrupt",
      "Precise timing PPS",
    ],
    keywords: ["pps", "pulse", "second", "firmware", "timing"],
    answer:
      "PPS, or Pulse Per Second, is a signal that provides a precise timing reference, often from GPS. Firmware can use it to synchronize clocks with high accuracy.",
  },
  {
    id: "firmware-time-discipline",
    category: "firmware",
    question: "What is clock discipline?",
    variations: [
      "Clock discipline firmware",
      "Adjust clock drift",
      "Synchronize RTC",
      "Time correction firmware",
    ],
    keywords: ["clock", "discipline", "firmware", "drift", "synchronize"],
    answer:
      "Clock discipline adjusts the system clock to compensate for drift and align with an external time reference. It is used in precise timekeeping systems.",
  },
  {
    id: "firmware-oscillator-drift",
    category: "firmware",
    question: "Why does an RTC drift?",
    variations: [
      "RTC drift firmware",
      "Crystal accuracy",
      "Clock drift causes",
      "Compensate RTC drift",
    ],
    keywords: ["rtc", "drift", "firmware", "crystal", "accuracy"],
    answer:
      "RTC drift is caused by crystal tolerance, temperature changes and aging. Temperature compensation and periodic synchronization reduce it.",
  },
  {
    id: "firmware-temperature-compensation",
    category: "firmware",
    question: "How do I compensate for temperature in firmware?",
    variations: [
      "Temperature compensation firmware",
      "Compensate sensor temperature",
      "Calibration by temperature",
      "Temperature correction",
    ],
    keywords: [
      "temperature",
      "compensation",
      "firmware",
      "calibration",
      "sensor",
    ],
    answer:
      "Temperature compensation applies corrections based on measured temperature. It can use a polynomial, lookup table or calibration data specific to the device.",
  },
  {
    id: "firmware-aging-compensation",
    category: "firmware",
    question: "What is aging compensation?",
    variations: [
      "Aging compensation firmware",
      "Component aging correction",
      "Compensate aging sensor",
      "Long term drift firmware",
    ],
    keywords: ["aging", "compensation", "firmware", "drift", "long"],
    answer:
      "Aging compensation corrects for gradual changes in component characteristics over time. It may use periodic recalibration or stored aging models.",
  },
  {
    id: "firmware-self-test",
    category: "firmware",
    question: "How do I implement a self-test in firmware?",
    variations: [
      "Self test firmware",
      "Built in test embedded",
      "Startup test code",
      "Diagnostic self test",
    ],
    keywords: ["self", "test", "firmware", "diagnostic", "startup"],
    answer:
      "A self-test checks hardware and software functions, such as memory, sensors, outputs and communication. Results can be reported and used to prevent operation if critical faults are found.",
  },
  {
    id: "firmware-built-in-test",
    category: "firmware",
    question: "What is built-in test?",
    variations: [
      "Built in test firmware",
      "BIT embedded",
      "Continuous built in test",
      "System self test",
    ],
    keywords: ["built", "test", "firmware", "diagnostic", "continuous"],
    answer:
      "Built-in test is diagnostic capability included in the system, either at startup or continuously during operation. It helps detect faults and improve maintainability.",
  },
  {
    id: "firmware-post",
    category: "firmware",
    question: "What is POST in firmware?",
    variations: [
      "Power on self test",
      "POST embedded",
      "Startup test firmware",
      "Boot diagnostics",
    ],
    keywords: ["post", "power", "self", "test", "firmware"],
    answer:
      "POST, or Power-On Self-Test, runs at startup to verify basic hardware and software functions before normal operation.",
  },
  {
    id: "firmware-continuous-test",
    category: "firmware",
    question: "What is continuous self-test?",
    variations: [
      "Continuous self test firmware",
      "Runtime diagnostics embedded",
      "Background test MCU",
      "Online test firmware",
    ],
    keywords: ["continuous", "self", "test", "firmware", "runtime"],
    answer:
      "Continuous self-test monitors system health during operation, often in the background. It can detect faults that occur after startup.",
  },
  {
    id: "firmware-heartbeat",
    category: "firmware",
    question: "What is a heartbeat in firmware?",
    variations: [
      "Heartbeat firmware",
      "Alive signal embedded",
      "Periodic status message",
      "Heartbeat LED",
    ],
    keywords: ["heartbeat", "firmware", "alive", "signal", "status"],
    answer:
      "A heartbeat is a periodic signal or message indicating that the system is running. It can be a blinking LED, a network message or a watchdog service.",
  },
  {
    id: "firmware-status-led",
    category: "firmware",
    question: "How do I use status LEDs in firmware?",
    variations: [
      "Status LED firmware",
      "Blink patterns embedded",
      "LED indicators code",
      "Diagnostic LED",
    ],
    keywords: ["status", "led", "firmware", "blink", "indicator"],
    answer:
      "Status LEDs can indicate power, activity, errors or states using patterns. Firmware controls them, and patterns should be documented for troubleshooting.",
  },
  {
    id: "firmware-error-code-blink",
    category: "firmware",
    question: "How do I blink an error code?",
    variations: [
      "Blink error code firmware",
      "LED error patterns",
      "Diagnostic blink code",
      "Flash error code",
    ],
    keywords: ["blink", "error", "code", "firmware", "led"],
    answer:
      "Blink error codes use patterns of flashes to indicate specific faults. The pattern should be defined and documented for field diagnosis.",
  },
  {
    id: "firmware-beep-code",
    category: "firmware",
    question: "How do I use beep codes in firmware?",
    variations: [
      "Beep code firmware",
      "Buzzer error patterns",
      "Audio diagnostic code",
      "Sound error indication",
    ],
    keywords: ["beep", "code", "firmware", "buzzer", "diagnostic"],
    answer:
      "Beep codes use patterns of sounds to indicate status or errors. They are useful when visual indicators are not visible.",
  },
  {
    id: "firmware-display-error",
    category: "firmware",
    question: "How do I display errors on a screen?",
    variations: [
      "Display error firmware",
      "Error message screen",
      "Show fault code display",
      "Diagnostic display",
    ],
    keywords: ["display", "error", "firmware", "message", "screen"],
    answer:
      "Firmware can show error messages or codes on the display. Messages should be clear and, where possible, suggest corrective action.",
  },
  {
    id: "firmware-log-error",
    category: "firmware",
    question: "How do I log errors in firmware?",
    variations: [
      "Log error firmware",
      "Error logging embedded",
      "Store fault history",
      "Diagnostic log code",
    ],
    keywords: ["log", "error", "firmware", "storage", "history"],
    answer:
      "Errors can be logged to non-volatile memory, serial output or a network service. Logs should include time, code and context, and be protected from overflow.",
  },
  {
    id: "firmware-error-counter",
    category: "firmware",
    question: "How do I count errors in firmware?",
    variations: [
      "Error counter firmware",
      "Count faults embedded",
      "Track error frequency",
      "Diagnostic counters",
    ],
    keywords: ["error", "counter", "firmware", "track", "frequency"],
    answer:
      "Error counters track how often faults occur. They can trigger maintenance or indicate degrading conditions.",
  },
  {
    id: "firmware-threshold-alarm",
    category: "firmware",
    question: "How do I set threshold alarms in firmware?",
    variations: [
      "Threshold alarm firmware",
      "Alarm limits embedded",
      "Warning threshold code",
      "Alert on value",
    ],
    keywords: ["threshold", "alarm", "firmware", "limits", "warning"],
    answer:
      "Firmware compares measured values to thresholds and triggers alarms or warnings. Hysteresis is often used to prevent chattering near the threshold.",
  },
  {
    id: "firmware-alarm-delay",
    category: "firmware",
    question: "How do I add a delay to an alarm?",
    variations: [
      "Alarm delay firmware",
      "Debounce alarm",
      "Confirm condition before alarm",
      "Alarm timing code",
    ],
    keywords: ["alarm", "delay", "firmware", "debounce", "condition"],
    answer:
      "An alarm delay requires the condition to persist for a set time before triggering. This reduces false alarms from transient events.",
  },
  {
    id: "firmware-alarm-latch",
    category: "firmware",
    question: "What is a latching alarm?",
    variations: [
      "Latching alarm firmware",
      "Alarm stays on",
      "Require reset alarm",
      "Latched fault code",
    ],
    keywords: ["latching", "alarm", "firmware", "reset", "fault"],
    answer:
      "A latching alarm remains active after the condition clears until it is reset by the user or system. It ensures faults are acknowledged.",
  },
  {
    id: "firmware-alarm-ack",
    category: "firmware",
    question: "What is alarm acknowledgement?",
    variations: [
      "Acknowledge alarm firmware",
      "Clear alarm code",
      "Reset alarm embedded",
      "Alarm ack",
    ],
    keywords: ["acknowledge", "alarm", "firmware", "clear", "reset"],
    answer:
      "Alarm acknowledgement allows an operator or system to confirm that an alarm has been seen. It may clear the alarm or only silence it.",
  },
  {
    id: "firmware-alarm-priority",
    category: "firmware",
    question: "How do I prioritize alarms in firmware?",
    variations: [
      "Alarm priority firmware",
      "Critical warning info",
      "Severity levels code",
      "Alarm classification",
    ],
    keywords: ["alarm", "priority", "firmware", "severity", "levels"],
    answer:
      "Alarms can be classified by severity, such as info, warning, error and critical. This guides the response and notification.",
  },
  {
    id: "firmware-notification",
    category: "firmware",
    question: "How does firmware send notifications?",
    variations: [
      "Notification firmware",
      "Send alert embedded",
      "Email SMS notification",
      "Push notification device",
    ],
    keywords: ["notification", "firmware", "alert", "send", "message"],
    answer:
      "Notifications can be sent over network using email, SMS, push services or MQTT. The method depends on the connectivity and infrastructure.",
  },
  {
    id: "firmware-sms",
    category: "firmware",
    question: "Can firmware send SMS?",
    variations: [
      "SMS firmware",
      "Send text message device",
      "GSM module firmware",
      "Cellular notification",
    ],
    keywords: ["sms", "firmware", "text", "message", "gsm"],
    answer:
      "Firmware can send SMS using a cellular modem or GSM module. It requires a cellular network connection and appropriate service.",
  },
  {
    id: "firmware-email",
    category: "firmware",
    question: "Can firmware send email?",
    variations: [
      "Email firmware",
      "Send email device",
      "SMTP embedded",
      "Email notification MCU",
    ],
    keywords: ["email", "firmware", "smtp", "notification", "send"],
    answer:
      "Firmware can send email using SMTP or an email API service. It requires network connectivity and authentication, and may need TLS.",
  },
  {
    id: "firmware-push",
    category: "firmware",
    question: "Can firmware send push notifications?",
    variations: [
      "Push notification firmware",
      "Mobile alert device",
      "Firebase firmware",
      "Notify phone MCU",
    ],
    keywords: ["push", "notification", "firmware", "mobile", "alert"],
    answer:
      "Push notifications typically use a cloud service such as Firebase or a custom platform. The device sends an event to the service, which delivers the notification to the user.",
  },
  {
    id: "firmware-dashboard-notify",
    category: "firmware",
    question: "How do I show alerts on a dashboard?",
    variations: [
      "Dashboard alert firmware",
      "Show alarm web",
      "Status dashboard code",
      "IoT alert dashboard",
    ],
    keywords: ["dashboard", "alert", "firmware", "web", "iot"],
    answer:
      "Firmware can publish alarm or status data to a dashboard using HTTP, MQTT or WebSocket. The dashboard then displays the information.",
  },
  {
    id: "firmware-cloud-log",
    category: "firmware",
    question: "How do I send logs to the cloud?",
    variations: [
      "Cloud logging firmware",
      "Send logs online",
      "Remote logging embedded",
      "Log to server MCU",
    ],
    keywords: ["cloud", "log", "firmware", "send", "server"],
    answer:
      "Logs can be sent to a cloud service using HTTP, MQTT or another protocol. Buffering, retry and storage limits should be considered.",
  },
  {
    id: "firmware-telemetry",
    category: "firmware",
    question: "What is telemetry in firmware?",
    variations: [
      "Telemetry firmware",
      "Remote data reporting",
      "Send sensor data cloud",
      "Telemetry embedded",
    ],
    keywords: ["telemetry", "firmware", "remote", "data", "reporting"],
    answer:
      "Telemetry is the automatic transmission of data from a device to a remote system. It is used for monitoring, diagnostics and analytics.",
  },
  {
    id: "firmware-heartbeat-cloud",
    category: "firmware",
    question: "How do I send a heartbeat to the cloud?",
    variations: [
      "Heartbeat cloud firmware",
      "Keep alive message",
      "Periodic status report",
      "Device online check",
    ],
    keywords: ["heartbeat", "cloud", "firmware", "keep", "alive"],
    answer:
      "Firmware periodically sends a heartbeat message to indicate it is online. The cloud can use this to detect offline devices.",
  },
  {
    id: "firmware-offline-detection",
    category: "firmware",
    question: "How does the cloud detect an offline device?",
    variations: [
      "Offline detection firmware",
      "Device not reporting",
      "Missing heartbeat",
      "Connection lost device",
    ],
    keywords: ["offline", "detection", "firmware", "cloud", "connection"],
    answer:
      "The cloud monitors heartbeats or last-seen timestamps. If a device misses heartbeats beyond a threshold, it is marked offline.",
  },
  {
    id: "firmware-reconnect",
    category: "firmware",
    question: "How does firmware reconnect to the network?",
    variations: [
      "Reconnect firmware",
      "WiFi reconnect code",
      "Network reconnect embedded",
      "Connection retry",
    ],
    keywords: ["reconnect", "firmware", "network", "wifi", "retry"],
    answer:
      "Firmware monitors connection state and retries with backoff. It should continue local functions while disconnected and restore communication when possible.",
  },
  {
    id: "firmware-connection-manager",
    category: "firmware",
    question: "What is a connection manager in firmware?",
    variations: [
      "Connection manager firmware",
      "Network state machine",
      "Manage connectivity",
      "Connection handling code",
    ],
    keywords: ["connection", "manager", "firmware", "network", "state"],
    answer:
      "A connection manager handles connecting, disconnecting, reconnecting and monitoring network state. It simplifies the application logic.",
  },
  {
    id: "firmware-network-state",
    category: "firmware",
    question: "What network states does firmware track?",
    variations: [
      "Network state firmware",
      "Connection states embedded",
      "WiFi states code",
      "Link status MCU",
    ],
    keywords: ["network", "state", "firmware", "connection", "status"],
    answer:
      "Common states include disconnected, connecting, connected and error. The application can behave differently depending on state.",
  },
  {
    id: "firmware-network-fallback",
    category: "firmware",
    question: "What is network fallback in firmware?",
    variations: [
      "Network fallback firmware",
      "Backup connection",
      "Fallback AP mode",
      "Secondary network",
    ],
    keywords: ["network", "fallback", "firmware", "backup", "connection"],
    answer:
      "Network fallback uses an alternative connection if the primary fails, such as Ethernet to Wi-Fi or a setup access point. It improves reliability.",
  },
  {
    id: "firmware-ap-mode",
    category: "firmware",
    question: "What is access point mode in firmware?",
    variations: [
      "AP mode firmware",
      "Setup access point",
      "Config portal firmware",
      "WiFi AP embedded",
    ],
    keywords: ["ap", "mode", "firmware", "wifi", "setup"],
    answer:
      "Access point mode allows the device to create its own Wi-Fi network, often for initial configuration or fallback. A captive portal may be used.",
  },
  {
    id: "firmware-captive-portal",
    category: "firmware",
    question: "What is a captive portal in firmware?",
    variations: [
      "Captive portal firmware",
      "WiFi setup page",
      "Configuration portal embedded",
      "AP config page",
    ],
    keywords: ["captive", "portal", "firmware", "wifi", "configuration"],
    answer:
      "A captive portal serves a configuration page when a user connects to the device's access point. It is used for Wi-Fi credentials and initial setup.",
  },
  {
    id: "firmware-wifi-provisioning",
    category: "firmware",
    question: "How do I provision Wi-Fi credentials?",
    variations: [
      "WiFi provisioning firmware",
      "Set WiFi credentials",
      "Configure network device",
      "WiFi setup code",
    ],
    keywords: ["wifi", "provisioning", "firmware", "credentials", "setup"],
    answer:
      "Wi-Fi credentials can be provisioned through a setup access point, Bluetooth, serial, a button sequence or a mobile app. Credentials should be stored securely.",
  },
  {
    id: "firmware-ble-provisioning",
    category: "firmware",
    question: "How do I provision using Bluetooth?",
    variations: [
      "BLE provisioning firmware",
      "Bluetooth setup device",
      "Configure via BLE",
      "Provisioning over Bluetooth",
    ],
    keywords: ["ble", "provisioning", "firmware", "bluetooth", "setup"],
    answer:
      "BLE provisioning uses a Bluetooth connection to send configuration and credentials to the device. A companion app or tool is often used.",
  },
  {
    id: "firmware-serial-provisioning",
    category: "firmware",
    question: "How do I provision using serial?",
    variations: [
      "Serial provisioning firmware",
      "Configure over UART",
      "Setup via serial",
      "Serial config code",
    ],
    keywords: ["serial", "provisioning", "firmware", "uart", "setup"],
    answer:
      "Serial provisioning sends configuration commands over UART or USB. It is useful during manufacturing or development.",
  },
  {
    id: "firmware-button-provisioning",
    category: "firmware",
    question: "How do I use a button for provisioning?",
    variations: [
      "Button provisioning firmware",
      "Setup button device",
      "Factory reset button",
      "Config button code",
    ],
    keywords: ["button", "provisioning", "firmware", "setup", "reset"],
    answer:
      "A button sequence can trigger setup mode, reset configuration or clear credentials. Timing and confirmation should be designed to avoid accidental activation.",
  },
  {
    id: "firmware-credential-storage",
    category: "firmware",
    question: "How do I store Wi-Fi credentials securely?",
    variations: [
      "Store WiFi credentials",
      "Save password firmware",
      "Credential storage embedded",
      "Secure WiFi credentials",
    ],
    keywords: ["credentials", "storage", "firmware", "wifi", "security"],
    answer:
      "Credentials should be stored in non-volatile memory and protected where possible. Encryption or secure storage may be used for sensitive networks.",
  },
  {
    id: "firmware-network-scan",
    category: "firmware",
    question: "How do I scan for Wi-Fi networks in firmware?",
    variations: [
      "WiFi scan firmware",
      "List available networks",
      "Scan AP code",
      "Network discovery device",
    ],
    keywords: ["wifi", "scan", "firmware", "network", "discovery"],
    answer:
      "Firmware can scan for available networks and list SSIDs and signal strengths. This is often used in setup interfaces.",
  },
  {
    id: "firmware-rssi",
    category: "firmware",
    question: "What is RSSI in firmware?",
    variations: [
      "RSSI firmware",
      "Signal strength embedded",
      "WiFi signal quality",
      "Read RSSI code",
    ],
    keywords: ["rssi", "firmware", "signal", "strength", "wifi"],
    answer:
      "RSSI, or Received Signal Strength Indicator, measures received signal power. It indicates connection quality and can be used for diagnostics or location.",
  },
  {
    id: "firmware-network-quality",
    category: "firmware",
    question: "How do I monitor network quality in firmware?",
    variations: [
      "Network quality firmware",
      "Monitor WiFi quality",
      "Packet loss firmware",
      "Connection health code",
    ],
    keywords: ["network", "quality", "firmware", "monitor", "health"],
    answer:
      "Network quality can be monitored using RSSI, ping, packet loss, retry counts and latency. The appropriate metrics depend on the application.",
  },
  {
    id: "firmware-ping",
    category: "firmware",
    question: "Can firmware use ping?",
    variations: [
      "Ping firmware",
      "ICMP embedded",
      "Test network connection",
      "Ping code MCU",
    ],
    keywords: ["ping", "firmware", "icmp", "network", "test"],
    answer:
      "Some TCP/IP stacks support ICMP ping for connectivity testing. It can help diagnose network issues.",
  },
  {
    id: "firmware-latency",
    category: "firmware",
    question: "What is latency in firmware communication?",
    variations: [
      "Latency firmware",
      "Communication delay",
      "Response time embedded",
      "Network latency MCU",
    ],
    keywords: ["latency", "firmware", "communication", "delay", "response"],
    answer:
      "Latency is the time between sending a request and receiving a response. It affects real-time behavior and control loops.",
  },
  {
    id: "firmware-jitter",
    category: "firmware",
    question: "What is jitter in firmware?",
    variations: [
      "Jitter firmware",
      "Timing variation embedded",
      "Communication jitter",
      "Real time jitter MCU",
    ],
    keywords: ["jitter", "firmware", "timing", "variation", "real"],
    answer:
      "Jitter is variation in timing or latency. It can affect control systems and communication reliability. Consistent scheduling and hardware timers reduce it.",
  },
  {
    id: "firmware-determinism",
    category: "firmware",
    question: "What is determinism in firmware?",
    variations: [
      "Deterministic firmware",
      "Real time determinism",
      "Predictable timing embedded",
      "Determinism MCU",
    ],
    keywords: ["determinism", "firmware", "real", "time", "predictable"],
    answer:
      "Determinism means the system responds within a predictable time. It is important for real-time and safety-critical systems.",
  },
  {
    id: "firmware-real-time",
    category: "firmware",
    question: "What is a real-time system?",
    variations: [
      "Real time firmware",
      "Hard vs soft real time",
      "Real time embedded",
      "Timing requirements firmware",
    ],
    keywords: ["real", "time", "firmware", "hard", "soft"],
    answer:
      "A real-time system must respond within specified deadlines. Hard real-time systems must meet every deadline; soft real-time systems can tolerate occasional misses.",
  },
  {
    id: "firmware-deadline",
    category: "firmware",
    question: "What is a deadline in firmware?",
    variations: [
      "Deadline firmware",
      "Timing deadline embedded",
      "Response deadline MCU",
      "Meet deadline code",
    ],
    keywords: ["deadline", "firmware", "timing", "response", "real"],
    answer:
      "A deadline is the latest time by which a task or response must complete. Missing deadlines can cause incorrect behavior in real-time systems.",
  },
  {
    id: "firmware-wcet",
    category: "firmware",
    question: "What is WCET?",
    variations: [
      "Worst case execution time",
      "WCET firmware",
      "Maximum execution time",
      "Timing analysis embedded",
    ],
    keywords: ["wcet", "firmware", "execution", "time", "worst"],
    answer:
      "WCET, or Worst-Case Execution Time, is the longest time a piece of code can take to run. It is used in real-time analysis to ensure deadlines are met.",
  },
  {
    id: "firmware-scheduling-analysis",
    category: "firmware",
    question: "What is scheduling analysis?",
    variations: [
      "Scheduling analysis firmware",
      "Real time scheduling theory",
      "Rate monotonic analysis",
      "Task scheduling verification",
    ],
    keywords: ["scheduling", "analysis", "firmware", "real", "time"],
    answer:
      "Scheduling analysis verifies that tasks can meet their deadlines under expected conditions. Techniques include rate-monotonic analysis and utilization bounds.",
  },
  {
    id: "firmware-priority-assignment",
    category: "firmware",
    question: "How do I assign task priorities?",
    variations: [
      "Task priority assignment",
      "Set priorities RTOS",
      "Priority firmware",
      "Rate monotonic priority",
    ],
    keywords: ["priority", "assignment", "firmware", "tasks", "rtos"],
    answer:
      "Priorities can be assigned by criticality, deadline or rate. Rate-monotonic assigns higher priority to shorter-period tasks. The goal is to meet all deadlines.",
  },
  {
    id: "firmware-blocking",
    category: "firmware",
    question: "What is blocking in firmware?",
    variations: [
      "Blocking firmware",
      "Blocking call embedded",
      "Non blocking code",
      "Why avoid blocking",
    ],
    keywords: ["blocking", "firmware", "call", "embedded", "nonblocking"],
    answer:
      "A blocking operation prevents the processor from doing other work until it completes. Blocking calls can cause missed deadlines or unresponsive behavior in real-time systems.",
  },
  {
    id: "firmware-yield-point",
    category: "firmware",
    question: "What is a yield point?",
    variations: [
      "Yield point firmware",
      "Where to yield task",
      "Cooperative scheduling yield",
      "Give up CPU code",
    ],
    keywords: ["yield", "point", "firmware", "task", "cooperative"],
    answer:
      "A yield point is a place in code where a task voluntarily gives up the processor. It allows other tasks to run in cooperative scheduling.",
  },
  {
    id: "firmware-watchdog-task",
    category: "firmware",
    question: "How does a watchdog interact with RTOS tasks?",
    variations: [
      "Watchdog RTOS",
      "Service watchdog task",
      "Watchdog with tasks",
      "RTOS watchdog code",
    ],
    keywords: ["watchdog", "rtos", "task", "firmware", "service"],
    answer:
      "The watchdog should be serviced only when critical tasks are confirmed to be running. A dedicated task or logic can check task health before servicing.",
  },
  {
    id: "firmware-task-health",
    category: "firmware",
    question: "How do I monitor task health in an RTOS?",
    variations: [
      "Task health firmware",
      "Monitor tasks RTOS",
      "Task alive check",
      "Watchdog task monitoring",
    ],
    keywords: ["task", "health", "firmware", "rtos", "monitor"],
    answer:
      "Tasks can update counters or timestamps that a monitor task checks. If a task misses its deadline or stops updating, the monitor can take action.",
  },
  {
    id: "firmware-cpu-load",
    category: "firmware",
    question: "How do I measure CPU load in firmware?",
    variations: [
      "CPU load firmware",
      "Measure CPU usage RTOS",
      "Task utilization embedded",
      "Idle time measurement",
    ],
    keywords: ["cpu", "load", "firmware", "usage", "idle"],
    answer:
      "CPU load can be estimated from idle task time or by measuring how long tasks run. High sustained load may indicate the need for optimization or a faster processor.",
  },
  {
    id: "firmware-stack-usage",
    category: "firmware",
    question: "How do I measure stack usage in firmware?",
    variations: [
      "Stack usage firmware",
      "Measure stack RTOS",
      "Stack high water mark",
      "Detect stack overflow",
    ],
    keywords: ["stack", "usage", "firmware", "measure", "overflow"],
    answer:
      "Stack usage can be measured by filling the stack with a pattern and checking how much is overwritten. RTOSes often provide high-water mark information. Stack overflow can cause corruption or crashes.",
  },
  {
    id: "firmware-heap-usage",
    category: "firmware",
    question: "How do I measure heap usage in firmware?",
    variations: [
      "Heap usage firmware",
      "Measure heap RTOS",
      "Track memory allocation",
      "Heap fragmentation detect",
    ],
    keywords: ["heap", "usage", "firmware", "measure", "memory"],
    answer:
      "Heap usage can be tracked with allocation hooks or statistics from the allocator. Fragmentation can occur over time, so monitoring is useful.",
  },
  {
    id: "firmware-memory-pool",
    category: "firmware",
    question: "What is a memory pool in firmware?",
    variations: [
      "Memory pool firmware",
      "Fixed size allocation",
      "Pool allocator embedded",
      "Avoid heap fragmentation",
    ],
    keywords: ["memory", "pool", "firmware", "allocation", "fragmentation"],
    answer:
      "A memory pool allocates fixed-size blocks, avoiding fragmentation and providing predictable allocation. It is useful in real-time systems.",
  },
  {
    id: "firmware-static-allocation",
    category: "firmware",
    question: "Why prefer static allocation in firmware?",
    variations: [
      "Static allocation firmware",
      "Avoid malloc embedded",
      "Static vs dynamic memory",
      "Fixed memory firmware",
    ],
    keywords: ["static", "allocation", "firmware", "memory", "embedded"],
    answer:
      "Static allocation avoids fragmentation, runtime allocation failures and unpredictable timing. It is often preferred in embedded and safety-critical systems.",
  },
  {
    id: "firmware-allocation-failure",
    category: "firmware",
    question: "How do I handle allocation failure in firmware?",
    variations: [
      "Allocation failure firmware",
      "Malloc returns null",
      "Memory full embedded",
      "Out of memory code",
    ],
    keywords: ["allocation", "failure", "firmware", "memory", "null"],
    answer:
      "Check for null returns, handle failures gracefully, release resources and possibly enter a safe or degraded mode. In critical systems, avoiding dynamic allocation is often preferable.",
  },
  {
    id: "firmware-memory-leak",
    category: "firmware",
    question: "What is a memory leak in firmware?",
    variations: [
      "Memory leak firmware",
      "Memory not freed",
      "Leak detection embedded",
      "Heap leak MCU",
    ],
    keywords: ["memory", "leak", "firmware", "heap", "free"],
    answer:
      "A memory leak occurs when allocated memory is not freed. Over time, it can exhaust the heap and cause failures. Tracking allocations and careful design help prevent leaks.",
  },
  {
    id: "firmware-use-after-free",
    category: "firmware",
    question: "What is use-after-free?",
    variations: [
      "Use after free firmware",
      "Dangling pointer embedded",
      "Freed memory access",
      "Pointer bug MCU",
    ],
    keywords: ["use", "after", "free", "firmware", "pointer"],
    answer:
      "Use-after-free occurs when code accesses memory after it has been freed. It can cause corruption or crashes. Careful pointer management and tools help detect it.",
  },
  {
    id: "firmware-double-free",
    category: "firmware",
    question: "What is a double free?",
    variations: [
      "Double free firmware",
      "Free memory twice",
      "Heap corruption embedded",
      "Memory bug MCU",
    ],
    keywords: ["double", "free", "firmware", "heap", "corruption"],
    answer:
      "A double free occurs when the same memory is freed more than once. It can corrupt the heap and cause unpredictable behavior.",
  },
  {
    id: "firmware-buffer-overrun",
    category: "firmware",
    question: "What is a buffer overrun?",
    variations: [
      "Buffer overrun firmware",
      "Out of bounds write",
      "Array overflow embedded",
      "Memory overwrite MCU",
    ],
    keywords: ["buffer", "overrun", "firmware", "bounds", "memory"],
    answer:
      "A buffer overrun writes beyond the intended buffer, potentially corrupting other memory. It can cause crashes, incorrect behavior or security vulnerabilities.",
  },
  {
    id: "firmware-bounds-check",
    category: "firmware",
    question: "How do I add bounds checking in firmware?",
    variations: [
      "Bounds checking firmware",
      "Validate index embedded",
      "Array bounds code",
      "Safe array access MCU",
    ],
    keywords: ["bounds", "checking", "firmware", "array", "safe"],
    answer:
      "Check indices and lengths before accessing arrays or buffers. Bounds checks may be disabled in performance-critical code after careful review.",
  },
  {
    id: "firmware-safe-string",
    category: "firmware",
    question: "How do I safely handle strings in firmware?",
    variations: [
      "Safe string firmware",
      "strncpy snprintf",
      "String buffer safety",
      "Avoid string overflow",
    ],
    keywords: ["string", "firmware", "safe", "buffer", "overflow"],
    answer:
      "Use bounded string functions such as snprintf and strncat, ensure null termination and validate lengths. Avoid unbounded functions like strcpy.",
  },
  {
    id: "firmware-format-string",
    category: "firmware",
    question: "What is a format string vulnerability?",
    variations: [
      "Format string firmware",
      "printf vulnerability",
      "Format string attack embedded",
      "Safe printf MCU",
    ],
    keywords: ["format", "string", "firmware", "printf", "vulnerability"],
    answer:
      "A format string vulnerability occurs when user input is used as a format string. It can cause crashes or information disclosure. Always use fixed format strings.",
  },
  {
    id: "firmware-integer-cast",
    category: "firmware",
    question: "Why is integer casting risky in firmware?",
    variations: [
      "Integer cast firmware",
      "Type conversion embedded",
      "Truncation code MCU",
      "Signed unsigned cast",
    ],
    keywords: ["integer", "cast", "firmware", "conversion", "truncation"],
    answer:
      "Casting can truncate values, change signedness or cause unexpected results. Explicit casts and range checks help avoid errors.",
  },
  {
    id: "firmware-implicit-conversion",
    category: "firmware",
    question: "What is implicit type conversion in firmware?",
    variations: [
      "Implicit conversion firmware",
      "Type promotion embedded",
      "Automatic cast code",
      "Integer promotion MCU",
    ],
    keywords: ["implicit", "conversion", "firmware", "type", "promotion"],
    answer:
      "Implicit conversions happen automatically in expressions. They can cause unexpected results, especially with signed/unsigned mixing or narrowing. Explicit types and casts reduce risk.",
  },
  {
    id: "firmware-union-type-pun",
    category: "firmware",
    question: "Is type punning with unions safe?",
    variations: [
      "Type punning firmware",
      "Union type punning",
      "Reinterpret data union",
      "Union vs memcpy",
    ],
    keywords: ["type", "punning", "firmware", "union", "data"],
    answer:
      "Type punning through unions is implementation-defined in C and may not be portable. Using memcpy or explicit serialization is often safer.",
  },
  {
    id: "firmware-bitfield-portability",
    category: "firmware",
    question: "Are bitfields portable in firmware?",
    variations: [
      "Bitfield portability",
      "Bitfield layout firmware",
      "Compiler dependent bitfield",
      "Portable bitfield code",
    ],
    keywords: ["bitfield", "portability", "firmware", "layout", "compiler"],
    answer:
      "Bitfield layout is implementation-defined and can vary between compilers. For portable code or hardware registers, explicit masks and shifts are often preferred.",
  },
  {
    id: "firmware-endian-portability",
    category: "firmware",
    question: "How do I write endian-independent firmware?",
    variations: [
      "Endian independent firmware",
      "Handle endianness code",
      "Portable data format",
      "Byte order conversion",
    ],
    keywords: ["endian", "independent", "firmware", "portable", "byte"],
    answer:
      "Use explicit byte-wise serialization for data exchanged or stored, and convert as needed. Avoid assuming a particular byte order.",
  },
  {
    id: "firmware-misaligned",
    category: "firmware",
    question: "What is misaligned access in firmware?",
    variations: [
      "Misaligned access firmware",
      "Unaligned memory access",
      "Alignment fault MCU",
      "Data alignment embedded",
    ],
    keywords: ["misaligned", "access", "firmware", "alignment", "memory"],
    answer:
      "Misaligned access occurs when data is accessed at an address not aligned to its type. Some processors handle it; others fault. Use aligned data or safe access methods.",
  },
  {
    id: "firmware-struct-padding",
    category: "firmware",
    question: "What is struct padding?",
    variations: [
      "Struct padding firmware",
      "Structure alignment embedded",
      "Packed struct code",
      "Padding bytes struct",
    ],
    keywords: ["struct", "padding", "firmware", "alignment", "packed"],
    answer:
      "Compilers insert padding in structs to align members. This affects size and layout. Packed structs can remove padding but may cause unaligned access or portability issues.",
  },
  {
    id: "firmware-packed",
    category: "firmware",
    question: "When should I use packed structs?",
    variations: [
      "Packed struct firmware",
      "Packed attribute embedded",
      "Remove struct padding",
      "Packed data format",
    ],
    keywords: ["packed", "struct", "firmware", "padding", "data"],
    answer:
      "Packed structs are useful for matching external data formats or hardware layouts, but can cause unaligned access and are less portable. Use carefully and document the layout.",
  },
  {
    id: "firmware-serialization",
    category: "firmware",
    question: "How should firmware serialize data?",
    variations: [
      "Serialize data firmware",
      "Data serialization embedded",
      "Encode decode data MCU",
      "Portable data format",
    ],
    keywords: ["serialization", "firmware", "data", "encode", "decode"],
    answer:
      "Explicit serialization writes each field in a defined order and format, avoiding padding and endianness issues. It is more portable than sending raw structs.",
  },
  {
    id: "firmware-deserialization",
    category: "firmware",
    question: "How should firmware deserialize data?",
    variations: [
      "Deserialize data firmware",
      "Parse incoming data",
      "Decode protocol embedded",
      "Validate received data",
    ],
    keywords: ["deserialization", "firmware", "data", "parse", "validate"],
    answer:
      "Deserialization should validate lengths, ranges and format before using data. It should handle incomplete or corrupted input safely.",
  },
  {
    id: "firmware-protobuf",
    category: "firmware",
    question: "Can firmware use Protocol Buffers?",
    variations: [
      "Protobuf firmware",
      "Protocol buffers embedded",
      "Compact serialization MCU",
      "Protobuf vs JSON",
    ],
    keywords: ["protobuf", "firmware", "serialization", "embedded", "protocol"],
    answer:
      "Protocol Buffers can be used on microcontrollers but may require more resources than hand-rolled or compact binary formats. Library support and memory usage should be considered.",
  },
  {
    id: "firmware-cbor",
    category: "firmware",
    question: "What is CBOR?",
    variations: [
      "CBOR firmware",
      "Concise binary object representation",
      "Compact JSON alternative",
      "CBOR embedded",
    ],
    keywords: ["cbor", "firmware", "binary", "serialization", "embedded"],
    answer:
      "CBOR, or Concise Binary Object Representation, is a compact binary format similar to JSON. It can be suitable for constrained devices and networks.",
  },
  {
    id: "firmware-messagepack",
    category: "firmware",
    question: "What is MessagePack?",
    variations: [
      "MessagePack firmware",
      "Binary JSON alternative",
      "Compact serialization embedded",
      "MessagePack MCU",
    ],
    keywords: ["messagepack", "firmware", "serialization", "binary", "compact"],
    answer:
      "MessagePack is a binary serialization format that is more compact than JSON. It may be used in embedded systems where bandwidth or storage matters.",
  },
  {
    id: "firmware-json-size",
    category: "firmware",
    question: "Why is JSON large for firmware?",
    variations: [
      "JSON size firmware",
      "JSON memory embedded",
      "Compact JSON alternative",
      "Reduce JSON size",
    ],
    keywords: ["json", "size", "firmware", "memory", "compact"],
    answer:
      "JSON uses text and repeated keys, which increases size and parsing memory. For constrained systems, binary formats or reduced key names can help.",
  },
  {
    id: "firmware-base64",
    category: "firmware",
    question: "What is Base64 used for in firmware?",
    variations: [
      "Base64 firmware",
      "Encode binary text",
      "Base64 embedded",
      "Convert binary base64",
    ],
    keywords: ["base64", "firmware", "encode", "binary", "text"],
    answer:
      "Base64 encodes binary data as text, often for JSON, URLs or email. It increases size by about 33% and is not encryption.",
  },
  {
    id: "firmware-hex-string",
    category: "firmware",
    question: "How do I convert binary to a hex string?",
    variations: [
      "Hex string firmware",
      "Convert binary hex",
      "Format bytes hex",
      "Hex encoding MCU",
    ],
    keywords: ["hex", "string", "firmware", "convert", "binary"],
    answer:
      "Each byte is formatted as two hexadecimal characters. Functions such as sprintf can be used, but manual conversion may be faster and use less memory.",
  },
  {
    id: "firmware-atoi",
    category: "firmware",
    question: "How do I convert a string to a number in firmware?",
    variations: [
      "atoi firmware",
      "Parse integer string",
      "String to number MCU",
      "Convert text number",
    ],
    keywords: ["atoi", "firmware", "string", "number", "parse"],
    answer:
      "Functions such as atoi, strtol or sscanf can parse strings. Validate input and handle overflow and invalid characters.",
  },
  {
    id: "firmware-sscanf",
    category: "firmware",
    question: "Can firmware use sscanf?",
    variations: [
      "sscanf firmware",
      "Parse formatted string",
      "Read values from text",
      "Scanf embedded",
    ],
    keywords: ["sscanf", "firmware", "parse", "string", "format"],
    answer:
      "sscanf can parse formatted strings but may use significant code space and stack. For simple parsing, hand-written code may be more efficient.",
  },
  {
    id: "firmware-sprintf",
    category: "firmware",
    question: "Can firmware use sprintf?",
    variations: [
      "sprintf firmware",
      "Format string embedded",
      "Print to buffer MCU",
      "snprintf safer",
    ],
    keywords: ["sprintf", "firmware", "format", "string", "snprintf"],
    answer:
      "sprintf can format strings but is unsafe if the buffer is too small. Prefer snprintf with a size limit.",
  },
  {
    id: "firmware-printf-retarget",
    category: "firmware",
    question: "How do I retarget printf to UART?",
    variations: [
      "printf UART firmware",
      "Retarget printf embedded",
      "Printf to serial",
      "Redirect stdout MCU",
    ],
    keywords: ["printf", "uart", "firmware", "retarget", "serial"],
    answer:
      "Implement the low-level write function used by printf to send characters over UART. This allows standard printf calls to output to serial.",
  },
  {
    id: "firmware-putchar",
    category: "firmware",
    question: "What is putchar used for in firmware?",
    variations: [
      "putchar firmware",
      "Low level output embedded",
      "Character output MCU",
      "Retarget putchar",
    ],
    keywords: ["putchar", "firmware", "output", "character", "serial"],
    answer:
      "putchar outputs a single character and is often the low-level function retargeted for UART or semihosting.",
  },
  {
    id: "firmware-getchar",
    category: "firmware",
    question: "What is getchar used for in firmware?",
    variations: [
      "getchar firmware",
      "Read character serial",
      "Low level input MCU",
      "Retarget getchar",
    ],
    keywords: ["getchar", "firmware", "input", "character", "serial"],
    answer:
      "getchar reads a character from the default input. It can be retargeted to UART or another source.",
  },
  {
    id: "firmware-swo",
    category: "firmware",
    question: "What is SWO?",
    variations: [
      "SWO firmware",
      "Serial wire output debug",
      "ITM trace",
      "Single wire debug output",
    ],
    keywords: ["swo", "firmware", "debug", "trace", "output"],
    answer:
      "SWO, or Serial Wire Output, is a debug trace output available on some ARM Cortex devices. It can carry printf-style output and ITM data.",
  },
  {
    id: "firmware-itm",
    category: "firmware",
    question: "What is ITM?",
    variations: [
      "ITM firmware",
      "Instrumentation trace macrocell",
      "Debug trace ARM",
      "ITM printf",
    ],
    keywords: ["itm", "firmware", "trace", "debug", "arm"],
    answer:
      "ITM, or Instrumentation Trace Macrocell, is a debug feature that sends trace data over SWO. It can be used for lightweight printf debugging.",
  },
  {
    id: "firmware-semihosting",
    category: "firmware",
    question: "What is semihosting?",
    variations: [
      "Semihosting firmware",
      "Debug output embedded",
      "Host IO debugging",
      "ARM semihosting",
    ],
    keywords: ["semihosting", "firmware", "debug", "host", "arm"],
    answer:
      "Semihosting allows the target to use host I/O through the debugger, such as printf and file access. It is slow and only for debugging.",
  },
  {
    id: "firmware-segger-rtt",
    category: "firmware",
    question: "What is SEGGER RTT?",
    variations: [
      "SEGGER RTT firmware",
      "Real time transfer debug",
      "Fast debug output",
      "RTT printf",
    ],
    keywords: ["segger", "rtt", "firmware", "debug", "output"],
    answer:
      "SEGGER RTT, or Real Time Transfer, provides fast bidirectional communication between the target and debugger using a memory buffer. It is useful for logging without UART.",
  },
  {
    id: "firmware-logging-level",
    category: "firmware",
    question: "How do I implement log levels in firmware?",
    variations: [
      "Log levels firmware",
      "Debug info warning error",
      "Logging verbosity embedded",
      "Enable disable logs",
    ],
    keywords: ["log", "levels", "firmware", "debug", "verbosity"],
    answer:
      "Log levels categorize messages by severity or purpose. Compile-time or runtime filtering reduces output and code size.",
  },
  {
    id: "firmware-log-compile",
    category: "firmware",
    question: "How do I compile out logs in firmware?",
    variations: [
      "Compile out logs",
      "Disable logging build",
      "Conditional logging firmware",
      "Remove debug code production",
    ],
    keywords: ["log", "compile", "firmware", "debug", "production"],
    answer:
      "Use preprocessor macros to conditionally include logging code. In production, lower-severity logs can be compiled out to save space and time.",
  },
  {
    id: "firmware-log-buffer",
    category: "firmware",
    question: "How do I buffer logs in firmware?",
    variations: [
      "Log buffer firmware",
      "Buffer debug output",
      "Store logs before send",
      "Circular log buffer",
    ],
    keywords: ["log", "buffer", "firmware", "debug", "storage"],
    answer:
      "A circular buffer can store recent log messages for later transmission or inspection. The size and overwrite behavior should be defined.",
  },
  {
    id: "firmware-log-format",
    category: "firmware",
    question: "What format should firmware logs use?",
    variations: [
      "Log format firmware",
      "Structured logging embedded",
      "Log message format",
      "Parseable logs MCU",
    ],
    keywords: ["log", "format", "firmware", "structured", "message"],
    answer:
      "Logs can be plain text, structured text or binary. Structured or parseable formats help automated analysis. The format should balance readability and overhead.",
  },
  {
    id: "firmware-log-timestamp",
    category: "firmware",
    question: "Should firmware logs include timestamps?",
    variations: [
      "Log timestamp firmware",
      "Time in logs",
      "Add timestamp MCU",
      "Debug log time",
    ],
    keywords: ["log", "timestamp", "firmware", "time", "debug"],
    answer:
      "Timestamps help correlate events and measure timing. They require a time source, which may be an RTC, network time or a simple tick counter.",
  },
  {
    id: "firmware-log-storage",
    category: "firmware",
    question: "Where should firmware store logs?",
    variations: [
      "Log storage firmware",
      "Save logs embedded",
      "Store debug logs MCU",
      "Log to flash SD",
    ],
    keywords: ["log", "storage", "firmware", "flash", "sd"],
    answer:
      "Logs can be stored in RAM, flash, EEPROM or SD card, or sent over serial/network. Storage capacity, write endurance and retrieval should be considered.",
  },
  {
    id: "firmware-log-rotation",
    category: "firmware",
    question: "What is log rotation?",
    variations: [
      "Log rotation firmware",
      "Circular log embedded",
      "Overwrite old logs",
      "Manage log size",
    ],
    keywords: ["log", "rotation", "firmware", "size", "manage"],
    answer:
      "Log rotation overwrites the oldest entries when space is full. It bounds storage usage while keeping recent data.",
  },
  {
    id: "firmware-log-severity",
    category: "firmware",
    question: "How do I choose log severity levels?",
    variations: [
      "Log severity firmware",
      "Error warning info debug",
      "Log level meaning",
      "Severity classification logs",
    ],
    keywords: ["log", "severity", "firmware", "levels", "error"],
    answer:
      "Common levels include error, warning, info and debug. The choice should reflect the importance and intended audience of the message.",
  },
  {
    id: "firmware-log-security",
    category: "firmware",
    question: "Should firmware logs contain sensitive data?",
    variations: [
      "Log sensitive data",
      "Security logs firmware",
      "Redact logs embedded",
      "Private data logs",
    ],
    keywords: ["log", "security", "firmware", "sensitive", "data"],
    answer:
      "Logs should avoid secrets such as passwords, keys and personal data. If sensitive data must be logged, it should be protected and access-controlled.",
  },
  {
    id: "firmware-log-overhead",
    category: "firmware",
    question: "How can logging affect firmware performance?",
    variations: [
      "Logging overhead firmware",
      "Logging timing impact",
      "Debug logging performance",
      "Reduce log overhead",
    ],
    keywords: ["log", "overhead", "firmware", "performance", "timing"],
    answer:
      "Logging can consume CPU time, memory and communication bandwidth, and may affect timing. Buffering, level filtering and efficient output reduce the impact.",
  },
  {
    id: "firmware-log-production",
    category: "firmware",
    question: "Should logging remain enabled in production?",
    variations: [
      "Production logging firmware",
      "Keep logs in release",
      "Disable debug production",
      "Field logging",
    ],
    keywords: ["log", "production", "firmware", "release", "field"],
    answer:
      "Some logging is useful in production for diagnostics, but debug-level output is usually reduced. Security and performance should be considered.",
  },
  {
    id: "firmware-assert-production",
    category: "firmware",
    question: "Should asserts be enabled in production firmware?",
    variations: [
      "Assert production firmware",
      "Disable assert release",
      "Keep asserts embedded",
      "Assert behavior production",
    ],
    keywords: ["assert", "production", "firmware", "release", "debug"],
    answer:
      "Asserts are primarily for development. In production, they may be disabled or configured to log and recover rather than halt.",
  },
  {
    id: "firmware-error-handling-strategy",
    category: "firmware",
    question: "What is an error handling strategy in firmware?",
    variations: [
      "Error handling strategy",
      "Firmware error policy",
      "How to handle errors embedded",
      "Error response design",
    ],
    keywords: ["error", "handling", "strategy", "firmware", "design"],
    answer:
      "A strategy defines how different errors are detected, reported, logged and recovered from. It should be consistent and appropriate to the severity.",
  },
  {
    id: "firmware-error-propagation",
    category: "firmware",
    question: "How should errors propagate through firmware layers?",
    variations: [
      "Error propagation firmware",
      "Return codes layers",
      "Error handling layers embedded",
      "Propagate errors code",
    ],
    keywords: ["error", "propagation", "firmware", "layers", "codes"],
    answer:
      "Errors can be returned as codes, exceptions or status values. Each layer should handle, translate or pass errors appropriately.",
  },
  {
    id: "firmware-error-code-design",
    category: "firmware",
    question: "How should error codes be designed?",
    variations: [
      "Error code design firmware",
      "Design error codes",
      "Status code scheme",
      "Firmware error numbering",
    ],
    keywords: ["error", "code", "design", "firmware", "status"],
    answer:
      "Error codes should be unique, documented and organized by category or severity. They should provide enough information for diagnosis.",
  },
  {
    id: "firmware-error-message",
    category: "firmware",
    question: "Should firmware store human-readable error messages?",
    variations: [
      "Error message firmware",
      "Human readable errors",
      "Store error strings",
      "Error text embedded",
    ],
    keywords: ["error", "message", "firmware", "readable", "strings"],
    answer:
      "Human-readable messages are useful but consume storage. A compact code plus a lookup table or documentation can save space.",
  },
  {
    id: "firmware-error-reporting",
    category: "firmware",
    question: "How should firmware report errors?",
    variations: [
      "Error reporting firmware",
      "Report faults embedded",
      "Notify error MCU",
      "Error output device",
    ],
    keywords: ["error", "reporting", "firmware", "fault", "notify"],
    answer:
      "Errors can be reported through LEDs, displays, serial, network or logs. The method should suit the user and service context.",
  },
  {
    id: "firmware-fault-tolerance",
    category: "firmware",
    question: "What is fault tolerance in firmware?",
    variations: [
      "Fault tolerance firmware",
      "Continue after fault",
      "Robust embedded system",
      "Tolerate failures",
    ],
    keywords: ["fault", "tolerance", "firmware", "robust", "failure"],
    answer:
      "Fault tolerance is the ability to continue operating despite faults. Techniques include redundancy, error detection, recovery and graceful degradation.",
  },
  {
    id: "firmware-fail-operational",
    category: "firmware",
    question: "What is fail-operational behavior?",
    variations: [
      "Fail operational firmware",
      "Continue after failure",
      "Degraded operation failure",
      "Fault tolerant operation",
    ],
    keywords: ["fail", "operational", "firmware", "failure", "degraded"],
    answer:
      "Fail-operational means the system continues to provide essential functions after a fault, possibly in a degraded mode. It requires redundancy or robust design.",
  },
  {
    id: "firmware-fail-silent",
    category: "firmware",
    question: "What is fail-silent behavior?",
    variations: [
      "Fail silent firmware",
      "Stop on failure",
      "No output on fault",
      "Safe silent failure",
    ],
    keywords: ["fail", "silent", "firmware", "failure", "output"],
    answer:
      "Fail-silent means the system stops producing outputs or enters a quiet state on failure. It is used when incorrect operation is more dangerous than no operation.",
  },
  {
    id: "firmware-fail-safe",
    category: "firmware",
    question: "What is fail-safe behavior?",
    variations: [
      "Fail safe firmware",
      "Safe on failure",
      "Fault safe state",
      "Fail safe vs fail operational",
    ],
    keywords: ["fail", "safe", "firmware", "failure", "safe"],
    answer:
      "Fail-safe means a failure results in a safe state. The safe state depends on the application and may be stopping, opening, closing or holding a position.",
  },
  {
    id: "firmware-fail-secure",
    category: "firmware",
    question: "What is fail-secure?",
    variations: [
      "Fail secure firmware",
      "Lock on failure",
      "Secure on fault",
      "Fail secure vs fail safe",
    ],
    keywords: ["fail", "secure", "firmware", "lock", "security"],
    answer:
      "Fail-secure means a failure results in a secure state, such as a lock remaining locked. The priority is security rather than accessibility.",
  },
  {
    id: "firmware-sil",
    category: "firmware",
    question: "What is a Safety Integrity Level?",
    variations: [
      "SIL firmware",
      "Safety integrity level",
      "IEC 61508 SIL",
      "Functional safety level",
    ],
    keywords: ["sil", "safety", "integrity", "level", "firmware"],
    answer:
      "A Safety Integrity Level is a measure of the required reliability of a safety function. It is defined in standards such as IEC 61508.",
  },
  {
    id: "firmware-asil",
    category: "firmware",
    question: "What is ASIL?",
    variations: [
      "ASIL automotive",
      "Automotive safety integrity level",
      "ISO 26262 ASIL",
      "ASIL firmware",
    ],
    keywords: ["asil", "automotive", "safety", "iso", "firmware"],
    answer:
      "ASIL, or Automotive Safety Integrity Level, is defined by ISO 26262. It classifies the risk of automotive functions and sets requirements for development.",
  },
  {
    id: "firmware-functional-safety",
    category: "firmware",
    question: "What is functional safety?",
    variations: [
      "Functional safety firmware",
      "Safety functions embedded",
      "IEC 61508 firmware",
      "Safety lifecycle embedded",
    ],
    keywords: ["functional", "safety", "firmware", "standards", "lifecycle"],
    answer:
      "Functional safety ensures that systems perform their safety functions correctly. It involves standards, processes, analysis and documentation throughout the lifecycle.",
  },
  {
    id: "firmware-iso26262",
    category: "firmware",
    question: "What is ISO 26262?",
    variations: [
      "ISO 26262 firmware",
      "Automotive functional safety",
      "ASIL standard",
      "Road vehicles safety",
    ],
    keywords: ["iso", "26262", "automotive", "safety", "firmware"],
    answer:
      "ISO 26262 is a functional safety standard for road vehicles. It covers the development lifecycle and requirements for automotive electrical and electronic systems.",
  },
  {
    id: "firmware-iec61508",
    category: "firmware",
    question: "What is IEC 61508?",
    variations: [
      "IEC 61508 firmware",
      "Functional safety standard",
      "SIL standard",
      "Industrial safety firmware",
    ],
    keywords: ["iec", "61508", "safety", "firmware", "standard"],
    answer:
      "IEC 61508 is a generic functional safety standard for electrical, electronic and programmable electronic safety-related systems. It defines SIL levels.",
  },
  {
    id: "firmware-do178",
    category: "firmware",
    question: "What is DO-178C?",
    variations: [
      "DO-178C firmware",
      "Avionics software standard",
      "Airborne software safety",
      "DAL firmware",
    ],
    keywords: ["do", "178c", "avionics", "firmware", "safety"],
    answer:
      "DO-178C is a software safety standard for airborne systems. It defines objectives and processes for software development and verification.",
  },
  {
    id: "firmware-medical",
    category: "firmware",
    question: "What standards apply to medical device firmware?",
    variations: [
      "Medical firmware standards",
      "IEC 62304 firmware",
      "Medical device software",
      "Healthcare firmware safety",
    ],
    keywords: ["medical", "firmware", "standards", "safety", "device"],
    answer:
      "IEC 62304 defines software lifecycle processes for medical device software. Other standards may also apply depending on the device and market.",
  },
  {
    id: "firmware-ul",
    category: "firmware",
    question: "Does firmware need UL certification?",
    variations: [
      "UL firmware",
      "UL certification embedded",
      "Safety certification firmware",
      "UL standards electronics",
    ],
    keywords: ["ul", "firmware", "certification", "safety", "standards"],
    answer:
      "UL certification applies to products and may include software requirements depending on the product type. The need depends on the market and application.",
  },
  {
    id: "firmware-ce",
    category: "firmware",
    question: "What does CE marking mean for firmware?",
    variations: [
      "CE firmware",
      "CE marking embedded",
      "European compliance firmware",
      "CE certification electronics",
    ],
    keywords: ["ce", "firmware", "marking", "compliance", "european"],
    answer:
      "CE marking indicates compliance with applicable European directives and regulations. Firmware may be relevant to EMC, radio, safety and other requirements.",
  },
  {
    id: "firmware-fcc",
    category: "firmware",
    question: "What does FCC certification mean for firmware?",
    variations: [
      "FCC firmware",
      "FCC certification embedded",
      "Radio compliance firmware",
      "FCC rules electronics",
    ],
    keywords: ["fcc", "firmware", "certification", "radio", "compliance"],
    answer:
      "FCC certification in the United States addresses radio frequency and electromagnetic compatibility. Firmware can affect emissions and must be considered.",
  },
  {
    id: "firmware-rohs",
    category: "firmware",
    question: "Does RoHS apply to firmware?",
    variations: [
      "RoHS firmware",
      "RoHS embedded",
      "Hazardous substances electronics",
      "RoHS compliance firmware",
    ],
    keywords: ["rohs", "firmware", "compliance", "substances", "electronics"],
    answer:
      "RoHS applies to electrical and electronic equipment and restricts certain hazardous substances. It primarily affects hardware, not firmware directly.",
  },
  {
    id: "firmware-weee",
    category: "firmware",
    question: "What is WEEE?",
    variations: [
      "WEEE firmware",
      "Waste electrical electronic",
      "WEEE compliance",
      "E waste directive",
    ],
    keywords: ["weee", "firmware", "waste", "compliance", "electronics"],
    answer:
      "WEEE is the Waste Electrical and Electronic Equipment Directive in the European Union. It addresses the disposal and recycling of electronic products.",
  },
  {
    id: "firmware-reach",
    category: "firmware",
    question: "What is REACH?",
    variations: [
      "REACH firmware",
      "REACH compliance",
      "Chemical regulation electronics",
      "REACH substances",
    ],
    keywords: ["reach", "firmware", "compliance", "chemicals", "electronics"],
    answer:
      "REACH is a European regulation concerning the registration, evaluation, authorization and restriction of chemicals. It can affect materials used in electronic products.",
  },
  {
    id: "firmware-conflict-minerals",
    category: "firmware",
    question: "What are conflict minerals?",
    variations: [
      "Conflict minerals firmware",
      "Minerals sourcing electronics",
      "Conflict free minerals",
      "Supply chain minerals",
    ],
    keywords: ["conflict", "minerals", "firmware", "supply", "chain"],
    answer:
      "Conflict minerals are certain minerals mined in conflict regions. Regulations may require disclosure of their use in products, affecting supply chain management.",
  },
  {
    id: "firmware-provenance",
    category: "firmware",
    question: "What is firmware provenance?",
    variations: [
      "Firmware provenance",
      "Origin of firmware",
      "Track firmware source",
      "Supply chain provenance",
    ],
    keywords: ["provenance", "firmware", "source", "supply", "chain"],
    answer:
      "Provenance documents the origin and history of firmware, including source, tools and build process. It supports trust and security.",
  },
  {
    id: "firmware-sbom-security",
    category: "firmware",
    question: "How does an SBOM help firmware security?",
    variations: [
      "SBOM security firmware",
      "Track vulnerabilities SBOM",
      "Software bill of materials security",
      "Dependency vulnerability firmware",
    ],
    keywords: ["sbom", "security", "firmware", "vulnerability", "dependencies"],
    answer:
      "An SBOM lists components and dependencies, helping identify affected devices when a vulnerability is announced and manage license compliance.",
  },
  {
    id: "firmware-vulnerability-scan",
    category: "firmware",
    question: "How do I scan firmware for vulnerabilities?",
    variations: [
      "Scan firmware vulnerability",
      "Firmware security scan",
      "Static analysis security",
      "Vulnerability assessment firmware",
    ],
    keywords: ["vulnerability", "scan", "firmware", "security", "analysis"],
    answer:
      "Use static analysis, dependency scanning, fuzzing and manual review. Compare dependencies against vulnerability databases.",
  },
  {
    id: "firmware-static-analysis-security",
    category: "firmware",
    question: "Can static analysis find security issues in firmware?",
    variations: [
      "Static analysis security firmware",
      "SAST embedded",
      "Find vulnerabilities static",
      "Code analysis security",
    ],
    keywords: ["static", "analysis", "security", "firmware", "sast"],
    answer:
      "Static analysis can find common security issues such as buffer overflows, format string bugs and unchecked input. It should be combined with other techniques.",
  },
  {
    id: "firmware-dynamic-analysis",
    category: "firmware",
    question: "What is dynamic analysis for firmware?",
    variations: [
      "Dynamic analysis firmware",
      "Runtime analysis embedded",
      "Monitor firmware execution",
      "Dynamic security testing",
    ],
    keywords: ["dynamic", "analysis", "firmware", "runtime", "security"],
    answer:
      "Dynamic analysis examines firmware behavior during execution, using debugging, tracing and monitoring. It can reveal issues not found by static analysis.",
  },
  {
    id: "firmware-pentest",
    category: "firmware",
    question: "How is firmware penetration testing done?",
    variations: [
      "Firmware pentest",
      "Penetration testing embedded",
      "Security testing firmware",
      "Attack firmware device",
    ],
    keywords: ["pentest", "firmware", "security", "testing", "attack"],
    answer:
      "Penetration testing assesses firmware security by attempting to exploit vulnerabilities. It may involve hardware, debug interfaces, communication and update mechanisms.",
  },
  {
    id: "firmware-red-team",
    category: "firmware",
    question: "What is red teaming for firmware?",
    variations: [
      "Red team firmware",
      "Adversarial testing embedded",
      "Attack simulation firmware",
      "Security red team",
    ],
    keywords: ["red", "team", "firmware", "security", "adversarial"],
    answer:
      "Red teaming simulates realistic attacks against the device and its ecosystem to identify weaknesses. It complements other security testing.",
  },
  {
    id: "firmware-bug-bounty-program",
    category: "firmware",
    question: "Should I run a bug bounty for my firmware?",
    variations: [
      "Bug bounty program firmware",
      "Reward security researchers",
      "Crowdsource firmware security",
      "Vulnerability disclosure program",
    ],
    keywords: ["bug", "bounty", "firmware", "security", "researchers"],
    answer:
      "A bug bounty can supplement internal security by incentivizing external researchers. It requires clear scope, rules and response processes.",
  },
  {
    id: "firmware-coordinated-disclosure",
    category: "firmware",
    question: "What is coordinated disclosure?",
    variations: [
      "Coordinated disclosure firmware",
      "Responsible disclosure embedded",
      "Report vulnerability vendor",
      "Disclosure timeline",
    ],
    keywords: ["coordinated", "disclosure", "firmware", "security", "vendor"],
    answer:
      "Coordinated disclosure gives the vendor time to fix a vulnerability before public details are released. It balances security and transparency.",
  },
  {
    id: "firmware-security-advisory",
    category: "firmware",
    question: "What is a security advisory?",
    variations: [
      "Security advisory firmware",
      "Vulnerability notice embedded",
      "Security bulletin device",
      "Advisory publication",
    ],
    keywords: ["security", "advisory", "firmware", "vulnerability", "notice"],
    answer:
      "A security advisory describes a vulnerability, affected products, impact, and remediation. It helps users respond appropriately.",
  },
  {
    id: "firmware-patch-management",
    category: "firmware",
    question: "What is patch management for firmware?",
    variations: [
      "Patch management firmware",
      "Update strategy embedded",
      "Track firmware patches",
      "Manage security updates",
    ],
    keywords: ["patch", "management", "firmware", "update", "security"],
    answer:
      "Patch management tracks, tests and deploys firmware updates. It should cover vulnerability response, compatibility and rollback.",
  },
  {
    id: "firmware-update-policy",
    category: "firmware",
    question: "What should a firmware update policy include?",
    variations: [
      "Firmware update policy",
      "Update rules embedded",
      "Security update policy",
      "OTA policy firmware",
    ],
    keywords: ["update", "policy", "firmware", "ota", "security"],
    answer:
      "An update policy defines supported update methods, security requirements, testing, rollback, user communication and end-of-support timelines.",
  },
  {
    id: "firmware-support-lifecycle",
    category: "firmware",
    question: "How long should firmware be supported?",
    variations: [
      "Firmware support lifecycle",
      "Support duration embedded",
      "Long term firmware support",
      "End of support firmware",
    ],
    keywords: ["support", "lifecycle", "firmware", "duration", "end"],
    answer:
      "Support duration depends on the product, market and regulatory requirements. It should be defined and communicated to users.",
  },
  {
    id: "firmware-long-term-support",
    category: "firmware",
    question: "What is long-term support for firmware?",
    variations: [
      "LTS firmware",
      "Long term support embedded",
      "Extended support firmware",
      "Maintain firmware long term",
    ],
    keywords: ["long", "term", "support", "firmware", "lts"],
    answer:
      "Long-term support provides security patches and critical fixes for an extended period. It is important for devices with long service lives.",
  },
  {
    id: "firmware-eol-notice",
    category: "firmware",
    question: "What should an end-of-life notice include?",
    variations: [
      "EOL notice firmware",
      "End of life announcement",
      "Discontinue firmware support",
      "Product retirement notice",
    ],
    keywords: ["eol", "notice", "firmware", "support", "end"],
    answer:
      "An end-of-life notice should state the last support date, final update plans, migration options and any security considerations.",
  },
  {
    id: "firmware-migration-path",
    category: "firmware",
    question: "What is a migration path for firmware?",
    variations: [
      "Migration path firmware",
      "Upgrade path embedded",
      "Move to new firmware",
      "Transition firmware",
    ],
    keywords: ["migration", "path", "firmware", "upgrade", "transition"],
    answer:
      "A migration path describes how users can move from one firmware version or platform to another, including compatibility, data and process steps.",
  },
  {
    id: "firmware-legacy-support",
    category: "firmware",
    question: "How do I support legacy firmware?",
    variations: [
      "Legacy firmware support",
      "Maintain old firmware",
      "Support outdated embedded",
      "Legacy device firmware",
    ],
    keywords: ["legacy", "support", "firmware", "old", "maintain"],
    answer:
      "Legacy support may require keeping old tools, documenting undocumented behavior and carefully managing changes. Security risks should be assessed.",
  },
  {
    id: "firmware-versioning-scheme",
    category: "firmware",
    question: "What versioning scheme should firmware use?",
    variations: [
      "Firmware versioning scheme",
      "Semantic versioning firmware",
      "Version numbering embedded",
      "Release versioning firmware",
    ],
    keywords: ["versioning", "scheme", "firmware", "version", "release"],
    answer:
      "Common schemes include semantic versioning (major.minor.patch) and date-based versions. The scheme should be consistent and documented.",
  },
  {
    id: "firmware-semver",
    category: "firmware",
    question: "What is semantic versioning?",
    variations: [
      "Semantic versioning firmware",
      "Semver embedded",
      "Major minor patch",
      "Version numbers meaning",
    ],
    keywords: ["semantic", "versioning", "firmware", "major", "minor"],
    answer:
      "Semantic versioning uses major.minor.patch numbers to indicate breaking changes, new features and fixes. It helps communicate compatibility.",
  },
  {
    id: "firmware-build-number",
    category: "firmware",
    question: "What is a build number?",
    variations: [
      "Build number firmware",
      "Build ID embedded",
      "Automated build number",
      "Version build identifier",
    ],
    keywords: ["build", "number", "firmware", "version", "identifier"],
    answer:
      "A build number uniquely identifies a specific build. It is often incremented automatically by the build system.",
  },
  {
    id: "firmware-commit-hash",
    category: "firmware",
    question: "Should firmware include the commit hash?",
    variations: [
      "Commit hash firmware",
      "Git hash embedded",
      "Source revision firmware",
      "Build from commit",
    ],
    keywords: ["commit", "hash", "firmware", "git", "revision"],
    answer:
      "Including the commit hash in firmware identifies the exact source revision. It helps with traceability and debugging.",
  },
  {
    id: "firmware-build-metadata",
    category: "firmware",
    question: "What build metadata should firmware include?",
    variations: [
      "Build metadata firmware",
      "Firmware build info",
      "Include build details",
      "Version build metadata",
    ],
    keywords: ["build", "metadata", "firmware", "version", "details"],
    answer:
      "Useful metadata includes version, build date, commit hash, compiler version and build configuration. It aids support and reproducibility.",
  },
  {
    id: "firmware-reproducible-build-metadata",
    category: "firmware",
    question: "Does build metadata affect reproducibility?",
    variations: [
      "Build metadata reproducibility",
      "Reproducible build timestamp",
      "Deterministic build firmware",
      "Same build output",
    ],
    keywords: [
      "build",
      "metadata",
      "reproducibility",
      "firmware",
      "deterministic",
    ],
    answer:
      "Dynamic metadata such as timestamps can make builds non-reproducible. For reproducible builds, such values should be fixed or excluded.",
  },
  {
    id: "firmware-source-control",
    category: "firmware",
    question: "What source control should firmware use?",
    variations: [
      "Source control firmware",
      "Git embedded",
      "Version control firmware",
      "Manage firmware source",
    ],
    keywords: ["source", "control", "firmware", "git", "version"],
    answer:
      "Git is widely used for firmware source control. Repositories should include source, build scripts and documentation, with clear branching and release practices.",
  },
  {
    id: "firmware-branching",
    category: "firmware",
    question: "What branching strategy should firmware use?",
    variations: [
      "Branching strategy firmware",
      "Git flow embedded",
      "Release branches firmware",
      "Development branches",
    ],
    keywords: ["branching", "strategy", "firmware", "release", "git"],
    answer:
      "The strategy depends on the team and release cadence. Common approaches include mainline development, release branches and feature branches.",
  },
  {
    id: "firmware-tagging",
    category: "firmware",
    question: "Why tag firmware releases?",
    variations: [
      "Tag firmware release",
      "Git tag embedded",
      "Mark release version",
      "Firmware release tag",
    ],
    keywords: ["tagging", "firmware", "release", "git", "version"],
    answer:
      "Tags mark specific commits as releases, making it easy to identify and reproduce released firmware.",
  },
  {
    id: "firmware-code-ownership",
    category: "firmware",
    question: "What is code ownership in firmware projects?",
    variations: [
      "Code ownership firmware",
      "Who maintains code",
      "Module ownership embedded",
      "Responsible developer",
    ],
    keywords: ["code", "ownership", "firmware", "maintain", "module"],
    answer:
      "Code ownership assigns responsibility for modules or areas. It improves maintenance and review quality.",
  },
  {
    id: "firmware-code-review-process",
    category: "firmware",
    question: "What is a good code review process for firmware?",
    variations: [
      "Code review process firmware",
      "How to review embedded code",
      "Peer review firmware",
      "Review workflow embedded",
    ],
    keywords: ["code", "review", "process", "firmware", "peer"],
    answer:
      "A good process includes clear criteria, timely reviews, constructive feedback and follow-up. Reviews should cover correctness, safety, maintainability and standards.",
  },
  {
    id: "firmware-pull-request",
    category: "firmware",
    question: "How should firmware pull requests be structured?",
    variations: [
      "Pull request firmware",
      "PR embedded",
      "Merge request firmware",
      "Review changes firmware",
    ],
    keywords: ["pull", "request", "firmware", "review", "merge"],
    answer:
      "Pull requests should be focused, include a clear description and tests, and be reviewed before merging. Large changes should be split where possible.",
  },
  {
    id: "firmware-continuous-delivery",
    category: "firmware",
    question: "Can firmware use continuous delivery?",
    variations: [
      "Continuous delivery firmware",
      "CD embedded",
      "Automated firmware release",
      "Deploy firmware pipeline",
    ],
    keywords: ["continuous", "delivery", "firmware", "release", "automation"],
    answer:
      "Continuous delivery can automate building, testing and preparing firmware releases. Actual deployment may require additional hardware testing and approval.",
  },
  {
    id: "firmware-release-candidate",
    category: "firmware",
    question: "What is a release candidate?",
    variations: [
      "Release candidate firmware",
      "RC build embedded",
      "Pre release firmware",
      "Candidate version",
    ],
    keywords: ["release", "candidate", "firmware", "rc", "pre"],
    answer:
      "A release candidate is a version that is believed ready for release but still subject to final testing. If no issues are found, it becomes the release.",
  },
  {
    id: "firmware-golden-image",
    category: "firmware",
    question: "What is a golden firmware image?",
    variations: [
      "Golden image firmware",
      "Master firmware image",
      "Reference firmware build",
      "Known good image",
    ],
    keywords: ["golden", "image", "firmware", "reference", "known"],
    answer:
      "A golden image is a known-good firmware build used as a reference for testing, production or recovery.",
  },
  {
    id: "firmware-production-image",
    category: "firmware",
    question: "What is a production firmware image?",
    variations: [
      "Production firmware image",
      "Release image embedded",
      "Factory firmware build",
      "Shipping firmware",
    ],
    keywords: ["production", "image", "firmware", "release", "factory"],
    answer:
      "A production image is the firmware version approved for manufacturing and shipment. It should be tested, signed and traceable.",
  },
  {
    id: "firmware-factory-image",
    category: "firmware",
    question: "What is a factory firmware image?",
    variations: [
      "Factory firmware image",
      "Initial firmware build",
      "Manufacturing firmware",
      "Ship firmware",
    ],
    keywords: ["factory", "image", "firmware", "manufacturing", "initial"],
    answer:
      "A factory image is programmed during manufacturing. It may include test modes or initial configuration.",
  },
  {
    id: "firmware-update-image",
    category: "firmware",
    question: "What is a firmware update image?",
    variations: [
      "Update image firmware",
      "OTA image",
      "Patch image embedded",
      "Firmware package",
    ],
    keywords: ["update", "image", "firmware", "ota", "package"],
    answer:
      "A firmware update image is the package delivered to devices for updating. It may be signed, compressed and formatted for the update mechanism.",
  },
  {
    id: "firmware-image-format",
    category: "firmware",
    question: "What format should a firmware image use?",
    variations: [
      "Firmware image format",
      "Binary hex image",
      "OTA image format",
      "Firmware package format",
    ],
    keywords: ["image", "format", "firmware", "binary", "hex"],
    answer:
      "The format depends on the bootloader and update mechanism. Common formats include raw binary, HEX, signed packages and vendor-specific formats.",
  },
  {
    id: "firmware-image-header",
    category: "firmware",
    question: "What is a firmware image header?",
    variations: [
      "Image header firmware",
      "Metadata in firmware image",
      "Header fields firmware",
      "Firmware image metadata",
    ],
    keywords: ["image", "header", "firmware", "metadata", "fields"],
    answer:
      "An image header contains metadata such as version, size, checksum, signature and target device. The bootloader uses it to validate and load the image.",
  },
  {
    id: "firmware-image-checksum",
    category: "firmware",
    question: "How is a firmware image checksum used?",
    variations: [
      "Image checksum firmware",
      "CRC firmware image",
      "Verify firmware integrity",
      "Checksum before boot",
    ],
    keywords: ["image", "checksum", "firmware", "integrity", "boot"],
    answer:
      "A checksum or CRC detects corruption in the firmware image. The bootloader verifies it before running the image.",
  },
  {
    id: "firmware-image-signature",
    category: "firmware",
    question: "How is a firmware image signature verified?",
    variations: [
      "Image signature firmware",
      "Verify signed firmware",
      "Signature check boot",
      "Secure image verification",
    ],
    keywords: ["image", "signature", "firmware", "verify", "secure"],
    answer:
      "The bootloader computes a hash of the image and verifies the signature using a trusted public key. If valid, the image is allowed to run.",
  },
  {
    id: "firmware-image-encryption",
    category: "firmware",
    question: "Can firmware images be encrypted?",
    variations: [
      "Encrypt firmware image",
      "Encrypted boot image",
      "Protect firmware image",
      "Image encryption embedded",
    ],
    keywords: ["image", "encryption", "firmware", "protect", "security"],
    answer:
      "Firmware images can be encrypted to protect confidentiality. The device decrypts the image using a protected key before running it.",
  },
  {
    id: "firmware-image-compression",
    category: "firmware",
    question: "Can firmware images be compressed?",
    variations: [
      "Compress firmware image",
      "Compressed update",
      "Reduce firmware image size",
      "Image compression embedded",
    ],
    keywords: ["image", "compression", "firmware", "size", "update"],
    answer:
      "Compression reduces image size for storage or transmission. The bootloader or update process must decompress it, which requires time and memory.",
  },
  {
    id: "firmware-image-delta",
    category: "firmware",
    question: "What is a delta firmware update?",
    variations: [
      "Delta update firmware",
      "Differential firmware update",
      "Patch only changes",
      "Small update package",
    ],
    keywords: ["delta", "update", "firmware", "patch", "differential"],
    answer:
      "A delta update contains only the differences between firmware versions, reducing download size. It requires a reliable method to reconstruct the full image.",
  },
  {
    id: "firmware-full-update",
    category: "firmware",
    question: "What is a full firmware update?",
    variations: [
      "Full update firmware",
      "Complete image update",
      "Replace entire firmware",
      "Full OTA",
    ],
    keywords: ["full", "update", "firmware", "image", "ota"],
    answer:
      "A full update replaces the entire firmware image. It is simpler and more robust than delta updates but larger.",
  },
  {
    id: "firmware-update-size",
    category: "firmware",
    question: "How do I reduce firmware update size?",
    variations: [
      "Reduce update size",
      "Smaller firmware update",
      "Compress OTA",
      "Delta update size",
    ],
    keywords: ["update", "size", "firmware", "reduce", "compress"],
    answer:
      "Use compression, delta updates, remove unused features and optimize the build. The method should balance size, complexity and reliability.",
  },
  {
    id: "firmware-update-time",
    category: "firmware",
    question: "How long should a firmware update take?",
    variations: [
      "Update time firmware",
      "OTA duration",
      "How long to update",
      "Fast firmware update",
    ],
    keywords: ["update", "time", "firmware", "ota", "duration"],
    answer:
      "Update time depends on image size, connection speed, flash write speed and verification. It should be short enough to avoid user disruption and power loss risk.",
  },
  {
    id: "firmware-update-power",
    category: "firmware",
    question: "What happens if power is lost during a firmware update?",
    variations: [
      "Power loss update firmware",
      "Interrupted OTA",
      "Update fails power",
      "Recover from failed update",
    ],
    keywords: ["power", "loss", "update", "firmware", "recovery"],
    answer:
      "A robust update system writes to an inactive area and verifies before switching, so a power loss leaves the old firmware intact. Recovery mechanisms handle incomplete updates.",
  },
  {
    id: "firmware-update-verification",
    category: "firmware",
    question: "How is a firmware update verified?",
    variations: [
      "Verify update firmware",
      "Check OTA integrity",
      "Update validation",
      "Confirm firmware update",
    ],
    keywords: ["update", "verification", "firmware", "integrity", "validate"],
    answer:
      "The update is verified using checksums, hashes or signatures before being accepted. Some systems also perform a test boot before committing.",
  },
  {
    id: "firmware-update-rollback",
    category: "firmware",
    question: "How does rollback work after a failed update?",
    variations: [
      "Rollback failed update",
      "Revert firmware OTA",
      "Update recovery",
      "Restore previous firmware",
    ],
    keywords: ["rollback", "update", "firmware", "failed", "recovery"],
    answer:
      "The bootloader detects a failed update and boots the previous known-good image. This requires keeping the old image and a reliable selection mechanism.",
  },
  {
    id: "firmware-update-confirmation",
    category: "firmware",
    question: "What is update confirmation?",
    variations: [
      "Confirm update firmware",
      "Mark update valid",
      "Commit firmware update",
      "Update success flag",
    ],
    keywords: ["update", "confirmation", "firmware", "valid", "commit"],
    answer:
      "After a successful update and test, the system marks the new image as valid. Until then, the bootloader can revert to the previous image.",
  },
  {
    id: "firmware-update-test-boot",
    category: "firmware",
    question: "What is a test boot after update?",
    variations: [
      "Test boot firmware",
      "Trial run update",
      "Verify new firmware",
      "Boot test OTA",
    ],
    keywords: ["test", "boot", "firmware", "update", "verify"],
    answer:
      "A test boot runs the new firmware briefly to verify basic operation before permanently committing. If it fails, the system rolls back.",
  },
  {
    id: "firmware-update-atomic",
    category: "firmware",
    question: "What is an atomic firmware update?",
    variations: [
      "Atomic update firmware",
      "All or nothing update",
      "Safe firmware update",
      "Atomic OTA",
    ],
    keywords: ["atomic", "update", "firmware", "safe", "ota"],
    answer:
      "An atomic update either completes fully or leaves the previous firmware intact. It prevents partially updated firmware from running.",
  },
  {
    id: "firmware-update-scheduling",
    category: "firmware",
    question: "How do I schedule firmware updates?",
    variations: [
      "Schedule update firmware",
      "When to update device",
      "Update window embedded",
      "OTA scheduling",
    ],
    keywords: ["schedule", "update", "firmware", "window", "ota"],
    answer:
      "Updates can be scheduled during low-use periods, with user consent or automatically. Power, connectivity and user impact should be considered.",
  },
  {
    id: "firmware-update-notification",
    category: "firmware",
    question: "How do I notify users about a firmware update?",
    variations: [
      "Update notification firmware",
      "Tell user update available",
      "OTA notification",
      "Firmware update alert",
    ],
    keywords: ["update", "notification", "firmware", "user", "alert"],
    answer:
      "Notifications can be shown on the device, sent through an app or communicated by other means. They should explain the update and any required action.",
  },
  {
    id: "firmware-update-consent",
    category: "firmware",
    question: "Should firmware updates require user consent?",
    variations: [
      "Update consent firmware",
      "User approve update",
      "Automatic vs manual update",
      "OTA permission",
    ],
    keywords: ["update", "consent", "firmware", "user", "automatic"],
    answer:
      "Consent requirements depend on the product and policy. Security updates are often automatic, while major changes may require user approval.",
  },
  {
    id: "firmware-update-channel",
    category: "firmware",
    question: "What is an update channel?",
    variations: [
      "Update channel firmware",
      "Stable beta channel",
      "Release track embedded",
      "OTA channel",
    ],
    keywords: ["update", "channel", "firmware", "stable", "beta"],
    answer:
      "An update channel defines which updates a device receives, such as stable, beta or long-term support. It allows controlled rollout.",
  },
  {
    id: "firmware-staged-rollout",
    category: "firmware",
    question: "What is a staged firmware rollout?",
    variations: [
      "Staged rollout firmware",
      "Phased update",
      "Gradual deployment OTA",
      "Canary update",
    ],
    keywords: ["staged", "rollout", "firmware", "update", "phased"],
    answer:
      "A staged rollout releases updates to a subset of devices first, then expands. It limits the impact of any problems.",
  },
  {
    id: "firmware-canary",
    category: "firmware",
    question: "What is a canary firmware release?",
    variations: [
      "Canary firmware",
      "Canary release embedded",
      "Test group update",
      "Early access firmware",
    ],
    keywords: ["canary", "firmware", "release", "update", "test"],
    answer:
      "A canary release is deployed to a small group before wider rollout, allowing issues to be detected early.",
  },
  {
    id: "firmware-a-b-testing",
    category: "firmware",
    question: "Can firmware use A/B testing?",
    variations: [
      "A/B testing firmware",
      "Compare firmware versions",
      "Split test embedded",
      "Feature comparison firmware",
    ],
    keywords: ["a", "b", "testing", "firmware", "compare"],
    answer:
      "A/B testing compares two firmware versions on different groups. It can evaluate features or performance but requires careful design and monitoring.",
  },
  {
    id: "firmware-feature-flag",
    category: "firmware",
    question: "What is a feature flag in firmware?",
    variations: [
      "Feature flag firmware",
      "Toggle feature embedded",
      "Runtime feature switch",
      "Enable disable feature",
    ],
    keywords: ["feature", "flag", "firmware", "toggle", "runtime"],
    answer:
      "A feature flag enables or disables functionality at runtime or compile time. It allows controlled rollout and testing.",
  },
  {
    id: "firmware-remote-config",
    category: "firmware",
    question: "Can firmware configuration be changed remotely?",
    variations: [
      "Remote configuration firmware",
      "Cloud config embedded",
      "Update settings remotely",
      "Remote parameter change",
    ],
    keywords: ["remote", "configuration", "firmware", "cloud", "settings"],
    answer:
      "Remote configuration can adjust parameters without a firmware update. Security, validation and fallback defaults should be considered.",
  },
  {
    id: "firmware-remote-command",
    category: "firmware",
    question: "Can firmware accept remote commands?",
    variations: [
      "Remote command firmware",
      "Control device remotely",
      "Command interface embedded",
      "Cloud command MCU",
    ],
    keywords: ["remote", "command", "firmware", "control", "cloud"],
    answer:
      "Remote commands allow external control or configuration. They should be authenticated, authorized and validated to prevent misuse.",
  },
  {
    id: "firmware-command-parser",
    category: "firmware",
    question: "How do I implement a command parser in firmware?",
    variations: [
      "Command parser firmware",
      "Parse serial commands",
      "CLI embedded",
      "Command interpreter MCU",
    ],
    keywords: ["command", "parser", "firmware", "cli", "serial"],
    answer:
      "A command parser reads input, tokenizes it, matches commands and executes actions. It should handle invalid input gracefully.",
  },
  {
    id: "firmware-cli",
    category: "firmware",
    question: "How do I add a CLI to firmware?",
    variations: [
      "CLI firmware",
      "Command line embedded",
      "Serial console MCU",
      "Debug console firmware",
    ],
    keywords: ["cli", "firmware", "console", "serial", "command"],
    answer:
      "A CLI can be implemented over serial, USB or network. It provides commands for configuration, testing and diagnostics.",
  },
  {
    id: "firmware-shell",
    category: "firmware",
    question: "What is a shell in firmware?",
    variations: [
      "Shell firmware",
      "Interactive console embedded",
      "Command shell MCU",
      "Debug shell",
    ],
    keywords: ["shell", "firmware", "console", "interactive", "command"],
    answer:
      "A shell provides an interactive command interface. It is useful for development, testing and field diagnostics.",
  },
  {
    id: "firmware-at-command",
    category: "firmware",
    question: "What are AT commands?",
    variations: [
      "AT commands firmware",
      "Modem commands embedded",
      "AT command parser",
      "Cellular module commands",
    ],
    keywords: ["at", "commands", "firmware", "modem", "cellular"],
    answer:
      "AT commands are a command set used to control modems and communication modules. Firmware sends them over serial or USB to configure and use the module.",
  },
  {
    id: "firmware-modem",
    category: "firmware",
    question: "How do I use a cellular modem in firmware?",
    variations: [
      "Cellular modem firmware",
      "4G LTE module code",
      "Modem control embedded",
      "SIM7600 firmware",
    ],
    keywords: ["modem", "firmware", "cellular", "lte", "communication"],
    answer:
      "Firmware configures the modem, establishes a data connection, and sends or receives data. AT commands or a vendor library are commonly used.",
  },
  {
    id: "firmware-sim",
    category: "firmware",
    question: "How does firmware handle SIM cards?",
    variations: [
      "SIM firmware",
      "SIM card embedded",
      "APN configuration",
      "SIM detection code",
    ],
    keywords: ["sim", "firmware", "cellular", "apn", "network"],
    answer:
      "Firmware may need to detect the SIM, enter a PIN, configure the APN and monitor network registration. The modem usually manages the SIM interface.",
  },
  {
    id: "firmware-apn",
    category: "firmware",
    question: "What is APN?",
    variations: [
      "APN firmware",
      "Access point name cellular",
      "Configure APN modem",
      "Cellular data settings",
    ],
    keywords: ["apn", "firmware", "cellular", "network", "data"],
    answer:
      "APN, or Access Point Name, identifies the network gateway for cellular data. Firmware or configuration sets the APN for the carrier.",
  },
  {
    id: "firmware-signal",
    category: "firmware",
    question: "How do I check cellular signal strength?",
    variations: [
      "Signal strength firmware",
      "RSSI cellular",
      "Check signal modem",
      "Network signal code",
    ],
    keywords: ["signal", "strength", "firmware", "cellular", "rssi"],
    answer:
      "Modems provide signal strength indicators such as RSSI or RSRP. Firmware can query and display these values.",
  },
  {
    id: "firmware-network-registration",
    category: "firmware",
    question: "How do I check network registration?",
    variations: [
      "Network registration firmware",
      "Modem registration state",
      "Check cellular registered",
      "Network status code",
    ],
    keywords: ["network", "registration", "firmware", "modem", "cellular"],
    answer:
      "Modems report registration status. Firmware can query this to determine if the device is connected to the network.",
  },
  {
    id: "firmware-data-connection",
    category: "firmware",
    question: "How do I establish a data connection in firmware?",
    variations: [
      "Data connection firmware",
      "PDP context modem",
      "Internet over cellular",
      "Modem data session",
    ],
    keywords: ["data", "connection", "firmware", "cellular", "modem"],
    answer:
      "Firmware configures the APN, activates a PDP context or data session, obtains an IP address and then communicates through the modem.",
  },
  {
    id: "firmware-modem-sleep",
    category: "firmware",
    question: "Can a cellular modem sleep?",
    variations: [
      "Modem sleep firmware",
      "Low power cellular",
      "Modem power saving",
      "Sleep mode modem",
    ],
    keywords: ["modem", "sleep", "firmware", "low", "power"],
    answer:
      "Many modems support sleep or power-saving modes. Firmware can control these to reduce power consumption, but must handle wake-up timing.",
  },
  {
    id: "firmware-gnss",
    category: "firmware",
    question: "How do I use GNSS in firmware?",
    variations: [
      "GNSS firmware",
      "GPS module code",
      "Satellite positioning embedded",
      "Read GNSS data",
    ],
    keywords: ["gnss", "firmware", "gps", "position", "satellite"],
    answer:
      "Firmware configures the GNSS module, reads NMEA or binary messages, and extracts position, time, speed and other data.",
  },
  {
    id: "firmware-nmea",
    category: "firmware",
    question: "What is NMEA?",
    variations: [
      "NMEA firmware",
      "NMEA sentences GPS",
      "Parse NMEA code",
      "GPS output format",
    ],
    keywords: ["nmea", "firmware", "gps", "parse", "sentences"],
    answer:
      "NMEA is a text-based format for GNSS data. Sentences start with $ and contain comma-separated fields. Firmware parses the sentences for position and time.",
  },
  {
    id: "firmware-ublox",
    category: "firmware",
    question: "How do I use a u-blox GNSS module?",
    variations: [
      "u-blox firmware",
      "UBX protocol GPS",
      "Configure u-blox module",
      "u-blox code",
    ],
    keywords: ["ublox", "firmware", "gps", "gnss", "protocol"],
    answer:
      "u-blox modules support NMEA and the UBX binary protocol. Firmware can use UBX for configuration and advanced features.",
  },
  {
    id: "firmware-gps-fix",
    category: "firmware",
    question: "How do I know when GPS has a fix?",
    variations: [
      "GPS fix firmware",
      "Check GPS lock",
      "Valid position GPS",
      "Fix status code",
    ],
    keywords: ["gps", "fix", "firmware", "lock", "position"],
    answer:
      "GNSS modules report fix status, such as no fix, 2D fix or 3D fix. Firmware should check validity before using position data.",
  },
  {
    id: "firmware-gps-accuracy",
    category: "firmware",
    question: "How accurate is GPS?",
    variations: [
      "GPS accuracy firmware",
      "Position accuracy GPS",
      "How precise is GPS",
      "GPS error",
    ],
    keywords: ["gps", "accuracy", "firmware", "position", "error"],
    answer:
      "GPS accuracy depends on satellite geometry, signal conditions, receiver quality and corrections. Typical accuracy is a few meters, with better performance using SBAS or RTK.",
  },
  {
    id: "firmware-rtk",
    category: "firmware",
    question: "What is RTK in GNSS?",
    variations: [
      "RTK firmware",
      "Real time kinematic GPS",
      "High precision GNSS",
      "RTK corrections",
    ],
    keywords: ["rtk", "firmware", "gnss", "precision", "corrections"],
    answer:
      "RTK, or Real-Time Kinematic, uses corrections from a base station to achieve centimeter-level accuracy. It requires additional communication and processing.",
  },
  {
    id: "firmware-pps-output",
    category: "firmware",
    question: "How do I use PPS output from GPS?",
    variations: [
      "PPS output firmware",
      "GPS 1PPS",
      "Pulse per second GPS",
      "Time sync PPS",
    ],
    keywords: ["pps", "output", "firmware", "gps", "time"],
    answer:
      "PPS provides a precise timing pulse, often aligned to UTC. Firmware can use it to synchronize timekeeping or trigger events.",
  },
  {
    id: "firmware-inertial",
    category: "firmware",
    question: "What is an inertial measurement unit?",
    variations: [
      "IMU firmware",
      "Accelerometer gyroscope",
      "Inertial sensor embedded",
      "Motion sensing MCU",
    ],
    keywords: ["inertial", "imu", "firmware", "motion", "sensor"],
    answer:
      "An IMU measures acceleration and angular rate, often with a magnetometer. Firmware reads and processes the data for motion, orientation and navigation.",
  },
  {
    id: "firmware-accelerometer",
    category: "firmware",
    question: "How do I read an accelerometer in firmware?",
    variations: [
      "Accelerometer firmware",
      "Read acceleration MCU",
      "Accelerometer code",
      "Motion sensor data",
    ],
    keywords: ["accelerometer", "firmware", "read", "motion", "sensor"],
    answer:
      "Firmware configures the accelerometer, reads the output values and converts them to acceleration units. Calibration and filtering may be needed.",
  },
  {
    id: "firmware-gyroscope",
    category: "firmware",
    question: "How do I read a gyroscope in firmware?",
    variations: [
      "Gyroscope firmware",
      "Read angular rate",
      "Gyro code embedded",
      "Rotation sensor MCU",
    ],
    keywords: ["gyroscope", "firmware", "read", "rotation", "sensor"],
    answer:
      "Firmware reads angular rate values, converts them to degrees or radians per second and may integrate them to estimate angle. Drift and calibration should be considered.",
  },
  {
    id: "firmware-magnetometer",
    category: "firmware",
    question: "How do I read a magnetometer in firmware?",
    variations: [
      "Magnetometer firmware",
      "Compass sensor code",
      "Read magnetic field",
      "Magnetic sensor MCU",
    ],
    keywords: ["magnetometer", "firmware", "read", "magnetic", "sensor"],
    answer:
      "Firmware reads magnetic field values and may use them for heading estimation. Calibration for hard and soft iron effects is often required.",
  },
  {
    id: "firmware-imu-calibration",
    category: "firmware",
    question: "How do I calibrate an IMU in firmware?",
    variations: [
      "IMU calibration firmware",
      "Calibrate accelerometer gyro",
      "Sensor calibration IMU",
      "Motion sensor calibration",
    ],
    keywords: ["imu", "calibration", "firmware", "accelerometer", "gyro"],
    answer:
      "Calibration determines offsets and scale factors for each axis. It may involve placing the sensor in known orientations and recording outputs.",
  },
  {
    id: "firmware-attitude",
    category: "firmware",
    question: "How do I estimate orientation from an IMU?",
    variations: [
      "Attitude estimation firmware",
      "Orientation from IMU",
      "Roll pitch yaw code",
      "Sensor fusion orientation",
    ],
    keywords: ["attitude", "firmware", "orientation", "imu", "fusion"],
    answer:
      "Orientation can be estimated using complementary or Kalman filters that combine accelerometer, gyroscope and magnetometer data.",
  },
  {
    id: "firmware-quaternion",
    category: "firmware",
    question: "What is a quaternion used for in firmware?",
    variations: [
      "Quaternion firmware",
      "Rotation representation embedded",
      "Quaternion vs Euler",
      "Attitude quaternion",
    ],
    keywords: ["quaternion", "firmware", "rotation", "attitude", "orientation"],
    answer:
      "Quaternions represent 3D rotations without gimbal lock. They are used in attitude estimation and motion processing.",
  },
  {
    id: "firmware-euler",
    category: "firmware",
    question: "What are Euler angles?",
    variations: [
      "Euler angles firmware",
      "Roll pitch yaw embedded",
      "Orientation angles",
      "Euler vs quaternion",
    ],
    keywords: ["euler", "angles", "firmware", "orientation", "rotation"],
    answer:
      "Euler angles describe orientation using three rotations, commonly roll, pitch and yaw. They are intuitive but can suffer from gimbal lock.",
  },
  {
    id: "firmware-gimbal-lock",
    category: "firmware",
    question: "What is gimbal lock?",
    variations: [
      "Gimbal lock firmware",
      "Euler angle problem",
      "Why avoid Euler",
      "Rotation singularity",
    ],
    keywords: ["gimbal", "lock", "firmware", "euler", "rotation"],
    answer:
      "Gimbal lock is a situation where two rotation axes align, losing a degree of freedom. Quaternions avoid this problem.",
  },
  {
    id: "firmware-pedometer",
    category: "firmware",
    question: "How do I implement a pedometer in firmware?",
    variations: [
      "Pedometer firmware",
      "Step counting code",
      "Detect steps accelerometer",
      "Step counter embedded",
    ],
    keywords: ["pedometer", "firmware", "steps", "accelerometer", "motion"],
    answer:
      "A pedometer detects steps from accelerometer patterns, often using thresholds or peak detection. Filtering and calibration improve accuracy.",
  },
  {
    id: "firmware-tap-detection",
    category: "firmware",
    question: "How do I detect taps with an accelerometer?",
    variations: [
      "Tap detection firmware",
      "Single double tap",
      "Accelerometer tap",
      "Touch alternative sensor",
    ],
    keywords: ["tap", "detection", "firmware", "accelerometer", "motion"],
    answer:
      "Tap detection looks for characteristic acceleration spikes. Some accelerometers provide built-in tap detection.",
  },
  {
    id: "firmware-freefall",
    category: "firmware",
    question: "How do I detect freefall?",
    variations: [
      "Freefall detection firmware",
      "Accelerometer freefall",
      "Detect drop device",
      "Zero g detection",
    ],
    keywords: ["freefall", "detection", "firmware", "accelerometer", "motion"],
    answer:
      "Freefall is detected when acceleration magnitude is near zero for a period. Some accelerometers include this function.",
  },
  {
    id: "firmware-tilt",
    category: "firmware",
    question: "How do I detect tilt in firmware?",
    variations: [
      "Tilt detection firmware",
      "Orientation change sensor",
      "Tilt sensor code",
      "Angle detection MCU",
    ],
    keywords: ["tilt", "detection", "firmware", "orientation", "sensor"],
    answer:
      "Tilt can be detected by comparing accelerometer readings to gravity or using a dedicated tilt sensor. Thresholds and filtering are applied.",
  },
  {
    id: "firmware-vibration",
    category: "firmware",
    question: "How do I measure vibration in firmware?",
    variations: [
      "Vibration firmware",
      "Vibration sensor code",
      "Detect vibration MCU",
      "Accelerometer vibration",
    ],
    keywords: ["vibration", "firmware", "sensor", "measure", "motion"],
    answer:
      "Vibration can be measured with an accelerometer or dedicated sensor. Firmware processes the signal for amplitude, frequency or RMS value.",
  },
  {
    id: "firmware-shock",
    category: "firmware",
    question: "How do I detect shock or impact?",
    variations: [
      "Shock detection firmware",
      "Impact sensor code",
      "Detect sudden acceleration",
      "Shock logging MCU",
    ],
    keywords: ["shock", "impact", "firmware", "detection", "acceleration"],
    answer:
      "Shock detection uses accelerometer thresholds or interrupt features. Events can be logged or used to trigger actions.",
  },
  {
    id: "firmware-load-cell",
    category: "firmware",
    question: "How do I read a load cell in firmware?",
    variations: [
      "Load cell firmware",
      "Weight sensor code",
      "HX711 firmware",
      "Force measurement MCU",
    ],
    keywords: ["load", "cell", "firmware", "weight", "force", "hx711"],
    answer:
      "A load cell produces a small voltage proportional to force. An amplifier such as HX711 converts it to digital data. Firmware reads and converts to weight.",
  },
  {
    id: "firmware-strain",
    category: "firmware",
    question: "How do I read a strain gauge?",
    variations: [
      "Strain gauge firmware",
      "Measure strain MCU",
      "Bridge sensor code",
      "Strain measurement",
    ],
    keywords: ["strain", "gauge", "firmware", "measure", "bridge"],
    answer:
      "Strain gauges are often used in a bridge configuration. An instrumentation amplifier and ADC convert the small differential signal for the microcontroller.",
  },
  {
    id: "firmware-pressure-sensor",
    category: "firmware",
    question: "How do I read a pressure sensor?",
    variations: [
      "Pressure sensor firmware",
      "Read pressure MCU",
      "Pressure transducer code",
      "Barometric sensor firmware",
    ],
    keywords: ["pressure", "sensor", "firmware", "read", "transducer"],
    answer:
      "Pressure sensors may be analog or digital. Firmware reads the output and applies calibration to calculate pressure. Temperature compensation may be needed.",
  },
  {
    id: "firmware-flow",
    category: "firmware",
    question: "How do I read a flow sensor?",
    variations: [
      "Flow sensor firmware",
      "Measure flow rate",
      "Flow meter code MCU",
      "Pulse flow sensor",
    ],
    keywords: ["flow", "sensor", "firmware", "measure", "rate"],
    answer:
      "Flow sensors may output pulses, analog voltage or digital data. Firmware counts pulses or reads values to calculate flow rate and total volume.",
  },
  {
    id: "firmware-level",
    category: "firmware",
    question: "How do I measure liquid level in firmware?",
    variations: [
      "Level sensor firmware",
      "Measure liquid level",
      "Tank level code",
      "Ultrasonic level sensor",
    ],
    keywords: ["level", "sensor", "firmware", "measure", "liquid"],
    answer:
      "Level can be measured using ultrasonic, pressure, float, capacitive or other sensors. Firmware converts the reading to level or volume using tank geometry.",
  },
  {
    id: "firmware-ph",
    category: "firmware",
    question: "How do I read a pH sensor in firmware?",
    variations: [
      "pH sensor firmware",
      "Measure pH MCU",
      "pH probe code",
      "Analog pH sensor",
    ],
    keywords: ["ph", "sensor", "firmware", "measure", "analog"],
    answer:
      "pH probes produce a high-impedance voltage. A conditioning circuit and ADC are needed. Firmware applies calibration from known buffer solutions.",
  },
  {
    id: "firmware-conductivity",
    category: "firmware",
    question: "How do I measure conductivity in firmware?",
    variations: [
      "Conductivity sensor firmware",
      "EC sensor code",
      "Measure water conductivity",
      "TDS sensor firmware",
    ],
    keywords: ["conductivity", "firmware", "sensor", "measure", "water"],
    answer:
      "Conductivity can be measured using an AC excitation and a probe. Firmware reads the result and applies temperature compensation.",
  },
  {
    id: "firmware-turbidity",
    category: "firmware",
    question: "How do I measure turbidity in firmware?",
    variations: [
      "Turbidity sensor firmware",
      "Water clarity sensor",
      "Turbidity code MCU",
      "Optical water sensor",
    ],
    keywords: ["turbidity", "firmware", "sensor", "water", "optical"],
    answer:
      "Turbidity sensors often use optical methods. Firmware reads the output and applies calibration to determine turbidity.",
  },
  {
    id: "firmware-gas",
    category: "firmware",
    question: "How do I read a gas sensor in firmware?",
    variations: [
      "Gas sensor firmware",
      "MQ sensor code",
      "Air quality sensor MCU",
      "Detect gas embedded",
    ],
    keywords: ["gas", "sensor", "firmware", "air", "quality"],
    answer:
      "Gas sensors may be analog or digital. Firmware reads the output, warms up the sensor as required and applies calibration or conversion curves.",
  },
  {
    id: "firmware-co2",
    category: "firmware",
    question: "How do I measure CO2 in firmware?",
    variations: [
      "CO2 sensor firmware",
      "Read CO2 MCU",
      "CO2 ppm code",
      "NDIR sensor firmware",
    ],
    keywords: ["co2", "sensor", "firmware", "measure", "ndir"],
    answer:
      "CO2 sensors often use NDIR technology and communicate over UART, I2C or analog. Firmware reads and scales the value to ppm.",
  },
  {
    id: "firmware-air-quality",
    category: "firmware",
    question: "How do I measure air quality in firmware?",
    variations: [
      "Air quality firmware",
      "PM2.5 sensor code",
      "AQI measurement MCU",
      "Particulate sensor",
    ],
    keywords: ["air", "quality", "firmware", "sensor", "particulate"],
    answer:
      "Air quality can be measured using particulate, gas or VOC sensors. Firmware reads the data and may calculate an index.",
  },
  {
    id: "firmware-dust",
    category: "firmware",
    question: "How do I measure dust in firmware?",
    variations: [
      "Dust sensor firmware",
      "PM sensor code",
      "Particulate matter MCU",
      "Dust measurement embedded",
    ],
    keywords: ["dust", "sensor", "firmware", "pm", "particulate"],
    answer:
      "Dust sensors use optical or laser methods to detect particles. Firmware reads the output and converts to concentration.",
  },
  {
    id: "firmware-radiation",
    category: "firmware",
    question: "How do I measure radiation in firmware?",
    variations: [
      "Radiation sensor firmware",
      "Geiger counter code",
      "Radiation detection MCU",
      "Dose measurement",
    ],
    keywords: ["radiation", "sensor", "firmware", "geiger", "dose"],
    answer:
      "Radiation sensors such as Geiger-Mueller tubes produce pulses. Firmware counts pulses over time to calculate radiation rate.",
  },
  {
    id: "firmware-light",
    category: "firmware",
    question: "How do I measure light intensity in firmware?",
    variations: [
      "Light sensor firmware",
      "LDR code MCU",
      "Lux measurement",
      "Photodiode firmware",
    ],
    keywords: ["light", "sensor", "firmware", "lux", "measure"],
    answer:
      "Light can be measured with LDRs, photodiodes or digital sensors. Firmware reads and converts the output to lux or a relative value.",
  },
  {
    id: "firmware-color",
    category: "firmware",
    question: "How do I measure color in firmware?",
    variations: [
      "Color sensor firmware",
      "RGB sensor code",
      "TCS3200 firmware",
      "Detect color MCU",
    ],
    keywords: ["color", "sensor", "firmware", "rgb", "measure"],
    answer:
      "Color sensors measure red, green and blue components. Firmware reads the values and can identify or classify colors.",
  },
  {
    id: "firmware-proximity",
    category: "firmware",
    question: "How do I measure proximity in firmware?",
    variations: [
      "Proximity sensor firmware",
      "Distance sensor code",
      "IR proximity MCU",
      "Object detection firmware",
    ],
    keywords: ["proximity", "sensor", "firmware", "distance", "detection"],
    answer:
      "Proximity can be measured using IR, ultrasonic, capacitive or other sensors. Firmware reads the output and applies thresholds or calculations.",
  },
  {
    id: "firmware-touch-cap",
    category: "firmware",
    question: "How do I use capacitive touch in firmware?",
    variations: [
      "Capacitive touch firmware",
      "Touch sensing MCU",
      "Touch button code",
      "Capacitive sensor embedded",
    ],
    keywords: ["capacitive", "touch", "firmware", "button", "sensor"],
    answer:
      "Capacitive touch senses changes in capacitance. Some microcontrollers have dedicated touch peripherals. Firmware configures and reads them, applying thresholds and debouncing.",
  },
  {
    id: "firmware-matrix",
    category: "firmware",
    question: "How do I scan a sensor matrix in firmware?",
    variations: [
      "Sensor matrix firmware",
      "Scan matrix embedded",
      "Keypad matrix code",
      "Grid sensor MCU",
    ],
    keywords: ["matrix", "firmware", "scan", "sensor", "grid"],
    answer:
      "Matrix scanning drives one axis and reads the other to detect intersections. Firmware handles debouncing and ghosting prevention.",
  },
  {
    id: "firmware-crosspoint",
    category: "firmware",
    question: "What is a crosspoint switch in firmware?",
    variations: [
      "Crosspoint firmware",
      "Matrix switch embedded",
      "Crosspoint control code",
      "Switch matrix MCU",
    ],
    keywords: ["crosspoint", "firmware", "switch", "matrix", "control"],
    answer:
      "A crosspoint switch connects any input to any output. Firmware configures the switch, often over a serial interface.",
  },
  {
    id: "firmware-relay-matrix",
    category: "firmware",
    question: "How do I control a relay matrix?",
    variations: [
      "Relay matrix firmware",
      "Multiple relays code",
      "Relay array control",
      "Switch bank firmware",
    ],
    keywords: ["relay", "matrix", "firmware", "control", "array"],
    answer:
      "Firmware controls multiple relays using GPIO, shift registers or dedicated drivers. Sequencing and interlocking may be needed to prevent conflicts.",
  },
  {
    id: "firmware-solenoid",
    category: "firmware",
    question: "How do I control a solenoid in firmware?",
    variations: [
      "Solenoid firmware",
      "Control solenoid valve",
      "Solenoid driver code",
      "Valve control MCU",
    ],
    keywords: ["solenoid", "firmware", "control", "driver", "valve"],
    answer:
      "A solenoid is controlled through a driver because it requires more current than a GPIO can supply. Firmware sets the output, and flyback protection is needed.",
  },
  {
    id: "firmware-valve",
    category: "firmware",
    question: "How do I control a valve in firmware?",
    variations: [
      "Valve firmware",
      "Control valve MCU",
      "Valve actuator code",
      "Open close valve firmware",
    ],
    keywords: ["valve", "firmware", "control", "actuator", "open"],
    answer:
      "Valves can be solenoid, motorized or pneumatic. Firmware controls the appropriate driver or actuator and may include feedback and safety interlocks.",
  },
  {
    id: "firmware-pump",
    category: "firmware",
    question: "How do I control a pump in firmware?",
    variations: [
      "Pump firmware",
      "Control pump MCU",
      "Pump driver code",
      "Water pump control",
    ],
    keywords: ["pump", "firmware", "control", "driver", "motor"],
    answer:
      "Pumps are controlled through relays, MOSFETs or motor drivers depending on type and power. Firmware may monitor flow, pressure or current for protection.",
  },
  {
    id: "firmware-heater",
    category: "firmware",
    question: "How do I control a heater in firmware?",
    variations: [
      "Heater firmware",
      "Control heating element",
      "Heater driver code",
      "Temperature control MCU",
    ],
    keywords: ["heater", "firmware", "control", "temperature", "driver"],
    answer:
      "Heaters are controlled via relays, MOSFETs or solid-state relays with appropriate ratings. Firmware often uses PID or on/off control with safety limits.",
  },
  {
    id: "firmware-fan",
    category: "firmware",
    question: "How do I control a fan in firmware?",
    variations: [
      "Fan firmware",
      "Control fan speed",
      "PWM fan code",
      "Cooling fan MCU",
    ],
    keywords: ["fan", "firmware", "control", "pwm", "speed"],
    answer:
      "Fans can be switched on/off or speed-controlled with PWM. Some provide tachometer feedback for RPM monitoring.",
  },
  {
    id: "firmware-lighting",
    category: "firmware",
    question: "How do I control lighting in firmware?",
    variations: [
      "Lighting firmware",
      "Control LED lights",
      "Dimmer code MCU",
      "Lighting automation",
    ],
    keywords: ["lighting", "firmware", "control", "led", "dimmer"],
    answer:
      "Lighting can be controlled with relays, PWM, or dedicated drivers. Firmware may support dimming, color control and scheduling.",
  },
  {
    id: "firmware-rgb",
    category: "firmware",
    question: "How do I control RGB LEDs in firmware?",
    variations: [
      "RGB LED firmware",
      "WS2812 code",
      "NeoPixel firmware",
      "Color LED control",
    ],
    keywords: ["rgb", "led", "firmware", "ws2812", "neopixel"],
    answer:
      "Addressable LEDs such as WS2812 require precise timing. Firmware sends color data in sequence, often using a library or hardware support.",
  },
  {
    id: "firmware-led-strip",
    category: "firmware",
    question: "How do I control an LED strip in firmware?",
    variations: [
      "LED strip firmware",
      "Addressable strip code",
      "Strip lighting MCU",
      "Control LED tape",
    ],
    keywords: ["led", "strip", "firmware", "addressable", "control"],
    answer:
      "LED strips may be analog (PWM) or addressable (data protocol). Firmware controls brightness and color, respecting power limits.",
  },
  {
    id: "firmware-led-matrix",
    category: "firmware",
    question: "How do I control an LED matrix in firmware?",
    variations: [
      "LED matrix firmware",
      "Dot matrix code",
      "Multiplex LED grid",
      "Matrix display firmware",
    ],
    keywords: ["led", "matrix", "firmware", "multiplex", "display"],
    answer:
      "LED matrices are multiplexed by rows and columns. Firmware scans them at a rate high enough to avoid flicker and may use driver ICs.",
  },
  {
    id: "firmware-seven-segment-multiplex",
    category: "firmware",
    question: "How do I multiplex seven-segment displays?",
    variations: [
      "Multiplex seven segment",
      "Drive multiple displays",
      "Seven segment scan code",
      "Display multiplexing firmware",
    ],
    keywords: ["seven", "segment", "multiplex", "firmware", "display"],
    answer:
      "Multiplexing switches between digits rapidly. Firmware controls digit selection and segment patterns, with timing to avoid flicker.",
  },
  {
    id: "firmware-display-buffer",
    category: "firmware",
    question: "What is a display buffer in firmware?",
    variations: [
      "Display buffer firmware",
      "Frame buffer embedded",
      "Screen buffer MCU",
      "Graphics buffer display",
    ],
    keywords: ["display", "buffer", "firmware", "frame", "graphics"],
    answer:
      "A display buffer stores pixel data before it is sent to the display. It allows drawing without flicker but requires RAM.",
  },
  {
    id: "firmware-display-refresh",
    category: "firmware",
    question: "How do I refresh a display in firmware?",
    variations: [
      "Display refresh firmware",
      "Update screen code",
      "Refresh rate display",
      "Redraw display MCU",
    ],
    keywords: ["display", "refresh", "firmware", "update", "screen"],
    answer:
      "Firmware updates the display at a rate appropriate for the content and display type. Partial updates can reduce processing and bandwidth.",
  },
  {
    id: "firmware-touch-calibration",
    category: "firmware",
    question: "How do I calibrate a touchscreen in firmware?",
    variations: [
      "Touch calibration firmware",
      "Calibrate touchscreen",
      "Touch coordinates calibration",
      "Resistive touch calibration",
    ],
    keywords: ["touch", "calibration", "firmware", "screen", "coordinates"],
    answer:
      "Touch calibration maps raw touch coordinates to screen coordinates. It often uses known reference points and stores calibration values.",
  },
  {
    id: "firmware-gesture",
    category: "firmware",
    question: "How do I detect gestures in firmware?",
    variations: [
      "Gesture firmware",
      "Swipe detection code",
      "Touch gesture MCU",
      "Recognize gestures",
    ],
    keywords: ["gesture", "firmware", "detection", "touch", "swipe"],
    answer:
      "Gesture detection analyzes touch or motion patterns. Simple gestures can be detected with thresholds and direction checks.",
  },
  {
    id: "firmware-voice",
    category: "firmware",
    question: "Can firmware process voice commands?",
    variations: [
      "Voice command firmware",
      "Speech recognition embedded",
      "Audio command MCU",
      "Voice control device",
    ],
    keywords: ["voice", "command", "firmware", "speech", "audio"],
    answer:
      "Simple voice commands can be detected with keyword spotting on some microcontrollers. More complex recognition may use a connected service.",
  },
  {
    id: "firmware-audio",
    category: "firmware",
    question: "How do I play audio in firmware?",
    variations: [
      "Audio firmware",
      "Play sound MCU",
      "DFPlayer code",
      "Audio output embedded",
    ],
    keywords: ["audio", "firmware", "play", "sound", "output"],
    answer:
      "Audio can be played using a DAC, PWM with filtering, or a dedicated audio module. Firmware handles file storage, decoding and playback control.",
  },
  {
    id: "firmware-mp3",
    category: "firmware",
    question: "Can firmware decode MP3?",
    variations: [
      "MP3 firmware",
      "Decode MP3 embedded",
      "Audio decoding MCU",
      "MP3 player code",
    ],
    keywords: ["mp3", "firmware", "decode", "audio", "player"],
    answer:
      "MP3 decoding on a small microcontroller may require a dedicated decoder chip or a more powerful processor. Some modules handle it externally.",
  },
  {
    id: "firmware-wav",
    category: "firmware",
    question: "Can firmware play WAV files?",
    variations: [
      "WAV firmware",
      "Play WAV embedded",
      "Audio file MCU",
      "PCM audio firmware",
    ],
    keywords: ["wav", "firmware", "audio", "play", "pcm"],
    answer:
      "WAV files contain uncompressed PCM data, which can be played by streaming samples to a DAC or PWM output. Firmware must handle the file and timing.",
  },
  {
    id: "firmware-tone",
    category: "firmware",
    question: "How do I generate a tone in firmware?",
    variations: [
      "Tone firmware",
      "Generate frequency MCU",
      "Buzzer tone code",
      "PWM tone generation",
    ],
    keywords: ["tone", "firmware", "generate", "frequency", "pwm"],
    answer:
      "A tone can be generated using PWM or a timer to produce a square wave at the desired frequency. Firmware sets the frequency and duration.",
  },
  {
    id: "firmware-music",
    category: "firmware",
    question: "How do I play music in firmware?",
    variations: [
      "Music firmware",
      "Play melody MCU",
      "Buzzer music code",
      "Tone sequence firmware",
    ],
    keywords: ["music", "firmware", "play", "melody", "tone"],
    answer:
      "Simple melodies can be played by generating tones in sequence. Firmware stores note frequencies and durations.",
  },
  {
    id: "firmware-radio",
    category: "firmware",
    question: "How do I use radio communication in firmware?",
    variations: [
      "Radio firmware",
      "RF module code",
      "Wireless communication MCU",
      "Radio transceiver firmware",
    ],
    keywords: ["radio", "firmware", "communication", "rf", "wireless"],
    answer:
      "Radio modules use interfaces such as SPI or UART. Firmware configures frequency, power and protocol, then sends and receives data.",
  },
  {
    id: "firmware-lora",
    category: "firmware",
    question: "How do I use LoRa in firmware?",
    variations: [
      "LoRa firmware",
      "LoRa module code",
      "Long range radio MCU",
      "SX1276 firmware",
    ],
    keywords: ["lora", "firmware", "radio", "long", "range"],
    answer:
      "LoRa modules are configured over SPI or UART. Firmware sets frequency, spreading factor and bandwidth, then sends and receives packets.",
  },
  {
    id: "firmware-nrf",
    category: "firmware",
    question: "How do I use nRF24 in firmware?",
    variations: [
      "nRF24 firmware",
      "nRF24L01 code",
      "2.4GHz radio MCU",
      "Wireless module firmware",
    ],
    keywords: ["nrf", "firmware", "radio", "2.4", "wireless"],
    answer:
      "nRF24 modules communicate over SPI. Firmware configures the channel, address and payload, then handles transmission and reception.",
  },
  {
    id: "firmware-cc1101",
    category: "firmware",
    question: "How do I use CC1101 in firmware?",
    variations: [
      "CC1101 firmware",
      "Sub GHz radio code",
      "RF transceiver MCU",
      "CC1101 configuration",
    ],
    keywords: ["cc1101", "firmware", "radio", "sub", "ghz"],
    answer:
      "CC1101 is a sub-GHz transceiver controlled over SPI. Firmware configures frequency, modulation and data rate for communication.",
  },
  {
    id: "firmware-ask",
    category: "firmware",
    question: "How do I use ASK/OOK radio in firmware?",
    variations: [
      "ASK firmware",
      "OOK radio code",
      "Simple RF module MCU",
      "433MHz module firmware",
    ],
    keywords: ["ask", "ook", "firmware", "radio", "433"],
    answer:
      "Simple ASK/OOK modules send and receive digital data directly. Firmware encodes data with a suitable protocol and timing.",
  },
  {
    id: "firmware-ir",
    category: "firmware",
    question: "How do I use infrared communication in firmware?",
    variations: [
      "IR firmware",
      "Infrared remote code",
      "IR transmit receive MCU",
      "IR protocol firmware",
    ],
    keywords: ["ir", "infrared", "firmware", "remote", "communication"],
    answer:
      "IR communication uses modulated light. Firmware generates or decodes protocols such as NEC. Timing is critical.",
  },
  {
    id: "firmware-ir-remote",
    category: "firmware",
    question: "How do I decode an IR remote in firmware?",
    variations: [
      "IR remote firmware",
      "Decode NEC protocol",
      "IR receiver code MCU",
      "Read remote button",
    ],
    keywords: ["ir", "remote", "firmware", "decode", "nec"],
    answer:
      "An IR receiver demodulates the signal to a digital waveform. Firmware measures pulse timing to decode the protocol and button.",
  },
  {
    id: "firmware-ir-send",
    category: "firmware",
    question: "How do I send IR signals in firmware?",
    variations: [
      "IR send firmware",
      "Transmit IR code",
      "IR LED control MCU",
      "Send remote signal",
    ],
    keywords: ["ir", "send", "firmware", "transmit", "remote"],
    answer:
      "Firmware generates a modulated signal, often using PWM for the carrier and timing for the protocol. An IR LED and driver are used.",
  },
  {
    id: "firmware-ultrasonic",
    category: "firmware",
    question: "How do I use an ultrasonic sensor in firmware?",
    variations: [
      "Ultrasonic firmware",
      "HC-SR04 code",
      "Distance sensor MCU",
      "Ultrasonic ranging",
    ],
    keywords: ["ultrasonic", "firmware", "sensor", "distance", "ranging"],
    answer:
      "Ultrasonic sensors are triggered by a pulse, then measure the echo pulse width. Firmware converts the time to distance using the speed of sound.",
  },
  {
    id: "firmware-tof",
    category: "firmware",
    question: "How do I use a time-of-flight sensor in firmware?",
    variations: [
      "ToF firmware",
      "VL53L0X code",
      "Laser distance sensor MCU",
      "Time of flight sensor",
    ],
    keywords: ["tof", "firmware", "sensor", "distance", "laser"],
    answer:
      "Time-of-flight sensors measure distance using light travel time. They usually communicate over I2C. Firmware reads and configures them.",
  },
  {
    id: "firmware-lidar",
    category: "firmware",
    question: "How do I use LiDAR in firmware?",
    variations: [
      "LiDAR firmware",
      "Laser scanner code",
      "LiDAR sensor MCU",
      "Distance scanning",
    ],
    keywords: ["lidar", "firmware", "sensor", "scan", "distance"],
    answer:
      "LiDAR modules provide distance measurements, often over serial or I2C. Firmware reads the data and may process it for mapping or detection.",
  },
  {
    id: "firmware-radar",
    category: "firmware",
    question: "How do I use radar in firmware?",
    variations: [
      "Radar firmware",
      "mmWave sensor code",
      "Radar module MCU",
      "Presence detection radar",
    ],
    keywords: ["radar", "firmware", "sensor", "mmwave", "detection"],
    answer:
      "Radar modules can detect presence, motion and distance. They often communicate over UART or SPI. Firmware reads and processes the data.",
  },
  {
    id: "firmware-camera",
    category: "firmware",
    question: "How do I use a camera in firmware?",
    variations: [
      "Camera firmware",
      "Camera module code",
      "Image capture MCU",
      "ESP32 camera",
    ],
    keywords: ["camera", "firmware", "image", "capture", "video"],
    answer:
      "Camera modules interface via parallel, SPI or dedicated interfaces. Firmware captures frames, which can be processed, stored or transmitted.",
  },
  {
    id: "firmware-image",
    category: "firmware",
    question: "How do I process images in firmware?",
    variations: [
      "Image processing firmware",
      "Image filter MCU",
      "Process camera data",
      "Computer vision embedded",
    ],
    keywords: ["image", "processing", "firmware", "vision", "camera"],
    answer:
      "Image processing on microcontrollers is limited by memory and speed. Simple operations such as thresholding, filtering or feature detection are possible.",
  },
  {
    id: "firmware-barcode",
    category: "firmware",
    question: "How do I read a barcode in firmware?",
    variations: [
      "Barcode firmware",
      "Barcode scanner code",
      "Read barcode MCU",
      "QR code reader",
    ],
    keywords: ["barcode", "firmware", "read", "scanner", "qr"],
    answer:
      "Barcode scanners often output data over serial or USB. Firmware reads and parses the data. Camera-based scanning requires image processing.",
  },
  {
    id: "firmware-qr",
    category: "firmware",
    question: "How do I read a QR code in firmware?",
    variations: [
      "QR code firmware",
      "QR scanner MCU",
      "Decode QR code",
      "Camera QR reader",
    ],
    keywords: ["qr", "firmware", "read", "code", "scanner"],
    answer:
      "QR decoding requires image capture and processing, or a dedicated scanner module. Some microcontrollers with cameras can run QR decoding libraries.",
  },
  {
    id: "firmware-fingerprint",
    category: "firmware",
    question: "How do I use a fingerprint sensor in firmware?",
    variations: [
      "Fingerprint firmware",
      "R307 code",
      "Biometric sensor MCU",
      "Fingerprint module",
    ],
    keywords: ["fingerprint", "firmware", "sensor", "biometric", "module"],
    answer:
      "Fingerprint modules handle enrollment and matching internally. Firmware sends commands and reads results over serial or another interface.",
  },
  {
    id: "firmware-nfc",
    category: "firmware",
    question: "How do I use NFC in firmware?",
    variations: [
      "NFC firmware",
      "PN532 code",
      "NFC reader MCU",
      "Near field communication",
    ],
    keywords: ["nfc", "firmware", "reader", "communication", "tag"],
    answer:
      "NFC modules communicate over I2C, SPI or UART. Firmware configures the module and reads or writes tags, or emulates a card.",
  },
  {
    id: "firmware-smart-card",
    category: "firmware",
    question: "How do I interface with a smart card in firmware?",
    variations: [
      "Smart card firmware",
      "ISO7816 code",
      "Smart card reader MCU",
      "Chip card interface",
    ],
    keywords: ["smart", "card", "firmware", "iso", "reader"],
    answer:
      "Smart cards use ISO 7816 or other protocols. Firmware controls the interface, resets the card and exchanges APDU commands.",
  },
  {
    id: "firmware-sim-card",
    category: "firmware",
    question: "How do I interface with a SIM card in firmware?",
    variations: [
      "SIM card firmware",
      "SIM interface code",
      "Read SIM MCU",
      "SIM800 firmware",
    ],
    keywords: ["sim", "card", "firmware", "interface", "cellular"],
    answer:
      "SIM cards use a serial interface with specific voltage and timing. Most applications use a modem that handles the SIM interface.",
  },
  {
    id: "firmware-sdio",
    category: "firmware",
    question: "What is SDIO?",
    variations: [
      "SDIO firmware",
      "SD card interface",
      "SDIO vs SPI",
      "SDIO communication",
    ],
    keywords: ["sdio", "firmware", "sd", "interface", "communication"],
    answer:
      "SDIO is a high-speed interface for SD cards and peripherals. It supports higher data rates than SPI but requires more pins and complexity.",
  },
  {
    id: "firmware-emmc",
    category: "firmware",
    question: "What is eMMC?",
    variations: [
      "eMMC firmware",
      "Embedded multimedia card",
      "eMMC storage",
      "eMMC interface",
    ],
    keywords: ["emmc", "firmware", "storage", "interface", "embedded"],
    answer:
      "eMMC is embedded flash storage with a standard interface. It is used in devices requiring more storage than a microcontroller's internal flash.",
  },
  {
    id: "firmware-flash-memory",
    category: "firmware",
    question: "How do I use external flash memory?",
    variations: [
      "External flash firmware",
      "SPI flash code",
      "W25Q firmware",
      "Add flash memory MCU",
    ],
    keywords: ["external", "flash", "firmware", "spi", "memory"],
    answer:
      "External flash is accessed over SPI, QSPI or another interface. Firmware erases, writes and reads pages or sectors, often with a file system on top.",
  },
  {
    id: "firmware-qspi",
    category: "firmware",
    question: "What is QSPI?",
    variations: [
      "QSPI firmware",
      "Quad SPI flash",
      "Fast external flash",
      "QSPI interface",
    ],
    keywords: ["qspi", "firmware", "flash", "spi", "interface"],
    answer:
      "QSPI, or Quad SPI, uses four data lines for faster flash access. It is common for external flash and execute-in-place applications.",
  },
  {
    id: "firmware-ospi",
    category: "firmware",
    question: "What is OSPI?",
    variations: [
      "OSPI firmware",
      "Octal SPI flash",
      "Fast flash interface",
      "OSPI memory",
    ],
    keywords: ["ospi", "firmware", "flash", "spi", "interface"],
    answer:
      "OSPI, or Octal SPI, uses eight data lines for high-speed flash access. It is used in performance-oriented embedded systems.",
  },
  {
    id: "firmware-xip",
    category: "firmware",
    question: "What is execute-in-place?",
    variations: [
      "XIP firmware",
      "Execute in place flash",
      "Run code from flash",
      "XIP embedded",
    ],
    keywords: ["xip", "firmware", "execute", "flash", "code"],
    answer:
      "Execute-in-place runs code directly from flash without copying it to RAM. It saves RAM but may be slower depending on the memory interface.",
  },
  {
    id: "firmware-ram-execution",
    category: "firmware",
    question: "Why copy code to RAM for execution?",
    variations: [
      "Run code from RAM",
      "RAM execution firmware",
      "Copy to RAM MCU",
      "Fast execution RAM",
    ],
    keywords: ["ram", "execution", "firmware", "code", "speed"],
    answer:
      "Running from RAM can be faster than flash and is required for modifying code. Firmware copies critical functions or entire programs to RAM when needed.",
  },
  {
    id: "firmware-startup-copy",
    category: "firmware",
    question: "What is startup copy in firmware?",
    variations: [
      "Startup copy firmware",
      "Copy data to RAM",
      "Initialize RAM startup",
      "Startup code copy",
    ],
    keywords: ["startup", "copy", "firmware", "ram", "initialize"],
    answer:
      "Startup code copies initialized data from flash to RAM and zeroes uninitialized data before calling main(). This prepares the C runtime environment.",
  },
  {
    id: "firmware-bss",
    category: "firmware",
    question: "What is the BSS section?",
    variations: [
      "BSS firmware",
      "Uninitialized data section",
      "BSS vs data",
      "Memory sections firmware",
    ],
    keywords: ["bss", "firmware", "data", "section", "memory"],
    answer:
      "The BSS section holds uninitialized global and static variables. It is not stored in flash; startup code zeroes it in RAM.",
  },
  {
    id: "firmware-data-section",
    category: "firmware",
    question: "What is the data section in firmware?",
    variations: [
      "Data section firmware",
      "Initialized variables section",
      "Data vs BSS",
      "Memory sections embedded",
    ],
    keywords: ["data", "section", "firmware", "initialized", "variables"],
    answer:
      "The data section contains initialized global and static variables. Its initial values are stored in flash and copied to RAM at startup.",
  },
  {
    id: "firmware-text-section",
    category: "firmware",
    question: "What is the text section in firmware?",
    variations: [
      "Text section firmware",
      "Code section embedded",
      "Program memory section",
      "Text vs data",
    ],
    keywords: ["text", "section", "firmware", "code", "memory"],
    answer:
      "The text section contains executable code and often read-only data. It is typically stored in flash.",
  },
  {
    id: "firmware-rodata",
    category: "firmware",
    question: "What is the rodata section?",
    variations: [
      "Rodata firmware",
      "Read only data section",
      "Constant data memory",
      "Where are constants stored",
    ],
    keywords: ["rodata", "firmware", "read", "only", "data"],
    answer:
      "The rodata section holds read-only data such as constant strings and tables. It is usually placed in flash.",
  },
  {
    id: "firmware-heap-section",
    category: "firmware",
    question: "What is the heap in firmware memory?",
    variations: [
      "Heap section firmware",
      "Dynamic memory area",
      "Heap vs stack",
      "Memory layout heap",
    ],
    keywords: ["heap", "firmware", "memory", "dynamic", "stack"],
    answer:
      "The heap is the memory area used for dynamic allocation. It grows and shrinks at runtime and can become fragmented.",
  },
  {
    id: "firmware-stack-section",
    category: "firmware",
    question: "What is the stack in firmware memory?",
    variations: [
      "Stack section firmware",
      "Call stack embedded",
      "Stack vs heap",
      "Memory layout stack",
    ],
    keywords: ["stack", "firmware", "memory", "call", "heap"],
    answer:
      "The stack stores function call frames, local variables and return addresses. It grows and shrinks automatically as functions are called and return.",
  },
  {
    id: "firmware-memory-layout",
    category: "firmware",
    question: "How is firmware memory laid out?",
    variations: [
      "Firmware memory layout",
      "Memory map code",
      "Flash RAM sections",
      "Linker memory layout",
    ],
    keywords: ["memory", "layout", "firmware", "flash", "ram"],
    answer:
      "Typical layout includes vectors, code, read-only data, initialized data, BSS, heap and stack. The linker script defines the addresses.",
  },
  {
    id: "firmware-linker-script-sections",
    category: "firmware",
    question: "How do linker scripts define firmware sections?",
    variations: [
      "Linker script sections",
      "Define memory sections",
      "Place code RAM flash",
      "Linker script layout",
    ],
    keywords: ["linker", "script", "sections", "firmware", "memory"],
    answer:
      "Linker scripts define memory regions and assign sections to them, controlling where code and data are placed.",
  },
  {
    id: "firmware-custom-section",
    category: "firmware",
    question: "Can firmware use custom memory sections?",
    variations: [
      "Custom section firmware",
      "Place data in section",
      "Special memory section",
      "Attribute section code",
    ],
    keywords: ["custom", "section", "firmware", "memory", "attribute"],
    answer:
      "Yes. Custom sections can place data or code in specific memory areas, such as RAM, fast memory or non-volatile storage.",
  },
  {
    id: "firmware-attribute-section",
    category: "firmware",
    question: "How do I place a variable in a specific section?",
    variations: [
      "Attribute section variable",
      "Place data section",
      "Custom section placement",
      "Linker variable location",
    ],
    keywords: ["attribute", "section", "firmware", "variable", "placement"],
    answer:
      "Use compiler attributes or pragmas to assign variables or functions to named sections, then place those sections in the linker script.",
  },
  {
    id: "firmware-noinit",
    category: "firmware",
    question: "What is a no-init section?",
    variations: [
      "No init section firmware",
      "Uninitialized RAM",
      "Preserve memory reset",
      "Noinit attribute",
    ],
    keywords: ["noinit", "firmware", "section", "memory", "reset"],
    answer:
      "A no-init section is not cleared or initialized at startup, so its contents may survive a reset. It is useful for preserving crash data or state across resets.",
  },
  {
    id: "firmware-preserve-reset",
    category: "firmware",
    question: "How do I preserve data across a reset?",
    variations: [
      "Preserve data reset",
      "Keep variables after reset",
      "Noinit memory reset",
      "Survive reset firmware",
    ],
    keywords: ["preserve", "data", "reset", "firmware", "memory"],
    answer:
      "Data can be preserved across a reset using no-init memory, backup registers, RTC-backed RAM or non-volatile storage.",
  },
  {
    id: "firmware-backup-register",
    category: "firmware",
    question: "What is a backup register?",
    variations: [
      "Backup register firmware",
      "RTC backup registers",
      "Preserve data low power",
      "Backup domain MCU",
    ],
    keywords: ["backup", "register", "firmware", "rtc", "data"],
    answer:
      "Backup registers are small memory areas in the backup domain that can retain data during low-power modes or resets.",
  },
  {
    id: "firmware-rtc-backup",
    category: "firmware",
    question: "How is RTC backup RAM used?",
    variations: [
      "RTC backup RAM",
      "Backup SRAM firmware",
      "Retain data RTC",
      "Low power memory MCU",
    ],
    keywords: ["rtc", "backup", "ram", "firmware", "memory"],
    answer:
      "RTC backup RAM retains data when the main power is off if a backup battery is present. It is useful for configuration, counters and state.",
  },
  {
    id: "firmware-battery-backed",
    category: "firmware",
    question: "What is battery-backed RAM?",
    variations: [
      "Battery backed RAM",
      "NV RAM firmware",
      "Retain memory battery",
      "Battery backup SRAM",
    ],
    keywords: ["battery", "backed", "ram", "firmware", "memory"],
    answer:
      "Battery-backed RAM uses a small battery to retain data when main power is removed. It provides fast, unlimited read/write storage.",
  },
  {
    id: "firmware-fram-spi",
    category: "firmware",
    question: "How do I use SPI FRAM?",
    variations: [
      "SPI FRAM firmware",
      "FRAM SPI code",
      "Ferroelectric memory SPI",
      "FRAM interface MCU",
    ],
    keywords: ["fram", "spi", "firmware", "memory", "interface"],
    answer:
      "SPI FRAM is accessed like SPI flash but supports fast writes without erase cycles. Firmware uses read and write commands according to the datasheet.",
  },
  {
    id: "firmware-mram",
    category: "firmware",
    question: "What is MRAM?",
    variations: [
      "MRAM firmware",
      "Magnetoresistive RAM",
      "MRAM embedded",
      "Non volatile RAM MRAM",
    ],
    keywords: ["mram", "firmware", "memory", "nonvolatile", "ram"],
    answer:
      "MRAM is a non-volatile memory technology with fast read/write and high endurance. It is used in some embedded systems for data storage.",
  },
  {
    id: "firmware-nvram",
    category: "firmware",
    question: "What is NVRAM?",
    variations: [
      "NVRAM firmware",
      "Non volatile RAM",
      "Retain memory power",
      "NVRAM embedded",
    ],
    keywords: ["nvram", "firmware", "memory", "nonvolatile", "ram"],
    answer:
      "NVRAM is memory that retains its contents without power. It can be battery-backed SRAM, FRAM, MRAM or other technology.",
  },
  {
    id: "firmware-otp",
    category: "firmware",
    question: "What is OTP memory?",
    variations: [
      "OTP firmware",
      "One time programmable memory",
      "OTP storage MCU",
      "Write once memory",
    ],
    keywords: ["otp", "firmware", "memory", "programmable", "once"],
    answer:
      "OTP, or One-Time Programmable, memory can be written once and cannot be erased or rewritten. It is used for keys, calibration or permanent data.",
  },
  {
    id: "firmware-efuse",
    category: "firmware",
    question: "What is an eFuse?",
    variations: [
      "eFuse firmware",
      "Electronic fuse memory",
      "OTP eFuse MCU",
      "Program eFuse",
    ],
    keywords: ["efuse", "firmware", "memory", "otp", "program"],
    answer:
      "An eFuse is a one-time programmable memory bit used for configuration, keys or device identity. Once programmed, it cannot be changed.",
  },
  {
    id: "firmware-rom",
    category: "firmware",
    question: "What is ROM in firmware?",
    variations: [
      "ROM firmware",
      "Read only memory MCU",
      "Boot ROM",
      "Mask ROM embedded",
    ],
    keywords: ["rom", "firmware", "memory", "read", "only"],
    answer:
      "ROM is read-only memory that cannot be modified. It may contain boot code, factory data or fixed program code.",
  },
  {
    id: "firmware-boot-rom",
    category: "firmware",
    question: "What is boot ROM?",
    variations: [
      "Boot ROM firmware",
      "ROM bootloader",
      "Primary boot code",
      "ROM startup MCU",
    ],
    keywords: ["boot", "rom", "firmware", "startup", "code"],
    answer:
      "Boot ROM is factory-programmed code that runs at startup. It may load the bootloader from flash or provide a recovery or programming mode.",
  },
  {
    id: "firmware-rom-bootloader",
    category: "firmware",
    question: "Can the ROM bootloader be used for programming?",
    variations: [
      "ROM bootloader programming",
      "Use ROM bootloader",
      "Built in bootloader MCU",
      "Factory bootloader",
    ],
    keywords: ["rom", "bootloader", "firmware", "programming", "boot"],
    answer:
      "Many microcontrollers have a ROM bootloader that can program flash over UART, USB, CAN or other interfaces. It provides a recovery path even if the main firmware is corrupted.",
  },
  {
    id: "firmware-serial-bootloader",
    category: "firmware",
    question: "What is a serial bootloader?",
    variations: [
      "Serial bootloader firmware",
      "UART bootloader",
      "Program over serial",
      "Serial programming MCU",
    ],
    keywords: ["serial", "bootloader", "firmware", "uart", "programming"],
    answer:
      "A serial bootloader allows firmware updates over UART. It is common on Arduino and many microcontroller boards.",
  },
  {
    id: "firmware-usb-bootloader",
    category: "firmware",
    question: "What is a USB bootloader?",
    variations: [
      "USB bootloader firmware",
      "Program over USB",
      "USB DFU",
      "USB update MCU",
    ],
    keywords: ["usb", "bootloader", "firmware", "dfu", "programming"],
    answer:
      "A USB bootloader allows firmware updates over USB, often using the DFU class. It is convenient for devices with USB connections.",
  },
  {
    id: "firmware-can-bootloader",
    category: "firmware",
    question: "What is a CAN bootloader?",
    variations: [
      "CAN bootloader firmware",
      "Program over CAN",
      "CAN update MCU",
      "CAN bus programming",
    ],
    keywords: ["can", "bootloader", "firmware", "programming", "update"],
    answer:
      "A CAN bootloader allows firmware updates over a CAN bus. It is used in automotive and industrial systems.",
  },
  {
    id: "firmware-dfu",
    category: "firmware",
    question: "What is DFU?",
    variations: [
      "DFU firmware",
      "Device firmware update",
      "USB DFU mode",
      "DFU programming",
    ],
    keywords: ["dfu", "firmware", "update", "usb", "mode"],
    answer:
      "DFU, or Device Firmware Update, is a standard for updating firmware over USB. A device enters DFU mode and a host tool transfers the new image.",
  },
  {
    id: "firmware-msc-bootloader",
    category: "firmware",
    question: "What is an MSC bootloader?",
    variations: [
      "MSC bootloader firmware",
      "Drag drop firmware update",
      "USB mass storage update",
      "MSC programming MCU",
    ],
    keywords: ["msc", "bootloader", "firmware", "usb", "update"],
    answer:
      "An MSC bootloader presents the device as a USB drive for firmware updates. The user copies a file to the drive, and the bootloader programs it.",
  },
  {
    id: "firmware-sd-bootloader",
    category: "firmware",
    question: "What is an SD card bootloader?",
    variations: [
      "SD bootloader firmware",
      "Update from SD card",
      "SD card firmware update",
      "Boot from SD",
    ],
    keywords: ["sd", "bootloader", "firmware", "update", "card"],
    answer:
      "An SD card bootloader reads a firmware image from an SD card and programs it. It is useful for field updates without a computer connection.",
  },
  {
    id: "firmware-network-bootloader",
    category: "firmware",
    question: "What is a network bootloader?",
    variations: [
      "Network bootloader firmware",
      "TFTP boot",
      "Ethernet firmware update",
      "Network programming MCU",
    ],
    keywords: ["network", "bootloader", "firmware", "update", "ethernet"],
    answer:
      "A network bootloader retrieves firmware over a network, often using TFTP, HTTP or a custom protocol. It is useful for devices with network connectivity.",
  },
  {
    id: "firmware-ota-bootloader",
    category: "firmware",
    question: "What is an OTA bootloader?",
    variations: [
      "OTA bootloader firmware",
      "Wireless update bootloader",
      "Over the air programming",
      "OTA update MCU",
    ],
    keywords: ["ota", "bootloader", "firmware", "update", "wireless"],
    answer:
      "An OTA bootloader receives firmware over a wireless connection and programs it. It is common in IoT devices.",
  },
  {
    id: "firmware-bootloader-recovery",
    category: "firmware",
    question: "How does a bootloader recover from a failed update?",
    variations: [
      "Bootloader recovery firmware",
      "Failed update recovery",
      "Recover bricked device",
      "Bootloader fallback",
    ],
    keywords: ["bootloader", "recovery", "firmware", "update", "failed"],
    answer:
      "The bootloader can detect a failed or invalid image and load a backup or factory image. It may also enter a recovery mode for reprogramming.",
  },
  {
    id: "firmware-bricked",
    category: "firmware",
    question: "What does bricked mean?",
    variations: [
      "Bricked device firmware",
      "Device not booting",
      "Firmware brick recovery",
      "Unrecoverable firmware",
    ],
    keywords: ["bricked", "firmware", "device", "recovery", "boot"],
    answer:
      "A bricked device cannot boot or operate normally due to corrupted or missing firmware. Recovery depends on whether a bootloader, ROM loader or hardware programming interface is available.",
  },
  {
    id: "firmware-unbrick",
    category: "firmware",
    question: "Can a bricked device be recovered?",
    variations: [
      "Unbrick firmware",
      "Recover bricked MCU",
      "Fix bricked device",
      "Restore firmware",
    ],
    keywords: ["unbrick", "firmware", "recover", "device", "restore"],
    answer:
      "Recovery is often possible using a ROM bootloader, debug interface or hardware programmer. The available options depend on the device.",
  },
  {
    id: "firmware-hardware-programmer",
    category: "firmware",
    question: "When do I need a hardware programmer?",
    variations: [
      "Hardware programmer firmware",
      "External programmer MCU",
      "Program chip directly",
      "JTAG SWD programmer",
    ],
    keywords: ["hardware", "programmer", "firmware", "jtag", "swd"],
    answer:
      "A hardware programmer is needed when the bootloader is unavailable, corrupted or disabled. It connects to the debug or programming interface.",
  },
  {
    id: "firmware-icsp-programming",
    category: "firmware",
    question: "How do I program via ICSP?",
    variations: [
      "ICSP programming firmware",
      "In circuit serial programming",
      "Program AVR ICSP",
      "ICSP header code",
    ],
    keywords: ["icsp", "programming", "firmware", "avr", "header"],
    answer:
      "ICSP uses a dedicated programmer connected to specific pins. The programmer controls reset, clock and data lines to program the device.",
  },
  {
    id: "firmware-swd-programming",
    category: "firmware",
    question: "How do I program via SWD?",
    variations: [
      "SWD programming firmware",
      "Serial wire debug program",
      "SWD interface code",
      "Program ARM SWD",
    ],
    keywords: ["swd", "programming", "firmware", "arm", "debug"],
    answer:
      "SWD uses two wires for programming and debugging ARM Cortex devices. A compatible probe and software are used.",
  },
  {
    id: "firmware-jtag-programming",
    category: "firmware",
    question: "How do I program via JTAG?",
    variations: [
      "JTAG programming firmware",
      "Program via JTAG",
      "JTAG interface code",
      "JTAG debugger",
    ],
    keywords: ["jtag", "programming", "firmware", "debug", "interface"],
    answer:
      "JTAG provides access to the device for programming and debugging. It requires multiple pins and a compatible probe.",
  },
  {
    id: "firmware-gang-programming",
    category: "firmware",
    question: "What is gang programming?",
    variations: [
      "Gang programming firmware",
      "Program many devices",
      "Mass programming MCU",
      "Production gang programmer",
    ],
    keywords: ["gang", "programming", "firmware", "production", "mass"],
    answer:
      "Gang programming writes firmware to multiple devices simultaneously, improving production throughput.",
  },
  {
    id: "firmware-in-system-programming",
    category: "firmware",
    question: "What is in-system programming?",
    variations: [
      "In system programming",
      "ISP firmware",
      "Program on board",
      "ISP MCU",
    ],
    keywords: ["in", "system", "programming", "firmware", "isp"],
    answer:
      "In-system programming programs the microcontroller while it is installed on the board, using a dedicated interface.",
  },
  {
    id: "firmware-in-application-programming",
    category: "firmware",
    question: "What is in-application programming?",
    variations: [
      "In application programming",
      "IAP firmware",
      "Self programming MCU",
      "Update from application",
    ],
    keywords: ["in", "application", "programming", "firmware", "iap"],
    answer:
      "In-application programming allows the firmware to update itself using a bootloader or self-programming routines.",
  },
  {
    id: "firmware-self-programming",
    category: "firmware",
    question: "Can firmware reprogram itself?",
    variations: [
      "Self programming firmware",
      "Update own flash",
      "Self modifying MCU",
      "Firmware self update",
    ],
    keywords: ["self", "programming", "firmware", "update", "flash"],
    answer:
      "Some microcontrollers allow firmware to write to their own flash, enabling self-update or data logging. Care is needed to avoid corrupting the running code.",
  },
  {
    id: "firmware-dual-bank",
    category: "firmware",
    question: "What is dual-bank flash?",
    variations: [
      "Dual bank flash firmware",
      "Two flash banks",
      "Dual bank update",
      "Flash bank switching",
    ],
    keywords: ["dual", "bank", "flash", "firmware", "update"],
    answer:
      "Dual-bank flash provides two independent flash areas, allowing one to be updated while the other runs. It supports safe updates and rollback.",
  },
  {
    id: "firmware-bank-swap",
    category: "firmware",
    question: "What is bank swapping?",
    variations: [
      "Bank swap firmware",
      "Switch flash banks",
      "Dual bank swap",
      "Bank switching boot",
    ],
    keywords: ["bank", "swap", "firmware", "flash", "boot"],
    answer:
      "Bank swapping switches between two flash banks, allowing the bootloader to boot a new image or revert to the previous one.",
  },
  {
    id: "firmware-boot-address",
    category: "firmware",
    question: "What is the boot address?",
    variations: [
      "Boot address firmware",
      "Reset vector location",
      "Where firmware starts",
      "Boot memory address",
    ],
    keywords: ["boot", "address", "firmware", "reset", "vector"],
    answer:
      "The boot address is where the processor starts execution after reset. It is defined by the device architecture and boot configuration.",
  },
  {
    id: "firmware-vector-offset",
    category: "firmware",
    question: "What is vector table offset?",
    variations: [
      "Vector table offset firmware",
      "VTOR register",
      "Relocate vector table",
      "Interrupt vector offset",
    ],
    keywords: ["vector", "offset", "firmware", "interrupt", "table"],
    answer:
      "Some ARM Cortex devices allow the vector table to be relocated using the VTOR register. This is used with bootloaders and applications at different addresses.",
  },
  {
    id: "firmware-bootloader-jump",
    category: "firmware",
    question: "How does a bootloader jump to the application?",
    variations: [
      "Bootloader jump firmware",
      "Jump to application code",
      "Start app from bootloader",
      "Bootloader to app",
    ],
    keywords: ["bootloader", "jump", "firmware", "application", "boot"],
    answer:
      "The bootloader sets the stack pointer and vector table from the application's vector table, then jumps to its reset handler.",
  },
  {
    id: "firmware-bootloader-vector",
    category: "firmware",
    question: "What vector table does a bootloader use?",
    variations: [
      "Bootloader vector table",
      "App vector table",
      "Interrupt vectors bootloader",
      "Vector relocation boot",
    ],
    keywords: ["bootloader", "vector", "firmware", "interrupt", "table"],
    answer:
      "The bootloader has its own vector table. Before jumping to the application, it sets the vector table to the application's location.",
  },
  {
    id: "firmware-boot-pins",
    category: "firmware",
    question: "What are boot pins?",
    variations: [
      "Boot pins firmware",
      "Boot mode pins",
      "Select boot source",
      "Boot configuration pins",
    ],
    keywords: ["boot", "pins", "firmware", "mode", "configuration"],
    answer:
      "Boot pins select the boot source or mode at reset, such as flash, bootloader or ROM. They are sampled during startup.",
  },
  {
    id: "firmware-boot-strapping",
    category: "firmware",
    question: "What are boot strapping pins?",
    variations: [
      "Boot strapping firmware",
      "Strapping pins MCU",
      "Boot configuration pins",
      "Pin strapping boot",
    ],
    keywords: ["boot", "strapping", "firmware", "pins", "configuration"],
    answer:
      "Strapping pins are sampled at reset to configure boot mode, clock source or other options. Their state must be correct during power-up.",
  },
  {
    id: "firmware-boot-delay",
    category: "firmware",
    question: "What is boot delay in a bootloader?",
    variations: [
      "Boot delay firmware",
      "Bootloader wait time",
      "Delay before boot",
      "Boot menu delay",
    ],
    keywords: ["boot", "delay", "firmware", "bootloader", "wait"],
    answer:
      "A boot delay gives time for a host to initiate programming or for the user to enter a boot menu before the application starts.",
  },
  {
    id: "firmware-boot-menu",
    category: "firmware",
    question: "What is a boot menu?",
    variations: [
      "Boot menu firmware",
      "Bootloader menu",
      "Startup options menu",
      "Select boot mode",
    ],
    keywords: ["boot", "menu", "firmware", "bootloader", "options"],
    answer:
      "A boot menu allows selection of boot modes, update options or diagnostics during startup. It is often accessed over serial.",
  },
  {
    id: "firmware-boot-counter",
    category: "firmware",
    question: "What is a boot counter?",
    variations: [
      "Boot counter firmware",
      "Track resets",
      "Reset count",
      "Boot attempt counter",
    ],
    keywords: ["boot", "counter", "firmware", "reset", "attempt"],
    answer:
      "A boot counter tracks how many times the device has started. It can be used to detect boot loops or trigger recovery.",
  },
  {
    id: "firmware-boot-loop",
    category: "firmware",
    question: "What is a boot loop?",
    variations: [
      "Boot loop firmware",
      "Device keeps restarting",
      "Continuous reset",
      "Firmware reboot loop",
    ],
    keywords: ["boot", "loop", "firmware", "reset", "restart"],
    answer:
      "A boot loop occurs when the device repeatedly restarts without running normally. Causes include firmware faults, power issues or watchdog resets.",
  },
  {
    id: "firmware-boot-recovery",
    category: "firmware",
    question: "How does a bootloader handle a boot loop?",
    variations: [
      "Boot loop recovery",
      "Bootloader fallback loop",
      "Recover from reboot loop",
      "Boot attempt limit",
    ],
    keywords: ["boot", "loop", "recovery", "firmware", "bootloader"],
    answer:
      "The bootloader can count boot attempts and switch to a backup image or recovery mode if too many failures occur.",
  },
  {
    id: "firmware-safe-mode",
    category: "firmware",
    question: "What is safe mode in firmware?",
    variations: [
      "Safe mode firmware",
      "Safe boot embedded",
      "Minimal firmware mode",
      "Recovery safe mode",
    ],
    keywords: ["safe", "mode", "firmware", "boot", "recovery"],
    answer:
      "Safe mode starts the device with minimal functionality, often for recovery, diagnostics or reconfiguration.",
  },
  {
    id: "firmware-recovery-boot",
    category: "firmware",
    question: "What is recovery boot?",
    variations: [
      "Recovery boot firmware",
      "Recovery mode boot",
      "Restore firmware boot",
      "Recovery image",
    ],
    keywords: ["recovery", "boot", "firmware", "restore", "mode"],
    answer:
      "Recovery boot starts a special image or mode that can restore or update the main firmware.",
  },
  {
    id: "firmware-golden-recovery",
    category: "firmware",
    question: "What is a golden recovery image?",
    variations: [
      "Golden recovery firmware",
      "Backup recovery image",
      "Factory recovery firmware",
      "Known good recovery",
    ],
    keywords: ["golden", "recovery", "firmware", "backup", "image"],
    answer:
      "A golden recovery image is a known-good firmware used to restore a device when the main image is corrupted or invalid.",
  },
  {
    id: "firmware-failsafe-bootloader",
    category: "firmware",
    question: "What is a failsafe bootloader?",
    variations: [
      "Failsafe bootloader",
      "Safe bootloader firmware",
      "Never brick bootloader",
      "Protected bootloader",
    ],
    keywords: ["failsafe", "bootloader", "firmware", "safe", "protected"],
    answer:
      "A failsafe bootloader is designed to remain functional even if the application firmware is invalid, allowing recovery.",
  },
  {
    id: "firmware-immutable-bootloader",
    category: "firmware",
    question: "What is an immutable bootloader?",
    variations: [
      "Immutable bootloader",
      "Read only bootloader",
      "Protected boot code",
      "Unchangeable bootloader",
    ],
    keywords: ["immutable", "bootloader", "firmware", "protected", "read"],
    answer:
      "An immutable bootloader cannot be modified after production, providing a reliable recovery path. It may be stored in ROM or protected flash.",
  },
  {
    id: "firmware-trusted-firmware",
    category: "firmware",
    question: "What is trusted firmware?",
    variations: [
      "Trusted firmware",
      "Verified boot code",
      "Secure firmware boot",
      "Trusted boot firmware",
    ],
    keywords: ["trusted", "firmware", "secure", "boot", "verified"],
    answer:
      "Trusted firmware is verified before execution, ensuring it comes from a trusted source and has not been altered.",
  },
  {
    id: "firmware-attestation-boot",
    category: "firmware",
    question: "How does boot attestation work?",
    variations: [
      "Boot attestation firmware",
      "Measure boot stages",
      "Verify boot integrity",
      "Attest firmware state",
    ],
    keywords: ["attestation", "boot", "firmware", "integrity", "verify"],
    answer:
      "Boot attestation records measurements of boot stages. These measurements can be reported to a remote party to verify the device's software state.",
  },
  {
    id: "firmware-secure-boot-chain",
    category: "firmware",
    question: "What is a secure boot chain?",
    variations: [
      "Secure boot chain",
      "Boot chain verification",
      "Chain of trust boot",
      "Verified boot stages",
    ],
    keywords: ["secure", "boot", "chain", "firmware", "verify"],
    answer:
      "A secure boot chain verifies each stage of the boot process, starting from an immutable root of trust. Only verified code is executed.",
  },
  {
    id: "firmware-root-of-trust-rom",
    category: "firmware",
    question: "Can the root of trust be in ROM?",
    variations: [
      "ROM root of trust",
      "Root of trust boot ROM",
      "Immutable root trust",
      "Hardware root trust",
    ],
    keywords: ["root", "trust", "rom", "firmware", "immutable"],
    answer:
      "Yes. Boot ROM is often used as the root of trust because it is immutable and executed first.",
  },
  {
    id: "firmware-secure-boot-keys",
    category: "firmware",
    question: "How are secure boot keys stored?",
    variations: [
      "Secure boot keys",
      "Store boot keys",
      "Public key secure boot",
      "Verify boot key",
    ],
    keywords: ["secure", "boot", "keys", "firmware", "storage"],
    answer:
      "Secure boot uses a public key or hash stored in protected memory or eFuses to verify the firmware signature.",
  },
  {
    id: "firmware-secure-boot-fuse",
    category: "firmware",
    question: "What is a secure boot fuse?",
    variations: [
      "Secure boot fuse",
      "Enable secure boot",
      "Fuse for secure boot",
      "Boot security fuse",
    ],
    keywords: ["secure", "boot", "fuse", "firmware", "enable"],
    answer:
      "A fuse or option bit can enable secure boot and store the trusted key hash. Once set, secure boot is enforced.",
  },
  {
    id: "firmware-secure-boot-disable",
    category: "firmware",
    question: "Can secure boot be disabled?",
    variations: [
      "Disable secure boot",
      "Turn off secure boot",
      "Secure boot setting",
      "Secure boot off",
    ],
    keywords: ["secure", "boot", "disable", "firmware", "setting"],
    answer:
      "Secure boot may be disabled before production or in development. In production, it is typically enabled and protected.",
  },
  {
    id: "firmware-developer-mode",
    category: "firmware",
    question: "What is developer mode in firmware?",
    variations: [
      "Developer mode firmware",
      "Debug mode device",
      "Development mode embedded",
      "Unlock device developer",
    ],
    keywords: ["developer", "mode", "firmware", "debug", "development"],
    answer:
      "Developer mode allows additional access for development and debugging. It should be disabled or protected in production.",
  },
  {
    id: "firmware-test-mode",
    category: "firmware",
    question: "What is a test mode in firmware?",
    variations: [
      "Test mode firmware",
      "Factory test mode",
      "Production test embedded",
      "Diagnostic test mode",
    ],
    keywords: ["test", "mode", "firmware", "factory", "diagnostic"],
    answer:
      "A test mode provides access to production or diagnostic tests. It should be protected from unauthorized use.",
  },
  {
    id: "firmware-factory-test",
    category: "firmware",
    question: "What does a factory test check?",
    variations: [
      "Factory test firmware",
      "Production test device",
      "Manufacturing test embedded",
      "Board test firmware",
    ],
    keywords: ["factory", "test", "firmware", "production", "manufacturing"],
    answer:
      "Factory tests verify hardware and software functions, calibration and configuration before shipment.",
  },
  {
    id: "firmware-calibration-production",
    category: "firmware",
    question: "How is calibration done in production?",
    variations: [
      "Production calibration firmware",
      "Factory calibration device",
      "Calibrate sensor production",
      "Manufacturing calibration",
    ],
    keywords: ["calibration", "production", "firmware", "factory", "sensor"],
    answer:
      "Production calibration measures the device against references and stores correction values in non-volatile memory.",
  },
  {
    id: "firmware-serial-number-programming",
    category: "firmware",
    question: "How are serial numbers programmed?",
    variations: [
      "Serial number programming",
      "Program device ID",
      "Set serial number production",
      "Unique ID programming",
    ],
    keywords: ["serial", "number", "programming", "firmware", "production"],
    answer:
      "Serial numbers are programmed during production into non-volatile memory or OTP. They must be unique and traceable.",
  },
  {
    id: "firmware-mac-address-programming",
    category: "firmware",
    question: "How are MAC addresses programmed?",
    variations: [
      "Program MAC address",
      "MAC address production",
      "Set Ethernet MAC",
      "Assign MAC firmware",
    ],
    keywords: ["mac", "address", "programming", "firmware", "production"],
    answer:
      "MAC addresses may be assigned by the chip vendor, programmed during production or stored in configuration. They must be unique on the network.",
  },
  {
    id: "firmware-key-injection",
    category: "firmware",
    question: "How are keys injected during production?",
    variations: [
      "Key injection firmware",
      "Program keys production",
      "Inject device keys",
      "Key provisioning factory",
    ],
    keywords: ["key", "injection", "firmware", "production", "security"],
    answer:
      "Key injection programs unique keys or certificates into secure storage. The process must be protected and auditable.",
  },
  {
    id: "firmware-secure-manufacturing",
    category: "firmware",
    question: "What is secure manufacturing?",
    variations: [
      "Secure manufacturing firmware",
      "Secure production device",
      "Factory security practices",
      "Protected manufacturing",
    ],
    keywords: ["secure", "manufacturing", "firmware", "production", "security"],
    answer:
      "Secure manufacturing protects firmware, keys and identity during production through access control, secure provisioning and tamper protection.",
  },
  {
    id: "firmware-contract-manufacturer",
    category: "firmware",
    question: "What should be considered with a contract manufacturer?",
    variations: [
      "Contract manufacturer firmware",
      "CM production firmware",
      "Outsourced manufacturing",
      "EMS firmware security",
    ],
    keywords: [
      "contract",
      "manufacturer",
      "firmware",
      "production",
      "security",
    ],
    answer:
      "Consider security, intellectual property protection, firmware handling, key injection, traceability and quality processes.",
  },
  {
    id: "firmware-overproduction",
    category: "firmware",
    question: "How do I prevent overproduction?",
    variations: [
      "Overproduction firmware",
      "Limit device manufacturing",
      "Control production quantity",
      "Device count control",
    ],
    keywords: ["overproduction", "firmware", "production", "control", "limit"],
    answer:
      "Overproduction can be limited by secure key injection, device identity and licensing tied to production authorization.",
  },
  {
    id: "firmware-cloning",
    category: "firmware",
    question: "How do I prevent firmware cloning?",
    variations: [
      "Firmware cloning",
      "Prevent device copying",
      "Anti cloning firmware",
      "Protect firmware IP",
    ],
    keywords: ["cloning", "firmware", "security", "protect", "copy"],
    answer:
      "Anti-cloning measures include secure boot, unique device keys, encrypted firmware and binding firmware to hardware identity.",
  },
  {
    id: "firmware-device-binding",
    category: "firmware",
    question: "What is device binding?",
    variations: [
      "Device binding firmware",
      "Bind firmware to hardware",
      "Unique device binding",
      "Hardware software binding",
    ],
    keywords: ["device", "binding", "firmware", "hardware", "security"],
    answer:
      "Device binding ties firmware or credentials to a specific device, preventing them from being copied to another device.",
  },
  {
    id: "firmware-hardware-fingerprint",
    category: "firmware",
    question: "What is a hardware fingerprint?",
    variations: [
      "Hardware fingerprint firmware",
      "Device identity fingerprint",
      "Unique hardware signature",
      "Fingerprint security",
    ],
    keywords: ["hardware", "fingerprint", "firmware", "identity", "security"],
    answer:
      "A hardware fingerprint is a unique characteristic used to identify a device. It can be used for binding and licensing.",
  },
  {
    id: "firmware-licensing",
    category: "firmware",
    question: "How can firmware enforce licensing?",
    variations: [
      "Licensing firmware",
      "Feature licensing embedded",
      "License check device",
      "Enable features license",
    ],
    keywords: ["licensing", "firmware", "features", "security", "enable"],
    answer:
      "Licensing can enable features based on a license key or server check. It should be designed to resist tampering.",
  },
  {
    id: "firmware-feature-unlock",
    category: "firmware",
    question: "How do I unlock features in firmware?",
    variations: [
      "Feature unlock firmware",
      "Enable paid feature",
      "Unlock code device",
      "Activate feature MCU",
    ],
    keywords: ["feature", "unlock", "firmware", "activate", "license"],
    answer:
      "Features can be unlocked with a code, license file or server authorization. The mechanism should be secure.",
  },
  {
    id: "firmware-trial",
    category: "firmware",
    question: "How do I implement a trial period in firmware?",
    variations: [
      "Trial firmware",
      "Limited time feature",
      "Demo mode device",
      "Expire feature",
    ],
    keywords: ["trial", "firmware", "time", "limited", "feature"],
    answer:
      "A trial period can be tracked using secure time or usage counters. It requires tamper resistance to prevent bypass.",
  },
  {
    id: "firmware-expiry",
    category: "firmware",
    question: "How does firmware handle expiration?",
    variations: [
      "Expiry firmware",
      "Expire feature date",
      "Time limited firmware",
      "License expiration",
    ],
    keywords: ["expiry", "firmware", "time", "license", "expiration"],
    answer:
      "Expiration can be based on time or usage. Secure timekeeping and protected storage are needed to prevent bypass.",
  },
  {
    id: "firmware-clock-rollback",
    category: "firmware",
    question: "How do I prevent clock rollback?",
    variations: [
      "Clock rollback firmware",
      "Prevent time reversal",
      "Secure time protection",
      "Time tamper detection",
    ],
    keywords: ["clock", "rollback", "firmware", "time", "security"],
    answer:
      "Clock rollback can be detected by storing the last known time and checking for decreases. Secure time sources and hardware protection help.",
  },
  {
    id: "firmware-secure-time",
    category: "firmware",
    question: "What is secure time in firmware?",
    variations: [
      "Secure time firmware",
      "Trusted time source",
      "Protected clock embedded",
      "Time security",
    ],
    keywords: ["secure", "time", "firmware", "clock", "security"],
    answer:
      "Secure time provides a trusted time reference, often using a secure RTC, GPS or network time with authentication.",
  },
  {
    id: "firmware-monotonic-time",
    category: "firmware",
    question: "What is monotonic time?",
    variations: [
      "Monotonic time firmware",
      "Non decreasing clock",
      "Elapsed time counter",
      "Time without jumps",
    ],
    keywords: ["monotonic", "time", "firmware", "clock", "counter"],
    answer:
      "Monotonic time only moves forward and is not affected by clock adjustments. It is useful for measuring intervals and timeouts.",
  },
  {
    id: "firmware-wall-clock",
    category: "firmware",
    question: "What is wall-clock time?",
    variations: [
      "Wall clock firmware",
      "Real time clock",
      "Calendar time embedded",
      "System time MCU",
    ],
    keywords: ["wall", "clock", "firmware", "time", "calendar"],
    answer:
      "Wall-clock time is the actual calendar time, as opposed to elapsed time. It can be adjusted by synchronization and time zone changes.",
  },
  {
    id: "firmware-time-adjust",
    category: "firmware",
    question: "How does firmware handle time adjustments?",
    variations: [
      "Time adjustment firmware",
      "Change clock smoothly",
      "Slew time correction",
      "Set time without jump",
    ],
    keywords: ["time", "adjustment", "firmware", "clock", "slew"],
    answer:
      "Time can be adjusted by stepping or slewing. Slewing gradually corrects the clock to avoid jumps that could affect logs or timers.",
  },
  {
    id: "firmware-ntp-sync",
    category: "firmware",
    question: "How does NTP synchronization work in firmware?",
    variations: [
      "NTP sync firmware",
      "Synchronize time network",
      "NTP client code",
      "Time server firmware",
    ],
    keywords: ["ntp", "sync", "firmware", "time", "network"],
    answer:
      "Firmware sends a request to an NTP server and uses the response to set or adjust the local clock. Network latency and server accuracy affect precision.",
  },
  {
    id: "firmware-sntp-sync",
    category: "firmware",
    question: "What is the difference between NTP and SNTP?",
    variations: [
      "NTP vs SNTP",
      "Simple network time protocol",
      "SNTP firmware",
      "Time sync protocols",
    ],
    keywords: ["ntp", "sntp", "firmware", "time", "protocol"],
    answer:
      "SNTP is a simplified version of NTP for less demanding applications. It provides basic time synchronization with less complexity.",
  },
  {
    id: "firmware-gps-time-sync",
    category: "firmware",
    question: "How does GPS provide time?",
    variations: [
      "GPS time firmware",
      "Time from GPS",
      "GPS clock sync",
      "Use GPS for time",
    ],
    keywords: ["gps", "time", "firmware", "sync", "clock"],
    answer:
      "GPS satellites broadcast precise time. A GPS receiver can provide time and a PPS signal for accurate synchronization.",
  },
  {
    id: "firmware-rtc-sync",
    category: "firmware",
    question: "How do I synchronize an RTC?",
    variations: [
      "RTC sync firmware",
      "Set RTC from network",
      "Update real time clock",
      "Sync time RTC",
    ],
    keywords: ["rtc", "sync", "firmware", "time", "clock"],
    answer:
      "The RTC can be set from a network time source, GPS or user input. Firmware should handle drift and resynchronization.",
  },
  {
    id: "firmware-rtc-alarm-schedule",
    category: "firmware",
    question: "How do I schedule tasks with an RTC alarm?",
    variations: [
      "RTC alarm schedule",
      "Wake at time firmware",
      "Scheduled task RTC",
      "Alarm based scheduling",
    ],
    keywords: ["rtc", "alarm", "schedule", "firmware", "task"],
    answer:
      "Set the RTC alarm to the desired time and configure the wake source. Firmware handles the alarm interrupt and reschedules as needed.",
  },
  {
    id: "firmware-power-schedule",
    category: "firmware",
    question: "How do I schedule power on/off in firmware?",
    variations: [
      "Power schedule firmware",
      "Timed power control",
      "Schedule device on off",
      "Power timer MCU",
    ],
    keywords: ["power", "schedule", "firmware", "timer", "control"],
    answer:
      "Firmware can control power to subsystems using relays or switches on a schedule. Safety and fail-safe behavior should be considered.",
  },
  {
    id: "firmware-timer-power",
    category: "firmware",
    question: "How do I reduce power with timers?",
    variations: [
      "Timer power saving",
      "Periodic wake firmware",
      "Duty cycle power",
      "Low power timer MCU",
    ],
    keywords: ["timer", "power", "firmware", "low", "wake"],
    answer:
      "Timers can wake the device periodically to perform tasks, then return to sleep. The wake interval affects average power consumption.",
  },
  {
    id: "firmware-sleep-timer",
    category: "firmware",
    question: "How do I use a timer to wake from sleep?",
    variations: [
      "Sleep timer firmware",
      "Wake on timer",
      "Low power timer wake",
      "Periodic wake MCU",
    ],
    keywords: ["sleep", "timer", "firmware", "wake", "low"],
    answer:
      "Configure a timer or RTC alarm as the wake source, enter sleep, and handle the wake interrupt. The timer continues running in low-power modes.",
  },
  {
    id: "firmware-sleep-gpio",
    category: "firmware",
    question: "How do I wake on GPIO in firmware?",
    variations: [
      "Wake on GPIO",
      "External interrupt wake",
      "Button wake MCU",
      "GPIO wakeup firmware",
    ],
    keywords: ["sleep", "gpio", "firmware", "wake", "interrupt"],
    answer:
      "Configure the GPIO as a wake source with the desired edge or level, enable the interrupt and enter sleep. The device wakes when the condition occurs.",
  },
  {
    id: "firmware-sleep-uart",
    category: "firmware",
    question: "Can UART activity wake a microcontroller?",
    variations: [
      "UART wake firmware",
      "Serial wake MCU",
      "Wake on serial data",
      "UART interrupt wake",
    ],
    keywords: ["uart", "wake", "firmware", "sleep", "serial"],
    answer:
      "Some microcontrollers can wake from sleep on UART activity or a start bit. The available wake sources depend on the device.",
  },
  {
    id: "firmware-sleep-i2c",
    category: "firmware",
    question: "Can I2C activity wake a microcontroller?",
    variations: [
      "I2C wake firmware",
      "Wake on I2C address",
      "I2C slave wake",
      "Address match wake",
    ],
    keywords: ["i2c", "wake", "firmware", "sleep", "address"],
    answer:
      "Some devices can wake on I2C address match. Firmware configures the address and wake behavior.",
  },
  {
    id: "firmware-sleep-spi",
    category: "firmware",
    question: "Can SPI activity wake a microcontroller?",
    variations: [
      "SPI wake firmware",
      "Wake on SPI",
      "SPI slave wake",
      "Chip select wake",
    ],
    keywords: ["spi", "wake", "firmware", "sleep", "slave"],
    answer:
      "Some microcontrollers can wake on SPI chip select or activity. The wake behavior depends on the device.",
  },
  {
    id: "firmware-sleep-comparator",
    category: "firmware",
    question: "Can an analog comparator wake a microcontroller?",
    variations: [
      "Comparator wake firmware",
      "Analog wake MCU",
      "Wake on voltage",
      "Comparator interrupt wake",
    ],
    keywords: ["comparator", "wake", "firmware", "analog", "sleep"],
    answer:
      "Some microcontrollers include an analog comparator that can wake the device when an input crosses a threshold. This is useful for low-power sensing.",
  },
  {
    id: "firmware-sleep-adc",
    category: "firmware",
    question: "Can the ADC wake a microcontroller?",
    variations: [
      "ADC wake firmware",
      "Wake on analog value",
      "ADC threshold wake",
      "Analog watchdog wake",
    ],
    keywords: ["adc", "wake", "firmware", "analog", "threshold"],
    answer:
      "Some ADCs include a watchdog or threshold feature that can wake the device when a value crosses a limit. This allows low-power monitoring.",
  },
  {
    id: "firmware-sleep-touch",
    category: "firmware",
    question: "Can capacitive touch wake a microcontroller?",
    variations: [
      "Touch wake firmware",
      "Capacitive wake MCU",
      "Wake on touch",
      "Touch sensor wake",
    ],
    keywords: ["touch", "wake", "firmware", "capacitive", "sleep"],
    answer:
      "Some microcontrollers support wake on capacitive touch. The touch peripheral remains active in a low-power mode.",
  },
  {
    id: "firmware-sleep-motion",
    category: "firmware",
    question: "Can a motion sensor wake a microcontroller?",
    variations: [
      "Motion wake firmware",
      "Accelerometer wake",
      "PIR wake MCU",
      "Wake on movement",
    ],
    keywords: ["motion", "wake", "firmware", "sensor", "sleep"],
    answer:
      "A motion sensor can generate an interrupt to wake the microcontroller. The sensor may need to remain powered in a low-power mode.",
  },
  {
    id: "firmware-sleep-rtc",
    category: "firmware",
    question: "How does an RTC wake work?",
    variations: [
      "RTC wake firmware",
      "Wake on RTC alarm",
      "Real time clock wake",
      "Scheduled wake RTC",
    ],
    keywords: ["rtc", "wake", "firmware", "alarm", "sleep"],
    answer:
      "The RTC alarm generates an interrupt at a set time, waking the device. The RTC operates from a low-power clock source.",
  },
  {
    id: "firmware-sleep-wake-source",
    category: "firmware",
    question: "How do I identify the wake source?",
    variations: [
      "Wake source firmware",
      "Why did device wake",
      "Check wake reason",
      "Wake flags MCU",
    ],
    keywords: ["wake", "source", "firmware", "sleep", "flags"],
    answer:
      "Microcontrollers usually provide wake-up flags indicating the source. Firmware can read and clear these flags to determine why the device woke.",
  },
  {
    id: "firmware-sleep-cycle",
    category: "firmware",
    question: "How do I implement a sleep cycle?",
    variations: [
      "Sleep cycle firmware",
      "Duty cycle power",
      "Periodic sleep wake",
      "Low power cycle MCU",
    ],
    keywords: ["sleep", "cycle", "firmware", "power", "periodic"],
    answer:
      "The device performs work, enters sleep, wakes on an event or timer, and repeats. The duty cycle determines average power consumption.",
  },
  {
    id: "firmware-battery-monitor",
    category: "firmware",
    question: "How do I monitor battery level in firmware?",
    variations: [
      "Battery monitor firmware",
      "Read battery voltage",
      "Battery gauge MCU",
      "Low battery detection",
    ],
    keywords: ["battery", "monitor", "firmware", "voltage", "level"],
    answer:
      "Battery level can be estimated from voltage, coulomb counting or a dedicated fuel gauge. Voltage-based estimation is simple but affected by load.",
  },
  {
    id: "firmware-fuel-gauge",
    category: "firmware",
    question: "What is a fuel gauge?",
    variations: [
      "Fuel gauge firmware",
      "Battery gauge IC",
      "Coulomb counter",
      "State of charge",
    ],
    keywords: ["fuel", "gauge", "firmware", "battery", "charge"],
    answer:
      "A fuel gauge measures battery charge and reports state of charge. It may use voltage, current and temperature.",
  },
  {
    id: "firmware-coulomb",
    category: "firmware",
    question: "What is coulomb counting?",
    variations: [
      "Coulomb counting firmware",
      "Measure charge used",
      "Battery current integration",
      "State of charge estimation",
    ],
    keywords: ["coulomb", "counting", "firmware", "battery", "charge"],
    answer:
      "Coulomb counting integrates current over time to estimate charge used or remaining. It requires accurate current measurement.",
  },
  {
    id: "firmware-battery-protection",
    category: "firmware",
    question: "How does firmware protect a battery?",
    variations: [
      "Battery protection firmware",
      "Prevent overdischarge",
      "Battery safety code",
      "Protect lithium battery",
    ],
    keywords: ["battery", "protection", "firmware", "safety", "discharge"],
    answer:
      "Firmware can monitor voltage, current and temperature to prevent overcharge, overdischarge and overheating. Hardware protection is also important.",
  },
  {
    id: "firmware-charger",
    category: "firmware",
    question: "How do I control a battery charger in firmware?",
    variations: [
      "Charger firmware",
      "Control charging MCU",
      "Battery charger code",
      "Charge management",
    ],
    keywords: ["charger", "firmware", "battery", "control", "charge"],
    answer:
      "Charging may be controlled by a dedicated charger IC or by firmware. Firmware can configure charge current, monitor status and handle faults.",
  },
  {
    id: "firmware-charge-profile",
    category: "firmware",
    question: "What is a charge profile?",
    variations: [
      "Charge profile firmware",
      "Battery charging stages",
      "CC CV charging",
      "Charge algorithm",
    ],
    keywords: ["charge", "profile", "firmware", "battery", "charging"],
    answer:
      "A charge profile defines the charging stages, such as constant current, constant voltage and termination. It depends on the battery chemistry.",
  },
  {
    id: "firmware-usb-pd",
    category: "firmware",
    question: "How do I use USB Power Delivery?",
    variations: [
      "USB PD firmware",
      "USB power delivery code",
      "Negotiate power USB",
      "USB C PD MCU",
    ],
    keywords: ["usb", "pd", "firmware", "power", "delivery"],
    answer:
      "USB PD allows devices to negotiate power. Firmware controls a PD controller to request voltage and current.",
  },
  {
    id: "firmware-wireless-charging",
    category: "firmware",
    question: "How do I use wireless charging?",
    variations: [
      "Wireless charging firmware",
      "Qi charging code",
      "Inductive charging MCU",
      "Wireless power",
    ],
    keywords: ["wireless", "charging", "firmware", "qi", "power"],
    answer:
      "Wireless charging is handled by a dedicated receiver or controller. Firmware may monitor status, temperature and charging current.",
  },
  {
    id: "firmware-solar",
    category: "firmware",
    question: "How do I manage a solar-powered device in firmware?",
    variations: [
      "Solar firmware",
      "Solar power management",
      "Energy harvesting MCU",
      "Solar charger code",
    ],
    keywords: ["solar", "firmware", "power", "management", "energy"],
    answer:
      "Firmware can monitor solar input, battery state and load. It may adjust operation to match available energy and protect the battery.",
  },
  {
    id: "firmware-energy-harvesting",
    category: "firmware",
    question: "How do I use energy harvesting in firmware?",
    variations: [
      "Energy harvesting firmware",
      "Harvest power MCU",
      "Low power harvesting",
      "Ambient energy firmware",
    ],
    keywords: ["energy", "harvesting", "firmware", "power", "low"],
    answer:
      "Energy harvesting systems require careful power management. Firmware operates in short bursts, stores energy and sleeps between operations.",
  },
  {
    id: "firmware-supercapacitor",
    category: "firmware",
    question: "How do I manage a supercapacitor in firmware?",
    variations: [
      "Supercapacitor firmware",
      "Manage supercap",
      "Energy storage firmware",
      "Supercap power MCU",
    ],
    keywords: ["supercapacitor", "firmware", "power", "energy", "storage"],
    answer:
      "Firmware monitors supercapacitor voltage and controls charging and discharge. It may manage operation to avoid over-discharge.",
  },
  {
    id: "firmware-power-path",
    category: "firmware",
    question: "What is power path management?",
    variations: [
      "Power path firmware",
      "Manage power sources",
      "Battery and USB power",
      "Power switching MCU",
    ],
    keywords: ["power", "path", "firmware", "management", "switching"],
    answer:
      "Power path management controls which power source is used and how the battery is charged or discharged. Firmware may configure a power management IC.",
  },
  {
    id: "firmware-load-switch",
    category: "firmware",
    question: "How do I control a load switch in firmware?",
    variations: [
      "Load switch firmware",
      "Control power to subsystem",
      "Turn on off load",
      "Power switch MCU",
    ],
    keywords: ["load", "switch", "firmware", "power", "control"],
    answer:
      "A load switch controls power to a subsystem. Firmware sets the enable signal and may monitor current or fault status.",
  },
  {
    id: "firmware-power-sequencing",
    category: "firmware",
    question: "What is power sequencing?",
    variations: [
      "Power sequencing firmware",
      "Order power up",
      "Sequence supplies MCU",
      "Power up order",
    ],
    keywords: ["power", "sequencing", "firmware", "order", "supplies"],
    answer:
      "Power sequencing controls the order in which supplies are enabled. This is important for devices with multiple voltage rails.",
  },
  {
    id: "firmware-power-monitor",
    category: "firmware",
    question: "How do I monitor power rails in firmware?",
    variations: [
      "Power monitor firmware",
      "Check supply voltage",
      "Monitor voltage rails",
      "Power good signal",
    ],
    keywords: ["power", "monitor", "firmware", "voltage", "rails"],
    answer:
      "Firmware can read voltage, current and power-good signals from power management ICs or ADCs to monitor supply health.",
  },
  {
    id: "firmware-power-fault",
    category: "firmware",
    question: "How do I handle a power fault?",
    variations: [
      "Power fault firmware",
      "Handle supply failure",
      "Power error code",
      "Fault on power rail",
    ],
    keywords: ["power", "fault", "firmware", "failure", "error"],
    answer:
      "Firmware can detect power faults, log them, shut down outputs and attempt recovery. The response depends on the system requirements.",
  },
  {
    id: "firmware-overvoltage",
    category: "firmware",
    question: "How do I protect against overvoltage in firmware?",
    variations: [
      "Overvoltage protection firmware",
      "Detect high voltage",
      "Voltage protection MCU",
      "OVP firmware",
    ],
    keywords: ["overvoltage", "protection", "firmware", "voltage", "safety"],
    answer:
      "Firmware can monitor voltage and disable outputs or enter a safe state if it exceeds a threshold. Hardware protection is also important.",
  },
  {
    id: "firmware-overcurrent",
    category: "firmware",
    question: "How do I protect against overcurrent in firmware?",
    variations: [
      "Overcurrent protection firmware",
      "Detect high current",
      "Current limit MCU",
      "OCP firmware",
    ],
    keywords: ["overcurrent", "protection", "firmware", "current", "safety"],
    answer:
      "Firmware can monitor current and reduce or disable outputs when a limit is exceeded. Fast hardware protection may be needed for safety.",
  },
  {
    id: "firmware-overtemperature",
    category: "firmware",
    question: "How do I protect against overtemperature in firmware?",
    variations: [
      "Overtemperature firmware",
      "Thermal protection MCU",
      "Temperature limit code",
      "Overheat shutdown",
    ],
    keywords: [
      "overtemperature",
      "protection",
      "firmware",
      "thermal",
      "safety",
    ],
    answer:
      "Firmware can monitor temperature and reduce power or shut down when a limit is reached. The response should match the system requirements.",
  },
  {
    id: "firmware-short-protection",
    category: "firmware",
    question: "How do I detect a short circuit in firmware?",
    variations: [
      "Short circuit detection",
      "Detect output short",
      "Current spike firmware",
      "Short protection MCU",
    ],
    keywords: ["short", "circuit", "firmware", "protection", "current"],
    answer:
      "A short can be detected by monitoring current or voltage. Hardware protection is often needed because firmware response may be too slow.",
  },
  {
    id: "firmware-current-limit",
    category: "firmware",
    question: "How do I implement current limiting in firmware?",
    variations: [
      "Current limit firmware",
      "Limit output current",
      "Current control MCU",
      "Constant current firmware",
    ],
    keywords: ["current", "limit", "firmware", "control", "output"],
    answer:
      "Firmware can adjust a driver or PWM to limit current, but fast limiting usually requires hardware. Monitoring and feedback are needed.",
  },
  {
    id: "firmware-soft-start",
    category: "firmware",
    question: "How do I implement soft start in firmware?",
    variations: [
      "Soft start firmware",
      "Gradual power up",
      "Ramp output MCU",
      "Inrush limit firmware",
    ],
    keywords: ["soft", "start", "firmware", "ramp", "power"],
    answer:
      "Soft start gradually increases output over time to reduce inrush current. Firmware ramps the control signal or PWM duty.",
  },
  {
    id: "firmware-output-slew",
    category: "firmware",
    question: "How do I control output slew rate in firmware?",
    variations: [
      "Output slew rate",
      "Ramp output firmware",
      "Limit rate change",
      "Slew control MCU",
    ],
    keywords: ["output", "slew", "rate", "firmware", "control"],
    answer:
      "Firmware can change outputs in steps at a controlled rate to limit slew rate and reduce stress on loads.",
  },
  {
    id: "firmware-pwm-current",
    category: "firmware",
    question: "How do I control current with PWM?",
    variations: [
      "PWM current control",
      "Current regulation firmware",
      "PWM load control",
      "Average current PWM",
    ],
    keywords: ["pwm", "current", "firmware", "control", "load"],
    answer:
      "PWM controls average current or power by varying duty cycle. For precise current control, feedback and a current sensor are needed.",
  },
  {
    id: "firmware-current-sense",
    category: "firmware",
    question: "How do I measure current in firmware?",
    variations: [
      "Current sense firmware",
      "Measure current MCU",
      "Shunt resistor code",
      "Current sensor embedded",
    ],
    keywords: ["current", "sense", "firmware", "measure", "shunt"],
    answer:
      "Current can be measured with a shunt and amplifier, a Hall sensor or a dedicated current sense IC. Firmware reads and scales the value.",
  },
  {
    id: "firmware-shunt",
    category: "firmware",
    question: "How do I use a shunt resistor for current sensing?",
    variations: [
      "Shunt resistor firmware",
      "Current shunt code",
      "Measure current shunt",
      "Shunt amplifier MCU",
    ],
    keywords: ["shunt", "resistor", "firmware", "current", "sense"],
    answer:
      "A shunt resistor develops a small voltage proportional to current. An amplifier and ADC measure it. Firmware converts the voltage to current.",
  },
  {
    id: "firmware-hall",
    category: "firmware",
    question: "How do I use a Hall effect current sensor?",
    variations: [
      "Hall sensor firmware",
      "Hall current code",
      "Magnetic current sensor",
      "Isolated current sense",
    ],
    keywords: ["hall", "sensor", "firmware", "current", "magnetic"],
    answer:
      "A Hall effect sensor measures current magnetically, providing isolation. Firmware reads its output and converts to current.",
  },
  {
    id: "firmware-isolated-sense",
    category: "firmware",
    question: "Why use an isolated current sensor?",
    variations: [
      "Isolated current sensing",
      "Galvanic isolation current",
      "High voltage current sense",
      "Isolated sensor firmware",
    ],
    keywords: ["isolated", "current", "firmware", "sensor", "isolation"],
    answer:
      "Isolated sensors protect the measurement circuit from high voltages and ground differences. They are used in mains and industrial applications.",
  },
  {
    id: "firmware-voltage-sense",
    category: "firmware",
    question: "How do I measure voltage in firmware?",
    variations: [
      "Voltage sense firmware",
      "Measure voltage MCU",
      "Voltage divider code",
      "ADC voltage measurement",
    ],
    keywords: ["voltage", "sense", "firmware", "measure", "adc"],
    answer:
      "Voltage can be measured with a divider and ADC, or a dedicated voltage sensor. Firmware converts the reading to voltage using calibration.",
  },
  {
    id: "firmware-divider",
    category: "firmware",
    question: "How do I use a voltage divider for sensing?",
    variations: [
      "Voltage divider sensing",
      "Divider ADC firmware",
      "Reduce voltage measurement",
      "Resistor divider code",
    ],
    keywords: ["divider", "firmware", "voltage", "sensing", "adc"],
    answer:
      "A divider scales a voltage to the ADC range. Firmware multiplies the reading by the divider ratio to calculate the actual voltage.",
  },
  {
    id: "firmware-isolated-voltage",
    category: "firmware",
    question: "How do I measure isolated voltage?",
    variations: [
      "Isolated voltage sensing",
      "High voltage measurement",
      "Isolated ADC",
      "Voltage isolation firmware",
    ],
    keywords: ["isolated", "voltage", "firmware", "measurement", "safety"],
    answer:
      "Isolated voltage sensing uses transformers, optocouplers or isolated amplifiers to protect the measurement circuit.",
  },
  {
    id: "firmware-temperature-sense",
    category: "firmware",
    question: "How do I measure temperature in firmware?",
    variations: [
      "Temperature sense firmware",
      "Read temperature MCU",
      "Thermistor code",
      "Temperature sensor embedded",
    ],
    keywords: ["temperature", "sense", "firmware", "measure", "sensor"],
    answer:
      "Temperature can be measured with thermistors, thermocouples, RTDs or digital sensors. Firmware converts the output to temperature using calibration.",
  },
  {
    id: "firmware-thermistor",
    category: "firmware",
    question: "How do I read a thermistor in firmware?",
    variations: [
      "Thermistor firmware",
      "NTC thermistor code",
      "Read thermistor MCU",
      "Temperature from thermistor",
    ],
    keywords: ["thermistor", "firmware", "temperature", "read", "ntc"],
    answer:
      "A thermistor changes resistance with temperature. A divider and ADC measure it. Firmware applies the Steinhart-Hart or beta equation.",
  },
  {
    id: "firmware-thermocouple",
    category: "firmware",
    question: "How do I read a thermocouple in firmware?",
    variations: [
      "Thermocouple firmware",
      "MAX6675 code",
      "Read thermocouple MCU",
      "Temperature thermocouple",
    ],
    keywords: ["thermocouple", "firmware", "temperature", "read", "sensor"],
    answer:
      "Thermocouples produce a small voltage. An amplifier and cold-junction compensation are needed. Firmware reads the digitized value and converts to temperature.",
  },
  {
    id: "firmware-rtd",
    category: "firmware",
    question: "How do I read an RTD in firmware?",
    variations: [
      "RTD firmware",
      "PT100 code",
      "Read RTD MCU",
      "Resistance temperature detector",
    ],
    keywords: ["rtd", "firmware", "temperature", "read", "pt100"],
    answer:
      "An RTD changes resistance with temperature. A precision current source and ADC measure it. Firmware converts resistance to temperature.",
  },
  {
    id: "firmware-thermopile",
    category: "firmware",
    question: "How do I read a thermopile in firmware?",
    variations: [
      "Thermopile firmware",
      "IR temperature sensor",
      "Non contact temperature MCU",
      "Thermopile code",
    ],
    keywords: ["thermopile", "firmware", "temperature", "infrared", "sensor"],
    answer:
      "A thermopile measures infrared radiation to determine temperature without contact. Firmware reads the sensor and applies calibration.",
  },
  {
    id: "firmware-temperature-comp",
    category: "firmware",
    question: "How do I compensate temperature measurements?",
    variations: [
      "Temperature compensation firmware",
      "Compensate sensor temperature",
      "Temperature correction code",
      "Calibrate temperature sensor",
    ],
    keywords: [
      "temperature",
      "compensation",
      "firmware",
      "sensor",
      "correction",
    ],
    answer:
      "Temperature compensation corrects measurements based on ambient or sensor temperature. It can use polynomial, lookup or linear correction.",
  },
  {
    id: "firmware-humidity-comp",
    category: "firmware",
    question: "How do I compensate humidity measurements?",
    variations: [
      "Humidity compensation firmware",
      "Compensate humidity sensor",
      "Humidity correction code",
      "Calibrate humidity",
    ],
    keywords: ["humidity", "compensation", "firmware", "sensor", "correction"],
    answer:
      "Humidity sensors may require temperature compensation or calibration. Firmware applies correction formulas or table values.",
  },
  {
    id: "firmware-pressure-comp",
    category: "firmware",
    question: "How do I compensate pressure measurements?",
    variations: [
      "Pressure compensation firmware",
      "Compensate pressure sensor",
      "Pressure correction code",
      "Calibrate pressure",
    ],
    keywords: ["pressure", "compensation", "firmware", "sensor", "correction"],
    answer:
      "Pressure sensors may require temperature and nonlinearity compensation. Firmware applies calibration coefficients from the datasheet or production calibration.",
  },
  {
    id: "firmware-flow-comp",
    category: "firmware",
    question: "How do I compensate flow measurements?",
    variations: [
      "Flow compensation firmware",
      "Compensate flow sensor",
      "Flow correction code",
      "Calibrate flow meter",
    ],
    keywords: ["flow", "compensation", "firmware", "sensor", "correction"],
    answer:
      "Flow sensors may require compensation for temperature, pressure or fluid properties. Firmware applies correction based on the sensor characteristics.",
  },
  {
    id: "firmware-sensor-fusion-kalman",
    category: "firmware",
    question: "How do I implement a Kalman filter in firmware?",
    variations: [
      "Kalman filter firmware",
      "Implement Kalman MCU",
      "Sensor fusion Kalman",
      "Kalman filter code",
    ],
    keywords: ["kalman", "filter", "firmware", "sensor", "fusion"],
    answer:
      "A Kalman filter is implemented using matrix operations and state updates. On microcontrollers, simplified or scalar versions may be used.",
  },
  {
    id: "firmware-complementary-filter",
    category: "firmware",
    question: "How do I implement a complementary filter?",
    variations: [
      "Complementary filter firmware",
      "Implement complementary MCU",
      "Simple sensor fusion",
      "Complementary filter code",
    ],
    keywords: ["complementary", "filter", "firmware", "sensor", "fusion"],
    answer:
      "A complementary filter combines two signals with a weighted average. It is simple and useful for IMU attitude estimation.",
  },
  {
    id: "firmware-madgwick",
    category: "firmware",
    question: "What is the Madgwick filter?",
    variations: [
      "Madgwick filter firmware",
      "AHRS algorithm MCU",
      "Orientation filter embedded",
      "Madgwick code",
    ],
    keywords: ["madgwick", "filter", "firmware", "ahrs", "orientation"],
    answer:
      "The Madgwick filter is an efficient algorithm for orientation estimation from IMU data. It is suitable for microcontrollers.",
  },
  {
    id: "firmware-mahony",
    category: "firmware",
    question: "What is the Mahony filter?",
    variations: [
      "Mahony filter firmware",
      "AHRS algorithm embedded",
      "Orientation estimation MCU",
      "Mahony code",
    ],
    keywords: ["mahony", "filter", "firmware", "ahrs", "orientation"],
    answer:
      "The Mahony filter is a complementary filter for attitude estimation using IMU data. It is computationally efficient.",
  },
  {
    id: "firmware-ahrs",
    category: "firmware",
    question: "What is AHRS?",
    variations: [
      "AHRS firmware",
      "Attitude heading reference",
      "Orientation system embedded",
      "AHRS algorithm MCU",
    ],
    keywords: ["ahrs", "firmware", "attitude", "orientation", "sensor"],
    answer:
      "AHRS, or Attitude and Heading Reference System, provides orientation using accelerometer, gyroscope and magnetometer data.",
  },
  {
    id: "firmware-imu-orientation",
    category: "firmware",
    question: "How do I get orientation from an IMU?",
    variations: [
      "IMU orientation firmware",
      "Get roll pitch yaw",
      "Orientation from sensors",
      "IMU attitude code",
    ],
    keywords: ["imu", "orientation", "firmware", "attitude", "sensor"],
    answer:
      "Orientation can be estimated by integrating gyro data and correcting with accelerometer and magnetometer using sensor fusion.",
  },
  {
    id: "firmware-gyro-integration",
    category: "firmware",
    question: "What is gyro integration?",
    variations: [
      "Gyro integration firmware",
      "Integrate gyroscope data",
      "Angle from gyro",
      "Gyro drift integration",
    ],
    keywords: ["gyro", "integration", "firmware", "angle", "drift"],
    answer:
      "Gyro integration sums angular rate over time to estimate angle. It drifts over time, so correction from other sensors is used.",
  },
  {
    id: "firmware-drift",
    category: "firmware",
    question: "What is sensor drift?",
    variations: [
      "Sensor drift firmware",
      "Drift in gyro",
      "Why sensor readings drift",
      "Compensate drift",
    ],
    keywords: ["drift", "sensor", "firmware", "gyro", "compensation"],
    answer:
      "Drift is a gradual change in sensor output over time or with temperature. Calibration and sensor fusion reduce its effect.",
  },
  {
    id: "firmware-bias",
    category: "firmware",
    question: "What is sensor bias?",
    variations: [
      "Sensor bias firmware",
      "Offset in sensor",
      "Bias correction",
      "Remove sensor bias",
    ],
    keywords: ["bias", "sensor", "firmware", "offset", "correction"],
    answer:
      "Bias is a constant offset in sensor output. It can be calibrated and subtracted from readings.",
  },
  {
    id: "firmware-scale-factor",
    category: "firmware",
    question: "What is a scale factor error?",
    variations: [
      "Scale factor firmware",
      "Sensor gain error",
      "Scale correction",
      "Calibrate scale",
    ],
    keywords: ["scale", "factor", "firmware", "sensor", "calibration"],
    answer:
      "Scale factor error means the sensor output changes by the wrong amount for a given input. It can be corrected with calibration.",
  },
  {
    id: "firmware-cross-axis",
    category: "firmware",
    question: "What is cross-axis sensitivity?",
    variations: [
      "Cross axis firmware",
      "Sensor axis interference",
      "Cross sensitivity correction",
      "Axis alignment sensor",
    ],
    keywords: ["cross", "axis", "firmware", "sensor", "sensitivity"],
    answer:
      "Cross-axis sensitivity is when a sensor responds to inputs on other axes. It can be corrected with calibration matrices.",
  },
  {
    id: "firmware-calibration-matrix",
    category: "firmware",
    question: "How do I use a calibration matrix?",
    variations: [
      "Calibration matrix firmware",
      "Sensor calibration matrix",
      "Correct sensor axes",
      "Matrix calibration code",
    ],
    keywords: ["calibration", "matrix", "firmware", "sensor", "correction"],
    answer:
      "A calibration matrix corrects for scale, offset and cross-axis errors. Firmware multiplies raw readings by the matrix.",
  },
  {
    id: "firmware-sensor-fusion-board",
    category: "firmware",
    question: "What is a sensor fusion board?",
    variations: [
      "Sensor fusion board",
      "IMU board firmware",
      "9 axis sensor board",
      "Fusion module",
    ],
    keywords: ["sensor", "fusion", "board", "firmware", "imu"],
    answer:
      "A sensor fusion board combines multiple sensors and sometimes a processor to provide orientation or motion data.",
  },
  {
    id: "firmware-sensor-hub",
    category: "firmware",
    question: "What is a sensor hub?",
    variations: [
      "Sensor hub firmware",
      "Sensor processing unit",
      "Hub for sensors",
      "Sensor aggregation MCU",
    ],
    keywords: ["sensor", "hub", "firmware", "processing", "aggregation"],
    answer:
      "A sensor hub manages multiple sensors, processing their data and reducing load on the main processor.",
  },
  {
    id: "firmware-edge-ai",
    category: "firmware",
    question: "What is edge AI in firmware?",
    variations: [
      "Edge AI firmware",
      "Machine learning embedded",
      "TinyML MCU",
      "AI on microcontroller",
    ],
    keywords: ["edge", "ai", "firmware", "machine", "learning"],
    answer:
      "Edge AI runs machine learning models on the device. TinyML frameworks enable simple models on microcontrollers.",
  },
  {
    id: "firmware-tinyml",
    category: "firmware",
    question: "What is TinyML?",
    variations: [
      "TinyML firmware",
      "Tiny machine learning",
      "ML on MCU",
      "Embedded AI",
    ],
    keywords: ["tinyml", "firmware", "machine", "learning", "embedded"],
    answer:
      "TinyML refers to machine learning on resource-constrained devices. Models are optimized for small memory and low power.",
  },
  {
    id: "firmware-tflite",
    category: "firmware",
    question: "Can firmware use TensorFlow Lite?",
    variations: [
      "TensorFlow Lite firmware",
      "TFLite Micro",
      "Run ML model MCU",
      "TensorFlow embedded",
    ],
    keywords: ["tensorflow", "lite", "firmware", "ml", "micro"],
    answer:
      "TensorFlow Lite for Microcontrollers allows small models to run on microcontrollers. Memory and processing requirements must be considered.",
  },
  {
    id: "firmware-model-quantization",
    category: "firmware",
    question: "What is model quantization?",
    variations: [
      "Quantization firmware",
      "Reduce model size",
      "8 bit model MCU",
      "Quantized neural network",
    ],
    keywords: ["quantization", "firmware", "model", "size", "ml"],
    answer:
      "Quantization reduces the precision of model weights and activations, decreasing size and improving speed on microcontrollers.",
  },
  {
    id: "firmware-neural-network",
    category: "firmware",
    question: "Can firmware run a neural network?",
    variations: [
      "Neural network firmware",
      "Run NN MCU",
      "AI inference embedded",
      "Deep learning microcontroller",
    ],
    keywords: ["neural", "network", "firmware", "ml", "inference"],
    answer:
      "Small neural networks can run on microcontrollers with optimized libraries. Model size, memory and speed are key constraints.",
  },
  {
    id: "firmware-inference",
    category: "firmware",
    question: "What is inference in firmware?",
    variations: [
      "Inference firmware",
      "Run model MCU",
      "AI prediction embedded",
      "Model execution",
    ],
    keywords: ["inference", "firmware", "ml", "model", "prediction"],
    answer:
      "Inference is the process of running a trained model on new data to produce a prediction or classification.",
  },
  {
    id: "firmware-training",
    category: "firmware",
    question: "Can firmware train a model?",
    variations: [
      "Train model firmware",
      "On device training",
      "Learn on MCU",
      "Training embedded",
    ],
    keywords: ["training", "firmware", "model", "ml", "on"],
    answer:
      "Training on microcontrollers is limited and usually done offline. Some simple online learning is possible, but resources are constrained.",
  },
  {
    id: "firmware-classification",
    category: "firmware",
    question: "How do I classify sensor data in firmware?",
    variations: [
      "Classification firmware",
      "Sensor classification MCU",
      "Pattern recognition embedded",
      "Classify data device",
    ],
    keywords: ["classification", "firmware", "sensor", "data", "ml"],
    answer:
      "Classification can use simple thresholds, feature extraction or machine learning models depending on the task and resources.",
  },
  {
    id: "firmware-anomaly",
    category: "firmware",
    question: "How do I detect anomalies in firmware?",
    variations: [
      "Anomaly detection firmware",
      "Detect abnormal behavior",
      "Outlier sensor data",
      "Fault detection MCU",
    ],
    keywords: ["anomaly", "detection", "firmware", "sensor", "data"],
    answer:
      "Anomaly detection can use statistical thresholds, models or comparison to expected behavior. It is used for fault detection and monitoring.",
  },
  {
    id: "firmware-predictive",
    category: "firmware",
    question: "What is predictive maintenance?",
    variations: [
      "Predictive maintenance firmware",
      "Predict failure device",
      "Condition monitoring MCU",
      "Maintenance prediction",
    ],
    keywords: [
      "predictive",
      "maintenance",
      "firmware",
      "monitoring",
      "failure",
    ],
    answer:
      "Predictive maintenance uses sensor data and models to estimate when maintenance is needed, reducing downtime.",
  },
  {
    id: "firmware-vibration-analysis",
    category: "firmware",
    question: "How do I analyze vibration in firmware?",
    variations: [
      "Vibration analysis firmware",
      "FFT firmware",
      "Frequency analysis MCU",
      "Vibration monitoring",
    ],
    keywords: ["vibration", "analysis", "firmware", "fft", "frequency"],
    answer:
      "Vibration analysis can use FFT or other transforms to identify frequency components. Microcontrollers can run small FFTs.",
  },
  {
    id: "firmware-fft",
    category: "firmware",
    question: "Can firmware run an FFT?",
    variations: [
      "FFT firmware",
      "Fast Fourier transform MCU",
      "Frequency analysis embedded",
      "FFT code microcontroller",
    ],
    keywords: ["fft", "firmware", "frequency", "analysis", "transform"],
    answer:
      "FFTs can run on microcontrollers using optimized libraries. Memory and processing power determine the maximum size and speed.",
  },
  {
    id: "firmware-dsp",
    category: "firmware",
    question: "What is DSP in firmware?",
    variations: [
      "DSP firmware",
      "Digital signal processing MCU",
      "Signal processing embedded",
      "DSP code",
    ],
    keywords: ["dsp", "firmware", "signal", "processing", "digital"],
    answer:
      "DSP involves processing signals such as audio, vibration or sensor data. Some microcontrollers include DSP instructions or hardware.",
  },
  {
    id: "firmware-filter-design",
    category: "firmware",
    question: "How do I design a digital filter in firmware?",
    variations: [
      "Digital filter firmware",
      "IIR FIR filter MCU",
      "Filter design embedded",
      "Implement filter code",
    ],
    keywords: ["filter", "design", "firmware", "digital", "iir", "fir"],
    answer:
      "Digital filters can be IIR or FIR. Coefficients are calculated from the desired response and implemented as difference equations.",
  },
  {
    id: "firmware-fir",
    category: "firmware",
    question: "What is an FIR filter?",
    variations: [
      "FIR filter firmware",
      "Finite impulse response",
      "FIR vs IIR",
      "FIR code MCU",
    ],
    keywords: ["fir", "filter", "firmware", "digital", "signal"],
    answer:
      "An FIR filter uses a finite number of input samples. It is stable and can have linear phase but may require more computation than IIR.",
  },
  {
    id: "firmware-iir",
    category: "firmware",
    question: "What is an IIR filter?",
    variations: [
      "IIR filter firmware",
      "Infinite impulse response",
      "IIR vs FIR",
      "IIR code MCU",
    ],
    keywords: ["iir", "filter", "firmware", "digital", "signal"],
    answer:
      "An IIR filter uses feedback and can achieve a desired response with fewer coefficients than FIR. Stability must be considered.",
  },
  {
    id: "firmware-moving-average-filter",
    category: "firmware",
    question: "How do I implement a moving average filter?",
    variations: [
      "Moving average filter",
      "Average filter firmware",
      "Smooth data MCU",
      "Rolling average code",
    ],
    keywords: ["moving", "average", "filter", "firmware", "smooth"],
    answer:
      "A moving average filter averages a window of recent samples. It is simple and effective for reducing random noise.",
  },
  {
    id: "firmware-exponential",
    category: "firmware",
    question: "What is exponential smoothing?",
    variations: [
      "Exponential smoothing firmware",
      "EMA filter MCU",
      "Low pass filter code",
      "Smooth sensor data",
    ],
    keywords: ["exponential", "smoothing", "firmware", "filter", "sensor"],
    answer:
      "Exponential smoothing applies a weighted average with a decay factor. It uses little memory and provides adjustable smoothing.",
  },
  {
    id: "firmware-median-filter",
    category: "firmware",
    question: "How do I implement a median filter?",
    variations: [
      "Median filter firmware",
      "Remove spikes sensor",
      "Median filter code MCU",
      "Robust filter",
    ],
    keywords: ["median", "filter", "firmware", "sensor", "spike"],
    answer:
      "A median filter sorts a window of samples and selects the middle. It removes spikes while preserving edges.",
  },
  {
    id: "firmware-kalman-filter-implementation",
    category: "firmware",
    question: "How do I implement a Kalman filter on a microcontroller?",
    variations: [
      "Kalman filter MCU",
      "Implement Kalman embedded",
      "Kalman code microcontroller",
      "Simple Kalman filter",
    ],
    keywords: ["kalman", "filter", "firmware", "implementation", "mcu"],
    answer:
      "A Kalman filter can be implemented with matrix operations. Simplified scalar versions are common on microcontrollers.",
  },
  {
    id: "firmware-particle-filter",
    category: "firmware",
    question: "What is a particle filter?",
    variations: [
      "Particle filter firmware",
      "Monte Carlo localization",
      "Particle filter MCU",
      "Nonlinear filter",
    ],
    keywords: ["particle", "filter", "firmware", "localization", "nonlinear"],
    answer:
      "A particle filter estimates state using a set of weighted samples. It can handle nonlinear systems but is computationally intensive.",
  },
  {
    id: "firmware-sensor-fusion-algorithm",
    category: "firmware",
    question: "What sensor fusion algorithm should I use?",
    variations: [
      "Sensor fusion algorithm",
      "Which fusion filter",
      "Choose sensor fusion",
      "Fusion algorithm firmware",
    ],
    keywords: ["sensor", "fusion", "algorithm", "firmware", "choose"],
    answer:
      "The choice depends on the sensors, required accuracy and available processing. Complementary filters are simple; Kalman filters are more accurate but complex.",
  },
  {
    id: "firmware-state-estimation",
    category: "firmware",
    question: "What is state estimation?",
    variations: [
      "State estimation firmware",
      "Estimate system state",
      "Observer embedded",
      "State observer MCU",
    ],
    keywords: ["state", "estimation", "firmware", "observer", "system"],
    answer:
      "State estimation uses measurements and a model to estimate the internal state of a system. It is used in control and navigation.",
  },
  {
    id: "firmware-observer",
    category: "firmware",
    question: "What is an observer in control?",
    variations: [
      "Observer firmware",
      "State observer control",
      "Luenberger observer",
      "Estimate state control",
    ],
    keywords: ["observer", "firmware", "control", "state", "estimation"],
    answer:
      "An observer estimates unmeasured states of a system from available measurements and a model.",
  },
  {
    id: "firmware-luenberger",
    category: "firmware",
    question: "What is a Luenberger observer?",
    variations: [
      "Luenberger observer firmware",
      "Linear state observer",
      "Observer design MCU",
      "State observer control",
    ],
    keywords: ["luenberger", "observer", "firmware", "control", "state"],
    answer:
      "A Luenberger observer is a linear state observer that estimates system states using feedback from measurement errors.",
  },
  {
    id: "firmware-model-predictive",
    category: "firmware",
    question: "What is model predictive control?",
    variations: [
      "Model predictive control firmware",
      "MPC embedded",
      "Predictive control MCU",
      "MPC implementation",
    ],
    keywords: ["model", "predictive", "control", "firmware", "mpc"],
    answer:
      "Model predictive control uses a model to predict future behavior and optimize control actions. It is computationally intensive.",
  },
  {
    id: "firmware-adaptive-control",
    category: "firmware",
    question: "What is adaptive control?",
    variations: [
      "Adaptive control firmware",
      "Self tuning control",
      "Adjust control parameters",
      "Adaptive controller MCU",
    ],
    keywords: ["adaptive", "control", "firmware", "tuning", "parameters"],
    answer:
      "Adaptive control adjusts its parameters based on changing system behavior, improving performance over a wider range.",
  },
  {
    id: "firmware-fuzzy",
    category: "firmware",
    question: "What is fuzzy logic control?",
    variations: [
      "Fuzzy logic firmware",
      "Fuzzy control MCU",
      "Fuzzy logic embedded",
      "Fuzzy controller",
    ],
    keywords: ["fuzzy", "logic", "firmware", "control", "embedded"],
    answer:
      "Fuzzy logic control uses linguistic rules and membership functions. It can handle imprecise inputs and nonlinear systems.",
  },
  {
    id: "firmware-neural-control",
    category: "firmware",
    question: "Can firmware use neural networks for control?",
    variations: [
      "Neural control firmware",
      "NN control MCU",
      "AI control embedded",
      "Neural network controller",
    ],
    keywords: ["neural", "control", "firmware", "network", "ml"],
    answer:
      "Small neural networks can be used for control on microcontrollers, but training is usually done offline and inference runs on the device.",
  },
  {
    id: "firmware-reinforcement",
    category: "firmware",
    question: "Can firmware use reinforcement learning?",
    variations: [
      "Reinforcement learning firmware",
      "RL embedded",
      "Learn control MCU",
      "RL on device",
    ],
    keywords: ["reinforcement", "learning", "firmware", "control", "ml"],
    answer:
      "Reinforcement learning on microcontrollers is limited and usually involves simple policies or offline training.",
  },
  {
    id: "firmware-genetic",
    category: "firmware",
    question: "Can firmware use genetic algorithms?",
    variations: [
      "Genetic algorithm firmware",
      "GA embedded",
      "Evolutionary algorithm MCU",
      "Optimization firmware",
    ],
    keywords: ["genetic", "algorithm", "firmware", "optimization", "embedded"],
    answer:
      "Genetic algorithms can be implemented on microcontrollers for optimization, but processing and memory are limited.",
  },
  {
    id: "firmware-optimization-algorithm",
    category: "firmware",
    question: "What optimization algorithms can firmware use?",
    variations: [
      "Optimization firmware",
      "Algorithm embedded",
      "Optimize parameters MCU",
      "Search algorithm",
    ],
    keywords: ["optimization", "algorithm", "firmware", "parameters", "search"],
    answer:
      "Depending on the problem, firmware can use gradient methods, hill climbing, simulated annealing, genetic algorithms or other search methods.",
  },
  {
    id: "firmware-gradient",
    category: "firmware",
    question: "What is gradient descent?",
    variations: [
      "Gradient descent firmware",
      "Optimization MCU",
      "Learn parameters",
      "Gradient method",
    ],
    keywords: ["gradient", "descent", "firmware", "optimization", "learning"],
    answer:
      "Gradient descent iteratively adjusts parameters in the direction that reduces an error function. It is used in training and optimization.",
  },
  {
    id: "firmware-least-squares",
    category: "firmware",
    question: "What is least squares fitting?",
    variations: [
      "Least squares firmware",
      "Curve fitting MCU",
      "Linear regression embedded",
      "Fit data firmware",
    ],
    keywords: ["least", "squares", "firmware", "fitting", "regression"],
    answer:
      "Least squares fitting finds parameters that minimize the sum of squared errors. It is used for calibration, curve fitting and regression.",
  },
  {
    id: "firmware-linear-regression",
    category: "firmware",
    question: "How do I implement linear regression in firmware?",
    variations: [
      "Linear regression firmware",
      "Fit line MCU",
      "Regression code embedded",
      "Line fitting",
    ],
    keywords: ["linear", "regression", "firmware", "fit", "line"],
    answer:
      "Linear regression calculates slope and intercept from data points. It can be implemented with simple sums and minimal memory.",
  },
  {
    id: "firmware-polynomial",
    category: "firmware",
    question: "How do I evaluate a polynomial in firmware?",
    variations: [
      "Polynomial firmware",
      "Evaluate polynomial MCU",
      "Horner method",
      "Polynomial code",
    ],
    keywords: ["polynomial", "firmware", "evaluate", "horner", "calculation"],
    answer:
      "Polynomials can be evaluated efficiently using Horner's method, which reduces multiplications and improves numerical stability.",
  },
  {
    id: "firmware-lookup",
    category: "firmware",
    question: "How do I use a lookup table in firmware?",
    variations: [
      "Lookup table firmware",
      "LUT embedded",
      "Table interpolation MCU",
      "Calibration table code",
    ],
    keywords: ["lookup", "table", "firmware", "lut", "calibration"],
    answer:
      "A lookup table maps input values to outputs. Interpolation between entries improves accuracy.",
  },
  {
    id: "firmware-interpolation-linear",
    category: "firmware",
    question: "How do I do linear interpolation in firmware?",
    variations: [
      "Linear interpolation firmware",
      "Interpolate table MCU",
      "Between values code",
      "Interpolation function",
    ],
    keywords: ["interpolation", "linear", "firmware", "table", "values"],
    answer:
      "Linear interpolation estimates values between two known points using a straight line. It is simple and fast.",
  },
  {
    id: "firmware-interpolation-cubic",
    category: "firmware",
    question: "What is cubic interpolation?",
    variations: [
      "Cubic interpolation firmware",
      "Spline interpolation MCU",
      "Smooth interpolation",
      "Cubic spline code",
    ],
    keywords: ["interpolation", "cubic", "firmware", "spline", "smooth"],
    answer:
      "Cubic interpolation uses a cubic polynomial between points, providing smoother results than linear interpolation.",
  },
  {
    id: "firmware-extrapolation",
    category: "firmware",
    question: "What is extrapolation?",
    variations: [
      "Extrapolation firmware",
      "Predict outside range",
      "Extend data MCU",
      "Forecast values",
    ],
    keywords: ["extrapolation", "firmware", "predict", "range", "data"],
    answer:
      "Extrapolation estimates values outside the measured range. It is less reliable than interpolation and should be used with caution.",
  },
  {
    id: "firmware-statistics",
    category: "firmware",
    question: "How do I calculate statistics in firmware?",
    variations: [
      "Statistics firmware",
      "Mean median mode MCU",
      "Calculate average embedded",
      "Statistical functions",
    ],
    keywords: ["statistics", "firmware", "mean", "median", "average"],
    answer:
      "Basic statistics such as mean, variance and min/max can be calculated with simple accumulation. More complex statistics require more memory.",
  },
  {
    id: "firmware-mean",
    category: "firmware",
    question: "How do I calculate an average in firmware?",
    variations: [
      "Average firmware",
      "Calculate mean MCU",
      "Average sensor readings",
      "Mean value code",
    ],
    keywords: ["average", "firmware", "mean", "calculate", "sensor"],
    answer:
      "Sum values and divide by the count. For a moving average, use a window and update incrementally.",
  },
  {
    id: "firmware-variance",
    category: "firmware",
    question: "How do I calculate variance in firmware?",
    variations: [
      "Variance firmware",
      "Standard deviation MCU",
      "Calculate variance embedded",
      "Statistical spread",
    ],
    keywords: ["variance", "firmware", "standard", "deviation", "calculate"],
    answer:
      "Variance is the average of squared differences from the mean. Standard deviation is its square root.",
  },
  {
    id: "firmware-min-max",
    category: "firmware",
    question: "How do I track minimum and maximum values in firmware?",
    variations: [
      "Min max firmware",
      "Track peak value",
      "Find minimum maximum MCU",
      "Range tracking",
    ],
    keywords: ["min", "max", "firmware", "track", "peak"],
    answer:
      "Compare each new value to stored minimum and maximum, updating as needed. Reset when a new period begins.",
  },
  {
    id: "firmware-histogram",
    category: "firmware",
    question: "How do I create a histogram in firmware?",
    variations: [
      "Histogram firmware",
      "Bin data MCU",
      "Distribution code embedded",
      "Frequency histogram",
    ],
    keywords: ["histogram", "firmware", "data", "distribution", "bins"],
    answer:
      "A histogram counts values falling into defined bins. Firmware increments the appropriate bin for each sample.",
  },
  {
    id: "firmware-peak",
    category: "firmware",
    question: "How do I detect a peak in firmware?",
    variations: [
      "Peak detection firmware",
      "Find maximum MCU",
      "Peak finding code",
      "Detect signal peak",
    ],
    keywords: ["peak", "detection", "firmware", "signal", "maximum"],
    answer:
      "Peak detection looks for a value that is higher than neighboring samples. Thresholds and smoothing help avoid false peaks.",
  },
  {
    id: "firmware-zero-cross",
    category: "firmware",
    question: "How do I detect zero crossings in firmware?",
    variations: [
      "Zero crossing firmware",
      "Detect sign change MCU",
      "Zero cross detection",
      "AC zero crossing",
    ],
    keywords: ["zero", "crossing", "firmware", "detect", "signal"],
    answer:
      "Zero crossing is detected when a signal changes sign. It is used for AC control and frequency measurement.",
  },
  {
    id: "firmware-frequency",
    category: "firmware",
    question: "How do I measure frequency in firmware?",
    variations: [
      "Frequency measurement firmware",
      "Count pulses MCU",
      "Measure frequency code",
      "Input capture frequency",
    ],
    keywords: ["frequency", "measure", "firmware", "pulses", "capture"],
    answer:
      "Frequency can be measured by counting pulses over a known time or measuring the period between edges using input capture.",
  },
  {
    id: "firmware-period",
    category: "firmware",
    question: "How do I measure a period in firmware?",
    variations: [
      "Period measurement firmware",
      "Measure time between edges",
      "Input capture period",
      "Pulse period MCU",
    ],
    keywords: ["period", "measure", "firmware", "time", "capture"],
    answer:
      "Measure the time between successive edges using a timer or input capture. The inverse gives frequency.",
  },
  {
    id: "firmware-duty-cycle",
    category: "firmware",
    question: "How do I measure duty cycle in firmware?",
    variations: [
      "Duty cycle measurement",
      "Measure PWM input",
      "Duty cycle firmware",
      "Input capture duty",
    ],
    keywords: ["duty", "cycle", "firmware", "measure", "pwm"],
    answer:
      "Duty cycle is the ratio of high time to total period. It can be measured with input capture or by sampling.",
  },
  {
    id: "firmware-pulse-count",
    category: "firmware",
    question: "How do I count pulses in firmware?",
    variations: [
      "Pulse count firmware",
      "Count edges MCU",
      "Pulse counter code",
      "Event counting",
    ],
    keywords: ["pulse", "count", "firmware", "edges", "counter"],
    answer:
      "Pulses can be counted using a timer/counter, an external interrupt or a dedicated counter peripheral.",
  },
  {
    id: "firmware-tachometer",
    category: "firmware",
    question: "How do I read a tachometer signal?",
    variations: [
      "Tachometer firmware",
      "RPM measurement MCU",
      "Fan tach code",
      "Speed measurement",
    ],
    keywords: ["tachometer", "firmware", "rpm", "measure", "speed"],
    answer:
      "A tachometer output is a pulse train whose frequency is proportional to speed. Firmware measures frequency and converts to RPM.",
  },
  {
    id: "firmware-encoder-position",
    category: "firmware",
    question: "How do I read encoder position in firmware?",
    variations: [
      "Encoder position firmware",
      "Read quadrature encoder",
      "Position tracking code",
      "Encoder count MCU",
    ],
    keywords: ["encoder", "position", "firmware", "quadrature", "count"],
    answer:
      "Encoder position is tracked by counting pulses and determining direction from the phase relationship. It may be handled by a timer peripheral.",
  },
  {
    id: "firmware-encoder-velocity",
    category: "firmware",
    question: "How do I calculate velocity from an encoder?",
    variations: [
      "Encoder velocity firmware",
      "Speed from encoder",
      "Calculate RPM encoder",
      "Velocity measurement",
    ],
    keywords: ["encoder", "velocity", "firmware", "speed", "rpm"],
    answer:
      "Velocity is the change in position over time. Firmware can measure the time between pulses or count pulses over a fixed period.",
  },
  {
    id: "firmware-homing",
    category: "firmware",
    question: "What is homing in motion control?",
    variations: [
      "Homing firmware",
      "Find home position",
      "Reference position MCU",
      "Homing routine",
    ],
    keywords: ["homing", "firmware", "position", "motion", "reference"],
    answer:
      "Homing moves the system to a known reference position, often using a limit switch or sensor, to establish an absolute position.",
  },
  {
    id: "firmware-limit-switch",
    category: "firmware",
    question: "How do I use a limit switch in firmware?",
    variations: [
      "Limit switch firmware",
      "End stop MCU",
      "Position limit code",
      "Switch limit motion",
    ],
    keywords: ["limit", "switch", "firmware", "motion", "position"],
    answer:
      "Limit switches indicate when a mechanism reaches an end or reference position. Firmware reads them and stops or changes motion.",
  },
  {
    id: "firmware-soft-limit",
    category: "firmware",
    question: "What is a soft limit in firmware?",
    variations: [
      "Soft limit firmware",
      "Software position limit",
      "Virtual limit MCU",
      "Prevent overtravel",
    ],
    keywords: ["soft", "limit", "firmware", "position", "motion"],
    answer:
      "A soft limit is a software-defined boundary that prevents motion beyond a safe range, complementing physical limits.",
  },
  {
    id: "firmware-hard-limit",
    category: "firmware",
    question: "What is a hard limit in firmware?",
    variations: [
      "Hard limit firmware",
      "Physical limit switch",
      "Hardware limit motion",
      "End of travel",
    ],
    keywords: ["hard", "limit", "firmware", "physical", "motion"],
    answer:
      "A hard limit is a physical switch or sensor that detects the end of travel. It provides a reliable safety boundary.",
  },
  {
    id: "firmware-motion-stop",
    category: "firmware",
    question: "How do I stop motion safely in firmware?",
    variations: [
      "Stop motion firmware",
      "Safe stop MCU",
      "Decelerate stop",
      "Emergency stop motion",
    ],
    keywords: ["motion", "stop", "firmware", "safe", "decelerate"],
    answer:
      "Motion can be stopped by decelerating to a halt, disabling the motor driver, or using an emergency stop. The method depends on the required stopping time and safety.",
  },
  {
    id: "firmware-ramp-motion",
    category: "firmware",
    question: "How do I ramp motion in firmware?",
    variations: [
      "Ramp motion firmware",
      "Accelerate decelerate MCU",
      "Motion profile code",
      "Speed ramp",
    ],
    keywords: ["ramp", "motion", "firmware", "accelerate", "profile"],
    answer:
      "Ramping gradually increases or decreases speed, limiting acceleration and reducing mechanical stress.",
  },
  {
    id: "firmware-acceleration",
    category: "firmware",
    question: "How do I calculate acceleration in firmware?",
    variations: [
      "Acceleration firmware",
      "Calculate acceleration MCU",
      "Motion acceleration code",
      "Rate of speed change",
    ],
    keywords: ["acceleration", "firmware", "motion", "calculate", "speed"],
    answer:
      "Acceleration is the change in velocity over time. Firmware can compute it from speed measurements or set it in a motion profile.",
  },
  {
    id: "firmware-jerk",
    category: "firmware",
    question: "What is jerk in motion control?",
    variations: [
      "Jerk firmware",
      "Jerk limit motion",
      "Rate of acceleration change",
      "S curve jerk",
    ],
    keywords: ["jerk", "firmware", "motion", "acceleration", "control"],
    answer:
      "Jerk is the rate of change of acceleration. Limiting jerk reduces mechanical shock and improves smoothness.",
  },
  {
    id: "firmware-s-curve",
    category: "firmware",
    question: "What is an S-curve motion profile?",
    variations: [
      "S curve firmware",
      "S curve motion",
      "Jerk limited profile",
      "Smooth motion profile",
    ],
    keywords: ["s", "curve", "firmware", "motion", "profile"],
    answer:
      "An S-curve profile limits jerk, producing smooth acceleration and deceleration. It is used in high-performance motion control.",
  },
  {
    id: "firmware-trapezoidal",
    category: "firmware",
    question: "What is a trapezoidal motion profile?",
    variations: [
      "Trapezoidal profile firmware",
      "Trapezoid motion",
      "Accel cruise decel",
      "Motion profile code",
    ],
    keywords: ["trapezoidal", "firmware", "motion", "profile", "accel"],
    answer:
      "A trapezoidal profile has acceleration, constant speed and deceleration phases. It is simple and widely used.",
  },
  {
    id: "firmware-motion-planning",
    category: "firmware",
    question: "What is motion planning?",
    variations: [
      "Motion planning firmware",
      "Plan movement MCU",
      "Trajectory planning motion",
      "Path planning control",
    ],
    keywords: ["motion", "planning", "firmware", "trajectory", "control"],
    answer:
      "Motion planning determines the path and timing for movement, respecting constraints such as speed, acceleration and obstacles.",
  },
  {
    id: "firmware-path",
    category: "firmware",
    question: "What is path planning?",
    variations: [
      "Path planning firmware",
      "Plan route robot",
      "Path planning algorithm",
      "Route planning MCU",
    ],
    keywords: ["path", "planning", "firmware", "robot", "route"],
    answer:
      "Path planning finds a route from a start to a goal, often avoiding obstacles. Algorithms range from simple to complex.",
  },
  {
    id: "firmware-obstacle",
    category: "firmware",
    question: "How do I avoid obstacles in firmware?",
    variations: [
      "Obstacle avoidance firmware",
      "Avoid collision robot",
      "Obstacle detection MCU",
      "Navigation around obstacles",
    ],
    keywords: ["obstacle", "avoidance", "firmware", "robot", "collision"],
    answer:
      "Obstacle avoidance uses sensors to detect obstacles and adjusts motion or path. Simple methods use thresholds; complex methods use mapping.",
  },
  {
    id: "firmware-line-follow",
    category: "firmware",
    question: "How do I follow a line in firmware?",
    variations: [
      "Line following firmware",
      "Line follower robot",
      "Follow line code",
      "IR line sensor",
    ],
    keywords: ["line", "following", "firmware", "robot", "sensor"],
    answer:
      "Line following uses sensors to detect a line and adjusts motor speeds to stay on it. PID control improves tracking.",
  },
  {
    id: "firmware-wall-follow",
    category: "firmware",
    question: "How do I follow a wall in firmware?",
    variations: [
      "Wall following firmware",
      "Wall follower robot",
      "Follow wall code",
      "Distance to wall control",
    ],
    keywords: ["wall", "following", "firmware", "robot", "distance"],
    answer:
      "Wall following uses distance sensors to maintain a set distance from a wall, adjusting steering accordingly.",
  },
  {
    id: "firmware-navigation",
    category: "firmware",
    question: "How do I navigate in firmware?",
    variations: [
      "Navigation firmware",
      "Robot navigation MCU",
      "Navigate using sensors",
      "Position and navigation",
    ],
    keywords: ["navigation", "firmware", "robot", "position", "sensors"],
    answer:
      "Navigation combines position estimation, mapping and path planning. The complexity depends on the environment and available sensors.",
  },
  {
    id: "firmware-slam",
    category: "firmware",
    question: "What is SLAM?",
    variations: [
      "SLAM firmware",
      "Simultaneous localization mapping",
      "SLAM robot",
      "Localization and mapping",
    ],
    keywords: ["slam", "firmware", "localization", "mapping", "robot"],
    answer:
      "SLAM, or Simultaneous Localization and Mapping, builds a map while tracking position. It is used in mobile robots and autonomous systems.",
  },
  {
    id: "firmware-localization",
    category: "firmware",
    question: "How do I localize a device?",
    variations: [
      "Localization firmware",
      "Find position MCU",
      "Position estimation",
      "Localization algorithms",
    ],
    keywords: [
      "localization",
      "firmware",
      "position",
      "estimate",
      "navigation",
    ],
    answer:
      "Localization estimates position using sensors such as GPS, encoders, IMU or beacons, often combined with filtering.",
  },
  {
    id: "firmware-waypoint",
    category: "firmware",
    question: "How do I navigate to waypoints?",
    variations: [
      "Waypoint firmware",
      "Navigate to point",
      "Waypoint navigation MCU",
      "Go to coordinate",
    ],
    keywords: ["waypoint", "firmware", "navigation", "point", "coordinate"],
    answer:
      "Waypoint navigation steers toward a series of target points, updating the path as needed and handling arrival.",
  },
  {
    id: "firmware-return-home",
    category: "firmware",
    question: "How do I implement return-to-home?",
    variations: [
      "Return home firmware",
      "RTH drone",
      "Go back to start",
      "Return to base",
    ],
    keywords: ["return", "home", "firmware", "navigation", "base"],
    answer:
      "Return-to-home navigates back to a recorded starting position, often using GPS or a stored path.",
  },
  {
    id: "firmware-geofence",
    category: "firmware",
    question: "What is a geofence?",
    variations: [
      "Geofence firmware",
      "Virtual boundary GPS",
      "Area limit device",
      "Geofencing MCU",
    ],
    keywords: ["geofence", "firmware", "boundary", "gps", "area"],
    answer:
      "A geofence is a virtual boundary. Firmware can trigger actions or alerts when the device enters or leaves the area.",
  },
  {
    id: "firmware-altitude",
    category: "firmware",
    question: "How do I measure altitude in firmware?",
    variations: [
      "Altitude firmware",
      "Height measurement MCU",
      "Barometric altitude",
      "Altitude from pressure",
    ],
    keywords: ["altitude", "firmware", "measure", "pressure", "height"],
    answer:
      "Altitude can be estimated from barometric pressure or GPS. Barometric altitude is more responsive but affected by weather.",
  },
  {
    id: "firmware-heading",
    category: "firmware",
    question: "How do I determine heading in firmware?",
    variations: [
      "Heading firmware",
      "Compass heading MCU",
      "Direction from magnetometer",
      "Yaw calculation",
    ],
    keywords: ["heading", "firmware", "compass", "direction", "magnetometer"],
    answer:
      "Heading is determined from magnetometer data, often combined with accelerometer readings for tilt compensation.",
  },
  {
    id: "firmware-tilt-compensation",
    category: "firmware",
    question: "What is tilt compensation for a compass?",
    variations: [
      "Tilt compensation firmware",
      "Compass tilt correction",
      "Tilt compensated heading",
      "Magnetometer tilt",
    ],
    keywords: ["tilt", "compensation", "firmware", "compass", "magnetometer"],
    answer:
      "Tilt compensation corrects magnetometer readings for the device's orientation, providing accurate heading even when tilted.",
  },
  {
    id: "firmware-magnetic-declination",
    category: "firmware",
    question: "What is magnetic declination?",
    variations: [
      "Magnetic declination firmware",
      "True north vs magnetic",
      "Declination correction",
      "Compass declination",
    ],
    keywords: ["magnetic", "declination", "firmware", "compass", "north"],
    answer:
      "Magnetic declination is the angle between magnetic north and true north. It depends on location and can be corrected in firmware.",
  },
  {
    id: "firmware-hard-iron",
    category: "firmware",
    question: "What is hard iron distortion?",
    variations: [
      "Hard iron firmware",
      "Magnetometer offset",
      "Compass calibration",
      "Hard iron correction",
    ],
    keywords: ["hard", "iron", "firmware", "magnetometer", "calibration"],
    answer:
      "Hard iron distortion is a constant magnetic offset caused by nearby materials. It can be calibrated and subtracted.",
  },
  {
    id: "firmware-soft-iron",
    category: "firmware",
    question: "What is soft iron distortion?",
    variations: [
      "Soft iron firmware",
      "Magnetometer distortion",
      "Compass calibration soft iron",
      "Scale and skew",
    ],
    keywords: ["soft", "iron", "firmware", "magnetometer", "distortion"],
    answer:
      "Soft iron distortion changes the shape of the magnetic field. It can be corrected with a calibration matrix.",
  },
  {
    id: "firmware-compass-cal",
    category: "firmware",
    question: "How do I calibrate a compass in firmware?",
    variations: [
      "Compass calibration firmware",
      "Calibrate magnetometer",
      "Hard soft iron calibration",
      "Compass correction code",
    ],
    keywords: ["compass", "calibration", "firmware", "magnetometer", "iron"],
    answer:
      "Compass calibration determines hard and soft iron corrections, often by rotating the device through known orientations.",
  },
  {
    id: "firmware-barometer",
    category: "firmware",
    question: "How do I read a barometer in firmware?",
    variations: [
      "Barometer firmware",
      "Read pressure altitude",
      "BMP180 code",
      "Barometric sensor MCU",
    ],
    keywords: ["barometer", "firmware", "pressure", "altitude", "sensor"],
    answer:
      "Barometric sensors measure atmospheric pressure. Firmware reads and converts the value to pressure and altitude.",
  },
  {
    id: "firmware-altimeter",
    category: "firmware",
    question: "How do I use an altimeter in firmware?",
    variations: [
      "Altimeter firmware",
      "Altitude measurement MCU",
      "Height sensor code",
      "Barometric altimeter",
    ],
    keywords: ["altimeter", "firmware", "altitude", "measure", "pressure"],
    answer:
      "An altimeter measures altitude using pressure or GPS. Firmware applies calibration and may fuse with other sensors.",
  },
  {
    id: "firmware-vario",
    category: "firmware",
    question: "What is a variometer?",
    variations: [
      "Variometer firmware",
      "Vertical speed MCU",
      "Climb rate sensor",
      "Altitude rate",
    ],
    keywords: ["variometer", "firmware", "vertical", "speed", "altitude"],
    answer:
      "A variometer measures rate of climb or descent. Firmware calculates the change in altitude over time.",
  },
  {
    id: "firmware-differential-pressure",
    category: "firmware",
    question: "How do I measure differential pressure in firmware?",
    variations: [
      "Differential pressure firmware",
      "Pressure difference MCU",
      "DP sensor code",
      "Airflow pressure",
    ],
    keywords: ["differential", "pressure", "firmware", "measure", "sensor"],
    answer:
      "A differential pressure sensor measures the difference between two ports. Firmware reads and converts the value.",
  },
  {
    id: "firmware-air-speed",
    category: "firmware",
    question: "How do I measure air speed in firmware?",
    variations: [
      "Air speed firmware",
      "Pitot tube MCU",
      "Wind speed sensor",
      "Airspeed measurement",
    ],
    keywords: ["air", "speed", "firmware", "pitot", "wind"],
    answer:
      "Air speed can be measured with a pitot tube and differential pressure sensor, or with a hot-wire or vane sensor. Firmware converts the reading.",
  },
  {
    id: "firmware-anemometer",
    category: "firmware",
    question: "How do I read an anemometer in firmware?",
    variations: [
      "Anemometer firmware",
      "Wind speed code",
      "Cup anemometer MCU",
      "Wind sensor",
    ],
    keywords: ["anemometer", "firmware", "wind", "speed", "sensor"],
    answer:
      "Anemometers often output pulses proportional to wind speed. Firmware counts pulses and converts to speed.",
  },
  {
    id: "firmware-wind-vane",
    category: "firmware",
    question: "How do I read a wind vane in firmware?",
    variations: [
      "Wind vane firmware",
      "Wind direction sensor",
      "Weather vane MCU",
      "Direction sensor",
    ],
    keywords: ["wind", "vane", "firmware", "direction", "sensor"],
    answer:
      "A wind vane typically uses a variable resistor or encoder. Firmware reads the value and maps it to direction.",
  },
  {
    id: "firmware-rain",
    category: "firmware",
    question: "How do I read a rain sensor in firmware?",
    variations: [
      "Rain sensor firmware",
      "Rain detection MCU",
      "Rain gauge code",
      "Weather sensor",
    ],
    keywords: ["rain", "sensor", "firmware", "detection", "weather"],
    answer:
      "Rain sensors may be resistive, capacitive or tipping-bucket types. Firmware reads the output or counts tips.",
  },
  {
    id: "firmware-weather",
    category: "firmware",
    question: "How do I build a weather station in firmware?",
    variations: [
      "Weather station firmware",
      "Weather sensors MCU",
      "Weather monitoring code",
      "Outdoor sensor station",
    ],
    keywords: ["weather", "station", "firmware", "sensors", "monitoring"],
    answer:
      "A weather station combines sensors for temperature, humidity, pressure, wind and rain. Firmware reads, processes and may transmit the data.",
  },
  {
    id: "firmware-data-logging-sd",
    category: "firmware",
    question: "How do I log data to an SD card in firmware?",
    variations: [
      "SD logging firmware",
      "Data logger SD card",
      "Write data SD MCU",
      "Log to SD code",
    ],
    keywords: ["data", "logging", "sd", "firmware", "card"],
    answer:
      "Firmware uses a file system library to open a file, write data and close it. Buffering and flush timing improve reliability.",
  },
  {
    id: "firmware-csv",
    category: "firmware",
    question: "How do I write CSV data in firmware?",
    variations: [
      "CSV firmware",
      "Write comma separated data",
      "Log CSV MCU",
      "CSV format data",
    ],
    keywords: ["csv", "firmware", "data", "write", "format"],
    answer:
      "CSV data can be formatted with commas and newlines. Firmware writes header and rows using a file system.",
  },
  {
    id: "firmware-binary-log",
    category: "firmware",
    question: "How do I log binary data in firmware?",
    variations: [
      "Binary log firmware",
      "Log raw data MCU",
      "Binary data storage",
      "Compact logging",
    ],
    keywords: ["binary", "log", "firmware", "data", "storage"],
    answer:
      "Binary logging writes raw data in a defined format, saving space and time compared to text. A header or schema helps interpretation.",
  },
  {
    id: "firmware-log-header",
    category: "firmware",
    question: "Should log files have a header?",
    variations: [
      "Log header firmware",
      "CSV header log",
      "Metadata in log",
      "Log file header",
    ],
    keywords: ["log", "header", "firmware", "metadata", "file"],
    answer:
      "A header describes the format, columns and units. It helps with later analysis and interpretation.",
  },
  {
    id: "firmware-log-timestamp-format",
    category: "firmware",
    question: "What timestamp format should logs use?",
    variations: [
      "Log timestamp format",
      "Date time format firmware",
      "ISO 8601 log",
      "Time format logging",
    ],
    keywords: ["log", "timestamp", "format", "firmware", "time"],
    answer:
      "ISO 8601 or Unix time is common. The format should be consistent and precise enough for the application.",
  },
  {
    id: "firmware-log-flush",
    category: "firmware",
    question: "How do I ensure log data is written?",
    variations: [
      "Log flush firmware",
      "Write buffered data",
      "Ensure data saved",
      "Sync file MCU",
    ],
    keywords: ["log", "flush", "firmware", "data", "write"],
    answer:
      "Buffered data should be flushed periodically or at critical points. Power loss can cause data loss if not flushed.",
  },
  {
    id: "firmware-log-power",
    category: "firmware",
    question: "How do I protect logs during power loss?",
    variations: [
      "Log power loss firmware",
      "Protect data power",
      "Safe logging MCU",
      "Power fail log",
    ],
    keywords: ["log", "power", "loss", "firmware", "protection"],
    answer:
      "Use journaling, periodic flushing and safe file update methods. Some systems detect power loss and flush quickly.",
  },
  {
    id: "firmware-log-download",
    category: "firmware",
    question: "How do I download logs from a device?",
    variations: [
      "Download logs firmware",
      "Retrieve log data",
      "Transfer logs MCU",
      "Export logs device",
    ],
    keywords: ["log", "download", "firmware", "data", "transfer"],
    answer:
      "Logs can be transferred over serial, USB, network or by removing the storage medium. Firmware may provide a command or web interface.",
  },
  {
    id: "firmware-log-viewer",
    category: "firmware",
    question: "What tool can view firmware logs?",
    variations: [
      "Log viewer firmware",
      "View logs MCU",
      "Display log data",
      "Log analysis tool",
    ],
    keywords: ["log", "viewer", "firmware", "tool", "analysis"],
    answer:
      "Logs can be viewed with terminal software, custom tools or standard analysis programs depending on the format.",
  },
  {
    id: "firmware-log-automation",
    category: "firmware",
    question: "How can logs be analyzed automatically?",
    variations: [
      "Automated log analysis",
      "Parse logs firmware",
      "Log processing tool",
      "Analyze log data",
    ],
    keywords: ["log", "automation", "analysis", "firmware", "parse"],
    answer:
      "Structured logs can be parsed by scripts or tools to detect patterns, errors or trends. Machine learning may be used for larger datasets.",
  },
  {
    id: "firmware-log-retention",
    category: "firmware",
    question: "How long should logs be retained?",
    variations: [
      "Log retention firmware",
      "Keep logs duration",
      "Log storage policy",
      "Retain log data",
    ],
    keywords: ["log", "retention", "firmware", "storage", "duration"],
    answer:
      "Retention depends on storage capacity, requirements and policy. Logs can be rotated, archived or deleted after a period.",
  },
  {
    id: "firmware-log-privacy",
    category: "firmware",
    question: "How do I handle privacy in logs?",
    variations: [
      "Log privacy firmware",
      "Anonymize logs",
      "Private data logging",
      "Log personal data",
    ],
    keywords: ["log", "privacy", "firmware", "data", "security"],
    answer:
      "Avoid logging personal or sensitive data unless required. If necessary, protect it with access controls and encryption.",
  },
  {
    id: "firmware-log-compliance",
    category: "firmware",
    question: "Are there compliance requirements for logs?",
    variations: [
      "Log compliance firmware",
      "Regulatory logging",
      "Audit log requirements",
      "Compliance data logs",
    ],
    keywords: ["log", "compliance", "firmware", "requirements", "audit"],
    answer:
      "Some industries have specific logging and retention requirements. These should be identified and implemented.",
  },
  {
    id: "firmware-log-tamper",
    category: "firmware",
    question: "How do I protect logs from tampering?",
    variations: [
      "Log tamper firmware",
      "Tamper evident logs",
      "Secure log storage",
      "Protect audit logs",
    ],
    keywords: ["log", "tamper", "firmware", "security", "protection"],
    answer:
      "Logs can be protected with access controls, cryptographic hashes or signatures, and secure storage.",
  },
  {
    id: "firmware-log-remote",
    category: "firmware",
    question: "How do I send logs to a remote server?",
    variations: [
      "Remote log firmware",
      "Send logs server",
      "Syslog MCU",
      "Central logging device",
    ],
    keywords: ["log", "remote", "firmware", "server", "syslog"],
    answer:
      "Logs can be sent over the network using protocols such as syslog, HTTP or MQTT. Buffering and retry are important for reliability.",
  },
  {
    id: "firmware-syslog",
    category: "firmware",
    question: "Can firmware use syslog?",
    variations: [
      "Syslog firmware",
      "Send syslog MCU",
      "Syslog protocol embedded",
      "Remote syslog device",
    ],
    keywords: ["syslog", "firmware", "log", "remote", "protocol"],
    answer:
      "Syslog is a standard logging protocol. Firmware can send log messages to a syslog server over UDP or TCP.",
  },
  {
    id: "firmware-snmp",
    category: "firmware",
    question: "Can firmware use SNMP?",
    variations: [
      "SNMP firmware",
      "Simple network management",
      "SNMP agent MCU",
      "Network monitoring device",
    ],
    keywords: ["snmp", "firmware", "network", "management", "monitoring"],
    answer:
      "SNMP is used for network management. Firmware can implement an SNMP agent to report status and receive configuration.",
  },
  {
    id: "firmware-telnet",
    category: "firmware",
    question: "Can firmware use Telnet?",
    variations: [
      "Telnet firmware",
      "Telnet server MCU",
      "Remote terminal device",
      "Telnet console",
    ],
    keywords: ["telnet", "firmware", "remote", "terminal", "server"],
    answer:
      "Telnet provides a simple remote terminal. It should be used with caution because it is not encrypted.",
  },
  {
    id: "firmware-ssh",
    category: "firmware",
    question: "Can firmware use SSH?",
    variations: [
      "SSH firmware",
      "Secure shell MCU",
      "Remote encrypted terminal",
      "SSH server device",
    ],
    keywords: ["ssh", "firmware", "secure", "shell", "remote"],
    answer:
      "SSH provides encrypted remote access. Implementing it on microcontrollers requires significant resources.",
  },
  {
    id: "firmware-webdav",
    category: "firmware",
    question: "Can firmware use WebDAV?",
    variations: [
      "WebDAV firmware",
      "File sharing MCU",
      "Remote file access device",
      "WebDAV server",
    ],
    keywords: ["webdav", "firmware", "file", "sharing", "remote"],
    answer:
      "WebDAV allows file access over HTTP. It can be implemented on more capable embedded systems.",
  },
  {
    id: "firmware-ftp",
    category: "firmware",
    question: "Can firmware use FTP?",
    variations: [
      "FTP firmware",
      "File transfer MCU",
      "FTP server device",
      "FTP client embedded",
    ],
    keywords: ["ftp", "firmware", "file", "transfer", "server"],
    answer:
      "FTP can be used for file transfer but is not encrypted. FTPS or SFTP may be preferred for security.",
  },
  {
    id: "firmware-tftp",
    category: "firmware",
    question: "Can firmware use TFTP?",
    variations: [
      "TFTP firmware",
      "Trivial file transfer",
      "TFTP boot MCU",
      "Simple file transfer",
    ],
    keywords: ["tftp", "firmware", "file", "transfer", "boot"],
    answer:
      "TFTP is a simple file transfer protocol often used for network boot and firmware updates. It has no authentication or encryption.",
  },
  {
    id: "firmware-http-server",
    category: "firmware",
    question: "How do I run an HTTP server in firmware?",
    variations: [
      "HTTP server firmware",
      "Web server MCU",
      "Serve web page device",
      "HTTP server code",
    ],
    keywords: ["http", "server", "firmware", "web", "page"],
    answer:
      "Firmware can implement a simple HTTP server to serve pages and handle requests. More capable devices can use a full web framework.",
  },
  {
    id: "firmware-rest",
    category: "firmware",
    question: "Can firmware provide a REST API?",
    variations: [
      "REST API firmware",
      "RESTful device",
      "JSON API MCU",
      "HTTP API embedded",
    ],
    keywords: ["rest", "api", "firmware", "http", "json"],
    answer:
      "Firmware can implement REST endpoints for control and monitoring, often using JSON over HTTP.",
  },
  {
    id: "firmware-graphql",
    category: "firmware",
    question: "Can firmware use GraphQL?",
    variations: [
      "GraphQL firmware",
      "GraphQL API MCU",
      "Query language device",
      "GraphQL embedded",
    ],
    keywords: ["graphql", "firmware", "api", "query", "embedded"],
    answer:
      "GraphQL is generally too heavy for small microcontrollers but can be used on more capable embedded Linux systems.",
  },
  {
    id: "firmware-websocket-server",
    category: "firmware",
    question: "Can firmware run a WebSocket server?",
    variations: [
      "WebSocket server firmware",
      "Real time device communication",
      "WebSocket MCU",
      "Bidirectional web",
    ],
    keywords: ["websocket", "server", "firmware", "real", "time"],
    answer:
      "Some connected microcontrollers can run a WebSocket server for real-time communication with web clients.",
  },
  {
    id: "firmware-sse",
    category: "firmware",
    question: "What is Server-Sent Events?",
    variations: [
      "SSE firmware",
      "Server sent events MCU",
      "Push updates web",
      "Event stream device",
    ],
    keywords: ["sse", "firmware", "events", "server", "web"],
    answer:
      "Server-Sent Events allow a server to push updates to a client over HTTP. It can be used for simple real-time monitoring.",
  },
  {
    id: "firmware-long-poll",
    category: "firmware",
    question: "What is long polling?",
    variations: [
      "Long polling firmware",
      "Comet technique",
      "HTTP push device",
      "Real time without websocket",
    ],
    keywords: ["long", "polling", "firmware", "http", "real"],
    answer:
      "Long polling keeps an HTTP request open until data is available. It can provide near-real-time updates but is less efficient than WebSocket.",
  },
  {
    id: "firmware-mqtt-broker",
    category: "firmware",
    question: "Can firmware run an MQTT broker?",
    variations: [
      "MQTT broker firmware",
      "Broker on device",
      "Embedded MQTT broker",
      "Local MQTT server",
    ],
    keywords: ["mqtt", "broker", "firmware", "embedded", "server"],
    answer:
      "MQTT brokers are usually external, but lightweight brokers can run on more capable embedded systems.",
  },
  {
    id: "firmware-mqtt-client",
    category: "firmware",
    question: "How do I implement an MQTT client in firmware?",
    variations: [
      "MQTT client firmware",
      "MQTT publish subscribe",
      "MQTT code MCU",
      "Connect to broker",
    ],
    keywords: ["mqtt", "client", "firmware", "publish", "subscribe"],
    answer:
      "Firmware connects to a broker, subscribes to topics, publishes messages and handles keep-alive and reconnection.",
  },
  {
    id: "firmware-mqtt-qos",
    category: "firmware",
    question: "What is MQTT QoS?",
    variations: [
      "MQTT QoS firmware",
      "Quality of service MQTT",
      "Message delivery guarantee",
      "QoS levels MQTT",
    ],
    keywords: ["mqtt", "qos", "firmware", "quality", "service"],
    answer:
      "MQTT QoS levels define delivery guarantees: 0 (at most once), 1 (at least once) and 2 (exactly once). Higher levels add overhead.",
  },
  {
    id: "firmware-mqtt-retain",
    category: "firmware",
    question: "What is MQTT retain?",
    variations: [
      "MQTT retain firmware",
      "Retained message broker",
      "Last known value MQTT",
      "Retain flag MQTT",
    ],
    keywords: ["mqtt", "retain", "firmware", "message", "broker"],
    answer:
      "A retained message is stored by the broker and sent to new subscribers, providing the last known value.",
  },
  {
    id: "firmware-mqtt-will",
    category: "firmware",
    question: "What is MQTT last will?",
    variations: [
      "MQTT will firmware",
      "Last will testament",
      "Offline notification MQTT",
      "Will message broker",
    ],
    keywords: ["mqtt", "will", "firmware", "offline", "message"],
    answer:
      "The last will is a message the broker publishes if the client disconnects unexpectedly, useful for offline detection.",
  },
  {
    id: "firmware-mqtt-keepalive",
    category: "firmware",
    question: "What is MQTT keep-alive?",
    variations: [
      "MQTT keepalive firmware",
      "Ping broker MQTT",
      "Connection keep alive",
      "MQTT timeout",
    ],
    keywords: ["mqtt", "keepalive", "firmware", "connection", "ping"],
    answer:
      "Keep-alive is the interval at which the client sends a ping to the broker to maintain the connection.",
  },
  {
    id: "firmware-mqtt-topic",
    category: "firmware",
    question: "How do I design MQTT topics?",
    variations: [
      "MQTT topic design",
      "Topic structure MQTT",
      "Naming topics firmware",
      "MQTT hierarchy",
    ],
    keywords: ["mqtt", "topic", "firmware", "design", "structure"],
    answer:
      "Topics are hierarchical and should be designed for clarity, scalability and access control. Common patterns include device ID and data type.",
  },
  {
    id: "firmware-mqtt-security",
    category: "firmware",
    question: "How do I secure MQTT in firmware?",
    variations: [
      "MQTT security firmware",
      "Secure MQTT TLS",
      "MQTT authentication",
      "Protect MQTT device",
    ],
    keywords: ["mqtt", "security", "firmware", "tls", "authentication"],
    answer:
      "Use TLS, authentication and authorization. Avoid default credentials and protect keys.",
  },
  {
    id: "firmware-coap-client",
    category: "firmware",
    question: "How do I implement a CoAP client in firmware?",
    variations: [
      "CoAP client firmware",
      "CoAP code MCU",
      "Constrained protocol client",
      "CoAP request device",
    ],
    keywords: ["coap", "client", "firmware", "protocol", "constrained"],
    answer:
      "A CoAP client sends requests and handles responses over UDP. Firmware manages retransmission and block transfer.",
  },
  {
    id: "firmware-coap-server",
    category: "firmware",
    question: "Can firmware run a CoAP server?",
    variations: [
      "CoAP server firmware",
      "CoAP resource device",
      "CoAP endpoint MCU",
      "Constrained server",
    ],
    keywords: ["coap", "server", "firmware", "resource", "constrained"],
    answer:
      "Some microcontrollers can run a CoAP server, exposing resources for GET, POST, PUT and DELETE.",
  },
  {
    id: "firmware-lwm2m",
    category: "firmware",
    question: "What is LwM2M?",
    variations: [
      "LwM2M firmware",
      "Lightweight M2M",
      "Device management protocol",
      "IoT management MCU",
    ],
    keywords: ["lwm2m", "firmware", "iot", "management", "device"],
    answer:
      "LwM2M is a device management protocol for IoT, built on CoAP. It provides object models for sensors, configuration and firmware updates.",
  },
  {
    id: "firmware-thread",
    category: "firmware",
    question: "What is Thread?",
    variations: [
      "Thread firmware",
      "Thread protocol IoT",
      "Mesh networking MCU",
      "Thread device",
    ],
    keywords: ["thread", "firmware", "iot", "mesh", "protocol"],
    answer:
      "Thread is a low-power mesh networking protocol for IoT. It uses IPv6 and is designed for reliable, secure communication.",
  },
  {
    id: "firmware-matter",
    category: "firmware",
    question: "What is Matter?",
    variations: [
      "Matter firmware",
      "Matter protocol IoT",
      "Smart home standard",
      "Matter device",
    ],
    keywords: ["matter", "firmware", "iot", "smart", "home"],
    answer:
      "Matter is an interoperability standard for smart home devices. It runs over Thread, Wi-Fi or Ethernet and aims to simplify device integration.",
  },
  {
    id: "firmware-zigbee",
    category: "firmware",
    question: "What is Zigbee?",
    variations: [
      "Zigbee firmware",
      "Zigbee protocol MCU",
      "Mesh network Zigbee",
      "Zigbee device",
    ],
    keywords: ["zigbee", "firmware", "mesh", "protocol", "iot"],
    answer:
      "Zigbee is a low-power mesh networking protocol used in home and industrial automation. It operates on IEEE 802.15.4.",
  },
  {
    id: "firmware-zwave",
    category: "firmware",
    question: "What is Z-Wave?",
    variations: [
      "Z-Wave firmware",
      "Z-Wave protocol",
      "Home automation mesh",
      "Z-Wave device",
    ],
    keywords: ["z-wave", "firmware", "home", "automation", "mesh"],
    answer:
      "Z-Wave is a wireless mesh protocol for home automation. It operates in sub-GHz bands and is designed for low power.",
  },
  {
    id: "firmware-ble-mesh",
    category: "firmware",
    question: "What is Bluetooth mesh?",
    variations: [
      "BLE mesh firmware",
      "Bluetooth mesh networking",
      "Mesh over BLE",
      "Bluetooth mesh device",
    ],
    keywords: ["ble", "mesh", "firmware", "bluetooth", "network"],
    answer:
      "Bluetooth mesh extends BLE for many-to-many communication. It is used in lighting and building automation.",
  },
  {
    id: "firmware-ble-beacon",
    category: "firmware",
    question: "What is a BLE beacon?",
    variations: [
      "BLE beacon firmware",
      "iBeacon Eddystone",
      "Bluetooth beacon code",
      "Beacon advertising",
    ],
    keywords: ["ble", "beacon", "firmware", "advertising", "bluetooth"],
    answer:
      "A BLE beacon broadcasts advertising packets that can be detected by nearby devices for proximity or location.",
  },
  {
    id: "firmware-ibeacon",
    category: "firmware",
    question: "What is iBeacon?",
    variations: [
      "iBeacon firmware",
      "Apple beacon format",
      "iBeacon advertising",
      "Proximity beacon",
    ],
    keywords: ["ibeacon", "firmware", "beacon", "apple", "proximity"],
    answer:
      "iBeacon is a BLE beacon format from Apple. It transmits a UUID, major and minor values for identification.",
  },
  {
    id: "firmware-eddystone",
    category: "firmware",
    question: "What is Eddystone?",
    variations: [
      "Eddystone firmware",
      "Google beacon format",
      "Eddystone URL",
      "BLE beacon Eddystone",
    ],
    keywords: ["eddystone", "firmware", "beacon", "google", "ble"],
    answer:
      "Eddystone is a BLE beacon format from Google. It supports different frame types including URL and telemetry.",
  },
  {
    id: "firmware-beacon-adv",
    category: "firmware",
    question: "How do I configure beacon advertising?",
    variations: [
      "Beacon advertising firmware",
      "Set beacon interval",
      "Advertising data BLE",
      "Beacon TX power",
    ],
    keywords: ["beacon", "advertising", "firmware", "ble", "interval"],
    answer:
      "Beacon advertising is configured with interval, TX power and payload. The settings affect detection range and battery life.",
  },
  {
    id: "firmware-beacon-scan",
    category: "firmware",
    question: "How do I scan for BLE beacons in firmware?",
    variations: [
      "Beacon scan firmware",
      "Detect BLE beacon",
      "Read beacon data",
      "BLE scanner MCU",
    ],
    keywords: ["beacon", "scan", "firmware", "ble", "detect"],
    answer:
      "Firmware scans for advertising packets and parses beacon data such as UUID, major and minor values.",
  },
  {
    id: "firmware-ble-connection",
    category: "firmware",
    question: "How do I connect to a BLE device in firmware?",
    variations: [
      "BLE connect firmware",
      "Pair BLE device",
      "BLE central code",
      "Connect Bluetooth device",
    ],
    keywords: ["ble", "connect", "firmware", "central", "pair"],
    answer:
      "Firmware scans for the device, initiates a connection, discovers services and characteristics, and exchanges data.",
  },
  {
    id: "firmware-ble-peripheral",
    category: "firmware",
    question: "How do I make a BLE peripheral?",
    variations: [
      "BLE peripheral firmware",
      "BLE server device",
      "Advertise BLE service",
      "BLE GATT server",
    ],
    keywords: ["ble", "peripheral", "firmware", "server", "advertise"],
    answer:
      "A BLE peripheral advertises services and characteristics. Firmware handles connections and data exchange.",
  },
  {
    id: "firmware-ble-central",
    category: "firmware",
    question: "How do I make a BLE central?",
    variations: [
      "BLE central firmware",
      "BLE client device",
      "Scan connect BLE",
      "BLE master code",
    ],
    keywords: ["ble", "central", "firmware", "client", "scan"],
    answer:
      "A BLE central scans for peripherals, connects and interacts with their services and characteristics.",
  },
  {
    id: "firmware-ble-service",
    category: "firmware",
    question: "What is a BLE service?",
    variations: [
      "BLE service firmware",
      "GATT service UUID",
      "Bluetooth service definition",
      "BLE characteristic",
    ],
    keywords: ["ble", "service", "firmware", "gatt", "characteristic"],
    answer:
      "A BLE service groups related characteristics under a UUID. It defines a feature or function of the device.",
  },
  {
    id: "firmware-ble-characteristic",
    category: "firmware",
    question: "What is a BLE characteristic?",
    variations: [
      "BLE characteristic firmware",
      "GATT characteristic",
      "Read write notify",
      "Bluetooth data point",
    ],
    keywords: ["ble", "characteristic", "firmware", "gatt", "data"],
    answer:
      "A characteristic represents a data value within a service. It can support read, write, notify or indicate operations.",
  },
  {
    id: "firmware-ble-notify",
    category: "firmware",
    question: "What is BLE notify?",
    variations: [
      "BLE notify firmware",
      "Push data BLE",
      "Characteristic notification",
      "BLE indication",
    ],
    keywords: ["ble", "notify", "firmware", "push", "data"],
    answer:
      "Notify allows the peripheral to push data to the central without polling. Indicate is similar but requires acknowledgement.",
  },
  {
    id: "firmware-ble-mtu",
    category: "firmware",
    question: "What is BLE MTU?",
    variations: [
      "BLE MTU firmware",
      "Maximum transmission unit BLE",
      "BLE packet size",
      "Data length extension",
    ],
    keywords: ["ble", "mtu", "firmware", "packet", "size"],
    answer:
      "MTU is the maximum transmission unit for BLE data. Larger MTU improves throughput but must be negotiated.",
  },
  {
    id: "firmware-ble-throughput",
    category: "firmware",
    question: "How can I improve BLE throughput?",
    variations: [
      "BLE throughput firmware",
      "Faster BLE data",
      "BLE speed optimization",
      "Increase BLE rate",
    ],
    keywords: ["ble", "throughput", "firmware", "speed", "optimization"],
    answer:
      "Throughput can be improved with larger MTU, data length extension, higher connection interval and efficient data handling.",
  },
  {
    id: "firmware-ble-security",
    category: "firmware",
    question: "How do I secure BLE communication?",
    variations: [
      "BLE security firmware",
      "Pairing encryption BLE",
      "Secure Bluetooth connection",
      "BLE bonding",
    ],
    keywords: ["ble", "security", "firmware", "pairing", "encryption"],
    answer:
      "BLE security includes pairing, bonding, encryption and authentication. The required level depends on the application.",
  },
  {
    id: "firmware-ble-pairing",
    category: "firmware",
    question: "How does BLE pairing work?",
    variations: [
      "BLE pairing firmware",
      "Bluetooth pairing process",
      "Passkey BLE",
      "Pairing methods",
    ],
    keywords: ["ble", "pairing", "firmware", "bluetooth", "passkey"],
    answer:
      "Pairing establishes keys for encryption. Methods include Just Works, passkey and numeric comparison.",
  },
  {
    id: "firmware-ble-bonding",
    category: "firmware",
    question: "What is BLE bonding?",
    variations: [
      "BLE bonding firmware",
      "Save pairing keys",
      "Reconnect without pairing",
      "Bonded device",
    ],
    keywords: ["ble", "bonding", "firmware", "pairing", "keys"],
    answer:
      "Bonding stores pairing keys so devices can reconnect securely without repeating the full pairing process.",
  },
  {
    id: "firmware-ble-privacy",
    category: "firmware",
    question: "What is BLE privacy?",
    variations: [
      "BLE privacy firmware",
      "Random address BLE",
      "Resolvable private address",
      "Bluetooth privacy",
    ],
    keywords: ["ble", "privacy", "firmware", "address", "security"],
    answer:
      "BLE privacy uses random addresses to prevent tracking. Resolvable private addresses can be resolved by bonded devices.",
  },
  {
    id: "firmware-ble-whitelist",
    category: "firmware",
    question: "What is a BLE whitelist?",
    variations: [
      "BLE whitelist firmware",
      "Allowed devices BLE",
      "Filter BLE connections",
      "BLE address filter",
    ],
    keywords: ["ble", "whitelist", "firmware", "filter", "devices"],
    answer:
      "A whitelist restricts connections or scanning to specified devices, improving security and reducing unwanted traffic.",
  },
  {
    id: "firmware-ble-advertising",
    category: "firmware",
    question: "What data is in BLE advertising?",
    variations: [
      "BLE advertising firmware",
      "Advertising packet data",
      "BLE broadcast",
      "Advertising payload",
    ],
    keywords: ["ble", "advertising", "firmware", "data", "packet"],
    answer:
      "Advertising packets can contain device name, services, manufacturer data and other fields. The format is defined by the application.",
  },
  {
    id: "firmware-ble-scan-response",
    category: "firmware",
    question: "What is a BLE scan response?",
    variations: [
      "Scan response firmware",
      "Additional advertising data",
      "BLE scan response packet",
      "Advertising response",
    ],
    keywords: ["ble", "scan", "response", "firmware", "advertising"],
    answer:
      "A scan response provides additional data when a scanner requests it, allowing more information than fits in the advertising packet.",
  },
  {
    id: "firmware-ble-connection-interval",
    category: "firmware",
    question: "What is BLE connection interval?",
    variations: [
      "Connection interval BLE",
      "BLE timing firmware",
      "Connection parameters",
      "Latency power tradeoff",
    ],
    keywords: ["ble", "connection", "interval", "firmware", "power"],
    answer:
      "The connection interval determines how often the central and peripheral communicate. Shorter intervals increase throughput but also power consumption.",
  },
  {
    id: "firmware-ble-slave-latency",
    category: "firmware",
    question: "What is BLE slave latency?",
    variations: [
      "Slave latency BLE",
      "Skip connection events",
      "BLE power saving",
      "Peripheral latency",
    ],
    keywords: ["ble", "slave", "latency", "firmware", "power"],
    answer:
      "Slave latency allows the peripheral to skip connection events when it has no data, reducing power consumption.",
  },
  {
    id: "firmware-ble-supervision",
    category: "firmware",
    question: "What is BLE supervision timeout?",
    variations: [
      "Supervision timeout BLE",
      "Connection timeout Bluetooth",
      "BLE link loss",
      "Connection supervision",
    ],
    keywords: ["ble", "supervision", "timeout", "firmware", "connection"],
    answer:
      "The supervision timeout is the maximum time without communication before the connection is considered lost.",
  },
  {
    id: "firmware-ble-phy",
    category: "firmware",
    question: "What is BLE PHY?",
    variations: [
      "BLE PHY firmware",
      "Coded PHY BLE",
      "2M PHY Bluetooth",
      "Physical layer BLE",
    ],
    keywords: ["ble", "phy", "firmware", "layer", "physical"],
    answer:
      "BLE supports different physical layers, including 1M, 2M and coded PHY. The choice affects speed, range and power.",
  },
  {
    id: "firmware-ble-long-range",
    category: "firmware",
    question: "How do I get long range with BLE?",
    variations: [
      "BLE long range firmware",
      "Coded PHY range",
      "Extended range Bluetooth",
      "Long distance BLE",
    ],
    keywords: ["ble", "long", "range", "firmware", "coded"],
    answer:
      "Long range can be achieved with coded PHY, which trades data rate for sensitivity and range.",
  },
  {
    id: "firmware-ble-direction",
    category: "firmware",
    question: "What is BLE direction finding?",
    variations: [
      "BLE direction firmware",
      "Angle of arrival Bluetooth",
      "AoA AoD BLE",
      "Direction finding",
    ],
    keywords: ["ble", "direction", "firmware", "aoa", "aod"],
    answer:
      "BLE direction finding uses angle of arrival or angle of departure to estimate the direction of a signal.",
  },
  {
    id: "firmware-ble-location",
    category: "firmware",
    question: "Can BLE be used for location?",
    variations: [
      "BLE location firmware",
      "Indoor positioning Bluetooth",
      "Beacon location",
      "BLE tracking",
    ],
    keywords: ["ble", "location", "firmware", "positioning", "tracking"],
    answer:
      "BLE can be used for proximity and indoor positioning using beacons or direction finding.",
  },
  {
    id: "firmware-uwb",
    category: "firmware",
    question: "What is UWB?",
    variations: [
      "UWB firmware",
      "Ultra wideband positioning",
      "UWB ranging MCU",
      "Ultra wideband device",
    ],
    keywords: ["uwb", "firmware", "positioning", "ranging", "ultra"],
    answer:
      "UWB, or Ultra-Wideband, is a radio technology for precise ranging and positioning. It provides centimeter-level accuracy.",
  },
  {
    id: "firmware-rtls",
    category: "firmware",
    question: "What is RTLS?",
    variations: [
      "RTLS firmware",
      "Real time location system",
      "Asset tracking MCU",
      "Indoor positioning system",
    ],
    keywords: ["rtls", "firmware", "location", "tracking", "real"],
    answer:
      "RTLS, or Real-Time Location System, tracks the location of assets or people in real time using technologies like BLE, UWB or Wi-Fi.",
  },
  {
    id: "firmware-rssi-trilateration",
    category: "firmware",
    question: "How does RSSI trilateration work?",
    variations: [
      "RSSI trilateration firmware",
      "Distance from signal strength",
      "Position from RSSI",
      "Trilateration code",
    ],
    keywords: ["rssi", "trilateration", "firmware", "position", "distance"],
    answer:
      "RSSI trilateration estimates distance from signal strength at multiple receivers, then calculates position.",
  },
  {
    id: "firmware-fingerprinting",
    category: "firmware",
    question: "What is location fingerprinting?",
    variations: [
      "Fingerprinting firmware",
      "Location fingerprint",
      "WiFi positioning",
      "Signal map location",
    ],
    keywords: [
      "fingerprinting",
      "firmware",
      "location",
      "positioning",
      "signal",
    ],
    answer:
      "Location fingerprinting matches current signal characteristics to a pre-recorded map to estimate position.",
  },
  {
    id: "firmware-dead-reckoning-position",
    category: "firmware",
    question: "How do I combine dead reckoning with other positioning?",
    variations: [
      "Dead reckoning fusion",
      "Combine position sensors",
      "IMU and GPS fusion",
      "Position sensor fusion",
    ],
    keywords: ["dead", "reckoning", "firmware", "positioning", "fusion"],
    answer:
      "Dead reckoning can be combined with GPS, beacons or map data using sensor fusion to improve accuracy and availability.",
  },
  {
    id: "firmware-map-matching",
    category: "firmware",
    question: "What is map matching?",
    variations: [
      "Map matching firmware",
      "Snap to map",
      "Position correction map",
      "Road matching",
    ],
    keywords: ["map", "matching", "firmware", "position", "correction"],
    answer:
      "Map matching aligns estimated positions to a known map, improving accuracy for navigation.",
  },

  // ─────────────────────────────────────────────────────────────
  // HARDWARE ABSTRACTION / DRIVERS / ARCHITECTURE
  // ─────────────────────────────────────────────────────────────
  {
    id: "firmware-hal",
    category: "firmware",
    intent: "definition",
    question: "What is a hardware abstraction layer?",
    variations: [
      "What is a hardware abstraction layer",
      "HAL embedded",
      "What does HAL do",
      "HAL vs direct register",
      "Hardware abstraction firmware",
      "HAL definition",
    ],
    keywords: ["hal", "hardware", "abstraction", "layer", "firmware"],
    answer:
      "A Hardware Abstraction Layer provides a consistent interface to hardware peripherals, making code more portable and easier to maintain. It may add overhead compared to direct register access, so the trade-off depends on the project.",
    priority: 13,
  },

  {
    id: "firmware-driver",
    category: "firmware",
    intent: "definition",
    question: "What is a driver in firmware?",
    variations: [
      "What is a driver in firmware",
      "Driver embedded",
      "Hardware driver firmware",
      "What does a driver do",
      "Device driver microcontroller",
      "Driver definition",
    ],
    keywords: ["driver", "firmware", "hardware", "device", "interface"],
    answer:
      "A driver is software that controls a specific hardware peripheral or device, providing a consistent interface to the rest of the system. It handles initialization, configuration and data transfer.",
    priority: 13,
  },

  {
    id: "firmware-bsp",
    category: "firmware",
    intent: "definition",
    question: "What is a board support package?",
    variations: [
      "What is a board support package",
      "BSP embedded",
      "What is BSP",
      "Board support package firmware",
      "BSP vs HAL",
      "BSP definition",
    ],
    keywords: ["bsp", "board", "support", "package", "firmware"],
    answer:
      "A Board Support Package provides the low-level software needed to run an operating system or framework on a specific board, including drivers, initialization and configuration.",
    priority: 10,
  },

  {
    id: "firmware-middleware",
    category: "firmware",
    intent: "definition",
    question: "What is middleware in embedded systems?",
    variations: [
      "What is middleware in embedded systems",
      "Middleware firmware",
      "What is middleware embedded",
      "Middleware vs driver",
      "Embedded software layers",
      "Middleware definition",
    ],
    keywords: ["middleware", "embedded", "firmware", "layer", "software"],
    answer:
      "Middleware provides services and abstractions between the application and lower-level drivers or the operating system. Examples include communication stacks, file systems and graphics libraries.",
    priority: 9,
  },

  {
    id: "firmware-application",
    category: "firmware",
    intent: "definition",
    question: "What is application code in firmware?",
    variations: [
      "What is application code in firmware",
      "Application layer firmware",
      "What is application code",
      "Firmware application logic",
      "Top level embedded code",
      "Application code definition",
    ],
    keywords: ["application", "code", "firmware", "logic", "layer"],
    answer:
      "Application code implements the specific behavior of the product, using services from lower layers. It coordinates sensors, outputs, communication and control logic according to the requirements.",
    priority: 10,
  },

  {
    id: "firmware-architecture",
    category: "firmware",
    intent: "procedure",
    question: "How should firmware be architected?",
    variations: [
      "How should firmware be architected",
      "Firmware architecture",
      "How to structure embedded code",
      "Layered firmware design",
      "Modular firmware",
      "Firmware architecture",
    ],
    keywords: ["architecture", "firmware", "structure", "modular", "design"],
    answer:
      "Firmware architecture depends on complexity and requirements. Common approaches include simple main loops, state machines, event-driven designs, RTOS-based tasks and layered architectures. Clear interfaces, modularity and testability are generally desirable.",
    priority: 15,
  },

  {
    id: "firmware-event-driven",
    category: "firmware",
    intent: "definition",
    question: "What is event-driven firmware?",
    variations: [
      "What is event-driven firmware",
      "Event driven embedded",
      "How to use events in firmware",
      "Event loop microcontroller",
      "Event vs polling firmware",
      "Event-driven firmware",
    ],
    keywords: ["event", "driven", "firmware", "loop", "polling"],
    answer:
      "Event-driven firmware reacts to events such as interrupts, messages or timer expirations rather than continuously polling. It can improve responsiveness and power efficiency in many applications.",
    priority: 13,
  },

  {
    id: "firmware-polling",
    category: "firmware",
    intent: "definition",
    question: "What is polling in firmware?",
    variations: [
      "What is polling in firmware",
      "Polling vs interrupt",
      "What is polling code",
      "When to use polling",
      "Polling loop embedded",
      "Polling definition",
    ],
    keywords: ["polling", "firmware", "loop", "interrupt", "check"],
    answer:
      "Polling repeatedly checks a condition or input in software. It is simple and predictable but can waste processing time or miss fast events. Interrupts are often preferred for time-critical or low-power applications.",
    priority: 10,
  },

  {
    id: "firmware-cooperative",
    category: "firmware",
    intent: "definition",
    question: "What is cooperative multitasking?",
    variations: [
      "What is cooperative multitasking",
      "Cooperative scheduler firmware",
      "Non preemptive tasks",
      "Cooperative vs preemptive",
      "Simple task scheduler",
      "Cooperative multitasking",
    ],
    keywords: ["cooperative", "multitasking", "scheduler", "firmware", "task"],
    answer:
      "Cooperative multitasking runs tasks that voluntarily yield control. It avoids some concurrency issues and can be simpler than preemptive scheduling, but a poorly behaved task can block others.",
    priority: 9,
  },

  {
    id: "firmware-preemptive",
    category: "firmware",
    intent: "definition",
    question: "What is preemptive multitasking?",
    variations: [
      "What is preemptive multitasking",
      "Preemptive RTOS",
      "Preemptive scheduler",
      "Preemptive vs cooperative",
      "Task preemption firmware",
      "Preemptive multitasking",
    ],
    keywords: ["preemptive", "multitasking", "rtos", "scheduler", "firmware"],
    answer:
      "Preemptive multitasking allows the scheduler to interrupt running tasks to switch to higher-priority ones. It provides better responsiveness for complex systems but requires careful synchronization and resource management.",
    priority: 10,
  },

  {
    id: "firmware-atomic",
    category: "firmware",
    intent: "definition",
    question: "What is an atomic operation in firmware?",
    variations: [
      "What is an atomic operation in firmware",
      "Atomic access embedded",
      "Why disable interrupts",
      "Critical section firmware",
      "Atomic variable",
      "Atomic operation",
    ],
    keywords: ["atomic", "critical", "section", "interrupt", "firmware"],
    answer:
      "An atomic operation cannot be interrupted partway through. In embedded systems, atomic access to shared variables may require disabling interrupts briefly, using atomic instructions or using appropriate synchronization primitives.",
    priority: 10,
  },

  {
    id: "firmware-volatile-register",
    category: "firmware",
    intent: "procedure",
    question: "Why use volatile for hardware registers?",
    variations: [
      "Why use volatile for hardware registers",
      "Volatile hardware register",
      "Register access volatile",
      "Why volatile GPIO",
      "Memory mapped volatile",
      "Volatile for hardware registers",
    ],
    keywords: ["volatile", "hardware", "register", "firmware", "gpio"],
    answer:
      "Hardware registers can change outside program control, so volatile prevents the compiler from optimizing away or reordering accesses. It does not provide atomicity or memory barriers by itself.",
    priority: 10,
  },

  {
    id: "firmware-memory-barrier",
    category: "firmware",
    intent: "definition",
    question: "What is a memory barrier?",
    variations: [
      "What is a memory barrier",
      "Memory barrier firmware",
      "Compiler barrier embedded",
      "Ordering memory access",
      "Fence instruction",
      "Memory barrier definition",
    ],
    keywords: ["memory", "barrier", "firmware", "ordering", "compiler"],
    answer:
      "A memory barrier prevents the compiler or processor from reordering memory accesses across the barrier. It is important in concurrent and hardware access code.",
    priority: 9,
  },

  {
    id: "firmware-volatile-adv",
    category: "firmware",
    intent: "procedure",
    question: "Does volatile make a variable atomic?",
    variations: [
      "Does volatile make a variable atomic",
      "Volatile vs atomic",
      "Is volatile thread safe",
      "Volatile and interrupts",
      "Volatile limitations",
      "Volatile vs atomic variables",
    ],
    keywords: ["volatile", "atomic", "firmware", "thread", "interrupt"],
    answer:
      "No. volatile prevents certain compiler optimizations but does not guarantee atomic access or synchronization. For concurrent access, use atomic operations or proper synchronization mechanisms.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // BUILD / TEST / CI / DEPLOYMENT
  // ─────────────────────────────────────────────────────────────
  {
    id: "firmware-ci-hardware",
    category: "firmware",
    intent: "procedure",
    question: "How can hardware be tested in CI?",
    variations: [
      "How can hardware be tested in CI",
      "Hardware in CI",
      "Automated hardware testing",
      "CI test rig firmware",
      "Continuous integration hardware",
      "Hardware testing in CI",
    ],
    keywords: ["hardware", "ci", "firmware", "testing", "automation"],
    answer:
      "Hardware-in-the-loop test rigs can run automated tests on real devices as part of CI. This requires infrastructure, but can catch hardware-related issues that host tests miss.",
    priority: 10,
  },

  {
    id: "firmware-regression",
    category: "firmware",
    intent: "procedure",
    question: "What is regression testing in firmware?",
    variations: [
      "What is regression testing in firmware",
      "Regression testing firmware",
      "Ensure old bugs stay fixed",
      "Retest after changes",
      "Automated regression embedded",
      "Regression testing",
    ],
    keywords: ["regression", "testing", "firmware", "changes", "bugs"],
    answer:
      "Regression testing re-runs tests after changes to ensure existing functionality still works. It helps prevent new changes from breaking previously working behavior.",
    priority: 10,
  },

  {
    id: "firmware-acceptance",
    category: "firmware",
    intent: "procedure",
    question: "What is acceptance testing for firmware?",
    variations: [
      "What is acceptance testing for firmware",
      "Acceptance testing firmware",
      "Verify requirements embedded",
      "Final testing firmware",
      "Customer acceptance test",
      "Acceptance testing",
    ],
    keywords: ["acceptance", "testing", "firmware", "requirements", "verify"],
    answer:
      "Acceptance testing verifies that the firmware meets the agreed requirements and is ready for release. It is often based on the original specification and may include user scenarios.",
    priority: 10,
  },

  {
    id: "firmware-mutation",
    category: "firmware",
    intent: "procedure",
    question: "What is mutation testing?",
    variations: [
      "What is mutation testing",
      "Mutation testing firmware",
      "Test quality embedded",
      "Mutate code tests",
      "How good are my tests",
      "Mutation testing",
    ],
    keywords: ["mutation", "testing", "firmware", "quality", "test"],
    answer:
      "Mutation testing introduces small changes to code and checks whether tests fail. If tests do not catch the mutation, they may be insufficient. It assesses test effectiveness.",
    priority: 9,
  },

  {
    id: "firmware-reproducible-adv",
    category: "firmware",
    intent: "procedure",
    question: "Why reproducible builds matter for firmware",
    variations: [
      "Why reproducible builds matter for firmware",
      "Reproducible builds firmware",
      "Same binary from source",
      "Deterministic firmware build",
      "Verify firmware build",
      "Reproducible builds",
    ],
    keywords: ["reproducible", "build", "firmware", "source", "deterministic"],
    answer:
      "Reproducible builds let you verify that a released firmware image matches the reviewed source, which supports security, auditing and supply chain integrity.",
    priority: 10,
  },

  {
    id: "firmware-ota-best-practices",
    category: "firmware",
    intent: "procedure",
    question: "What are OTA update best practices?",
    variations: [
      "What are OTA update best practices",
      "OTA best practices",
      "Safe OTA design",
      "Firmware update best practices",
      "OTA guidelines",
      "OTA best practices",
    ],
    keywords: ["ota", "best", "practices", "firmware", "update"],
    answer:
      "Use signed images, verify integrity before running, support rollback, avoid blocking critical functions, handle power loss safely, and provide a clear user experience. Test the update process itself, not just the firmware.",
    priority: 13,
  },

  {
    id: "firmware-signing-best-practices",
    category: "firmware",
    intent: "procedure",
    question: "What are best practices for firmware signing?",
    variations: [
      "What are best practices for firmware signing",
      "Firmware signing best practices",
      "Secure firmware release",
      "Signing key management",
      "Firmware image signing",
      "Firmware signing best practices",
    ],
    keywords: ["signing", "firmware", "best", "practices", "security"],
    answer:
      "Protect private signing keys, verify images before release, use strong algorithms, keep the trust anchor in protected storage, and plan for key rotation and revocation.",
    priority: 10,
  },

  {
    id: "firmware-source-control",
    category: "firmware",
    intent: "procedure",
    question: "What source control should firmware use?",
    variations: [
      "What source control should firmware use",
      "Source control firmware",
      "Git embedded",
      "Version control firmware",
      "Manage firmware source",
      "Source control for firmware",
    ],
    keywords: ["source", "control", "firmware", "git", "version"],
    answer:
      "Git is widely used for firmware source control. Repositories should include source, build scripts and documentation, with clear branching and release practices.",
    priority: 10,
  },

  {
    id: "firmware-branching",
    category: "firmware",
    intent: "procedure",
    question: "What branching strategy should firmware use?",
    variations: [
      "What branching strategy should firmware use",
      "Branching strategy firmware",
      "Git flow embedded",
      "Release branches firmware",
      "Development branches",
      "Firmware branching strategy",
    ],
    keywords: ["branching", "strategy", "firmware", "release", "git"],
    answer:
      "The strategy depends on the team and release cadence. Common approaches include mainline development, release branches and feature branches.",
    priority: 9,
  },

  {
    id: "firmware-tagging",
    category: "firmware",
    intent: "procedure",
    question: "Why tag firmware releases?",
    variations: [
      "Why tag firmware releases",
      "Tag firmware release",
      "Git tag embedded",
      "Mark release version",
      "Firmware release tag",
      "Tagging firmware releases",
    ],
    keywords: ["tagging", "firmware", "release", "git", "version"],
    answer:
      "Tags mark specific commits as releases, making it easy to identify and reproduce released firmware.",
    priority: 9,
  },

  {
    id: "firmware-code-ownership",
    category: "firmware",
    intent: "procedure",
    question: "What is code ownership in firmware projects?",
    variations: [
      "What is code ownership in firmware projects",
      "Code ownership firmware",
      "Who maintains code",
      "Module ownership embedded",
      "Responsible developer",
      "Code ownership",
    ],
    keywords: ["code", "ownership", "firmware", "maintain", "module"],
    answer:
      "Code ownership assigns responsibility for modules or areas. It improves maintenance and review quality.",
    priority: 9,
  },

  {
    id: "firmware-code-review-process",
    category: "firmware",
    intent: "procedure",
    question: "What is a good code review process for firmware?",
    variations: [
      "What is a good code review process for firmware",
      "Code review process firmware",
      "How to review embedded code",
      "Peer review firmware",
      "Review workflow embedded",
      "Firmware code review process",
    ],
    keywords: ["code", "review", "process", "firmware", "peer"],
    answer:
      "A good process includes clear criteria, timely reviews, constructive feedback and follow-up. Reviews should cover correctness, safety, maintainability and standards.",
    priority: 10,
  },

  {
    id: "firmware-continuous-delivery",
    category: "firmware",
    intent: "compatibility",
    question: "Can firmware use continuous delivery?",
    variations: [
      "Can firmware use continuous delivery",
      "Continuous delivery firmware",
      "CD embedded",
      "Automated firmware release",
      "Deploy firmware pipeline",
      "Continuous delivery in firmware",
    ],
    keywords: ["continuous", "delivery", "firmware", "release", "automation"],
    answer:
      "Continuous delivery can automate building, testing and preparing firmware releases. Actual deployment may require additional hardware testing and approval.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SECURITY / PRIVACY / COMPLIANCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "firmware-secure-defaults-adv",
    category: "firmware",
    intent: "procedure",
    question: "What is secure boot chain of trust?",
    variations: [
      "What is secure boot chain of trust",
      "Chain of trust firmware",
      "Verified boot stages",
      "Chain of trust boot",
      "Secure boot chain",
      "Chain of trust in firmware",
    ],
    keywords: ["chain", "trust", "firmware", "secure", "boot"],
    answer:
      "A chain of trust verifies each stage of the boot process before executing it, starting from the root of trust. Each stage verifies the next, ensuring only trusted code runs.",
    priority: 10,
  },

  {
    id: "firmware-security-lifecycle",
    category: "firmware",
    intent: "procedure",
    question: "How does security change over the firmware lifecycle?",
    variations: [
      "How does security change over the firmware lifecycle",
      "Firmware lifecycle security",
      "Security during development production",
      "End to end firmware security",
      "Security stages firmware",
      "Firmware lifecycle security",
    ],
    keywords: [
      "lifecycle",
      "security",
      "firmware",
      "development",
      "production",
    ],
    answer:
      "Security requirements change from development (protecting source and keys) to production (provisioning and locking) to operation (updates and monitoring) to retirement (decommissioning). Each stage needs appropriate controls.",
    priority: 10,
  },

  {
    id: "firmware-credential-storage-adv",
    category: "firmware",
    intent: "procedure",
    question: "How do I secure credentials in firmware?",
    variations: [
      "How do I secure credentials in firmware",
      "Secure credentials firmware",
      "Credential storage embedded",
      "Avoid hardcoded credentials",
      "Credential management MCU",
      "Securing credentials in firmware",
    ],
    keywords: ["credentials", "firmware", "security", "storage", "management"],
    answer:
      "Avoid hard-coding credentials, use secure storage where available, rotate credentials periodically and revoke compromised ones. Each device should ideally have unique credentials.",
    priority: 10,
  },

  {
    id: "firmware-compliance",
    category: "firmware",
    intent: "procedure",
    question: "What compliance requirements apply to firmware?",
    variations: [
      "What compliance requirements apply to firmware",
      "Firmware compliance",
      "Regulatory requirements firmware",
      "Compliance standards embedded",
      "Firmware certifications",
      "Firmware compliance requirements",
    ],
    keywords: [
      "compliance",
      "firmware",
      "requirements",
      "standards",
      "regulation",
    ],
    answer:
      "Compliance depends on the market and product type. Requirements can include security, privacy, radio, EMC, medical, automotive or industrial standards. These should be identified during planning.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // BEST PRACTICES / MISC
  // ─────────────────────────────────────────────────────────────
  {
    id: "firmware-best-practices",
    category: "firmware",
    intent: "procedure",
    question: "What are best practices for firmware development?",
    variations: [
      "What are best practices for firmware development",
      "Firmware best practices",
      "Good embedded design",
      "Firmware development guidelines",
      "How to develop firmware properly",
      "Firmware best practices",
    ],
    keywords: ["best", "practices", "firmware", "development", "embedded"],
    answer:
      "Use version control, clear requirements, modular design, testing, static analysis, code review, secure defaults, documented interfaces and a defined update strategy. Choose tools and standards appropriate to the project.",
    priority: 13,
  },

  {
    id: "firmware-embedded-linux",
    category: "firmware",
    intent: "comparison",
    question: "When should I use embedded Linux instead of a microcontroller?",
    variations: [
      "When should I use embedded Linux instead of a microcontroller",
      "Embedded Linux vs microcontroller",
      "Linux on embedded",
      "When to use Raspberry Pi",
      "Microcontroller vs Linux board",
      "Embedded Linux vs microcontroller",
    ],
    keywords: ["embedded", "linux", "microcontroller", "raspberry", "firmware"],
    answer:
      "Embedded Linux is suitable when the application needs a full operating system, networking, file system, user interface or more processing power. Microcontrollers are often better for deterministic timing, low power and simple dedicated tasks.",
    priority: 13,
  },

  {
    id: "firmware-rtos-vs-linux",
    category: "firmware",
    intent: "comparison",
    question: "What is the difference between an RTOS and embedded Linux?",
    variations: [
      "What is the difference between an RTOS and embedded Linux",
      "RTOS vs Linux",
      "Embedded Linux vs RTOS",
      "Which is better RTOS or Linux",
      "Real time Linux vs RTOS",
      "RTOS vs embedded Linux",
    ],
    keywords: ["rtos", "linux", "embedded", "real", "time"],
    answer:
      "An RTOS is designed for deterministic timing and small footprints. Embedded Linux provides a full operating system and richer features but typically has higher resource requirements and less deterministic timing unless real-time patches are used.",
    priority: 13,
  },

  {
    id: "firmware-arm-toolchain",
    category: "firmware",
    intent: "procedure",
    question: "How do I set up an ARM toolchain for firmware?",
    variations: [
      "How do I set up an ARM toolchain for firmware",
      "ARM toolchain setup",
      "Install arm-none-eabi-gcc",
      "Embedded toolchain setup",
      "Cross-compiler setup",
      "ARM firmware toolchain",
    ],
    keywords: ["arm", "toolchain", "firmware", "gcc", "cross"],
    answer:
      "Install a cross toolchain such as arm-none-eabi-gcc or use an IDE/framework that provides one. Verify the toolchain produces output for the target device and integrates with the build system.",
    priority: 10,
  },

  {
    id: "firmware-comparison-arduino-vs-bare-metal",
    category: "firmware",
    intent: "comparison",
    question:
      "What is the difference between Arduino framework and bare-metal?",
    variations: [
      "What is the difference between Arduino framework and bare-metal",
      "Arduino vs bare metal",
      "Arduino framework vs bare metal",
      "Should I use Arduino or bare metal",
      "Arduino overhead",
      "Arduino vs bare-metal",
    ],
    keywords: ["arduino", "bare", "metal", "firmware", "comparison"],
    answer:
      "Arduino framework provides libraries and a simplified programming model, which speeds development but adds overhead. Bare-metal programming runs directly on the microcontroller and can be smaller and more predictable, but requires more low-level work.",
    priority: 13,
  },

  {
    id: "firmware-purpose-recap",
    category: "firmware",
    intent: "purpose",
    question: "What is the purpose of firmware?",
    variations: [
      "What is the purpose of firmware",
      "Why is firmware important",
      "What does firmware provide",
      "Role of firmware in embedded",
      "Firmware role",
      "Purpose of firmware",
    ],
    keywords: ["purpose", "firmware", "important", "embedded", "role"],
    answer:
      "Firmware brings embedded hardware to life by providing the logic, timing, communication, control and safety behavior needed for the device to function as intended.",
    priority: 10,
  },
] as const;
