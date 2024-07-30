export type TimeEntry = {
  date?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  durationString?: string;
  durationStringPerDay?: string;
  totalDurationPerDay?: number;
  status?: 'entry' | 'day' | 'empty' | 'week';
};
