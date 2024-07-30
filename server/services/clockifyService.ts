import DateTimeService from './datetimeService';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);

interface IEntry {
  date?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  formattedDuration?: string;
  formattedTotalDurationPerDay?: string;
  totalDurationPerDay?: number;
  status?: string;
}

export default class Clockify {
  /**
   * Retrieves the weekly report based on the provided data and optional start and end dates.
   * If start and end dates are not provided, the report will be generated for the current week.
   *
   * @param data - The data to generate the report from.
   * @param start - Optional start date in string format (YYYY-MM-DD).
   * @param end - Optional end date in string format (YYYY-MM-DD).
   * @returns A Promise that resolves to the weekly report.
   */
  static async getWeeklyReport(data: any, start?: string, end?: string): Promise<any> {
    try {
      let accomplishmentReports = [];
      const processedEntries = [];
      // const totalDuration = 0;
      let totalDurationPerDay = 0;

      const currentDate = dayjs();
      let startDate, endDate;

      // Check if start and end parameters are provided, otherwise use the current week
      if (start && end) {
        startDate = dayjs(start).startOf('day');
        endDate = dayjs(end).endOf('day');
      } else {
        startDate = currentDate.startOf('isoWeek').isoWeekday(1);
        endDate = currentDate.endOf('isoWeek').isoWeekday(7);
      }

      const emptyColumn = {
        date: '',
        description: '',
        startTime: '',
        endTime: '',
        formattedDuration: '',
        formattedTotalDurationPerDay: '',
        totalDurationPerDay: 0,
        status: 'empty',
      };

      let currentDay = null;

      for (const item of data) {
        const entryDate = dayjs(item.timeInterval.start);
        // Check if the entry's date is within the specified range
        if (entryDate.isBetween(startDate, endDate, undefined, '[]')) {
          const formattedDuration = DateTimeService.readDuration(item.timeInterval.duration);

          const entry = {
            date: DateTimeService.dateFormat(item.timeInterval.start),
            description: item.description,
            startTime: DateTimeService.timeFormat(item.timeInterval.start),
            endTime: DateTimeService.timeFormat(item.timeInterval.end),
            formattedDuration: formattedDuration,
            duration: DateTimeService.timeToSeconds(formattedDuration),
            status: 'entry',
          };
          if (!dayjs(item.timeInterval.start).isSame(currentDay, 'day')) {
            if (currentDay !== null) {
              processedEntries.push(
                {
                  date: DateTimeService.dateFormat(currentDay),
                  description: '',
                  startTime: '',
                  endTime: 'Total Duration: ',
                  formattedDuration: DateTimeService.secondsToHMS(totalDurationPerDay),
                  formattedTotalDurationPerDay: DateTimeService.secondsToHMS(totalDurationPerDay),
                  totalDurationPerDay,
                  status: 'day',
                },
                emptyColumn,
              );
            }
            currentDay = item.timeInterval.start;
            totalDurationPerDay = 0;
          }

          processedEntries.push(entry);

          totalDurationPerDay += entry.duration;
          // totalDuration += entry.duration;
        }
      }

      processedEntries.push(
        {
          date: DateTimeService.dateFormat(currentDay),
          description: '',
          startTime: '',
          endTime: 'Total Duration: ',
          formattedDuration: DateTimeService.secondsToHMS(totalDurationPerDay),
          formattedTotalDurationPerDay: DateTimeService.secondsToHMS(totalDurationPerDay),
          totalDurationPerDay: totalDurationPerDay,
          status: 'day',
        },
        emptyColumn,
      );

      const totalWeekDuration = processedEntries.reduce(
        (acc, curr) => acc + ((curr as IEntry).totalDurationPerDay || 0),
        0,
      );

      processedEntries.push({
        date: '',
        description: '',
        startTime: '',
        endTime: 'Week Total Duration:',
        formattedTotalDurationPerDay: DateTimeService.secondsToHMS(totalWeekDuration),
      });

      accomplishmentReports = processedEntries;
      // console.log("accomplishmentReports :>> ", JSON.stringify(accomplishmentReports, null, 3));
      return accomplishmentReports;
    } catch (error) {
      console.log('Clockify class getWeeklyReport Error :>> ', error);
    }
  }
}
