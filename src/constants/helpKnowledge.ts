import type { HelpEntry } from "./help/types";

import { CASUAL_HELP } from "./help/casual";
import { BASIC_HELP } from "./help/basic";
import { GENERAL_HELP } from "./help/general";
import { REQUEST_HELP } from "./help/requests";
import { SERVICES_HELP } from "./help/services";
import { PROJECT_HELP } from "./help/projects";
import { PRICING_HELP } from "./help/pricing";
import { TIMELINE_HELP } from "./help/timelines";
import { CONTACT_HELP } from "./help/contact";
import { ELECTRONICS_HELP } from "./help/electronics";
import { COMPONENT_HELP } from "./help/components";
import { MICROCONTROLLER_HELP } from "./help/microcontrollers";
import { SENSOR_HELP } from "./help/sensors";
import { MOTOR_HELP } from "./help/motors";
import { AUTOMATION_HELP } from "./help/automation";
import { IOT_HELP } from "./help/iot";
import { RFID_HELP } from "./help/rfid";
import { TROUBLESHOOTING_HELP } from "./help/troubleshooting";
import { PCB_HELP } from "./help/pcb";
import { FIRMWARE_HELP } from "./help/firmware";
import { PORTFOLIO_HELP } from "./help/portfolio";
import { WEBSITE_HELP } from "./help/website";
import { POLICIES_HELP } from "./help/policies";

export type { HelpEntry } from "./help/types";

/**
 * Convert readonly knowledge collections into normal arrays.
 *
 * Keeping this boundary here prevents TypeScript from constructing
 * one enormous literal union from all knowledge modules.
 */
function normalizeHelp(entries: readonly HelpEntry[]): HelpEntry[] {
  return entries.slice();
}

/* -------------------------------------------------------------------------- */
/* KNOWLEDGE GROUPS                                                           */
/* -------------------------------------------------------------------------- */

const BASIC_KNOWLEDGE: HelpEntry[] = [
  ...normalizeHelp(BASIC_HELP),
  ...normalizeHelp(CASUAL_HELP),
];

const BUSINESS_KNOWLEDGE: HelpEntry[] = [
  ...normalizeHelp(GENERAL_HELP),
  ...normalizeHelp(REQUEST_HELP),
  ...normalizeHelp(SERVICES_HELP),
  ...normalizeHelp(PROJECT_HELP),
  ...normalizeHelp(PRICING_HELP),
  ...normalizeHelp(TIMELINE_HELP),
  ...normalizeHelp(CONTACT_HELP),
];

const ELECTRONICS_KNOWLEDGE: HelpEntry[] = [
  ...normalizeHelp(ELECTRONICS_HELP),
  ...normalizeHelp(COMPONENT_HELP),
  ...normalizeHelp(MICROCONTROLLER_HELP),
  ...normalizeHelp(SENSOR_HELP),
  ...normalizeHelp(MOTOR_HELP),
];

const EMBEDDED_KNOWLEDGE: HelpEntry[] = [
  ...normalizeHelp(AUTOMATION_HELP),
  ...normalizeHelp(IOT_HELP),
  ...normalizeHelp(RFID_HELP),
  ...normalizeHelp(TROUBLESHOOTING_HELP),
  ...normalizeHelp(PCB_HELP),
  ...normalizeHelp(FIRMWARE_HELP),
];

const WEBSITE_KNOWLEDGE: HelpEntry[] = [
  ...normalizeHelp(PORTFOLIO_HELP),
  ...normalizeHelp(WEBSITE_HELP),
  ...normalizeHelp(POLICIES_HELP),
];

/**
 * Complete local MECTEC knowledge base.
 *
 * No external AI API, paid service, database, or network request
 * is required by the chatbot.
 */
export const HELP_KNOWLEDGE: HelpEntry[] = [
  ...BASIC_KNOWLEDGE,
  ...BUSINESS_KNOWLEDGE,
  ...ELECTRONICS_KNOWLEDGE,
  ...EMBEDDED_KNOWLEDGE,
  ...WEBSITE_KNOWLEDGE,
];
