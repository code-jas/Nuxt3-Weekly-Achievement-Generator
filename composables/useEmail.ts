// ~/composables/useEmail.ts
import nodemailer from 'nodemailer';
import { useEmailTemplates } from './useEmailTemplates';
import type { Attachment } from '@/types/email-attachment';
import type { User } from '~/types/user';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
  user?: User;
}

export const useEmail = () => {
  const { hrWeeklyReportEmail } = useEmailTemplates();

  const sendEmail = async ({ from, to, subject, attachments, user }: EmailOptions) => {
    // Generate the email content using weeklyReportEmail
    const { html, text } = hrWeeklyReportEmail(user?.name || '', user?.jobPosition || '', to); // Replace 'User' with the actual user's name if available

    // @ts-expect-error: useRuntimeConfig is not typed but it is valid
    const config = useRuntimeConfig();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.public.emailServiceEmail,
        pass: config.public.emailServicePassword,
      },
    });

    const mailOptions: EmailOptions = {
      from,
      to,
      subject,
      text,
      html,
    };

    if (attachments) {
      mailOptions.attachments = attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        encoding: 'base64',
        contentType: attachment.type,
        disposition: attachment.disposition,
      }));
    }

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
