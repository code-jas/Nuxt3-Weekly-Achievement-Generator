import { promises as fs } from 'fs';
import path from 'path';
import XlsxTemplate from 'xlsx-template';

// const templateUrl = 'https://raw.githubusercontent.com/code-jas/Weekly-Achievement-Generator-Nuxt3/master/public/templates/war-template.xlsx';

export default class XLSPrinter {
  static async print(
    template: string,
    values: Record<string, any>,
    sheet?: number,
  ): Promise<string> {
    try {
      // const config = useRuntimeConfig();

      // read file using local
      const filename = path.join(process.cwd(), 'public/templates', template);
      const file = await fs.readFile(filename);
      const xlsTemplate = new XlsxTemplate(file);

      // read file using http
      // const arrayBuffer = await $fetch(config.templateUrl, { responseType: 'arrayBuffer' });
      // const fileBuffer = Buffer.from(arrayBuffer as ArrayBuffer);

      // const xlsTemplate = new XlsxTemplate(fileBuffer);

      // CLOCKIFY_API_BASE_URL=https://api.clockify.me/api/v1
      // CLOCKIFY_API_KEY=N2Y3ODlmNzItMTM2My00YjQ4LTliYTYtNGFmNmZiYWE2MmU3
      // CLOCKIFY_WORKSPACE_ID=5f2b5bc6e89e8809e38b2e67
      // CLOCKIFY_USER_ID=6417f97fe4abcb09f08f7e34

      xlsTemplate.substitute(sheet || 1, values);
      return xlsTemplate.generate({ type: 'base64' }); // Pass the GenerateOptions object
    } catch (error) {
      console.error('Error occurred while generating Excel:', error);
      throw error; // re-throw the error to handle it in the calling function
    }
  }

  // static async printMultipleSheet(template: string, values: Record<string, any>): Promise<string> {
  //     const filename = path.join(path.resolve('./'), 'templates', template);
  //     const file = await fs.readFile(filename);

  //     const xlsTemplate = new XlsxTemplate(file);

  //     await Promise.all(Object.keys(values).map(async (key, index) => {
  //         await xlsTemplate.substitute(index + 1, values[key]);
  //     }));
  //     return xlsTemplate.generate({ type: 'base64' });
  // }
}
