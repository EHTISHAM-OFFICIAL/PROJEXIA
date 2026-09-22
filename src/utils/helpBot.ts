import { HELP_KNOWLEDGE } from "../constants/helpKnowledge";
import type { HelpEntry, HelpIntent } from "../constants/help/types";

/* =========================================================
   PUBLIC TYPES
   ========================================================= */

export interface HelpAction {
  label: string;
  path: string;
}

export interface HelpResponse {
  answer: string;
  action?: HelpAction;
  suggestedQuestions?: string[];
  relatedQuestions?: string[];
}

/* =========================================================
   INTERNAL TYPES
   ========================================================= */

interface HelpContext {
  lastTopic: string | null;
  lastIntent: HelpIntent | null;
  lastEntryId: string | null;
  lastQuestion: string | null;
  turnsSinceTopic: number;
}

interface PhraseMatch {
  phrase: string;
  coverage: number;
  exact: boolean;
}

type QuestionMode =
  | "definition"
  | "capability"
  | "how_it_works"
  | "how_to_use"
  | "requirements"
  | "projects"
  | "procedure"
  | "contact"
  | "project_request"
  | "pricing"
  | "timeline"
  | "availability"
  | "quantity"
  | "troubleshooting"
  | "comparison"
  | "compatibility"
  | "source"
  | "location"
  | "hours"
  | "purpose"
  | "general";

type NavigationIntent =
  | "home"
  | "projects"
  | "blog"
  | "request_project"
  | "about"
  | "contact"
  | "track_request";

interface NavigationMatch {
  intent: NavigationIntent;
  answer: string;
  action: HelpAction;
  suggestedQuestions: string[];
}

interface KnowledgeMeta {
  entry: HelpEntry;
  question: string;
  normalizedQuestion: string;
  meaningfulTokens: string[];
  tokenSet: Set<string>;
  topics: Set<string>;
  category: string;
  priority: number;
}

interface ScoredEntry {
  entry: HelpEntry;
  score: number;
  similarity: number;
  questionSimilarity: number;
  keywordSimilarity: number;
  questionPhraseCoverage: number;
  keywordPhraseCoverage: number;
  topicMatch: boolean;
  topicConflict: boolean;
  intentMatch: boolean;
  intentConflict: boolean;
  modeMatch: boolean;
  modeConflict: boolean;
  exactQuestionMatch: boolean;
  exactVariationMatch: boolean;
  matchedQuestionPhrase: string | null;
  matchedKeywordPhrase: string | null;
}

/* =========================================================
   CONFIGURATION
   ========================================================= */

const FALLBACK_ANSWER =
  "I don't have a specific answer for that yet. You can use the Project Request form or contact MECTEC directly for a real reply.";

const MECTEC_TIME_ZONE = "Asia/Karachi";
const MECTEC_OPEN_HOUR = 10;
const MECTEC_CLOSE_HOUR = 22;

const MIN_KEYWORD_TOKEN_LENGTH = 4;

const W = {
  questionSimilarity: 3.2,
  keywordSimilarity: 0.55,

  exactQuestionBonus: 18,
  exactVariationBonus: 16,

  strongQuestionPhraseBonus: 5,
  partialQuestionPhraseBonus: 1.5,
  keywordPhraseBonus: 0.8,

  intentMatchBonus: 4,
  topicMatchBonus: 4,

  modeMatchBonus: 7,
  strongModeMatchBonus: 10,

  followUpTopicBonus: 12,
  followUpIntentBonus: 5,
  contextEntryBonus: 8,
  followUpShortBonus: 10,
  sameTopicShortFollowUpBonus: 18,

  procedureMatchBonus: 2,
  projectRequestMatchBonus: 5,
  requirementsMatchBonus: 2,
  purposeMatchBonus: 2,
  definitionMatchBonus: 2,
  troubleshootingMatchBonus: 2,
  comparisonMatchBonus: 2,
  compatibilityMatchBonus: 2,
  capabilityMatchBonus: 4,

  intentConflictPenalty: 8,
  topicConflictPenalty: 8,
  modeConflictPenalty: 6,

  incompatibleIntentPenalty: 40,
  incompatibleTopicPenalty: 35,

  priorityMultiplier: 0.02,

  minimumSimilarity: 0.28,
  strongSimilarity: 0.78,

  confidenceWithIntentAndTopic: 0.48,
  confidenceWithIntent: 0.58,
  confidenceWithTopic: 0.56,
  confidenceWithoutSignals: 0.72,

  minimumScoreMargin: 0.08,
  strongScoreMargin: 0.22,
} as const;

/* =========================================================
   REAL WEBSITE ROUTES
   ========================================================= */

const ROUTES = {
  home: "/",
  projects: "/projects",
  blog: "/blog",
  requestProject: "/request-project",
  about: "/about",
  contact: "/contact",
  trackRequest: "/track-request",
} as const;

/* =========================================================
   NAVIGATION ACTIONS
   ========================================================= */

const NAVIGATION_ACTIONS: Record<NavigationIntent, HelpAction> = {
  home: {
    label: "Go to Home",
    path: ROUTES.home,
  },

  projects: {
    label: "View Projects",
    path: ROUTES.projects,
  },

  blog: {
    label: "View Blog",
    path: ROUTES.blog,
  },

  request_project: {
    label: "Open Project Request",
    path: ROUTES.requestProject,
  },

  about: {
    label: "About MECTEC",
    path: ROUTES.about,
  },

  contact: {
    label: "Contact MECTEC",
    path: ROUTES.contact,
  },

  track_request: {
    label: "Track My Request",
    path: ROUTES.trackRequest,
  },
};

/* =========================================================
   KNOWLEDGE ACTIONS
   ========================================================= */

const HELP_ACTIONS: Partial<Record<HelpIntent, HelpAction>> = {
  project_request: NAVIGATION_ACTIONS.request_project,
  contact: NAVIGATION_ACTIONS.contact,
};

/* =========================================================
   INTENT PRIORITY
   ========================================================= */

const INTENT_PRIORITY: Partial<Record<HelpIntent, number>> = {
  greeting: 8,

  project_request: 9,
  contact: 9,
  location: 8,
  hours: 8,

  troubleshooting: 8,
  compatibility: 8,
  comparison: 8,

  pricing: 7,
  timeline: 7,
  availability: 7,
  source: 7,

  project_requirements: 6,
  requirements: 6,

  capability: 6,
  procedure: 6,
  purpose: 5,
  definition: 4,

  quantity: 4,
  general: 1,
};

/* =========================================================
   SESSION CONTEXT
   ========================================================= */

let helpContext: HelpContext = {
  lastTopic: null,
  lastIntent: null,
  lastEntryId: null,
  lastQuestion: null,
  turnsSinceTopic: 0,
};

export function resetHelpContext(): void {
  helpContext = {
    lastTopic: null,
    lastIntent: null,
    lastEntryId: null,
    lastQuestion: null,
    turnsSinceTopic: 0,
  };
}

function clearTechnicalContext(): void {
  helpContext = {
    lastTopic: null,
    lastIntent: null,
    lastEntryId: null,
    lastQuestion: null,
    turnsSinceTopic: 0,
  };
}

/* =========================================================
   SPELLING / TYPO NORMALIZATION
   ========================================================= */

const SPELLING_ALIASES: Record<string, string> = {
  ardunio: "arduino",
  ardino: "arduino",
  arduiono: "arduino",
  arduinoo: "arduino",
  ardiuno: "arduino",
  arduinoos: "arduino",
  ardunios: "arduino",
  arduion: "arduino",

  esp: "esp32",
  esps: "esp32",
  esp32s: "esp32",
  esp_32: "esp32",

  esp8266s: "esp8266",
  esp_8266: "esp8266",

  rfids: "rfid",
  rfi: "rfid",
  rfidreader: "rfid",
  rfidreaders: "rfid",
  rfidcard: "rfid",
  rfidcards: "rfid",
  rfidtag: "rfid",
  rfidtags: "rfid",
  rfidr: "rfid",

  pcbs: "pcb",
  pcbboard: "pcb",
  pcbboards: "pcb",

  microcontrollers: "microcontroller",
  firmwares: "firmware",

  projects: "project",
  websites: "website",

  mectc: "mectec",
  metec: "mectec",
  mectecx: "mectec",

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
};

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

  compatble: "compatible",
  compatibl: "compatible",
};

/* =========================================================
   STOP WORDS
   ========================================================= */

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
  "has",
  "have",
  "how",
  "i",
  "if",
  "in",
  "is",
  "it",
  "its",
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
  "we",
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

const ANAPHORA_TOKENS = new Set([
  "it",
  "its",
  "this",
  "that",
  "they",
  "them",
  "these",
  "those",
  "he",
  "she",
]);

/* =========================================================
   NORMALIZATION
   ========================================================= */

function normalize(value: string): string {
  const lowered = value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!lowered) {
    return "";
  }

  return lowered
    .split(" ")
    .filter(Boolean)
    .map((word) => SPELLING_ALIASES[word] ?? TYPO_ALIASES[word] ?? word)
    .join(" ");
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
  const normalized = normalize(value);

  if (!normalized) {
    return [];
  }

  return normalized.split(/\s+/).filter(Boolean).map(singularize);
}

function meaningfulTokens(value: string): string[] {
  return tokenize(value).filter((token) => !STOP_WORDS.has(token));
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsWholePhrase(
  normalizedText: string,
  normalizedPhrase: string,
): boolean {
  if (!normalizedPhrase) {
    return false;
  }

  const escaped = escapeRegex(normalizedPhrase).replace(/\s+/g, "\\s+");

  return new RegExp(`\\b${escaped}\\b`, "i").test(normalizedText);
}

/* =========================================================
   LEVENSHTEIN / TOKEN SIMILARITY
   ========================================================= */

function levenshtein(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  if (!a.length) {
    return b.length;
  }

  if (!b.length) {
    return a.length;
  }

  const previous = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j += 1) {
    previous[j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];

    previous[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const saved = previous[j];

      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        diagonal + cost,
      );

      diagonal = saved;
    }
  }

  return previous[b.length];
}

function wordSimilarity(a: string, b: string): number {
  if (a === b) {
    return 1;
  }

  if (a.length < 4 || b.length < 4) {
    return 0;
  }

  const distance = levenshtein(a, b);

  const maxLength = Math.max(a.length, b.length);

  return 1 - distance / maxLength;
}

function tokenSimilarity(question: string, candidate: string): number {
  const questionTokens = meaningfulTokens(question);

  const candidateTokens = meaningfulTokens(candidate);

  if (!questionTokens.length || !candidateTokens.length) {
    return 0;
  }

  let matched = 0;

  for (const questionToken of questionTokens) {
    let best = 0;

    for (const candidateToken of candidateTokens) {
      if (questionToken === candidateToken) {
        best = 1;
        break;
      }

      best = Math.max(best, wordSimilarity(questionToken, candidateToken));
    }

    if (best >= 0.78) {
      matched += best;
    }
  }

  if (!matched) {
    return 0;
  }

  const coverage = matched / questionTokens.length;

  const density = matched / Math.max(candidateTokens.length, 1);

  return coverage * 0.8 + density * 0.2;
}

/* =========================================================
   PHRASE MATCHING
   ========================================================= */

function findPhraseMatch(
  normalizedQuestion: string,
  candidates: readonly string[],
  options: {
    allowShortTokens: boolean;
  },
): PhraseMatch | null {
  let best: PhraseMatch | null = null;

  for (const candidate of candidates) {
    const normalizedCandidate = normalize(candidate);

    if (!normalizedCandidate) {
      continue;
    }

    const candidateTokens = meaningfulTokens(normalizedCandidate);

    if (!candidateTokens.length) {
      continue;
    }

    if (
      !options.allowShortTokens &&
      candidateTokens.length === 1 &&
      candidateTokens[0].length < MIN_KEYWORD_TOKEN_LENGTH
    ) {
      continue;
    }

    if (normalizedQuestion === normalizedCandidate) {
      return {
        phrase: normalizedCandidate,
        coverage: 1,
        exact: true,
      };
    }

    const escaped = escapeRegex(normalizedCandidate).replace(/\s+/g, "\\s+");

    const pattern = new RegExp(`\\b${escaped}\\b`, "i");

    if (!pattern.test(normalizedQuestion)) {
      continue;
    }

    const questionTokens = meaningfulTokens(normalizedQuestion);

    if (!questionTokens.length) {
      continue;
    }

    const coverage = Math.min(
      candidateTokens.length / questionTokens.length,
      1,
    );

    if (!best || coverage > best.coverage) {
      best = {
        phrase: normalizedCandidate,
        coverage,
        exact: false,
      };
    }
  }

  return best;
}

