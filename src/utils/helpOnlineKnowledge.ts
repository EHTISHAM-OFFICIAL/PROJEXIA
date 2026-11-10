import type { HelpResponse } from "./helpBot";

interface WikipediaSearchResponse {
  query?: {
    search?: Array<{
      pageid: number;
      title: string;
    }>;
  };
}

interface WikipediaPageResponse {
  query?: {
    pages?: Record<
      string,
      {
        pageid: number;
        title: string;
        extract?: string;
      }
    >;
  };
}

const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";
const MAX_ANSWER_LENGTH = 1500;
const REQUEST_TIMEOUT_MS = 8000;
const answerCache = new Map<string, HelpResponse | null>();

const LOCAL_BUSINESS_TERMS =
  /\b(projexia|studio|our|your services|service|pricing|price|cost|quote|quotation|project request|request form|contact|phone number|whatsapp|email address|opening hours|working hours|business hours|location|address|delivery|payment|refund|guarantee|policy|policies|availability|order status|track request|portfolio|school project|university project|fyp)\b/i;

const GENERAL_QUESTION_PATTERN =
  /^(what (is|are|does|do)\b|who (is|are)\b|define\b|explain\b|tell me about\b|meaning of\b)|\b(difference between|how does|how do|why does|why do)\b/i;

function getSearchTopic(question: string): string {
  return question
    .trim()
    .replace(/[?!.]+$/g, "")
    .replace(/^(what is|what are|who is|who are|define|explain|tell me about|meaning of)\s+/i, "")
    .replace(/\b(please|in simple words|in simple terms|simply)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isGeneralKnowledgeQuestion(question: string): boolean {
  const normalized = question.trim();

  if (
    !normalized ||
    normalized.length > 240 ||
    LOCAL_BUSINESS_TERMS.test(normalized) ||
    !GENERAL_QUESTION_PATTERN.test(normalized)
  ) {
    return false;
  }

  return getSearchTopic(normalized).length >= 2;
}

async function fetchJson<T>(url: URL): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Public knowledge request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Look up unfamiliar general questions using Wikipedia's free public API.
 *
 * This is deliberately a fallback-only provider: the local ProjexiaHub
 * knowledge base always gets the first opportunity to answer. Business,
 * pricing, contact, policy and project-request questions never reach this
 * online lookup.
 */
export async function lookupGeneralKnowledge(
  question: string,
  localResponse: HelpResponse,
): Promise<HelpResponse> {
  if (
    !(
      localResponse.answer.startsWith("I don't have a specific answer for that yet.") ||
      localResponse.answer.startsWith("I’m not confident I understood")
    ) ||
    !isGeneralKnowledgeQuestion(question)
  ) {
    return localResponse;
  }

  const cacheKey = question.trim().toLowerCase();
  if (answerCache.has(cacheKey)) {
    return answerCache.get(cacheKey) ?? localResponse;
  }

  try {
    const searchUrl = new URL(WIKIPEDIA_API);
    searchUrl.search = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: getSearchTopic(question),
      srlimit: "1",
      format: "json",
      origin: "*",
    }).toString();

    const search = await fetchJson<WikipediaSearchResponse>(searchUrl);
    const page = search.query?.search?.[0];

    if (!page) {
      answerCache.set(cacheKey, null);
      return localResponse;
    }

    const pageUrl = new URL(WIKIPEDIA_API);
    pageUrl.search = new URLSearchParams({
      action: "query",
      prop: "extracts",
      exintro: "1",
      explaintext: "1",
      exchars: String(MAX_ANSWER_LENGTH),
      redirects: "1",
      pageids: String(page.pageid),
      format: "json",
      origin: "*",
    }).toString();

    const details = await fetchJson<WikipediaPageResponse>(pageUrl);
    const article = details.query?.pages?.[String(page.pageid)];
    const extract = article?.extract?.trim();

    if (!article || !extract || extract.length < 45) {
      answerCache.set(cacheKey, null);
      return localResponse;
    }

    const response: HelpResponse = {
      answer:
        `${article.title}\n\n${extract}\n\nThis is general reference information, not an official ProjexiaHub policy or project quotation.`,
      source: {
        label: `Wikipedia — ${article.title}`,
        url: `https://en.wikipedia.org/?curid=${article.pageid}`,
      },
    };

    answerCache.set(cacheKey, response);
    while (answerCache.size > 100) {
      const oldestKey = answerCache.keys().next().value;
      if (!oldestKey) break;
      answerCache.delete(oldestKey);
    }

    return response;
  } catch {
    // Network errors, blocked requests, timeouts and API failures all
    // preserve the existing safe local fallback.
    return localResponse;
  }
}
