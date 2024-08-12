import { promises as fs } from 'fs';
import path from 'path';
import XlsxTemplate from 'xlsx-template';

import { useGoogleAPI } from '@/composables/useGoogleAPI';
import { ref as storageRef, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';

// const templateUrl = 'https://raw.githubusercontent.com/code-jas/Weekly-Achievement-Generator-Nuxt3/master/public/templates/war-template.xlsx';

export default class ExportService {
  /**
   * Generates an Excel file based on a template and values.
   * @param template - The name of the template file.
   * @param values - The values to substitute in the template.
   * @param sheet - The sheet number to generate the Excel file for (optional, defaults to 1).
   * @returns A Promise that resolves to the generated Excel file as a base64 string.
   * @throws If an error occurs while generating the Excel file.
   */
  static async generateExcel(
    template: string,
    values: Record<string, any>,
    sheet?: number,
  ): Promise<string> {
    try {
      // const config = useRuntimeConfig();

      // // read file using local
      const filename = path.join('public/templates', template);
      console.log('filename :>> ', filename);
      const file = await fs.readFile(filename);
      const xlsTemplate = new XlsxTemplate(file);

      // read file using http
      // const arrayBuffer = await $fetch(config.templateUrl, { responseType: 'arrayBuffer' });
      // const fileBuffer = Buffer.from(arrayBuffer as ArrayBuffer);

      // const xlsTemplate = new XlsxTemplate(fileBuffer);

      xlsTemplate.substitute(sheet || 1, values);
      return xlsTemplate.generate({ type: 'base64' }); // Pass the GenerateOptions object
    } catch (error) {
      console.error('Error occurred while generating Excel:', error);
      throw error;
    }
  }

  /**
   * Saves a file to Google Drive.
   *
   * @param foldername - The name of the folder in Google Drive where the file will be saved.
   * @param filename - The name of the file to be saved.
   * @param base64Data - The file data encoded in base64 format.
   * @returns A Promise that resolves to a string representing the response from Google Drive.
   * @throws If an error occurs while uploading to Google Drive.
   */
  static async saveToGoogleDrive(
    foldername: string,
    filename: string,
    base64Data: string,
  ): Promise<{ fileId: string; folderId: string }> {
    try {
      const buffer = Buffer.from(base64Data, 'base64');
      const { uploadFile } = useGoogleAPI();
      const response = await uploadFile(foldername, filename, buffer);

      return response;
    } catch (error) {
      console.error('Error occurred while uploading to Google Drive:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }

  /**
   * Saves the base64 data to Firebase storage with the specified filename.
   * @param storage - The Firebase storage instance.
   * @param base64Data - The base64-encoded data to be saved.
   * @param filename - The name of the file to be saved.
   * @returns A Promise that resolves to the download URL of the saved file.
   * @throws If an error occurs while uploading to Firebase.
   */
  static async saveToFirebase(
    storage: FirebaseStorage,
    base64Data: string,
    filename: string,
  ): Promise<string> {
    try {
      const buffer = Buffer.from(base64Data, 'base64');
      const fileRef = storageRef(storage, `uploads/${filename}`);

      const metadata = {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        cacheControl: 'public',
      };

      await uploadBytes(fileRef, buffer, metadata);
      const downloadURL = await getDownloadURL(fileRef);

      return downloadURL;
    } catch (error) {
      console.error('Error occurred while uploading to Firebase:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }
}
