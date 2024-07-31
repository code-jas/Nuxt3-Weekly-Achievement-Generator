import { useUser } from '@/composables/useUser';
import CCCIService from '../../../services/ccciService';

import type { TimeEntryList } from '~/types/clockify-time-entry';

export default defineEventHandler(async (event): Promise<any> => {
  try {
    const config = useRuntimeConfig(event);
    // Get query parameters
    const query = getQuery(event);

    // // Access specific query parameters
    // const start = query.start as string;
    // const end = query.end as string;

    const user = useUser(event);
    if (!user.success) {
      throw new Error(user.message);
    }

    const userData = JSON.parse(user.data);
    const { clockifyUserId } = userData;

    console.log('clockifyUserId :>> ', clockifyUserId);

    const response: TimeEntryList = await $fetch<TimeEntryList>(
      `/workspaces/${config.workspaceId}/user/${clockifyUserId}/time-entries`,
      {
        baseURL: config.baseUrl,
        headers: { 'x-api-key': config.apiKey },
        query: query,
      },
    );

    if (!response) {
      const errorMessage = (response as any).message || 'Request failed';
      console.log('errorMessage :>> ', errorMessage);
      throw new Error((response as any).message || 'Request failed');
    }

    const timeEntries: TimeEntryList = response.sort(
      (a: any, b: any) =>
        new Date(a.timeInterval.start).getTime() - new Date(b.timeInterval.start).getTime(),
    );

    // console.log('response :>> ', response);
    // console.log('timeEntries :>> ', timeEntries);
    const result = await CCCIService.getFormattedTimeEntries(timeEntries);
    // console.log('result :>> ', result);
    // await Clockify.getWeeklyReport(response);
    //   const result = dateRange
    //     ? await Clockify.getWeeklyReport(response, dateRange[0], dateRange[1])
    //     : await Clockify.getWeeklyReport(response);
    // console.log('result :>> ', JSON.stringify(result,null,2));
    //   return result;
    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    console.error('Error retrieving time entries:', error);
    sendError(event, new Error(error));
  }
});
