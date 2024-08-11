import { H3Error } from 'h3';

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

    const userData = JSON.parse(user.data);
    const { clockifyUserId } = userData;

    // console.log('clockifyUserId :>> ', clockifyUserId);

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

    const result = await CCCIService.getFormattedTimeEntries(timeEntries);

    return {
      success: true,
      data: result.length > 1 ? result : null,
    };
  } catch (error: any) {
    console.error('Error retrieving time entries:', error);
    const h3Error = new H3Error('Failed to retrieve time entries.');
    h3Error.statusCode = error.statusCode || 500;
    h3Error.data = {
      error: error.message,
    };

    console.log('h3Error :>> ', h3Error);

    throw h3Error;
  }
});