/* =========================================================
   TECHNICAL SUBJECT TOPICS
   ========================================================= */

const TOPIC_ALIASES: Record<string, string[]> = {
  arduino: ["arduino"],

  esp32: ["esp32", "esp 32", "espressif"],

  esp8266: ["esp8266", "esp 8266"],

  rfid: ["rfid", "rfid reader", "rfid card", "rfid tag", "rc522", "mfrc522"],

  nfc: ["nfc", "near field communication"],

  pcb: ["pcb", "printed circuit board", "circuit board", "gerber"],

  pcbdesign: ["pcb design", "pcb layout", "gerber"],

  sensor: ["sensor", "sensors", "dht", "ds18b20", "mpu6050", "bmp280", "pir"],

  motor: ["motor", "dc motor", "stepper", "bldc", "brushless"],

  servo: ["servo", "servo motor"],

  relay: ["relay", "relays", "solid state relay", "ssr"],

  resistor: ["resistor", "resistors"],

  capacitor: ["capacitor", "capacitors"],

  inductor: ["inductor", "inductors"],

  diode: ["diode", "diodes"],

  transistor: ["transistor", "mosfet", "bjt"],

  battery: ["battery", "batteries", "lipo", "li ion", "18650"],

  component: [
    "component",
    "components",
    "electronic component",
    "electronic components",
  ],

  module: ["module", "modules", "breakout"],

  firmware: ["firmware", "embedded software"],

  microcontroller: ["microcontroller", "mcu", "micro controller"],

  electronics: ["electronics", "electronic"],

  automation: ["automation", "automated", "automating"],

  iot: ["iot", "internet of things"],
};

const TOPIC_PRIORITY: Record<string, number> = {
  arduino: 5,
  esp32: 5,
  esp8266: 5,
  rfid: 5,

  nfc: 4,

  pcbdesign: 4,
  pcb: 4,

  servo: 4,

  microcontroller: 3,
  sensor: 3,
  motor: 3,
  firmware: 3,
  iot: 3,
  automation: 3,

  electronics: 2,
  component: 2,
  module: 2,
  relay: 2,
  resistor: 2,
  capacitor: 2,
  inductor: 2,
  diode: 2,
  transistor: 2,
  battery: 2,
};

