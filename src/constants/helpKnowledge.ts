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
 * Complete local knowledge base for the MECTEC Help Assistant.
 *
 * The assistant does not use AI or an external API.
 * All answers are selected locally from these knowledge entries.
 *
 * IMPORTANT:
 * Keep business-specific information such as actual:
 * - opening hours
 * - address
 * - prices
 * - delivery charges
 * - warranty periods
 * - payment methods
 *
 * accurate before publishing those answers to customers.
 */
export const HELP_KNOWLEDGE: HelpEntry[] = [
  // ------------------------------------------------------------
  // BASIC / CONVERSATIONAL
  // ------------------------------------------------------------
  ...BASIC_HELP,
  ...CASUAL_HELP,

  // ------------------------------------------------------------
  // GENERAL MECTEC QUESTIONS
  // ------------------------------------------------------------
  ...GENERAL_HELP,

  // ------------------------------------------------------------
  // CUSTOMER REQUESTS
  // ------------------------------------------------------------
  ...REQUEST_HELP,

  // ------------------------------------------------------------
  // SERVICES
  // ------------------------------------------------------------
  ...SERVICES_HELP,

  // ------------------------------------------------------------
  // PROJECTS
  // ------------------------------------------------------------
  ...PROJECT_HELP,

  // ------------------------------------------------------------
  // PRICING
  // ------------------------------------------------------------
  ...PRICING_HELP,

  // ------------------------------------------------------------
  // PROJECT TIMELINES
  // ------------------------------------------------------------
  ...TIMELINE_HELP,

  // ------------------------------------------------------------
  // CONTACT / COMMUNICATION
  // ------------------------------------------------------------
  ...CONTACT_HELP,

  // ------------------------------------------------------------
  // GENERAL ELECTRONICS
  // ------------------------------------------------------------
  ...ELECTRONICS_HELP,

  // ------------------------------------------------------------
  // ELECTRONIC COMPONENTS
  // ------------------------------------------------------------
  ...COMPONENT_HELP,

  // ------------------------------------------------------------
  // MICROCONTROLLERS
  // ------------------------------------------------------------
  ...MICROCONTROLLER_HELP,

  // ------------------------------------------------------------
  // SENSORS
  // ------------------------------------------------------------
  ...SENSOR_HELP,

  // ------------------------------------------------------------
  // MOTORS / MOTOR CONTROL
  // ------------------------------------------------------------
  ...MOTOR_HELP,

  // ------------------------------------------------------------
  // AUTOMATION
  // ------------------------------------------------------------
  ...AUTOMATION_HELP,

  // ------------------------------------------------------------
  // INTERNET OF THINGS
  // ------------------------------------------------------------
  ...IOT_HELP,

  // ------------------------------------------------------------
  // RFID
  // ------------------------------------------------------------
  ...RFID_HELP,

  // ------------------------------------------------------------
  // TROUBLESHOOTING
  // ------------------------------------------------------------
  ...TROUBLESHOOTING_HELP,

  // ------------------------------------------------------------
  // PCB DESIGN / MANUFACTURING
  // ------------------------------------------------------------
  ...PCB_HELP,

  // ------------------------------------------------------------
  // FIRMWARE / PROGRAMMING
  // ------------------------------------------------------------
  ...FIRMWARE_HELP,

  // ------------------------------------------------------------
  // MECTEC PORTFOLIO
  // ------------------------------------------------------------
  ...PORTFOLIO_HELP,

  // ------------------------------------------------------------
  // WEBSITE / WEB DEVELOPMENT
  // ------------------------------------------------------------
  ...WEBSITE_HELP,

  // ------------------------------------------------------------
  // BUSINESS POLICIES
  // ------------------------------------------------------------
  ...POLICIES_HELP,
];
