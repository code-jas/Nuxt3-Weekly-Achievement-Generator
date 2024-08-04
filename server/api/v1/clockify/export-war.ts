import { useGoogleAPI } from '@/composables/useGoogleAPI';
import { useEmail } from '@/composables/useEmail';
import { H3Event, sendStream } from 'h3';
import type { Attachment } from '@/types/email-attachment';

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  try {
    const body = await readBody(event);

    const { getFileStream } = useGoogleAPI();
    const { sendEmail } = useEmail();

    // Export to excel
    const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const filestream = await getFileStream(body.fileId, mimeType);

    // const attachments = [
    //   {
    //     filename: body.filename,
    //     content: filestream,
    //   },
    //   // Add more attachments here if needed
    // ];

    const buffers: Buffer[] = [];
    const attachmentContent = await new Promise<Buffer>((resolve, reject) => {
      filestream.on('data', (chunk) => buffers.push(chunk));
      filestream.on('end', () => resolve(Buffer.concat(buffers)));
      filestream.on('error', (error) => reject(error));
    });

    const attachments: Attachment[] = [
      {
        filename: body.filename,
        content: attachmentContent.toString('base64'), // Convert to base64
        type: mimeType,
        disposition: 'attachment',
      },
    ];

    if (body.isEmailSend) {
      // Send email without waiting for it to complete

      sendEmail({
        from: 'johnangelo.silvestre04@gmail.com', // Dynamic from email address
        to: 'johnangelosilvestre.ccci@gmail.com',
        // to: 'jsilvestre@ccci-tech.com',
        subject: 'Your Weekly Report is Ready',
        // text: 'Please find the exported report attached.',
        attachments,
      })
        .then(() => {
          console.log('Weekly report email sent successfully.');
        })
        .catch((error) => {
          console.error('Error sending weekly report email:', error);
        });
    }

    if (body.isSlackSend) {
      // Handle Slack sending in composables
      // No need to wait for the Slack message to be sent before continuing
    }

    // Set headers for file download
    event.node.res.setHeader('Content-Disposition', 'attachment; filename=exported_file.xlsx');
    event.node.res.setHeader('Content-Type', mimeType);

    // Send the file stream to the client
    return sendStream(event, filestream);
  } catch (error: any) {
    console.error('Error occurred while generating the report:', error);
    sendError(event, new Error(error));
  }
});
