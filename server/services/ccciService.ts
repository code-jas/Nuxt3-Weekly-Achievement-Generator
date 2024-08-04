import DateTimeService from './datetimeService';
import dayjs from 'dayjs';
import type { TimeEntryList } from '~/types/clockify-time-entry';
import type { TimeEntry } from '~/types/time-entry';

export default class CcciService {
  static async getFormattedTimeEntries(timeEntries: TimeEntryList): Promise<TimeEntry[]> {
    try {
      const processedEntries: TimeEntry[] = [];
      let totalDurationPerDay = 0;
      let totalWeekDuration = 0;
      let currentDay: string | null = null;

      for (const item of timeEntries) {
        const { start, end, duration } = item.timeInterval;
        const entryDate = DateTimeService.dateFormat(new Date(start));
        const durationString = DateTimeService.readDuration(duration);
        const entryDurationSeconds = DateTimeService.timeToSeconds(durationString);

        if (!dayjs(entryDate).isSame(currentDay, 'day')) {
          if (currentDay !== null) {
            processedEntries.push(
              this.createTotalDurationEntry(currentDay, totalDurationPerDay),
              this.createEmptyColumn(),
            );
            totalWeekDuration += totalDurationPerDay;
          }
          currentDay = entryDate;
          totalDurationPerDay = 0;
        }

        processedEntries.push({
          date: entryDate,
          description: item.description,
          startTime: DateTimeService.timeFormat(new Date(start)),
          endTime: DateTimeService.timeFormat(new Date(end)),
          duration: durationString,
          status: 'entry',
        });

        totalDurationPerDay += entryDurationSeconds;
      }

      if (currentDay) {
        processedEntries.push(
          this.createTotalDurationEntry(currentDay, totalDurationPerDay),
          this.createEmptyColumn(),
        );
        totalWeekDuration += totalDurationPerDay;
      }

      processedEntries.push({
        date: '',
        description: '',
        startTime: '',
        endTime: 'Week Total Duration:',
        duration: DateTimeService.secondsToHMS(totalWeekDuration),
        status: 'week',
      });

      return processedEntries;
    } catch (error) {
      console.error('Error in getFormattedTimeEntries:', error);
      throw error;
    }
  }

  private static createTotalDurationEntry(date: string, totalDurationPerDay: number): TimeEntry {
    return {
      date,
      description: '',
      startTime: '',
      endTime: 'Total Duration: ',
      duration: DateTimeService.secondsToHMS(totalDurationPerDay),
      status: 'day',
    };
  }

  private static createEmptyColumn(): TimeEntry {
    return {
      date: '',
      description: '',
      startTime: '',
      endTime: '',
      duration: '',
      status: 'empty',
    };
  }
}