function detectTopic(question: string): string | null {
  const normalized = normalize(question);

  if (!normalized) {
    return null;
  }

  const questionTokens = meaningfulTokens(normalized);

  let bestTopic: string | null = null;
  let bestScore = 0;

  for (const [topic, aliases] of Object.entries(TOPIC_ALIASES)) {
    let score = 0;

    /*
     * Exact topic name gets a very large boost.
     *
     * This is important for:
     *
     * servo != generic motor
     * esp32 != generic microcontroller
     * rfid != generic electronics
     */
    if (normalized === normalize(topic)) {
      score += 25;
    }

    for (const alias of aliases) {
      const normalizedAlias = normalize(alias);

      if (!normalizedAlias) {
        continue;
      }

      if (normalized === normalizedAlias) {
        score += 12;
        continue;
      }

      if (containsWholePhrase(normalized, normalizedAlias)) {
        const aliasTokens = meaningfulTokens(normalizedAlias);

        score += aliasTokens.length > 1 ? 6 : 4;

        continue;
      }

      const aliasTokens = meaningfulTokens(normalizedAlias);

      if (!aliasTokens.length) {
        continue;
      }

      let matched = 0;

      for (const aliasToken of aliasTokens) {
        const found = questionTokens.some(
          (questionToken) =>
            questionToken === aliasToken ||
            wordSimilarity(questionToken, aliasToken) >= 0.88,
        );

        if (found) {
          matched += 1;
        }
      }

      if (matched) {
        score += (matched / aliasTokens.length) * 2;
      }
    }

    score *= 1 + (TOPIC_PRIORITY[topic] ?? 0) * 0.1;

    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestScore >= 2 ? bestTopic : null;
}

/* =========================================================
   ENTRY TOPIC INDEX
   ========================================================= */

const ENTRY_TOPICS_CACHE = new Map<string, Set<string>>();

function buildEntryTopics(entry: HelpEntry): Set<string> {
  const cached = ENTRY_TOPICS_CACHE.get(entry.id);

  if (cached) {
    return cached;
  }

  const text = [
    entry.question,
    ...(entry.variations ?? []),
    ...(entry.keywords ?? []),
    entry.category ?? "",
  ].join(" ");

  const normalized = normalize(text);

  const topics = new Set<string>();

  for (const [topic, aliases] of Object.entries(TOPIC_ALIASES)) {
    for (const alias of aliases) {
      if (containsWholePhrase(normalized, normalize(alias))) {
        topics.add(topic);
        break;
      }
    }
  }

  ENTRY_TOPICS_CACHE.set(entry.id, topics);

  return topics;
}

function getEntryTopics(entry: HelpEntry): Set<string> {
  return buildEntryTopics(entry);
}

/* =========================================================
   INTENT DETECTION
   ========================================================= */

interface IntentPatternGroup {
  intent: HelpIntent;
  patterns: RegExp[];
}

const INTENT_PATTERNS: IntentPatternGroup[] = [
  {
    intent: "greeting",
    patterns: [
      /^hi$/i,
      /^hello$/i,
      /^hey$/i,
      /^hiya$/i,
      /^hey there$/i,
      /^hello there$/i,
      /\bassalam\b/i,
      /\bsalam\b/i,
      /\baoa\b/i,
      /\bgood morning\b/i,
      /\bgood afternoon\b/i,
      /\bgood evening\b/i,
      /\bhow are you\b/i,
    ],
  },

  {
    intent: "hours",
    patterns: [
      /\b(shop|store|opening|closing|business|working)\s+(hours|timing|timings|time)\b/i,
      /\bwhat time do you (open|close)\b/i,
      /\bwhen (do|does) (you|mectec|your shop) (open|close)\b/i,
      /\bare you open\b/i,
      /\bwhen are you open\b/i,
      /\bwhat time are you open\b/i,
      /\bopening hours\b/i,
      /\bclosing hours\b/i,
    ],
  },

  {
    intent: "contact",
    patterns: [
      /\bhow (can|do) i\s+(contact|reach|get in touch)\b/i,
      /\bhow to\s+(contact|reach|get in touch)\b/i,
      /\bwhere (can|should) i\s+(contact|reach)\b/i,
      /\bwhere can i contact\b/i,
      /\bwhere should i contact\b/i,
      /\bwho should i contact\b/i,
      /\bcontact (you|mectec|us)\b/i,
      /\bcontact (information|details)\b/i,
      /\bhow do i get in touch\b/i,
      /\bhow can i reach\b/i,
      /\bphone number\b/i,
      /\bemail address\b/i,
      /\bwhatsapp\b/i,
    ],
  },

  {
    intent: "location",
    patterns: [
      /\bwhere (is|are) (mectec|your shop|you located)\b/i,
      /\bwhat is your (address|location)\b/i,
      /\bwhere can i find\b/i,
      /\bhow do i (find|reach) (mectec|your shop)\b/i,
    ],
  },

  {
    intent: "project_requirements",
    patterns: [
      /\bwhat (information|details) (do i need|should i (provide|include)|do you need)\b/i,
      /\bproject (requirements|details)\b/i,
      /\bwhat do i need to (provide|submit|send)\b/i,
      /\bwhat information do you need for (a|my) project\b/i,
    ],
  },

  {
    intent: "project_request",
    patterns: [
      /\b(can|how (can|do)) i\s+(order|request|submit|place)\b/i,
      /\bi (want|need|would like) to (order|request|submit)\b/i,
      /\b(get|have) (a|my) project (made|built|done)\b/i,
      /\bproject request\b/i,
      /\brequest (a|my) project\b/i,
      /\border (a|my) project\b/i,
      /\bsubmit (a|my) project\b/i,
      /\bcan you build (a|my) project\b/i,
      /\bcan mectec build (a|my) project\b/i,
      /\bi want a project\b/i,
      /\bcommission (a|my) project\b/i,
    ],
  },

  {
    intent: "pricing",
    patterns: [
      /\bhow much\b/i,
      /\bwhat('s| is) the (price|pricing|cost|budget|charge|charges)\b/i,
      /\b(price|cost) (of|for)\b/i,
      /\bhow much does\b/i,
      /\bhow much would\b/i,
    ],
  },

  {
    intent: "timeline",
    patterns: [
      /\bhow long\b/i,
      /\bhow (many|much) (days|weeks|time)\b/i,
      /\bturnaround\b/i,
      /\bwhen (will|can) (you|my project)\b/i,
      /\b(project|delivery|completion|lead)\s+(time|duration)\b/i,
      /\bdeadline\b/i,
    ],
  },

  {
    intent: "availability",
    patterns: [
      /\bis .+ available\b/i,
      /\bare .+ available\b/i,
      /\bdo you (have|keep|stock)\b/i,
      /\bin stock\b/i,
      /\bavailability\b/i,
    ],
  },

  {
    intent: "quantity",
    patterns: [
      /\bhow many\b/i,
      /\bhow many .+ do i need\b/i,
      /\bquantity\b/i,
      /\bnumber of\b/i,
    ],
  },

  {
    intent: "troubleshooting",
    patterns: [
      /\bnot working\b/i,
      /\b(doesnt|doesn't|didnt|didn't) work\b/i,
      /\bnot turning on\b/i,
      /\bnot responding\b/i,
      /\b(problem|issue|error) (with|in)\b/i,
      /\btroubleshoot(ing)?\b/i,
      /\bwhy (is|isn't|isnt) .+ working\b/i,
      /\bnot functioning\b/i,
      /\bmalfunction(ing)?\b/i,
      /\bfailed\b/i,
    ],
  },

  {
    intent: "comparison",
    patterns: [
      /\bvs\b/i,
      /\bversus\b/i,
      /\bdifference (between|of)\b/i,
      /\bcompare\b/i,
      /\bwhat('s| is) the difference\b/i,
    ],
  },

  {
    intent: "compatibility",
    patterns: [
      /\bcompatible with\b/i,
      /\b(work|works) with\b/i,
      /\bcan .+ (work|be used) with\b/i,
      /\bconnect .+ (to|with)\b/i,
      /\bcompatib(le|ility)\b/i,
      /\bcan i use .+ with\b/i,
    ],
  },

  {
    intent: "requirements",
    patterns: [
      /\bwhat (components|parts|hardware)\b/i,
      /\bwhat (do|will) i need\b/i,
      /\bwhat is required\b/i,
      /\brequirements\b/i,
      /\b(parts|components) needed\b/i,
      /\bwhat should i buy\b/i,
      /\bwhat can i connect\b/i,
      /\bwhat can i use with\b/i,
    ],
  },

  {
    intent: "capability",
    patterns: [
      /\bwhat can it do\b/i,
      /\bwhat can .+ do\b/i,
      /\bwhat can i do with\b/i,
      /\bwhat is .+ capable of\b/i,
      /\bwhat can .+ control\b/i,
      /\bwhat projects can i (make|build|create)\b/i,
      /\bwhat projects can .+ (make|build|create)\b/i,
      /\bwhat can i build with\b/i,
      /\bwhat can i make with\b/i,
      /\bwhat can .+ build\b/i,
      /\bwhat can .+ make\b/i,
      /\bwhat are .+ capabilities\b/i,
      /\bcapabilities of\b/i,
    ],
  },

  {
    intent: "purpose",
    patterns: [
      /\bwhat (is|are) .+ used for\b/i,
      /\bwhat is .+ for\b/i,
      /\bwhat are .+ for\b/i,
      /\bwhy use\b/i,
      /\buses of\b/i,
      /\bpurpose of\b/i,
      /\bwhere is .+ used\b/i,
    ],
  },

  {
    intent: "definition",
    patterns: [
      /\bwhat (is|are)\b/i,
      /\bwhat does .+ mean\b/i,
      /\bdefine\b/i,
      /\bdefinition of\b/i,
      /\bexplain\b/i,
      /\btell me about\b/i,
    ],
  },

  {
    intent: "source",
    patterns: [
      /\bwhere (can i|to) buy\b/i,
      /\bwhere (do|can) i get\b/i,
      /\b(supplier|source|purchase)\b/i,
    ],
  },

  {
    intent: "procedure",
    patterns: [
      /\bhow (to|do i|can i|should i|would i)\b/i,
      /\bhow (to|can i) (make|build|create|program|code)\b/i,
      /\bstep(s)? (to|for)\b/i,
      /\bstep by step\b/i,
      /\bhow (does|do) .+ work\b/i,
      /\bhow (is|are) .+ (made|built)\b/i,
      /\b(procedure|process|method)\b/i,
      /\bproject (tutorial|guide|steps|instructions)\b/i,
      /\bhow do i use\b/i,
      /\bhow to use\b/i,
      /\bhow can i use\b/i,
      /\bhow do i program\b/i,
    ],
  },

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

/* =========================================================
   INTENT DETECTOR
   ========================================================= */

function detectIntent(question: string): HelpIntent | null {
  const normalized = normalize(question);

  if (!normalized) {
    return null;
  }

  const scores = new Map<HelpIntent, number>();

  for (const group of INTENT_PATTERNS) {
    let score = 0;

    for (const pattern of group.patterns) {
      const match = normalized.match(pattern);

      if (!match) {
        continue;
      }

      const text = match[0].trim();

      let signal = 1;

      if (text.length >= 8) {
        signal += 0.5;
      }

      if (text.length >= 15) {
        signal += 0.5;
      }

      if (text.length >= 25) {
        signal += 0.5;
      }

      score += signal;
    }

    if (score > 0) {
      const priorityBonus = (INTENT_PRIORITY[group.intent] ?? 0) * 0.4;

      scores.set(
        group.intent,
        (scores.get(group.intent) ?? 0) + score + priorityBonus,
      );
    }
  }

  if (!scores.size) {
    return null;
  }

  /* ---------------------------------------------------------
     HIGH-CONFIDENCE OVERRIDES
     --------------------------------------------------------- */

  /*
   * PROJECT REQUEST MUST BE CHECKED BEFORE GENERIC CONTACT.
   *
   * "Where should I contact MECTEC about a project?"
   *
   * is a project-request/navigation question.
   */
  if (
    /\bwhere should i contact mectec about (a|my|the) project\b/i.test(
      normalized,
    ) ||
    /\bwhere can i contact mectec about (a|my|the) project\b/i.test(
      normalized,
    ) ||
    /\bhow do i contact mectec about (a|my|the) project\b/i.test(normalized) ||
    /\bhow can i contact mectec about (a|my|the) project\b/i.test(normalized)
  ) {
    scores.set("project_request", (scores.get("project_request") ?? 0) + 40);

    scores.set("contact", Math.max(0, (scores.get("contact") ?? 0) - 10));
  }

  /*
   * Explicit project-request language.
   */
  if (
    /\b(can|how (can|do)) i\s+(order|request|submit|place)\b/i.test(
      normalized,
    ) ||
    /\b(request|submit|order|commission)\b.*\bproject\b/i.test(normalized) ||
    /\bproject\b.*\b(request|submit|order|commission)\b/i.test(normalized) ||
    /\bcan you build (a|my|the) project\b/i.test(normalized)
  ) {
    scores.set("project_request", (scores.get("project_request") ?? 0) + 30);
  }

  /*
   * CAPABILITY IS SEPARATE FROM PURPOSE.
   *
   * "What can it do?"
   *
   * means capability.
   *
   * "What is it used for?"
   *
   * means purpose.
   */
  if (
    /\bwhat can it do\b/i.test(normalized) ||
    /\bwhat can .+ do\b/i.test(normalized) ||
    /\bwhat can i do with\b/i.test(normalized) ||
    /\bwhat is .+ capable of\b/i.test(normalized) ||
    /\bwhat can .+ control\b/i.test(normalized) ||
    /\bwhat projects can i\b/i.test(normalized) ||
    /\bwhat projects can .+ (make|build|create)\b/i.test(normalized) ||
    /\bwhat can i build with\b/i.test(normalized) ||
    /\bwhat can i make with\b/i.test(normalized)
  ) {
    scores.set("capability", (scores.get("capability") ?? 0) + 30);

    scores.set("purpose", Math.max(0, (scores.get("purpose") ?? 0) - 12));
  }

  /*
   * REQUIREMENTS.
   */
  if (
    /\bwhat components\b/i.test(normalized) ||
    /\bwhat parts\b/i.test(normalized) ||
    /\bwhat hardware\b/i.test(normalized) ||
    /\bwhat can i connect\b/i.test(normalized) ||
    /\bwhat do i need\b/i.test(normalized)
  ) {
    scores.set("requirements", (scores.get("requirements") ?? 0) + 22);
  }

  /*
   * HOW IT WORKS.
   *
   * This remains HelpIntent "procedure" for compatibility
   * with the existing HelpIntent type, but QuestionMode
   * later distinguishes it from actual instructions.
   */
  if (
    /\bhow (does|do) .+ work\b/i.test(normalized) ||
    /\bhow does it work\b/i.test(normalized) ||
    /\bhow does this work\b/i.test(normalized) ||
    /\bhow does that work\b/i.test(normalized) ||
    /\bworking principle\b/i.test(normalized) ||
    /\bprinciple of operation\b/i.test(normalized)
  ) {
    scores.set("procedure", (scores.get("procedure") ?? 0) + 20);
  }

  /*
   * HOW TO USE.
   */
  if (
    /\bhow do i use\b/i.test(normalized) ||
    /\bhow to use\b/i.test(normalized) ||
    /\bhow can i use\b/i.test(normalized) ||
    /\bhow should i use\b/i.test(normalized) ||
    /\bhow do i program\b/i.test(normalized)
  ) {
    scores.set("procedure", (scores.get("procedure") ?? 0) + 20);
  }

  /*
   * PRICING.
   */
  if (/\bhow much\b/i.test(normalized)) {
    scores.set("pricing", (scores.get("pricing") ?? 0) + 15);
  }

  /*
   * TROUBLESHOOTING.
   */
  if (
    /\bnot working\b/i.test(normalized) ||
    /\b(troubleshoot|debug|error)\b/i.test(normalized)
  ) {
    scores.set("troubleshooting", (scores.get("troubleshooting") ?? 0) + 15);
  }

  /*
   * COMPARISON.
   */
  if (/\b(vs|versus|difference between|compare)\b/i.test(normalized)) {
    scores.set("comparison", (scores.get("comparison") ?? 0) + 15);
  }

  let best: HelpIntent | null = null;

  let bestScore = -Infinity;

  for (const [intent, score] of scores.entries()) {
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return best;
}

/* =========================================================
   QUESTION MODE
   ========================================================= */

function detectQuestionMode(
  question: string,
  detectedIntent: HelpIntent | null,
): QuestionMode {
  const normalized = normalize(question);

  /*
   * Business modes.
   */
  if (detectedIntent === "contact") {
    return "contact";
  }

  if (detectedIntent === "project_request") {
    return "project_request";
  }

  if (detectedIntent === "pricing") {
    return "pricing";
  }

  if (detectedIntent === "timeline") {
    return "timeline";
  }

  if (detectedIntent === "availability") {
    return "availability";
  }

  if (detectedIntent === "quantity") {
    return "quantity";
  }

  if (detectedIntent === "troubleshooting") {
    return "troubleshooting";
  }

  if (detectedIntent === "comparison") {
    return "comparison";
  }

  if (detectedIntent === "compatibility") {
    return "compatibility";
  }

  if (detectedIntent === "source") {
    return "source";
  }

  if (detectedIntent === "location") {
    return "location";
  }

  if (detectedIntent === "hours") {
    return "hours";
  }

  /*
   * ---------------------------------------------------------
   * HOW IT WORKS
   * ---------------------------------------------------------
   */

  if (
    /\bhow (does|do) .+ work\b/i.test(normalized) ||
    /\bhow does it work\b/i.test(normalized) ||
    /\bhow does this work\b/i.test(normalized) ||
    /\bhow does that work\b/i.test(normalized) ||
    /\bhow it works\b/i.test(normalized) ||
    /\bhow this works\b/i.test(normalized) ||
    /\bhow that works\b/i.test(normalized) ||
    /\bhow .+ function\b/i.test(normalized) ||
    /\bworking principle\b/i.test(normalized) ||
    /\bprinciple of operation\b/i.test(normalized) ||
    /\bhow .+ operate\b/i.test(normalized)
  ) {
    return "how_it_works";
  }

  /*
   * ---------------------------------------------------------
   * HOW TO USE
   * ---------------------------------------------------------
   */

  if (
    /\bhow do i use\b/i.test(normalized) ||
    /\bhow to use\b/i.test(normalized) ||
    /\bhow can i use\b/i.test(normalized) ||
    /\bhow should i use\b/i.test(normalized) ||
    /\bhow do i program\b/i.test(normalized)
  ) {
    return "how_to_use";
  }

  /*
   * ---------------------------------------------------------
   * PROJECTS / CAPABILITY
   * ---------------------------------------------------------
   */

  if (
    /\bwhat projects can i\b/i.test(normalized) ||
    /\bwhat projects can .+ (make|build|create)\b/i.test(normalized) ||
    /\bwhat can i build with\b/i.test(normalized) ||
    /\bwhat can i make with\b/i.test(normalized) ||
    /\bwhat can i create with\b/i.test(normalized)
  ) {
    return "projects";
  }

  if (
    detectedIntent === "capability" ||
    /\bwhat can it do\b/i.test(normalized) ||
    /\bwhat can .+ do\b/i.test(normalized) ||
    /\bwhat can .+ control\b/i.test(normalized) ||
    /\bwhat is .+ capable of\b/i.test(normalized)
  ) {
    return "capability";
  }

  /*
   * ---------------------------------------------------------
   * REQUIREMENTS
   * ---------------------------------------------------------
   */

  if (
    detectedIntent === "requirements" ||
    detectedIntent === "project_requirements" ||
    /\bwhat components\b/i.test(normalized) ||
    /\bwhat parts\b/i.test(normalized) ||
    /\bwhat hardware\b/i.test(normalized) ||
    /\bwhat do i need\b/i.test(normalized) ||
    /\bwhat can i connect\b/i.test(normalized)
  ) {
    return "requirements";
  }

  if (detectedIntent === "purpose") {
    return "purpose";
  }

  if (detectedIntent === "definition") {
    return "definition";
  }

  if (detectedIntent === "procedure") {
    return "procedure";
  }

  return "general";
}

/* =========================================================
   INTENT COMPATIBILITY
   ========================================================= */

const ALLOWED_INTENT_MATCHES: Partial<Record<HelpIntent, HelpIntent[]>> = {
  /*
   * Business intents are intentionally strict.
   */
  contact: ["contact"],

  project_request: ["project_request"],

  pricing: ["pricing"],

  timeline: ["timeline"],

  troubleshooting: ["troubleshooting"],

  comparison: ["comparison"],

  compatibility: ["compatibility"],

  source: ["source"],

  location: ["location"],

  hours: ["hours"],

  availability: ["availability"],

  quantity: ["quantity"],

  /*
   * Project requirements can use general requirements
   * entries because those answers may contain the needed
   * information.
   */
  project_requirements: ["project_requirements", "requirements"],

  requirements: ["requirements", "project_requirements", "compatibility"],

  /*
   * Technical informational modes are intentionally flexible.
   */
  capability: ["capability", "purpose", "procedure"],

  purpose: ["purpose", "definition", "capability"],

  definition: ["definition", "general"],

  procedure: ["procedure", "capability"],

  general: ["general", "definition"],

  greeting: ["greeting"],
};

function isIntentAllowed(
  detectedIntent: HelpIntent | null,
  entryIntent: HelpIntent | undefined,
): boolean {
  if (!detectedIntent || !entryIntent) {
    return true;
  }

  const allowed = ALLOWED_INTENT_MATCHES[detectedIntent];

  if (!allowed) {
    return detectedIntent === entryIntent;
  }

  return allowed.includes(entryIntent);
}

function isStrictIntent(intent: HelpIntent | null): boolean {
  return (
    intent === "project_request" ||
    intent === "pricing" ||
    intent === "timeline" ||
    intent === "troubleshooting" ||
    intent === "comparison" ||
    intent === "compatibility" ||
    intent === "source" ||
    intent === "contact" ||
    intent === "location" ||
    intent === "hours" ||
    intent === "availability"
  );
}

/* =========================================================
   CONTEXT / FOLLOW-UP
   ========================================================= */

function hasAnaphora(question: string): boolean {
  return tokenize(question).some((token) => ANAPHORA_TOKENS.has(token));
}

function isShortConversationalQuestion(question: string): boolean {
  const tokens = meaningfulTokens(question);

  return (
    tokens.length <= 7 &&
    /^(what|which|how|can|could|does|do|is|are|where|why|when)\b/i.test(
      normalize(question),
    )
  );
}

function isLikelyFollowUp(
  question: string,
  explicitTopic: string | null = null,
): boolean {
  if (!helpContext.lastTopic) {
    return false;
  }

  /*
   * A clearly different explicit technical topic means
   * this is a new question.
   */
  if (explicitTopic && explicitTopic !== helpContext.lastTopic) {
    /*
     * Weak nouns such as "components" can describe
     * information being requested about the previous topic.
     */
    if (!(WEAK_FOLLOW_UP_TOPICS.has(explicitTopic) && hasAnaphora(question))) {
      return false;
    }
  }

  const normalized = normalize(question);

  if (!normalized) {
    return false;
  }

  if (hasAnaphora(normalized)) {
    return true;
  }

  if (
    /\b(for|about|of|with|from|on)\s+(it|this|that|them|these|those)\b/i.test(
      normalized,
    )
  ) {
    return true;
  }

  if (/\b(its|their)\b/i.test(normalized)) {
    return true;
  }

  /*
   * Short questions inherit context.
   *
   * Examples:
   *
   * What can it do?
   * How does it work?
   * What projects can I make with it?
   */
  if (isShortConversationalQuestion(normalized)) {
    return true;
  }

  return false;
}

const WEAK_FOLLOW_UP_TOPICS = new Set(["component", "module", "electronics"]);

function resolveContextTopic(
  question: string,
  explicitTopic: string | null,
  isFollowUp: boolean,
): string | null {
  if (
    explicitTopic &&
    isFollowUp &&
    helpContext.lastTopic &&
    WEAK_FOLLOW_UP_TOPICS.has(explicitTopic) &&
    hasAnaphora(question)
  ) {
    return helpContext.lastTopic;
  }

  if (explicitTopic) {
    return explicitTopic;
  }

  if (isFollowUp && helpContext.lastTopic) {
    return helpContext.lastTopic;
  }

  return null;
}

/* =========================================================
   KNOWLEDGE METADATA
   ========================================================= */

const KNOWLEDGE_META: KnowledgeMeta[] = HELP_KNOWLEDGE.map((entry) => {
  const question = entry.question.trim();

  const normalizedQuestion = normalize(question);

  const tokens = meaningfulTokens(question);

  return {
    entry,
    question,
    normalizedQuestion,
    meaningfulTokens: tokens,
    tokenSet: new Set(tokens),
    topics: getEntryTopics(entry),
    category: entry.category ?? "",
    priority: entry.priority ?? 0,
  };
});

const KNOWLEDGE_META_BY_ID = new Map(
  KNOWLEDGE_META.map((meta) => [meta.entry.id, meta]),
);

/* =========================================================
   ENTRY MODE INFERENCE
   ========================================================= */

function inferEntryMode(entry: HelpEntry): QuestionMode {
  const question = normalize(entry.question);

  const variations = (entry.variations ?? []).map(normalize);

  const combined = [question, ...variations].join(" ");

  /*
   * HOW IT WORKS
   */
  if (
    /\bhow (does|do) .+ work\b/i.test(combined) ||
    /\bhow does .+ work\b/i.test(combined) ||
    /\bworking principle\b/i.test(combined) ||
    /\bprinciple of operation\b/i.test(combined)
  ) {
    return "how_it_works";
  }

  /*
   * HOW TO USE
   */
  if (
    /\bhow do i use\b/i.test(combined) ||
    /\bhow to use\b/i.test(combined) ||
    /\bhow can i use\b/i.test(combined) ||
    /\bhow do i program\b/i.test(combined)
  ) {
    return "how_to_use";
  }

  /*
   * PROJECT CAPABILITY
   */
  if (
    /\bwhat projects can\b/i.test(combined) ||
    /\bwhat can i build\b/i.test(combined) ||
    /\bwhat can i make\b/i.test(combined) ||
    /\bwhat can i create\b/i.test(combined)
  ) {
    return "projects";
  }

  /*
   * REQUIREMENTS
   */
  if (
    /\bwhat components\b/i.test(combined) ||
    /\bwhat parts\b/i.test(combined) ||
    /\bwhat hardware\b/i.test(combined) ||
    /\bwhat can i connect\b/i.test(combined) ||
    /\bwhat do i need\b/i.test(combined)
  ) {
    return "requirements";
  }

  /*
   * CAPABILITY
   */
  if (
    /\bwhat can .+ do\b/i.test(combined) ||
    /\bwhat can it do\b/i.test(combined) ||
    /\bwhat is .+ capable of\b/i.test(combined) ||
    /\bcapabilities\b/i.test(combined)
  ) {
    return "capability";
  }

  /*
   * Business intents.
   */
  if (entry.intent === "project_request") {
    return "project_request";
  }

  if (entry.intent === "contact") {
    return "contact";
  }

  if (
    entry.intent === "requirements" ||
    entry.intent === "project_requirements"
  ) {
    return "requirements";
  }

  if (entry.intent === "capability") {
    return "capability";
  }

  if (entry.intent === "purpose") {
    return "purpose";
  }

  if (entry.intent === "definition") {
    return "definition";
  }

  if (entry.intent === "procedure") {
    return "procedure";
  }

  return (entry.intent as QuestionMode) ?? "general";
}

/* =========================================================
   MODE COMPATIBILITY
   ========================================================= */

function isModeCompatible(
  currentMode: QuestionMode,
  entry: HelpEntry,
): boolean {
  const entryMode = inferEntryMode(entry);

  if (currentMode === entryMode) {
    return true;
  }

  /*
   * Capability and project-capability answers can overlap.
   */
  if (
    currentMode === "capability" &&
    (entryMode === "projects" || entryMode === "purpose")
  ) {
    return true;
  }

  if (
    currentMode === "projects" &&
    (entryMode === "capability" || entryMode === "purpose")
  ) {
    return true;
  }

  /*
   * Requirements can sometimes be answered by compatibility
   * entries.
   */
  if (currentMode === "requirements" && entryMode === "compatibility") {
    return true;
  }

  /*
   * Procedure is allowed to overlap with actual usage.
   */
  if (
    currentMode === "procedure" &&
    (entryMode === "how_to_use" || entryMode === "how_it_works")
  ) {
    return true;
  }

  if (currentMode === "how_to_use" && entryMode === "procedure") {
    return true;
  }

  /*
   * IMPORTANT:
   *
   * how_it_works is NOT automatically compatible with
   * how_to_use.
   *
   * This is what prevents:
   *
   * "How does Arduino work?"
   *
   * from returning:
   *
   * "How do I use Arduino?"
   */
  if (currentMode === "how_it_works" && entryMode === "procedure") {
    return true;
  }

  return false;
}

/* =========================================================
   SCORING
   ========================================================= */

function scoreEntry(
  normalizedQuestion: string,
  detectedIntent: HelpIntent | null,
  detectedTopic: string | null,
  questionMode: QuestionMode,
  isFollowUp: boolean,
  entry: HelpEntry,
): ScoredEntry {
  const entryTopics = getEntryTopics(entry);

  const topicMatch = Boolean(detectedTopic && entryTopics.has(detectedTopic));

  const topicConflict = Boolean(
    detectedTopic && entryTopics.size > 0 && !topicMatch,
  );

  const intentMatch = Boolean(
    detectedIntent && entry.intent === detectedIntent,
  );

  const intentConflict = Boolean(
    detectedIntent &&
    entry.intent &&
    !isIntentAllowed(detectedIntent, entry.intent),
  );

  const modeMatch = isModeCompatible(questionMode, entry);

  const modeConflict =
    questionMode !== "general" &&
    !modeMatch &&
    (questionMode === "how_it_works" ||
      questionMode === "how_to_use" ||
      questionMode === "projects" ||
      questionMode === "requirements" ||
      questionMode === "contact" ||
      questionMode === "project_request" ||
      questionMode === "pricing" ||
      questionMode === "timeline" ||
      questionMode === "troubleshooting" ||
      questionMode === "comparison" ||
      questionMode === "compatibility");

  const questionCandidates = [entry.question, ...(entry.variations ?? [])];

  const keywordCandidates = entry.keywords ?? [];

  let questionSimilarity = 0;

  for (const candidate of questionCandidates) {
    questionSimilarity = Math.max(
      questionSimilarity,
      tokenSimilarity(normalizedQuestion, candidate),
    );
  }

  let keywordSimilarity = 0;

  for (const candidate of keywordCandidates) {
    keywordSimilarity = Math.max(
      keywordSimilarity,
      tokenSimilarity(normalizedQuestion, candidate),
    );
  }

  const questionPhrase = findPhraseMatch(
    normalizedQuestion,
    questionCandidates,
    {
      allowShortTokens: true,
    },
  );

  const keywordPhrase = findPhraseMatch(normalizedQuestion, keywordCandidates, {
    allowShortTokens: false,
  });

  const normalizedEntryQuestion = normalize(entry.question);

  const exactQuestionMatch = normalizedQuestion === normalizedEntryQuestion;

  const exactVariationMatch = (entry.variations ?? []).some(
    (variation) => normalizedQuestion === normalize(variation),
  );

  let score = questionSimilarity * W.questionSimilarity;

  score += keywordSimilarity * W.keywordSimilarity;

  if (exactQuestionMatch) {
    score += W.exactQuestionBonus;
  }

  if (exactVariationMatch) {
    score += W.exactVariationBonus;
  }

  if (questionPhrase?.coverage === 1) {
    score += W.strongQuestionPhraseBonus;
  } else if ((questionPhrase?.coverage ?? 0) >= 0.5) {
    score += W.partialQuestionPhraseBonus;
  }

  if (keywordPhrase) {
    score += W.keywordPhraseBonus;
  }

  if (topicMatch) {
    score += W.topicMatchBonus;
  }

  if (intentMatch) {
    score += W.intentMatchBonus;
  }

  if (modeMatch) {
    score += W.modeMatchBonus;

    if (
      questionMode === "how_it_works" ||
      questionMode === "how_to_use" ||
      questionMode === "projects"
    ) {
      score += W.strongModeMatchBonus;
    }
  }

  /*
   * Context bonuses.
   */
  if (isFollowUp) {
    if (topicMatch) {
      score += W.followUpTopicBonus;
    }

    if (intentMatch) {
      score += W.followUpIntentBonus;
    }

    if (helpContext.lastEntryId && helpContext.lastEntryId === entry.id) {
      score += W.contextEntryBonus;
    }

    if (meaningfulTokens(normalizedQuestion).length <= 6) {
      score += W.followUpShortBonus;
    }
  }

  /*
   * Intent-specific boosts.
   */
  if (detectedIntent === "procedure" && entry.intent === "procedure") {
    score += W.procedureMatchBonus;
  }

  if (
    detectedIntent === "project_request" &&
    entry.intent === "project_request"
  ) {
    score += W.projectRequestMatchBonus;
  }

  if (detectedIntent === "requirements" && entry.intent === "requirements") {
    score += W.requirementsMatchBonus;
  }

  if (
    detectedIntent === "project_requirements" &&
    (entry.intent === "project_requirements" || entry.intent === "requirements")
  ) {
    score += W.requirementsMatchBonus;
  }

  if (detectedIntent === "purpose" && entry.intent === "purpose") {
    score += W.purposeMatchBonus;
  }

  if (detectedIntent === "definition" && entry.intent === "definition") {
    score += W.definitionMatchBonus;
  }

  if (detectedIntent === "capability" && entry.intent === "capability") {
    score += W.capabilityMatchBonus;
  }

  if (
    detectedIntent === "troubleshooting" &&
    entry.intent === "troubleshooting"
  ) {
    score += W.troubleshootingMatchBonus;
  }

  if (detectedIntent === "comparison" && entry.intent === "comparison") {
    score += W.comparisonMatchBonus;
  }

  if (detectedIntent === "compatibility" && entry.intent === "compatibility") {
    score += W.compatibilityMatchBonus;
  }

  /*
   * Conflicts.
   */
  if (intentConflict) {
    score -= W.intentConflictPenalty;

    if (isStrictIntent(detectedIntent)) {
      score -= W.incompatibleIntentPenalty;
    }
  }

  if (topicConflict) {
    score -= W.topicConflictPenalty;

    if (detectedTopic) {
      score -= W.incompatibleTopicPenalty;
    }
  }

  if (modeConflict) {
    score -= W.modeConflictPenalty;
  }

  score += (entry.priority ?? 0) * W.priorityMultiplier;

  return {
    entry,
    score,

    similarity: Math.max(questionSimilarity, keywordSimilarity),

    questionSimilarity,
    keywordSimilarity,

    questionPhraseCoverage: questionPhrase?.coverage ?? 0,

    keywordPhraseCoverage: keywordPhrase?.coverage ?? 0,

    topicMatch,
    topicConflict,

    intentMatch,
    intentConflict,

    modeMatch,
    modeConflict,

    exactQuestionMatch,
    exactVariationMatch,

    matchedQuestionPhrase: questionPhrase?.phrase ?? null,

    matchedKeywordPhrase: keywordPhrase?.phrase ?? null,
  };
}

/* =========================================================
   CANDIDATE SCOPING
   ========================================================= */

function getCandidateEntries(
  detectedTopic: string | null,
  detectedIntent: HelpIntent | null,
  isFollowUp: boolean,
): HelpEntry[] {
  let candidates = HELP_KNOWLEDGE.slice();

  /*
   * ---------------------------------------------------------
   * 1. HARD INTENT FILTER
   * ---------------------------------------------------------
   */
  if (detectedIntent) {
    const intentFiltered = candidates.filter((entry) =>
      isIntentAllowed(detectedIntent, entry.intent),
    );

    if (intentFiltered.length) {
      candidates = intentFiltered;
    }
  }

  /*
   * ---------------------------------------------------------
   * 2. HARD TECHNICAL TOPIC FILTER
   * ---------------------------------------------------------
   *
   * If the user says Arduino, RFID entries should not
   * compete merely because they share words such as
   * "reader", "component", etc.
   */
  if (detectedTopic) {
    const topicFiltered = candidates.filter((entry) =>
      getEntryTopics(entry).has(detectedTopic),
    );

    if (topicFiltered.length) {
      candidates = topicFiltered;
    } else {
      const globalTopicFiltered = HELP_KNOWLEDGE.filter((entry) =>
        getEntryTopics(entry).has(detectedTopic),
      );

      if (globalTopicFiltered.length) {
        candidates = globalTopicFiltered;
      }
    }
  }

  /*
   * ---------------------------------------------------------
   * 3. FOLLOW-UP TOPIC LOCK
   * ---------------------------------------------------------
   */
  if (isFollowUp && helpContext.lastTopic && !detectedTopic) {
    const contextTopicFiltered = candidates.filter((entry) =>
      getEntryTopics(entry).has(helpContext.lastTopic!),
    );

    if (contextTopicFiltered.length) {
      candidates = contextTopicFiltered;
    }
  }

  return candidates;
}

/* =========================================================
   SCORE ALL ENTRIES
   ========================================================= */

function scoreAllEntries(
  normalizedQuestion: string,
  detectedIntent: HelpIntent | null,
  detectedTopic: string | null,
  questionMode: QuestionMode,
  isFollowUp: boolean,
): ScoredEntry[] {
  const candidateEntries = getCandidateEntries(
    detectedTopic,
    detectedIntent,
    isFollowUp,
  );

  const results = candidateEntries.map((entry) =>
    scoreEntry(
      normalizedQuestion,
      detectedIntent,
      detectedTopic,
      questionMode,
      isFollowUp,
      entry,
    ),
  );

  /*
   * Strong same-topic boost for short follow-ups.
   */
  if (isFollowUp && helpContext.lastTopic) {
    const shortFollowUp = meaningfulTokens(normalizedQuestion).length <= 7;

    if (shortFollowUp) {
      for (const result of results) {
        const sameTopic = getEntryTopics(result.entry).has(
          helpContext.lastTopic!,
        );

        if (sameTopic) {
          result.score += W.sameTopicShortFollowUpBonus;
        } else {
          result.score -= 20;
        }

        if (
          helpContext.lastEntryId &&
          result.entry.id === helpContext.lastEntryId
        ) {
          result.score += 8;
        }
      }
    }
  }

  results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (b.exactQuestionMatch !== a.exactQuestionMatch) {
      return b.exactQuestionMatch ? 1 : -1;
    }

    if (b.exactVariationMatch !== a.exactVariationMatch) {
      return b.exactVariationMatch ? 1 : -1;
    }

    if (b.modeMatch !== a.modeMatch) {
      return b.modeMatch ? 1 : -1;
    }

    if (b.topicMatch !== a.topicMatch) {
      return b.topicMatch ? 1 : -1;
    }

    if (b.intentMatch !== a.intentMatch) {
      return b.intentMatch ? 1 : -1;
    }

    return (b.entry.priority ?? 0) - (a.entry.priority ?? 0);
  });

  return results;
}

/* =========================================================
   CONFIDENCE
   ========================================================= */

function computeConfidence(best: ScoredEntry, isFollowUp: boolean): number {
  let confidence = best.questionSimilarity * 0.55;

  confidence += best.keywordSimilarity * 0.08;

  if (best.exactQuestionMatch) {
    confidence += 0.4;
  }

  if (best.exactVariationMatch) {
    confidence += 0.35;
  }

  if (best.questionPhraseCoverage >= 0.85) {
    confidence += 0.15;
  }

  if (best.topicMatch) {
    confidence += 0.14;
  }

  if (best.intentMatch) {
    confidence += 0.2;
  }

  if (best.modeMatch) {
    confidence += 0.18;
  }

  if (isFollowUp && best.topicMatch) {
    confidence += 0.12;
  }

  if (isFollowUp && best.intentMatch) {
    confidence += 0.08;
  }

  if (best.intentConflict) {
    confidence -= 0.35;
  }

  if (best.topicConflict) {
    confidence -= 0.35;
  }

  if (best.modeConflict) {
    confidence -= 0.2;
  }

  return Math.max(0, Math.min(confidence, 1));
}

/* =========================================================
   THRESHOLD
   ========================================================= */

function meetsThreshold(
  best: ScoredEntry,
  confidence: number,
  detectedIntent: HelpIntent | null,
  detectedTopic: string | null,
): boolean {
  /*
   * Exact matches are trusted if there is no hard conflict.
   */
  if (
    (best.exactQuestionMatch || best.exactVariationMatch) &&
    !best.intentConflict &&
    !best.topicConflict
  ) {
    return true;
  }

  if (
    best.questionSimilarity >= W.strongSimilarity &&
    !best.intentConflict &&
    !best.topicConflict &&
    !best.modeConflict
  ) {
    return true;
  }

  if (best.questionSimilarity < W.minimumSimilarity) {
    return false;
  }

  if (detectedIntent && detectedTopic) {
    return confidence >= W.confidenceWithIntentAndTopic;
  }

  if (detectedIntent) {
    return confidence >= W.confidenceWithIntent;
  }

  if (detectedTopic) {
    return confidence >= W.confidenceWithTopic;
  }

  return confidence >= W.confidenceWithoutSignals;
}

/* =========================================================
   RESULT SEPARATION
   ========================================================= */

function hasStrongSeparation(results: ScoredEntry[]): boolean {
  if (results.length < 2) {
    return true;
  }

  const [best, second] = results;

  if (best.exactQuestionMatch || best.exactVariationMatch) {
    return true;
  }

  const margin = best.score - second.score;

  if (best.topicMatch && best.intentMatch && best.modeMatch) {
    return margin >= W.minimumScoreMargin;
  }

  if (best.topicMatch && best.intentMatch) {
    return margin >= W.minimumScoreMargin;
  }

  return margin >= W.strongScoreMargin;
}

/* =========================================================
   ANSWER CLEANUP
   ========================================================= */

/*
 * Some knowledge entries may start with conversational
 * filler such as:
 *
 * "Yes. Arduino can..."
 *
 * The chatbot should answer naturally:
 *
 * "Arduino can..."
 *
 * This ONLY removes leading affirmative filler.
 */
function cleanAnswer(answer: string): string {
  const trimmed = answer.trim();

  if (!trimmed) {
    return trimmed;
  }

  return trimmed.replace(/^(yes|yes,|yes\.|yes —|yes -)\s*/i, "");
}

/* =========================================================
   DIRECT RESPONSES
   ========================================================= */

function isGreeting(normalizedQuestion: string): boolean {
  return (
    /^hi$/i.test(normalizedQuestion) ||
    /^hello$/i.test(normalizedQuestion) ||
    /^hey$/i.test(normalizedQuestion) ||
    /^hiya$/i.test(normalizedQuestion) ||
    /^hey there$/i.test(normalizedQuestion) ||
    /^hello there$/i.test(normalizedQuestion) ||
    /^aoa$/i.test(normalizedQuestion) ||
    /^salam$/i.test(normalizedQuestion) ||
    /^assalam alaikum$/i.test(normalizedQuestion) ||
    /^assalamualaikum$/i.test(normalizedQuestion) ||
    /^assalamu alaikum$/i.test(normalizedQuestion) ||
    /^good morning$/i.test(normalizedQuestion) ||
    /^good afternoon$/i.test(normalizedQuestion) ||
    /^good evening$/i.test(normalizedQuestion) ||
    /^how are you$/i.test(normalizedQuestion)
  );
}

function getGreetingResponse(normalizedQuestion: string): HelpResponse {
  // A greeting starts a fresh conversational thread. Do not let a
  // previous technical topic leak into the new greeting.
  clearTechnicalContext();

  if (/\bhow are you\b/i.test(normalizedQuestion)) {
    return {
      answer:
        "I'm doing well and ready to help you with MECTEC, electronics, projects, services and the website.",

      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a custom project?",
        "What is Arduino?",
        "How can I contact MECTEC?",
      ],
    };
  }

  // Handle time-of-day greetings naturally.
  if (/^(good morning)$/i.test(normalizedQuestion)) {
    return {
      answer:
        "Good morning! 👋 I'm the MECTEC Help Assistant. I can help you with MECTEC services, project requests, electronics, microcontrollers, sensors, automation, the website and more.",
      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a custom project?",
        "What is Arduino?",
        "How can I contact MECTEC?",
      ],
    };
  }

  if (/^(good afternoon)$/i.test(normalizedQuestion)) {
    return {
      answer:
        "Good afternoon! 👋 I'm the MECTEC Help Assistant. I can help you with MECTEC services, project requests, electronics, microcontrollers, sensors, automation, the website and more.",
      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a custom project?",
        "What is Arduino?",
        "How can I contact MECTEC?",
      ],
    };
  }

  if (/^(good evening)$/i.test(normalizedQuestion)) {
    return {
      answer:
        "Good evening! 👋 I'm the MECTEC Help Assistant. I can help you with MECTEC services, project requests, electronics, microcontrollers, sensors, automation, the website and more.",
      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a custom project?",
        "What is Arduino?",
        "How can I contact MECTEC?",
      ],
    };
  }

  // Handle Islamic greetings separately from generic greetings.
  if (
    /^(aoa|salam|assalam alaikum|assalamualaikum|assalamu alaikum)$/i.test(
      normalizedQuestion,
    )
  ) {
    return {
      answer:
        "Wa Alaikum Assalam! 👋 I'm the MECTEC Help Assistant. I can help you with MECTEC services, project requests, electronics, microcontrollers, sensors, automation, the website and more.",

      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a custom project?",
        "What is Arduino?",
        "How can I contact MECTEC?",
      ],
    };
  }

  return {
    answer:
      "Hi! 👋 I'm the MECTEC Help Assistant. I can help you with MECTEC services, project requests, electronics, microcontrollers, sensors, automation, the website and more.",

    suggestedQuestions: [
      "What services does MECTEC provide?",
      "Can I request a custom project?",
      "What is Arduino?",
      "How can I contact MECTEC?",
    ],
  };
}

