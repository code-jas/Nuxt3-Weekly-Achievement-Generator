import { FirebaseStorage } from 'firebase/storage';
import exportService from '~/server/services/exportService';
import { useUser } from '@/composables/useUser';
import { useFirebase } from '@/composables/useFirebase';
import { DateRangeQuery } from '~/types/clockify-time-entry';
type ReportItem = {
  columns: string[];
};
type Reports = ReportItem[];

export default defineEventHandler(async (event): Promise<any> => {
  try {
    const body = await readBody(event);
    // map the clockify entries report
    const reportItems: Reports = [];
    body.entries.map((item: any) => {
      reportItems.push({
        columns: Object.entries(item)
          .filter(([key, _]) => key !== 'status')
          .map(([_, value]) => {
            return String(value);
          }),
      });
    });
    const periodCovered = formatDateRange(body.periodCovered);

    const user = useUser(event); // get the current user
    const userData = JSON.parse(user.data); // parse the user data
    const excelData = { ...userData, periodCovered, war: reportItems }; // add it in  excel data

    const filename = `${userData.name.replace(/ /g, '_')}_${makeUnderscored(periodCovered)}_Weekly_Accomplishment_Report.xlsx`;

    const base64Data = await exportService.generateExcel('/war-template.xlsx', excelData);
    const publicUrl = await exportService.saveToGoogleDrive(
      userData.clockifyUserId,
      filename,
      base64Data,
    );
    // const { storage }: { storage: FirebaseStorage } = useFirebase();
    // const publicUrl = await xlsxPrinterService.saveToFirebase(storage, base64Data, 'test-war.xlsx');

    return { url: publicUrl };
  } catch (error: any) {
    console.error('Error occurred while generating the report:', error);
    sendError(event, new Error(error));
  }
});

const formatDateRange = (dateRange: DateRangeQuery): string => {
  const options = { month: 'long', day: '2-digit', year: 'numeric' } as const;
  const startDate = new Date(dateRange.start as string);
  const endDate = new Date(dateRange.end as string);

  endDate.setDate(endDate.getDate() - 1);

  const formattedStartDate = startDate.toLocaleDateString('en-US', options);
  const formattedEndDate = endDate.toLocaleDateString('en-US', options);

  return `${formattedStartDate} - ${formattedEndDate}`;
};
const makeUnderscored = (str: string) => str.replace(/ /g, '_');
