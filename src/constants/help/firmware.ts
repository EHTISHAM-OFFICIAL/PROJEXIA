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
    question: "Can MECTEC program Arduino boards?",
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
    question: "Can MECTEC program ESP32 boards?",
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
      "Can MECTEC fix embedded software?",
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
];
