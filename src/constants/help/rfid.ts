import type { HelpEntry } from "./types";

export const RFID_HELP: HelpEntry[] = [
  {
    id: "rfid-definition",
    category: "rfid",
    question: "What is RFID?",
    variations: ["What does RFID mean?", "Explain RFID", "How does RFID work?"],
    keywords: ["RFID", "radio frequency", "identification", "tag", "reader"],
    answer:
      "RFID stands for Radio Frequency Identification. An RFID system generally uses a reader and a compatible tag. The reader communicates with the tag wirelessly to identify or exchange information according to the technology and tag type being used.",
  },
  {
    id: "rfid-reader",
    category: "rfid",
    question: "What is an RFID reader?",
    variations: ["What does an RFID reader do?", "What is the RFID module?"],
    keywords: ["RFID reader", "RFID module", "reader"],
    answer:
      "An RFID reader is the electronic device that communicates with compatible RFID tags. In embedded projects, the reader can be connected to a microcontroller using an appropriate interface such as SPI, I2C, or UART depending on the module.",
  },
  {
    id: "rfid-tag",
    category: "rfid",
    question: "What is an RFID tag?",
    variations: [
      "What is an RFID card?",
      "What is an RFID keychain?",
      "How does an RFID tag work?",
    ],
    keywords: ["RFID tag", "RFID card", "keychain", "tag"],
    answer:
      "An RFID tag is a small identification device that can be read by a compatible RFID reader. Tags may be available in card, key fob, sticker, or other physical forms depending on the RFID technology.",
  },
  {
    id: "rfid-door-lock",
    category: "rfid",
    question: "Can RFID be used for a door lock?",
    variations: [
      "How does an RFID door lock work?",
      "Can I unlock a door with an RFID card?",
      "RFID access control",
    ],
    keywords: [
      "RFID door lock",
      "access control",
      "lock",
      "RFID card",
      "servo",
      "relay",
    ],
    answer:
      "Yes. A typical RFID access-control prototype uses an RFID reader, a microcontroller, and an actuator such as a servo, relay, or electronic lock. The firmware checks the presented identifier against the configured access rules and then controls the lock mechanism.",
  },
  {
    id: "rfid-attendance",
    category: "rfid",
    question: "Can RFID be used for attendance?",
    variations: [
      "Can RFID make an attendance system?",
      "RFID student attendance",
      "RFID attendance project",
    ],
    keywords: ["RFID attendance", "attendance", "student", "logging"],
    answer:
      "Yes. An RFID attendance system can identify compatible cards or tags and record the associated event. Storage can be local or connected to a suitable software/database system depending on the project requirements.",
  },
  {
    id: "rfid-nfc",
    category: "rfid",
    question: "What is the difference between RFID and NFC?",
    variations: ["RFID vs NFC", "Is NFC the same as RFID?"],
    keywords: ["RFID", "NFC", "communication", "tag"],
    answer:
      "NFC is a short-range wireless technology based on high-frequency RFID concepts and is designed for close-proximity communication. RFID is a broader family of identification technologies with different frequencies, ranges, and system designs.",
  },
];
