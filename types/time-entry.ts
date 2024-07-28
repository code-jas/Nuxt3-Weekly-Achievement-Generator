export type TimeEntry = {
  date: string;
  description: string;
  startTime: string;
  endTime: string;
  formattedDuration?: string;
  duration?: number;
  formattedTotalDurationPerDay?: string;
  totalDurationPerDay?: number;
  status?: string;
};
