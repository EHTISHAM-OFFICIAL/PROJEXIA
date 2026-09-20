import { HELP_KNOWLEDGE, type HelpEntry } from "../constants/helpKnowledge";
import type { HelpIntent } from "../constants/help/types";

export interface HelpAction {
  label: string;
  path: string;
}

export interface HelpResponse {
  answer: string;
  action?: HelpAction;
}

/* ==========================================================================
   NAVIGATION ACTIONS
   ========================================================================== */

const HELP_ACTIONS: Partial<Record<HelpIntent, HelpAction>> = {
  project_request: {
    label: "Open Project Request",
    path: "/request-project",
  },

  contact: {
    label: "Contact MECTEC",
    path: "/contact",
  },
};

/* ==========================================================================
   MECTEC BUSINESS HOURS
   ========================================================================== */

const MECTEC_TIME_ZONE = "Asia/Karachi";

const MECTEC_OPEN_HOUR = 10;
const MECTEC_CLOSE_HOUR = 22;

/*
 * JavaScript weekday:
 *
 * 0 = Sunday
 * 1 = Monday
 * 2 = Tuesday
 * 3 = Wednesday
 * 4 = Thursday
 * 5 = Friday
 * 6 = Saturday
 *
 * Friday is officially closed.
 */
const MECTEC_CLOSED_WEEKDAYS = new Set([5]);

/* ==========================================================================
   SPELLING / WORD ALIASES
   ========================================================================== */

const SPELLING_ALIASES: Record<string, string> = {
  /* Arduino */

  ardunio: "arduino",
  ardino: "arduino",
  arduiono: "arduino",
  arduinoo: "arduino",
  ardiuno: "arduino",
  arduinoos: "arduino",
  ardunios: "arduino",

  /* ESP */

  esp: "esp32",
  esps: "esp32",
  esp32s: "esp32",
  esp_32: "esp32",

  esp8266s: "esp8266",
  esp_8266: "esp8266",

  /* RFID */

  rfids: "rfid",
  rfi: "rfid",
  rfidreader: "rfid",
  rfidreaders: "rfid",
  rfidcard: "rfid",
  rfidcards: "rfid",
  rfidtag: "rfid",
  rfidtags: "rfid",

  /* PCB */

  pcbs: "pcb",
  pcbboard: "pcb",
  pcbboards: "pcb",

  /* Microcontrollers */

  microcontrollers: "microcontroller",

  /* Components */

  components: "component",
  resistors: "resistor",
  capacitors: "capacitor",
  inductors: "inductor",
  transistors: "transistor",
  diodes: "diode",
  leds: "led",
  relays: "relay",
  sensors: "sensor",
  motors: "motor",
  servos: "servo",
  batteries: "battery",
  modules: "module",
  displays: "display",
  buttons: "button",
  switches: "switch",
  wires: "wire",

  /* Firmware */

  firmwares: "firmware",

  /* Projects */

  projects: "project",

  /* Websites */

  websites: "website",
  webiste: "website",
  webstie: "website",
};

/* ==========================================================================
   COMMON TYPOS
   ========================================================================== */

const TYPO_ALIASES: Record<string, string> = {
  teh: "the",
  waht: "what",
  whta: "what",
  hwat: "what",

  hw: "how",
  hoow: "how",
  hwo: "how",

  whne: "when",
  wehn: "when",

  wher: "where",
  were: "where",
  wheer: "where",

  ur: "your",
  yr: "your",
  youre: "your",

  yuor: "your",
  yoru: "your",

  opne: "open",
  oepn: "open",

  cloase: "close",
  clsoe: "close",
  cls: "close",

  timng: "timing",
  timmings: "timings",
  tiem: "time",

  availble: "available",
  avaiable: "available",
  avilable: "available",
  avalible: "available",

  pric: "price",
  prce: "price",
  pirce: "price",

  prject: "project",
  porject: "project",
  projct: "project",
  proejct: "project",

  reqest: "request",
  requst: "request",
  rqst: "request",

  contct: "contact",
  contat: "contact",
  conact: "contact",

  componet: "component",
  compnent: "component",
  compoent: "component",

  sensr: "sensor",
  senor: "sensor",

  moter: "motor",
  mootr: "motor",

  arduion: "arduino",
  ardunio: "arduino",
  arduinoo: "arduino",
  ardiuno: "arduino",
  ardino: "arduino",

  rfidr: "rfid",

  programm: "program",
  programing: "programming",
  progamming: "programming",

  compatable: "compatible",
  compatibile: "compatible",

  truble: "trouble",
  troubel: "trouble",

  woring: "working",
  workng: "working",

  tommorow: "tomorrow",
  tommorrow: "tomorrow",
  yesturday: "yesterday",

  mectc: "mectec",
  metec: "mectec",
  mectecx: "mectec",
};

/* ==========================================================================
   STOP WORDS
   ========================================================================== */

const STOP_WORDS = new Set([
  "a",
  "an",
  "am",
  "and",
  "are",
  "at",
  "be",
  "been",
  "being",
  "but",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "for",
  "from",
  "get",
  "have",
  "how",
  "i",
  "if",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "should",
  "so",
  "that",
  "the",
  "this",
  "to",
  "was",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
]);

/* ==========================================================================
   INTENT PATTERNS
   ========================================================================== */

/*
 * IMPORTANT:
 *
 * Specific intents must come before generic intents.
 *
 * For example:
 *
 * "How can I contact you?"
 *
 * must become CONTACT, not PROCEDURE.
 */

