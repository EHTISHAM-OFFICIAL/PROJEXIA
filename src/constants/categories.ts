/**
 * Project categories. Adding a category here makes it available everywhere:
 * project filters, the admin editor, and the request form.
 */
export const PROJECT_CATEGORIES = [
  'Arduino',
  'ESP32',
  'IoT',
  'Robotics',
  'Automation',
  'Embedded Systems',
  'Sensors',
  'Smart Home',
  'Electronics',
  'Other',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
