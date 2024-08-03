import { useGoogleAPI } from '@/composables/useGoogleAPI';
import { ApiResponse } from '~/types/api';

export default defineEventHandler(async (event): Promise<any> => {
  try {
    const body = await readBody(event);

    const { getFileStream } = useGoogleAPI();

    // export to excel
    const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    const filestream = await getFileStream(body.fileId, mimeType);

    if (body.isEmailCheck) {
      // handle email sending in composables
      // no need to wait for the email to be sent before continuing
    }
    if (body.isSlackSend) {
      // handle slack sending in composables
      // no need to wait for the slack message to be sent before continuing
    }

    // event.node.res.setHeader('Content-Disposition', `attachment; filename=${body.filename}`);
    event.node.res.setHeader('Content-Disposition', 'attachment; filename=exported_file.xlsx');
    event.node.res.setHeader('Content-Type', mimeType);

    console.log('body.filename :>> ', body.filename);
    console.log('filestream :>> ', filestream);

    // Send the file stream to the client
    return sendStream(event, filestream);
  } catch (error: any) {
    console.error('Error occurred while generating the report:', error);
    sendError(event, new Error(error));
  }
});