const INTENT_PATTERNS: Array<{
  intent: HelpIntent;
  patterns: RegExp[];
}> = [
  /* ---------------------------------------------------------------------- */
  /* GREETING                                                               */
  /* ---------------------------------------------------------------------- */

  {
    intent: "greeting",
    patterns: [
      /^hi$/i,
      /^hello$/i,
      /^hey$/i,
      /^hiya$/i,
      /^hey there$/i,
      /^hello there$/i,

      /\bhi there\b/i,
      /\bhello there\b/i,
      /\bhey there\b/i,

      /\bassalam o alaikum\b/i,
      /\bassalamu alaikum\b/i,
      /\bassalamualaikum\b/i,
      /\bsalam\b/i,

      /\bgood morning\b/i,
      /\bgood afternoon\b/i,
      /\bgood evening\b/i,

      /\bhow are you\b/i,
      /\bhow are you doing\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* HOURS                                                                  */
  /* ---------------------------------------------------------------------- */

  {
    intent: "hours",
    patterns: [
      /\bwhat are your timings\b/i,
      /\bwhat are your shop timings\b/i,
      /\bwhat are your opening hours\b/i,
      /\bwhat are your hours\b/i,

      /\bwhat time do you open\b/i,
      /\bwhat time does your shop open\b/i,
      /\bwhat time does mectec open\b/i,

      /\bwhat time do you close\b/i,
      /\bwhat time does your shop close\b/i,
      /\bwhat time does mectec close\b/i,

      /\bwhen do you open\b/i,
      /\bwhen does your shop open\b/i,
      /\bwhen does mectec open\b/i,

      /\bwhen do you close\b/i,
      /\bwhen does your shop close\b/i,
      /\bwhen does mectec close\b/i,

      /\bwhen are you open\b/i,
      /\bwhen is your shop open\b/i,

      /\bshop timings\b/i,
      /\bshop timing\b/i,
      /\bshop hours\b/i,
      /\bshop opening hours\b/i,

      /\bopening hours\b/i,
      /\bopening time\b/i,
      /\bclosing hours\b/i,
      /\bclosing time\b/i,

      /\bstore timings\b/i,
      /\bstore hours\b/i,

      /\bwhen are you available\b/i,
      /\bwhat time are you open\b/i,
      /\bwhat time are you available\b/i,

      /\bare you open\b/i,
      /\bare you open today\b/i,

      /\btimings\b/i,
      /\btiming\b/i,
      /\bhours\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* CONTACT                                                                */
  /* ---------------------------------------------------------------------- */

  {
    intent: "contact",
    patterns: [
      /\bhow can i contact\b/i,
      /\bhow do i contact\b/i,
      /\bhow to contact\b/i,

      /\bhow can i reach\b/i,
      /\bhow do i reach\b/i,
      /\bhow to reach\b/i,

      /\bwhere can i contact\b/i,
      /\bwhere do i contact\b/i,
      /\bwhere can i reach\b/i,

      /\bcontact you\b/i,
      /\bcontact mectec\b/i,
      /\bcontact us\b/i,

      /\bget in touch\b/i,
      /\breach mectec\b/i,

      /\bcontact information\b/i,
      /\bcontact details\b/i,

      /\bphone number\b/i,
      /\bphone\b/i,
      /\btelephone\b/i,

      /\bemail address\b/i,
      /\bemail\b/i,

      /\bwhatsapp\b/i,
      /\bwhatsapp number\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* PROJECT REQUEST                                                        */
  /* ---------------------------------------------------------------------- */

  {
    intent: "project_request",
    patterns: [
      /\brequest a project\b/i,
      /\brequest project\b/i,
      /\bproject request\b/i,

      /\bsubmit a project\b/i,
      /\bsubmit project\b/i,
      /\bsubmit my project\b/i,
      /\bsubmit my request\b/i,

      /\bsend a project request\b/i,
      /\bsend my project request\b/i,

      /\bplace a project request\b/i,

      /\bget a project made\b/i,
      /\bget my project made\b/i,
      /\bwant a project made\b/i,
      /\bneed a project made\b/i,

      /\bwhere is the project request form\b/i,
      /\bwhere is the request form\b/i,

      /\bhow can i request\b/i,
      /\bhow do i request\b/i,
      /\bhow to request\b/i,

      /\bhow can i submit\b/i,
      /\bhow do i submit\b/i,
      /\bhow to submit\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* PROJECT REQUIREMENTS                                                    */
  /* ---------------------------------------------------------------------- */

  {
    intent: "project_requirements",
    patterns: [
      /\bwhat information.*project\b/i,
      /\bwhat details.*project\b/i,
      /\bwhat information.*request\b/i,
      /\bwhat details.*request\b/i,

      /\bwhat should i include.*project\b/i,
      /\bwhat should i provide.*project\b/i,

      /\bwhat do you need.*project\b/i,
      /\bwhat do you need.*request\b/i,

      /\bproject requirements\b/i,
      /\bproject details\b/i,

      /\bwhat information do i need to provide\b/i,
      /\bwhat do i need to provide\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* PROJECT REQUEST                                                        */
  /* ---------------------------------------------------------------------- */

  {
    intent: "project_request",
    patterns: [
      /\bcan i order\b/i,
      /\bcan i request\b/i,
      /\bcan i submit\b/i,

      /\bcan i get\b.*\bproject\b/i,
      /\bcan i have\b.*\bproject\b/i,

      /\bi want to order\b/i,
      /\bi want to request\b/i,
      /\bi want to submit\b/i,

      /\bi need to order\b/i,
      /\bi need to request\b/i,
      /\bi need to submit\b/i,

      /\bi want\b.*\bproject\b/i,
      /\bi need\b.*\bproject\b/i,

      /\border\b.*\bproject\b/i,
      /\brequest\b.*\bproject\b/i,
      /\bsubmit\b.*\bproject\b/i,

      /\bplace an order\b/i,
      /\bplace a project order\b/i,

      /\border a project\b/i,
      /\brequest a project\b/i,
      /\bsubmit a project\b/i,

      /\bhow can i order\b/i,
      /\bhow do i order\b/i,
      /\bhow can i request\b/i,
      /\bhow do i request\b/i,

      /\bwhere can i order\b/i,
      /\bwhere do i order\b/i,
      /\bwhere can i request\b/i,
      /\bwhere do i request\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* PRICING                                                                */
  /* ---------------------------------------------------------------------- */

  {
    intent: "pricing",
    patterns: [
      /\bhow much\b/i,
      /\bhow expensive\b/i,

      /\bwhat is the price\b/i,
      /\bwhats the price\b/i,
      /\bwhat's the price\b/i,

      /\bprice of\b/i,
      /\bpricing\b/i,

      /\bcost of\b/i,
      /\bproject cost\b/i,
      /\bproject price\b/i,

      /\bbudget\b/i,
      /\bcharges\b/i,
      /\bcharge\b/i,

      /\bhow much does .* cost\b/i,
      /\bhow much would .* cost\b/i,

      /\bhow much for\b/i,
      /\bprice for\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* TIMELINE                                                               */
  /* ---------------------------------------------------------------------- */

  {
    intent: "timeline",
    patterns: [
      /\bhow long\b/i,
      /\bhow much time\b/i,

      /\bwhen can you make\b/i,
      /\bwhen can you build\b/i,
      /\bwhen can you complete\b/i,

      /\bwhen will you make\b/i,
      /\bwhen will you build\b/i,
      /\bwhen will you complete\b/i,

      /\bhow soon\b/i,
      /\bturnaround\b/i,
      /\bdeadline\b/i,

      /\bdelivery time\b/i,
      /\bcompletion time\b/i,
      /\btime required\b/i,

      /\bhow many days\b/i,
      /\bhow many weeks\b/i,

      /\bwhen can my project be ready\b/i,
      /\bwhen will my project be ready\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* AVAILABILITY                                                            */
  /* ---------------------------------------------------------------------- */

  {
    intent: "availability",
    patterns: [
      /\bis .* available\b/i,
      /\bare .* available\b/i,

      /\bdo you have\b/i,
      /\bdo you currently have\b/i,
      /\bdo you keep\b/i,

      /\bin stock\b/i,
      /\bavailable right now\b/i,
      /\bavailable now\b/i,

      /\bavailability\b/i,
      /\bin your stock\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* QUANTITY                                                               */
  /* ---------------------------------------------------------------------- */

  {
    intent: "quantity",
    patterns: [
      /\bhow many\b/i,
      /\bhow much .* do i need\b/i,
      /\bhow many .* do i need\b/i,

      /\bquantity\b/i,
      /\bnumber of\b/i,
      /\bhow many pieces\b/i,
      /\bhow many units\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* TROUBLESHOOTING                                                         */
  /* ---------------------------------------------------------------------- */

  {
    intent: "troubleshooting",
    patterns: [
      /\bnot working\b/i,
      /\bdoesnt work\b/i,
      /\bdoesn't work\b/i,

      /\bdidnt work\b/i,
      /\bdidn't work\b/i,

      /\bnot turning on\b/i,
      /\bnot responding\b/i,

      /\bproblem with\b/i,
      /\bproblem in\b/i,

      /\bissue with\b/i,
      /\bissue in\b/i,

      /\berror with\b/i,
      /\berror in\b/i,

      /\btroubleshoot\b/i,
      /\btroubleshooting\b/i,

      /\bwhy is .* not working\b/i,
      /\bwhy isnt .* working\b/i,
      /\bwhy isn't .* working\b/i,

      /\bnot functioning\b/i,
      /\bmalfunction\b/i,
      /\bfailed\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* COMPARISON                                                             */
  /* ---------------------------------------------------------------------- */

  {
    intent: "comparison",
    patterns: [
      /\bvs\b/i,
      /\bversus\b/i,
      /\bdifference between\b/i,
      /\bdifference of\b/i,

      /\bcompare\b/i,
      /\bcomparison\b/i,

      /\bwhich one is different\b/i,
      /\bwhats the difference\b/i,
      /\bwhat is the difference\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* COMPATIBILITY                                                           */
  /* ---------------------------------------------------------------------- */

  {
    intent: "compatibility",
    patterns: [
      /\bcompatible with\b/i,
      /\bwork with\b/i,
      /\bworks with\b/i,

      /\bcan .* work with\b/i,
      /\bcan .* be used with\b/i,

      /\bconnect .* to\b/i,
      /\bconnect .* with\b/i,

      /\bcompatible\b/i,
      /\bcompatibility\b/i,

      /\bcan i use .* with\b/i,
      /\bcan .* connect to\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* REQUIREMENTS                                                            */
  /* ---------------------------------------------------------------------- */

  {
    intent: "requirements",
    patterns: [
      /\bwhat components\b/i,
      /\bwhat parts\b/i,
      /\bwhat hardware\b/i,

      /\bwhat do i need\b/i,
      /\bwhat will i need\b/i,

      /\bwhat is required\b/i,
      /\brequirements\b/i,

      /\bparts needed\b/i,
      /\bcomponents needed\b/i,

      /\bwhat should i buy\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* CAPABILITY                                                              */
  /* ---------------------------------------------------------------------- */

  {
    intent: "capability",
    patterns: [
      /\bcan you build\b/i,
      /\bcan you make\b/i,

      /\bcan mectec build\b/i,
      /\bcan mectec make\b/i,

      /\bdo you build\b/i,
      /\bdo you make\b/i,
      /\bdo you offer\b/i,

      /\bcan you create\b/i,
      /\bcan you develop\b/i,

      /\bbuild .* project\b/i,
      /\bmake .* project\b/i,

      /\bdo you provide\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* PURPOSE                                                                */
  /* ---------------------------------------------------------------------- */

  {
    intent: "purpose",
    patterns: [
      /\bwhat is .* used for\b/i,
      /\bwhat are .* used for\b/i,

      /\bwhat can .* do\b/i,
      /\bwhat does .* do\b/i,

      /\bwhy use\b/i,
      /\buses of\b/i,
      /\buse cases\b/i,

      /\bpurpose of\b/i,
      /\bwhat is the purpose\b/i,

      /\bwhere is .* used\b/i,
      /\bwhere are .* used\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* DEFINITION                                                              */
  /* ---------------------------------------------------------------------- */

  {
    intent: "definition",
    patterns: [
      /\bwhat is\b/i,
      /\bwhat are\b/i,

      /\bwhat does .* mean\b/i,
      /\bdefine\b/i,
      /\bdefinition of\b/i,

      /\bexplain\b/i,
      /\bexplain to me\b/i,

      /\btell me about\b/i,
      /\binformation about\b/i,

      /\bi want to know about\b/i,
      /\bi want to know more about\b/i,

      /\bwhat exactly is\b/i,
      /\bwhat exactly are\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* SOURCE                                                                  */
  /* ---------------------------------------------------------------------- */

  {
    intent: "source",
    patterns: [
      /\bwhere can i buy\b/i,
      /\bwhere to buy\b/i,

      /\bwhere do i get\b/i,
      /\bwhere can i get\b/i,

      /\bsource\b/i,
      /\bsupplier\b/i,

      /\bbuy\b/i,
      /\bpurchase\b/i,
      /\bget\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* PROCEDURE                                                               */
  /* ---------------------------------------------------------------------- */

  /*
   * GENERIC PROCEDURE MUST STAY NEAR THE END.
   *
   * Otherwise:
   *
   * "How can I contact you?"
   *
   * would incorrectly become PROCEDURE.
   */

  {
    intent: "procedure",
    patterns: [
      /\bhow to\b/i,
      /\bhow do i\b/i,
      /\bhow can i\b/i,
      /\bhow should i\b/i,

      /\bsteps to\b/i,
      /\bstep by step\b/i,

      /\bhow does .* work\b/i,
      /\bhow do .* work\b/i,

      /\bprocedure\b/i,
      /\bprocess\b/i,
      /\bmethod\b/i,

      /\bhow can .* be programmed\b/i,
      /\bhow do i program\b/i,
      /\bhow to program\b/i,
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* GENERAL                                                                 */
  /* ---------------------------------------------------------------------- */

  {
    intent: "general",
    patterns: [
      /\bmectec\b/i,
      /\byour website\b/i,
      /\babout mectec\b/i,
      /\bwhat does mectec do\b/i,
    ],
  },
];

/* ==========================================================================
   TOPIC ALIASES
   ========================================================================== */

const TOPIC_ALIASES: Record<string, string[]> = {
  arduino: ["arduino", "ardunio", "ardino", "ardiuno", "arduiono", "arduinoo"],

  esp32: ["esp32", "esp 32", "esp", "espressif"],

  esp8266: ["esp8266", "esp 8266"],

  rfid: ["rfid", "rfid reader", "rfid card", "rfid tag", "rfid reader module"],

  pcb: ["pcb", "printed circuit board", "circuit board"],

  sensor: ["sensor", "sensors"],

  motor: ["motor", "motors", "dc motor"],

  servo: ["servo", "servos", "servo motor"],

  relay: ["relay", "relays"],

  resistor: ["resistor", "resistors"],

  capacitor: ["capacitor", "capacitors"],

  battery: ["battery", "batteries"],

  component: [
    "component",
    "components",
    "electronic component",
    "electronic components",
  ],

  module: ["module", "modules"],

  firmware: ["firmware", "firmwares"],

  microcontroller: [
    "microcontroller",
    "microcontrollers",
    "micro controller",
    "micro controllers",
  ],

  electronics: ["electronics", "electronic"],

  automation: ["automation", "automated", "automating"],

  iot: ["iot", "internet of things"],

  project: ["project", "projects"],

  website: ["website", "web site", "websites"],

  pricing: ["price", "pricing", "cost", "budget", "charge", "charges"],
};

/* ==========================================================================
   NORMALIZATION
   ========================================================================== */

function normalize(value: string): string {
  let result = value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = result.split(" ").filter(Boolean);

  result = words
    .map((word) => SPELLING_ALIASES[word] ?? TYPO_ALIASES[word] ?? word)
    .join(" ");

  return result;
}

function singularize(word: string): string {
  if (word.length <= 3) {
    return word;
  }

  if (word.endsWith("ies")) {
    return `${word.slice(0, -3)}y`;
  }

  if (word.endsWith("ses")) {
    return word.slice(0, -2);
  }

  if (word.endsWith("s") && !word.endsWith("ss")) {
    return word.slice(0, -1);
  }

  return word;
}

function tokenize(value: string): string[] {
  return normalize(value).split(/\s+/).filter(Boolean).map(singularize);
}

/* ==========================================================================
   FUZZY WORD NORMALIZATION
   ========================================================================== */

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array<number>(b.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function tokenSimilarity(question: string, candidate: string): number {
  const questionTokens = tokenize(question).filter(
    (token) => !STOP_WORDS.has(token),
  );

  const candidateTokens = tokenize(candidate).filter(
    (token) => !STOP_WORDS.has(token),
  );

  if (!questionTokens.length || !candidateTokens.length) {
    return 0;
  }

  let totalScore = 0;

  for (const questionToken of questionTokens) {
    let bestScore = 0;

    for (const candidateToken of candidateTokens) {
      if (questionToken === candidateToken) {
        bestScore = 1;
        break;
      }

      if (questionToken.length >= 4 && candidateToken.length >= 4) {
        const distance = levenshtein(questionToken, candidateToken);

        const maxLength = Math.max(questionToken.length, candidateToken.length);

        const similarity = 1 - distance / maxLength;

        if (similarity > bestScore) {
          bestScore = similarity;
        }
      }
    }

    if (bestScore >= 0.72) {
      totalScore += bestScore;
    }
  }

  return totalScore / questionTokens.length;
}

/* ==========================================================================
   INTENT DETECTION
   ========================================================================== */

function detectIntent(question: string): HelpIntent | null {
  const normalizedQuestion = normalize(question);

  for (const group of INTENT_PATTERNS) {
    if (group.patterns.some((pattern) => pattern.test(normalizedQuestion))) {
      return group.intent;
    }
  }

  return null;
}

/* ==========================================================================
   TOPIC DETECTION
   ========================================================================== */

function detectTopic(question: string): string | null {
  const normalizedQuestion = normalize(question);

  let bestTopic: string | null = null;
  let bestLength = 0;

  for (const [topic, aliases] of Object.entries(TOPIC_ALIASES)) {
    for (const alias of aliases) {
      const normalizedAlias = normalize(alias);

      if (
        normalizedQuestion.includes(normalizedAlias) &&
        normalizedAlias.length > bestLength
      ) {
        bestTopic = topic;
        bestLength = normalizedAlias.length;
      }
    }
  }

  return bestTopic;
}

/* ==========================================================================
   DETERMINISTIC WEBSITE NAVIGATION
   ========================================================================== */

const NAVIGATION_ACTIONS = {
  home: { label: "Go to Home", path: "/" },
  projects: { label: "View Projects", path: "/projects" },
  projectRequest: { label: "Open Project Request", path: "/request-project" },
  about: { label: "About MECTEC", path: "/about" },
  contact: { label: "Contact MECTEC", path: "/contact" },
  trackRequest: { label: "Track My Request", path: "/track-request" },
  blog: { label: "View Blog", path: "/blog" },
} satisfies Record<string, HelpAction>;

function resolveWebsiteNavigation(question: string): HelpResponse | null {
  const normalized = normalize(question);

  if (
    /\bwhere should i contact mectec about (a|my|the) project\b/.test(normalized) ||
    /\bcontact mectec\b.*\babout (a|my|the) project\b/.test(normalized) ||
    /\b(project request|request a project|submit (a|my) project)\b/.test(normalized) ||
    /\b(can|could|how) (can|could|do) i\b.*\b(request|submit|order|commission)\b.*\bproject\b/.test(normalized) ||
    /\b(i|we)\b.*\b(want|need|would like)\b.*\b(project|custom project)\b/.test(normalized) ||
    /\b(can you|can mectec|does mectec)\b.*\b(build|make|create|develop)\b.*\bproject\b/.test(normalized)
  ) {
    return {
      answer: "You can submit a new or custom project through MECTEC's Project Request page.",
      action: NAVIGATION_ACTIONS.projectRequest,
    };
  }

  if (
    /\b(track|check|follow)\b.*\b(request|submission|project)\b/.test(normalized) ||
    /\b(request|submission|project)\b.*\b(status|tracking)\b/.test(normalized) ||
    /\bhow can i track (my )?(request|project)\b/.test(normalized)
  ) {
    return {
      answer: "If you have already submitted a request, you can check its status on the request-tracking page.",
      action: NAVIGATION_ACTIONS.trackRequest,
    };
  }

  if (
    /\bhow (can|do) i (contact|reach)\b/.test(normalized) ||
    /\bhow to (contact|reach)\b/.test(normalized) ||
    /\bwhere can i (contact|reach)\b/.test(normalized) ||
    /\b(get in touch|reach mectec|contact mectec|contact us)\b/.test(normalized) ||
    /\bcontact (information|details|page|form)\b/.test(normalized) ||
    /\bcontact form\b/.test(normalized) ||
    /\b(phone number|email address|whatsapp number)\b/.test(normalized)
  ) {
    return {
      answer: "You can use MECTEC's Contact page to find the available ways to get in touch with MECTEC.",
      action: NAVIGATION_ACTIONS.contact,
    };
  }

  if (
    /\btell me about mectec\b/.test(normalized) ||
    /\blearn (more )?about mectec\b/.test(normalized) ||
    /\babout mectec\b/.test(normalized) ||
    /\bwho is mectec\b/.test(normalized) ||
    /\bwhat is mectec\b/.test(normalized) ||
    /\bwhat does mectec do\b/.test(normalized)
  ) {
    return {
      answer: "You can learn more about MECTEC, its purpose and its work on the About page.",
      action: NAVIGATION_ACTIONS.about,
    };
  }

  if (
    /\b(show|see|view|browse|explore)\b.*\b(projects?|portfolio)\b/.test(normalized) ||
    /\b(previous|featured|completed)\s+projects\b/.test(normalized) ||
    /\bproject portfolio\b/.test(normalized) ||
    /\bwhat projects does mectec (have|show|showcase)\b/.test(normalized)
  ) {
    return {
      answer: "You can explore MECTEC's projects and portfolio on the Projects page.",
      action: NAVIGATION_ACTIONS.projects,
    };
  }

  if (
    /\bblog\b/.test(normalized) ||
    /\bwhere can i (read|find)\b.*\b(posts?|articles?)\b/.test(normalized) ||
    /\b(read|view|find)\b.*\barticles?\b/.test(normalized)
  ) {
    return {
      answer: "You can read MECTEC's articles and updates on the Blog page.",
      action: NAVIGATION_ACTIONS.blog,
    };
  }

  if (
    /\b(go|back|return) to (the )?home\b/.test(normalized) ||
    /\bhomepage\b/.test(normalized) ||
    /\bhome page\b/.test(normalized)
  ) {
    return {
      answer: "You can return to the MECTEC homepage here.",
      action: NAVIGATION_ACTIONS.home,
    };
  }

  return null;
}

/* ==========================================================================
   GREETING DETECTION
   ========================================================================== */

function isGreeting(question: string): boolean {
  const normalizedQuestion = normalize(question);

  return (
    /^(hi|hello|hey)$/.test(normalizedQuestion) ||
    /\bassalam o alaikum\b/.test(normalizedQuestion) ||
    /\bassalamu alaikum\b/.test(normalizedQuestion) ||
    /\bassalamualaikum\b/.test(normalizedQuestion) ||
    /\bgood morning\b/.test(normalizedQuestion) ||
    /\bgood afternoon\b/.test(normalizedQuestion) ||
    /\bgood evening\b/.test(normalizedQuestion)
  );
}

function getGreetingResponse(): HelpResponse {
  return {
    answer:
      "Wa Alaikum Assalam! Hi — I’m the MECTEC Help Assistant. You can ask me about projects, electronics, components, pricing, availability, timelines, the request process, or contacting MECTEC.",
  };
}

/* ==========================================================================
   MECTEC DATE/TIME UTILITIES
   ========================================================================== */

/*
 * We deliberately use Asia/Karachi instead of the visitor's browser timezone.
 *
 * That means:
 *
 * A visitor in the USA asking "Is MECTEC open right now?"
 *
 * still gets MECTEC's actual Pakistan business time.
 */

function getMectecDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: MECTEC_TIME_ZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const hour = Number(get("hour"));
  const minute = Number(get("minute"));

  return {
    weekday: get("weekday"),
    year: Number(get("year")),
    month: get("month"),
    day: Number(get("day")),
    hour,
    minute,
  };
}

function formatMectecTime(date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: MECTEC_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatMectecDate(date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: MECTEC_TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getMectecWeekdayIndex(date = new Date()): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: MECTEC_TIME_ZONE,
    weekday: "short",
  }).format(date);

  const indexes: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return indexes[weekday] ?? 0;
}

/* ==========================================================================
   DYNAMIC DATE/TIME QUESTION DETECTION
   ========================================================================== */

function asksCurrentStatus(question: string): boolean {
  const normalized = normalize(question);

  const asksNow =
    /\bright now\b/.test(normalized) ||
    /\bcurrently\b/.test(normalized) ||
    /\bat the moment\b/.test(normalized) ||
    /\bcurrently open\b/.test(normalized) ||
    /\bcurrently closed\b/.test(normalized) ||
    /\bopen now\b/.test(normalized) ||
    /\bclosed now\b/.test(normalized);

  const asksToday =
    /\btoday\b/.test(normalized) || /\btonight\b/.test(normalized);

  const asksOpenStatus =
    /\bare you open\b/.test(normalized) ||
    /\bis your shop open\b/.test(normalized) ||
    /\bis mectec open\b/.test(normalized) ||
    /\bshop open\b/.test(normalized) ||
    /\bshop closed\b/.test(normalized) ||
    /\bopen today\b/.test(normalized) ||
    /\bopen right now\b/.test(normalized) ||
    /\bopen currently\b/.test(normalized);

  return (asksNow || asksToday) && asksOpenStatus;
}

/* ==========================================================================
   DYNAMIC BUSINESS-HOURS ANSWER
   ========================================================================== */

function getDynamicHoursResponse(question: string): HelpResponse | null {
  const normalizedQuestion = normalize(question);

  if (!asksCurrentStatus(normalizedQuestion)) {
    return null;
  }

  const now = new Date();

  const parts = getMectecDateParts(now);

  const weekdayIndex = getMectecWeekdayIndex(now);

  const dayName = parts.weekday;
  const currentTime = formatMectecTime(now);

  /* ---------------------------------------------------------------------- */
  /* FRIDAY                                                                  */
  /* ---------------------------------------------------------------------- */

  if (MECTEC_CLOSED_WEEKDAYS.has(weekdayIndex)) {
    return {
      answer:
        `MECTEC is currently closed. It is ${dayName}, ${currentTime} in Pakistan, and Friday is officially a closed day. ` +
        `MECTEC may sometimes operate on Fridays during unusually high workloads or urgent work. ` +
        `Please contact MECTEC directly to check Friday availability.`,
      action: HELP_ACTIONS.contact,
    };
  }

  const currentMinutes = parts.hour * 60 + parts.minute;

  const openingMinutes = MECTEC_OPEN_HOUR * 60;

  const closingMinutes = MECTEC_CLOSE_HOUR * 60;

  /* ---------------------------------------------------------------------- */
  /* BEFORE OPENING                                                          */
  /* ---------------------------------------------------------------------- */

  if (currentMinutes < openingMinutes) {
    return {
      answer:
        `MECTEC is currently closed. It is ${dayName}, ${currentTime} in Pakistan, which is before our normal opening time of 10:00 AM. ` +
        `We normally open today at 10:00 AM and remain open until 10:00 PM.`,
    };
  }

  /* ---------------------------------------------------------------------- */
  /* AFTER CLOSING                                                           */
  /* ---------------------------------------------------------------------- */

  if (currentMinutes >= closingMinutes) {
    return {
      answer:
        `MECTEC is currently closed. It is ${dayName}, ${currentTime} in Pakistan, which is after our normal closing time of 10:00 PM. ` +
        `We normally open again at 10:00 AM.`,
    };
  }

  /* ---------------------------------------------------------------------- */
  /* CURRENTLY OPEN                                                          */
  /* ---------------------------------------------------------------------- */

  return {
    answer: `Yes, MECTEC is currently open. It is ${dayName}, ${currentTime} in Pakistan, which is within our normal 10:00 AM to 10:00 PM business hours today.`,
  };
}

/* ==========================================================================
   DATE QUESTIONS                                                          
   ========================================================================== */

function getDateResponse(question: string): HelpResponse | null {
  const normalized = normalize(question);

  const asksDate =
    /\bwhat date is it\b/.test(normalized) ||
    /\bwhat is todays date\b/.test(normalized) ||
    /\bwhat is the date today\b/.test(normalized) ||
    /\bwhat date today\b/.test(normalized) ||
    /\bdate today\b/.test(normalized);

  const asksDay =
    /\bwhat day is it\b/.test(normalized) ||
    /\bwhat day today\b/.test(normalized) ||
    /\bwhat day is today\b/.test(normalized) ||
    /\bwhich day is today\b/.test(normalized);

  if (!asksDate && !asksDay) {
    return null;
  }

  const now = new Date();

  if (asksDate && asksDay) {
    return {
      answer: `In Pakistan, today is ${formatMectecDate(now)}.`,
    };
  }

  if (asksDay) {
    const parts = getMectecDateParts(now);

    return {
      answer: `Today is ${parts.weekday} in Pakistan.`,
    };
  }

  return {
    answer: `Today's date in Pakistan is ${formatMectecDate(now)}.`,
  };
}

/* ==========================================================================
   SPECIAL NAVIGATION QUESTIONS
   ========================================================================== */

function handleDirectQuestion(question: string): HelpResponse | null {
  const normalizedQuestion = normalize(question);

  /* Contact */

  if (
    /\bhow can i contact\b/.test(normalizedQuestion) ||
    /\bhow do i contact\b/.test(normalizedQuestion) ||
    /\bhow to contact\b/.test(normalizedQuestion) ||
    /\bcontact you\b/.test(normalizedQuestion) ||
    /\bcontact mectec\b/.test(normalizedQuestion) ||
    /\bget in touch\b/.test(normalizedQuestion) ||
    /\bhow can i reach you\b/.test(normalizedQuestion)
  ) {
    return {
      answer:
        "You can contact MECTEC through the Contact page. Send your message there and MECTEC can respond to your inquiry directly.",
      action: HELP_ACTIONS.contact,
    };
  }

  /* Project request */

  if (
    /\bhow can i submit\b/.test(normalizedQuestion) ||
    /\bhow do i submit\b/.test(normalizedQuestion) ||
    /\bhow to submit\b/.test(normalizedQuestion) ||
    /\bsubmit my request\b/.test(normalizedQuestion) ||
    /\brequest a project\b/.test(normalizedQuestion) ||
    /\bproject request\b/.test(normalizedQuestion)
  ) {
    return {
      answer:
        "You can submit your project through the MECTEC Project Request form. Fill in the available project details and submit your request.",
      action: HELP_ACTIONS.project_request,
    };
  }

  return null;
}

/* ==========================================================================
   CATEGORY INFERENCE
   ========================================================================== */

function getCategoryIntent(question: string): HelpIntent | null {
  const normalized = normalize(question);

  if (
    /\bprice\b/.test(normalized) ||
    /\bpricing\b/.test(normalized) ||
    /\bcost\b/.test(normalized) ||
    /\bbudget\b/.test(normalized)
  ) {
    return "pricing";
  }

  if (
    /\bavailable\b/.test(normalized) ||
    /\bin stock\b/.test(normalized) ||
    /\bdo you have\b/.test(normalized)
  ) {
    return "availability";
  }

  if (
    /\bnot working\b/.test(normalized) ||
    /\bproblem\b/.test(normalized) ||
    /\bissue\b/.test(normalized) ||
    /\berror\b/.test(normalized)
  ) {
    return "troubleshooting";
  }

  if (
    /\bused for\b/.test(normalized) ||
    /\buses of\b/.test(normalized) ||
    /\bpurpose\b/.test(normalized)
  ) {
    return "purpose";
  }

  if (
    /\bvs\b/.test(normalized) ||
    /\bversus\b/.test(normalized) ||
    /\bdifference\b/.test(normalized) ||
    /\bcompare\b/.test(normalized)
  ) {
    return "comparison";
  }

  if (
    /\bcompatible\b/.test(normalized) ||
    /\bwork with\b/.test(normalized) ||
    /\bconnect\b/.test(normalized)
  ) {
    return "compatibility";
  }

  if (
    /\bhow to\b/.test(normalized) ||
    /\bhow do i\b/.test(normalized) ||
    /\bhow can i\b/.test(normalized) ||
    /\bprogram\b/.test(normalized)
  ) {
    return "procedure";
  }

  if (
    /\bwhat is\b/.test(normalized) ||
    /\bwhat are\b/.test(normalized) ||
    /\bdefine\b/.test(normalized) ||
    /\bexplain\b/.test(normalized)
  ) {
    return "definition";
  }

  return null;
}

/* ==========================================================================
   ENTRY TOPICS                                                             */
/* ========================================================================== */

function getEntryTopics(entry: HelpEntry): string[] {
  const combined = [
    entry.question,
    ...entry.variations,
    ...entry.keywords,
  ].join(" ");

  const normalized = normalize(combined);

  return Object.entries(TOPIC_ALIASES)
    .filter(([, aliases]) =>
      aliases.some((alias) => normalized.includes(normalize(alias))),
    )
    .map(([topic]) => topic);
}

/* ==========================================================================
   ENTRY SIMILARITY                                                         */
/* ========================================================================== */

function entrySimilarity(question: string, entry: HelpEntry): number {
  const candidates = [entry.question, ...entry.variations, ...entry.keywords];

  return Math.max(
    ...candidates.map((candidate) => tokenSimilarity(question, candidate)),
  );
}

/* ==========================================================================
   BEST ENTRY                                                               */
/* ========================================================================== */

function findBestEntry(
  question: string,
  detectedIntent: HelpIntent | null,
  detectedTopic: string | null,
): HelpEntry | null {
  const normalizedQuestion = normalize(question);

  if (!normalizedQuestion) {
    return null;
  }

  let candidates = HELP_KNOWLEDGE;

  /* ---------------------------------------------------------------------- */
  /* HARD INTENT FILTER                                                     */
  /* ---------------------------------------------------------------------- */

  if (detectedIntent) {
    const intentCandidates = HELP_KNOWLEDGE.filter(
      (entry) => entry.intent === detectedIntent,
    );

    if (intentCandidates.length > 0) {
      candidates = intentCandidates;
    }
  }

  /* ---------------------------------------------------------------------- */
  /* TOPIC FILTER                                                            */
  /* ---------------------------------------------------------------------- */

  if (detectedTopic) {
    const topicCandidates = candidates.filter((entry) =>
      getEntryTopics(entry).includes(detectedTopic),
    );

    /*
     * Only restrict if the knowledge base actually contains
     * an entry for that topic.
     */
    if (topicCandidates.length > 0) {
      candidates = topicCandidates;
    }
  }

  /* ---------------------------------------------------------------------- */
  /* SCORE                                                                   */
  /* ---------------------------------------------------------------------- */

  const scored = candidates
    .map((entry) => {
      const similarity = entrySimilarity(normalizedQuestion, entry);

      const topicMatch =
        detectedTopic && getEntryTopics(entry).includes(detectedTopic)
          ? 0.25
          : 0;

      const priorityBonus = (entry.priority ?? 0) * 0.01;

      return {
        entry,
        score: similarity + topicMatch + priorityBonus,
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.entry ?? null;
}

/* ==========================================================================
   MAIN RESPONSE ENGINE                                                     */
/* ========================================================================== */

function createHelpResponse(question: string): HelpResponse | null {
  const normalizedQuestion = normalize(question);

  if (!normalizedQuestion) {
    return null;
  }

  /* ---------------------------------------------------------------------- */
  /* Direct navigation questions                                             */
  /* ---------------------------------------------------------------------- */

  /* Deterministic website navigation runs before fuzzy knowledge matching. */
  const navigationResponse = resolveWebsiteNavigation(normalizedQuestion);

  if (navigationResponse) {
    return navigationResponse;
  }

  const directResponse = handleDirectQuestion(normalizedQuestion);

  if (directResponse) {
    return directResponse;
  }

  /* ---------------------------------------------------------------------- */
  /* Dynamic date questions                                                  */
  /* ---------------------------------------------------------------------- */

  const dateResponse = getDateResponse(normalizedQuestion);

  if (dateResponse) {
    return dateResponse;
  }

  /* ---------------------------------------------------------------------- */
  /* Dynamic business-hours questions                                        */
  /* ---------------------------------------------------------------------- */

  const dynamicHoursResponse = getDynamicHoursResponse(normalizedQuestion);

  if (dynamicHoursResponse) {
    return dynamicHoursResponse;
  }

  /* ---------------------------------------------------------------------- */
  /* Greeting                                                                */
  /* ---------------------------------------------------------------------- */

  if (isGreeting(normalizedQuestion)) {
    return getGreetingResponse();
  }

  /* ---------------------------------------------------------------------- */
  /* Detect intent + topic                                                   */
  /* ---------------------------------------------------------------------- */

  let detectedIntent = detectIntent(normalizedQuestion);

  const detectedTopic = detectTopic(normalizedQuestion);

  /* ---------------------------------------------------------------------- */
  /* Infer intent if pattern matching found nothing                          */
  /* ---------------------------------------------------------------------- */

  if (!detectedIntent) {
    detectedIntent = getCategoryIntent(normalizedQuestion);
  }

  /* ---------------------------------------------------------------------- */
  /* Find matching knowledge entry                                           */
  /* ---------------------------------------------------------------------- */

  const bestEntry = findBestEntry(
    normalizedQuestion,
    detectedIntent,
    detectedTopic,
  );

  if (!bestEntry) {
    return null;
  }

  /* ---------------------------------------------------------------------- */
  /* Confidence protection                                                   */
  /* ---------------------------------------------------------------------- */

  if (!detectedIntent && !detectedTopic) {
    const similarity = entrySimilarity(normalizedQuestion, bestEntry);

    if (similarity < 0.42) {
      return null;
    }
  }

  return {
    answer: bestEntry.answer,

    action: bestEntry.intent ? HELP_ACTIONS[bestEntry.intent] : undefined,
  };
}

/* ==========================================================================
   FALLBACK                                                                
   ========================================================================== */

const FALLBACK =
  "I don't have a specific answer for that yet. You can use the Project Request form or contact MECTEC directly for a real reply.";

/* ==========================================================================
   PUBLIC API                                                              
   ========================================================================== */

export function findHelpAnswer(question: string): HelpResponse {
  const response = createHelpResponse(question);

  return (
    response ?? {
      answer: FALLBACK,
    }
  );
}