function handleDirectQuestion(normalizedQuestion: string): HelpResponse | null {
  if (/\b(what is your name|who are you)\b/i.test(normalizedQuestion)) {
    return {
      answer:
        "I'm the MECTEC Help Assistant. I provide local answers about MECTEC, its services, projects, electronics and website features.",

      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a project?",
        "How can I contact MECTEC?",
        "Show me MECTEC projects.",
      ],
    };
  }

  if (
    /\bwhat can you help me with\b/i.test(normalizedQuestion) ||
    /\bwhat can you help with\b/i.test(normalizedQuestion)
  ) {
    return {
      answer:
        "I can help you understand MECTEC services, request a project, explore previous projects, learn about electronics and microcontrollers, troubleshoot common issues, and find relevant pages on the website.",

      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a custom project?",
        "Show me your projects.",
        "How can I contact MECTEC?",
      ],
    };
  }

  /*
   * IMPORTANT:
   *
   * "What is MECTEC?" gets the About page, NOT a
   * nonexistent /services route.
   */
  if (
    /\bwhat is mectec\b/i.test(normalizedQuestion) ||
    /\btell me about mectec\b/i.test(normalizedQuestion) ||
    /\bwho is mectec\b/i.test(normalizedQuestion)
  ) {
    return {
      answer:
        "MECTEC is an electronics-focused business and project platform. You can learn more about MECTEC, its work and its purpose on the About page.",

      action: NAVIGATION_ACTIONS.about,

      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Can I request a project?",
        "Show me your projects.",
        "How can I contact MECTEC?",
      ],
    };
  }

  return null;
}

