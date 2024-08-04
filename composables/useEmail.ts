// ~/composables/useEmail.ts
import nodemailer from 'nodemailer';
import { useEmailTemplates } from './useEmailTemplates';
import type { Attachment } from '@/types/email-attachment';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  attachments?: Attachment[];
}

export const useEmail = () => {
  const { weeklyReportEmail } = useEmailTemplates();

  const sendEmail = async ({ from, to, subject, attachments }: EmailOptions) => {
    // Generate the email content using weeklyReportEmail
    const { html, text } = weeklyReportEmail('John Angelo', to); // Replace 'User' with the actual user's name if available

    // @ts-expect-error: useRuntimeConfig is not typed but it is valid

    const config = useRuntimeConfig();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.public.emailServiceEmail,
        pass: config.public.emailServicePassword,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        encoding: 'base64',
        contentType: attachment.type,
        disposition: attachment.disposition,
      })),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  return {
    sendEmail,
  };
};
