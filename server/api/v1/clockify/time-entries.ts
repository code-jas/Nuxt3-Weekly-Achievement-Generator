import { useUser } from '@/composables/useUser';

export default defineEventHandler(async (event): Promise<any> => {
  try {
    const config = useRuntimeConfig(event);
    const body: { start: string; end: string } = await readBody(event);

    const user = useUser(event);
    if (!user.success) {
      throw new Error(user.message);
    }

    const userData = JSON.parse(user.data);
    const { clockifyUserId } = userData;

    console.log('body :>> ', body);
    console.log('clockifyUserId :>> ', clockifyUserId);

    const response: any = await $fetch<any>(
      `/workspaces/${config.workspaceId}/user/${clockifyUserId}/time-entries`,
      {
        baseURL: config.baseUrl,
        headers: { 'x-api-key': config.apiKey },
        query: body,
      },
    );

    if (!response) {
      const errorMessage = response.message || 'Request failed';
      console.log('errorMessage :>> ', errorMessage);
      throw new Error(response.message || 'Request failed');
    }

    const timeEntries: any = response.sort(
      (a: any, b: any) =>
        new Date(a.timeInterval.start).getTime() - new Date(b.timeInterval.start).getTime(),
    );

    console.log('response :>> ', response);
    console.log('timeEntries :>> ', timeEntries);
    // await Clockify.getWeeklyReport(response);
    //   const result = dateRange
    //     ? await Clockify.getWeeklyReport(response, dateRange[0], dateRange[1])
    //     : await Clockify.getWeeklyReport(response);
    // console.log('result :>> ', JSON.stringify(result,null,2));
    //   return result;
    return {
      success: true,
      data: timeEntries,
    };
  } catch (error: any) {
    console.error('Error retrieving time entries:', error);
    sendError(event, new Error(error.message));

    return {
      success: false,
      message: error.message,
    };
  }
});