/* =========================================================
   DATE / TIME / HOURS
   ========================================================= */

function getDateResponse(normalizedQuestion: string): HelpResponse | null {
  const asksDate =
    /\b(what day is it|what is todays date|what is today's date|what date is it|todays date|today's date|current date)\b/i.test(
      normalizedQuestion,
    );

  if (!asksDate) {
    return null;
  }

  const now = new Date();

  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: MECTEC_TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);

  return {
    answer: `Today is ${date}.`,
  };
}

function getCurrentPakistanTime(): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: MECTEC_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function getDynamicHoursResponse(
  normalizedQuestion: string,
): HelpResponse | null {
  const asksShopHours =
    /\b(shop|store|business)\s+(hours|timing|timings)\b/i.test(
      normalizedQuestion,
    ) ||
    /\bwhat time do you (open|close)\b/i.test(normalizedQuestion) ||
    /\bwhen (do|does) (you|mectec|your shop) (open|close)\b/i.test(
      normalizedQuestion,
    ) ||
    /\bare you open\b/i.test(normalizedQuestion) ||
    /\bwhen are you open\b/i.test(normalizedQuestion) ||
    /\bopening hours\b/i.test(normalizedQuestion) ||
    /\bclosing hours\b/i.test(normalizedQuestion);

  if (!asksShopHours) {
    return null;
  }

  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MECTEC_TIME_ZONE,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const hourPart = parts.find((part) => part.type === "hour");

  const minutePart = parts.find((part) => part.type === "minute");

  const hour = Number(hourPart?.value ?? 0);

  const minute = Number(minutePart?.value ?? 0);

  const currentMinutes = hour * 60 + minute;

  const openMinutes = MECTEC_OPEN_HOUR * 60;

  const closeMinutes = MECTEC_CLOSE_HOUR * 60;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  const currentTime = getCurrentPakistanTime();

  if (isOpen) {
    return {
      answer: `MECTEC's listed business hours are 10:00 AM to 10:00 PM. It is currently ${currentTime} in Pakistan, so the shop is within its listed opening hours.`,
    };
  }

  return {
    answer: `MECTEC's listed business hours are 10:00 AM to 10:00 PM. It is currently ${currentTime} in Pakistan, so the shop is currently outside its listed opening hours.`,
  };
}

