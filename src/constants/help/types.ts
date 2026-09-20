export type HelpIntent =
  | "greeting"
  | "hours"
  | "location"
  | "pricing"
  | "availability"
  | "quantity"
  | "timeline"
  | "purpose"
  | "definition"
  | "capability"
  | "procedure"
  | "troubleshooting"
  | "comparison"
  | "compatibility"
  | "requirements"
  | "project_request"
  | "project_requirements"
  | "source"
  | "contact"
  | "general";

export interface HelpEntry {
  id: string;
  category: string;
  intent?: HelpIntent;
  question: string;
  variations: readonly string[];
  keywords: readonly string[];
  answer: string;
  priority?: number;
}
