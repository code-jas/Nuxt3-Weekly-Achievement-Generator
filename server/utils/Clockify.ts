import Mixins from './Mixins'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isoWeek)
dayjs.extend(isBetween)

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
    static async getWeeklyReport(data: any, start?: string, end?: string): Promise<any>{
        try {
            let accomplishmentReports = [];
            const processedEntries = [];
            let totalDuration = 0;
            let totalDurationPerDay = 0;

            const currentDate = dayjs();
            let startDate, endDate;

              
            // Check if start and end parameters are provided, otherwise use the current week
            if (start && end) {
                startDate = dayjs(start).startOf('day');
                endDate = dayjs(end).endOf('day');
            } else {
                // startDate = currentDate.startOf('isoWeek').isoWeekday(1); 
                // endDate = currentDate.endOf('isoWeek').isoWeekday(7);            
                startDate = currentDate.startOf('isoWeek').isoWeekday(1); 
                endDate = currentDate.endOf('isoWeek').isoWeekday(7);            
            }


            // console.log('startDate', startDate.format('YYYY-MM-DD HH:mm:ss'))
            // console.log('endDate :>> ', endDate.format('YYYY-MM-DD HH:mm:ss'));

            const emptyColumn = {date: '', description: '', startTime: '', endTime: '', formattedDuration: '',formattedTotalDurationPerDay:'',totalDurationPerDay: 0,status: 'empty'}
            
            let currentDay = null;

            for (const item of data) {
                const entryDate = dayjs(item.timeInterval.start);
                // Check if the entry's date is within the specified range
                if (entryDate.isBetween(startDate, endDate, undefined, '[]')) {
                    const formattedDuration = Mixins.readDuration(item.timeInterval.duration);  
            
                    const entry = {
                        date: Mixins.dateFormat(item.timeInterval.start),
                        description: item.description,
                        startTime: Mixins.timeFormat(item.timeInterval.start),
                        endTime: Mixins.timeFormat(item.timeInterval.end),
                        formattedDuration: formattedDuration,
                        duration: Mixins.timeToSeconds(formattedDuration),
                        status: 'entry'
                    };
                    if (!dayjs(item.timeInterval.start).isSame(currentDay, 'day')) {   
                        if (currentDay !== null) {
                            processedEntries.push({
                                date: Mixins.dateFormat(currentDay),
                                description: '',
                                startTime: '',
                                endTime: 'Total Duration: ',
                                formattedDuration: Mixins.secondsToHMS(totalDurationPerDay),
                                formattedTotalDurationPerDay: Mixins.secondsToHMS(totalDurationPerDay),
                                totalDurationPerDay,
                                status: 'day'
                            },emptyColumn);
                        }
                        currentDay = item.timeInterval.start;
                        totalDurationPerDay = 0;
                    }
            
                    processedEntries.push(entry);
            
                    totalDurationPerDay += entry.duration;
                    totalDuration += entry.duration;
                }
            }

            processedEntries.push({
                date: Mixins.dateFormat(currentDay),
                description: '',
                startTime: '',
                endTime: 'Total Duration: ',
                formattedDuration: Mixins.secondsToHMS(totalDurationPerDay),
                formattedTotalDurationPerDay: Mixins.secondsToHMS(totalDurationPerDay),
                totalDurationPerDay: totalDurationPerDay,
                status: 'day'
            },emptyColumn);

            const totalWeekDuration = processedEntries.reduce((acc, curr) =>  acc + ((curr as IEntry).totalDurationPerDay || 0), 0);
            
            processedEntries.push({
                date: '',
                description: '',
                startTime: '',
                endTime: 'Week Total Duration:',
                formattedTotalDurationPerDay: Mixins.secondsToHMS(totalWeekDuration),
            })
            

            accomplishmentReports = processedEntries;
            // console.log("accomplishmentReports :>> ", JSON.stringify(accomplishmentReports, null, 3));
            return accomplishmentReports;

        } catch (error) {
            console.log('Clockify class getWeeklyReport Error :>> ', error);
        }
    }
}
