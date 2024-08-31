import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(weekday);
dayjs.extend(timezone);
dayjs.extend(utc);

/**
 * This class provides utility methods for handling various date and time conversions
 *
 * Methods:
 * 1. readDuration: Converts a duration string in the format "PTxHxMxS" to "HH:MM:SS".
 * 2. addLeadingZeros: Adds leading zeros to a string value to match a specified length.
 * 3. secondsToHMS: Converts the given number of seconds to a string representation in the format "HH:MM:SS".
 * 4. getWeekDayIndex: Returns the index of the week day for the given date.
 * 5. getWeekDay: Returns the week day name corresponding to the given date.
 * 6. dateFormat: Formats a date object into a string with the format 'MM/DD/YYYY'.
 * 7. timeFormat: Formats the given date into a string representation of time in the format 'hh:mm:ss A' for the 'Asia/Manila' timezone.
 * 8. timeToSeconds: Converts a time string in the format 'HH:MM:SS' to seconds.
 */
export default class DateTimeService {
  /**
   * Converts a duration string in the format "PTxHxMxS" to a formatted duration string in the format "HH:MM:SS".
   * @param duration - The duration string to be converted.
   * @returns The formatted duration string in the format "HH:MM:SS", or "Invalid duration" if the input is not in the correct format.
   */
  static readDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (match) {
      const hours = match[1] !== undefined ? this.addLeadingZeros(match[1].slice(0, -1), 2) : '00';
      const minutes =
        match[2] !== undefined ? this.addLeadingZeros(match[2].slice(0, -1), 2) : '00';
      const seconds =
        match[3] !== undefined ? this.addLeadingZeros(match[3].slice(0, -1), 2) : '00';
      const formattedDuration = `${hours}:${minutes}:${seconds}`;
      return formattedDuration;
    }
    return 'Invalid duration';
  }

  /**
   * Adds leading zeros to a string value to match a specified length.
   * @param value - The string value to add leading zeros to.
   * @param length - The desired length of the resulting string.
   * @returns The string value with leading zeros added.
   */
  static addLeadingZeros(value: string, length: number): string {
    const numStr = String(value);
    const zerosToAdd = Math.max(length - numStr.length, 0);
    return '0'.repeat(zerosToAdd) + numStr;
  }

  /**
   * Converts the given number of seconds to a string representation in the format HH:MM:SS.
   *
   * @param seconds - The number of seconds to convert.
   * @returns A string representation of the given number of seconds in the format HH:MM:SS.
   */
  static secondsToHMS(seconds: number): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedHours: string = String(hours).padStart(2, '0');
    const formattedMinutes: string = String(minutes).padStart(2, '0');
    const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  /**
   * Returns the index of the week day for the given date.
   * @param d - The date object.
   * @returns The index of the week day (0-6, where 0 represents Sunday).
   */
  static getWeekDayIndex(d: any): number {
    return dayjs(d).weekday();
  }

  /**
   * Returns the week day corresponding to the given date.
   * @param d - The date object.
   * @param days - An array of week day names.
   * @returns The week day name.
   */
  static getWeekDay(d: any, days: string[]): string {
    return days[this.getWeekDayIndex(d) - 1];
  }

  /**
   * Formats a date object into a string with the format 'MM/DD/YYYY'.
   * @param d - The date object to be formatted.
   * @returns A string representation of the formatted date.
   */
  static dateFormat(d: any): string {
    const manilaTime = dayjs(d).tz('Asia/Manila').format('MM/DD/YYYY');
    return manilaTime;
  }

  /**
   * Formats the given date into a string representation of time in the format 'hh:mm:ss A'.
   * The time is converted to the 'Asia/Manila' timezone.
   * @param d - The date to be formatted.
   * @returns The formatted time string.
   */
  static timeFormat(d: any): string {
    return dayjs.utc(d).tz('Asia/Manila').format('hh:mm:ss A');
  }

  /**
   * Converts a time string in the format 'HH:MM:SS' to seconds.
   * @param time The time string to convert.
   * @returns The number of seconds.
   */
  static timeToSeconds(time: string): number {
    return time.split(':').reduce((acc, time) => 60 * acc + +time, 0);
  }
}
