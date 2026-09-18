import type { ProjectDifficulty, ProjectStatus, ProjectSortKey } from '../types/project';

interface Option<T extends string> {
  value: T;
  label: string;
}

export const PROJECT_STATUSES: Option<ProjectStatus>[] = [
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'planned', label: 'Planned' },
  { value: 'archived', label: 'Archived' },
];

export const PROJECT_DIFFICULTIES: Option<ProjectDifficulty>[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const PROJECT_SORT_OPTIONS: Option<ProjectSortKey>[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'title-desc', label: 'Title Z–A' },
];

/** Suggested technology tags. Free text is still allowed in the admin editor. */
export const TECHNOLOGY_OPTIONS = [
  'Arduino',
  'ESP32',
  'ESP8266',
  'Raspberry Pi',
  'Raspberry Pi Pico',
  'STM32',
  'C++',
  'Python',
  'MicroPython',
  'MQTT',
  'Firebase',
  'React',
  'Node.js',
  'LoRa',
  'Bluetooth',
  'WiFi',
  'GSM',
  'PCB Design',
  '3D Printing',
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  planned: 'Planned',
  archived: 'Archived',
};

export const DIFFICULTY_LABEL: Record<ProjectDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

/** Badge tone per status, consumed by <Badge tone="..."> */
export const STATUS_TONE: Record<ProjectStatus, 'success' | 'info' | 'warning' | 'neutral'> = {
  completed: 'success',
  'in-progress': 'info',
  planned: 'warning',
  archived: 'neutral',
};

export const PROJECTS_PER_PAGE = 9;
export const FEATURED_PROJECTS_LIMIT = 3;
