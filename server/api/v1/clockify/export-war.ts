import { useGoogleAPI } from '@/composables/useGoogleAPI';
import { useEmail } from '@/composables/useEmail';
import { H3Event, H3Error, sendStream } from 'h3';
import { useUser } from '~/composables/useUser';
import { PassThrough } from 'stream';

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  try {
    const body = await readBody(event);

    const { getFileStream } = useGoogleAPI();
    const { sendEmail } = useEmail();

    const u = useUser(event); // get the current user
    const user = JSON.parse(u.data); // parse the user data

    const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const filestream = await getFileStream(body.fileId, mimeType);

    const exportedFile = new PassThrough();
    filestream.pipe(exportedFile);

    if (body.emailReport || body.driveLink) {
      const emailData: any = {
        from: 'johnangelo.silvestre04@gmail.com',
        to: 'johnangelosilvestre.ccci@gmail.com',
        subject: `Weekly Report Submission: ${user.name}`,
        user,
      };

      if (body.emailReport) {
        const buffers: Buffer[] = [];
        const attachmentContent = await new Promise<Buffer>((resolve, reject) => {
          filestream.on('data', (chunk) => buffers.push(chunk));
          filestream.on('end', () => resolve(Buffer.concat(buffers)));
          filestream.on('error', (error) => reject(error));
        });

        const attachments = [
          {
            filename: body.filename,
            content: attachmentContent.toString('base64'),
            type: mimeType,
            disposition: 'attachment',
          },
        ];
        emailData.attachments = attachments;
      }

      if (body.driveLink && body.folderId) {
        const { getDriveFolderLink } = useGoogleAPI();
        emailData.driveLink = getDriveFolderLink(body.folderId);
      }

      (async () => {
        try {
          await sendEmail(emailData);
          console.log('Weekly report email sent successfully.');
        } catch (error) {
          console.error('Error sending weekly report email:', error);
        }
      })();
    }

    // Ensure headers are only set once
    event.node.res.setHeader('Content-Disposition', 'attachment; filename=exported_file.xlsx');
    event.node.res.setHeader('Content-Type', mimeType);

    // Send the file stream to the client
    return sendStream(event, exportedFile);
  } catch (error: any) {
    console.error('Error while exporting the report:', error);
    const h3Error = new H3Error('Failed to generate the report.');
    h3Error.statusCode = 500;
    h3Error.data = {
      error: error.message,
    };

    throw h3Error;
  }
});
