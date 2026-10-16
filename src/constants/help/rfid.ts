import type { HelpEntry } from "./types";

export const RFID_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // FOUNDATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-definition",
    category: "rfid",
    intent: "definition",
    question: "What is RFID?",
    variations: [
      "What is RFID",
      "What does RFID mean",
      "Explain RFID",
      "What is radio frequency identification",
      "RFID definition",
      "RFID meaning",
    ],
    keywords: ["RFID", "radio frequency", "identification", "tag", "reader"],
    answer:
      "RFID stands for Radio Frequency Identification. An RFID system generally uses a reader and a compatible tag. The reader communicates with the tag wirelessly to identify or exchange information according to the technology and tag type being used.",
    priority: 14,
  },

  {
    id: "rfid-purpose",
    category: "rfid",
    intent: "purpose",
    question: "What is RFID used for?",
    variations: [
      "What is RFID used for",
      "What can RFID do",
      "What is it used for",
      "Where is RFID used",
      "What are the uses of RFID",
      "What is the purpose of RFID",
      "Why use RFID",
      "RFID applications",
    ],
    keywords: [
      "rfid",
      "used",
      "purpose",
      "application",
      "access",
      "tracking",
      "attendance",
      "inventory",
      "identification",
    ],
    answer:
      "RFID is commonly used for identification and tracking without direct contact. Typical applications include access control, attendance systems, inventory and asset tracking, logistics, library systems, toll and parking, animal identification, and authentication. The correct RFID technology depends on the required range, environment and security level.",
    priority: 14,
  },

  {
    id: "rfid-how-it-works",
    category: "rfid",
    intent: "definition",
    question: "How does RFID work?",
    variations: [
      "How does RFID work",
      "How does an RFID system work",
      "Explain how RFID works",
      "How does RFID reader read a tag",
      "RFID working principle",
      "RFID working",
    ],
    keywords: ["rfid", "how", "works", "reader", "tag", "wireless"],
    answer:
      "An RFID reader transmits a radio signal through its antenna. A compatible tag receives energy or signals, and responds with its identifier or stored data. The reader interprets the response and passes it to a controller or system.",
    priority: 14,
  },

  {
    id: "rfid-vs-nfc",
    category: "rfid",
    intent: "comparison",
    question: "What is the difference between RFID and NFC?",
    variations: [
      "What is the difference between RFID and NFC",
      "RFID vs NFC",
      "Is NFC the same as RFID",
      "NFC and RFID difference",
      "Difference between RFID and NFC",
      "RFID vs NFC comparison",
    ],
    keywords: ["RFID", "NFC", "communication", "tag", "difference"],
    answer:
      "NFC is a short-range wireless technology based on high-frequency RFID concepts and is designed for close-proximity communication. RFID is a broader family of identification technologies with different frequencies, ranges, and system designs.",
    priority: 14,
  },

  {
    id: "rfid-system-components",
    category: "rfid",
    intent: "requirements",
    question: "What components make up an RFID system?",
    variations: [
      "What components make up an RFID system",
      "RFID system components",
      "Parts of RFID system",
      "RFID reader tag antenna",
      "RFID system parts",
      "RFID components",
    ],
    keywords: ["rfid", "system", "components", "reader", "tag", "antenna"],
    answer:
      "An RFID system typically includes a reader, one or more tags, antennas, and a controller or host system. The exact components depend on the frequency, range, and application.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // FREQUENCIES / TAG TYPES
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-frequency",
    category: "rfid",
    intent: "comparison",
    question: "What RFID frequencies are used?",
    variations: [
      "What RFID frequencies are used",
      "RFID frequency bands",
      "LF HF UHF RFID",
      "Which RFID frequency",
      "RFID frequency range",
      "RFID frequency comparison",
    ],
    keywords: ["rfid", "frequency", "lf", "hf", "uhf"],
    answer:
      "Common RFID frequency bands are low frequency (LF, around 125 kHz), high frequency (HF, 13.56 MHz) and ultra-high frequency (UHF, 860–960 MHz). Each has different range, data rate, cost and environmental characteristics.",
    priority: 14,
  },

  {
    id: "rfid-lf",
    category: "rfid",
    intent: "definition",
    question: "What is LF RFID?",
    variations: [
      "What is LF RFID",
      "Low frequency RFID",
      "125kHz RFID",
      "LF RFID uses",
      "LF vs HF RFID",
      "LF RFID definition",
    ],
    keywords: ["rfid", "lf", "low", "frequency", "125khz"],
    answer:
      "LF RFID operates around 125 kHz and is used for access control, animal tags and industrial applications. It has short range but good penetration through water and metal.",
    priority: 13,
  },

  {
    id: "rfid-hf",
    category: "rfid",
    intent: "definition",
    question: "What is HF RFID?",
    variations: [
      "What is HF RFID",
      "High frequency RFID",
      "13.56MHz RFID",
      "HF RFID uses",
      "HF vs UHF RFID",
      "HF RFID definition",
    ],
    keywords: ["rfid", "hf", "high", "frequency", "13.56"],
    answer:
      "HF RFID operates at 13.56 MHz and is used for access control, payment, library and NFC applications. It offers moderate range and good data rates.",
    priority: 13,
  },

  {
    id: "rfid-uhf",
    category: "rfid",
    intent: "definition",
    question: "What is UHF RFID?",
    variations: [
      "What is UHF RFID",
      "Ultra high frequency RFID",
      "UHF RFID uses",
      "860-960MHz RFID",
      "UHF vs HF RFID",
      "UHF RFID definition",
    ],
    keywords: ["rfid", "uhf", "ultra", "high", "frequency"],
    answer:
      "UHF RFID operates in the 860–960 MHz range and is used for supply chain, inventory and long-range applications. It offers longer read range but is more affected by water and metal.",
    priority: 13,
  },

  {
    id: "rfid-frequency-selection",
    category: "rfid",
    intent: "procedure",
    question: "How do I choose an RFID frequency?",
    variations: [
      "How do I choose an RFID frequency",
      "Which RFID frequency to use",
      "RFID frequency selection",
      "LF HF UHF which",
      "Choose RFID frequency",
      "RFID frequency guide",
    ],
    keywords: ["rfid", "frequency", "choose", "selection", "lf", "hf", "uhf"],
    answer:
      "Choose based on required range, environment, tag size, data rate, security and cost. LF works near metal and water, HF balances range and features, and UHF is used for longer-range inventory.",
    priority: 13,
  },

  {
    id: "rfid-passive",
    category: "rfid",
    intent: "definition",
    question: "What is a passive RFID tag?",
    variations: [
      "What is a passive RFID tag",
      "Passive RFID",
      "How does passive tag work",
      "Passive vs active RFID",
      "Passive tag powered",
      "Passive RFID definition",
    ],
    keywords: ["rfid", "passive", "tag", "power", "reader"],
    answer:
      "A passive RFID tag has no internal power source. It draws energy from the reader's signal to power its chip and respond. Passive tags are small, cheap and long-lasting.",
    priority: 13,
  },

  {
    id: "rfid-active",
    category: "rfid",
    intent: "definition",
    question: "What is an active RFID tag?",
    variations: [
      "What is an active RFID tag",
      "Active RFID",
      "How does active tag work",
      "Active vs passive RFID",
      "Battery powered RFID",
      "Active RFID definition",
    ],
    keywords: ["rfid", "active", "tag", "battery", "power"],
    answer:
      "An active RFID tag has its own power source, giving it longer range and more capability than a passive tag but at higher cost and size. It is used for asset tracking and real-time location.",
    priority: 13,
  },

  {
    id: "rfid-semi-passive",
    category: "rfid",
    intent: "definition",
    question: "What is a semi-passive RFID tag?",
    variations: [
      "What is a semi-passive RFID tag",
      "Semi passive RFID",
      "Battery assisted passive",
      "BAP RFID tag",
      "Semi active RFID",
      "Semi-passive RFID definition",
    ],
    keywords: ["rfid", "semi", "passive", "battery", "tag"],
    answer:
      "A semi-passive RFID tag uses a battery to power its internal circuitry but relies on the reader's signal for communication. It offers better range than passive tags without being fully active.",
    priority: 13,
  },

  {
    id: "rfid-read-only",
    category: "rfid",
    intent: "definition",
    question: "What is a read-only RFID tag?",
    variations: [
      "What is a read-only RFID tag",
      "Read only RFID",
      "RO tag RFID",
      "Can read only tag be written",
      "EM4100 read only",
      "Read-only RFID definition",
    ],
    keywords: ["rfid", "read", "only", "tag", "fixed"],
    answer:
      "A read-only RFID tag contains a fixed identifier that cannot be changed. It is simple, cheap and used for identification where only the ID is needed.",
    priority: 13,
  },

  {
    id: "rfid-read-write",
    category: "rfid",
    intent: "definition",
    question: "What is a read/write RFID tag?",
    variations: [
      "What is a read/write RFID tag",
      "Read write RFID",
      "RW tag RFID",
      "MIFARE read write",
      "Write data to card",
      "Read/write RFID definition",
    ],
    keywords: ["rfid", "read", "write", "tag", "data"],
    answer:
      "A read/write RFID tag allows data to be stored and updated. It is used for applications where information must be written or changed over time.",
    priority: 13,
  },

  {
    id: "rfid-tag-write",
    category: "rfid",
    intent: "compatibility",
    question: "Can I write data to an RFID tag?",
    variations: [
      "Can I write data to an RFID tag",
      "Write RFID tag",
      "How to write RFID",
      "Read write RFID",
      "Program RFID tag",
      "Writing RFID tags",
    ],
    keywords: ["rfid", "write", "tag", "data", "program"],
    answer:
      "Yes, many RFID tags support writing. Read/write tags allow data to be stored and updated, while read-only tags only provide a fixed identifier.",
    priority: 13,
  },

  {
    id: "rfid-unique-id",
    category: "rfid",
    intent: "definition",
    question: "What is a RFID unique ID?",
    variations: [
      "What is a RFID unique ID",
      "RFID UID",
      "Unique identifier tag",
      "RFID serial number",
      "How to read UID",
      "RFID UID definition",
    ],
    keywords: ["rfid", "uid", "unique", "id", "identifier"],
    answer:
      "Each RFID tag has a unique identifier (UID) that distinguishes it from other tags. UID length depends on the tag technology and can be used for identification.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // TAG FORMATS / TECHNOLOGIES
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-mifare",
    category: "rfid",
    intent: "definition",
    question: "What is MIFARE?",
    variations: [
      "What is MIFARE",
      "MIFARE card",
      "MIFARE classic",
      "MIFARE types",
      "MIFARE vs EM4100",
      "MIFARE definition",
    ],
    keywords: ["rfid", "mifare", "card", "13.56", "nfc"],
    answer:
      "MIFARE is a family of 13.56 MHz smart card technologies from NXP. Common variants include MIFARE Classic, Ultralight and DESFire, with different memory, security and features.",
    priority: 13,
  },

  {
    id: "rfid-em4100",
    category: "rfid",
    intent: "definition",
    question: "What is EM4100?",
    variations: [
      "What is EM4100",
      "EM4100 tag",
      "125kHz EM4100",
      "EM4100 vs MIFARE",
      "EM4100 card",
      "EM4100 definition",
    ],
    keywords: ["rfid", "em4100", "tag", "125khz", "card"],
    answer:
      "EM4100 is a common 125 kHz read-only RFID tag format. It provides a unique ID that can be read by compatible readers such as the RDM6300.",
    priority: 13,
  },

  {
    id: "rfid-ntag",
    category: "rfid",
    intent: "definition",
    question: "What is NTAG?",
    variations: [
      "What is NTAG",
      "NTAG RFID",
      "NTAG213 NTAG215 NTAG216",
      "NTAG vs MIFARE",
      "NFC NTAG tag",
      "NTAG definition",
    ],
    keywords: ["rfid", "ntag", "nfc", "tag", "13.56"],
    answer:
      "NTAG is a family of NFC-compatible tags from NXP with varying memory sizes. They are used for product authentication, marketing and simple data exchange.",
    priority: 13,
  },

  {
    id: "rfid-ultralight",
    category: "rfid",
    intent: "definition",
    question: "What is MIFARE Ultralight?",
    variations: [
      "What is MIFARE Ultralight",
      "MIFARE Ultralight",
      "Ultralight card",
      "Ultralight vs Classic",
      "MIFARE Ultralight uses",
      "MIFARE Ultralight definition",
    ],
    keywords: ["mifare", "ultralight", "card", "rfid", "13.56"],
    answer:
      "MIFARE Ultralight is a low-cost 13.56 MHz tag with limited memory and basic security. It is often used for tickets, single-use passes and simple identification.",
    priority: 13,
  },

  {
    id: "rfid-mifare-desfire",
    category: "rfid",
    intent: "definition",
    question: "What is MIFARE DESFire?",
    variations: [
      "What is MIFARE DESFire",
      "MIFARE DESFire",
      "DESFire EV1 EV2",
      "Secure MIFARE",
      "MIFARE DESFire security",
      "MIFARE DESFire definition",
    ],
    keywords: ["rfid", "mifare", "desfire", "secure", "card"],
    answer:
      "MIFARE DESFire is a secure smart card platform supporting encryption and authentication. It is used for access control, transit and payment applications.",
    priority: 13,
  },

  {
    id: "rfid-iso14443",
    category: "rfid",
    intent: "definition",
    question: "What is ISO 14443?",
    variations: [
      "What is ISO 14443",
      "ISO 14443 RFID",
      "ISO 14443A vs 14443B",
      "ISO 14443 standard",
      "NFC standard ISO 14443",
      "ISO 14443 definition",
    ],
    keywords: ["iso", "14443", "rfid", "standard", "nfc"],
    answer:
      "ISO 14443 is a standard for proximity cards operating at 13.56 MHz with a read range of about 10 cm. It defines two variants (A and B) used by many access, payment and NFC systems.",
    priority: 13,
  },

  {
    id: "rfid-iso15693",
    category: "rfid",
    intent: "definition",
    question: "What is ISO 15693?",
    variations: [
      "What is ISO 15693",
      "ISO 15693 RFID",
      "Vicinity card standard",
      "ISO 15693 vs 14443",
      "ISO 15693 uses",
      "ISO 15693 definition",
    ],
    keywords: ["iso", "15693", "rfid", "standard", "vicinity"],
    answer:
      "ISO 15693 defines vicinity cards operating at 13.56 MHz with a read range up to about one meter. It is used for asset tracking, libraries and industrial applications.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // READERS / MODULES
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-reader",
    category: "rfid",
    intent: "definition",
    question: "What is an RFID reader?",
    variations: [
      "What is an RFID reader",
      "What does an RFID reader do",
      "What is the RFID module",
      "RFID reader meaning",
      "RFID reader definition",
      "RFID module",
    ],
    keywords: ["RFID reader", "RFID module", "reader", "module"],
    answer:
      "An RFID reader is the electronic device that communicates with compatible RFID tags. In embedded projects, the reader can be connected to a microcontroller using an appropriate interface such as SPI, I2C, or UART depending on the module.",
    priority: 13,
  },

  {
    id: "rfid-rc522",
    category: "rfid",
    intent: "definition",
    question: "What is an RC522 module?",
    variations: [
      "What is an RC522 module",
      "RC522 RFID module",
      "How to use RC522",
      "RC522 Arduino",
      "MFRC522 module",
      "RC522 definition",
    ],
    keywords: ["rfid", "rc522", "mfrc522", "module", "arduino"],
    answer:
      "The RC522 (MFRC522) is a popular 13.56 MHz RFID reader module for Arduino. It communicates over SPI and is used for reading and writing MIFARE tags and cards.",
    priority: 14,
  },

  {
    id: "rfid-pn532",
    category: "rfid",
    intent: "definition",
    question: "What is a PN532 module?",
    variations: [
      "What is a PN532 module",
      "PN532 RFID module",
      "How to use PN532",
      "PN532 vs RC522",
      "PN532 NFC module",
      "PN532 definition",
    ],
    keywords: ["rfid", "pn532", "module", "nfc", "reader"],
    answer:
      "The PN532 is an NFC/RFID reader module supporting 13.56 MHz tags. It communicates over SPI, I2C or UART and supports card emulation and peer-to-peer modes.",
    priority: 13,
  },

  {
    id: "rfid-rdm6300",
    category: "rfid",
    intent: "definition",
    question: "What is an RDM6300 module?",
    variations: [
      "What is an RDM6300 module",
      "RDM6300 RFID module",
      "How to use RDM6300",
      "125kHz RFID module",
      "RDM6300 Arduino",
      "RDM6300 definition",
    ],
    keywords: ["rfid", "rdm6300", "module", "125khz", "reader"],
    answer:
      "The RDM6300 is a 125 kHz RFID reader module for EM4100 tags. It outputs tag data over UART and is used in simple access control projects.",
    priority: 13,
  },

  {
    id: "rfid-reader-interface",
    category: "rfid",
    intent: "procedure",
    question: "What interface does an RFID reader use?",
    variations: [
      "What interface does an RFID reader use",
      "RFID reader interface",
      "SPI I2C UART RFID",
      "How to connect RFID reader",
      "RFID reader communication",
      "RFID reader interface types",
    ],
    keywords: ["rfid", "reader", "interface", "spi", "uart", "i2c"],
    answer:
      "RFID readers commonly use SPI, I2C or UART to communicate with the microcontroller. The correct interface depends on the module.",
    priority: 13,
  },

  {
    id: "rfid-reader-voltage",
    category: "rfid",
    intent: "requirements",
    question: "What voltage does an RFID reader need?",
    variations: [
      "What voltage does an RFID reader need",
      "RFID reader voltage",
      "RFID module power",
      "Power RFID reader",
      "RFID voltage requirements",
      "RFID reader voltage",
    ],
    keywords: ["rfid", "reader", "voltage", "power", "module"],
    answer:
      "Most RFID reader modules operate at 3.3V or 5V. Check the module datasheet and provide a stable supply with adequate current.",
    priority: 13,
  },

  {
    id: "rfid-reader-antenna",
    category: "rfid",
    intent: "requirements",
    question: "Does an RFID reader need an external antenna?",
    variations: [
      "Does an RFID reader need an external antenna",
      "RFID external antenna",
      "Antenna for RFID reader",
      "Do I need antenna",
      "RFID reader range antenna",
      "RFID external antenna",
    ],
    keywords: ["rfid", "reader", "antenna", "external", "range"],
    answer:
      "Some RFID modules have integrated antennas; others support external antennas for more range or directional reading. The choice depends on the application.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // RANGE / ANTENNA / ENVIRONMENT
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-antenna",
    category: "rfid",
    intent: "definition",
    question: "What is an RFID antenna?",
    variations: [
      "What is an RFID antenna",
      "RFID antenna",
      "How does RFID antenna work",
      "Antenna types RFID",
      "RFID antenna design",
      "RFID antenna definition",
    ],
    keywords: ["rfid", "antenna", "reader", "tag", "design"],
    answer:
      "An RFID antenna transmits and receives radio signals between reader and tag. Its design affects range, directionality and performance in different environments.",
    priority: 13,
  },

  {
    id: "rfid-read-range",
    category: "rfid",
    intent: "definition",
    question: "What is the read range of RFID?",
    variations: [
      "What is the read range of RFID",
      "RFID read range",
      "How far can RFID read",
      "RFID distance",
      "RFID range comparison",
      "RFID read range",
    ],
    keywords: ["rfid", "range", "distance", "read", "range"],
    answer:
      "Read range depends on frequency, tag type, reader power, antenna and environment. LF typically reads a few cm, HF up to about 10 cm, and UHF up to several meters.",
    priority: 13,
  },

  {
    id: "rfid-range-antenna",
    category: "rfid",
    intent: "procedure",
    question: "How can I increase RFID read range?",
    variations: [
      "How can I increase RFID read range",
      "Increase RFID range",
      "RFID read distance",
      "Extend RFID range",
      "Long range RFID",
      "Increasing RFID range",
    ],
    keywords: ["rfid", "range", "increase", "antenna", "reader"],
    answer:
      "Range can be increased by using a larger antenna, higher reader power, a more sensitive tag or a different frequency. Environmental factors such as metal and water also affect range.",
    priority: 13,
  },

  {
    id: "rfid-metal",
    category: "rfid",
    intent: "troubleshooting",
    question: "Can RFID work through metal?",
    variations: [
      "Can RFID work through metal",
      "RFID through metal",
      "RFID metal interference",
      "Metal mount RFID",
      "RFID on metal",
      "RFID and metal",
    ],
    keywords: ["rfid", "metal", "interference", "tag", "mount"],
    answer:
      "Metal interferes with RFID by reflecting or absorbing signals. On-metal tags are available with special construction for use on metallic surfaces.",
    priority: 13,
  },

  {
    id: "rfid-water",
    category: "rfid",
    intent: "troubleshooting",
    question: "Can RFID work through water?",
    variations: [
      "Can RFID work through water",
      "RFID through water",
      "RFID water interference",
      "Underwater RFID",
      "Water effect RFID",
      "RFID and water",
    ],
    keywords: ["rfid", "water", "interference", "tag", "signal"],
    answer:
      "Water absorbs UHF and HF signals but LF RFID penetrates water better. Applications involving water should choose an appropriate frequency and tag design.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // PROTOCOLS / COLLISION
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-collision",
    category: "rfid",
    intent: "definition",
    question: "What is RFID collision?",
    variations: [
      "What is RFID collision",
      "RFID collision",
      "Multiple tags at once",
      "Anti collision RFID",
      "RFID tag collision",
      "RFID collision definition",
    ],
    keywords: ["rfid", "collision", "multiple", "tags", "anticollision"],
    answer:
      "RFID collision occurs when multiple tags respond at the same time. Anti-collision algorithms allow readers to identify tags one at a time.",
    priority: 13,
  },

  {
    id: "rfid-anticollision",
    category: "rfid",
    intent: "definition",
    question: "What is anti-collision in RFID?",
    variations: [
      "What is anti-collision in RFID",
      "Anti collision RFID",
      "How anti collision works",
      "RFID anticollision",
      "Multiple tag reading",
      "Anti-collision definition",
    ],
    keywords: ["rfid", "anti", "collision", "algorithm", "multiple"],
    answer:
      "Anti-collision is a technique that allows an RFID reader to identify multiple tags without interference. Common algorithms include ALOHA, slotted ALOHA and binary search.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // TAG FORM FACTORS
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-tag",
    category: "rfid",
    intent: "definition",
    question: "What is an RFID tag?",
    variations: [
      "What is an RFID tag",
      "What is an RFID card",
      "What is an RFID keychain",
      "How does an RFID tag work",
      "RFID tag definition",
      "RFID tag meaning",
    ],
    keywords: ["RFID tag", "RFID card", "keychain", "tag"],
    answer:
      "An RFID tag is a small identification device that can be read by a compatible RFID reader. Tags may be available in card, key fob, sticker, or other physical forms depending on the RFID technology.",
    priority: 13,
  },

  {
    id: "rfid-sticker",
    category: "rfid",
    intent: "definition",
    question: "What is an RFID sticker?",
    variations: [
      "What is an RFID sticker",
      "RFID sticker",
      "RFID label",
      "Adhesive RFID tag",
      "RFID sticker uses",
      "RFID sticker definition",
    ],
    keywords: ["rfid", "sticker", "label", "tag", "adhesive"],
    answer:
      "An RFID sticker or label is a thin tag with an adhesive backing. It is used for inventory, tracking, authentication and one-time applications.",
    priority: 10,
  },

  {
    id: "rfid-coin-tag",
    category: "rfid",
    intent: "definition",
    question: "What is an RFID coin tag?",
    variations: [
      "What is an RFID coin tag",
      "RFID coin tag",
      "Disc tag RFID",
      "Round RFID tag",
      "Coin tag uses",
      "RFID coin tag definition",
    ],
    keywords: ["rfid", "coin", "tag", "disc", "round"],
    answer:
      "An RFID coin tag is a small disc-shaped tag. It is used in applications where a durable, small tag is needed, such as access control and asset tagging.",
    priority: 10,
  },

  {
    id: "rfid-nail-tag",
    category: "rfid",
    intent: "definition",
    question: "What is an RFID nail tag?",
    variations: [
      "What is an RFID nail tag",
      "RFID nail tag",
      "Tree tag RFID",
      "Nail tag uses",
      "RFID for wood",
      "RFID nail tag definition",
    ],
    keywords: ["rfid", "nail", "tag", "wood", "tree"],
    answer:
      "An RFID nail tag is designed to be driven into wood or trees for long-term identification and tracking.",
    priority: 10,
  },

  {
    id: "rfid-wristband",
    category: "rfid",
    intent: "definition",
    question: "What is an RFID wristband?",
    variations: [
      "What is an RFID wristband",
      "RFID wristband",
      "RFID bracelet",
      "Wearable RFID tag",
      "RFID band uses",
      "RFID wristband definition",
    ],
    keywords: ["rfid", "wristband", "wearable", "tag", "event"],
    answer:
      "An RFID wristband is a wearable tag used for events, access control, cashless payment and identification.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // ACCESS CONTROL / DOOR LOCKS
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-door-lock",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used for a door lock?",
    variations: [
      "Can RFID be used for a door lock",
      "Can I unlock a door with an RFID card",
      "Can RFID make a door lock",
      "Can ProjexiaHub build an RFID door lock",
      "RFID access control",
      "RFID door lock",
    ],
    keywords: [
      "RFID door lock",
      "access control",
      "lock",
      "RFID card",
      "servo",
      "relay",
      "electronic lock",
    ],
    answer:
      "Yes. A typical RFID access-control prototype uses an RFID reader, a microcontroller, and an actuator such as a servo, relay, or electronic lock. The firmware checks the presented identifier against the configured access rules and then controls the lock mechanism.",
    priority: 14,
  },

  {
    id: "rfid-door-lock-procedure",
    category: "rfid",
    intent: "procedure",
    question: "How do I build an RFID door lock?",
    variations: [
      "How do I build an RFID door lock",
      "How to make an RFID door lock",
      "How can I build an RFID door lock",
      "How do I make an RFID access control system",
      "How to create an RFID access control project",
      "How can I build an RFID card door lock",
      "Steps to build an RFID door lock",
      "RFID door lock project procedure",
      "RFID door lock project steps",
    ],
    keywords: [
      "RFID",
      "door lock",
      "access control",
      "build",
      "make",
      "create",
      "project",
      "reader",
      "card",
      "tag",
      "servo",
      "relay",
      "electronic lock",
      "Arduino",
      "microcontroller",
    ],
    answer:
      "A basic RFID door-lock prototype can be built by connecting an RFID reader to a microcontroller such as an Arduino, storing or configuring the authorized card/tag identifiers, and connecting an actuator such as a servo, relay module, or suitable electronic lock. The firmware reads the presented RFID identifier, checks whether it is authorized, and then unlocks the mechanism when access is allowed. A typical build process is: 1) choose the RFID reader and compatible tags, 2) choose the microcontroller and lock actuator, 3) connect the reader and actuator using their required interfaces, 4) write and test the RFID reading code, 5) add authorized-card checking, 6) control the lock for an appropriate unlock period, and 7) test the complete system safely before installing it on a real door. For a real door, the power requirements, actuator type, fail-safe/fail-secure behavior, electrical protection, and mechanical installation should be designed appropriately rather than treating a prototype circuit as a finished security system.",
    priority: 15,
  },

  {
    id: "rfid-door-lock-components",
    category: "rfid",
    intent: "requirements",
    question: "What components do I need for an RFID door lock?",
    variations: [
      "What components do I need for an RFID door lock",
      "What parts are needed for an RFID door lock",
      "What hardware do I need for an RFID access control system",
      "What components are required for an RFID door lock",
      "What do I need to make an RFID door lock",
      "RFID door lock components",
    ],
    keywords: [
      "RFID",
      "door lock",
      "components",
      "parts",
      "hardware",
      "reader",
      "Arduino",
      "servo",
      "relay",
      "electronic lock",
      "power supply",
    ],
    answer:
      "A basic RFID door-lock prototype commonly needs an RFID reader and compatible cards/tags, a microcontroller such as an Arduino, an actuator such as a servo, relay module or suitable electronic lock, an appropriate power supply, connecting wires, and any required protection or driver circuitry. The exact components depend on the chosen RFID module, actuator, voltage requirements, and whether the system is only a prototype or intended for an actual door.",
    priority: 15,
  },

  {
    id: "rfid-door-lock-steps",
    category: "rfid",
    intent: "procedure",
    question: "Can you list the RFID door lock project steps?",
    variations: [
      "Can you list the RFID door lock project steps",
      "RFID door lock steps",
      "List RFID lock steps",
      "RFID lock procedure",
      "RFID access project steps",
      "RFID door lock project steps",
    ],
    keywords: ["rfid", "door", "lock", "steps", "procedure"],
    answer:
      "Typical steps: 1) choose RFID reader and tags, 2) choose microcontroller and lock actuator, 3) wire components, 4) write code to read tags, 5) add authorization check, 6) control lock for a set time, 7) test the system safely, and 8) refine the design for the final installation.",
    priority: 15,
  },

  {
    id: "rfid-door-lock-code",
    category: "rfid",
    intent: "procedure",
    question: "How is RFID door lock firmware structured?",
    variations: [
      "How is RFID door lock firmware structured",
      "RFID lock code structure",
      "How to write RFID lock code",
      "RFID lock firmware",
      "RFID lock program",
      "RFID door lock firmware structure",
    ],
    keywords: ["rfid", "door", "lock", "code", "firmware"],
    answer:
      "Typical firmware initializes the reader and lock, loops to read tags, compares the UID against stored values, and drives the lock output for a defined unlock period.",
    priority: 13,
  },

  {
    id: "rfid-door-lock-security-tips",
    category: "rfid",
    intent: "procedure",
    question: "How can I make an RFID door lock more secure?",
    variations: [
      "How can I make an RFID door lock more secure",
      "Secure RFID lock",
      "Improve RFID access security",
      "RFID door lock security tips",
      "Make RFID lock safer",
      "RFID door lock security",
    ],
    keywords: ["rfid", "lock", "security", "tips", "access"],
    answer:
      "Use encrypted tags, add a second authentication factor, protect wiring and controller, log access, provide tamper detection and use fail-safe/fail-secure design as appropriate.",
    priority: 14,
  },

  {
    id: "rfid-door-lock-fail-safe",
    category: "rfid",
    intent: "comparison",
    question: "What is the difference between fail-safe and fail-secure locks?",
    variations: [
      "What is the difference between fail-safe and fail-secure locks",
      "Fail safe vs fail secure",
      "Door lock power failure",
      "Safe lock design",
      "Secure lock design",
      "Fail-safe vs fail-secure",
    ],
    keywords: ["rfid", "fail", "safe", "secure", "lock"],
    answer:
      "Fail-safe locks unlock on power loss for safety and exit. Fail-secure locks remain locked on power loss for security. Choose based on the application and local regulations.",
    priority: 14,
  },

  {
    id: "rfid-door-lock-power-backup",
    category: "rfid",
    intent: "requirements",
    question: "Does an RFID door lock need battery backup?",
    variations: [
      "Does an RFID door lock need battery backup",
      "RFID lock backup battery",
      "Battery backup door lock",
      "Backup power access control",
      "Power failure lock",
      "RFID lock battery backup",
    ],
    keywords: ["rfid", "lock", "backup", "battery", "power"],
    answer:
      "Battery backup is recommended so the lock continues working during power failure. The required duration and behavior depend on the fail-safe/fail-secure design.",
    priority: 13,
  },

  {
    id: "rfid-door-lock-tamper",
    category: "rfid",
    intent: "procedure",
    question: "How do I protect an RFID lock from tampering?",
    variations: [
      "How do I protect an RFID lock from tampering",
      "RFID lock tamper",
      "Tamper proof access",
      "Secure lock installation",
      "Prevent lock tampering",
      "RFID lock tamper protection",
    ],
    keywords: ["rfid", "lock", "tamper", "protection", "security"],
    answer:
      "Use a secure enclosure, conceal wiring, add tamper detection, protect configuration with authentication and consider mechanical reinforcement.",
    priority: 13,
  },

  {
    id: "rfid-door-lock-logging",
    category: "rfid",
    intent: "compatibility",
    question: "Can an RFID lock log access events?",
    variations: [
      "Can an RFID lock log access events",
      "RFID lock logging",
      "Access log lock",
      "Record access RFID",
      "Audit trail access",
      "RFID lock logging",
    ],
    keywords: ["rfid", "lock", "logging", "access", "audit"],
    answer:
      "Yes. Access events can be stored locally or transmitted to a server for auditing, reporting and security monitoring.",
    priority: 13,
  },

  {
    id: "rfid-door-lock-multi-user",
    category: "rfid",
    intent: "compatibility",
    question: "Can an RFID lock support multiple users?",
    variations: [
      "Can an RFID lock support multiple users",
      "Multi user RFID lock",
      "Multiple cards lock",
      "Add users RFID lock",
      "Manage access cards",
      "RFID lock multiple users",
    ],
    keywords: ["rfid", "lock", "multiple", "users", "cards"],
    answer:
      "Yes. Multiple authorized cards or tags can be stored in the controller. Some systems support adding/removing users at runtime or remotely.",
    priority: 13,
  },

  {
    id: "rfid-door-lock-time",
    category: "rfid",
    intent: "compatibility",
    question: "Can an RFID lock control access by time?",
    variations: [
      "Can an RFID lock control access by time",
      "Time based access RFID",
      "Schedule access lock",
      "Restrict access by time",
      "Timed door lock",
      "RFID lock time control",
    ],
    keywords: ["rfid", "lock", "time", "schedule", "access"],
    answer:
      "Yes. With a real-time clock and appropriate firmware, access can be restricted by time of day, weekday or specific schedules.",
    priority: 13,
  },

  {
    id: "rfid-door-lock-remote",
    category: "rfid",
    intent: "compatibility",
    question: "Can an RFID lock be controlled remotely?",
    variations: [
      "Can an RFID lock be controlled remotely",
      "Remote RFID lock",
      "Remote access control",
      "Unlock door remotely",
      "Connected lock",
      "RFID lock remote control",
    ],
    keywords: ["rfid", "lock", "remote", "control", "connected"],
    answer:
      "Yes. If the system has network connectivity, it can support remote unlock, user management and monitoring through an app or web interface.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // ACTUATORS / LOCKS FOR RFID SYSTEMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-servo-lock",
    category: "rfid",
    intent: "compatibility",
    question: "Can I use a servo for an RFID lock?",
    variations: [
      "Can I use a servo for an RFID lock",
      "Servo RFID lock",
      "RFID lock with servo",
      "Servo door lock",
      "Simple RFID lock",
      "Servo RFID lock",
    ],
    keywords: ["rfid", "servo", "lock", "door", "motor"],
    answer:
      "Yes. A servo can be used for a small DIY RFID lock prototype, turning a latch or bolt. It is suitable for learning but may not be robust enough for a real door.",
    priority: 13,
  },

  {
    id: "rfid-solenoid-lock",
    category: "rfid",
    intent: "compatibility",
    question: "Can I use a solenoid for an RFID lock?",
    variations: [
      "Can I use a solenoid for an RFID lock",
      "Solenoid RFID lock",
      "RFID lock with solenoid",
      "Solenoid door lock",
      "Electric bolt lock",
      "Solenoid RFID lock",
    ],
    keywords: ["rfid", "solenoid", "lock", "door", "bolt"],
    answer:
      "Yes. A solenoid can drive a bolt or latch in an RFID lock. The solenoid must be rated for the required force and duty cycle, and a driver is usually needed.",
    priority: 13,
  },

  {
    id: "rfid-relay-lock",
    category: "rfid",
    intent: "compatibility",
    question: "Can I use a relay for an RFID lock?",
    variations: [
      "Can I use a relay for an RFID lock",
      "Relay RFID lock",
      "RFID lock with relay",
      "Relay door lock",
      "Control lock with relay",
      "Relay RFID lock",
    ],
    keywords: ["rfid", "relay", "lock", "door", "control"],
    answer:
      "Yes. A relay can switch power to an electric lock, strike or magnetic lock. The relay must be rated for the lock's voltage and current.",
    priority: 13,
  },

  {
    id: "rfid-power-lock",
    category: "rfid",
    intent: "requirements",
    question: "What power supply does an RFID lock need?",
    variations: [
      "What power supply does an RFID lock need",
      "RFID lock power",
      "Power supply for lock",
      "Lock voltage current",
      "Powering access control",
      "RFID lock power supply",
    ],
    keywords: ["rfid", "lock", "power", "supply", "voltage"],
    answer:
      "The power supply must match the lock's voltage and current requirements and provide enough current for the lock and reader. Backup power is important for access control systems.",
    priority: 13,
  },

  {
    id: "rfid-em-lock",
    category: "rfid",
    intent: "definition",
    question: "What is an electromagnetic lock?",
    variations: [
      "What is an electromagnetic lock",
      "EM lock RFID",
      "Magnetic lock access",
      "How does EM lock work",
      "Electronic magnetic lock",
      "Electromagnetic lock definition",
    ],
    keywords: ["rfid", "em", "lock", "magnetic", "access"],
    answer:
      "An electromagnetic lock holds a door closed using magnetic force while powered. It typically releases when power is removed, making it a fail-safe device.",
    priority: 13,
  },

  {
    id: "rfid-electric-strike",
    category: "rfid",
    intent: "definition",
    question: "What is an electric strike?",
    variations: [
      "What is an electric strike",
      "Electric strike RFID",
      "How does electric strike work",
      "Strike lock access",
      "Electric door strike",
      "Electric strike definition",
    ],
    keywords: ["rfid", "electric", "strike", "door", "lock"],
    answer:
      "An electric strike replaces the fixed strike plate on a door frame and releases the latch when powered. It can be fail-safe or fail-secure depending on the model.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // ACCESS CONTROL SYSTEMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-access-control",
    category: "rfid",
    intent: "definition",
    question: "How does RFID access control work?",
    variations: [
      "How does RFID access control work",
      "RFID access control",
      "How does RFID door access work",
      "RFID entry system",
      "Access control with RFID",
      "RFID access control definition",
    ],
    keywords: ["rfid", "access", "control", "door", "security"],
    answer:
      "In RFID access control, a reader detects a tag, the controller checks whether it is authorized, and the door or barrier is unlocked if permitted. Logs and time restrictions may also be applied.",
    priority: 14,
  },

  // ─────────────────────────────────────────────────────────────
  // SECURITY
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-security",
    category: "rfid",
    intent: "procedure",
    question: "Is RFID secure?",
    variations: [
      "Is RFID secure",
      "RFID security",
      "Can RFID be cloned",
      "How secure is RFID",
      "RFID vulnerabilities",
      "RFID security concerns",
    ],
    keywords: ["rfid", "security", "clone", "secure", "access"],
    answer:
      "Basic RFID tags can be cloned, so security depends on the technology and system design. Higher-security options include encrypted tags, mutual authentication and additional verification.",
    priority: 14,
  },

  {
    id: "rfid-cloning",
    category: "rfid",
    intent: "troubleshooting",
    question: "Can RFID tags be cloned?",
    variations: [
      "Can RFID tags be cloned",
      "RFID cloning",
      "Clone RFID card",
      "Copy RFID tag",
      "RFID tag copy",
      "RFID cloning",
    ],
    keywords: ["rfid", "clone", "copy", "card", "tag"],
    answer:
      "Some RFID tags, especially simple read-only types, can be cloned with compatible writers. More secure tags use encryption and authentication to prevent cloning.",
    priority: 14,
  },

  {
    id: "rfid-uid-clone",
    category: "rfid",
    intent: "troubleshooting",
    question: "Why is UID-only access not secure?",
    variations: [
      "Why is UID-only access not secure",
      "UID only access",
      "Why UID is insecure",
      "UID cloning",
      "RFID UID security",
      "UID-only access security",
    ],
    keywords: ["rfid", "uid", "secure", "clone", "access"],
    answer:
      "UID-only access relies on a fixed identifier that can be cloned. For higher security, encrypted authentication or additional factors should be used.",
    priority: 14,
  },

  {
    id: "rfid-mifare-classic-security",
    category: "rfid",
    intent: "troubleshooting",
    question: "Is MIFARE Classic secure?",
    variations: [
      "Is MIFARE Classic secure",
      "MIFARE Classic security",
      "Is MIFARE Classic safe",
      "MIFARE Classic vulnerability",
      "MIFARE Classic crack",
      "MIFARE Classic security",
    ],
    keywords: ["rfid", "mifare", "classic", "security", "crypto"],
    answer:
      "MIFARE Classic has known cryptographic weaknesses and should not be used for high-security applications. Other MIFARE variants or secure technologies are preferred for new designs.",
    priority: 14,
  },

  {
    id: "rfid-encryption",
    category: "rfid",
    intent: "compatibility",
    question: "Do RFID tags support encryption?",
    variations: [
      "Do RFID tags support encryption",
      "Encrypted RFID",
      "RFID encryption",
      "Secure RFID tag",
      "Crypto RFID",
      "RFID encryption support",
    ],
    keywords: ["rfid", "encryption", "secure", "crypto", "tag"],
    answer:
      "Some RFID technologies support encryption and mutual authentication. These are used in payment, identity and high-security access applications.",
    priority: 13,
  },

  {
    id: "rfid-mutual-auth",
    category: "rfid",
    intent: "definition",
    question: "What is mutual authentication in RFID?",
    variations: [
      "What is mutual authentication in RFID",
      "Mutual authentication RFID",
      "Reader tag authentication",
      "RFID authentication",
      "Tag authentication",
      "Mutual authentication definition",
    ],
    keywords: ["rfid", "mutual", "authentication", "reader", "tag"],
    answer:
      "Mutual authentication means both the reader and the tag verify each other's identity before exchanging data. It improves security compared to UID-only identification.",
    priority: 13,
  },

  {
    id: "rfid-secure-tags",
    category: "rfid",
    intent: "procedure",
    question: "What are the most secure RFID tags?",
    variations: [
      "What are the most secure RFID tags",
      "Most secure RFID tag",
      "Secure RFID technology",
      "Best secure RFID card",
      "High security RFID",
      "Secure RFID tags",
    ],
    keywords: ["rfid", "secure", "tags", "encryption", "authentication"],
    answer:
      "Secure options include MIFARE DESFire, certain smart card platforms, and tags with mutual authentication and encryption. The correct choice depends on the threat model and application.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // APPLICATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-attendance",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used for attendance?",
    variations: [
      "Can RFID be used for attendance",
      "Can RFID make an attendance system",
      "RFID student attendance",
      "RFID attendance project",
      "RFID attendance",
      "RFID attendance system",
    ],
    keywords: ["RFID attendance", "attendance", "student", "logging"],
    answer:
      "Yes. An RFID attendance system can identify compatible cards or tags and record the associated event. Storage can be local or connected to a suitable software/database system depending on the project requirements.",
    priority: 13,
  },

  {
    id: "rfid-attendance-system-components",
    category: "rfid",
    intent: "requirements",
    question: "What components are needed for an RFID attendance system?",
    variations: [
      "What components are needed for an RFID attendance system",
      "RFID attendance components",
      "Parts for RFID attendance",
      "RFID attendance hardware",
      "What do I need for attendance system",
      "RFID attendance components",
    ],
    keywords: ["rfid", "attendance", "components", "hardware", "reader"],
    answer:
      "A basic RFID attendance system needs an RFID reader, compatible tags, a microcontroller, a display or indicator, a clock/RTC and optionally a storage or network interface.",
    priority: 13,
  },

  {
    id: "rfid-attendance-logging",
    category: "rfid",
    intent: "procedure",
    question: "How does an RFID attendance system record data?",
    variations: [
      "How does an RFID attendance system record data",
      "RFID attendance logging",
      "How attendance is stored",
      "RFID attendance database",
      "Log attendance RFID",
      "RFID attendance data",
    ],
    keywords: ["rfid", "attendance", "logging", "database", "record"],
    answer:
      "When a tag is read, the system records the ID with a timestamp. Data can be stored locally (SD, EEPROM) or sent to a database or cloud service.",
    priority: 13,
  },

  {
    id: "rfid-attendance-display",
    category: "rfid",
    intent: "compatibility",
    question: "Can an RFID attendance system show a display?",
    variations: [
      "Can an RFID attendance system show a display",
      "RFID attendance display",
      "LCD attendance system",
      "Show name on display",
      "RFID attendance screen",
      "RFID attendance display",
    ],
    keywords: ["rfid", "attendance", "display", "lcd", "screen"],
    answer:
      "Yes. A display can show the identified user, time and status. The information depends on stored data and the system design.",
    priority: 10,
  },

  {
    id: "rfid-attendance-cloud",
    category: "rfid",
    intent: "compatibility",
    question: "Can RFID attendance connect to the cloud?",
    variations: [
      "Can RFID attendance connect to the cloud",
      "Cloud RFID attendance",
      "IoT attendance system",
      "Online attendance RFID",
      "Send attendance to server",
      "Cloud RFID attendance",
    ],
    keywords: ["rfid", "attendance", "cloud", "iot", "server"],
    answer:
      "Yes. Attendance data can be transmitted to a server or cloud service for remote access, reporting and integration with other systems.",
    priority: 13,
  },

  {
    id: "rfid-attendance-offline",
    category: "rfid",
    intent: "compatibility",
    question: "Can RFID attendance work offline?",
    variations: [
      "Can RFID attendance work offline",
      "Offline RFID attendance",
      "Attendance without internet",
      "Local storage attendance",
      "RFID attendance offline mode",
      "Offline RFID attendance",
    ],
    keywords: ["rfid", "attendance", "offline", "storage", "local"],
    answer:
      "Yes. Offline attendance systems store data locally and can synchronize later. They require enough storage and a way to retrieve the data.",
    priority: 13,
  },

  {
    id: "rfid-inventory",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used for inventory?",
    variations: [
      "Can RFID be used for inventory",
      "RFID inventory",
      "Stock tracking RFID",
      "Inventory management RFID",
      "RFID for warehouse",
      "RFID inventory",
    ],
    keywords: ["rfid", "inventory", "stock", "warehouse", "tracking"],
    answer:
      "RFID is widely used for inventory and warehouse management. It allows fast, multi-item reading without line of sight.",
    priority: 13,
  },

  {
    id: "rfid-asset-tracking",
    category: "rfid",
    intent: "capability",
    question: "Can RFID track assets?",
    variations: [
      "Can RFID track assets",
      "RFID asset tracking",
      "Track equipment RFID",
      "Asset management RFID",
      "RFID asset tag",
      "RFID asset tracking",
    ],
    keywords: ["rfid", "asset", "tracking", "tag", "management"],
    answer:
      "Yes. RFID asset tags are used to track equipment, tools and other assets for inventory, maintenance and location.",
    priority: 13,
  },

  {
    id: "rfid-logistics",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used in logistics?",
    variations: [
      "Can RFID be used in logistics",
      "RFID logistics",
      "Supply chain RFID",
      "Shipping RFID",
      "Logistics tracking RFID",
      "RFID in logistics",
    ],
    keywords: ["rfid", "logistics", "supply", "chain", "shipping"],
    answer:
      "RFID is used in logistics for shipment tracking, container identification, sorting and inventory visibility across the supply chain.",
    priority: 13,
  },

  {
    id: "rfid-library",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used in libraries?",
    variations: [
      "Can RFID be used in libraries",
      "RFID library system",
      "Library RFID tag",
      "Book tracking RFID",
      "RFID library management",
      "RFID in libraries",
    ],
    keywords: ["rfid", "library", "book", "tag", "management"],
    answer:
      "Yes. Libraries use RFID for book identification, self-checkout, inventory and theft prevention.",
    priority: 13,
  },

  {
    id: "rfid-laundry",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used in laundry?",
    variations: [
      "Can RFID be used in laundry",
      "RFID laundry tag",
      "RFID textile tag",
      "Laundry management RFID",
      "Washable RFID",
      "RFID in laundry",
    ],
    keywords: ["rfid", "laundry", "textile", "tag", "management"],
    answer:
      "Yes. Special RFID tags can withstand washing and are used for laundry and textile management, tracking garments through cleaning cycles.",
    priority: 10,
  },

  {
    id: "rfid-animal",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used for animals?",
    variations: [
      "Can RFID be used for animals",
      "RFID animal tag",
      "Pet microchip",
      "Livestock RFID",
      "Animal identification RFID",
      "RFID for animals",
    ],
    keywords: ["rfid", "animal", "pet", "livestock", "microchip"],
    answer:
      "Yes. RFID and microchip tags are used for pet identification, livestock tracking and wildlife research.",
    priority: 13,
  },

  {
    id: "rfid-vehicle",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used for vehicles?",
    variations: [
      "Can RFID be used for vehicles",
      "RFID vehicle access",
      "Car RFID tag",
      "Vehicle tracking RFID",
      "Toll RFID",
      "RFID for vehicles",
    ],
    keywords: ["rfid", "vehicle", "car", "access", "toll"],
    answer:
      "RFID is used for vehicle access, toll collection, parking and fleet tracking. UHF tags are common for longer-range vehicle identification.",
    priority: 13,
  },

  {
    id: "rfid-race-timing",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used for race timing?",
    variations: [
      "Can RFID be used for race timing",
      "RFID race timing",
      "Race chip RFID",
      "Timing system RFID",
      "Marathon RFID",
      "RFID race timing",
    ],
    keywords: ["rfid", "race", "timing", "chip", "marathon"],
    answer:
      "Yes. RFID tags are used for race timing, with readers at checkpoints and finish lines recording each participant's time.",
    priority: 13,
  },

  {
    id: "rfid-payment",
    category: "rfid",
    intent: "capability",
    question: "Can RFID be used for payments?",
    variations: [
      "Can RFID be used for payments",
      "RFID payment",
      "Contactless payment RFID",
      "NFC payment",
      "Card payment RFID",
      "RFID payments",
    ],
    keywords: ["rfid", "payment", "contactless", "nfc", "card"],
    answer:
      "Yes. Contactless payment cards and mobile payments use NFC/RFID technology with secure authentication and encryption.",
    priority: 13,
  },

  {
    id: "rfid-toll",
    category: "rfid",
    intent: "definition",
    question: "How does RFID toll collection work?",
    variations: [
      "How does RFID toll collection work",
      "RFID toll",
      "Toll tag RFID",
      "Highway RFID",
      "Electronic toll collection",
      "RFID toll collection",
    ],
    keywords: ["rfid", "toll", "highway", "tag", "collection"],
    answer:
      "An RFID tag in the vehicle is read by readers at the toll point. The system identifies the vehicle and charges the associated account.",
    priority: 13,
  },

  {
    id: "rfid-parking",
    category: "rfid",
    intent: "capability",
    question: "Can RFID manage parking?",
    variations: [
      "Can RFID manage parking",
      "RFID parking",
      "Parking access RFID",
      "Parking management RFID",
      "Parking tag",
      "RFID parking",
    ],
    keywords: ["rfid", "parking", "access", "management", "tag"],
    answer:
      "Yes. RFID is used for parking access, monthly passes and vehicle identification in parking facilities.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // FIRMWARE / TOOLS
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-firmware",
    category: "rfid",
    intent: "procedure",
    question: "How do I read RFID in firmware?",
    variations: [
      "How do I read RFID in firmware",
      "RFID reader firmware",
      "MFRC522 code",
      "Read RFID card",
      "RFID firmware Arduino",
      "Reading RFID in firmware",
    ],
    keywords: ["rfid", "firmware", "reader", "card", "tag"],
    answer:
      "RFID reader firmware initializes the reader, waits for a tag, reads the identifier or data, and then processes or compares it. The interface and protocol depend on the reader module.",
    priority: 13,
  },

  {
    id: "rfid-uid-read",
    category: "rfid",
    intent: "procedure",
    question: "How do I read the UID from an RFID card?",
    variations: [
      "How do I read the UID from an RFID card",
      "Read RFID UID",
      "Get card UID",
      "Read MIFARE UID",
      "RFID UID code",
      "Reading RFID UID",
    ],
    keywords: ["rfid", "uid", "read", "card", "firmware"],
    answer:
      "Firmware typically requests the tag's UID through the reader's library or protocol. The UID is then returned as a byte array and can be formatted, compared or stored.",
    priority: 13,
  },

  {
    id: "rfid-card-emulation",
    category: "rfid",
    intent: "procedure",
    question: "Can an RFID device emulate a card?",
    variations: [
      "Can an RFID device emulate a card",
      "RFID card emulation",
      "PN532 card emulation",
      "Emulate NFC tag",
      "RFID reader as tag",
      "RFID card emulation",
    ],
    keywords: ["rfid", "emulation", "card", "pn532", "nfc"],
    answer:
      "Some modules, such as the PN532, can emulate a card or tag in certain modes. Uses include testing, access simulation and peer-to-peer exchange.",
    priority: 10,
  },

  {
    id: "rfid-servo-relay",
    category: "rfid",
    intent: "procedure",
    question: "How do I trigger a relay or servo from an RFID read?",
    variations: [
      "How do I trigger a relay or servo from an RFID read",
      "Trigger relay RFID",
      "RFID servo control",
      "Actuator from RFID",
      "RFID relay control",
      "RFID to actuator",
    ],
    keywords: ["rfid", "relay", "servo", "actuator", "trigger"],
    answer:
      "After the firmware confirms an authorized tag, it can drive a relay, servo or other actuator for a defined period. Safety and fail-safe behavior should be considered.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // BEST PRACTICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "rfid-best-practices",
    category: "rfid",
    intent: "procedure",
    question: "What are RFID best practices?",
    variations: [
      "What are RFID best practices",
      "RFID best practices",
      "Good RFID design",
      "RFID usage guidelines",
      "How to use RFID properly",
      "RFID best practices",
    ],
    keywords: ["rfid", "best", "practices", "design", "usage"],
    answer:
      "Choose the right frequency and tag type, test in the real environment, secure the system, use appropriate power, protect against cloning where needed, and document the design.",
    priority: 14,
  },

  {
    id: "rfid-accuracy",
    category: "rfid",
    intent: "procedure",
    question: "How accurate is RFID identification?",
    variations: [
      "How accurate is RFID identification",
      "RFID accuracy",
      "RFID read reliability",
      "RFID error rate",
      "RFID identification accuracy",
      "RFID accuracy",
    ],
    keywords: ["rfid", "accuracy", "reliability", "read", "error"],
    answer:
      "RFID identification is generally reliable when tags and readers are compatible and positioned well. Environmental factors, tag quality and antenna design affect accuracy.",
    priority: 13,
  },

  {
    id: "rfid-vs-barcode",
    category: "rfid",
    intent: "comparison",
    question: "RFID vs barcode — which should I use?",
    variations: [
      "RFID vs barcode",
      "Which is better RFID or barcode",
      "RFID and barcode difference",
      "Barcode vs RFID",
      "Compare RFID barcode",
      "RFID vs barcode comparison",
    ],
    keywords: ["rfid", "barcode", "comparison", "difference", "tracking"],
    answer:
      "RFID allows multi-item reading without line of sight and can store more data, but tags cost more. Barcodes are cheaper and simpler but require line of sight and individual scanning.",
    priority: 13,
  },

  {
    id: "rfid-nfc-tag-write",
    category: "rfid",
    intent: "procedure",
    question: "How do I write data to an NFC tag?",
    variations: [
      "How do I write data to an NFC tag",
      "Write NFC tag",
      "Program NFC tag",
      "NFC tag writing",
      "Write NDEF tag",
      "Writing NFC tags",
    ],
    keywords: ["nfc", "tag", "write", "ndef", "program"],
    answer:
      "Writing an NFC tag requires a compatible reader/writer and a tag that supports writing. Data is sent in the tag's supported format (such as NDEF) and stored in its memory.",
    priority: 13,
  },

  {
    id: "rfid-ndef",
    category: "rfid",
    intent: "definition",
    question: "What is NDEF?",
    variations: [
      "What is NDEF",
      "NDEF NFC",
      "NFC data format",
      "NDEF record",
      "NDEF tag format",
      "NDEF definition",
    ],
    keywords: ["ndef", "nfc", "format", "tag", "data"],
    answer:
      "NDEF, or NFC Data Exchange Format, is a standardized format for storing and exchanging data on NFC tags. It defines records that can contain text, URLs, or other payloads.",
    priority: 13,
  },

  {
    id: "rfid-nfc-purpose",
    category: "rfid",
    intent: "purpose",
    question: "What is NFC used for?",
    variations: [
      "What is NFC used for",
      "What can NFC do",
      "Where is NFC used",
      "What is the purpose of NFC",
      "NFC applications",
      "NFC use cases",
    ],
    keywords: ["nfc", "used", "purpose", "application", "contactless"],
    answer:
      "NFC is used for contactless payments, access badges, transit cards, quick pairing, tag-based information and simple data exchange.",
    priority: 13,
  },

  {
    id: "rfid-nfc-reader",
    category: "rfid",
    intent: "definition",
    question: "What is an NFC reader?",
    variations: [
      "What is an NFC reader",
      "NFC reader device",
      "How does NFC reader work",
      "NFC reader module",
      "NFC reader definition",
      "NFC reader",
    ],
    keywords: ["nfc", "reader", "device", "module", "tag"],
    answer:
      "An NFC reader communicates with nearby NFC tags or devices to read or exchange data. It is often integrated into phones, payment terminals or dedicated modules.",
    priority: 13,
  },
];
