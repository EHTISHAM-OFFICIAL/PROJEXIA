import type { RequestPriority, RequestStatus } from '../types/projectRequest';

export const CONTACT_METHODS = ['Email', 'WhatsApp', 'Phone'] as const;

export const PROJECT_TYPES = [
  'Educational',
  'Personal',
  'Prototype',
  'Business',
  'Commercial',
  'Research',
  'Final Year Project',
  'Other',
] as const;

export const PLATFORM_OPTIONS = [
  'Arduino',
  'ESP32',
  'ESP8266',
  'Raspberry Pi',
  'STM32',
  'Raspberry Pi Pico',
  'Microcontroller',
  'No preference',
  'Other',
] as const;

export const CONNECTIVITY_OPTIONS = [
  'WiFi',
  'Bluetooth',
  'BLE',
  'GSM',
  'GPS',
  'LoRa',
  'Ethernet',
  'USB',
  'None',
  'Other',
] as const;

export const SENSOR_OPTIONS = [
  'Temperature',
  'Humidity',
  'Motion',
  'Distance',
  'Light',
  'Gas',
  'Pressure',
  'GPS',
  'Current',
  'Voltage',
  'Other',
] as const;

export const OUTPUT_OPTIONS = [
  'LCD',
  'OLED',
  'LED',
  'Buzzer',
  'Relay',
  'Motor',
  'Servo',
  'Stepper Motor',
  'Display',
  'Other',
] as const;

export const POWER_SOURCES = [
  'USB',
  'Battery',
  'AC Adapter',
  'Solar',
  'Other',
  'No preference',
] as const;

export const LANGUAGE_OPTIONS = ['C', 'C++', 'Python', 'JavaScript', 'Other', 'No preference'] as const;

export const COMPLEXITY_OPTIONS = ['Basic', 'Intermediate', 'Advanced', 'Not sure'] as const;

export const DEPLOYMENT_ENVIRONMENTS = [
  'Home',
  'School/University',
  'Laboratory',
  'Office',
  'Factory',
  'Outdoor',
  'Other',
] as const;

export const BUDGET_RANGES = [
  'Under PKR 5,000',
  'PKR 5,000–10,000',
  'PKR 10,000–25,000',
  'PKR 25,000–50,000',
  'PKR 50,000–100,000',
  'Above PKR 100,000',
  'Not decided yet',
] as const;

export const TIMELINE_FLEXIBILITY = ['Flexible', 'Somewhat flexible', 'Strict deadline'] as const;

export const URGENCY_OPTIONS = ['Low', 'Normal', 'Urgent'] as const;

export const REQUEST_STATUSES: { value: RequestStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const REQUEST_PRIORITIES: { value: RequestPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const REQUEST_STATUS_TONE: Record<
  RequestStatus,
  'success' | 'info' | 'warning' | 'danger' | 'neutral'
> = {
  new: 'info',
  reviewing: 'warning',
  quoted: 'warning',
  accepted: 'success',
  'in-progress': 'info',
  completed: 'success',
  rejected: 'danger',
  cancelled: 'neutral',
};

export const REQUEST_PRIORITY_TONE: Record<
  RequestPriority,
  'success' | 'info' | 'warning' | 'danger' | 'neutral'
> = {
  low: 'neutral',
  normal: 'info',
  high: 'warning',
  urgent: 'danger',
};

/** Attachment rules. Mirrored in storage.rules — the rules are the real enforcement. */
export const ATTACHMENT_RULES = {
  maxFiles: 5,
  maxSizeBytes: 5 * 1024 * 1024,
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.pdf', '.doc', '.docx', '.txt'],
} as const;

/** Project image rules, used by the admin media uploader. */
export const PROJECT_IMAGE_RULES = {
  maxSizeBytes: 5 * 1024 * 1024,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
} as const;
