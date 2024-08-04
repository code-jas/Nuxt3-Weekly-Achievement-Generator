// ~/composables/useEmailTemplates.ts

export const useEmailTemplates = () => {
  const weeklyReportEmail = (name: string, mailTo: string) => {
    const html = `
  <!DOCTYPE html>
  <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="utf-8">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="format-detection"
              content="telephone=no, date=no, address=no, email=no">
          <title>Weekly Report Download</title>
          <link
              href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
              rel="stylesheet" media="screen">
          <style>
      .hover-underline:hover {
        text-decoration: underline !important;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
      @keyframes pulse { 50% { opacity: .5; } }
      @keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: none; animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }
      @media (max-width: 600px) {
        .sm-px-24 { padding-left: 12px !important; padding-right: 12px !important; }
        .sm-py-32 { padding-top: 24px !important; padding-bottom: 24px !important; }
        .sm-w-full { width: 100% !important; }
      }
      .logo {
        display: block;
        margin: 0 auto;
        max-width: 60px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        font-family: 'Krona One', sans-serif;
        font-size: 1.25rem;
        color: #00bb60; /* Replace with your branding color */
        font-weight: 600;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .header h2 {
        font-size: 0.875rem;
        color: #00bb60; /* Replace with your branding color */
        font-weight: 400;
      }
    </style>
      </head>
      <body
          style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1;">
          <div role="article" aria-roledescription="email"
              aria-label="Weekly Report Download" lang="en">
              <table
                  style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;"
                  width="100%" cellpadding="0" cellspacing="0"
                  role="presentation">
                  <tr>
                      <td align="center"
                          style="--bg-opacity: 1; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                          <table class="sm-w-full"
                              style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;"
                              width="600" cellpadding="0" cellspacing="0"
                              role="presentation">
                              <tr>
                                  <td class="sm-py-32 sm-px-24"
                                      style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 32px; text-align: center;"
                                      align="center">
                                      <div class="header"
                                          style="text-align: center; margin-bottom: 20px;">
                                          <img
                                              src="https://raw.githubusercontent.com/code-jas/war-generator/master/assets/images/logo/android-chrome-192x192.png"
                                              alt="Logo" class="logo"
                                              style="display: block; margin: 0 auto; max-width: 60px;" />
                                          <h1
                                              style="font-family: 'Krona One', sans-serif; font-size: 1.25rem; color: #00bb60; font-weight: 600; margin: 0 ">War
                                              Generator</h1>
                                          <h2
                                              style="font-size: 0.875rem; color: #00bb60; font-weight: 400; margin: 0">Report
                                              Success Weekly, Excel Daily</h2>
                                      </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" class="sm-px-24"
                                      style="font-family: 'Montserrat',Arial,sans-serif;">
                                      <table
                                          style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;"
                                          width="100%" cellpadding="0"
                                          cellspacing="0" role="presentation">
                                          <tr>
                                              <td class="sm-px-24"
                                                  style="--bg-opacity: 1; background-color: #ffffff; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262;"
                                                  align="left">
                                                  <p>Hi ${name},</p>
                                                  <p
                                                      style="margin: 0 0 24px;">Your
                                                      weekly report is ready for
                                                      download. Please find the
                                                      attached file for the
                                                      report.</p>
                                                  <table
                                                      style="font-family: 'Montserrat',Arial,sans-serif;"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation">
                                                      <tr>
                                                          <td
                                                              style="mso-padding-alt: 16px px; --bg-opacity: 1; background-color: #7367f0; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                                                              <!-- Add any additional buttons or actions here -->
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table
                                                      style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;"
                                                      width="100%" cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation">
                                                      <tr>
                                                          <td
                                                              style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 18px; padding-bottom: 18px;">
                                                              <div
                                                                  style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">&zwnj;</div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <p
                                                      style="margin: 0 0 16px;">This
                                                      email was sent to <a
                                                          href="mailto:${mailTo}"
                                                          class="hover-underline"
                                                          style="--text-opacity: 1; color: #00bb60; text-decoration: none;">${mailTo}</a>.
                                                      If you prefer not to receive
                                                      these emails, you can <a
                                                          href="#"
                                                          class="hover-underline"
                                                          style="--text-opacity: 1; color: #00bb60; text-decoration: none;">unsubscribe</a>
                                                      or <a href="#"
                                                          class="hover-underline"
                                                          style="--text-opacity: 1; color: #00bb60; text-decoration: none;">manage
                                                          your email
                                                          preferences</a>.</p>
                                                  <p style="margin: 0 0 16px;">©
                                                      2024 War Generator, 123
                                                      Manila, Philippines 1013</p>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td
                                                  style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;"
                                                  height="20"></td>
                                          </tr>
                                          <tr>
                                              <td
                                                  style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;"
                                                  height="16"></td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </div>
      </body>
  </html>
      `;

    const text = `
          Hi ${name},
  
          Your weekly report is ready for download. Please find the attached file for the report.
  
          This email was sent to ${mailTo}. If you prefer not to receive these emails, you can unsubscribe or manage your email preferences.
  
          © 2024 War Generator, 123 Manila, Philippines 1013
      `;

    return { html, text };
  };

  return { weeklyReportEmail };
};
