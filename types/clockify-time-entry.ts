// Define the structure for the time interval object
export interface TimeInterval {
  start: string; // ISO 8601 date-time string
  end: string; // ISO 8601 date-time string
  duration: string; // ISO 8601 duration format (e.g., "PT4H")
}

// Define the main structure for a time entry
export interface TimeEntry {
  id: string; // Unique identifier for the time entry
  description: string; // Description of the task or entry
  tagIds: string[] | null; // Array of tag IDs or null
  userId: string; // ID of the user who created the time entry
  billable: boolean; // Indicates if the time entry is billable
  taskId: string | null; // ID of the task, if applicable
  projectId: string; // ID of the project
  workspaceId: string; // ID of the workspace
  timeInterval: TimeInterval; // Object representing the time interval
  customFieldValues: any[]; // Array for custom fields, define more specifically if known
  type: string; // Type of the time entry (e.g., "REGULAR")
  kioskId: string | null; // ID of the kiosk, if applicable
  hourlyRate: number | null; // Hourly rate, if applicable
  costRate: number | null; // Cost rate, if applicable
  isLocked: boolean; // Indicates if the time entry is locked
}

// Define an array type for a list of time entries
export type TimeEntryList = TimeEntry[];

export interface DateRangeQuery {
  start: string | null;
  end: string | null;
}
