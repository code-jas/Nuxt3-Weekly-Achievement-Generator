import DateTimeService from './datetimeService';
import dayjs from 'dayjs';
import type { TimeEntryList } from '~/types/clockify-time-entry';
import type { TimeEntry } from '~/types/time-entry';

export default class CcciService {
  static async getFormattedTimeEntries(timeEntries: TimeEntryList): Promise<TimeEntry[]> {
    try {
      const processedEntries: TimeEntry[] = [];
      let totalDurationPerDay = 0;
      let currentDay: string | null = null;

      for (const item of timeEntries) {
        const durationString = DateTimeService.readDuration(item.timeInterval.duration);
        const entryDate = DateTimeService.dateFormat(new Date(item.timeInterval.start));

        if (!dayjs(entryDate).isSame(currentDay, 'day')) {
          if (currentDay !== null) {
            processedEntries.push(
              this.createTotalDurationEntry(currentDay, totalDurationPerDay),
              this.createEmptyColumn(),
            );
          }
          currentDay = entryDate;
          totalDurationPerDay = 0;
        }

        const entry: TimeEntry = {
          date: entryDate,
          description: item.description,
          startTime: DateTimeService.timeFormat(new Date(item.timeInterval.start)),
          endTime: DateTimeService.timeFormat(new Date(item.timeInterval.end)),
          durationString,
          totalDurationPerDay: DateTimeService.timeToSeconds(durationString),
          status: 'entry',
        };

        processedEntries.push(entry);
        totalDurationPerDay += entry.totalDurationPerDay || 0;
      }

      if (currentDay) {
        processedEntries.push(
          this.createTotalDurationEntry(currentDay, totalDurationPerDay),
          this.createEmptyColumn(),
        );
      }

      const totalWeekDuration = processedEntries.reduce(
        (acc, curr) => acc + (curr.totalDurationPerDay || 0),
        0,
      );
      console.log('totalWeekDuration :>> ', totalWeekDuration);

      processedEntries.push({
        date: '',
        description: '',
        startTime: '',
        endTime: 'Week Total Duration:',
        durationStringPerDay: DateTimeService.secondsToHMS(totalWeekDuration),
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
      durationStringPerDay: DateTimeService.secondsToHMS(totalDurationPerDay),
      totalDurationPerDay,
      status: 'day',
    };
  }

  private static createEmptyColumn(): TimeEntry {
    return {
      date: '',
      description: '',
      startTime: '',
      endTime: '',
      durationString: '',
      durationStringPerDay: '',
      totalDurationPerDay: 0,
      status: 'empty',
    };
  }
}