/* =========================================================
   DETERMINISTIC WEBSITE NAVIGATION
   ========================================================= */

/*
 * THIS IS THE MOST IMPORTANT ARCHITECTURAL CHANGE.
 *
 * Website navigation is resolved BEFORE fuzzy knowledge
 * matching.
 *
 * Therefore:
 *
 * Contact -> /contact
 * Project request -> /request-project
 * Projects -> /projects
 * About -> /about
 * Blog -> /blog
 * Track request -> /track-request
 *
 * The fuzzy matcher never gets to decide these.
 */

function detectNavigation(question: string): NavigationMatch | null {
  const normalized = normalize(question);

  if (!normalized) {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * 1. PROJECT REQUEST
   * ---------------------------------------------------------
   *
   * Must come BEFORE generic contact.
   */
  const isProjectRequest =
    /\b(can|could|how can|how do) i\s+(request|submit|order|place|commission)\b.*\bproject\b/i.test(
      normalized,
    ) ||
    /\b(request|submit|order|place|commission)\b.*\b(project|my project|a project)\b/i.test(
      normalized,
    ) ||
    /\b(project|my project|a project)\b.*\b(request|submit|order|commission)\b/i.test(
      normalized,
    ) ||
    /\bcan (you|mectec) build (my|a|the) project\b/i.test(normalized) ||
    /\bwhere should i contact mectec about (a|my|the) project\b/i.test(
      normalized,
    ) ||
    /\bwhere can i contact mectec about (a|my|the) project\b/i.test(
      normalized,
    ) ||
    /\bhow should i contact mectec about (a|my|the) project\b/i.test(
      normalized,
    ) ||
    /\bhow can i contact mectec about (a|my|the) project\b/i.test(normalized) ||
    /\bhow do i contact mectec about (a|my|the) project\b/i.test(normalized) ||
    /\bproject request form\b/i.test(normalized) ||
    /\brequest form\b/i.test(normalized);

  if (isProjectRequest) {
    clearTechnicalContext();

    return {
      intent: "request_project",

      answer:
        "For a new project, the Project Request page is the best starting point. You can submit your requirements there so MECTEC can understand what you want built.",

      action: NAVIGATION_ACTIONS.request_project,

      suggestedQuestions: [
        "What information do I need to provide?",
        "How much does a project cost?",
        "How long does a project take?",
        "How can I contact MECTEC?",
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 2. TRACK REQUEST
   * ---------------------------------------------------------
   */
  const isTrackRequest =
    /\b(track|tracking|check|status)\b.*\b(request|project|order)\b/i.test(
      normalized,
    ) ||
    /\b(request|project|order)\b.*\b(track|tracking|status)\b/i.test(
      normalized,
    ) ||
    /\bhow can i track\b/i.test(normalized) ||
    /\bwhere can i track\b/i.test(normalized) ||
    /\bcheck my request\b/i.test(normalized) ||
    /\brequest status\b/i.test(normalized);

  if (isTrackRequest) {
    clearTechnicalContext();

    return {
      intent: "track_request",

      answer:
        "You can use the Request Tracking page to check the status of a submitted project request.",

      action: NAVIGATION_ACTIONS.track_request,

      suggestedQuestions: [
        "How do I submit a project?",
        "What information do I need to provide?",
        "How can I contact MECTEC?",
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 3. PROJECT PORTFOLIO
   * ---------------------------------------------------------
   *
   * IMPORTANT:
   *
   * "What projects can I make with Arduino?"
   *
   * must NOT trigger this.
   *
   * We require website/portfolio language or a clear
   * browse/show intent.
   */
  const isProjectPortfolio =
    /\b(show|see|view|browse|explore|look at)\b.*\b(projects?|portfolio|previous work)\b/i.test(
      normalized,
    ) ||
    /\b(projects?|portfolio|previous work)\b.*\b(show|see|view|browse|explore)\b/i.test(
      normalized,
    ) ||
    /\b(previous|past)\s+(projects?|work)\b/i.test(normalized) ||
    /\bproject portfolio\b/i.test(normalized) ||
    /\bview your projects\b/i.test(normalized) ||
    /\bsee your projects\b/i.test(normalized) ||
    /\bshow me your projects\b/i.test(normalized) ||
    /\bwhat projects has mectec\b/i.test(normalized) ||
    /\bwhat projects does mectec\b/i.test(normalized);

  if (isProjectPortfolio) {
    clearTechnicalContext();

    return {
      intent: "projects",

      answer:
        "You can browse MECTEC's projects and previous work on the Projects page.",

      action: NAVIGATION_ACTIONS.projects,

      suggestedQuestions: [
        "Can I request a custom project?",
        "What services does MECTEC provide?",
        "How can I contact MECTEC?",
        "Tell me about MECTEC.",
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 4. BLOG
   * ---------------------------------------------------------
   */
  const isBlog =
    /\b(where|how|can i)\b.*\b(read|view|see|find|browse)\b.*\b(blog|blogs|articles|posts)\b/i.test(
      normalized,
    ) ||
    /\b(blog|blogs|articles|posts)\b.*\b(page|section)\b/i.test(normalized) ||
    /\bshow me (the )?blog\b/i.test(normalized) ||
    /\bview (the )?blog\b/i.test(normalized) ||
    /\bread your blog\b/i.test(normalized) ||
    /\bwhere can i read\b.*\bblog\b/i.test(normalized);

  if (isBlog) {
    clearTechnicalContext();

    return {
      intent: "blog",

      answer: "You can read MECTEC's articles and posts on the Blog page.",

      action: NAVIGATION_ACTIONS.blog,

      suggestedQuestions: [
        "Show me your projects.",
        "Tell me about MECTEC.",
        "How can I contact MECTEC?",
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 5. CONTACT
   * ---------------------------------------------------------
   *
   * Generic contact is handled only AFTER project-request
   * and track-request routing.
   */
  const isContact =
    /\bhow can i contact\b/i.test(normalized) ||
    /\bhow do i contact\b/i.test(normalized) ||
    /\bwhere can i contact\b/i.test(normalized) ||
    /\bwhere should i contact\b/i.test(normalized) ||
    /\bwho should i contact\b/i.test(normalized) ||
    /\bhow can i reach\b/i.test(normalized) ||
    /\bhow do i reach\b/i.test(normalized) ||
    /\bget in touch with mectec\b/i.test(normalized) ||
    /\bcontact information\b/i.test(normalized) ||
    /\bcontact details\b/i.test(normalized) ||
    /\bphone number\b/i.test(normalized) ||
    /\bemail address\b/i.test(normalized) ||
    /\bwhatsapp\b/i.test(normalized) ||
    /\bhow do i use the contact form\b/i.test(normalized) ||
    /\bcontact form\b/i.test(normalized);

  if (isContact) {
    clearTechnicalContext();

    return {
      intent: "contact",

      answer:
        "You can use MECTEC's Contact page to find the available ways to get in touch with MECTEC.",

      action: NAVIGATION_ACTIONS.contact,

      suggestedQuestions: [
        "Can I request a project?",
        "Where can I view your projects?",
        "How can I track my request?",
        "Tell me about MECTEC.",
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 6. ABOUT
   * ---------------------------------------------------------
   */
  const isAbout =
    /\btell me about mectec\b/i.test(normalized) ||
    /\bwho is mectec\b/i.test(normalized) ||
    /\babout mectec\b/i.test(normalized) ||
    /\babout the company\b/i.test(normalized) ||
    /\bwhat is mectec\b/i.test(normalized) ||
    /\blearn more about mectec\b/i.test(normalized) ||
    /\bwhat does mectec do\b/i.test(normalized);

  if (isAbout) {
    clearTechnicalContext();

    return {
      intent: "about",

      answer:
        "You can learn more about MECTEC, its purpose and its work on the About page.",

      action: NAVIGATION_ACTIONS.about,

      suggestedQuestions: [
        "What services does MECTEC provide?",
        "Show me your projects.",
        "Can I request a custom project?",
        "How can I contact MECTEC?",
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 7. HOME
   * ---------------------------------------------------------
   */
  const isHome =
    /\b(go|take|bring)\s+(me\s+)?(back\s+)?home\b/i.test(normalized) ||
    /\bhome page\b/i.test(normalized) ||
    /\bmain page\b/i.test(normalized) ||
    /^home$/i.test(normalized);

  if (isHome) {
    clearTechnicalContext();

    return {
      intent: "home",

      answer: "You can return to the MECTEC home page using the button below.",

      action: NAVIGATION_ACTIONS.home,

      suggestedQuestions: [
        "Show me your projects.",
        "What services does MECTEC provide?",
        "Can I request a project?",
        "How can I contact MECTEC?",
      ],
    };
  }

  return null;
}

/* =========================================================
   SUGGESTIONS
   ========================================================= */

function getEntryPrimaryQuestion(entry: HelpEntry): string {
  return entry.question.trim();
}

function isSameQuestion(a: string, b: string): boolean {
  return normalize(a) === normalize(b);
}

function suggestionIntentCompatible(
  currentIntent: HelpIntent | null,
  candidateIntent: HelpIntent | undefined,
): boolean {
  if (!currentIntent || !candidateIntent) {
    return true;
  }

  const blockedPairs: Array<[HelpIntent, HelpIntent]> = [
    ["project_request", "definition"],
    ["project_request", "purpose"],
    ["project_request", "comparison"],
    ["project_request", "troubleshooting"],

    ["pricing", "definition"],
    ["pricing", "purpose"],
    ["pricing", "comparison"],

    ["timeline", "definition"],
    ["timeline", "purpose"],

    ["contact", "timeline"],
    ["contact", "definition"],
    ["contact", "purpose"],
  ];

  return !blockedPairs.some(
    ([a, b]) => currentIntent === a && candidateIntent === b,
  );
}

function getDynamicKnowledgeSuggestions(
  currentEntry: HelpEntry,
  topic: string | null,
  intent: HelpIntent | null,
): string[] {
  const candidates = KNOWLEDGE_META.filter(
    (meta) => meta.entry.id !== currentEntry.id,
  )
    .map((meta) => {
      if (!suggestionIntentCompatible(intent, meta.entry.intent)) {
        return null;
      }

      const sameTopic = Boolean(topic && meta.topics.has(topic));

      if (topic && !sameTopic) {
        return null;
      }

      let score = meta.priority * 0.01;

      if (sameTopic) {
        score += 5;
      }

      if (intent && meta.entry.intent === intent) {
        score += 2;
      }

      score += Math.min(meta.meaningfulTokens.length, 8) * 0.03;

      return {
        entry: meta.entry,
        score,
      };
    })
    .filter(
      (
        item,
      ): item is {
        entry: HelpEntry;
        score: number;
      } => Boolean(item),
    )
    .sort((a, b) => b.score - a.score);

  const questions: string[] = [];

  for (const candidate of candidates) {
    const question = getEntryPrimaryQuestion(candidate.entry);

    if (!question) {
      continue;
    }

    if (isSameQuestion(question, currentEntry.question)) {
      continue;
    }

    if (questions.some((existing) => isSameQuestion(existing, question))) {
      continue;
    }

    questions.push(question);

    if (questions.length >= 4) {
      break;
    }
  }

  return questions;
}

const FALLBACK_SUGGESTIONS = [
  "What is Arduino?",
  "Can I request a custom project?",
  "What services does MECTEC provide?",
  "How can I contact MECTEC?",
];

function getSuggestedQuestions(
  currentEntry: HelpEntry,
  topic: string | null,
  intent: HelpIntent | null,
): string[] {
  const pool: string[] = [];

  if (intent === "project_request") {
    pool.push(
      "What information do I need to provide for a project?",
      "How long does a project usually take?",
      "How can I contact MECTEC?",
    );
  }

  pool.push(...getDynamicKnowledgeSuggestions(currentEntry, topic, intent));

  pool.push(...(currentEntry.variations ?? []));

  pool.push(...FALLBACK_SUGGESTIONS);

  const result: string[] = [];

  for (const question of pool) {
    const trimmed = question.trim();

    if (!trimmed) {
      continue;
    }

    if (isSameQuestion(trimmed, currentEntry.question)) {
      continue;
    }

    if (result.some((existing) => isSameQuestion(existing, trimmed))) {
      continue;
    }

    result.push(trimmed);

    if (result.length >= 4) {
      break;
    }
  }

  return result;
}

/* =========================================================
   RELATED TOPICS
   ========================================================= */

const RELATED_TOPIC_MAP: Record<string, string[]> = {
  arduino: ["ESP32", "RFID", "Sensors", "Programming"],

  esp32: ["Arduino", "IoT", "Sensors", "Wi-Fi"],

  esp8266: ["ESP32", "Arduino", "IoT", "Wi-Fi"],

  rfid: ["RC522", "Arduino", "Automation", "Access Control"],

  sensor: ["Arduino", "ESP32", "Automation", "IoT"],

  motor: ["Servo", "Stepper", "Motor Drivers", "Control"],

  servo: ["Arduino", "Motor Drivers", "PWM", "Automation"],

  automation: ["Arduino", "ESP32", "Sensors", "Relays"],

  pcb: ["Arduino", "ESP32", "Electronics", "Components"],

  pcbdesign: ["PCB", "Gerber Files", "Components", "Electronics"],

  microcontroller: ["Arduino", "ESP32", "ESP8266", "Firmware"],

  electronics: ["Components", "Sensors", "Microcontrollers", "PCB"],

  iot: ["ESP32", "ESP8266", "Sensors", "Automation"],

  firmware: ["Microcontrollers", "Arduino", "ESP32", "IoT"],
};

function getRelatedQuestionsByTopic(topic: string | null): string[] {
  if (!topic) {
    return [];
  }

  return (RELATED_TOPIC_MAP[topic] ?? []).slice(0, 4);
}

function getRelatedQuestions(
  currentEntry: HelpEntry,
  topic: string | null,
): string[] {
  const predefined = getRelatedQuestionsByTopic(topic);

  if (predefined.length) {
    return predefined;
  }

  const candidates = KNOWLEDGE_META.filter(
    (meta) => meta.entry.id !== currentEntry.id,
  )
    .filter((meta) => {
      if (topic) {
        return meta.topics.has(topic);
      }

      return meta.entry.category === currentEntry.category;
    })
    .sort((a, b) => b.priority - a.priority);

  const result: string[] = [];

  for (const candidate of candidates) {
    const question = candidate.entry.question.trim();

    if (!question) {
      continue;
    }

    if (result.some((existing) => isSameQuestion(existing, question))) {
      continue;
    }

    result.push(question);

    if (result.length >= 4) {
      break;
    }
  }

  return result;
}

/* =========================================================
   CONTEXT UPDATE
   ========================================================= */

function updateHelpContext(
  question: string,
  entry: HelpEntry,
  topic: string | null,
  intent: HelpIntent | null,
): void {
  const previousTopic = helpContext.lastTopic;

  const nextTopic = topic ?? previousTopic ?? null;

  let turnsSinceTopic = helpContext.turnsSinceTopic;

  if (topic && topic !== previousTopic) {
    turnsSinceTopic = 0;
  } else {
    turnsSinceTopic += 1;
  }

  /*
   * Context naturally expires after a few turns.
   */
  if (turnsSinceTopic > 3) {
    turnsSinceTopic = topic ? 0 : 0;
  }

  helpContext = {
    lastTopic: topic ?? (turnsSinceTopic <= 3 ? nextTopic : null),

    lastIntent: intent ?? entry.intent ?? helpContext.lastIntent ?? null,

    lastEntryId: entry.id,

    lastQuestion: question,

    turnsSinceTopic,
  };
}

/* =========================================================
   MAIN RESPONSE CREATION
   ========================================================= */

function createHelpResponse(question: string): HelpResponse | null {
  const normalizedQuestion = normalize(question);

  if (!normalizedQuestion) {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * 1. GREETING
   * ---------------------------------------------------------
   */
  if (isGreeting(normalizedQuestion)) {
    return getGreetingResponse(normalizedQuestion);
  }

  /*
   * ---------------------------------------------------------
   * 2. DETERMINISTIC WEBSITE NAVIGATION
   * ---------------------------------------------------------
   *
   * THIS MUST HAPPEN BEFORE FUZZY KNOWLEDGE SEARCH.
   */
  const navigation = detectNavigation(normalizedQuestion);

  if (navigation) {
    return {
      answer: navigation.answer,
      action: navigation.action,
      suggestedQuestions: navigation.suggestedQuestions,
    };
  }

  /*
   * ---------------------------------------------------------
   * 3. DIRECT RESPONSES
   * ---------------------------------------------------------
   */
  const direct = handleDirectQuestion(normalizedQuestion);

  if (direct) {
    return direct;
  }

  /*
   * ---------------------------------------------------------
   * 4. DATE
   * ---------------------------------------------------------
   */
  const dateResponse = getDateResponse(normalizedQuestion);

  if (dateResponse) {
    return dateResponse;
  }

  /*
   * ---------------------------------------------------------
   * 5. BUSINESS HOURS
   * ---------------------------------------------------------
   */
  const hoursResponse = getDynamicHoursResponse(normalizedQuestion);

  if (hoursResponse) {
    return hoursResponse;
  }

  /*
   * ---------------------------------------------------------
   * 6. CURRENT QUESTION ANALYSIS
   * ---------------------------------------------------------
   */

  let detectedIntent = detectIntent(normalizedQuestion);

  const explicitTopic = detectTopic(normalizedQuestion);

  const isFollowUp = isLikelyFollowUp(normalizedQuestion, explicitTopic);

  const detectedTopic = resolveContextTopic(
    normalizedQuestion,
    explicitTopic,
    isFollowUp,
  );

  /*
   * Resolve the meaning of short follow-ups BEFORE inheriting the
   * previous intent.
   *
   * Example:
   *   What is Arduino?  -> definition
   *   How it works?     -> procedure/how_it_works
   *
   * The old order inherited "definition" from the first turn,
   * which filtered out Arduino's dedicated how-it-works entry and
   * caused the generic fallback.
   */
  if (!detectedIntent && isFollowUp) {
    if (
      /\bhow it works\b/i.test(normalizedQuestion) ||
      /\bhow this works\b/i.test(normalizedQuestion) ||
      /\bhow that works\b/i.test(normalizedQuestion) ||
      /\bhow does it work\b/i.test(normalizedQuestion) ||
      /\bhow does this work\b/i.test(normalizedQuestion) ||
      /\bhow does that work\b/i.test(normalizedQuestion) ||
      /\bworking principle\b/i.test(normalizedQuestion)
    ) {
      detectedIntent = "procedure";
    } else if (
      /\bwhat does it do\b/i.test(normalizedQuestion) ||
      /\bwhat can it do\b/i.test(normalizedQuestion) ||
      /\bwhat can this do\b/i.test(normalizedQuestion) ||
      /\bwhat can that do\b/i.test(normalizedQuestion)
    ) {
      detectedIntent = "capability";
    } else if (
      /\bwhat is it used for\b/i.test(normalizedQuestion) ||
      /\bwhat is this used for\b/i.test(normalizedQuestion) ||
      /\bwhat is that used for\b/i.test(normalizedQuestion) ||
      /\bwhat is it for\b/i.test(normalizedQuestion)
    ) {
      detectedIntent = "purpose";
    } else if (
      /\bhow do i use it\b/i.test(normalizedQuestion) ||
      /\bhow to use it\b/i.test(normalizedQuestion) ||
      /\bhow can i use it\b/i.test(normalizedQuestion)
    ) {
      detectedIntent = "procedure";
    }
  }

  /*
   * Only inherit the previous intent when the current follow-up
   * still has no identifiable conversational mode.
   */
  if (!detectedIntent && isFollowUp && helpContext.lastIntent) {
    detectedIntent = helpContext.lastIntent;
  }

  const questionMode = detectQuestionMode(normalizedQuestion, detectedIntent);

  /*
   * ---------------------------------------------------------
   * 7. KNOWLEDGE SEARCH
   * ---------------------------------------------------------
   *
   * IMPORTANT:
   *
   * We DO NOT append the topic to the question.
   *
   * Old behavior:
   *
   *   "what can it do arduino"
   *
   * could destroy exact variation matching.
   *
   * Topic is handled independently through candidate
   * scoping.
   */
  const scored = scoreAllEntries(
    normalizedQuestion,
    detectedIntent,
    detectedTopic,
    questionMode,
    isFollowUp,
  );

  const best = scored[0];

  if (!best) {
    return {
      answer: FALLBACK_ANSWER,
    };
  }

  /*
   * ---------------------------------------------------------
   * 8. HARD TOPIC SAFETY
   * ---------------------------------------------------------
   */
  if (
    detectedTopic &&
    best.topicConflict &&
    !best.exactQuestionMatch &&
    !best.exactVariationMatch
  ) {
    return {
      answer: FALLBACK_ANSWER,
    };
  }

  /*
   * ---------------------------------------------------------
   * 9. HARD BUSINESS INTENT SAFETY
   * ---------------------------------------------------------
   */
  if (
    detectedIntent &&
    isStrictIntent(detectedIntent) &&
    best.intentConflict &&
    !best.exactQuestionMatch &&
    !best.exactVariationMatch
  ) {
    return {
      answer: FALLBACK_ANSWER,
    };
  }

  /*
   * ---------------------------------------------------------
   * 10. HARD QUESTION MODE SAFETY
   * ---------------------------------------------------------
   */
  if (
    best.modeConflict &&
    (questionMode === "how_it_works" ||
      questionMode === "how_to_use" ||
      questionMode === "projects" ||
      questionMode === "contact" ||
      questionMode === "project_request") &&
    !best.exactQuestionMatch &&
    !best.exactVariationMatch
  ) {
    return {
      answer: FALLBACK_ANSWER,
    };
  }

  /*
   * ---------------------------------------------------------
   * 11. CONFIDENCE
   * ---------------------------------------------------------
   */
  const confidence = computeConfidence(best, isFollowUp);

  if (!meetsThreshold(best, confidence, detectedIntent, detectedTopic)) {
    return {
      answer: FALLBACK_ANSWER,
    };
  }

  /*
   * ---------------------------------------------------------
   * 12. RESULT SEPARATION
   * ---------------------------------------------------------
   */
  if (!hasStrongSeparation(scored)) {
    if (
      !(
        best.topicMatch &&
        best.intentMatch &&
        best.modeMatch &&
        best.questionSimilarity >= 0.5
      )
    ) {
      return {
        answer: FALLBACK_ANSWER,
      };
    }
  }

  /*
   * ---------------------------------------------------------
   * 13. UPDATE CONTEXT
   * ---------------------------------------------------------
   */
  updateHelpContext(
    normalizedQuestion,
    best.entry,
    detectedTopic,
    detectedIntent,
  );

  /*
   * ---------------------------------------------------------
   * 14. SUGGESTIONS
   * ---------------------------------------------------------
   */
  const suggestedQuestions = getSuggestedQuestions(
    best.entry,
    detectedTopic,
    detectedIntent,
  );

  const relatedQuestions = getRelatedQuestions(best.entry, detectedTopic);

  /*
   * ---------------------------------------------------------
   * 15. KNOWLEDGE ACTION
   * ---------------------------------------------------------
   *
   * This is intentionally only a fallback for knowledge
   * entries that already have an explicit action-compatible
   * intent.
   *
   * Website navigation itself was already handled above.
   */
  const action = best.entry.intent
    ? HELP_ACTIONS[best.entry.intent]
    : undefined;

  return {
    answer: cleanAnswer(best.entry.answer),

    action,

    suggestedQuestions,

    relatedQuestions,
  };
}

/* =========================================================
   PUBLIC ANSWER API
   ========================================================= */

export function findHelpAnswer(question: string): HelpResponse {
  return (
    createHelpResponse(question) ?? {
      answer: FALLBACK_ANSWER,
    }
  );
}

/* =========================================================
   LIVE SUGGESTION ENGINE
   =========================================================
 *
 * This remains separate from the main matcher.
 *
 * It is specifically optimized for typing-time execution.
 * Do NOT replace it with HELP_KNOWLEDGE.filter(...)+fuzzy
 * matching on every keystroke.
 */

const MAX_LIVE_SUGGESTIONS = 4;
const MIN_LIVE_INPUT_LENGTH = 2;
const MAX_PREFIX_LENGTH = 12;

const LIVE_PREFIX_INDEX = new Map<string, Set<string>>();

const LIVE_FIRST_WORD_INDEX = new Map<string, Set<string>>();

const LIVE_EXACT_INDEX = new Map<string, Set<string>>();

const LIVE_SUBSTRING_INDEX = new Map<string, Set<string>>();

const LIVE_SUGGESTION_CACHE = new Map<string, string[]>();

const LIVE_CACHE_LIMIT = 250;

/* =========================================================
   LIVE INDEX HELPERS
   ========================================================= */

function addToIndex(
  index: Map<string, Set<string>>,
  key: string,
  id: string,
): void {
  if (!key) {
    return;
  }

  let set = index.get(key);

  if (!set) {
    set = new Set<string>();

    index.set(key, set);
  }

  set.add(id);
}

function buildLiveSuggestionIndexes(): void {
  for (const meta of KNOWLEDGE_META) {
    const id = meta.entry.id;

    const question = meta.normalizedQuestion;

    if (!question) {
      continue;
    }

    addToIndex(LIVE_EXACT_INDEX, question, id);

    const words = question.split(/\s+/);

    const firstWord = words[0] ?? "";

    if (firstWord) {
      addToIndex(LIVE_FIRST_WORD_INDEX, firstWord, id);
    }

    /*
     * Prefix index.
     */
    for (const word of words) {
      if (word.length < 2) {
        continue;
      }

      const maxLength = Math.min(word.length, MAX_PREFIX_LENGTH);

      for (let length = 2; length <= maxLength; length += 1) {
        addToIndex(LIVE_PREFIX_INDEX, word.slice(0, length), id);
      }
    }

    /*
     * Small substring index for longer meaningful tokens.
     */
    for (const token of meta.meaningfulTokens) {
      if (token.length < 5) {
        continue;
      }

      const max = Math.min(token.length - 2, 6);

      for (let length = 3; length <= max; length += 1) {
        addToIndex(LIVE_SUBSTRING_INDEX, token.slice(0, length), id);
      }
    }
  }
}

buildLiveSuggestionIndexes();

/* =========================================================
   LIVE CANDIDATE COLLECTION
   ========================================================= */

function collectLiveCandidateIds(normalizedInput: string): Set<string> {
  const ids = new Set<string>();

  const words = normalizedInput.split(/\s+/);

  const lastWord = words.at(-1) ?? "";

  /*
   * Exact match.
   */
  const exact = LIVE_EXACT_INDEX.get(normalizedInput);

  if (exact) {
    for (const id of exact) {
      ids.add(id);
    }
  }

  /*
   * Last-word prefix.
   */
  if (lastWord.length >= 2) {
    const prefix = lastWord.slice(
      0,
      Math.min(lastWord.length, MAX_PREFIX_LENGTH),
    );

    const prefixIds = LIVE_PREFIX_INDEX.get(prefix);

    if (prefixIds) {
      for (const id of prefixIds) {
        ids.add(id);
      }
    }
  }

  /*
   * First-word index.
   */
  const firstWord = words[0] ?? "";

  if (firstWord.length >= 2) {
    const firstIds = LIVE_FIRST_WORD_INDEX.get(firstWord);

    if (firstIds) {
      for (const id of firstIds) {
        ids.add(id);
      }
    }
  }

  /*
   * All meaningful prefixes.
   */
  const meaningful = meaningfulTokens(normalizedInput);

  for (const token of meaningful) {
    if (token.length < 2) {
      continue;
    }

    const prefix = token.slice(0, Math.min(token.length, MAX_PREFIX_LENGTH));

    const tokenIds = LIVE_PREFIX_INDEX.get(prefix);

    if (tokenIds) {
      for (const id of tokenIds) {
        ids.add(id);
      }
    }
  }

  /*
   * Conservative substring fallback.
   */
  if (ids.size === 0) {
    for (const token of meaningful) {
      if (token.length < 3) {
        continue;
      }

      const key = token.slice(0, Math.min(token.length, 6));

      const substringIds = LIVE_SUBSTRING_INDEX.get(key);

      if (substringIds) {
        for (const id of substringIds) {
          ids.add(id);
        }
      }
    }
  }

  return ids;
}

/* =========================================================
   LIVE SUGGESTION SCORING
   ========================================================= */

function scoreLiveCandidate(
  normalizedInput: string,
  meta: KnowledgeMeta,
): number {
  const question = meta.normalizedQuestion;

  if (!question) {
    return -Infinity;
  }

  if (question === normalizedInput) {
    return 1000;
  }

  const inputTokens = meaningfulTokens(normalizedInput);

  const questionTokens = meta.meaningfulTokens;

  if (!inputTokens.length || !questionTokens.length) {
    return -Infinity;
  }

  let score = 0;

  /*
   * Whole question prefix.
   */
  if (question.startsWith(normalizedInput)) {
    score += 20;
  }

  /*
   * Last-word prefix.
   */
  const lastInputToken = inputTokens.at(-1) ?? "";

  if (
    lastInputToken &&
    questionTokens.some((token) => token.startsWith(lastInputToken))
  ) {
    score += 10;
  }

  /*
   * Ordered meaningful-token matching.
   */
  let matched = 0;
  let cursor = 0;

  for (const inputToken of inputTokens) {
    let found = false;

    for (let index = cursor; index < questionTokens.length; index += 1) {
      const questionToken = questionTokens[index];

      if (
        questionToken === inputToken ||
        questionToken.startsWith(inputToken)
      ) {
        matched += 1;

        cursor = index + 1;

        found = true;

        break;
      }
    }

    if (!found) {
      const fuzzy = questionTokens.some(
        (questionToken) => wordSimilarity(inputToken, questionToken) >= 0.8,
      );

      if (fuzzy) {
        matched += 0.6;
      }
    }
  }

  const coverage = matched / Math.max(inputTokens.length, 1);

  score += coverage * 30;

  /*
   * General semantic similarity.
   */
  score += tokenSimilarity(normalizedInput, question) * 20;

  /*
   * Prefer concise questions.
   */
  score += Math.max(0, 8 - meta.meaningfulTokens.length * 0.3);

  /*
   * Priority only slightly influences autocomplete.
   */
  score += meta.priority * 0.03;

  return score;
}

/* =========================================================
   LIVE CACHE
   ========================================================= */

function getCachedLiveSuggestions(key: string): string[] | null {
  const cached = LIVE_SUGGESTION_CACHE.get(key);

  if (!cached) {
    return null;
  }

  /*
   * Refresh insertion order.
   */
  LIVE_SUGGESTION_CACHE.delete(key);

  LIVE_SUGGESTION_CACHE.set(key, cached);

  return cached;
}

function cacheLiveSuggestions(key: string, suggestions: string[]): void {
  LIVE_SUGGESTION_CACHE.delete(key);

  LIVE_SUGGESTION_CACHE.set(key, suggestions);

  while (LIVE_SUGGESTION_CACHE.size > LIVE_CACHE_LIMIT) {
    const oldest = LIVE_SUGGESTION_CACHE.keys().next().value;

    if (!oldest) {
      break;
    }

    LIVE_SUGGESTION_CACHE.delete(oldest);
  }
}

/* =========================================================
   PUBLIC LIVE SUGGESTIONS
   ========================================================= */

export function suggestWhileTyping(partial: string): string[] {
  const normalized = normalize(partial);

  if (normalized.length < MIN_LIVE_INPUT_LENGTH) {
    return [];
  }

  const cached = getCachedLiveSuggestions(normalized);

  if (cached) {
    return cached;
  }

  const candidateIds = collectLiveCandidateIds(normalized);

  if (!candidateIds.size) {
    cacheLiveSuggestions(normalized, []);

    return [];
  }

  const scored: Array<{
    question: string;
    score: number;
  }> = [];

  for (const id of candidateIds) {
    /*
     * O(1) metadata lookup instead of:
     *
     * KNOWLEDGE_META.find(...)
     *
     * for every autocomplete candidate.
     */
    const meta = KNOWLEDGE_META_BY_ID.get(id);

    if (!meta) {
      continue;
    }

    const score = scoreLiveCandidate(normalized, meta);

    if (Number.isFinite(score)) {
      scored.push({
        question: meta.question,
        score,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const result: string[] = [];

  for (const item of scored) {
    if (result.some((existing) => isSameQuestion(existing, item.question))) {
      continue;
    }

    result.push(item.question);

    if (result.length >= MAX_LIVE_SUGGESTIONS) {
      break;
    }
  }

  cacheLiveSuggestions(normalized, result);

  return result;
}
