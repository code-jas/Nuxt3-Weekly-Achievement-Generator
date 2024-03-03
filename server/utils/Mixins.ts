import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday.js';
import utc from 'dayjs/plugin/utc.js';
import  timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(weekday)
dayjs.extend(timezone)
dayjs.extend(utc)


export default class Mixins { 
    static myGlobalMethod(): void {
        console.log('this is a global method');
    }

    static readDuration(duration: string): string {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        if (match) {
            const hours = match[1] !== undefined ? this.addLeadingZeros(match[1].slice(0, -1), 2) : '00';
            const minutes = match[2] !== undefined ? this.addLeadingZeros(match[2].slice(0, -1), 2) : '00';
            const seconds = match[3] !== undefined ? this.addLeadingZeros(match[3].slice(0, -1), 2) : '00';
            const formattedDuration = `${hours}:${minutes}:${seconds}`;
            return formattedDuration;
        }
        return 'Invalid duration';
    }
    
    static addLeadingZeros(value: string, length: number): string { 
        const numStr = String(value);
        const zerosToAdd = Math.max(length - numStr.length, 0);
        return '0'.repeat(zerosToAdd) + numStr;
    }

    static secondsToHMS(seconds: number): string {
        const hours: number = Math.floor(seconds / 3600);
        const minutes: number = Math.floor((seconds % 3600) / 60);
        const remainingSeconds: number = seconds % 60;
    
        const formattedHours: string = String(hours).padStart(2, "0");
        const formattedMinutes: string = String(minutes).padStart(2, "0");
        const formattedSeconds: string = String(remainingSeconds).padStart(2, "0");
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    
    static getWeekDayIndex(d: any): number {
        return dayjs(d).weekday();
    }

    static getWeekDay(d: any, days: string[]): string {
        return days[Mixins.getWeekDayIndex(d) - 1];
    }

    static dateFormat(d: any): string {
        return dayjs(d).format("MM/DD/YYYY");
    }

    static timeFormat(d: any): string {
        // const formattedDate = new Date(d).toLocaleTimeString([], {
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //     hour12: true,
        //   })
          
        // //   console.log('timeformat', formattedDate.padStart(11, "0"));
        //   return formattedDate.padStart(11, "0");
        return dayjs.utc(d).tz('Asia/Manila').format("hh:mm:ss A");
    }

    static timeToSeconds(time: string): number {
        return time.split(":").reduce((acc, time) => (60 * acc) + +time, 0);
    }


}