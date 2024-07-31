export type TimeEntry = {
  date?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  durationStringPerDay?: string;
  totalDurationPerDay?: number;
  status?: 'entry' | 'day' | 'empty' | 'week';
};
